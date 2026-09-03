'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export const CategoryChips: React.FC = () => {
  const { domainFilter, setDomainFilter } = useApp();

  const categories: Array<{ id: 'all' | RadarDomain; label: string; emoji: string }> = [
    { id: 'all', label: 'All Domains', emoji: '✦' },
    { id: 'travel', label: 'Travel & Escapes', emoji: '✈️' },
    { id: 'books', label: 'Books & Mind', emoji: '📚' },
    { id: 'events', label: 'Acoustic Events', emoji: '🎟️' },
    { id: 'shopping', label: 'Hardware', emoji: '📱' },
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
              className={`py-1 px-3.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-150 border ${
                isActive
                  ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green shadow-xs font-semibold'
                  : 'bg-white/80 text-brand-ink/70 border-brand-warm-stone/60 hover:bg-white'
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
