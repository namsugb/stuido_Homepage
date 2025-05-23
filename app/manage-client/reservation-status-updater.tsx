"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

type StatusUpdaterProps = {
  reservationId: number
  currentStatus: string
  onStatusChange: (newStatus: string) => void
}

export function ReservationStatusUpdater({ reservationId, currentStatus, onStatusChange }: StatusUpdaterProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatus = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase 환경 변수가 설정되지 않았습니다.")
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      const { error } = await supabase.from("reservations").update({ status: newStatus }).eq("id", reservationId)

      if (error) {
        throw error
      }

      // 상태 업데이트 성공
      onStatusChange(newStatus)
      toast.success("예약 상태가 업데이트되었습니다.")
    } catch (error) {
      console.error("상태 업데이트 오류:", error)
      toast.error("상태 업데이트에 실패했습니다.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Select defaultValue={currentStatus} onValueChange={updateStatus} disabled={isUpdating}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="상태 변경" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="신규문의">신규문의</SelectItem>
        <SelectItem value="상담중">상담중</SelectItem>
        <SelectItem value="예약확정">예약확정</SelectItem>
        <SelectItem value="촬영완료">촬영완료</SelectItem>
      </SelectContent>
    </Select>
  )
}
