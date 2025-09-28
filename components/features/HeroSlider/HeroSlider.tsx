"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { sliderImages } from "@/data/sliderImages"
import { SliderImage } from "@/types"

interface HeroSliderProps {
    onImageClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function HeroSlider({ onImageClick }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [firstImageLoaded, setFirstImageLoaded] = useState(false)
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
    const imagesLoadedCountRef = useRef(0)


    const preloadImages = () => {
        imagesLoadedCountRef.current = 0
        setImagesLoaded(false)
        setFirstImageLoaded(false)

        const firstImage = sliderImages[0]
        const firstImgDesktop = new window.Image()
        const firstImgMobile = new window.Image()

        const handleFirstImageLoad = () => {
            if (firstImgDesktop.complete || firstImgMobile.complete) {
                requestAnimationFrame(() => {
                    setFirstImageLoaded(true)
                })
            }
        }

        firstImgDesktop.onload = handleFirstImageLoad
        firstImgMobile.onload = handleFirstImageLoad
        firstImgDesktop.onerror = () => {
            console.error(`Failed to load first desktop image: ${firstImage.src}`)
            setFirstImageLoaded(true)
        }
        firstImgMobile.onerror = () => {
            console.error(`Failed to load first mobile image: ${firstImage.srcMobile}`)
            setFirstImageLoaded(true)
        }

        firstImgDesktop.src = firstImage.src
        firstImgMobile.src = firstImage.srcMobile

        setTimeout(() => {
            sliderImages.slice(1).forEach((image, idx) => {
                const imgDesktop = new window.Image()
                const imgMobile = new window.Image()

                const handleImageLoad = () => {
                    if (imgDesktop.complete && imgMobile.complete) {
                        imagesLoadedCountRef.current += 1
                        if (imagesLoadedCountRef.current === sliderImages.length - 1) {
                            setImagesLoaded(true)
                        }
                    }
                }

                imgDesktop.onload = handleImageLoad
                imgMobile.onload = handleImageLoad
                imgDesktop.onerror = () => {
                    console.error(`Failed to load desktop image: ${image.src}`)
                    handleImageLoad()
                }
                imgMobile.onerror = () => {
                    console.error(`Failed to load mobile image: ${image.srcMobile}`)
                    handleImageLoad()
                }

                imgDesktop.src = image.src
                imgMobile.src = image.srcMobile
            })
        }, 100)
    }

    useEffect(() => {
        preloadImages()
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))
    }

    useEffect(() => {
        if (isAutoPlaying && imagesLoaded) {
            autoPlayRef.current = setInterval(() => {
                nextSlide()
            }, 2000)
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [isAutoPlaying, imagesLoaded])

    return (
        <section className="hero-section">
            <div className="slider-row relative h-full w-full">
                {!firstImageLoaded && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center bg-white">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-3 border-[#bfa888] border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-3 text-sm text-gray-600 animate-pulse">잠시만 기다려주세요...</p>
                        </div>
                    </div>
                )}

                {firstImageLoaded && (
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
                                    width={1920}
                                    height={1080}
                                    className="w-full h-full object-cover object-center hidden md:block"
                                    priority={index === 0}
                                    quality={85}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                                <Image
                                    src={image.srcMobile || "/placeholder.svg"}
                                    alt={image.alt}
                                    width={768}
                                    height={1024}
                                    className="w-full h-full object-cover object-center md:hidden"
                                    priority={index === 0}
                                    quality={85}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                                {/* 텍스트 배경 */}
                                <div className="absolute inset-0 my-6 p-8 text-black max-w-2xl mx-auto">
                                    <div className={`text-center hidden md:block ${image.desktoptextbackground ? 'bg-gray-100/30 rounded-lg px-6 py-4' : ''}`}>
                                        <h2 className="text-2xl md:text-3xl text-pretty font-serif">{image.title}</h2>
                                        <p className="text-lg md:text-xl opacity-90 text-pretty">{image.description}</p>
                                    </div>
                                    <div className={`text-center block md:hidden ${image.mobiletextbackground ? 'bg-gray-100/50 p-4 rounded-lg' : ''}`}>
                                        <h2 className="text-2xl md:text-3xl text-pretty font-serif">{image.title}</h2>
                                        <p className="text-lg md:text-xl opacity-90 text-pretty">{image.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
