'use client';

import React from 'react';
import Link from 'next/link';

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12221E] text-[#EDE7DF] pt-16 pb-12 border-t border-[#1f3731]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Top Brand Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-serif text-3xl font-bold tracking-tight text-white block">
              undernote
            </span>
            <p className="font-serif italic text-lg text-brand-terracotta">
              A world in tune with you.
            </p>
            <p className="text-xs text-[#a59c8f] max-w-md font-sans pt-1">
              A personal context layer that helps more of the world feel like it fits.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#c5bcaf]">
            <Link href="/radar" className="hover:text-white transition-colors">
              For You
            </Link>
            <Link href="/capsules" className="hover:text-white transition-colors">
              Together
            </Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
            <Link href="/data" className="hover:text-white transition-colors">
              Your Context
            </Link>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1f3731] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8a8174]">
          <div>
            © {new Date().getFullYear()} Undernote. All rights reserved.
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
