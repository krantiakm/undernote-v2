'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { CategoryChips } from '@/components/radar/CategoryChips';
import { DiscoveryCard } from '@/components/radar/DiscoveryCard';
import { useApp } from '@/context/AppContext';
import { Sparkles, Inbox } from 'lucide-react';

export default function ForYouPage() {
  const {
    cards,
    domainFilter,
    isMorphing,
  } = useApp();

  // Apply domain filter and active cards
  const visibleCards = cards.filter((card) => {
    if (card.status === 'dismissed') return false;
    if (domainFilter !== 'all' && card.domain !== domainFilter) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        {/* 1. Top Header */}
        <TopHeader />

        {/* 2. Category Selector */}
        <div className="pt-2">
          <CategoryChips />
        </div>

        {/* 3. For You Discovery Feed */}
        <div className="px-4 pt-2.5 pb-6 flex-1">
          <div className="flex items-center justify-between pb-3 px-1">
            <span className="text-xs font-semibold text-brand-ink flex items-center gap-1.5 font-serif">
              <Sparkles size={13} className="text-brand-terracotta" />
              <span>For You</span>
            </span>

            <span className="text-[10px] text-brand-ink/55 font-mono">
              {visibleCards.length} recommendations
            </span>
          </div>

          {/* Morphing Loading State */}
          {isMorphing ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-3 border-brand-terracotta/20 border-t-brand-terracotta animate-spin" />
                <Sparkles size={18} className="absolute inset-0 m-auto text-brand-deep-green" />
              </div>
              <p className="font-serif text-sm font-bold text-brand-deep-green">
                Tuning your feed...
              </p>
              <p className="text-xs text-brand-ink/65 max-w-xs">
                Applying your enduring preferences and active watches.
              </p>
            </div>
          ) : visibleCards.length > 0 ? (
            /* Cards Feed */
            <AnimatePresence mode="popLayout">
              {visibleCards.map((card, index) => (
                <DiscoveryCard key={card.id} card={card} index={index} />
              ))}
            </AnimatePresence>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-8 text-center border border-brand-warm-stone/60 shadow-soft my-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-ivory flex items-center justify-center mx-auto text-brand-ink/60">
                <Inbox size={22} />
              </div>
              <h4 className="font-serif text-base font-bold text-brand-ink">
                Quiet in this category
              </h4>
              <p className="text-xs text-brand-ink/70 max-w-xs mx-auto leading-relaxed">
                No opportunities currently satisfy 100% of your constraints. Undernote favors silence over noisy, low-confidence spam.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
