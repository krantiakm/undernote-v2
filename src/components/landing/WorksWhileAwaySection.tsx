'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Eye, Bell, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WorksWhileAwaySection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Quiet Background Intelligence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">
            You don't have to keep checking.
          </h2>
          <p className="text-sm sm:text-base text-brand-ink/75 leading-relaxed font-sans">
            Undernote is not merely an app you browse. It quietly notices when something becomes relevant, so you never miss what matters.
          </p>
        </div>

        {/* 2-Column Split: It Finds vs It Watches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Column 1: It Finds */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/50 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/60">
                <Compass size={20} className="text-brand-terracotta" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-ink">
                It finds
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                Things you never thought to search for. Sourced entirely around your enduring taste and current interests.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F7F3EC] flex items-center justify-between">
                  <span className="font-medium text-brand-ink">A film worth watching this weekend</span>
                  <span className="text-[10px] font-mono text-stone-400">Stream release</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F3EC] flex items-center justify-between">
                  <span className="font-medium text-brand-ink">A quiet nearby restaurant opening</span>
                  <span className="text-[10px] font-mono text-stone-400">Neighborhood</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F7F3EC] flex items-center justify-between">
                  <span className="font-medium text-brand-ink">A long-form essay on complex systems</span>
                  <span className="text-[10px] font-mono text-stone-400">Archival</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-brand-deep-green font-semibold">
              Proactive serendipity · Zero search required
            </div>
          </div>

          {/* Column 2: It Watches */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-stone/50 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/60">
                <Eye size={20} className="text-brand-deep-green" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-ink">
                It watches
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed font-sans">
                Things you’ve told it matter. Routes, hardware prices, concert ticket drops, or book reprints.
              </p>

              {/* Push Notification Card Simulation */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-emerald-500/40 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 flex items-center gap-1">
                      <Bell size={10} />
                      <span>Target Price Met</span>
                    </span>
                    <span className="text-[10px] text-stone-400">12 min ago</span>
                  </div>
                  <p className="font-medium text-brand-ink text-xs">
                    The flight you were considering just dropped below your target price.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-stone-600 flex items-center gap-1">
                      <Bell size={10} />
                      <span>Release Alert</span>
                    </span>
                    <span className="text-[10px] text-stone-400">Yesterday</span>
                  </div>
                  <p className="font-medium text-brand-ink text-xs">
                    Tickets opened for an acoustic performance you’d want to see.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-brand-deep-green font-semibold">
              Passive monitoring · Only alerts when criteria are met
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
