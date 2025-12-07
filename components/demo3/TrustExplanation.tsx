'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { products } from '@/lib/products';
import Link from 'next/link';

interface TrustExplanationProps {
  selectedProductId?: string;
}

export default function TrustExplanation({ selectedProductId }: TrustExplanationProps) {
  const [trustStats, setTrustStats] = useState<{
    productDistribution: { name: string; value: number }[];
    avgTrustByProduct: { product: string; avgTrust: number }[];
    purchaseIntentByProduct: { product: string; yes: number; no: number }[];
    totalResponses: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Only show navigation if a specific product was selected
  const showNavigation = selectedProductId !== undefined;
  const currentIndex = selectedProductId ? products.findIndex((p) => p.id === selectedProductId) : -1;
  const previousProduct = showNavigation && currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = showNavigation && currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  useEffect(() => {
    const fetchTrustStats = async () => {
      setLoadingStats(true);
      try {
        const { data: trustData } = await supabase
          .from('trust_responses')
          .select('selected_product, trust_rating, purchase_intent');

        if (trustData && trustData.length > 0) {
          // Product distribution
          const productCounts: Record<string, number> = {};
          trustData.forEach((r) => {
            if (r.selected_product) {
              productCounts[r.selected_product] = (productCounts[r.selected_product] || 0) + 1;
            }
          });
          const productDistribution = Object.entries(productCounts).map(([key, value]) => ({
            name: products.find((p) => p.id === key)?.name || key,
            value,
          }));

          // Average trust by product
          const trustByProduct: Record<string, number[]> = {};
          trustData.forEach((r) => {
            if (r.selected_product && r.trust_rating) {
              if (!trustByProduct[r.selected_product]) {
                trustByProduct[r.selected_product] = [];
              }
              trustByProduct[r.selected_product].push(r.trust_rating);
            }
          });
          const avgTrustByProduct = Object.entries(trustByProduct).map(([key, ratings]) => ({
            product: products.find((p) => p.id === key)?.name || key,
            avgTrust: ratings.reduce((sum, r) => sum + r, 0) / ratings.length,
          }));

          // Purchase intent by product
          const purchaseIntentByProduct: Record<string, { yes: number; no: number }> = {};
          trustData.forEach((r) => {
            if (r.selected_product && r.purchase_intent !== null) {
              if (!purchaseIntentByProduct[r.selected_product]) {
                purchaseIntentByProduct[r.selected_product] = { yes: 0, no: 0 };
              }
              if (r.purchase_intent) {
                purchaseIntentByProduct[r.selected_product].yes++;
              } else {
                purchaseIntentByProduct[r.selected_product].no++;
              }
            }
          });
          const purchaseIntentData = Object.entries(purchaseIntentByProduct).map(([key, value]) => ({
            product: products.find((p) => p.id === key)?.name || key,
            yes: value.yes,
            no: value.no,
          }));

          setTrustStats({
            productDistribution,
            avgTrustByProduct,
            purchaseIntentByProduct: purchaseIntentData,
            totalResponses: trustData.length,
          });
        }
      } catch (error) {
        console.error('Error fetching trust stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchTrustStats();
  }, []);

  return (
    <div className="pt-24 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation - only show if coming from individual product page */}
        {showNavigation && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Link
              href="/demo3"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Products
            </Link>

            <div className="flex gap-2">
              {previousProduct && (
                <Link
                  href={`/demo3/${previousProduct.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Product
                </Link>
              )}
              {nextProduct && (
                <Link
                  href={`/demo3/${nextProduct.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Next Product
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
            What You Just Experienced
          </h2>

          <div className="space-y-6">
            <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Social Proof & Trust</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You just experienced the power of <strong>social proof</strong>—a psychological phenomenon where people assume the actions of others reflect correct behavior. When you saw reviews, ratings, and customer feedback, your brain used this information to assess trustworthiness and make a decision.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Products with positive reviews and high ratings trigger our <strong>bandwagon effect</strong>—the tendency to do something because others are doing it. This is why e-commerce sites prominently display review counts, star ratings, and &quot;verified purchase&quot; badges.
              </p>
            </section>

            <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-300">The Impact of Reviews</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Products with higher ratings and more reviews are perceived as more trustworthy and are more likely to be purchased. Negative reviews can significantly impact trust, even if they&apos;re in the minority.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                You rated all three products, each with different review profiles:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                {products.map((p) => (
                  <li key={p.id}>
                    <strong>{p.name}</strong>: {p.averageRating.toFixed(1)}/5.0 with {p.reviewCount.toLocaleString()} review{p.reviewCount !== 1 ? 's' : ''}
                    {p.reviewCount === 3 && p.averageRating >= 4.5 && ' (Great reviews, but very few!)'}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Notice how the product with great reviews but only 3 total reviews may have felt less trustworthy than the one with many reviews, even if the ratings were similar. This demonstrates the importance of both review quality AND quantity in building trust.
              </p>
            </section>

            <section className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 dark:border-purple-400 p-6 rounded">
              <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">Why This Matters for Web Design</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Social proof elements—reviews, testimonials, user counts, ratings, and trust badges—are powerful conversion tools. They reduce perceived risk and help users make decisions faster. However, they must be authentic and relevant to be effective.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Strategically placing social proof near key decision points (like &quot;Add to Cart&quot; buttons) can significantly increase conversion rates. The key is making it easy for users to see what others think without overwhelming them with information.
              </p>
            </section>
          </div>

          {loadingStats ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading statistics...</div>
          ) : trustStats && trustStats.totalResponses > 0 ? (
            <div className="space-y-8 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Aggregated Results</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on {trustStats.totalResponses} response{trustStats.totalResponses !== 1 ? 's' : ''} from all users:
                </p>

                {trustStats.avgTrustByProduct.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Average Trust Rating by Product</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={trustStats.avgTrustByProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip formatter={(value: number) => value.toFixed(2)} />
                        <Bar dataKey="avgTrust" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {trustStats.purchaseIntentByProduct.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Purchase Intent by Product</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={trustStats.purchaseIntentByProduct}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => value.toFixed(0)} />
                        <Legend />
                        <Bar dataKey="yes" stackId="a" fill="#10b981" name="Would Purchase" />
                        <Bar dataKey="no" stackId="a" fill="#ef4444" name="Would Not Purchase" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No aggregated data available yet. Be the first to contribute!
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Link
              href="/demo4"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Demo 4
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
