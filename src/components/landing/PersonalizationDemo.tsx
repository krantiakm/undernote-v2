'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const PersonalizationDemo: React.FC = () => {
  const feeds = [
    {
      id: 'liam',
      name: 'Liam',
      vibe: 'Cinema · Vinyl · Neighborhood Counters',
      cards: [
        {
          tag: 'Tonight',
          title: 'Tokyo Vinyl Listening Bar',
          meta: 'Curated records & analog acoustics',
          image: '/images/feed_vinyl_listening.jpg',
        },
        {
          tag: 'Near you',
          title: 'Artisan Counter Ramen',
          meta: '12 min away · Outdoor courtyard',
          image: '/images/feed_ramen_dining.jpg',
        },
        {
          tag: 'Stream release',
          title: 'Neo-Noir Film Premiere',
          meta: '94 min · Director you liked',
          image: '/images/for_you_film.jpg',
        },
      ],
    },
    {
      id: 'elena',
      name: 'Elena',
      vibe: 'Trail Running · High Passes · Design Theory',
      cards: [
        {
          tag: 'This weekend',
          title: 'Alpine Ridge Trail Loop',
          meta: 'Weather clearing · 14km mountain loop',
          image: '/images/feed_trail_runner.jpg',
        },
        {
          tag: 'Worth knowing',
          title: 'Titanium Gravel Bike Build',
          meta: 'Passo Giau pass · lightweight carbon',
          image: '/images/feed_gravel_bike.jpg',
        },
        {
          tag: 'Read this',
          title: 'A Pattern Language Treatise',
          meta: 'Christopher Alexander reprint',
          image: '/images/hero_alexander_book.jpg',
        },
      ],
    },
    {
      id: 'kai',
      name: 'Kai',
      vibe: 'Modern Art · Architecture · Family Retreats',
      cards: [
        {
          tag: 'Saturday',
          title: 'Modern Art Gallery Opening',
          meta: 'Contemporary sculpture · Morning daylight',
          image: '/images/feed_museum_event.jpg',
        },
        {
          tag: 'Good time to go',
          title: 'Mallorca Oceanfront Villa',
          meta: 'Direct flight · Family quiet bay',
          image: '/images/feed_modern_coastal.jpg',
        },
        {
          tag: 'Coastal watch',
          title: 'Beachfront Quiet Sanctuary',
          meta: 'Child-safe pool · Private garden',
          image: '/images/hero_srilanka_villa.jpg',
        },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            One world. Different for everyone.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            The same world. A completely different fit.
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75 font-sans">
            What deserves your attention changes depending on who you are.
          </p>
        </div>

        {/* 3 Visual Feeds with Global Names per user feedback */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-brand-warm-stone/50 shadow-xs space-y-3.5 flex flex-col justify-between"
            >
              {/* Persona Header with clean global name */}
              <div className="space-y-0.5 pb-2 border-b border-brand-warm-stone/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">
                    For {feed.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-brand-deep-green bg-brand-deep-green/10 px-2 py-0.5 rounded-full font-bold">
                    Tuned
                  </span>
                </div>
                <p className="text-[11px] font-serif italic text-brand-ink/65">
                  {feed.vibe}
                </p>
              </div>

              {/* Stack of Visual Cards with distinct images */}
              <div className="space-y-2.5">
                {feed.cards.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className="rounded-2xl overflow-hidden border border-brand-warm-stone/40 bg-brand-ivory group"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-mono uppercase">
                        {card.tag}
                      </div>
                    </div>
                    <div className="p-2.5 space-y-0.5">
                      <h4 className="font-serif font-bold text-xs text-brand-ink leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-brand-ink/65 font-sans">
                        {card.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-mono text-stone-400 pt-1.5 border-t border-brand-warm-stone/20">
                Tuned by active preferences
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="text-center pt-1">
          <p className="font-serif italic text-sm sm:text-base text-brand-ink font-semibold">
            Not a generic “For You” page. One built from you.
          </p>
        </div>

      </div>
    </section>
  );
};
