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
  IconCheck,
  IconClose,
  IconMicrophone,
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
  isFirst: boolean;
  onDecide: (choice: 'yes' | 'no') => void;
}

const PosterSceneCard: React.FC<PosterSceneCardProps> = ({
  card,
  isFirst,
  onDecide,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-190, 0, 190], [-7, 0, 7]);
  const rightStampOpacity = useTransform(x, [25, 95], [0, 1]);
  const leftStampOpacity = useTransform(x, [-95, -25], [1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 80 || info.velocity.x > 420) {
      onDecide('yes');
    } else if (info.offset.x < -80 || info.velocity.x < -420) {
      onDecide('no');
    }
  };

  return (
    <motion.div
      key={card.id}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.16 } }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 rounded-[28px] overflow-hidden shadow-elevated border border-brand-warm-stone/50 select-none cursor-grab active:cursor-grabbing bg-[#141C1A]"
    >
      {/* Full-Bleed Poster Photography */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveAssetUrl(card.image)}
        alt={card.title}
        draggable={false}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Top & Bottom Editorial Vignettes */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/68 via-black/22 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0E1513]/96 via-[#0E1513]/72 to-transparent pointer-events-none" />

      {/* Top Metadata Bar */}
      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121917]/86 backdrop-blur-md text-white text-[10.5px] font-semibold uppercase tracking-[0.08em] border border-white/22 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E68860]" />
          <span>{card.stepLabel}</span>
        </span>

        {isFirst && (
          <span className="px-2.5 py-1 rounded-full bg-[#121917]/76 backdrop-blur-md text-white/85 text-[10px] font-medium border border-white/18">
            Swipe or tap below
          </span>
        )}
      </div>

      {/* Live Drag Stamps */}
      <motion.div
        style={{ opacity: rightStampOpacity }}
        className="absolute top-16 left-4 px-3.5 py-1.5 rounded-xl bg-brand-deep-green/95 text-brand-ivory border border-white/40 text-[11px] font-bold tracking-[0.09em] uppercase -rotate-6 shadow-lg pointer-events-none"
      >
        {card.yesStamp}
      </motion.div>

      <motion.div
        style={{ opacity: leftStampOpacity }}
        className="absolute top-16 right-4 px-3.5 py-1.5 rounded-xl bg-[#141C1A]/95 text-white border border-white/40 text-[11px] font-bold tracking-[0.09em] uppercase rotate-6 shadow-lg pointer-events-none"
      >
        {card.noStamp}
      </motion.div>

      {/* Bottom Dock: Poster Typography + Two Unbiased Integrated Choices */}
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3.5">
        <div className="space-y-1.5 pointer-events-none">
          <h2 className="font-sans text-[23px] sm:text-[25px] font-semibold leading-[1.16] tracking-[-0.02em] text-white drop-shadow-xs">
            {card.title}
          </h2>
          <p className="font-serif text-[13.5px] text-white/86 leading-[1.48]">
            {card.subtitle}
          </p>
        </div>

        {/* Two Equal-Dignity Choice Pills (stopPropagation prevents drag conflict on tap) */}
        <div
          className="grid grid-cols-2 gap-2.5 pt-0.5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onDecide('no')}
            className="py-3 px-3 rounded-2xl bg-white/14 hover:bg-white/24 active:scale-[0.98] backdrop-blur-md border border-white/28 text-white text-[12px] font-medium leading-tight transition-all cursor-pointer text-center"
          >
            {card.noLabel}
          </button>

          <button
            type="button"
            onClick={() => onDecide('yes')}
            className="py-3 px-3 rounded-2xl bg-[#FAF7F2] hover:bg-white active:scale-[0.98] text-brand-ink text-[12px] font-semibold leading-tight shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
            <span>{card.yesLabel}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const SwipeTasteDeck: React.FC<SwipeTasteDeckProps> = ({
  cards,
  cityName,
  onComplete,
  onVoiceSubmit,
}) => {
  const [index, setIndex] = useState(0);
  const [collectedRules, setCollectedRules] = useState<
    Array<{ key: string; value: string; type: 'preference' | 'constraint' | 'goal' }>
  >([]);

  // Inline Voice Modal State
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);

  const activeCard = cards[index];
  const nextCard = cards[index + 1];

  const handleDecision = (choice: 'yes' | 'no') => {
    if (!activeCard) return;

    const nextRules = [...collectedRules];
    if (choice === 'yes' && activeCard.onYesRule) {
      nextRules.push({
        key: activeCard.onYesRule.key,
        value: activeCard.onYesRule.value,
        type: activeCard.onYesRule.type,
      });
    } else if (choice === 'no' && activeCard.onNoRule) {
      nextRules.push({
        key: activeCard.onNoRule.key,
        value: activeCard.onNoRule.value,
        type: activeCard.onNoRule.type,
      });
    }

    if (index >= cards.length - 1) {
      if (nextRules.length === 0) {
        nextRules.push({
          key: 'Curated Gatherings',
          value: `Surface well-hosted cultural evenings and weekends in ${cityName}.`,
          type: 'preference',
        });
      }
      onComplete(nextRules);
    } else {
      setCollectedRules(nextRules);
      setIndex((prev) => prev + 1);
    }
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
      {/* 1. Compact Subhead + Segmented Progress (fits tightly at top) */}
      <div className="px-4 pb-2.5 space-y-2 shrink-0">
        <div className="flex items-baseline justify-between gap-2">
          <h1 className="font-serif text-[17.5px] leading-snug font-medium text-brand-ink">
            Shape a Personal Context that’s yours.
          </h1>
          <span className="text-[11px] font-semibold tabular-nums text-brand-terracotta shrink-0">
            {index + 1} / {cards.length}
          </span>
        </div>

        {/* Full-Width Segmented Progress Strip */}
        <div className="grid grid-cols-8 gap-1">
          {cards.map((c, i) => (
            <span
              key={c.id}
              className={`h-[3px] rounded-full transition-colors duration-200 ${
                i === index
                  ? 'bg-brand-terracotta'
                  : i < index
                  ? 'bg-brand-deep-green'
                  : 'bg-brand-warm-stone/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Expansive Poster Card Stack (Fills ~76% of the mobile viewport!) */}
      <div className="flex-1 min-h-0 relative mx-3">
        {/* Next card peeking subtly behind */}
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

        <AnimatePresence mode="popLayout">
          {activeCard && (
            <PosterSceneCard
              key={activeCard.id}
              card={activeCard}
              isFirst={index === 0}
              onDecide={handleDecision}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 3. Always-Above-the-Fold Secondary Bar: Bring from AI + Speak */}
      <div className="px-3 pt-2.5 pb-[max(12px,env(safe-area-inset-bottom))] shrink-0">
        <div className="rounded-2xl bg-[#EFE9DE]/90 border border-brand-warm-stone/80 p-1.5 flex items-center gap-1.5">
          <span className="text-[10.5px] font-medium text-brand-ink-light pl-2.5 pr-1 shrink-0">
            Faster path:
          </span>

          <Link
            href="/import?returnTo=vault"
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#FCFBF8] hover:bg-white border border-brand-warm-stone/75 text-[11.5px] font-semibold text-brand-ink flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
          >
            <IconSparkNote size={13.5} className="text-brand-deep-green shrink-0" />
            <span>Bring from AI</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#FCFBF8] hover:bg-white border border-brand-warm-stone/75 text-[11.5px] font-semibold text-brand-ink flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
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
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end justify-center"
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
