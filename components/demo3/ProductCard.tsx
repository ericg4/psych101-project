'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const stars = Math.round(product.averageRating);
  const fullStars = stars;
  const emptyStars = 5 - fullStars;

  return (
    <Link href={`/demo3/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl hover:scale-105">
        <div className="text-6xl mb-4 text-center">{product.image}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <span key={i} className="text-gray-300 dark:text-gray-600">★</span>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {product.averageRating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {product.reviewCount.toLocaleString()} reviews
        </p>
      </div>
    </Link>
  );
}
