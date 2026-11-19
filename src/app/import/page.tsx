'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/shell/AppShell';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { GeminiIcon, OpenAIIcon, ClaudeIcon } from '@/components/ui/AiIcons';
import { useApp } from '@/context/AppContext';
import { GeographyAnchor } from '@/types';
import { startSpeechRecognition } from '@/lib/voice/speechRecognition';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconMicrophone,
  IconShieldPrivacy,
} from '@/components/ui/BrandIcons';

const SAMPLE_CULTURAL_DOSSIER = `1. Home City & Weekly Rhythm:
- Base: Bangalore (Indiranagar / Central corridor); quiet mornings, protective of weeknight rest.
- Family: Partner and 7-year-old daughter; weekends are best before 10 AM or early evenings.

2. Cultural Gatherings That Resonate:
- Unamplified Music & Stage: Chamber recitals (strings, bansuri, piano), contemporary theatre at Ranga Shankara, courtyard acoustic jazz.
- Ideas & Walks: Architecture and urban-ecology walks in Cubbon Park, small bookstore reading salons at Champaca, curator museum walkthroughs at MAP or BIC.
- Hands-On Craft: Slow stoneware clay mornings, letterpress or relief printmaking benches under 10 people.

3. Non-Negotiable Boundaries:
- Food: Strictly 100% vegetarian for any supper club, tasting table, or pre-show café.
- Atmosphere: Skip loud bars, standing DJ clubs, stadium crowds, and events finishing after 9:45 PM on weeknights.`;

const EXTRACTION_PROMPT = `Based on everything you know about me from our conversations and saved memory, write a concise, honest portrait of how I like to spend my cultural and personal time outside work:

1. My home city, neighborhood radius, and weekly energy rhythm (mornings vs. evenings).
2. What kinds of live music, theatre, talks, walks, exhibitions, films, workshops, or suppers genuinely draw me in—and why.
3. Who I usually step out with (solo, partner, children, close friends).
4. My non-negotiable boundaries (dietary rules, crowd size, noise levels, latest finish time, budget comfort).`;

type ProviderId = 'chatgpt' | 'gemini' | 'claude';

function ImportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialProvider = (searchParams.get('provider') as ProviderId) || 'chatgpt';
  const returnToVault = searchParams.get('returnTo') === 'vault';

  const {
    geography,
    setGeography,
    runIngestionPipeline,
    isIngesting,
    showToast,
  } = useApp();

  const [mode, setMode] = useState<'ai' | 'voice' | 'quick'>('ai');
  const [provider, setProvider] = useState<ProviderId>(
    ['chatgpt', 'gemini', 'claude'].includes(initialProvider) ? initialProvider : 'chatgpt'
  );
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [rawInput, setRawInput] = useState('');

  // Voice mode
  const [isRecording, setIsRecording] = useState(false);
  const [speechSession, setSpeechSession] = useState<{ stop: () => void } | null>(null);

  // Quick setup mode
  const [quickCity, setQuickCity] = useState<GeographyAnchor>(geography);
  const [quickFormats, setQuickFormats] = useState<string[]>([
    'Intimate acoustic music',
    'Morning walks',
  ]);
  const [quickBoundary, setQuickBoundary] = useState(
    'Skip loud nightlife; wrap up weeknights by 9:30 PM'
  );

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(EXTRACTION_PROMPT);
    setCopiedPrompt(true);
    showToast('Prompt copied — paste into your AI assistant');
    setTimeout(() => setCopiedPrompt(false), 2400);
  };

  const handlePasteInterceptor = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text/plain');
    if (text) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart ?? rawInput.length;
      const end = target.selectionEnd ?? rawInput.length;
      setRawInput(rawInput.slice(0, start) + text + rawInput.slice(end));
    }
  };

  const handleSynthesize = async () => {
    const payload =
      mode === 'quick'
        ? `Home city: ${
            quickCity === 'singapore-sin' ? 'Singapore' : 'Bangalore'
          }. Drawn to: ${quickFormats.join(', ')}. Boundaries: ${quickBoundary}.`
        : rawInput;

    if (payload.trim().length < 15) {
      showToast('Share a sentence or two first');
      return;
    }

    if (mode === 'quick' && quickCity !== geography) {
      setGeography(quickCity);
    }

    await runIngestionPipeline({ text: payload, source: mode });
    router.push(returnToVault ? '/onboarding?step=vault' : '/radar');
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Listening — describe your ideal evenings & weekends');
      const session = startSpeechRecognition({
        onTranscript: (text, isFinal) => {
          setRawInput((prev) => (isFinal ? `${prev ? `${prev} ` : ''}${text}` : prev));
        },
        onError: (err) => {
          setIsRecording(false);
          showToast(err);
        },
        onEnd: () => setIsRecording(false),
      });
      setSpeechSession(session);
    } else {
      speechSession?.stop();
      setIsRecording(false);
    }
  };

  const toggleFormatChoice = (label: string) => {
    setQuickFormats((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-ivory pb-10">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-brand-ivory/92 backdrop-blur-md border-b border-brand-warm-stone/55 px-5 py-3.5 flex items-center justify-between">
        <Link
          href="/radar"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:text-brand-deep-green transition-colors"
        >
          <IconArrowLeft size={16} />
          <span>Back</span>
        </Link>
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta">
          Personal Context
        </span>
      </header>

      {/* Hero Intro */}
      <section className="relative px-5 pt-5 pb-4 overflow-hidden">
        <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.42} />
        <div className="relative z-10 space-y-2">
          <h1 className="font-serif text-[24px] leading-[1.2] font-medium text-brand-ink">
            Bring what your AI already knows.
          </h1>
          <p className="text-[13px] text-brand-ink-light leading-relaxed">
            Turn scattered conversations in ChatGPT, Claude, or Gemini into a quiet cultural calendar that respects your time and taste.
          </p>
          <div className="pt-0.5">
            <span className="brand-rule" />
          </div>
        </div>
      </section>

      <div className="px-5 space-y-5 flex-1">
        {/* Mode Switcher */}
        <div className="p-1 rounded-full bg-[#EFE9DE] border border-brand-warm-stone/70 grid grid-cols-3">
          {[
            { id: 'ai', label: 'From AI' },
            { id: 'voice', label: 'Speak' },
            { id: 'quick', label: '30s Setup' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id as typeof mode)}
              className={`py-2 rounded-full text-xs transition-all cursor-pointer ${
                mode === tab.id
                  ? 'bg-brand-deep-green text-brand-ivory font-semibold shadow-xs'
                  : 'text-brand-ink/70 font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'ai' && (
          <div className="space-y-4">
            {/* Step 1: Copy Prompt for ChatGPT / Gemini / Claude */}
            <div className="editorial-surface rounded-[22px] p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta">
                  Step 1 · Copy Prompt to Your AI
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'chatgpt' as const, label: 'ChatGPT', Icon: OpenAIIcon },
                  { id: 'gemini' as const, label: 'Gemini', Icon: GeminiIcon },
                  { id: 'claude' as const, label: 'Claude', Icon: ClaudeIcon },
                ].map((p) => {
                  const active = provider === p.id;
                  const PIcon = p.Icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProvider(p.id)}
                      className={`py-2.5 px-2 rounded-2xl border flex items-center justify-center gap-1.5 text-xs transition-all cursor-pointer ${
                        active
                          ? 'bg-[#F2ECE1] border-brand-deep-green font-semibold text-brand-ink'
                          : 'bg-brand-ivory/60 border-brand-warm-stone/70 text-brand-ink-light'
                      }`}
                    >
                      <PIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-[#F2ECE1] p-3 border border-brand-warm-stone/70 space-y-2.5">
                <p className="text-[11.5px] text-brand-ink/85 leading-relaxed line-clamp-3 font-serif">
                  “{EXTRACTION_PROMPT}”
                </p>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="w-full py-2 px-3.5 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-brand-deep-green-dark transition-colors cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <IconCheck size={14} />
                      <span>Prompt Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy size={14} accent="#F7F3EC" />
                      <span>
                        Copy Prompt for{' '}
                        {provider === 'chatgpt'
                          ? 'ChatGPT'
                          : provider === 'gemini'
                          ? 'Gemini'
                          : 'Claude'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2: Paste AI Response */}
            <div className="editorial-surface rounded-[22px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta">
                  Step 2 · Paste Response Below
                </span>
                <button
                  type="button"
                  onClick={() => setRawInput(SAMPLE_CULTURAL_DOSSIER)}
                  className="text-[11px] font-semibold text-brand-deep-green hover:text-brand-terracotta underline cursor-pointer"
                >
                  Try sample portrait
                </button>
              </div>

              <textarea
                rows={7}
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                onPaste={handlePasteInterceptor}
                placeholder="Paste your AI’s portrait of your tastes, weekly pace, and boundaries here…"
                className="w-full rounded-2xl bg-brand-ivory border border-brand-warm-stone/85 p-3.5 text-xs text-brand-ink leading-relaxed placeholder:text-brand-ink-light/65 focus:outline-none focus:border-brand-deep-green resize-y"
              />
            </div>
          </div>
        )}

        {mode === 'voice' && (
          <div className="editorial-surface rounded-[24px] p-6 text-center space-y-4">
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                isRecording
                  ? 'bg-brand-terracotta text-brand-ivory scale-105 animate-pulse'
                  : 'bg-brand-deep-green text-brand-ivory hover:bg-brand-deep-green-dark'
              }`}
            >
              <IconMicrophone size={24} accent="#F7F3EC" />
            </button>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-medium text-brand-ink">
                {isRecording ? 'Listening carefully…' : 'Tap and speak freely'}
              </h3>
              <p className="text-xs text-brand-ink-light max-w-[260px] mx-auto leading-relaxed">
                Tell Undernote what a genuinely restorative Friday night or Sunday morning looks like for you.
              </p>
            </div>
            <textarea
              rows={5}
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Your spoken words appear here—you can also type or edit directly…"
              className="w-full rounded-2xl bg-brand-ivory border border-brand-warm-stone/85 p-3.5 text-xs text-brand-ink leading-relaxed focus:outline-none focus:border-brand-deep-green text-left"
            />
          </div>
        )}

        {mode === 'quick' && (
          <div className="editorial-surface rounded-[24px] p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                1 · Your Home City
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'india-blr' as const, label: 'Bangalore' },
                  { id: 'singapore-sin' as const, label: 'Singapore' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setQuickCity(c.id)}
                    className={`py-2.5 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      quickCity === c.id
                        ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green'
                        : 'bg-brand-ivory text-brand-ink border-brand-warm-stone'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                2 · Gatherings You Make Time For
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Intimate acoustic music',
                  'Contemporary theatre',
                  'Bookstore salons & talks',
                  'Morning walks',
                  'Clay & print workshops',
                  'Twilight galleries',
                  'Small-table vegetarian suppers',
                  'Documentary cinema',
                ].map((item) => {
                  const selected = quickFormats.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFormatChoice(item)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-all cursor-pointer ${
                        selected
                          ? 'bg-brand-terracotta text-brand-ivory border-brand-terracotta font-semibold'
                          : 'bg-brand-ivory text-brand-ink border-brand-warm-stone font-medium'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                3 · Any Quiet Boundary
              </label>
              <input
                type="text"
                value={quickBoundary}
                onChange={(e) => setQuickBoundary(e.target.value)}
                className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-brand-ivory border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          disabled={isIngesting}
          onClick={handleSynthesize}
          className="w-full py-3.5 px-5 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark disabled:opacity-60 text-brand-ivory text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isIngesting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-brand-ivory/30 border-t-brand-ivory animate-spin" />
              <span>Tuning your cultural calendar…</span>
            </>
          ) : (
            <>
              <span>Tune My Undernote</span>
              <IconArrowRight size={15} />
            </>
          )}
        </button>

        {/* Sovereignty Assurance */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-brand-ink-light pt-1">
          <IconShieldPrivacy size={14} className="text-brand-deep-green shrink-0" />
          <span>Stored privately for you · Never sold or used for ads</span>
        </div>
      </div>
    </div>
  );
}

export default function ImportPage() {
  return (
    <AppShell showNav={false}>
      <Suspense fallback={<div className="flex-1 bg-brand-ivory" />}>
        <ImportContent />
      </Suspense>
    </AppShell>
  );
}
