'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Users,
  ShieldCheck,
  Sparkles,
  Lock,
  Clock,
  Copy,
  Check,
  Plus,
  Trash2,
  ChevronRight,
  Download,
  X,
  SlidersHorizontal,
  BookOpen,
  Layers,
} from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';
import { ContextHorizon, ContextItemData, RadarDomain } from '@/types';

export default function MePage() {
  const {
    persona,
    contextItems,
    intents,
    addContextItem,
    deleteContextItem,
    showToast,
  } = useApp();

  // Active sheets / modals for progressive disclosure
  const [activeSheet, setActiveSheet] = useState<'dna' | 'story' | 'add' | null>(null);
  const [horizonTab, setHorizonTab] = useState<ContextHorizon>('persistent_long_term');
  const [selectedToken, setSelectedToken] = useState<{
    token: string;
    ruleKey: string;
    impactSummary: string;
  } | null>(null);

  const [hasCopiedExport, setHasCopiedExport] = useState(false);

  // Add rule state
  const [newDomain, setNewDomain] = useState<RadarDomain>('my-world');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newHorizon, setNewHorizon] = useState<ContextHorizon>('persistent_long_term');

  // Filter items by selected horizon
  const filteredItems = contextItems.filter((item) => item.horizon === horizonTab);

  // SVG Radar Polygon points computation
  const dnaScores = persona.dnaScores;
  const axes = [
    { label: 'Family Calm', value: dnaScores.familySanctuary, angle: 0 },
    { label: 'Craft Ethics', value: dnaScores.craftSovereignty, angle: 60 },
    { label: 'Compact Hardware', value: dnaScores.minimalistHardware, angle: 120 },
    { label: 'Zero Friction Travel', value: dnaScores.lowFrictionTravel, angle: 180 },
    { label: 'Specialty Coffee', value: dnaScores.specialtyCoffee, angle: 240 },
    { label: 'Acoustic Arts', value: dnaScores.culturalArts, angle: 300 },
  ];

  const center = 100;
  const maxRadius = 75;

  const getCoordinates = (value: number, angleDeg: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angleRad);
    const y = center + r * Math.sin(angleRad);
    return { x, y };
  };

  const polygonPoints = axes
    .map((a) => {
      const { x, y } = getCoordinates(a.value, a.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const handleCopyMarkdownExport = () => {
    const markdown = `# Undernote Personal Context Capsule
**Persona**: ${persona.title}
**Location**: ${persona.locationAnchor} (${persona.homeAirport})
**Family**: ${persona.familyComposition}

## Persistent Bedrock Rules
${contextItems
  .filter((c) => c.horizon === 'persistent_long_term')
  .map((c) => `- **${c.key}**: ${c.value}`)
  .join('\n')}

## Active Short-Term Horizons
${intents
  .map((i) => `- **${i.title}**: ${i.description} (${i.daysRemaining} days left)`)
  .join('\n')}
`;

    navigator.clipboard.writeText(markdown);
    setHasCopiedExport(true);
    showToast('Context Capsule copied! Paste into any AI model.');
    setTimeout(() => setHasCopiedExport(false), 2500);
  };

  const handleAddRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;

    addContextItem({
      domain: newDomain,
      type: 'constraint',
      key: newKey.trim(),
      value: newValue.trim(),
      durability: newHorizon === 'persistent_long_term' ? 'durable' : 'medium_lived',
      horizon: newHorizon,
      confidence: 1.0,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: { provider: 'User Direct Input' },
    });

    setNewKey('');
    setNewValue('');
    setActiveSheet(null);
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory p-4 space-y-4 pb-12">
        {/* 1. CLEAN CONSUMER PROFILE HERO */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-brand-deep-green text-brand-ivory flex items-center justify-center text-xl font-bold border-2 border-brand-terracotta shadow-md">
              K
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif text-xl font-bold text-brand-ink">Kranti</h1>
                <span className="text-[10px] font-semibold bg-brand-deep-green text-white px-2 py-0.5 rounded-full">
                  Sovereign
                </span>
              </div>
              <p className="text-xs text-brand-ink-light font-medium">
                The Mindful Craftsperson
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyMarkdownExport}
            className="flex items-center gap-1 text-xs font-semibold bg-white text-brand-deep-green border border-brand-warm-stone/80 px-3 py-1.5 rounded-full shadow-xs hover:bg-brand-ivory transition-all active:scale-95"
          >
            {hasCopiedExport ? <Check size={12} className="text-emerald-600" /> : <Download size={12} />}
            <span>{hasCopiedExport ? 'Exported' : 'Export'}</span>
          </button>
        </div>

        {/* Location & Family Pills */}
        <div className="flex items-center gap-2 text-[11px] text-brand-ink-muted">
          <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-brand-warm-stone/50 shadow-xs">
            <MapPin size={11} className="text-brand-terracotta" />
            <span>Bangalore (BLR)</span>
          </span>
          <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-brand-warm-stone/50 shadow-xs">
            <Users size={11} className="text-emerald-700" />
            <span>Married · 1 Child (7yo)</span>
          </span>
        </div>

        {/* 2. REVEAL-ON-TAP HUB CARDS */}

        {/* CARD A: 6-Axis Lifestyle DNA (Tap to open full matrix) */}
        <div
          onClick={() => setActiveSheet('dna')}
          className="bg-white rounded-3xl p-4 border border-brand-warm-stone/60 shadow-soft hover:shadow-card transition-all cursor-pointer group space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-deep-green/10 flex items-center justify-center text-brand-deep-green">
                <SlidersHorizontal size={15} />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-brand-ink">
                  6-Axis Lifestyle DNA
                </h3>
                <p className="text-[11px] text-brand-ink-light">
                  95% Sovereign Match Calibration
                </p>
              </div>
            </div>

            <ChevronRight size={16} className="text-brand-ink-light group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Mini Preview Polygon */}
          <div className="h-16 flex items-center justify-between px-2 bg-brand-ivory rounded-2xl border border-brand-warm-stone/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <polygon
                    points={polygonPoints}
                    fill="rgba(36, 72, 63, 0.3)"
                    stroke="#24483F"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="text-[11px] text-brand-ink-muted">
                <span>Family Calm (98%) · Hardware (95%) · Coffee (92%)</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-brand-terracotta">
              View Matrix →
            </span>
          </div>
        </div>

        {/* CARD B: Living Story Tapestry (Tap to open story) */}
        <div
          onClick={() => setActiveSheet('story')}
          className="bg-white rounded-3xl p-4 border border-brand-warm-stone/60 shadow-soft hover:shadow-card transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta">
                <BookOpen size={15} />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-brand-ink">
                  Living Story Tapestry
                </h3>
                <p className="text-[11px] text-brand-ink-light">
                  Editorial biography with interactive context tokens
                </p>
              </div>
            </div>

            <ChevronRight size={16} className="text-brand-ink-light group-hover:translate-x-0.5 transition-transform" />
          </div>

          <p className="text-xs text-brand-ink-muted line-clamp-1 bg-brand-ivory p-2.5 rounded-2xl border border-brand-warm-stone/30 italic">
            &ldquo;Based in Bangalore, your lifestyle revolves around intentional, unhurried routines...&rdquo;
          </p>
        </div>

        {/* 3. DUAL HORIZON BEDROCK REGISTRY */}
        <div className="bg-white rounded-3xl p-4 border border-brand-warm-stone/60 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm font-bold text-brand-ink">
                Dual Horizon Rules
              </h3>
              <p className="text-[11px] text-brand-ink-light">
                {horizonTab === 'persistent_long_term'
                  ? 'Permanent Bedrock (Never expires)'
                  : 'Active Short-Term Planning Goals'}
              </p>
            </div>

            <button
              onClick={() => setActiveSheet('add')}
              className="flex items-center gap-1 text-[11px] font-semibold bg-brand-deep-green text-white px-2.5 py-1 rounded-full shadow-xs hover:bg-brand-deep-green-dark transition-all active:scale-95"
            >
              <Plus size={12} />
              <span>Add Rule</span>
            </button>
          </div>

          {/* Segmented Horizon Control */}
          <div className="flex p-1 bg-brand-warm-stone/25 rounded-full border border-brand-warm-stone/40 gap-1">
            <button
              onClick={() => setHorizonTab('persistent_long_term')}
              className={`flex-1 py-1 text-xs font-medium rounded-full flex items-center justify-center gap-1 transition-all ${
                horizonTab === 'persistent_long_term'
                  ? 'bg-white text-brand-deep-green font-semibold shadow-xs'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Lock size={11} />
              <span>🔒 Bedrock ({contextItems.filter((c) => c.horizon === 'persistent_long_term').length})</span>
            </button>

            <button
              onClick={() => setHorizonTab('active_short_term')}
              className={`flex-1 py-1 text-xs font-medium rounded-full flex items-center justify-center gap-1 transition-all ${
                horizonTab === 'active_short_term'
                  ? 'bg-white text-brand-deep-green font-semibold shadow-xs'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Clock size={11} />
              <span>⏱️ Active ({contextItems.filter((c) => c.horizon === 'active_short_term').length})</span>
            </button>
          </div>

          {/* Minimal Rule List */}
          <div className="space-y-2 divide-y divide-brand-warm-stone/20">
            {filteredItems.map((item) => (
              <div key={item.id} className="pt-2 flex items-start justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-brand-ink">{item.key}</span>
                    {item.expiryCountdown && (
                      <span className="text-[9px] font-semibold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full">
                        {item.expiryCountdown}
                      </span>
                    )}
                  </div>
                  <p className="text-brand-ink-muted text-[11px] leading-snug">
                    {item.value}
                  </p>
                </div>

                <button
                  onClick={() => deleteContextItem(item.id)}
                  className="text-brand-ink-light hover:text-rose-600 p-1 shrink-0"
                  aria-label="Delete rule"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MODALS & SHEETS (Revealed On Tap) */}

        {/* MODAL 1: DNA MATRIX SHEET */}
        <AnimatePresence>
          {activeSheet === 'dna' && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="w-full max-w-md bg-brand-ivory rounded-t-3xl sm:rounded-3xl p-5 border border-brand-warm-stone shadow-2xl max-h-[85vh] overflow-y-auto space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/40">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    6-Axis Lifestyle DNA Matrix
                  </h3>
                  <button
                    onClick={() => setActiveSheet(null)}
                    className="w-7 h-7 rounded-full bg-brand-warm-stone/40 flex items-center justify-center"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* SVG Radar */}
                <div className="flex items-center justify-center py-2">
                  <div className="w-56 h-56">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => (
                        <circle
                          key={i}
                          cx={center}
                          cy={center}
                          r={maxRadius * ratio}
                          fill="none"
                          stroke="#DDD6CB"
                          strokeWidth="1"
                          strokeDasharray="2 3"
                        />
                      ))}
                      {axes.map((a, i) => {
                        const { x, y } = getCoordinates(100, a.angle);
                        return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#DDD6CB" strokeWidth="1" />;
                      })}
                      <polygon
                        points={polygonPoints}
                        fill="rgba(36, 72, 63, 0.25)"
                        stroke="#24483F"
                        strokeWidth="2.5"
                      />
                      {axes.map((a, i) => {
                        const { x, y } = getCoordinates(a.value, a.angle);
                        return <circle key={i} cx={x} cy={y} r="4" fill="#C66E45" stroke="#FFFFFF" strokeWidth="1.5" />;
                      })}
                    </svg>
                  </div>
                </div>

                {/* Dimension Details */}
                <div className="space-y-2">
                  {axes.map((a, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-2xl border border-brand-warm-stone/40 flex items-center justify-between text-xs">
                      <span className="font-medium text-brand-ink">{a.label}</span>
                      <span className="font-bold text-brand-deep-green">{a.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: LIVING STORY SHEET */}
        <AnimatePresence>
          {activeSheet === 'story' && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="w-full max-w-md bg-brand-ivory rounded-t-3xl sm:rounded-3xl p-5 border border-brand-warm-stone shadow-2xl max-h-[85vh] overflow-y-auto space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/40">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-ink">
                      Living Story Tapestry
                    </h3>
                    <p className="text-[11px] text-brand-ink-light">
                      Tap any token to view Radar enforcement
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSheet(null)}
                    className="w-7 h-7 rounded-full bg-brand-warm-stone/40 flex items-center justify-center"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Story paragraphs */}
                <div className="space-y-3 text-xs leading-relaxed text-brand-ink-muted">
                  {persona.livingStory.map((storyItem, idx) => (
                    <p key={idx} className="bg-white p-4 rounded-2xl border border-brand-warm-stone/40">
                      {storyItem.paragraph}
                    </p>
                  ))}
                </div>

                {/* Tokens */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-semibold text-brand-ink-light block">
                    Interactive Context Tokens:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {persona.livingStory.flatMap((s) => s.tokenChips).map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedToken(chip)}
                        className="text-xs bg-brand-deep-green/10 hover:bg-brand-deep-green hover:text-white text-brand-deep-green px-3 py-1 rounded-full border border-brand-deep-green/20 transition-all font-medium"
                      >
                        ✦ {chip.token}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedToken && (
                  <div className="p-3.5 rounded-2xl bg-brand-deep-green text-brand-ivory space-y-1 animate-slide-up">
                    <span className="text-xs font-bold text-brand-terracotta-light block">
                      Token: {selectedToken.token}
                    </span>
                    <p className="text-xs text-brand-ivory/90 leading-snug">
                      {selectedToken.impactSummary}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 3: ADD RULE SHEET */}
        <AnimatePresence>
          {activeSheet === 'add' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm bg-brand-ivory rounded-3xl p-5 border border-brand-warm-stone shadow-2xl space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-brand-ink">
                    Add Context Bedrock Rule
                  </h3>
                  <button
                    onClick={() => setActiveSheet(null)}
                    className="w-7 h-7 rounded-full bg-brand-warm-stone/40 flex items-center justify-center"
                  >
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleAddRuleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">
                      Domain
                    </label>
                    <select
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value as RadarDomain)}
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                    >
                      <option value="my-world">My World & Family</option>
                      <option value="travel">Travel & Escapes</option>
                      <option value="shopping">Shopping & Hardware</option>
                      <option value="food-drink">Food & Specialty Coffee</option>
                      <option value="interests">Interests & Craft</option>
                      <option value="books">Books & Literature</option>
                      <option value="what-matters">What Matters & Values</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">
                      Horizon
                    </label>
                    <select
                      value={newHorizon}
                      onChange={(e) => setNewHorizon(e.target.value as ContextHorizon)}
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                    >
                      <option value="persistent_long_term">Persistent Bedrock (Permanent)</option>
                      <option value="active_short_term">Active Horizon (Short-Term)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">
                      Rule Title
                    </label>
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      placeholder="e.g. 'Camera Body Weight Limit'"
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">
                      Constraint Description
                    </label>
                    <textarea
                      rows={2}
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g. 'Under 500g body with full-frame sensor'"
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveSheet(null)}
                      className="text-xs text-brand-ink-light px-3 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-xs font-semibold bg-brand-deep-green text-white px-4 py-2 rounded-xl shadow-xs"
                    >
                      Save Rule
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
