'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Timer, Sparkles, Check, Clock, HeartHandshake, Smartphone, Coffee, Plane } from 'lucide-react';

interface RuleItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  badge: string;
  countdown?: string;
}

const FOREVER_RULES: RuleItem[] = [
  {
    icon: Plane,
    title: 'Direct Non-Stop Flights Only',
    desc: 'Never suggest layovers for family travel from BLR. Transit fatigue is eliminated permanently.',
    badge: 'Lifetime Rule',
  },
  {
    icon: HeartHandshake,
    title: 'Child-Safe Boutique Stays',
    desc: 'Swimming pool safety gates and quiet residential zoning for a 7-year-old daughter.',
    badge: 'Family Anchor',
  },
  {
    icon: Smartphone,
    title: 'Phone Screen Under 6.3 Inches',
    desc: 'Single-hand grip ergonomics strictly enforced; stock Android OS only.',
    badge: 'Ergonomic Limit',
  },
  {
    icon: Coffee,
    title: 'Anaerobic Pour-Over Notes',
    desc: 'Specialty single-origins with jasmine floral and stone-fruit peach notes.',
    badge: 'Palate Profile',
  },
];

const ACTIVE_WATCHES: RuleItem[] = [
  {
    icon: Plane,
    title: 'December Sri Lanka Family Retreat',
    desc: '6-day beach villa with private pool for Dec 20–27. Auto-expires Jan 1.',
    countdown: '52 days remaining',
    badge: 'Active Window',
  },
  {
    icon: Smartphone,
    title: 'Pixel 11 Price Watch (< ₹60k)',
    desc: 'Trigger met: Currently at ₹56,499 on verified marketplace. Ready to execute.',
    countdown: 'Target Met',
    badge: 'Price Alert',
  },
  {
    icon: Coffee,
    title: 'Araku Seasonal 40kg Harvest',
    desc: 'Anaerobic micro-lot released this week at Indiranagar roastery.',
    countdown: 'Fresh 48h Batch',
    badge: 'Seasonal Release',
  },
  {
    icon: Smartphone,
    title: 'Sony A7CR Ultralight Camera Watch',
    desc: 'Lightweight full-frame body under 500g for travel photography.',
    countdown: '30 days remaining',
    badge: 'Hardware Watch',
  },
];

export const DualHorizonShowcase: React.FC = () => {
  const [tab, setTab] = useState<'forever' | 'active'>('forever');

  return (
    <section className="py-20 sm:py-28 bg-brand-ivory relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Sparkles size={13} />
            <span>Smart Memory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Rules you love forever.{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              Things you want now.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
            Other feeds confuse a one-time Google search with a permanent obsession. Undernote knows the difference between your lifetime rules and things that should auto-expire.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-brand-warm-stone/80 shadow-soft">
            <button
              onClick={() => setTab('forever')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                tab === 'forever'
                  ? 'bg-brand-deep-green text-brand-ivory shadow-sm'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Lock size={14} />
              <span>🔒 Rules That Never Change</span>
            </button>
            <button
              onClick={() => setTab('active')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                tab === 'active'
                  ? 'bg-brand-terracotta text-white shadow-sm'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Timer size={14} />
              <span>⏱️ Active Watches (Auto-Expiring)</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {(tab === 'forever' ? FOREVER_RULES : ACTIVE_WATCHES).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 shadow-soft space-y-3 flex flex-col justify-between hover:shadow-card transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-ivory text-brand-deep-green border border-brand-warm-stone/40">
                        {item.badge}
                      </span>
                      {tab === 'forever' ? (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <Check size={13} />
                          <span>Always Active</span>
                        </span>
                      ) : (
                        <span className="text-xs text-brand-terracotta font-mono font-bold flex items-center gap-1">
                          <Clock size={13} />
                          <span>{item.countdown}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-brand-ink">
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-ink-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
