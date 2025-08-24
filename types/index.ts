// 공통 타입 정의
export type Reservation = {
    id: number
    name: string
    phone: string
    email: string | null
    date: string
    time: string
    shooting_type: string
    people: number
    message: string | null
    created_at: string
    status: "신규문의" | "상담중" | "예약확정" | "보류" | "pending" | "confirmed" | "cancelled" | "completed"
    memo?: string
    referral_sources?: string
}

export type SliderImage = {
    src: string
    srcMobile: string
    alt: string
    bgColor: string
    title: string
    description: string
    desktoptextbackground: boolean
    mobiletextbackground: boolean
}

export type GalleryImage = {
    src: string
    alt: string
    category: string
    subCategory?: string
}

export type Product = {
    id: number
    category: string
    title: string
    price: string
    originalPrice?: string
    duration: string
    people: string
    image: string
    features: string[]
    description: string
    popular?: boolean
}

export type Review = {
    text: string
    img: string
    alt: string
    name: string
    type: string
}
