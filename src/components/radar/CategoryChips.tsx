'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export const CategoryChips: React.FC = () => {
  const { domainFilter, setDomainFilter } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const categories: Array<{ id: 'all' | RadarDomain; label: string }> = [
    { id: 'all', label: 'All Categories' },
    { id: 'travel', label: 'Trips' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'books', label: 'Books' },
    { id: 'events', label: 'Experiences' },
    { id: 'food-drink', label: 'Dining' },
    { id: 'films', label: 'Films' },
  ];

  const currentLabel =
    categories.find((c) => c.id === domainFilter)?.label || 'All Categories';

  return (
    <div className="px-4 pb-2">
      {/* Collapsed Pill Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer shadow-2xs ${
            isOpen
              ? 'bg-brand-deep-green text-white border-brand-deep-green'
              : 'bg-white text-brand-ink/80 border-brand-warm-stone/60 hover:border-brand-deep-green'
          }`}
        >
          <span>{currentLabel}</span>
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {domainFilter !== 'all' && (
          <button
            onClick={() => setDomainFilter('all')}
            className="text-[11px] text-stone-500 hover:text-brand-ink font-medium underline underline-offset-2"
          >
            Reset to All
          </button>
        )}
      </div>

      {/* Expandable Category Pills Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden pt-2"
          >
            <div className="flex flex-wrap gap-1.5 p-2.5 rounded-2xl bg-white border border-brand-warm-stone/50 shadow-xs">
              {categories.map((cat) => {
                const isActive = domainFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setDomainFilter(cat.id);
                      setIsOpen(false);
                    }}
                    className={`py-1 px-3 rounded-full text-[11px] font-medium transition-all border flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-brand-deep-green text-white border-brand-deep-green font-bold shadow-2xs'
                        : 'bg-[#F7F3EC] text-brand-ink/70 border-brand-warm-stone/50 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isActive && <Check size={11} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
