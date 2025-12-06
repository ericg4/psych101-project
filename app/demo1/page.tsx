'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import ButtonFinder from '@/components/demo1/ButtonFinder';
import { getOrCreateSessionId } from '@/lib/session';
import { saveGestaltResponse } from '@/app/actions/supabase';

export default function Demo1() {
  const [sessionId] = useState(() => getOrCreateSessionId());

  const handleComplete = async (screenATime: number, screenBTime: number) => {
    try {
      await saveGestaltResponse({
        sessionId,
        screenATime,
        screenBTime,
        fasterScreen: screenATime < screenBTime ? 'A' : 'B',
      });
    } catch (error) {
      console.error('Failed to save gestalt response:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <ButtonFinder onComplete={handleComplete} />
    </div>
  );
}
