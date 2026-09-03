'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Clock, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Connect What You Already Value',
      subtitle: 'No tedious questionnaires or endless forms.',
      description:
        'Paste your existing thoughts or memories from ChatGPT, Claude, or Gemini—or simply record a 30-second voice note describing what matters to you. Undernote extracts your genuine taste in seconds.',
      tag: '10-Second Setup',
    },
    {
      number: '02',
      title: 'Longer Foundations & Current Interests',
      subtitle: 'Zero rigid rules. Just fluid horizons.',
      description:
        'Undernote understands the difference between enduring tendencies that last for years (like non-stop travel or dietary baselines) and immediate interests you care about right now (like finding a trip for December).',
      tag: 'Fluid Calibration',
    },
    {
      number: '03',
      title: 'The World Comes to You at the Right Time',
      subtitle: 'Quiet serendipity instead of endless searching.',
      description:
        'While you focus on your life, Undernote quietly tracks independent bookstores, direct airline schedules, and intimate stages. When a genuine opportunity matches, you receive a calm, high-signal note.',
      tag: 'Quiet Matches',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            How It Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Effortless setup. Quiet matches.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/70 leading-relaxed font-sans">
            Designed for busy humans who appreciate fine things but hate spending their weekends sifting through search tabs.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-warm-stone/50 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-brand-terracotta">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-ivory border border-brand-warm-stone/60 text-brand-ink/70 font-semibold">
                    {step.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-brand-ink leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs font-serif italic text-brand-terracotta">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-warm-stone/30 text-[10px] font-mono text-brand-deep-green font-bold flex items-center gap-1">
                <Sparkles size={11} />
                <span>Zero algorithms or tracking cookies</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="text-center pt-2">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>Try It Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};
