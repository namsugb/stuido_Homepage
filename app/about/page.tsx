"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f8f8f6]">
            <main className="container mx-auto px-4 pt-24 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">아침햇살 스튜디오 소개</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        따뜻한 햇살처럼, 소중한 순간을 아름답게 담아드립니다.<br />
                        가족의 이야기, 인생의 전환점, 그리고 당신만의 특별한 시간을 사진으로 남겨보세요.
                    </p>
                </div>

                {/* 작가 소개 */}
                <section className="mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                        <Image
                            src="/photographer.jpg"
                            alt="사진작가 프로필"
                            width={320}
                            height={400}
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3">사진작가 소개</h2>
                        <p className="text-gray-700 mb-2">
                            <b>김아침</b> 작가는 15년 경력의 가족사진 전문 포토그래퍼로,<br />
                            따뜻한 시선과 섬세한 연출로 많은 가족의 소중한 순간을 기록해왔습니다.<br />
                            <br />
                            <span className="text-gray-500 text-sm">
                                - 중앙대학교 사진학과 졸업<br />
                                - 국내외 가족사진 공모전 다수 수상<br />
                                - 2020년 대한민국 가족사진전 금상<br />
                                - 현) 아침햇살 스튜디오 대표작가
                            </span>
                        </p>
                        <p className="text-gray-700">
                            "사진은 시간이 지나도 변하지 않는 사랑의 기록입니다.<br />
                            여러분의 소중한 이야기를 진심을 담아 촬영하겠습니다."
                        </p>
                    </div>
                </section>

                {/* 스튜디오 공간 소개 */}
                <section className="mb-16 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
                    <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
                        <Image
                            src="/studio-interior.jpg"
                            alt="스튜디오 내부"
                            width={500}
                            height={350}
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3">스튜디오 공간</h2>
                        <p className="text-gray-700 mb-2">
                            아침햇살 스튜디오는 자연광이 가득 들어오는 따뜻한 공간에서,<br />
                            가족, 커플, 아이, 시니어 등 다양한 촬영이 가능합니다.<br />
                            <br />
                            <span className="text-gray-500 text-sm">
                                - 쾌적한 대기실과 분장실<br />
                                - 다양한 컨셉의 촬영 세트<br />
                                - 최신 조명 및 촬영 장비 완비<br />
                                - 주차 및 교통 편리
                            </span>
                        </p>
                        <p className="text-gray-700">
                            "편안한 분위기에서 자연스러운 모습을 이끌어내는 것이 저희의 목표입니다."
                        </p>
                    </div>
                </section>

                {/* 서비스 특징 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-3 text-center">아침햇살 스튜디오의 약속</h2>
                    <ul className="grid md:grid-cols-3 gap-8 text-gray-700 text-center">
                        <li className="bg-white rounded-lg shadow p-6">
                            <b className="block text-lg mb-2 text-[#bfa888]">1:1 맞춤 촬영</b>
                            가족별, 인물별로 원하는 분위기와 스타일을 충분히 상담 후 촬영합니다.
                        </li>
                        <li className="bg-white rounded-lg shadow p-6">
                            <b className="block text-lg mb-2 text-[#bfa888]">고품질 결과물</b>
                            모든 사진은 세심한 후보정과 고급 인화, 액자/앨범으로 제공됩니다.
                        </li>
                        <li className="bg-white rounded-lg shadow p-6">
                            <b className="block text-lg mb-2 text-[#bfa888]">평생의 추억</b>
                            시간이 지나도 변치 않는 가족의 사랑을 사진으로 남겨드립니다.
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
} 