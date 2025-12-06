'use client';

import { useState } from 'react';

interface WheelSpinnerProps {
  onSpinComplete: (discount: string) => void;
  onContinue: () => void;
  maxSpins?: number;
}

const WHEEL_SEGMENTS = [
  { label: '5%', value: '5%', color: '#6B7280', gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)', textColor: '#FFFFFF', isBad: true },
  { label: '10%', value: '10%', color: '#60A5FA', gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', textColor: '#FFFFFF', isBad: false },
  { label: '15%', value: '15%', color: '#34D399', gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', textColor: '#FFFFFF', isBad: false },
  { label: '20%', value: '20%', color: '#A78BFA', gradient: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)', textColor: '#FFFFFF', isBad: false },
  { label: '25%', value: '25%', color: '#FBBF24', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', textColor: '#FFFFFF', isBad: false },
  { label: '30%', value: '30%', color: '#FB7185', gradient: 'linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)', textColor: '#FFFFFF', isBad: false },
  { label: '50%', value: '50%', color: '#FCD34D', gradient: 'linear-gradient(135deg, #FCD34D 0%, #FBBF24 50%, #F59E0B 100%)', textColor: '#1F2937', isBad: false, isBest: true },
  { label: 'Try Again', value: 'Try Again', color: '#9CA3AF', gradient: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)', textColor: '#FFFFFF', isBad: true },
];

export default function WheelSpinner({ onSpinComplete, onContinue, maxSpins = 3 }: WheelSpinnerProps) {
  const [spinning, setSpinning] = useState(false);
  const [spinsUsed, setSpinsUsed] = useState(0);
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const [lastSpinResult, setLastSpinResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  // Helper function to calculate which segment is at the pointer position (top = 0 degrees)
  // This helps verify our rotation calculations
  const getSegmentAtPointer = (currentRotation: number): number => {
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    // Normalize rotation to 0-360 range
    const normalizedRotation = currentRotation % 360;
    // The pointer is at 0 degrees (top)
    // After rotation, segment centers are shifted by normalizedRotation degrees
    // We need to find which segment center is closest to 0 degrees
    // Segment N's center starts at: (N * segmentAngle) + (segmentAngle / 2)
    // After rotation, it's at: [(N * segmentAngle) + (segmentAngle / 2) + normalizedRotation] % 360

    for (let i = 0; i < WHEEL_SEGMENTS.length; i++) {
      const segmentCenter = (i * segmentAngle) + (segmentAngle / 2);
      const rotatedCenter = (segmentCenter + normalizedRotation) % 360;
      // Check if this segment's center is closest to 0 (pointer position)
      const distanceToTop = Math.min(rotatedCenter, 360 - rotatedCenter);
      if (distanceToTop < segmentAngle / 2) {
        return i;
      }
    }
    return 0; // Fallback
  };

  const spinWheel = () => {
    if (spinning || spinsUsed >= maxSpins) return;

    setSpinning(true);
    setCurrentResult(null);

    // Random rotation (multiple full rotations + random segment)
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const randomSegment = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const extraRotations = 5 + Math.random() * 3; // 5-8 full rotations

    // CONCRETE CALCULATION APPROACH:
    //
    // Step 1: Define the target
    //   - We want segment[randomSegment] to end up at the pointer (top = 0 degrees)
    //
    // Step 2: Calculate where segment center starts
    //   - Segment N's center angle from top: (N * segmentAngle) + (segmentAngle / 2)
    //   - Example: With 8 segments (45° each), segment 0 center = 22.5°, segment 1 = 67.5°, etc.
    //
    // Step 3: Calculate rotation needed
    //   - Current segment center position: segmentCenterAngle degrees clockwise from top
    //   - Target: 0 degrees (pointer at top)
    //   - Rotation needed: rotate COUNTER-clockwise by segmentCenterAngle
    //   - In CSS (clockwise rotation): rotate by (360 - segmentCenterAngle) degrees
    //
    // Step 4: Apply rotation
    //   - Add extra full rotations for visual effect
    //   - Add the target rotation to align segment with pointer
    //   - Accumulate with previous rotation

    const segmentCenterAngle = (randomSegment * segmentAngle) + (segmentAngle / 2);
    const rotationToAlignWithPointer = 360 - segmentCenterAngle;

    // Calculate final rotation: current + extra spins + alignment rotation
    const finalRotation = rotation + extraRotations * 360 + rotationToAlignWithPointer;

    // Verify calculation (for debugging - can be removed in production)
    // After animation, verify the segment at pointer matches randomSegment
    // This will be checked in the setTimeout callback

    setRotation(finalRotation);

    // After animation completes
    setTimeout(() => {
      // Verify which segment is actually at the pointer
      const actualSegmentAtPointer = getSegmentAtPointer(finalRotation);

      // Use the actual segment at pointer (should match randomSegment if calculation is correct)
      const result = WHEEL_SEGMENTS[actualSegmentAtPointer].value;

      // Log for debugging if there's a mismatch
      if (actualSegmentAtPointer !== randomSegment) {
        console.warn(`Segment mismatch: Expected ${randomSegment}, got ${actualSegmentAtPointer}`);
      }

      setCurrentResult(result);
      setLastSpinResult(result); // Store the last spin result (this is what counts)
      setSpinning(false);
      const newSpinsUsed = spinsUsed + 1;
      setSpinsUsed(newSpinsUsed);

      // Only call onSpinComplete with the last result when user continues
      // Don't call it here - wait for user to click Continue
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
              // Label positioning: segments start at -90 degrees (top) in SVG coordinates
              // Convert to radians for Math.cos/sin
              const labelAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
              const labelRadius = 30; // Distance from center for label
              const labelX = 50 + labelRadius * Math.cos(labelAngle);
              const labelY = 50 + labelRadius * Math.sin(labelAngle);
              // Rotation angle for text orientation (in degrees, relative to top)
              const rotationAngle = index * segmentAngle + segmentAngle / 2;

              return (
                <g key={index}>
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      {segment.gradient.includes('#6B7280') ? (
                        <>
                          <stop offset="0%" stopColor="#6B7280" />
                          <stop offset="100%" stopColor="#4B5563" />
                        </>
                      ) : segment.gradient.includes('#60A5FA') ? (
                        <>
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </>
                      ) : segment.gradient.includes('#34D399') ? (
                        <>
                          <stop offset="0%" stopColor="#34D399" />
                          <stop offset="100%" stopColor="#10B981" />
                        </>
                      ) : segment.gradient.includes('#A78BFA') ? (
                        <>
                          <stop offset="0%" stopColor="#A78BFA" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </>
                      ) : segment.gradient.includes('#FBBF24') ? (
                        <>
                          <stop offset="0%" stopColor="#FBBF24" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </>
                      ) : segment.gradient.includes('#FB7185') ? (
                        <>
                          <stop offset="0%" stopColor="#FB7185" />
                          <stop offset="100%" stopColor="#F43F5E" />
                        </>
                      ) : segment.gradient.includes('#FCD34D') ? (
                        <>
                          <stop offset="0%" stopColor="#FCD34D" />
                          <stop offset="50%" stopColor="#FBBF24" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#9CA3AF" />
                          <stop offset="100%" stopColor="#6B7280" />
                        </>
                      )}
                    </linearGradient>
                  </defs>
                  <path
                    d={createSegmentPath(index, 45)}
                    fill={`url(#gradient-${index})`}
                    stroke={segment.isBad ? '#374151' : segment.isBest ? '#F59E0B' : '#1f2937'}
                    strokeWidth={segment.isBest ? '1.5' : segment.isBad ? '0.8' : '0.5'}
                    opacity={segment.isBad ? '0.7' : '1'}
                  />
                  {segment.isBest && (
                    <path
                      d={createSegmentPath(index, 45)}
                      fill="none"
                      stroke="#FCD34D"
                      strokeWidth="2"
                      strokeDasharray="2,2"
                      opacity="0.8"
                    />
                  )}
                  {segment.isBest && (
                    <text
                      x={labelX-2}
                      y={labelY-10}
                      transform={`rotate(${rotationAngle} ${labelX} ${labelY - 8})`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="3"
                      fill="#1F2937"
                      fontWeight="900"
                      className="pointer-events-none"
                    >
                      BEST!
                    </text>
                  )}
                  <text
                    x={labelX}
                    y={labelY}
                    transform={`rotate(${rotationAngle} ${labelX} ${labelY})`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={segment.isBest ? '6' : segment.isBad ? '4' : '5'}
                    fill={segment.textColor}
                    fontWeight={segment.isBest ? '900' : segment.isBad ? 'normal' : 'bold'}
                    className="drop-shadow-lg pointer-events-none"
                    style={{
                      textShadow: segment.isBest ? '0 0 8px rgba(252, 211, 77, 0.8)' : 'none',
                    }}
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
      {currentResult && (() => {
        const resultSegment = WHEEL_SEGMENTS.find(s => s.value === currentResult);
        const isBad = resultSegment?.isBad || false;
        const isBest = resultSegment?.isBest || false;

        return (
          <div className={`text-center p-6 rounded-lg min-w-[300px] transition-all duration-500 ${
            isBest
              ? 'bg-linear-to-br from-yellow-200 via-yellow-300 to-orange-300 dark:from-yellow-900/50 dark:via-yellow-800/50 dark:to-orange-900/50 border-4 border-yellow-400 dark:border-yellow-500 shadow-2xl scale-105'
              : isBad
              ? 'bg-gray-300 dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-600 opacity-75'
              : 'bg-linear-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-400 dark:border-green-500 shadow-lg'
          }`}>
            {currentResult === 'Try Again' ? (
              <div>
                <p className="text-3xl mb-2">😞</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  No discount this time!
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Try again?
                </p>
              </div>
            ) : currentResult === '5%' ? (
              <div>
                <p className="text-3xl mb-2">😐</p>
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  You got {currentResult} off
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Not great, but better than nothing...
                </p>
              </div>
            ) : isBest ? (
              <div className="animate-pulse">
                <p className="text-4xl mb-2">🎉🎊</p>
                <p className="text-3xl font-black text-yellow-900 dark:text-yellow-100 mb-1">
                  {currentResult} OFF!
                </p>
                <p className="text-lg font-bold text-orange-800 dark:text-orange-300">
                  AMAZING DEAL! 🏆
                </p>
              </div>
            ) : (
              <div>
                <p className="text-3xl mb-2">🎉</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  You won {currentResult} off!
                </p>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  Great deal!
                </p>
              </div>
            )}
          </div>
        );
      })(      )}

      {/* Last Spin Result Display */}
      {lastSpinResult && (() => {
        const resultSegment = WHEEL_SEGMENTS.find(s => s.value === lastSpinResult);
        const isBad = resultSegment?.isBad || false;
        const isBest = resultSegment?.isBest || false;

        return (
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Your final reward (from last spin):
            </p>
            <div className="inline-block">
              <span
                className={`px-6 py-3 rounded-full font-bold text-xl transition-all duration-300 ${
                  isBest
                    ? 'bg-linear-to-r from-yellow-400 via-yellow-300 to-orange-400 dark:from-yellow-600 dark:via-yellow-500 dark:to-orange-600 text-yellow-900 dark:text-yellow-100 border-4 border-yellow-500 dark:border-yellow-400 shadow-xl animate-pulse'
                    : isBad
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-400 dark:border-gray-600'
                    : 'bg-linear-to-r from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700 text-white border-2 border-green-500 dark:border-green-400 shadow-lg'
                }`}
              >
                {lastSpinResult === 'Try Again' ? (
                  <>😞 No Discount</>
                ) : lastSpinResult === '5%' ? (
                  <>😐 {lastSpinResult} OFF</>
                ) : isBest ? (
                  <>🏆 {lastSpinResult} OFF 🎉</>
                ) : (
                  <>🎉 {lastSpinResult} OFF</>
                )}
              </span>
            </div>
          </div>
        );
      })()}

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

      {/* Continue Button - appears after at least one spin */}
      {spinsUsed > 0 && !spinning && (
        <button
          onClick={() => {
            if (lastSpinResult) {
              onSpinComplete(lastSpinResult);
            }
            onContinue();
          }}
          className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors mt-4"
        >
          Continue with Current Reward
        </button>
      )}
    </div>
  );
}
