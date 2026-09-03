'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="max-w-xs bg-brand-deep-green text-brand-ivory text-xs px-4 py-2.5 rounded-full shadow-elevated border border-brand-deep-green-light/40 flex items-center gap-2.5 backdrop-blur-sm pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
            <span className="font-medium tracking-tight leading-snug">{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
