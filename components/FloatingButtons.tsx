"use client";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircleMore, Phone } from "lucide-react";

export default function FloatingButtons() {
    const pathname = usePathname();
    if (pathname.startsWith("/manage-client")) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
            {/* 전화 */}
            <a
                href="tel:061-721-4800"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg text-[#bfa888] hover:bg-[#f5eee6] transition border border-[#bfa888]"
                title="전화 문의"
            >
                <Phone className="w-7 h-7" />
            </a>
            {/* 네이버 톡톡 */}
            <a
                href="https://talk.naver.com/ct/wcaal4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#19ce60] shadow-lg text-white hover:bg-[#13b152] transition"
                title="네이버 톡톡"
            >
                <MessageCircleMore className="w-7 h-7" />
            </a>
            {/* 예약하기 */}
            <a
                href="/reservation"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#bfa888] shadow-lg text-white hover:bg-[#a68b6d] transition"
                title="예약하기"
            >
                <CalendarCheck className="w-7 h-7" />
            </a>
        </div>
    );
} 