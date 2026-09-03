'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Film, BookOpen, Utensils, Plane, Smartphone, Ticket } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-[#F7F3EC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Hero Copy */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand-deep-green/10 text-brand-deep-green font-bold border border-brand-deep-green/15">
            <Sparkles className="w-3 h-3 text-brand-terracotta" />
            <span>Meet Undernote</span>
          </div>

          {/* Master Tagline Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-ink leading-[1.15]">
            A world in tune with you.
          </h1>

          {/* Body */}
          <p className="text-base sm:text-lg md:text-xl text-brand-ink/80 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
            Bring what your AI already knows about you. Undernote uses it to find things that feel unusually well chosen for you — from films, books and places to trips, products and things worth knowing.
          </p>

          {/* Supporting line */}
          <p className="text-xs sm:text-sm text-brand-ink/60 font-medium">
            No starting from scratch. No endless searching. Just more of the world that feels like it fits.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/radar"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-sm font-bold shadow-md transition-all active:scale-95 group w-full sm:w-auto"
            >
              <span>See what Undernote finds for me</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
            </Link>
            <a
              href="#how-it-works"
              className="text-xs font-semibold text-brand-ink/70 hover:text-brand-ink transition-colors underline underline-offset-4 decoration-brand-warm-stone py-2 px-4"
            >
              See how it works &darr;
            </a>
          </div>

          {/* Trust line */}
          <div className="pt-1 text-xs text-brand-ink/60 font-sans flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Your context stays yours. No sponsored ranking.</span>
          </div>
        </div>

        {/* Hero Visual: Dynamic Editorial World Collage */}
        <div className="relative max-w-4xl mx-auto rounded-[32px] overflow-hidden bg-white border border-brand-warm-stone/60 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)]">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
            <Image
              src="/images/landing_hero_lookbook.jpg"
              alt="A world curated around you"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            
            {/* Floating Diverse Horizon Stream Over Collage */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-sage font-bold block">
                  The Living Feed
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                  Films · Books · Articles · Places · Escapes · Hardware
                </h3>
                <p className="text-xs text-white/80 font-sans">
                  The more it understands what you value, the better the world fits.
                </p>
              </div>

              {/* Sample Discovery Badges */}
              <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5">
                  <Film size={12} className="text-brand-terracotta" />
                  <span>Hidden Film</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5">
                  <Plane size={12} className="text-brand-terracotta" />
                  <span>Direct Flight</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5">
                  <Utensils size={12} className="text-brand-terracotta" />
                  <span>Quiet Table</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
