'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function GestaltExplanation() {
  const [gestaltStats, setGestaltStats] = useState<{
    avgTimeA: number;
    avgTimeB: number;
    fasterAPercent: number;
    totalResponses: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const fetchGestaltStats = async () => {
      setLoadingStats(true);
      try {
        const { data: gestaltData } = await supabase
          .from('gestalt_responses')
          .select('screen_a_time, screen_b_time, faster_screen');

        if (gestaltData && gestaltData.length > 0) {
          const avgTimeA = gestaltData.reduce((sum, r) => sum + (r.screen_a_time || 0), 0) / gestaltData.length;
          const avgTimeB = gestaltData.reduce((sum, r) => sum + (r.screen_b_time || 0), 0) / gestaltData.length;
          const fasterAPercent = (gestaltData.filter(r => r.faster_screen === 'A').length / gestaltData.length) * 100;

          setGestaltStats({
            avgTimeA,
            avgTimeB,
            fasterAPercent,
            totalResponses: gestaltData.length,
          });
        }
      } catch (error) {
        console.error('Error fetching gestalt stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchGestaltStats();
  }, []);

  return (
    <div className="pt-24 p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">What You Just Experienced</h2>

          <div className="space-y-6">
            <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Gestalt Principles</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Gestalt psychology describes how humans naturally organize visual elements into meaningful groups. Screen A used principles like <strong>proximity</strong> (grouped buttons), <strong>similarity</strong> (consistent styling), and <strong>alignment</strong> (organized layout) to guide your attention automatically.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Screen B violated these principles by scattering elements randomly, forcing your brain to work harder to identify the target. This demonstrates how visual organization directly impacts cognitive load and search efficiency.
              </p>
            </section>

            <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-300">Selective Attention & Visual Search</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When elements are grouped and aligned, your brain uses <strong>parallel processing</strong> to scan multiple items simultaneously. When elements are scattered, you must use <strong>serial search</strong>—checking each item one by one—which is slower and more mentally taxing.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Your timing difference reflects this: well-organized layouts reduce search time by up to 50% compared to disorganized ones.
              </p>
            </section>

            <section className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 dark:border-purple-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">Why This Matters for Web Design</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Modern websites rely on Gestalt principles to create intuitive interfaces. Navigation menus, button groups, and content sections use proximity and similarity to communicate relationships without explicit labels.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                When designers violate these principles—by scattering navigation, using inconsistent styling, or breaking alignment—users experience increased cognitive load, slower task completion, and higher frustration. Good design isn&apos;t just aesthetic; it&apos;s cognitive efficiency.
              </p>
            </section>
          </div>

          {/* Aggregated Results Section */}
          {gestaltStats && gestaltStats.totalResponses > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Results from All Users
              </h3>

              {/* Summary Stats Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Time (Screen A)</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {(gestaltStats.avgTimeA / 1000).toFixed(2)}s
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Time (Screen B)</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {(gestaltStats.avgTimeB / 1000).toFixed(2)}s
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Found A Faster</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {gestaltStats.fasterAPercent.toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Average Time Comparison Bar Chart */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                    Average Search Time Comparison
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={[
                        {
                          screen: 'Screen A\n(Good Gestalt)',
                          time: Number((gestaltStats.avgTimeA / 1000).toFixed(2)),
                        },
                        {
                          screen: 'Screen B\n(Bad Gestalt)',
                          time: Number((gestaltStats.avgTimeB / 1000).toFixed(2)),
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                      <XAxis
                        dataKey="screen"
                        tick={{ fill: '#6b7280', className: 'dark:text-gray-300' }}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis
                        label={{
                          value: 'Time (seconds)',
                          angle: -90,
                          position: 'insideLeft',
                          fill: '#6b7280',
                          className: 'dark:fill-gray-300'
                        }}
                        tick={{ fill: '#6b7280', className: 'dark:text-gray-300' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--tooltip-bg, #ffffff)',
                          border: '1px solid var(--tooltip-border, #e5e7eb)',
                          borderRadius: '8px',
                          color: 'var(--tooltip-text, #111827)',
                        }}
                        formatter={(value: number) => [`${value.toFixed(2)}s`, 'Average Time']}
                      />
                      <Bar dataKey="time" radius={[8, 8, 0, 0]}>
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Faster Screen Distribution Pie Chart */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                    Which Screen Was Faster?
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Screen A Faster',
                            value: gestaltStats.fasterAPercent,
                            color: '#3b82f6',
                          },
                          {
                            name: 'Screen B Faster',
                            value: 100 - gestaltStats.fasterAPercent,
                            color: '#ef4444',
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--tooltip-bg, #ffffff)',
                          border: '1px solid var(--tooltip-border, #e5e7eb)',
                          borderRadius: '8px',
                          color: 'var(--tooltip-text, #111827)',
                        }}
                        formatter={(value: number) => [`${value.toFixed(1)}%`, 'Percentage']}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{ color: '#6b7280' }}
                        formatter={(value) => (
                          <span className="text-gray-700 dark:text-gray-300">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Response Count */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based on <strong className="text-gray-900 dark:text-gray-100">{gestaltStats.totalResponses}</strong> total responses
                </p>
              </div>
            </div>
          )}

          {loadingStats && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading aggregated results...</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Ready to explore more psychological principles?
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/demo2"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue to Demo 2: Schema & Recognition
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
