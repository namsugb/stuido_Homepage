"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 pt-24 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold my-4">아침햇살 스튜디오 소개</h1>
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
                        <h2 className="text-2xl font-bold mb-3">대표 소개</h2>
                        <p className="text-gray-700 mb-2">
                            <b>남유행</b> | 아침햇살스튜디오 대표 / 한국프로사진협회 초대작가
                        </p>
                        <p className="text-gray-700 mb-4">
                            사진은 제게 '사람의 마음을 담는 일'입니다.<br />
                            피사체를 마주할 때면, 그 사람만의 이야기를 사진에 고스란히 담아내고 싶어집니다.<br />
                            감성과 따뜻함이 묻어나는 인물사진, 가족의 웃음과 사랑이 그대로 전해지는 사진이 제가 추구하는 방향입니다.<br />
                            스튜디오를 운영한 지 벌써 2대째, 시간이 흘러도 변하지 않는 건 '진심으로 사람을 바라보는 시선'입니다.<br />
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
                            <li>전) 한국프로사진협회 전라남도지회 지회장</li>
                        </ul>
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