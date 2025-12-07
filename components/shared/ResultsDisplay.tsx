'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AggregatedStats } from '@/lib/analytics';

interface ResultsDisplayProps {
  stats: AggregatedStats;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export default function ResultsDisplay({ stats }: ResultsDisplayProps) {
  const stressData = [
    { name: 'Clean Layout', value: stats.landing.avgStressClean },
    { name: 'Cluttered Layout', value: stats.landing.avgStressCluttered },
  ];

  const gestaltData = [
    { name: 'Screen A (Good)', time: stats.gestalt.avgTimeA / 1000 }, // Convert milliseconds to seconds
    { name: 'Screen B (Bad)', time: stats.gestalt.avgTimeB / 1000 }, // Convert milliseconds to seconds
  ];

  const easierLayoutData = [
    { name: 'Layout A', value: stats.schema.easierAPercent },
    { name: 'Layout B', value: 100 - stats.schema.easierAPercent },
  ];

  return (
    <div className="space-y-12">
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Overall Statistics</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Based on <strong>{stats.totalResponses}</strong> total responses
        </p>
      </div>

      {/* Landing Page Results */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Landing Page: Stress Levels</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => value.toFixed(2)} />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Stress (Clean)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.landing.avgStressClean.toFixed(1)}/10</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Stress (Cluttered)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.landing.avgStressCluttered.toFixed(1)}/10</p>
          </div>
        </div>
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Prefer Clean Layout</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.landing.cleanEasierPercent.toFixed(1)}%</p>
        </div>
      </section>

      {/* Gestalt Results */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Gestalt Principles: Button Finding Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={gestaltData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}s`} />
                        <Legend />
                        <Bar dataKey="time" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Found Screen A Faster</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.gestalt.fasterAPercent.toFixed(1)}%</p>
        </div>
      </section>

      {/* Schema Results */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Schema Recognition: Easier Layout</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={easierLayoutData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {easierLayoutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                      </PieChart>
                    </ResponsiveContainer>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Easier: Layout A</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.schema.easierAPercent.toFixed(1)}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">More Trustworthy: Layout A</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.schema.trustworthyAPercent.toFixed(1)}%</p>
          </div>
        </div>
      </section>

      {/* Trust Results */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Trust: Product Selection & Purchase Intent</h3>
        {stats.trust.avgTrustByProduct.length > 0 && (
          <>
            <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Average Trust Rating by Product</h4>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.trust.avgTrustByProduct}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="product" />
                              <YAxis domain={[0, 10]} />
                              <Tooltip formatter={(value: number) => value.toFixed(2)} />
                              <Bar dataKey="avgTrust" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
          </>
        )}
      </section>

      {/* Dopamine Results */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Dopamine: Variable Rewards Engagement</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Wheel Spins</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.dopamine.avgWheelSpins.toFixed(1)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Direct Discount Claim Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.dopamine.avgDirectClaimed.toFixed(1)}%</p>
          </div>
        </div>
      </section>
    </div>
  );
}
