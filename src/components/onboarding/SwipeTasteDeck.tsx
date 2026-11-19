'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from 'framer-motion';
import { SwipeTasteCardData } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconClose,
  IconMicrophone,
  IconReset,
  IconSparkNote,
} from '@/components/ui/BrandIcons';

interface SwipeTasteDeckProps {
  cards: SwipeTasteCardData[];
  cityName: string;
  onComplete: (
    extractedRules: Array<{
      key: string;
      value: string;
      type: 'preference' | 'constraint' | 'goal';
    }>
  ) => void;
  onVoiceSubmit: (transcript: string) => Promise<void>;
}

interface PosterSceneCardProps {
  card: SwipeTasteCardData;
  exitDirection: 'left' | 'right';
  onDecide: (choice: 'yes' | 'no') => void;
}

const PosterSceneCard: React.FC<PosterSceneCardProps> = ({
  card,
  exitDirection,
  onDecide,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-9, 0, 9]);
  const rightStampOpacity = useTransform(x, [20, 85], [0, 1]);
  const leftStampOpacity = useTransform(x, [-85, -20], [1, 0]);
  const rightTintOpacity = useTransform(x, [20, 140], [0, 0.28]);
  const leftTintOpacity = useTransform(x, [-140, -20], [0.28, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 75 || info.velocity.x > 400) {
      onDecide('yes');
    } else if (info.offset.x < -75 || info.velocity.x < -400) {
      onDecide('no');
    }
  };

  return (
    <motion.div
      key={card.id}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        x: exitDirection === 'right' ? 390 : -390,
        rotate: exitDirection === 'right' ? 14 : -14,
        opacity: 0,
        transition: { duration: 0.24, ease: 'easeIn' },
      }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 rounded-[28px] overflow-hidden shadow-elevated border border-brand-warm-stone/60 select-none cursor-grab active:cursor-grabbing bg-[#121917]"
    >
      {/* Full-Bleed Poster Photography */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveAssetUrl(card.image)}
        alt={card.title}
        draggable={false}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Directional Drag Color Feedback Wash */}
      <motion.div
        style={{ opacity: rightTintOpacity }}
        className="absolute inset-0 bg-emerald-900 pointer-events-none"
      />
      <motion.div
        style={{ opacity: leftTintOpacity }}
        className="absolute inset-0 bg-rose-950 pointer-events-none"
      />

      {/* Rock-Solid Inline Linear Gradients (Immune to any Tailwind opacity purge) */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12, 18, 16, 0.78) 0%, rgba(12, 18, 16, 0.32) 55%, rgba(12, 18, 16, 0) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[66%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10, 15, 14, 0.97) 0%, rgba(10, 15, 14, 0.90) 44%, rgba(10, 15, 14, 0.52) 74%, rgba(10, 15, 14, 0) 100%)',
        }}
      />

      {/* Top Category Pill + Remaining Cards Counter */}
      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10.5px] font-semibold uppercase tracking-[0.08em] border border-white/25 shadow-md"
          style={{ backgroundColor: 'rgba(16, 23, 21, 0.88)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E68860]" />
          <span>{card.stepLabel}</span>
        </span>
      </div>

      {/* Live Drag Stamps: Right = COUNT ME IN, Left = NOT FOR ME */}
      <motion.div
        style={{ opacity: rightStampOpacity }}
        className="absolute top-16 left-4 px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white border-2 border-emerald-200 text-xs font-bold tracking-[0.09em] uppercase -rotate-6 shadow-xl pointer-events-none"
      >
        ✓ {card.yesStamp}
      </motion.div>

      <motion.div
        style={{ opacity: leftStampOpacity }}
        className="absolute top-16 right-4 px-3.5 py-1.5 rounded-xl bg-[#B84A32] text-white border-2 border-white/80 text-xs font-bold tracking-[0.09em] uppercase rotate-6 shadow-xl pointer-events-none"
      >
        ✕ {card.noStamp}
      </motion.div>

      {/* Bottom Dock: Guaranteed High-Contrast Copy + Directional Left/Right Buttons */}
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3.5">
        <div className="space-y-1.5 pointer-events-none">
          <h2 className="font-sans text-[22px] sm:text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] text-white">
            {card.title}
          </h2>
          <p
            className="font-serif text-[13.5px] leading-[1.48]"
            style={{ color: '#EDE7DC' }}
          >
            {card.subtitle}
          </p>
        </div>

        {/* Directional Action Buttons Matching Left Swipe vs Right Swipe */}
        <div
          className="grid grid-cols-2 gap-2.5 pt-0.5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onDecide('no')}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.14)' }}
            className="py-3 px-3 rounded-2xl hover:bg-white/25 active:scale-[0.98] backdrop-blur-md border border-white/30 text-white text-[11.5px] font-semibold leading-tight transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <IconArrowLeft size={13.5} className="text-[#E68860] shrink-0" />
            <span className="truncate">{card.noLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => onDecide('yes')}
            className="py-3 px-3 rounded-2xl bg-[#FAF7F2] hover:bg-white active:scale-[0.98] text-[#17201E] text-[11.5px] font-semibold leading-tight shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="truncate">{card.yesLabel}</span>
            <IconArrowRight size={13.5} className="text-brand-deep-green shrink-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface DecisionHistoryEntry {
  cardTitle: string;
  choice: 'yes' | 'no';
  addedRule?: { key: string; value: string; type: 'preference' | 'constraint' | 'goal' };
}

export const SwipeTasteDeck: React.FC<SwipeTasteDeckProps> = ({
  cards,
  cityName,
  onComplete,
  onVoiceSubmit,
}) => {
  const [index, setIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right');
  const [history, setHistory] = useState<DecisionHistoryEntry[]>([]);

  // Inline Voice Modal State
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);

  const activeCard = cards[index];
  const nextCard = cards[index + 1];
  const lastDecision = history[history.length - 1];
  const remainingCount = cards.length - index;

  const handleDecision = (choice: 'yes' | 'no') => {
    if (!activeCard) return;

    setExitDirection(choice === 'yes' ? 'right' : 'left');

    let addedRule: DecisionHistoryEntry['addedRule'];
    if (choice === 'yes' && activeCard.onYesRule) {
      addedRule = {
        key: activeCard.onYesRule.key,
        value: activeCard.onYesRule.value,
        type: activeCard.onYesRule.type,
      };
    } else if (choice === 'no' && activeCard.onNoRule) {
      addedRule = {
        key: activeCard.onNoRule.key,
        value: activeCard.onNoRule.value,
        type: activeCard.onNoRule.type,
      };
    }

    const nextHistory: DecisionHistoryEntry[] = [
      ...history,
      { cardTitle: activeCard.title, choice, addedRule },
    ];

    if (index >= cards.length - 1) {
      const rules = nextHistory
        .map((h) => h.addedRule)
        .filter((r): r is NonNullable<typeof r> => Boolean(r));
      if (rules.length === 0) {
        rules.push({
          key: 'Curated Gatherings',
          value: `Surface well-hosted cultural evenings and weekends in ${cityName}.`,
          type: 'preference',
        });
      }
      onComplete(rules);
    } else {
      setHistory(nextHistory);
      setIndex((prev) => prev + 1);
    }
  };

  const handleUndo = () => {
    if (history.length === 0 || index === 0) return;
    setHistory((prev) => prev.slice(0, -1));
    setIndex((prev) => prev - 1);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          if (isFinal) {
            setVoiceText((prev) => `${prev ? `${prev} ` : ''}${text}`);
          }
        },
        onError: () => setIsRecording(false),
        onEnd: () => setIsRecording(false),
      });
      setSpeechSession(session);
    } else {
      speechSession?.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* 1. Clear Decision Header (NO carousel lines that trick users into swiping left to advance!) */}
      <div className="px-4 pb-2 space-y-2 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-serif text-[17px] leading-snug font-medium text-brand-ink">
            What belongs in your Personal Context?
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DE] text-[10.5px] font-semibold text-brand-ink-muted shrink-0 tabular-nums">
            {remainingCount} {remainingCount === 1 ? 'card left' : 'cards left'}
          </span>
        </div>

        {/* Explicit Left vs Right Legend OR Live Last-Decision Confirmation + Undo */}
        {lastDecision ? (
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DE] border border-brand-warm-stone text-[11px]">
            <span className="truncate font-medium text-brand-ink">
              {lastDecision.choice === 'yes' ? (
                <span className="text-brand-deep-green font-semibold">✓ Counted in: </span>
              ) : (
                <span className="text-brand-terracotta font-semibold">✕ Passed: </span>
              )}
              {lastDecision.cardTitle}
            </span>
            <button
              type="button"
              onClick={handleUndo}
              className="inline-flex items-center gap-1 font-semibold text-brand-deep-green hover:text-brand-terracotta shrink-0 cursor-pointer"
            >
              <IconReset size={12} />
              <span>Undo</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-[#EFE9DE]/90 border border-brand-warm-stone/80 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 text-brand-terracotta">
              <IconArrowLeft size={12.5} />
              <span>Swipe left: Not for me</span>
            </span>
            <span className="w-px h-3 bg-brand-warm-stone" />
            <span className="inline-flex items-center gap-1 text-brand-deep-green">
              <span>Swipe right: Count me in</span>
              <IconArrowRight size={12.5} />
            </span>
          </div>
        )}
      </div>

      {/* 2. Expansive Poster Card Stack */}
      <div className="flex-1 min-h-0 relative mx-3">
        {nextCard && (
          <div
            key={`peek-${nextCard.id}`}
            className="absolute inset-x-2.5 top-2 bottom-0 rounded-[28px] overflow-hidden opacity-45 scale-[0.97] pointer-events-none bg-[#17201E]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveAssetUrl(nextCard.image)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <AnimatePresence custom={exitDirection}>
          {activeCard && (
            <PosterSceneCard
              key={activeCard.id}
              card={activeCard}
              exitDirection={exitDirection}
              onDecide={handleDecision}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 3. Always-Above-the-Fold Secondary Bar: Bring from AI + Speak */}
      <div className="px-3 pt-2.5 pb-[max(12px,env(safe-area-inset-bottom))] shrink-0">
        <div className="rounded-2xl bg-[#EFE9DE] border border-brand-warm-stone p-1.5 flex items-center gap-1.5">
          <span className="text-[10.5px] font-medium text-brand-ink-light pl-2.5 pr-1 shrink-0">
            Or skip cards:
          </span>

          <Link
            href="/import?returnTo=vault"
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#FCFBF8] hover:bg-white border border-brand-warm-stone/80 text-[11.5px] font-semibold text-brand-ink flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <IconSparkNote size={13.5} className="text-brand-deep-green shrink-0" />
            <span>Bring from AI</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#FCFBF8] hover:bg-white border border-brand-warm-stone/80 text-[11.5px] font-semibold text-brand-ink flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <IconMicrophone size={13.5} className="text-brand-deep-green shrink-0" />
            <span>Speak</span>
          </button>
        </div>
      </div>

      {/* Inline Speak Sheet */}
      <AnimatePresence>
        {isVoiceOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center"
            onClick={() => setIsVoiceOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] p-6 space-y-4 border-t border-brand-warm-stone shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium text-brand-ink">
                  Tell Undernote about your world
                </h3>
                <button
                  type="button"
                  onClick={() => setIsVoiceOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#EFE9DE] flex items-center justify-center text-brand-ink cursor-pointer"
                >
                  <IconClose size={15} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                    isRecording
                      ? 'bg-brand-terracotta text-white animate-pulse'
                      : 'bg-brand-deep-green text-brand-ivory'
                  }`}
                >
                  <IconMicrophone size={20} accent="#F7F3EC" />
                </button>
                <p className="text-xs text-brand-ink-light leading-relaxed">
                  {isRecording
                    ? 'Listening… describe the kinds of evenings, weekends, and food you enjoy.'
                    : 'Tap the mic or type a couple of sentences below.'}
                </p>
              </div>

              <textarea
                rows={4}
                value={voiceText}
                onChange={(e) => setVoiceText(e.target.value)}
                placeholder={`e.g., In ${cityName} I love vinyl bars or small chamber concerts, open to all food, and weekend morning walks…`}
                className="w-full rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone p-3 text-xs text-brand-ink leading-relaxed focus:outline-none focus:border-brand-deep-green"
              />

              <button
                type="button"
                disabled={voiceText.trim().length < 10}
                onClick={async () => {
                  await onVoiceSubmit(voiceText);
                  setIsVoiceOpen(false);
                }}
                className="w-full py-3 rounded-full bg-brand-deep-green disabled:opacity-45 text-brand-ivory text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <IconCheck size={14} />
                <span>Create My Personal Context</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
