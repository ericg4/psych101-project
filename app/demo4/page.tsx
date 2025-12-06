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
    // This is called when user clicks Continue, with their last spin result
    setWheelSpins((prev) => prev + 1);
    if (discount !== 'Try Again') {
      setDiscountsReceived([discount]); // Only store the last spin result
    } else {
      setDiscountsReceived([]); // Clear if last spin was "Try Again"
    }
  };

  const handleContinueFromWheel = () => {
    // Move from wheel to direct discount step
    setStep('direct');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectClaim = () => {
    setDirectClaimed(true);
  };

  const handleContinueFromDirect = async () => {
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
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-6 rounded">
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Important:</p>
              <p className="text-gray-700 dark:text-gray-300">
                You can spin up to 3 times, but <strong>only your last spin counts</strong> as your final reward.
                You can continue at any time after your first spin.
              </p>
            </div>
            <WheelSpinner
              onSpinComplete={handleSpinComplete}
              onContinue={handleContinueFromWheel}
              maxSpins={3}
            />
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
                  onClick={handleContinueFromDirect}
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
              onClick={handleContinueFromDirect}
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
