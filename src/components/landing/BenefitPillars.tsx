'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Coffee, BookOpen, Smartphone, Sparkles, CheckCircle2, Shield } from 'lucide-react';

const PILLARS = [
  {
    id: 'travel',
    icon: Plane,
    tag: 'Escapes & Travel',
    title: 'Zero-compromise travel for your family.',
    story:
      'If you have young kids, a 12-hour layover in Bangkok isn’t a "deal"—it’s exhausting. Undernote locks in your non-negotiables: non-stop direct flights only, child-safe boutique villas with private pools, and departs strictly from your home airport.',
    highlight: 'Non-stop flights from BLR • Child-safe sanctuaries • Zero layover fatigue',
    sampleBadge: 'Direct BLR ➔ Sri Lanka · Dec 20–27',
    price: '₹14,200 direct',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coffee',
    icon: Coffee,
    tag: 'Specialty Taste',
    title: 'Micro-lot harvests before they sell out.',
    story:
      'When your neighborhood roastery releases a rare 40kg anaerobic micro-lot with peach and jasmine notes, it sells out in a few hours. Undernote watches harvests matching your pour-over palate and alerts you the day it’s roasted.',
    highlight: 'Anaerobic light/medium roasts • Floral & stone-fruit notes • 48h roast batches',
    sampleBadge: 'Araku Seasonal 40kg Harvest',
    price: '₹790 / 250g',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'culture',
    icon: BookOpen,
    tag: 'Books & Culture',
    title: 'Books and intimate theatre aligned with your mind.',
    story:
      'No airport bestsellers or algorithmic hype. Discover seminal architectural literature from indie bookstores like Champaca, unamplified 200-seat acoustic theatre productions, and quiet heritage dawn walks that match your weekend rhythm.',
    highlight: '200-seat acoustic theatre • Indie architectural prints • Dawn heritage walks',
    sampleBadge: 'Champaca Indie Book Release',
    price: '₹3,400 Hardcover',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hardware',
    icon: Smartphone,
    tag: 'Mindful Goods',
    title: 'Tools that fit your hands, not affiliate blogs.',
    story:
      'Why are phones getting heavier when hands aren’t? Undernote monitors compact hardware under 6.3 inches with clean OS and ultralight camera bodies under 500g, alerting you the exact moment verified prices drop.',
    highlight: 'Screens under 6.3" • Clean stock OS • Ultralight camera bodies <500g',
    sampleBadge: 'Pixel 11 Compact Price Drop',
    price: '₹56,499 (Target Met)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  },
];

export const BenefitPillars: React.FC = () => {
  return (
    <section id="curations" className="py-20 sm:py-32 bg-brand-ivory relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Sparkles size={13} />
            <span>Real-Life Curation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Curated for how you{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              actually live.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Personal context isn’t an abstract database. It’s the filter that turns the overwhelming internet into a quiet stream of things you genuinely care about.
          </p>
        </div>

        {/* 4 Rich Lifestyle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/70 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                {/* Visual Image Banner with Subtle Badge */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-neutral-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-brand-deep-green shadow-soft">
                    <Icon size={12} className="text-brand-terracotta" />
                    <span>{pillar.tag}</span>
                  </div>

                  {/* Sample Opportunity Badge */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="bg-brand-deep-green/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px]">
                      {pillar.sampleBadge}
                    </span>
                    <span className="font-mono text-emerald-300 bg-black/40 px-2 py-0.5 rounded text-[11px]">
                      {pillar.price}
                    </span>
                  </div>
                </div>

                {/* Editorial Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ink group-hover:text-brand-deep-green transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                      {pillar.story}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-warm-stone/40 flex items-center gap-2 text-xs font-semibold text-brand-deep-green">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>{pillar.highlight}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
