'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenAiModal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenAiModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
        
        <div className="space-y-2.5">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-ink leading-tight">
            See what the world looks like when it knows you better.
          </h2>
          <p className="text-xs sm:text-base text-brand-ink/75 max-w-md mx-auto font-sans">
            Bring what your AI already knows and let Undernote start finding things for you.
          </p>
        </div>

        {/* Single confident primary CTA button per user feedback */}
        <div className="pt-2 flex flex-col items-center justify-center gap-3">
          <button
            onClick={onOpenAiModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group cursor-pointer"
          >
            <span>Start my Undernote</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
          </button>
          
          <Link
            href="/radar"
            className="text-xs text-stone-500 hover:text-brand-ink font-medium underline underline-offset-4 decoration-stone-300"
          >
            Explore live feed
          </Link>
        </div>

      </div>
    </section>
  );
};
