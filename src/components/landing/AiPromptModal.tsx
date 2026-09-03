'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles, Mic, ArrowRight, Bot, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface AiPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProvider?: 'gemini' | 'chatgpt' | 'claude' | 'voice';
}

const SAMPLE_AI_OUTPUT = `1. Personal & Family Context:
- Home Base: Bangalore, India (BLR airport anchor)
- Family Structure: Married with a 7-year-old daughter
- Rhythm: Calm weekend mornings, unhurried routines

2. Travel Style & Constraints:
- Non-negotiable rule: Non-stop direct flights only for family journeys (avoid transit fatigue)
- Lodging: Child-safe boutique sanctuaries, private plunge pools or gardens
- Upcoming Intent: Looking for a 6-day family coastal retreat in Sri Lanka for late December

3. Shopping & Hardware:
- Phone Ergonomics: Screen size strictly under 6.3 inches for single-handed grip; clean stock Android OS
- Camera: Ultralight 500g full-frame body and compact primes
- Active Price Watch: Pixel 11 upgrade if price drops below ₹60,000

4. Food & Specialty Coffee:
- Specialty coffee: Anaerobic light/medium single-origin pour-overs with floral (jasmine) and stone-fruit notes
- Neighborhood roasters: Araku, Blue Tokai, Subko

5. Craft Values & Thought:
- Cultural pursuits: 200-seat unamplified acoustic theatre, architectural literature, heritage dawn walks
- Sovereignty: 100% personal data ownership, zero ad tracking`;

const PROMPTS = {
  gemini: {
    title: 'Google Gemini Extraction Prompt',
    icon: GeminiIcon,
    accent: 'from-[#4E82EE] via-[#9B72CB] to-[#D96570]',
    accentColor: '#9B72CB',
    instructions: 'Copy this prompt, paste it into Google Gemini (Gemini Advanced / 1.5 Pro / 2.0 Flash), then paste the response below.',
    text: `Give me a comprehensive, structured summary of what you know about me from our conversations and memory. Focus strictly on durable lifestyle information likely to remain useful across future interactions:

1. Personal and family context (locations, relationships, children, routines)
2. Travel style, flight rules, lodging preferences, and transit constraints
3. Shopping preferences, hardware form factors, screen sizes, and decision rules
4. Food, specialty coffee preferences, and tasting notes
5. Core values, craftsmanship standards, and cultural interests
6. Long-term goals and active upcoming projects or price watches

Format your response clearly with bullet points, separating explicit facts from your inferences. Avoid temporary one-off coding bugs or transient tasks unless they reveal an enduring lifestyle preference.`,
  },
  chatgpt: {
    title: 'ChatGPT Memory Extraction Prompt',
    icon: OpenAIIcon,
    accent: 'from-[#10A37F] to-[#0D8C6C]',
    accentColor: '#10A37F',
    instructions: 'Copy this prompt, paste it into ChatGPT (GPT-4o / Memory enabled), then paste the response below.',
    text: `Review everything stored in your Custom Instructions, Memory, and our past conversations about me. Generate a structured lifestyle context summary:

1. Personal & Family: Location anchor, family composition, children, schedule rhythms
2. Travel Bedrock: Departure airport, flight transit rules (e.g. direct only), stay preferences
3. Hardware & Goods: Ergonomic constraints (screen sizes, weights), brand preferences, OS
4. Food & Coffee: Roast styles, flavor notes (floral/stone-fruit), roaster preferences
5. Culture & Hobbies: Literature genres, acoustic performance styles, creative pursuits
6. Active Horizons: Short-term holiday plans, hardware upgrade intents, price watches

Provide a clean, bulleted breakdown separating persistent long-term rules from short-term active goals.`,
  },
  claude: {
    title: 'Claude Context Extraction Prompt',
    icon: ClaudeIcon,
    accent: 'from-[#D97706] to-[#B45309]',
    accentColor: '#D97706',
    instructions: 'Copy this prompt, paste it into Claude (Claude 3.5 Sonnet / Artifacts), then paste the response below.',
    text: `Based on all our past chats, projects, and shared context, provide a comprehensive, high-fidelity profile of my durable preferences and constraints:

1. Personal Foundation: Base city, family makeup, daily pacing
2. Travel Rules: Non-negotiable route constraints, lodging aesthetics, pacing
3. Hardware Philosophy: Tactile ergonomics, screen limits, durable design standards
4. Specialty Taste: Coffee profiles (roast, process, tasting notes), culinary values
5. Cultural Pursuits: Literature, architectural interests, acoustic performances
6. Active Projects: Any near-term purchase watches or travel windows we discussed

Format as structured, clean bullets ready for context ingestion into Undernote.`,
  },
  voice: {
    title: '30-Second Voice Dictation',
    icon: Mic,
    accent: 'from-brand-terracotta to-brand-terracotta-dark',
    accentColor: '#C66E45',
    instructions: 'Simply speak about your base city, family rules, coffee notes, and things you are currently looking for.',
    text: '',
  },
};

export const AiPromptModal: React.FC<AiPromptModalProps> = ({
  isOpen,
  onClose,
  initialProvider = 'gemini',
}) => {
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'chatgpt' | 'claude' | 'voice'>(
    initialProvider
  );
  const [copied, setCopied] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);

  const { runIngestionPipeline, isMorphing } = useApp();

  // Reset when opened
  React.useEffect(() => {
    if (isOpen) {
      setSelectedProvider(initialProvider);
      setIsSuccess(false);
      setCopied(false);
    }
  }, [isOpen, initialProvider]);

  if (!isOpen) return null;

  const currentPrompt = PROMPTS[selectedProvider];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLoadSample = () => {
    setRawInput(SAMPLE_AI_OUTPUT);
  };

  const handleIngest = async () => {
    if (!rawInput.trim()) return;

    await runIngestionPipeline({
      text: rawInput,
      source: selectedProvider === 'voice' ? 'Voice Note' : selectedProvider === 'gemini' ? 'Google Gemini' : selectedProvider === 'chatgpt' ? 'ChatGPT 4o' : 'Claude 3.5',
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C66E45', '#24483F', '#9DB6A9', '#DDD6CB'],
    });

    setIsSuccess(true);
  };

  const handleToggleVoice = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      setRawInput(
        "I live in Bangalore near Indiranagar. I have a 7-year-old daughter so we strictly only take non-stop direct flights to avoid layover fatigue. I love light anaerobic pour-over coffee with jasmine and peach notes. I'm currently looking for a compact phone under 6.3 inches if it drops under ₹60,000, and a 6-day family beach villa in Sri Lanka for late December."
      );
    } else {
      setIsVoiceRecording(true);
      setVoiceSeconds(0);
      const timer = setInterval(() => {
        setVoiceSeconds((prev) => {
          if (prev >= 6) {
            clearInterval(timer);
            setIsVoiceRecording(false);
            setRawInput(
              "I live in Bangalore near Indiranagar. I have a 7-year-old daughter so we strictly only take non-stop direct flights to avoid layover fatigue. I love light anaerobic pour-over coffee with jasmine and peach notes. I'm currently looking for a compact phone under 6.3 inches if it drops under ₹60,000, and a 6-day family beach villa in Sri Lanka for late December."
            );
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-ink/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-2xl bg-brand-ivory rounded-3xl shadow-2xl border border-brand-warm-stone/80 overflow-hidden my-8"
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-warm-stone/50 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-deep-green text-brand-ivory flex items-center justify-center">
              <Sparkles size={16} className="text-brand-terracotta" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-ink">
                Connect What Your AI Knows
              </h3>
              <p className="text-[12px] text-brand-ink-light">
                Turn chat memory into a proactive, sovereign radar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center text-brand-ink-light hover:text-brand-ink hover:bg-brand-warm-stone/40 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-soft">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="font-serif text-2xl font-bold text-brand-deep-green">
                  Context Synthesized Beautifully
                </h4>
                <p className="text-sm text-brand-ink-light leading-relaxed">
                  Undernote has extracted your <strong>Bangalore anchor</strong>, <strong>direct flight rules</strong>, <strong>compact hardware limits</strong>, and <strong>specialty coffee notes</strong>.
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-4 border border-brand-warm-stone/60 max-w-md mx-auto text-left space-y-2 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-deep-green">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Sovereign Storage Verified (Local-First)</span>
                </div>
                <p className="text-xs text-brand-ink-muted">
                  Your context remains stored locally on your device with zero ad tracking and zero external data sharing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/radar"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-deep-green text-white font-medium text-sm hover:bg-brand-deep-green-dark transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore Your Personalized Radar</span>
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border border-brand-warm-stone/80 text-brand-ink text-sm font-medium hover:bg-brand-ivory transition-colors"
                >
                  Add More Context
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Provider Selection Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-ink-light mb-2.5">
                  1. Choose Your Preferred AI Assistant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Google Gemini */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('gemini')}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left ${
                      selectedProvider === 'gemini'
                        ? 'bg-white border-blue-400/80 shadow-soft ring-2 ring-blue-400/20'
                        : 'bg-white/60 border-brand-warm-stone/60 hover:bg-white text-brand-ink-light'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <GeminiIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-ink">Gemini</div>
                      <div className="text-[10px] text-brand-ink-light">Google AI</div>
                    </div>
                  </button>

                  {/* ChatGPT */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('chatgpt')}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left ${
                      selectedProvider === 'chatgpt'
                        ? 'bg-white border-emerald-500/80 shadow-soft ring-2 ring-emerald-500/20'
                        : 'bg-white/60 border-brand-warm-stone/60 hover:bg-white text-brand-ink-light'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <OpenAIIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-ink">ChatGPT</div>
                      <div className="text-[10px] text-brand-ink-light">OpenAI</div>
                    </div>
                  </button>

                  {/* Claude */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('claude')}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left ${
                      selectedProvider === 'claude'
                        ? 'bg-white border-amber-500/80 shadow-soft ring-2 ring-amber-500/20'
                        : 'bg-white/60 border-brand-warm-stone/60 hover:bg-white text-brand-ink-light'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                      <ClaudeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-ink">Claude</div>
                      <div className="text-[10px] text-brand-ink-light">Anthropic</div>
                    </div>
                  </button>

                  {/* Voice Note */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider('voice')}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left ${
                      selectedProvider === 'voice'
                        ? 'bg-white border-brand-terracotta shadow-soft ring-2 ring-brand-terracotta/20'
                        : 'bg-white/60 border-brand-warm-stone/60 hover:bg-white text-brand-ink-light'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-orange-50 flex items-center justify-center text-brand-terracotta shrink-0">
                      <Mic size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-ink">Voice Note</div>
                      <div className="text-[10px] text-brand-ink-light">30s Dictation</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Copy Prompt or Voice Record */}
              {selectedProvider === 'voice' ? (
                <div className="bg-white rounded-2xl p-6 border border-brand-warm-stone/80 text-center space-y-4 shadow-soft">
                  <div className="w-16 h-16 rounded-full bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center mx-auto">
                    <Mic size={28} className={isVoiceRecording ? 'animate-pulse text-brand-terracotta-dark' : ''} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-ink">
                      {isVoiceRecording ? `Listening... (${voiceSeconds}s)` : 'Speak Your Lifestyle Context'}
                    </h4>
                    <p className="text-xs text-brand-ink-light max-w-sm mx-auto mt-1">
                      Mention your city, flight rules, coffee taste, screen size limits, or upcoming holiday plans.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                      isVoiceRecording
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-brand-deep-green text-white hover:bg-brand-deep-green-dark'
                    }`}
                  >
                    {isVoiceRecording ? 'Stop Recording' : 'Start 30s Voice Note'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-brand-ink-light">
                      2. Copy This Extraction Prompt
                    </label>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        copied
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-brand-deep-green text-brand-ivory hover:bg-brand-deep-green-dark'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={13} />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative group">
                    <div className="bg-white rounded-2xl p-4 border border-brand-warm-stone/80 font-mono text-[11px] text-brand-ink leading-relaxed max-h-36 overflow-y-auto select-all shadow-inner">
                      {currentPrompt.text}
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-ink-light italic">
                    💡 Tip: Paste this into your active {selectedProvider === 'gemini' ? 'Gemini' : selectedProvider === 'chatgpt' ? 'ChatGPT' : 'Claude'} chat, then copy its output back here.
                  </p>
                </div>
              )}

              {/* Step 3: Paste and Transform */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-ink-light">
                    3. Paste AI Output Here
                  </label>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="text-[11px] text-brand-terracotta hover:underline font-medium"
                  >
                    Try Sample AI Response
                  </button>
                </div>

                <textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder="Paste the bulleted response from your AI here (or click 'Try Sample AI Response' above to test instantly)..."
                  rows={4}
                  className="w-full bg-white rounded-2xl p-3.5 border border-brand-warm-stone/80 text-xs text-brand-ink placeholder:text-brand-ink-light/50 focus:outline-none focus:ring-2 focus:ring-brand-deep-green font-sans resize-none shadow-inner"
                />
              </div>

              {/* CTA Ingestion Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={!rawInput.trim() || isMorphing}
                  onClick={handleIngest}
                  className={`w-full py-3.5 rounded-2xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-card ${
                    rawInput.trim() && !isMorphing
                      ? 'bg-brand-deep-green text-brand-ivory hover:bg-brand-deep-green-dark hover:shadow-elevated active:scale-[0.99]'
                      : 'bg-brand-warm-stone/40 text-brand-ink-light/40 cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={16} className={rawInput.trim() ? 'text-brand-terracotta' : ''} />
                  <span>
                    {isMorphing
                      ? 'Synthesizing Your Context Graph...'
                      : 'Synthesize & Personalize My Radar'}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
