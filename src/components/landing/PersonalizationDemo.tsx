'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Film, Utensils, Ticket, Compass, Smartphone, BookOpen, MapPin, Plane } from 'lucide-react';

export const PersonalizationDemo: React.FC = () => {
  const feeds = [
    {
      id: 'feed-1',
      label: 'Feed 01',
      vibe: 'Cinema · Neighborhood Dining · Live Sets',
      cards: [
        {
          tag: 'Tonight',
          title: 'Korean Noir Premiere',
          meta: '92 min · Streaming this Friday',
          image: '/images/for_you_film.jpg',
        },
        {
          tag: 'Near you',
          title: 'Artisan Counter Ramen',
          meta: '12 min away · Outdoor courtyard',
          image: '/images/feed_ramen_dining.jpg',
        },
        {
          tag: 'This weekend',
          title: 'Acoustic Stage Recital',
          meta: 'Saturday 7:30 PM · Intimate hall',
          image: '/images/hero_theatre_acoustic.jpg',
        },
      ],
    },
    {
      id: 'feed-2',
      label: 'Feed 02',
      vibe: 'Trail Running · Hardware · Complex Systems',
      cards: [
        {
          tag: 'Worth knowing',
          title: 'Alpine Ridge Trail Watch',
          meta: 'Weather clearing · 14km loop',
          image: '/images/feed_trail_runner.jpg',
        },
        {
          tag: 'Price drop',
          title: 'Compact Flagship Phone',
          meta: 'Under 6.3" display · clean software',
          image: '/images/hero_pixel11_compact.jpg',
        },
        {
          tag: 'Read this',
          title: 'Systems & Architecture Essay',
          meta: 'Christopher Alexander reprint',
          image: '/images/hero_alexander_book.jpg',
        },
      ],
    },
    {
      id: 'feed-3',
      label: 'Feed 03',
      vibe: 'Visual Arts · Architecture · Family Travel',
      cards: [
        {
          tag: 'This weekend',
          title: 'Modern Art Installation',
          meta: 'Contemporary gallery · Saturday open',
          image: '/images/feed_museum_event.jpg',
        },
        {
          tag: 'Good time to go',
          title: 'Direct Island Coastal Villa',
          meta: 'Direct flight · Quiet family dates',
          image: '/images/hero_srilanka_villa.jpg',
        },
        {
          tag: 'Near you',
          title: 'Architectural Monograph Repress',
          meta: 'Independent neighborhood bookshop',
          image: '/images/hero_singapore_book.jpg',
        },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            One world. Different for everyone.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            The same world. A completely different fit.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            What deserves your attention changes depending on who you are.
          </p>
        </div>

        {/* 3 Visual Feeds Side by Side - Pure Visual Cards per Section 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="bg-white rounded-3xl p-5 border border-brand-warm-stone/50 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-1 pb-1 border-b border-brand-warm-stone/30">
                <span className="text-[10px] font-mono uppercase font-bold text-brand-terracotta">
                  {feed.label}
                </span>
                <p className="text-xs font-serif italic text-brand-ink/70">
                  {feed.vibe}
                </p>
              </div>

              {/* Stack of Visual Cards */}
              <div className="space-y-3">
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
                    <div className="p-3 space-y-0.5">
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

              <div className="text-[10px] font-mono text-stone-400 pt-2 border-t border-brand-warm-stone/20">
                Tuned by active preferences
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="text-center pt-2 space-y-4">
          <p className="font-serif italic text-base text-brand-ink font-semibold">
            Not a generic “For You” page. One built from you.
          </p>
        </div>

      </div>
    </section>
  );
};
