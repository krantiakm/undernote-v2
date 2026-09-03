'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Check, Sparkles } from 'lucide-react';

export const TogetherSection: React.FC = () => {
  return (
    <section id="together" className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Together
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Find somewhere everyone will actually like.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Start with what Undernote already knows about you. Invite the people you’re going with, and let each person share only what matters for this plan. Undernote finds the overlap and gives you a shortlist that works better for everyone.
          </p>
        </div>

        {/* Visual Feature Card with 3 Steps and Concrete Example */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-brand-warm-stone/60 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Atmospheric Group Dining Image */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] bg-stone-100">
              <Image
                src="/images/landing_group_dining.jpg"
                alt="Friends having dinner together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:hidden" />
              
              {/* Floating Overlap Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-md text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-brand-deep-green">
                    Friday night · 4 people
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Overlap Solved
                  </span>
                </div>
                <div className="space-y-1 text-stone-600 text-[11px]">
                  <p>• One person is vegetarian</p>
                  <p>• One hates very loud restaurants</p>
                  <p>• Two want somewhere new</p>
                  <p>• Nobody wants a 45-minute drive</p>
                </div>
                <div className="pt-1 border-t border-stone-200 font-serif font-bold text-brand-ink text-xs">
                  Result: 3 places that work for everyone
                </div>
              </div>
            </div>

            {/* Right: The 3 Clean Steps */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-brand-ink">
                    No back-and-forth group chats.
                  </h3>
                  <p className="text-xs text-brand-ink/70 font-sans">
                    Effortless planning for going out, weekend trips, and shared moments.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-brand-ivory text-brand-deep-green flex items-center justify-center font-bold text-xs shrink-0 border border-brand-warm-stone">
                      1
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-brand-ink text-sm">
                        Start a plan
                      </h4>
                      <p className="text-xs text-brand-ink/70 leading-relaxed font-sans">
                        Dinner, drinks, a show or something to do this weekend.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-brand-ivory text-brand-deep-green flex items-center justify-center font-bold text-xs shrink-0 border border-brand-warm-stone">
                      2
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-brand-ink text-sm">
                        Invite your people
                      </h4>
                      <p className="text-xs text-brand-ink/70 leading-relaxed font-sans">
                        They can join from a simple link. No account required.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-brand-ivory text-brand-deep-green flex items-center justify-center font-bold text-xs shrink-0 border border-brand-warm-stone">
                      3
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-brand-ink text-sm">
                        Get the shortlist
                      </h4>
                      <p className="text-xs text-brand-ink/70 leading-relaxed font-sans">
                        Undernote finds what fits the group, not just the loudest person in the chat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Reassurance & CTA */}
              <div className="space-y-4 pt-4 border-t border-brand-warm-stone/40">
                <p className="text-xs text-brand-ink/65 font-serif italic">
                  Everyone shares only what is relevant to this plan. Nobody shares their whole Undernote.
                </p>
                <div>
                  <Link
                    href="/capsules"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 group"
                  >
                    <span>Plan something together</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-terracotta" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
