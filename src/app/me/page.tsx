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
  ShieldCheck,
  Search,
  Trash2,
  Download,
  FileJson,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LookbookTile, RadarDomain } from '@/types';
import { AppShell } from '@/components/shell/AppShell';

export default function MePage() {
  const {
    persona,
    showToast,
    updatePersona,
    contextItems,
    deleteContextItem,
    resetToBaseline,
  } = useApp();

  // Top Tab Switcher: 'lookbook' vs 'context'
  const [currentTab, setCurrentTab] = useState<'lookbook' | 'context'>('lookbook');

  // Lookbook States
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

  // Contextual Chapter Edit State in Monograph
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editedChapterBody, setEditedChapterBody] = useState('');

  // Context Vault Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<'all' | RadarDomain>('all');
  const [showRawJson, setShowRawJson] = useState(false);

  const filteredContextItems = contextItems.filter((item) => {
    const matchesSearch =
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provenance.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(contextItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `undernote_sovereign_graph_${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Encrypted context JSON exported');
  };

  const handleStartEditChapter = (chapterId: string, currentBody: string) => {
    if (editingChapterId === chapterId) {
      setEditingChapterId(null);
      setEditedChapterBody('');
    } else {
      setEditingChapterId(chapterId);
      setEditedChapterBody(currentBody);
    }
  };

  const handleSaveChapterEdit = (chapterId: string) => {
    const updatedChapters = persona.lifeNarrative.chapters.map((ch) =>
      ch.id === chapterId ? { ...ch, body: editedChapterBody } : ch
    );
    updatePersona({
      lifeNarrative: {
        ...persona.lifeNarrative,
        chapters: updatedChapters,
      },
    });
    setEditingChapterId(null);
    setEditedChapterBody('');
    showToast('Contextual chapter correction saved');
  };

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
        
        {/* Top Segmented Tab Switcher: Lookbook vs My Context & Data */}
        <div className="flex items-center justify-center pt-2">
          <div className="bg-[#EAE4DA] p-1 rounded-full flex items-center gap-1 border border-brand-warm-stone/50 shadow-2xs">
            <button
              onClick={() => setCurrentTab('lookbook')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentTab === 'lookbook'
                  ? 'bg-white text-brand-deep-green shadow-xs font-bold'
                  : 'text-brand-ink/65 hover:text-brand-ink'
              }`}
            >
              Lookbook
            </button>
            <button
              onClick={() => setCurrentTab('context')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentTab === 'context'
                  ? 'bg-white text-brand-deep-green shadow-xs font-bold'
                  : 'text-brand-ink/65 hover:text-brand-ink'
              }`}
            >
              My Context &amp; Data
            </button>
          </div>
        </div>

        {/* TAB 1: EDITORIAL LOOKBOOK */}
        {currentTab === 'lookbook' ? (
          <>
            {/* 1. EDITORIAL LOOKBOOK HEADER (EXACTLY LIKE THE CEREAL SPREAD) */}
            <div className="text-center pt-2 pb-1 space-y-2">
              {/* Large Haute Serif Monogram */}
              <div className="font-serif text-6xl text-brand-deep-green font-normal tracking-tight leading-none">
                K
              </div>

              {/* Master Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink leading-tight">
                The Mindful<br />Craftsperson
              </h1>

              {/* Serif Italic Subtitle */}
              <p className="font-serif italic text-sm sm:text-base text-brand-terracotta font-medium">
                "{persona.lifeNarrative.manifestoHeadline}"
              </p>

              {/* Stamped Seals Row */}
              <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-brand-warm-stone/60 text-[10px] font-mono text-stone-600 shadow-2xs">
                  <span>Verified Profile</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-brand-warm-stone/60 text-[10px] font-mono text-stone-600 shadow-2xs">
                  <span>{persona.locationAnchor}</span>
                </div>
              </div>
            </div>

            {/* 2. SYNTHESIS NARRATIVE CARD */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-warm-stone/60 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
                  Synthesized Context
                </span>
                <button
                  onClick={() => setIsEditingNarrative(!isEditingNarrative)}
                  className="text-xs text-stone-500 hover:text-brand-ink flex items-center gap-1"
                >
                  <Edit3 size={11} />
                  <span>{isEditingNarrative ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {isEditingNarrative ? (
                <div className="space-y-2">
                  <textarea
                    value={editedNarrativeText}
                    onChange={(e) => setEditedNarrativeText(e.target.value)}
                    rows={4}
                    className="w-full text-xs font-sans p-3 rounded-xl border border-brand-warm-stone/70 bg-[#F7F3EC] focus:outline-none focus:ring-1 focus:ring-brand-deep-green leading-relaxed"
                  />
                  <button
                    onClick={handleSaveNarrativeEdit}
                    className="px-4 py-1.5 rounded-full bg-brand-deep-green text-white text-xs font-bold"
                  >
                    Save Narrative
                  </button>
                </div>
              ) : (
                <p className="font-serif text-xs sm:text-sm text-brand-ink/85 leading-relaxed">
                  {persona.lifeNarrative.openingSummary}
                </p>
              )}

              {/* Trigger Monograph Reader */}
              <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-sans">
                  4 chapters on travel, theory, acoustics &amp; tools
                </span>
                <button
                  onClick={() => setIsFullPortraitOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-deep-green hover:underline"
                >
                  <span>Read Monograph</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* 3. 2-COLUMN STAGGERED MASONRY GRID */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-ink/60 font-bold">
                  Horizons &amp; Foundations
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  Tap to calibrate
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                {/* Column 1 */}
                <div className="space-y-3">
                  {/* Tile 1: Travel */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenTile(persona.lookbookTiles[0])}
                    className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={persona.lookbookTiles[0].heroImage}
                        alt={persona.lookbookTiles[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold text-brand-ink">
                        Travel
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <h3 className="font-serif text-sm sm:text-base font-bold leading-tight">
                          {persona.lookbookTiles[0].title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-3 space-y-2.5 bg-white">
                      <p className="font-serif italic text-[11px] sm:text-xs text-brand-ink leading-snug">
                        "{persona.lookbookTiles[0].pullQuote}"
                      </p>
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

                  {/* Tile 3: Events */}
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

                {/* Column 2 */}
                <div className="space-y-3">
                  {/* Tile 2: Books */}
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

                  {/* Tile 4: Hardware */}
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

            {/* 4. EXPORT BUTTON */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleCopyPassport}
                className="w-full max-w-xs py-3 px-6 rounded-full bg-[#1F3A33] hover:bg-[#162B25] text-white font-medium text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {copiedPassport ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedPassport ? 'Copied to Clipboard' : 'Copy Aesthetic Passport'}</span>
              </button>
            </div>
          </>
        ) : (
          /* TAB 2: CONTEXT VAULT & DATA INSPECTOR */
          <div className="space-y-4">
            {/* Sovereignty Scorecard */}
            <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-deep-green uppercase tracking-wider">
                  Privacy Status
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 size={11} />
                  <span>Owned by you</span>
                </span>
              </div>
              <p className="text-[11px] text-brand-ink/75 leading-relaxed">
                Your context is completely yours. Undernote does not sell profiles to ad networks or third-party brokers. What it learns stays on your device.
              </p>
            </div>

            {/* Search & Domain Filter Bar */}
            <div className="space-y-2">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search what Undernote knows about you..."
                  className="w-full text-xs py-2.5 pl-9 pr-3 rounded-2xl border border-brand-warm-stone/60 bg-white font-sans focus:outline-none focus:ring-1 focus:ring-brand-deep-green"
                />
              </div>

              {/* Domain Pill Filter */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'travel', label: 'Travel' },
                  { id: 'books', label: 'Books' },
                  { id: 'events', label: 'Events' },
                  { id: 'shopping', label: 'Hardware' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDomain(d.id as any)}
                    className={`py-1 px-3 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                      selectedDomain === d.id
                        ? 'bg-brand-deep-green text-white border-brand-deep-green font-bold'
                        : 'bg-white text-stone-600 border-brand-warm-stone/60 hover:text-brand-ink'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Context Items List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                <span>{filteredContextItems.length} verified context items</span>
              </div>

              {filteredContextItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-2xl border border-brand-warm-stone/60 shadow-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-ink">
                          {item.key}
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-[#F7F3EC] text-brand-ink/70 px-2 py-0.5 rounded-md border border-brand-warm-stone/50">
                          {item.domain}
                        </span>
                      </div>
                      <p className="text-xs text-brand-ink/75 leading-relaxed mt-1">
                        {item.value}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteContextItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      aria-label="Delete rule"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Provenance Metadata */}
                  <div className="pt-2 border-t border-brand-warm-stone/30 flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-500">
                    <span className="font-mono bg-[#F7F3EC] px-2 py-0.5 rounded border border-brand-warm-stone/40">
                      Provenance: {item.provenance.provider}
                    </span>

                    <div className="flex items-center gap-2">
                      <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                      <span>•</span>
                      <span>{item.horizon === 'persistent_long_term' ? 'Bedrock' : 'Active Horizon'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Export & Code Actions */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJson}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-[#F7F3EC] border border-brand-warm-stone/70 rounded-2xl text-xs font-semibold text-brand-deep-green flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Download size={13} />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="py-2.5 px-4 bg-white hover:bg-[#F7F3EC] border border-brand-warm-stone/70 rounded-2xl text-xs font-semibold text-stone-600 flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <FileJson size={13} />
                  <span>{showRawJson ? 'Hide Raw JSON' : 'View Raw JSON'}</span>
                </button>
              </div>

              {showRawJson && (
                <div className="bg-[#162B25] text-white p-4 rounded-2xl text-[10px] font-mono overflow-x-auto max-h-60 border border-white/10">
                  <pre>{JSON.stringify(contextItems, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALIBRATION MODAL DRAWER FOR TILES */}
        <AnimatePresence>
          {selectedTile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4 border border-brand-warm-stone/60 shadow-xl max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-brand-warm-stone/30 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
                      Calibrate Domain
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-ink">
                      {selectedTile.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedTile(null)}
                    className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-brand-ink block">
                      Enduring Tendency (Long Horizon)
                    </label>
                    <textarea
                      value={editedTendency}
                      onChange={(e) => setEditedTendency(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 rounded-xl border border-brand-warm-stone/70 bg-[#F7F3EC] focus:outline-none focus:ring-1 focus:ring-brand-deep-green leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-brand-ink block">
                      Current Focus (Short Horizon)
                    </label>
                    <textarea
                      value={editedFocus}
                      onChange={(e) => setEditedFocus(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-xl border border-brand-warm-stone/70 bg-[#F7F3EC] focus:outline-none focus:ring-1 focus:ring-brand-deep-green leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedTile(null)}
                    className="px-4 py-2 rounded-full border border-stone-300 text-xs font-medium text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCalibration}
                    className="px-5 py-2 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs font-bold shadow-xs"
                  >
                    Save Horizons
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL MONOGRAPH READER MODAL */}
        <AnimatePresence>
          {isFullPortraitOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#F7F3EC] overflow-y-auto"
            >
              <div className="sticky top-0 z-30 bg-[#F7F3EC]/90 backdrop-blur-md border-b border-brand-warm-stone/40 px-4 py-3 flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-brand-ink">
                  Life Portrait Monograph
                </span>
                <button
                  onClick={() => setIsFullPortraitOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-300"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-w-xl mx-auto px-4 py-8 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
                    Monograph · 4 Chapters
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ink">
                    "{persona.lifeNarrative.manifestoHeadline}"
                  </h2>
                  <p className="font-serif italic text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    {persona.lifeNarrative.openingSummary}
                  </p>
                </div>

                <div className="space-y-12">
                  {persona.lifeNarrative.chapters.map((chapter, idx) => (
                    <div key={chapter.id} className="space-y-4">
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100">
                        <Image
                          src={chapter.image || '/images/hero_srilanka_villa.jpg'}
                          alt={chapter.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-brand-terracotta font-bold">
                            Chapter {idx + 1}
                          </span>
                          <button
                            onClick={() => handleStartEditChapter(chapter.id, chapter.body)}
                            className="text-[11px] text-stone-500 hover:text-brand-ink flex items-center gap-1 font-medium"
                          >
                            <Edit3 size={11} />
                            <span>{editingChapterId === chapter.id ? 'Cancel' : 'Calibrate'}</span>
                          </button>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-brand-ink">
                          {chapter.title}
                        </h3>
                        <p className="font-serif italic text-xs text-stone-600">
                          {chapter.subtitle}
                        </p>

                        {editingChapterId === chapter.id ? (
                          <div className="space-y-2 pt-1">
                            <textarea
                              value={editedChapterBody}
                              onChange={(e) => setEditedChapterBody(e.target.value)}
                              rows={5}
                              className="w-full text-xs font-serif p-3 rounded-xl border border-brand-warm-stone/70 bg-white focus:outline-none focus:ring-1 focus:ring-brand-deep-green leading-relaxed"
                            />
                            <button
                              onClick={() => handleSaveChapterEdit(chapter.id)}
                              className="px-4 py-1.5 rounded-full bg-brand-deep-green text-white text-xs font-bold"
                            >
                              Save Correction
                            </button>
                          </div>
                        ) : (
                          <p className="font-serif text-xs sm:text-sm text-brand-ink/85 leading-relaxed">
                            {chapter.body}
                          </p>
                        )}

                        <blockquote className="border-l-2 border-brand-terracotta pl-3 py-1 text-xs font-serif italic text-stone-700">
                          "{chapter.pullQuote}"
                        </blockquote>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-brand-warm-stone/40 text-center">
                  <button
                    onClick={() => setIsFullPortraitOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-brand-deep-green text-white text-xs font-bold shadow-xs"
                  >
                    Close Monograph
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AppShell>
  );
}
