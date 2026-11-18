'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CardData } from '@/types';
import { useApp } from '@/context/AppContext';
import { resolveAssetUrl } from '@/lib/assets';
import {
  IconBookmark,
  IconArrowUpRight,
  IconClock,
  IconVenuePin,
} from '@/components/ui/BrandIcons';

interface FeaturedEventCardProps {
  card: CardData;
}

export const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ card }) => {
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
      {/* Clean Unobscured Editorial Photograph */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFE9DE]">
        <Link href={`/radar/${card.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveAssetUrl(card.heroImage)}
            alt={card.imageAlt || card.title}
            className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Subtle Top-Left Format Pill (Sage / Ivory glass) */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#FAF7F2]/92 backdrop-blur-md text-brand-deep-green text-[10.5px] font-semibold tracking-[0.02em] shadow-xs border border-brand-warm-stone/60">
            {meta?.categoryLabel || card.entityType || 'Evening Pick'}
          </span>
          {card.originType === 'requested' && (
            <span className="px-2.5 py-1 rounded-full bg-brand-deep-green/92 backdrop-blur-md text-brand-ivory text-[10px] font-medium tracking-wide">
              From your Watch
            </span>
          )}
        </div>

        {/* Clean Ivory Glass Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            saveCard(card.id);
          }}
          aria-label={isSaved ? 'Remove from saved events' : 'Save event'}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xs ${
            isSaved
              ? 'bg-brand-ivory text-brand-terracotta border border-brand-terracotta/40'
              : 'bg-[#FAF7F2]/90 hover:bg-brand-ivory text-brand-ink border border-brand-warm-stone/60'
          }`}
        >
          <IconBookmark size={16} filled={isSaved} />
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
            <span className="text-xs font-semibold text-brand-deep-green bg-brand-sage-subtle px-2.5 py-0.5 rounded-full">
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
