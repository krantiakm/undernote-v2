'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, Utensils, Plane, Sparkles, CheckCircle2, MessageSquareOff, ShieldCheck } from 'lucide-react';

export const MultiPlayerSection: React.FC = () => {
  return (
    <section id="friends" className="py-20 sm:py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Users size={13} />
            <span>Shared Taste & Planning</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Group planning without the{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              50-message debate.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Planning a trip or dinner shouldn&apos;t mean endless compromises. Undernote fuses multiple people&apos;s rules into a shared sweet spot.
          </p>
        </div>

        {/* 3 Rich Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Group Trips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-brand-ivory/50 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-5 hover:bg-white hover:shadow-card transition-all group"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
                <Plane size={22} className="text-brand-terracotta" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                  Group Travel Radar
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  The Group Trip Sweet Spot
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                Planning a trip with 4 friends? Send 1 link. Undernote finds flights and villas where everyone&apos;s departure airports, budgets, and dates align 100%—no endless group chat polls.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 space-y-1.5 shadow-inner text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-brand-deep-green">
                <span>4 Friends Joined</span>
                <span className="text-emerald-700 font-bold">0 Rule Conflicts</span>
              </div>
              <p className="text-[11px] text-brand-ink-light">
                Direct flights from BLR & BOM • 4-bedroom beachfront villa in Galle
              </p>
            </div>
          </motion.div>

          {/* Card 2: Dinner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-brand-ivory/50 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-5 hover:bg-white hover:shadow-card transition-all group"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
                <Utensils size={22} className="text-brand-terracotta" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                  Table for Four
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Dinner Without the Debate
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                One friend is vegan, one is gluten-free, two want a quiet place to talk. Undernote surfaces 3 neighborhood spots where everyone has great options.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 space-y-1.5 shadow-inner text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-brand-deep-green">
                <span>3 Neighborhood Spots</span>
                <span className="text-emerald-700 font-bold">Low Ambient Noise</span>
              </div>
              <p className="text-[11px] text-brand-ink-light">
                Indiranagar & Koramangala • Verified farm-to-table menus
              </p>
            </div>
          </motion.div>

          {/* Card 3: Gifting */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-brand-ivory/50 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-5 hover:bg-white hover:shadow-card transition-all group"
          >
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
                <Gift size={22} className="text-brand-terracotta" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                  Gift Wishlist
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Zero-Awkwardness Gifting
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                Share a privacy-safe wishlist with loved ones. Shows your favorite roasters, book genres, and gear with 1-click buy links—without spoiling the exact surprise.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 space-y-1.5 shadow-inner text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-brand-deep-green">
                <span>Safe Context Scoping</span>
                <span className="text-emerald-700 font-bold">Surprise Preserved</span>
              </div>
              <p className="text-[11px] text-brand-ink-light">
                Micro-lot roasts • Rare architectural books • Compact primes
              </p>
            </div>
          </motion.div>
        </div>

        {/* Privacy Scoping Callout */}
        <div className="flex items-center justify-center gap-2 text-xs text-brand-ink-light bg-brand-ivory/80 rounded-2xl p-4 border border-brand-warm-stone/60 max-w-xl mx-auto text-center">
          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span>Group sharing is strictly scoped: dinner only reads food preferences; personal health or finances are completely excluded.</span>
        </div>
      </div>
    </section>
  );
};
