'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenAiModal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenAiModal }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-ink leading-tight">
            See what the world looks like when it knows you better.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 max-w-xl mx-auto font-sans leading-relaxed">
            Bring what your AI already knows and let Undernote start finding things for you.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenAiModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group w-full sm:w-auto cursor-pointer"
          >
            <span>Start my Undernote</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
          </button>
          <Link
            href="/radar"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-stone-50 border border-brand-warm-stone text-brand-ink text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 w-full sm:w-auto"
          >
            <span>See a sample</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
