'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  Sparkles,
  Target,
  ArrowUpRight,
  Heart,
  BookOpen,
  Compass,
  Coffee,
  Film,
  Ticket,
  Package,
  Plane,
} from 'lucide-react';
import { CardData, RadarDomain } from '@/types';
import { useApp } from '@/context/AppContext';

interface DiscoveryCardProps {
  card: CardData;
  index: number;
}

function getCategoryMeta(domain: RadarDomain, entityType?: string, title?: string, subtitle?: string) {
  const text = `${entityType || ''} ${title || ''} ${subtitle || ''}`.toLowerCase();
  
  if (domain === 'books' || text.includes('book') || text.includes('author') || text.includes('hardcover') || text.includes('novel')) {
    return { label: entityType || 'Book', icon: BookOpen, color: 'bg-amber-950/85 text-amber-200 border-amber-500/40' };
  }
  if (domain === 'travel' || text.includes('hotel') || text.includes('villa') || text.includes('stay') || text.includes('sanctuary') || text.includes('resort')) {
    return { label: entityType || 'Travel & Stay', icon: Compass, color: 'bg-sky-950/85 text-sky-200 border-sky-400/40' };
  }
  if (text.includes('flight') || text.includes('airline') || text.includes('transit')) {
    return { label: entityType || 'Flight & Route', icon: Plane, color: 'bg-blue-950/85 text-blue-200 border-blue-400/40' };
  }
  if (domain === 'food-drink' || text.includes('coffee') || text.includes('roaster') || text.includes('dining') || text.includes('restaurant') || text.includes('pour-over') || text.includes('oven')) {
    return { label: entityType || 'Coffee & Dining', icon: Coffee, color: 'bg-stone-950/85 text-orange-200 border-orange-400/40' };
  }
  if (domain === 'films' || text.includes('film') || text.includes('movie') || text.includes('cinema') || text.includes('documentary')) {
    return { label: entityType || 'Cinema & Arts', icon: Film, color: 'bg-purple-950/85 text-purple-200 border-purple-400/40' };
  }
  if (domain === 'events' || text.includes('concert') || text.includes('recital') || text.includes('theatre') || text.includes('exhibition') || text.includes('walk')) {
    return { label: entityType || 'Experience', icon: Ticket, color: 'bg-rose-950/85 text-rose-200 border-rose-400/40' };
  }
  if (domain === 'shopping' || text.includes('hardware') || text.includes('headphone') || text.includes('jacket') || text.includes('keyboard') || text.includes('desk') || text.includes('apparel') || text.includes('gear')) {
    return { label: entityType || 'Hardware & Gear', icon: Package, color: 'bg-emerald-950/85 text-emerald-200 border-emerald-400/40' };
  }
  return { label: entityType || 'Curated Find', icon: Sparkles, color: 'bg-neutral-900/85 text-neutral-200 border-white/30' };
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ card, index }) => {
  const { saveCard } = useApp();
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const isTracked = card.originType === 'requested';
  const isSaved = card.status === 'saved';
  const priceEvidence = card.sourceEvidence?.[0];
  const catMeta = getCategoryMeta(card.domain, card.entityType, card.title, card.subtitle);

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saveCard(card.id);
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className="bg-white rounded-[26px] overflow-hidden border border-brand-warm-stone/50 shadow-soft hover:shadow-card transition-all duration-300 mb-4 group"
    >
      {/* 1. VISUAL HERO POST (Larger, cinematic image) */}
      <div
        className="relative w-full aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-brand-warm-stone/20 cursor-pointer select-none"
        onDoubleClick={handleDoubleTap}
      >
        <Link href={`/radar/${card.id}`} className="block w-full h-full relative">
          <Image
            src={card.heroImage}
            alt={card.imageAlt || card.title}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 448px"
            priority={index < 2}
          />
          {/* Cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />
        </Link>

        {/* Double-tap animated heart burst */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center pointer-events-none z-30"
            >
              <Heart size={64} className="text-white fill-brand-terracotta drop-shadow-xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Badges: Category Chip on Left + Save on Right */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          {/* Prominent Category & Entity Pill */}
          <div className="pointer-events-auto flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase backdrop-blur-md px-3 py-1 rounded-full shadow-md border ${catMeta.color}`}>
              <catMeta.icon size={12} strokeWidth={2.5} className="shrink-0" />
              <span>{catMeta.label}</span>
            </span>

            {isTracked && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide bg-emerald-900/85 text-emerald-100 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-emerald-500/30">
                <Target size={10} className="text-emerald-400" />
                <span>Watching</span>
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              saveCard(card.id);
            }}
            aria-label="Save item"
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-sm cursor-pointer ${
              isSaved
                ? 'bg-brand-terracotta text-white'
                : 'bg-black/35 hover:bg-black/55 text-white border border-white/20'
            }`}
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Hero Overlay: Category, Title, Subtitle, Price */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white flex items-end justify-between gap-3 pointer-events-none">
          <div className="flex-1 drop-shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-brand-ivory border border-white/20">
                {catMeta.label}
              </span>
              {card.subtitle && (
                <span className="text-[11px] font-medium text-brand-ivory/85 tracking-wide line-clamp-1">
                  {card.subtitle}
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
              {card.title}
            </h3>
          </div>

          {priceEvidence?.price && (
            <div className="bg-white/95 text-brand-ink backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md shrink-0 text-right pointer-events-auto">
              <span className="text-xs font-bold font-sans text-brand-deep-green block leading-none">
                {priceEvidence.price}
              </span>
              {priceEvidence.discountPercent && (
                <span className="text-[10px] font-semibold text-brand-terracotta leading-none">
                  {priceEvidence.discountPercent}% off
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. CARD ESSENTIALS (3-line rich narrative, clean footer) */}
      <div className="p-4 space-y-3">
        {/* Thoughtful 3-line narration */}
        <p className="text-xs text-brand-ink/80 leading-relaxed font-sans line-clamp-3">
          {card.summary}
        </p>

        {/* Action Row */}
        <div className="pt-2 border-t border-brand-warm-stone/40 flex items-center justify-between gap-3">
          <Link
            href={`/radar/${card.id}`}
            className="text-xs font-semibold text-brand-ink/70 hover:text-brand-terracotta flex items-center gap-1 py-1 shrink-0 transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight size={13} />
          </Link>

          <a
            href={card.deepDive.directActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 text-xs font-bold bg-brand-deep-green hover:bg-[#162B25] text-white px-4 py-2 rounded-full shadow-xs transition-all active:scale-95 shrink-0 whitespace-nowrap"
          >
            <span>{card.deepDive.directActionLabel}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
