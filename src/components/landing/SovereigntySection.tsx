'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Lock, Edit3, FileJson } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="privacy" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Full Bleed Atmospheric Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ambient_sanctuary_bg.jpg"
          alt="Architectural sanctuary atmosphere"
          fill
          className="object-cover"
          priority
        />
        {/* Deep, rich cinematic overlay for crisp mobile readability */}
        <div className="absolute inset-0 bg-[#0E1A17]/85 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        
        {/* Header - Pristine contrast on dark atmospheric backdrop */}
        <div className="text-center space-y-2.5 max-w-xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            Privacy &amp; Control
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Your context belongs to you.
          </h2>
          <p className="text-xs sm:text-sm text-[#D1C9BE] leading-relaxed font-sans">
            See everything it knows, edit anything, and take it with you whenever you want.
          </p>
        </div>

        {/* 3 Frosted Glass Guarantee Cards - Mobile-first readability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/15 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 text-brand-terracotta flex items-center justify-center border border-white/20">
              <Lock size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-white">
              Stored on your device
            </h3>
            <p className="text-xs text-[#DDD6CB] font-sans leading-relaxed">
              Your preferences are evaluated locally against public web signals. We never broker your profile or sell ad space.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/15 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 text-brand-terracotta flex items-center justify-center border border-white/20">
              <Edit3 size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-white">
              Always editable
            </h3>
            <p className="text-xs text-[#DDD6CB] font-sans leading-relaxed">
              Tastes evolve. If a preference no longer applies, correct it or delete it in seconds without questions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/15 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 text-brand-terracotta flex items-center justify-center border border-white/20">
              <FileJson size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-white">
              Portable &amp; erasable
            </h3>
            <p className="text-xs text-[#DDD6CB] font-sans leading-relaxed">
              Export your synthesized context into standard JSON or Markdown anytime, or wipe everything with one tap.
            </p>
          </div>
        </div>

        {/* Clean Frosted Context Banner */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span className="text-white font-medium">
              Zero sponsored ranking. Zero profile auctions.
            </span>
          </div>
          <Link
            href="/data"
            className="inline-flex items-center gap-1.5 font-bold text-brand-terracotta hover:text-white transition-colors shrink-0"
          >
            <span>View &amp; export your context</span>
            <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
};
