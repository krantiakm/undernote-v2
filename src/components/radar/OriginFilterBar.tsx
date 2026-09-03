'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { RecommendationOrigin } from '@/types';

export const OriginFilterBar: React.FC = () => {
  const { originFilter, setOriginFilter, cards } = useApp();

  const totalCount = cards.filter((c) => c.status !== 'dismissed').length;
  const proactiveCount = cards.filter((c) => c.originType === 'proactive' && c.status !== 'dismissed').length;
  const trackedCount = cards.filter((c) => c.originType === 'requested' && c.status !== 'dismissed').length;

  const filters: Array<{ id: 'all' | RecommendationOrigin; label: string; count: number }> = [
    { id: 'all', label: 'All', count: totalCount },
    { id: 'proactive', label: '✨ Proactive', count: proactiveCount },
    { id: 'requested', label: '🎯 Tracked', count: trackedCount },
  ];

  return (
    <div className="px-4 py-1">
      <div className="flex items-center gap-1 p-1 bg-brand-warm-stone/25 rounded-full border border-brand-warm-stone/40">
        {filters.map((f) => {
          const isActive = originFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setOriginFilter(f.id)}
              className={`flex-1 py-1 px-2 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-white text-brand-deep-green shadow-xs font-semibold'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-brand-deep-green/10 text-brand-deep-green font-bold'
                    : 'bg-brand-warm-stone/40 text-brand-ink-light'
                }`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
