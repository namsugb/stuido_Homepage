"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
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
      src: "/slider/family-pink-portrait.jpeg",
      alt: "핑크 컨셉 가족 사진",
      bgColor: "#CECFCF",
      title: "특별한 컨셉 촬영",
      description: "개성 있는 테마로 잊지 못할 추억을 만들어 드립니다",
    },
    {
      src: "/slider/wedding-portrait.jpeg",
      alt: "웨딩 촬영",
      bgColor: "#A5877D",
      title: "인생의 빛나는 순간",
      description: "결혼의 소중한 순간을 다시 한번 아름답게 기록하여 특별한 추억을 만들어 드립니다.",
    },
    {
      src: "/slider/traditional-family.jpeg",
      alt: "전통 한복 가족 사진",
      bgColor: "#D8DCE7",
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

      {/* 이벤트 팝업 모달 */}
      {showEventPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={handleClosePopup}
              aria-label="팝업 닫기"
            >
              ×
            </button>
            <div className="flex justify-center mb-4">
              <img src="/image.png" alt="가족사진 특별 이벤트 안내 이미지" className="max-w-full h-auto rounded-md" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">🎉 이벤트 안내</h3>
            <p className="text-gray-700 text-center mb-4">
              선착순 30명! 촬영 예약 고객님께<br />
              <span className="font-semibold text-[#bfa888]">고급 액자 증정</span> 이벤트 진행 중입니다.<br />
              지금 바로 예약하고 혜택을 받아보세요!
            </p>
            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="mr-2 w-4 h-4 text-[#bfa888] border-gray-300 rounded focus:ring-[#bfa888] focus:ring-2"
              />
              <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
                다시 보지 않기
              </label>
            </div>
            <div className="text-center">
              <Link
                href="/events"
                className="inline-block bg-[#bfa888] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#a89a7a] transition-colors duration-200"
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


          {/* 메인 이미지 슬라이더 - 전체 폭 이미지 */}
          {firstImageLoaded && (
            <div className="absolute inset-0 z-30">
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "scale-100" : "opacity-0 scale-105"}`}
                  style={{ backgroundColor: image.bgColor }}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-contain object-center"
                  />
                  {/* 감성적인 문구 오버레이 */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h2>
                      <p className="text-lg md:text-xl opacity-90">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-32" />

      {/* 스튜디오 소개 섹션 */}
      <section id="about">
        <div className="container mx-auto px-2">
          <h2 className="mb-8 text-3xl font-bold text-center">상품 소개</h2>

          {/* 그리드 기반 카드 레이아웃 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-8">
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
            ].map((product, index) => (
              <Link
                key={index}
                href={`/products?category=${product.category}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col w-full"
              >
                {/* 이미지 영역 */}
                <div className="w-full aspect-[2/3]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 정보 영역 */}
                <div className="p-2 md:p-3">
                  <h3 className="text-xs md:text-base font-bold mb-1 text-gray-900">{product.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed line-clamp-3">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-32" />

      {/* 갤러리 섹션 */}
      < section id="gallery" className="bg-white" >
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-black">갤러리</h2>

          {/* 그리드 기반 갤러리 레이아웃 */}
          <div className="gallery-grid">
            {galleryImages.slice(0, 8).map((image, index) => (
              <div key={index} className={`gallery-item ${index === 2 || index === 5 ? "span-2" : "span-1"}`}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
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
              더 많은 작품 보기
            </Link>
          </div>
        </div>
      </section >

      <div className="w-full h-px bg-gray-200 my-8" />

      {/* 고객 후기 섹션 */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">고객 후기</h2>
          <div className="mx-auto max-w-2xl">
            {/* 첫 번째 슬라이더: 가족/증명/프로필 */}
            {(() => {
              const reviews1 = [
                {
                  text: "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록 배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진 결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다.",
                  img: "/main_gallery/family/family01.jpg",
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
                              <img src={review.img} alt={review.alt} className="h-full w-full object-cover" />
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
                  img: "/main_gallery/remind/remind_윤혜원_(10).jpg",
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
                  img: "/main_gallery/family/family02.jpg",
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
                              <img src={review.img} alt={review.alt} className="h-full w-full object-cover" />
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

      <div className="w-full h-px bg-gray-200 my-8" />

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
              <p className="text-sm text-gray-300">이메일: mirim0423@naver.com</p>
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
              <p className="mb-2 text-sm text-gray-300">일요일: 예약 촬영만 진행</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.<br />
            대표 : 남유행, 사업자등록번호: 416-10-35417
          </div>
        </div>
      </footer >
    </div >
  )
}