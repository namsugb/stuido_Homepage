"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { galleryData } from "@/data/galleryImages"
import OptimizedImage from "@/components/ui/OptimizedImage"
import { imagePresets } from "@/components/ui/ImagePresets"

export default function GalleryClient() {
    const [selectedCategory, setSelectedCategory] = useState("family")
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
    const [filteredImages, setFilteredImages] = useState(galleryData.all)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

    // 카테고리 및 하위 카테고리 필터링
    useEffect(() => {
        let filtered = galleryData.all

        if (selectedCategory) {
            filtered = filtered.filter((image) => image.category === selectedCategory)
        }

        if (selectedSubCategory) {
            filtered = filtered.filter((image) => image.subCategory === selectedSubCategory)
        }

        setFilteredImages(filtered)
        setIsLoading(false)
    }, [selectedCategory, selectedSubCategory])

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
    const handleCloseLightbox = () => {
        setSelectedImage(null)
        // 스크롤 복원
        document.body.style.overflow = "auto"
    }

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

    // ESC 키로 라이트박스 닫기
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleCloseLightbox()
            }
        }

        if (selectedImage) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [selectedImage])

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <div className="container py-2"></div>

            <div className="text-center mt-6 mb-4">
                <h1 className="text-4xl font-medium mb-4">갤러리</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    아침햇살 스튜디오의 작품들을 감상해보세요. 가족사진, 리마인드웨딩, 칠순/팔순 잔치, 증명사진 등 다양한 촬영
                    작품을 카테고리별로 확인하실 수 있습니다.
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-2">
                {/* 카테고리 필터 */}
                <div className="flex flex-col justify-center items-center mb-8">
                    <div className="flex flex-wrap justify-center gap-2 mb-4 min-w-0">
                        {["family", "id", "longevity", "friend"].map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${selectedCategory === category
                                    ? "bg-[#bfa888] text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                {category === "family" && "가족사진"}
                                {category === "id" && "증명사진/프로필"}
                                {category === "longevity" && "장수사진"}
                                {category === "friend" && "우정/커플/주니어"}
                            </button>
                        ))}
                    </div>

                    {/* 하위 카테고리 필터 (가족사진인 경우에만) */}
                    {selectedCategory === "family" && (
                        <div className="flex flex-wrap gap-2">
                            {["dress", "uniform", "hanbok", "casual"].map((subCategory) => (
                                <button
                                    key={subCategory}
                                    onClick={() => handleSubCategoryChange(subCategory)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${selectedSubCategory === subCategory
                                        ? "bg-[#bfa888] text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                >
                                    {subCategory === "dress" && "드레스"}
                                    {subCategory === "uniform" && "정장"}
                                    {subCategory === "hanbok" && "한복"}
                                    {subCategory === "casual" && "캐주얼"}
                                </button>
                            ))}

                        </div>
                    )}
                </div>

                {/* 갤러리 그리드 */}
                <div className="gallery-masonry">
                    {isLoading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="gallery-masonry-item animate-pulse">
                                <div className="bg-gray-200 rounded-lg" style={{ aspectRatio: "4/3", width: "100%", height: "200px" }}></div>
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
                                    <div className="relative overflow-hidden rounded-lg bg-gray-50">
                                        <OptimizedImage
                                            src={image.src || "/placeholder.svg"}
                                            alt={`${image.alt} - ${image.category} 카테고리 촬영 사진`}
                                            width={400}
                                            height={300}
                                            className="w-full h-auto cursor-pointer rounded-lg group-hover:scale-105"
                                            onLoad={() => handleImageLoad(image.src)}
                                            {...imagePresets.gallery}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">선택된 카테고리에 이미지가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 라이트박스 */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={handleCloseLightbox}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <OptimizedImage
                            src={selectedImage}
                            alt="확대된 갤러리 이미지 - 자세히 보기"
                            width={1200}
                            height={800}
                            className="max-w-full max-h-full object-contain"
                            {...imagePresets.hero}
                        />
                    </div>
                </div>
            )}

            <style jsx>{`
        .gallery-masonry {
          column-count: 5;
          column-gap: 0.5rem;
          break-inside: avoid;
        }

        .gallery-masonry-item {
          display: inline-block;
          width: 100%;
          margin-bottom: 0.5rem;
          break-inside: avoid;
        }

        @media (max-width: 1200px) {
          .gallery-masonry {
            column-count: 4;
          }
        }

        @media (max-width: 768px) {
          .gallery-masonry {
            column-count: 3;
            column-gap: 0.25rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-masonry {
            column-count: 2;
          }
        }
      `}</style>
        </div>
    )
}
