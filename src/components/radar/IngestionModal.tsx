'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Mic,
  MicOff,
  FileText,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UNIVERSAL_AI_PROMPT = `Give me a comprehensive, structured summary of what you know about me from our conversations and memory. Focus strictly on durable information likely to remain useful across future interactions:
1. Personal and family context (locations, relationships, children, routines)
2. Travel style, flight rules, lodging preferences, and constraints
3. Shopping preferences, hardware form factors, brand choices, and decision rules
4. Food, specialty coffee, and dining tastes
5. Core values, craftsmanship standards, and communication preferences
6. Long-term goals and active upcoming projects

Format your response clearly, separating explicit facts from your inferences.`;

export const IngestionModal: React.FC<IngestionModalProps> = ({ isOpen, onClose }) => {
  const { runIngestionPipeline, isIngesting } = useApp();
  const [activeTab, setActiveTab] = useState<'ai' | 'voice' | 'quiz'>('ai');

  // AI Memory state
  const [pastedText, setPastedText] = useState('');
  const [hasCopiedPrompt, setHasCopiedPrompt] = useState(false);

  // Voice Note state
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Quiz state
  const [quizCity, setQuizCity] = useState('Bangalore (BLR)');
  const [quizTravel, setQuizTravel] = useState('Direct Non-stop Flights');
  const [quizTaste, setQuizTaste] = useState('Specialty Coffee & Compact Devices');

  if (!isOpen) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(UNIVERSAL_AI_PROMPT);
    setHasCopiedPrompt(true);
    setTimeout(() => setHasCopiedPrompt(false), 2500);
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setVoiceTranscript('Listening... "I live in Bangalore with my wife and 7-year-old daughter. I only book direct flights, love anaerobic pour-overs, and only use phones under 6.3 inches..."');
    } else {
      setIsRecording(false);
    }
  };

  const handleSynthesize = async () => {
    let payload = {};
    if (activeTab === 'ai') {
      payload = {
        text: pastedText || 'Sample extracted ChatGPT memory: Bangalore base, 7yo child, non-stop flight rule, anaerobic light roasts, <6.3" phone ergonomics.',
        source: 'ChatGPT / Claude Import',
      };
    } else if (activeTab === 'voice') {
      payload = {
        voiceNote: voiceTranscript || 'User voice note recorded for 30 seconds.',
        source: 'Voice Dictation',
      };
    } else {
      payload = {
        quizAnswers: { city: quizCity, travel: quizTravel, taste: quizTaste },
        source: 'Lifestyle Quick Quiz',
      };
    }

    await runIngestionPipeline(payload);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md bg-brand-ivory rounded-t-3xl sm:rounded-3xl shadow-2xl border border-brand-warm-stone/50 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-brand-warm-stone/40 flex items-center justify-between bg-white/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-deep-green/10 flex items-center justify-center text-brand-deep-green">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-sm text-brand-ink">
                  Context Ingestion Studio
                </h3>
                <p className="text-[11px] text-brand-ink-light">
                  Transform Radar with your personal bedrock
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-brand-warm-stone/40 hover:bg-brand-warm-stone flex items-center justify-center text-brand-ink transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-brand-warm-stone/30 bg-brand-ivory-light px-3 pt-2 gap-1">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-2 text-xs font-medium rounded-t-xl transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'ai'
                  ? 'bg-white text-brand-deep-green border-t border-x border-brand-warm-stone/40 shadow-xs'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <FileText size={13} />
              <span>AI Memory</span>
            </button>

            <button
              onClick={() => setActiveTab('voice')}
              className={`flex-1 py-2 text-xs font-medium rounded-t-xl transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'voice'
                  ? 'bg-white text-brand-deep-green border-t border-x border-brand-warm-stone/40 shadow-xs'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <Mic size={13} />
              <span>Voice Note</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2 text-xs font-medium rounded-t-xl transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-white text-brand-deep-green border-t border-x border-brand-warm-stone/40 shadow-xs'
                  : 'text-brand-ink-light hover:text-brand-ink'
              }`}
            >
              <HelpCircle size={13} />
              <span>3-Tap Quiz</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {activeTab === 'ai' && (
              <div className="space-y-3">
                {/* Step 1: Copy prompt */}
                <div className="bg-brand-deep-green/5 border border-brand-deep-green/15 rounded-2xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-deep-green">
                      Step 1: Copy prompt into ChatGPT or Claude
                    </span>
                    <button
                      onClick={handleCopyPrompt}
                      className="flex items-center gap-1 text-[11px] font-medium bg-brand-deep-green text-white px-2.5 py-1 rounded-full hover:bg-brand-deep-green-dark transition-colors shadow-xs"
                    >
                      {hasCopiedPrompt ? (
                        <>
                          <Check size={11} className="text-emerald-300" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-brand-ink-light font-mono bg-white/70 p-2 rounded-lg line-clamp-2 border border-brand-warm-stone/30">
                    {UNIVERSAL_AI_PROMPT}
                  </p>
                </div>

                {/* Step 2: Paste output */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-ink flex items-center justify-between">
                    <span>Step 2: Paste AI Summary below</span>
                    <button
                      onClick={() =>
                        setPastedText(
                          'Location: Bangalore. Family: Married with 7yo daughter. Travel rules: Direct flights only from BLR, quiet boutique lodging. Hardware: Compact phones <6.3", Stock Android. Taste: Anaerobic fermented light roasts, jasmine notes.'
                        )
                      }
                      className="text-[10px] text-brand-terracotta hover:underline"
                    >
                      Insert Example Context
                    </button>
                  </label>
                  <textarea
                    rows={4}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste the text response from ChatGPT, Claude, or Gemini here..."
                    className="w-full text-xs p-3 rounded-2xl border border-brand-warm-stone/60 bg-white focus:outline-none focus:ring-2 focus:ring-brand-deep-green/30 font-sans"
                  />
                </div>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="space-y-4 text-center py-2">
                <p className="text-xs text-brand-ink-muted">
                  Talk naturally for 30 seconds about your city, family, travel rules, and coffee habits.
                </p>

                {/* Animated Mic Button */}
                <div className="flex flex-col items-center justify-center py-2">
                  <button
                    onClick={handleToggleVoice}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isRecording
                        ? 'bg-brand-terracotta text-white scale-110 shadow-glow'
                        : 'bg-brand-deep-green text-white hover:bg-brand-deep-green-dark'
                    }`}
                  >
                    {isRecording && (
                      <span className="absolute inset-0 rounded-full border-4 border-brand-terracotta/40 animate-ping" />
                    )}
                    {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
                  </button>

                  <span className="text-xs font-semibold text-brand-ink mt-3">
                    {isRecording ? 'Listening... Tap to stop' : 'Tap to speak'}
                  </span>
                </div>

                {/* Sound wave simulation */}
                {isRecording && (
                  <div className="flex items-center justify-center gap-1 h-6">
                    {[16, 24, 12, 30, 20, 28, 14, 22, 18].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-brand-terracotta rounded-full animate-pulse"
                        style={{
                          height: `${h}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {voiceTranscript && (
                  <div className="text-left bg-white/80 p-3 rounded-2xl border border-brand-warm-stone/40 text-xs text-brand-ink-muted">
                    <span className="font-semibold text-brand-deep-green block mb-1">
                      Transcription:
                    </span>
                    {voiceTranscript}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    1. Primary Location Anchor
                  </label>
                  <select
                    value={quizCity}
                    onChange={(e) => setQuizCity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white font-medium"
                  >
                    <option value="Bangalore (BLR)">Bangalore (BLR)</option>
                    <option value="Mumbai (BOM)">Mumbai (BOM)</option>
                    <option value="Delhi (DEL)">Delhi (DEL)</option>
                    <option value="London (LHR)">London (LHR)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    2. Family Travel Philosophy
                  </label>
                  <select
                    value={quizTravel}
                    onChange={(e) => setQuizTravel(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white font-medium"
                  >
                    <option value="Direct Non-stop Flights">Strict Direct Non-Stop (Zero Layovers)</option>
                    <option value="Boutique Villas">Secluded Boutique Nature Reserves</option>
                    <option value="Fast City Breaks">Fast Weekend Escapes</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    3. Taste & Craft Preferences
                  </label>
                  <select
                    value={quizTaste}
                    onChange={(e) => setQuizTaste(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white font-medium"
                  >
                    <option value="Specialty Coffee & Compact Devices">Specialty Coffee & Compact Hardware (&lt;6.3&quot;)</option>
                    <option value="Acoustic Arts & Literature">Acoustic Theatre & Architectural Prints</option>
                    <option value="All Craft Bedrock">All Mindful Craft Rules</option>
                  </select>
                </div>
              </div>
            )}

            {/* Privacy note */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 border border-brand-warm-stone/30 text-[10px] text-brand-ink-light">
              <ShieldCheck size={14} className="text-brand-deep-green shrink-0" />
              <span>
                <strong>100% Sovereign Privacy:</strong> All synthesized context rules stay strictly on your device. Zero ad tracking, zero commercial data brokering.
              </span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-white/60 border-t border-brand-warm-stone/40 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs text-brand-ink-light hover:text-brand-ink px-3 py-2"
            >
              Cancel
            </button>

            <button
              disabled={isIngesting}
              onClick={handleSynthesize}
              className="flex items-center gap-2 text-xs font-medium bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory px-5 py-2.5 rounded-full shadow-md active:scale-98 transition-all disabled:opacity-50"
            >
              {isIngesting ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Synthesizing Context Graph...</span>
                </>
              ) : (
                <>
                  <span>Synthesize & Morph Radar</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
