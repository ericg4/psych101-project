'use client';

interface ComparisonViewProps {
  onEasierChoice: (version: 'clean' | 'cluttered') => void;
}

export default function ComparisonView({ onEasierChoice }: ComparisonViewProps) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Compare Both Versions</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Clean Layout</h3>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-light text-gray-700">Welcome</h1>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Cluttered Layout</h3>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 min-h-[400px] relative overflow-hidden">
            <div className="absolute top-2 left-2 right-2 bg-red-600 text-white p-2 text-center font-bold animate-blink">
              🔥 LIMITED TIME OFFER! CLICK NOW! 🔥
            </div>
            <div className="grid grid-cols-3 gap-2 mt-16">
              {Array.from({ length: 12 }).map((_, i) => (
                <button
                  key={i}
                  className={`p-3 rounded text-sm font-bold ${
                    i % 3 === 0
                      ? 'bg-red-500 text-white'
                      : i % 3 === 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-yellow-500 text-black'
                  }`}
                >
                  Button {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-600">SPECIAL DEAL!</p>
              <p className="text-lg font-bold text-red-600">BUY NOW!</p>
              <p className="text-sm text-gray-500">Limited stock available</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold mb-4">Which version feels easier to use?</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onEasierChoice('clean')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clean Layout
          </button>
          <button
            onClick={() => onEasierChoice('cluttered')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cluttered Layout
          </button>
        </div>
      </div>
    </div>
  );
}
