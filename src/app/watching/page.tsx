'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import {
  SignatureContourFooter,
  TopographicPattern,
} from '@/components/ui/TopographicPattern';
import { Logo } from '@/components/ui/Logo';
import { useApp } from '@/context/AppContext';
import { downloadEventIcs, resolveAssetUrl } from '@/lib/assets';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowUpRight,
  IconBookmark,
  IconCalendar,
  IconClose,
  IconMicrophone,
  IconPause,
  IconPlay,
  IconPlus,
  IconTrash,
} from '@/components/ui/BrandIcons';

export default function WatchingPage() {
  const {
    watches,
    savedCards,
    saveCard,
    toggleWatchStatus,
    deleteWatch,
    addWatch,
    geography,
    persona,
    showToast,
  } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEntity, setNewEntity] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newCriteria, setNewCriteria] = useState('');
  const [watchKind, setWatchKind] = useState<'venue' | 'artist' | 'series'>('venue');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);

  const cityName = geography === 'singapore-sin' ? 'Singapore' : 'Bangalore';
  const marketWatches = watches.filter((w) => !w.geography || w.geography === geography);

  const handleVoiceWatch = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening — name a venue, artist, or series');
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          setNewEntity(text);
          if (!newCriteria) {
            setNewCriteria(`Alert me when intimate ${cityName} dates open`);
          }
          if (isFinal) setIsRecording(false);
        },
        onError: (err) => {
          setIsRecording(false);
          showToast(err);
        },
        onEnd: () => setIsRecording(false),
      });
      setSpeechSession(session);
    } else {
      speechSession?.stop();
      setIsRecording(false);
    }
  };

  const handleAddWatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntity.trim()) return;

    addWatch({
      geography,
      type: watchKind,
      entity: newEntity.trim(),
      neighborhood: newNeighborhood.trim() || cityName,
      criteria:
        newCriteria.trim() || 'New dates, small-room releases, or waitlist openings',
      currency: persona.currency.includes('SGD') ? 'SGD' : 'INR',
      status: 'active',
      checkCadence: 'Daily morning',
      notificationMode: 'important_only',
    });

    setNewEntity('');
    setNewNeighborhood('');
    setNewCriteria('');
    setIsAddOpen(false);
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        <TopHeader />

        {/* 1. Editorial Header */}
        <section className="relative px-5 pt-5 pb-4 overflow-hidden">
          <TopographicPattern
            variant="ridge"
            className="absolute inset-0 w-full h-full"
            opacity={0.5}
          />
          <div className="relative z-10 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
              Watching · {cityName}
            </p>
            <h1 className="font-serif text-[24px] leading-[1.2] font-medium text-brand-ink">
              You don’t have to keep checking.
            </h1>
            <p className="text-[13px] text-brand-ink-light leading-relaxed">
              Your saved calendar at the top—and quiet watches on the halls, studios, and suppers you care about.
            </p>
            <div className="pt-0.5">
              <span className="brand-rule" />
            </div>
          </div>
        </section>

        <div className="px-5 pb-8 space-y-7 flex-1">
          {/* ================================================================
              SECTION 1: SAVED TO YOUR CALENDAR
             ================================================================ */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light">
                Saved Gatherings ({savedCards.length})
              </span>
              {savedCards.length > 0 && (
                <span className="text-[11px] text-brand-deep-green font-medium">
                  Ready for `.ics` export
                </span>
              )}
            </div>

            {savedCards.length > 0 ? (
              <div className="space-y-2.5">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="editorial-surface rounded-[20px] p-3.5 flex items-center gap-3.5"
                  >
                    <Link
                      href={`/radar/${card.id}`}
                      className="w-16 h-16 rounded-2xl overflow-hidden bg-[#EFE9DE] shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveAssetUrl(card.heroImage)}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand-terracotta block truncate">
                        {card.eventMeta
                          ? `${card.eventMeta.dayLabel} · ${card.eventMeta.timeLabel}`
                          : 'Saved Event'}
                      </span>
                      <Link href={`/radar/${card.id}`} className="block">
                        <h3 className="text-xs font-semibold text-brand-ink truncate hover:text-brand-deep-green">
                          {card.title}
                        </h3>
                      </Link>
                      <p className="text-[11px] text-brand-ink-light truncate">
                        {card.eventMeta
                          ? `${card.eventMeta.venue}, ${card.eventMeta.neighborhood}`
                          : card.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          downloadEventIcs(card);
                          showToast('Calendar invite (.ics) downloaded');
                        }}
                        title="Download .ics calendar invite"
                        className="w-8 h-8 rounded-full bg-[#EFE9DE] hover:bg-brand-deep-green hover:text-brand-ivory text-brand-deep-green flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <IconCalendar size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => saveCard(card.id)}
                        title="Remove from saved"
                        className="w-8 h-8 rounded-full text-brand-terracotta hover:bg-[#EFE9DE] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <IconBookmark size={15} filled />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] border border-dashed border-brand-warm-stone bg-[#FCFBF8]/65 p-5 text-center space-y-1.5">
                <p className="text-xs font-semibold text-brand-ink">
                  Nothing bookmarked yet
                </p>
                <p className="text-[11.5px] text-brand-ink-light leading-relaxed">
                  Tap the bookmark mark on any gathering in{' '}
                  <Link href="/radar" className="text-brand-deep-green underline font-medium">
                    For You
                  </Link>{' '}
                  to keep a shortlist here.
                </p>
              </div>
            )}
          </section>

          {/* ================================================================
              SECTION 2: QUIET VENUE, ARTIST & TICKET WATCHES
              Modeled on Section 6 ("NAVIGATION / NOTIFICATION CARD") of Brand Book
             ================================================================ */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light">
                Active Venue & Series Watches
              </span>
              <button
                type="button"
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-deep-green text-brand-ivory text-[11px] font-semibold hover:bg-brand-deep-green-dark transition-colors cursor-pointer"
              >
                <IconPlus size={12} />
                <span>Add Watch</span>
              </button>
            </div>

            <div className="space-y-3">
              {marketWatches.map((watch) => {
                const latestObs = watch.observations[0];
                const isPaused = watch.status === 'paused';

                return (
                  <article
                    key={watch.id}
                    className={`editorial-surface rounded-[22px] p-4 space-y-3 transition-opacity ${
                      isPaused ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Brand Book Notification Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Logo type="mark" size="sm" clickable={false} />
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-brand-ink-light block leading-none">
                            {watch.neighborhood || cityName}
                          </span>
                          <span className="text-[11px] text-brand-ink-light">
                            {watch.lastChecked}
                          </span>
                        </div>
                      </div>

                      {watch.triggerMet && !isPaused ? (
                        <span className="px-2.5 py-1 rounded-full bg-brand-terracotta/15 text-brand-terracotta text-[10.5px] font-semibold">
                          Seats Open
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#EFE9DE] text-brand-ink-light text-[10.5px] font-medium">
                          {isPaused ? 'Paused' : 'Quietly Watching'}
                        </span>
                      )}
                    </div>

                    {/* Entity & Criteria */}
                    <div className="space-y-1">
                      <h3 className="font-sans text-[15.5px] font-semibold text-brand-ink leading-snug">
                        {watch.entity}
                      </h3>
                      <p className="text-xs text-brand-ink-light leading-relaxed">
                        {watch.criteria}
                      </p>
                    </div>

                    {/* Latest Observation */}
                    {latestObs && (
                      <div className="rounded-2xl bg-[#F2ECE1] px-3.5 py-3 space-y-1 border border-brand-warm-stone/65">
                        <p className="text-xs font-semibold text-brand-deep-green">
                          {latestObs.availability}
                        </p>
                        {latestObs.notes && (
                          <p className="font-serif text-[12px] text-brand-ink/80 leading-relaxed">
                            {latestObs.notes}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Footer: Signature Rule + Open Event / Controls */}
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="brand-rule-sm" />
                        {watch.matchedCardId && (
                          <Link
                            href={`/radar/${watch.matchedCardId}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-deep-green hover:text-brand-terracotta transition-colors"
                          >
                            <span>View gathering</span>
                            <IconArrowUpRight size={13} />
                          </Link>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleWatchStatus(watch.id)}
                          aria-label={isPaused ? 'Resume watch' : 'Pause watch'}
                          className="w-7 h-7 rounded-full hover:bg-[#EFE9DE] text-brand-ink-light hover:text-brand-ink flex items-center justify-center transition-colors cursor-pointer"
                        >
                          {isPaused ? <IconPlay size={13} /> : <IconPause size={13} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteWatch(watch.id)}
                          aria-label="Remove watch"
                          className="w-7 h-7 rounded-full hover:bg-[#EFE9DE] text-brand-ink-light hover:text-brand-terracotta flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <IconTrash size={13.5} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <SignatureContourFooter />

        {/* Add Watch Bottom Sheet */}
        <AnimatePresence>
          {isAddOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setIsAddOpen(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] p-6 space-y-4 border-t border-brand-warm-stone shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    Watch a Venue or Series
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#EFE9DE] flex items-center justify-center text-brand-ink cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>

                <form onSubmit={handleAddWatch} className="space-y-3.5">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'venue', label: 'Venue' },
                      { id: 'artist', label: 'Artist / Ensemble' },
                      { id: 'series', label: 'Format / Supper' },
                    ].map((kind) => (
                      <button
                        key={kind.id}
                        type="button"
                        onClick={() => setWatchKind(kind.id as typeof watchKind)}
                        className={`py-2 px-2.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                          watchKind === kind.id
                            ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green'
                            : 'bg-[#FCFBF8] text-brand-ink border-brand-warm-stone'
                        }`}
                      >
                        {kind.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      What should Undernote watch?
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={newEntity}
                        onChange={(e) => setNewEntity(e.target.value)}
                        placeholder={
                          geography === 'singapore-sin'
                            ? 'e.g., Victoria Concert Hall Chamber Nights'
                            : 'e.g., Jagriti Theatre or BIC Architecture Talks'
                        }
                        className="w-full text-xs py-2.5 pl-3.5 pr-9 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                      />
                      <button
                        type="button"
                        onClick={handleVoiceWatch}
                        aria-label="Dictate watch"
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full cursor-pointer ${
                          isRecording
                            ? 'bg-brand-terracotta text-brand-ivory animate-pulse'
                            : 'text-brand-ink-light hover:text-brand-deep-green'
                        }`}
                      >
                        <IconMicrophone size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Neighborhood (optional)
                    </label>
                    <input
                      type="text"
                      value={newNeighborhood}
                      onChange={(e) => setNewNeighborhood(e.target.value)}
                      placeholder={
                        geography === 'singapore-sin'
                          ? 'e.g., Civic District or Tiong Bahru'
                          : 'e.g., Domlur, Indiranagar, or JP Nagar'
                      }
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Only alert me when…
                    </label>
                    <input
                      type="text"
                      value={newCriteria}
                      onChange={(e) => setNewCriteria(e.target.value)}
                      placeholder="e.g., Unamplified Fri/Sat evenings under 300 seats"
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Start Quiet Watch
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
