'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/shared/Navigation';
import ABTestLayout from '@/components/shared/ABTestLayout';
import { getOrCreateSessionId } from '@/lib/session';
import { saveLandingResponse } from '@/app/actions/supabase';

export default function Home() {
  const [version, setVersion] = useState<'clean' | 'cluttered' | null>(null);
  const [sessionId] = useState<string>(() => getOrCreateSessionId());
  const [mounted, setMounted] = useState(false);
  const [stressRating, setStressRating] = useState<number | null>(null);

  useEffect(() => {
    // Only determine version on client side to avoid hydration mismatch
    // Using setTimeout to defer state update and satisfy linter
    const timer = setTimeout(() => {
      setMounted(true);
      setVersion(Math.random() > 0.5 ? 'clean' : 'cluttered');
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleStressRating = async (rating: number) => {
    setStressRating(rating);
    // Don't save yet - wait until easier version is selected
  };

  const handleEasierChoice = async (easierVersion: 'clean' | 'cluttered') => {
    if (sessionId && version && stressRating !== null) {
      try {
        // Save everything at once - no UPDATE needed!
        await saveLandingResponse({
          sessionId,
          versionShown: version,
          stressRating: stressRating,
          easierVersion: easierVersion,
        });
      } catch (error) {
        console.error('Failed to save easier choice:', error);
        // Re-throw so the component can handle it
        throw error;
      }
    }
  };

  if (!mounted || !version) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <ABTestLayout
        version={version}
        onStressRating={handleStressRating}
        onEasierChoice={handleEasierChoice}
      />
    </div>
  );
}
