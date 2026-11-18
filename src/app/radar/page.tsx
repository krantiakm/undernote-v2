'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { EventFilterStrip } from '@/components/events/EventFilterStrip';
import { FeaturedEventCard } from '@/components/events/FeaturedEventCard';
import { EditorialEventRowCard } from '@/components/events/EditorialEventRowCard';
import { TasteCheckInCard } from '@/components/events/TasteCheckInCard';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import {
  IconArrowRight,
  IconCalendar,
  IconSparkNote,
} from '@/components/ui/BrandIcons';
import { useApp } from '@/context/AppContext';

function getEditorialGreeting(): string {
  if (typeof window === 'undefined') return 'Good evening';
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function ForYouEventsPage() {
  const {
    cards,
    geography,
    timeFilter,
    categoryFilter,
    setTimeFilter,
    setCategoryFilter,
    isMorphing,
    hasPersonalized,
    persona,
    calibrationQuestions,
    answerCalibrationQuestion,
  } = useApp();

  const cityName = geography === 'singapore-sin' ? 'Singapore' : 'Bangalore';
  const userName = persona.userName || 'Kranti';

  const visibleCards = cards.filter((card) => {
    if (card.status === 'dismissed') return false;
    if (timeFilter !== 'all' && card.eventMeta?.timeWindow !== timeFilter) return false;
    if (categoryFilter !== 'all' && card.eventMeta?.category !== categoryFilter) return false;
    return true;
  });

  const leadCard = visibleCards[0];
  const remainingCards = visibleCards.slice(1);

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        {/* 1. Sticky Top Header */}
        <TopHeader />

        {/* 2. Warm Brand-Book Editorial Greeting */}
        <section className="relative px-5 pt-5 pb-3 overflow-hidden">
          <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.42} />

          <div className="relative z-10 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
              {cityName} · Cultural Brief
            </p>
            <h1 className="font-serif text-[25px] leading-[1.2] font-medium tracking-[-0.01em] text-brand-ink">
              {getEditorialGreeting()}, {userName}.
            </h1>
            <p className="text-[13px] text-brand-ink-light leading-relaxed max-w-[340px]">
              Here’s what feels worth stepping out for—chosen quietly around your evenings, mornings, and pace.
            </p>
            <div className="pt-0.5">
              <span className="brand-rule" />
            </div>
          </div>
        </section>

        {/* 3. Subtle Personalization Invite (compact, calm, never noisy) */}
        {!hasPersonalized && (
          <div className="px-5 pb-2">
            <Link
              href="/import"
              className="editorial-surface rounded-[20px] px-4 py-3.5 flex items-center justify-between gap-3 group hover:border-brand-terracotta/50 transition-all"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DE] flex items-center justify-center text-brand-deep-green shrink-0 mt-0.5">
                  <IconSparkNote size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-brand-ink">
                    Bring in what your AI already knows
                  </p>
                  <p className="text-[11.5px] text-brand-ink-light leading-snug mt-0.5">
                    Paste from ChatGPT, Claude, or Gemini in 60 seconds to tune every pick.
                  </p>
                </div>
              </div>
              <span className="w-7 h-7 rounded-full bg-brand-deep-green text-brand-ivory flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <IconArrowRight size={14} />
              </span>
            </Link>
          </div>
        )}

        {/* 4. Time Window & Cultural Format Filters */}
        <EventFilterStrip />

        {/* 5. Curated Events Feed */}
        <div className="px-5 pt-2 pb-8 flex-1 space-y-4">
          {isMorphing ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-brand-warm-stone border-t-brand-terracotta animate-spin" />
              <p className="font-serif text-base text-brand-ink">
                Listening to what matters to you…
              </p>
              <p className="text-xs text-brand-ink-light max-w-[240px]">
                Selecting gatherings in {cityName} that fit your pace and boundaries.
              </p>
            </div>
          ) : visibleCards.length > 0 ? (
            <>
              {/* Lead Feature Pick */}
              {leadCard && <FeaturedEventCard card={leadCard} />}

              {/* Section Subheader when multiple items follow */}
              {remainingCards.length > 0 && (
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light">
                    Also Worth Your Time
                  </span>
                  <span className="text-[11px] text-brand-ink-light">
                    {visibleCards.length} {visibleCards.length === 1 ? 'gathering' : 'gatherings'}
                  </span>
                </div>
              )}

              {/* Magazine-paced Feed: Horizontal Editorial Cards + Periodic Feature Card */}
              <div className="space-y-3.5">
                {remainingCards.map((card, idx) => (
                  <React.Fragment key={card.id}>
                    {idx === 3 ? (
                      <FeaturedEventCard card={card} />
                    ) : (
                      <EditorialEventRowCard card={card} index={idx} />
                    )}

                    {/* Gentle Check-In after 2nd row card */}
                    {idx === 1 &&
                      timeFilter === 'all' &&
                      categoryFilter === 'all' &&
                      calibrationQuestions[0] && (
                        <TasteCheckInCard
                          id={calibrationQuestions[0].id}
                          title={calibrationQuestions[0].title}
                          rationale={calibrationQuestions[0].rationale}
                          options={calibrationQuestions[0].options}
                          onAnswer={(opt) =>
                            answerCalibrationQuestion(calibrationQuestions[0].id, opt)
                          }
                        />
                      )}
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            /* Quiet Brand-Faithful Empty State */
            <div className="editorial-surface rounded-[24px] p-8 text-center my-4 space-y-3">
              <div className="w-11 h-11 rounded-full bg-[#EFE9DE] flex items-center justify-center mx-auto text-brand-deep-green">
                <IconCalendar size={20} />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-ink">
                Nothing worth disturbing your quiet here.
              </h3>
              <p className="text-xs text-brand-ink-light max-w-[260px] mx-auto leading-relaxed">
                No {cityName} gatherings match this exact filter right now. We’d rather leave space than show filler.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setTimeFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="px-4 py-2 rounded-full border border-brand-warm-stone text-xs font-medium text-brand-deep-green hover:bg-[#EFE9DE] transition-colors cursor-pointer"
                >
                  Show all upcoming dates
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
