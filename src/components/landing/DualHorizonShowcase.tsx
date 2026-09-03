'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Timer, Sparkles, CheckCircle2, Clock, MapPin, HeartHandshake, Smartphone, Coffee, Compass } from 'lucide-react';

const BEDROCK_RULES = [
  {
    domain: 'Travel',
    icon: Compass,
    title: 'Strict Direct Non-Stop Flight Rule',
    desc: 'Never suggest layovers for family travel. Direct flights only from Bangalore (BLR).',
    provenance: 'Persistent Rule · Added via Bedrock',
  },
  {
    domain: 'Family',
    icon: HeartHandshake,
    title: 'Child-Safe Boutique Stays',
    desc: '7-year-old daughter: enforce swimming pool safety gates and calm residential zoning.',
    provenance: 'Persistent Rule · Added via AI Import',
  },
  {
    domain: 'Hardware',
    icon: Smartphone,
    title: 'Screen Size Limit (< 6.3 inches)',
    desc: 'Compact single-handed grip ergonomics strictly enforced; stock/clean OS only.',
    provenance: 'Persistent Rule · Added via AI Import',
  },
  {
    domain: 'Taste',
    icon: Coffee,
    title: 'Anaerobic Light/Medium Pour-Over',
    desc: 'Specialty coffee profile: jasmine floral notes and stone-fruit peach notes.',
    provenance: 'Persistent Rule · Added via Context Studio',
  },
];

const ACTIVE_INTENTS = [
  {
    domain: 'Vacation Window',
    countdown: '52 days left',
    title: 'Dec Family Coastal Retreat (Sri Lanka)',
    desc: '6-day quiet villa with private pool for Dec 20–27. Auto-expires Jan 1.',
    status: 'Monitoring Flight Deals & Stays',
  },
  {
    domain: 'Price Watch',
    countdown: 'Active Target Met',
    title: 'Pixel 11 Price Drop (< ₹60,000)',
    desc: 'Trigger met: Currently at ₹56,499 on verified marketplace. Target was ₹60,000.',
    status: 'Alert Ready to Execute',
  },
  {
    domain: 'Seasonal Release',
    countdown: 'Harvest Release',
    title: 'Araku 40kg Micro-Lot Release',
    desc: 'Anaerobic micro-lot released this week at Indiranagar roastery.',
    status: 'Ready to Order',
  },
  {
    domain: 'Camera Watch',
    countdown: '30 days left',
    title: 'Sony A7CR Compact Body Watch',
    desc: 'Lightweight full-frame body under 500g for travel photography.',
    status: 'Monitoring Official Store',
  },
];

export const DualHorizonShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bedrock' | 'active'>('bedrock');

  return (
    <section id="horizons" className="py-24 sm:py-32 bg-brand-ivory relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Sparkles size={13} />
            <span>Dual Horizon Context Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Permanent rules.{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              Active windows.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Most recommendation engines confuse one-time queries with lifetime preferences. Undernote separates <strong>Persistent Bedrock</strong> that never changes from <strong>Active Focus</strong> that auto-expires.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-warm-stone/60 pb-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-brand-warm-stone/80 shadow-soft">
            <button
              type="button"
              onClick={() => setActiveTab('bedrock')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'bedrock'
                  ? 'bg-brand-deep-green text-brand-ivory shadow-sm'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Lock size={14} />
              <span>🔒 Horizon 1: Persistent Bedrock (Long-Term)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'active'
                  ? 'bg-brand-terracotta text-white shadow-sm'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Timer size={14} />
              <span>⏱️ Horizon 2: Active Focus (Auto-Expiring)</span>
            </button>
          </div>

          <span className="text-xs text-brand-ink-light font-mono">
            {activeTab === 'bedrock' ? '4 Permanent Lifestyle Anchors' : '4 Time-Bounded Active Watches'}
          </span>
        </div>

        {/* Cards Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'bedrock' ? (
              <motion.div
                key="bedrock"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {BEDROCK_RULES.map((rule) => {
                  const Icon = rule.icon;
                  return (
                    <div
                      key={rule.title}
                      className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 shadow-soft hover:shadow-card transition-all space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-deep-green/10 text-brand-deep-green flex items-center gap-1.5">
                          <Icon size={12} />
                          <span>{rule.domain}</span>
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={13} />
                          <span>Active Bedrock</span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-serif text-lg font-bold text-brand-ink">
                          {rule.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                          {rule.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-brand-warm-stone/40 text-[11px] text-brand-ink-light font-mono">
                        {rule.provenance}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {ACTIVE_INTENTS.map((intent) => (
                  <div
                    key={intent.title}
                    className="bg-white rounded-3xl p-6 border border-brand-terracotta/30 shadow-soft hover:shadow-card transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-terracotta/10 text-brand-terracotta">
                        {intent.domain}
                      </span>
                      <span className="text-[11px] font-mono text-brand-terracotta font-bold flex items-center gap-1">
                        <Clock size={12} />
                        <span>{intent.countdown}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-serif text-lg font-bold text-brand-ink">
                        {intent.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                        {intent.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-brand-warm-stone/40 flex items-center justify-between text-[11px]">
                      <span className="text-brand-deep-green font-semibold">
                        Status: {intent.status}
                      </span>
                      <span className="text-brand-ink-light">Auto-expires</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
