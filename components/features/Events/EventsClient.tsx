"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Event {
    id: number
    title: string
    image: string
    width: number
    height: number
    soldOut: boolean
    modalImages: string[]
}

const toModalImagePath = (folderName: string, fileName: string) => {
    return encodeURI(`/event/modal/${folderName}/${fileName}`)
}

const event19ModalImages = [
    "가정의달 맞이 원본촬영 이벤트 19만원 1.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 2.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 3.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 4.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 5.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 6.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 7.jpg",
    "가정의달 맞이 원본촬영 이벤트 19만원 8.jpg",
].map((fileName) => toModalImagePath("19modal", fileName))

export default function EventsClient() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const events: Event[] = [
        {
            id: 0,
            title: "오픈 이벤트",
            image: "/event/event_04_v2.jpg",
            width: 300,
            height: 300,
            soldOut: false,
            modalImages: ["/event/event_04_v2.jpg"],
        },
        {
            id: 1,
            title: "가정의달 맞이 원본촬영 이벤트 19만원",
            image: "/event/event_07_v2.jpg",
            width: 300,
            height: 300,
            soldOut: false,
            modalImages: event19ModalImages,
        },
        {
            id: 2,
            title: "마감된 이벤트",
            image: "/event/event_01_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
            modalImages: ["/event/event_01_v2.jpg"],
        },
        {
            id: 3,
            title: "마감된 이벤트",
            image: "/event/event_02_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
            modalImages: ["/event/event_02_v2.jpg"],
        },
        {
            id: 4,
            title: "마감된 이벤트",
            image: "/event/event_03_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
            modalImages: ["/event/event_03_v2.jpg"],
        },
        {
            id: 5,
            title: "마감된 이벤트",
            image: "/event/event_05_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
            modalImages: ["/event/event_05_v2.jpg"],
        },
    ]

    const openModal = (event: Event) => {
        if (event.soldOut) return
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedEvent(null)
    }

    useEffect(() => {
        if (!isModalOpen) return

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal()
            }
        }

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.body.style.overflow = originalOverflow
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isModalOpen])

    return (
        <div className="min-h-screen bg-white">
            <section id="events" className="mt-32">
                <h1 className="mb-4 text-center text-3xl font-medium">🎉 진행중인 이벤트 🎉</h1>
                <p className="mb-8 text-center text-sm font-light">이벤트에 참여해 가족들과 행복한 시간을 기록해보세요!</p>
                <div className="mx-auto my-4 px-4">
                    <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className={`overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ${event.soldOut
                                    ? "cursor-not-allowed opacity-60"
                                    : "cursor-pointer hover:shadow-lg"
                                    }`}
                            >
                                <div className="relative w-full pt-[100%]" onClick={() => openModal(event)}>
                                    <Image
                                        src={event.image}
                                        alt={`${event.title} 이미지`}
                                        width={event.width}
                                        height={event.height}
                                        className={`absolute left-0 top-0 h-full w-full rounded-lg object-fill transition-transform duration-300 ${event.soldOut ? "" : "hover:scale-105"
                                            }`}
                                    />
                                    {event.soldOut && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                            <div className="rounded-full bg-red-600 px-4 py-2 text-lg font-bold text-white">
                                                SOLD OUT
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 z-50 bg-black/70 p-4" onClick={closeModal}>
                    <div
                        className="mx-auto flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative border-b border-[#efe7dc] px-6 py-5">
                            <button
                                onClick={closeModal}
                                aria-label="이벤트 모달 닫기"
                                className="absolute right-4 top-4 rounded-full bg-[#f6f1ea] p-2 text-gray-600 transition hover:bg-[#eadfce] hover:text-gray-900"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="pr-12 text-xl font-semibold text-[#6e573f]">{selectedEvent.title}</h2>
                            <p className="mt-1 text-sm text-gray-500">이벤트 이미지 {selectedEvent.modalImages.length}장이 표시됩니다.</p>
                        </div>

                        <div className="overflow-y-auto bg-[#fcfaf7] px-4 py-4 sm:px-6">
                            <div className="grid grid-cols-1 gap-4">
                                {selectedEvent.modalImages.map((modalImage, index) => (
                                    <div
                                        key={`${selectedEvent.id}-${index}`}
                                        className="overflow-hidden rounded-2xl border border-[#efe7dc] bg-white shadow-sm"
                                    >
                                        <img
                                            src={modalImage}
                                            alt={`${selectedEvent.title} 상세 이미지 ${index + 1}`}
                                            className="h-auto w-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-[#efe7dc] px-6 py-4">
                            <div className="flex flex-row items-center justify-center gap-3">
                                <Link
                                    href="/reservation"
                                    className="inline-block rounded-full bg-[#bfa888] px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-[#a89a7a]"
                                >
                                    예약하기
                                </Link>
                                <a
                                    href="tel:061-721-4800"
                                    className="inline-block rounded-full border-2 border-[#bfa888] px-8 py-3 font-medium text-[#bfa888] transition-colors duration-200 hover:bg-[#bfa888] hover:text-white"
                                >
                                    전화 문의
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section id="contact" className="mt-8 bg-[#bfa888] py-12 text-white">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-thin">궁금한 사항이 있으신가요?</h2>
                        <p className="mb-8 text-lg">편하게 문의해 주세요.</p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href="tel:061-721-4800"
                                className="rounded-full bg-white px-8 py-3 font-medium text-[#bfa888] transition hover:bg-[#f5eee6]"
                            >
                                061-721-4800
                            </a>
                            <Link
                                href="/reservation"
                                className="rounded-full border border-white px-8 py-3 font-medium transition hover:bg-white hover:text-[#bfa888]"
                            >
                                온라인 예약
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

