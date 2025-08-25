import type { Metadata } from 'next'

// 기본 메타데이터 설정
export const defaultMetadata: Metadata = {
    title: '팝콘스튜디오 인천점 | 인천 가족사진, 프로필, 리마인드웨딩 전문',
    description: '인천 팝콘스튜디오 인천점는 가족사진, 프로필, 리마인드웨딩, 증명사진 등 다양한 촬영을 전문적으로 제공합니다. 소중한 순간을 아름답게 남겨드립니다.',
    keywords: '인천 가족사진, 인천 스튜디오, 프로필 사진, 리마인드웨딩, 증명사진, 팝콘스튜디오 인천점, 가족사진관',
    authors: [{ name: '팝콘스튜디오 인천점' }],
    creator: '팝콘스튜디오 인천점',
    publisher: '팝콘스튜디오 인천점',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://achimhaessal.kr'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: '팝콘스튜디오 인천점 | 인천 가족사진, 프로필, 리마인드웨딩 전문',
        description: '인천 팝콘스튜디오 인천점에서 가족, 프로필, 리마인드웨딩, 증명사진 등 다양한 촬영을 경험하세요.',
        type: 'website',
        url: 'https://achimhaessal.kr',
        siteName: '팝콘스튜디오 인천점',
        locale: 'ko_KR',
        images: [
            {
                url: '/slider/slider1_desktop.jpeg',
                width: 1200,
                height: 630,
                alt: '팝콘스튜디오 인천점 대표 작품 - 가족사진',
            },
            {
                url: '/slider/slider2_desktop.jpeg',
                width: 1200,
                height: 630,
                alt: '팝콘스튜디오 인천점 프로필사진',
            },
            {
                url: '/slider/slider3_desktop.jpeg',
                width: 1200,
                height: 630,
                alt: '팝콘스튜디오 인천점 리마인드웨딩',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@achimhaessal',
        title: '팝콘스튜디오 인천점 | 인천 가족사진, 프로필, 리마인드웨딩 전문',
        description: '순천 가족사진, 프로필, 리마인드웨딩, 증명사진 전문 스튜디오. 소중한 순간을 아름답게 남겨드립니다.',
        images: ['/slider/slider1_desktop.jpeg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: '', // Google Search Console 인증 코드 추가 필요
        other: {
            'naver-site-verification': '', // 네이버 웹마스터도구 인증 코드 추가 필요
        },
    },
}

// 갤러리 페이지 메타데이터
export const galleryMetadata: Metadata = {
    title: '갤러리 | 팝콘스튜디오 인천점',
    description: '팝콘스튜디오 인천점의 다양한 촬영 작품들을 확인해보세요. 가족사진, 프로필, 리마인드웨딩 등 전문적인 사진 작품을 만나보실 수 있습니다.',
    openGraph: {
        title: '갤러리 | 팝콘스튜디오 인천점',
        description: '팝콘스튜디오 인천점의 다양한 촬영 작품들을 확인해보세요.',
        images: [
            {
                url: '/main_gallery/family/[크기변환]004A0344_(2).jpg',
                width: 1200,
                height: 630,
                alt: '가족사진 갤러리',
            },
        ],
    },
}

// 상품소개 페이지 메타데이터
export const productsMetadata: Metadata = {
    title: '상품소개 | 팝콘스튜디오 인천점',
    description: '팝콘스튜디오 인천점의 다양한 촬영 패키지를 소개합니다. 가족사진, 프로필사진, 리마인드웨딩 등 맞춤형 촬영 서비스를 제공합니다.',
    openGraph: {
        title: '상품소개 | 팝콘스튜디오 인천점',
        description: '팝콘스튜디오 인천점의 다양한 촬영 패키지를 소개합니다.',
        images: [
            {
                url: '/main_product/big-family-package.jpg',
                width: 1200,
                height: 630,
                alt: '가족사진 패키지 상품',
            },
        ],
    },
}

// 이벤트 페이지 메타데이터
export const eventsMetadata: Metadata = {
    title: '이벤트 | 팝콘스튜디오 인천점',
    description: '팝콘스튜디오 인천점의 진행중인 특별 이벤트를 확인해보세요. 가족사진 촬영 할인, 특별 패키지 등 다양한 혜택을 만나보실 수 있습니다.',
    openGraph: {
        title: '이벤트 | 팝콘스튜디오 인천점',
        description: '팝콘스튜디오 인천점의 진행중인 특별 이벤트를 확인해보세요.',
        images: [
            {
                url: '/event/event1.jpg',
                width: 1200,
                height: 630,
                alt: '진행중인 이벤트',
            },
        ],
    },
}
