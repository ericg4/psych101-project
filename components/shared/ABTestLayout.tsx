'use client';

import { useState, useEffect } from 'react';

interface ABTestLayoutProps {
  version: 'clean' | 'cluttered';
  onStressRating?: (rating: number) => void;
  onEasierChoice?: (version: 'clean' | 'cluttered') => void;
}

export default function ABTestLayout({ version, onStressRating, onEasierChoice }: ABTestLayoutProps) {
  const [showRating, setShowRating] = useState(false);
  const [stressRating, setStressRating] = useState(5);
  const [showComparison, setShowComparison] = useState(false);
  const [easierChoiceSelected, setEasierChoiceSelected] = useState<'clean' | 'cluttered' | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRating(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleRatingSubmit = () => {
    onStressRating?.(stressRating);
    setShowComparison(true);
  };

  if (showExplanation) {
    return (
      <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">What You Just Experienced</h2>

            <div className="space-y-6">
              <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded">
                <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Cognitive Load & Stress</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  When you first saw the page, you experienced <strong>cognitive load</strong>—the mental effort required to process information.
                  The cluttered layout overwhelmed your working memory (which can only hold about 4±1 chunks of information), while the clean layout
                  reduced cognitive demand through whitespace and clear visual hierarchy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                  Your stress rating reflects how the visual complexity affected your emotional state. Research shows that cluttered interfaces
                  increase cortisol levels and reduce task completion rates by up to 40%.
                </p>
              </section>

              <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 p-6 rounded">
                <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-300">Perceptual Organization</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The clean layout used principles of <strong>visual hierarchy</strong> and <strong>whitespace</strong> to guide your attention
                  automatically. Your brain didn&apos;t have to work hard to find the important information—it was immediately obvious.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                  The cluttered layout violated these principles, forcing your brain to actively search and filter information, which increases
                  cognitive load and stress.
                </p>
              </section>

              <section className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 dark:border-purple-400 p-6 rounded">
                <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">Why This Matters</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Modern websites rely on minimal, predictable layouts not just for aesthetics, but because they align with how the human brain
                  processes visual information. Good design reduces stress, improves comprehension, and increases user satisfaction.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                  By comparing both versions, you directly experienced how design choices can influence emotion, attention, and decision-making—all
                  fundamental aspects of cognitive psychology.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                Ready to explore more psychological principles?
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/demo1"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Demo 1: Gestalt Principles
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showComparison) {
    return (
      <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Compare Both Versions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Clean Layout</h3>
              <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-light text-gray-700 dark:text-gray-200">Welcome</h1>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Cluttered Layout</h3>
              <div className="bg-linear-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg p-4 min-h-[400px] relative overflow-hidden">
                <div className="absolute top-2 left-2 right-2 bg-red-600 text-white p-2 text-center font-bold animate-blink">
                  🔥 LIMITED TIME OFFER! CLICK NOW! 🔥
                </div>
                <div className="grid grid-cols-3 gap-2 mt-16">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <button
                      key={i}
                      className={`p-3 rounded text-sm font-bold ${
                        i % 3 === 0
                          ? 'bg-red-500 text-white'
                          : i % 3 === 1
                          ? 'bg-orange-500 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}
                    >
                      Button {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">SPECIAL DEAL!</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">BUY NOW!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Limited stock available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            {easierChoiceSelected ? (
              <div className="bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Thank you!</h3>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  You selected the <strong>{easierChoiceSelected === 'clean' ? 'Clean' : 'Cluttered'}</strong> layout as easier to use.
                </p>
                <button
                  onClick={() => setShowExplanation(true)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Learn What This Demo Showed
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Which version feels easier to use?</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={async () => {
                      setIsSaving(true);
                      try {
                        await onEasierChoice?.('clean');
                        setEasierChoiceSelected('clean');
                      } catch (error) {
                        console.error('Failed to save choice:', error);
                        alert('Failed to save your choice. Please try again.');
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    disabled={isSaving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Clean Layout'}
                  </button>
                  <button
                    onClick={async () => {
                      setIsSaving(true);
                      try {
                        await onEasierChoice?.('cluttered');
                        setEasierChoiceSelected('cluttered');
                      } catch (error) {
                        console.error('Failed to save choice:', error);
                        alert('Failed to save your choice. Please try again.');
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    disabled={isSaving}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Cluttered Layout'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showRating) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">How did this page make you feel?</h2>
            <p className="text-gray-600 dark:text-gray-400">Rate your stress level</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Calm</span>
              <span>Stressed</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={stressRating}
              onChange={(e) => setStressRating(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stressRating}</span>
              <span className="text-gray-500 dark:text-gray-400">/10</span>
            </div>
          </div>
          <button
            onClick={handleRatingSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Initial view based on version
  if (version === 'clean') {
    return (
      <div className="min-h-screen pt-16 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center p-8 animate-fade-in">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-light text-gray-700 dark:text-gray-200">Welcome</h1>
          <button className="bg-blue-600 text-white px-12 py-6 rounded-lg text-xl font-medium hover:bg-blue-700 transition-colors shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // Cluttered version
  return (
    <div className="min-h-screen pt-16 bg-linear-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 p-4 animate-fade-in">
      <div className="bg-red-600 dark:bg-red-700 text-white p-3 text-center font-bold mb-4 animate-blink">
        🔥 LIMITED TIME OFFER! CLICK NOW! 🔥
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <button
            key={i}
            className={`p-4 rounded text-sm font-bold ${
              i % 3 === 0
                ? 'bg-red-500 dark:bg-red-600 text-white'
                : i % 3 === 1
                ? 'bg-orange-500 dark:bg-orange-600 text-white'
                : 'bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white'
            }`}
          >
            Button {i + 1}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">SPECIAL DEAL!</p>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">BUY NOW!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Limited stock available</p>
        <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">50% OFF TODAY ONLY!</p>
      </div>
    </div>
  );
}
