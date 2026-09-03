'use client';

import React from 'react';
import { Compass, Eye, Bell } from 'lucide-react';

export const WorksWhileAwaySection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#F2EDE4] border-t border-brand-warm-stone/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header - concise */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep-green font-bold">
            Quiet Background Intelligence
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-ink">
            You don't have to keep checking.
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75 font-sans">
            Undernote notices when something becomes relevant, so you never miss what matters.
          </p>
        </div>

        {/* 2-Column Split: minimal text, visual notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Column 1: It Finds */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-warm-stone/50 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand-ivory text-brand-terracotta flex items-center justify-center border border-brand-warm-stone/60">
              <Compass size={16} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-ink">
                It finds
              </h3>
              <p className="text-xs text-brand-ink/70 font-sans mt-0.5">
                Things you never thought to search for.
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F7F3EC] flex items-center justify-between">
                <span className="font-medium text-brand-ink">A film worth watching tonight</span>
                <span className="text-[10px] font-mono text-stone-400">Stream release</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F7F3EC] flex items-center justify-between">
                <span className="font-medium text-brand-ink">A quiet nearby restaurant opening</span>
                <span className="text-[10px] font-mono text-stone-400">Neighborhood</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F7F3EC] flex items-center justify-between">
                <span className="font-medium text-brand-ink">A long-form essay on complex systems</span>
                <span className="text-[10px] font-mono text-stone-400">Archival</span>
              </div>
            </div>
          </div>

          {/* Column 2: It Watches */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-warm-stone/50 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand-ivory text-brand-deep-green flex items-center justify-center border border-brand-warm-stone/60">
              <Eye size={16} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-ink">
                It watches
              </h3>
              <p className="text-xs text-brand-ink/70 font-sans mt-0.5">
                Things you’ve told it matter.
              </p>
            </div>

            {/* Simulated Clean Push Notifications */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-500/40 shadow-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 flex items-center gap-1">
                    <Bell size={9} />
                    <span>Target Price Met</span>
                  </span>
                  <span className="text-[10px] text-stone-400">12 min ago</span>
                </div>
                <p className="font-medium text-brand-ink text-xs">
                  Direct flight dropped below your target price.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-600 flex items-center gap-1">
                    <Bell size={9} />
                    <span>Tickets Released</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Yesterday</span>
                </div>
                <p className="font-medium text-brand-ink text-xs">
                  Tickets opened for an acoustic performance you’d want to see.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
