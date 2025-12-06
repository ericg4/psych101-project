'use client';

interface StressSliderProps {
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
}

export default function StressSlider({ value, onChange, onSubmit }: StressSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Calm</span>
        <span>Stressed</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-center">
        <span className="text-3xl font-bold text-blue-600">{value}</span>
        <span className="text-gray-500">/10</span>
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
