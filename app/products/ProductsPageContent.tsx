"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Star, CheckCircle, Clock, Users, Camera, Heart } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ProductsPageContent() {
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
        { id: "package", name: "패키지", icon: <Star className="h-5 w-5 text-yellow-700" /> },
    ]

    // 상품 데이터
    const products: Array<{
        id: number;
        category: string;
        title: string;
        price: string;
        originalPrice?: string;
        duration: string;
        people: string;
        image: string;
        features: string[];
        description: string;
        popular?: boolean;
    }> = [
            // 패키지 카테고리 (프리미엄 상품)
            {
                id: 1001,
                category: "package",
                title: "소가족 패키지",
                price: "1,000,000원",
                duration: "문의",
                people: "2-4명",
                image: "/package/family-photo-updated.jpeg",
                features: [
                    "전체원본 제공",
                    "의상 2벌",
                    "20×24inch 디아섹액자 1개",
                    "8×10inch 디아섹액자 2개"
                ],
                description: "소가족을 위한 프리미엄 패키지. 가족의 소중한 순간을 고급 액자와 함께 간직하세요.",
                popular: true
            },
            {
                id: 1002,
                category: "package",
                title: "대가족 패키지",
                price: "1,500,000원",
                duration: "문의",
                people: "5명 이상",
                image: "/family-pink-portrait.jpeg",
                features: [
                    "전체원본 제공",
                    "의상 2벌",
                    "22×36inch 디아섹액자 1개",
                    "11×14inch 디아섹액자 2개"
                ],
                description: "대가족을 위한 프리미엄 패키지. 3대가 함께하는 특별한 추억을 남겨드립니다.",
            },
            // 단독상품 12개
            {
                id: 1,
                category: "single",
                title: "소가족",
                price: "99,000원",
                duration: "문의",
                people: "2-4명",
                image: "/package/family-photo-updated.jpeg",
                features: ["28×36cm 기본액자 1개"],
                description: "소가족 촬영, 기본 액자 포함"
            },
            {
                id: 2,
                category: "single",
                title: "대가족",
                price: "190,000원",
                duration: "문의",
                people: "5명 이상",
                image: "/family-pink-portrait.jpeg",
                features: ["40×50cm 기본액자 1개"],
                description: "대가족 촬영, 대형 액자 포함"
            },
            {
                id: 3,
                category: "single",
                title: "부모님 리마인드",
                price: "150,000원",
                duration: "문의",
                people: "2명",
                image: "/wedding-portrait.jpeg",
                features: ["30×43cm 기본액자 1개"],
                description: "부모님 리마인드 촬영, 기본 액자 포함"
            },
            {
                id: 4,
                category: "single",
                title: "칠순&팔순 상차림",
                price: "150,000원",
                duration: "문의",
                people: "가족 전체",
                image: "/hanbok-couple-new.jpeg",
                features: ["28×36cm 기본액자 1개"],
                description: "칠순/팔순 상차림 촬영, 기본 액자 포함"
            },
            {
                id: 5,
                category: "single",
                title: "장수사진",
                price: "150,000원",
                duration: "문의",
                people: "1명",
                image: "/senior-hanbok-new.jpeg",
                features: ["28×36cm 기본액자 1개"],
                description: "장수사진 촬영, 기본 액자 포함"
            },
            {
                id: 6,
                category: "single",
                title: "리마인드가족",
                price: "200,000원",
                duration: "문의",
                people: "가족 전체",
                image: "/gallery/KakaoTalk_20250523_002337024_15.jpg",
                features: ["28×36cm 기본액자 1개"],
                description: "가족 리마인드 촬영, 기본 액자 포함"
            },
            {
                id: 7,
                category: "single",
                title: "프로필",
                price: "70,000원",
                duration: "문의",
                people: "1명",
                image: "/profile-photo-new.jpeg",
                features: ["의상 1벌", "수정본 1장"],
                description: "프로필 촬영, 의상 1벌 및 수정본 1장 제공"
            },
            {
                id: 8,
                category: "single",
                title: "커플",
                price: "100,000원",
                duration: "문의",
                people: "2명",
                image: "/gallery/KakaoTalk_20250523_002337024_13.jpg",
                features: ["수정본 2장", "4×6inch 2매"],
                description: "커플 촬영, 수정본 2장 및 4×6inch 2매 제공"
            },
            {
                id: 9,
                category: "single",
                title: "우정",
                price: "20,000원",
                duration: "문의",
                people: "1명 기준",
                image: "/gallery/KakaoTalk_20250523_002337024_09.jpg",
                features: ["포켓용 2매"],
                description: "우정 촬영, 1인 기준 포켓용 2매 제공"
            },
            {
                id: 10,
                category: "single",
                title: "증명&여권",
                price: "30,000원",
                duration: "문의",
                people: "1명",
                image: "/id-photo-new.jpeg",
                features: ["증명/여권 사진 촬영"],
                description: "증명 및 여권 사진 촬영"
            },
            {
                id: 11,
                category: "single",
                title: "취업",
                price: "60,000원",
                duration: "문의",
                people: "1명",
                image: "/profile-photo-new.jpeg",
                features: ["취업 사진 촬영"],
                description: "취업용 사진 촬영"
            },
            {
                id: 12,
                category: "single",
                title: "복원",
                price: "100,000원",
                duration: "문의",
                people: "문의",
                image: "/gallery/KakaoTalk_20250523_002337024_12.jpg",
                features: ["사진 복원 서비스"],
                description: "사진 복원 서비스"
            },
        ];

    // 프리미엄 상품(패키지)
    const premiumProducts = products.filter(p => p.category === "package");
    // 단독상품(나머지)
    const singleProducts = products.filter(p => p.category !== "package");

    return (
        <div className="min-h-screen bg-[#f8f8f6]">
            <main className="container mx-auto px-3 pt-20 pb-20">
                <div className="text-center mt-16 mb-12">
                    <h1 className="text-4xl font-bold mb-4">촬영 상품 안내</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        아침햇살 스튜디오의 다양한 촬영 상품을 확인해보세요.<br />
                    </p>
                </div>

                {/* 프리미엄 상품 섹션 */}
                <h2 className="text-2xl font-bold mb-6 text-center">패키지 상품</h2>
                <div className="grid grid-cols-2 gap-2 mb-16">
                    {premiumProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg overflow-hidden relative group aspect-[4/3] flex items-stretch">
                            <div className="absolute inset-0">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 h-full w-full" />
                            </div>
                            {/* 전체 오버레이 */}
                            <div className="absolute inset-0 w-full h-full z-10 flex flex-col items-center justify-center">
                                <div className="bg-black bg-opacity-20 w-full h-full px-4 py-3 text-center flex flex-col items-center justify-center rounded-b">
                                    <div className="text-lg md:text-xl font-normal text-white mb-1 whitespace-pre-line">{product.title}</div>
                                    <div className="text-xs md:text-sm font-normal text-white whitespace-pre-line">
                                        {product.features && product.features.length > 0 && product.features.join(", ")}
                                    </div>
                                    <div className="text-xs md:text-lg font-normal text-white mb-1">{product.price}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 단독상품 섹션 */}
                <h2 className="text-2xl font-bold mb-6 text-center">개별 상품</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {singleProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow-md overflow-hidden relative group aspect-[4/3] flex items-stretch">
                            <div className="absolute inset-0">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 h-full w-full" />
                            </div>
                            {/* 전체 오버레이 */}
                            <div className="absolute inset-0 w-full z-10 flex flex-col items-center justify-center">
                                <div className="bg-black bg-opacity-20 h-full w-full px-4 py-3 text-center flex flex-col items-center justify-center rounded-b">
                                    <div className="text-lg md:text-xl font-normal text-white mb-1 whitespace-pre-line">{product.title}</div>
                                    <div className="text-xs md:text-sm font-normal text-white whitespace-pre-line">
                                        {product.features && product.features.length > 0 && product.features.join(", ")}
                                    </div>
                                    <div className="text-xs md:text-lg font-normal text-white mb-1">{product.price}</div>
                                </div>
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
            </main >
            <footer className="bg-[#333] py-8 text-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400">© {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.</p>
                </div>
            </footer>
        </div >
    )
} 