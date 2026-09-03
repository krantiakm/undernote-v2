'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { CategoryChips } from '@/components/radar/CategoryChips';
import { DiscoveryCard } from '@/components/radar/DiscoveryCard';
import { InlineContextRefinement } from '@/components/radar/InlineContextRefinement';
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
      <div className="flex-1 flex flex-col bg-[#F7F3EC]">
        {/* 1. Top Header */}
        <TopHeader />

        {/* 2. Editorial Heading */}
        <div className="px-4 pt-3.5 pb-1.5 space-y-1">
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-ink">
            Chosen for you.
          </h1>
          <p className="text-xs text-brand-ink/75 font-sans leading-relaxed">
            Quietly matched against your enduring standards and open horizons.
          </p>
        </div>

        {/* 3. Collapsible Category Selector */}
        <div className="pt-1">
          <CategoryChips />
        </div>

        {/* 4. For You Discovery Feed */}
        <div className="px-4 pt-2 pb-6 flex-1">
          <div className="flex items-center justify-between pb-3 px-1">
            <span className="text-xs font-semibold text-brand-ink flex items-center gap-1.5 font-serif">
              <Sparkles size={13} className="text-brand-terracotta" />
              <span>Recommendations</span>
            </span>

            <span className="text-[10px] text-brand-ink/55 font-mono">
              {visibleCards.length} finds
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
            /* Cards Feed with Interactive Context Calibration checkpoints */
            <div className="space-y-4">
              {visibleCards.map((card, index) => (
                <React.Fragment key={card.id}>
                  <DiscoveryCard card={card} index={index} />

                  {/* Refinement Checkpoint 1: After 4th card (Dining & Ambient Volume) */}
                  {index === 3 && domainFilter === 'all' && (
                    <InlineContextRefinement
                      id="refine-dining-volume"
                      title="What is your volume tolerance when dining out?"
                      rationale="We know you enjoy natural wine bistros, but haven’t captured your acoustic noise preference for dinner."
                      options={[
                        {
                          label: 'Strictly quiet (< 60dB)',
                          key: 'Dining Acoustics',
                          value: 'Strictly quiet & intimate acoustic atmosphere (< 60dB); avoid loud music or echo',
                          domain: 'food-drink',
                        },
                        {
                          label: 'Gentle neighborhood hum',
                          key: 'Dining Acoustics',
                          value: 'Prefers gentle neighborhood conversational hum with warm acoustic finishes',
                          domain: 'food-drink',
                        },
                        {
                          label: 'Lively & energetic',
                          key: 'Dining Acoustics',
                          value: 'Enjoys open energetic room atmosphere with high social presence',
                          domain: 'food-drink',
                        },
                      ]}
                    />
                  )}

                  {/* Refinement Checkpoint 2: After 6th card (Transit & Flight Radius) */}
                  {index === 5 && domainFilter === 'all' && (
                    <InlineContextRefinement
                      id="refine-flight-radius"
                      title="For spontaneous weekend trips, what is your transit limit?"
                      rationale="Helps filter short-hop flights and family weekend escape recommendations."
                      options={[
                        {
                          label: 'Direct flight < 2.5 hours',
                          key: 'Weekend Flight Limit',
                          value: 'Strictly non-stop regional flights under 2.5 hours to avoid family fatigue',
                          domain: 'travel',
                        },
                        {
                          label: 'Up to 4h non-stop',
                          key: 'Weekend Flight Limit',
                          value: 'Direct non-stop flights up to 4 hours with comfortable morning departures',
                          domain: 'travel',
                        },
                        {
                          label: 'Overland driving only',
                          key: 'Weekend Flight Limit',
                          value: 'Prefers overland road trips under 3 hours instead of airport transit',
                          domain: 'travel',
                        },
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-8 text-center border border-brand-warm-stone/60 shadow-soft my-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto text-brand-ink/60 border border-brand-warm-stone/50">
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
