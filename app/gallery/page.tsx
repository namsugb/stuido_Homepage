"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"

// Replace the galleryData object with the following that uses placeholder images
const galleryData = {
  all: [
    // family
    { src: "/main_gallery/family/family01.jpg", alt: "가족사진 1", category: "family" },
    { src: "/main_gallery/family/family02.jpg", alt: "가족사진 2", category: "family" },
    { src: "/main_gallery/family/family03.jpg", alt: "가족사진 3", category: "family" },
    { src: "/main_gallery/family/family04.jpg", alt: "가족사진 4", category: "family" },
    { src: "/main_gallery/family/family05.jpg", alt: "가족사진 5", category: "family" },
    { src: "/main_gallery/family/family06.jpg", alt: "가족사진 6", category: "family" },
    { src: "/main_gallery/family/family07.jpg", alt: "가족사진 7", category: "family" },
    { src: "/main_gallery/family/family08.jpg", alt: "가족사진 8", category: "family" },
    { src: "/main_gallery/family/family09.jpg", alt: "가족사진 9", category: "family" },

    // id
    { src: "/main_gallery/id/id01.jpg", alt: "증명사진 1", category: "id" },
    { src: "/main_gallery/id/id02.jpg", alt: "증명사진 2", category: "id" },
    { src: "/main_gallery/id/id03.jpg", alt: "증명사진 3", category: "id" },
    { src: "/main_gallery/id/id04.jpg", alt: "증명사진 4", category: "id" },
    { src: "/main_gallery/id/id05.jpg", alt: "증명사진 5", category: "id" },
    { src: "/main_gallery/id/id06.jpg", alt: "증명사진 6", category: "id" },
    { src: "/main_gallery/id/id07.jpg", alt: "증명사진 7", category: "id" },
    { src: "/main_gallery/id/id08.jpg", alt: "증명사진 8", category: "id" },
    { src: "/main_gallery/id/id09.jpg", alt: "증명사진 9", category: "id" },
    { src: "/main_gallery/id/id10.jpg", alt: "증명사진 10", category: "id" },
    { src: "/main_gallery/id/id11.jpg", alt: "증명사진 11", category: "id" },

    // long
    { src: "/main_gallery/long/long01.jpg", alt: "장수사진 1", category: "longevity" },
    { src: "/main_gallery/long/long02.jpg", alt: "장수사진 2", category: "longevity" },
    { src: "/main_gallery/long/long03.jpg", alt: "장수사진 3", category: "longevity" },
    { src: "/main_gallery/long/long04.jpg", alt: "장수사진 4", category: "longevity" },
    { src: "/main_gallery/long/long05.jpg", alt: "장수사진 5", category: "longevity" },

    // profile
    { src: "/main_gallery/profile/profile01.jpg", alt: "프로필사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile02.jpg", alt: "프로필사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile03.jpg", alt: "프로필사진 3", category: "friend" },
    { src: "/main_gallery/profile/profile04.jpg", alt: "프로필사진 4", category: "friend" },
    { src: "/main_gallery/profile/profile05.jpg", alt: "프로필사진 5", category: "friend" },
    { src: "/main_gallery/profile/profile06.jpg", alt: "프로필사진 6", category: "friend" },
    { src: "/main_gallery/profile/profile07.jpg", alt: "프로필사진 7", category: "friend" },
    { src: "/main_gallery/profile/profile08.jpg", alt: "프로필사진 8", category: "friend" },
    { src: "/main_gallery/profile/profile09.jpg", alt: "프로필사진 9", category: "friend" },
    { src: "/main_gallery/profile/profile10.jpg", alt: "프로필사진 10", category: "friend" },
    { src: "/main_gallery/profile/profile11.jpg", alt: "프로필사진 11", category: "friend" },

    // remind (리마인드웨딩)
    { src: "/main_gallery/remind/remind_2f1a8824_12x17.jpg", alt: "리마인드웨딩 1", category: "wedding" },
    { src: "/main_gallery/remind/remind_003_03_1차.jpg", alt: "리마인드웨딩 2", category: "wedding" },
    { src: "/main_gallery/remind/remind_004_01_1차.jpg", alt: "리마인드웨딩 3", category: "wedding" },
    { src: "/main_gallery/remind/remind_004a0344-1.jpg", alt: "리마인드웨딩 4", category: "wedding" },
    { src: "/main_gallery/remind/remind_004a0391.jpg", alt: "리마인드웨딩 5", category: "wedding" },
    { src: "/main_gallery/remind/remind_005_01_1차.jpg", alt: "리마인드웨딩 6", category: "wedding" },
    { src: "/main_gallery/remind/remind_8u0a0352_복사.jpg", alt: "리마인드웨딩 7", category: "wedding" },
    { src: "/main_gallery/remind/remind_박봉숙_(4).jpg", alt: "리마인드웨딩 8", category: "wedding" },
    { src: "/main_gallery/remind/remind_윤혜원_(10).jpg", alt: "리마인드웨딩 9", category: "wedding" },
    { src: "/main_gallery/remind/remind_윤혜원_(8).jpg", alt: "리마인드웨딩 10", category: "wedding" }
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
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 bg-white"
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
