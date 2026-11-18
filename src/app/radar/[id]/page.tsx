'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/shell/AppShell';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { downloadEventIcs, resolveAssetUrl } from '@/lib/assets';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBookmark,
  IconCalendar,
  IconCheck,
  IconClock,
  IconMicrophone,
  IconShare,
  IconSparkNote,
  IconTicket,
  IconTogether,
  IconVenuePin,
} from '@/components/ui/BrandIcons';

interface EventDossierPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDossierPage({ params }: EventDossierPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const cardId = resolvedParams.id;

  const {
    cards,
    saveCard,
    dismissCard,
    refineContextForCard,
    createGroupCapsule,
    persona,
    showToast,
  } = useApp();

  const card = cards.find((c) => c.id === cardId) || cards[0];

  const [refinementInput, setRefinementInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeSpeechSession, setActiveSpeechSession] = useState<{ stop: () => void } | null>(
    null
  );

  if (!card) {
    return (
      <AppShell>
        <div className="p-8 text-center space-y-3">
          <p className="font-serif text-base text-brand-ink">Gathering not found.</p>
          <Link
            href="/radar"
            className="text-xs text-brand-deep-green font-semibold inline-flex items-center gap-1.5"
          >
            <IconArrowLeft size={14} />
            <span>Back to For You</span>
          </Link>
        </div>
      </AppShell>
    );
  }

  const isSaved = card.status === 'saved';
  const meta = card.eventMeta;
  const priceText = meta?.priceLabel || card.sourceEvidence?.[0]?.price || 'Open Admission';

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://undernote.co';
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: `${card.title} — ${meta ? `${meta.dayLabel}, ${meta.venue}` : ''}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Event link copied');
      }
    } catch {
      // User cancelled share sheet
    }
  };

  const handleAddCalendar = () => {
    downloadEventIcs(card);
    showToast('Calendar invite (.ics) downloaded');
  };

  const handlePlanTogether = () => {
    const userInitial = (persona.monogram || persona.userName || 'K').charAt(0).toUpperCase();
    createGroupCapsule({
      type: 'evening',
      whenLabel: meta?.dayLabel || 'Upcoming Outing',
      title: card.title,
      hostUserId: 'user-host',
      scopedDomains: ['events'],
      members: [
        {
          userId: 'user-host',
          name: persona.userName || 'You',
          avatar: userInitial,
          isPcpUser: true,
          contributedRuleIds: [],
          tasteSummary: 'Quiet seating · Vegetarian friendly',
          status: 'joined',
        },
      ],
      overlapHighlights: [
        meta ? `${meta.venue}, ${meta.neighborhood} · ${meta.timeLabel}` : card.subtitle || '',
        meta?.settingNote || 'Intimate cultural setting',
      ].filter(Boolean),
      fusedOpportunities: [card],
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    });
    router.push('/capsules');
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementInput.trim()) return;
    refineContextForCard(card.id, refinementInput, 'events');
    setRefinementInput('');
  };

  const handleVoiceRefine = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening — tell Undernote how this lands');
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          setRefinementInput(text);
          if (isFinal) {
            setIsRecording(false);
          }
        },
        onError: (err) => {
          setIsRecording(false);
          showToast(err);
        },
        onEnd: () => {
          setIsRecording(false);
        },
      });
      setActiveSpeechSession(session);
    } else {
      activeSpeechSession?.stop();
      setIsRecording(false);
    }
  };

  return (
    <AppShell showNav={false}>
      <div className="flex-1 flex flex-col bg-brand-ivory pb-28">
        {/* 1. Gallery Hero Photograph + Frosted Controls */}
        <div className="relative w-full aspect-[4/3] bg-[#EFE9DE] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveAssetUrl(card.heroImage)}
            alt={card.imageAlt || card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="w-9 h-9 rounded-full bg-[#FAF7F2]/92 backdrop-blur-md text-brand-ink flex items-center justify-center shadow-sm border border-brand-warm-stone/60 hover:bg-brand-ivory transition-all cursor-pointer"
            >
              <IconArrowLeft size={17} />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share gathering"
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/92 backdrop-blur-md text-brand-ink flex items-center justify-center shadow-sm border border-brand-warm-stone/60 hover:bg-brand-ivory transition-all cursor-pointer"
              >
                <IconShare size={16} />
              </button>

              <button
                type="button"
                onClick={() => saveCard(card.id)}
                aria-label={isSaved ? 'Remove from saved' : 'Save gathering'}
                className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-brand-ivory text-brand-terracotta border-brand-terracotta/45'
                    : 'bg-[#FAF7F2]/92 text-brand-ink border-brand-warm-stone/60 hover:bg-brand-ivory'
                }`}
              >
                <IconBookmark size={16} filled={isSaved} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Editorial Dossier Body */}
        <div className="px-5 pt-5 space-y-6">
          {/* Title & Eyebrow */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
                {meta
                  ? `${meta.categoryLabel} · ${meta.neighborhood}`
                  : card.entityType || 'Curated Gathering'}
              </span>
              {card.originType === 'requested' && (
                <span className="text-[10.5px] font-semibold text-brand-deep-green bg-brand-sage-subtle px-2.5 py-0.5 rounded-full">
                  Matched Watch
                </span>
              )}
            </div>

            <h1 className="font-sans text-[23px] leading-[1.2] font-semibold tracking-[-0.015em] text-brand-ink">
              {card.title}
            </h1>

            <p className="font-serif text-[14px] text-brand-ink/80 leading-[1.62]">
              {card.summary}
            </p>

            <div className="pt-0.5">
              <span className="brand-rule" />
            </div>
          </div>

          {/* 3. Structured 2x2 Event Logistics Grid */}
          {meta && (
            <div className="grid grid-cols-2 gap-2.5">
              <div className="editorial-surface rounded-[18px] p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-brand-ink-light">
                  <IconCalendar size={14} className="text-brand-deep-green" />
                  <span>When</span>
                </div>
                <p className="text-xs font-semibold text-brand-ink leading-snug">
                  {meta.dayLabel}
                </p>
                <p className="text-[11px] text-brand-ink-light">{meta.timeLabel}</p>
              </div>

              <div className="editorial-surface rounded-[18px] p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-brand-ink-light">
                  <IconVenuePin size={14} className="text-brand-deep-green" />
                  <span>Where</span>
                </div>
                <p className="text-xs font-semibold text-brand-ink leading-snug line-clamp-1">
                  {meta.venue}
                </p>
                <p className="text-[11px] text-brand-ink-light">
                  {meta.neighborhood}, {meta.cityLabel}
                </p>
              </div>

              <div className="editorial-surface rounded-[18px] p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-brand-ink-light">
                  <IconClock size={14} className="text-brand-deep-green" />
                  <span>Atmosphere</span>
                </div>
                <p className="text-xs font-semibold text-brand-ink leading-snug">
                  {meta.settingNote}
                </p>
              </div>

              <div className="editorial-surface rounded-[18px] p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-brand-ink-light">
                  <IconTicket size={14} className="text-brand-deep-green" />
                  <span>Admission</span>
                </div>
                <p className="text-xs font-semibold text-brand-ink leading-snug">
                  {meta.priceLabel}
                </p>
                {meta.availabilityLabel && (
                  <p className="text-[11px] text-brand-terracotta font-medium">
                    {meta.availabilityLabel}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 4. Quick Secondary Utility Actions: Calendar + Plan Together */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleAddCalendar}
              className="py-2.5 px-3.5 rounded-full bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-xs font-semibold text-brand-ink flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <IconCalendar size={15} className="text-brand-deep-green" />
              <span>Add to Calendar</span>
            </button>

            <button
              type="button"
              onClick={handlePlanTogether}
              className="py-2.5 px-3.5 rounded-full bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-xs font-semibold text-brand-ink flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <IconTogether size={15} className="text-brand-deep-green" />
              <span>Plan Together</span>
            </button>
          </div>

          {/* 5. Warm "Why We Think You'll Love This" Card */}
          <div className="relative overflow-hidden rounded-[22px] bg-[#F2ECE1] border border-brand-warm-stone/85 p-5 space-y-3">
            <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.48} />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
                <IconSparkNote size={14} className="text-brand-deep-green" />
                <span>Why This Fits Your World</span>
              </div>

              <ul className="space-y-2">
                {card.relevanceReason.map((reason, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-[12.5px] text-brand-ink/85 leading-relaxed"
                  >
                    <span className="w-4 h-4 rounded-full bg-brand-deep-green/12 text-brand-deep-green flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck size={11} />
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Editorial Context & Practical Notes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-ink-light">
                About the Evening
              </h2>
              <p className="font-serif text-[13.5px] text-brand-ink/85 leading-[1.68]">
                {card.deepDive.description}
              </p>
            </div>

            {card.deepDive.keyHighlights.length > 0 && (
              <div className="editorial-surface rounded-[20px] p-4 space-y-2.5">
                <h3 className="text-xs font-semibold text-brand-ink">Good to know before going</h3>
                <ul className="space-y-2">
                  {card.deepDive.keyHighlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-brand-ink-muted leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tabular Practical Details */}
            {card.deepDive.specsOrDetails.length > 0 && (
              <div className="divide-y divide-brand-warm-stone/55 border-y border-brand-warm-stone/55">
                {card.deepDive.specsOrDetails.map((spec, idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex items-baseline justify-between gap-4 text-xs"
                  >
                    <span className="text-brand-ink-light shrink-0">{spec.label}</span>
                    <span className="font-medium text-brand-ink text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Gentle Feedback & Taste Tuning */}
          <div className="editorial-surface rounded-[22px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-ink">
                Tune future picks from here
              </span>
              <button
                type="button"
                onClick={() => {
                  dismissCard(card.id);
                  router.push('/radar');
                }}
                className="text-[11px] text-brand-ink-light hover:text-brand-terracotta transition-colors cursor-pointer"
              >
                Not for me
              </button>
            </div>

            <form onSubmit={handleRefineSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={refinementInput}
                  onChange={(e) => setRefinementInput(e.target.value)}
                  placeholder="e.g., Prefer Saturday mornings or closer to Indiranagar…"
                  className="w-full text-xs py-2.5 pl-3.5 pr-9 rounded-full bg-brand-ivory border border-brand-warm-stone/80 text-brand-ink placeholder:text-brand-ink-light/70 focus:outline-none focus:border-brand-deep-green"
                />
                <button
                  type="button"
                  onClick={handleVoiceRefine}
                  aria-label="Speak a note"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors cursor-pointer ${
                    isRecording
                      ? 'bg-brand-terracotta text-brand-ivory animate-pulse'
                      : 'text-brand-ink-light hover:text-brand-deep-green'
                  }`}
                >
                  <IconMicrophone size={15} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!refinementInput.trim()}
                className="px-4 py-2.5 rounded-full bg-brand-deep-green disabled:opacity-40 text-brand-ivory text-xs font-semibold transition-all cursor-pointer"
              >
                Save
              </button>
            </form>
          </div>
        </div>

        {/* 8. Sticky Bottom Primary Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto bg-[#FAF7F2]/96 backdrop-blur-md border-t border-brand-warm-stone/70 px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-sm font-semibold text-brand-ink block leading-tight">
              {priceText}
            </span>
            <span className="text-[11px] text-brand-ink-light truncate block">
              {meta?.doorsNote || 'Direct venue link · Zero booking markup'}
            </span>
          </div>

          <a
            href={card.deepDive.directActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm transition-all active:scale-[0.98] shrink-0"
          >
            <span>{card.deepDive.directActionLabel}</span>
            <IconArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </AppShell>
  );
}
