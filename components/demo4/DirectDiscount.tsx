'use client';

import { useState } from 'react';

interface DirectDiscountProps {
  onClaim: () => void;
}

export default function DirectDiscount({ onClaim }: DirectDiscountProps) {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    onClaim();
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg shadow-lg p-12">
        <div className="text-6xl mb-4">🎁</div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">15% OFF</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          You&apos;ve earned a 15% discount!
        </p>

        {!claimed ? (
          <button
            onClick={handleClaim}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
          >
            Claim Your Discount
          </button>
        ) : (
          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-300 font-semibold">
              ✓ Discount Claimed!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
