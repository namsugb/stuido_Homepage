import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR, Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Calendar, CalendarCheck, MessageCircleMore, Phone } from "lucide-react"
import FloatingButtons from "@/components/FloatingButtons"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr"
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display"
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

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

        <meta name="description" content="전라남도 순천 아침햇살 스튜디오는 가족사진, 프로필, 리마인드웨딩, 증명사진 등 다양한 촬영을 전문적으로 제공합니다. 소중한 순간을 아름답게 남겨드립니다." />
        <meta name="keywords" content="순천 가족사진, 순천 스튜디오, 프로필 사진, 리마인드웨딩, 증명사진, 아침햇살 스튜디오, 가족사진관" />
        <meta property="og:title" content="아침햇살 스튜디오 | 순천 가족사진, 프로필, 리마인드웨딩 전문" />
        <meta property="og:description" content="전라남도 순천 아침햇살 스튜디오에서 가족, 프로필, 리마인드웨딩, 증명사진 등 다양한 촬영을 경험하세요. 소중한 순간을 아름답게 남겨드립니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://achimhaessal.kr" />
        <meta property="og:image" content="/slider/slider1_desktop.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="아침햇살 스튜디오 대표 작품 - 가족사진" />
        <meta property="og:site_name" content="아침햇살 스튜디오" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@achimhaessal" />
        <meta name="twitter:title" content="아침햇살 스튜디오 | 순천 가족사진, 프로필, 리마인드웨딩 전문" />
        <meta name="twitter:description" content="순천 가족사진, 프로필, 리마인드웨딩, 증명사진 전문 스튜디오. 소중한 순간을 아름답게 남겨드립니다." />
        <meta name="twitter:image" content="/slider/slider1_desktop.jpeg" />
        <meta name="twitter:image:alt" content="아침햇살 스튜디오 대표 작품 - 가족사진" />

        {/* 네이버 검색 최적화 */}
        <meta name="naver-site-verification" content="be77199758e7c465cccd457df58da26627d38659" />
        <meta property="article:author" content="아침햇살 스튜디오" />
        <meta property="article:publisher" content="아침햇살 스튜디오" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* 네이버 이미지 갤러리 최적화 */}
        <meta name="subject" content="아침햇살 스튜디오 - 순천 가족사진 전문" />
        <meta name="content-language" content="ko" />
        <meta name="revisit-after" content="1 days" />
        <meta name="reply-to" content="contact@achimhaessal.kr" />
        <meta name="category" content="Photography, Studio, Family Photo" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* 추가 이미지 정보 */}
        <link rel="image_src" href="/slider/slider1_desktop.jpeg" />
        <meta name="thumbnail" content="/slider/slider1_desktop.jpeg" />

        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "아침햇살 스튜디오",
              "description": "전라남도 순천 가족사진, 프로필, 리마인드웨딩, 증명사진 전문 스튜디오",
              "image": [
                "https://achimhaessal.kr/slider/slider1_desktop.jpeg",
                "https://achimhaessal.kr/slider/slider2_desktop.jpeg",
                "https://achimhaessal.kr/slider/slider3_desktop.jpeg",
                "https://achimhaessal.kr/main_gallery/family/[크기변환]004A0344_(2).jpg",
                "https://achimhaessal.kr/main_product/big-family-package.jpg"
              ],
              "logo": "https://achimhaessal.kr/logo/logo.jpeg",
              "url": "https://achimhaessal.kr",
              "telephone": "061-721-4800",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "순천시",
                "addressRegion": "전라남도",
                "addressCountry": "KR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "34.9506",
                "longitude": "127.4872"
              },
              "openingHours": "Mo-Su 09:00-18:00",
              "priceRange": "$$",
              "serviceType": ["가족사진", "프로필사진", "리마인드웨딩", "증명사진"],
              "areaServed": ["순천시", "전라남도"],
              "hasMap": "https://map.naver.com/v5/search/아침햇살스튜디오",
              "paymentAccepted": ["현금", "카드"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "사진촬영 서비스",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "가족사진 촬영",
                      "description": "소중한 가족과의 추억을 아름답게 담아드립니다"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "프로필사진 촬영",
                      "description": "개인 프로필 및 비즈니스용 사진 촬영"
                    }
                  }
                ]
              },
              "mainEntity": {
                "@type": "ImageGallery",
                "name": "아침햇살 스튜디오 작품 갤러리",
                "description": "가족사진, 프로필, 리마인드웨딩 전문 촬영 작품",
                "image": [
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://achimhaessal.kr/slider/slider1_desktop.jpeg",
                    "name": "가족사진",
                    "description": "따뜻한 가족사진 촬영",
                    "caption": "가족사진"
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://achimhaessal.kr/slider/slider2_desktop.jpeg",
                    "name": "프로필사진",
                    "description": "전문적인 프로필 촬영",
                    "caption": "프로필"
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://achimhaessal.kr/slider/slider3_desktop.jpeg",
                    "name": "리마인드웨딩",
                    "description": "소중한 추억을 되살리는 리마인드웨딩",
                    "caption": "리마인드웨딩"
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://achimhaessal.kr/slider/slider4_desktop.jpeg",
                    "name": "한복촬영",
                    "description": "전통 한복을 입은 아름다운 촬영",
                    "caption": "한복"
                  },
                  {
                    "@type": "ImageObject",
                    "contentUrl": "https://achimhaessal.kr/slider/slider5_desktop.jpeg",
                    "name": "커플사진",
                    "description": "사랑하는 연인과의 특별한 순간",
                    "caption": "커플"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${notoSansKR.variable} ${playfairDisplay.variable} ${inter.variable}`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-2">
            <div className="flex items-center justify-center py-6">
              <Link href="/" className="flex items-center">
                <div className="h-10 w-6 md:h-12 md:w-12 overflow-hidden rounded-full bg-white flex items-center justify-center border border-gray-200">
                  <img src="/logo/logo_01.jpeg" alt="아침햇살 스튜디오 로고" className="h-full w-full object-contain" />
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
                  이벤트🎉
                </Link>
                <Link href="/restoration" className="text-gray-700 hover:text-[#bfa888] transition">
                  복원
                </Link>
                {/* <Link href="/gallery" className="text-gray-700 hover:text-[#bfa888] transition">
                  의상0
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


        <main>
          {children}
        </main>

        {/* Floating Buttons */}
        <FloatingButtons />

        {/* 푸터 */}
        <footer className="bg-[#333] py-12 text-white">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-lg font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">아침햇살 스튜디오</h3>
                <p className="mb-2 text-sm text-gray-300 font-korean">소중한 순간을 영원히</p>
                <p className="text-sm text-gray-300 font-korean">전라남도 순천시 조례동 1823-5</p>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">연락처</h3>
                <p className="mb-2 text-sm text-gray-300 font-korean">전화: 061-721-4800</p>
                <p className="mb-2 text-sm text-gray-300 font-korean">이메일: mirim0423@naver.com</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs font-korean">예약</span>
                  <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs font-korean">주차</span>
                  <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs font-korean">무선 인터넷</span>
                  <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs font-korean">애완동물 동반</span>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">영업시간</h3>
                <p className="mb-2 text-sm text-gray-300 font-korean">평일: 10:00 - 18:30</p>
                <p className="mb-2 text-sm text-gray-300 font-korean">토요일: 10:00 - 18:30</p>
                <p className="mb-2 text-sm text-gray-300 font-korean">일요일: 예약 촬영만 진행</p>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400 font-korean">
              © {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.<br />
              대표 : 남유행, 사업자등록번호: 416-10-35417
            </div>
          </div>
        </footer >
      </body>
    </html>
  )
}