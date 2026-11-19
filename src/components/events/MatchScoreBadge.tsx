'use client';

import React from 'react';

interface MatchScoreBadgeProps {
  percent: number;
  variant?: 'inline' | 'compact' | 'dark-pill';
}

/**
 * Visual radial % Match indicator showing how strongly an event aligned
 * with the user's Personal Context Vault.
 */
export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  percent,
  variant = 'inline',
}) => {
  const clamped = Math.max(50, Math.min(99, Math.round(percent)));
  const radius = 6.5;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;

  const isHigh = clamped >= 88;
  const isMid = clamped >= 78 && clamped < 88;

  if (variant === 'dark-pill') {
    const stroke = isHigh ? '#7CE3B3' : isMid ? '#F09A73' : '#DDD6CB';
    return (
      <span
        style={{ backgroundColor: 'rgba(16, 23, 21, 0.90)' }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-white text-[10.5px] font-semibold border border-white/25 shadow-md tabular-nums"
      >
        <svg width="15" height="15" viewBox="0 0 18 18" className="-rotate-90 shrink-0">
          <circle
            cx="9"
            cy="9"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2.1"
          />
          <circle
            cx="9"
            cy="9"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="2.1"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <span>{clamped}% Match</span>
      </span>
    );
  }

  const ringStroke = isHigh ? '#24483F' : isMid ? '#C66E45' : '#8C857B';
  const pillClasses = isHigh
    ? 'bg-[#E7EFEA] text-brand-deep-green border-brand-deep-green/20'
    : isMid
    ? 'bg-[#F6E8E1] text-[#9E4E2B] border-brand-terracotta/25'
    : 'bg-[#EFE9DE] text-brand-ink-light border-brand-warm-stone';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tabular-nums shrink-0 ${pillClasses} ${
        variant === 'compact' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[10.5px]'
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 18 18" className="-rotate-90 shrink-0">
        <circle
          cx="9"
          cy="9"
          r={radius}
          fill="none"
          stroke="rgba(23,32,30,0.14)"
          strokeWidth="2.2"
        />
        <circle
          cx="9"
          cy="9"
          r={radius}
          fill="none"
          stroke={ringStroke}
          strokeWidth="2.2"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <span>{variant === 'compact' ? `${clamped}%` : `${clamped}% Match`}</span>
    </span>
  );
};
