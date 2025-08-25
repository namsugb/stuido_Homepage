"use client"

import { useState } from "react"
import { Camera, Clock, Star, Users, ArrowRight, CheckCircle, Image, Sparkles, Phone } from "lucide-react"

export default function RestorationClient() {
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
                                <span>고품질 결과</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 탭 네비게이션 */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="flex bg-gray-100 rounded-lg p-1 my-8">
                            <button
                                onClick={() => setActiveTab("service")}
                                className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${activeTab === "service"
                                    ? "bg-white text-[#bfa888] shadow-md"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                서비스 소개
                            </button>
                            <button
                                onClick={() => setActiveTab("process")}
                                className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${activeTab === "process"
                                    ? "bg-white text-[#bfa888] shadow-md"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                복원 과정
                            </button>
                            <button
                                onClick={() => setActiveTab("examples")}
                                className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${activeTab === "examples"
                                    ? "bg-white text-[#bfa888] shadow-md"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                복원 예시
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 서비스 소개 탭 */}
            {activeTab === "service" && (
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">복원 서비스 종류</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                다양한 유형의 사진 손상을 전문적으로 복원해드립니다
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {restorationServices.map((service, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                                    <div className="w-16 h-16 bg-[#bfa888] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <div className="text-white">{service.icon}</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <ul className="text-sm text-gray-500 space-y-1">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center justify-center">
                                                <CheckCircle className="h-4 w-4 mr-2 text-[#bfa888]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 복원 과정 탭 */}
            {activeTab === "process" && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">복원 과정</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                체계적이고 전문적인 복원 과정을 통해 최고의 결과물을 제공합니다
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {restorationProcess.map((process, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-20 h-20 bg-[#bfa888] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-white text-2xl font-bold">{process.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{process.title}</h3>
                                    <p className="text-gray-600">{process.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <div className="inline-flex items-center bg-white px-8 py-4 rounded-full shadow-lg">
                                <Users className="h-6 w-6 mr-3 text-[#bfa888]" />
                                <span className="text-gray-800 font-medium">
                                    복원 작업은 평균 3-7일 소요됩니다
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 복원 예시 탭 */}
            {activeTab === "examples" && (
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">복원 전후 예시</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                실제 복원 작업을 통해 변화된 결과를 확인해보세요
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {beforeAfterExamples.map((example, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{example.title}</h3>
                                        <p className="text-gray-600 mb-4">{example.description}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-2">복원 전</p>
                                                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-gray-400 text-sm">이미지</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-2">복원 후</p>
                                                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-gray-400 text-sm">이미지</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 문의 섹션 */}
            <section className="py-20 bg-[#bfa888] text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">복원 서비스 문의</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        소중한 추억이 담긴 사진을 복원하고 싶으시다면 언제든 연락주세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:032-875-4788"
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#bfa888] rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="h-5 w-5 mr-2" />
                            전화 문의
                        </a>
                        <a
                            href="/reservation"
                            className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full hover:bg-white hover:text-[#bfa888] transition-colors"
                        >
                            <ArrowRight className="h-5 w-5 mr-2" />
                            온라인 문의
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
