'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/shared/Navigation';
import ProductCard from '@/components/demo3/ProductCard';
import { products } from '@/lib/products';

export default function Demo3() {
  const [hasViewedProduct, setHasViewedProduct] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Demo 3: Social Proof & Trust</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Browse these products and read their reviews. When you&apos;re ready, start the comparison assessment to rate each product&apos;s trustworthiness.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <div key={product.id} onClick={() => setHasViewedProduct(true)}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/demo3/assessment"
              className={`px-8 py-4 rounded-lg font-medium transition-colors ${
                hasViewedProduct
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-blue-400 text-white cursor-pointer opacity-90 hover:bg-blue-500'
              }`}
            >
              Start Comparison Assessment
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Click on any product above to view details and reviews</p>
            <p className="mt-2">Then start the assessment to rate all products</p>
          </div>
        </div>
      </div>
    </div>
  );
}
