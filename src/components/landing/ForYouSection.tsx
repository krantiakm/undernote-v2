'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Film, Smartphone, Utensils, Plane, BookOpen } from 'lucide-react';

const FOR_YOU_CARDS = [
  {
    tag: 'WATCH THIS',
    icon: Film,
    title: 'Past Lives',
    subtitle: 'A film you somehow missed.',
    chips: ['Slow burn', '92 min', 'Director you liked'],
    image: '/images/for_you_film.jpg',
  },
  {
    tag: 'WORTH A LOOK',
    icon: Smartphone,
    title: 'The compact phone you were waiting for.',
    subtitle: 'Flagship hardware under 6.3 inches.',
    chips: ['Under size limit', 'Price just dropped', 'Clean software'],
    image: '/images/hero_pixel11_compact.jpg',
  },
  {
    tag: 'NEAR YOU',
    icon: Utensils,
    title: 'A new place that feels unusually your kind of Friday night.',
    subtitle: 'Artisan counter ramen in the neighborhood.',
    chips: ['Japanese', 'Outdoor seating', '12 min away'],
    image: '/images/feed_ramen_dining.jpg',
  },
  {
    tag: 'GOOD TIME TO GO',
    icon: Plane,
    title: 'The December break you have been considering just became easier.',
    subtitle: 'Direct island flight and quiet coastal villa.',
    chips: ['Direct route', 'Fare dropped', 'Right dates'],
    image: '/images/hero_srilanka_villa.jpg',
  },
  {
    tag: 'READ THIS',
    icon: BookOpen,
    title: 'The long-form piece you would probably have saved.',
    subtitle: 'A Pattern Language hardcover reprint.',
    chips: ['Architecture', 'Systems', 'Author you read'],
    image: '/images/hero_alexander_book.jpg',
  },
];

export const ForYouSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            For You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Things worth your attention.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Undernote quietly looks across the world and brings forward a small number of things that make unusual sense for you.
          </p>
        </div>

        {/* Cards Stream - 50% less copy, clean chips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOR_YOU_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Large Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                    <Icon size={11} className="text-brand-terracotta" />
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                      {card.tag}
                    </span>
                  </div>
                </div>

                {/* Minimal Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-brand-ink leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-brand-ink/65 font-sans">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Clean Filter Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#F7F3EC] text-brand-ink/75 border border-brand-warm-stone/50"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center pt-2">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 group"
          >
            <span>See what Undernote finds for me</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
          </Link>
        </div>

      </div>
    </section>
  );
};
