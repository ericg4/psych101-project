'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import ConceptSection from '@/components/shared/ConceptSection';
import ResultsDisplay from '@/components/shared/ResultsDisplay';
import { getAggregatedStats, AggregatedStats } from '@/lib/analytics';

export default function Final() {
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAggregatedStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            The Psychology Behind What You Experienced
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading aggregated results...</p>
            </div>
          ) : stats && stats.totalResponses > 0 ? (
            <div className="mb-12">
              <ResultsDisplay stats={stats} />
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 mb-12">
              <p className="text-yellow-800 dark:text-yellow-300">
                No data available yet. Complete the demos to see aggregated results!
              </p>
            </div>
          )}

          <div className="space-y-8">
            <ConceptSection
              title="Cognitive Psychology: Perception, Attention, and Memory"
              concept="Cognitive Load Theory & Working Memory"
              explanation="Humans have limited working memory capacity—typically around 4±1 chunks of information. When websites present too much visual information simultaneously, they exceed this capacity, causing cognitive overload. The cluttered layout you saw overwhelmed your perceptual system, making it harder to identify relevant information. Clean layouts reduce cognitive load by using whitespace, clear hierarchies, and minimal distractions, allowing your brain to process information more efficiently."
              examples={[
                'Cluttered layouts increase stress and reduce task completion rates',
                'Whitespace improves readability and comprehension by 20%',
                'Clear visual hierarchies guide attention automatically',
              ]}
            />

            <ConceptSection
              title="Gestalt Principles & Visual Organization"
              concept="Proximity, Similarity, Continuity, and Closure"
              explanation="Gestalt psychology describes how humans naturally organize visual elements into meaningful groups. When you found the button faster on Screen A, you experienced these principles in action: buttons were grouped by proximity, shared similar styling (similarity), and formed clear visual patterns. Screen B violated these principles by placing elements randomly, forcing your brain to work harder to identify the target. Good design leverages these automatic perceptual processes to make interfaces feel intuitive."
              examples={[
                'Grouped elements are perceived as related',
                'Similar shapes and colors are automatically categorized together',
                'Aligned elements create visual flow and reduce search time',
              ]}
            />

            <ConceptSection
              title="Top-Down Processing & Schema Activation"
              concept="Recognition vs. Recall"
              explanation="Your brain stores mental models (schemas) of how websites typically work. When Layout A matched these expectations—navigation at the top, search on the right, familiar icons—you used recognition (fast, automatic). Layout B violated expectations, forcing you to use recall (slow, effortful) or infer meaning from context. Familiarity doesn't just make interfaces easier—it also increases perceived trustworthiness because predictable environments feel safer."
              examples={[
                'Users recognize familiar patterns 10x faster than novel ones',
                'Violating expectations increases cognitive load and reduces trust',
                'Standard UI patterns reduce learning curve for new users',
              ]}
            />

            <ConceptSection
              title="Social Proof & Trust"
              concept="Review Quantity vs. Quality & Trustworthiness"
              explanation="When evaluating products, reviews and ratings serve as powerful social proof. Products with many positive reviews trigger the bandwagon effect—the tendency to follow perceived group behavior. However, review quantity matters as much as quality: a product with great reviews but only a few total reviews may feel less trustworthy than one with many reviews, even if ratings are similar. This demonstrates how social proof influences trust and purchase decisions in e-commerce."
              examples={[
                'Products with more reviews are perceived as more trustworthy',
                'Social proof increases conversion rates by 15-30%',
                'Review quantity and quality both impact purchase decisions',
              ]}
            />

            <ConceptSection
              title="Dopamine & Variable Rewards"
              concept="Variable Reward Schedules & Engagement"
              explanation="The spin wheel you experienced demonstrates variable reward schedules—one of the most powerful psychological mechanisms for creating engagement. When rewards are unpredictable (like spinning for a discount), dopamine levels spike during anticipation, creating excitement and motivation to continue. This is why variable rewards create stronger engagement than predictable rewards, even when the average outcome is the same. The uncertainty of 'what will I get?' creates a psychological pull that keeps users coming back."
              examples={[
                'Variable rewards create 3x higher engagement than predictable ones',
                'Uncertainty increases dopamine release during anticipation',
                'Spin wheels and similar mechanics exploit variable reward patterns',
              ]}
            />

            <ConceptSection
              title="Ethics of Persuasive Design"
              concept="Dark Patterns vs. Ethical Design"
              explanation="While understanding psychology helps create better user experiences, it also enables manipulation. Dark patterns—deceptive design choices that trick users—exploit cognitive biases for profit. Ethical design uses psychological principles to reduce friction and support user goals, not to manipulate behavior. As designers and users, we must recognize these techniques and advocate for transparency, user autonomy, and well-being in digital environments."
              examples={[
                'Dark patterns include hidden costs, forced continuity, and false urgency',
                'Ethical design respects user autonomy and provides clear choices',
                'Transparency builds long-term trust over short-term gains',
              ]}
            />
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Key Takeaway</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Effective website design is grounded not just in aesthetics or technology, but in the way the human mind works.
              By examining these interactions through a psychological lens, we can better understand why certain designs feel
              intuitive, why some platforms are so compelling, and how online environments shape user well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
