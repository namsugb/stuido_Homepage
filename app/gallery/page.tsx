"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"

// Replace the galleryData object with the following that uses placeholder images
const galleryData = {
  all: [
    {
      src: "/placeholder.svg?height=400&width=400&query=pink%20family%20portrait",
      alt: "핑크 컨셉 가족 사진",
      category: "family",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=love%20concept%20family%20photo",
      alt: "LOVE 컨셉 가족 사진",
      category: "family",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20with%20pet%20photo",
      alt: "반려동물과 함께하는 가족 사진",
      category: "family",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=blue%20concept%20family%20photo",
      alt: "화사한 블루 컨셉 가족 사진",
      category: "family",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20by%20window",
      alt: "창가에서 촬영한 가족 사진",
      category: "family",
    },
    // 리마인드 웨딩 이미지
    {
      src: "/placeholder.svg?height=400&width=400&query=senior%20couple%20wedding",
      alt: "노부부 리마인드 웨딩",
      category: "wedding",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20wedding%20photo",
      alt: "가족 리마인드 웨딩",
      category: "wedding",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=mother%20daughter%20wedding",
      alt: "모녀 웨딩 촬영",
      category: "wedding",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20wedding%20portrait",
      alt: "가족 웨딩 촬영",
      category: "wedding",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20wedding%20studio",
      alt: "가족 웨딩 스튜디오 촬영",
      category: "wedding",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=young%20couple%20wedding",
      alt: "청년 웨딩 촬영",
      category: "wedding",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20group%20wedding",
      alt: "가족 웨딩 단체 촬영",
      category: "wedding",
    },
    { src: "/placeholder.svg?height=400&width=400&query=family%20portrait", alt: "가족 사진", category: "family" },
    // 칠순/팔순 이미지
    {
      src: "/placeholder.svg?height=400&width=400&query=elderly%20couple%20hanbok",
      alt: "한복 입은 노부부 칠순 기념 촬영",
      category: "celebration",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20celebration%20ceremony",
      alt: "가족과 함께하는 칠순 기념식",
      category: "celebration",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=elderly%20birthday%20cake",
      alt: "케이크와 함께하는 칠순 기념 촬영",
      category: "celebration",
    },
    // 증명사진 이미지 추가
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20formal",
      alt: "여성 증명사진 - 정장",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20studio",
      alt: "여성 증명사진 - 아침햇살 스튜디오",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=male%20ID%20photo%20blue",
      alt: "남성 증명사진 - 파란 배경",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=male%20ID%20photo%20mint",
      alt: "남성 증명사진 - 민트 배경",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20beige",
      alt: "여성 증명사진 - 베이지 배경",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20blue",
      alt: "여성 증명사진 - 파란 배경",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20formal%20blue",
      alt: "여성 증명사진 - 파란 배경 정장",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20long%20hair",
      alt: "여성 증명사진 - 긴 머리",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20white%20formal",
      alt: "여성 증명사진 - 흰 배경 정장",
      category: "id",
    },
    {
      src: "/placeholder.svg?height=400&width=400&query=female%20ID%20photo%20white%20casual",
      alt: "여성 증명사진 - 흰 배경 캐주얼",
      category: "id",
    },
    // 추가 이미지들 (카테고리별로 분류)
    {
      src: "/placeholder.svg?height=400&width=400&query=family%20birthday%20celebration",
      alt: "가족 생일 촬영",
      category: "family",
    },
  ],
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredImages, setFilteredImages] = useState(galleryData.all)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 필터링
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(galleryData.all)
    } else {
      setFilteredImages(galleryData.all.filter((img) => img.category === selectedCategory))
    }
  }, [selectedCategory])

  // 로딩 상태 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsLoading(true)
    // 카테고리 변경 시 로딩 효과를 위한 짧은 딜레이
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // 이미지 클릭 핸들러
  const handleImageClick = (src: string) => {
    setSelectedImage(src)
    // 라이트박스 열릴 때 스크롤 방지
    document.body.style.overflow = "hidden"
  }

  // 라이트박스 닫기 핸들러
  const closeLightbox = () => {
    setSelectedImage(null)
    // 라이트박스 닫힐 때 스크롤 복원
    document.body.style.overflow = "auto"
  }

  // 카테고리 데이터
  const categories = [
    { id: "family", name: "가족사진" },
    { id: "wedding", name: "리마인드웨딩" },
    { id: "longevity", name: "장수사진" },
    { id: "id", name: "증명사진" },
    { id: "friend", name: "우정/프로필/커플/주니어" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 갤러리 메인 컨텐츠 */}
      <main className="container mt-16 mx-auto px-6 pt-20 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">갤러리</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            아침햇살 스튜디오의 작품들을 감상해보세요. 가족사진, 리마인드웨딩, 칠순/팔순 잔치, 증명사진 등 다양한 촬영
            작품을 카테고리별로 확인하실 수 있습니다.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${selectedCategory === category.id
                ? "bg-[#bfa888] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 갤러리 그리드 */}
        <div className="gallery-grid">
          {isLoading ? (
            // 로딩 스켈레톤
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="gallery-item animate-pulse">
                <div className="bg-gray-200 rounded-lg h-full w-full"></div>
              </div>
            ))
          ) : filteredImages.length > 0 ? (
            // 필터링된 이미지 표시
            filteredImages.map((image, index) => (
              <div key={index} className="gallery-item" onClick={() => handleImageClick(image.src)}>
                <div className="relative group overflow-hidden rounded-lg cursor-pointer h-full">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      확대보기
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 결과 없음 메시지
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">해당 카테고리에 이미지가 없습니다.</p>
            </div>
          )}
        </div>
      </main>

      {/* 라이트박스 */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            className="absolute top-6 right-6 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="확대 이미지"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-[#333] py-8 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
