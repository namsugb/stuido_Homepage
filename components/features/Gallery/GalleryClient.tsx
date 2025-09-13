"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, X, ChevronDown } from "lucide-react"
import { galleryData } from "@/data/galleryImages"
import OptimizedImage from "@/components/ui/OptimizedImage"
import { imagePresets } from "@/components/ui/ImagePresets"

export default function GalleryClient() {
    const [selectedCategory, setSelectedCategory] = useState("family")
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>("dress")
    const [filteredImages, setFilteredImages] = useState(galleryData.all)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({})
    const [displayedCount, setDisplayedCount] = useState(12)

    // 더 보기 기능을 위한 상태
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMoreImages, setHasMoreImages] = useState(true)

    // 카테고리 필터링
    useEffect(() => {
        let filtered = galleryData.all

        if (selectedCategory) {
            filtered = filtered.filter((image) => image.category === selectedCategory)
        }

        if (selectedSubCategory) {
            filtered = filtered.filter((image) => image.subCategory === selectedSubCategory)
        }

        setFilteredImages(filtered)
        setDisplayedCount(12) // 카테고리 변경 시 초기화
        setHasMoreImages(filtered.length > 12)
        // setIsLoading(false) // 이 부분은 카테고리 변경 핸들러에서 처리
    }, [selectedCategory, selectedSubCategory])

    // 현재 표시할 이미지들
    const currentImages = filteredImages.slice(0, displayedCount)

    // 모든 이미지가 로드되었는지 확인
    const allImagesLoaded = useMemo(() => {
        return currentImages.length > 0 && currentImages.every(image => imageLoadStates[image.src])
    }, [currentImages, imageLoadStates])

    // 더 보기 버튼 클릭 핸들러
    const handleLoadMore = async () => {
        if (isLoadingMore) return

        setIsLoadingMore(true)

        // 로딩 효과를 위한 딜레이
        await new Promise(resolve => setTimeout(resolve, 500))

        const newCount = Math.min(displayedCount + 12, filteredImages.length)
        setDisplayedCount(newCount)
        setHasMoreImages(newCount < filteredImages.length)
        setIsLoadingMore(false)


    }

    // 이미지 로드 완료 핸들러
    const handleImageLoad = (src: string) => {
        setImageLoadStates(prev => ({ ...prev, [src]: true }))
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

    // 카테고리 변경 핸들러 개선
    const handleCategoryChange = (category: string) => {
        setIsTransitioning(true)
        setSelectedCategory(category)
        setSelectedSubCategory(category === "family" ? "dress" : null)
        setImageLoadStates({})

        // 데이터 필터링
        let filtered = galleryData.all
        if (category) {
            filtered = filtered.filter((image) => image.category === category)
        }
        if (category === "family" && selectedSubCategory) {
            filtered = filtered.filter((image) => image.subCategory === selectedSubCategory)
        }

        setFilteredImages(filtered)
        setDisplayedCount(12)

        // 전환 완료
        setTimeout(() => {
            setIsTransitioning(false)
        }, 100)
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
                    아침햇살 스튜디오의 작품들을 감상해보세요.
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
                                    {subCategory === "hanbok" && "한복"}
                                    {subCategory === "dress" && "드레스"}
                                    {subCategory === "uniform" && "정장"}
                                    {subCategory === "casual" && "캐주얼"}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 갤러리 그리드 */}
                <div className="gallery-masonry">
                    {currentImages.map((image, index) => {
                        const isImageLoaded = imageLoadStates[image.src]
                        const shouldShow = isImageLoaded && !isTransitioning

                        return (
                            <div
                                key={`${image.src}-${index}`}
                                className={`gallery-masonry-item group transition-all duration-500 ease-out ${shouldShow ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 30}ms`
                                }}
                                onClick={() => shouldShow && handleImageClick(image.src)}
                            >
                                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                                    <OptimizedImage
                                        src={image.src || "/placeholder.svg"}
                                        alt={`${image.alt} - ${image.category} 카테고리 촬영 사진`}
                                        width={400}
                                        height={300}
                                        className="w-full h-auto cursor-pointer rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        onLoad={() => handleImageLoad(image.src)}
                                        {...imagePresets.gallery}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* 더 보기 버튼 */}
                {hasMoreImages && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${isLoadingMore
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#bfa888] text-white hover:bg-[#a8956f] hover:shadow-lg transform hover:scale-105"
                                }`}
                        >
                            {isLoadingMore ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    로딩 중...
                                </>
                            ) : (
                                <>
                                    더 보기
                                    <ChevronDown className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* 이미지 개수 표시 */}
                <div className="text-center mt-4 text-gray-500 text-sm">
                    {currentImages.length} / {filteredImages.length} 이미지
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
