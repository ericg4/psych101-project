'use client';

import { useState } from 'react';

interface WheelSpinnerProps {
  onSpinComplete: (discount: string) => void;
  maxSpins?: number;
}

const WHEEL_SEGMENTS = [
  { label: '5%', value: '5%', color: '#FF6B6B' },
  { label: '10%', value: '10%', color: '#4ECDC4' },
  { label: '15%', value: '15%', color: '#45B7D1' },
  { label: '20%', value: '20%', color: '#96CEB4' },
  { label: '25%', value: '25%', color: '#FFEAA7' },
  { label: '30%', value: '30%', color: '#DDA15E' },
  { label: '50%', value: '50%', color: '#FFD93D' },
  { label: 'Try Again', value: 'Try Again', color: '#95A5A6' },
];

export default function WheelSpinner({ onSpinComplete, maxSpins = 3 }: WheelSpinnerProps) {
  const [spinning, setSpinning] = useState(false);
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const [discountsReceived, setDiscountsReceived] = useState<string[]>([]);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (spinning || spinsUsed >= maxSpins) return;

    setSpinning(true);
    setCurrentResult(null);

    // Random rotation (multiple full rotations + random segment)
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const randomSegment = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const extraRotations = 5 + Math.random() * 3; // 5-8 full rotations

    // Calculate the angle needed to position the selected segment at the top (pointer position)
    // Segments are positioned starting from -90 degrees (top) in SVG coordinates
    // Each segment center is at: (index * segmentAngle) + (segmentAngle / 2) - 90 degrees
    // In CSS transform space (where 0 is top), this becomes: (index * segmentAngle) + (segmentAngle / 2)
    // To align the segment center with the pointer (top = 0), we rotate by: 360 - (centerAngle)
    const segmentCenterAngle = (randomSegment * segmentAngle) + (segmentAngle / 2);
    const targetRotation = 360 - segmentCenterAngle;
    const finalRotation = rotation + extraRotations * 360 + targetRotation;

    setRotation(finalRotation);

    // After animation completes
    setTimeout(() => {
      const result = WHEEL_SEGMENTS[randomSegment].value;
      setCurrentResult(result);
      setSpinning(false);
      const newSpinsUsed = spinsUsed + 1;
      setSpinsUsed(newSpinsUsed);

      if (result !== 'Try Again') {
        setDiscountsReceived((prev) => [...prev, result]);
      }

      onSpinComplete(result);
    }, 3000);
  };

  const canSpin = !spinning && spinsUsed < maxSpins;

  // Create SVG path for wheel segments
  const createSegmentPath = (index: number, radius: number) => {
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    const x1 = 50 + radius * Math.cos(startAngle);
    const y1 = 50 + radius * Math.sin(startAngle);
    const x2 = 50 + radius * Math.cos(endAngle);
    const y2 = 50 + radius * Math.sin(endAngle);
    const largeArc = segmentAngle > 180 ? 1 : 0;
    return `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel Container */}
      <div className="relative">
        <div className="w-80 h-80 relative mx-auto">
          {/* SVG Wheel */}
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {WHEEL_SEGMENTS.map((segment, index) => {
              const segmentAngle = 360 / WHEEL_SEGMENTS.length;
              const labelAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
              const labelRadius = 30; // Distance from center for label
              const labelX = 50 + labelRadius * Math.cos(labelAngle);
              const labelY = 50 + labelRadius * Math.sin(labelAngle);
              const rotationAngle = index * segmentAngle + segmentAngle / 2;

              return (
                <g key={index}>
                  <path
                    d={createSegmentPath(index, 45)}
                    fill={segment.color}
                    stroke="#1f2937"
                    strokeWidth="0.5"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    transform={`rotate(${rotationAngle} ${labelX} ${labelY})`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="5"
                    fill="white"
                    fontWeight="bold"
                    className="drop-shadow-lg pointer-events-none"
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-20 border-r-20 border-t-30 border-l-transparent border-r-transparent border-t-red-600 dark:border-t-red-500"></div>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {currentResult && (
        <div className={`text-center p-4 rounded-lg min-w-[300px] ${
          currentResult === 'Try Again'
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'bg-green-100 dark:bg-green-900/30'
        }`}>
          {currentResult === 'Try Again' ? (
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              No discount this time! Try again?
            </p>
          ) : (
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              🎉 You won {currentResult} off!
            </p>
          )}
        </div>
      )}

      {/* Discounts Received */}
      {discountsReceived.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Discounts received:</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {discountsReceived.map((discount, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full font-semibold"
              >
                {discount}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={!canSpin}
        className={`px-8 py-4 rounded-lg font-medium transition-colors ${
          canSpin
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        {spinning ? 'Spinning...' : spinsUsed >= maxSpins ? `All ${maxSpins} spins used!` : 'Spin the Wheel'}
      </button>

      {/* Spins Remaining */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Spins remaining: {maxSpins - spinsUsed}
      </p>
    </div>
  );
}
