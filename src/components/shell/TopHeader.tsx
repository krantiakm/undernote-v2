'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

interface TopHeaderProps {
  onOpenIngestion?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-30 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-warm-stone/40 px-4 pt-3 pb-2.5">
      <div className="flex items-center justify-between">
        {/* Left: Official Brand Logo */}
        <Link href="/" className="flex items-center">
          <Logo size="sm" type="full" variant="green" />
        </Link>

        {/* Right: Clean Profile Avatar leading to Me */}
        <div className="flex items-center gap-2">
          <Link
            href="/me"
            className="w-7 h-7 rounded-full bg-brand-deep-green/10 border border-brand-deep-green/30 text-brand-deep-green flex items-center justify-center text-xs font-semibold hover:border-brand-terracotta hover:bg-brand-deep-green hover:text-white transition-all shadow-2xs"
            aria-label="Profile and context"
          >
            K
          </Link>
        </div>
      </div>
    </header>
  );
};
