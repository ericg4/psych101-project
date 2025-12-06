'use client';

import { use, useEffect } from 'react';
import Navigation from '@/components/shared/Navigation';
import TrustExplanation from '@/components/demo3/TrustExplanation';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';

interface ExplanationPageProps {
  params: Promise<{ productId: string }>;
}

export default function ExplanationPage({ params }: ExplanationPageProps) {
  const { productId } = use(params);
  const product = getProductById(productId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <TrustExplanation selectedProductId={productId} />
    </div>
  );
}
