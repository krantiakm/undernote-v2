'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Plane, ShoppingBag, Film, BookOpen, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAiModal: () => void;
}

// Exact order requested: Trips, Shopping, Films, Books, Experiences
const TUNED_CATEGORIES = [
  {
    id: 'trips',
    name: 'Trips',
    tagline: 'in tune with you.',
    subtitle: 'Trips that fit the way you travel.',
    icon: Plane,
    card: {
      image: '/images/hero_srilanka_villa.jpg',
      title: 'Direct Island Sanctuary',
      meta: 'Direct flight · family quiet villa · right dates',
      badge: 'Fare dropped 24%',
    },
  },
  {
    id: 'shopping',
    name: 'Shopping',
    tagline: 'in tune with you.',
    subtitle: 'Products that fit how you choose.',
    icon: ShoppingBag,
    card: {
      image: '/images/hero_pixel11_compact.jpg',
      title: 'Compact Flagship',
      meta: 'Under 6.3" · clean software · price dropped',
      badge: 'Target price met',
    },
  },
  {
    id: 'films',
    name: 'Films',
    tagline: 'in tune with you.',
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
    tagline: 'in tune with you.',
    subtitle: 'Ideas that connect to what you think about.',
    icon: BookOpen,
    card: {
      image: '/images/hero_alexander_book.jpg',
      title: 'A Pattern Language',
      meta: 'Systems & Architecture · Hardcover reprint',
      badge: 'Independent bookshop',
    },
  },
  {
    id: 'experiences',
    name: 'Experiences',
    tagline: 'in tune with you.',
    subtitle: "Evenings and moments you'd be glad you found.",
    icon: Sparkles,
    card: {
      image: '/images/hero_theatre_acoustic.jpg',
      title: 'Acoustic Stage Recital',
      meta: 'Intimate 200-seat natural resonance · 8 PM',
      badge: 'Tickets just opened',
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
    <section className="relative pt-20 pb-8 sm:pt-28 sm:pb-16 overflow-hidden bg-[#F7F3EC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 sm:space-y-8">
        
        {/* Above the fold copy - tightened spacing, no redundant "Undernote" eyebrow */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-ink leading-[1.12]">
            A world in tune with you.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-brand-ink/80 max-w-xl mx-auto font-sans leading-relaxed">
            Bring what your AI already knows. Undernote turns it into a world that feels better chosen for you.
          </p>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group w-full sm:w-auto cursor-pointer"
            >
              <span>Start my Undernote</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
            </button>
            <Link
              href="/radar"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white hover:bg-stone-50 border border-brand-warm-stone text-brand-ink text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 w-full sm:w-auto"
            >
              <span>See it in action</span>
            </Link>
          </div>

          <div className="text-[11px] text-brand-ink/60 font-sans flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} className="text-emerald-700" />
            <span>Your context stays yours. No sponsored ranking.</span>
          </div>
        </div>

        {/* Hero Animation - Brought higher up into fold, mobile-optimized */}
        <div className="relative max-w-3xl mx-auto">
          {/* Category Navigation Bar */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
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

          {/* Animated Card Display Showcase */}
          <div className="mt-2.5 relative bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/60 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-12 items-center"
              >
                {/* Visual Image */}
                <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:h-[290px] w-full bg-stone-100 overflow-hidden">
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

                {/* Editorial Tuning Statement on Right */}
                <div className="md:col-span-5 p-5 sm:p-6 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold block">
                      In Tune With You
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ink leading-tight">
                      {activeCategory.name},{' '}
                      <span className="text-brand-deep-green italic font-normal">
                        {activeCategory.tagline}
                      </span>
                    </h3>
                    <p className="text-xs text-brand-ink/70 font-sans">
                      {activeCategory.subtitle}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-brand-ivory border border-brand-warm-stone/50 space-y-0.5">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-ink">
                      {activeCategory.card.title}
                    </h4>
                    <p className="text-[11px] text-brand-ink/65 font-sans">
                      {activeCategory.card.meta}
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-stone-400">
                    Filtered by your enduring context
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
