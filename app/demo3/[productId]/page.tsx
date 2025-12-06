'use client';

import { use } from 'react';
import Navigation from '@/components/shared/Navigation';
import ProductDetail from '@/components/demo3/ProductDetail';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { productId } = use(params);
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 p-8">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
