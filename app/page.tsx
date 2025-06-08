"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Menu, MessageCircle, Phone, Calendar, Camera, User } from "lucide-react"

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const imagesLoadedCountRef = useRef(0)

  const sliderImages = [
    {
      src: "/slider/family-pink-portrait.jpeg",
      alt: "핑크 컨셉 가족 사진",
      bgColor: "#f9e6e6",
      title: "특별한 컨셉 촬영",
      description: "개성 있는 테마로 잊지 못할 추억을 만들어 드립니다",
    },
    {
      src: "/slider/wedding-portrait.jpeg",
      alt: "웨딩 촬영",
      bgColor: "#e8eef5",
      title: "인생의 빛나는 순간",
      description: "결혼이라는 특별한 여정의 시작을 아름답게 기록합니다",
    },
    {
      src: "/slider/traditional-family.jpeg",
      alt: "전통 한복 가족 사진",
      bgColor: "#f5f0e8",
      title: "소중한 가족의 순간",
      description: "세대를 아우르는 가족의 아름다운 이야기를 담습니다",
    },
  ]

  // 이미지 사전 로딩 함수 - 오류 수정
  const preloadImages = () => {
    // 이미지 로드 카운터 초기화
    imagesLoadedCountRef.current = 0
    setImagesLoaded(false)
    setFirstImageLoaded(false)

    // 모든 이미지 로드
    sliderImages.forEach((image, idx) => {
      const img = new Image()
      img.src = image.src
      img.onload = () => {
        imagesLoadedCountRef.current += 1
        if (idx === 0) {
          // 이미지가 렌더 가능한 상태인지 다시 확인
          if (img.complete) {
            requestAnimationFrame(() => {
              setFirstImageLoaded(true)
            })
          }
        }

        if (imagesLoadedCountRef.current === sliderImages.length) {
          setImagesLoaded(true)
        }
      }

      img.onerror = () => {
        // 첫 번째 이미지가 에러여도 바로 표시
        if (idx === 0) setFirstImageLoaded(true)
        // 이미지 로드 실패 시에도 카운터 증가
        imagesLoadedCountRef.current += 1
        console.error(`Failed to load image: ${image.src}`)
        // 모든 이미지 처리가 완료되면 상태 업데이트
        if (imagesLoadedCountRef.current === sliderImages.length) {
          setImagesLoaded(true)
        }
      }
    })
  }

  // 컴포넌트 마운트 시 이미지 사전 로딩
  useEffect(() => {
    // 이미지 로딩 시작
    preloadImages()

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))
  }

  // 자동 슬라이드 기능 - 8초로 설정
  useEffect(() => {
    // 이미지가 로드된 후에만 자동 슬라이드 시작
    if (isAutoPlaying && imagesLoaded) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 8000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, imagesLoaded])

  // 갤러리 이미지 데이터
  const galleryImages = [
    {
      src: "/gallery/KakaoTalk_20250523_002337024_07.jpg",
      alt: "핑크 컨셉 가족 사진",
      span: 1,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_14.jpg",
      alt: "LOVE 컨셉 가족 사진",
      span: 2,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_09.jpg",
      alt: "반려동물과 함께하는 가족 사진",
      span: 1,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_10.jpg",
      alt: "화사한 블루 컨셉 가족 사진",
      span: 2,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_12.jpg",
      alt: "창가에서 촬영한 가족 사진",
      span: 1,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_11.jpg",
      alt: "웨딩 기념 가족 사진",
      span: 1,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_08.jpg",
      alt: "핑크 컨셉 가족 사진",
      span: 2,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_13.jpg",
      alt: "웨딩 촬영",
      span: 1
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024_15.jpg",
      alt: "시니어 웨딩 촬영",
      span: 2,
    },
    {
      src: "/gallery/KakaoTalk_20250523_002337024.jpg",
      alt: "가족 생일 촬영",
      span: 1,
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative min-h-screen bg-white">


      {/* 메인 히어로 섹션 - 모던한 슬라이더 */}
      <section className="hero-section">
        {/* 슬라이더 배경 */}
        <div className="slider-row relative h-full w-full">
          {/* 이미지/오버레이: pointer-events-none, z-0 */}
          <div
            className="absolute inset-0 transition-colors duration-1000 z-0 pointer-events-none"
            style={{ backgroundColor: sliderImages[currentSlide].bgColor }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
          </div>

          {/* 로딩 인디케이터 */}
          {!firstImageLoaded && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-[#bfa888] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">이미지 로딩 중...</p>
              </div>
            </div>
          )}


          {/* 메인 이미지 슬라이더 - 네비게이션 고정, 가운데 영역만 움직임 */}
          {firstImageLoaded && (
            <div className="slider-center-area flex h-full mx-auto relative z-30">

              {/* 이미지: pointer-events-none → 그대로 유지 */}
              <div className="slider-image-container relative flex items-center justify-center mt-8 pointer-events-none">
                {sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"} pointer-events-none`}
                  >
                    <div className="relative h-full w-full flex items-center justify-center">
                      <div className="relative max-h-full max-w-full px-6 md:px-12">
                        <img
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          className="hero-slider-image object-contain object-center max-h-full max-w-full rounded-lg shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 텍스트/버튼: pointer-events-auto로 활성화 */}
              <div className="slider-text-container flex flex-col justify-center z-50 pointer-events-auto">
                <div className="slider-content-box mt-10">
                  <h2 className="slider-title">{sliderImages[currentSlide].title}</h2>
                  <p className="slider-description">{sliderImages[currentSlide].description}</p>
                  <div className="relative z-50 flex flex-row gap-3 items-center justify-center md:justify-start">
                    <Link href="/gallery" className="slider-btn bg-white text-black">갤러리 보기</Link>
                    <Link href="/reservation" className="slider-btn border border-white text-white">예약문의</Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section >

      {/* 스튜디오 소개 섹션 */}
      < section id="about" className="py-16" >
        <div className="container mx-auto px-2">
          <h2 className="mb-8 text-3xl font-bold text-center">상품 소개</h2>

          {/* 그리드 기반 카드 레이아웃 */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                title: "가족사진",
                description: "3대가 함께하는 가족사진부터 아이들의 성장 기록까지, 소중한 가족의 모든 순간을 담습니다.",
                image: "/product/big-family.jpg",
                category: "family",
              },
              {
                title: "리마인드웨딩",
                description: "결혼의 소중한 순간을 다시 한번 아름답게 기록하여 특별한 추억을 만들어 드립니다.",
                image: "/product/remind-wedding-updated.jpeg",
                category: "wedding",
              },
              {
                title: "칠순/팔순",
                description: "인생의 뜻깊은 순간을 품격있게 담아 가족 모두가 소중히 간직할 수 있는 사진을 선사합니다.",
                image: "/product/hanbok-couple-new.jpeg",
                category: "celebration",
              },
              {
                title: "장수",
                description: "100세 시대, 건강하고 행복한 노년의 모습을 아름답게 담아 소중한 기록으로 남겨드립니다.",
                image: "/product/senior-hanbok-new.jpeg",
                category: "longevity",
              },
              {
                title: "프로필",
                description: "개인의 매력과 개성을 살린 프로필 사진으로 특별한 인상을 남겨보세요.",
                image: "/product/profile-photo-new.jpeg",
                category: "profile",
              },
              {
                title: "증명",
                description: "취업, 입학 등에 필요한 다양한 규격의 증명사진을 전문적으로 촬영해 드립니다.",
                image: "/product/id-photo-new.jpeg",
                category: "id",
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={`/products?category=${item.category}`}
                className="rounded-lg bg-white p-2 pb-4 pt-2 shadow-2xl hover:shadow-md transition block"
              >
                <div className="mb-4 relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-8" />

      {/* 갤러리 섹션 */}
      < section id="gallery" className="bg-white py-20" >
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-black">갤러리</h2>

          {/* 그리드 기반 갤러리 레이아웃 */}
          <div className="gallery-grid">
            {galleryImages.slice(0, 8).map((image, index) => (
              <div key={index} className={`gallery-item ${index === 2 || index === 5 ? "span-2" : "span-1"}`}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="rounded-md w-full h-full object-fit"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="rounded-full border text-black border-black-800 px-8 py-3 font-medium transition hover:bg-gray-800 hover:text-white inline-block"
            >
              더 많은 작품 보기
            </Link>
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-8" />

      {/* 고객 후기 섹션 */}
      < section className="bg-white py-20" >
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">고객 후기</h2>
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 text-center">
                <p className="mb-6 text-lg italic text-gray-600">
                  "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록 배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진 결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다."
                </p>
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <img src="/main_gallery/family/family01.jpg" alt="3대 가족 촬영 예시" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 font-medium">김지영 고객님</p>
                <p className="text-sm text-gray-500">가족 촬영</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#bfa888]" : "bg-gray-300"}`}
                    aria-label={`후기 ${i + 1}로 이동`}
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-lg bg-white p-8 shadow-sm mt-4">
              <div className="mb-6 text-center">
                <p className="mb-6 text-lg italic text-gray-600">
                  "증명사진 촬영이 처음이라 긴장했는데, 작가님이 친절하게 포즈와 표정을 지도해주셔서 자연스럽게 잘 나왔어요. 빠른 결과물 전달도 만족스럽습니다!"
                </p>
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <img src="/main_gallery/id/id01.jpg" alt="증명사진 촬영 예시" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 font-medium">이수민 고객님</p>
                <p className="text-sm text-gray-500">증명사진 촬영</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === 1 ? "bg-[#bfa888]" : "bg-gray-300"}`}
                    aria-label={`후기 ${i + 1}로 이동`}
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-lg bg-white p-8 shadow-sm mt-4">
              <div className="mb-6 text-center">
                <p className="mb-6 text-lg italic text-gray-600">
                  "프로필 촬영을 했는데, 다양한 컨셉과 조명으로 여러 스타일을 시도해볼 수 있어서 좋았어요. 결과물도 세련되고 자연스럽게 나와서 매우 만족합니다."
                </p>
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <img src="/main_gallery/profile/profile01.jpg" alt="프로필 촬영 예시" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 font-medium">박정훈 고객님</p>
                <p className="text-sm text-gray-500">프로필 촬영</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === 2 ? "bg-[#bfa888]" : "bg-gray-300"}`}
                    aria-label={`후기 ${i + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-8" />

      {/* 예약 안내 섹션 */}
      < section id="contact" className="bg-[#bfa888] py-20 text-white" >
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">지금 예약하세요</h2>
            <p className="mb-8 text-lg">
              소중한 순간을 아침햇살 스튜디오와 함께하세요. 지금 예약하시면 10% 할인 혜택을 드립니다.
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

      {/* 푸터 */}
      < footer className="bg-[#333] py-12 text-white" >
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-bold">아침햇살 스튜디오</h3>
              <p className="mb-2 text-sm text-gray-300">소중한 순간을 영원히</p>
              <p className="text-sm text-gray-300">전라남도 순천시 조례동 1823-5</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">연락처</h3>
              <p className="mb-2 text-sm text-gray-300">전화: 061-721-4800</p>
              <p className="text-sm text-gray-300">이메일: info@achimhaessal.kr</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs">예약</span>
                <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs">주차</span>
                <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs">무선 인터넷</span>
                <span className="rounded-full bg-[#bfa888] px-2 py-1 text-xs">애완동물 동반</span>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">영업시간</h3>
              <p className="mb-2 text-sm text-gray-300">평일: 10:00 - 18:30</p>
              <p className="mb-2 text-sm text-gray-300">토요일: 10:00 - 18:30</p>
              <p className="mb-2 text-sm text-gray-300">일요일: 휴무</p>
              <p className="mb-2 text-sm text-gray-300">매월 첫째, 셋째 일요일 휴무</p>
              <p className="text-sm text-gray-300">사전예약시 촬영가능</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.
          </div>
        </div>
      </footer >
    </div >
  )
}
