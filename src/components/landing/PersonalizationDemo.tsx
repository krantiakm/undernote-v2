'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Film, Utensils, Plane, BookOpen, Sparkles, Footprints, Ticket, Hotel, Newspaper } from 'lucide-react';

export const PersonalizationDemo: React.FC = () => {
  const personas = [
    {
      name: 'Maya',
      vibe: 'Cinema, Neighborhood Food & Weekend Travel',
      accentColor: 'border-l-rose-500',
      items: [
        {
          icon: Film,
          type: 'Watch this',
          title: 'A Korean film she somehow missed',
          detail: 'Slow-burn mystery, 92 minutes · streaming this Friday',
        },
        {
          icon: Utensils,
          type: 'Near you',
          title: 'A tiny restaurant opening ten minutes away',
          detail: 'Cuisine she likes · outdoor seating · easy walk',
        },
        {
          icon: Plane,
          type: 'Good time to go',
          title: 'A direct-flight deal for her free weekend',
          detail: 'Direct route · long weekend window · fare dropped 22%',
        },
      ],
    },
    {
      name: 'Arjun',
      vibe: 'Deep Research, Trail Gear & Live Music',
      accentColor: 'border-l-amber-600',
      items: [
        {
          icon: Newspaper,
          type: 'Read this',
          title: 'A long-form piece on what he has been researching',
          detail: 'Complex systems & energy transition · 18 min read',
        },
        {
          icon: Footprints,
          type: 'Worth a look',
          title: 'Trail shoe that finally dropped below his price',
          detail: 'Target met · size 10 in stock · ₹4,200 under retail',
        },
        {
          icon: Ticket,
          type: 'Live soon',
          title: 'Intimate stage tickets to an artist he follows',
          detail: 'Natural timber acoustic hall · Saturday 8:00 PM',
        },
      ],
    },
    {
      name: 'Nina',
      vibe: 'Literature, Family Weekends & Space',
      accentColor: 'border-l-emerald-600',
      items: [
        {
          icon: BookOpen,
          type: 'Read this',
          title: 'A book mentioned by an author she loves',
          detail: 'Hardcover repress available at an independent bookshop',
        },
        {
          icon: Sparkles,
          type: 'Near you',
          title: 'A child-friendly Sunday morning event nearby',
          detail: 'Botanical greenhouse workshop · 15 mins away',
        },
        {
          icon: Hotel,
          type: 'Good time to go',
          title: 'A hotel that works unusually well for her family',
          detail: 'Direct flight destination · quiet family suite',
        },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-terracotta font-bold">
            One internet. Completely different Undernotes.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            The same world. A much better fit.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            What is worth your attention depends on who you are, what you care about and what is happening in your life right now. Undernote learns that difference.
          </p>
        </div>

        {/* 3 Personas Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div
              key={persona.name}
              className={`bg-white rounded-3xl p-6 border border-brand-warm-stone/50 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-all border-l-4 ${persona.accentColor}`}
            >
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-xl font-bold text-brand-ink">
                    For {persona.name}
                  </h3>
                  <p className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                    {persona.vibe}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {persona.items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-brand-ivory/60 border border-brand-warm-stone/40 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-terracotta font-bold flex items-center gap-1">
                            <Icon size={11} />
                            <span>{item.type}</span>
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-brand-ink leading-snug">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-brand-ink/65 leading-tight">
                          {item.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] font-mono text-stone-400 border-t border-brand-warm-stone/30 pt-3">
                Tailored dynamically from her active context
              </div>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <div className="text-center pt-2 space-y-4">
          <p className="font-serif italic text-base text-brand-ink font-semibold">
            Not a generic “For You” page. One built from you.
          </p>
          <div>
            <Link
              href="/radar"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-deep-green hover:bg-[#162B25] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <span>See what Undernote finds for me</span>
              <ArrowRight size={14} className="text-brand-terracotta" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
