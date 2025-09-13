import { Metadata } from 'next'
import { aboutMetadata } from '@/app/metadata'
import AboutClient from "@/components/features/About/AboutClient"

export const metadata: Metadata = aboutMetadata

export default function AboutPage() {
    return <AboutClient />
} 