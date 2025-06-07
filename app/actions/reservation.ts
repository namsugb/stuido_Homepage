"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export type ReservationFormData = {
  name: string
  phone: string
  date: string
  time: string
  shootingType: string
  people: string
  message: string
}

export async function submitReservation(formData: ReservationFormData) {
  try {
    const supabase = createServerSupabaseClient()

    // 데이터 유효성 검사
    if (
      !formData.name ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.shootingType ||
      !formData.people
    ) {
      return {
        success: false,
        message: "필수 입력 항목을 모두 작성해주세요.",
      }
    }

    // 전화번호 형식 검사
    if (!/^\d{2,3}-?\d{3,4}-?\d{4}$/.test(formData.phone)) {
      return {
        success: false,
        message: "올바른 전화번호 형식이 아닙니다.",
      }
    }

    // Supabase에 데이터 저장
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          shooting_type: formData.shootingType,
          people: Number.parseInt(formData.people),
          message: formData.message || null,
          status: "신규문의",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: "예약 저장 중 오류가 발생했습니다. 다시 시도해주세요.",
      }
    }

    return {
      success: true,
      message: "예약이 성공적으로 접수되었습니다.",
      data,
    }
  } catch (error) {
    console.error("Reservation submission error:", error)
    return {
      success: false,
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}
