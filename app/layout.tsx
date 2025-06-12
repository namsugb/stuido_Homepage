import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Calendar, CalendarCheck, MessageCircleMore, Phone } from "lucide-react"
import FloatingButtons from "@/components/FloatingButtons"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "아침햇살 스튜디오",
  description: "가족 사진 스튜디오",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <title>아침햇살 스튜디오 | 순천 가족사진, 프로필, 리마인드웨딩 전문</title>
        <meta name="description" content="전라남도 순천 아침햇살 스튜디오는 가족사진, 프로필, 리마인드웨딩, 증명사진 등 다양한 촬영을 전문적으로 제공합니다. 소중한 순간을 아름답게 남겨드립니다." />
        <meta name="keywords" content="순천 가족사진, 순천 스튜디오, 프로필 사진, 리마인드웨딩, 증명사진, 아침햇살 스튜디오, 가족사진관" />
        <meta property="og:title" content="아침햇살 스튜디오 | 순천 가족사진, 프로필, 리마인드웨딩 전문" />
        <meta property="og:description" content="전라남도 순천 아침햇살 스튜디오에서 가족, 프로필, 리마인드웨딩, 증명사진 등 다양한 촬영을 경험하세요." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://achimhaessal.kr" />
        <meta property="og:image" content="/logo/logo.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="아침햇살 스튜디오 | 순천 가족사진, 프로필, 리마인드웨딩 전문" />
        <meta name="twitter:description" content="순천 가족사진, 프로필, 리마인드웨딩, 증명사진 전문 스튜디오" />
        <meta name="twitter:image" content="/logo/logo.jpeg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-2">
            <div className="flex items-center justify-center py-6">
              <Link href="/" className="flex items-center">
                <div className="h-10 w-6 md:h-12 md:w-12 overflow-hidden rounded-full bg-white flex items-center justify-center border border-gray-200">
                  <img src="/logo/logo.jpeg" alt="아침햇살 스튜디오 로고" className="h-full w-full object-contain" />
                </div>
                <div className="ml-2 flex flex-col text-base md:text-lg font-bold text-gray-800 leading-tight min-w-[80px]">
                  <span className="whitespace-nowrap">아침햇살</span>
                  <span className="whitespace-nowrap">스튜디오</span>
                </div>
              </Link>

              {/* 메뉴: 모바일/데스크톱 모두 가로 스크롤 */}
              <nav className="flex items-center space-x-6 overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide ml-8">
                <Link href="/about" className="text-gray-700 hover:text-[#bfa888] transition">
                  소개
                </Link>
                <Link href="/gallery" className="text-gray-700 hover:text-[#bfa888] transition">
                  갤러리
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-[#bfa888] transition">
                  상품소개
                </Link>
                <Link href="/events" className="text-gray-700 hover:text-[#bfa888] transition">
                  이벤트
                </Link>
                {/* <Link href="/gallery" className="text-gray-700 hover:text-[#bfa888] transition">
                  의상
                </Link> */}
                <Link
                  href="/reservation"
                  className="flex items-center bg-[#bfa888] text-white px-4 py-2 rounded-full hover:bg-[#a68b6d] transition"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>예약문의</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <FloatingButtons />
      </body>
    </html>
  )
}
