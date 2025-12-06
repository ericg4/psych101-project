'use client';

import { useState, useEffect } from 'react';
import { products } from '@/lib/products';
import ReviewList from './ReviewList';
import { getOrCreateSessionId } from '@/lib/session';
import { saveTrustResponse } from '@/app/actions/supabase';

interface ProductAssessmentProps {
  currentProductIndex: number;
  onComplete: () => void;
  onSkip: () => void;
}

export default function ProductAssessment({ currentProductIndex, onComplete, onSkip }: ProductAssessmentProps) {
  const [sessionId] = useState(() => getOrCreateSessionId());
  const product = products[currentProductIndex];
  const [trustRating, setTrustRating] = useState<number>(5);
  const [purchaseIntent, setPurchaseIntent] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  // Reset state when moving to a new product
  useEffect(() => {
    const timer = setTimeout(() => {
      setTrustRating(5);
      setPurchaseIntent(null);
      setSaved(false);
      setIsSkipping(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [currentProductIndex]);

  const stars = Math.round(product.averageRating);
  const fullStars = stars;
  const emptyStars = 5 - fullStars;
  const progress = ((currentProductIndex + 1) / products.length) * 100;
  const isLastProduct = currentProductIndex === products.length - 1;

  const handleSubmit = async () => {
    if (purchaseIntent === null) return;

    try {
      await saveTrustResponse({
        sessionId,
        selectedProduct: product.id,
        trustRating,
        purchaseIntent,
      });
      setSaved(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    } catch (error) {
      console.error('Failed to save trust response:', error);
    }
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    // Save with null values or skip saving entirely
    // For now, we'll just move to next without saving
    setTimeout(() => {
      onSkip();
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Product {currentProductIndex + 1} of {products.length}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Product Details */}
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

      {/* Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <ReviewList reviews={product.reviews} />
      </div>

      {/* Assessment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Assessment</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              How trustworthy does this product seem? ({trustRating}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={trustRating}
              onChange={(e) => setTrustRating(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>Not Trustworthy</span>
              <span>Very Trustworthy</span>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Would you purchase this product?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setPurchaseIntent(true)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  purchaseIntent === true
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-700 border-2 border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setPurchaseIntent(false)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  purchaseIntent === false
                    ? 'bg-red-600 text-white'
                    : 'bg-white dark:bg-gray-700 border-2 border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              disabled={isSkipping}
              className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip
            </button>
            <button
              onClick={handleSubmit}
              disabled={purchaseIntent === null || saved}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                purchaseIntent !== null && !saved
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {saved ? 'Saved!' : isLastProduct ? 'Complete Assessment' : 'Next Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
