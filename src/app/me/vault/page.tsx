'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';
import {
  IconArrowLeft,
  IconCheck,
  IconClose,
  IconDownload,
  IconEdit,
  IconPlus,
  IconSearch,
  IconShieldPrivacy,
  IconTrash,
} from '@/components/ui/BrandIcons';

export default function PersonalVaultPage() {
  const {
    persona,
    geography,
    setGeography,
    contextItems,
    addContextItem,
    updateContextItem,
    deleteContextItem,
    deleteAllPersonalContext,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRawJson, setShowRawJson] = useState(false);

  // Add / Edit Rule States
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [ruleKind, setRuleKind] = useState<'preference' | 'constraint'>('preference');
  const [ruleKey, setRuleKey] = useState('');
  const [ruleValue, setRuleValue] = useState('');

  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editRuleValue, setEditRuleValue] = useState('');

  const filtered = contextItems.filter(
    (item) =>
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const affinities = filtered.filter(
    (i) => i.type !== 'constraint' && i.type !== 'dislike'
  );
  const boundaries = filtered.filter(
    (i) => i.type === 'constraint' || i.type === 'dislike'
  );

  const handleExportVaultJson = () => {
    const payload = {
      schema: 'undernote.personal-context.v1',
      exportedAt: new Date().toISOString(),
      homeCity: geography === 'singapore-sin' ? 'Singapore' : 'Bangalore',
      persona: {
        userName: persona.userName,
        title: persona.title,
      },
      contextItems,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataStr);
    anchor.setAttribute('download', `undernote_personal_context_${Date.now()}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    showToast('Portable Personal Context JSON exported');
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleKey.trim() || !ruleValue.trim()) return;
    addContextItem({
      domain: ruleKind === 'constraint' ? 'what-matters' : 'events',
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
        provider: ruleKind === 'constraint' ? 'Hard Boundary' : 'Personal Taste',
      },
    });
    setRuleKey('');
    setRuleValue('');
    setIsAddRuleOpen(false);
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory pb-10">
        {/* Sticky Sub-Page Header */}
        <header className="sticky top-0 z-30 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-warm-stone/60 px-5 py-3.5 flex items-center justify-between">
          <Link
            href="/me"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:text-brand-deep-green transition-colors"
          >
            <IconArrowLeft size={16} />
            <span>Back to Portrait</span>
          </Link>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
            Personal Vault
          </span>
        </header>

        <div className="px-5 pt-5 space-y-6">
          {/* ================================================================
              1. STORAGE & DATA OWNERSHIP CONTROLS
             ================================================================ */}
          <section className="editorial-surface rounded-[24px] p-4 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <IconShieldPrivacy size={17} className="text-brand-deep-green shrink-0" />
                <h1 className="text-sm font-semibold text-brand-ink">
                  Storage & Ownership
                </h1>
              </div>
              <span className="text-[10px] font-semibold text-brand-deep-green bg-[#E7EFEA] px-2.5 py-0.5 rounded-full">
                Yours to control
              </span>
            </div>

            <div className="space-y-2">
              <div className="rounded-2xl bg-[#F2ECE1] border border-brand-deep-green/35 p-3 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-brand-ink">
                      Undernote Secure Cloud
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-ink-light mt-0.5">
                    Encrypted, never used for ads, 1-tap deletable below.
                  </p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-deep-green shrink-0">
                  Active
                </span>
              </div>

              {/* Compact Upcoming Storage Connectors */}
              <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                {[
                  { label: 'On-Device', sub: 'Soon' },
                  { label: 'Drive / iCloud', sub: 'Soon' },
                  { label: 'Other Apps', sub: 'Soon' },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className="rounded-xl bg-brand-ivory border border-brand-warm-stone/75 px-2.5 py-2 text-center"
                  >
                    <span className="text-[11px] font-semibold text-brand-ink/75 block truncate">
                      {opt.label}
                    </span>
                    <span className="text-[9.5px] font-medium text-brand-terracotta uppercase tracking-wider">
                      {opt.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export / Inspect / Delete Bar */}
            <div className="pt-2.5 border-t border-brand-warm-stone/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportVaultJson}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-deep-green hover:text-brand-terracotta cursor-pointer"
                >
                  <IconDownload size={14} />
                  <span>Export `.json`</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="text-xs font-medium text-brand-ink-light hover:text-brand-ink cursor-pointer"
                >
                  {showRawJson ? 'Hide raw' : 'View raw'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      'Permanently delete your entire Personal Context Vault? This wipes all stored preferences and boundaries immediately.'
                    )
                  ) {
                    deleteAllPersonalContext();
                  }
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 hover:text-rose-800 cursor-pointer"
              >
                <IconTrash size={13.5} />
                <span>Delete Vault</span>
              </button>
            </div>

            {showRawJson && (
              <div className="rounded-2xl bg-[#141C1A] text-brand-ivory p-3.5 text-[10.5px] font-mono overflow-x-auto max-h-56">
                <pre>{JSON.stringify(contextItems, null, 2)}</pre>
              </div>
            )}

            {/* Home City Switcher (Applies to Live Events Feed) */}
            <div className="pt-2.5 border-t border-brand-warm-stone/60 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-brand-ink block">
                  Home City for Events
                </span>
                <span className="text-[10.5px] text-brand-ink-light">
                  Switches local calendar & currency
                </span>
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
          </section>

          {/* ================================================================
              2. RAW EDITABLE CONTEXT LEDGER (SEARCH, ADD, EDIT, DELETE)
             ================================================================ */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-serif text-lg font-medium text-brand-ink">
                  Stored Signals ({contextItems.length})
                </h2>
                <p className="text-[11.5px] text-brand-ink-light">
                  Every rule powering your portrait and matched events.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddRuleOpen(true)}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
              >
                <IconPlus size={13} />
                <span>Add Rule</span>
              </button>
            </div>

            {contextItems.length > 3 && (
              <div className="relative">
                <IconSearch
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink-light"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your stored rules…"
                  className="w-full text-xs py-2.5 pl-9 pr-3.5 rounded-full bg-[#FCFBF8] border border-brand-warm-stone/85 text-brand-ink focus:outline-none focus:border-brand-deep-green"
                />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-brand-warm-stone bg-[#FCFBF8]/75 p-6 text-center space-y-2">
                <p className="text-xs font-semibold text-brand-ink">No signals stored yet</p>
                <p className="text-[11.5px] text-brand-ink-light">
                  Add a preference manually above or swipe the visual taste cards.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {affinities.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-deep-green block">
                      What Draws You In ({affinities.length})
                    </span>
                    {affinities.map((item) => (
                      <div
                        key={item.id}
                        className="editorial-surface rounded-[20px] p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-brand-ink">
                              {item.key}
                            </span>
                            <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#EFE9DE] text-brand-ink-light">
                              {item.provenance.provider}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRuleId(item.id);
                                setEditRuleValue(item.value);
                              }}
                              aria-label="Edit rule"
                              className="p-1 text-brand-ink-light hover:text-brand-deep-green cursor-pointer"
                            >
                              <IconEdit size={13.5} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteContextItem(item.id)}
                              aria-label="Delete rule"
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
                                className="text-[11px] font-semibold bg-brand-deep-green text-brand-ivory px-3 py-1 rounded-full inline-flex items-center gap-1 cursor-pointer"
                              >
                                <IconCheck size={12} />
                                <span>Save</span>
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
                )}

                {boundaries.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                      Non-Negotiable Boundaries ({boundaries.length})
                    </span>
                    {boundaries.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[20px] bg-[#F2ECE1] border border-brand-warm-stone/90 p-4 space-y-1.5"
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
                              aria-label="Edit boundary"
                              className="p-1 text-brand-ink-light hover:text-brand-deep-green cursor-pointer"
                            >
                              <IconEdit size={13.5} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteContextItem(item.id)}
                              aria-label="Delete boundary"
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
                )}
              </div>
            )}
          </section>
        </div>

        {/* Add Rule Bottom Sheet */}
        <AnimatePresence>
          {isAddRuleOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setIsAddRuleOpen(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] p-6 space-y-4 border-t border-brand-warm-stone shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    Add to Personal Vault
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
                          ? 'bg-brand-terracotta text-white border-brand-terracotta'
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
                    Save to Vault
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
