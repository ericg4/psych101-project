'use client';

import Link from 'next/link';
import Navigation from '@/components/shared/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              The Psychology of Website Design
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Explore how psychology shapes our digital experiences through interactive demonstrations
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">About This Project</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Have you ever wondered why some websites feel intuitive while others feel overwhelming? Why do certain designs make you trust a brand, while others make you click away?
              </p>
              <p>
                This interactive project demonstrates five key psychological principles that influence how we perceive and interact with websites:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cognitive Load</strong> - How visual complexity affects stress and comprehension</li>
                <li><strong>Gestalt Principles</strong> - How visual organization guides attention and search</li>
                <li><strong>Schema & Recognition</strong> - How familiarity influences trust and usability</li>
                <li><strong>Social Proof & Trust</strong> - How reviews and ratings affect decision-making</li>
                <li><strong>Variable Rewards</strong> - How unpredictability increases engagement</li>
              </ul>
              <p className="pt-4">
                Through hands-on demos, you&apos;ll experience these principles firsthand and see aggregated data from all participants, revealing how psychological mechanisms shape our digital behavior.
              </p>
            </div>
          </div>

          {/* What You'll Experience */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">What You&apos;ll Experience</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">🎯 Interactive Demos</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Five hands-on demonstrations that let you experience psychological principles in action. Your responses are collected anonymously to show aggregated patterns.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">📊 Real Data</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  After each demo, see how your experience compares to others through charts and statistics showing aggregated responses from all participants.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">🧠 Psychological Insights</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Learn about the cognitive mechanisms behind each demo, why they matter for web design, and how they&apos;re used in real-world applications.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">📈 Final Summary</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Review all the psychological concepts you&apos;ve explored and see comprehensive statistics from across all demos in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">The Five Demos</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Demo: Cognitive Load</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Experience how cluttered vs. clean layouts affect your stress levels and cognitive processing. You&apos;ll rate your stress and compare both versions.
                </p>
              </div>
              <div className="border-l-4 border-green-500 dark:border-green-400 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Demo 1: Gestalt Principles</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Find buttons on two different layouts. See how visual organization (proximity, similarity, alignment) affects how quickly you can locate elements.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Demo 2: Schema & Recognition</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Compare familiar vs. unfamiliar website layouts. Discover how recognition (fast, automatic) differs from recall (slow, effortful) and how it affects trust.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 dark:border-yellow-400 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Demo 3: Social Proof & Trust</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Evaluate products with different review profiles. Learn how review quantity and quality influence trustworthiness and purchase decisions.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 dark:border-orange-400 pl-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Demo 4: Variable Rewards</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Spin a wheel for discounts vs. receive a direct discount. Experience how variable reward schedules create anticipation and increase engagement.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg shadow-xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start with the first demo to experience how cognitive load affects your perception of websites.
            </p>
            <Link
              href="/landing"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Demo: Cognitive Load →
            </Link>
          </div>

          {/* Note */}
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              All responses are collected anonymously. Your data helps demonstrate psychological patterns across all participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
