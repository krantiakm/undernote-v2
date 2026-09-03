'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Film, BookOpen, Utensils, Smartphone, Plane } from 'lucide-react';

const FOR_YOU_CARDS = [
  {
    tag: 'Watch this',
    icon: Film,
    title: 'A film that is unusually your kind of strange.',
    meta: 'New release · streaming this Friday',
    whyFits: 'Slow-burn mystery, 92 minutes, director you previously liked.',
    image: '/images/for_you_film.jpg',
  },
  {
    tag: 'Read this',
    icon: BookOpen,
    title: 'The long-form piece you would probably have saved if you had seen it.',
    meta: 'Architecture / cities / systems',
    whyFits: 'Connects directly to a subject you have been exploring.',
    image: '/images/hero_alexander_book.jpg',
  },
  {
    tag: 'Near you',
    icon: Utensils,
    title: 'A new place ten minutes away that fits your idea of a good Friday night.',
    meta: 'Dining · outdoor seating · easy drive',
    whyFits: 'Cuisine you like · outdoor seating · easy drive.',
    image: '/images/landing_group_dining.jpg',
  },
  {
    tag: 'Worth a look',
    icon: Smartphone,
    title: 'The compact phone you were waiting for just crossed your price.',
    meta: 'Hardware · under 6.3" display',
    whyFits: 'Under your size limit · clean Android · now below ₹60,000.',
    image: '/images/hero_pixel11_compact.jpg',
  },
  {
    tag: 'Good time to go',
    icon: Plane,
    title: 'The December break you have been considering just became easier.',
    meta: 'Travel · Dec 20–27',
    whyFits: 'Direct flight · right dates · fare dropped.',
    image: '/images/hero_srilanka_villa.jpg',
  },
];

export const ForYouSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
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

        {/* Cards Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOR_YOU_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Tag Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                    <Icon size={12} className="text-brand-terracotta" />
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                      {card.tag}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-stone-400">
                      {card.meta}
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-ink leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-warm-stone/40 space-y-0.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-brand-deep-green block">
                      Why this fits you
                    </span>
                    <p className="text-xs text-brand-ink/75 leading-relaxed font-sans">
                      {card.whyFits}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group"
          >
            <span>See my For You</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
          </Link>
        </div>

      </div>
    </section>
  );
};
