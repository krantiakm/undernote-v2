'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12221E] text-[#EDE7DF] pt-20 pb-12 border-t border-[#1f3731]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Top Grand Callout Card */}
        <div className="relative rounded-[32px] p-8 sm:p-12 bg-gradient-to-b from-[#1c352f] to-[#162a25] border border-[#2c4e45] text-center space-y-6 shadow-2xl overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-sage font-bold block">
              Experience The Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Begin your quiet discovery.
            </h2>
            <p className="text-xs sm:text-sm text-[#c5bcaf] font-sans leading-relaxed pt-1">
              Explore your personal radar feed or review your sovereign identity lookbook. No signups, no credit cards, 100% private.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href="/radar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-stone-100 text-brand-deep-green font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 group"
            >
              <span>Try It Now</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
            </Link>
          </div>

          <div className="text-[11px] font-mono text-[#a59c8f] flex items-center justify-center gap-2 pt-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>100% on-device data sovereignty</span>
          </div>
        </div>

        {/* Middle Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4 border-t border-[#1f3731]">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo type="horizontal" size="md" variant="white" withTagline={false} clickable={false} />
            <p className="text-xs text-[#a59c8f] leading-relaxed max-w-sm font-sans">
              A personal discovery engine built for humans who value quiet quality over digital noise. We watch the world through your non-negotiable standards, bringing you rare finds and unhurried escapes before you have to search.
            </p>
            <div className="text-[11px] font-mono text-[#8a8174]">
              Piloting in India &amp; Singapore
            </div>
          </div>

          {/* Navigation Column 1: The 4 Horizons */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Pilot Horizons
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  ✈️ Travel &amp; Escapes
                </Link>
              </li>
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  📚 Books &amp; Mind
                </Link>
              </li>
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  🎟️ Performing Arts &amp; Events
                </Link>
              </li>
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  📱 Everyday Tools &amp; Hardware
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: The Experience */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  Live Radar Feed
                </Link>
              </li>
              <li>
                <Link href="/me" className="hover:text-white transition-colors">
                  Identity Lookbook
                </Link>
              </li>
              <li>
                <Link href="/watching" className="hover:text-white transition-colors">
                  Autonomous Monitors
                </Link>
              </li>
              <li>
                <Link href="/capsules" className="hover:text-white transition-colors">
                  Shared Capsules
                </Link>
              </li>
              <li>
                <Link href="/data" className="hover:text-white transition-colors">
                  Sovereign Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Principles */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Pillars
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Zero Ad Tracking
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  On-Device Storage
                </a>
              </li>
              <li>
                <a href="#friends" className="hover:text-white transition-colors">
                  Group Privacy
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Fluid Horizons
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-[#1f3731] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8a8174]">
          <div>
            © {new Date().getFullYear()} Undernote. All rights reserved. Built for human calm.
          </div>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to top ↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
