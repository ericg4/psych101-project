'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/shared/Navigation';
import WheelSpinner from '@/components/demo4/WheelSpinner';
import DirectDiscount from '@/components/demo4/DirectDiscount';
import ReflectionQuestions from '@/components/demo4/ReflectionQuestions';
import DopamineExplanation from '@/components/demo4/DopamineExplanation';
import { getOrCreateSessionId } from '@/lib/session';
import { saveDopamineResponse } from '@/app/actions/supabase';

type Step = 'intro' | 'wheel' | 'direct' | 'reflection' | 'explanation';

export default function Demo4() {
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [step, setStep] = useState<Step>('intro');
  const [wheelSpins, setWheelSpins] = useState(0);
  const [discountsReceived, setDiscountsReceived] = useState<string[]>([]);
  const [directClaimed, setDirectClaimed] = useState(false);

  const handleSpinComplete = (discount: string) => {
    setWheelSpins((prev) => prev + 1);
    if (discount !== 'Try Again') {
      setDiscountsReceived((prev) => [...prev, discount]);
    }
  };

  const handleDirectClaim = () => {
    setDirectClaimed(true);
  };

  const handleContinue = async () => {
    if (step === 'wheel') {
      setStep('direct');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'direct') {
      setStep('reflection');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 'reflection') {
      // Save data before showing explanation
      try {
        await saveDopamineResponse({
          sessionId,
          wheelSpins,
          discountsReceived: discountsReceived.join(','),
          directClaimed,
        });
      } catch (error) {
        console.error('Failed to save dopamine response:', error);
      }
      setStep('explanation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (step === 'reflection' || step === 'explanation') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-24 p-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Demo 4: Dopamine & Variable Rewards</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You&apos;ll experience two different ways to get a discount. Pay attention to how each makes you feel.
            </p>
            <button
              onClick={() => setStep('wheel')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'wheel') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-24 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 text-center">Spin the Wheel for a Discount</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
              You have 3 spins. See what discounts you can win!
            </p>
            <WheelSpinner onSpinComplete={handleSpinComplete} maxSpins={3} />
            {wheelSpins >= 3 && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleContinue}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Next Experience
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'direct') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-24 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 text-center">Direct Discount</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
              Here&apos;s your discount—no spinning required.
            </p>
            <DirectDiscount onClaim={handleDirectClaim} />
            {directClaimed && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleContinue}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Reflection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'reflection') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-24 p-8">
          <ReflectionQuestions />
          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Learn About What You Experienced
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'explanation') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-24 p-8">
          <DopamineExplanation />
        </div>
      </div>
    );
  }

  return null;
}
