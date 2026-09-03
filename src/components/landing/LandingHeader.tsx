'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-xs border-b border-brand-warm-stone/40 py-2.5 sm:py-3.5'
          : 'bg-[#F7F3EC]/80 backdrop-blur-xs py-3 sm:py-4'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" type="full" variant="green" />

        {/* Desktop Nav Links (Pure in-page anchors) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-brand-ink/70 tracking-wide">
          <a
            href="#for-you"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            For You
          </a>
          <a
            href="#together"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Together
          </a>
          <a
            href="#how-it-works"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            How it works
          </a>
          <a
            href="#your-context"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Your Context
          </a>
        </nav>

        {/* Right Action CTA: Clean "Try Undernote" */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/radar"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs font-bold transition-all shadow-sm group active:scale-95"
          >
            <span>Try Undernote</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-brand-terracotta" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/radar"
            className="px-3.5 py-1.5 rounded-full bg-brand-deep-green text-white text-xs font-bold shadow-sm"
          >
            Try Undernote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white border border-brand-warm-stone text-brand-ink shadow-xs"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Pure in-page anchors) */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F7F3EC] border-b border-brand-warm-stone/60 px-6 py-5 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-brand-ink">
            <a
              href="#for-you"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              For You
            </a>
            <a
              href="#together"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              Together
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              How it works
            </a>
            <a
              href="#your-context"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Your Context
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/radar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-brand-deep-green text-white font-bold text-xs flex items-center justify-center gap-2 text-center shadow-sm"
            >
              <span>Try Undernote</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
