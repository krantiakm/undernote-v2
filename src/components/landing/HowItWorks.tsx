'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Layers, Compass, ArrowRight, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

interface HowItWorksProps {
  onOpenAiModal: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

const STEPS = [
  {
    step: '01',
    icon: Bot,
    title: 'Connect Your AI Memory in 10 Seconds',
    description:
      'No tedious 50-question onboarding questionnaires. Simply copy our ready-made prompt into Google Gemini, ChatGPT, or Claude, and paste its structured output. Or dictate a 30-second voice note.',
    badge: '1-Click Ingestion',
    preview: (
      <div className="bg-brand-ivory rounded-2xl p-4 border border-brand-warm-stone/60 space-y-2 font-mono text-[11px] text-brand-ink-light shadow-inner">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-deep-green">
          <GeminiIcon className="w-3.5 h-3.5" />
          <span>Extracted Ingest Graph</span>
        </div>
        <div className="text-brand-ink">
          ✔ <span className="text-brand-terracotta">Home:</span> Bangalore (BLR)
        </div>
        <div className="text-brand-ink">
          ✔ <span className="text-brand-terracotta">Flight Rule:</span> Direct non-stop only
        </div>
        <div className="text-brand-ink">
          ✔ <span className="text-brand-terracotta">Hardware:</span> Screen &lt; 6.3" · Clean OS
        </div>
      </div>
    ),
  },
  {
    step: '02',
    icon: Layers,
    title: 'Dual Horizons Organize Bedrock & Goals',
    description:
      'Undernote splits your context into two clean layers: Persistent Bedrock (rules that never change for years) and Active Focus (time-bounded vacation windows and price watches that auto-expire).',
    badge: 'Dual Horizon Model',
    preview: (
      <div className="bg-brand-ivory rounded-2xl p-4 border border-brand-warm-stone/60 space-y-2 text-xs shadow-inner">
        <div className="flex items-center justify-between pb-1 border-b border-brand-warm-stone/40">
          <span className="font-bold text-brand-deep-green flex items-center gap-1">
            🔒 Bedrock
          </span>
          <span className="text-[10px] text-brand-ink-light">Permanent</span>
        </div>
        <p className="text-[11px] text-brand-ink">"Non-stop flights only for family travel"</p>
        <div className="flex items-center justify-between pt-1 border-t border-brand-warm-stone/40">
          <span className="font-bold text-brand-terracotta flex items-center gap-1">
            ⏱️ Active Focus
          </span>
          <span className="text-[10px] text-brand-ink-light">52d remaining</span>
        </div>
        <p className="text-[11px] text-brand-ink">"December Sri Lanka beach retreat"</p>
      </div>
    ),
  },
  {
    step: '03',
    icon: Compass,
    title: 'Opportunities Surface with Perfect Timing',
    description:
      'Our multi-score engine continuously matches live web feeds (airline routes, boutique stays, specialty roasteries, indie bookstores) against your context. Surfacing 3 to 8 high-taste finds with direct 1-click execution.',
    badge: 'Proactive Action',
    preview: (
      <div className="bg-brand-ivory rounded-2xl p-4 border border-brand-warm-stone/60 space-y-2 text-xs shadow-inner">
        <div className="flex items-center justify-between">
          <span className="font-serif font-bold text-brand-ink">
            Araku Seasonal Micro-Lot
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            96% Match
          </span>
        </div>
        <p className="text-[11px] text-brand-ink-light">
          Roasted 48h ago • Jasmine & peach notes • Direct order link
        </p>
        <div className="pt-1 flex items-center gap-2">
          <span className="text-[10px] bg-brand-deep-green text-white px-2.5 py-1 rounded-lg font-medium">
            Order on Araku ↗
          </span>
        </div>
      </div>
    ),
  },
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAiModal }) => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Sparkles size={13} />
            <span>Effortless & Immediate</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink">
            How Undernote works in{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              3 quiet steps.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light">
            Zero tedious manual form filling. We turn your existing AI context into active real-world intelligence.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-brand-ivory/50 rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/70 shadow-soft flex flex-col justify-between space-y-6 hover:bg-white hover:shadow-card transition-all group"
              >
                <div className="space-y-4">
                  {/* Step Number + Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-brand-terracotta/40 group-hover:text-brand-terracotta transition-colors">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-brand-warm-stone/50 text-brand-deep-green">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-ink leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Visual Step Preview */}
                <div className="pt-2">
                  {step.preview}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Bar inside How It Works */}
        <div className="bg-brand-ivory rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/80 text-center max-w-2xl mx-auto space-y-4 shadow-soft">
          <h4 className="font-serif text-xl font-bold text-brand-ink">
            Ready to test your own personal radar?
          </h4>
          <p className="text-xs sm:text-sm text-brand-ink-light">
            Copy the prompt into your AI and see your context graph synthesize live in under 10 seconds.
          </p>
          <button
            onClick={() => onOpenAiModal('gemini')}
            className="px-6 py-3 rounded-2xl bg-brand-deep-green text-white font-semibold text-xs sm:text-sm hover:bg-brand-deep-green-dark transition-all shadow-md inline-flex items-center gap-2"
          >
            <Sparkles size={15} className="text-brand-terracotta" />
            <span>Open AI Prompt Extraction Studio</span>
          </button>
        </div>
      </div>
    </section>
  );
};
