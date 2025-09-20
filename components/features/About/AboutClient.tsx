"use client"

import { useState, useEffect } from "react"
import OptimizedImage from "@/components/ui/OptimizedImage"
import { imagePresets } from "@/components/ui/ImagePresets"

export default function AboutClient() {
    const [activeTab, setActiveTab] = useState("photographer") // "photographer" 또는 "studio"
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

    const handleImageClick = (src: string, alt: string) => {
        setSelectedImage({ src, alt })
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    // ESC 키로 모달 닫기 및 body 스크롤 제어
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal()
            }
        }

        if (selectedImage) {
            document.addEventListener('keydown', handleEscKey)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey)
            document.body.style.overflow = 'unset'
        }
    }, [selectedImage])

    return (
        <div className="min-h-screen bg-white">
            {/* 이미지 모달 */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-4xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                            aria-label="모달 닫기"
                        >
                            ×
                        </button>
                        <OptimizedImage
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            {...imagePresets.gallery}
                        />
                        <p className="text-white text-center mt-4 text-sm bg-black bg-opacity-50 rounded px-3 py-1">{selectedImage.alt}</p>
                    </div>
                </div>
            )}

            <main className="container mx-auto px-4 page-content pb-20">
                <div className="text-center mt-16 mb-12">
                    <h1 className="text-4xl font-medium my-4">아침햇살 스튜디오</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        따뜻한 햇살처럼, 소중한 순간을 아름답게 담아드립니다.<br />
                        가족의 이야기, 인생의 전환점, 그리고 당신만의 특별한 시간을 사진으로 남겨보세요.
                    </p>
                </div>

                {/* 카테고리 버튼 */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("photographer")}
                            className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${activeTab === "photographer"
                                ? "bg-white text-[#bfa888] shadow-md"
                                : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            작가소개
                        </button>
                        <button
                            onClick={() => setActiveTab("studio")}
                            className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${activeTab === "studio"
                                ? "bg-white text-[#bfa888] shadow-md"
                                : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            스튜디오 소개
                        </button>
                    </div>
                </div>

                {/* 작가 소개 섹션 */}
                {activeTab === "photographer" && (
                    <section className="mt-16 mb-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                        <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center justify-center">
                            <div
                                className="cursor-pointer transform transition-transform hover:scale-105"
                                onClick={() => handleImageClick("/about/photographer.jpg", "아침햇살 스튜디오 대표 사진작가 남유행님의 프로필 사진. 전문적이고 따뜻한 인상의 중년 남성 사진작가")}
                            >
                                <OptimizedImage
                                    src="/about/photographer.jpg"
                                    alt="아침햇살 스튜디오 대표 사진작가 남유행님의 프로필 사진. 전문적이고 따뜻한 인상의 중년 남성 사진작가"
                                    width={320}
                                    height={400}
                                    className="rounded-lg shadow-md object-cover"
                                    {...imagePresets.profile}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-3">대표 소개</h2>
                            <p className="text-gray-700 mb-2">
                                <b>남유행</b> | 아침햇살스튜디오 대표 / 한국프로사진협회 초대작가
                            </p>
                            <p className="text-gray-700 mb-4">
                                사진은 제게 '사람의 마음을 담는 일'입니다.<br />
                                피사체를 마주할 때면, 그 사람만의 이야기를 사진에 고스란히 담아내고 싶어집니다.<br />
                                감성과 따뜻함이 묻어나는 인물사진, 가족의 웃음과 사랑이 그대로 전해지는 사진이 제가 추구하는 방향입니다.<br />
                                시간이 흘러도 변하지 않는 건 '진심으로 사람을 바라보는 시선'입니다.<br />
                                사진을 통해 누군가의 행복한 순간을 오래도록 기억하게 해주는 일이, 제게는 가장 소중한 일입니다.
                            </p>
                            <h3 className="text-xl font-semibold mb-2 mt-6">주요 약력</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>서울예전 사진과 졸업</li>
                                <li>현) 한국프로사진협회 초대작가</li>
                                <li>현) 한국프로사진협회 사진문화원장</li>
                                <li>현) 한국프로사진협회 전남지회 고문</li>
                                <li>전) 한국프로사진협회 작가제도부 위원장</li>
                                <li>전) 한국프로사진협회 교육이사</li>
                                <li>전) 한국프로사진협회 전남지회 지회장</li>
                            </ul>
                        </div>
                    </section>
                )}



                {activeTab === "studio" && (
                    <section className="mb-16">
                        {/* 스튜디오 소개 텍스트 */}
                        <div className="mb-12 text-center">
                            <h2 className="text-2xl font-medium font-noto mb-6 text-center">스튜디오 소개</h2>
                            <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
                                <p className="mb-4">
                                    <b>☀️ "사진, 잘 나온 것도 좋지만… 오래 남는 게 더 좋더라고요."</b><br />
                                    요즘은 워낙 사진 잘 찍는 분들도 많고,<br />
                                    폰 카메라도 참 잘 나와요.<br />
                                    그래도 누군가 "진짜 나 다운 사진을 남기고 싶다"고 하실 땐<br />
                                    늘 마음이 움직여요.<br />
                                    딱딱하게 포즈만 잡고 찍는 그런 사진 말고요.<br />
                                    그 사람만의 분위기, 눈빛, 웃음, 삶의 온도 같은 것들…<br />
                                    그게 정말 오래 남더라고요.<br />
                                    그 순간을 잘 담아드리고 싶어서,<br />
                                    오늘도 조심스럽고 진심으로 카메라를 들고 있어요.
                                </p>
                                <p className="mb-4">
                                    <b>📷 사진, 우리 집은 2대째 하고 있어요.</b><br />
                                    저희 스튜디오는 2대째, 사진을 전공한 인물사진 전문 작가가 운영하고 있어요.<br />
                                    아버님 세대부터 사진 일을 하셨고,<br />
                                    저 역시 사진을 전공하면서 자연스럽게 이 길로 오게 됐죠.<br />
                                    한 장의 사진이 사람의 마음을 움직이는 걸,<br />
                                    어릴 때부터 곁에서 지켜보며 배웠거든요.
                                </p>
                            </div>
                        </div>

                        {/* 스튜디오 인테리어 갤러리 */}
                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">스튜디오 공간</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                <div className="space-y-4">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/studio-interior1.jpg", "아름답고 다양한 컬러의 의상")}
                                    >
                                        <div className="w-full h-64 rounded-lg shadow-lg overflow-hidden">
                                            <OptimizedImage
                                                src="/about/studio-interior1.jpg"
                                                alt="아침햇살 스튜디오 내부 전경. 자연광이 들어오는 따뜻한 분위기의 촬영 공간"
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover"
                                                {...imagePresets.gallery}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/studio-interior2.jpg", "아침햇살 스튜디오 내부 촬영 공간. 전문적인 조명과 배경이 구비된 스튜디오")}
                                    >
                                        <div className="w-full h-64 rounded-lg shadow-lg overflow-hidden">
                                            <OptimizedImage
                                                src="/about/studio-interior2.jpg"
                                                alt="아침햇살 스튜디오 내부 촬영 공간. 전문적인 조명과 배경이 구비된 스튜디오"
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover"
                                                {...imagePresets.gallery}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/studio-interior3.jpg", "고급스러운 다양한 소품들")}
                                    >
                                        <div className="w-full h-64 rounded-lg shadow-lg overflow-hidden">
                                            <OptimizedImage
                                                src="/about/studio-interior3.jpg"
                                                alt="아침햇살 스튜디오 정원. 계절마다 다른 풍경을 보여주는 아름다운 야외 공간"
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover"
                                                {...imagePresets.gallery}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/studio-interior4.jpg", "정원이 있는 스튜디오")}
                                    >
                                        <div className="w-full h-64 rounded-lg shadow-lg overflow-hidden">
                                            <OptimizedImage
                                                src="/about/studio-interior4.jpg"
                                                alt="아침햇살 스튜디오 정원. 계절마다 다른 풍경을 보여주는 아름다운 야외 공간"
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover"
                                                {...imagePresets.gallery}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mb-12">
                            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">다양한 세트장</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                                <div className="space-y-2">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/KakaoTalk_20250815_161804879_01.jpg", "한옥세트")}
                                    >
                                        <OptimizedImage
                                            src="/about/KakaoTalk_20250815_161804879_01.jpg"
                                            alt="한옥세트"
                                            width={250}
                                            height={250}
                                            className="rounded-lg shadow-md object-cover w-full h-48"
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/KakaoTalk_20250815_161804879_02.jpg", "화이트 배경세트")}
                                    >
                                        <OptimizedImage
                                            src="/about/KakaoTalk_20250815_161804879_02.jpg"
                                            alt="화이트 배경세트"
                                            width={250}
                                            height={250}
                                            className="rounded-lg shadow-md object-cover w-full h-48"
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/KakaoTalk_20250815_161804879_03.jpg", "실크 커튼 배경")}
                                    >
                                        <OptimizedImage
                                            src="/about/KakaoTalk_20250815_161804879_03.jpg"
                                            alt="실크 커튼 배경"
                                            width={250}
                                            height={250}
                                            className="rounded-lg shadow-md object-cover w-full h-48"
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/KakaoTalk_20250815_161804879_04.jpg", "그라데이션 배경")}
                                    >
                                        <OptimizedImage
                                            src="/about/KakaoTalk_20250815_161804879_04.jpg"
                                            alt="그라데이션 배경세트"
                                            width={250}
                                            height={250}
                                            className="rounded-lg shadow-md object-cover w-full h-48"
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/KakaoTalk_20250815_161804879_05.jpg", "자연광 배경세트")}
                                    >
                                        <OptimizedImage
                                            src="/about/KakaoTalk_20250815_161804879_05.jpg"
                                            alt="자연광 배경세트"
                                            width={250}
                                            height={250}
                                            className="rounded-lg shadow-md object-cover w-full h-48"
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div
                                        className="cursor-pointer transform transition-transform hover:scale-105"
                                        onClick={() => handleImageClick("/about/KakaoTalk_20250815_161804879_06.jpg", "그레이 배경세트")}
                                    >
                                        <OptimizedImage
                                            src="/about/KakaoTalk_20250815_161804879_06.jpg"
                                            alt="그레이 배경세트"
                                            width={250}
                                            height={250}
                                            className="rounded-lg shadow-md object-cover w-full h-48"
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* 추가 스튜디오 정보 */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gray-50 rounded-lg p-8">
                                <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">스튜디오 특징</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-[#bfa888] mb-2">🏠 공간 구성</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• 자연광을 최대한 활용한 촬영 공간</li>
                                            <li>• 400평 규모의 계절별 변화하는 정원</li>
                                            <li>• 편안한 대기 공간과 감성 카페</li>
                                            <li>• 다양한 배경과 소품 구비</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#bfa888] mb-2">📸 촬영 환경</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• 전문 촬영 장비 및 조명 시스템</li>
                                            <li>• 무료 주차 공간</li>
                                            <li>• 순천 외곽의 조용한 하우스형 스튜디오</li>
                                            <li>• 계절마다 다른 분위기의 야외 촬영</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 스튜디오 철학과 가치 */}
                        <div className="mt-12 max-w-4xl mx-auto">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">우리만의 사진, 우리만의 순간</h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    어떤 분은 "그냥 취업사진만 잘 찍어주세요" 하고 오셨다가,<br />
                                    "이런 표정이 제 얼굴에도 있었네요" 하며 웃고 가시기도 해요.<br />
                                    그게 바로 저희가 사진을 좋아하는 이유예요.<br />
                                    사람을, 기억을, 그 순간의 감정을<br />
                                    오래도록 꺼내볼 수 있는 형태로 남길 수 있으니까요.
                                </p>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    <b>우리 스튜디오가 중요하게 생각하는 것</b><br />
                                    한 마디로 말하자면,<br />
                                    <b>"내가 찍히고 싶은 사진을 찍어드리고 싶다"</b>는 마음이에요.<br />
                                    너무 과하게 꾸미지 않으면서<br />
                                    그 사람만의 매력을, 있는 그대로 보여주는 사진.<br />
                                    오래 봐도 마음이 따뜻해지는 그런 사진.<br />
                                    그게 저희가 지향하는 사진이에요.
                                </p>
                                <p className="text-[#bfa888] font-medium">
                                    – 순천 가족사진 전문 아침햇살스튜디오에서 드립니다 :)
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* 스튜디오 소개 섹션 */}
                {/* {activeTab === "studio" && (
                    <section className="mb-16 flex flex-col md:flex-row items-start gap-8 md:gap-16">
                        <div className="w-full mt-16 md:w-1/2 flex flex-col justify-start items-end gap-8 lg:items-end">
                            <OptimizedImage
                                src="/about/studio-interior1.jpg"
                                alt="아침햇살 스튜디오 내부 전경. 자연광이 들어오는 따뜻한 분위기의 촬영 공간"
                                width={500}
                                height={350}
                                className="rounded-lg shadow-md object-cover"
                                {...imagePresets.gallery}
                            />
                            <OptimizedImage
                                src="/about/studio-interior2.jpg"
                                alt="아침햇살 스튜디오 내부 촬영 공간. 전문적인 조명과 배경이 구비된 스튜디오"
                                width={500}
                                height={350}
                                className="rounded-lg shadow-md object-cover"
                                {...imagePresets.gallery}
                            />
                            <OptimizedImage
                                src="/about/studio-interior3.jpg"
                                alt="아침햇살 스튜디오 내부 휴식 공간. 편안하게 대기할 수 있는 아늑한 공간"
                                width={500}
                                height={350}
                                className="rounded-lg shadow-md object-cover"
                                {...imagePresets.gallery}
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-3">스튜디오 소개</h2>
                                <p className="text-gray-700 mb-4">
                                    아침햇살 스튜디오는 전라남도 순천시 조례동에 위치한 전문 사진 스튜디오입니다.<br />
                                    자연광을 최대한 활용한 촬영 공간과 최신 장비를 갖춰 고품질의 사진을 제공합니다.
                                </p>
                                <h3 className="text-xl font-semibold mb-2">주요 특징</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>자연광을 활용한 따뜻한 분위기</li>
                                    <li>다양한 배경과 소품 구비</li>
                                    <li>전문 촬영 장비 및 조명 시스템</li>
                                    <li>편안한 대기 공간</li>
                                    <li>무료 주차 공간</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">위치 및 연락처</h3>
                                <p className="text-gray-700 mb-2">
                                    <strong>주소:</strong> 전라남도 순천시 조례동 1823-5<br />
                                    <strong>전화:</strong> 061-721-4800<br />
                                    <strong>영업시간:</strong> 평일 10:00-18:30, 토요일 10:00-18:30<br />
                                    <strong>일요일:</strong> 예약 촬영만 진행
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">서비스 안내</h3>
                                <p className="text-gray-700 mb-2">
                                    가족사진, 리마인드웨딩, 칠순/팔순, 장수기념, 프로필, 증명사진 등<br />
                                    다양한 촬영 서비스를 제공합니다.<br />
                                    예약은 전화 또는 온라인으로 가능합니다.
                                </p>
                            </div>
                        </div>
                    </section>
                )} */}

                {/* 공통 하단 섹션 */}
                <section className="text-center py-16 bg-gray-50 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">아침햇살 스튜디오와 함께하세요</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        소중한 순간을 아름답게 담아드리는 것이 저희의 사명입니다.<br />
                        전문성과 따뜻한 마음으로 여러분의 특별한 순간을 기다리고 있습니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:061-721-4800"
                            className="inline-flex items-center justify-center px-8 py-3 bg-[#bfa888] text-white rounded-full hover:bg-[#a8957a] transition-colors"
                        >
                            전화 문의
                        </a>
                        <a
                            href="/reservation"
                            className="inline-flex items-center justify-center px-8 py-3 border border-[#bfa888] text-[#bfa888] rounded-full hover:bg-[#bfa888] hover:text-white transition-colors"
                        >
                            온라인 예약
                        </a>
                    </div>
                </section>
            </main>
        </div>
    )
}
