'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import OptimizedImage from "@/components/ui/OptimizedImage"
import { imagePresets } from "@/components/ui/ImagePresets"

// 이벤트 타입 정의
interface Event {
    id: number
    title: string
    description: string
    image: string
    width: number
    height: number
}

export default function EventsClient() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showEventDetails, setShowEventDetails] = useState(false)

    const events: Event[] = [
        {
            id: 1,
            title: "오픈 이벤트",
            description: "오픈 이벤트 설명",
            image: "/event/event1.jpg",
            width: 300,
            height: 300,
        },
        {
            id: 2,
            title: "오픈 이벤트",
            description: "오픈 이벤트 설명",
            image: "/event/event2.jpg",
            width: 300,
            height: 300,
        }
    ]

    const openModal = (event: Event) => {
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedEvent(null)
    }

    const toggleEventDetails = () => {
        setShowEventDetails(!showEventDetails)
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape)
            return () => document.removeEventListener('keydown', handleEscape)
        }
    }, [isModalOpen])

    return (
        <div className="min-h-screen bg-white">
            {/* 이벤트 카드 섹션 */}
            <section id="events" className="page-content">
                <h1 className="text-3xl font-medium text-center font-noto mb-4"> 🎉 진행중인 이벤트 🎉</h1>
                <p className="text-sm font-light text-center font-noto mb-8"> 이벤트에 참여해 가족들과 행복한 시간을 기록해보세요!</p>
                <div className="mx-auto px-4 my-4">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {/* 이벤트 카드 데이터 반복 */}
                        {events.map((event) => (
                            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                <div className="relative w-full pt-[100%]" onClick={() => openModal(event)}>
                                    <OptimizedImage
                                        src={event.image}
                                        alt={`${event.title} - 아침햇살 스튜디오 진행 이벤트 이미지`}
                                        width={event.width}
                                        height={event.height}
                                        className="absolute top-0 left-0 w-full h-full object-fill rounded-lg hover:scale-105 transition-transform duration-300"
                                        {...imagePresets.event}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 이벤트 내용 자세히 보기 버튼 */}
            <div className="text-center mt-12 mb-8">
                <button
                    onClick={toggleEventDetails}
                    className="bg-[#bfa888] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a89a7a] transition-colors duration-200 flex items-center mx-auto gap-2"
                >
                    {showEventDetails ? "이벤트 내용 접기" : "이벤트 내용 자세히 보기"}
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 ${showEventDetails ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* 이벤트 상세 내용 */}
            {showEventDetails && (
                <section className="mx-auto px-4 mb-12">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-center mb-6 text-[#bfa888]">🎉 오픈 이벤트 상세 내용 🎉</h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-[#bfa888] pl-6">
                                <h3 className="text-xl font-semibold mb-2">📸 이벤트 기간</h3>
                                <p className="text-gray-700">2024년 1월 1일 ~ 2024년 12월 31일</p>
                            </div>

                            <div className="border-l-4 border-[#bfa888] pl-6">
                                <h3 className="text-xl font-semibold mb-2">🎁 이벤트 혜택</h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li>• 가족사진 촬영 시 20% 할인</li>
                                    <li>• 증명사진 촬영 시 무료 액자 제공</li>
                                    <li>• 리마인드웨딩 촬영 시 추가 컷 10장 무료</li>
                                    <li>• 모든 촬영 시 디지털 원본 파일 무료 제공</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-[#bfa888] pl-6">
                                <h3 className="text-xl font-semibold mb-2">📋 참여 방법</h3>
                                <ol className="text-gray-700 space-y-2">
                                    <li>1. 전화 또는 온라인으로 예약</li>
                                    <li>2. 이벤트 참여 의사 표시</li>
                                    <li>3. 촬영 진행</li>
                                    <li>4. 혜택 적용 및 결과물 수령</li>
                                </ol>
                            </div>

                            <div className="border-l-4 border-[#bfa888] pl-6">
                                <h3 className="text-xl font-semibold mb-2">⚠️ 주의사항</h3>
                                <ul className="text-gray-700 space-y-2">
                                    <li>• 이벤트 혜택은 중복 적용되지 않습니다</li>
                                    <li>• 예약 취소 시 이벤트 혜택이 적용되지 않을 수 있습니다</li>
                                    <li>• 이벤트 기간 내 촬영 완료 시에만 혜택이 적용됩니다</li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Link
                                href="/reservation"
                                className="inline-block bg-[#bfa888] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a89a7a] transition-colors duration-200 mr-4"
                            >
                                예약하기
                            </Link>
                            <a
                                href="tel:061-721-4800"
                                className="inline-block border-2 border-[#bfa888] text-[#bfa888] px-8 py-3 rounded-full font-medium hover:bg-[#bfa888] hover:text-white transition-colors duration-200"
                            >
                                전화 문의
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* 모달 */}
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh]">
                        <div className="flex justify-center items-center relative">
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold absolute top-2 right-2"
                            >
                                ×
                            </button>
                            <div className="mt-12 text-center">
                                <OptimizedImage
                                    src={selectedEvent.image}
                                    alt={`${selectedEvent.title} - 아침햇살 스튜디오 이벤트 상세 이미지`}
                                    width={selectedEvent.width}
                                    height={selectedEvent.height}
                                    className="w-full h-auto rounded-lg mx-auto"
                                    {...imagePresets.event}
                                />
                            </div>
                        </div>



                        <div className="text-center my-4">
                            <Link
                                href="/reservation"
                                className="inline-block bg-[#bfa888] text-white px-6 py-2 rounded-full font-medium hover:bg-[#a89a7a] transition-colors duration-200"
                            >
                                예약하기
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
