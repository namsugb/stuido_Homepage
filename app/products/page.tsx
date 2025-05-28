"use client"

import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <ProductsPageContent />
        </Suspense>
    );
}
