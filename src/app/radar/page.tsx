'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { EventFilterStrip } from '@/components/events/EventFilterStrip';
import { FeaturedEventCard } from '@/components/events/FeaturedEventCard';
import { EditorialEventRowCard } from '@/components/events/EditorialEventRowCard';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { scoreEventsAgainstContext } from '@/lib/contextScoring';
import {
  IconArrowRight,
  IconChevronDown,
  IconSliders,
} from '@/components/ui/BrandIcons';
import { useApp } from '@/context/AppContext';

export default function ForYouEventsPage() {
  const router = useRouter();
  const {
    isHydrated,
    onboardingStatus,
    cards,
    contextItems,
    geography,
    timeFilter,
    categoryFilter,
    setTimeFilter,
    setCategoryFilter,
    isMorphing,
    hasPersonalized,
  } = useApp();

  const [showMoreOpen, setShowMoreOpen] = useState(false);

  // Route brand-new first-time visitors into the Visual Onboarding Deck
  useEffect(() => {
    if (isHydrated && onboardingStatus === 'unseen') {
      router.replace('/onboarding');
    }
  }, [isHydrated, onboardingStatus, router]);

  const cityName = geography === 'singapore-sin' ? 'Singapore' : 'Bangalore';
  const isTuned = onboardingStatus === 'tuned' || hasPersonalized;

  const { topMatches, moreMatches } = scoreEventsAgainstContext(
    cards,
    contextItems,
    isTuned
  );

  // Filters apply ONLY inside the intentionally expanded "See More" drawer (or all items if expanded)
  const filteredMoreMatches = moreMatches.filter(({ card }) => {
    if (timeFilter !== 'all' && card.eventMeta?.timeWindow !== timeFilter) return false;
    if (categoryFilter !== 'all' && card.eventMeta?.category !== categoryFilter) return false;
    return true;
  });

  if (!isHydrated || onboardingStatus === 'unseen') {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center bg-brand-ivory">
          <div className="w-7 h-7 rounded-full border-2 border-brand-warm-stone border-t-brand-terracotta animate-spin" />
        </div>
      </AppShell>
    );
  }

  const leadMatch = topMatches[0];
  const restTopMatches = topMatches.slice(1);

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        {/* 1. Sticky Top Header */}
        <TopHeader />

        {/* 2. Proof-of-Context Header OR Explicit Skipped Generic Notice */}
        <section className="relative px-5 pt-5 pb-3.5 overflow-hidden">
          <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.42} />

          <div className="relative z-10 space-y-2">
            {isTuned ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
                    Personal Context at Work · {cityName}
                  </p>
                  <Link
                    href="/me"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-deep-green hover:text-brand-terracotta"
                  >
                    <IconSliders size={12.5} />
                    <span>Edit vault</span>
                  </Link>
                </div>

                <h1 className="font-serif text-[23px] leading-[1.22] font-medium tracking-[-0.01em] text-brand-ink">
                  Out of 200+ happenings this week, {topMatches.length} cleared your bar.
                </h1>
                <p className="text-[12.5px] text-brand-ink-light leading-relaxed">
                  Events is one example of your Personal Context filtering out the noise—ranked by how closely each gathering fits your life.
                </p>
                <div className="pt-0.5">
                  <span className="brand-rule" />
                </div>
              </>
            ) : (
              <>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-ink-light">
                  {cityName} · Untuned City Feed
                </p>
                <h1 className="font-serif text-[23px] leading-[1.22] font-medium text-brand-ink">
                  Happenings in {cityName}.
                </h1>

                {/* Explicit Skipped Onboarding Callout */}
                <div className="mt-2 rounded-[20px] bg-[#F6E8E1] border border-brand-terracotta/35 p-4 space-y-2.5">
                  <p className="text-xs font-semibold text-brand-ink leading-snug">
                    You’re seeing a generic feed because Personal Context setup was skipped.
                  </p>
                  <p className="text-[11.5px] text-brand-ink/75 leading-relaxed">
                    Swipe a few visual cards in 30 seconds—or bring your memory from AI—so Undernote filters out what doesn’t fit you.
                  </p>
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-semibold hover:bg-brand-deep-green-dark transition-colors"
                  >
                    <span>Set Up My Personal Context</span>
                    <IconArrowRight size={13.5} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* 3. Primary Matched Feed (Zero Filter Clutter at Top!) */}
        <div className="px-5 pt-1 pb-8 flex-1 space-y-4">
          {isMorphing ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-brand-warm-stone border-t-brand-terracotta animate-spin" />
              <p className="font-serif text-base text-brand-ink">
                Applying your Personal Context…
              </p>
            </div>
          ) : (
            <>
              {/* Lead Best Match */}
              {leadMatch && (
                <FeaturedEventCard
                  card={leadMatch.card}
                  matchPercent={leadMatch.matchPercent}
                  showMatchScore={isTuned}
                />
              )}

              {/* Remaining Top Matches (<=10 total) */}
              {restTopMatches.length > 0 && (
                <div className="space-y-3.5 pt-1">
                  {restTopMatches.map((item, idx) =>
                    idx === 3 ? (
                      <FeaturedEventCard
                        key={item.card.id}
                        card={item.card}
                        matchPercent={item.matchPercent}
                        showMatchScore={isTuned}
                      />
                    ) : (
                      <EditorialEventRowCard
                        key={item.card.id}
                        card={item.card}
                        index={idx}
                        matchPercent={item.matchPercent}
                        showMatchScore={isTuned}
                      />
                    )
                  )}
                </div>
              )}

              {/* ============================================================
                  4. INTENTIONAL "SEE MORE" EXPANSION + DEFERRED FILTERS
                 ============================================================ */}
              {moreMatches.length > 0 && (
                <section className="pt-4 space-y-4">
                  <div className="rounded-[22px] bg-[#F2ECE1] border border-brand-warm-stone/90 p-4 space-y-2.5 text-center">
                    <p className="text-xs font-semibold text-brand-ink">
                      {isTuned
                        ? `${moreMatches.length} more gatherings in ${cityName} scored lower against your context`
                        : `${moreMatches.length} more gatherings in ${cityName}`}
                    </p>
                    <p className="text-[11.5px] text-brand-ink-light leading-relaxed max-w-[300px] mx-auto">
                      {isTuned
                        ? 'These may fall outside your usual atmosphere, finish times, or dietary boundaries—open them only if you want to browse wider.'
                        : 'Expand to browse the rest of this week’s city listings with date and format filters.'}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        const next = !showMoreOpen;
                        setShowMoreOpen(next);
                        if (!next) {
                          setTimeFilter('all');
                          setCategoryFilter('all');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FCFBF8] hover:bg-brand-deep-green hover:text-brand-ivory border border-brand-warm-stone text-xs font-semibold text-brand-ink transition-all cursor-pointer shadow-2xs"
                    >
                      <span>
                        {showMoreOpen
                          ? 'Hide Lower-Relevance Gatherings'
                          : `See More (${moreMatches.length})`}
                      </span>
                      <IconChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          showMoreOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {showMoreOpen && (
                    <div className="space-y-3.5 pt-1">
                      {/* Filters appear ONLY after user intentionally taps See More */}
                      <div className="-mx-5">
                        <EventFilterStrip />
                      </div>

                      {filteredMoreMatches.length > 0 ? (
                        filteredMoreMatches.map((item, idx) => (
                          <EditorialEventRowCard
                            key={item.card.id}
                            card={item.card}
                            index={idx}
                            matchPercent={item.matchPercent}
                            showMatchScore={isTuned}
                          />
                        ))
                      ) : (
                        <div className="rounded-[20px] bg-[#FCFBF8] border border-brand-warm-stone/75 p-6 text-center space-y-2">
                          <p className="text-xs font-semibold text-brand-ink">
                            No lower-tier gatherings in this filter
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setTimeFilter('all');
                              setCategoryFilter('all');
                            }}
                            className="text-[11.5px] text-brand-deep-green underline cursor-pointer"
                          >
                            Reset filters
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
