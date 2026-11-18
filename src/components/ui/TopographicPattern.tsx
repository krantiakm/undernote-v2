'use client';

import React from 'react';

interface TopographicPatternProps {
  className?: string;
  strokeColor?: string;
  opacity?: number;
}

/**
 * Subtle organic topographic contour pattern from Section 4 of the Undernote Brand Book.
 * Adds warm paper-map depth behind editorial headers, profile portraits, and quiet states.
 */
export const TopographicPattern: React.FC<TopographicPatternProps> = ({
  className = '',
  strokeColor = '#DDD6CB',
  opacity = 0.55,
}) => {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 420 180"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path
        d="M-30 34C26 12 78 52 142 38C206 24 252 -8 318 18C384 44 412 22 456 8"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M-24 62C36 42 92 78 156 64C220 50 266 18 330 46C394 74 418 52 460 36"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M-20 92C44 74 102 108 168 94C234 80 280 48 344 76C408 104 424 84 464 68"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M-16 124C52 108 112 140 180 126C248 112 292 82 356 108C420 134 432 118 468 104"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M-10 156C60 142 124 170 194 156C264 142 306 116 368 140C430 164 440 150 472 138"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <ellipse
        cx="318"
        cy="68"
        rx="54"
        ry="24"
        transform="rotate(-9 318 68)"
        stroke={strokeColor}
        strokeWidth="0.9"
      />
      <ellipse
        cx="318"
        cy="68"
        rx="28"
        ry="12"
        transform="rotate(-9 318 68)"
        stroke={strokeColor}
        strokeWidth="0.9"
      />
    </svg>
  );
};
