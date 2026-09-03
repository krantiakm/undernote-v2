'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Mic, Plane, Coffee, Smartphone, ShieldCheck, MapPin } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';
import Link from 'next/link';

interface HeroSectionProps {
  onOpenAiModal: (provider: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

// The original powerful sentences that clearly articulate the product's benefits
const STATEMENTS = [
  { id: 'web', subject: 'the internet', predicate: 'was made for you' },
  { id: 'books', subject: 'books', predicate: 'were curated for you' },
  { id: 'escapes', subject: 'escapes', predicate: 'were planned for you' },
  { id: 'coffee', subject: 'coffee', predicate: 'was sourced for you' },
  { id: 'hardware', subject: 'hardware', predicate: 'was chosen for you' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiModal }) => {
  const [index, setIndex] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState<'undernote' | 'noisy'>('undernote');

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATEMENTS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const current = STATEMENTS[index];

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden">
      {/* Warm Sunlit Atmospheric Background Imagery */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
          alt="Warm natural landscape"
          className="w-full h-full object-cover object-center opacity-15 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ivory/85 via-brand-ivory/95 to-brand-ivory" />
      </div>

      {/* Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-terracotta/10 via-brand-sage/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brand-warm-stone/80 text-xs font-semibold text-brand-deep-green shadow-soft">
            <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
            <span>A world in tune with you</span>
            <span className="text-brand-ink-light/50">•</span>
            <span className="text-brand-terracotta font-medium">Zero noisy ads</span>
          </div>
        </motion.div>

        {/* Stable Fixed-Height Headline Container (ZERO layout shift or jumping) */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="min-h-[140px] sm:min-h-[180px] md:min-h-[210px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-brand-ink tracking-tight leading-[1.14]">
                  What if{' '}
                  <span className="inline-block relative text-brand-deep-green font-medium italic pb-2.5 sm:pb-3.5">
                    {current.subject}
                    {/* Signature Terracotta Underline with ample vertical clearance */}
                    <span className="absolute bottom-0 left-0 right-0 h-[3.5px] sm:h-[4.5px] bg-brand-terracotta rounded-full shadow-xs" />
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  <span className="text-brand-ink">{current.predicate}?</span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-brand-ink-light max-w-2xl mx-auto font-sans font-normal leading-relaxed pt-3">
            The world is full of noise. Undernote understands your persistent lifestyle rules, family constraints, and quiet curiosities — bringing you rare finds, direct flights, and books you&apos;ll love, before you have to search.
          </p>
        </div>

        {/* Sleek Compact AI Pill Dock */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brand-warm-stone/80 shadow-card">
            <span className="text-xs font-semibold text-brand-ink-light pl-4 pr-1 hidden sm:inline">
              Start with what your AI knows:
            </span>

            {/* Google Gemini */}
            <button
              onClick={() => onOpenAiModal('gemini')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/50 hover:border-blue-400 hover:shadow-xs transition-all text-xs font-bold text-brand-ink group active:scale-95"
            >
              <GeminiIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Gemini</span>
            </button>

            {/* ChatGPT */}
            <button
              onClick={() => onOpenAiModal('chatgpt')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/50 hover:border-emerald-500 hover:shadow-xs transition-all text-xs font-bold text-brand-ink group active:scale-95"
            >
              <OpenAIIcon className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>ChatGPT</span>
            </button>

            {/* Claude */}
            <button
              onClick={() => onOpenAiModal('claude')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/50 hover:border-amber-500 hover:shadow-xs transition-all text-xs font-bold text-brand-ink group active:scale-95"
            >
              <ClaudeIcon className="w-4 h-4 text-[#C66E45] group-hover:scale-110 transition-transform" />
              <span>Claude</span>
            </button>

            {/* Voice */}
            <button
              onClick={() => onOpenAiModal('voice')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/50 hover:border-brand-terracotta hover:shadow-xs transition-all text-xs font-bold text-brand-ink group active:scale-95"
            >
              <Mic size={13} className="text-brand-terracotta group-hover:scale-110 transition-transform" />
              <span>Voice</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-brand-ink-light">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck size={13} />
              <span>100% Local-First Privacy</span>
            </span>
            <span>•</span>
            <span>Takes 10 seconds to connect</span>
          </div>
        </motion.div>

        {/* Visual Product Showcase with Mobile-First Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-4xl mx-auto pt-4"
        >
          {/* Interactive Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-2xl bg-white border border-brand-warm-stone/80 shadow-soft">
              <button
                type="button"
                onClick={() => setInteractiveMode('undernote')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  interactiveMode === 'undernote'
                    ? 'bg-brand-deep-green text-brand-ivory shadow-sm'
                    : 'text-brand-ink-light hover:text-brand-ink'
                }`}
              >
                <Sparkles size={13} className="text-brand-terracotta" />
                <span>With Your Context Applied</span>
              </button>

              <button
                type="button"
                onClick={() => setInteractiveMode('noisy')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  interactiveMode === 'noisy'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-brand-ink-light hover:text-brand-ink'
                }`}
              >
                Generic Broadcast Web
              </button>
            </div>
          </div>

          {/* Interactive Consumer Cards */}
          <AnimatePresence mode="wait">
            {interactiveMode === 'undernote' ? (
              <motion.div
                key="undernote-preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-brand-warm-stone shadow-elevated space-y-5"
              >
                <div className="flex items-center justify-between border-b pb-3 border-brand-warm-stone/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-brand-deep-green">
                      Personalized to your home city & non-negotiables
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-brand-ink-light bg-brand-ivory px-2.5 py-0.5 rounded-full">
                    3 Perfect Matches
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Card 1: Travel */}
                  <div className="rounded-2xl bg-brand-ivory/60 border border-brand-warm-stone/50 p-4 space-y-3 flex flex-col justify-between hover:bg-white hover:border-brand-terracotta/40 transition-all group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-brand-terracotta flex items-center gap-1">
                          <Plane size={12} />
                          <span>ESCAPE</span>
                        </span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ₹14,200
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-brand-ink">
                        BLR → Colombo Direct
                      </h4>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        85-minute direct flight. Child-safe villa with private plunge pool.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                      <CheckCircle2 size={12} />
                      <span>Zero layovers (Non-negotiable met)</span>
                    </div>
                  </div>

                  {/* Card 2: Coffee */}
                  <div className="rounded-2xl bg-brand-ivory/60 border border-brand-warm-stone/50 p-4 space-y-3 flex flex-col justify-between hover:bg-white hover:border-brand-terracotta/40 transition-all group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-brand-terracotta flex items-center gap-1">
                          <Coffee size={12} />
                          <span>MICRO-LOT</span>
                        </span>
                        <span className="font-mono text-brand-ink-light font-bold bg-white px-1.5 py-0.5 rounded border border-brand-warm-stone/40">
                          40kg Harvest
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-brand-ink">
                        Araku Anaerobic Lot
                      </h4>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        Roasted 48h ago in Indiranagar. Jasmine & peach flavor profile.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                      <CheckCircle2 size={12} />
                      <span>Matches your exact pour-over palate</span>
                    </div>
                  </div>

                  {/* Card 3: Hardware */}
                  <div className="rounded-2xl bg-brand-ivory/60 border border-brand-warm-stone/50 p-4 space-y-3 flex flex-col justify-between hover:bg-white hover:border-brand-terracotta/40 transition-all group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-brand-terracotta flex items-center gap-1">
                          <Smartphone size={12} />
                          <span>WATCH MET</span>
                        </span>
                        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ₹56,499
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-brand-ink">
                        Pixel 11 Compact
                      </h4>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        Single-hand grip ergonomic design with clean stock Android.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                      <CheckCircle2 size={12} />
                      <span>Screen &lt; 6.3&quot; limit satisfied</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="noisy-preview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-neutral-300 shadow-soft space-y-5 opacity-75"
              >
                <div className="flex items-center justify-between border-b pb-3 border-neutral-200">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Generic Algorithm Feed (Without Your Context)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    Sponsored Ads
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400">FLIGHT PROMO</span>
                    <h4 className="font-bold text-sm text-neutral-800">14-Hour Layover Deal</h4>
                    <p className="text-xs text-red-500 font-semibold">
                      ❌ Violates: Direct-flight family rule
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400">COMMERCIAL COFFEE</span>
                    <h4 className="font-bold text-sm text-neutral-800">Bulk Dark Roast Pods</h4>
                    <p className="text-xs text-red-500 font-semibold">
                      ❌ Violates: Light anaerobic taste
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                    <span className="text-[10px] font-bold text-neutral-400">AFFILIATE POST</span>
                    <h4 className="font-bold text-sm text-neutral-800">6.9-Inch Heavy Phablet</h4>
                    <p className="text-xs text-red-500 font-semibold">
                      ❌ Violates: Single-hand ergonomic limit
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
