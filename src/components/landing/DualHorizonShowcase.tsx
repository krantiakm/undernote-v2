'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const DualHorizonShowcase: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            The Horizon Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Two horizons of taste. Zero rigid rules.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/70 leading-relaxed font-sans">
            Human lives don't fit into static database boxes. We balance your enduring lifestyle foundations with whatever you are exploring right now.
          </p>
        </div>

        {/* 2 Horizon Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Horizon 1: Longer Duration Persistence */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/50 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-brand-deep-green/10 text-brand-deep-green font-bold">
                  ⏳ Longer Duration Persistence
                </span>
                <span className="text-[11px] font-mono text-stone-400">Months &amp; Years</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Enduring Foundations
                </h3>
                <p className="text-xs font-serif italic text-brand-terracotta">
                  "Foundational lifestyle habits that remain steady over long seasons."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                If you are vegetarian, you stay vegetarian for a long time. If you travel with family, direct non-stop flights are a strong preference. These aren't rigid walls—they are steady leanings that shape how the world opens up to you.
              </p>

              {/* Concrete Examples */}
              <div className="space-y-2 pt-2 border-t border-brand-warm-stone/30 text-xs">
                <div className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-deep-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink font-semibold block">Dietary &amp; Routine Baselines:</strong>
                    <span className="text-brand-ink/70">Plant-forward dining, specialty single-origin filter roasts.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-deep-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink font-semibold block">Transit &amp; Comfort Philosophies:</strong>
                    <span className="text-brand-ink/70">Non-stop departures to prevent family travel exhaustion.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-deep-green shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink font-semibold block">Ergonomics &amp; Tactile Standards:</strong>
                    <span className="text-brand-ink/70">Physical tools that prioritize tactile ergonomics and deep focus.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-stone-400 border-t border-brand-warm-stone/20">
              Continuously active across all searches
            </div>
          </div>

          {/* Horizon 2: Current Horizons (Active Focus) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/50 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-brand-terracotta/10 text-brand-terracotta font-bold">
                  ⏱️ Current Horizons
                </span>
                <span className="text-[11px] font-mono text-stone-400">Next 3–8 Weeks</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Active Focus &amp; Searches
                </h3>
                <p className="text-xs font-serif italic text-brand-terracotta">
                  "Projects, escapes, and objects you are specifically hunting right now."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                You might be planning an escape for this December, tracking a specific book reprint, or waiting for a seasonal ticket release. Once fulfilled, these horizons naturally conclude.
              </p>

              {/* Concrete Examples */}
              <div className="space-y-2 pt-2 border-t border-brand-warm-stone/30 text-xs">
                <div className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/40 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink font-semibold block">December Coastal Family Escape:</strong>
                    <span className="text-brand-ink/70">Monitoring direct flight price dips below your target window.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/40 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink font-semibold block">Clothbound Monograph Watch:</strong>
                    <span className="text-brand-ink/70">Scanning indie bookstore network for incoming first represses.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/40 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink font-semibold block">Weekend Chamber Recital:</strong>
                    <span className="text-brand-ink/70">Checking Saturday unamplified seats at your neighborhood hall.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-stone-400 border-t border-brand-warm-stone/20">
              Expires or archives automatically when fulfilled
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
