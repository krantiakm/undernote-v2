'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Target,
  Plus,
  Mic,
  TrendingDown,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  ChevronDown,
  X,
} from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';

export default function WatchingPage() {
  const { watches, intents, toggleWatchStatus, addWatch, showToast } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedWatchId, setExpandedWatchId] = useState<string | null>(null);

  const [newEntity, setNewEntity] = useState('');
  const [newCriteria, setNewCriteria] = useState('');
  const [newTargetPrice, setNewTargetPrice] = useState('');
  const [newType, setNewType] = useState<'price' | 'travel' | 'product' | 'availability'>('price');
  const [isRecording, setIsRecording] = useState(false);

  const triggeredCount = watches.filter((w) => w.triggerMet).length;

  const handleVoiceAdd = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setNewEntity('Sony 24mm F/2.8 G Lens');
        setNewCriteria('Price drop below ₹45,000');
        setNewTargetPrice('45000');
        setNewType('price');
        setIsRecording(false);
        showToast('Voice transcribed into tracker');
      }, 1800);
    } else {
      setIsRecording(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntity.trim() || !newCriteria.trim()) return;

    addWatch({
      type: newType,
      entity: newEntity.trim(),
      criteria: newCriteria.trim(),
      targetPrice: newTargetPrice ? parseFloat(newTargetPrice) : undefined,
      currentPrice: newTargetPrice ? parseFloat(newTargetPrice) * 1.15 : undefined,
      currency: 'INR',
      status: 'active',
      checkCadence: 'Every 2 hours',
      notificationMode: 'important_only',
    });

    setNewEntity('');
    setNewCriteria('');
    setNewTargetPrice('');
    setIsAddModalOpen(false);
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory p-4 space-y-4 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink-light">
                Autonomous Monitors
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-ink">
              Watching
            </h1>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-brand-deep-green text-white px-3.5 py-2 rounded-full shadow-xs hover:bg-brand-deep-green-dark transition-all active:scale-95"
          >
            <Plus size={14} />
            <span>New Watch</span>
          </button>
        </div>

        {/* Compact Status Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex-1 bg-white p-2.5 rounded-2xl border border-brand-warm-stone/50 shadow-soft text-center font-medium text-brand-ink">
            <strong>{watches.length}</strong> Active Monitors
          </span>
          <span className="flex-1 bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200 shadow-soft text-center font-semibold text-emerald-800 flex items-center justify-center gap-1">
            <Sparkles size={12} className="text-emerald-600" />
            <span><strong>{triggeredCount}</strong> Targets Met</span>
          </span>
        </div>

        {/* 1. LIVE BACKGROUND MONITORS */}
        <div className="space-y-3">
          {watches.map((w) => {
            const isMet = w.triggerMet;
            const isExpanded = expandedWatchId === w.id;

            return (
              <div
                key={w.id}
                className={`p-4 rounded-3xl border transition-all shadow-soft bg-white ${
                  isMet ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-brand-warm-stone/60'
                }`}
              >
                {/* Top Row: Entity & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-brand-ink">{w.entity}</h4>
                      {isMet && (
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                          Target Met
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-brand-ink-muted leading-tight">
                      {w.criteria}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleWatchStatus(w.id)}
                    className="p-1 rounded-full bg-brand-ivory text-brand-ink-light hover:text-brand-ink border border-brand-warm-stone/40"
                    title={w.status === 'active' ? 'Pause' : 'Resume'}
                  >
                    {w.status === 'active' ? <Pause size={12} /> : <Play size={12} />}
                  </button>
                </div>

                {/* Price Comparisons */}
                {w.targetPrice && w.currentPrice && (
                  <div className="mt-3 p-2.5 rounded-2xl bg-brand-ivory flex items-center justify-between text-xs border border-brand-warm-stone/30">
                    <div>
                      <span className="text-[10px] text-brand-ink-light block">Current Price</span>
                      <span className="font-bold text-brand-deep-green text-sm">
                        ₹{w.currentPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-brand-ink-light block">Target</span>
                      <span className="font-medium text-brand-ink text-xs">
                        ₹{w.targetPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tap to Reveal History */}
                <button
                  onClick={() => setExpandedWatchId(isExpanded ? null : w.id)}
                  className="w-full mt-2 pt-2 border-t border-brand-warm-stone/25 flex items-center justify-between text-[11px] text-brand-ink-light hover:text-brand-ink"
                >
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-brand-terracotta" />
                    <span>Checked {w.lastChecked}</span>
                  </span>
                  <span className="font-semibold text-brand-deep-green flex items-center gap-0.5">
                    <span>{isExpanded ? 'Hide Log' : 'History'}</span>
                    <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                {/* REVEALED LOG ON TAP */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 pt-2 border-t border-brand-warm-stone/20 space-y-1.5 text-[11px]"
                    >
                      {w.observations.map((obs, idx) => (
                        <div key={idx} className="p-2 bg-brand-ivory rounded-xl flex items-center justify-between text-brand-ink-muted">
                          <span>{obs.notes}</span>
                          <span className="font-bold text-brand-deep-green">{obs.price ? `₹${obs.price.toLocaleString('en-IN')}` : obs.availability}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* 2. ACTIVE PLANNING INTENTS */}
        <div className="space-y-2.5 pt-2">
          <h3 className="font-serif text-sm font-bold text-brand-ink">
            Active Planning Horizons
          </h3>

          {intents.map((intent) => (
            <div
              key={intent.id}
              className="bg-white rounded-3xl p-4 border border-brand-warm-stone/60 shadow-soft space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-brand-ink">{intent.title}</h4>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.2 rounded-full shrink-0">
                  {intent.daysRemaining}d left
                </span>
              </div>
              <p className="text-[11px] text-brand-ink-muted leading-tight">{intent.description}</p>
              <div className="w-full h-1.5 bg-brand-warm-stone/30 rounded-full overflow-hidden">
                <div className="h-full bg-brand-deep-green rounded-full" style={{ width: `${intent.progressPercent}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* ADD MODAL */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm bg-brand-ivory rounded-3xl p-5 border border-brand-warm-stone shadow-2xl space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-brand-ink">
                    Create Proactive Tracker
                  </h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 rounded-full bg-brand-warm-stone/40 flex items-center justify-center">
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleAddSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">Product or Route</label>
                    <input
                      type="text"
                      value={newEntity}
                      onChange={(e) => setNewEntity(e.target.value)}
                      placeholder="e.g. 'Sony FE 40mm Prime'"
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">Target Price (₹)</label>
                    <input
                      type="number"
                      value={newTargetPrice}
                      onChange={(e) => setNewTargetPrice(e.target.value)}
                      placeholder="e.g. 45000"
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-ink block mb-1">Criteria</label>
                    <input
                      type="text"
                      value={newCriteria}
                      onChange={(e) => setNewCriteria(e.target.value)}
                      placeholder="e.g. 'Price drop under ₹45,000'"
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-xs text-brand-ink-light px-3 py-2">
                      Cancel
                    </button>
                    <button type="submit" className="text-xs font-semibold bg-brand-deep-green text-white px-4 py-2 rounded-xl shadow-xs">
                      Activate Watch
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
