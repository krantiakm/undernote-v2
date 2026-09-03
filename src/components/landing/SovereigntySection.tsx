'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, EyeOff, Download, Trash2, ShieldCheck, Sparkles } from 'lucide-react';

const ITEMS = [
  {
    icon: Lock,
    title: '100% Local-First',
    desc: 'Your context stays encrypted on your own device. Zero cloud surveillance.',
  },
  {
    icon: EyeOff,
    title: 'Zero Data Brokering',
    desc: 'We never sell your profiles, searches, or family rules to third-party ad networks.',
  },
  {
    icon: Download,
    title: '1-Click Portable Export',
    desc: 'Export your verified lifestyle profile to ChatGPT, Claude, or Gemini anytime.',
  },
  {
    icon: Trash2,
    title: 'Granular Control',
    desc: 'Transparent audit list. Edit, override, or delete any single rule in seconds.',
  },
];

export const SovereigntySection: React.FC = () => {
  return (
    <section id="privacy" className="py-20 sm:py-32 bg-brand-ivory relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Privacy & Ownership</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Your context.{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              Your control.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Unlike big-tech feeds that hoard your data to target you with ads, Undernote operates as a sovereign layer owned entirely by you.
          </p>
        </div>

        {/* 4 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-6 border border-brand-warm-stone/70 space-y-3 shadow-soft hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-ivory text-brand-deep-green flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h4 className="font-serif font-bold text-base text-brand-ink">{item.title}</h4>
                <p className="text-xs text-brand-ink-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
