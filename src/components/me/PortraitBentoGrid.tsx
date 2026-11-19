'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoWorldCard, RhythmSnapshot } from '@/lib/portraitEngine';
import { GeographyAnchor } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import {
  IconArrowUpRight,
  IconClose,
  IconSliders,
  IconSparkNote,
} from '@/components/ui/BrandIcons';

interface PortraitBentoGridProps {
  rhythm: RhythmSnapshot;
  worlds: BentoWorldCard[];
  illuminationPercent: number;
  geography: GeographyAnchor;
  onSetGeography: (geo: GeographyAnchor) => void;
  onQuickToggleRule: (rule: {
    key: string;
    value: string;
    type: 'preference' | 'constraint';
  }) => void;
}

export const PortraitBentoGrid: React.FC<PortraitBentoGridProps> = ({
  rhythm,
  worlds,
  illuminationPercent,
  geography,
  onSetGeography,
  onQuickToggleRule,
}) => {
  const [expandedWorld, setExpandedWorld] = useState<BentoWorldCard | null>(null);

  return (
    <div className="space-y-3.5">
      {/* ====================================================================
          1. VISUAL INFOGRAPHIC DIALS (2-COLUMN BENTO WIDGETS — ZERO PARAGRAPHS)
         ==================================================================== */}
      <div className="grid grid-cols-2 gap-3">
        {/* Dial A: 24h Horizon & Curtain Arc */}
        <button
          type="button"
          onClick={() =>
            onQuickToggleRule(
              rhythm.isEarlyCurtain
                ? {
                    key: 'Open to Late Evenings',
                    value: 'Happy staying out past 10:00 PM for great evening sets and screenings.',
                    type: 'preference',
                  }
                : {
                    key: 'Early Weeknight Finish',
                    value: 'Prefer punctual weeknight curtains that wrap up cleanly by 9:30 PM.',
                    type: 'constraint',
                  }
            )
          }
          className="editorial-surface rounded-[22px] p-3.5 text-left flex flex-col justify-between space-y-2.5 hover:shadow-card active:scale-[0.98] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
              Evening Clock
            </span>
            <span className="text-[9.5px] text-brand-ink-light group-hover:text-brand-deep-green">
              Tap to flip
            </span>
          </div>

          {/* Semicircular Sun-to-Moon Horizon Infographic */}
          <div className="flex justify-center py-0.5">
            <svg width="128" height="58" viewBox="0 0 128 58" className="overflow-visible">
              {/* Base Horizon Track */}
              <path
                d="M 10 50 A 54 54 0 0 1 118 50"
                fill="none"
                stroke="#DDD6CB"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Active Lit Window Arc */}
              <motion.path
                initial={false}
                animate={{
                  d: rhythm.isEarlyCurtain
                    ? 'M 18 34 A 54 54 0 0 1 92 22'
                    : 'M 56 8 A 54 54 0 0 1 118 50',
                }}
                fill="none"
                stroke={rhythm.isEarlyCurtain ? '#24483F' : '#C66E45'}
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Horizon Baseline */}
              <line x1="4" y1="50" x2="124" y2="50" stroke="#DDD6CB" strokeWidth="1" />
              {/* Animated Marker Dot */}
              <motion.circle
                initial={false}
                animate={{
                  cx: rhythm.isEarlyCurtain ? 92 : 114,
                  cy: rhythm.isEarlyCurtain ? 22 : 42,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                r="5.5"
                fill="#C66E45"
                stroke="#FAF7F2"
                strokeWidth="2"
              />
              <text x="10" y="57" fontSize="8" fill="#61736E" fontWeight="600">
                7 AM
              </text>
              <text x="53" y="57" fontSize="8" fill="#61736E" fontWeight="600">
                7 PM
              </text>
              <text x="96" y="57" fontSize="8" fill="#61736E" fontWeight="600">
                11 PM
              </text>
            </svg>
          </div>

          <div>
            <p className="font-sans text-[13.5px] font-semibold text-brand-ink leading-tight">
              {rhythm.isEarlyCurtain ? 'Home by 9:30 PM' : 'Late-Night Open'}
            </p>
            <p className="text-[10.5px] text-brand-ink-light mt-0.5">
              {rhythm.hasMorningLight ? '+ 7:15 AM walks active' : 'Evening-led rhythm'}
            </p>
          </div>
        </button>

        {/* Dial B: Room Scale & Acoustic Density */}
        <button
          type="button"
          onClick={() =>
            onQuickToggleRule(
              rhythm.isIntimateScale
                ? {
                    key: 'Lively Late-Evening Social Rooms',
                    value: 'Enjoys vinyl listening bars, open-air live stages, and buzzing rooms.',
                    type: 'preference',
                  }
                : {
                    key: 'Intimate Unamplified Rooms',
                    value: 'Prefer seated, conversational rooms under 300 seats over standing bars.',
                    type: 'constraint',
                  }
            )
          }
          className="editorial-surface rounded-[22px] p-3.5 text-left flex flex-col justify-between space-y-2.5 hover:shadow-card active:scale-[0.98] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
              Room Scale
            </span>
            <span className="text-[9.5px] text-brand-ink-light group-hover:text-brand-deep-green">
              Tap to flip
            </span>
          </div>

          {/* Concentric Acoustic Capacity Infographic */}
          <div className="flex flex-col items-center justify-center py-1 space-y-2">
            <svg width="116" height="44" viewBox="0 0 116 44">
              {[18, 34, 52, 72, 94].map((xPos, idx) => {
                const active = rhythm.isIntimateScale ? idx <= 1 : idx >= 2;
                const barH = 12 + idx * 5.5;
                return (
                  <motion.rect
                    key={idx}
                    x={xPos}
                    y={40 - barH}
                    width="10"
                    height={barH}
                    rx="4"
                    animate={{
                      fill: active
                        ? rhythm.isIntimateScale
                          ? '#24483F'
                          : '#C66E45'
                        : '#E6DFD3',
                    }}
                  />
                );
              })}
            </svg>
          </div>

          <div>
            <p className="font-sans text-[13.5px] font-semibold text-brand-ink leading-tight">
              {rhythm.isIntimateScale ? 'Intimate (<300)' : 'Buzzing & Social'}
            </p>
            <p className="text-[10.5px] text-brand-ink-light mt-0.5">
              {rhythm.isIntimateScale ? 'Seated · Acoustic first' : 'Vinyl bars & live stages'}
            </p>
          </div>
        </button>
      </div>

      {/* ====================================================================
          2. TACTILE VISUAL STAMPS BAR (DIET, FAMILY, HOME CITY)
         ==================================================================== */}
      <div className="editorial-surface rounded-[20px] p-3 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            type="button"
            onClick={() =>
              onQuickToggleRule(
                rhythm.isVegetarian
                  ? {
                      key: 'Open to All Culinary Menus',
                      value: 'Open to regional seafood, tasting tables, and plant-forward menus alike.',
                      type: 'preference',
                    }
                  : {
                      key: '100% Vegetarian Dining',
                      value: 'Strictly vegetarian for any supper club, tasting table, or pre-show dining.',
                      type: 'constraint',
                    }
              )
            }
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
              rhythm.isVegetarian
                ? 'bg-[#E7EFEA] text-brand-deep-green border-brand-deep-green/25'
                : 'bg-[#EFE9DE] text-brand-ink border-brand-warm-stone'
            }`}
          >
            {rhythm.isVegetarian ? '● 100% Vegetarian' : '○ All Menus'}
          </button>

          {rhythm.isFamilyFriendly && (
            <span className="px-3 py-1.5 rounded-full bg-[#F6E8E1] text-[#9E4E2B] border border-brand-terracotta/25 text-[11px] font-semibold">
              ● Kid-Welcoming
            </span>
          )}
        </div>

        {/* Compact City Pill */}
        <div className="inline-flex p-0.5 rounded-full bg-[#EFE9DE] border border-brand-warm-stone/80 shrink-0">
          <button
            type="button"
            onClick={() => onSetGeography('india-blr')}
            className={`px-2.5 py-1 rounded-full text-[10.5px] transition-all cursor-pointer ${
              geography === 'india-blr'
                ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                : 'text-brand-ink-light font-medium'
            }`}
          >
            BLR
          </button>
          <button
            type="button"
            onClick={() => onSetGeography('singapore-sin')}
            className={`px-2.5 py-1 rounded-full text-[10.5px] transition-all cursor-pointer ${
              geography === 'singapore-sin'
                ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                : 'text-brand-ink-light font-medium'
            }`}
          >
            SGP
          </button>
        </div>
      </div>

      {/* ====================================================================
          3. ASYMMETRIC BENTO WORLDS MOSAIC + UNMAPPED MAGNET TILES
         ==================================================================== */}
      <div className="pt-1 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-ink-light">
          Your Active Worlds
        </span>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-deep-green hover:text-brand-terracotta"
        >
          <IconSliders size={12.5} />
          <span>Re-swipe deck</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 auto-rows-[168px]">
        {worlds.map((world) => {
          const spanClass =
            world.span === 'wide'
              ? 'col-span-2 row-span-1'
              : world.span === 'tall'
              ? 'col-span-1 row-span-2'
              : 'col-span-1 row-span-1';

          return (
            <motion.button
              key={world.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setExpandedWorld(world)}
              className={`relative rounded-[24px] overflow-hidden text-left group shadow-soft hover:shadow-card border border-brand-warm-stone/55 bg-[#141C1A] cursor-pointer ${spanClass}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveAssetUrl(world.image)}
                alt={world.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Rock-Solid Bottom Scrim */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10, 15, 14, 0.93) 0%, rgba(10, 15, 14, 0.45) 55%, rgba(10, 15, 14, 0.12) 100%)',
                }}
              />

              {/* Signal Count Pill at Top-Right */}
              <span
                style={{ backgroundColor: 'rgba(16, 23, 21, 0.82)' }}
                className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9.5px] font-semibold text-white/90 border border-white/20 backdrop-blur-xs"
              >
                {world.signalCount} {world.signalCount === 1 ? 'signal' : 'signals'}
              </span>

              {/* Bottom Title & Caption */}
              <div className="absolute inset-x-3.5 bottom-3.5 space-y-0.5">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.09em] text-[#E68860] block truncate">
                  {world.eyebrow}
                </span>
                <h3 className="font-sans text-[15px] font-semibold text-white leading-snug line-clamp-2">
                  {world.title}
                </h3>
                {(world.span === 'wide' || world.span === 'tall') && (
                  <p
                    className="font-serif text-[11.5px] line-clamp-2 pt-0.5 leading-snug"
                    style={{ color: '#E6E0D4' }}
                  >
                    {world.caption}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}

        {/* Cold-to-Rich Magnet Tile: Motivates Sharing Deeper Context via AI */}
        {illuminationPercent < 95 && (
          <Link
            href="/import"
            className={`relative overflow-hidden rounded-[24px] border-2 border-dashed border-brand-terracotta/45 bg-[#F2ECE1] p-4 flex flex-col justify-between group hover:border-brand-terracotta transition-all ${
              worlds.length % 2 === 1 ? 'col-span-1 row-span-1' : 'col-span-2 row-span-1'
            }`}
          >
            <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.55} />
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.09em] text-brand-terracotta">
                <IconSparkNote size={12} />
                <span>Unmapped Worlds</span>
              </span>
              <span className="w-7 h-7 rounded-full bg-brand-deep-green text-brand-ivory flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <IconArrowUpRight size={13} />
              </span>
            </div>

            <div className="relative z-10 space-y-1">
              <h4 className="font-serif text-[15.5px] font-medium text-brand-ink leading-snug">
                Unlock Books, Travel & Deeper Obsessions
              </h4>
              <p className="text-[11px] text-brand-ink-light leading-snug line-clamp-2">
                Paste from ChatGPT, Claude, or Gemini to fill in the rest of your portrait.
              </p>
            </div>
          </Link>
        )}
      </div>

      {/* Smooth Expanded World Detail Sheet */}
      <AnimatePresence>
        {expandedWorld && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end justify-center"
            onClick={() => setExpandedWorld(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] overflow-hidden border-t border-brand-warm-stone shadow-elevated"
            >
              <div className="relative aspect-[16/9] w-full bg-[#141C1A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveAssetUrl(expandedWorld.image)}
                  alt={expandedWorld.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setExpandedWorld(null)}
                  style={{ backgroundColor: 'rgba(16, 23, 21, 0.88)' }}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full text-white border border-white/25 flex items-center justify-center shadow-md cursor-pointer"
                >
                  <IconClose size={15} />
                </button>
              </div>

              <div className="p-6 space-y-3.5">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta block">
                  {expandedWorld.eyebrow}
                </span>
                <h3 className="font-serif text-xl font-medium text-brand-ink">
                  {expandedWorld.title}
                </h3>
                <p className="font-serif text-[13.5px] text-brand-ink/85 leading-relaxed">
                  {expandedWorld.detailBody}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-brand-warm-stone/60">
                  <span className="brand-rule-sm" />
                  <Link
                    href="/me/vault"
                    className="text-xs font-semibold text-brand-deep-green hover:text-brand-terracotta"
                  >
                    Edit underlying rules in Vault →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
