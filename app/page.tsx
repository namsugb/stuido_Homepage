"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Menu, MessageCircle, Phone, Calendar, Camera, User } from "lucide-react"

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const imagesLoadedCountRef = useRef(0)

  const sliderImages = [
    {
      src: "/family-pink-portrait.jpeg",
      alt: "핑크 컨셉 가족 사진",
      bgColor: "#f9e6e6",
      title: "특별한 컨셉 촬영",
      description: "개성 있는 테마로 잊지 못할 추억을 만들어 드립니다",
    },
    {
      src: "/wedding-portrait.jpeg",
      alt: "웨딩 촬영",
      bgColor: "#e8eef5",
      title: "인생의 빛나는 순간",
      description: "결혼이라는 특별한 여정의 시작을 아름답게 기록합니다",
    },
    {
      src: "/traditional-family.jpeg",
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

    // 모든 이미지 로드
    sliderImages.forEach((image) => {
      const img = new Image()
      img.src = image.src
      img.onload = () => {
        // 이미지 로드 완료 시 카운터 증가
        imagesLoadedCountRef.current += 1
        // 모든 이미지가 로드되면 상태 업데이트
        if (imagesLoadedCountRef.current === sliderImages.length) {
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
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
    { src: "/gallery/KakaoTalk_20250523_002337024_13.jpg", 
      alt: "웨딩 촬영", 
      span: 1 },
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
    <div className="relative min-h-screen bg-[#f8f8f6]">
      {/* 헤더 섹션 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full bg-white flex items-center justify-center border border-gray-200">
                <img src="/logo.jpeg" alt="아침햇살 스튜디오 로고" className="h-full w-full object-contain" />
              </div>
              <span className="ml-3 text-lg font-medium text-gray-800">아침햇살 스튜디오</span>
            </Link>

            {/* 데스크톱 메뉴 */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#4a6741] transition">
                홈
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-[#4a6741] transition">
                소개
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-[#4a6741] transition">
                의상
              </Link>
              <Link href="#packages" className="text-gray-700 hover:text-[#4a6741] transition">
                패키지
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-[#4a6741] transition">
                연락처
              </Link>
              <Link
                href="/reservation"
                className="flex items-center bg-[#4a6741] text-white px-4 py-2 rounded-full hover:bg-[#3a5331] transition"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>예약하기</span>
              </Link>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="container mx-auto px-6">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center text-gray-700 hover:text-[#4a6741] transition">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7m7 7l2 2"
                    ></path>
                  </svg>
                  <span>홈</span>
                </Link>
                <Link href="#about" className="flex items-center text-gray-700 hover:text-[#4a6741] transition">
                  <User className="h-4 w-4 mr-2" />
                  <span>소개</span>
                </Link>
                <Link href="/gallery" className="flex items-center text-gray-700 hover:text-[#4a6741] transition">
                  <Camera className="h-4 w-4 mr-2" />
                  <span>의상</span>
                </Link>
                <Link href="#packages" className="flex items-center text-gray-700 hover:text-[#4a6741] transition">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>패키지</span>
                </Link>
                <Link href="#contact" className="flex items-center text-gray-700 hover:text-[#4a6741] transition">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>연락처</span>
                </Link>
                <Link
                  href="/reservation"
                  className="flex items-center bg-[#4a6741] text-white px-4 py-2 rounded-full hover:bg-[#3a5331] transition w-full justify-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>예약하기</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* 메인 히어로 섹션 - 모던한 슬라이더 */}
      <section className="hero-section">
        {/* 슬라이더 배경 */}
        <div
          className="absolute inset-0 transition-colors duration-1000 z-0"
          style={{ backgroundColor: sliderImages[currentSlide].bgColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>

        {/* 로딩 인디케이터 */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[#4a6741] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">이미지 로딩 중...</p>
            </div>
          </div>
        )}

        {/* 메인 이미지 슬라이더 */}
        <div
          className={`relative h-full w-full z-10 flex flex-col md:flex-row ${imagesLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        >
          {/* 이미지 컨테이너 */}
          <div className="slider-image-container flex items-center justify-center">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="relative max-h-full max-w-full px-6 md:px-12">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="hero-slider-image object-contain object-center rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 텍스트 컨테이너 */}
          <div className="slider-text-container flex items-center justify-center">
            <div className="slider-content-container">
              <div className="slider-content-box">
                <h2 className="slider-title">{sliderImages[currentSlide].title}</h2>
                <p className="slider-description">{sliderImages[currentSlide].description}</p>
                <div className="mt-6 flex items-center justify-center md:justify-start space-x-4">
                  <Link href="/gallery" className="slider-btn bg-white text-gray-900 hover:bg-gray-100">
                    갤러리 보기
                  </Link>
                  <Link href="/reservation" className="slider-btn bg-transparent border border-white hover:bg-white/10">
                    예약하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 슬라이더 내비게이션 */}
        <div className="slider-navigation">
          <button onClick={prevSlide} className="slider-nav-btn group pointer-events-auto" aria-label="이전 슬라이드">
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
          </button>
          <button onClick={nextSlide} className="slider-nav-btn group pointer-events-auto" aria-label="다음 슬라이드">
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 스튜디오 소개 섹션 */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-3xl font-bold">아침햇살 스튜디오 소개</h2>
            <div className="mb-12 text-lg leading-relaxed text-gray-700 space-y-4">
              <p>
                도심 속 아름다운 정원을 품은 아침햇살 스튜디오는 단순한 사진관이 아닌, 여러분의 소중한 이야기가 빛나는
                특별한 공간입니다.
              </p>

              <p>
                매 순간이 지나가도 그 감정만은 영원히 간직할 수 있도록, 저희는 빛과 그림자의 섬세한 조화 속에서
                여러분만의 진솔한 이야기를 담아냅니다. 자연광이 스며드는 따스한 공간에서, 꾸밈없는 웃음과 진심 어린
                감정이 가장 아름답게 빛나는 순간을 포착합니다.
              </p>

              <p>
                가족의 따스함, 새로운 시작을 알리는 웨딩, 인생의 귀중한 전환점을 기념하는 프로필까지—아침햇살 스튜디오는
                여러분의 모든 특별한 순간을 예술로 승화시킵니다.
              </p>

              <p className="text-sm text-gray-500 italic">
                가족사진 · 리마인드웨딩 · 증명사진 · 프로필 · 우정사진 · 흑백기념 · 반려동물 · 행사스냅 · 드론 VR촬영
              </p>
            </div>
          </div>

          {/* 그리드 기반 카드 레이아웃 */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                title: "가족사진",
                description: "3대가 함께하는 가족사진부터 아이들의 성장 기록까지, 소중한 가족의 모든 순간을 담습니다.",
                image: "/family-photo-updated.jpeg",
              },
              {
                title: "리마인드웨딩",
                description: "결혼의 소중한 순간을 다시 한번 아름답게 기록하여 특별한 추억을 만들어 드립니다.",
                image: "/remind-wedding-updated.jpeg",
              },
              {
                title: "칠순/팔순",
                description: "인생의 뜻깊은 순간을 품격있게 담아 가족 모두가 소중히 간직할 수 있는 사진을 선사합니다.",
                image: "/hanbok-couple-new.jpeg",
              },
              {
                title: "장수",
                description: "100세 시대, 건강하고 행복한 노년의 모습을 아름답게 담아 소중한 기록으로 남겨드립니다.",
                image: "/senior-hanbok-new.jpeg",
              },
              {
                title: "프로필",
                description: "개인의 매력과 개성을 살린 프로필 사진으로 특별한 인상을 남겨보세요.",
                image: "/profile-photo-new.jpeg",
              },
              {
                title: "증명",
                description: "취업, 입학 등에 필요한 다양한 규격의 증명사진을 전문적으로 촬영해 드립니다.",
                image: "/id-photo-new.jpeg",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg bg-white p-6 py-8 shadow-sm hover:shadow-md transition">
                <div className="mb-4 relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section id="gallery" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-black">갤러리</h2>

          {/* 그리드 기반 갤러리 레이아웃 */}
          <div className="gallery-grid">
            {galleryImages.slice(0, 8).map((image, index) => (
              <div key={index} className={`gallery-item ${index === 2 || index === 5 ? "span-2" : "span-1"}`}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="rounded-md w-full h-full object-cover"
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
      </section>

      {/* 촬영 패키지 섹션 */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">촬영 패키지</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "소가족 사진",
                price: "99,000원",
                image: "/package/wedding-portrait.jpeg", // 이미지 경로 추가
                features: ["두 가지 컨셉 촬영", 
                          "촬영 의상 무료 대여", 
                          "부모님 헤어&메이크업 무료", 
                          "고급 액자 1점 (28x36cm)",
                        "액자컷 수정 파일 제공"],
              },
              {
                title: "대가족 사진",
                price: "150,000원",
                image: "/package/family-photo-updated.jpeg",
                features: ["두 가지 컨셉 촬영", 
                  "촬영 의상 무료 대여", 
                  "부모님 헤어&메이크업 무료", 
                  "고급 액자 1점 (28x36cm)",
                "액자컷 수정 파일 제공"],
                featured: true,
              },
              {
                title: "칠순/팔순 상차림",
                price: "150,000원",
                image: "/package/hanbok-couple-new.jpeg",
                features: ["두 가지 컨셉 촬영", 
                  "촬영 의상 무료 대여", 
                  "부모님 헤어&메이크업 무료", 
                  "고급 액자 1점 (28x36cm)",
                "액자컷 수정 파일 제공"],
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden ${
                  pkg.featured ? "bg-[#e9efe7]" : "bg-white"
                } shadow-sm transition hover:shadow-md`}
              >


                {/* 패키지 이미지 */}
                <img
                  src={pkg.image}
                  alt={`${pkg.title} 이미지`}
                  className="w-full h-80 object-cover"
                />

                {/* 콘텐츠 영역 */}
                <div className="p-8">
                  <h3 className="mb-2 text-xl font-bold">{pkg.title}</h3>
                  <p className="mb-6 text-2xl font-bold text-[#4a6741]">{pkg.price}</p>
                  <ul className="mb-8 space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-[#4a6741]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/reservation"
                    className={`w-full rounded-full ${
                      pkg.featured
                        ? "bg-[#4a6741] text-white hover:bg-[#3a5331]"
                        : "border border-[#4a6741] text-[#4a6741] hover:bg-[#4a6741] hover:text-white"
                    } px-6 py-3 font-medium transition flex items-center justify-center`}
                  >
                    예약하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 고객 후기 섹션 */}
      <section className="bg-[#f8f8f6] py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">고객 후기</h2>
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 text-center">
                <p className="mb-6 text-lg italic text-gray-600">
                  "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록
                  배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진
                  결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다."
                </p>
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <img src="/remind-wedding-updated.jpeg" alt="고객 프로필" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 font-medium">김지영 고객님</p>
                <p className="text-sm text-gray-500">가족 촬영</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#4a6741]" : "bg-gray-300"}`}
                    aria-label={`후기 ${i + 1}로 이동`}
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-lg bg-white p-8 shadow-sm mt-4">
              <div className="mb-6 text-center">
                <p className="mb-6 text-lg italic text-gray-600">
                  "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록
                  배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진
                  결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다."
                </p>
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <img src="/remind-wedding-updated.jpeg" alt="고객 프로필" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 font-medium">김지영 고객님</p>
                <p className="text-sm text-gray-500">가족 촬영</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#4a6741]" : "bg-gray-300"}`}
                    aria-label={`후기 ${i + 1}로 이동`}
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-lg bg-white p-8 shadow-sm mt-4">
              <div className="mb-6 text-center">
                <p className="mb-6 text-lg italic text-gray-600">
                  "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록
                  배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진
                  결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다."
                </p>
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <img src="/remind-wedding-updated.jpeg" alt="고객 프로필" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 font-medium">김지영 고객님</p>
                <p className="text-sm text-gray-500">가족 촬영</p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#4a6741]" : "bg-gray-300"}`}
                    aria-label={`후기 ${i + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 안내 섹션 */}
      <section id="contact" className="bg-[#4a6741] py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">지금 예약하세요</h2>
            <p className="mb-8 text-lg">
              소중한 순간을 아침햇살 스튜디오와 함께하세요. 지금 예약하시면 10% 할인 혜택을 드립니다.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:061-721-4800"
                className="rounded-full bg-white px-8 py-3 font-medium text-[#4a6741] transition hover:bg-gray-100"
              >
                061-721-4800
              </a>
              <Link
                href="/reservation"
                className="rounded-full border border-white px-8 py-3 font-medium transition hover:bg-white hover:text-[#4a6741]"
              >
                온라인 예약
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#333] py-12 text-white">
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
                <span className="rounded-full bg-[#4a6741] px-2 py-1 text-xs">예약</span>
                <span className="rounded-full bg-[#4a6741] px-2 py-1 text-xs">주차</span>
                <span className="rounded-full bg-[#4a6741] px-2 py-1 text-xs">무선 인터넷</span>
                <span className="rounded-full bg-[#4a6741] px-2 py-1 text-xs">애완동물 동반</span>
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
      </footer>

      {/* 플로팅 버튼 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-gray-800 shadow-lg transition hover:bg-yellow-500">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
