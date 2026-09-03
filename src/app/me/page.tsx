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
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Share2,
  Sliders,
  CheckCircle2,
  Clock,
  Eye,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

type SpecimenId = 'travel' | 'books' | 'events' | 'shopping';

export default function MePage() {
  const {
    persona,
    contextItems,
    watches,
    intents,
    addContextItem,
    deleteContextItem,
    showToast,
  } = useApp();

  const [flippedSpecimen, setFlippedSpecimen] = useState<SpecimenId | null>(null);
  const [copiedContext, setCopiedContext] = useState(false);
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [showRulesDrawer, setShowRulesDrawer] = useState(false);

  // New rule form
  const [newRuleKey, setNewRuleKey] = useState('');
  const [newRuleValue, setNewRuleValue] = useState('');
  const [newRuleDomain, setNewRuleDomain] = useState<'travel' | 'books' | 'events' | 'shopping'>('travel');

  const bedrockItems = contextItems.filter((i) => i.horizon === 'persistent_long_term');

  const handleCopyPassport = () => {
    const text = `# Undernote Sovereign Identity Dossier
Archetype: ${persona.title}
Location: ${persona.locationAnchor} (${persona.homeAirport})
Family: ${persona.familyComposition}
Currency: ${persona.currency}

## Non-Negotiable Bedrock Objects in Tray:
1. [TRAVEL] Strict Non-Stop Direct Flights Only (0 Layovers) · Anchor: ${persona.homeAirport}
2. [BOOKS] Christopher Alexander Built Environment Theory · Archival Clothbound Editions
3. [EVENTS] 100% Unamplified Acoustic Sound · 200-seat Natural Resonance
4. [SHOPPING] Ergonomic Display Strictly < 6.3" · Stock Clean Android
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
      horizon: 'persistent_long_term',
      confidence: 1.0,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: { provider: 'Direct Specimen Tray Entry' },
    });

    setNewRuleKey('');
    setNewRuleValue('');
    setShowAddRuleModal(false);
    showToast('New specimen rule added to your tray');
  };

  const toggleSpecimen = (id: SpecimenId) => {
    setFlippedSpecimen((curr) => (curr === id ? null : id));
  };

  return (
    <div className="space-y-6 pb-24 pt-2 text-brand-ink">
      {/* 1. TOP HEADER TITLE */}
      <div className="text-center space-y-1 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold bg-brand-deep-green/10 border border-brand-deep-green/15">
          <Shield className="w-3 h-3 text-brand-terracotta" />
          <span>Sovereign Identity</span>
        </div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-ink">
          The Specimen Tray
        </h1>
        <p className="text-xs text-brand-ink/60 font-sans max-w-xs mx-auto">
          Tactile physical artifacts representing your extracted non-negotiable rules.
        </p>
      </div>

      {/* 2. THE SPECIMEN TRAY (THE PHYSICAL WOODEN & STONE TRAY) */}
      <div className="relative p-2.5 rounded-[32px] bg-[#614532] shadow-[0_16px_35px_-8px_rgba(40,25,15,0.4)] border-4 border-[#4a3424]">
        {/* Inner Wooden Dividers Container */}
        <div className="grid grid-cols-2 gap-2.5 p-2 rounded-[24px] bg-[#3a271a] shadow-inner">
          
          {/* --- QUADRANT 1: TRAVEL (EMBOSSED BOARDING PASS & POLAROID) --- */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSpecimen('travel')}
            className="relative aspect-square rounded-2xl bg-[#EDE7DF] shadow-inner p-3 flex flex-col justify-between overflow-hidden border border-[#D5CCC0] cursor-pointer group"
          >
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#d3c9ba_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-brand-deep-green/70 font-semibold">
                VINTAGE CARDSTOCK
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            </div>

            {/* Embossed Boarding Pass Card */}
            <div className="relative z-10 bg-white/95 rounded-xl p-2.5 shadow-sm border border-stone-200/80 -rotate-2 group-hover:rotate-0 transition-transform duration-300">
              <div className="text-[7px] font-mono text-stone-400 uppercase tracking-wider">
                BOARDING PASS
              </div>
              <div className="font-mono text-xs sm:text-sm font-black text-brand-deep-green tracking-tight leading-none mt-0.5">
                BLR → DIRECT
              </div>
              <div className="text-[9px] font-bold text-brand-terracotta uppercase tracking-wide mt-0.5">
                ONLY 0 LAYOVERS
              </div>
            </div>

            {/* Tucked Polaroid */}
            <div className="relative z-10 self-end -mt-3 rotate-6 group-hover:rotate-3 transition-transform duration-300 shadow-md">
              <div className="bg-white p-1 pb-2.5 rounded-sm border border-stone-200">
                <div className="relative w-14 h-11 bg-stone-100 overflow-hidden">
                  <Image
                    src="/images/hero_srilanka_villa.jpg"
                    alt="Coastal Villa"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-stone-500 pt-1">
              <span>STAN09 SECR</span>
              <span className="text-brand-terracotta font-semibold">Tap to flip ↺</span>
            </div>
          </motion.div>

          {/* --- QUADRANT 2: BOOKS (CLOTHBOUND GREEN & GOLD MONOGRAPH SPINE) --- */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSpecimen('books')}
            className="relative aspect-square rounded-2xl bg-[#EDE7DF] shadow-inner p-3 flex flex-col justify-between overflow-hidden border border-[#D5CCC0] cursor-pointer group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#d3c9ba_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-brand-deep-green/70 font-semibold">
                ARCHIVAL CLOTH
              </span>
              <BookOpen className="w-3 h-3 text-brand-deep-green/60" />
            </div>

            {/* Clothbound Book Spine Object */}
            <div className="relative z-10 my-auto mx-auto w-24 h-28 bg-[#1f3d35] rounded-r-md rounded-l-xs shadow-md border-l-4 border-amber-600/40 p-2 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
              {/* Gold foil border */}
              <div className="absolute inset-1 border border-amber-400/40 rounded-sm pointer-events-none" />
              
              <div className="text-[7px] font-serif text-amber-200/90 font-bold uppercase tracking-wider text-center pt-1">
                A Pattern Language
              </div>
              
              <div className="text-[6px] font-mono text-amber-300/60 uppercase tracking-tight text-center">
                Christopher Alexander
              </div>

              {/* Silk Gold Ribbon Bookmark */}
              <div className="w-2.5 h-6 bg-amber-500/90 shadow-sm mx-auto -mb-4 rounded-b-xs" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-stone-500 pt-1">
              <span>CHAMPACA ED.</span>
              <span className="text-brand-terracotta font-semibold">Tap to flip ↺</span>
            </div>
          </motion.div>

          {/* --- QUADRANT 3: EVENTS (LETTERPRESS PERFORATED TICKET STUB) --- */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSpecimen('events')}
            className="relative aspect-square rounded-2xl bg-[#EDE7DF] shadow-inner p-3 flex flex-col justify-between overflow-hidden border border-[#D5CCC0] cursor-pointer group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#d3c9ba_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-brand-deep-green/70 font-semibold">
                LETTERPRESS STUB
              </span>
              <Ticket className="w-3 h-3 text-brand-terracotta/70" />
            </div>

            {/* Vintage Perforated Ticket Stub */}
            <div className="relative z-10 my-auto bg-[#E8DDD0] rounded-sm p-2.5 shadow-sm border border-stone-300 rotate-1 group-hover:rotate-0 transition-transform duration-300">
              {/* Perforated side notches */}
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EDE7DF] rounded-full" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EDE7DF] rounded-full" />

              <div className="text-center space-y-0.5 px-2">
                <div className="text-[8px] font-mono uppercase font-black text-brand-terracotta tracking-wider border-b border-stone-300/80 pb-1">
                  UNAMPLIFIED ACOUSTIC
                </div>
                <div className="text-[7px] font-serif text-stone-600 font-bold pt-0.5">
                  Ranga Shankara · JP Nagar
                </div>
                <div className="text-[6px] font-mono text-stone-400">
                  ROW A · 0dB SYNTHETIC EQ
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-stone-500 pt-1">
              <span>SATURDAY 7PM</span>
              <span className="text-brand-terracotta font-semibold">Tap to flip ↺</span>
            </div>
          </motion.div>

          {/* --- QUADRANT 4: SHOPPING (PRECISION TITANIUM ERGONOMIC SILHOUETTE) --- */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSpecimen('shopping')}
            className="relative aspect-square rounded-2xl bg-[#EDE7DF] shadow-inner p-3 flex flex-col justify-between overflow-hidden border border-[#D5CCC0] cursor-pointer group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#d3c9ba_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-brand-deep-green/70 font-semibold">
                1:1 DIMENSIONS
              </span>
              <Smartphone className="w-3 h-3 text-stone-600" />
            </div>

            {/* Precision Titanium Silhouette with Dimension Lines */}
            <div className="relative z-10 my-auto flex items-center justify-center gap-1.5">
              {/* Vertical Dimension Arrow */}
              <div className="flex flex-col items-center text-[7px] font-mono text-stone-500 font-bold">
                <span>▲</span>
                <span className="-rotate-90 my-2 whitespace-nowrap">&lt; 6.3 in</span>
                <span>▼</span>
              </div>

              {/* Minimal Phone Silhouette */}
              <div className="w-14 h-24 rounded-xl bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 border-2 border-stone-500 shadow-md p-1 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                <div className="w-3.5 h-1 bg-stone-600 rounded-full mx-auto" />
                <div className="text-[6px] font-mono text-stone-400 text-center uppercase tracking-tighter">
                  172g Titanium
                </div>
                <div className="w-2 h-0.5 bg-stone-600 rounded-full mx-auto" />
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-stone-500 pt-1">
              <span>SINGLE-HAND GRIP</span>
              <span className="text-brand-terracotta font-semibold">Tap to flip ↺</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 3. TRAY STATS & PRIMARY ACTIONS */}
      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-brand-ink/50 font-bold">
              SPECIMENS
            </div>
            <div className="font-serif text-sm font-bold text-brand-deep-green">
              4 Objects Active
            </div>
          </div>
          <div className="h-6 w-px bg-brand-warm-stone/50" />
          <div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-brand-ink/50 font-bold">
              LOCATION
            </div>
            <div className="font-serif text-sm font-bold text-brand-ink">
              {persona.locationAnchor}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowRulesDrawer(!showRulesDrawer)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-stone-50 text-brand-ink border border-brand-warm-stone/60 shadow-xs transition-all active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5 text-brand-deep-green" />
            <span>Rules</span>
          </button>
          <button
            onClick={handleCopyPassport}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-deep-green hover:bg-brand-deep-green/90 text-white shadow-xs transition-all active:scale-95"
          >
            {copiedContext ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedContext ? 'Copied' : 'Passport'}</span>
          </button>
        </div>
      </div>

      {/* 4. SPECIMEN FLIP INSPECTION MODAL / DRAWER */}
      <AnimatePresence>
        {flippedSpecimen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-brand-ivory rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 text-xs border border-brand-warm-stone/60 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/40">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {flippedSpecimen === 'travel' && '✈️'}
                    {flippedSpecimen === 'books' && '📚'}
                    {flippedSpecimen === 'events' && '🎟️'}
                    {flippedSpecimen === 'shopping' && '📱'}
                  </span>
                  <span className="font-mono text-xs uppercase font-bold text-brand-deep-green tracking-wider">
                    Specimen Card Reverse
                  </span>
                </div>
                <button
                  onClick={() => setFlippedSpecimen(null)}
                  className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-stone-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Content Per Specimen */}
              {flippedSpecimen === 'travel' && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    Non-Stop Direct Flight Rule (0 Layovers)
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-terracotta font-bold">
                      🔒 Extracted Bedrock Constraint
                    </span>
                    <p className="text-brand-ink font-medium leading-relaxed">
                      "All family travel from Bangalore (BLR) must be direct non-stop flights. Discard any discounted itinerary with transit layovers to preserve travel peace with your 7-year-old daughter."
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-deep-green font-bold">
                      ⚡ Active Engine Monitor
                    </span>
                    <p className="text-brand-ink font-medium">
                      Watching: <span className="font-semibold text-brand-deep-green">BLR ➔ CMB (Colombo) &amp; BLR ➔ MLE</span> (Non-stop direct flights under ₹16,000).
                    </p>
                    <div className="text-[10px] text-stone-500 font-mono pt-1">
                      Status: Target Met! SriLankan Airlines UL172 at ₹14,200 (85 mins direct).
                    </div>
                  </div>
                </div>
              )}

              {flippedSpecimen === 'books' && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    Christopher Alexander &amp; Built Environment
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-terracotta font-bold">
                      🔒 Extracted Bedrock Constraint
                    </span>
                    <p className="text-brand-ink font-medium leading-relaxed">
                      "Curate architectural monographs and humane urbanism treatises in archival clothbound and hardcover editions. Prioritize independent local bookshops."
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-deep-green font-bold">
                      ⚡ Active Engine Monitor
                    </span>
                    <p className="text-brand-ink font-medium">
                      Watching: <span className="font-semibold text-brand-deep-green">Champaca Bookstore</span> on Edward Road for A Pattern Language clothbound reprint.
                    </p>
                    <div className="text-[10px] text-stone-500 font-mono pt-1">
                      Status: 4 copies reserved in-store at Champaca.
                    </div>
                  </div>
                </div>
              )}

              {flippedSpecimen === 'events' && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    100% Unamplified Acoustic Sound
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-terracotta font-bold">
                      🔒 Extracted Bedrock Constraint
                    </span>
                    <p className="text-brand-ink font-medium leading-relaxed">
                      "Filter out heavily amplified commercial concerts with synthetic EQ. Prioritize intimate &lt;200-seat natural timber acoustic halls."
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-deep-green font-bold">
                      ⚡ Active Engine Monitor
                    </span>
                    <p className="text-brand-ink font-medium">
                      Watching: <span className="font-semibold text-brand-deep-green">Ranga Shankara Cultural Schedule</span> for weekend unamplified Sarod and string recitals.
                    </p>
                    <div className="text-[10px] text-stone-500 font-mono pt-1">
                      Status: Saturday 7:00 PM session available (45 seats remaining).
                    </div>
                  </div>
                </div>
              )}

              {flippedSpecimen === 'shopping' && (
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    Ergonomic Screen Boundary (&lt; 6.3 inches)
                  </h3>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-terracotta font-bold">
                      🔒 Extracted Bedrock Constraint
                    </span>
                    <p className="text-brand-ink font-medium leading-relaxed">
                      "Reject phablets and oversized phones. Display must be strictly under 6.3 inches for true single-handed tactile grip, running pure stock Android."
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-brand-warm-stone/40 space-y-1">
                    <span className="font-mono text-[10px] uppercase text-brand-deep-green font-bold">
                      ⚡ Active Engine Monitor
                    </span>
                    <p className="text-brand-ink font-medium">
                      Watching: <span className="font-semibold text-brand-deep-green">Pixel 11 Compact (6.2&quot; Actua Display)</span> flash clearance below ₹60,000.
                    </p>
                    <div className="text-[10px] text-stone-500 font-mono pt-1">
                      Status: Target Met! ₹56,499 on authorized flagship store.
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setFlippedSpecimen(null)}
                className="w-full py-3 rounded-xl bg-brand-deep-green text-white font-medium text-xs mt-2"
              >
                Return to Tray
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. RULES & CONSTRAINTS DRAWER */}
      {showRulesDrawer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 border border-brand-warm-stone/50 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-brand-ink">
              Underlying Bedrock Rules ({bedrockItems.length})
            </h3>
            <button
              onClick={() => setShowAddRuleModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-deep-green text-white"
            >
              <Plus className="w-3 h-3" />
              <span>Add Constraint</span>
            </button>
          </div>

          <div className="space-y-2">
            {bedrockItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-brand-ivory/60 border border-brand-warm-stone/30 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-brand-deep-green/10 text-brand-deep-green font-bold">
                      {item.domain}
                    </span>
                    <span className="font-semibold text-brand-ink">{item.key}</span>
                  </div>
                  <p className="text-brand-ink/70 text-[11px] leading-snug">{item.value}</p>
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
        </motion.div>
      )}

      {/* 6. ADD RULE MODAL */}
      <AnimatePresence>
        {showAddRuleModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-brand-warm-stone/30">
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  Add Specimen Constraint
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
                    Quadrant Domain
                  </label>
                  <select
                    value={newRuleDomain}
                    onChange={(e) => setNewRuleDomain(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/50 bg-brand-ivory text-brand-ink text-xs focus:outline-brand-deep-green"
                  >
                    <option value="travel">✈️ Travel (Direct Flights)</option>
                    <option value="books">📚 Books &amp; Mind</option>
                    <option value="events">🎟️ Cultural &amp; Acoustic Events</option>
                    <option value="shopping">📱 Hardware &amp; Ergonomics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-ink/60 mb-1">
                    Specimen Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Non-Stop Flight Constraint"
                    value={newRuleKey}
                    onChange={(e) => setNewRuleKey(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-brand-warm-stone/50 bg-brand-ivory text-brand-ink text-xs focus:outline-brand-deep-green"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-ink/60 mb-1">
                    Non-Negotiable Rule Criteria
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
                    Save Specimen
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
