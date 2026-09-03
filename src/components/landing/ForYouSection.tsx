'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Film, Headphones, Utensils, Compass, BookOpen } from 'lucide-react';

const FOR_YOU_CARDS = [
  {
    tag: 'WATCH THIS',
    icon: Film,
    title: 'Nightfall & Shadows',
    subtitle: 'A neo-noir mystery you somehow missed.',
    chips: ['Slow burn', '98 min', 'Director you liked'],
    image: '/images/for_you_indie_cinema.jpg',
  },
  {
    tag: 'WORTH A LOOK',
    icon: Headphones,
    title: 'Open-Back Studio Monitors',
    subtitle: 'Machined aluminum and walnut acoustic drivers.',
    chips: ['Audiophile', 'Price dropped', 'Neutral response'],
    image: '/images/for_you_audiophile.jpg',
  },
  {
    tag: 'NEAR YOU',
    icon: Utensils,
    title: 'A new place that feels unusually your kind of Friday night.',
    subtitle: 'Natural wine bar & rustic sourdough counter.',
    chips: ['Bistro', 'Quiet courtyard', '14 min away'],
    image: '/images/for_you_bistro.jpg',
  },
  {
    tag: 'GOOD TIME TO GO',
    icon: Compass,
    title: 'The winter break you have been considering just became easier.',
    subtitle: 'Secluded Nordic timber cabin in alpine pines.',
    chips: ['Direct route', 'Right dates', 'Quiet pines'],
    image: '/images/for_you_alpine_cabin.jpg',
  },
  {
    tag: 'READ THIS',
    icon: BookOpen,
    title: 'The long-form piece you would probably have saved.',
    subtitle: 'Clothbound architectural treatise reprint.',
    chips: ['Theory', 'Systems', 'Author you read'],
    image: '/images/hero_singapore_book.jpg',
  },
];

export const ForYouSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.82;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="for-you" className="py-12 sm:py-16 bg-[#F7F3EC] border-t border-brand-warm-stone/40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header with swipe indicator on mobile */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            For You
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Things{' '}
            <span className="relative inline-block">
              worth
              <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[3px] bg-brand-terracotta rounded-full" />
            </span>{' '}
            your attention.
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
            Undernote quietly looks across the world and brings forward a small number of things that make unusual sense for you.
          </p>
        </div>

        {/* Mobile Horizontal Carousel (82% card width with peek) / Desktop Grid */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {FOR_YOU_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 md:shrink snap-center bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Large Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs">
                      <Icon size={11} className="text-brand-terracotta" />
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-ink">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Minimal Card Body */}
                  <div className="p-4 sm:p-5 space-y-2.5 flex-1 flex flex-col justify-between">
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

          {/* Mobile Carousel Navigation Arrows / Hints */}
          <div className="flex md:hidden items-center justify-between pt-3 px-2 text-xs text-stone-400">
            <span className="text-[11px] font-mono">Swipe cards &rarr;</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full bg-white border border-brand-warm-stone/60 flex items-center justify-center text-brand-ink hover:bg-stone-50 active:scale-95 shadow-xs cursor-pointer"
                aria-label="Previous card"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full bg-white border border-brand-warm-stone/60 flex items-center justify-center text-brand-ink hover:bg-stone-50 active:scale-95 shadow-xs cursor-pointer"
                aria-label="Next card"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="text-center pt-1">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 group"
          >
            <span>See what Undernote finds for me</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
          </Link>
        </div>

      </div>
    </section>
  );
};
