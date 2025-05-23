import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "아침햇살 스튜디오",
  description: "가족 사진 스튜디오",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-white flex items-center justify-center">
                <img src="/logo.jpeg" alt="아침햇살 스튜디오 로고" className="h-full w-full object-contain" />
              </div>
              <span className="ml-2 text-xl font-bold">아침햇살 스튜디오</span>
            </Link>

          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
