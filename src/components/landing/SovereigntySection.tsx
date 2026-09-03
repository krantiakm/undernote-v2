'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Download, Edit3, Trash2, ArrowRight, Lock, FileJson } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="privacy" className="py-16 sm:py-24 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header rewritten in natural, confident English */}
        <div className="text-center space-y-2.5 max-w-xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Privacy &amp; Control
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Your context belongs to you.
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
            See everything it knows, edit anything, and take it with you whenever you want.
          </p>
        </div>

        {/* Clean, elegant 3-guarantee grid — zero clumsy chip clutter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-xs space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/50">
              <Lock size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-brand-ink">
              Stored on your device
            </h3>
            <p className="text-xs text-brand-ink/70 font-sans leading-relaxed">
              Your preferences are evaluated locally against public web signals. We never broker your profile or sell ad space.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-xs space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/50">
              <Edit3 size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-brand-ink">
              Always editable
            </h3>
            <p className="text-xs text-brand-ink/70 font-sans leading-relaxed">
              Tastes evolve. If a preference no longer applies, correct it or delete it in seconds without questions.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-xs space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/50">
              <FileJson size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-brand-ink">
              Portable &amp; erasable
            </h3>
            <p className="text-xs text-brand-ink/70 font-sans leading-relaxed">
              Export your synthesized context into standard JSON or Markdown anytime, or wipe everything with one tap.
            </p>
          </div>
        </div>

        {/* Clean Context Preview Banner */}
        <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand-deep-green shrink-0" />
            <span className="text-brand-ink font-medium">
              Zero sponsored ranking. Zero profile auctions.
            </span>
          </div>
          <Link
            href="/data"
            className="inline-flex items-center gap-1.5 font-bold text-brand-deep-green hover:underline shrink-0"
          >
            <span>View &amp; export your context</span>
            <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
};
