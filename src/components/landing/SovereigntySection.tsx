'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Share2, Edit3, FileJson } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="your-context" className="relative py-14 sm:py-20 overflow-hidden">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 relative z-10">
        
        {/* Header - Pristine contrast on dark atmospheric backdrop */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            Privacy &amp; Control
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Your context{' '}
            <span className="relative inline-block">
              belongs to you
              <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[3px] bg-brand-terracotta rounded-full" />
            </span>
            .
          </h2>
          <p className="text-xs sm:text-sm text-[#D1C9BE] leading-relaxed font-sans">
            See everything it knows, edit anything, and share only what you choose.
          </p>
        </div>

        {/* 3 Frosted Glass Guarantee Cards - Owned by you, Always editable, Portable & erasable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/15 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 text-brand-terracotta flex items-center justify-center border border-white/20">
              <Share2 size={15} />
            </div>
            <h3 className="font-serif font-bold text-sm text-white">
              Owned by you
            </h3>
            <p className="text-xs text-[#DDD6CB] font-sans leading-relaxed">
              Your context is completely yours. You choose who to share with—a friend, a group, or a service—and share only the relevant slice without revealing everything.
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
