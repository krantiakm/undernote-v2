'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const StoryModal: React.FC = () => {
  const { stories, activeStoryIndex, closeStory, nextStory, prevStory } = useApp();
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  useEffect(() => {
    if (activeStoryIndex === null) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const intervalTime = 50; // 50ms interval
    const totalTime = 5000; // 5 seconds
    const increment = (intervalTime / totalTime) * 100;

    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + increment;
        });
      }
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeStoryIndex, isPaused]);

  if (activeStoryIndex === null || !activeStory) return null;

  const isTracked = activeStory.badge === 'Tracked Alert';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md h-full max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl bg-brand-ink flex flex-col justify-between"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Background Full-Bleed Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={activeStory.heroImage}
              alt={activeStory.title}
              fill
              className="object-cover brightness-75"
              priority
            />
            {/* Editorial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />
          </div>

          {/* Top Bar: Progress Segments + Header */}
          <div className="relative z-10 p-4 pt-5">
            {/* Story Progress Indicators */}
            <div className="flex items-center gap-1.5 mb-3">
              {stories.map((s, i) => (
                <div key={s.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75"
                    style={{
                      width:
                        i < activeStoryIndex
                          ? '100%'
                          : i === activeStoryIndex
                          ? `${progress}%`
                          : '0%',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header info */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isTracked
                      ? 'bg-emerald-500/80 text-white'
                      : 'bg-brand-terracotta/90 text-white'
                  }`}
                >
                  {activeStory.badge}
                </span>
                <span className="text-xs text-white/70">{activeStory.timeAgo}</span>
              </div>
              <button
                onClick={closeStory}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Click Zones for Tap Next / Prev */}
          <div className="absolute inset-0 z-10 flex">
            <div
              className="w-1/3 h-3/4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                prevStory();
              }}
            />
            <div className="w-1/3 h-3/4" />
            <div
              className="w-1/3 h-3/4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                nextStory();
              }}
            />
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-20 p-5 pb-6 text-white space-y-3.5">
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                {activeStory.title}
              </h3>
              <p className="text-sm font-sans text-white/90 leading-snug">
                {activeStory.tagline}
              </p>
            </div>

            {/* Takeaways List */}
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-2">
              {activeStory.takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                  <CheckCircle2
                    size={14}
                    className={`shrink-0 mt-0.5 ${
                      isTracked ? 'text-emerald-400' : 'text-brand-terracotta-light'
                    }`}
                  />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <Link
                href={`/radar/${activeStory.cardId}`}
                onClick={closeStory}
                className="flex-1 py-3 px-4 rounded-xl bg-brand-ivory text-brand-deep-green font-medium text-xs text-center flex items-center justify-center gap-1.5 shadow-lg hover:bg-white transition-all active:scale-98"
              >
                <span>Deep Dive Details</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={activeStory.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-brand-deep-green/90 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-white/20 hover:bg-brand-deep-green transition-all"
              >
                <span>{activeStory.actionLabel}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
