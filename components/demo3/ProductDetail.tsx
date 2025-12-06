'use client';

import Link from 'next/link';
import { Product, products } from '@/lib/products';
import ReviewList from './ReviewList';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const currentIndex = products.findIndex((p) => p.id === product.id);
  const previousProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const stars = Math.round(product.averageRating);
  const fullStars = stars;
  const emptyStars = 5 - fullStars;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Link
          href="/demo3"
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Products
        </Link>

        <div className="flex gap-2">
          {previousProduct && (
            <Link
              href={`/demo3/${previousProduct.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Link>
          )}
          {nextProduct && (
            <Link
              href={`/demo3/${nextProduct.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="text-8xl text-center md:text-left">{product.image}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-yellow-400 text-xl">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {Array.from({ length: emptyStars }).map((_, i) => (
                  <span key={i} className="text-gray-300 dark:text-gray-600">★</span>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.averageRating.toFixed(1)} out of 5
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <ReviewList reviews={product.reviews} />
      </div>
    </div>
  );
}
