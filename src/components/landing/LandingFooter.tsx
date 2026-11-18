import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

interface LandingFooterProps {
  onOpenAiModal?: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onOpenAiModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12221E] text-[#EDE7DF] pt-16 pb-12 border-t border-[#1f3731]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Multi-Column Layout per Section 25 */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pt-4">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 space-y-3">
            <Logo size="lg" type="full" variant="white" />
            <p className="font-serif italic text-base text-brand-terracotta">
              A world in tune with you.
            </p>
            <p className="text-xs text-[#a59c8f] max-w-xs font-sans leading-relaxed pt-1">
              More of the world, better fitted to the person experiencing it.
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  For You
                </Link>
              </li>
              <li>
                <Link href="/capsules" className="hover:text-white transition-colors">
                  Together
                </Link>
              </li>
              <li>
                <Link href="/watching" className="hover:text-white transition-colors">
                  Watching
                </Link>
              </li>
              <li>
                <Link href="/me" className="hover:text-white transition-colors">
                  Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Get Started */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Get Started
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <Link
                  href="/import?provider=chatgpt"
                  className="hover:text-white transition-colors text-left"
                >
                  Import from ChatGPT
                </Link>
              </li>
              <li>
                <Link
                  href="/import?provider=claude"
                  className="hover:text-white transition-colors text-left"
                >
                  Import from Claude
                </Link>
              </li>
              <li>
                <Link
                  href="/import?provider=gemini"
                  className="hover:text-white transition-colors text-left"
                >
                  Import from Gemini
                </Link>
              </li>
              <li>
                <Link href="/me" className="hover:text-white transition-colors">
                  Build it yourself
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learn */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Learn
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <Link href="/radar" className="hover:text-white transition-colors">
                  Why Undernote
                </Link>
              </li>
              <li>
                <Link href="/data" className="hover:text-white transition-colors">
                  Your Context
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy &amp; control
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company / Legal */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#a59c8f] font-sans">
              <li>
                <Link href="/me" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:hello@undernote.co" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line Across Footer per Section 25 */}
        <div className="pt-8 border-t border-[#1f3731] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8a8174]">
          <div>
            Your context can come from anywhere. It always remains yours.
          </div>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to top &uarr;</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
