"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"

// Replace the galleryData object with the following that uses placeholder images
const galleryData = {
  all: [
    // family - 턱시도&드레스 컨셉
    { src: "/main_gallery/family/[크기변환]007_04_1차.jpg", alt: "턱시도&드레스 가족사진 1", category: "family", subCategory: "tuxedo_dress" },
    { src: "/main_gallery/family/[크기변환]007_03_1차.jpg", alt: "턱시도&드레스 가족사진 2", category: "family", subCategory: "tuxedo_dress" },
    { src: "/main_gallery/family/[크기변환]007_02_1차.jpg", alt: "턱시도&드레스 가족사진 3", category: "family", subCategory: "tuxedo_dress" },
    { src: "/main_gallery/family/[크기변환]006_02_1차.jpg", alt: "턱시도&드레스 가족사진 4", category: "family", subCategory: "tuxedo_dress" },
    
    // family - 정장 컨셉
    { src: "/main_gallery/family/[크기변환]004A1651.JPG", alt: "정장 가족사진 1", category: "family", subCategory: "formal" },
    { src: "/main_gallery/family/[크기변환]004A1572.JPG", alt: "정장 가족사진 2", category: "family", subCategory: "formal" },
    { src: "/main_gallery/family/[크기변환]004A1432.JPG", alt: "정장 가족사진 3", category: "family", subCategory: "formal" },
    { src: "/main_gallery/family/[크기변환]004A0817_(2).jpg", alt: "정장 가족사진 4", category: "family", subCategory: "formal" },
    { src: "/main_gallery/family/[크기변환]004A0838_(2).jpg", alt: "정장 가족사진 5", category: "family", subCategory: "formal" },
    
    // family - 한복
    { src: "/main_gallery/family/[크기변환]7X1A3243 20x24_1차.jpg", alt: "한복 가족사진 1", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/[크기변환]7X1A0451_1차.JPG", alt: "한복 가족사진 2", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/[크기변환]004A1257 30x40 복사.jpg", alt: "한복 가족사진 3", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/[크기변환]5_3차.jpg", alt: "한복 가족사진 4", category: "family", subCategory: "hanbok" },
    
    // family - 캐주얼
    { src: "/main_gallery/family/[크기변환]IMG_0626.jpg", alt: "캐주얼 가족사진 1", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/[크기변환]B64A0049_(2).jpg", alt: "캐주얼 가족사진 2", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/[크기변환]8U0A1147-1.jpg", alt: "캐주얼 가족사진 3", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/[크기변환]004A0352_(2).jpg", alt: "캐주얼 가족사진 4", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/[크기변환]004A0351_(2).jpg", alt: "캐주얼 가족사진 5", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/[크기변환]004A0344_(2).jpg", alt: "캐주얼 가족사진 6", category: "family", subCategory: "casual" },

    // 증명사진/프로필
    { src: "/main_gallery/id/id04.jpg", alt: "증명사진 1", category: "id" },
    { src: "/main_gallery/id/id01.jpg", alt: "증명사진 2", category: "id" },
    { src: "/main_gallery/id/id02.jpg", alt: "증명사진 3", category: "id" },
    { src: "/main_gallery/id/id07.jpg", alt: "증명사진 4", category: "id" },
    { src: "/main_gallery/id/id08.jpg", alt: "증명사진 5", category: "id" },
    { src: "/main_gallery/id/id09.jpg", alt: "증명사진 6", category: "id" },
    { src: "/main_gallery/id/id10.jpg", alt: "증명사진 7", category: "id" },
    { src: "/main_gallery/id/id11.jpg", alt: "증명사진 8", category: "id" },
    { src: "/main_gallery/id/id06.jpg", alt: "증명사진 9", category: "id" },
    { src: "/main_gallery/profile/profile01.jpg", alt: "프로필사진 1", category: "id" },
    { src: "/main_gallery/profile/profile02.jpg", alt: "프로필사진 2", category: "id" },
    { src: "/main_gallery/profile/profile03.jpg", alt: "프로필사진 3", category: "id" },
    { src: "/main_gallery/profile/profile04.jpg", alt: "프로필사진 4", category: "id" },

    // 장수사진
    { src: "/main_gallery/long/long01.jpg", alt: "장수사진 1", category: "longevity" },
    { src: "/main_gallery/long/long02.jpg", alt: "장수사진 2", category: "longevity" },
    { src: "/main_gallery/long/long03.jpg", alt: "장수사진 3", category: "longevity" },
    { src: "/main_gallery/long/long05.jpg", alt: "장수사진 4", category: "longevity" },

    // 우정/커플/주니어
    { src: "/main_gallery/profile/profile05.jpg", alt: "우정 사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile06.jpg", alt: "우정 사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile07.jpg", alt: "커플 사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile08.jpg", alt: "커플 사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile09.jpg", alt: "주니어 사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile10.jpg", alt: "주니어 사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile11.jpg", alt: "주니어 사진 3", category: "friend" },

    // 웨딩 - 세미웨딩 (스튜디오 촬영 느낌의 이미지들)
    { src: "/main_gallery/remind/[크기변환]2F1A8824 12x17.JPG", alt: "세미웨딩 1", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A8813.JPG", alt: "세미웨딩 2", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A8770 5x7.JPG", alt: "세미웨딩 3", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A8670.JPG", alt: "세미웨딩 4", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A8121.JPG", alt: "세미웨딩 5", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]0A8A8123.JPG", alt: "세미웨딩 6", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]0A8A8108-1216 디아섹_1차.JPG", alt: "세미웨딩 7", category: "wedding", subCategory: "semi_wedding" },
    { src: "/main_gallery/remind/[크기변환]0A8A8081-810_1차.JPG", alt: "세미웨딩 8", category: "wedding", subCategory: "semi_wedding" },

    // 웨딩 - 리마인드웨딩 (기념 촬영 느낌의 이미지들)
    { src: "/main_gallery/remind/[크기변환]윤혜원 (10).JPG", alt: "리마인드웨딩 1", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]윤혜원 (8).jpg", alt: "리마인드웨딩 2", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]윤혜원 (15).JPG", alt: "리마인드웨딩 3", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]윤혜원 (14).JPG", alt: "리마인드웨딩 4", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]윤혜원 (12).JPG", alt: "리마인드웨딩 5", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]박봉숙 (4).jpg", alt: "리마인드웨딩 6", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]8U0A0352 복사.jpg", alt: "리마인드웨딩 7", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]005_01_1차.jpg", alt: "리마인드웨딩 8", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]004A0391.jpg", alt: "리마인드웨딩 9", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]004A0344-1.jpg", alt: "리마인드웨딩 10", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]004_01_1차.jpg", alt: "리마인드웨딩 11", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]003_03_1차.jpg", alt: "리마인드웨딩 12", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A3776 표지뒤.JPG", alt: "리마인드웨딩 13", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A1780_1차.JPG", alt: "리마인드웨딩 14", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A1763-66.JPG", alt: "리마인드웨딩 15", category: "wedding", subCategory: "remind_wedding" },
    { src: "/main_gallery/remind/[크기변환]2F1A1749-68.JPG", alt: "리마인드웨딩 16", category: "wedding", subCategory: "remind_wedding" }
  ],
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("family")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [filteredImages, setFilteredImages] = useState(galleryData.all)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 카테고리 및 하위 카테고리 필터링
  useEffect(() => {
    let filtered = galleryData.all
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter((img) => img.category === selectedCategory)
    }
    
    if (selectedSubCategory) {
      filtered = filtered.filter((img) => img.subCategory === selectedSubCategory)
    }
    
    setFilteredImages(filtered)
  }, [selectedCategory, selectedSubCategory])

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
    setSelectedSubCategory(null) // 카테고리 변경 시 하위 카테고리 초기화
    setIsLoading(true)
    // 카테고리 변경 시 로딩 효과를 위한 짧은 딜레이
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // 하위 카테고리 변경 핸들러
  const handleSubCategoryChange = (subCategory: string | null) => {
    setSelectedSubCategory(subCategory)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
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

  // 카테고리 데이터 (하위 카테고리 포함)
  const categories = [
    { 
      id: "family", 
      name: "가족사진",
      subCategories: [
        { id: "tuxedo_dress", name: "턱시도&드레스 컨셉" },
        { id: "formal", name: "정장 컨셉" },
        { id: "hanbok", name: "한복" },
        { id: "casual", name: "캐주얼" }
      ]
    },
    { 
      id: "wedding", 
      name: "웨딩",
      subCategories: [
        { id: "semi_wedding", name: "세미웨딩" },
        { id: "remind_wedding", name: "리마인드웨딩" }
      ]
    },
    { id: "longevity", name: "장수사진" },
    { id: "id", name: "증명사진/프로필" },
    { id: "friend", name: "우정/커플/주니어" },
  ]

  // 현재 카테고리의 하위 카테고리 가져오기
  const getCurrentSubCategories = () => {
    const category = categories.find(cat => cat.id === selectedCategory)
    return category?.subCategories || []
  }

  return (
    <div className="min-h-screen">
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
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${selectedCategory === category.id
                ? "bg-[#bfa888] text-white"
                : "bg-card text-gray-700 hover:bg-gray-100"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 하위 카테고리 필터 */}
        {getCurrentSubCategories().length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => handleSubCategoryChange(null)}
              className={`px-4 py-1 text-sm rounded-full transition-all ${selectedSubCategory === null
                ? "bg-[#d4c4a8] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              전체
            </button>
            {getCurrentSubCategories().map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryChange(subCategory.id)}
                className={`px-4 py-1 text-sm rounded-full transition-all ${selectedSubCategory === subCategory.id
                  ? "bg-[#d4c4a8] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {subCategory.name}
              </button>
            ))}
          </div>
        )}

        {/* 갤러리 그리드 */}
        <div className="gallery-masonry">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="gallery-masonry-item animate-pulse">
                <div className="bg-gray-200 rounded-lg" style={{ aspectRatio: "4/3", width: "100%", height: "200px" }}></div>
              </div>
            ))
          ) : filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <div key={index} className="gallery-masonry-item" onClick={() => handleImageClick(image.src)}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-auto cursor-pointer transition-transform duration-500 rounded-lg group-hover:scale-105"
                />
              </div>
            ))
          ) : (
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
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} 아침햇살 스튜디오. All rights reserved.<br />
            대표 : 남유행, 사업자등록번호: 416-10-35417
          </p>
        </div>
      </footer>
    </div>
  )
}
