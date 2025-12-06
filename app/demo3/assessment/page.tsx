'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/shared/Navigation';
import ProductAssessment from '@/components/demo3/ProductAssessment';
import TrustExplanation from '@/components/demo3/TrustExplanation';
import { products } from '@/lib/products';

export default function AssessmentPage() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleComplete = () => {

    if (currentProductIndex < products.length - 1) {
      // Move to next product
      setCurrentProductIndex(currentProductIndex + 1);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // All products rated, show explanation
      setShowExplanation(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSkip = () => {
    if (currentProductIndex < products.length - 1) {
      // Move to next product
      setCurrentProductIndex(currentProductIndex + 1);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last product skipped, show explanation
      setShowExplanation(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (showExplanation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showExplanation]);

  if (showExplanation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <TrustExplanation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 p-8">
        <ProductAssessment
          currentProductIndex={currentProductIndex}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}
