'use client';

import React from 'react';
import { Bot, Clock, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Bot,
      title: 'It starts with what you already told AI.',
      body: 'Bring in what you already taught ChatGPT, Claude or Gemini with 1 click.',
    },
    {
      number: '02',
      icon: Clock,
      title: 'It learns what lasts — and what matters now.',
      body: 'Some things shape your choices for years. Others matter only this month.',
    },
    {
      number: '03',
      icon: Sparkles,
      title: 'It gets sharper every time you use it.',
      body: 'Save something. Ignore something. Correct something. It quietly tunes itself.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            How It Works
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            It gets better without becoming work.
          </h2>
        </div>

        {/* Connected Horizontal Pathway Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-5 sm:p-6 rounded-3xl bg-[#F7F3EC] border border-brand-warm-stone/50 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-brand-terracotta block">
                  {step.number}
                </span>
                <h3 className="font-serif text-base font-bold text-brand-ink leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="text-center pt-1">
          <p className="font-serif italic text-xs sm:text-sm text-brand-ink/80 font-medium">
            Less setup over time &rarr; Better fit over time
          </p>
        </div>

      </div>
    </section>
  );
};
