'use client';

import React from 'react';
import {
  IconMusic,
  IconTheatre,
  IconBookSalon,
  IconGalleryFrame,
  IconStudioHands,
  IconBotanicalWalk,
  IconSupperTable,
  BrandIconProps,
} from '@/components/ui/BrandIcons';
import { EventCategory, EventTimeWindow } from '@/types';
import { useApp } from '@/context/AppContext';

const TIME_WINDOWS: Array<{ id: 'all' | EventTimeWindow; label: string }> = [
  { id: 'all', label: 'All Dates' },
  { id: 'tonight', label: 'Tonight' },
  { id: 'weekend', label: 'This Weekend' },
  { id: 'week', label: 'This Week' },
  { id: 'upcoming', label: 'Later in Nov' },
];

const FORMAT_TAGS: Array<{
  id: 'all' | EventCategory;
  label: string;
  Icon?: React.FC<BrandIconProps>;
}> = [
  { id: 'all', label: 'All Gatherings' },
  { id: 'music', label: 'Music', Icon: IconMusic },
  { id: 'theatre', label: 'Theatre', Icon: IconTheatre },
  { id: 'talks', label: 'Salons & Talks', Icon: IconBookSalon },
  { id: 'art', label: 'Exhibitions', Icon: IconGalleryFrame },
  { id: 'workshops', label: 'Workshops', Icon: IconStudioHands },
  { id: 'walks', label: 'Walks', Icon: IconBotanicalWalk },
  { id: 'supper-cinema', label: 'Supper & Cinema', Icon: IconSupperTable },
];

export const EventFilterStrip: React.FC = () => {
  const { timeFilter, setTimeFilter, categoryFilter, setCategoryFilter } = useApp();

  return (
    <div className="space-y-2.5 pt-1 pb-2">
      {/* 1. Time Horizon Strip */}
      <div className="px-5 overflow-x-auto scrollbar-none">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#EFE9DE]/90 border border-brand-warm-stone/65 min-w-max">
          {TIME_WINDOWS.map((tw) => {
            const active = timeFilter === tw.id;
            return (
              <button
                key={tw.id}
                type="button"
                onClick={() => setTimeFilter(tw.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11.5px] tracking-[0.01em] transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-brand-deep-green text-brand-ivory font-semibold shadow-xs'
                    : 'text-brand-ink/70 hover:text-brand-ink font-medium'
                }`}
              >
                {tw.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Brand Book Format Tags (Sage / Warm Stone / Terracotta active) */}
      <div className="px-5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {FORMAT_TAGS.map((tag) => {
            const active = categoryFilter === tag.id;
            const Icon = tag.Icon;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setCategoryFilter(tag.id)}
                className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[11.5px] transition-all cursor-pointer whitespace-nowrap border ${
                  active
                    ? 'bg-brand-terracotta text-brand-ivory border-brand-terracotta font-semibold shadow-xs'
                    : 'bg-[#FCFBF8] text-brand-ink/80 border-brand-warm-stone/80 hover:border-brand-sage font-medium'
                }`}
              >
                {Icon && (
                  <Icon
                    size={13.5}
                    accent={active ? '#F7F3EC' : '#C66E45'}
                    className={active ? 'text-brand-ivory' : 'text-brand-deep-green'}
                  />
                )}
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
