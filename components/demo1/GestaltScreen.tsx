'use client';

import { useEffect, useState, useRef } from 'react';

interface GestaltScreenProps {
  type: 'good' | 'bad';
  onComplete: (time: number) => void;
}

export default function GestaltScreen({ type, onComplete }: GestaltScreenProps) {
  const [startTime] = useState(() => Date.now());
  const [clicked, setClicked] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Scroll target into view after a short delay to avoid interfering with clicks
    const timer = setTimeout(() => {
      if (targetRef.current && !clicked) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [clicked]);

  const handleClick = (isTarget: boolean, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (isTarget && !clicked) {
      const time = Date.now() - startTime;
      setClicked(true);
      onComplete(time);
    }
  };

  if (type === 'good') {
    return (
      <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Screen A: Good Gestalt</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Find and click the &quot;Target&quot; button</p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Website Header */}
            <header className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">Website Name</div>
                <nav className="flex gap-4">
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                    Home
                  </button>
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                    About
                  </button>
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                    Services
                  </button>
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                    Contact
                  </button>
                </nav>
              </div>
            </header>

            {/* Main Content */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome to Our Site</h1>
                <p className="text-gray-600 dark:text-gray-400">Explore our services and features</p>
              </div>

              {/* Action Buttons - Well Grouped */}
              <div className="flex justify-center gap-4 flex-wrap">
                <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  View Products
                </button>
                <button
                  ref={targetRef}
                  onClick={(e) => handleClick(true, e)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md relative z-10"
                >
                  Target
                </button>
                <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Sign Up
                </button>
              </div>

              {/* Footer */}
              <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>© 2024 Website Name. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bad Gestalt version
  return (
    <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Screen B: Bad Gestalt</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Find and click the &quot;Target&quot; button</p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative" style={{ minHeight: '600px' }}>
          {/* Scattered Header Elements - Poor Gestalt */}
          <div className="p-6">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">Website Name</div>

            {/* Navigation scattered around */}
            <button
              className="absolute top-8 right-20 px-3 py-1 bg-green-400 text-white rounded-full text-sm hover:bg-green-500 transition-colors z-10"
              onClick={(e) => handleClick(false, e)}
            >
              Home
            </button>
            <button
              className="absolute top-16 left-32 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-400 transition-colors z-10"
              onClick={(e) => handleClick(false, e)}
            >
              About
            </button>
            <button
              className="absolute top-24 right-40 px-3 py-1 bg-pink-300 text-black rounded-lg text-xs hover:bg-pink-400 transition-colors z-10"
              onClick={(e) => handleClick(false, e)}
            >
              Services
            </button>
          </div>

          {/* Main Content Area */}
          <div className="px-6 pb-8 space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome to Our Site</h1>
              <p className="text-gray-600 dark:text-gray-400">Explore our services and features</p>
            </div>

            {/* Action Buttons - Poorly Grouped and Scattered */}
            <div className="relative" style={{ minHeight: '300px' }}>
              <button
                className="absolute top-8 left-12 px-5 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors z-10"
                onClick={(e) => handleClick(false, e)}
              >
                Learn More
              </button>
              <button
                className="absolute top-20 right-16 px-4 py-3 bg-purple-300 text-black rounded hover:bg-purple-400 transition-colors z-10"
                onClick={(e) => handleClick(false, e)}
              >
                View Products
              </button>
              <button
                ref={targetRef}
                onClick={(e) => handleClick(true, e)}
                className="absolute bottom-32 left-24 px-4 py-2 bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors z-20"
                style={{ pointerEvents: 'auto' }}
              >
                Target
              </button>
              <button
                className="absolute bottom-16 right-32 px-6 py-2 bg-blue-300 text-blue-900 rounded-lg hover:bg-blue-400 transition-colors z-10"
                onClick={(e) => handleClick(false, e)}
              >
                Sign Up
              </button>
              <button
                className="absolute top-40 left-1/3 px-3 py-1 bg-red-300 text-red-900 rounded text-sm hover:bg-red-400 transition-colors z-10"
                onClick={(e) => handleClick(false, e)}
              >
                Contact
              </button>
            </div>

            {/* Footer scattered */}
            <div className="absolute bottom-4 left-1/4 text-xs text-gray-500 dark:text-gray-400">
              © 2024 Website Name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
