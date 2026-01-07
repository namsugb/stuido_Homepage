"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// 이벤트 타입 정의
interface Event {
    id: number;
    image: string;
    width: number;
    height: number;
    soldOut: boolean;
}

export default function EventsClient() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);

    const events: Event[] = [
        {
            id: 3,
            image: "/event/event_04_v2.jpg",
            width: 300,
            height: 300,
            soldOut: false,
        },
        {
            id: 0,
            image: "/event/event_01_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
        },
        {
            id: 1,
            image: "/event/event_02_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
        },
        {
            id: 2,
            image: "/event/event_03_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
        },
        {
            id: 4,
            image: "/event/event_05_v2.jpg",
            width: 300,
            height: 300,
            soldOut: true,
        },
    ];

    const openModal = (event: Event) => {
        if (event.soldOut) return; // Sold Out된 이벤트는 클릭 불가
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const toggleEventDetails = () => {
        setShowEventDetails(!showEventDetails);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isModalOpen]);

    return (
        <div className="min-h-screen bg-white">

            {/* 이벤트 카드 섹션 */}
            <section id="events" className="mt-32">
                <h1 className="text-3xl font-medium text-center mb-4"> 🎉 진행중인 이벤트 🎉</h1>
                <p className="text-sm font-light text-center mb-8"> 이벤트에 참여해 가족들과 행복한 시간을 기록해보세요!</p>
                <div className="mx-auto px-4 my-4">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {/* 이벤트 카드 데이터 반복 */}
                        {events.map((event) => (
                            <div key={event.id} className={`bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 ${event.soldOut
                                ? 'cursor-not-allowed opacity-60'
                                : 'cursor-pointer hover:shadow-lg'
                                }`}>
                                <div className="relative w-full pt-[100%]" onClick={() => openModal(event)}>
                                    <Image
                                        src={event.image}
                                        alt="이벤트 이미지"
                                        width={event.width}
                                        height={event.height}
                                        className={`absolute top-0 left-0 w-full h-full object-fill rounded-lg transition-transform duration-300 ${event.soldOut ? '' : 'hover:scale-105'
                                            }`}
                                    />
                                    {/* Sold Out 표시 */}
                                    {event.soldOut && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg">
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

            {/* 이벤트 내용 자세히 보기 버튼 */}
            <div className="text-center mt-12 mb-8">
                <button
                    onClick={toggleEventDetails}
                    className="bg-[#bfa888] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a89a7a] transition-colors duration-200 flex items-center mx-auto gap-2"
                >
                    {showEventDetails ? '이벤트 내용 접기' : '이벤트 내용 자세히 보기'}
                    <svg
                        className={`w-5 h-5 transition-transform duration-200 ${showEventDetails ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* 이벤트 이미지 - 접기/펼치기 기능 */}
            {showEventDetails && (
                <div className="container mx-auto px-6 py-10 flex justify-center animate-fade-in">
                    <img src="/event/events.jpg" alt="이벤트" className="w-full max-w-4xl h-auto object-contain" />
                </div>
            )}

            {/* 이미지 모달 */}
            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeModal}>
                    <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* 닫기 버튼 */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* 이미지 */}
                        <div className="relative">
                            <Image
                                src={selectedEvent.image}
                                alt="이벤트 이미지"
                                width={selectedEvent.width}
                                height={selectedEvent.height}
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        <div className="text-center my-4">
                            <p className="text-gray-500 text-sm mb-2">궁금한 사항이 있으신가요? 편하게 문의 하세요!</p>
                            <a
                                href="tel:061-721-4800"
                                className="inline-block bg-[#bfa888] text-white px-6 py-2 rounded-full font-medium hover:bg-[#a89a7a] transition-colors duration-200"
                            >
                                예약문의
                            </a>
                        </div>

                    </div>
                </div>
            )}


            {/* 예약 안내 섹션 */}
            <section id="contact" className="bg-[#bfa888] mt-8 py-12 text-white">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-thin">궁금한 사항이 있으신가요?</h2>
                        <p className="mb-8 text-lg">
                            편하게 문의 하세요!
                        </p>
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