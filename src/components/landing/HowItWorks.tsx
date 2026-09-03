'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Clock, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: Bot,
      title: 'It starts with what you already told AI.',
      body: 'Bring in what you already taught ChatGPT, Claude or Gemini.',
    },
    {
      number: '2',
      icon: Clock,
      title: 'It learns what lasts — and what matters now.',
      body: 'Some things shape your choices for years. Others matter only this month.',
    },
    {
      number: '3',
      icon: Sparkles,
      title: 'It gets sharper every time you use it.',
      body: 'Save something. Ignore something. Correct something. Answer an occasional useful question.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            How It Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            It gets better without becoming work.
          </h2>
        </div>

        {/* 3 Simple Steps Grid per Section 12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/50 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-brand-ivory text-brand-terracotta flex items-center justify-center font-serif font-bold text-sm border border-brand-warm-stone/60">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-ink leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line per Section 12 */}
        <div className="text-center pt-2 space-y-4">
          <p className="font-serif italic text-base text-brand-ink font-semibold">
            Less setup over time &rarr; Better fit over time
          </p>
        </div>

      </div>
    </section>
  );
};
