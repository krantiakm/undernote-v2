'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { useApp } from '@/context/AppContext';

export const TopHeader: React.FC = () => {
  const { persona, geography } = useApp();
  const initialLetter = (persona.monogram || persona.userName || 'K').charAt(0).toUpperCase();
  const cityLabel = geography === 'singapore-sin' ? 'Singapore' : 'Bangalore';

  return (
    <header className="sticky top-0 z-30 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-warm-stone/55 px-5 pt-3.5 pb-3">
      <div className="flex items-center justify-between">
        {/* Official Undernote Wordmark */}
        <Logo size="sm" variant="dark" href="/radar" />

        {/* Subtle Market Label & Personal Seal */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/me"
            className="text-[11px] font-medium tracking-wide text-brand-ink-light hover:text-brand-ink transition-colors"
            title="Home city & taste profile"
          >
            {cityLabel}
          </Link>

          <Link
            href="/me"
            className="w-8 h-8 rounded-[10px] bg-brand-deep-green text-brand-ivory flex flex-col items-center justify-center text-xs font-semibold hover:bg-brand-deep-green-dark transition-all shadow-xs relative"
            aria-label="Your profile and taste lookbook"
          >
            <span className="leading-none pb-0.5">{initialLetter}</span>
            <span className="w-3 h-[1.8px] rounded-full bg-brand-terracotta" />
          </Link>
        </div>
      </div>
    </header>
  );
};
