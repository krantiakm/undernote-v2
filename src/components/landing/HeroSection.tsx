'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const STATEMENTS = [
  { id: 'web', subject: 'the internet', color: '#1F3A33' },
  { id: 'escapes', subject: 'escapes', color: '#1F3A33' },
  { id: 'books', subject: 'books', color: '#C66E45' },
  { id: 'arts', subject: 'performing arts', color: '#C66E45' },
  { id: 'tools', subject: 'everyday tools', color: '#1F3A33' },
];

export const HeroSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATEMENTS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const current = STATEMENTS[index];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-[#F7F3EC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Top Editorial Eyebrow */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-brand-deep-green/10 text-brand-deep-green font-bold border border-brand-deep-green/15">
            <Sparkles className="w-3 h-3 text-brand-terracotta" />
            <span>Proactive Personal Discovery</span>
          </div>

          {/* Master Headline with Smooth Animated Rotating Underline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-ink leading-[1.15]">
            Imagine if{' '}
            <span className="relative inline-block whitespace-nowrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="inline-block text-brand-deep-green italic"
                >
                  {current.subject}
                </motion.span>
              </AnimatePresence>

              {/* Animated Underline */}
              <motion.span
                key={`line-${current.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: 'easeInOut' }}
                className="absolute left-0 -bottom-1 w-full h-[3px] bg-brand-terracotta rounded-full origin-left"
              />
            </span>
            <br />
            was made for you.
          </h1>

          {/* Human, Non-Jargon Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-brand-ink/70 max-w-2xl mx-auto font-sans font-normal leading-relaxed pt-2">
            Instead of searching 20 tabs or drowning in algorithmic ads, Undernote quietly learns your enduring taste and current interests—finding direct family flights, rare clothbound monographs, intimate acoustic recitals, and ergonomic tools before you have to ask.
          </p>

          {/* Singular Clear "Try It Now" CTA */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/radar"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-sm font-bold shadow-md transition-all active:scale-95 group w-full sm:w-auto"
            >
              <span>Try It Now</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#categories"
              className="text-xs font-mono text-brand-ink/60 hover:text-brand-ink transition-colors underline underline-offset-4 decoration-brand-warm-stone py-2 px-4"
            >
              Explore the 4 Categories &darr;
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-brand-ink/50 font-mono">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck size={13} />
              <span>100% On-Device Privacy</span>
            </span>
            <span>•</span>
            <span>Zero ad surveillance</span>
          </div>
        </div>

        {/* Visual Editorial Centerpiece (The Kinfolk Lifestyle Still Life) */}
        <div className="relative max-w-4xl mx-auto rounded-[28px] overflow-hidden bg-white border border-brand-warm-stone/60 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/landing_hero_lookbook.jpg"
              alt="Undernote Peaceful Morning Lifestyle"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            {/* 4 Interactive Category Pills Floating Over Image */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-sage font-bold block">
                  The Four Pilot Horizons
                </span>
                <span className="font-serif text-sm sm:text-base font-bold">
                  Curated for your life, not commercial algorithms.
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  ✈️ Travel
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  📚 Books
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  🎟️ Events
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  📱 Hardware
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
