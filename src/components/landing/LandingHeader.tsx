'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

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
          ? 'bg-brand-ivory/90 backdrop-blur-md shadow-soft border-b border-brand-warm-stone/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo type="horizontal" size="md" variant="green" withTagline={false} clickable={false} />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-brand-ink-light tracking-wide">
          <a
            href="#benefits"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Benefits
          </a>
          <a
            href="#relevance"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Relevance
          </a>
          <a
            href="#how-it-works"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            How It Works
          </a>
          <a
            href="#horizons"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Dual Horizons
          </a>
          <a
            href="#multiplayer"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Group & Gifting
          </a>
          <a
            href="#sovereignty"
            className="hover:text-brand-ink transition-colors hover:underline underline-offset-4 decoration-brand-terracotta decoration-2"
          >
            Sovereignty
          </a>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenAiModal('gemini')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-warm-stone text-xs font-semibold text-brand-deep-green hover:border-brand-terracotta transition-all shadow-sm group"
          >
            <Sparkles size={13} className="text-brand-terracotta group-hover:rotate-12 transition-transform" />
            <span>Connect Your AI</span>
          </button>

          <Link
            href="/radar"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-deep-green text-white text-xs font-semibold hover:bg-brand-deep-green-dark transition-all shadow-card group"
          >
            <span>Launch Radar</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onOpenAiModal('gemini')}
            className="p-2 rounded-xl bg-brand-deep-green text-brand-ivory text-xs flex items-center gap-1"
          >
            <Sparkles size={14} className="text-brand-terracotta" />
            <span className="font-semibold text-[11px]">Connect AI</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-brand-warm-stone text-brand-ink"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-ivory border-b border-brand-warm-stone/60 px-6 py-5 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-3 text-sm font-medium text-brand-ink">
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              Benefits & Lifestyle
            </a>
            <a
              href="#relevance"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              Relevance Manifesto
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              How It Works
            </a>
            <a
              href="#horizons"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              Dual Horizon Context
            </a>
            <a
              href="#multiplayer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-brand-warm-stone/30"
            >
              Multi-Player & Gifting
            </a>
            <a
              href="#sovereignty"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Data Sovereignty
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal('gemini');
              }}
              className="w-full py-2.5 rounded-xl bg-brand-terracotta text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>Connect What AI Knows About You</span>
            </button>
            <Link
              href="/radar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-brand-deep-green text-white font-semibold text-xs flex items-center justify-center gap-2 text-center"
            >
              <span>Launch Live Radar App</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
