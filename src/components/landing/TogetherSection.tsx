'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Check, Sparkles, MapPin } from 'lucide-react';

export const TogetherSection: React.FC = () => {
  const friends = [
    { name: 'You', avatar: 'K', chip: 'Vegetarian' },
    { name: 'Alex', avatar: 'A', chip: 'Quiet enough to talk' },
    { name: 'Sarah', avatar: 'S', chip: 'Somewhere new' },
    { name: 'Rohan', avatar: 'R', chip: '< 25 min away' },
  ];

  const matchedPlaces = [
    {
      name: 'The Glasshouse Courtyard',
      meta: 'Vegetarian menu · Garden seating · 18 min away',
      tag: 'Best fit',
    },
    {
      name: 'Olive & Timber',
      meta: 'Intimate acoustic noise levels · New menu',
      tag: 'Quiet atmosphere',
    },
    {
      name: 'Sora Izakaya',
      meta: 'Small plates · Plant-forward options · Easy drive',
      tag: 'New opening',
    },
  ];

  return (
    <section id="together" className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Together
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            Find somewhere everyone will actually like.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Start with what Undernote already knows about you. Invite the people you’re going with, and let each person share only what matters for this plan.
          </p>
        </div>

        {/* Visual Preference-Merging Demonstration per Section 13 */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-brand-warm-stone/60 shadow-xs space-y-8">
          
          {/* 4 Avatar Circles with Preference Chips */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block text-center">
              Shared Context Input
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {friends.map((friend, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F7F3EC] border border-brand-warm-stone/50 flex flex-col items-center text-center space-y-2"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-deep-green text-white font-serif font-bold text-sm flex items-center justify-center shadow-xs">
                    {friend.avatar}
                  </div>
                  <span className="text-xs font-semibold text-brand-ink">
                    {friend.name}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white text-brand-deep-green border border-brand-warm-stone/60 font-medium">
                    {friend.chip}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Merge Arrow */}
          <div className="flex items-center justify-center">
            <div className="px-4 py-1 rounded-full bg-[#F7F3EC] text-stone-500 text-[11px] font-mono font-semibold flex items-center gap-1.5 border border-brand-warm-stone/40">
              <span>Merged without group chat arguments</span>
              <span>&darr;</span>
            </div>
          </div>

          {/* Resulting 3 Places That Work */}
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-brand-ink">
                Four people. Three places that work.
              </h3>
              <p className="text-xs text-brand-ink/70 font-serif italic">
                Everyone shares only what matters for tonight.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {matchedPlaces.map((place, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-brand-deep-green/20 shadow-xs space-y-2 hover:border-brand-deep-green transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-deep-green/10 text-brand-deep-green font-bold">
                      {place.tag}
                    </span>
                    <MapPin size={12} className="text-brand-terracotta" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-brand-ink">
                    {place.name}
                  </h4>
                  <p className="text-[11px] text-brand-ink/70 font-sans leading-tight">
                    {place.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Non-user explanation */}
          <div className="pt-4 border-t border-brand-warm-stone/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500 font-sans text-center sm:text-left">
              Friends join from a web link. No app install or account required.
            </p>
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
    </section>
  );
};
