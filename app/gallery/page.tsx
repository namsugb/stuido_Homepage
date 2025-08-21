"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"

// 실제 파일명에 맞게 수정된 galleryData
const galleryData = {
  all: [
    // family - dress 컨셉 (드레스)
    { src: "/main_gallery/family/dress/dress_01.jpg", alt: "드레스 가족사진 1", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_02.jpg", alt: "드레스 가족사진 2", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_03.jpg", alt: "드레스 가족사진 3", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_04.jpg", alt: "드레스 가족사진 4", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_05.jpg", alt: "드레스 가족사진 5", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_06.jpg", alt: "드레스 가족사진 6", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_07.jpg", alt: "드레스 가족사진 7", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_08.jpg", alt: "드레스 가족사진 8", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_09.jpg", alt: "드레스 가족사진 9", category: "family", subCategory: "dress" },
    { src: "/main_gallery/family/dress/dress_10.jpg", alt: "드레스 가족사진 10", category: "family", subCategory: "dress" },

    // family - uniform 컨셉 (정장)
    { src: "/main_gallery/family/uniform/uniform_01.jpg", alt: "정장 가족사진 1", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_02.jpg", alt: "정장 가족사진 2", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_03.jpg", alt: "정장 가족사진 3", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_04.jpg", alt: "정장 가족사진 4", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_05.jpg", alt: "정장 가족사진 5", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_06.jpg", alt: "정장 가족사진 6", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_07.jpg", alt: "정장 가족사진 7", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_08.jpg", alt: "정장 가족사진 8", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_09.jpg", alt: "정장 가족사진 9", category: "family", subCategory: "uniform" },
    { src: "/main_gallery/family/uniform/uniform_10.jpg", alt: "정장 가족사진 10", category: "family", subCategory: "uniform" },

    // family - hanbok 컨셉 (한복)
    { src: "/main_gallery/family/hanbok/hanbok_01.jpg", alt: "한복 가족사진 1", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_02.jpg", alt: "한복 가족사진 2", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_03.jpg", alt: "한복 가족사진 3", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_04.jpg", alt: "한복 가족사진 4", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_05.jpg", alt: "한복 가족사진 5", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_06.jpg", alt: "한복 가족사진 6", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_07.jpg", alt: "한복 가족사진 7", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_08.jpg", alt: "한복 가족사진 8", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_09.jpg", alt: "한복 가족사진 9", category: "family", subCategory: "hanbok" },
    { src: "/main_gallery/family/hanbok/hanbok_10.jpg", alt: "한복 가족사진 10", category: "family", subCategory: "hanbok" },

    // family - casual 컨셉 (캐주얼)
    { src: "/main_gallery/family/casual/casual_01.jpg", alt: "캐주얼 가족사진 1", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_02.jpg", alt: "캐주얼 가족사진 2", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_03.jpg", alt: "캐주얼 가족사진 3", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_04.jpg", alt: "캐주얼 가족사진 4", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_05.jpg", alt: "캐주얼 가족사진 5", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_06.jpg", alt: "캐주얼 가족사진 6", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_07.jpg", alt: "캐주얼 가족사진 7", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_08.jpg", alt: "캐주얼 가족사진 8", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_15.jpg", alt: "캐주얼 가족사진 9", category: "family", subCategory: "casual" },
    { src: "/main_gallery/family/casual/casual_16.jpg", alt: "캐주얼 가족사진 10", category: "family", subCategory: "casual" },

    // 증명사진/프로필
    { src: "/main_gallery/id/id01.jpg", alt: "증명사진 1", category: "id" },
    { src: "/main_gallery/id/id02.jpg", alt: "증명사진 2", category: "id" },
    { src: "/main_gallery/id/id03.jpg", alt: "증명사진 3", category: "id" },
    { src: "/main_gallery/id/id04.jpg", alt: "증명사진 4", category: "id" },
    { src: "/main_gallery/id/id05.jpg", alt: "증명사진 5", category: "id" },
    { src: "/main_gallery/id/id06.jpg", alt: "증명사진 6", category: "id" },
    { src: "/main_gallery/id/id07.jpg", alt: "증명사진 7", category: "id" },
    { src: "/main_gallery/id/id08.jpg", alt: "증명사진 8", category: "id" },
    { src: "/main_gallery/profile/profile01.jpg", alt: "프로필사진 1", category: "id" },
    { src: "/main_gallery/profile/profile02.jpg", alt: "프로필사진 2", category: "id" },
    { src: "/main_gallery/profile/profile03.jpg", alt: "프로필사진 3", category: "id" },
    { src: "/main_gallery/profile/profile04.jpg", alt: "프로필사진 4", category: "id" },

    // 장수사진
    { src: "/main_gallery/long/long01.jpg", alt: "장수사진 1", category: "longevity" },
    { src: "/main_gallery/long/long02.jpg", alt: "장수사진 2", category: "longevity" },
    { src: "/main_gallery/long/long03.jpg", alt: "장수사진 3", category: "longevity" },
    { src: "/main_gallery/long/long04.jpg", alt: "장수사진 4", category: "longevity" },
    { src: "/main_gallery/long/long05.jpg", alt: "장수사진 5", category: "longevity" },

    // 우정/커플/주니어
    { src: "/main_gallery/profile/profile05.jpg", alt: "우정 사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile06.jpg", alt: "우정 사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile07.jpg", alt: "커플 사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile08.jpg", alt: "커플 사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile09.jpg", alt: "주니어 사진 1", category: "friend" },
    { src: "/main_gallery/profile/profile10.jpg", alt: "주니어 사진 2", category: "friend" },
    { src: "/main_gallery/profile/profile11.jpg", alt: "주니어 사진 3", category: "friend" },
  ],
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("family")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [filteredImages, setFilteredImages] = useState(galleryData.all)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

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
    setLoadedImages(new Set()) // 로드된 이미지 상태 초기화
    setIsLoading(true)
    // 카테고리 변경 시 로딩 효과를 위한 짧은 딜레이
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // 하위 카테고리 변경 핸들러
  const handleSubCategoryChange = (subCategory: string | null) => {
    setSelectedSubCategory(subCategory)
    setLoadedImages(new Set()) // 로드된 이미지 상태 초기화
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  // 이미지 로드 완료 핸들러
  const handleImageLoad = (src: string) => {
    // 약간의 지연을 추가하여 더 부드러운 효과
    setTimeout(() => {
      setLoadedImages(prev => new Set([...prev, src]))
    }, 100)
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

  // 카테고리 데이터 (실제 폴더 구조에 맞게 수정)
  const categories = [
    {
      id: "family",
      name: "가족사진",
      subCategories: [
        { id: "dress", name: "드레스" },
        { id: "uniform", name: "정장" },
        { id: "hanbok", name: "한복" },
        { id: "casual", name: "캐주얼" }
      ]
    },
    { id: "longevity", name: "장수사진" },
    { id: "id", name: "증명사진/프로필" },
    { id: "friend", name: "우정/커플/주니어" }
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
          <h1 className="text-4xl font-medium mb-4 font-noto">갤러리</h1>
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
                <div className="bg-gray-100 rounded-lg" style={{ aspectRatio: "4/3", width: "100%", height: "200px" }}>
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : filteredImages.length > 0 ? (
            filteredImages.map((image, index) => {
              const isImageLoaded = loadedImages.has(image.src)
              return (
                <div
                  key={index}
                  className={`gallery-masonry-item group transition-all duration-1000 ease-out ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  onClick={() => isImageLoaded && handleImageClick(image.src)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-auto cursor-pointer rounded-lg transition-transform duration-300 group-hover:scale-105"
                      quality={85}
                      onLoad={() => handleImageLoad(image.src)}
                      loading="lazy"
                    />
                  </div>
                </div>
              )
            })
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
          <Image
            src={selectedImage || "/placeholder.svg"}
            alt="확대 이미지"
            width={1200}
            height={800}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            quality={95}
            priority
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
