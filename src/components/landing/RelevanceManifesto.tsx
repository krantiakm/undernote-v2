'use client';

import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const RelevanceManifesto: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            The Difference
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-ink">
            Ads vs. Genuine Relevance
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans">
            Ads show you what someone paid to put in front of you. Undernote shows you what you actually love, when the timing is right.
          </p>
        </div>

        {/* Crisp Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Column 1: Online Ads */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/70 border border-stone-300 space-y-3">
            <div className="flex items-center gap-2 text-rose-700">
              <XCircle className="w-4 h-4" />
              <h3 className="font-serif text-base font-bold text-brand-ink">
                Everyday Online Ads
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-brand-ink/75 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Prioritizes highest bidder over your taste</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Tracks your browsing across the web</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Fake countdown clocks &amp; artificial urgency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Interrupts your attention when you want calm</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Undernote */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-deep-green/30 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-brand-deep-green">
              <CheckCircle2 className="w-4 h-4 text-brand-deep-green" />
              <h3 className="font-serif text-base font-bold text-brand-ink">
                Undernote Relevance
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-brand-ink/85 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-brand-deep-green font-bold">✓</span>
                <span>Zero sponsored placement. Strictly your standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-deep-green font-bold">✓</span>
                <span>100% on-device private context</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-deep-green font-bold">✓</span>
                <span>Honest price monitoring &amp; route compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-deep-green font-bold">✓</span>
                <span>Arrives quietly only when criteria are met</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
