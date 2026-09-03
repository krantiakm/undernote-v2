'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Edit2 } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

interface ImportHookProps {
  onOpenAiModal: () => void;
}

// Exactly 3 clean, high-impact statements per user request
const SAMPLE_UNDERSTOOD = [
  { id: '1', statement: 'Direct flights when travelling with family.' },
  { id: '2', statement: 'Compact phones under 6.3" screen size.' },
  { id: '3', statement: 'Clothbound architecture and systems monographs.' },
];

export const ImportHook: React.FC<ImportHookProps> = ({ onOpenAiModal }) => {
  const [confirmedIds, setConfirmedIds] = useState<string[]>(['1', '2', '3']);

  const toggleConfirm = (id: string) => {
    setConfirmedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header with prominent AI Icons */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          {/* Prominent, colorful AI Icons badge row */}
          <div className="flex items-center justify-center gap-3 pb-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-xs border border-brand-warm-stone/60">
              <OpenAIIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-semibold text-brand-ink">ChatGPT</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-xs border border-brand-warm-stone/60">
              <ClaudeIcon className="w-5 h-5 text-[#C66E45]" />
              <span className="text-xs font-semibold text-brand-ink">Claude</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-xs border border-brand-warm-stone/60">
              <GeminiIcon className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-semibold text-brand-ink">Gemini</span>
            </div>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-ink">
            You{' '}
            <span className="relative inline-block">
              already
              <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[3px] bg-brand-terracotta rounded-full" />
            </span>{' '}
            told AI who you are.
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75 font-sans max-w-md mx-auto">
            Bring what ChatGPT, Claude or Gemini already knows. Undernote turns it into something you own — and immediately puts it to work.
          </p>
        </div>

        {/* Compact "See What It Understood" Box - 3 clean items */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-5 sm:p-6 border border-brand-warm-stone/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-warm-stone/30 pb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-terracotta font-bold">
              What Undernote understands
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              Instant synthesis
            </span>
          </div>

          <div className="space-y-2">
            {SAMPLE_UNDERSTOOD.map((item) => {
              const isConfirmed = confirmedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#F7F3EC] border border-brand-warm-stone/40 flex items-center justify-between gap-3 text-xs"
                >
                  <p className="font-sans text-brand-ink font-medium">
                    {item.statement}
                  </p>
                  <button
                    onClick={() => toggleConfirm(item.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                      isConfirmed
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-stone-600 border border-stone-300'
                    }`}
                  >
                    {isConfirmed ? '✓ Right' : 'Confirm'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles size={13} className="text-brand-terracotta" />
              <span>Bring in my context</span>
            </button>
            <Link
              href="/radar"
              className="text-xs font-semibold text-brand-deep-green hover:text-brand-ink flex items-center gap-1 group"
            >
              <span>See what this changes</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
