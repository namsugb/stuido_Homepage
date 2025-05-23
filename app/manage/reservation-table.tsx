"use client"

import { useState, useMemo, useTransition } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Search } from "lucide-react"
import { type Reservation, updateReservationStatus } from "../actions/reservation-actions"
import { toast } from "sonner"

interface ReservationTableProps {
  initialReservations: Reservation[]
}

export function ReservationTable({ initialReservations }: ReservationTableProps) {
  // 상태 관리
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [shootingTypeFilter, setShootingTypeFilter] = useState<string>("all")
  const [isPending, startTransition] = useTransition()

  // 고유한 촬영 유형 목록 추출
  const uniqueShootingTypes = useMemo(() => {
    const types = new Set(reservations.map((r) => r.shooting_type))
    return Array.from(types)
  }, [reservations])

  // 필터링된 예약 목록
  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      // 검색어 필터링
      const searchMatch =
        reservation.name.includes(searchTerm) ||
        reservation.phone.includes(searchTerm) ||
        (reservation.email && reservation.email.includes(searchTerm)) ||
        (reservation.message && reservation.message.includes(searchTerm))

      // 상태 필터링
      const statusMatch = statusFilter === "all" || reservation.status === statusFilter

      // 촬영 유형 필터링
      const typeMatch = shootingTypeFilter === "all" || reservation.shooting_type === shootingTypeFilter

      return searchMatch && statusMatch && typeMatch
    })
  }, [reservations, searchTerm, statusFilter, shootingTypeFilter])

  // 예약 상태 변경 함수
  const handleStatusChange = (id: number, newStatus: Reservation["status"]) => {
    // 낙관적 UI 업데이트
    setReservations((prev) =>
      prev.map((reservation) => (reservation.id === id ? { ...reservation, status: newStatus } : reservation)),
    )

    // 서버 액션 호출
    startTransition(async () => {
      const result = await updateReservationStatus(id, newStatus)

      if (!result.success) {
        // 실패 시 원래 상태로 되돌리기
        toast.error("상태 업데이트에 실패했습니다: " + (result.message || "알 수 없는 오류"))
        setReservations(initialReservations)
      } else {
        toast.success("예약 상태가 업데이트되었습니다.")
      }
    })
  }

  // 상태에 따른 배지 색상
  const getStatusBadgeColor = (status: Reservation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return ""
    }
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy년 MM월 dd일", { locale: ko })
    } catch (error) {
      return dateString
    }
  }

  return (
    <>
      {/* 필터 및 검색 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="이름, 전화번호, 이메일 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
              <SelectItem value="confirmed">확정</SelectItem>
              <SelectItem value="cancelled">취소</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select value={shootingTypeFilter} onValueChange={setShootingTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="촬영 유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 유형</SelectItem>
              {uniqueShootingTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 예약 테이블 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>날짜</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>촬영 유형</TableHead>
                  <TableHead>인원</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>
                        <div>{reservation.name}</div>
                        <div className="text-xs text-muted-foreground">{reservation.email}</div>
                      </TableCell>
                      <TableCell>{reservation.phone}</TableCell>
                      <TableCell>{formatDate(reservation.date)}</TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.shooting_type}</TableCell>
                      <TableCell>{reservation.people}명</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(reservation.status)}>
                          {reservation.status === "pending" && "대기중"}
                          {reservation.status === "confirmed" && "확정"}
                          {reservation.status === "cancelled" && "취소"}
                          {reservation.status === "completed" && "완료"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={reservation.status}
                          onValueChange={(value) => handleStatusChange(reservation.id, value as Reservation["status"])}
                          disabled={isPending}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="상태 변경" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">대기중</SelectItem>
                            <SelectItem value="confirmed">확정</SelectItem>
                            <SelectItem value="cancelled">취소</SelectItem>
                            <SelectItem value="completed">완료</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
