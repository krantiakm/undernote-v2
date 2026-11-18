'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-14 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="max-w-[340px] bg-brand-deep-green text-brand-ivory text-xs px-4 py-2.5 rounded-full shadow-elevated border border-white/10 flex items-center gap-2.5 backdrop-blur-md pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-terracotta shrink-0" />
            <span className="font-sans font-medium tracking-tight leading-snug">
              {toastMessage}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
