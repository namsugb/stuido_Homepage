import { SliderImage } from "@/types"

type SliderImageMeta = Omit<SliderImage, "src" | "srcMobile">

const desktopImageFiles = [
    "main_slider_desktop_01.jpeg",
    "main_slider_desktop_02.jpeg",
    "main_slider_desktop_03.jpeg",
    "main_slider_desktop_04.jpeg",
    "main_slider_desktop_05.jpeg",
    "main_slider_desktop_06.jpeg",
    "KakaoTalk_20260405_001657367.jpg",
    "KakaoTalk_20260405_001657367_01.jpg",
    "KakaoTalk_20260405_001657367_02.jpg",
    "KakaoTalk_20260405_001657367_03.jpg",
    "KakaoTalk_20260405_001657367_04.jpg",
    "KakaoTalk_20260405_001657367_05.jpg",
    "KakaoTalk_20260405_001657367_06.jpg",
    "KakaoTalk_20260405_001657367_07.jpg",
    "KakaoTalk_20260405_001657367_08.jpg",
] as const

const mobileImageFiles = [
    "main_slider_mobile_01.jpeg",
    "main_slider_mobile_02.jpeg",
    "main_slider_mobile_03.jpeg",
    "main_slider_mobile_04.jpeg",
    "main_slider_mobile_05.jpeg",
    "main_slider_mobile_06.jpeg",
    "KakaoTalk_20260405_004816571.jpg",
    "KakaoTalk_20260405_004816571_01.jpg",
    "KakaoTalk_20260405_004816571_02.jpg",
    "KakaoTalk_20260405_004816571_03.jpg",
    "KakaoTalk_20260405_004816571_04.jpg",
    "KakaoTalk_20260405_004816571_05.jpg",
    "KakaoTalk_20260405_004816571_06.jpg",
    "KakaoTalk_20260405_004816571_07.jpg",
    "KakaoTalk_20260405_004816571_08.jpg",
] as const

const sliderMetadata: SliderImageMeta[] = [
    {
        alt: "웨딩 촬영 메인 슬라이드",
        bgColor: "#D8DCE7",
        title: "소중한 순간의 시작",
        description: "가족의 아름다운 시간을 사진으로 담아냅니다.",
        desktoptextbackground: false,
        mobiletextbackground: false,
    },
    {
        alt: "가족사진 메인 슬라이드",
        bgColor: "#CECFCF",
        title: "우리 가족의 이야기",
        description: "오래도록 간직할 따뜻한 추억을 기록합니다.",
        desktoptextbackground: true,
        mobiletextbackground: false,
    },
    {
        alt: "개인 프로필 메인 슬라이드",
        bgColor: "#A5877D",
        title: "당신만의 매력",
        description: "아름다운 본연의 모습을 자연스럽게 담아냅니다.",
        desktoptextbackground: true,
        mobiletextbackground: false,
    },
    {
        alt: "우정 촬영 메인 슬라이드",
        bgColor: "#D8DCE7",
        title: "함께하는 행복",
        description: "가족과 함께하는 즐거운 추억을 사진으로 남겨드립니다.",
        desktoptextbackground: false,
        mobiletextbackground: true,
    },
    {
        alt: "컨셉 촬영 메인 슬라이드",
        bgColor: "#CECFCF",
        title: "일상을 예술로",
        description: "당신의 모든 모습을 사진으로 담아드립니다.",
        desktoptextbackground: false,
        mobiletextbackground: true,
    },
    {
        alt: "특별한 순간 메인 슬라이드",
        bgColor: "#A5877D",
        title: "영원한 시간",
        description: "시간이 흘러도 변치 않을 순간을 담아냅니다.",
        desktoptextbackground: true,
        mobiletextbackground: true,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 7",
        bgColor: "#D8DCE7",
        title: "자연스러운 미소",
        description: "편안한 분위기에서 가장 아름다운 순간을 기록합니다.",
        desktoptextbackground: false,
        mobiletextbackground: false,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 8",
        bgColor: "#CECFCF",
        title: "따뜻한 가족 사진",
        description: "가족의 사랑이 담긴 장면을 섬세하게 남겨드립니다.",
        desktoptextbackground: true,
        mobiletextbackground: false,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 9",
        bgColor: "#A5877D",
        title: "특별한 날의 기록",
        description: "기억하고 싶은 하루를 오래 남을 사진으로 완성합니다.",
        desktoptextbackground: true,
        mobiletextbackground: true,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 10",
        bgColor: "#D8DCE7",
        title: "감성적인 무드",
        description: "자연광과 공간의 분위기를 살린 감성 촬영을 제공합니다.",
        desktoptextbackground: false,
        mobiletextbackground: true,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 11",
        bgColor: "#CECFCF",
        title: "소중한 추억",
        description: "오늘의 표정과 공기를 그대로 담아 오래 간직하게 합니다.",
        desktoptextbackground: true,
        mobiletextbackground: false,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 12",
        bgColor: "#A5877D",
        title: "편안한 촬영 경험",
        description: "부담 없이 웃고 즐길 수 있는 촬영 시간을 만들어드립니다.",
        desktoptextbackground: true,
        mobiletextbackground: true,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 13",
        bgColor: "#D8DCE7",
        title: "밝고 선명한 순간",
        description: "깨끗한 톤과 자연스러운 연출로 지금을 담아냅니다.",
        desktoptextbackground: false,
        mobiletextbackground: false,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 14",
        bgColor: "#CECFCF",
        title: "우리만의 이야기",
        description: "한 장 한 장에 소중한 관계와 감정을 정성스럽게 담습니다.",
        desktoptextbackground: true,
        mobiletextbackground: false,
    },
    {
        alt: "좋은날 스튜디오 메인 슬라이드 15",
        bgColor: "#A5877D",
        title: "기억될 한 컷",
        description: "오래 보아도 좋은 사진으로 특별한 순간을 완성합니다.",
        desktoptextbackground: true,
        mobiletextbackground: true,
    },
]

if (
    desktopImageFiles.length !== mobileImageFiles.length ||
    desktopImageFiles.length !== sliderMetadata.length
) {
    throw new Error("Slider image data is out of sync with available desktop/mobile assets.")
}

export const sliderImages: SliderImage[] = sliderMetadata.map((meta, index) => ({
    ...meta,
    src: `/main/slider/desktop/${desktopImageFiles[index]}`,
    srcMobile: `/main/slider/mobile/${mobileImageFiles[index]}`,
}))
