'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

interface LandingFooterProps {
  onOpenAiModal: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onOpenAiModal }) => {
  return (
    <footer className="bg-brand-ink text-brand-ivory pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Bottom CTA Box */}
        <div className="bg-brand-deep-green rounded-3xl p-8 sm:p-10 text-center space-y-6 border border-white/10 shadow-elevated">
          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              A world in tune with you.
            </h3>
            <p className="text-xs sm:text-sm text-brand-sage-light">
              Connect what your AI knows in 10 seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => onOpenAiModal('gemini')}
              className="px-4 py-2 rounded-full bg-white text-brand-deep-green font-semibold text-xs hover:bg-brand-ivory transition-all shadow-sm flex items-center gap-1.5"
            >
              <GeminiIcon className="w-3.5 h-3.5" />
              <span>Gemini</span>
            </button>
            <button
              onClick={() => onOpenAiModal('chatgpt')}
              className="px-4 py-2 rounded-full bg-white text-brand-deep-green font-semibold text-xs hover:bg-brand-ivory transition-all shadow-sm flex items-center gap-1.5"
            >
              <OpenAIIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>ChatGPT</span>
            </button>
            <button
              onClick={() => onOpenAiModal('claude')}
              className="px-4 py-2 rounded-full bg-white text-brand-deep-green font-semibold text-xs hover:bg-brand-ivory transition-all shadow-sm flex items-center gap-1.5"
            >
              <ClaudeIcon className="w-3.5 h-3.5 text-[#C66E45]" />
              <span>Claude</span>
            </button>
            <Link
              href="/radar"
              className="px-4 py-2 rounded-full bg-brand-terracotta text-white font-semibold text-xs hover:bg-brand-terracotta-dark transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore Radar</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Footer Brand Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-brand-sage-light">
          <Logo size="md" type="horizontal" variant="white" withTagline={false} clickable={false} />
          <div className="flex items-center gap-6">
            <Link href="/radar" className="hover:text-white transition-colors">Radar</Link>
            <Link href="/watching" className="hover:text-white transition-colors">Watching</Link>
            <Link href="/capsules" className="hover:text-white transition-colors">Capsules</Link>
            <Link href="/me" className="hover:text-white transition-colors">Me</Link>
            <Link href="/data" className="hover:text-white transition-colors">Data</Link>
          </div>
          <span className="text-[11px] opacity-75">&copy; {new Date().getFullYear()} undernote</span>
        </div>
      </div>
    </footer>
  );
};
