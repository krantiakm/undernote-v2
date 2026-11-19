'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  buildShortTitleFromFreeText,
  ContextSlice,
  inferSlicesAndDomain,
  PersonaProfile,
  PortraitBentoItem,
  SliceMeta,
} from '@/lib/portraitEngine';
import { ContextItemData, RadarDomain } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconClock,
  IconClose,
  IconMicrophone,
  IconPlus,
  IconSliders,
  IconSparkNote,
  IconSupperTable,
  IconTogether,
  IconTrash,
  IconVenuePin,
} from '@/components/ui/BrandIcons';

interface PortraitBentoGridProps {
  primaryPersona: PersonaProfile;
  bentoItems: PortraitBentoItem[];
  activeSlices: SliceMeta[];
  unmappedSlices: SliceMeta[];
  onAddFreeformContext: (payload: {
    key: string;
    value: string;
    type: 'preference' | 'constraint';
    domain: RadarDomain;
  }) => void;
  onFlipOrUpdateRule: (
    bento: PortraitBentoItem,
    nextRule: {
      key: string;
      value: string;
      type: 'preference' | 'constraint';
      domain: RadarDomain;
    }
  ) => void;
  onDeleteRule: (id: string) => void;
  onShowToast: (msg: string) => void;
}

const PROMPT_STARTERS: Array<{
  slice: ContextSlice;
  label: string;
  placeholder: string;
}> = [
  {
    slice: 'travel',
    label: 'Travel',
    placeholder:
      'e.g., Love small architectural hotels, scenic train routes, window seats, and walkable neighborhoods—never mega-resorts.',
  },
  {
    slice: 'books',
    label: 'Books & Film',
    placeholder:
      'e.g., Drawn to urban history, speculative fiction, design essays, and restored world cinema.',
  },
  {
    slice: 'dining',
    label: 'Dining',
    placeholder:
      'e.g., Love regional tasting menus, natural wine bars, and pour-over coffee; skip noisy sports bars.',
  },
  {
    slice: 'shopping',
    label: 'Shopping & Craft',
    placeholder:
      'e.g., Appreciate heavyweight linen, handmade stoneware, Japanese stationery, and buy-it-for-life gear.',
  },
  {
    slice: 'events',
    label: 'Nights & Live',
    placeholder:
      'e.g., Count me in for rooftop vinyl sets on Saturdays, or keep weeknights under 250 seats.',
  },
];

export const PortraitBentoGrid: React.FC<PortraitBentoGridProps> = ({
  primaryPersona,
  bentoItems,
  activeSlices,
  unmappedSlices,
  onAddFreeformContext,
  onFlipOrUpdateRule,
  onDeleteRule,
  onShowToast,
}) => {
  const [selectedSlice, setSelectedSlice] = useState<'all' | ContextSlice>('all');
  const [activeBentoModal, setActiveBentoModal] = useState<PortraitBentoItem | null>(null);

  // + Add More Sheet State
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [starterFocus, setStarterFocus] = useState<ContextSlice>('travel');
  const [freeText, setFreeText] = useState('');
  const [entryKind, setEntryKind] = useState<'preference' | 'constraint'>('preference');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);

  const visibleBentos =
    selectedSlice === 'all'
      ? bentoItems
      : bentoItems.filter((item) => item.slices.includes(selectedSlice));

  // Calculate grid occupancy so the final "+ Add More" Bento sits flush with zero awkward gaps
  const occupiedUnits = visibleBentos.reduce((acc, item) => {
    if (selectedSlice !== 'all' && item.span === 'tall') return acc + 1;
    if (item.span === 'wide') return acc + 2;
    if (item.span === 'tall') return acc + 2;
    return acc + 1;
  }, 0);
  const isAddTileWide = occupiedUnits % 2 === 0;

  const openAddSheetWithSlice = (slice?: ContextSlice) => {
    if (slice) setStarterFocus(slice);
    setIsAddSheetOpen(true);
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      onShowToast('Listening — speak naturally about what you love or avoid');
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          if (isFinal) {
            setFreeText((prev) => `${prev ? `${prev} ` : ''}${text}`);
          }
        },
        onError: (err) => {
          setIsRecording(false);
          onShowToast(err);
        },
        onEnd: () => setIsRecording(false),
      });
      setSpeechSession(session);
    } else {
      speechSession?.stop();
      setIsRecording(false);
    }
  };

  const handleCreateCustomBento = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = freeText.trim();
    if (trimmed.length < 4) return;

    const inferred = inferSlicesAndDomain(trimmed);
    const autoBoundary =
      entryKind === 'constraint' ||
      /\b(no|never|avoid|skip|strictly|hate)\b/i.test(trimmed);

    onAddFreeformContext({
      key: buildShortTitleFromFreeText(trimmed),
      value: trimmed,
      type: autoBoundary ? 'constraint' : 'preference',
      domain: inferred.primaryDomain,
    });

    setFreeText('');
    setEntryKind('preference');
    setIsAddSheetOpen(false);
  };

  const renderArchitecturalIcon = (kind?: PortraitBentoItem['iconKind'], lightText = false) => {
    const cls = lightText ? 'text-[#E68860]' : 'text-brand-deep-green';
    switch (kind) {
      case 'clock':
        return <IconClock size={18} className={cls} />;
      case 'diet':
        return <IconSupperTable size={18} className={cls} />;
      case 'circle':
        return <IconTogether size={18} className={cls} />;
      case 'pin':
        return <IconVenuePin size={18} className={cls} />;
      default:
        return <IconSparkNote size={18} className={cls} />;
    }
  };

  const activeStarter =
    PROMPT_STARTERS.find((s) => s.slice === starterFocus) || PROMPT_STARTERS[0];

  const subtleHintText =
    unmappedSlices.length > 0
      ? `+ ${unmappedSlices
          .slice(0, 2)
          .map((u) => u.shortHint)
          .join(' · ')}${unmappedSlices.length > 2 ? '…' : ''}`
      : null;

  return (
    <div className="space-y-4">
      {/* ====================================================================
          1. AUTO-SEGMENTED CONTEXT FILTER BAR + SUBTLE UNMAPPED HINT PILL
         ==================================================================== */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1">
        <button
          type="button"
          onClick={() => setSelectedSlice('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs transition-all shrink-0 cursor-pointer ${
            selectedSlice === 'all'
              ? 'bg-brand-deep-green text-brand-ivory font-semibold shadow-xs'
              : 'bg-[#EFE9DE] text-brand-ink/80 hover:text-brand-ink font-medium border border-brand-warm-stone/70'
          }`}
        >
          All
        </button>

        {activeSlices.map((slice) => {
          const active = selectedSlice === slice.id;
          return (
            <button
              key={slice.id}
              type="button"
              onClick={() => setSelectedSlice(active ? 'all' : slice.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all shrink-0 cursor-pointer ${
                active
                  ? 'bg-brand-deep-green text-brand-ivory font-semibold shadow-xs'
                  : 'bg-[#EFE9DE] text-brand-ink/80 hover:text-brand-ink font-medium border border-brand-warm-stone/70'
              }`}
            >
              {slice.label}
            </button>
          );
        })}

        {/* Subtle Hint Pill for Unmapped Life Slices (Travel, Books, Shopping, etc.) */}
        {subtleHintText && (
          <button
            type="button"
            onClick={() => openAddSheetWithSlice(unmappedSlices[0]?.id)}
            className="px-3 py-1.5 rounded-full text-[11px] font-medium text-brand-ink-light hover:text-brand-terracotta border border-dashed border-brand-warm-stone hover:border-brand-terracotta/55 bg-transparent transition-colors shrink-0 cursor-pointer"
          >
            {subtleHintText}
          </button>
        )}
      </div>

      {/* ====================================================================
          2. UNIFIED LIVING BENTO MOSAIC
             Hero #1 = Persona Card -> Photo & Architectural Bentos -> + Add More
         ==================================================================== */}
      <div className="space-y-3">
        {/* HERO BENTO #1: PERSONA CARD WITH CHARACTER ARTWORK & FULL-PAGE TAP */}
        {selectedSlice === 'all' && (
          <Link
            href="/me/persona"
            className="relative block w-full h-[244px] rounded-[26px] overflow-hidden group shadow-card border border-brand-warm-stone/55 bg-[#121A18]"
          >
            <motion.img
              key={primaryPersona.heroImage}
              src={resolveAssetUrl(primaryPersona.heroImage)}
              alt={primaryPersona.name}
              animate={{ scale: [1.0, 1.045, 1.0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-[center_24%]"
            />

            {/* Multi-stop inline RGBA scrim for guaranteed readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(10, 15, 14, 0.95) 0%, rgba(10, 15, 14, 0.52) 48%, rgba(10, 15, 14, 0.14) 82%, rgba(10, 15, 14, 0.30) 100%)',
              }}
            />

            {/* Top Eyebrow & Full-Page Affordance */}
            <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
              <span
                style={{ backgroundColor: 'rgba(198, 110, 69, 0.92)' }}
                className="px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-[0.09em] text-white shadow-xs"
              >
                Your Persona
              </span>

              <span
                style={{ backgroundColor: 'rgba(14, 21, 19, 0.82)' }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white border border-white/25 backdrop-blur-xs group-hover:translate-x-0.5 transition-transform"
              >
                <span>Full portrait</span>
                <IconArrowUpRight size={12} />
              </span>
            </div>

            {/* Bottom Persona Name & Tagline */}
            <div className="absolute inset-x-4 bottom-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#E68860] block">
                {primaryPersona.badge}
              </span>
              <h2 className="font-serif text-[23px] leading-[1.14] font-medium text-white">
                {primaryPersona.name}
              </h2>
              <p
                className="font-serif text-[12.5px] leading-snug line-clamp-2"
                style={{ color: '#EDE7DC' }}
              >
                {primaryPersona.tagline}
              </p>
            </div>
          </Link>
        )}

        <motion.div layout className="grid grid-cols-2 gap-3 auto-rows-[172px]">

        {/* TASTE & BOUNDARY BENTO TILES */}
        {visibleBentos.map((bento) => {
          const effectiveSpan =
            selectedSlice !== 'all' && bento.span === 'tall' ? 'square' : bento.span;
          const spanClass =
            effectiveSpan === 'wide'
              ? 'col-span-2 row-span-1'
              : effectiveSpan === 'tall'
              ? 'col-span-1 row-span-2'
              : 'col-span-1 row-span-1';

          if (bento.variant === 'architectural') {
            const isDark = bento.theme === 'forest' || bento.theme === 'terracotta';
            const surfaceBg =
              bento.theme === 'forest'
                ? '#1B352E'
                : bento.theme === 'terracotta'
                ? '#362019'
                : '#EFE8DC';

            return (
              <motion.button
                layout
                key={bento.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveBentoModal(bento)}
                style={{ backgroundColor: surfaceBg }}
                className={`relative rounded-[24px] p-4 text-left flex flex-col justify-between overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer ${
                  isDark
                    ? 'border border-white/10 text-white'
                    : 'border border-brand-warm-stone text-brand-ink'
                } ${spanClass}`}
              >
                <TopographicPattern
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  opacity={isDark ? 0.14 : 0.45}
                />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div
                    style={{
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(36, 72, 63, 0.10)',
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    {renderArchitecturalIcon(bento.iconKind, isDark)}
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.09em] ${
                      isDark ? 'text-[#E68860]' : 'text-brand-terracotta'
                    }`}
                  >
                    {bento.eyebrow}
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <h3
                    className={`font-serif text-[16px] leading-tight font-medium line-clamp-2 ${
                      isDark ? 'text-white' : 'text-brand-ink'
                    }`}
                  >
                    {bento.title}
                  </h3>
                  <p
                    className={`text-[11px] leading-snug line-clamp-2 ${
                      isDark ? 'text-white/75' : 'text-brand-ink-light'
                    }`}
                  >
                    {bento.caption}
                  </p>
                </div>
              </motion.button>
            );
          }

          // Photographic Bento Tile
          return (
            <motion.button
              layout
              key={bento.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveBentoModal(bento)}
              className={`relative rounded-[24px] overflow-hidden text-left group shadow-soft hover:shadow-card border border-brand-warm-stone/55 bg-[#141C1A] cursor-pointer ${spanClass}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveAssetUrl(bento.image || '/v2/images/me/me_pillar_ideas.jpg')}
                alt={bento.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Rock-Solid Inline RGBA Scrim */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10, 15, 14, 0.94) 0%, rgba(10, 15, 14, 0.46) 55%, rgba(10, 15, 14, 0.12) 100%)',
                }}
              />

              {/* Slice Connection Tag at Top-Right */}
              <span
                style={{ backgroundColor: 'rgba(14, 21, 19, 0.82)' }}
                className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider text-white/90 border border-white/20 backdrop-blur-xs"
              >
                {bento.slices.slice(0, 2).join(' · ')}
              </span>

              {/* Bottom Title & Caption */}
              <div className="absolute inset-x-3.5 bottom-3.5 space-y-0.5">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.09em] text-[#E68860] block truncate">
                  {bento.eyebrow}
                </span>
                <h3 className="font-sans text-[15px] font-semibold text-white leading-snug line-clamp-2">
                  {bento.title}
                </h3>
                {(effectiveSpan === 'wide' || effectiveSpan === 'tall') && (
                  <p
                    className="font-serif text-[11.5px] line-clamp-2 pt-0.5 leading-snug"
                    style={{ color: '#E8E2D6' }}
                  >
                    {bento.caption}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}

        {/* ==================================================================
            FINAL BENTO TILE: "+ ADD MORE" (DISTINCT PLUS CARD)
           ================================================================== */}
        <motion.button
          layout
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openAddSheetWithSlice(
              selectedSlice !== 'all'
                ? selectedSlice
                : unmappedSlices[0]?.id || 'travel'
            )
          }
          className={`relative rounded-[24px] overflow-hidden border-2 border-dashed border-brand-terracotta/50 hover:border-brand-terracotta bg-[#F2ECE1] p-4 text-left flex flex-col justify-between group transition-all cursor-pointer ${
            isAddTileWide ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'
          }`}
        >
          <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.55} />

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-brand-deep-green group-hover:bg-brand-terracotta text-brand-ivory flex items-center justify-center shadow-sm transition-colors">
              <IconPlus size={19} />
            </div>
            <span className="text-[9.5px] font-bold uppercase tracking-[0.09em] text-brand-terracotta">
              + Add Context
            </span>
          </div>

          <div className="relative z-10 space-y-0.5">
            <h3 className="font-serif text-[17px] font-medium text-brand-ink leading-tight">
              Add More
            </h3>
            <p className="text-[11.5px] text-brand-ink-light leading-snug line-clamp-2">
              {isAddTileWide
                ? 'Speak, type anything in your own words, or bring context from ChatGPT, Claude & Gemini.'
                : 'Speak, type, or bring from AI'}
            </p>
          </div>
        </motion.button>
        </motion.div>
      </div>

      {/* ====================================================================
          3. EXPANDED BENTO DETAIL & QUICK-EDIT SHEET
         ==================================================================== */}
      <AnimatePresence>
        {activeBentoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end justify-center"
            onClick={() => setActiveBentoModal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] overflow-hidden border-t border-brand-warm-stone shadow-elevated"
            >
              {activeBentoModal.image ? (
                <div className="relative aspect-[16/9] w-full bg-[#141C1A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveAssetUrl(activeBentoModal.image)}
                    alt={activeBentoModal.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setActiveBentoModal(null)}
                    style={{ backgroundColor: 'rgba(14, 21, 19, 0.88)' }}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full text-white border border-white/25 flex items-center justify-center shadow-md cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>
              ) : (
                <div className="px-6 pt-5 flex items-center justify-between">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-brand-terracotta">
                    {activeBentoModal.eyebrow}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveBentoModal(null)}
                    className="w-8 h-8 rounded-full bg-[#EFE9DE] text-brand-ink flex items-center justify-center cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  {activeBentoModal.image && (
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-brand-terracotta block">
                      {activeBentoModal.eyebrow}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    {activeBentoModal.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {activeBentoModal.slices.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-full bg-[#EFE9DE] text-brand-ink-light text-[10px] font-semibold capitalize"
                      >
                        Applies to {s}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-serif text-[13.5px] text-brand-ink/85 leading-relaxed">
                  {activeBentoModal.detailBody}
                </p>

                {/* Quick 1-Tap Flip if Available */}
                {activeBentoModal.flipAction && (
                  <button
                    type="button"
                    onClick={() => {
                      const flip = activeBentoModal.flipAction!;
                      onFlipOrUpdateRule(activeBentoModal, {
                        key: flip.key,
                        value: flip.value,
                        type: flip.type,
                        domain: flip.domain,
                      });
                      setActiveBentoModal(null);
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-[#F2ECE1] hover:bg-[#E8E0D1] border border-brand-warm-stone text-xs font-semibold text-brand-ink flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{activeBentoModal.flipAction.buttonLabel}</span>
                    <IconArrowRight size={14} className="text-brand-deep-green shrink-0" />
                  </button>
                )}

                {/* Underlying Stored Rules with Remove Option */}
                {activeBentoModal.matchedRules.length > 0 && (
                  <div className="pt-2 border-t border-brand-warm-stone/60 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light block">
                      Stored in your Vault
                    </span>
                    {activeBentoModal.matchedRules.map((r: ContextItemData) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between gap-2 rounded-xl bg-[#FCFBF8] border border-brand-warm-stone/70 px-3 py-2"
                      >
                        <span className="text-xs font-medium text-brand-ink truncate">
                          {r.key}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteRule(r.id);
                            setActiveBentoModal(null);
                          }}
                          aria-label="Remove signal"
                          className="p-1 text-brand-ink-light hover:text-rose-700 cursor-pointer shrink-0"
                        >
                          <IconTrash size={13.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const primaryS = activeBentoModal.slices[0] || 'events';
                      setActiveBentoModal(null);
                      openAddSheetWithSlice(primaryS);
                    }}
                    className="text-xs font-semibold text-brand-terracotta hover:underline cursor-pointer"
                  >
                    + Add more like this
                  </button>

                  <Link
                    href="/me/vault"
                    className="text-xs font-semibold text-brand-deep-green hover:text-brand-terracotta"
                  >
                    Open Vault →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          4. "+ ADD MORE" EXPRESSIVE SHEET (VOICE, FREE TEXT & AI IMPORT)
         ==================================================================== */}
      <AnimatePresence>
        {isAddSheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end justify-center"
            onClick={() => setIsAddSheetOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] p-6 space-y-4 border-t border-brand-warm-stone shadow-elevated max-h-[88dvh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-brand-terracotta block">
                    Grow Your Portrait
                  </span>
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    Add More About You
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#EFE9DE] text-brand-ink flex items-center justify-center cursor-pointer shrink-0"
                >
                  <IconClose size={15} />
                </button>
              </div>

              {/* Domain Inspiration Pills (Auto-Segments Automatically!) */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none -mx-1 px-1">
                {PROMPT_STARTERS.map((s) => {
                  const active = starterFocus === s.slice;
                  return (
                    <button
                      key={s.slice}
                      type="button"
                      onClick={() => setStarterFocus(s.slice)}
                      className={`px-3 py-1.5 rounded-full text-[11px] shrink-0 transition-all cursor-pointer ${
                        active
                          ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                          : 'bg-[#EFE9DE] text-brand-ink-light font-medium'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleCreateCustomBento} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEntryKind('preference')}
                    className={`py-2 px-3 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                      entryKind === 'preference'
                        ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green'
                        : 'bg-[#FCFBF8] text-brand-ink border-brand-warm-stone'
                    }`}
                  >
                    What I Love
                  </button>
                  <button
                    type="button"
                    onClick={() => setEntryKind('constraint')}
                    className={`py-2 px-3 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                      entryKind === 'constraint'
                        ? 'bg-brand-terracotta text-white border-brand-terracotta'
                        : 'bg-[#FCFBF8] text-brand-ink border-brand-warm-stone'
                    }`}
                  >
                    Hard Boundary
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                    placeholder={activeStarter.placeholder}
                    className="w-full text-xs rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone p-3.5 pr-12 text-brand-ink leading-relaxed focus:outline-none focus:border-brand-deep-green"
                  />
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    aria-label="Speak instead"
                    className={`absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      isRecording
                        ? 'bg-brand-terracotta text-white animate-pulse'
                        : 'bg-[#EFE9DE] text-brand-ink hover:bg-brand-warm-stone'
                    }`}
                  >
                    <IconMicrophone size={15} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={freeText.trim().length < 4}
                  className="w-full py-3 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark disabled:opacity-45 text-brand-ivory text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Add Bento to My Portrait
                </button>
              </form>

              {/* AI Import & Re-Swipe Doors */}
              <div className="pt-3 border-t border-brand-warm-stone/65 space-y-2.5">
                <Link
                  href="/import?returnTo=me"
                  className="rounded-2xl bg-[#F2ECE1] hover:bg-[#EAE1D2] border border-brand-warm-stone p-3.5 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex -space-x-1.5 shrink-0">
                      <span className="w-6 h-6 rounded-full bg-white border border-brand-warm-stone flex items-center justify-center">
                        <OpenAIIcon className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white border border-brand-warm-stone flex items-center justify-center">
                        <ClaudeIcon className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white border border-brand-warm-stone flex items-center justify-center">
                        <GeminiIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-brand-ink block">
                        Bring from ChatGPT, Claude, or Gemini
                      </span>
                      <span className="text-[10.5px] text-brand-ink-light block truncate">
                        Fills Travel, Books, Dining & Events in one paste
                      </span>
                    </div>
                  </div>
                  <IconArrowRight size={14} className="text-brand-deep-green shrink-0" />
                </Link>

                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-ink-light hover:text-brand-deep-green pl-1"
                >
                  <IconSliders size={13} />
                  <span>Re-swipe the 8 visual taste cards</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
