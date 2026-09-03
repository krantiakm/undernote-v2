'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Layers, Compass, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onOpenAiModal: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

const STEPS = [
  {
    num: '1',
    icon: Bot,
    title: 'Connect In 10 Seconds',
    desc: 'Paste what Gemini, ChatGPT, or Claude already knows about your life. Or speak for 30s.',
  },
  {
    num: '2',
    icon: Layers,
    title: 'Dual Horizons Organize It',
    desc: 'Permanent rules (direct flights, screen limits) stay locked. Short-term watches auto-expire.',
  },
  {
    num: '3',
    icon: Compass,
    title: 'Silent Radar Delivers',
    desc: 'Surfacing 3 to 8 high-taste finds when price, timing, and non-negotiables align.',
  },
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAiModal }) => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-terracotta flex items-center justify-center gap-1.5">
            <Sparkles size={12} />
            <span>Simple Setup</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink">
            How it works.
          </h2>
        </div>

        {/* 3 Steps Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-brand-ivory/60 border border-brand-warm-stone/60 space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-brand-deep-green text-brand-ivory flex items-center justify-center text-xs font-bold font-mono">
                    {step.num}
                  </span>
                  <Icon size={18} className="text-brand-terracotta" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-ink-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
