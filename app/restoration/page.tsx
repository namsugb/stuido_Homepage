"use client"

import { useState } from "react"
import { Camera, Clock, Star, Users, ArrowRight, CheckCircle, Image, Sparkles } from "lucide-react"

export default function RestorationPage() {
    const [activeTab, setActiveTab] = useState("service")

    // 복원 서비스 데이터
    const restorationServices = [
        {
            title: "오래된 사진 복원",
            description: "세월의 흔적이 묻은 오래된 사진을 원래 모습으로 복원해드립니다",
            icon: <Image className="h-8 w-8" />,
            features: ["색상 복원", "흠집 제거", "화질 개선", "디지털 보관"]
        },
        {
            title: "손상된 사진 수리",
            description: "찢어지거나 훼손된 사진을 전문 기술로 복구합니다",
            icon: <Sparkles className="h-8 w-8" />,
            features: ["찢어진 부분 수리", "누락된 부분 복원", "균형 맞춤", "자연스러운 연결"]
        },
        {
            title: "색상 복원",
            description: "바랜 흑백사진을 자연스러운 컬러로 복원합니다",
            icon: <Camera className="h-8 w-8" />,
            features: ["자연스러운 색상", "피부톤 보정", "의상 색상 복원", "배경 색상 조정"]
        },
        {
            title: "화질 개선",
            description: "흐릿하거나 낮은 해상도의 사진을 선명하게 개선합니다",
            icon: <Star className="h-8 w-8" />,
            features: ["해상도 향상", "선명도 개선", "노이즈 제거", "디테일 보강"]
        }
    ]

    // 복원 과정
    const restorationProcess = [
        {
            step: "01",
            title: "사진 분석",
            description: "손상 정도와 복원 가능성을 전문적으로 분석합니다"
        },
        {
            step: "02",
            title: "복원 계획",
            description: "단계별 복원 계획을 수립하고 고객과 상의합니다"
        },
        {
            step: "03",
            title: "전문 복원",
            description: "최신 기술과 노하우를 활용한 정밀한 복원 작업을 진행합니다"
        },
        {
            step: "04",
            title: "품질 검수",
            description: "복원 완료 후 철저한 품질 검수를 통해 완성도를 확인합니다"
        }
    ]

    // 복원 전후 예시
    const beforeAfterExamples = [
        {
            before: "/restoration/recovery.jpg",
            after: "/restoration/after1.jpg",
            title: "오래된 가족사진 복원",
            description: "50년 전 가족사진을 선명하고 아름답게 복원"
        },
        {
            before: "/restoration/before2.jpg",
            after: "/restoration/after2.jpg",
            title: "찢어진 사진 수리",
            description: "찢어진 부분을 자연스럽게 연결하여 완전 복원"
        },
        {
            before: "/restoration/before3.jpg",
            after: "/restoration/after3.jpg",
            title: "흑백사진 컬러 복원",
            description: "흑백사진을 자연스러운 컬러로 복원"
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* 헤더 섹션 */}
            <section className="relative bg-gradient-to-br from-[#f5eee6] to-[#e8e0d0] pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            사진 복원 서비스
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            소중한 추억이 담긴 오래된 사진을 전문 기술로 복원하여
                            <br className="hidden md:block" />
                            새로운 생명을 불어넣어드립니다
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888]" />
                                <span>전문 기술</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-[#bfa888]" />
                                <span>신속 처리</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 mr-2 text-[#bfa888]" />
                                <span>품질 보장</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 복원 전후 예시 섹션 */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">복원 전후 비교</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            실제 복원 작업 결과를 확인해보세요
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {beforeAfterExamples.map((example, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative">
                                    <div className="grid grid-cols-2">
                                        <div className="relative bg-gradient-to-br from-gray-300 to-gray-400">
                                            <div className="aspect-square flex items-center justify-center p-4">
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-gray-700 mb-3">복원 전</p>
                                                    <div className="w-20 h-20 bg-gray-500 rounded-lg mx-auto flex items-center justify-center mb-2">
                                                        <img src={example.before} alt={example.title} className="w-full h-full object-cover rounded-lg" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="h-1 bg-gray-400 rounded w-12 mx-auto"></div>
                                                        <div className="h-1 bg-gray-400 rounded w-8 mx-auto"></div>
                                                        <div className="h-1 bg-gray-400 rounded w-10 mx-auto"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative bg-gradient-to-br from-[#bfa888] to-[#a68b6d]">
                                            <div className="aspect-square flex items-center justify-center p-4">
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-white mb-3">복원 후</p>
                                                    <div className="w-20 h-20 bg-white/20 rounded-lg mx-auto flex items-center justify-center mb-2">
                                                        <Sparkles className="h-10 w-10 text-white" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="h-1 bg-white/60 rounded w-12 mx-auto"></div>
                                                        <div className="h-1 bg-white/60 rounded w-8 mx-auto"></div>
                                                        <div className="h-1 bg-white/60 rounded w-10 mx-auto"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg border-2 border-[#bfa888]">
                                        <ArrowRight className="h-5 w-5 text-[#bfa888]" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{example.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{example.description}</p>
                                    <div className="mt-4 flex items-center text-sm text-[#bfa888]">
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        <span>복원 완료</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 서비스 소개 섹션 */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">복원 서비스 종류</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            다양한 손상 유형에 맞는 전문적인 복원 서비스를 제공합니다
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {restorationServices.map((service, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="text-[#bfa888] mb-3 md:mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{service.description}</p>
                                <ul className="space-y-1 md:space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-xs md:text-sm text-gray-600">
                                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-[#bfa888] flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 복원 과정 섹션 */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">복원 과정</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            체계적이고 전문적인 복원 과정을 통해 최고의 결과물을 만들어드립니다
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {restorationProcess.map((process, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-[#bfa888] text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-4 md:mb-6">
                                    {process.step}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{process.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{process.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 가격 정보 섹션 */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">복원 서비스 가격</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            사진의 손상 정도와 복원 난이도에 따라 차등 적용됩니다
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* 기본 복원 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">기본 복원</h3>
                                <div className="text-4xl font-bold text-[#bfa888] mb-2">30,000원</div>
                                <p className="text-gray-600 text-sm">~부터</p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    경미한 흠집 제거
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    기본 색상 보정
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    화질 개선
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    디지털 파일 제공
                                </li>
                            </ul>
                            <div className="text-center">
                                <a
                                    href="/reservation"
                                    className="inline-block bg-[#bfa888] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a68b6d] transition"
                                >
                                    문의하기
                                </a>
                            </div>
                        </div>

                        {/* 고급 복원 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#bfa888] relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-[#bfa888] text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    인기
                                </span>
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">고급 복원</h3>
                                <div className="text-4xl font-bold text-[#bfa888] mb-2">50,000원</div>
                                <p className="text-gray-600 text-sm">~부터</p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    중간 정도 손상 복원
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    찢어진 부분 수리
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    자연스러운 색상 복원
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    고해상도 출력 파일
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    무료 재수정 1회
                                </li>
                            </ul>
                            <div className="text-center">
                                <a
                                    href="/reservation"
                                    className="inline-block bg-[#bfa888] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a68b6d] transition"
                                >
                                    문의하기
                                </a>
                            </div>
                        </div>

                        {/* 프리미엄 복원 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">프리미엄 복원</h3>
                                <div className="text-4xl font-bold text-[#bfa888] mb-2">80,000원</div>
                                <p className="text-gray-600 text-sm">~부터</p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    심각한 손상 복원
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    누락된 부분 복원
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    흑백→컬러 변환
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    최고 품질 출력
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888] flex-shrink-0" />
                                    무료 재수정 2회
                                </li>
                            </ul>
                            <div className="text-center">
                                <a
                                    href="/reservation"
                                    className="inline-block bg-[#bfa888] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a68b6d] transition"
                                >
                                    문의하기
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 text-sm">
                            * 정확한 가격은 사진 상태를 확인 후 상담을 통해 안내드립니다
                        </p>
                    </div>
                </div>
            </section>

            {/* 문의 섹션 */}
            <section className="py-20 bg-gradient-to-br from-[#bfa888] to-[#a68b6d]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">복원 서비스 문의</h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        소중한 추억을 복원하고 싶으시다면 언제든 연락주세요.
                        전문가가 직접 상담해드리고 최적의 복원 방안을 제안해드립니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/reservation"
                            className="bg-white text-[#bfa888] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            예약 문의하기
                        </a>
                        <a
                            href="tel:061-721-4800"
                            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#bfa888] transition"
                        >
                            061-721-4800
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
} 