"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { sliderImages } from "@/data/sliderImages"

interface HeroSliderProps {
    onImageClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const HERO_BLUR_DATA_URL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

export default function HeroSlider({ onImageClick }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
    }, [])

    useEffect(() => {
        autoPlayRef.current = setInterval(nextSlide, 2000)
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [nextSlide])

    return (
        <section className="hero-section">
            <div className="slider-row relative h-full w-full">
                <div className="absolute inset-0 z-30 cursor-pointer" onClick={onImageClick}>
                    {sliderImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "scale-100" : "opacity-0 scale-105"}`}
                            style={{ backgroundColor: image.bgColor }}
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 767px) 1px, 100vw"
                                className="object-cover object-center hidden md:block"
                                priority={index === 0}
                                quality={85}
                                placeholder="blur"
                                blurDataURL={HERO_BLUR_DATA_URL}
                            />
                            <Image
                                src={image.srcMobile || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 767px) 100vw, 1px"
                                className="object-cover object-center md:hidden"
                                priority={index === 0}
                                quality={85}
                                placeholder="blur"
                                blurDataURL={HERO_BLUR_DATA_URL}
                            />
                            {/* 텍스트 배경 */}
                            <div className="absolute inset-0 my-6 p-8 text-black max-w-2xl mx-auto">
                                <div
                                    className={`text-center hidden md:block ${image.desktoptextbackground ? "bg-gray-100/30 rounded-lg px-6 py-4" : ""}`}
                                >
                                    <h2 className="text-2xl md:text-3xl text-pretty font-serif">{image.title}</h2>
                                    <p className="text-lg md:text-xl opacity-90 text-pretty">{image.description}</p>
                                </div>
                                <div
                                    className={`text-center block md:hidden ${image.mobiletextbackground ? "bg-gray-100/50 p-4 rounded-lg" : ""}`}
                                >
                                    <h2 className="text-2xl md:text-3xl text-pretty font-serif">{image.title}</h2>
                                    <p className="text-lg md:text-xl opacity-90 text-pretty">{image.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
