'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export const CategoryChips: React.FC = () => {
  const { domainFilter, setDomainFilter } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const categories: Array<{ id: RadarDomain; label: string }> = [
    { id: 'travel', label: 'Trips' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'books', label: 'Books' },
    { id: 'events', label: 'Experiences' },
    { id: 'food-drink', label: 'Dining' },
    { id: 'films', label: 'Watch' },
  ];

  const handleSelectAll = () => {
    setDomainFilter('all');
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (id: RadarDomain) => {
    setDomainFilter(id);
  };

  return (
    <div className="px-4 pb-2 pt-1 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1.5 min-w-max">
        {/* Main "All" Toggle Pill with Right Arrow */}
        <button
          onClick={handleSelectAll}
          className={`inline-flex items-center gap-1 py-1.5 px-3.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer shadow-2xs ${
            domainFilter === 'all'
              ? 'bg-brand-deep-green text-white border-brand-deep-green font-bold'
              : 'bg-white text-brand-ink/80 border-brand-warm-stone/60 hover:border-brand-deep-green'
          }`}
        >
          <span>All</span>
          <ChevronRight
            size={13}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-90 text-brand-terracotta' : ''}`}
          />
        </button>

        {/* Categories that appear to the right of "All" when clicked */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center gap-1.5"
            >
              {categories.map((cat) => {
                const isActive = domainFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`py-1.5 px-3 rounded-full text-xs font-medium transition-all border whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-brand-deep-green text-white border-brand-deep-green font-bold shadow-2xs'
                        : 'bg-white text-brand-ink/70 border-brand-warm-stone/60 hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
