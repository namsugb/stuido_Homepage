"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, MessageSquare, Check } from "lucide-react"
import { submitReservation, type ReservationFormData } from "@/app/actions/reservation"

export default function ReservationClient() {
    const [formData, setFormData] = useState<ReservationFormData>({
        name: "",
        phone: "",
        date: "",
        time: "",
        shootingType: [] as string[],
        people: "",
        message: "",
        referall_source: "홈페이지",
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

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            shootingType: checked
                ? [...prev.shootingType, value]
                : prev.shootingType.filter((type) => type !== value)
        }))
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

        if (!formData.date) newErrors.date = "날짜를 선택해주세요"
        if (!formData.time) newErrors.time = "시간을 선택해주세요"
        if (formData.shootingType.length === 0) newErrors.shootingType = "촬영 유형을 선택해주세요"
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
            const { ...formDataWithoutEmail } = formData;
            const result = await submitReservation(formDataWithoutEmail);

            if (result.success) {
                setIsSubmitted(true)
                // 폼 초기화
                setFormData({
                    name: "",
                    phone: "",
                    date: "",
                    time: "",
                    shootingType: [],
                    people: "",
                    message: "",
                    referall_source: "홈페이지",
                })
            } else {
                setServerError(result.message || "예약 제출 중 오류가 발생했습니다.")
            }
        } catch (error) {
            console.error("예약 제출 오류:", error)
            setServerError("예약 제출 중 오류가 발생했습니다. 다시 시도해주세요.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // 성공 메시지 표시 후 폼으로 돌아가기
    const handleBackToForm = () => {
        setIsSubmitted(false)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">예약이 완료되었습니다!</h2>
                    <p className="text-gray-600 mb-6">
                        입력해주신 연락처로 확인 연락을 드리겠습니다.
                        <br />
                        감사합니다.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={handleBackToForm}
                            className="w-full bg-[#bfa888] text-white py-3 px-4 rounded-lg hover:bg-[#a8957a] transition-colors"
                        >
                            추가 예약하기
                        </button>
                        <Link
                            href="/"
                            className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            홈으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-lg font-medium">예약하기</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">예약하기</h1>
                        <p className="text-gray-600">
                            원하시는 날짜와 시간을 선택하여 예약해주세요.
                            <br />
                            빠른 시일 내에 연락드리겠습니다.
                        </p>
                    </div>

                    {serverError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{serverError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 이름 */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                이름 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfa888] ${errors.name ? "border-red-300" : "border-gray-300"
                                    }`}
                                placeholder="이름을 입력해주세요"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* 연락처 */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                연락처 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfa888] ${errors.phone ? "border-red-300" : "border-gray-300"
                                    }`}
                                placeholder="010-1234-5678"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        {/* 날짜와 시간 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    날짜 <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split("T")[0]}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfa888] ${errors.date ? "border-red-300" : "border-gray-300"
                                            }`}
                                    />
                                    {/* <button
                                        type="button"
                                        onClick={() => document.getElementById('date')?.focus()}
                                        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                        aria-label="달력 열기"
                                    >
                                        <Calendar className="w-5 h-5" />
                                    </button> */}
                                </div>
                                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                            </div>

                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                                    시간 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfa888] ${errors.time ? "border-red-300" : "border-gray-300"
                                        }`}
                                >
                                    <option value="">시간 선택</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                </select>
                                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                            </div>
                        </div>

                        {/* 촬영 유형 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                촬영 유형 <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: "가족사진", label: "가족사진" },
                                    { value: "리마인드웨딩", label: "리마인드웨딩" },
                                    { value: "칠순/팔순", label: "칠순/팔순" },
                                    { value: "장수기념", label: "장수기념" },
                                    { value: "프로필", label: "프로필" },
                                    { value: "증명사진", label: "증명사진" },
                                    { value: "복원", label: "복원" },
                                    { value: "우정", label: "우정" },
                                ].map((type) => (
                                    <label key={type.value} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={type.value}
                                            checked={formData.shootingType.includes(type.value)}
                                            onChange={handleCheckboxChange}
                                            className="rounded border-gray-300 text-[#bfa888] focus:ring-[#bfa888]"
                                        />
                                        <span className="text-sm text-gray-700">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.shootingType && <p className="mt-1 text-sm text-red-600">{errors.shootingType}</p>}
                        </div>

                        {/* 인원 수 */}
                        <div>
                            <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-2">
                                인원 수 <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="people"
                                    name="people"
                                    value={formData.people}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfa888] ${errors.people ? "border-red-300" : "border-gray-300"
                                        }`}
                                    placeholder="예: 성인 2명, 아이 1명"
                                />
                                <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.people && <p className="mt-1 text-sm text-red-600">{errors.people}</p>}
                        </div>

                        {/* 메시지 */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                메시지
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfa888]"
                                    placeholder="추가 요청사항이나 궁금한 점이 있으시면 작성해주세요"
                                />
                                <MessageSquare className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* 제출 버튼 */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#bfa888] text-white py-3 px-4 rounded-lg hover:bg-[#a8957a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "예약 중..." : "예약하기"}
                        </button>
                    </form>

                    {/* 연락처 정보 */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">문의사항이 있으시면</h3>
                        <p className="text-sm text-gray-600">
                            전화: <a href="tel:032-875-4788" className="text-[#bfa888] hover:underline">032-875-4788</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
