'use client';

export default function ReflectionQuestions() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Take a Moment to Reflect
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
          Think about these questions. There are no right or wrong answers—just reflect on your experience.
        </p>

        <div className="space-y-8">
          {/* Section 1: How did it feel? */}
          <section className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">
              How did it feel?
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">1. When you spun the wheel, what emotions did you experience?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Consider: excitement, anticipation, disappointment, satisfaction, curiosity...
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">2. When you saw the direct discount, what emotions did you experience?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Consider: satisfaction, indifference, relief, appreciation...
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">3. Which experience felt more exciting or engaging?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Think about why one might have felt different from the other.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Why did you feel that way? */}
          <section className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-300">
              Why did you feel that way?
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">4. What made the spin wheel experience different from the direct discount?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Consider: uncertainty, anticipation, chance, surprise, control...
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">5. Did you want to spin again after getting a result? Why or why not?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Think about what motivated you—or didn&apos;t motivate you—to try again.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">6. How did getting &quot;Try Again&quot; make you feel compared to getting a discount?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Consider: frustration, motivation, disappointment, determination...
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Understanding the psychology */}
          <section className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300">
              Understanding the psychology
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">7. Before this demo, had you noticed similar patterns in real life?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Think about: casinos, mobile games, sales promotions, social media, apps...
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">8. Why do you think businesses use spin wheels or similar mechanics?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Consider: engagement, return visits, excitement, customer retention...
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">9. How well do you understand why variable rewards are engaging?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Reflect on what you&apos;ve learned about uncertainty and anticipation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Personal reflection */}
          <section className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-300">
              Personal reflection
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold mb-2">10. Would you be more likely to return to a site with a spin wheel or direct discounts?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Think about what would make you come back and why.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">11. Did this demo change how you think about marketing tactics?</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  Consider: awareness, skepticism, understanding, appreciation...
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center italic">
            Take your time with these questions. When you&apos;re ready, continue to learn about the psychology behind what you experienced.
          </p>
        </div>
      </div>
    </div>
  );
}
