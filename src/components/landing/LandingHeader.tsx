'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';

interface LandingHeaderProps {
  onOpenAiModal: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onOpenAiModal }) => {
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
          ? 'bg-brand-ivory/95 backdrop-blur-md shadow-soft border-b border-brand-warm-stone/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo type="horizontal" size="md" variant="green" withTagline={false} clickable={false} />
        </div>

        {/* Desktop Nav Links - Pure Consumer Language */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-brand-ink-light tracking-wide">
          <a
            href="#curations"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            What We Curate
          </a>
          <a
            href="#how-it-works"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            How It Works
          </a>
          <a
            href="#friends"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            With Friends
          </a>
          <a
            href="#privacy"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Privacy
          </a>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenAiModal('gemini')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-warm-stone text-xs font-bold text-brand-deep-green hover:border-brand-terracotta transition-all shadow-sm group active:scale-95"
          >
            <Sparkles size={13} className="text-brand-terracotta group-hover:rotate-12 transition-transform" />
            <span>Connect Your AI</span>
          </button>

          <Link
            href="/radar"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-deep-green text-white text-xs font-bold hover:bg-brand-deep-green-dark transition-all shadow-card group active:scale-95"
          >
            <span>Launch Radar</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenAiModal('gemini')}
            className="px-3 py-1.5 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles size={13} className="text-brand-terracotta" />
            <span>Connect AI</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white border border-brand-warm-stone text-brand-ink shadow-sm"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-ivory border-b border-brand-warm-stone/60 px-6 py-5 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-brand-ink">
            <a
              href="#curations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              What We Curate
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              How It Works
            </a>
            <a
              href="#friends"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              Planning With Friends
            </a>
            <a
              href="#privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Your Privacy
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal('gemini');
              }}
              className="w-full py-2.5 rounded-full bg-brand-terracotta text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles size={14} />
              <span>Connect What AI Knows</span>
            </button>
            <Link
              href="/radar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-brand-deep-green text-white font-bold text-xs flex items-center justify-center gap-2 text-center shadow-sm"
            >
              <span>Launch Live Radar</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
