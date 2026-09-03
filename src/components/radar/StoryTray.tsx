'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';

export const StoryTray: React.FC = () => {
  const { stories, openStory } = useApp();

  return (
    <div className="py-3 px-4 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-3.5 min-w-max">
        {stories.map((story, index) => {
          const isTracked = story.badge === 'Tracked Alert';
          return (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex flex-col items-center gap-1.5 focus:outline-none group active:scale-95 transition-transform"
            >
              {/* Outer Ring with gradient */}
              <div
                className={`p-[2px] rounded-full transition-all duration-300 ${
                  isTracked
                    ? 'bg-gradient-to-tr from-brand-deep-green via-brand-sage to-emerald-400 group-hover:shadow-glow'
                    : 'bg-gradient-to-tr from-brand-terracotta via-amber-500 to-brand-terracotta-light group-hover:shadow-glow'
                }`}
              >
                <div className="p-0.5 bg-brand-ivory rounded-full">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/80">
                    <Image
                      src={story.heroImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Story Title */}
              <span className="text-[11px] font-medium text-brand-ink/90 tracking-tight max-w-[68px] truncate text-center">
                {story.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
