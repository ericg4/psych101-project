'use client';

interface TestimonialCardProps {
  type: 'withFace' | 'withoutFace';
  onSelect: () => void;
  selected?: boolean;
}

export default function TestimonialCard({ type, onSelect, selected }: TestimonialCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition-all ${
        selected ? 'ring-4 ring-blue-500 dark:ring-blue-400 scale-105' : 'hover:shadow-xl'
      }`}
    >
      <div className="flex items-start gap-4">
        {type === 'withFace' ? (
          <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {type === 'withFace' ? 'John Doe' : 'User123'}
            </h3>
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            &quot;This product changed my life! I&apos;ve never been happier with a purchase. Highly recommend to everyone!&quot;
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Verified Purchase</p>
        </div>
      </div>
    </div>
  );
}
