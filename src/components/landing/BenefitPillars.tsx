'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Plane, BookOpen, Ticket, Smartphone } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'travel',
    category: 'Travel & Escapes',
    title: 'Direct Flights & Secluded Sanctuaries',
    pullQuote: 'The journey begins only where transit fatigue ends.',
    description:
      'We discard grueling multi-stop layovers. Undernote monitors direct, non-stop routes from your home airport and watches for price windows at quiet boutique coastal and hillside retreats.',
    image: '/images/hero_srilanka_villa.jpg',
    aspectRatio: 'aspect-[4/3]',
    icon: Plane,
    enduringTendency: 'Non-stop direct routing · Peaceful family zoning',
  },
  {
    id: 'books',
    category: 'Books & Mind',
    title: 'Humane Architecture & Archival Prints',
    pullQuote: 'Patterns that bring enduring life to human scale.',
    description:
      'Instead of airport bestsellers, we trace independent neighborhood bookshops and fine publishers for seminal spatial theory, clothbound monographs, and enduring philosophy.',
    image: '/images/hero_alexander_book.jpg',
    aspectRatio: 'aspect-[4/3]',
    icon: BookOpen,
    enduringTendency: 'Clothbound & hardcover only · Timeless spatial craft',
  },
  {
    id: 'events',
    category: 'Performing Arts & Events',
    title: 'Acoustic Purity & Intimate Stages',
    pullQuote: 'Sound without synthetic amplification.',
    description:
      'We filter out stadium distortion and public address blare. Undernote surfaces intimate classical recitals, solo acoustic performances, and blackbox theatre in natural timber halls.',
    image: '/images/hero_theatre_acoustic.jpg',
    aspectRatio: 'aspect-[4/3]',
    icon: Ticket,
    enduringTendency: 'Intimate <200-seat halls · 0% synthetic EQ',
  },
  {
    id: 'hardware',
    category: 'Everyday Tools & Hardware',
    title: 'Ergonomic Hardware for Human Hands',
    pullQuote: 'Tools designed for human anatomy, not algorithms.',
    description:
      'We reject oversized phablets and disposable electronics. We track compact flagships under 6.3 inches, lightweight travel camera bodies, and tactile instruments made to endure.',
    image: '/images/hero_pixel11_compact.jpg',
    aspectRatio: 'aspect-[4/3]',
    icon: Smartphone,
    enduringTendency: 'Displays strictly <6.3" · Stock clean software',
  },
];

export const BenefitPillars: React.FC = () => {
  return (
    <section id="categories" className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            The 4 Pilot Horizons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Curated by your standards.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/70 leading-relaxed font-sans">
            We focus on four areas where quality of life is heavily compromised by commercial search engines and noisy algorithms.
          </p>
        </div>

        {/* 4 Category Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Image Banner */}
                <div className={`relative ${cat.aspectRatio} w-full overflow-hidden bg-stone-100`}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                    <Icon className="w-3.5 h-3.5 text-brand-deep-green" />
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                      {cat.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-lg font-bold leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Editorial Body */}
                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="font-serif italic text-xs text-brand-terracotta leading-snug">
                      "{cat.pullQuote}"
                    </p>
                    <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-warm-stone/30 flex items-center justify-between text-[11px] font-mono text-brand-ink/60">
                    <span>{cat.enduringTendency}</span>
                    <Link
                      href="/radar"
                      className="text-brand-deep-green font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer Callout */}
        <div className="text-center pt-4">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-deep-green text-white text-xs font-bold hover:bg-[#162B25] transition-all shadow-sm active:scale-95"
          >
            <span>Try It Now in Live App</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
};
