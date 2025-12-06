'use client';

import { useState } from 'react';

interface LayoutComparisonProps {
  onEasierChoice: (layout: 'A' | 'B') => void;
  onTrustworthyChoice: (layout: 'A' | 'B') => void;
  onHoverTime: (layout: 'A' | 'B', time: number) => void;
}

export default function LayoutComparison({
  onEasierChoice,
  onTrustworthyChoice,
  onHoverTime
}: LayoutComparisonProps) {
  const [easierChoice, setEasierChoice] = useState<'A' | 'B' | null>(null);
  const [trustworthyChoice, setTrustworthyChoice] = useState<'A' | 'B' | null>(null);
  const [hoverStartA, setHoverStartA] = useState<number | null>(null);
  const [hoverStartB, setHoverStartB] = useState<number | null>(null);

  const handleHoverStart = (layout: 'A' | 'B') => {
    const startTime = Date.now();
    if (layout === 'A') {
      setHoverStartA(startTime);
    } else {
      setHoverStartB(startTime);
    }
  };

  const handleHoverEnd = (layout: 'A' | 'B') => {
    const endTime = Date.now();
    if (layout === 'A' && hoverStartA) {
      onHoverTime('A', endTime - hoverStartA);
      setHoverStartA(null);
    } else if (layout === 'B' && hoverStartB) {
      onHoverTime('B', endTime - hoverStartB);
      setHoverStartB(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Layout A - Familiar */}
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-blue-200 dark:border-blue-700"
          onMouseEnter={() => handleHoverStart('A')}
          onMouseLeave={() => handleHoverEnd('A')}
        >
          <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Layout A</h3>
          <div className="space-y-4">
            {/* Navigation bar */}
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <div className="flex gap-4">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Home</span>
                <span className="text-gray-600 dark:text-gray-400">Products</span>
                <span className="text-gray-600 dark:text-gray-400">About</span>
                <span className="text-gray-600 dark:text-gray-400">Contact</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white">
                  🛒
                </div>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded px-4 py-2"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded">Search</button>
            </div>

            {/* Hero section */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Our Store</h2>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Layout B - Unfamiliar */}
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-red-200 dark:border-red-700"
          onMouseEnter={() => handleHoverStart('B')}
          onMouseLeave={() => handleHoverEnd('B')}
        >
          <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Layout B</h3>
          <div className="space-y-4">
            {/* Navigation at bottom */}
            <div className="bg-purple-50 dark:bg-purple-900/30 p-8 rounded text-center min-h-[200px] flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Store Welcome</h2>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold">
                Begin Shopping
              </button>
            </div>

            {/* Search hidden in dropdown */}
            <div className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2">
              <details className="cursor-pointer">
                <summary className="font-semibold text-gray-900 dark:text-gray-100">More Options</summary>
                <input
                  type="text"
                  placeholder="Find items..."
                  className="w-full mt-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded px-4 py-2"
                />
              </details>
            </div>

            {/* Navigation at bottom */}
            <div className="flex justify-around items-center bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <div className="w-10 h-10 bg-purple-400 rounded flex items-center justify-center">
                ▲
              </div>
              <div className="w-10 h-10 bg-green-400 rounded flex items-center justify-center">
                ◆
              </div>
              <div className="w-10 h-10 bg-orange-400 rounded flex items-center justify-center">
                ●
              </div>
              <div className="w-10 h-10 bg-pink-400 rounded flex items-center justify-center">
                ■
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Polls */}
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Which layout was easier to understand?</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEasierChoice('A');
                onEasierChoice('A');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                easierChoice === 'A'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
            >
              Layout A
            </button>
            <button
              onClick={() => {
                setEasierChoice('B');
                onEasierChoice('B');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                easierChoice === 'B'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
            >
              Layout B
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Which layout felt more trustworthy?</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setTrustworthyChoice('A');
                onTrustworthyChoice('A');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                trustworthyChoice === 'A'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-2 border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              Layout A
            </button>
            <button
              onClick={() => {
                setTrustworthyChoice('B');
                onTrustworthyChoice('B');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                trustworthyChoice === 'B'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-2 border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              Layout B
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
