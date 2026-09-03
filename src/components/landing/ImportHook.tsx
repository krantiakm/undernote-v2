'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Edit2, ArrowDown } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

interface ImportHookProps {
  onOpenAiModal: () => void;
}

const SAMPLE_UNDERSTOOD = [
  { id: '1', statement: 'You usually avoid connecting flights when travelling with family.' },
  { id: '2', statement: 'You prefer smaller, compact phones over maximum screen size.' },
  { id: '3', statement: 'You repeatedly return to architecture, systems thinking and monographs.' },
  { id: '4', statement: 'You’ll pay more for quiet convenience when the difference is meaningful.' },
];

export const ImportHook: React.FC<ImportHookProps> = ({ onOpenAiModal }) => {
  const [confirmedIds, setConfirmedIds] = useState<string[]>(['1', '2', '3', '4']);

  const toggleConfirm = (id: string) => {
    setConfirmedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            You've already done the hard part.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            You already told AI who you are.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Bring what ChatGPT, Claude or Gemini already knows. Undernote turns it into something you own — and immediately puts it to work.
          </p>
        </div>

        {/* Visual Transformation Flow: Bring it in → See what it understood → See what it finds */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 text-center text-xs font-semibold text-brand-ink/80">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-warm-stone/60 shadow-xs">
            <span className="w-5 h-5 rounded-full bg-brand-deep-green text-white text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Bring it in</span>
          </div>
          <span className="text-stone-400 hidden md:inline">&rarr;</span>
          <span className="text-stone-400 md:hidden">&darr;</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-warm-stone/60 shadow-xs">
            <span className="w-5 h-5 rounded-full bg-brand-deep-green text-white text-[10px] flex items-center justify-center font-bold">2</span>
            <span>See what it understood</span>
          </div>
          <span className="text-stone-400 hidden md:inline">&rarr;</span>
          <span className="text-stone-400 md:hidden">&darr;</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-warm-stone/60 shadow-xs">
            <span className="w-5 h-5 rounded-full bg-brand-deep-green text-white text-[10px] flex items-center justify-center font-bold">3</span>
            <span>See what it finds</span>
          </div>
        </div>

        {/* Section 10: "See What It Understood" Moment */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/60 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-brand-warm-stone/30 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-terracotta font-bold block">
                Instant Context Synthesis
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-ink">
                Here’s what Undernote understood about you:
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <OpenAIIcon className="w-4 h-4 text-emerald-600" />
              <ClaudeIcon className="w-4 h-4 text-[#C66E45]" />
              <GeminiIcon className="w-4 h-4 text-blue-500" />
            </div>
          </div>

          <div className="space-y-3">
            {SAMPLE_UNDERSTOOD.map((item) => {
              const isConfirmed = confirmedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#F7F3EC] border border-brand-warm-stone/40 flex items-center justify-between gap-3 text-xs"
                >
                  <p className="font-sans text-brand-ink/85 font-medium leading-snug">
                    {item.statement}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleConfirm(item.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white text-stone-600 border border-stone-300'
                      }`}
                    >
                      {isConfirmed ? '✓ Right' : 'Confirm'}
                    </button>
                    <Link
                      href="/me"
                      className="px-2 py-1 rounded-full text-[11px] text-stone-500 hover:text-stone-800 bg-white border border-stone-300"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles size={13} className="text-brand-terracotta" />
              <span>Import with 1 click</span>
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
