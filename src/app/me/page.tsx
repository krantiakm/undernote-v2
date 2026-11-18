'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { useApp } from '@/context/AppContext';
import { LookbookTile } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
import {
  IconArrowRight,
  IconCheck,
  IconClose,
  IconEdit,
  IconPlus,
  IconShieldPrivacy,
  IconSparkNote,
  IconTrash,
  IconVenuePin,
} from '@/components/ui/BrandIcons';

export default function MePage() {
  const {
    persona,
    geography,
    setGeography,
    updatePersona,
    contextItems,
    addContextItem,
    updateContextItem,
    deleteContextItem,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'lookbook' | 'preferences'>('lookbook');
  const [selectedTile, setSelectedTile] = useState<LookbookTile | null>(null);

  // Edit summary state
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(persona.lifeNarrative.openingSummary);

  // Add / Edit preference state
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [ruleKind, setRuleKind] = useState<'preference' | 'constraint'>('preference');
  const [ruleKey, setRuleKey] = useState('');
  const [ruleValue, setRuleValue] = useState('');

  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editRuleValue, setEditRuleValue] = useState('');

  const affinities = contextItems.filter(
    (i) => i.type !== 'constraint' && i.type !== 'dislike'
  );
  const boundaries = contextItems.filter(
    (i) => i.type === 'constraint' || i.type === 'dislike'
  );

  const handleSaveBio = () => {
    updatePersona({
      lifeNarrative: {
        ...persona.lifeNarrative,
        openingSummary: bioDraft.trim() || persona.lifeNarrative.openingSummary,
      },
    });
    setIsEditingBio(false);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleKey.trim() || !ruleValue.trim()) return;
    addContextItem({
      domain: 'events',
      type: ruleKind,
      key: ruleKey.trim(),
      value: ruleValue.trim(),
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 1.0,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: {
        provider: ruleKind === 'constraint' ? 'Quiet Boundary' : 'Personal Taste',
      },
    });
    setRuleKey('');
    setRuleValue('');
    setIsAddRuleOpen(false);
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        <TopHeader />

        <div className="px-5 pt-5 pb-8 space-y-6 flex-1">
          {/* ================================================================
              1. CULTURAL PORTRAIT CARD
             ================================================================ */}
          <section className="relative overflow-hidden rounded-[26px] bg-brand-deep-green text-brand-ivory p-5 shadow-card space-y-4">
            <TopographicPattern
              className="absolute inset-0 w-full h-full"
              strokeColor="#9DB6A9"
              opacity={0.18}
            />

            <div className="relative z-10 space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-brand-sage-light block">
                    {persona.locationAnchor}
                  </span>
                  <h1 className="font-serif text-[23px] leading-[1.2] font-medium text-brand-ivory">
                    {persona.userName || 'Kranti'}
                  </h1>
                  <p className="text-xs text-brand-sage-light font-medium">
                    {persona.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBioDraft(persona.lifeNarrative.openingSummary);
                    setIsEditingBio(!isEditingBio);
                  }}
                  aria-label="Edit personal summary"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-brand-ivory flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <IconEdit size={14} accent="#F7F3EC" />
                </button>
              </div>

              {isEditingBio ? (
                <div className="space-y-2.5">
                  <textarea
                    rows={4}
                    value={bioDraft}
                    onChange={(e) => setBioDraft(e.target.value)}
                    className="w-full rounded-2xl bg-black/25 border border-white/20 p-3 text-xs text-brand-ivory leading-relaxed focus:outline-none focus:border-brand-terracotta"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingBio(false)}
                      className="px-3.5 py-1.5 rounded-full text-xs text-brand-ivory/80 hover:text-brand-ivory cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveBio}
                      className="px-4 py-1.5 rounded-full bg-brand-terracotta text-brand-ivory text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <IconCheck size={13} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-serif text-[13px] text-brand-ivory/88 leading-[1.62]">
                  {persona.lifeNarrative.openingSummary}
                </p>
              )}

              <div className="pt-1 flex items-center justify-between gap-3 border-t border-white/12">
                <span className="brand-rule-sm" />
                <Link
                  href="/import"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-ivory text-brand-deep-green text-[11.5px] font-semibold hover:bg-white transition-colors"
                >
                  <IconSparkNote size={13} />
                  <span>Import from AI</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ================================================================
              2. SEGMENTED SWITCHER: TASTE LOOKBOOK vs PREFERENCES
             ================================================================ */}
          <div className="p-1 rounded-full bg-[#EFE9DE] border border-brand-warm-stone/70 grid grid-cols-2">
            <button
              type="button"
              onClick={() => setActiveTab('lookbook')}
              className={`py-2 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === 'lookbook'
                  ? 'bg-brand-deep-green text-brand-ivory font-semibold shadow-xs'
                  : 'text-brand-ink/70 font-medium hover:text-brand-ink'
              }`}
            >
              Taste Lookbook
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preferences')}
              className={`py-2 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === 'preferences'
                  ? 'bg-brand-deep-green text-brand-ivory font-semibold shadow-xs'
                  : 'text-brand-ink/70 font-medium hover:text-brand-ink'
              }`}
            >
              Preferences ({contextItems.length})
            </button>
          </div>

          {activeTab === 'lookbook' ? (
            <div className="space-y-6">
              {/* 2-Column Editorial Lookbook Mosaic */}
              <div className="grid grid-cols-2 gap-3">
                {persona.lookbookTiles.map((tile, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTile(tile)}
                    className="editorial-surface rounded-[20px] overflow-hidden text-left group flex flex-col cursor-pointer transition-all hover:shadow-card"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE9DE]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveAssetUrl(tile.heroImage)}
                        alt={tile.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block truncate">
                          {tile.pillarName || tile.domain}
                        </span>
                        <h3 className="font-sans text-[13.5px] font-semibold text-brand-ink leading-snug">
                          {tile.title}
                        </h3>
                        <p className="font-serif text-[11.5px] text-brand-ink-light leading-relaxed line-clamp-2">
                          {tile.pullQuote}
                        </p>
                      </div>
                      <div className="pt-1.5">
                        <span className="brand-rule-sm" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Cultural Rhythm Chapters */}
              {persona.lifeNarrative.chapters.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light block">
                    How You Step Out
                  </span>
                  {persona.lifeNarrative.chapters.map((ch) => (
                    <div
                      key={ch.id}
                      className="editorial-surface rounded-[22px] p-4 space-y-2"
                    >
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                        {ch.subtitle}
                      </span>
                      <h4 className="font-sans text-base font-semibold text-brand-ink">
                        {ch.title}
                      </h4>
                      <p className="font-serif text-[13px] text-brand-ink/80 leading-relaxed">
                        {ch.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ================================================================
               PLAIN-ENGLISH PREFERENCES & QUIET BOUNDARIES
               ================================================================ */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-brand-ink-light">
                  Everything here is yours to edit or remove at any time.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddRuleOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-deep-green text-brand-ivory text-[11px] font-semibold shrink-0 cursor-pointer"
                >
                  <IconPlus size={12} />
                  <span>Add</span>
                </button>
              </div>

              {/* Group 1: What Draws You In */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-deep-green block">
                  What Draws You In
                </span>
                {affinities.map((item) => (
                  <div
                    key={item.id}
                    className="editorial-surface rounded-[20px] p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-brand-ink">
                        {item.key}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingRuleId(item.id);
                            setEditRuleValue(item.value);
                          }}
                          aria-label="Edit preference"
                          className="p-1 text-brand-ink-light hover:text-brand-deep-green cursor-pointer"
                        >
                          <IconEdit size={13.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteContextItem(item.id)}
                          aria-label="Delete preference"
                          className="p-1 text-brand-ink-light hover:text-brand-terracotta cursor-pointer"
                        >
                          <IconTrash size={13.5} />
                        </button>
                      </div>
                    </div>

                    {editingRuleId === item.id ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={2}
                          value={editRuleValue}
                          onChange={(e) => setEditRuleValue(e.target.value)}
                          className="w-full text-xs rounded-xl bg-brand-ivory border border-brand-warm-stone p-2.5 text-brand-ink focus:outline-none focus:border-brand-deep-green"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingRuleId(null)}
                            className="text-[11px] text-brand-ink-light px-2.5 py-1 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateContextItem(item.id, { value: editRuleValue.trim() });
                              setEditingRuleId(null);
                            }}
                            className="text-[11px] font-semibold bg-brand-deep-green text-brand-ivory px-3 py-1 rounded-full cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-brand-ink/80 leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Group 2: Quiet Boundaries (Hard Dealbreakers) */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                  Non-Negotiable Boundaries
                </span>
                {boundaries.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[20px] bg-[#F2ECE1] border border-brand-warm-stone/85 p-4 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-brand-ink">
                        {item.key}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteContextItem(item.id)}
                        aria-label="Delete boundary"
                        className="p-1 text-brand-ink-light hover:text-brand-terracotta cursor-pointer"
                      >
                        <IconTrash size={13.5} />
                      </button>
                    </div>
                    <p className="text-xs text-brand-ink/80 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              3. QUIET HOME CITY SETTING & DATA OWNERSHIP FOOTER
             ================================================================ */}
          <section className="pt-2 space-y-3 border-t border-brand-warm-stone/60">
            <div className="editorial-surface rounded-[20px] p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <IconVenuePin size={16} className="text-brand-deep-green shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-brand-ink block leading-tight">
                    Home City
                  </span>
                  <span className="text-[11px] text-brand-ink-light">
                    Events & venues scoped to your local calendar
                  </span>
                </div>
              </div>

              <div className="inline-flex p-0.5 rounded-full bg-[#EFE9DE] border border-brand-warm-stone/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setGeography('india-blr')}
                  className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                    geography === 'india-blr'
                      ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                      : 'text-brand-ink-light font-medium'
                  }`}
                >
                  Bangalore
                </button>
                <button
                  type="button"
                  onClick={() => setGeography('singapore-sin')}
                  className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                    geography === 'singapore-sin'
                      ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                      : 'text-brand-ink-light font-medium'
                  }`}
                >
                  Singapore
                </button>
              </div>
            </div>

            <Link
              href="/data"
              className="editorial-surface rounded-[20px] p-4 flex items-center justify-between gap-3 group hover:border-brand-deep-green/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <IconShieldPrivacy size={16} className="text-brand-deep-green shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-brand-ink block leading-tight">
                    Your Private Data & JSON Export
                  </span>
                  <span className="text-[11px] text-brand-ink-light">
                    Zero ad tracking · Export or clear anytime
                  </span>
                </div>
              </div>
              <IconArrowRight
                size={15}
                className="text-brand-ink-light group-hover:text-brand-deep-green transition-colors shrink-0"
              />
            </Link>
          </section>
        </div>

        {/* Lookbook Tile Detail Sheet */}
        <AnimatePresence>
          {selectedTile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setSelectedTile(null)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] overflow-hidden border-t border-brand-warm-stone shadow-elevated"
              >
                <div className="relative aspect-[16/9] w-full bg-[#EFE9DE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveAssetUrl(selectedTile.heroImage)}
                    alt={selectedTile.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedTile(null)}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-brand-ivory/90 text-brand-ink flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>

                <div className="p-6 space-y-3.5">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta block">
                    {selectedTile.pillarName || 'Cultural Pillar'} · {selectedTile.localAnchor}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    {selectedTile.title}
                  </h3>
                  <p className="font-serif italic text-xs text-brand-ink-light">
                    “{selectedTile.pullQuote}”
                  </p>
                  <div className="rounded-2xl bg-[#F2ECE1] p-3.5 space-y-2 border border-brand-warm-stone/65 text-xs">
                    <div>
                      <span className="font-semibold text-brand-deep-green block">
                        Enduring Taste
                      </span>
                      <p className="text-brand-ink/80 mt-0.5 leading-relaxed">
                        {selectedTile.enduringTendency}
                      </p>
                    </div>
                    <div className="pt-1 border-t border-brand-warm-stone/50">
                      <span className="font-semibold text-brand-terracotta block">
                        Current Focus
                      </span>
                      <p className="text-brand-ink/80 mt-0.5 leading-relaxed">
                        {selectedTile.currentFocus}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Preference or Boundary Sheet */}
        <AnimatePresence>
          {isAddRuleOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setIsAddRuleOpen(false)}
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
                    Add a Preference
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddRuleOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#EFE9DE] flex items-center justify-center text-brand-ink cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>

                <form onSubmit={handleCreateRule} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRuleKind('preference')}
                      className={`py-2.5 px-3 rounded-full text-xs font-semibold border cursor-pointer ${
                        ruleKind === 'preference'
                          ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green'
                          : 'bg-[#FCFBF8] text-brand-ink border-brand-warm-stone'
                      }`}
                    >
                      What Draws Me In
                    </button>
                    <button
                      type="button"
                      onClick={() => setRuleKind('constraint')}
                      className={`py-2.5 px-3 rounded-full text-xs font-semibold border cursor-pointer ${
                        ruleKind === 'constraint'
                          ? 'bg-brand-terracotta text-brand-ivory border-brand-terracotta'
                          : 'bg-[#FCFBF8] text-brand-ink border-brand-warm-stone'
                      }`}
                    >
                      Hard Boundary
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Short Label
                    </label>
                    <input
                      type="text"
                      required
                      value={ruleKey}
                      onChange={(e) => setRuleKey(e.target.value)}
                      placeholder="e.g., Sunday Evenings Protected"
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      In plain words
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={ruleValue}
                      onChange={(e) => setRuleValue(e.target.value)}
                      placeholder="e.g., Keep Sunday after 5 PM free so the week starts rested."
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save to Profile
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
