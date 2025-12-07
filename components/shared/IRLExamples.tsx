import Image from 'next/image';

interface IRLExample {
  image: string;
  caption: string;
}

interface IRLExamplesProps {
  examples: IRLExample[];
}

export default function IRLExamples({ examples }: IRLExamplesProps) {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Real-World Examples</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {examples.map((example, index) => (
          <div key={index} className="space-y-2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
              <Image
                src={example.image}
                alt={example.caption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{example.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
