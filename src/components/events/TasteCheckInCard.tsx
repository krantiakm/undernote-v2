'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarDomain } from '@/types';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { IconCheck, IconSliders } from '@/components/ui/BrandIcons';

export interface TasteOption {
  label: string;
  key: string;
  value: string;
  domain: RadarDomain;
}

interface TasteCheckInCardProps {
  id: string;
  title: string;
  rationale: string;
  options: TasteOption[];
  onAnswer: (option: TasteOption) => void;
}

export const TasteCheckInCard: React.FC<TasteCheckInCardProps> = ({
  title,
  rationale,
  options,
  onAnswer,
}) => {
  const [chosen, setChosen] = useState<string | null>(null);

  const handleChoose = (opt: TasteOption) => {
    setChosen(opt.label);
    setTimeout(() => {
      onAnswer(opt);
    }, 450);
  };

  return (
    <div className="relative overflow-hidden rounded-[22px] bg-[#F2ECE1] border border-brand-warm-stone/85 p-5 space-y-3.5">
      <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.5} />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
            <IconSliders size={13} className="text-brand-deep-green" />
            <span>Quiet Check-In</span>
          </span>
          <span className="text-[10.5px] text-brand-ink-light">One tap</span>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-[15px] font-medium text-brand-ink leading-snug">
            {title}
          </h4>
          <p className="text-xs text-brand-ink-light leading-relaxed">{rationale}</p>
        </div>

        <AnimatePresence mode="wait">
          {chosen ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-2.5 px-3.5 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-medium inline-flex items-center gap-2"
            >
              <IconCheck size={14} />
              <span>Noted: {chosen}</span>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-2 pt-0.5">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChoose(opt)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#FCFBF8] hover:bg-brand-deep-green hover:text-brand-ivory border border-brand-warm-stone/90 text-xs font-medium text-brand-ink text-left transition-all cursor-pointer flex items-center justify-between shadow-2xs"
                >
                  <span>{opt.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
                </button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
