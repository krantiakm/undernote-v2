'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { StoryTray } from '@/components/radar/StoryTray';
import { StoryModal } from '@/components/radar/StoryModal';
import { IngestionHero } from '@/components/radar/IngestionHero';
import { IngestionModal } from '@/components/radar/IngestionModal';
import { OriginFilterBar } from '@/components/radar/OriginFilterBar';
import { CategoryChips } from '@/components/radar/CategoryChips';
import { DiscoveryCard } from '@/components/radar/DiscoveryCard';
import { useApp } from '@/context/AppContext';
import { Sparkles, Inbox } from 'lucide-react';

export default function HomeFeedPage() {
  const {
    cards,
    originFilter,
    domainFilter,
    isMorphing,
    persona,
  } = useApp();

  const [isIngestionModalOpen, setIsIngestionModalOpen] = useState(false);

  // Apply filters
  const visibleCards = cards.filter((card) => {
    if (card.status === 'dismissed') return false;
    if (originFilter !== 'all' && card.originType !== originFilter) return false;
    if (domainFilter !== 'all' && card.domain !== domainFilter) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        {/* 1. Top Header with Geography 1-tap switcher */}
        <TopHeader onOpenIngestion={() => setIsIngestionModalOpen(true)} />

        {/* 2. Daily Pulse Story Highlights Tray */}
        <StoryTray />

        {/* 3. Streamlined Ingestion Action Pill */}
        <IngestionHero onOpenModal={() => setIsIngestionModalOpen(true)} />

        {/* 4. Origin & Category Filters */}
        <div className="space-y-1">
          <OriginFilterBar />
          <CategoryChips />
        </div>

        {/* 5. Opportunity Discovery Feed */}
        <div className="px-4 pt-2 pb-6 flex-1">
          <div className="flex items-center justify-between pb-2 px-1">
            <span className="text-[11px] font-semibold text-brand-ink/70 flex items-center gap-1.5">
              <Sparkles size={12} className="text-brand-terracotta" />
              <span>
                {originFilter === 'proactive'
                  ? `Ambient Bedrock (${persona.locationAnchor})`
                  : originFilter === 'requested'
                  ? 'Matched to Active Watches'
                  : `Proactive Radar · ${persona.locationAnchor}`}
              </span>
            </span>

            <span className="text-[10px] text-brand-ink/60 font-mono">
              {visibleCards.length} high-confidence finds
            </span>
          </div>

          {/* Morphing Loading State Animation */}
          {isMorphing ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-4 border-brand-terracotta/20 border-t-brand-terracotta animate-spin" />
                <Sparkles size={20} className="absolute inset-0 m-auto text-brand-deep-green" />
              </div>
              <p className="font-serif text-sm font-bold text-brand-deep-green">
                Synthesizing Dual Horizon Context Graph...
              </p>
              <p className="text-xs text-brand-ink/60 max-w-xs">
                Calibrating {persona.locationAnchor} departure routes, non-stop rules, and craft constraints.
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
            <div className="bg-white rounded-3xl p-8 text-center border border-brand-warm-stone/60 shadow-xs my-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-ivory flex items-center justify-center mx-auto text-brand-ink/60">
                <Inbox size={22} />
              </div>
              <h4 className="font-serif text-base font-bold text-brand-ink">
                Radar Favoring Silence
              </h4>
              <p className="text-xs text-brand-ink/60 max-w-xs mx-auto leading-relaxed">
                No opportunities currently satisfy 100% of your constraints in this category for {persona.locationAnchor}. Undernote favors silence over noisy, low-confidence spam.
              </p>
            </div>
          )}
        </div>

        {/* Full-Screen Story Viewer Modal */}
        <StoryModal />

        {/* Context Ingestion Modal */}
        <IngestionModal
          isOpen={isIngestionModalOpen}
          onClose={() => setIsIngestionModalOpen(false)}
        />
      </div>
    </AppShell>
  );
}
