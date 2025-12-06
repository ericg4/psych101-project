'use client';

import { useState } from 'react';

interface SocialProofProps {
  onImpactChange: (impact: number) => void;
}

export default function SocialProof({ onImpactChange }: SocialProofProps) {
  const [enabled, setEnabled] = useState(false);
  const [trustRating, setTrustRating] = useState(5);

  const handleToggle = (newEnabled: boolean) => {
    if (newEnabled) {
      // Simulate trust increase
      const newRating = Math.min(10, trustRating + 2);
      setTrustRating(newRating);
      setEnabled(true);
      onImpactChange(2); // Impact is +2 when enabled
    } else {
      // Reset
      const originalRating = Math.max(1, trustRating - 2);
      setTrustRating(originalRating);
      setEnabled(false);
      onImpactChange(-2); // Impact is -2 when disabled
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <span className="font-semibold text-gray-900 dark:text-gray-100">Show Social Proof</span>
        <button
          onClick={() => handleToggle(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 animate-fade-in">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Trusted by Industry Leaders</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['TechCorp', 'GlobalInc', 'MegaBrand'].map((company) => (
                <div key={company} className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center font-semibold text-gray-700 dark:text-gray-300">
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">10,000+</span>
              <span className="text-gray-600 dark:text-gray-400">satisfied users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 text-xl">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">4.8/5.0</span>
              <span className="text-gray-600 dark:text-gray-400">(2,450 reviews)</span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Your trust rating:</strong> {trustRating}/10
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {enabled ? 'Social proof increased your trust!' : 'Toggle to see the impact'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
