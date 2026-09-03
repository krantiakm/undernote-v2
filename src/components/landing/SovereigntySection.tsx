'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, Edit3, Download, Trash2, ShieldCheck } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  const points = [
    {
      icon: Eye,
      title: 'See what it knows',
      description: 'Your context is inspectable, not hidden in a black box.',
    },
    {
      icon: Edit3,
      title: 'Change anything',
      description: 'Correct a preference or remove something that no longer feels true.',
    },
    {
      icon: Download,
      title: 'Take it with you',
      description: 'Export your context whenever you want to use with other tools.',
    },
    {
      icon: Trash2,
      title: 'Leave cleanly',
      description: 'Delete your Undernote whenever you choose with 1 tap.',
    },
  ];

  return (
    <section id="privacy" className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Yours
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            What knows you should belong to you.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Your Undernote is yours. See it, change it, remove something, export it or delete it. Your context exists to make your experience better — not to build an advertising profile around you.
          </p>
        </div>

        {/* 2-Column Split: Image on Left, 4 Clean Reassuring Points on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Still Life */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-[420px] rounded-3xl overflow-hidden shadow-xs border border-brand-warm-stone/60 bg-stone-100">
            <Image
              src="/images/landing_sovereignty_vault.jpg"
              alt="Personal context ownership"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-sage font-bold block">
                Privacy Standard
              </span>
              <p className="font-serif text-sm font-bold mt-0.5">
                Stored locally by default. Yours to export or delete.
              </p>
            </div>
          </div>

          {/* 4 Clear Points */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-2 hover:shadow-sm transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/60">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-ink">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-brand-ink/70 leading-relaxed font-sans">
                    {pt.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Closing Trust Callout */}
        <div className="text-center pt-2 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-warm-stone text-xs font-semibold text-brand-ink/80 shadow-xs">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>No sponsored ranking. No selling your attention.</span>
          </div>
          <div>
            <Link
              href="/data"
              className="text-xs font-mono text-brand-deep-green hover:underline underline-offset-4 font-semibold"
            >
              Inspect Your Context &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
