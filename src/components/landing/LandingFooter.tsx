'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Sparkles, ArrowRight, Heart, ShieldCheck } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';

interface LandingFooterProps {
  onOpenAiModal: (provider?: 'gemini' | 'chatgpt' | 'claude' | 'voice') => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onOpenAiModal }) => {
  return (
    <footer className="bg-brand-ink text-brand-ivory pt-20 pb-12 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-deep-green/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Big Bottom CTA Banner */}
        <div className="bg-gradient-to-br from-brand-deep-green to-brand-deep-green-dark rounded-3xl p-8 sm:p-12 border border-white/10 shadow-elevated text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-brand-terracotta-light">
              <Sparkles size={12} />
              <span>Begin in 10 Seconds</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
              Turn what your AI knows into{' '}
              <span className="italic text-brand-terracotta-light">
                real-world serendipity.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-sage-light leading-relaxed">
              No forms. No spam. Just copy our prompt into Gemini, ChatGPT, or Claude, and see your personal radar synthesize.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenAiModal('gemini')}
              className="px-6 py-3.5 rounded-2xl bg-white text-brand-deep-green font-bold text-xs sm:text-sm hover:bg-brand-ivory transition-all shadow-md flex items-center gap-2"
            >
              <GeminiIcon className="w-4 h-4" />
              <span>Connect Gemini</span>
            </button>

            <button
              onClick={() => onOpenAiModal('chatgpt')}
              className="px-6 py-3.5 rounded-2xl bg-white text-brand-deep-green font-bold text-xs sm:text-sm hover:bg-brand-ivory transition-all shadow-md flex items-center gap-2"
            >
              <OpenAIIcon className="w-4 h-4 text-emerald-600" />
              <span>Connect ChatGPT</span>
            </button>

            <button
              onClick={() => onOpenAiModal('claude')}
              className="px-6 py-3.5 rounded-2xl bg-white text-brand-deep-green font-bold text-xs sm:text-sm hover:bg-brand-ivory transition-all shadow-md flex items-center gap-2"
            >
              <ClaudeIcon className="w-4 h-4" />
              <span>Connect Claude</span>
            </button>

            <Link
              href="/radar"
              className="px-6 py-3.5 rounded-2xl bg-brand-terracotta text-white font-bold text-xs sm:text-sm hover:bg-brand-terracotta-dark transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Live Radar</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Brand Narrative & Mission Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/10 pt-12">
          <div className="space-y-3">
            <Logo type="horizontal" size="md" variant="white" withTagline={true} clickable={false} />
            <p className="text-xs text-brand-sage-light max-w-md leading-relaxed">
              Undernote is your personal context layer — understanding what you care about so life, information, and opportunities align with you, beautifully and effortlessly.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta-light">
              Brand Mission
            </span>
            <p className="font-serif italic text-sm text-brand-ivory leading-relaxed">
              &ldquo;To make the world feel like a better fit for every person.&rdquo;
            </p>
            <span className="text-[11px] text-brand-sage-light block">
              Warm • Intelligent • Thoughtful • Personal • Never Pushy
            </span>
          </div>
        </div>

        {/* Navigation Columns & Copyright */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs text-brand-sage-light">
          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[10px]">Product</span>
            <ul className="space-y-1.5">
              <li><Link href="/radar" className="hover:text-white transition-colors">Radar Feed</Link></li>
              <li><Link href="/watching" className="hover:text-white transition-colors">Active Watches</Link></li>
              <li><Link href="/capsules" className="hover:text-white transition-colors">Group Capsules</Link></li>
              <li><Link href="/me" className="hover:text-white transition-colors">Lifestyle DNA</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[10px]">Positioning</span>
            <ul className="space-y-1.5">
              <li><a href="#benefits" className="hover:text-white transition-colors">Lifestyle Benefits</a></li>
              <li><a href="#relevance" className="hover:text-white transition-colors">Relevance Manifesto</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#horizons" className="hover:text-white transition-colors">Dual Horizons</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[10px]">Connect AI</span>
            <ul className="space-y-1.5">
              <li><button onClick={() => onOpenAiModal('gemini')} className="hover:text-white transition-colors text-left">Google Gemini</button></li>
              <li><button onClick={() => onOpenAiModal('chatgpt')} className="hover:text-white transition-colors text-left">OpenAI ChatGPT</button></li>
              <li><button onClick={() => onOpenAiModal('claude')} className="hover:text-white transition-colors text-left">Anthropic Claude</button></li>
              <li><button onClick={() => onOpenAiModal('voice')} className="hover:text-white transition-colors text-left">Voice Note (30s)</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[10px]">Sovereignty</span>
            <ul className="space-y-1.5">
              <li><Link href="/data" className="hover:text-white transition-colors">Local Data Storage</Link></li>
              <li><Link href="/data" className="hover:text-white transition-colors">1-Click Export</Link></li>
              <li><span className="text-emerald-400">Zero Ad Tracking</span></li>
              <li><span className="text-emerald-400">Your Context. Your Control.</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-brand-sage-light/70">
          <span>&copy; {new Date().getFullYear()} undernote. A world in tune with you.</span>
          <div className="flex items-center gap-4">
            <span>Sovereign Context Layer</span>
            <span>•</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
