'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';
import {
  buildShortTitleFromFreeText,
  deriveVisualPortrait,
  inferSlicesAndDomain,
  PersonaId,
  PersonaProfile,
} from '@/lib/portraitEngine';
import { resolveAssetUrl } from '@/lib/assets';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowLeft,
  IconCheck,
  IconMicrophone,
  IconShare,
  IconSparkNote,
} from '@/components/ui/BrandIcons';

export default function PersonaFullPage() {
  const {
    persona,
    geography,
    contextItems,
    onboardingStatus,
    hasPersonalized,
    addContextItem,
    updateContextItem,
    showToast,
  } = useApp();

  const portrait = deriveVisualPortrait(
    contextItems,
    persona,
    geography,
    onboardingStatus,
    hasPersonalized
  );

  const { primary, secondary, whyMatched, allPersonas } = portrait.personaMatch;

  const [nuanceText, setNuanceText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);
  const [previewPersonaId, setPreviewPersonaId] = useState<PersonaId | null>(null);

  const displayedPersona: PersonaProfile =
    (previewPersonaId && allPersonas.find((p) => p.id === previewPersonaId)) || primary;
  const isPreviewingDifferent = displayedPersona.id !== primary.id;

  const handleToggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening — tell us more about who you are');
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          if (isFinal) {
            setNuanceText((prev) => `${prev ? `${prev} ` : ''}${text}`);
          }
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

  const handleSaveNuance = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nuanceText.trim();
    if (trimmed.length < 4) return;

    const { primaryDomain } = inferSlicesAndDomain(trimmed);
    const isBoundary = /\b(no|never|avoid|skip|strictly|hate|don't)\b/i.test(trimmed);

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
      provenance: { provider: 'Persona Nuance' },
    });

    setNuanceText('');
    setPreviewPersonaId(null);
  };

  const handleAdoptPersona = (target: PersonaProfile) => {
    const existingChoice = contextItems.find(
      (c) => c.provenance?.provider === 'Persona Choice'
    );

    if (existingChoice) {
      updateContextItem(existingChoice.id, {
        domain: target.nudgeRule.domain,
        type: target.nudgeRule.type,
        key: target.nudgeRule.key,
        value: target.nudgeRule.value,
        provenance: {
          provider: 'Persona Choice',
          importId: target.id,
        },
      });
    } else {
      addContextItem({
        domain: target.nudgeRule.domain,
        type: target.nudgeRule.type,
        key: target.nudgeRule.key,
        value: target.nudgeRule.value,
        durability: 'durable',
        horizon: 'persistent_long_term',
        confidence: 1.0,
        status: 'active',
        origin: 'user_edit',
        explicitness: 'explicit',
        sensitivity: 'normal',
        lastConfirmedAt: new Date().toISOString(),
        provenance: {
          provider: 'Persona Choice',
          importId: target.id,
        },
      });
    }
    setPreviewPersonaId(null);
    showToast(`Primary persona set to ${target.name}`);
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory pb-10">
        {/* ================================================================
            1. FULL-BLEED CINEMATIC CHARACTER PORTRAIT HERO
           ================================================================ */}
        <section className="relative w-full min-h-[395px] bg-[#101715] overflow-hidden flex flex-col justify-between">
          <motion.img
            key={displayedPersona.heroImage}
            src={resolveAssetUrl(displayedPersona.heroImage)}
            alt={displayedPersona.name}
            initial={{ scale: 1.04, opacity: 0.85 }}
            animate={{ scale: [1.0, 1.045, 1.0], opacity: 1 }}
            transition={{
              scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.35 },
            }}
            className="absolute inset-0 w-full h-full object-cover object-[center_22%]"
          />

          {/* Rock-solid multi-stop inline RGBA scrim for guaranteed white text contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(10, 15, 14, 0.96) 0%, rgba(10, 15, 14, 0.68) 42%, rgba(10, 15, 14, 0.18) 72%, rgba(10, 15, 14, 0.48) 100%)',
            }}
          />

          {/* Top Navigation Floating Bar */}
          <div className="relative z-10 px-5 pt-4 flex items-center justify-between">
            <Link
              href="/me"
              style={{ backgroundColor: 'rgba(14, 21, 19, 0.85)' }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white border border-white/25 backdrop-blur-md shadow-md hover:bg-black/80 transition-colors"
            >
              <IconArrowLeft size={15} />
              <span>Portrait</span>
            </Link>

            <button
              type="button"
              onClick={() =>
                showToast('Shareable Persona card coming in the next update')
              }
              aria-label="Share Persona"
              style={{ backgroundColor: 'rgba(14, 21, 19, 0.85)' }}
              className="w-9 h-9 rounded-full text-white border border-white/25 backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer"
            >
              <IconShare size={15} />
            </button>
          </div>

          {/* Bottom Persona Title & Trait Chips */}
          <div className="relative z-10 px-5 pb-6 pt-16 space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                style={{ backgroundColor: 'rgba(198, 110, 69, 0.92)' }}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.09em] text-white"
              >
                {isPreviewingDifferent ? 'Previewing Persona' : 'Your Persona'}
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-white/80">
                {displayedPersona.badge}
              </span>
            </div>

            <h1 className="font-serif text-[30px] leading-[1.12] font-medium text-white">
              {displayedPersona.name}
            </h1>

            <p
              className="font-serif text-[14px] leading-snug"
              style={{ color: '#EDE7DC' }}
            >
              {displayedPersona.tagline}
            </p>

            <div className="pt-1 flex flex-wrap gap-1.5">
              {displayedPersona.signatureTraits.map((trait) => (
                <span
                  key={trait}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.14)' }}
                  className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold text-white border border-white/20 backdrop-blur-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            2. EDITORIAL PORTRAIT STORY & HOW IT SHAPES UNDERNOTE
           ================================================================ */}
        <div className="px-5 pt-5 space-y-5">
          {isPreviewingDifferent && (
            <div className="rounded-[22px] bg-[#1B352E] text-white p-4 flex items-center justify-between gap-3 shadow-soft">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">
                  Feels more like you than {primary.name}?
                </p>
                <p className="text-[11px] text-white/75 mt-0.5">
                  Make this your primary lens across Undernote.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleAdoptPersona(displayedPersona)}
                className="px-3.5 py-2 rounded-full bg-brand-terracotta hover:bg-[#B55E37] text-white text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
              >
                Set as Mine
              </button>
            </div>
          )}

          <section className="editorial-surface rounded-[24px] p-5 space-y-4">
            <div className="space-y-2">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta block">
                {persona.userName || 'Kranti'} · In Light of This Persona
              </span>
              <p className="font-serif text-[14.5px] text-brand-ink leading-[1.62]">
                {displayedPersona.portraitEssay}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F2ECE1] border border-brand-warm-stone/80 p-3.5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-brand-deep-green block">
                How Undernote Uses This
              </span>
              <p className="text-xs text-brand-ink/85 leading-relaxed">
                {displayedPersona.howUndernoteTunes}
              </p>
            </div>

            {!isPreviewingDifferent && (
              <div className="pt-1 flex items-center justify-between text-xs text-brand-ink-light border-t border-brand-warm-stone/55">
                <span>Secondary streak in your vault:</span>
                <button
                  type="button"
                  onClick={() => setPreviewPersonaId(secondary.id)}
                  className="font-semibold text-brand-deep-green hover:text-brand-terracotta cursor-pointer"
                >
                  {secondary.name} →
                </button>
              </div>
            )}
          </section>

          {/* ================================================================
              3. WHY WE MATCHED YOU HERE (EXACT VAULT SIGNALS)
             ================================================================ */}
          {!isPreviewingDifferent && (
            <section className="editorial-surface rounded-[24px] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-base font-medium text-brand-ink">
                  Why We See You Here
                </h2>
                <Link
                  href="/me/vault"
                  className="text-[11px] font-semibold text-brand-deep-green hover:text-brand-terracotta"
                >
                  Edit signals →
                </Link>
              </div>

              <div className="space-y-2">
                {whyMatched.map((line, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-2xl bg-brand-ivory border border-brand-warm-stone/70 px-3.5 py-2.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#E7EFEA] text-brand-deep-green flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck size={10} />
                    </span>
                    <p className="text-xs text-brand-ink/85 leading-snug">{line}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================================================================
              4. ADD NUANCE OR TELL US ANOTHER SIDE OF YOU
             ================================================================ */}
          <section className="editorial-surface rounded-[24px] p-5 space-y-3.5">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <IconSparkNote size={15} className="text-brand-terracotta" />
                <h2 className="font-serif text-base font-medium text-brand-ink">
                  Add Another Side of You
                </h2>
              </div>
              <p className="text-xs text-brand-ink-light leading-relaxed">
                No one fits in a single box. Tell us when you break pattern—late-night gigs, travel obsessions, books, or food rules.
              </p>
            </div>

            <form onSubmit={handleSaveNuance} className="space-y-2.5">
              <div className="relative">
                <textarea
                  rows={2}
                  value={nuanceText}
                  onChange={(e) => setNuanceText(e.target.value)}
                  placeholder="e.g., Quiet on weeknights, electric vinyl bars on Saturdays, and boutique stays when traveling…"
                  className="w-full text-xs rounded-2xl bg-brand-ivory border border-brand-warm-stone p-3 pr-11 text-brand-ink focus:outline-none focus:border-brand-deep-green"
                />
                <button
                  type="button"
                  onClick={handleToggleMic}
                  aria-label="Speak note"
                  className={`absolute right-2.5 bottom-2.5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    isRecording
                      ? 'bg-brand-terracotta text-white animate-pulse'
                      : 'bg-[#EFE9DE] text-brand-ink hover:bg-brand-warm-stone'
                  }`}
                >
                  <IconMicrophone size={14} />
                </button>
              </div>

              <button
                type="submit"
                disabled={nuanceText.trim().length < 4}
                className="w-full py-2.5 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark disabled:opacity-45 text-brand-ivory text-xs font-semibold transition-all cursor-pointer"
              >
                Save to My Portrait & Vault
              </button>
            </form>
          </section>

          {/* ================================================================
              5. EXPLORE THE FULL SPECTRUM OF 6 PERSONAS
             ================================================================ */}
          <section className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-base font-medium text-brand-ink">
                Explore All Personas
              </h2>
              <span className="text-[11px] text-brand-ink-light">
                Tap any to preview
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {allPersonas.map((item) => {
                const isCurrentPrimary = item.id === primary.id;
                const isSelected = item.id === displayedPersona.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPreviewPersonaId(item.id === primary.id ? null : item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative h-[156px] rounded-[22px] overflow-hidden text-left group cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-brand-terracotta shadow-card'
                        : 'border border-brand-warm-stone/60 shadow-xs'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveAssetUrl(item.heroImage)}
                      alt={item.name}
                      className="w-full h-full object-cover object-[center_24%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10, 15, 14, 0.94) 0%, rgba(10, 15, 14, 0.35) 58%, rgba(10, 15, 14, 0.10) 100%)',
                      }}
                    />

                    {isCurrentPrimary && (
                      <span
                        style={{ backgroundColor: 'rgba(36, 72, 63, 0.92)' }}
                        className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white border border-white/25"
                      >
                        You
                      </span>
                    )}

                    <div className="absolute inset-x-3 bottom-3 space-y-0.5">
                      <span className="text-[8.5px] font-bold uppercase tracking-[0.08em] text-[#E68860] block truncate">
                        {item.badge}
                      </span>
                      <p className="font-serif text-[13.5px] font-medium text-white leading-tight">
                        {item.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
