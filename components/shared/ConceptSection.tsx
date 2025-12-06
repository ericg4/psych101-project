interface ConceptSectionProps {
  title: string;
  concept: string;
  explanation: string;
  examples?: string[];
}

export default function ConceptSection({ title, concept, explanation, examples }: ConceptSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-4">
        <p className="font-semibold text-blue-800 dark:text-blue-300">{concept}</p>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{explanation}</p>
      {examples && examples.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Examples:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
