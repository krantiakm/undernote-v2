'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export const CategoryChips: React.FC = () => {
  const { domainFilter, setDomainFilter } = useApp();

  const categories: Array<{ id: 'all' | RadarDomain; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'events', label: 'Watch' },
    { id: 'books', label: 'Read' },
    { id: 'food-drink', label: 'Nearby' },
    { id: 'travel', label: 'Travel' },
    { id: 'shopping', label: 'Shopping' },
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
              className={`py-1 px-3.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                isActive
                  ? 'bg-brand-deep-green text-white border-brand-deep-green shadow-xs font-semibold'
                  : 'bg-white/80 text-brand-ink/70 border-brand-warm-stone/60 hover:bg-white'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
