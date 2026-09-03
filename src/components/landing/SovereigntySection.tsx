'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Download, Trash2, Sliders, EyeOff, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="sovereignty" className="py-24 sm:py-32 bg-brand-ivory relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Radical Data Sovereignty</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Your context.{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              Your control.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Unlike big-tech surveillance algorithms that hoard your data to manipulate attention, Undernote operates as a sovereign layer owned entirely by you.
          </p>
        </div>

        {/* 4 Sovereignty Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Local-First Storage */}
          <div className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-ink">
              100% Local-First Storage
            </h4>
            <p className="text-xs text-brand-ink-light leading-relaxed">
              Your bedrock rules and active horizons stay encrypted on your device. Zero cloud surveillance.
            </p>
          </div>

          {/* Pillar 2: Zero Ad Brokering */}
          <div className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <EyeOff size={20} />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-ink">
              Zero Data Brokering
            </h4>
            <p className="text-xs text-brand-ink-light leading-relaxed">
              We never sell your profiles, search queries, or family data to third-party ad networks.
            </p>
          </div>

          {/* Pillar 3: 1-Click Portable Export */}
          <div className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Download size={20} />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-ink">
              1-Click Portable Export
            </h4>
            <p className="text-xs text-brand-ink-light leading-relaxed">
              Export your structured context profile in Markdown or JSON anytime to take it to any other AI assistant.
            </p>
          </div>

          {/* Pillar 4: Total Granular Control */}
          <div className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 shadow-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-terracotta flex items-center justify-center">
              <Trash2 size={20} />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-ink">
              Granular Edit & Delete
            </h4>
            <p className="text-xs text-brand-ink-light leading-relaxed">
              Full transparent audit trail. Correct, override, or delete any single rule or memory item instantly.
            </p>
          </div>
        </div>

        {/* Portable Context Preview Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-deep-green">
              Portable AI Interoperability
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink">
              Take your personal context anywhere you go
            </h3>
            <p className="text-xs sm:text-sm text-brand-ink-light max-w-lg leading-relaxed">
              Your context isn't locked in a proprietary silo. Generate a verified markdown prompt and paste it into ChatGPT, Claude, Gemini, or Apple Intelligence.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/data"
              className="px-5 py-2.5 rounded-2xl bg-brand-deep-green text-white text-xs font-semibold hover:bg-brand-deep-green-dark transition-all shadow-md inline-flex items-center gap-2"
            >
              <Download size={14} />
              <span>Inspect Raw Context Data</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
