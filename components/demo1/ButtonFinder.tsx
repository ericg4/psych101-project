'use client';

import { useState, useEffect } from 'react';
import GestaltScreen from './GestaltScreen';
import GestaltExplanation from './GestaltExplanation';

interface ButtonFinderProps {
  onComplete: (screenATime: number, screenBTime: number) => void;
}

export default function ButtonFinder({ onComplete }: ButtonFinderProps) {
  const [step, setStep] = useState<'intro' | 'screenA' | 'pause' | 'screenB' | 'results' | 'explanation'>('intro');
  const [screenATime, setScreenATime] = useState<number | null>(null);
  const [screenBTime, setScreenBTime] = useState<number | null>(null);

  const handleScreenAComplete = (time: number) => {
    setScreenATime(time);
    setStep('pause');
  };

  const handleScreenBComplete = (time: number) => {
    setScreenBTime(time);
    setStep('results');
    onComplete(screenATime!, time);
  };

  useEffect(() => {
    if (step === 'explanation') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  if (step === 'intro') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Find the Button</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You&apos;ll see two screens. On each screen, find and click the &quot;Target&quot; button as quickly as possible.
          </p>
          <button
            onClick={() => setStep('screenA')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  if (step === 'screenA') {
    return <GestaltScreen type="good" onComplete={handleScreenAComplete} />;
  }

  if (step === 'pause') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl text-center space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Screen A Complete!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You found the target button in <span className="font-semibold text-blue-600 dark:text-blue-400">{(screenATime! / 1000).toFixed(2)} seconds</span>.
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Take a moment to rest. When you&apos;re ready, you&apos;ll see Screen B with a different layout.
              </p>
              <button
                onClick={() => setStep('screenB')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue to Screen B
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'screenB') {
    return <GestaltScreen type="bad" onComplete={handleScreenBComplete} />;
  }

  if (step === 'explanation') {
    return <GestaltExplanation />;
  }

  // Results
  const faster = screenATime! < screenBTime! ? 'A' : 'B';

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Results</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Screen A (Good Gestalt):</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{(screenATime! / 1000).toFixed(2)}s</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Screen B (Bad Gestalt):</span>
            <span className="text-xl font-bold text-red-600 dark:text-red-400">{(screenBTime! / 1000).toFixed(2)}s</span>
          </div>
        </div>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-xl font-semibold text-blue-800 dark:text-blue-300">
            You found the button faster on Screen {faster}!
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {faster === 'A'
              ? 'Good Gestalt principles (grouping, alignment, contrast) made the target easier to find.'
              : 'The random placement and lack of visual organization made the target harder to locate.'}
          </p>
        </div>
        <button
          onClick={() => setStep('explanation')}
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Learn What This Demo Showed
        </button>
      </div>
    </div>
  );
}
