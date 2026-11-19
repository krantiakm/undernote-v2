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
  IconHeart,
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
  onSkip: () => void;
}

interface DraggableTopCardProps {
  card: SwipeTasteCardData;
  onDecide: (choice: 'yes' | 'no') => void;
}

const DraggableTopCard: React.FC<DraggableTopCardProps> = ({ card, onDecide }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 0, 180], [-9, 0, 9]);
  const yesOpacity = useTransform(x, [20, 95], [0, 1]);
  const noOpacity = useTransform(x, [-95, -20], [1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 85 || info.velocity.x > 450) {
      onDecide('yes');
    } else if (info.offset.x < -85 || info.velocity.x < -450) {
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
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[360px] rounded-[26px] overflow-hidden shadow-elevated border border-brand-warm-stone/60 select-none cursor-grab active:cursor-grabbing bg-[#17201E]"
    >
      {/* Full-Bleed Scene Photograph */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveAssetUrl(card.image)}
        alt={card.title}
        draggable={false}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* High-Contrast Top & Bottom Scrims */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none" />

      {/* Top Step Pill */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-[#141C1A]/82 backdrop-blur-md text-[#FAF7F2] text-[10.5px] font-semibold uppercase tracking-[0.08em] border border-white/20 shadow-sm">
          {card.stepLabel}
        </span>
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-md border shadow-sm ${
            card.kind === 'boundary'
              ? 'bg-brand-terracotta/90 text-white border-white/25'
              : 'bg-[#141C1A]/75 text-[#FAF7F2] border-white/20'
          }`}
        >
          {card.kind === 'boundary' ? 'Sharp Signal' : 'Vibe Check'}
        </span>
      </div>

      {/* Live Swipe Stamps */}
      <motion.div
        style={{ opacity: yesOpacity }}
        className="absolute top-14 left-4 px-3.5 py-1.5 rounded-xl bg-brand-deep-green/95 text-brand-ivory border-2 border-brand-sage-light text-xs font-bold tracking-[0.1em] uppercase -rotate-6 shadow-lg pointer-events-none"
      >
        {card.yesStamp}
      </motion.div>

      <motion.div
        style={{ opacity: noOpacity }}
        className="absolute top-14 right-4 px-3.5 py-1.5 rounded-xl bg-brand-terracotta/95 text-white border-2 border-white/70 text-xs font-bold tracking-[0.1em] uppercase rotate-6 shadow-lg pointer-events-none"
      >
        {card.noStamp}
      </motion.div>

      {/* Bottom Copy */}
      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5 pointer-events-none">
        <h2 className="font-sans text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-white drop-shadow-sm">
          {card.title}
        </h2>
        <p className="font-serif text-[13px] text-white/88 leading-[1.48]">
          {card.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export const SwipeTasteDeck: React.FC<SwipeTasteDeckProps> = ({
  cards,
  cityName,
  onComplete,
  onVoiceSubmit,
  onSkip,
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
      // Ensure at least one baseline preference if user swiped left on all vibes
      if (nextRules.length === 0) {
        nextRules.push({
          key: 'Curated Small-Group Gatherings',
          value: `Surface thoughtful, well-hosted cultural evenings and weekends in ${cityName}.`,
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
    <div className="flex-1 flex flex-col justify-between px-5 pt-2 pb-5 space-y-3.5">
      {/* 1. Concise Two-Part Framing */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
            Personal Context · {index + 1} of {cards.length}
          </span>
          {/* Segmented Progress Bar */}
          <div className="flex items-center gap-1">
            {cards.map((c, i) => (
              <span
                key={c.id}
                className={`h-1 rounded-full transition-all duration-200 ${
                  i === index
                    ? 'w-4 bg-brand-terracotta'
                    : i < index
                    ? 'w-2 bg-brand-deep-green'
                    : 'w-2 bg-brand-warm-stone'
                }`}
              />
            ))}
          </div>
        </div>

        <h1 className="font-serif text-[21px] leading-[1.22] font-medium text-brand-ink">
          Shape a context that belongs to you.
        </h1>
        <p className="text-[12px] text-brand-ink-light leading-relaxed">
          Swipe right on what fits your life. You control your context—{cityName} events are the first example of it working for you.
        </p>
      </div>

      {/* 2. Interactive Visual Card Stack */}
      <div className="relative h-[366px] flex items-center justify-center">
        {/* Next card peeking underneath */}
        {nextCard && (
          <div
            key={`peek-${nextCard.id}`}
            className="absolute inset-x-3 top-3 h-[354px] rounded-[26px] overflow-hidden opacity-55 scale-[0.96] pointer-events-none border border-brand-warm-stone/50 bg-[#17201E]"
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
            <DraggableTopCard
              key={activeCard.id}
              card={activeCard}
              onDecide={handleDecision}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 3. Tactile Left / Right Tap Controls */}
      <div className="flex items-center justify-center gap-5 pt-0.5">
        <button
          type="button"
          onClick={() => handleDecision('no')}
          className="flex items-center gap-2 py-2.5 px-5 rounded-full bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone text-xs font-semibold text-brand-ink shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <IconClose size={15} className="text-brand-ink-light" />
          <span>{activeCard?.noStamp ? 'Not me' : 'Pass'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleDecision('yes')}
          className="flex items-center gap-2 py-2.5 px-6 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <IconHeart size={15} filled accent="#C66E45" />
          <span>Yes, fits me</span>
        </button>
      </div>

      {/* 4. Secondary Visible Choices: Bring from AI + Speak + Skip */}
      <div className="pt-2 border-t border-brand-warm-stone/65 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/import?returnTo=vault"
            className="py-2.5 px-3 rounded-2xl bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-[11.5px] font-semibold text-brand-ink flex items-center justify-center gap-1.5 transition-colors"
          >
            <IconSparkNote size={14} className="text-brand-deep-green shrink-0" />
            <span>Bring from AI</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="py-2.5 px-3 rounded-2xl bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-[11.5px] font-semibold text-brand-ink flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <IconMicrophone size={14} className="text-brand-deep-green shrink-0" />
            <span>Speak Instead</span>
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-[11px] font-medium text-brand-ink-light hover:text-brand-ink underline underline-offset-2 cursor-pointer"
          >
            Skip for now and browse generic {cityName} feed
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
                    ? 'Listening… speak naturally about what evenings, mornings, and boundaries fit you.'
                    : 'Tap the mic or type a couple of sentences below.'}
                </p>
              </div>

              <textarea
                rows={4}
                value={voiceText}
                onChange={(e) => setVoiceText(e.target.value)}
                placeholder="e.g., I love small acoustic concerts and Saturday morning walks in Cubbon Park, strictly vegetarian, and no loud late-night clubs…"
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
