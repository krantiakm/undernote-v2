'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Film, BookOpen, MapPin, Smartphone, Plane } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiModal: () => void;
}

const TUNED_CATEGORIES = [
  {
    id: 'films',
    name: 'Films',
    tagline: "in tune with you.",
    subtitle: "Films you'd actually want to watch.",
    icon: Film,
    card: {
      image: '/images/for_you_film.jpg',
      title: 'Past Lives',
      meta: 'Slow burn · 92 min · director you liked',
      badge: 'Streaming this Friday',
    },
  },
  {
    id: 'books',
    name: 'Books',
    tagline: "in tune with you.",
    subtitle: "Ideas that connect to what you think about.",
    icon: BookOpen,
    card: {
      image: '/images/hero_alexander_book.jpg',
      title: 'A Pattern Language',
      meta: 'Systems & Architecture · Hardcover reprint',
      badge: 'Independent bookshop',
    },
  },
  {
    id: 'places',
    name: 'Places',
    tagline: "in tune with you.",
    subtitle: "Places you'd be glad you found.",
    icon: MapPin,
    card: {
      image: '/images/feed_ramen_dining.jpg',
      title: 'Kuro Artisan Ramen',
      meta: 'Intimate counter · 12 min away · outdoor seating',
      badge: 'New opening',
    },
  },
  {
    id: 'products',
    name: 'Products',
    tagline: "in tune with you.",
    subtitle: "Products that fit how you choose.",
    icon: Smartphone,
    card: {
      image: '/images/hero_pixel11_compact.jpg',
      title: 'Compact Flagship',
      meta: 'Under 6.3" · clean software · price dropped',
      badge: 'Target price met',
    },
  },
  {
    id: 'trips',
    name: 'Trips',
    tagline: "in tune with you.",
    subtitle: "Trips that fit the way you travel.",
    icon: Plane,
    card: {
      image: '/images/hero_srilanka_villa.jpg',
      title: 'Direct Island Sanctuary',
      meta: 'Direct flight · family quiet villa · right dates',
      badge: 'Fare dropped 24%',
    },
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TUNED_CATEGORIES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const activeCategory = TUNED_CATEGORIES[currentIndex];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-[#F7F3EC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Above the fold copy - concise & clear per Section 27 */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-ink/50 font-bold block">
            UNDERNOTE
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-ink leading-[1.12]">
            A world in tune with you.
          </h1>

          <p className="text-base sm:text-lg text-brand-ink/80 max-w-xl mx-auto font-sans leading-relaxed">
            Bring what your AI already knows. Undernote turns it into a world that feels better chosen for you.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group w-full sm:w-auto cursor-pointer"
            >
              <span>Start my Undernote</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
            </button>
            <Link
              href="/radar"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-brand-warm-stone text-brand-ink text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 w-full sm:w-auto"
            >
              <span>See it in action</span>
            </Link>
          </div>

          <div className="pt-1 text-xs text-brand-ink/60 font-sans flex items-center justify-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-700" />
            <span>Your context stays yours. No sponsored ranking.</span>
          </div>
        </div>

        {/* Hero Animation - Visual Category Tuning Demonstration per Section 3 */}
        <div className="relative max-w-3xl mx-auto">
          {/* Category Navigation Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-2 scrollbar-none">
            {TUNED_CATEGORIES.map((cat, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-brand-deep-green bg-white shadow-xs font-bold'
                      : 'text-brand-ink/50 hover:text-brand-ink'
                  }`}
                >
                  <span>{cat.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroCategoryUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-terracotta rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Animated Card Display Showcase */}
          <div className="mt-4 relative bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/60 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-12 items-center"
              >
                {/* Visual Image */}
                <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:h-[340px] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={activeCategory.card.image}
                    alt={activeCategory.card.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider">
                    {activeCategory.card.badge}
                  </div>
                </div>

                {/* Editorial Tuning Statement on Right */}
                <div className="md:col-span-5 p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold block">
                      In Tune With You
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-ink leading-tight">
                      {activeCategory.name},{' '}
                      <span className="text-brand-deep-green italic font-normal">
                        {activeCategory.tagline}
                      </span>
                    </h3>
                    <p className="text-xs text-brand-ink/70 font-sans">
                      {activeCategory.subtitle}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-ivory border border-brand-warm-stone/50 space-y-1">
                    <h4 className="font-serif font-bold text-sm text-brand-ink">
                      {activeCategory.card.title}
                    </h4>
                    <p className="text-[11px] text-brand-ink/65 font-sans">
                      {activeCategory.card.meta}
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-stone-400">
                    Filtered by your enduring standards
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
