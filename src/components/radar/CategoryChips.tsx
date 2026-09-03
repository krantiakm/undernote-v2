'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export const CategoryChips: React.FC = () => {
  const { domainFilter, setDomainFilter } = useApp();

  const categories: Array<{ id: 'all' | RadarDomain; label: string; emoji: string }> = [
    { id: 'all', label: 'All', emoji: '✦' },
    { id: 'food-drink', label: 'Coffee & Food', emoji: '☕' },
    { id: 'travel', label: 'Travel & Stays', emoji: '✈️' },
    { id: 'shopping', label: 'Hardware', emoji: '📱' },
    { id: 'books', label: 'Books & Theory', emoji: '📚' },
    { id: 'events', label: 'Acoustic Arts', emoji: '🎟️' },
  ];

  return (
    <div className="px-4 pb-2 pt-1 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1.5 min-w-max">
        {categories.map((cat) => {
          const isActive = domainFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setDomainFilter(cat.id)}
              className={`py-1 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-150 border ${
                isActive
                  ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green shadow-xs'
                  : 'bg-white/80 text-brand-ink-muted border-brand-warm-stone/60 hover:bg-white'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
