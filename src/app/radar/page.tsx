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

        {/* 2. Editorial Heading - Consumer-friendly phrasing per feedback */}
        <div className="px-4 pt-3.5 pb-1 space-y-0.5">
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-ink">
            Chosen for you.
          </h1>
          <p className="text-xs text-brand-ink/75 font-sans">
            Matched against your preferences.
          </p>
        </div>

        {/* 3. Collapsible Category Selector (All > expands to the right) */}
        <div className="pt-1">
          <CategoryChips />
        </div>

        {/* 4. For You Discovery Feed */}
        <div className="px-4 pt-1.5 pb-6 flex-1">
          <div className="flex items-center justify-between pb-2.5 px-1">
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
                Applying your preferences and active watches.
              </p>
            </div>
          ) : visibleCards.length > 0 ? (
            /* Cards Feed with Interactive Context Calibration checkpoints */
            <div className="space-y-4">
              {visibleCards.map((card, index) => (
                <React.Fragment key={card.id}>
                  <DiscoveryCard card={card} index={index} />

                  {/* Refinement Checkpoint 1: After 4th card (Dietary baseline: Veg, Non-veg, Vegan, Gluten-free) */}
                  {index === 3 && domainFilter === 'all' && (
                    <InlineContextRefinement
                      id="refine-dietary-baseline"
                      title="What is your dietary preference when dining out?"
                      rationale="Ensures recommendations strictly respect your diet when suggesting places to eat."
                      options={[
                        {
                          label: 'Vegetarian',
                          key: 'Dietary Baseline',
                          value: 'Strictly Vegetarian; requires dedicated meatless kitchens or menus',
                          domain: 'food-drink',
                        },
                        {
                          label: 'Plant-forward / Vegan',
                          key: 'Dietary Baseline',
                          value: 'Plant-forward and 100% vegan friendly with dairy-free options',
                          domain: 'food-drink',
                        },
                        {
                          label: 'Non-vegetarian',
                          key: 'Dietary Baseline',
                          value: 'Omnivore; open to artisan seafood, poultry, and local farm meats',
                          domain: 'food-drink',
                        },
                        {
                          label: 'Gluten-free preference',
                          key: 'Dietary Baseline',
                          value: 'Gluten-free preference; prioritize gluten-aware sourdough and alternative grains',
                          domain: 'food-drink',
                        },
                      ]}
                    />
                  )}

                  {/* Refinement Checkpoint 2: After 7th card (Family Travel Transit preference) */}
                  {index === 6 && domainFilter === 'all' && (
                    <InlineContextRefinement
                      id="refine-travel-mode"
                      title="When a weekend opens up, how do you prefer to travel?"
                      rationale="Refines regional flight alerts, scenic train routes, and weekend escape windows."
                      options={[
                        {
                          label: 'Direct flights only (no layovers)',
                          key: 'Transit Preference',
                          value: 'Strictly direct non-stop flights under 3.5 hours; discard connecting flights',
                          domain: 'travel',
                        },
                        {
                          label: 'Scenic overland train or drive',
                          key: 'Transit Preference',
                          value: 'Prefers overland journeys by scenic train or road trip within 4 hours',
                          domain: 'travel',
                        },
                        {
                          label: 'Stay local in the city',
                          key: 'Transit Preference',
                          value: 'Favors staycations and urban cultural anchors over long transit',
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
