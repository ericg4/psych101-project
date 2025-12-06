'use client';

interface FamiliarityPollProps {
  onEasierChoice: (layout: 'A' | 'B') => void;
  onTrustworthyChoice: (layout: 'A' | 'B') => void;
}

export default function FamiliarityPoll({ onEasierChoice, onTrustworthyChoice }: FamiliarityPollProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <p className="text-lg font-semibold mb-4">Which layout was easier to understand?</p>
        <div className="flex gap-4">
          <button
            onClick={() => onEasierChoice('A')}
            className="flex-1 py-3 bg-white border-2 border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Layout A
          </button>
          <button
            onClick={() => onEasierChoice('B')}
            className="flex-1 py-3 bg-white border-2 border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Layout B
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <p className="text-lg font-semibold mb-4">Which layout felt more trustworthy?</p>
        <div className="flex gap-4">
          <button
            onClick={() => onTrustworthyChoice('A')}
            className="flex-1 py-3 bg-white border-2 border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Layout A
          </button>
          <button
            onClick={() => onTrustworthyChoice('B')}
            className="flex-1 py-3 bg-white border-2 border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Layout B
          </button>
        </div>
      </div>
    </div>
  );
}
