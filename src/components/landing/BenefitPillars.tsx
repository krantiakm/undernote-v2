'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Coffee, BookOpen, Smartphone, CheckCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const PILLARS = [
  {
    id: 'travel',
    icon: Plane,
    tag: 'Escapes & Journeys',
    title: 'Travel that already knows your non-negotiables.',
    description:
      'Traveling with a child means transit fatigue ruins vacations. Undernote automatically discards any flight with a layover, regardless of how cheap it looks, and surfaces child-safe boutique sanctuaries with quiet room zoning.',
    highlight: 'Non-stop direct flights from BLR • Child-safe boutique villas • Zero layovers',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    sampleFind: {
      title: 'Sri Lanka Coastal Villa + Direct BLR Flight',
      badge: '🎯 Dec Intent Matched',
      price: '₹14,200 flight + ₹18k/night villa',
      why: 'Direct 85m hop. Private plunge pool with child safety gate.',
    },
  },
  {
    id: 'coffee',
    icon: Coffee,
    tag: 'Taste & Gastronomy',
    title: 'Micro-lots and seasonal roasts before they sell out.',
    description:
      'Commercial coffee is stale and generic. When an anaerobic micro-lot with jasmine floral and stone-fruit notes is released by neighborhood roasters, Undernote alerts you within hours of the roast date.',
    highlight: 'Anaerobic light/medium roasts • Floral & stone-fruit profiles • Fresh 48h roast batches',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    sampleFind: {
      title: 'Araku Micro-Lot 40kg Harvest Release',
      badge: '✨ Proactive Taste Match',
      price: '₹790 / 250g bag',
      why: 'Harvested in Eastern Ghats. Peach & jasmine notes matching your exact pour-over palate.',
    },
  },
  {
    id: 'culture',
    icon: BookOpen,
    tag: 'Culture & Curiosity',
    title: 'Books, intimate theatre, and heritage walks.',
    description:
      'Instead of bestseller lists engineered for mass appeal, discover unamplified 200-seat acoustic theatre productions, indie bookstore releases on architecture, and heritage dawn walks that match your weekend pacing.',
    highlight: '200-seat acoustic theatre • Architectural literature • Unhurried morning walks',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
    sampleFind: {
      title: 'Christopher Alexander "The Nature of Order" Rare Print',
      badge: '✨ Indie Bookstore Gem',
      price: '₹3,400 (Champaca Bangalore)',
      why: 'Seminal urbanism text matching your persistent craft and design interest.',
    },
  },
  {
    id: 'hardware',
    icon: Smartphone,
    tag: 'Tactile Hardware',
    title: 'Tools that fit your life, not affiliate commission lists.',
    description:
      'Tired of tech blogs pushing bulky 6.9-inch phables? Undernote monitors compact hardware under 6.3 inches with clean OS and ultralight camera bodies under 500g, alerting you when verified price drops occur.',
    highlight: 'Phone screens < 6.3 inches • Clean OS • Ultralight camera gear < 500g',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    sampleFind: {
      title: 'Pixel 11 Compact Flagship Drop',
      badge: '🎯 Target Price Breached',
      price: '₹56,499 (Watch: <₹60k)',
      why: 'Single-hand grip ergonomic limit met with clean Android OS and 7 years of support.',
    },
  },
];

export const BenefitPillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="benefits" className="py-24 sm:py-32 bg-brand-ivory relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta">
            <Sparkles size={13} />
            <span>Benefits Over Features</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-brand-ink leading-tight">
            Curated for how you{' '}
            <span className="relative italic font-medium text-brand-deep-green">
              actually live.
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-light leading-relaxed">
            Personal context isn't an abstract database. It's the filter that transforms an overwhelming web into a quiet stream of opportunities you genuinely care about.
          </p>
        </div>

        {/* 4 Lifestyle Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-brand-warm-stone/70 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group"
              >
                {/* Visual Imagery Banner */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-brand-deep-green">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-brand-deep-green shadow-soft">
                    <Icon size={12} className="text-brand-terracotta" />
                    <span>{pillar.tag}</span>
                  </div>

                  {/* Sample Opportunity Overlay Pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-elevated border border-brand-warm-stone/50">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-terracotta/15 text-brand-terracotta font-mono">
                        {pillar.sampleFind.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        {pillar.sampleFind.price}
                      </span>
                    </div>
                    <h5 className="font-serif font-bold text-xs text-brand-ink truncate">
                      {pillar.sampleFind.title}
                    </h5>
                    <p className="text-[11px] text-brand-ink-light truncate mt-0.5">
                      {pillar.sampleFind.why}
                    </p>
                  </div>
                </div>

                {/* Card Content & Narrative */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-ink group-hover:text-brand-deep-green transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-ink-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Rule Highlights */}
                  <div className="pt-3 border-t border-brand-warm-stone/40">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-deep-green">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>{pillar.highlight}</span>
                    </div>
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
