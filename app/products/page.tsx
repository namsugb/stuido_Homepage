"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Star, CheckCircle, Clock, Users, Camera, Heart } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "family";
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    // 상품 카테고리 데이터
    const categories = [
        { id: "family", name: "가족사진", icon: <Users className="h-5 w-5" /> },
        { id: "wedding", name: "리마인드웨딩", icon: <Heart className="h-5 w-5" /> },
        { id: "longevity", name: "장수기념", icon: <Star className="h-5 w-5" /> },
        { id: "celebration", name: "칠순/팔순", icon: <CheckCircle className="h-5 w-5" /> },
        { id: "id", name: "증명사진", icon: <Camera className="h-5 w-5" /> },
        { id: "profile", name: "프로필", icon: <Users className="h-5 w-5" /> },
    ]

    // 상품 데이터
    const products = [
        // 가족사진 카테고리
        {
            id: 1,
            category: "family",
            title: "소가족 패키지",
            price: "99,000원",
            originalPrice: "120,000원",
            duration: "60분",
            people: "2-4명",
            image: "/package/family-photo-updated.jpeg",
            features: [
                "두 가지 컨셉 촬영",
                "촬영 의상 무료 대여",
                "부모님 헤어&메이크업 무료",
                "고급 액자 1점 (28x36cm)",
                "액자컷 수정 파일 제공",
                "전체 원본 파일 제공"
            ],
            description: "따뜻한 가족의 순간을 아름답게 담아드립니다. 자연스러운 표정과 진정한 가족애를 사진으로 기록합니다.",
            popular: true
        },
        {
            id: 2,
            category: "family",
            title: "대가족 패키지",
            price: "150,000원",
            originalPrice: "180,000원",
            duration: "90분",
            people: "5명 이상",
            image: "/family-pink-portrait.jpeg",
            features: [
                "세 가지 컨셉 촬영",
                "촬영 의상 무료 대여",
                "부모님 헤어&메이크업 무료",
                "고급 액자 2점 (28x36cm)",
                "액자컷 수정 파일 제공",
                "전체 원본 파일 제공",
                "추가 소품 제공"
            ],
            description: "3대가 함께하는 뜻깊은 순간을 기록합니다. 어르신부터 아이들까지 모든 가족이 편안하게 촬영할 수 있습니다."
        },
        {
            id: 3,
            category: "family",
            title: "아이 성장 기록",
            price: "80,000원",
            originalPrice: "100,000원",
            duration: "45분",
            people: "1-3명",
            image: "/gallery/KakaoTalk_20250523_002337024_09.jpg",
            features: [
                "아이 중심 촬영",
                "다양한 표정 촬영",
                "성장 기록용 소품 제공",
                "고급 액자 1점",
                "수정 파일 10컷",
                "원본 파일 전체 제공"
            ],
            description: "아이의 소중한 성장 순간을 예쁘게 기록해드립니다. 자연스럽고 밝은 표정을 담아냅니다."
        },

        // 리마인드웨딩 카테고리
        {
            id: 4,
            category: "wedding",
            title: "시니어 리마인드웨딩",
            price: "180,000원",
            originalPrice: "220,000원",
            duration: "120분",
            people: "2명",
            image: "/wedding-portrait.jpeg",
            features: [
                "웨딩드레스 & 턱시도 제공",
                "전문 헤어&메이크업",
                "다양한 포즈 연출",
                "웨딩 소품 제공",
                "고급 액자 2점",
                "앨범 제작",
                "수정 파일 20컷"
            ],
            description: "젊은 날의 그 설렘을 다시 한번 느껴보세요. 평생 간직할 아름다운 웨딩 사진을 선사합니다.",
            popular: true
        },
        {
            id: 5,
            category: "wedding",
            title: "가족 리마인드웨딩",
            price: "250,000원",
            originalPrice: "300,000원",
            duration: "150분",
            people: "가족 전체",
            image: "/gallery/KakaoTalk_20250523_002337024_15.jpg",
            features: [
                "가족 웨딩 컨셉 촬영",
                "부모님 웨딩 의상 제공",
                "자녀들 정장 의상 포함",
                "전문 헤어&메이크업",
                "고급 액자 3점",
                "패밀리 앨범 제작",
                "수정 파일 30컷"
            ],
            description: "가족 모두가 함께하는 특별한 웨딩 촬영으로 더욱 의미 있는 추억을 만들어보세요."
        },

        // 장수기념 카테고리
        {
            id: 6,
            category: "longevity",
            title: "100세 장수 기념",
            price: "200,000원",
            originalPrice: "250,000원",
            duration: "90분",
            people: "가족 전체",
            image: "/senior-hanbok-new.jpeg",
            features: [
                "한복 또는 정장 선택",
                "어르신 전용 메이크업",
                "편안한 촬영 환경",
                "장수 기념 소품",
                "고급 액자 3점",
                "가족 앨범 제작",
                "기념품 증정"
            ],
            description: "백세 인생의 소중한 순간을 품격있게 기록합니다. 건강하고 행복한 모습을 영원히 간직하세요."
        },

        // 칠순/팔순 카테고리
        {
            id: 7,
            category: "celebration",
            title: "칠순 기념 촬영",
            price: "150,000원",
            originalPrice: "180,000원",
            duration: "90분",
            people: "가족 전체",
            image: "/hanbok-couple-new.jpeg",
            features: [
                "한복 의상 제공",
                "전통 소품 활용",
                "가족 단체 촬영",
                "개인 초상 촬영",
                "고급 액자 2점",
                "상차림 세팅 가능",
                "수정 파일 20컷"
            ],
            description: "인생의 뜻깊은 칠순을 아름다운 한복과 함께 기념하세요. 전통의 미와 가족애를 담아냅니다.",
            popular: true
        },
        {
            id: 8,
            category: "celebration",
            title: "팔순 기념 촬영",
            price: "160,000원",
            originalPrice: "190,000원",
            duration: "90분",
            people: "가족 전체",
            image: "/traditional-family.jpeg",
            features: [
                "프리미엄 한복 의상",
                "전통 장신구 제공",
                "4대 가족 촬영",
                "어르신 개인 촬영",
                "고급 액자 3점",
                "전통 앨범 제작",
                "수정 파일 25컷"
            ],
            description: "팔순의 경륜과 지혜가 담긴 모습을 고품격 한복과 함께 아름답게 담아드립니다."
        },

        // 증명사진 카테고리
        {
            id: 9,
            category: "id",
            title: "취업용 증명사진",
            price: "30,000원",
            originalPrice: "40,000원",
            duration: "30분",
            people: "1명",
            image: "/id-photo-new.jpeg",
            features: [
                "다양한 배경 선택",
                "정장 스타일링",
                "헤어 정리 서비스",
                "여러 컷 촬영",
                "즉석 인화 10매",
                "디지털 파일 제공",
                "무료 재촬영"
            ],
            description: "첫인상이 중요한 취업용 증명사진을 전문적으로 촬영합니다. 자신감 있는 모습을 담아냅니다."
        },
        {
            id: 10,
            category: "id",
            title: "여권용 증명사진",
            price: "25,000원",
            originalPrice: "35,000원",
            duration: "20분",
            people: "1명",
            image: "/profile-photo-new.jpeg",
            features: [
                "여권 규격 준수",
                "화이트 배경",
                "표정 가이드",
                "즉석 인화 8매",
                "디지털 파일",
                "재촬영 보장"
            ],
            description: "여권 규격에 맞는 정확한 증명사진을 촬영합니다. 해외여행 준비를 완벽하게 도와드립니다."
        },

        // 프로필 카테고리
        {
            id: 11,
            category: "profile",
            title: "개인 프로필",
            price: "80,000원",
            originalPrice: "100,000원",
            duration: "60분",
            people: "1명",
            image: "/profile-photo-new.jpeg",
            features: [
                "개성있는 컨셉 촬영",
                "다양한 의상 변경",
                "자연광 활용",
                "감성적 포트레이트",
                "고급 액자 1점",
                "수정 파일 15컷",
                "SNS용 파일 제공"
            ],
            description: "개인의 매력과 개성을 최대한 살린 프로필 사진을 촬영합니다. 특별한 나만의 이야기를 담아냅니다."
        },
        {
            id: 12,
            category: "profile",
            title: "비즈니스 프로필",
            price: "120,000원",
            originalPrice: "150,000원",
            duration: "90분",
            people: "1명",
            image: "/gallery/KakaoTalk_20250523_002337024_13.jpg",
            features: [
                "전문적인 컨셉",
                "정장 스타일링",
                "다양한 배경",
                "명함용 사진",
                "고급 액자 2점",
                "수정 파일 20컷",
                "비즈니스 카드 디자인"
            ],
            description: "전문가다운 이미지를 위한 비즈니스 프로필 촬영입니다. 신뢰감 있는 첫인상을 만들어드립니다."
        }
    ]

    // 필터링된 상품들
    const filteredProducts = products.filter(product => product.category === activeCategory)

    return (
        <div className="min-h-screen bg-[#f8f8f6]">
            {/* 메인 컨텐츠 */}
            <main className="container mt-16 mx-auto px-6 pt-20 pb-20">
                {/* 페이지 제목 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">촬영 상품 안내</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        아침햇살 스튜디오의 다양한 촬영 상품을 확인해보세요.
                        각 카테고리별로 전문화된 서비스를 통해 소중한 순간을 아름답게 기록해드립니다.
                    </p>
                </div>

                {/* 카테고리 필터 */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center px-6 py-3 rounded-full transition-all ${activeCategory === category.id
                                ? "bg-[#bfa888] text-white shadow-md"
                                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                                }`}
                        >
                            {category.icon}
                            <span className="ml-2">{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* 상품 그리드 */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                            {/* 인기 배지 */}
                            {product.popular && (
                                <div className="relative">
                                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        인기상품
                                    </div>
                                </div>
                            )}

                            {/* 상품 이미지 */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            {/* 상품 정보 */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold">{product.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock className="h-4 w-4" />
                                        <span>{product.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{product.people}</span>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* 가격 정보 */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl font-bold text-[#bfa888]">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                                    )}
                                </div>

                                {/* 주요 특징 */}
                                <div className="mb-6">
                                    <h4 className="font-medium mb-2">포함 서비스</h4>
                                    <ul className="space-y-1">
                                        {product.features.slice(0, 4).map((feature, index) => (
                                            <li key={index} className="flex items-start text-sm text-gray-600">
                                                <CheckCircle className="h-4 w-4 text-[#bfa888] mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {product.features.length > 4 && (
                                            <li className="text-sm text-gray-500">
                                                외 {product.features.length - 4}개 서비스
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* 예약 버튼 */}
                                <Link
                                    href="/reservation"
                                    className="w-full bg-[#bfa888] text-white py-3 rounded-full font-medium hover:bg-[#a68b6d] transition text-center block"
                                >
                                    예약하기
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 추가 안내 */}
                <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-center mb-6">촬영 안내사항</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold mb-3 text-lg">촬영 전 준비사항</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• 촬영 1시간 전 도착 권장</li>
                                <li>• 편안한 복장으로 오시면 의상 제공</li>
                                <li>• 헤어&메이크업 서비스 포함</li>
                                <li>• 특별한 소품이 있으시면 가져오세요</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-3 text-lg">결과물 안내</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• 촬영 후 7-10일 내 완성</li>
                                <li>• 고품질 디지털 파일 제공</li>
                                <li>• 액자 및 앨범 무료 배송</li>
                                <li>• 추가 인화 서비스 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* 푸터 */}
            <footer className="bg-[#333] py-8 text-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400">© {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
