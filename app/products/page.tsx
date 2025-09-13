import { Metadata } from 'next'
import { productsMetadata } from '@/app/metadata'
import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";

export const metadata: Metadata = productsMetadata

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <ProductsPageContent />
        </Suspense>
    );
}
