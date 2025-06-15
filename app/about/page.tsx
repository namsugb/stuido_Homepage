"use client";

import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 pt-24 pb-20">
                <div className="text-center mt-16 mb-12">
                    <h1 className="text-4xl font-bold my-4">아침햇살 스튜디오 소개</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        따뜻한 햇살처럼, 소중한 순간을 아름답게 담아드립니다.<br />
                        가족의 이야기, 인생의 전환점, 그리고 당신만의 특별한 시간을 사진으로 남겨보세요.
                    </p>
                </div>

                {/* 작가 소개 */}
                <section className="mt-16 mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col justify-center gap-4">
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
                            <li>전) 한국프로사진협회 전라남도지회 지회장</li>
                        </ul>
                    </div>
                </section>

                {/* 스튜디오 공간 소개 */}
                <section className="mb-16 flex flex-col md:flex-row items-start gap-8 md:gap-16">
                    <div className="w-full mt-16 md:w-1/2 flex flex-col justify-start items-start gap-32">
                        <Image
                            src="/studio-interior.jpg"
                            alt="스튜디오 내부"
                            width={500}
                            height={350}
                            className="rounded-lg shadow-md object-cover"
                        />
                        <Image
                            src="/studio-interior.jpg"
                            alt="스튜디오 내부"
                            width={320}
                            height={350}
                            className="rounded-lg shadow-md object-cover"
                        />
                        <Image
                            src="/studio-garden.jpg"
                            alt="스튜디오 정원"
                            width={320}
                            height={350}
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3">스튜디오 소개</h2>
                        <p className="text-gray-700 mb-2">
                            <b>☀️ "사진, 잘 나온 것도 좋지만… 오래 남는 게 더 좋더라고요."</b><br />
                            요즘은 워낙 사진 잘 찍는 분들도 많고,<br />
                            폰 카메라도 참 잘 나와요.<br />
                            그래도 누군가 "진짜 나 다운 사진을 남기고 싶다"고 하실 땐<br />
                            늘 마음이 움직여요.<br />
                            딱딱하게 포즈만 잡고 찍는 그런 사진 말고요.<br />
                            그 사람만의 분위기, 눈빛, 웃음, 삶의 온도 같은 것들…<br />
                            그게 정말 오래 남더라고요.<br />
                            그 순간을 잘 담아드리고 싶어서,<br />
                            오늘도 조심스럽고 진심으로 카메라를 들고 있어요.<br />
                            <br />
                            <b>📷 사진, 우리 집은 2대째 하고 있어요.</b><br />
                            저희 스튜디오는 2대째, 사진을 전공한 인물사진 전문 작가가 운영하고 있어요.<br />
                            아버님 세대부터 사진 일을 하셨고,<br />
                            저 역시 사진을 전공하면서 자연스럽게 이 길로 오게 됐죠.<br />
                            한 장의 사진이 사람의 마음을 움직이는 걸,<br />
                            어릴 때부터 곁에서 지켜보며 배웠거든요.<br />
                            무엇보다 "인물사진", 그중에서도<br />
                            사람의 시간과 감정을 담아내는 사진이 가장 소중하게 느껴졌어요.<br />
                            그래서 스튜디오도 그렇게 운영해왔고,<br />
                            어느새 20년이 넘었네요.<br />
                            <br />
                            <b>👨‍👩‍👧‍👦 3,000팀이 넘는 가족을 만나며</b><br />
                            그 시간 동안<br />
                            3,000팀이 넘는 가족과 인물사진을 촬영했어요.<br />
                            처음엔 돌잔치 때 오셨던 분이<br />
                            초등학교 입학사진, 졸업사진, 취업사진까지 함께 하기도 하고요.<br />
                            부모님 환갑기념 가족사진을 찍으셨던 분이<br />
                            나중에 다시 와서 리마인드 웨딩촬영을 하시기도 했죠.<br />
                            그 모든 순간이,<br />
                            정말 소중한 인연이자 기록이에요.<br />
                            <br />
                            <b>🌿 아침햇살스튜디오의 사진은 좀 다릅니다.</b><br />
                            정말 많은 분들이 이렇게 말씀하세요.<br />
                            "사진만 찍으면 어색해져요"<br />
                            저희도 이해해요. 낯선 공간에, 렌즈 앞에 서는 건 누구나 긴장되죠.<br />
                            그래서 저희는 무조건 천천히 시작해요.<br />
                            먼저 차 한 잔 마시면서 얘기부터 나눠요.<br />
                            어떤 사진이 필요하신지,<br />
                            요즘 어떤 일들로 지내고 계신지,<br />
                            편하게 이야기 나누다 보면 자연스럽게 표정도 풀리더라고요.<br />
                            촬영은 그렇게,<br />
                            당신이 당신답게 웃을 수 있는 순간을 기다리며 진행해요.<br />
                            한 장 한 장이 조금 더 당신 같기를 바라는 마음으로<br />
                            촬영하고, 보정하고, 출력까지 정성껏 합니다.<br />
                            <br />
                            무엇보다 저희 스튜디오는<br />
                            순천 외곽에 자리한 조용한 하우스형 스튜디오예요.<br />
                            400평 규모의 정원이 있어서 계절 따라 풍경이 바뀌고,<br />
                            계절마다 분위기가 다른 야외 정원,<br />
                            아이도 어르신도 편하게 쉴 수 있는 감성 카페 공간도 함께 있어요.<br />
                            촬영도 중요하지만, 그 시간을 편안하게 보내는 것도 중요하다고 생각해요.<br />
                            <br />

                            <b>🌞 우리만의 사진, 우리만의 순간</b><br />
                            어떤 분은 "그냥 취업사진만 잘 찍어주세요" 하고 오셨다가,<br />
                            "이런 표정이 제 얼굴에도 있었네요" 하며 웃고 가시기도 해요.<br />
                            그게 바로 저희가 사진을 좋아하는 이유예요.<br />
                            사람을, 기억을, 그 순간의 감정을<br />
                            오래도록 꺼내볼 수 있는 형태로 남길 수 있으니까요.<br />
                            아무 때나 좋아요.<br />
                            날씨 좋은 날, 기분 좋은 날,<br />
                            혹은 그냥 왠지 오늘은 사진을 찍고 싶어진 날.<br />
                            편하게 놀러오듯 들러주세요.<br />
                            당신을 닮은 따뜻한 사진,<br />
                            아침햇살처럼 빛나게 준비해드릴게요.<br />
                            <br />
                            우리 스튜디오가 중요하게 생각하는 것<br />
                            한 마디로 말하자면,<br />
                            <b>"내가 찍히고 싶은 사진을 찍어드리고 싶다"</b>는 마음이에요.<br />
                            너무 과하게 꾸미지 않으면서<br />
                            그 사람만의 매력을, 있는 그대로 보여주는 사진.<br />
                            오래 봐도 마음이 따뜻해지는 그런 사진.<br />
                            그게 저희가 지향하는 사진이에요.<br />
                            <br />
                            – 순천 인물사진 전문<br />
                            아침햇살스튜디오에서 드립니다 :)
                        </p>
                    </div>
                </section>

                {/* 서비스 특징 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-3 text-center">아침햇살 스튜디오의 약속</h2>
                    <ul className="grid md:grid-cols-3 gap-8 text-gray-700 text-center">
                        <li className="bg-white rounded-lg shadow p-6">
                            <b className="block text-lg mb-2 text-[#bfa888]">평생의 추억</b>
                            시간이 지나도 변치 않는 가족의 사랑을 사진으로 남겨드립니다.
                        </li>
                        <li className="bg-white rounded-lg shadow p-6">
                            <b className="block text-lg mb-2 text-[#bfa888]">1:1 맞춤 촬영</b>
                            가족별, 인물별로 원하는 분위기와 스타일을 충분히 상담 후 촬영합니다.
                        </li>
                        <li className="bg-white rounded-lg shadow p-6">
                            <b className="block text-lg mb-2 text-[#bfa888]">고품질 결과물</b>
                            모든 사진은 세심한 후보정과 고급 인화, 액자/앨범으로 제공됩니다.
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
} 