import { Metadata } from 'next'
import { galleryMetadata } from '@/app/metadata'
import GalleryClient from "@/components/features/Gallery/GalleryClient"

export const metadata: Metadata = galleryMetadata

export default function GalleryPage() {
  return <GalleryClient />
}
