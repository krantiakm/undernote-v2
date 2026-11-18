'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CardData } from '@/types';
import { useApp } from '@/context/AppContext';
import { resolveAssetUrl } from '@/lib/assets';
import { IconBookmark } from '@/components/ui/BrandIcons';

interface EditorialEventRowCardProps {
  card: CardData;
  index: number;
}

/**
 * Horizontal Editorial Discovery Card
 * Modeled directly on Section 6 ("CARDS") of the Undernote Brand Book (undernotebrand.png):
 * - Tactile rounded thumbnail on left
 * - Uppercase Terracotta eyebrow ("SAT, 14 NOV · JP NAGAR")
 * - Clean Satoshi title + venue/time/price metadata + personal fit line
 * - Signature short Terracotta rule on bottom-left, minimal bookmark icon on bottom-right
 */
export const EditorialEventRowCard: React.FC<EditorialEventRowCardProps> = ({
  card,
  index,
}) => {
  const { saveCard } = useApp();
  const isSaved = card.status === 'saved';
  const meta = card.eventMeta;

  const eyebrow = meta
    ? `${meta.dayLabel.toUpperCase()} · ${meta.neighborhood.toUpperCase()}`
    : (card.entityType || 'RECOMMENDED FOR YOU').toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.035, 0.2) }}
      className="editorial-surface rounded-[22px] p-3.5 flex gap-3.5 items-stretch group hover:shadow-card transition-all duration-300"
    >
      {/* Left Thumbnail */}
      <Link
        href={`/radar/${card.id}`}
        className="relative w-[108px] min-h-[126px] rounded-[16px] overflow-hidden bg-[#EFE9DE] shrink-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveAssetUrl(card.heroImage)}
          alt={card.imageAlt || card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {meta?.availabilityLabel && meta.availabilityState === 'few-left' && (
          <span className="absolute bottom-2 left-2 right-2 text-center py-0.5 px-1.5 rounded-md bg-brand-ink/80 backdrop-blur-xs text-[9.5px] font-medium text-brand-ivory truncate">
            {meta.availabilityLabel}
          </span>
        )}
      </Link>

      {/* Right Editorial Column */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta truncate">
              {eyebrow}
            </span>
            {meta?.priceLabel && (
              <span className="text-[11px] font-semibold text-brand-deep-green shrink-0">
                {meta.priceLabel}
              </span>
            )}
          </div>

          <Link href={`/radar/${card.id}`} className="block">
            <h3 className="font-sans text-[15.5px] font-semibold tracking-[-0.01em] text-brand-ink leading-[1.28] line-clamp-2 group-hover:text-brand-deep-green transition-colors">
              {card.title}
            </h3>
          </Link>

          <p className="text-[11.5px] text-brand-ink-light truncate">
            {meta ? `${meta.venue} · ${meta.timeLabel}` : card.subtitle}
          </p>

          <p className="font-serif text-[12px] text-brand-ink/75 leading-[1.5] line-clamp-2 pt-0.5">
            {meta?.personalFitLine || card.summary}
          </p>
        </div>

        {/* Bottom Brand Rule + Bookmark */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="brand-rule-sm shrink-0" />
            {card.originType === 'requested' && (
              <span className="text-[10px] font-medium text-brand-deep-green truncate">
                Watched venue
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              saveCard(card.id);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save event'}
            className={`p-1.5 -mr-1 rounded-full transition-colors cursor-pointer ${
              isSaved
                ? 'text-brand-terracotta'
                : 'text-brand-ink/50 hover:text-brand-ink'
            }`}
          >
            <IconBookmark size={16} filled={isSaved} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
