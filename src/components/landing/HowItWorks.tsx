'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Clock, Bell, Sliders } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: Bot,
      title: 'Start with what is already known',
      body: 'Bring in what you have already taught AI. Undernote turns scattered memories and conversations into something useful.',
    },
    {
      number: '2',
      icon: Clock,
      title: 'It learns what lasts — and what matters now',
      body: 'Some things stay true for years. Others matter for a few weeks. Undernote keeps the difference straight without rigid rules.',
    },
    {
      number: '3',
      icon: Bell,
      title: 'It notices when something fits',
      body: 'A new release. A price drop. A nearby opening. A travel window. A useful article. When something becomes unusually relevant, Undernote brings it forward.',
    },
    {
      number: '4',
      icon: Sliders,
      title: 'You make it sharper',
      body: 'Save something. Ignore something. Correct a preference. Answer an occasional question. Undernote improves without asking you to maintain a profile.',
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

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 border border-brand-warm-stone/50 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
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

                <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                  <Icon size={12} className="text-brand-deep-green" />
                  <span>Continuous passive refinement</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line & CTA */}
        <div className="text-center pt-2 space-y-4">
          <p className="font-serif italic text-base text-brand-ink font-semibold">
            Less setup over time. Better fit over time.
          </p>
          <div>
            <Link
              href="/radar"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group"
            >
              <span>Try Undernote</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
