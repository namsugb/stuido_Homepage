import Link from "next/link";

export default function EventsPage() {
    return (
        <div className="min-h-screen mt-20 bg-[#f8f8f6]">
            <div className="container mx-auto px-6 py-10 flex justify-center">
                <img src="/event/events.jpg" alt="이벤트" className="w-full max-w-4xl h-auto object-contain" />
            </div>
            {/* 예약 안내 섹션 */}
            < section id="contact" className="bg-[#bfa888] py-20 text-white" >
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold">지금 예약하세요</h2>
                        <p className="mb-8 text-lg">
                            소중한 순간을 아침햇살 스튜디오와 함께하세요.
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
            </section >
        </div>
    )
}