'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CardData } from '@/types';
import { useApp } from '@/context/AppContext';
import { resolveAssetUrl } from '@/lib/assets';
import { MatchScoreBadge } from './MatchScoreBadge';
import {
  IconBookmark,
  IconArrowUpRight,
  IconClock,
  IconVenuePin,
} from '@/components/ui/BrandIcons';

interface FeaturedEventCardProps {
  card: CardData;
  matchPercent?: number;
  showMatchScore?: boolean;
}

export const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({
  card,
  matchPercent,
  showMatchScore = false,
}) => {
  const { saveCard } = useApp();
  const isSaved = card.status === 'saved';
  const meta = card.eventMeta;

  const eyebrow = meta
    ? `${meta.dayLabel.toUpperCase()} · ${meta.neighborhood.toUpperCase()}`
    : (card.entityType || 'RECOMMENDED FOR YOU').toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="editorial-surface rounded-[24px] overflow-hidden group transition-all duration-300 hover:shadow-card"
    >
      {/* Editorial Photograph with Protective Top Contrast Scrim */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#17201E]">
        <Link href={`/radar/${card.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveAssetUrl(card.heroImage)}
            alt={card.imageAlt || card.title}
            className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Protective dark gradient scrim at top so overlaid pills & icons stay 100% legible over any image */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(12, 18, 16, 0.76) 0%, rgba(12, 18, 16, 0.30) 55%, rgba(12, 18, 16, 0) 100%)',
          }}
        />

        {/* High-Contrast Category & Match Pills */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 pointer-events-none pr-12">
          <span
            style={{ backgroundColor: 'rgba(16, 23, 21, 0.90)' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-white text-[10.5px] font-semibold tracking-[0.02em] shadow-md border border-white/25"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E68860] shrink-0" />
            <span>{meta?.categoryLabel || card.entityType || 'Evening Pick'}</span>
          </span>

          {showMatchScore && typeof matchPercent === 'number' && (
            <MatchScoreBadge percent={matchPercent} variant="dark-pill" />
          )}
        </div>

        {/* High-Contrast Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            saveCard(card.id);
          }}
          aria-label={isSaved ? 'Remove from saved events' : 'Save event'}
          style={!isSaved ? { backgroundColor: 'rgba(16, 23, 21, 0.88)' } : undefined}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-md border ${
            isSaved
              ? 'bg-brand-terracotta text-white border-white/40'
              : 'hover:bg-[#121917] text-white border-white/30'
          }`}
        >
          <IconBookmark
            size={16}
            filled={isSaved}
            accent={isSaved ? '#FFFFFF' : '#E68860'}
          />
        </button>
      </div>

      {/* Warm Print-Program Editorial Body */}
      <div className="p-5 space-y-3">
        {/* Eyebrow + Price */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
            {eyebrow}
          </span>
          {meta?.priceLabel && (
            <span className="text-xs font-semibold text-brand-deep-green bg-[#E7EFEA] px-2.5 py-0.5 rounded-full">
              {meta.priceLabel}
            </span>
          )}
        </div>

        {/* Title & Venue */}
        <Link href={`/radar/${card.id}`} className="block space-y-1.5 group/title">
          <h2 className="font-sans text-[19px] font-semibold tracking-[-0.015em] text-brand-ink leading-[1.24] group-hover/title:text-brand-deep-green transition-colors">
            {card.title}
          </h2>

          {meta && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-brand-ink-light pt-0.5">
              <span className="inline-flex items-center gap-1">
                <IconVenuePin size={13.5} className="text-brand-deep-green shrink-0" />
                <span>{meta.venue}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <IconClock size={13.5} className="text-brand-deep-green shrink-0" />
                <span>{meta.timeLabel}</span>
              </span>
            </div>
          )}
        </Link>

        {/* Editorial Narrative + Personal Fit */}
        <p className="font-serif text-[13px] text-brand-ink/80 leading-[1.6] line-clamp-2">
          {meta?.personalFitLine || card.summary}
        </p>

        {/* Signature Terracotta Rule & Calm Action Footer */}
        <div className="pt-2.5 border-t border-brand-warm-stone/55 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="brand-rule-sm" />
            <span className="text-[11px] text-brand-ink-light font-medium">
              {meta?.settingNote || 'Chosen for your week'}
            </span>
          </div>

          <Link
            href={`/radar/${card.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-deep-green hover:text-brand-terracotta transition-colors shrink-0"
          >
            <span>Open brief</span>
            <IconArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};
