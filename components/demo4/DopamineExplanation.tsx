'use client';

import Link from 'next/link';

export default function DopamineExplanation() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          What You Just Experienced
        </h2>

        <div className="space-y-6">
          <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded">
            <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">Variable Reward Schedules</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The spin wheel you just used demonstrates a <strong>variable reward schedule</strong>—one of the most powerful psychological mechanisms for creating engagement. Unlike predictable rewards (like the direct discount), variable rewards create uncertainty, which triggers anticipation and keeps you coming back for more.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              When you didn&apos;t know what discount you&apos;d get, your brain released <strong>dopamine</strong>—not just when you won, but during the anticipation phase. This is why the &quot;Try Again&quot; result might have made you want to spin again, even though you already had a discount.
            </p>
          </section>

          <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 p-6 rounded">
            <h3 className="text-xl font-bold mb-3 text-green-800 dark:text-green-300">The Dopamine Effect</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Dopamine is often called the &quot;reward chemical,&quot; but it&apos;s actually more about <strong>anticipation and motivation</strong> than satisfaction. When outcomes are unpredictable, dopamine levels spike during the waiting period, creating a sense of excitement and drive to continue.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              This is why slot machines, social media feeds, and mobile games are so addictive. The uncertainty of &quot;what will I get?&quot; creates a stronger psychological pull than knowing exactly what you&apos;ll receive.
            </p>
          </section>

          <section className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 dark:border-purple-400 p-6 rounded">
            <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">Why This Matters for Web Design</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Variable reward mechanics are everywhere in digital design:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Social Media:</strong> Unpredictable likes, comments, and content keeps you scrolling</li>
              <li><strong>E-commerce:</strong> Spin wheels, scratch cards, and surprise discounts increase engagement</li>
              <li><strong>Gaming:</strong> Loot boxes, random rewards, and chance-based mechanics</li>
              <li><strong>Notifications:</strong> Unpredictable timing creates anticipation</li>
              <li><strong>Email Marketing:</strong> &quot;Limited time&quot; and &quot;Surprise sale&quot; create urgency</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              While these techniques can increase engagement, it&apos;s important to use them ethically and be aware of their psychological impact. Understanding how they work helps you make informed decisions as both a designer and a consumer.
            </p>
          </section>

          <section className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-400 p-6 rounded">
            <h3 className="text-xl font-bold mb-3 text-yellow-800 dark:text-yellow-300">The Science Behind It</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Psychological research has shown that <strong>variable ratio schedules</strong> (rewards after unpredictable numbers of actions) create the highest rates of response and are the most resistant to extinction. This is why:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 dark:text-gray-300">
              <li>You might spin multiple times even after getting a discount</li>
              <li>People continue playing slot machines despite losses</li>
              <li>Social media feeds keep you scrolling for &quot;one more post&quot;</li>
              <li>Mobile games use &quot;energy&quot; systems that create anticipation</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              The key insight: <strong>Uncertainty increases engagement more than certainty</strong>, even when the average reward is the same.
            </p>
          </section>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/final"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Final Summary
          </Link>
        </div>
      </div>
    </div>
  );
}
