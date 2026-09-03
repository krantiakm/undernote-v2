'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const PersonalizationDemo: React.FC = () => {
  const [activePerson, setActivePerson] = useState<'liam' | 'elena' | 'kai'>('liam');

  const people = [
    {
      id: 'liam',
      name: 'Liam',
      focus: 'Cinema · Vinyl · Neighborhood Counters',
      cards: [
        {
          tag: 'Tonight',
          title: 'Tokyo Vinyl Listening Bar',
          image: '/images/feed_vinyl_listening.jpg',
          span: 'col-span-12 sm:col-span-7 aspect-[16/10]',
        },
        {
          tag: 'Near you',
          title: 'Artisan Counter Ramen',
          image: '/images/feed_ramen_dining.jpg',
          span: 'col-span-12 sm:col-span-5 aspect-[16/10]',
        },
        {
          tag: 'Stream release',
          title: 'Neo-Noir Mystery Film',
          image: '/images/for_you_film.jpg',
          span: 'col-span-12 aspect-[21/9]',
        },
      ],
    },
    {
      id: 'elena',
      name: 'Elena',
      focus: 'Trail Running · High Passes · Design Theory',
      cards: [
        {
          tag: 'This weekend',
          title: 'Alpine Ridge Trail Loop',
          image: '/images/feed_trail_runner.jpg',
          span: 'col-span-12 sm:col-span-7 aspect-[16/10]',
        },
        {
          tag: 'Worth knowing',
          title: 'Titanium Gravel Bike Build',
          image: '/images/feed_gravel_bike.jpg',
          span: 'col-span-12 sm:col-span-5 aspect-[16/10]',
        },
        {
          tag: 'Read this',
          title: 'A Pattern Language Treatise',
          image: '/images/hero_alexander_book.jpg',
          span: 'col-span-12 aspect-[21/9]',
        },
      ],
    },
    {
      id: 'kai',
      name: 'Kai',
      focus: 'Modern Art · Architecture · Family Retreats',
      cards: [
        {
          tag: 'Saturday',
          title: 'Modern Art Gallery Opening',
          image: '/images/feed_museum_event.jpg',
          span: 'col-span-12 sm:col-span-7 aspect-[16/10]',
        },
        {
          tag: 'Good time to go',
          title: 'Mallorca Oceanfront Villa',
          image: '/images/feed_modern_coastal.jpg',
          span: 'col-span-12 sm:col-span-5 aspect-[16/10]',
        },
        {
          tag: 'Coastal watch',
          title: 'Beachfront Quiet Sanctuary',
          image: '/images/hero_srilanka_villa.jpg',
          span: 'col-span-12 aspect-[21/9]',
        },
      ],
    },
  ];

  const currentPersonData = people.find((p) => p.id === activePerson)!;

  return (
    <section className="py-14 sm:py-20 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            One world. Different for everyone.
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            The same world. A completely{' '}
            <span className="relative inline-block">
              different fit
              <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-[3px] bg-brand-terracotta rounded-full" />
            </span>
            .
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75 font-sans">
            What deserves your attention changes depending on who you are.
          </p>
        </div>

        {/* Person Selector Tabs - compact, highly usable on mobile */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-white rounded-full border border-brand-warm-stone/60 shadow-xs max-w-md mx-auto">
          {people.map((p) => {
            const isActive = p.id === activePerson;
            return (
              <button
                key={p.id}
                onClick={() => setActivePerson(p.id as any)}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-deep-green text-white shadow-xs font-bold'
                    : 'text-brand-ink/60 hover:text-brand-ink'
                }`}
              >
                <span>For {p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Subtitle tag for selected persona */}
        <div className="text-center">
          <span className="text-xs font-serif italic text-brand-ink/70">
            {currentPersonData.focus}
          </span>
        </div>

        {/* Masonry / Grid visual presentation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPersonData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-12 gap-3 sm:gap-4"
          >
            {currentPersonData.cards.map((card, idx) => (
              <div
                key={idx}
                className={`${card.span} relative rounded-2xl overflow-hidden border border-brand-warm-stone/60 shadow-xs group bg-stone-100`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-wider">
                  {card.tag}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-serif font-bold text-sm sm:text-base leading-tight">
                    {card.title}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Section Footer note */}
        <div className="text-center pt-2">
          <p className="font-serif italic text-xs sm:text-sm text-brand-ink/80">
            Not a generic “For You” page. One built from you.
          </p>
        </div>

      </div>
    </section>
  );
};
