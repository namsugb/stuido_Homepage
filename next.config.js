/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'], // 외부 이미지 도메인 (필요시 추가)
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30일
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: false,
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react'],
    },
    // 이미지 압축 및 최적화
    compress: true,
    poweredByHeader: false,
    // 성능 최적화
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

export default nextConfig
