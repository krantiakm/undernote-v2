'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useApp } from '@/context/AppContext';

interface TopHeaderProps {
  onOpenIngestion?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenIngestion }) => {
  const { geography, setGeography } = useApp();

  const toggleGeography = () => {
    if (geography === 'india-blr') {
      setGeography('singapore-sin');
    } else {
      setGeography('india-blr');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-brand-ivory/90 backdrop-blur-md border-b border-brand-warm-stone/40 px-4 pt-3 pb-3">
      <div className="flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Logo size="md" type="full" variant="green" />

        {/* Right: Location & Profile Pill */}
        <div className="flex items-center gap-2">
          {/* Geography Anchor Switcher Button */}
          <button
            onClick={toggleGeography}
            title="Tap to switch between Bangalore and Singapore"
            className="flex items-center gap-1 text-[11px] font-medium text-brand-ink/80 bg-white/80 hover:bg-white border border-brand-warm-stone/60 px-2.5 py-1 rounded-full shadow-xs transition-all active:scale-95"
          >
            <span>{geography === 'india-blr' ? '🇮🇳 BLR' : '🇸🇬 SIN'}</span>
          </button>

          {/* Sync / Personalize Pill */}
          {onOpenIngestion && (
            <button
              onClick={onOpenIngestion}
              className="flex items-center gap-1.5 text-[11px] font-medium bg-brand-deep-green text-brand-ivory hover:bg-brand-deep-green/90 px-3 py-1 rounded-full shadow-xs transition-all active:scale-95"
            >
              <Sparkles size={12} className="text-brand-terracotta" />
              <span>Sync AI</span>
            </button>
          )}

          {/* Avatar Link to Me */}
          <Link
            href="/me"
            className="w-7 h-7 rounded-full bg-brand-deep-green/10 border border-brand-deep-green/30 text-brand-deep-green flex items-center justify-center text-xs font-semibold hover:border-brand-terracotta transition-colors"
          >
            K
          </Link>
        </div>
      </div>
    </header>
  );
};
