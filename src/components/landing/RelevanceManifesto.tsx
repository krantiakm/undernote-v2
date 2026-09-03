'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VolumeX, Sparkles, ShieldCheck, Check, X, PhoneCall, BellRing, Compass } from 'lucide-react';

export const RelevanceManifesto: React.FC = () => {
  return (
    <section id="relevance" className="py-24 sm:py-32 bg-brand-deep-green text-brand-ivory relative overflow-hidden">
      {/* Subtle Background Radial Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C66E45_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-terracotta/20 border border-brand-terracotta/40 text-[11px] font-bold uppercase tracking-wider text-brand-terracotta-light">
            <Sparkles size={12} />
            <span>The Relevance Manifesto</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            Commercial discovery isn't broken.{' '}
            <span className="italic text-brand-terracotta-light">
              Irrelevant timing is.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-sage-light leading-relaxed">
            We don't dislike hearing about great products. We dislike hearing about things we never asked for, from people who know nothing about our lives.
          </p>
        </div>

        {/* The Real Estate Call Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* 1. Irrelevant Spam */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-deep-green-dark/80 rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                  <PhoneCall size={16} />
                  <span>The Real Estate Cold Call Problem</span>
                </div>
                <span className="text-[10px] font-mono text-white/50 px-2 py-0.5 rounded bg-white/5">
                  Broadcast Spam
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                "Hi, are you looking to buy a luxury villa in a distant suburb?"
              </h3>

              <p className="text-xs sm:text-sm text-brand-sage-light leading-relaxed">
                You get interrupted during dinner. You consider it spam not because villas are evil, but because you are <strong>not in the market</strong>, it fits none of your commute rules, and the seller knows zero context about you.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-red-300">
                <X size={14} className="shrink-0 text-red-400" />
                <span>Zero context awareness</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-red-300">
                <X size={14} className="shrink-0 text-red-400" />
                <span>Wrong timing & intrusive broadcast</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Undernote Relevant Match */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-brand-terracotta/40 space-y-5 flex flex-col justify-between relative shadow-elevated"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-terracotta-light">
                  <Sparkles size={16} />
                  <span>The Undernote Relevance Standard</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-900/40">
                  100% Context Fit
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ivory leading-snug">
                "Direct BLR flight to Colombo just dropped to ₹14,200 for your Dec 20–27 window."
              </h3>

              <p className="text-xs sm:text-sm text-brand-ivory/90 leading-relaxed">
                When you <em>are</em> actively planning a December family getaway, a verified non-stop flight that satisfies your child-transit rule and hits your target price doesn't feel like an ad. <strong>It feels like effortless serendipity.</strong>
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                <Check size={14} className="shrink-0 text-emerald-400" />
                <span>Exact match with Persistent Bedrock + Active Intents</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                <Check size={14} className="shrink-0 text-emerald-400" />
                <span>Proactive silence when conditions aren't met</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Proactive Silence Banner */}
        <div className="bg-brand-deep-green-dark/60 rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-terracotta/20 text-brand-terracotta-light flex items-center justify-center shrink-0">
              <VolumeX size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                Our Core Rule: Proactive Silence Over Noisy Spam
              </h4>
              <p className="text-xs sm:text-sm text-brand-sage-light max-w-xl leading-relaxed">
                Undernote only surfaces 3 to 8 high-confidence opportunities at any time. If no real-world deal or harvest meets 100% of your constraints, the radar stays silent. Silence is respect.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="text-center px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-2xl font-serif font-bold text-brand-terracotta-light">3–8</span>
              <span className="text-[10px] text-brand-sage-light uppercase tracking-wider">Curated Finds Max</span>
            </div>
            <div className="text-center px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-2xl font-serif font-bold text-emerald-400">100%</span>
              <span className="text-[10px] text-brand-sage-light uppercase tracking-wider">Constraint Match</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
