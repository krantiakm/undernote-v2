'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { useApp } from '@/context/AppContext';
import { getVaultQuickAddChips } from '@/data/onboardingData';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowRight,
  IconCheck,
  IconClose,
  IconMicrophone,
  IconShieldPrivacy,
  IconSparkNote,
} from '@/components/ui/BrandIcons';

interface ContextVaultRevealProps {
  cityName: string;
  matchedCount: number;
  onContinueToFeed: () => void;
}

/**
 * The "Context Mirror" Vault Page
 * Introduces the Personal Context Vault as a portable, user-owned product in its own right,
 * lets the user enrich it further on the spot, and bridges cleanly into Events as Proof #1.
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
    if (!extraNote.trim()) return;
    const isBoundary = /no |never|avoid|skip|strictly|under |before /i.test(extraNote);
    addContextItem({
      domain: isBoundary ? 'what-matters' : 'events',
      type: isBoundary ? 'constraint' : 'preference',
      key: isBoundary ? 'Added Boundary' : 'Added Preference',
      value: extraNote.trim(),
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
      showToast('Listening — add anything else about your preferences');
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
    <div className="flex-1 flex flex-col px-5 pt-3 pb-8 space-y-5">
      {/* 1. Sovereign Personal Context Vault Card */}
      <section className="relative overflow-hidden rounded-[26px] bg-brand-deep-green text-brand-ivory p-5 shadow-card space-y-4">
        <TopographicPattern
          className="absolute inset-0 w-full h-full"
          strokeColor="#9DB6A9"
          opacity={0.18}
        />

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-sage-light">
              <IconShieldPrivacy size={14} accent="#C66E45" />
              <span>Your Personal Context Vault</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/12 text-[10px] font-semibold text-brand-ivory">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Yours to control</span>
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="font-serif text-[22px] leading-[1.2] font-medium text-brand-ivory">
              Your context is ready—and it belongs to you.
            </h1>
            <p className="text-xs text-brand-ivory/82 leading-relaxed">
              Undernote stores your preferences for you—never for ad networks—so you can carry them across experiences. You can edit, export, or delete this vault anytime in <strong>Me</strong>.
            </p>
          </div>

          {/* Storage Architecture Strip (Active Cloud + Upcoming Connectors) */}
          <div className="rounded-2xl bg-black/22 border border-white/12 p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-brand-ivory flex items-center gap-1.5">
                <IconCheck size={13} className="text-emerald-400" />
                <span>Undernote Secure Cloud</span>
              </span>
              <span className="text-[10px] text-emerald-300 font-medium">
                Active · Deletable 1-tap
              </span>
            </div>

            <div className="pt-1.5 border-t border-white/10 flex flex-wrap gap-1.5">
              {[
                'On-Device Only · Soon',
                'Google Drive / iCloud · Soon',
                'Use Across Other Apps · Soon',
              ].map((pill) => (
                <span
                  key={pill}
                  className="text-[9.5px] px-2 py-0.5 rounded-full bg-white/8 text-brand-ivory/65 border border-white/10"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Add More Context Right Now (Makes This Step Genuinely Useful) */}
      <section className="editorial-surface rounded-[22px] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta">
            Add More to Your Vault
          </span>
          <Link
            href="/import?returnTo=vault"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-deep-green hover:text-brand-terracotta"
          >
            <IconSparkNote size={12} />
            <span>Import from AI</span>
          </Link>
        </div>

        <form onSubmit={handleAddNote} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={extraNote}
              onChange={(e) => setExtraNote(e.target.value)}
              placeholder={`e.g., Favorite ${cityName} neighborhood, budget, or artist…`}
              className="w-full text-xs py-2.5 pl-3.5 pr-9 rounded-full bg-brand-ivory border border-brand-warm-stone/85 text-brand-ink placeholder:text-brand-ink-light/70 focus:outline-none focus:border-brand-deep-green"
            />
            <button
              type="button"
              onClick={handleVoiceNote}
              aria-label="Speak additional context"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full cursor-pointer ${
                isRecording
                  ? 'bg-brand-terracotta text-white animate-pulse'
                  : 'text-brand-ink-light hover:text-brand-deep-green'
              }`}
            >
              <IconMicrophone size={15} />
            </button>
          </div>
          <button
            type="submit"
            disabled={!extraNote.trim()}
            className="px-4 py-2.5 rounded-full bg-brand-deep-green disabled:opacity-40 text-brand-ivory text-xs font-semibold cursor-pointer"
          >
            Add
          </button>
        </form>

        {/* 1-Tap Local Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5">
          {quickChips
            .filter((chip) => !existingKeys.has(chip.key.toLowerCase()))
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
                className="px-3 py-1 rounded-full bg-[#F2ECE1] hover:bg-brand-deep-green hover:text-brand-ivory border border-brand-warm-stone text-[11px] font-medium text-brand-ink transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
        </div>
      </section>

      {/* 3. Live Signals Currently Inside Their Vault */}
      <section className="space-y-2.5 flex-1">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light">
            In Your Vault ({contextItems.length})
          </span>
          <span className="text-[11px] text-brand-ink-light">Tap × to remove any</span>
        </div>

        <div className="space-y-2">
          {contextItems.map((item) => {
            const isBoundary = item.type === 'constraint' || item.type === 'dislike';
            return (
              <div
                key={item.id}
                className={`rounded-[18px] px-3.5 py-3 border flex items-start justify-between gap-2.5 ${
                  isBoundary
                    ? 'bg-[#F2ECE1] border-brand-warm-stone/90'
                    : 'editorial-surface'
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-ink">
                      {item.key}
                    </span>
                    {isBoundary && (
                      <span className="text-[9.5px] font-semibold uppercase tracking-wider text-brand-terracotta">
                        Boundary
                      </span>
                    )}
                  </div>
                  <p className="text-[11.5px] text-brand-ink/80 leading-snug">
                    {item.value}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteContextItem(item.id)}
                  aria-label={`Remove ${item.key}`}
                  className="p-1 text-brand-ink-light hover:text-brand-terracotta shrink-0 cursor-pointer"
                >
                  <IconClose size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Explicit Bridge CTA to Events (Proof #1) */}
      <div className="pt-2 space-y-2">
        <p className="text-center text-[11.5px] text-brand-ink-light">
          Example #1 of your context at work: <strong className="text-brand-ink">{matchedCount} gatherings</strong> cleared your bar out of 200+ in {cityName}.
        </p>
        <button
          type="button"
          onClick={onContinueToFeed}
          className="w-full py-3.5 px-5 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
        >
          <span>See My {matchedCount} Matched Gatherings</span>
          <IconArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
