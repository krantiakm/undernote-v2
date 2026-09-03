'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Sliders } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export interface RefinementOption {
  label: string;
  key: string;
  value: string;
  domain: RadarDomain;
}

interface InlineContextRefinementProps {
  id: string;
  title: string;
  rationale: string;
  options: RefinementOption[];
}

export const InlineContextRefinement: React.FC<InlineContextRefinementProps> = ({
  id,
  title,
  rationale,
  options,
}) => {
  const { addContextItem, showToast } = useApp();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: RefinementOption) => {
    setSelectedOption(option.label);

    addContextItem({
      domain: option.domain,
      type: 'preference',
      key: option.key,
      value: option.value,
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 0.98,
      status: 'active',
      origin: 'user_answer',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: {
        provider: 'Undernote Direct Refinement',
      },
    });

    showToast(`Refinement saved: "${option.key}" → Updated in Me`);
  };

  return (
    <div className="my-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#162B25] to-[#0E1B17] text-white border border-[#2A4B42] shadow-md space-y-3">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase tracking-wider text-brand-terracotta border border-white/10">
          <Sliders size={11} />
          <span>Calibrate Context</span>
        </div>
        <span className="text-[10px] text-stone-400 font-mono">1 tap refinement</span>
      </div>

      {/* Question & Rationale */}
      <div className="space-y-1">
        <h4 className="font-serif text-sm sm:text-base font-bold text-[#F7F3EC] leading-snug">
          {title}
        </h4>
        <p className="text-xs text-[#DDD6CB]/80 font-sans leading-relaxed">
          {rationale}
        </p>
      </div>

      {/* Quick Interactive Tappable Choices */}
      <AnimatePresence mode="wait">
        {selectedOption ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-2xl bg-white/10 border border-emerald-400/30 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check size={12} />
              </div>
              <span className="text-white font-medium">
                Saved: <span className="text-brand-terracotta">{selectedOption}</span>
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">Updated in Me</span>
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-xs font-medium text-white transition-all cursor-pointer text-left flex items-center justify-between gap-2 shadow-2xs"
              >
                <span>{opt.label}</span>
                <ArrowRight size={12} className="text-brand-terracotta shrink-0" />
              </button>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
