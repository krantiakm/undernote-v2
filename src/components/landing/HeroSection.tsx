'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Plane, ShoppingBag, Film, BookOpen, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiModal: () => void;
}

const TUNED_CATEGORIES = [
  {
    id: 'trips',
    name: 'Trips',
    card: {
      image: '/images/hero_srilanka_villa.jpg',
      title: 'Direct Island Sanctuary',
      description: 'Family quiet villa reachable by direct non-stop flight on your open dates.',
      badge: 'Fare dropped 24%',
      chips: ['Direct flight', 'Quiet beachfront', 'Right dates'],
    },
  },
  {
    id: 'shopping',
    name: 'Shopping',
    card: {
      image: '/images/hero_pixel11_compact.jpg',
      title: 'Compact Flagship Phone',
      description: 'Sub-6.3" ergonomic hardware with clean stock software, now at target price.',
      badge: 'Target price met',
      chips: ['Under 6.3"', 'Stock OS', 'Price clearance'],
    },
  },
  {
    id: 'films',
    name: 'Films',
    card: {
      image: '/images/for_you_film.jpg',
      title: 'Past Lives',
      description: 'Slow-burn cinematic drama from a director you liked, streaming this weekend.',
      badge: 'Streaming Friday',
      chips: ['92 min', 'Slow burn', 'Director match'],
    },
  },
  {
    id: 'books',
    name: 'Books',
    card: {
      image: '/images/hero_alexander_book.jpg',
      title: 'A Pattern Language',
      description: 'Clothbound architectural monograph reprint in stock at an indie bookshop.',
      badge: 'Hardcover reprint',
      chips: ['Systems theory', 'Clothbound', 'Independent shop'],
    },
  },
  {
    id: 'experiences',
    name: 'Experiences',
    card: {
      image: '/images/hero_theatre_acoustic.jpg',
      title: 'Acoustic Stage Recital',
      description: 'Unamplified natural timber auditorium performance with 200-seat intimacy.',
      badge: 'Tickets just opened',
      chips: ['Unamplified', '200 seats', 'Saturday 8 PM'],
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
    <section className="relative pt-20 pb-10 sm:pt-24 sm:pb-14 overflow-hidden bg-[#F7F3EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4 sm:space-y-6">
        
        {/* Concise Header - slightly smaller font to fit within the mobile fold */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-ink leading-[1.15]">
            A world in tune with you.
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-brand-ink/80 max-w-md mx-auto font-sans leading-relaxed">
            Bring what your AI already knows. Undernote turns it into a world that feels better chosen for you.
          </p>
        </div>

        {/* Category Navigation Bar - Brought right into the first fold */}
        <div className="relative max-w-3xl mx-auto space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto py-1 scrollbar-none">
            {TUNED_CATEGORIES.map((cat, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'text-brand-deep-green bg-white shadow-xs font-bold'
                      : 'text-brand-ink/50 hover:text-brand-ink'
                  }`}
                >
                  <span>{cat.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroCategoryUnderline"
                      className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-brand-terracotta rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Animated Category Card - Clean, product-focused, NO repetitive 'filtered by' line */}
          <div className="relative bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/60 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-12 items-center"
              >
                {/* Visual Image */}
                <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:h-[270px] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={activeCategory.card.image}
                    alt={activeCategory.card.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider">
                    {activeCategory.card.badge}
                  </div>
                </div>

                {/* Card Text: Purely about the product/experience shown */}
                <div className="md:col-span-5 p-4 sm:p-6 space-y-2.5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold block">
                      {activeCategory.name}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-ink leading-snug">
                      {activeCategory.card.title}
                    </h3>
                    <p className="text-xs text-brand-ink/75 font-sans leading-relaxed">
                      {activeCategory.card.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {activeCategory.card.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F7F3EC] text-brand-ink/70 border border-brand-warm-stone/50"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Primary CTA Placed Directly Below the Showcase */}
        <div className="pt-2 text-center space-y-2">
          <button
            onClick={onOpenAiModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group cursor-pointer"
          >
            <span>Start my Undernote</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
          </button>

          <div className="text-[11px] text-brand-ink/60 font-sans flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} className="text-emerald-700" />
            <span>Your context stays yours. No sponsored ranking.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
