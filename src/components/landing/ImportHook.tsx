'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Mic, FileText, Bot } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

interface ImportHookProps {
  onOpenAiModal: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

export const ImportHook: React.FC<ImportHookProps> = ({ onOpenAiModal }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            You’ve already done the hard part.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            You already told AI who you are.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Your conversations with ChatGPT, Claude and Gemini already contain years of preferences, plans, constraints, interests and decisions. Bring that understanding into Undernote instead of teaching another product from zero.
          </p>
        </div>

        {/* 3-Step Visual Card Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/50 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-ivory flex items-center justify-center text-brand-deep-green font-serif font-bold text-lg border border-brand-warm-stone/60">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-ink">
                Bring it in
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans">
                Import or paste what your AI already knows with a ready-made 10-second prompt.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-stone-100 text-stone-700">
                <GeminiIcon className="w-4 h-4" />
              </span>
              <span className="p-1.5 rounded-lg bg-stone-100 text-stone-700">
                <OpenAIIcon className="w-4 h-4 text-emerald-600" />
              </span>
              <span className="p-1.5 rounded-lg bg-stone-100 text-stone-700">
                <ClaudeIcon className="w-4 h-4 text-[#C66E45]" />
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/50 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-ivory flex items-center justify-center text-brand-deep-green font-serif font-bold text-lg border border-brand-warm-stone/60">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-ink">
                Undernote makes sense of it
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans">
                It separates lasting preferences from things that matter right now. Zero rigid rules.
              </p>
            </div>
            <div className="text-[11px] font-mono text-brand-terracotta font-semibold">
              Separates what lasts from right now
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/50 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-ivory flex items-center justify-center text-brand-deep-green font-serif font-bold text-lg border border-brand-warm-stone/60">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-ink">
                Your world starts changing
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans">
                Undernote immediately begins finding films, articles, places, and trips that fit.
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-700 font-semibold">
              Immediate personalized feed
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div className="text-center space-y-3 pt-2">
          <button
            onClick={() => onOpenAiModal('gemini')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group cursor-pointer"
          >
            <Sparkles size={14} className="text-brand-terracotta" />
            <span>Bring in my context</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-brand-ink/60 font-sans">
            Prefer not to import?{' '}
            <Link href="/me" className="text-brand-deep-green font-semibold underline underline-offset-2 hover:text-brand-ink">
              Build your Undernote yourself with voice or text
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
};
