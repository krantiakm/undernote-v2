'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { useApp } from '@/context/AppContext';
import { getVaultQuickAddChips } from '@/data/onboardingData';
import { resolveAssetUrl } from '@/lib/assets';
import { buildShortTitleFromFreeText, inferSlicesAndDomain } from '@/lib/portraitEngine';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowRight,
  IconCheck,
  IconClose,
  IconMicrophone,
  IconPlus,
  IconShieldPrivacy,
  IconSparkNote,
} from '@/components/ui/BrandIcons';

interface ContextVaultRevealProps {
  cityName: string;
  matchedCount: number;
  onContinueToFeed: () => void;
}

/**
 * Single-Screen (`100dvh`) Visual Vault Reveal
 * Visually introduces the Personal Vault, lets users add extra signals in 1 tap,
 * and keeps the primary "See My Matched Gatherings" CTA pinned above the fold.
 */
export const ContextVaultReveal: React.FC<ContextVaultRevealProps> = ({
  cityName,
  matchedCount,
  onContinueToFeed,
}) => {
  const {
    geography,
    contextItems,
    addContextItem,
    deleteContextItem,
    showToast,
  } = useApp();

  const [extraNote, setExtraNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);

  const quickChips = getVaultQuickAddChips(geography);
  const existingKeys = new Set(contextItems.map((c) => c.key.toLowerCase()));

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = extraNote.trim();
    if (!trimmed) return;
    const isBoundary = /\b(no|never|avoid|skip|strictly|under|before)\b/i.test(trimmed);
    const { primaryDomain } = inferSlicesAndDomain(trimmed);

    addContextItem({
      domain: isBoundary ? 'what-matters' : primaryDomain,
      type: isBoundary ? 'constraint' : 'preference',
      key: buildShortTitleFromFreeText(trimmed),
      value: trimmed,
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 1.0,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: { provider: 'Added in Vault' },
    });
    setExtraNote('');
  };

  const handleVoiceNote = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening — add anything else about you');
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          setExtraNote(text);
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

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between px-4 pt-1.5 pb-4 gap-3 overflow-hidden relative">
      {/* ================================================================
          1. VISUAL PERSONAL VAULT HERO CARD (COMPACT, ZERO WALL OF TEXT)
         ================================================================ */}
      <section className="relative h-[146px] shrink-0 rounded-[24px] overflow-hidden bg-[#161E1C] shadow-card border border-brand-warm-stone/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveAssetUrl('/v2/images/me/me_personal_vault.jpg')}
          alt="Your Personal Vault"
          className="w-full h-full object-cover object-center"
        />

        {/* Guaranteed high-contrast dark gradient scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(11, 17, 15, 0.94) 0%, rgba(11, 17, 15, 0.56) 56%, rgba(11, 17, 15, 0.30) 100%)',
          }}
        />

        <TopographicPattern
          variant="archipelago"
          className="absolute inset-0 w-full h-full"
          strokeColor="#EDE7DC"
          opacity={0.14}
        />

        {/* Top Ownership Badge */}
        <div className="absolute top-3 inset-x-3.5 flex items-center justify-between gap-2">
          <span
            style={{ backgroundColor: 'rgba(16, 24, 22, 0.85)' }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white border border-white/20 backdrop-blur-xs"
          >
            <IconShieldPrivacy size={13} accent="#C66E45" />
            <span>Your Personal Vault</span>
          </span>

          <span
            style={{ backgroundColor: 'rgba(36, 72, 63, 0.90)' }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Private to you</span>
          </span>
        </div>

        {/* Concise Bottom Headline */}
        <div className="absolute bottom-3.5 inset-x-4 space-y-0.5">
          <h1 className="font-serif text-[21px] leading-[1.15] font-medium text-white">
            Your context is ready.
          </h1>
          <p className="text-[11.5px] leading-snug" style={{ color: '#E6E0D4' }}>
            Stored for you—edit, export, or delete anytime in <strong>Me</strong>.
          </p>
        </div>
      </section>

      {/* ================================================================
          2. SAVED SIGNALS AS SCANNABLE VISUAL CHIPS (SCROLLS INTERNALLY IF MANY)
         ================================================================ */}
      <section className="flex-1 min-h-0 flex flex-col rounded-[22px] bg-[#FCFBF8] border border-brand-warm-stone/80 p-3.5 gap-2.5 overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-brand-ink-light">
            Saved in Your Vault ({contextItems.length})
          </span>
          <Link
            href="/import?returnTo=vault"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-deep-green hover:text-brand-terracotta"
          >
            <IconSparkNote size={12} />
            <span>Bring more from AI</span>
          </Link>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none content-start flex flex-wrap gap-1.5 pr-0.5">
          {contextItems.length === 0 ? (
            <p className="text-xs text-brand-ink-light py-2">
              Add a quick preference below to seed your vault.
            </p>
          ) : (
            contextItems.map((item) => {
              const isBoundary = item.type === 'constraint' || item.type === 'dislike';
              return (
                <span
                  key={item.id}
                  className={`inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1.5 rounded-full text-[11.5px] font-semibold border transition-all max-w-full ${
                    isBoundary
                      ? 'bg-[#F6E8E1] text-[#8E4322] border-brand-terracotta/30'
                      : 'bg-[#E8F0EC] text-brand-deep-green border-brand-deep-green/20'
                  }`}
                >
                  {isBoundary ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
                  ) : (
                    <IconCheck size={11} className="shrink-0" />
                  )}
                  <span className="truncate">{item.key}</span>
                  <button
                    type="button"
                    onClick={() => deleteContextItem(item.id)}
                    aria-label={`Remove ${item.key}`}
                    className="w-4 h-4 rounded-full hover:bg-black/10 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <IconClose size={10} />
                  </button>
                </span>
              );
            })
          )}
        </div>

        {/* Compact 1-Line Add More Input + Quick Suggestion Chips */}
        <div className="pt-2 border-t border-brand-warm-stone/60 space-y-2 shrink-0">
          <form onSubmit={handleAddNote} className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={extraNote}
                onChange={(e) => setExtraNote(e.target.value)}
                placeholder={`Add ${cityName} area, diet, travel, or vibe…`}
                className="w-full text-xs py-2 pl-3.5 pr-8 rounded-full bg-brand-ivory border border-brand-warm-stone/90 text-brand-ink placeholder:text-brand-ink-light/75 focus:outline-none focus:border-brand-deep-green"
              />
              <button
                type="button"
                onClick={handleVoiceNote}
                aria-label="Speak additional context"
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                  isRecording
                    ? 'bg-brand-terracotta text-white animate-pulse'
                    : 'text-brand-ink-light hover:text-brand-deep-green'
                }`}
              >
                <IconMicrophone size={13.5} />
              </button>
            </div>
            <button
              type="submit"
              disabled={!extraNote.trim()}
              aria-label="Add signal"
              className="h-8 px-3 rounded-full bg-brand-deep-green disabled:opacity-40 text-brand-ivory text-xs font-semibold inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <IconPlus size={12} />
              <span>Add</span>
            </button>
          </form>

          {/* Single-row horizontal quick-add pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickChips
              .filter((chip) => !existingKeys.has(chip.key.toLowerCase()))
              .slice(0, 4)
              .map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() =>
                    addContextItem({
                      domain: chip.type === 'constraint' ? 'what-matters' : 'events',
                      type: chip.type,
                      key: chip.key,
                      value: chip.value,
                      durability: 'durable',
                      horizon: 'persistent_long_term',
                      confidence: 1.0,
                      status: 'active',
                      origin: 'user_edit',
                      explicitness: 'explicit',
                      sensitivity: 'normal',
                      lastConfirmedAt: new Date().toISOString(),
                      provenance: { provider: 'Quick Vault Chip' },
                    })
                  }
                  className="px-2.5 py-1 rounded-full bg-[#F2ECE1] hover:bg-brand-deep-green hover:text-brand-ivory border border-brand-warm-stone text-[10.5px] font-medium text-brand-ink transition-colors shrink-0 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. PINNED PRIMARY CTA (ALWAYS ABOVE THE FOLD IN THUMB REACH!)
         ================================================================ */}
      <div className="shrink-0 space-y-1.5 pt-0.5">
        <p className="text-center text-[11px] font-medium text-brand-ink-light">
          <strong className="text-brand-ink">{matchedCount} of 200+</strong> {cityName} happenings cleared your bar
        </p>

        <button
          type="button"
          onClick={onContinueToFeed}
          className="w-full py-3.5 px-5 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-[13px] font-semibold shadow-card flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>See My {matchedCount} Matched Gatherings</span>
          <IconArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
