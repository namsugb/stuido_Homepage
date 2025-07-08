"use client";
import { usePathname } from "next/navigation";
import { MessageCircleMore, Phone } from "lucide-react";

export default function FloatingButtons() {
    const pathname = usePathname();
    if (pathname.startsWith("/manage-client")) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
            {/* 전화 */}
            <a
                href="tel:061-721-4800"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl text-[#bfa888] hover:bg-[#f5eee6] transition border border-[#bfa888] hover:scale-110"
                title="전화 문의"
            >
                <Phone className="w-9 h-9" />
            </a>
            {/* 네이버 톡톡 */}
            <a
                href="https://talk.naver.com/ct/wcaal4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#bfa888] shadow-xl text-white hover:bg-[#a68b6d] transition hover:scale-110"
                title="네이버 톡톡"
            >
                <MessageCircleMore className="w-9 h-9" />
            </a>
            {/* 예약하기 */}
            <a
                href="/reservation"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#bfa888] shadow-xl text-white hover:bg-[#a68b6d] transition text-lg font-semibold hover:scale-110"
                title="예약하기"
            >
                예약 <br /> 문의
            </a>
        </div>
    );
}
```

```html
"use client";
import { usePathname } from "next/navigation";
import { MessageCircleMore, Phone } from "lucide-react";

export default function FloatingButtons() {
    const pathname = usePathname();
    if (pathname.startsWith("/manage-client")) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
            {/* 전화 */}
            <a
                href="tel:061-721-4800"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl text-[#bfa888] hover:bg-[#f5eee6] transition border border-[#bfa888] hover:scale-110"
                title="전화 문의"
            >
                <Phone className="w-9 h-9" />
            </a>
            {/* 네이버 톡톡 */}
            <a
                href="https://talk.naver.com/ct/wcaal4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#bfa888] shadow-xl text-white hover:bg-[#a68b6d] transition hover:scale-110"
                title="네이버 톡톡"
            >
                <MessageCircleMore className="w-9 h-9" />
            </a>
            {/* 예약하기 */}
            <a
                href="/reservation"
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#bfa888] shadow-xl text-white hover:bg-[#a68b6d] transition text-lg font-semibold hover:scale-110"
                title="예약하기"
            >
                예약 <br /> 문의
            </a>
        </div>
    );
}