'use client';

import { Review } from '@/lib/products';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Customer Reviews</h3>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
