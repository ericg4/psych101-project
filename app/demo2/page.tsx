'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/shared/Navigation';
import LayoutComparison from '@/components/demo2/LayoutComparison';
import SchemaExplanation from '@/components/demo2/SchemaExplanation';
import { getOrCreateSessionId } from '@/lib/session';
import { saveSchemaResponse } from '@/app/actions/supabase';

export default function Demo2() {
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [hoverTimeA, setHoverTimeA] = useState<number | null>(null);
  const [hoverTimeB, setHoverTimeB] = useState<number | null>(null);
  const [easierLayout, setEasierLayout] = useState<'A' | 'B' | null>(null);
  const [trustworthyLayout, setTrustworthyLayout] = useState<'A' | 'B' | null>(null);
  const [saved, setSaved] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (easierLayout && trustworthyLayout && !saved) {
      const saveData = async () => {
        try {
          await saveSchemaResponse({
            sessionId,
            easierLayout,
            moreTrustworthyLayout: trustworthyLayout,
            hoverTimeA: hoverTimeA || undefined,
            hoverTimeB: hoverTimeB || undefined,
          });
          setSaved(true);
        } catch (error) {
          console.error('Failed to save schema response:', error);
        }
      };
      saveData();
    }
  }, [easierLayout, trustworthyLayout, sessionId, hoverTimeA, hoverTimeB, saved]);

  useEffect(() => {
    if (showExplanation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showExplanation]);


  const handleEasierChoice = (layout: 'A' | 'B') => {
    setEasierLayout(layout);
  };

  const handleTrustworthyChoice = (layout: 'A' | 'B') => {
    setTrustworthyLayout(layout);
  };

  const handleHoverTime = (layout: 'A' | 'B', time: number) => {
    if (layout === 'A') {
      setHoverTimeA(time);
    } else {
      setHoverTimeB(time);
    }
  };

  if (showExplanation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <SchemaExplanation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Demo 2: Schema & Recognition</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Compare these two layouts. Which feels more familiar and trustworthy?
          </p>
          <LayoutComparison
            onEasierChoice={handleEasierChoice}
            onTrustworthyChoice={handleTrustworthyChoice}
            onHoverTime={handleHoverTime}
          />
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowExplanation(true)}
              disabled={!easierLayout || !trustworthyLayout}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                easierLayout && trustworthyLayout
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              Learn What This Demo Showed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
