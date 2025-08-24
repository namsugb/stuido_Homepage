"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Menu, MessageCircle, Phone, Calendar, Camera, User, X, Clock, Users, Check } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import OptimizedImage from "@/components/ui/OptimizedImage"
import { imagePresets } from "@/components/ui/ImagePresets"
import HeroSlider from "@/components/features/HeroSlider/HeroSlider"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"
import EventPopup from "@/components/features/EventPopup/EventPopup"

export default function MainPageClient() {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
    const [currentProductIndex, setCurrentProductIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const isMobile = useIsMobile()
    const productContainerRef = useRef<HTMLDivElement>(null)


    // 모바일 드래그 이벤트 핸들러
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isMobile) return

        setIsDragging(true)
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        setStartX(clientX)
        setCurrentX(clientX)
    }

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isMobile || !isDragging) return

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        setCurrentX(clientX)
        const diff = clientX - startX

        // 드래그 범위 제한 (첫 번째 사진의 왼쪽과 마지막 사진의 오른쪽까지만)
        const maxDragLeft = currentProductIndex * 320  // 왼쪽으로 드래그할 수 있는 최대 거리
        const maxDragRight = (7 - currentProductIndex) * 320 + 160  // 오른쪽으로 드래그할 수 있는 최대 거리 (여유 추가)

        let limitedDiff = diff
        if (diff > 0) {  // 오른쪽으로 드래그 (왼쪽 카드로 이동)
            limitedDiff = Math.min(diff, maxDragLeft)
        } else {  // 왼쪽으로 드래그 (오른쪽 카드로 이동)
            limitedDiff = Math.max(diff, -maxDragRight)
        }

        setDragOffset(limitedDiff)
    }

    const handleDragEnd = () => {
        if (!isMobile || !isDragging) return

        setIsDragging(false)

        // 드래그한 만큼 카드 위치 업데이트하여 고정
        const cardWidth = 320
        const moveDistance = Math.round(dragOffset / cardWidth)

        if (moveDistance !== 0) {
            const newIndex = Math.max(0, Math.min(7, currentProductIndex - moveDistance))
            setCurrentProductIndex(newIndex)
        }

        // dragOffset을 0으로 설정하여 추가 이동 방지
        setDragOffset(0)
    }

    // 터치 이벤트를 위한 useEffect (모바일에서만)
    useEffect(() => {
        if (!isMobile || !productContainerRef.current) return

        const container = productContainerRef.current

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                e.preventDefault()
                e.stopPropagation()
                setIsDragging(true)
                setStartX(e.touches[0].clientX)
                setCurrentX(e.touches[0].clientX)
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1 && isDragging) {
                e.preventDefault()
                e.stopPropagation()
                const diff = e.touches[0].clientX - startX

                // 드래그 범위 제한 (첫 번째 사진의 왼쪽과 마지막 사진의 오른쪽까지만)
                const maxDragLeft = currentProductIndex * 320  // 왼쪽으로 드래그할 수 있는 최대 거리
                const maxDragRight = (7 - currentProductIndex) * 320 + 160  // 오른쪽으로 드래그할 수 있는 최대 거리 (여유 추가)

                let limitedDiff = diff
                if (diff > 0) {  // 오른쪽으로 드래그 (왼쪽 카드로 이동)
                    limitedDiff = Math.min(diff, maxDragLeft)
                } else {  // 왼쪽으로 드래그 (오른쪽 카드로 이동)
                    limitedDiff = Math.max(diff, -maxDragRight)
                }

                setDragOffset(limitedDiff)
            }
        }

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (isDragging) {
                setIsDragging(false)

                // 드래그한 만큼 카드 위치 업데이트하여 고정
                const cardWidth = 320
                const moveDistance = Math.round(dragOffset / cardWidth)

                if (moveDistance !== 0) {
                    const newIndex = Math.max(0, Math.min(7, currentProductIndex - moveDistance))
                    setCurrentProductIndex(newIndex)
                }

                // dragOffset을 0으로 설정하여 추가 이동 방지
                setDragOffset(0)
            }
        }

        container.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true })
        container.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true })
        container.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true })

        return () => {
            container.removeEventListener('touchstart', handleTouchStart)
            container.removeEventListener('touchmove', handleTouchMove)
            container.removeEventListener('touchend', handleTouchEnd)
        }
    }, [isMobile, isDragging, startX, dragOffset, currentProductIndex])

    // 갤러리 이미지 데이터
    const galleryImages = [
        {
            src: "/gallery/KakaoTalk_20250523_002337024_07.jpg",
            alt: "핑크 컨셉 가족 사진 - 아름다운 드레스와 함께한 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_08.jpg",
            alt: "핑크 컨셉 가족 사진 - 따뜻한 분위기의 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_09.jpg",
            alt: "핑크 컨셉 가족 사진 - 자연스러운 포즈의 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_10.jpg",
            alt: "핑크 컨셉 가족 사진 - 행복한 순간을 담은 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_11.jpg",
            alt: "핑크 컨셉 가족 사진 - 아름다운 배경의 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_12.jpg",
            alt: "핑크 컨셉 가족 사진 - 따뜻한 미소의 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_13.jpg",
            alt: "핑크 컨셉 가족 사진 - 소중한 추억을 담은 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_14.jpg",
            alt: "핑크 컨셉 가족 사진 - 아름다운 의상의 가족 촬영",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024_15.jpg",
            alt: "핑크 컨셉 가족 사진 - 행복한 가족의 모습",
            span: 1,
        },
        {
            src: "/gallery/KakaoTalk_20250523_002337024.jpg",
            alt: "핑크 컨셉 가족 촬영 작품",
            span: 1,
        },
    ]

    // 상품 데이터
    const products = [
        {
            id: 1,
            category: "가족사진",
            title: "소가족 패키지",
            price: "150,000원",
            originalPrice: "200,000원",
            duration: "2시간",
            people: "2-4명",
            image: "/main_product/small-family.jpg",
            features: ["원본 100장", "보정 30장", "앨범 1권", "액자 1개"],
            description: "소중한 가족의 추억을 담는 기본 패키지",
            popular: true
        },
        {
            id: 2,
            category: "가족사진",
            title: "대가족 패키지",
            price: "250,000원",
            originalPrice: "300,000원",
            duration: "3시간",
            people: "5명 이상",
            image: "/main_product/big-family.jpg",
            features: ["원본 150장", "보정 50장", "앨범 1권", "액자 2개"],
            description: "대가족을 위한 프리미엄 패키지",
            popular: false
        },
        {
            id: 3,
            category: "웨딩",
            title: "리마인드 웨딩",
            price: "300,000원",
            originalPrice: "400,000원",
            duration: "4시간",
            people: "2명",
            image: "/main_product/remind-wedding.jpg",
            features: ["원본 200장", "보정 80장", "앨범 1권", "액자 3개"],
            description: "특별한 순간을 다시 한번 아름답게",
            popular: true
        },
        {
            id: 4,
            category: "프로필",
            title: "프로필 촬영",
            price: "80,000원",
            originalPrice: "100,000원",
            duration: "1시간",
            people: "1명",
            image: "/main_product/profile.jpg",
            features: ["원본 50장", "보정 20장", "액자 1개"],
            description: "개인의 매력을 최대한 끌어내는 프로필",
            popular: false
        },
        {
            id: 5,
            category: "웨딩",
            title: "신랑신부 패키지",
            price: "350,000원",
            originalPrice: "450,000원",
            duration: "5시간",
            people: "2명",
            image: "/main_product/couple.jpg",
            features: ["원본 250장", "보정 100장", "앨범 2권", "액자 4개"],
            description: "신랑신부만의 특별한 순간을 아름답게",
            popular: true
        },
        {
            id: 6,
            category: "가족사진",
            title: "친구 패키지",
            price: "180,000원",
            originalPrice: "220,000원",
            duration: "2.5시간",
            people: "3-6명",
            image: "/main_product/friend.jpg",
            features: ["원본 120장", "보정 40장", "앨범 1권", "액자 2개"],
            description: "친구들과 함께하는 즐거운 촬영",
            popular: false
        },
        {
            id: 7,
            category: "특별",
            title: "장수 패키지",
            price: "200,000원",
            originalPrice: "250,000원",
            duration: "3시간",
            people: "가족 전체",
            image: "/main_product/longevity.jpg",
            features: ["원본 150장", "보정 60장", "앨범 1권", "액자 3개"],
            description: "어르신의 장수를 축하하는 특별한 패키지",
            popular: true
        },
        {
            id: 8,
            category: "비즈니스",
            title: "직장인 프로필",
            price: "120,000원",
            originalPrice: "150,000원",
            duration: "1.5시간",
            people: "1명",
            image: "/main_product/job.jpg",
            features: ["원본 80장", "보정 30장", "액자 1개"],
            description: "비즈니스에 최적화된 전문적인 프로필",
            popular: false
        }
    ]

    // 리뷰 데이터
    const reviews = [
        {
            id: 1,
            name: "김가족",
            text: "정말 만족스러운 촬영이었습니다. 작가님이 친절하게 포즈를 잡아주시고, 결과물도 너무 예뻐요!",
            rating: 5,
            image: "/gallery/KakaoTalk_20250523_002337024_07.jpg"
        },
        {
            id: 2,
            name: "이부부",
            text: "리마인드 웨딩 촬영을 했는데, 처음 결혼할 때보다 더 아름답게 나왔어요. 추천합니다!",
            rating: 5,
            image: "/gallery/KakaoTalk_20250523_002337024_08.jpg"
        },
        {
            id: 3,
            name: "박프로필",
            text: "프로필 촬영을 했는데, 제가 생각했던 것보다 훨씬 자연스럽고 예쁘게 나왔습니다.",
            rating: 5,
            image: "/gallery/KakaoTalk_20250523_002337024_09.jpg"
        }
    ]

    return (
        <div className="min-h-screen bg-white w-full overflow-x-hidden">
            {/* EventPopup */}
            <EventPopup />

            {/* 히어로 슬라이더 */}
            <HeroSlider />


            {/* 상품 섹션 */}
            <section id="about">
                <div className="container mx-auto px-2 mt-6 mb-12">

                    <Image src="/logo/logo.jpeg" alt="아침햇살 스튜디오 로고" width={200} height={200} className="mb-6 mx-auto" />
                    <h2 className="mb-3 text-3xl text-center font-bold decoration-[#bfa888]">상품 소개</h2>
                    {/* <div className="flex mb-8 leading-8 tracking-normal italic text-justify flex-col items-center justify-center gap-0">
          <Image src="/logo/logo.jpeg" alt="아침햇살 스튜디오 로고" width={100} height={100} className=" mb-8" />
          <h2 className="mb-8 text-3xl text-center font-light italic underline-offset-8 underline decoration-1 decoration-[#bfa888]">상품 소개</h2>
        </div> */}
                    <p className="text-lg font-light mt-2 mb-12 md:text-2xl text-gray-600 text-center leading-relaxed text-pretty">
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
                                    <h3 className="text-xs md:text-base font-bold mb-1 text-gray-900">{product.title}</h3>
                                    <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed line-clamp-3">{product.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section >


            {/* 갤러리 섹션 */}
            < section id="gallery" className="py-16 bg-gray-50" >
                <div className="container mx-auto px-4">
                    <h2 className="mb-3 text-center text-3xl font-light  decoration-[#bfa888]">갤러리</h2>
                    <p className="text-lg font-light mt-2 mb-12 md:text-2xl text-gray-600 text-center leading-relaxed text-pretty">
                        "아침햇살 스튜디오의 다양한 작품을 감상해보세요. "
                    </p>

                    {/* 그리드 기반 갤러리 레이아웃 */}
                    <div className="gallery-grid">
                        {galleryImages.slice(0, 10).map((image, index) => (
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



            {/* 고객 후기 섹션 */}
            <section id="reviews" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-3 text-center text-3xl font-light decoration-[#bfa888]">고객 후기</h2>
                    <div className="mx-auto max-w-2xl">
                        {/* 첫 번째 슬라이더: 가족/증명/프로필 */}
                        {(() => {
                            const reviews1 = [
                                {
                                    text: "3대가 함께하는 가족사진을 찍었는데, 정말 만족스러웠습니다. 특히 어르신들이 편안하게 촬영할 수 있도록 배려해주신 점이 인상적이었어요. 사진 퀄리티도 정말 좋았고, 한복 촬영에 특화되어 있어서 더욱 멋진 결과물을 얻을 수 있었습니다. 소중한 추억을 만들어주셔서 감사합니다.",
                                    img: "/main_gallery/family/casual/casual_01.jpg",
                                    alt: "가족 촬영 예시",
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
                                                                alt={review.alt || review.name}
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
            <section className="py-20 bg-[#bfa888] text-white w-full">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">지금 예약하세요</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        소중한 순간을 아침햇살 스튜디오와 함께하세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:061-721-4800"
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#bfa888] rounded-full font-medium hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            061-721-4800
                        </a>
                        <Link
                            href="/reservation"
                            className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-[#bfa888] transition-colors"
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            온라인 예약
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    )
}
