'use client';

import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface IngestionHeroProps {
  onOpenModal: () => void;
}

export const IngestionHero: React.FC<IngestionHeroProps> = ({ onOpenModal }) => {
  const { hasPersonalized } = useApp();

  return (
    <div className="px-4 py-1.5">
      <button
        onClick={onOpenModal}
        className={`w-full py-2.5 px-4 rounded-2xl flex items-center justify-between transition-all duration-200 shadow-xs border ${
          hasPersonalized
            ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green hover:bg-brand-deep-green-dark'
            : 'bg-white text-brand-ink border-brand-warm-stone/80 hover:bg-brand-ivory'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              hasPersonalized
                ? 'bg-brand-terracotta text-white'
                : 'bg-brand-deep-green text-white'
            }`}
          >
            <Sparkles size={12} />
          </div>
          <div className="text-left">
            <span className="text-xs font-semibold block leading-tight">
              {hasPersonalized
                ? 'Your Context Active'
                : 'Bring what your AI already knows'}
            </span>
            <span className="text-[10px] opacity-80 block leading-tight">
              {hasPersonalized
                ? 'Tuned to your enduring preferences and active watches'
                : 'Connect ChatGPT, Claude, or speak a voice note in 10s'}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1 pl-2">
          <span>{hasPersonalized ? 'Tune' : 'Start'}</span>
          <ArrowRight size={12} />
        </span>
      </button>
    </div>
  );
};
