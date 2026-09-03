'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, ShieldCheck, Zap, SlidersHorizontal, MapPin, Coffee, Plane, Smartphone, BookOpen } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

interface HeroSectionProps {
  onOpenAiModal: (provider: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

const MORPH_PHRASES = [
  { text: 'the internet was made', category: 'Everything' },
  { text: 'escapes were planned', category: 'Travel' },
  { text: 'coffee was sourced', category: 'Taste' },
  { text: 'books were curated', category: 'Reading' },
  { text: 'hardware was chosen', category: 'Tools' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiModal }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState<'noisy' | 'undernote'>('undernote');
  const { hasPersonalized } = useApp();

  // Cycle through phrases every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % MORPH_PHRASES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background Soft Glows & Ambient Textures */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-br from-brand-sage-subtle via-brand-terracotta-subtle to-transparent rounded-full blur-3xl pointer-events-none -z-10 opacity-70" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-brand-warm-stone/70 text-xs font-semibold text-brand-deep-green shadow-soft">
            <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
            <span>Sovereign Personal Context Layer</span>
            <span className="text-brand-ink-light">•</span>
            <span className="text-brand-terracotta">Zero Ad Noise</span>
          </div>
        </motion.div>

        {/* Dynamic Morphing Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-brand-ink tracking-tight leading-[1.15]">
            What if{' '}
            <span className="relative inline-block whitespace-nowrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-medium text-brand-deep-green italic inline-block"
                >
                  {MORPH_PHRASES[phraseIndex].text}
                </motion.span>
              </AnimatePresence>
              {/* Signature Terracotta Underline */}
              <motion.span
                layout
                className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 right-0 h-[3px] sm:h-[4px] bg-brand-terracotta rounded-full shadow-sm"
              />
            </span>{' '}
            <br className="hidden sm:inline" />
            for you?
          </h1>

          <p className="text-base sm:text-xl text-brand-ink-light max-w-2xl mx-auto font-sans font-normal leading-relaxed pt-2">
            The world is full of noise. Undernote understands your persistent lifestyle rules,
            tactile constraints, and quiet ambitions — surfacing only what fits you, proactively.
          </p>
        </div>

        {/* Primary CTA Block: Start with What Your AI Already Knows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-12 max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-brand-warm-stone/80 shadow-elevated"
        >
          <div className="text-center space-y-1 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-terracotta">
              Immediate 10-Second Setup
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-ink">
              Start with what your favorite AI already knows about you
            </h3>
            <p className="text-xs text-brand-ink-light">
              Click any provider below to copy the custom extraction prompt and ingest your context in 1 tap:
            </p>
          </div>

          {/* AI Providers Button Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Google Gemini */}
            <button
              onClick={() => onOpenAiModal('gemini')}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/60 hover:border-blue-400/80 hover:shadow-soft transition-all group text-center sm:text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <GeminiIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-ink flex items-center gap-1 justify-center sm:justify-start">
                  <span>Gemini</span>
                </div>
                <div className="text-[10px] text-brand-ink-light">Google AI</div>
              </div>
            </button>

            {/* ChatGPT */}
            <button
              onClick={() => onOpenAiModal('chatgpt')}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/60 hover:border-emerald-500/80 hover:shadow-soft transition-all group text-center sm:text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                <OpenAIIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-ink flex items-center gap-1 justify-center sm:justify-start">
                  <span>ChatGPT</span>
                </div>
                <div className="text-[10px] text-brand-ink-light">OpenAI Memory</div>
              </div>
            </button>

            {/* Claude */}
            <button
              onClick={() => onOpenAiModal('claude')}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/60 hover:border-amber-500/80 hover:shadow-soft transition-all group text-center sm:text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
                <ClaudeIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-ink flex items-center gap-1 justify-center sm:justify-start">
                  <span>Claude</span>
                </div>
                <div className="text-[10px] text-brand-ink-light">Anthropic</div>
              </div>
            </button>

            {/* Voice Note */}
            <button
              onClick={() => onOpenAiModal('voice')}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-2xl bg-brand-ivory/60 hover:bg-white border border-brand-warm-stone/60 hover:border-brand-terracotta hover:shadow-soft transition-all group text-center sm:text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-brand-terracotta shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-ink flex items-center gap-1 justify-center sm:justify-start">
                  <span>Voice Note</span>
                </div>
                <div className="text-[10px] text-brand-ink-light">30s Hands-free</div>
              </div>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-warm-stone/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-brand-ink-light">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>100% Local-first data sovereignty. Zero ad tracking.</span>
            </div>
            <Link
              href="/radar"
              className="text-brand-deep-green font-semibold hover:underline flex items-center gap-1"
            >
              <span>Or explore sample radar directly</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>

        {/* Interactive Live Transformation Demo Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16 sm:mt-20 max-w-4xl mx-auto"
        >
          <div className="text-center space-y-2 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-ink-light">
              Interactive Proof of Concept
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ink">
              See the difference context makes
            </h2>
            <p className="text-xs sm:text-sm text-brand-ink-light max-w-md mx-auto">
              Toggle between what the generic web shows you vs. how Undernote applies your persistent bedrock rules.
            </p>

            {/* Interactive Toggle Switch */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-brand-warm-stone/80 shadow-soft mt-3">
              <button
                type="button"
                onClick={() => setInteractiveMode('noisy')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  interactiveMode === 'noisy'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-brand-ink-light hover:text-brand-ink'
                }`}
              >
                📢 The Broadcast Web (Generic Noise)
              </button>
              <button
                type="button"
                onClick={() => setInteractiveMode('undernote')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  interactiveMode === 'undernote'
                    ? 'bg-brand-deep-green text-brand-ivory shadow-sm'
                    : 'text-brand-ink-light hover:text-brand-ink'
                }`}
              >
                <Sparkles size={12} className="text-brand-terracotta" />
                <span>✨ Undernote (Your Context Applied)</span>
              </button>
            </div>
          </div>

          {/* Morphing Demonstration Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {interactiveMode === 'noisy' ? (
                /* The Noisy Web Card */
                <motion.div
                  key="noisy"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-dashed border-neutral-300 shadow-soft space-y-5"
                >
                  <div className="flex items-center justify-between border-b pb-3 border-neutral-100">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      Generic Affiliate Feed
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 font-mono">
                      Sponsored • 14 Tracking Cookies
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 opacity-80">
                      <span className="text-[10px] font-bold text-neutral-400">FLIGHT DEAL</span>
                      <h4 className="font-bold text-neutral-800 text-sm">₹11,999 Flight to Bangkok</h4>
                      <p className="text-xs text-neutral-500">
                        14-hour layover in Kuala Lumpur. Departs 3:30 AM. Non-refundable.
                      </p>
                      <div className="text-[10px] text-red-500 font-semibold">
                        ❌ Violates: Direct non-stop flight rule for 7yo daughter
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 opacity-80">
                      <span className="text-[10px] font-bold text-neutral-400">SMARTPHONE HYPE</span>
                      <h4 className="font-bold text-neutral-800 text-sm">6.9-inch Ultra Phablet Deal</h4>
                      <p className="text-xs text-neutral-500">
                        Heavy 240g body, bloatware pre-installed, massive display.
                      </p>
                      <div className="text-[10px] text-red-500 font-semibold">
                        ❌ Violates: Ergonomics limit (screen &gt; 6.3 inches)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 opacity-80">
                      <span className="text-[10px] font-bold text-neutral-400">COMMERCIAL COFFEE</span>
                      <h4 className="font-bold text-neutral-800 text-sm">Dark Roast Espresso Pods</h4>
                      <p className="text-xs text-neutral-500">
                        High bitterness, 6 months past roast date, mass production blend.
                      </p>
                      <div className="text-[10px] text-red-500 font-semibold">
                        ❌ Violates: Light anaerobic single-origin requirement
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* The Undernote Card */
                <motion.div
                  key="undernote"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-brand-ivory-light rounded-3xl p-6 sm:p-8 border border-brand-warm-stone shadow-elevated space-y-5"
                >
                  <div className="flex items-center justify-between border-b pb-3 border-brand-warm-stone/50">
                    <span className="text-xs font-bold text-brand-deep-green uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
                      100% Context-Aligned Finds (Bangalore Anchor)
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-brand-deep-green/10 text-brand-deep-green font-semibold">
                      Zero Compromises • High Signal
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Escape Match */}
                    <div className="p-4 rounded-2xl bg-white border border-brand-warm-stone/60 space-y-2 shadow-soft hover:border-brand-terracotta/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-brand-terracotta flex items-center gap-1">
                          <Plane size={11} />
                          <span>TRAVEL ESCAPE</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                          ₹14,200
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-brand-ink text-sm">
                        BLR → Colombo Direct Non-Stop
                      </h4>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        85m direct flight. Aligns with Dec 20–27 family coastal retreat window.
                      </p>
                      <div className="text-[10px] text-brand-deep-green font-semibold flex items-center gap-1">
                        <CheckCircle size={12} className="text-emerald-600" />
                        <span>Satisfies 100% family flight bedrock</span>
                      </div>
                    </div>

                    {/* Hardware Match */}
                    <div className="p-4 rounded-2xl bg-white border border-brand-warm-stone/60 space-y-2 shadow-soft hover:border-brand-terracotta/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-brand-terracotta flex items-center gap-1">
                          <Smartphone size={11} />
                          <span>ACTIVE WATCH MET</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                          ₹56,499
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-brand-ink text-sm">
                        Pixel 11 Compact Flagship
                      </h4>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        6.2-inch screen under your ₹60k target. Clean OS, single-hand comfort.
                      </p>
                      <div className="text-[10px] text-brand-deep-green font-semibold flex items-center gap-1">
                        <CheckCircle size={12} className="text-emerald-600" />
                        <span>Satisfies screen &lt; 6.3&quot; rule</span>
                      </div>
                    </div>

                    {/* Taste Match */}
                    <div className="p-4 rounded-2xl bg-white border border-brand-warm-stone/60 space-y-2 shadow-soft hover:border-brand-terracotta/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-brand-terracotta flex items-center gap-1">
                          <Coffee size={11} />
                          <span>PROACTIVE GEM</span>
                        </span>
                        <span className="text-[10px] font-mono text-brand-ink-light font-bold bg-brand-ivory px-1.5 py-0.5 rounded">
                          40kg Lot
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-brand-ink text-sm">
                        Araku Anaerobic Jasmine Lot
                      </h4>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        Roasted 48h ago in Indiranagar. Floral jasmine & stone-peach notes.
                      </p>
                      <div className="text-[10px] text-brand-deep-green font-semibold flex items-center gap-1">
                        <CheckCircle size={12} className="text-emerald-600" />
                        <span>Matches exact pour-over palate</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
