"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function EventPopup() {
    const [showEventPopup, setShowEventPopup] = useState(false)
    const [dontShowAgain, setDontShowAgain] = useState(false)

    useEffect(() => {
        const hidePopup = localStorage.getItem('hideEventPopup')
        if (!hidePopup) {
            setShowEventPopup(true)
        }
    }, [])

    const handleClosePopup = () => {
        if (dontShowAgain) {
            localStorage.setItem('hideEventPopup', 'true')
        }
        setShowEventPopup(false)
    }

    if (!showEventPopup) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 md:p-6 max-w-sm md:max-w-lg w-full relative animate-fade-in">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl md:text-3xl"
                    onClick={handleClosePopup}
                    aria-label="팝업 닫기"
                >
                    ×
                </button>
                <div className="flex justify-center mb-3">
                    <Image
                        src="/image.png"
                        alt="가족사진 특별 이벤트 안내 이미지"
                        width={400}
                        height={300}
                        className="max-w-full h-auto rounded-md"
                    />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-center">🎉 이벤트 안내</h3>
                <p className="text-xs md:text-sm text-gray-700 text-center mb-3">
                    8월 31일 까지 <span className="text-red-500">선착순 15팀!</span> 이벤트 진행 중입니다.<br />
                    지금 바로 예약하고 혜택을 받아보세요!
                </p>
                <div className="flex items-center justify-center mb-3">
                    <input
                        type="checkbox"
                        id="dontShowAgain"
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                        className="mr-2 w-4 h-4 text-[#bfa888] border-gray-300 rounded focus:ring-[#bfa888] focus:ring-2"
                    />
                    <label htmlFor="dontShowAgain" className="text-xs text-gray-600">
                        다시 보지 않기
                    </label>
                </div>
                <div className="text-center">
                    <Link
                        href="/events"
                        className="inline-block bg-[#bfa888] text-white px-4 md:px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#a89a7a] transition-colors duration-200"
                        onClick={handleClosePopup}
                    >
                        이벤트 자세히 보기
                    </Link>
                </div>
            </div>
        </div>
    )
}
