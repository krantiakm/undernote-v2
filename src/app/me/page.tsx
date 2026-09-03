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
  Compass,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LookbookTile } from '@/types';
import { AppShell } from '@/components/shell/AppShell';

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

  const getBadgeText = (domain: string) => {
    switch (domain) {
      case 'travel':
        return 'Strict Non-Stop Flights';
      case 'books':
        return 'Archival Hardcover Only';
      case 'events':
        return '100% Unamplified Sound';
      case 'shopping':
        return 'Single-Handed <6.3"';
      default:
        return 'Core Tendency';
    }
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-[#F7F3EC] px-3.5 pt-2 pb-24 space-y-6 text-brand-ink antialiased">
        {/* 1. EDITORIAL LOOKBOOK HEADER (EXACTLY LIKE THE CEREAL SPREAD) */}
        <div className="text-center pt-3 pb-1 space-y-2">
        {/* Large Haute Serif Monogram */}
        <div className="font-serif text-6xl text-brand-deep-green font-normal tracking-tight leading-none">
          K
        </div>

        {/* Master Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink leading-tight">
          The Mindful<br />Craftsperson
        </h1>

        {/* Serif Italic Subtitle */}
        <p className="font-serif italic text-sm sm:text-base text-brand-ink/75 max-w-xs mx-auto">
          A life defined by what is kept out
        </p>

        <div className="text-[10px] font-mono tracking-widest uppercase text-brand-ink/40 pt-0.5">
          {persona.locationAnchor} · Sovereign Profile
        </div>
      </div>

      {/* 2. OVERALL LIFE NARRATIVE FEATURE: OPEN MAGAZINE COVER */}
      <motion.div
        whileTap={{ scale: 0.985 }}
        onClick={() => setIsFullPortraitOpen(true)}
        className="group cursor-pointer relative mx-1 rounded-2xl bg-white border border-brand-warm-stone/60 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.06)] overflow-hidden transition-all hover:shadow-lg"
      >
        {/* Magazine Ribbon Top */}
        <div className="bg-brand-deep-green text-white px-4 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest font-semibold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-brand-terracotta" />
            Life Portrait &amp; Foundations · Volume I
          </span>
          <span className="text-brand-sage flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Tap to Open ↗
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          <blockquote className="font-serif text-base sm:text-lg leading-relaxed text-brand-ink font-medium">
            "{persona.lifeNarrative.openingSummary}"
          </blockquote>

          <div className="pt-2 flex items-center justify-between text-xs border-t border-brand-warm-stone/40">
            <span className="font-serif italic text-stone-500 text-xs">
              4 Enduring Horizons · Zero permanent rules
            </span>
            <span className="font-mono text-[11px] text-brand-terracotta font-semibold group-hover:underline">
              Read Monograph &rarr;
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3. VISUALLY SPECTACULAR 2-COLUMN MASONRY GRID (SIDE-BY-SIDE ON MOBILE) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 pt-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-ink/50 font-bold">
            Enduring Horizons Lookbook
          </span>
          <span className="font-serif italic text-xs text-brand-terracotta">
            Tap any tile to calibrate
          </span>
        </div>

        {/* The 2-Column Staggered Masonry Layout (Column 1 = Tall + Square, Column 2 = Square + Tall) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 items-start">
          
          {/* ============================================================= */}
          {/* COLUMN 1: Travel (Tall 3:4) + Events (Square 1:1)             */}
          {/* ============================================================= */}
          <div className="space-y-2.5 sm:space-y-3.5">
            {/* Tile 1: Travel (Tall Aspect Ratio) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[0])}
              className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[0].heroImage}
                  alt={persona.lookbookTiles[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Domain Tag */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold text-brand-ink">
                  Travel
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-tight">
                    {persona.lookbookTiles[0].title}
                  </h3>
                </div>
              </div>

              {/* Editorial Content Below Image */}
              <div className="p-3 space-y-2.5 bg-white">
                <p className="font-serif italic text-[11px] sm:text-xs text-brand-ink leading-snug">
                  "{persona.lookbookTiles[0].pullQuote}"
                </p>

                {/* Circular Stamped Seal */}
                <div className="border border-brand-ink/50 rounded-full py-1.5 px-2 text-center my-1 bg-brand-ivory/50">
                  <span className="font-serif text-[10px] text-brand-ink font-bold block uppercase tracking-tight leading-none">
                    {getBadgeText(persona.lookbookTiles[0].domain)}
                  </span>
                </div>

                <div className="pt-1 text-[10px] text-stone-500 font-sans leading-tight line-clamp-2">
                  {persona.lookbookTiles[0].enduringTendency}
                </div>
              </div>
            </motion.div>

            {/* Tile 3: Events (Square Aspect Ratio) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[2])}
              className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[2].heroImage}
                  alt={persona.lookbookTiles[2].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold text-brand-ink">
                  Events
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-tight">
                    {persona.lookbookTiles[2].title}
                  </h3>
                </div>
              </div>

              <div className="p-3 space-y-2.5 bg-white">
                <p className="font-serif italic text-[11px] sm:text-xs text-brand-ink leading-snug">
                  "{persona.lookbookTiles[2].pullQuote}"
                </p>

                {/* Circular Stamped Seal */}
                <div className="border border-brand-ink/50 rounded-full py-1.5 px-2 text-center my-1 bg-brand-ivory/50">
                  <span className="font-serif text-[10px] text-brand-ink font-bold block uppercase tracking-tight leading-none">
                    {getBadgeText(persona.lookbookTiles[2].domain)}
                  </span>
                </div>

                <div className="pt-1 text-[10px] text-stone-500 font-sans leading-tight line-clamp-2">
                  {persona.lookbookTiles[2].enduringTendency}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================= */}
          {/* COLUMN 2: Books (Square 1:1) + Hardware (Tall 3:4)            */}
          {/* ============================================================= */}
          <div className="space-y-2.5 sm:space-y-3.5">
            {/* Tile 2: Books (Square Aspect Ratio) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[1])}
              className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[1].heroImage}
                  alt={persona.lookbookTiles[1].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold text-brand-ink">
                  Books
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-tight">
                    {persona.lookbookTiles[1].title}
                  </h3>
                </div>
              </div>

              <div className="p-3 space-y-2.5 bg-white">
                <p className="font-serif italic text-[11px] sm:text-xs text-brand-ink leading-snug">
                  "{persona.lookbookTiles[1].pullQuote}"
                </p>

                {/* Circular Stamped Seal */}
                <div className="border border-brand-ink/50 rounded-full py-1.5 px-2 text-center my-1 bg-brand-ivory/50">
                  <span className="font-serif text-[10px] text-brand-ink font-bold block uppercase tracking-tight leading-none">
                    {getBadgeText(persona.lookbookTiles[1].domain)}
                  </span>
                </div>

                <div className="pt-1 text-[10px] text-stone-500 font-sans leading-tight line-clamp-2">
                  {persona.lookbookTiles[1].enduringTendency}
                </div>
              </div>
            </motion.div>

            {/* Tile 4: Hardware & Everyday Tools (Tall Aspect Ratio) */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenTile(persona.lookbookTiles[3])}
              className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                <Image
                  src={persona.lookbookTiles[3].heroImage}
                  alt={persona.lookbookTiles[3].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold text-brand-ink">
                  Hardware
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-tight">
                    {persona.lookbookTiles[3].title}
                  </h3>
                </div>
              </div>

              <div className="p-3 space-y-2.5 bg-white">
                <p className="font-serif italic text-[11px] sm:text-xs text-brand-ink leading-snug">
                  "{persona.lookbookTiles[3].pullQuote}"
                </p>

                {/* Circular Stamped Seal */}
                <div className="border border-brand-ink/50 rounded-full py-1.5 px-2 text-center my-1 bg-brand-ivory/50">
                  <span className="font-serif text-[10px] text-brand-ink font-bold block uppercase tracking-tight leading-none">
                    {getBadgeText(persona.lookbookTiles[3].domain)}
                  </span>
                </div>

                <div className="pt-1 text-[10px] text-stone-500 font-sans leading-tight line-clamp-2">
                  {persona.lookbookTiles[3].enduringTendency}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 4. FLOATING EXPORT BUTTON (EXACTLY LIKE THE MOCKUP IMAGE) */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={handleCopyPassport}
          className="w-full max-w-xs py-3.5 px-6 rounded-full bg-[#1F3A33] hover:bg-[#162B25] text-white font-medium text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {copiedPassport ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedPassport ? 'Aesthetic Passport Copied' : 'Export Aesthetic Passport'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: FULL-SCREEN LIFE PORTRAIT READER VIEW (CEREAL MAGAZINE SPREAD)   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFullPortraitOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/80 flex justify-center backdrop-blur-xs">
            <div className="w-full max-w-md min-h-screen bg-[#F7F3EC] shadow-2xl relative flex flex-col">
              {/* Sticky Minimal Header */}
              <div className="sticky top-0 z-20 bg-[#F7F3EC]/95 backdrop-blur-md border-b border-brand-warm-stone/40 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-bold text-brand-deep-green">
                    K
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-ink/60 font-semibold">
                    Personal Life Portrait
                  </span>
                </div>
                <button
                  onClick={() => setIsFullPortraitOpen(false)}
                  className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-brand-ink transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Monograph Content */}
              <div className="px-5 py-8 space-y-10">
              {/* Title Header */}
              <div className="space-y-3 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
                  Sovereign Monograph · Volume I
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink leading-tight">
                  {persona.title}
                </h1>
                <p className="font-serif italic text-base text-brand-ink/75 max-w-md mx-auto">
                  "{persona.lifeNarrative.manifestoHeadline}"
                </p>
                <div className="text-[10px] text-stone-400 font-mono pt-1">
                  Anchor: {persona.locationAnchor} · Fluid Horizons
                </div>
              </div>

              {/* Editable Synthesis Box */}
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

              {/* Interspersed Chapters with Photography */}
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
                      <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden shadow-xs">
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
                  "Nothing in Undernote is a rigid rule. Horizons shift as life rhythms change."
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
        </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: TILE CALIBRATION DRAWER                                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedTile && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#F7F3EC] rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 text-xs border border-brand-warm-stone/60 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/30">
                <span className="font-mono text-xs uppercase font-bold text-brand-deep-green tracking-wider">
                  {selectedTile.domain} Horizon Calibration
                </span>
                <button
                  onClick={() => setSelectedTile(null)}
                  className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-stone-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-xs">
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

              {/* Form to Calibrate */}
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
    </AppShell>
  );
}
