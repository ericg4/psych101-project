'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function SchemaExplanation() {
  const [schemaStats, setSchemaStats] = useState<{
    easierAPercent: number;
    trustworthyAPercent: number;
    avgHoverTimeA: number;
    avgHoverTimeB: number;
    totalResponses: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const fetchSchemaStats = async () => {
      setLoadingStats(true);
      try {
        const { data: schemaData } = await supabase
          .from('schema_responses')
          .select('easier_layout, more_trustworthy_layout, hover_time_a, hover_time_b');

        if (schemaData && schemaData.length > 0) {
          const easierAPercent = (schemaData.filter(r => r.easier_layout === 'A').length / schemaData.length) * 100;
          const trustworthyAPercent = (schemaData.filter(r => r.more_trustworthy_layout === 'A').length / schemaData.length) * 100;

          // Calculate average hover times (only for responses that have hover time data)
          const hoverTimesA = schemaData
            .map(r => r.hover_time_a)
            .filter((time): time is number => time !== null && time !== undefined);
          const hoverTimesB = schemaData
            .map(r => r.hover_time_b)
            .filter((time): time is number => time !== null && time !== undefined);

          const avgHoverTimeA = hoverTimesA.length > 0
            ? hoverTimesA.reduce((sum, time) => sum + time, 0) / hoverTimesA.length
            : 0;
          const avgHoverTimeB = hoverTimesB.length > 0
            ? hoverTimesB.reduce((sum, time) => sum + time, 0) / hoverTimesB.length
            : 0;

          setSchemaStats({
            easierAPercent,
            trustworthyAPercent,
            avgHoverTimeA,
            avgHoverTimeB,
            totalResponses: schemaData.length,
          });
        }
      } catch (error) {
        console.error('Error fetching schema stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchSchemaStats();
  }, []);

  return (
    <div className="pt-24 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            What You Just Experienced
          </h2>

          <div className="space-y-6">
            <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Schema Theory & Mental Models</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your brain uses <strong>schemas</strong>—mental frameworks built from past experiences—to quickly understand new information. Layout A followed familiar web design patterns (top navigation, search bar, hero section) that match your existing mental model of how websites should work.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Layout B violated these expectations by placing navigation at the bottom, hiding search functionality, and using unconventional patterns. This created <strong>cognitive dissonance</strong>—your brain had to work harder to understand something that didn&apos;t match your expectations.
              </p>
            </section>

            <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-300">Recognition vs. Recall</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The familiar layout (A) leveraged <strong>recognition</strong>—you could instantly identify elements because they matched patterns you&apos;ve seen thousands of times. The unfamiliar layout (B) forced <strong>recall</strong>—you had to actively remember and figure out what each element meant.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Recognition is faster, easier, and less error-prone than recall. This is why consistent design patterns across websites reduce cognitive load and improve user experience.
              </p>
            </section>

            <section className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 dark:border-purple-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">Trust & Familiarity</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Familiar layouts feel more trustworthy because they signal professionalism and predictability. When users encounter expected patterns, they feel confident navigating your site. Unfamiliar layouts create uncertainty, which can reduce trust and increase bounce rates.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                This doesn&apos;t mean all websites should look identical, but core navigation patterns, content hierarchy, and interaction models should align with user expectations. Innovation works best when it enhances familiar patterns rather than replacing them entirely.
              </p>
            </section>

            <section className="bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-500 dark:border-orange-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-orange-800 dark:text-orange-300">Why This Matters for Web Design</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Understanding schema theory helps designers create intuitive interfaces. By following established patterns (like top navigation, left-to-right reading flow, consistent button placement), designers reduce cognitive load and improve usability.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                When breaking conventions, do so intentionally and provide clear affordances. Users should never have to guess how to navigate your site. The best designs feel instantly familiar while still being unique and memorable.
              </p>
            </section>
          </div>

          {/* Aggregated Results Section */}
          {schemaStats && schemaStats.totalResponses > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Results from All Users
              </h3>

              {/* Summary Stats Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Found Layout A Easier</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {schemaStats.easierAPercent.toFixed(0)}%
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Found Layout A More Trustworthy</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {schemaStats.trustworthyAPercent.toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Hover Time Stats */}
              {(schemaStats.avgHoverTimeA > 0 || schemaStats.avgHoverTimeB > 0) && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                    Average Hover Time
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Layout A (Familiar)</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {schemaStats.avgHoverTimeA > 0 ? `${(schemaStats.avgHoverTimeA / 1000).toFixed(2)}s` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Layout B (Unfamiliar)</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {schemaStats.avgHoverTimeB > 0 ? `${(schemaStats.avgHoverTimeB / 1000).toFixed(2)}s` : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Hover Time Comparison Bar Chart */}
                  {schemaStats.avgHoverTimeA > 0 && schemaStats.avgHoverTimeB > 0 && (
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                        Hover Time Comparison
                      </h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                          data={[
                            {
                              layout: 'Layout A\n(Familiar)',
                              time: Number((schemaStats.avgHoverTimeA / 1000).toFixed(2)),
                            },
                            {
                              layout: 'Layout B\n(Unfamiliar)',
                              time: Number((schemaStats.avgHoverTimeB / 1000).toFixed(2)),
                            },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                          <XAxis
                            dataKey="layout"
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
                            formatter={(value: number) => [`${value.toFixed(2)}s`, 'Average Hover Time']}
                          />
                          <Bar dataKey="time" radius={[8, 8, 0, 0]}>
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#f97316" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Easier Layout Distribution Pie Chart */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                    Which Layout Was Easier?
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Layout A',
                            value: schemaStats.easierAPercent,
                            color: '#3b82f6',
                          },
                          {
                            name: 'Layout B',
                            value: 100 - schemaStats.easierAPercent,
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

                {/* Trustworthy Layout Distribution Pie Chart */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                    Which Layout Was More Trustworthy?
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: 'Layout A',
                            value: schemaStats.trustworthyAPercent,
                            color: '#10b981',
                          },
                          {
                            name: 'Layout B',
                            value: 100 - schemaStats.trustworthyAPercent,
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
                        <Cell fill="#10b981" />
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
                  Based on <strong className="text-gray-900 dark:text-gray-100">{schemaStats.totalResponses}</strong> total responses
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
                href="/demo3"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue to Demo 3: Trust & Social Proof
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
