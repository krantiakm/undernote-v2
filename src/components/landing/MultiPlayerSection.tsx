'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, Utensils, Plane, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';

export const MultiPlayerSection: React.FC = () => {
  return (
    <section id="multiplayer" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Users size={13} />
            <span>Collaborative Context Fusion</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Group planning without the{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              50-message group poll.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Planning a trip or dinner shouldn't mean endless compromises. Undernote fuses multiple people's context rules into a shared sweet spot.
          </p>
        </div>

        {/* 3 Collaborative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Group Travel Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-ivory/60 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-6 group hover:shadow-card hover:bg-white transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
                <Plane size={22} className="text-brand-terracotta" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                  Group Travel Radar
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Constraint Overlap Sweet Spot
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                Invite friends with 1 link. Undernote compares everyone's budget, departure airport, and flight non-negotiables to surface destinations that satisfy 100% of the group.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 space-y-2 shadow-inner text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-brand-deep-green">
                <span>4 Friends Joined</span>
                <span className="text-emerald-700">0 Rule Conflicts</span>
              </div>
              <p className="text-[11px] text-brand-ink">
                ✔ BLR & BOM direct flights to Colombo · Beach villa with 4 king suites
              </p>
            </div>
          </motion.div>

          {/* Card 2: Group Dining */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-brand-ivory/60 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-6 group hover:shadow-card hover:bg-white transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
                <Utensils size={22} className="text-brand-terracotta" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                  Table for Four
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Multi-Diet Restaurant Matcher
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                One friend is vegetarian, one avoids gluten, and two want quiet ambient noise for conversation. Undernote surfaces 3 neighborhood tables where everyone eats well.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 space-y-2 shadow-inner text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-brand-deep-green">
                <span>3 Neighborhood Spots</span>
                <span className="text-emerald-700">Low Noise Match</span>
              </div>
              <p className="text-[11px] text-brand-ink">
                ✔ Satisfies gluten-free, vegan & quiet acoustic seating
              </p>
            </div>
          </motion.div>

          {/* Card 3: Gifting Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-brand-ivory/60 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-6 group hover:shadow-card hover:bg-white transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
                <Gift size={22} className="text-brand-terracotta" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta">
                  Zero-Awkwardness Gifting
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-ink">
                  Privacy-Safe Gift Wish Capsules
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                Share a read-only gift radar with loved ones. It displays your favorite roasteries, book genres, and hardware form factors with direct 1-click buy links without spoiling the surprise.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 space-y-2 shadow-inner text-xs">
              <div className="flex items-center justify-between text-[11px] font-semibold text-brand-deep-green">
                <span>Safe Context Scoping</span>
                <span className="text-emerald-700">Zero Spoilers</span>
              </div>
              <p className="text-[11px] text-brand-ink">
                ✔ Curated wishlist of micro-lots, architecture books & prime lenses
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scoped Privacy Footnote */}
        <div className="flex items-center justify-center gap-2 text-xs text-brand-ink-light bg-brand-ivory/80 rounded-2xl p-4 border border-brand-warm-stone/60 max-w-xl mx-auto text-center">
          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span>Multi-player context is strictly scoped: dining fusion only reads food & location; personal health or finances are cryptographically excluded.</span>
        </div>
      </div>
    </section>
  );
};
