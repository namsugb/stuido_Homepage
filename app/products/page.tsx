import Link from "next/link";


export default function ProductsPage() {
    return (
        <div className="min-h-screen mt-20 bg-[#f8f8f6]">
            {/* 촬영 패키지 섹션 */}
            < section id="packages" className="py-20 bg-gray-50" >
                <div className="container mx-auto px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold">촬영 패키지</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "소가족 사진",
                                price: "99,000원",
                                image: "/package/wedding-portrait.jpeg", // 이미지 경로 추가
                                features: ["두 가지 컨셉 촬영",
                                    "촬영 의상 무료 대여",
                                    "부모님 헤어&메이크업 무료",
                                    "고급 액자 1점 (28x36cm)",
                                    "액자컷 수정 파일 제공"],
                            },
                            {
                                title: "대가족 사진",
                                price: "150,000원",
                                image: "/package/family-photo-updated.jpeg",
                                features: ["두 가지 컨셉 촬영",
                                    "촬영 의상 무료 대여",
                                    "부모님 헤어&메이크업 무료",
                                    "고급 액자 1점 (28x36cm)",
                                    "액자컷 수정 파일 제공"],
                                featured: true,
                            },
                            {
                                title: "칠순/팔순 상차림",
                                price: "150,000원",
                                image: "/package/hanbok-couple-new.jpeg",
                                features: ["두 가지 컨셉 촬영",
                                    "촬영 의상 무료 대여",
                                    "부모님 헤어&메이크업 무료",
                                    "고급 액자 1점 (28x36cm)",
                                    "액자컷 수정 파일 제공"],
                            },
                        ].map((pkg, index) => (
                            <div
                                key={index}
                                className={`relative rounded-lg overflow-hidden ${pkg.featured ? "bg-[#e9efe7]" : "bg-white"
                                    } shadow-sm transition hover:shadow-md`}
                            >


                                {/* 패키지 이미지 */}
                                <img
                                    src={pkg.image}
                                    alt={`${pkg.title} 이미지`}
                                    className="w-full h-80 object-cover"
                                />

                                {/* 콘텐츠 영역 */}
                                <div className="p-8">
                                    <h3 className="mb-2 text-xl font-bold">{pkg.title}</h3>
                                    <p className="mb-6 text-2xl font-bold text-[#4a6741]">{pkg.price}</p>
                                    <ul className="mb-8 space-y-2">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-2 text-[#4a6741]">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/reservation"
                                        className={`w-full rounded-full ${pkg.featured
                                            ? "bg-[#4a6741] text-white hover:bg-[#3a5331]"
                                            : "border border-[#4a6741] text-[#4a6741] hover:bg-[#4a6741] hover:text-white"
                                            } px-6 py-3 font-medium transition flex items-center justify-center`}
                                    >
                                        예약하기
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        </div>
    );
}