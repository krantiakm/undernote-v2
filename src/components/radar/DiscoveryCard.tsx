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
  ChevronDown,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { CardData } from '@/types';
import { useApp } from '@/context/AppContext';

interface DiscoveryCardProps {
  card: CardData;
  index: number;
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ card, index }) => {
  const { saveCard } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const isTracked = card.originType === 'requested';
  const isSaved = card.status === 'saved';
  const priceEvidence = card.sourceEvidence?.[0];

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
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-[28px] overflow-hidden border border-brand-warm-stone/50 shadow-soft hover:shadow-card transition-all duration-300 mb-5 group"
    >
      {/* 1. VISUAL HERO POST (Instagram / Kinfolk style) */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-brand-warm-stone/20 cursor-pointer select-none"
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
          {/* Subtle cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
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

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          {/* Origin Pill */}
          <div className="pointer-events-auto">
            {isTracked ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide bg-emerald-900/85 text-emerald-100 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-emerald-500/30">
                <Target size={11} className="text-emerald-400" />
                <span>Tracked Alert</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide bg-brand-deep-green/90 text-brand-ivory backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20">
                <Sparkles size={11} className="text-brand-terracotta-light" />
                <span>Proactive Match</span>
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
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-sm ${
              isSaved
                ? 'bg-brand-terracotta text-white'
                : 'bg-black/35 hover:bg-black/55 text-white border border-white/20'
            }`}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Hero Overlay: Title, Subtitle, Price */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white flex items-end justify-between gap-3 pointer-events-none">
          <div className="flex-1 drop-shadow-md">
            {card.subtitle && (
              <span className="text-[11px] font-medium text-brand-ivory/85 tracking-wide block line-clamp-1">
                {card.subtitle}
              </span>
            )}
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
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

      {/* 2. CARD ESSENTIALS (Ultra-Clean & Minimal) */}
      <div className="p-4 space-y-3">
        {/* 1-Line Summary with tap to expand */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs text-brand-ink-muted leading-relaxed font-sans line-clamp-2 flex-1">
            {card.summary}
          </p>
        </div>

        {/* Tap-to-Reveal Why It Fits Pill */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 px-3 rounded-2xl bg-brand-ivory hover:bg-brand-warm-stone/30 border border-brand-warm-stone/50 flex items-center justify-between text-xs text-brand-deep-green font-medium transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-brand-terracotta" />
            <span className="text-[11px]">
              {Math.round(card.relevanceScore * 100)}% Match: {card.relevanceReason[0]}
            </span>
          </div>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 text-brand-ink-light ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* REVEAL ON TAP DRAWER */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-2.5 pt-1 text-xs"
            >
              {/* Why Now snippet */}
              <div className="bg-brand-ivory-light p-2.5 rounded-xl border border-brand-warm-stone/40 text-[11px] text-brand-ink">
                <span className="font-semibold text-brand-terracotta">Why Now: </span>
                <span>{card.whyNow}</span>
              </div>

              {/* Matched Bedrock Rules List */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-brand-ink-light block">
                  Matched Personal Bedrock:
                </span>
                <div className="flex flex-wrap gap-1">
                  {card.relevanceReason.map((reason, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white text-brand-deep-green border border-brand-sage/40 px-2 py-0.5 rounded-md"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Row */}
        <div className="pt-2 border-t border-brand-warm-stone/30 flex items-center justify-between gap-2">
          <Link
            href={`/radar/${card.id}`}
            className="text-xs font-semibold text-brand-deep-green hover:text-brand-terracotta flex items-center gap-1 py-1 transition-colors"
          >
            <span>Story & Details</span>
            <ArrowUpRight size={13} />
          </Link>

          <a
            href={card.deepDive.directActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory px-4 py-2 rounded-full shadow-xs transition-all active:scale-95"
          >
            <span>{card.deepDive.directActionLabel}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
