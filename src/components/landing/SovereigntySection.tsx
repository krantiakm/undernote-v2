'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Download, Edit3, Trash2, ArrowRight } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="privacy" className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Yours
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            What knows you should belong to you.
          </h2>
          <p className="text-sm text-brand-ink/75 leading-relaxed font-sans">
            See it. Change it. Take it with you. Delete it.
          </p>
        </div>

        {/* Tangible Context Interface Display per Section 15 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-warm-stone/30 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-deep-green font-bold">
              Your Active Context
            </span>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
              Stored locally by default
            </span>
          </div>

          <div className="space-y-3">
            {/* Context Item 1 */}
            <div className="p-4 rounded-2xl bg-[#F7F3EC] border border-brand-warm-stone/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-brand-ink">
                  Direct flights when travelling with family
                </h4>
                <p className="text-stone-600 font-sans">
                  You usually prefer direct flights when travelling as a family.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3 py-1 rounded-full bg-white border border-brand-warm-stone text-brand-ink text-xs font-medium hover:bg-stone-50">
                  Edit
                </button>
                <button className="px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-50">
                  Remove
                </button>
              </div>
            </div>

            {/* Context Item 2 */}
            <div className="p-4 rounded-2xl bg-[#F7F3EC] border border-brand-warm-stone/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-brand-ink">
                  Concise explanations
                </h4>
                <p className="text-stone-600 font-sans">
                  You generally prefer a short answer first without unnecessary filler.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3 py-1 rounded-full bg-white border border-brand-warm-stone text-brand-ink text-xs font-medium hover:bg-stone-50">
                  Edit
                </button>
                <button className="px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-50">
                  Remove
                </button>
              </div>
            </div>

            {/* Context Item 3 */}
            <div className="p-4 rounded-2xl bg-[#F7F3EC] border border-brand-warm-stone/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-brand-ink">
                  Ergonomic hardware sizing
                </h4>
                <p className="text-stone-600 font-sans">
                  Displays under 6.3 inches for true single-handed comfort.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3 py-1 rounded-full bg-white border border-brand-warm-stone text-brand-ink text-xs font-medium hover:bg-stone-50">
                  Edit
                </button>
                <button className="px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-50">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-brand-warm-stone/30">
            <Link
              href="/data"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-deep-green hover:underline"
            >
              <Download size={13} />
              <span>Export my context</span>
            </Link>
            <span className="text-[11px] font-mono text-stone-400">
              No sponsored ranking. No selling your attention.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
