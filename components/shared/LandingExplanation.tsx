'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

const COLORS = ['#3b82f6', '#ef4444'];

export default function LandingExplanation() {
  const [landingStats, setLandingStats] = useState<{
    avgStressClean: number;
    avgStressCluttered: number;
    cleanEasierPercent: number;
    totalResponses: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchLandingStats = async () => {
      setLoadingStats(true);
      try {
        const { data: landingData } = await supabase
          .from('landing_responses')
          .select('version_shown, stress_rating, easier_version');

        if (landingData && landingData.length > 0) {
          const cleanStress = landingData.filter(r => r.version_shown === 'clean').map(r => r.stress_rating) || [];
          const clutteredStress = landingData.filter(r => r.version_shown === 'cluttered').map(r => r.stress_rating) || [];
          const easierChoices = landingData.map(r => r.easier_version).filter(Boolean) || [];

          const avgStressClean = cleanStress.length > 0
            ? cleanStress.reduce((a, b) => a + b, 0) / cleanStress.length
            : 0;
          const avgStressCluttered = clutteredStress.length > 0
            ? clutteredStress.reduce((a, b) => a + b, 0) / clutteredStress.length
            : 0;
          const cleanEasierPercent = easierChoices.length > 0
            ? (easierChoices.filter(c => c === 'clean').length / easierChoices.length) * 100
            : 0;

          setLandingStats({
            avgStressClean,
            avgStressCluttered,
            cleanEasierPercent,
            totalResponses: landingData.length,
          });
        }
      } catch (error) {
        console.error('Error fetching landing stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchLandingStats();
  }, []);

  const stressData = landingStats ? [
    { name: 'Clean Layout', value: landingStats.avgStressClean },
    { name: 'Cluttered Layout', value: landingStats.avgStressCluttered },
  ] : [];

  const easierData = landingStats ? [
    { name: 'Clean Layout', value: landingStats.cleanEasierPercent },
    { name: 'Cluttered Layout', value: 100 - landingStats.cleanEasierPercent },
  ] : [];

  return (
    <div className="pt-24 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            What You Just Experienced
          </h2>

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

          {loadingStats ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading statistics...</div>
          ) : landingStats && landingStats.totalResponses > 0 ? (
            <div className="space-y-8 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Aggregated Results</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on {landingStats.totalResponses} response{landingStats.totalResponses !== 1 ? 's' : ''} from all users:
                </p>

                {/* Stress Levels Chart */}
                {stressData.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Average Stress Levels</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip formatter={(value: number) => value.toFixed(2)} />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Average Stress (Clean)</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {landingStats.avgStressClean.toFixed(1)}/10
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Average Stress (Cluttered)</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {landingStats.avgStressCluttered.toFixed(1)}/10
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Easier Layout Preference Chart */}
                {easierData.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Which Layout Was Easier?</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={easierData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {easierData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Prefer Clean Layout</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {landingStats.cleanEasierPercent.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No aggregated data available yet. Be the first to contribute!
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Ready to explore more psychological principles?
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/demo1"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue to Demo 1: Gestalt Principles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
