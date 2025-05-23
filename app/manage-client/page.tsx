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
import { CalendarIcon, Download, Search, X } from "lucide-react"

// 상단에 import 추가
import { ReservationStatusUpdater } from "./reservation-status-updater"
import { Toaster } from "sonner"

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
  status?: "신규문의" | "상담중" | "예약확정" | "촬영완료"
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
          console.log("데이터 가져오기 성공:", data?.length, "개의 예약")

          // 모든 예약에 기본 상태 추가 (status 컬럼이 없는 경우)
          const processedReservations =
            (data?.map((reservation) => ({
              ...reservation,
              // status 필드가 없으면 '신규문의'으로 가정
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
      return { total: reservations.length, 신규문의: 0, 상담중: 0, 예약확정: 0, 촬영완료: 0 }
    }

    const total = reservations.length
    const 신규문의 = reservations.filter((r) => r.status === "신규문의" || r.status === "pending").length
    const 상담중 = reservations.filter((r) => r.status === "상담중").length
    const 예약확정 = reservations.filter((r) => r.status === "예약확정" || r.status === "confirmed").length
    const 촬영완료 = reservations.filter((r) => r.status === "촬영완료" || r.status === "completed").length

    return { total, 신규문의, 상담중, 예약확정, 촬영완료 }
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

  // 로딩 중 표시
  if (loading && isAuthenticated)
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
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">예약 관리 시스템</h1>
        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
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
        </div>
      )}

      {/* 필터링 및 검색 도구 */}
      <div className="mb-6 space-y-4">
        {/* 탭 (status 컬럼이 있는 경우만) */}
        {hasStatusColumn && (
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">전체 ({stats.total})</TabsTrigger>
              <TabsTrigger value="신규문의">신규문의 ({stats.신규문의})</TabsTrigger>
              <TabsTrigger value="상담중">상담중 ({stats.상담중})</TabsTrigger>
              <TabsTrigger value="예약확정">예약확정 ({stats.예약확정})</TabsTrigger>
              <TabsTrigger value="촬영완료">촬영완료 ({stats.촬영완료})</TabsTrigger>
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
                  initialFocus
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  촬영 유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                {hasStatusColumn && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={hasStatusColumn ? 8 : 7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || startDate || endDate ? "검색 결과가 없습니다." : "예약 데이터가 없습니다."}
                  </td>
                </tr>
              ) : (
                filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reservation.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.shooting_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.time}</td>
                    {hasStatusColumn && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.status && getStatusBadge(reservation.status)}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <div className="flex items-center gap-2">
                        {hasStatusColumn && reservation.status && (
                          <ReservationStatusUpdater
                            reservationId={reservation.id}
                            currentStatus={reservation.status}
                            onStatusChange={(newStatus) => handleStatusChange(reservation.id, newStatus)}
                          />
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedReservation(reservation)
                            setIsModalOpen(true)
                          }}
                        >
                          상세보기
                        </Button>
                      </div>
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
      {selectedReservation && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>예약 상세 정보</DialogTitle>
              <DialogDescription>예약 ID: {selectedReservation.id}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">이름:</span>
                <span className="col-span-3">{selectedReservation.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">연락처:</span>
                <span className="col-span-3">{selectedReservation.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">이메일:</span>
                <span className="col-span-3">{selectedReservation.email || "-"}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">날짜:</span>
                <span className="col-span-3">{selectedReservation.date}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">시간:</span>
                <span className="col-span-3">{selectedReservation.time}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">촬영 유형:</span>
                <span className="col-span-3">{selectedReservation.shooting_type}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">인원:</span>
                <span className="col-span-3">{selectedReservation.people}명</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">메시지:</span>
                <span className="col-span-3">{selectedReservation.message || "-"}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">예약 생성일:</span>
                <span className="col-span-3">{new Date(selectedReservation.created_at).toLocaleString("ko-KR")}</span>
              </div>

              {/* status 컬럼이 있는 경우에만 상태 표시 */}
              {hasStatusColumn && selectedReservation.status && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">상태:</span>
                  <div className="col-span-3">{getStatusBadge(selectedReservation.status)}</div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button onClick={() => setIsModalOpen(false)}>닫기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
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
    case "cancelled":
      return <Badge className="bg-red-500">취소됨</Badge>
    default:
      return <Badge className="bg-gray-500">{status}</Badge>
  }
}
