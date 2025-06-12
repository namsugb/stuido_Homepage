"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@supabase/supabase-js"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, Search, X, Trash2 } from "lucide-react"

// 상단에 import 추가
import { ReservationStatusUpdater } from "./reservation-status-updater"
import { Toaster, toast } from "sonner"
import { addReservation } from "../actions/reservation"

// Reservation 타입의 status 필드 타입 변경
type Reservation = {
  id: number
  name: string
  phone: string
  email: string | null
  date: string
  time: string
  shooting_type: string
  people: number
  message: string | null
  created_at: string
  // status 필드는 옵션으로 처리하고 타입 변경
  status?: "신규문의" | "상담중" | "예약확정" | "촬영완료" | "보류"
  memo?: string // 관리자 메모
}

export default function ManageClientPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [hasStatusColumn, setHasStatusColumn] = useState(false)
  const [tableColumns, setTableColumns] = useState<string[]>([])

  // 검색 기능
  const [searchTerm, setSearchTerm] = useState("")

  // 날짜 필터
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState(false)

  // 인증 기능
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // CSV 내보내기를 위한 ref
  const csvLinkRef = useRef<HTMLAnchorElement>(null)

  // 모달 내에서 수정 가능한 상태 관리
  const [editReservation, setEditReservation] = useState<Reservation | null>(null)

  // 예약 추가 관련 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addForm, setAddForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    shootingType: "family",
    people: "",
    message: "",
    memo: "",
  })
  const [addError, setAddError] = useState("")

  // 상세 모달 열릴 때 선택된 예약 정보 복사
  useEffect(() => {
    if (isModalOpen && selectedReservation) {
      setEditReservation({ ...selectedReservation })
    }
  }, [isModalOpen, selectedReservation])

  // 예약 정보 저장 함수
  async function handleSaveEdit() {
    if (!editReservation) return
    try {
      const supabase = createSupabaseClient()
      const { data, error } = await supabase
        .from("reservations")
        .update({
          name: editReservation.name,
          phone: editReservation.phone,
          date: editReservation.date,
          time: editReservation.time,
          shooting_type: editReservation.shooting_type,
          people: editReservation.people,
          message: editReservation.message,
          status: editReservation.status,
          memo: editReservation.memo || null,
        })
        .eq("id", Number(editReservation.id))
        .select()

      console.log('update result:', data, error)
      if (error) throw error
      if (!data) {
        toast.error('업데이트된 데이터가 없습니다. (id 불일치 또는 권한 문제)')
        return
      }
      // 상태 동기화
      setReservations((prev) =>
        prev.map((r) => (r.id === editReservation.id ? { ...editReservation } : r))
      )
      setFilteredReservations((prev) =>
        prev.map((r) => (r.id === editReservation.id ? { ...editReservation } : r))
      )
      setSelectedReservation({ ...editReservation })
      setIsModalOpen(false)
      toast.success("저장되었습니다.")
    } catch (err: any) {
      toast.error("수정 중 오류 발생: " + err.message)
    }
  }

  // Supabase 클라이언트 생성 함수
  const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase 환경 변수가 설정되지 않았습니다.")
    }

    return createClient(supabaseUrl, supabaseAnonKey)
  }

  // 테이블 구조 확인
  useEffect(() => {
    async function checkTableStructure() {
      try {
        const supabase = createSupabaseClient()

        // 테이블의 첫 번째 행을 가져와서 구조 확인
        const { data, error } = await supabase.from("reservations").select("*").limit(1)

        if (error) {
          console.error("테이블 구조 확인 오류:", error)
          setError(error.message)
          return
        }

        if (data && data.length > 0) {
          const columns = Object.keys(data[0])
          setTableColumns(columns)
          setHasStatusColumn(columns.includes("status"))
          console.log("테이블 컬럼:", columns)
          console.log("status 컬럼 존재 여부:", columns.includes("status"))
        }
      } catch (err: any) {
        console.error("테이블 구조 확인 중 오류:", err)
      }
    }

    // 인증 상태 확인
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      checkTableStructure()
    }
  }, [])

  // 예약 데이터 가져오기
  useEffect(() => {
    async function fetchReservations() {
      try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase.from("reservations").select("*").order("date", { ascending: true })

        if (error) {
          console.error("Supabase 오류:", error)
          setError(error.message)
        } else {
          // 모든 예약에 기본 상태 추가 (status 컬럼이 없는 경우)
          const processedReservations =
            (data?.map((reservation) => ({
              ...reservation,
              status: hasStatusColumn ? reservation.status || "신규문의" : undefined,
            })) as Reservation[]) || []

          setReservations(processedReservations)
          setFilteredReservations(processedReservations)
        }
      } catch (err: any) {
        console.error("예외 발생:", err)
        setError("데이터를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    if (tableColumns.length > 0 && isAuthenticated) {
      fetchReservations()
    } else if (!isAuthenticated) {
      setLoading(false)
    }
  }, [tableColumns, hasStatusColumn, isAuthenticated])

  // 필터링 함수 (검색어, 상태, 날짜 범위 모두 적용)
  useEffect(() => {
    if (!isAuthenticated) return

    let filtered = [...reservations]

    // 상태 필터 적용 (status 컬럼이 있는 경우만)
    if (hasStatusColumn && activeTab !== "all") {
      filtered = filtered.filter((reservation) => reservation.status === activeTab)
    }

    // 검색어 필터 적용
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (reservation) =>
          reservation.name.toLowerCase().includes(term) ||
          reservation.phone.toLowerCase().includes(term) ||
          (reservation.email && reservation.email.toLowerCase().includes(term)) ||
          reservation.shooting_type.toLowerCase().includes(term) ||
          (reservation.message && reservation.message.toLowerCase().includes(term)),
      )
    }

    // 날짜 범위 필터 적용
    if (startDate) {
      filtered = filtered.filter((reservation) => {
        const reservationDate = new Date(reservation.date)
        return reservationDate >= startDate
      })
    }

    if (endDate) {
      filtered = filtered.filter((reservation) => {
        const reservationDate = new Date(reservation.date)
        return reservationDate <= endDate
      })
    }

    setFilteredReservations(filtered)
  }, [activeTab, reservations, hasStatusColumn, searchTerm, startDate, endDate, isAuthenticated])

  // 통계 계산 (status 컬럼이 있는 경우만)
  const getStats = () => {
    if (!hasStatusColumn) {
      return { total: reservations.length, 신규문의: 0, 상담중: 0, 예약확정: 0, 촬영완료: 0, 보류: 0 }
    }

    const total = reservations.length
    const 신규문의 = reservations.filter((r) => r.status === "신규문의").length
    const 상담중 = reservations.filter((r) => r.status === "상담중").length
    const 예약확정 = reservations.filter((r) => r.status === "예약확정").length
    const 촬영완료 = reservations.filter((r) => r.status === "촬영완료").length
    const 보류 = reservations.filter((r) => r.status === "보류").length

    return { total, 신규문의, 상담중, 예약확정, 촬영완료, 보류 }
  }

  // 로그인 처리
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제 환경에서는 서버 측 인증을 사용해야 합니다.
    // 이 예제에서는 간단한 비밀번호 확인만 수행합니다.
    if (password === "admin1234") {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", "true")
      setLoginError("")
    } else {
      setLoginError("비밀번호가 올바르지 않습니다.")
    }
  }

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
  }

  // CSV 내보내기 함수
  const exportToCSV = () => {
    // CSV 헤더 생성
    const headers = [
      "ID",
      "이름",
      "연락처",
      "이메일",
      "날짜",
      "시간",
      "촬영 유형",
      "인원",
      "메시지",
      "생성일",
      hasStatusColumn ? "상태" : "",
    ].filter(Boolean)

    // CSV 데이터 생성
    const csvData = filteredReservations.map((reservation) => {
      return [
        reservation.id,
        reservation.name,
        reservation.phone,
        reservation.email || "",
        reservation.date,
        reservation.time,
        reservation.shooting_type,
        reservation.people,
        reservation.message || "",
        reservation.created_at,
        hasStatusColumn ? reservation.status : "",
      ].filter((_, index) => index < headers.length)
    })

    // CSV 문자열 생성
    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    // CSV 파일 다운로드
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `예약_목록_${format(new Date(), "yyyy-MM-dd")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const stats = getStats()

  // 예약 상태 변경 핸들러 추가
  const handleStatusChange = (id: number, newStatus: string) => {
    setReservations((prev) =>
      prev.map((reservation) => (reservation.id === id ? { ...reservation, status: newStatus as any } : reservation)),
    )
  }

  // 예약 삭제 함수
  async function handleDeleteReservation(id: number) {
    if (!window.confirm("정말로 이 예약을 삭제하시겠습니까?")) return;
    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.from("reservations").delete().eq("id", id);
      if (error) throw error;
      setReservations((prev) => prev.filter((r) => r.id !== id));
      setFilteredReservations((prev) => prev.filter((r) => r.id !== id));
      toast.success("예약이 삭제되었습니다.");
    } catch (err: any) {
      toast.error("삭제 중 오류 발생: " + err.message);
    }
  }

  // 예약 추가 핸들러
  async function handleAddReservation(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    if (!addForm.name || !addForm.phone || !addForm.date || !addForm.time || !addForm.shootingType || !addForm.people) {
      setAddError("필수 항목을 모두 입력하세요.");
      return;
    }
    try {
      const result = await addReservation({
        ...addForm,
        status: "예약확정",
      });
      if (result.success) {
        if (Array.isArray(result.data) && result.data.length > 0) {
          const newReservation = result.data[0];
          setReservations((prev) => [...prev, newReservation]);
          setFilteredReservations((prev) => [...prev, newReservation]);
          setIsAddModalOpen(false);
          setAddForm({ name: "", phone: "", date: "", time: "", shootingType: "family", people: "", message: "", memo: "" });
        } else {
          setAddError("저장 결과 데이터가 없습니다.");
        }
      } else {
        setAddError(result.message || "저장 실패");
      }
    } catch (err: any) {
      setAddError("저장 중 오류 발생: " + err.message);
    }
  }

  // 로딩 중 표시
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )

  // 오류 표시
  if (error && isAuthenticated)
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">오류:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호를 입력하세요"
                className="w-full"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-32 mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2 md:gap-0">
        <h1 className="text-3xl font-bold">예약 관리 시스템</h1>
        <div className="flex gap-2 mt-2 md:mt-0 justify-end">
          <Button variant="outline" onClick={() => setIsAddModalOpen(true)}>
            예약 추가
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>

      {!hasStatusColumn && (
        <Alert className="mb-6">
          <AlertDescription>
            <strong>알림:</strong> 'status' 컬럼이 테이블에 존재하지 않습니다. 상태 관리 기능은 비활성화되었습니다. 아래
            SQL을 실행하여 status 컬럼을 추가할 수 있습니다:
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              ALTER TABLE reservations ADD COLUMN status TEXT DEFAULT '신규문의';
            </pre>
          </AlertDescription>
        </Alert>
      )}

      {hasStatusColumn && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">전체 예약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">신규문의</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.신규문의}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">상담중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{stats.상담중}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">예약확정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.예약확정}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">촬영완료</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.촬영완료}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">보류</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-500">{stats.보류}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 필터링 및 검색 도구 */}
      <div className="mb-6 space-y-4">
        {/* 탭 (status 컬럼이 있는 경우만) */}
        {hasStatusColumn && (
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="flex w-full overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide">
              <TabsTrigger value="all">전체 ({stats.total})</TabsTrigger>
              <TabsTrigger value="신규문의">신규문의 ({stats.신규문의})</TabsTrigger>
              <TabsTrigger value="상담중">상담중 ({stats.상담중})</TabsTrigger>
              <TabsTrigger value="예약확정">예약확정 ({stats.예약확정})</TabsTrigger>
              <TabsTrigger value="촬영완료">촬영완료 ({stats.촬영완료})</TabsTrigger>
              <TabsTrigger value="보류">보류 ({stats.보류})</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* 검색 및 필터 컨트롤 */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 입력 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="이름, 전화번호, 이메일 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* 날짜 범위 선택 */}
          <div className="flex gap-2">
            <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "yyyy-MM-dd") : "시작 날짜"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date)
                    setIsStartDateOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "yyyy-MM-dd") : "종료 날짜"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date)
                    setIsEndDateOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>

            {(startDate || endDate) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setStartDate(undefined)
                  setEndDate(undefined)
                }}
              >
                초기화
              </Button>
            )}
          </div>

          {/* CSV 내보내기 버튼 */}
          <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            CSV 내보내기
          </Button>
        </div>
      </div>

      {/* 예약 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">촬영 유형</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                {hasStatusColumn && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                )}
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">삭제</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={hasStatusColumn ? 7 : 6} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || startDate || endDate ? "검색 결과가 없습니다." : "예약 데이터가 없습니다."}
                  </td>
                </tr>
              ) : (
                filteredReservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="hover:bg-gray-50 cursor-pointer group"
                    onClick={() => {
                      setSelectedReservation(reservation)
                      setIsModalOpen(true)
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.shooting_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.time}</td>
                    {hasStatusColumn && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.status && getStatusBadge(reservation.status)}
                      </td>
                    )}
                    {/* 삭제 버튼 */}
                    <td className="px-3 py-4 text-right">
                      <button
                        className="text-red-500 hover:text-white hover:bg-red-500 rounded-full p-2 transition group-hover:scale-110"
                        title="예약 삭제"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteReservation(reservation.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 결과 요약 */}
      <div className="mt-4 text-sm text-gray-500">
        총 {filteredReservations.length}개의 예약이 표시됨 (전체 {reservations.length}개 중)
      </div>

      {/* 예약 상세 모달 */}
      {selectedReservation && editReservation && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent
            className="custom-dialog-content !max-w-[420px] w-full sm:w-[420px] sm:!max-w-[420px]"
            style={{
              maxWidth: '95vw',
              width: '100%',
              maxHeight: '80vh',
              minWidth: '320px',
              overflowY: 'auto',
              padding: '1.5rem',
              borderRadius: '1rem',
            }}
          >
            <DialogHeader>
              <DialogTitle>예약 상세 정보</DialogTitle>
              <DialogDescription>예약 ID: {editReservation.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">이름:</span>
                <input
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.name}
                  onChange={e => setEditReservation({ ...editReservation, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">연락처:</span>
                <input
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.phone}
                  onChange={e => setEditReservation({ ...editReservation, phone: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">날짜:</span>
                <input
                  type="date"
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.date}
                  onChange={e => setEditReservation({ ...editReservation, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">시간:</span>
                <input
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.time}
                  onChange={e => setEditReservation({ ...editReservation, time: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">촬영 유형:</span>
                <input
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.shooting_type}
                  onChange={e => setEditReservation({ ...editReservation, shooting_type: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">인원:</span>
                <input
                  type="number"
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.people}
                  onChange={e => setEditReservation({ ...editReservation, people: Number(e.target.value) })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">메시지:</span>
                <input
                  className="col-span-3 border rounded px-2 py-1"
                  value={editReservation.message || ""}
                  onChange={e => setEditReservation({ ...editReservation, message: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">관리자 메모:</span>
                <textarea
                  className="col-span-3 border rounded px-2 py-1 min-h-[60px] resize-y"
                  value={editReservation.memo || ""}
                  onChange={e => setEditReservation({ ...editReservation, memo: e.target.value })}
                  placeholder="관리자만 볼 수 있는 메모를 입력하세요"
                />
              </div>
              {/* status 컬럼이 있는 경우에만 상태 수정 */}
              {hasStatusColumn && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">상태:</span>
                  <select
                    className="col-span-3 border rounded px-2 py-1"
                    value={editReservation.status}
                    onChange={e => setEditReservation({ ...editReservation, status: e.target.value as any })}
                  >
                    <option value="신규문의">신규문의</option>
                    <option value="상담중">상담중</option>
                    <option value="예약확정">예약확정</option>
                    <option value="촬영완료">촬영완료</option>
                    <option value="보류">보류</option>
                  </select>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">예약 생성일:</span>
                <span className="col-span-3">{new Date(editReservation.created_at).toLocaleString("ko-KR")}</span>
              </div>
            </div>
            <DialogFooter className="flex flex-row justify-center gap-4 mt-4 w-full">
              <Button
                onClick={handleSaveEdit}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded w-1/2 sm:w-32"
                style={{ order: 1 }}
              >
                저장
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-100 hover:bg-red-200 text-red-600 font-bold px-6 py-2 rounded w-1/2 sm:w-32 border border-red-300"
                style={{ order: 2 }}
              >
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 예약 추가 모달 */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>예약 추가</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddReservation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">이름 *</label>
              <input className="w-full border rounded px-2 py-1" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">연락처 *</label>
              <input className="w-full border rounded px-2 py-1" value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">날짜 *</label>
              <input type="date" className="w-full border rounded px-2 py-1" value={addForm.date} onChange={e => setAddForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">시간 *</label>
              <input className="w-full border rounded px-2 py-1" value={addForm.time} onChange={e => setAddForm(f => ({ ...f, time: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">촬영 유형 *</label>
              <select className="w-full border rounded px-2 py-1" value={addForm.shootingType} onChange={e => setAddForm(f => ({ ...f, shootingType: e.target.value }))}>
                <option value="family">가족사진</option>
                <option value="wedding">웨딩/리마인드</option>
                <option value="celebration">칠순/팔순</option>
                <option value="profile">프로필/증명</option>
                <option value="pet">반려동물</option>
                <option value="event">행사스냅</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">인원 *</label>
              <input type="number" className="w-full border rounded px-2 py-1" value={addForm.people} onChange={e => setAddForm(f => ({ ...f, people: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">요청사항/메모</label>
              <textarea className="w-full border rounded px-2 py-1" value={addForm.message} onChange={e => setAddForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            {addError && <div className="text-red-500 text-sm">{addError}</div>}
            <DialogFooter>
              <Button type="submit">저장</Button>
              <Button type="button" onClick={() => setIsAddModalOpen(false)}>취소</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}

// 상태에 따른 배지 색상
function getStatusBadge(status: string) {
  switch (status) {
    case "예약확정":
    case "confirmed":
      return <Badge className="bg-green-500">예약확정</Badge>
    case "신규문의":
    case "pending":
      return <Badge className="bg-yellow-500">신규문의</Badge>
    case "상담중":
      return <Badge className="bg-blue-300">상담중</Badge>
    case "촬영완료":
    case "completed":
      return <Badge className="bg-blue-500">촬영완료</Badge>
    case "보류":
      return <Badge className="bg-gray-400">보류</Badge>
    case "cancelled":
      return <Badge className="bg-red-500">취소됨</Badge>
    default:
      return <Badge className="bg-gray-500">{status}</Badge>
  }
}

/* 반응형 상세 모달 스타일 */
import "../manage-client-modal.css"
