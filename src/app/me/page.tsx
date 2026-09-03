'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plane,
  BookOpen,
  Ticket,
  Smartphone,
  Copy,
  Check,
  Plus,
  Trash2,
  Sliders,
  ChevronRight,
  Sparkles,
  MapPin,
  Users,
  Compass,
  Lock,
  Clock,
  X,
  Globe,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DomainMoodboardCapsule, GeographyAnchor } from '@/types';

export default function MePage() {
  const {
    geography,
    setGeography,
    persona,
    contextItems,
    intents,
    watches,
    addContextItem,
    deleteContextItem,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bedrock' | 'active'>('bedrock');
  const [selectedCapsule, setSelectedCapsule] = useState<DomainMoodboardCapsule | null>(null);
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [copiedContext, setCopiedContext] = useState(false);
  const [activeTokenModal, setActiveTokenModal] = useState<{ token: string; impact: string } | null>(null);

  // New rule form
  const [newRuleKey, setNewRuleKey] = useState('');
  const [newRuleValue, setNewRuleValue] = useState('');
  const [newRuleDomain, setNewRuleDomain] = useState<'travel' | 'books' | 'events' | 'shopping'>('travel');

  const bedrockItems = contextItems.filter((i) => i.horizon === 'persistent_long_term');
  const activeItems = contextItems.filter((i) => i.horizon === 'active_short_term');

  const handleCopyPortableContext = () => {
    const text = `# Undernote Sovereign Context Passport (${persona.locationAnchor})
Archetype: ${persona.title}
Location: ${persona.locationAnchor} (${persona.homeAirport})
Family: ${persona.familyComposition}
Currency: ${persona.currency}

## Non-Negotiable Bedrock Rules:
${bedrockItems.map((b) => `- [${b.domain.toUpperCase()}] ${b.key}: ${b.value}`).join('\n')}

## Active Intent Horizons:
${intents.map((i) => `- ${i.title} (${i.daysRemaining} days remaining)`).join('\n')}
`;

    navigator.clipboard.writeText(text);
    setCopiedContext(true);
    showToast('Sovereign Context Passport copied to clipboard');
    setTimeout(() => setCopiedContext(false), 3000);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleKey || !newRuleValue) return;

    addContextItem({
      domain: newRuleDomain,
      type: 'constraint',
      key: newRuleKey,
      value: newRuleValue,
      durability: 'durable',
      horizon: activeTab === 'bedrock' ? 'persistent_long_term' : 'active_short_term',
      confidence: 1.0,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: { provider: 'Direct Profile Entry' },
    });

    setNewRuleKey('');
    setNewRuleValue('');
    setShowAddRuleModal(false);
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'travel':
        return <Plane className="w-4 h-4 text-emerald-700" />;
      case 'books':
        return <BookOpen className="w-4 h-4 text-amber-700" />;
      case 'events':
        return <Ticket className="w-4 h-4 text-rose-700" />;
      case 'shopping':
        return <Smartphone className="w-4 h-4 text-blue-700" />;
      default:
        return <Compass className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div className="space-y-6 pb-20 pt-1">
      {/* 1. DUAL GEOGRAPHY ANCHOR SELECTOR */}
      <div className="bg-brand-warm-stone/25 rounded-2xl p-2 border border-brand-warm-stone/50 flex items-center justify-between">
        <div className="flex items-center gap-2 pl-2">
          <Globe className="w-4 h-4 text-brand-deep-green" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-brand-ink/70 font-semibold">
            Context Anchor
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setGeography('india-blr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              geography === 'india-blr'
                ? 'bg-brand-deep-green text-white shadow-sm font-semibold'
                : 'bg-transparent text-brand-ink/70 hover:bg-black/5'
            }`}
          >
            🇮🇳 Bangalore (BLR)
          </button>
          <button
            onClick={() => setGeography('singapore-sin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              geography === 'singapore-sin'
                ? 'bg-brand-deep-green text-white shadow-sm font-semibold'
                : 'bg-transparent text-brand-ink/70 hover:bg-black/5'
            }`}
          >
            🇸🇬 Singapore (SIN)
          </button>
        </div>
      </div>

      {/* 2. CINEMATIC PERSONA DOSSIER HERO */}
      <div className="relative overflow-hidden rounded-[28px] border border-brand-warm-stone/40 shadow-sm bg-brand-deep-green text-white">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src="/images/hero_persona_banner.jpg"
            alt="Persona scenic landscape"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-green via-brand-deep-green/60 to-transparent" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/15 backdrop-blur-md text-white border border-white/20">
              <Shield className="w-3 h-3 text-brand-sage" />
              Sovereign Identity Dossier
            </span>
            <button
              onClick={handleCopyPortableContext}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/15"
            >
              {copiedContext ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedContext ? 'Copied' : 'Export'}
            </button>
          </div>
        </div>

        <div className="p-5 pt-0 relative z-10 space-y-3">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
              {persona.title}
            </h1>
            <p className="text-xs text-brand-sage mt-1 leading-relaxed font-sans">
              {persona.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-white/90">
              <MapPin className="w-3 h-3 text-brand-sage" />
              {persona.locationAnchor} ({persona.homeAirport})
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-white/90">
              <Users className="w-3 h-3 text-brand-sage" />
              {persona.familyComposition}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-white/90">
              <Lock className="w-3 h-3 text-brand-sage" />
              Zero Ad Tracking
            </span>
          </div>
        </div>
      </div>

      {/* 3. THE 4 FOCUSED DOMAIN MOODBOARDS (REPLACES THE HEXAGON) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-brand-ink uppercase font-mono text-[11px]">
              Extracted Lifestyle Domains
            </h2>
            <p className="text-xs text-brand-ink/60 mt-0.5">
              Visual guardrails protecting your attention across 4 core domains
            </p>
          </div>
          <span className="text-[10px] font-mono text-brand-deep-green font-medium bg-brand-deep-green/10 px-2 py-0.5 rounded-full">
            4 Calibrated
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {persona.domainCapsules.map((capsule) => (
            <motion.div
              key={capsule.domain}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCapsule(capsule)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-brand-warm-stone/50 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Photo Banner */}
              <div className="relative h-32 w-full overflow-hidden bg-brand-warm-stone/20">
                <Image
                  src={capsule.heroImage}
                  alt={capsule.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
                  {getDomainIcon(capsule.domain)}
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                    {capsule.domain}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-serif text-base font-semibold leading-tight drop-shadow-sm">
                    {capsule.title}
                  </h3>
                </div>
              </div>

              {/* Guardrail Content */}
              <div className="p-3.5 space-y-2.5 text-xs flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-brand-terracotta font-semibold tracking-wider">
                    🔒 Non-Negotiable Rule
                  </div>
                  <p className="text-brand-ink/90 font-medium line-clamp-2 mt-0.5 leading-snug">
                    {capsule.bedrockRule}
                  </p>
                </div>

                <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center justify-between text-[11px] text-brand-ink/70">
                  <span className="truncate max-w-[170px] font-mono text-[10px] text-brand-deep-green font-medium">
                    📍 {capsule.curatedLocalNode}
                  </span>
                  <span className="flex items-center gap-0.5 text-brand-terracotta font-medium group-hover:translate-x-0.5 transition-transform">
                    Inspect <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. LIVING STORY TAPESTRY (EDITORIAL NARRATIVE WITH TOKENS) */}
      <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-terracotta" />
            <h2 className="font-serif text-base font-bold text-brand-ink">
              Living Story Tapestry
            </h2>
          </div>
          <span className="text-[10px] font-mono text-brand-ink/60 uppercase">
            Tap highlighted tokens
          </span>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-brand-ink/80">
          {persona.livingStory.map((sec, idx) => (
            <p key={idx} className="bg-brand-ivory/60 p-3 rounded-xl border border-brand-warm-stone/30">
              {sec.paragraph}
              <span className="mt-2.5 flex flex-wrap gap-1.5 block">
                {sec.tokenChips.map((chip) => (
                  <button
                    key={chip.token}
                    onClick={() => setActiveTokenModal({ token: chip.token, impact: chip.impactSummary })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-deep-green/10 hover:bg-brand-deep-green/20 text-brand-deep-green text-[11px] font-medium border border-brand-deep-green/20 transition-all cursor-pointer"
                  >
                    <span>✨</span>
                    <span>{chip.token}</span>
                  </button>
                ))}
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* 5. DUAL HORIZON RULE REGISTRY */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-deep-green" />
            <h2 className="font-serif text-base font-bold text-brand-ink">
              Dual Horizon Engine
            </h2>
          </div>
          <button
            onClick={() => setShowAddRuleModal(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-deep-green text-white hover:bg-brand-deep-green/90 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rule</span>
          </button>
        </div>

        {/* Segmented Switcher */}
        <div className="flex rounded-xl bg-brand-warm-stone/30 p-1 text-xs">
          <button
            onClick={() => setActiveTab('bedrock')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'bedrock'
                ? 'bg-white text-brand-deep-green shadow-xs font-semibold'
                : 'text-brand-ink/70 hover:text-brand-ink'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>🔒 Bedrock Rules ({bedrockItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'active'
                ? 'bg-white text-brand-terracotta shadow-xs font-semibold'
                : 'text-brand-ink/70 hover:text-brand-ink'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>⏱️ Active Watches ({watches.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'bedrock' ? (
          <div className="space-y-2">
            {bedrockItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-white border border-brand-warm-stone/40 shadow-xs flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-brand-deep-green/10 text-brand-deep-green font-semibold">
                      {item.domain}
                    </span>
                    <span className="font-medium text-brand-ink">{item.key}</span>
                  </div>
                  <p className="text-brand-ink/70 text-[11px] leading-relaxed">
                    {item.value}
                  </p>
                  <div className="text-[10px] text-brand-ink/40 font-mono">
                    Provenance: {item.provenance.provider} · Confidence: {Math.round(item.confidence * 100)}%
                  </div>
                </div>
                <button
                  onClick={() => deleteContextItem(item.id)}
                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {watches.map((watch) => (
              <div
                key={watch.id}
                className="p-3.5 rounded-xl bg-white border border-brand-warm-stone/40 shadow-xs flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-brand-terracotta/10 text-brand-terracotta font-semibold">
                      {watch.type}
                    </span>
                    <span className="font-medium text-brand-ink">{watch.entity}</span>
                    {watch.triggerMet && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold">
                        Target Met
                      </span>
                    )}
                  </div>
                  <p className="text-brand-ink/70 text-[11px]">
                    Target: {watch.currency} {watch.targetPrice?.toLocaleString()} · Current:{' '}
                    <span className="font-semibold text-brand-deep-green">
                      {watch.currency} {watch.currentPrice?.toLocaleString()}
                    </span>
                  </p>
                  <div className="text-[10px] text-brand-ink/40 font-mono">
                    Cadence: {watch.checkCadence} · Checked: {watch.lastChecked}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL 1: CAPSULE DEEP DIVE BOTTOM SHEET */}
      <AnimatePresence>
        {selectedCapsule && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] max-h-[85vh] overflow-y-auto p-5 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/30">
                <div className="flex items-center gap-2">
                  {getDomainIcon(selectedCapsule.domain)}
                  <span className="font-mono text-xs uppercase font-bold text-brand-deep-green tracking-wider">
                    {selectedCapsule.domain} Domain Blueprint
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCapsule(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative h-44 w-full rounded-2xl overflow-hidden">
                <Image
                  src={selectedCapsule.heroImage}
                  alt={selectedCapsule.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-bold">{selectedCapsule.title}</h3>
                  <p className="text-xs text-brand-sage mt-0.5">{selectedCapsule.tagline}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-warm-stone/40 space-y-1">
                  <span className="font-mono text-[10px] text-brand-terracotta uppercase font-bold">
                    🔒 Non-Negotiable Bedrock Rule
                  </span>
                  <p className="font-medium text-brand-ink">{selectedCapsule.bedrockRule}</p>
                </div>

                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-warm-stone/40 space-y-1">
                  <span className="font-mono text-[10px] text-brand-deep-green uppercase font-bold">
                    ⏱️ Active Focus & Horizon
                  </span>
                  <p className="font-medium text-brand-ink">{selectedCapsule.activeWatchOrHorizon}</p>
                </div>

                <div className="p-3 bg-brand-ivory rounded-xl border border-brand-warm-stone/40 space-y-1">
                  <span className="font-mono text-[10px] text-stone-500 uppercase font-bold">
                    📍 Curated Local Node ({persona.locationAnchor})
                  </span>
                  <p className="font-medium text-brand-ink">{selectedCapsule.curatedLocalNode}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCapsule(null)}
                className="w-full py-3 rounded-xl bg-brand-deep-green text-white font-medium text-xs mt-2"
              >
                Close Domain Blueprint
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: TOKEN IMPACT EXPLAINER */}
      <AnimatePresence>
        {activeTokenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-2xl p-5 space-y-3 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/30">
                <div className="flex items-center gap-1.5 font-bold text-brand-deep-green font-mono">
                  <span>✨</span>
                  <span>{activeTokenModal.token}</span>
                </div>
                <button
                  onClick={() => setActiveTokenModal(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-brand-ink/50">
                  Engine Protection & Action
                </span>
                <p className="text-brand-ink leading-relaxed font-medium">
                  {activeTokenModal.impact}
                </p>
              </div>

              <button
                onClick={() => setActiveTokenModal(null)}
                className="w-full py-2 rounded-xl bg-brand-deep-green text-white font-medium text-xs"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: ADD NEW RULE */}
      <AnimatePresence>
        {showAddRuleModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] p-5 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/30">
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  Add Bedrock Constraint
                </h3>
                <button
                  onClick={() => setShowAddRuleModal(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateRule} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-ink/60 mb-1">
                    Domain
                  </label>
                  <select
                    value={newRuleDomain}
                    onChange={(e) => setNewRuleDomain(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/50 bg-brand-ivory text-brand-ink text-xs focus:outline-brand-deep-green"
                  >
                    <option value="travel">✈️ Travel & Escapes</option>
                    <option value="books">📚 Books & Mind</option>
                    <option value="events">🎟️ Cultural Events</option>
                    <option value="shopping">📱 Shopping & Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-ink/60 mb-1">
                    Rule Title / Constraint Key
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Non-Stop Flight Rule"
                    value={newRuleKey}
                    onChange={(e) => setNewRuleKey(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/50 bg-brand-ivory text-brand-ink text-xs focus:outline-brand-deep-green"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-ink/60 mb-1">
                    Constraint Definition (Exact criteria)
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Reject any flight with layovers; family travel must be direct."
                    value={newRuleValue}
                    onChange={(e) => setNewRuleValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/50 bg-brand-ivory text-brand-ink text-xs focus:outline-brand-deep-green"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddRuleModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-brand-warm-stone text-brand-ink font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-brand-deep-green text-white font-medium"
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
  );
}
