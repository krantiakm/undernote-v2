'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Plane,
  Ticket,
  Smartphone,
  ChevronRight,
  X,
  Edit3,
  Check,
  Share2,
  Sliders,
  ArrowRight,
  Eye,
  MapPin,
  Clock,
  Compass,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LookbookTile } from '@/types';

export default function MePage() {
  const { persona, showToast, updatePersona } = useApp();

  const [isFullPortraitOpen, setIsFullPortraitOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState<LookbookTile | null>(null);
  const [isEditingNarrative, setIsEditingNarrative] = useState(false);
  const [editedNarrativeText, setEditedNarrativeText] = useState(
    persona.lifeNarrative.openingSummary
  );
  const [copiedPassport, setCopiedPassport] = useState(false);

  // Calibration state for selected tile
  const [editedTendency, setEditedTendency] = useState('');
  const [editedFocus, setEditedFocus] = useState('');

  const handleOpenTile = (tile: LookbookTile) => {
    setSelectedTile(tile);
    setEditedTendency(tile.enduringTendency);
    setEditedFocus(tile.currentFocus);
  };

  const handleSaveCalibration = () => {
    if (!selectedTile) return;
    const updatedTiles = persona.lookbookTiles.map((t) =>
      t.domain === selectedTile.domain
        ? { ...t, enduringTendency: editedTendency, currentFocus: editedFocus }
        : t
    );
    updatePersona({ lookbookTiles: updatedTiles });
    setSelectedTile(null);
    showToast(`Calibrated ${selectedTile.title} horizons`);
  };

  const handleSaveNarrativeEdit = () => {
    updatePersona({
      lifeNarrative: {
        ...persona.lifeNarrative,
        openingSummary: editedNarrativeText,
      },
    });
    setIsEditingNarrative(false);
    showToast('Life narrative updated');
  };

  const handleCopyPassport = () => {
    const text = `# Undernote Life Lookbook (${persona.locationAnchor})
"${persona.lifeNarrative.manifestoHeadline}"

${persona.lifeNarrative.openingSummary}

## Core Enduring Tendencies (Longer Horizons):
${persona.lookbookTiles.map((t) => `- [${t.domain.toUpperCase()}] ${t.title}: ${t.enduringTendency}`).join('\n')}

## Current Focus (Shorter Horizons):
${persona.lookbookTiles.map((t) => `- [${t.domain.toUpperCase()}] ${t.currentFocus}`).join('\n')}
`;

    navigator.clipboard.writeText(text);
    setCopiedPassport(true);
    showToast('Aesthetic Passport copied to clipboard');
    setTimeout(() => setCopiedPassport(false), 3000);
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'travel':
        return <Plane className="w-3.5 h-3.5 text-emerald-700" />;
      case 'books':
        return <BookOpen className="w-3.5 h-3.5 text-amber-700" />;
      case 'events':
        return <Ticket className="w-3.5 h-3.5 text-rose-700" />;
      case 'shopping':
        return <Smartphone className="w-3.5 h-3.5 text-blue-700" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-stone-700" />;
    }
  };

  return (
    <div className="space-y-6 pb-28 pt-2 text-brand-ink antialiased">
      {/* 1. EDITORIAL HEADER & MONOGRAM */}
      <div className="text-center space-y-1.5 pt-2">
        <div className="w-10 h-10 mx-auto rounded-full bg-brand-deep-green/10 text-brand-deep-green flex items-center justify-center font-serif text-lg font-bold border border-brand-deep-green/20 shadow-xs">
          K
        </div>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-ink">
            {persona.title}
          </h1>
          <p className="font-serif italic text-sm text-brand-terracotta mt-0.5">
            "{persona.lifeNarrative.manifestoHeadline}"
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-brand-ink/60 font-mono">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-deep-green" />
            {persona.locationAnchor}
          </span>
          <span>·</span>
          <span>{persona.familyComposition}</span>
        </div>
      </div>

      {/* 2. OVERALL LIFE ARCHITECTURE HERO CARD (TAP TO READ IN FULL-SCREEN) */}
      <motion.div
        whileTap={{ scale: 0.985 }}
        onClick={() => setIsFullPortraitOpen(true)}
        className="group relative cursor-pointer overflow-hidden rounded-[28px] bg-white border border-brand-warm-stone/50 shadow-sm hover:shadow-md transition-all p-5 space-y-3.5"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-brand-deep-green/10 text-brand-deep-green font-bold">
            <Sparkles className="w-3 h-3 text-brand-terracotta" />
            Life Architecture &amp; Foundations
          </span>
          <span className="text-[11px] text-brand-terracotta font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>Read Full Portrait</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <p className="font-serif text-sm sm:text-base leading-relaxed text-brand-ink/90 line-clamp-3">
          {persona.lifeNarrative.openingSummary}
        </p>

        <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
            <span>4 Enduring Tendencies</span>
            <span>·</span>
            <span>Shorter Horizons Active</span>
          </div>
          <span className="text-[11px] font-mono text-brand-deep-green font-semibold underline underline-offset-4 decoration-brand-warm-stone">
            Tap to open book ↗
          </span>
        </div>
      </motion.div>

      {/* 3. MASONRY LOOKBOOK GRID (THE 4 DOMAINS) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xs font-mono uppercase font-bold tracking-wider text-brand-ink/70">
              The Editorial Lookbook
            </h2>
            <p className="text-[11px] text-brand-ink/50 mt-0.5">
              Longer-term tendencies and active shorter-term horizons
            </p>
          </div>
          <button
            onClick={handleCopyPassport}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white hover:bg-stone-50 text-brand-ink border border-brand-warm-stone/60 shadow-xs transition-all active:scale-95"
          >
            {copiedPassport ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
            <span>{copiedPassport ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Masonry Layout: 2 Columns with Staggered Heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          {/* COLUMN 1: Travel (Tall) & Events (Square) */}
          <div className="space-y-3.5">
            {/* Tile 1: Travel (Tall 3:4) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[0])}
              className="group cursor-pointer rounded-[24px] overflow-hidden bg-white border border-brand-warm-stone/50 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[0].heroImage}
                  alt={persona.lookbookTiles[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                  {getDomainIcon('travel')}
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                    Travel
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
                    {persona.lookbookTiles[0].title}
                  </h3>
                  <p className="font-serif italic text-xs text-brand-sage leading-snug drop-shadow-xs">
                    "{persona.lookbookTiles[0].pullQuote}"
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3 text-xs flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-deep-green font-bold tracking-wider">
                    ⏳ Longer Horizon (Enduring Tendency)
                  </span>
                  <p className="text-brand-ink/90 font-medium mt-1 leading-snug">
                    {persona.lookbookTiles[0].enduringTendency}
                  </p>
                </div>
                <div className="pt-2 border-t border-brand-warm-stone/30">
                  <span className="text-[10px] font-mono uppercase text-brand-terracotta font-bold tracking-wider">
                    ⏱️ Current Horizon (Active Focus)
                  </span>
                  <p className="text-brand-ink/75 mt-0.5 leading-snug">
                    {persona.lookbookTiles[0].currentFocus}
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-stone-400 font-mono flex items-center justify-between">
                  <span>{persona.lookbookTiles[0].localAnchor}</span>
                  <span className="text-brand-terracotta font-semibold">Calibrate ↗</span>
                </div>
              </div>
            </motion.div>

            {/* Tile 3: Events (Square 1:1) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[2])}
              className="group cursor-pointer rounded-[24px] overflow-hidden bg-white border border-brand-warm-stone/50 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[2].heroImage}
                  alt={persona.lookbookTiles[2].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                  {getDomainIcon('events')}
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                    Events
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-0.5">
                  <h3 className="font-serif text-base font-bold leading-tight">
                    {persona.lookbookTiles[2].title}
                  </h3>
                  <p className="font-serif italic text-xs text-brand-sage leading-snug">
                    "{persona.lookbookTiles[2].pullQuote}"
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3 text-xs flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-deep-green font-bold tracking-wider">
                    ⏳ Longer Horizon (Enduring Tendency)
                  </span>
                  <p className="text-brand-ink/90 font-medium mt-1 leading-snug">
                    {persona.lookbookTiles[2].enduringTendency}
                  </p>
                </div>
                <div className="pt-2 border-t border-brand-warm-stone/30">
                  <span className="text-[10px] font-mono uppercase text-brand-terracotta font-bold tracking-wider">
                    ⏱️ Current Horizon (Active Focus)
                  </span>
                  <p className="text-brand-ink/75 mt-0.5 leading-snug">
                    {persona.lookbookTiles[2].currentFocus}
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-stone-400 font-mono flex items-center justify-between">
                  <span>{persona.lookbookTiles[2].localAnchor}</span>
                  <span className="text-brand-terracotta font-semibold">Calibrate ↗</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2: Books (Square) & Shopping (Tall) */}
          <div className="space-y-3.5">
            {/* Tile 2: Books (Square 1:1) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[1])}
              className="group cursor-pointer rounded-[24px] overflow-hidden bg-white border border-brand-warm-stone/50 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[1].heroImage}
                  alt={persona.lookbookTiles[1].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                  {getDomainIcon('books')}
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                    Books
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-0.5">
                  <h3 className="font-serif text-base font-bold leading-tight">
                    {persona.lookbookTiles[1].title}
                  </h3>
                  <p className="font-serif italic text-xs text-brand-sage leading-snug">
                    "{persona.lookbookTiles[1].pullQuote}"
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3 text-xs flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-deep-green font-bold tracking-wider">
                    ⏳ Longer Horizon (Enduring Tendency)
                  </span>
                  <p className="text-brand-ink/90 font-medium mt-1 leading-snug">
                    {persona.lookbookTiles[1].enduringTendency}
                  </p>
                </div>
                <div className="pt-2 border-t border-brand-warm-stone/30">
                  <span className="text-[10px] font-mono uppercase text-brand-terracotta font-bold tracking-wider">
                    ⏱️ Current Horizon (Active Focus)
                  </span>
                  <p className="text-brand-ink/75 mt-0.5 leading-snug">
                    {persona.lookbookTiles[1].currentFocus}
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-stone-400 font-mono flex items-center justify-between">
                  <span>{persona.lookbookTiles[1].localAnchor}</span>
                  <span className="text-brand-terracotta font-semibold">Calibrate ↗</span>
                </div>
              </div>
            </motion.div>

            {/* Tile 4: Shopping (Tall 3:4) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[3])}
              className="group cursor-pointer rounded-[24px] overflow-hidden bg-white border border-brand-warm-stone/50 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[3].heroImage}
                  alt={persona.lookbookTiles[3].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                  {getDomainIcon('shopping')}
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                    Hardware
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {persona.lookbookTiles[3].title}
                  </h3>
                  <p className="font-serif italic text-xs text-brand-sage leading-snug">
                    "{persona.lookbookTiles[3].pullQuote}"
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3 text-xs flex-1">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-deep-green font-bold tracking-wider">
                    ⏳ Longer Horizon (Enduring Tendency)
                  </span>
                  <p className="text-brand-ink/90 font-medium mt-1 leading-snug">
                    {persona.lookbookTiles[3].enduringTendency}
                  </p>
                </div>
                <div className="pt-2 border-t border-brand-warm-stone/30">
                  <span className="text-[10px] font-mono uppercase text-brand-terracotta font-bold tracking-wider">
                    ⏱️ Current Horizon (Active Focus)
                  </span>
                  <p className="text-brand-ink/75 mt-0.5 leading-snug">
                    {persona.lookbookTiles[3].currentFocus}
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-stone-400 font-mono flex items-center justify-between">
                  <span>{persona.lookbookTiles[3].localAnchor}</span>
                  <span className="text-brand-terracotta font-semibold">Calibrate ↗</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: FULL-SCREEN LIFE PORTRAIT READER VIEW (CEREAL / NEW YORKER STYLE) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullPortraitOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-ivory">
            {/* Sticky Minimal Reader Header */}
            <div className="sticky top-0 z-20 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-warm-stone/40 px-5 py-3.5 flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-deep-green text-white flex items-center justify-center font-serif text-xs font-bold">
                  K
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand-ink/70 font-semibold">
                  Personal Life Portrait
                </span>
              </div>
              <button
                onClick={() => setIsFullPortraitOpen(false)}
                className="p-1.5 rounded-full bg-stone-200/70 hover:bg-stone-300 text-brand-ink transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reader Article Body */}
            <div className="max-w-xl mx-auto px-5 py-8 space-y-10">
              {/* Headline */}
              <div className="space-y-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
                  Monograph · Volume I
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink leading-tight">
                  {persona.title}
                </h1>
                <p className="font-serif italic text-base text-brand-ink/70 max-w-md mx-auto">
                  "{persona.lifeNarrative.manifestoHeadline}"
                </p>
                <div className="text-[11px] text-stone-400 font-mono pt-1">
                  Anchor: {persona.locationAnchor} · Sovereign Profile
                </div>
              </div>

              {/* Editable Opening Synthesis */}
              <div className="relative p-5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] uppercase text-brand-deep-green font-bold">
                    Executive Narrative
                  </span>
                  <button
                    onClick={() => setIsEditingNarrative(!isEditingNarrative)}
                    className="inline-flex items-center gap-1 text-[11px] text-brand-terracotta font-medium"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditingNarrative ? 'Cancel' : 'Edit Synthesis'}</span>
                  </button>
                </div>

                {isEditingNarrative ? (
                  <div className="space-y-3">
                    <textarea
                      rows={5}
                      value={editedNarrativeText}
                      onChange={(e) => setEditedNarrativeText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-brand-warm-stone/60 bg-brand-ivory text-brand-ink text-xs font-serif leading-relaxed focus:outline-brand-deep-green"
                    />
                    <button
                      onClick={handleSaveNarrativeEdit}
                      className="px-4 py-2 rounded-xl bg-brand-deep-green text-white text-xs font-medium"
                    >
                      Save Narrative
                    </button>
                  </div>
                ) : (
                  <p className="font-serif text-sm sm:text-base leading-relaxed text-brand-ink/90">
                    {persona.lifeNarrative.openingSummary}
                  </p>
                )}
              </div>

              {/* Interspersed Chapters with Editorial Layout */}
              <div className="space-y-12">
                {persona.lifeNarrative.chapters.map((chapter, idx) => (
                  <article key={chapter.id} className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-brand-terracotta uppercase font-bold tracking-widest">
                        Chapter {idx + 1}
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-brand-ink">
                        {chapter.title}
                      </h2>
                      <p className="text-xs text-brand-ink/60 font-medium">
                        {chapter.subtitle}
                      </p>
                    </div>

                    {chapter.image && (
                      <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xs">
                        <Image
                          src={chapter.image}
                          alt={chapter.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {chapter.pullQuote && (
                      <blockquote className="border-l-2 border-brand-terracotta pl-4 py-1 font-serif italic text-sm text-brand-ink/80 leading-snug">
                        "{chapter.pullQuote}"
                      </blockquote>
                    )}

                    <p className="text-xs sm:text-sm leading-relaxed text-brand-ink/80 font-sans">
                      {chapter.body}
                    </p>
                  </article>
                ))}
              </div>

              {/* Reader Footer */}
              <div className="pt-8 border-t border-brand-warm-stone/40 text-center space-y-3">
                <p className="text-xs text-stone-500 italic font-serif">
                  "Nothing in Undernote is a permanent rule. Horizons shift as seasons and life rhythms change."
                </p>
                <button
                  onClick={() => setIsFullPortraitOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-brand-deep-green text-white font-medium text-xs shadow-sm hover:bg-brand-deep-green/90 transition-all"
                >
                  Return to Lookbook
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: TILE CALIBRATION DRAWER (NO PERMANENT "RULES" — FLUID HORIZONS)   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedTile && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-brand-ivory rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 text-xs border border-brand-warm-stone/60 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/30">
                <div className="flex items-center gap-2">
                  {getDomainIcon(selectedTile.domain)}
                  <span className="font-mono text-xs uppercase font-bold text-brand-deep-green tracking-wider">
                    {selectedTile.domain} Horizon Calibration
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTile(null)}
                  className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-stone-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative h-40 w-full rounded-2xl overflow-hidden shadow-xs">
                <Image
                  src={selectedTile.heroImage}
                  alt={selectedTile.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-bold">{selectedTile.title}</h3>
                  <p className="font-serif italic text-xs text-brand-sage leading-snug">
                    "{selectedTile.pullQuote}"
                  </p>
                </div>
              </div>

              {/* Form to Calibrate Without "Rules" */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-deep-green font-bold mb-1">
                    ⏳ Longer Horizon (Enduring Tendency)
                  </label>
                  <textarea
                    rows={3}
                    value={editedTendency}
                    onChange={(e) => setEditedTendency(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white text-brand-ink text-xs font-medium leading-relaxed focus:outline-brand-deep-green"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    Foundational preferences that endure over months or years (e.g. dietary baselines, non-stop flights).
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-terracotta font-bold mb-1">
                    ⏱️ Current Horizon (Active Focus)
                  </label>
                  <textarea
                    rows={2}
                    value={editedFocus}
                    onChange={(e) => setEditedFocus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white text-brand-ink text-xs font-medium leading-relaxed focus:outline-brand-terracotta"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    What you are specifically watching or planning right now over the coming weeks.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSelectedTile(null)}
                  className="flex-1 py-2.5 rounded-xl border border-brand-warm-stone text-brand-ink font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCalibration}
                  className="flex-1 py-2.5 rounded-xl bg-brand-deep-green text-white font-medium shadow-xs"
                >
                  Save Calibration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
