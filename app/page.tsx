"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Menu, MessageCircle, Phone, Calendar, Camera, User } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const imagesLoadedCountRef = useRef(0)
  // 이벤트 팝업 상태
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // localStorage에서 "다시 보지 않기" 상태 확인
    const hidePopup = localStorage.getItem('hideEventPopup');
    if (!hidePopup) {
      setShowEventPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideEventPopup', 'true');
    }
    setShowEventPopup(false);
  };

  const sliderImages = [
    {
      src: "/slider/slider1_desktop.jpeg",
      srcMobile: "/slider/slider1_mobile.jpeg",
      alt: "웨딩 촬영",
      bgColor: "#D8DCE7",
      title: "사랑이 꽃피는 시간",
      description: "가족의 아름다운 시간을 감동적인 작품으로 담아냅니다.",
      desktoptextbackground: false,
      mobiletextbackground: false,
    },
    {
      src: "/slider/slider2_desktop.jpeg",
      srcMobile: "/slider/slider2_mobile.jpeg",
      alt: "가족 사진",
      bgColor: "#CECFCF",
      title: "우리 가족의 이야기",
      description: "세대를 이어 전할 소중한 추억을 기록합니다",
      desktoptextbackground: true,
      mobiletextbackground: false
    },
    {
      src: "/slider/slider3_desktop.jpeg",
      srcMobile: "/slider/slider3_mobile.jpeg",
      alt: "개인 프로필",
      bgColor: "#A5877D",
      title: "당신만의 매력",
      description: "아름다운 나의 모습을 간직할 수 있는 작품으로 표현해드립니다.",
      desktoptextbackground: true,
      mobiletextbackground: false,
    },
    {
      src: "/slider/slider4_desktop.jpeg",
      srcMobile: "/slider/slider4_mobile.jpeg",
      alt: "우정 사진",
      bgColor: "#D8DCE7",
      title: "함께하는 행복",
      description: "가족과 함께하는 즐거운 추억을 특별하게 남겨드립니다",
      desktoptextbackground: false,
      mobiletextbackground: false,
    },
    {
      src: "/slider/slider5_desktop.jpeg",
      srcMobile: "/slider/slider5_mobile.jpeg",
      alt: "컨셉 사진",
      bgColor: "#CECFCF",
      title: "상상이 현실로",
      description: "당신이 꿈꾸던 모든 모습을 사진에 담아 표현해드립니다",
      desktoptextbackground: false,
      mobiletextbackground: true,
    },
    {
      src: "/slider/slider6_desktop.jpeg",
      srcMobile: "/slider/slider6_mobile.jpeg",
      alt: "돌잔치 사진",
      bgColor: "#A5877D",
      title: "영원한 순간",
      description: "시간이 흘러도 변치 않을 아름다운 순간을 담아냅니다",
      desktoptextbackground: true,
      mobiletextbackground: true,
    },
    {
      src: "/slider/slider7_desktop.jpeg",
      srcMobile: "/slider/slider7_mobile.jpeg",
      alt: "돌잔치 사진",
      bgColor: "#A5877D",
      title: "감동의 순간들",
      description: "인생의 소중한 이야기를 기록합니다",
      desktoptextbackground: true,
      mobiletextbackground: false,
    },

  ]

  // 개선된 이미지 사전 로딩 함수
  const preloadImages = () => {
    // 이미지 로드 카운터 초기화
    imagesLoadedCountRef.current = 0
    setImagesLoaded(false)
    setFirstImageLoaded(false)

    // 첫 번째 이미지를 우선 로드
    const firstImage = sliderImages[0]
    const firstImgDesktop = new window.Image()
    const firstImgMobile = new window.Image()

    // 첫 번째 이미지 로드 완료 시 즉시 표시
    const handleFirstImageLoad = () => {
      if (firstImgDesktop.complete || firstImgMobile.complete) {
        requestAnimationFrame(() => {
          setFirstImageLoaded(true)
        })
      }
    }

    firstImgDesktop.onload = handleFirstImageLoad
    firstImgMobile.onload = handleFirstImageLoad
    firstImgDesktop.onerror = () => {
      console.error(`Failed to load first desktop image: ${firstImage.src}`)
      setFirstImageLoaded(true)
    }
    firstImgMobile.onerror = () => {
      console.error(`Failed to load first mobile image: ${firstImage.srcMobile}`)
      setFirstImageLoaded(true)
    }

    // 첫 번째 이미지 로드 시작
    firstImgDesktop.src = firstImage.src
    firstImgMobile.src = firstImage.srcMobile

    // 나머지 이미지들은 지연 로드
    setTimeout(() => {
      sliderImages.slice(1).forEach((image, idx) => {
        const imgDesktop = new window.Image()
        const imgMobile = new window.Image()

        const handleImageLoad = () => {
          if (imgDesktop.complete && imgMobile.complete) {
            imagesLoadedCountRef.current += 1
            if (imagesLoadedCountRef.current === sliderImages.length - 1) {
              setImagesLoaded(true)
            }
          }
        }

        imgDesktop.onload = handleImageLoad
        imgMobile.onload = handleImageLoad
        imgDesktop.onerror = () => {
          console.error(`Failed to load desktop image: ${image.src}`)
          handleImageLoad()
        }
        imgMobile.onerror = () => {
          console.error(`Failed to load mobile image: ${image.srcMobile}`)
          handleImageLoad()
        }

        imgDesktop.src = image.src
        imgMobile.src = image.srcMobile
      })
    }, 100) // 100ms 후 나머지 이미지 로드 시작
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

  // 자동 슬라이드 기능 - 7초로 설정
  useEffect(() => {
    // 이미지가 로드된 후에만 자동 슬라이드 시작
    if (isAutoPlaying && imagesLoaded) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 7000)
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

  // 화면 클릭으로 슬라이드 전환
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickPosition = clickX / rect.width

    // 화면 왼쪽 절반 클릭시 이전 슬라이드, 오른쪽 절반 클릭시 다음 슬라이드
    if (clickPosition < 0.5) {
      prevSlide()
    } else {
      nextSlide()
    }
  }

  return (
    <div className="relative min-h-screen bg-white">

      {/* 이벤트 팝업 모달 */}
      {showEventPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-lg px-8 py-10 md:p-6 max-w-sm md:max-w-lg w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl md:text-3xl"
              onClick={handleClosePopup}
              aria-label="팝업 닫기"
            >
              ×
            </button>
            <div className=" flex justify-center mb-3">
              <Image
                src="/image.png"
                alt="가족사진 특별 이벤트 안내 이미지"
                width={400}
                height={300}
                className="max-w-full h-auto rounded-md"
              />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2 text-center font-noto">🎉 이벤트 안내</h3>
            <p className="text-xs md:text-sm text-gray-700 text-center mb-3 font-noto">
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
      )}


      {/* 메인 히어로 섹션 - 모던한 슬라이더 */}
      <section className="hero-section">
        {/* 슬라이더 배경 */}
        <div className="slider-row relative h-full w-full">

          {/* 로딩 인디케이터 - 첫 번째 이미지만 로드되면 숨김 */}
          {!firstImageLoaded && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-3 border-[#bfa888] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-sm text-gray-600 animate-pulse">잠시만 기다려주세요...</p>
              </div>
            </div>
          )}


          {/* 메인 이미지 슬라이더 - 전체 폭 이미지 */}
          {firstImageLoaded && (
            <div className="absolute inset-0 z-30 cursor-pointer" onClick={handleSliderClick}>
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "scale-100" : "opacity-0 scale-105"}`}
                  style={{ backgroundColor: image.bgColor }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover object-center hidden md:block"
                    priority={index === 0} // 첫 번째 이미지만 우선 로딩
                    quality={85} // 품질을 85%로 설정하여 파일 크기 줄임
                    placeholder="blur" // 블러 플레이스홀더 사용
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <Image
                    src={image.srcMobile || "/placeholder.svg"}
                    alt={image.alt}
                    width={768}
                    height={1024}
                    className="w-full h-full object-cover object-center md:hidden"
                    priority={index === 0} // 첫 번째 이미지만 우선 로딩
                    quality={85} // 품질을 85%로 설정하여 파일 크기 줄임
                    placeholder="blur" // 블러 플레이스홀더 사용
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  {/* 감성적인 문구 오버레이 */}
                  <div className="absolute inset-0  my-6 p-8 text-black max-w-2xl mx-auto">
                    <div className={`text-center ${image.desktoptextbackground ? 'md:bg-gray-100/30 md:rounded-lg md:px-6 md:py-4' : ''} ${image.mobiletextbackground ? 'bg-gray-100/50 p-4 rounded-lg md:bg-transparent md:p-0 md:rounded-none' : ''}`}>
                      <h2 className="text-2xl md:text-3xl text-pretty font-serif">{image.title}</h2>
                      <p className="text-lg md:text-xl opacity-90 text-pretty">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section >


      {/* 상품 섹션 */}
      <section id="about">
        <div className="container mx-auto px-2 mt-6 mb-12">

          <Image src="/logo/logo.jpeg" alt="아침햇살 스튜디오 로고" width={200} height={200} className="mb-6 mx-auto" />
          <h2 className="mb-6 text-3xl text-center font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">상품 소개</h2>
          {/* <div className="flex mb-8 leading-8 tracking-normal italic text-justify flex-col items-center justify-center gap-0">
            <Image src="/logo/logo.jpeg" alt="아침햇살 스튜디오 로고" width={100} height={100} className=" mb-8" />
            <h2 className="mb-8 text-3xl text-center font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">상품 소개</h2>
          </div> */}
          <p className="text-lg font-light font-korean mt-2 mb-12 md:text-2xl text-[#bfa888] text-center leading-relaxed text-pretty italic">
            "아침햇살 스튜디오의 다양한 상품들을 확인해보세요".
          </p>


          {/* 그리드 기반 카드 레이아웃 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-2">
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
                description: "소중한 분의 생신을 기념하는 특별한 촬영을 진행합니다.",
                image: "/product/hanbok-couple-new.jpeg",
                category: "celebration",
              },
              {
                title: "장수기념",
                description: "할머니, 할아버지의 특별한 순간을 아름답게 기록합니다.",
                image: "/product/senior-hanbok-new.jpeg",
                category: "longevity",
              },
              {
                title: "프로필",
                description: "개인의 매력을 최대한 끌어내는 프로필 사진을 촬영합니다.",
                image: "/product/profile-photo-new.jpeg",
                category: "profile",
              },
              {
                title: "증명사진",
                description: "취업, 여권, 비자 등 다양한 용도의 증명사진을 전문적으로 촬영합니다.",
                image: "/product/id-photo-new.jpeg",
                category: "id",
              },
              // {
              //   title: "복원",
              //   description: "오래된 사진을 현대적인 기술로 복원하여 소중한 추억을 되살려드립니다.",
              //   image: "/product/restoration.jpg",
              //   category: "restoration",
              // },
              {
                title: "우정",
                description: "친구들과의 특별한 순간을 아름답게 기록하여 평생의 추억을 만들어드립니다.",
                image: "/product/friendship.jpg",
                category: "friendship",
              },
              {
                title: "",
                description: "",
                image: "/logo/logo.jpeg",
                category: "wedding",
              },
            ].map((product, index) => (
              <Link
                key={index}
                href={`/products?category=${product.category}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col w-full"
              >
                {/* 이미지 영역 */}
                <div className="w-full aspect-[2/3]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 정보 영역 */}
                <div className="p-2 md:p-3">
                  <h3 className="text-xs md:text-base font-bold mb-1 text-gray-900 font-noto">{product.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed line-clamp-3 font-noto">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 mt-0 mb-24" />

      {/* 갤러리 섹션 */}
      < section id="gallery" className="bg-white" >
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">갤러리</h2>
          <p className="text-lg font-light font-korean mt-2 mb-12 md:text-2xl text-[#bfa888] text-center leading-relaxed text-pretty">
            "아침햇살 스튜디오의 다양한 의상과 컨셉을 확인해보세요".
          </p>

          {/* 그리드 기반 갤러리 레이아웃 */}
          <div className="gallery-grid">
            {galleryImages.slice(0, 8).map((image, index) => (
              <div key={index} className={`gallery-item ${index === 2 || index === 5 ? "span-2" : "span-1"}`}>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="rounded-md w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="rounded-full border text-black border-black-800 px-8 py-3 font-medium transition hover:bg-gray-800 hover:text-white inline-block"
            >
              더 많은 의상&컨셉 보기
            </Link>
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-8" />

      {/* 고객 후기 섹션 */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-light font-korean italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">고객 후기</h2>
          <div className="mx-auto max-w-2xl">
            {/* 첫 번째 슬라이더: 가족/증명/프로필 */}
            {(() => {
              const reviews1 = [
                {
                  text: "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록 배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진 결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다.",
                  img: "/main_gallery/family/[크기변환]004A0344_(2).jpg",
                  alt: "3대 가족 촬영 예시",
                  name: "김0영 고객님",
                  type: "가족 촬영"
                },
                {
                  text: "증명사진 촬영이 처음이라 긴장했는데, 작가님이 친절하게 포즈와 표정을 지도해주셔서 자연스럽게 잘 나왔어요. 빠른 결과물 전달도 만족스럽습니다!",
                  img: "/main_gallery/id/id01.jpg",
                  alt: "증명사진 촬영 예시",
                  name: "이0민 고객님",
                  type: "증명사진 촬영"
                },
                {
                  text: "프로필 촬영을 했는데, 다양한 컨셉과 조명으로 여러 스타일을 시도해볼 수 있어서 좋았어요. 결과물도 세련되고 자연스럽게 나와서 매우 만족합니다.",
                  img: "/main_gallery/profile/profile01.jpg",
                  alt: "프로필 촬영 예시",
                  name: "박0훈 고객님",
                  type: "프로필 촬영"
                }
              ];
              const [index1, setIndex1] = useState(0);
              useEffect(() => {
                const timer = setInterval(() => {
                  setIndex1((prev) => (prev + 1) % reviews1.length);
                }, 7000);
                return () => clearInterval(timer);
              }, [reviews1.length]);
              return (
                <Carousel opts={{ loop: true }}>
                  <CarouselContent style={{ transform: `translateX(-${index1 * 100}%)`, transition: 'transform 0.5s' }}>
                    {reviews1.map((review, i) => (
                      <CarouselItem key={i}>
                        <div className="relative rounded-lg bg-white p-8 shadow-sm">
                          <div className="mb-6 text-center">
                            <p className="mb-6 text-lg italic text-gray-600">"{review.text}"</p>
                            <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                              <Image
                                src={review.img}
                                alt={review.alt}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-2 font-medium">{review.name}</p>
                            <p className="text-sm text-gray-500">{review.type}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              );
            })()}
            {/* 두 번째 슬라이더: 리마인드/취업/30주년 가족사진 */}
            {(() => {
              const reviews2 = [
                {
                  text: "결혼 20주년 리마인드 촬영을 했는데, 처음 결혼할 때의 설렘이 다시 느껴졌어요. 작가님이 자연스럽게 이끌어주셔서 부부 모두 만족스러운 결과물을 얻었습니다.",
                  img: "/main_gallery/remind/[크기변환]0A8A8108-1216 디아섹_1차.JPG",
                  alt: "리마인드 촬영 예시",
                  name: "최0정 고객님",
                  type: "리마인드웨딩 촬영"
                },
                {
                  text: "취업용 증명사진을 촬영했는데, 표정과 각도까지 세심하게 신경써주셔서 자신감 있는 사진을 얻을 수 있었습니다. 덕분에 면접도 잘 보고 왔어요!",
                  img: "/main_gallery/id/id02.jpg",
                  alt: "취업 증명사진 예시",
                  name: "정0진 고객님",
                  type: "취업 증명사진 촬영"
                },
                {
                  text: "부모님 결혼 30주년 기념으로 가족사진을 촬영했는데, 온 가족이 함께한 시간이 너무 소중하게 남았습니다. 사진도 너무 예쁘게 나와서 모두 만족했어요.",
                  img: "/main_gallery/remind/[크기변환]004A0344-1.jpg",
                  alt: "30주년 가족사진 예시",
                  name: "이0훈 고객님",
                  type: "30주년 가족사진 촬영"
                }
              ];
              const [index2, setIndex2] = useState(0);
              useEffect(() => {
                const timer = setInterval(() => {
                  setIndex2((prev) => (prev + 1) % reviews2.length);
                }, 7000);
                return () => clearInterval(timer);
              }, [reviews2.length]);
              return (
                <Carousel opts={{ loop: true }} className="mt-12">
                  <CarouselContent style={{ transform: `translateX(-${index2 * 100}%)`, transition: 'transform 0.5s' }}>
                    {reviews2.map((review, i) => (
                      <CarouselItem key={i}>
                        <div className="relative rounded-lg bg-white p-8 shadow-sm">
                          <div className="mb-6 text-center">
                            <p className="mb-6 text-lg italic text-gray-600">"{review.text}"</p>
                            <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
                              <Image
                                src={review.img}
                                alt={review.alt}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-2 font-medium">{review.name}</p>
                            <p className="text-sm text-gray-500">{review.type}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              );
            })()}
          </div>
        </div>
      </section>



      {/* 예약 안내 섹션 */}
      < section id="contact" className="bg-[#bfa888] py-20 text-white" >
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-light font-korean underline-offset-8 underline decoration-1 decoration-[#bfa888]">지금 예약하세요</h2>
            <p className="mb-8 text-lg font-korean">
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

      {/* 푸터 */}
      < footer className="bg-[#333] py-12 text-white" >
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
    </div >
  )
}