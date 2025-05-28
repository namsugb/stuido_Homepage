"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, MessageSquare, Check } from "lucide-react"
import { submitReservation, type ReservationFormData } from "../actions/reservation"

export default function ReservationPage() {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    shootingType: "family",
    people: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 입력 시 해당 필드의 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    // 서버 에러 메시지 제거
    if (serverError) {
      setServerError(null)
    }
  }

  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "이름을 입력해주세요"
    if (!formData.phone.trim()) newErrors.phone = "연락처를 입력해주세요"
    else if (!/^\d{2,3}-?\d{3,4}-?\d{4}$/.test(formData.phone.trim())) newErrors.phone = "올바른 연락처 형식이 아닙니다"

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "올바른 이메일 형식이 아닙니다"

    if (!formData.date) newErrors.date = "날짜를 선택해주세요"
    if (!formData.time) newErrors.time = "시간을 선택해주세요"
    if (!formData.people) newErrors.people = "인원 수를 입력해주세요"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setServerError(null)

    try {
      // 서버 액션 호출
      const result = await submitReservation(formData)

      if (result.success) {
        setIsSubmitted(true)
        // 폼 초기화
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          shootingType: "family",
          people: "",
          message: "",
        })
      } else {
        setServerError(result.message)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setServerError("예약 처리 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // 촬영 유형 옵션
  const shootingTypes = [
    { value: "family", label: "가족 사진" },
    { value: "wedding", label: "웨딩 / 리마인드 웨딩" },
    { value: "celebration", label: "칠순 / 팔순 잔치" },
    { value: "profile", label: "프로필 / 증명사진" },
    { value: "pet", label: "반려동물 촬영" },
    { value: "event", label: "행사 스냅" },
  ]

  // 예약 가능 시간 옵션
  const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  // 오늘 날짜 구하기 (예약 날짜 최소값으로 사용)
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="min-h-screen bg-[#f8f8f6]">

      {/* 메인 컨텐츠 */}
      <main className="container mt-16 mx-auto px-6 pt-20 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">온라인 예약</h1>
            <p className="text-gray-600">
              아래 양식을 작성하여 촬영 예약을 신청해주세요. 예약 확정은 전화 또는 문자로 안내드립니다.
            </p>
          </div>

          {isSubmitted ? (
            // 예약 완료 메시지
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-[#bfa888] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">예약 신청이 완료되었습니다</h2>
              <p className="text-gray-600 mb-6">
                입력하신 연락처로 예약 확정 안내를 드리겠습니다. 영업일 기준 1-2일 내에 연락드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition"
                >
                  홈으로 돌아가기
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-[#bfa888] rounded-full text-white hover:bg-[#a68b6d] transition"
                >
                  다른 예약하기
                </button>
              </div>
            </div>
          ) : (
            // 예약 폼
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* 서버 에러 메시지 표시 */}
              {serverError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-center">{serverError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 고객 정보 섹션 */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-[#bfa888]" />
                    고객 정보
                  </h2>
                </div>

                {/* 이름 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#bfa888]`}
                    placeholder="홍길동"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* 연락처 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#bfa888]`}
                    placeholder="010-1234-5678"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                {/* 이메일 */}

                {/* 예약 정보 섹션 */}
                <div className="md:col-span-2 border-t pt-6 mt-2">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-[#bfa888]" />
                    예약 정보
                  </h2>
                </div>

                {/* 날짜 */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    날짜 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className={`w-full px-4 py-2 rounded-md border ${errors.date ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#bfa888]`}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>

                {/* 시간 */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    시간 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-md border ${errors.time ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#bfa888]`}
                  >
                    <option value="">시간 선택</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                </div>

                {/* 촬영 유형 */}
                <div>
                  <label htmlFor="shootingType" className="block text-sm font-medium text-gray-700 mb-1">
                    촬영 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="shootingType"
                    name="shootingType"
                    value={formData.shootingType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bfa888]"
                  >
                    {shootingTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 인원 수 */}
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">
                    인원 수 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2 rounded-md border ${errors.people ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#bfa888]`}
                    placeholder="1"
                  />
                  {errors.people && <p className="mt-1 text-sm text-red-500">{errors.people}</p>}
                </div>

                {/* 요청사항 */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    요청사항
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bfa888]"
                    placeholder="촬영에 관한 요청사항이나 문의사항을 적어주세요."
                  ></textarea>
                </div>
              </div>

              {/* 개인정보 수집 동의 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <div className="flex items-start">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 mt-1 text-[#bfa888] focus:ring-[#bfa888] border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                    <p className="text-xs text-gray-500 mt-1">
                      수집된 개인정보는 예약 확인 및 안내 목적으로만 사용되며, 예약 완료 후 6개월간 보관됩니다.
                    </p>
                  </label>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#bfa888] text-white rounded-full font-medium hover:bg-[#a68b6d] transition flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      예약 신청 중...
                    </>
                  ) : (
                    "예약 신청하기"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* 안내 사항 */}
          <div className="mt-8 bg-[#f5eee6] rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-[#bfa888]" />
              예약 안내
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-[#bfa888] mr-2">•</span>
                예약은 최소 3주 전에 신청해주시는 것이 좋습니다.
              </li>
              <li className="flex items-start">
                <span className="text-[#bfa888] mr-2">•</span>
                예약 확정은 전화 또는 문자로 안내드립니다.
              </li>
              <li className="flex items-start">
                <span className="text-[#bfa888] mr-2">•</span>
                예약 취소는 촬영 7일 전까지 연락주셔야 합니다.
              </li>
              <li className="flex items-start">
                <span className="text-[#bfa888] mr-2">•</span>
                일요일은 기본적으로 휴무이며, 매월 첫째, 셋째 일요일은 예약이 불가합니다.
              </li>
              <li className="flex items-start">
                <span className="text-[#bfa888] mr-2">•</span>
                궁금한 점이 있으시면 061-721-4800으로 문의해주세요.
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#333] py-8 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
