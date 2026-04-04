"use client";
import { usePathname } from "next/navigation";
import { MessageCircleMore, Phone } from "lucide-react";

export default function FloatingButtons() {
    const pathname = usePathname();
    if (pathname.startsWith("/manage-client")) return null;

    return (
        <div className="fixed bottom-3 right-3 z-50 flex flex-col gap-3 justify-center md:items-end">
            {/* 전화 */}
            <a
                href="tel:061-721-4800"
                className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full bg-white shadow-xl text-[#bfa888] hover:bg-[#f5eee6] transition border border-[#bfa888] hover:scale-110"
                title="전화 문의"
            >
                <Phone className="w-7 h-7 md:w-9 md:h-9" />
            </a>
            {/* 네이버 톡톡 */}
            <a
                href="https://talk.naver.com/ct/wcaal4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#bfa888] shadow-xl text-white hover:bg-[#a68b6d] transition hover:scale-110"
                title="네이버 톡톡"
            >
                <MessageCircleMore className="w-7 h-7 md:w-9 md:h-9" />
            </a>
            {/* 예약하기 */}
            <a
                href="/reservation"
                className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#bfa888] shadow-xl text-white hover:bg-[#a68b6d] transition text-sm md:text-xl font-semibold hover:scale-110"
                title="예약하기"
            >
                예약
            </a>
        </div>
    );
}