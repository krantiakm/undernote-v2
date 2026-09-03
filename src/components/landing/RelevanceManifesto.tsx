'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PhoneCall, Check, X, VolumeX } from 'lucide-react';

export const RelevanceManifesto: React.FC = () => {
  return (
    <section id="relevance" className="py-20 sm:py-28 bg-brand-deep-green text-brand-ivory relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-terracotta/20 text-[10px] font-bold uppercase tracking-wider text-brand-terracotta-light">
            <Sparkles size={11} />
            <span>The Relevance Standard</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal">
            Commercial discovery isn&apos;t broken.{' '}
            <span className="italic text-brand-terracotta-light">Irrelevant timing is.</span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-sage-light max-w-lg mx-auto leading-relaxed">
            Nobody hates finding great things. We only hate getting interrupted by offers that know nothing about our lives.
          </p>
        </div>

        {/* Crisp Visual Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cold Call Spam */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-deep-green-dark/70 rounded-3xl p-6 border border-white/10 space-y-4"
          >
            <div className="flex items-center justify-between text-xs text-red-400 font-bold">
              <span className="flex items-center gap-1.5">
                <PhoneCall size={14} />
                <span>The Cold Call Problem</span>
              </span>
              <span className="text-[10px] font-mono text-white/40">SPAM</span>
            </div>
            <p className="font-serif text-base text-white">
              &ldquo;Are you looking to buy a villa in a distant suburb?&rdquo;
            </p>
            <p className="text-xs text-brand-sage-light leading-relaxed">
              Irritating because you aren&apos;t looking for property and it fits none of your rules.
            </p>
          </motion.div>

          {/* Undernote Fit */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 rounded-3xl p-6 border border-brand-terracotta/40 space-y-4 shadow-soft"
          >
            <div className="flex items-center justify-between text-xs text-brand-terracotta-light font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>The Undernote Fit</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-300">SERENDIPITY</span>
            </div>
            <p className="font-serif text-base text-brand-ivory">
              &ldquo;Direct BLR flight to Colombo just dropped for your Dec 20–27 window.&rdquo;
            </p>
            <p className="text-xs text-brand-ivory/80 leading-relaxed">
              When you <em>are</em> planning a family trip, perfect context and timing feels like magic.
            </p>
          </motion.div>
        </div>

        {/* Proactive Silence Callout */}
        <div className="bg-brand-deep-green-dark/40 rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between gap-4 text-xs text-brand-sage-light">
          <div className="flex items-center gap-3">
            <VolumeX size={18} className="text-brand-terracotta-light shrink-0" />
            <span>
              <strong>Proactive Silence:</strong> Undernote only surfaces 3 to 8 opportunities. If nothing matches 100% of your rules, it stays quiet.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
