"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Reservation } from "../actions/reservation-actions"

interface ReservationStatsProps {
  reservations: Reservation[]
}

export function ReservationStats({ reservations }: ReservationStatsProps) {
  // 상태별 예약 수 계산
  const pendingCount = reservations.filter((r) => r.status === "pending").length
  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length
  const cancelledCount = reservations.filter((r) => r.status === "cancelled").length
  const completedCount = reservations.filter((r) => r.status === "completed").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">총 예약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reservations.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">대기중</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">확정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{confirmedCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">취소</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledCount}</div>
        </CardContent>
      </Card>
    </div>
  )
}
