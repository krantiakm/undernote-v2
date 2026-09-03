'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Check, Sparkles } from 'lucide-react';

export const MultiPlayerSection: React.FC = () => {
  return (
    <section id="friends" className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Multi-Player Shared Horizons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Planning with friends, without 40 WhatsApp debates.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/70 leading-relaxed font-sans">
            Group planning is notoriously exhausting. Create a shared capsule for an escape or dinner, share a 6-character link, and let Undernote find places where everyone's tastes effortlessly overlap.
          </p>
        </div>

        {/* Visual Hero Feature */}
        <div className="relative rounded-[32px] overflow-hidden bg-white border border-brand-warm-stone/60 shadow-[0_16px_35px_-8px_rgba(0,0,0,0.07)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Rich Editorial Image */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[440px] w-full bg-stone-100">
              <Image
                src="/images/landing_group_dining.jpg"
                alt="Friends enjoying dinner together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              
              {/* Floating Overlap Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200/80 shadow-md text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-brand-deep-green">
                  <Sparkles size={11} className="text-brand-terracotta" />
                  <span>Shared Horizon Overlap Solved</span>
                </div>
                <div className="font-serif font-bold text-brand-ink text-sm">
                  Dinner in Courtyard Garden
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  ✓ 2 Vegetarian · ✓ 1 Gluten-Free · ✓ Quiet Courtyard Seating
                </div>
              </div>
            </div>

            {/* Editorial Content on Right */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-brand-deep-green/10 text-brand-deep-green font-bold">
                  <Users size={12} />
                  <span>Zero Password Required</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-ink leading-tight">
                  Instant taste fusion for trips, dining, and gifts.
                </h3>
                <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                  Friends don’t need an account. They tap your link, pick their dietary leanings or flight preferences, and Undernote automatically surfaces options that respect everyone's quiet boundaries.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-brand-warm-stone/30 text-xs">
                <div className="flex items-center gap-2 text-brand-ink font-medium">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Scoped privacy: Only relevant trip preferences shared</span>
                </div>
                <div className="flex items-center gap-2 text-brand-ink font-medium">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Automatic constraint overlap solver</span>
                </div>
                <div className="flex items-center gap-2 text-brand-ink font-medium">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Capsule self-destructs after the event</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/radar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>Try It Now</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
