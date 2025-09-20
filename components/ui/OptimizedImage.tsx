"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
    src: string
    alt: string
    width: number
    height: number
    className?: string
    priority?: boolean
    sizes?: string
    quality?: number
    placeholder?: "blur" | "empty"
    blurDataURL?: string
    onLoad?: () => void
    onError?: () => void
}

export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    quality = 85,
    placeholder = "blur",
    blurDataURL,
    onLoad,
    onError
}: OptimizedImageProps) {
    const [imageSrc, setImageSrc] = useState(src)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // blur placeholder를 사용하려면 blurDataURL이 필요함
    const effectivePlaceholder = placeholder === "blur" && !blurDataURL ? "empty" : placeholder

    const handleError = () => {
        setHasError(true)
        onError?.()
    }

    const handleLoad = () => {
        setIsLoading(false)
        onLoad?.()
    }

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {!hasError ? (
                <Image
                    src={imageSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    className={cn(
                        "transition-all duration-300",
                        isLoading && "scale-105 blur-sm",
                        hasError && "opacity-50",
                        className
                    )}
                    priority={priority}
                    placeholder={effectivePlaceholder}
                    blurDataURL={blurDataURL}
                    sizes={sizes}
                    quality={quality}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">이미지를 불러올 수 없습니다</span>
                </div>
            )}

            {/* 로딩 인디케이터 */}
            {isLoading && !hasError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
        </div>
    )
}
