"use server"

import { createServerSupabaseClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export type Reservation = {
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
  status: "pending" | "confirmed" | "cancelled" | "completed"
}

// 모든 예약 가져오기
export async function getReservations(): Promise<Reservation[]> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("reservations").select("*").order("date", { ascending: true })

    if (error) {
      console.error("예약 데이터 가져오기 오류:", error)
      return []
    }

    // status 필드가 없는 경우 기본값 'pending' 추가
    const reservationsWithStatus = data.map((reservation) => ({
      ...reservation,
      status: reservation.status || "pending",
    })) as Reservation[]

    return reservationsWithStatus
  } catch (error) {
    console.error("예약 데이터 가져오기 오류:", error)
    return []
  }
}

// 예약 상태 업데이트
export async function updateReservationStatus(id: number, status: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("reservations").update({ status }).eq("id", id)

    if (error) {
      console.error("예약 상태 업데이트 오류:", error)
      return { success: false, message: error.message }
    }

    // 캐시 무효화 및 페이지 리프레시
    revalidatePath("/manage")

    return { success: true }
  } catch (error) {
    console.error("예약 상태 업데이트 오류:", error)
    return { success: false, message: "서버 오류가 발생했습니다." }
  }
}
