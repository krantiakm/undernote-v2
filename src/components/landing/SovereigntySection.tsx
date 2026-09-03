'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lock, Download, Trash2, Key } from 'lucide-react';

export const SovereigntySection: React.FC = () => {
  return (
    <section id="privacy" className="py-20 sm:py-28 bg-[#F7F3EC] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Data Sovereignty &amp; Privacy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Your context. Your sovereign control.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/70 leading-relaxed font-sans">
            In an internet built on surveillance capitalism and behavioral tracking, Undernote is built on the radical premise that your taste belongs solely to you.
          </p>
        </div>

        {/* 2-Column Split: Image on Left, Deep Principles on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Atmospheric Still Life Photo (Key, Sealed Envelope, Linen) */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-3xl overflow-hidden shadow-xs border border-brand-warm-stone/60">
            <Image
              src="/images/landing_sovereignty_vault.jpg"
              alt="Data Sovereignty Antique Brass Key and Sealed Envelope"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-sage font-bold block">
                The Sovereign Standard
              </span>
              <p className="font-serif text-sm font-bold mt-0.5">
                Encrypted locally. Zero ad networks. Always portable.
              </p>
            </div>
          </div>

          {/* Right: 4 Core Sovereignty Guarantees */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Pillar 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-brand-deep-green">
                <Lock className="w-4 h-4 text-brand-terracotta" />
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  Zero Ad Surveillance or Tracking Cookies
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans pl-6">
                We never sell attention, serve banner ads, or partner with commercial ad networks. Our matching engine works strictly on your behalf to protect your calm.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-brand-deep-green">
                <Key className="w-4 h-4 text-brand-terracotta" />
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  On-Device Storage &amp; Client-Side Keys
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans pl-6">
                Your extracted preferences, non-negotiables, and horizons are encrypted on your local device. Undernote runs private matching without harvesting your identity.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-brand-deep-green">
                <Download className="w-4 h-4 text-brand-terracotta" />
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  1-Click Portable Context Passport
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans pl-6">
                Never get locked in. At any moment, export your entire profile as a clean Markdown Context Passport ready to paste into ChatGPT, Claude, or any future AI tool.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-brand-deep-green">
                <Trash2 className="w-4 h-4 text-brand-terracotta" />
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  Immediate 1-Tap Data Oblivion
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-ink/70 leading-relaxed font-sans pl-6">
                If you ever want to reset, a single tap completely purges all local storage and session tokens from your browser. No lingering ghost data.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            <span>Try It Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};
