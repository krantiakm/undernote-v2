'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, User } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface TopHeaderProps {
  onOpenIngestion?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-30 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-warm-stone/40 px-4 pt-3.5 pb-3">
      <div className="flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-brand-deep-green">
            undernote
          </span>
        </Link>

        {/* Right: Context and Me Navigation */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/data"
            className="flex items-center gap-1 text-[11px] font-medium text-brand-ink/70 hover:text-brand-ink bg-white border border-brand-warm-stone/60 px-3 py-1 rounded-full shadow-xs transition-all active:scale-95"
          >
            <ShieldCheck size={12} className="text-brand-deep-green" />
            <span>Your Context</span>
          </Link>

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
