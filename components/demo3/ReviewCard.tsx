'use client';

import { Review } from '@/lib/products';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const fullStars = review.rating;
  const emptyStars = 5 - fullStars;

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{review.author}</span>
            {review.verified && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: fullStars }).map((_, i) => (
                <span key={i}>★</span>
              ))}
              {Array.from({ length: emptyStars }).map((_, i) => (
                <span key={i} className="text-gray-300 dark:text-gray-600">★</span>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
    </div>
  );
}
