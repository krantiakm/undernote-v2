'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Sparkles,
  Target,
  CheckCircle2,
  Mic,
  Send,
  ShieldCheck,
  TrendingDown,
  Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/shell/AppShell';

interface DeepDivePageProps {
  params: Promise<{ id: string }>;
}

export default function DeepDivePage({ params }: DeepDivePageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const cardId = resolvedParams.id;

  const { cards, saveCard, refineContextForCard, showToast } = useApp();
  const card = cards.find((c) => c.id === cardId) || cards[0];

  const [activeTab, setActiveTab] = useState<'details' | 'why' | 'alternatives'>('details');
  const [refinementInput, setRefinementInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);

  if (!card) {
    return (
      <AppShell>
        <div className="p-8 text-center">
          <p className="text-sm text-brand-ink-light">Opportunity not found.</p>
          <Link href="/" className="text-xs text-brand-deep-green font-semibold mt-2 inline-block">
            ← Return to Radar
          </Link>
        </div>
      </AppShell>
    );
  }

  const isSaved = card.status === 'saved';
  const isTracked = card.originType === 'requested';
  const priceEvidence = card.sourceEvidence?.[0];

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementInput.trim()) return;
    refineContextForCard(card.id, refinementInput);
    setRefinementInput('');
  };

  const handleVoiceRefine = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setRefinementInput('Prefer morning harvest deliveries with roasted date within 5 days.');
        setIsRecording(false);
        showToast('Voice transcribed');
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedbackGiven(type);
    showToast(type === 'up' ? 'Feedback saved: Reinforcing this pattern' : 'Feedback saved: Deprioritizing similar finds');
  };

  return (
    <AppShell showNav={false}>
      <div className="min-h-screen bg-brand-ivory flex flex-col pb-24">
        {/* 1. HERO BANNER: Full-Bleed Photo + Floating Back/Save Header */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-brand-warm-stone/30">
          <Image
            src={card.heroImage}
            alt={card.imageAlt || card.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Floating Navigation Controls */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              aria-label="Back to Radar"
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                aria-label="Share Opportunity"
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={() => saveCard(card.id)}
                aria-label="Save to Capsule"
                className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 ${
                  isSaved
                    ? 'bg-brand-terracotta text-white'
                    : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
              >
                <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Title & Origin Badge on Hero Bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
            <div className="flex items-center gap-2">
              {isTracked ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-700/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs">
                  <Target size={10} />
                  <span>Tracked Alert</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-brand-terracotta/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs">
                  <Sparkles size={10} />
                  <span>Proactive Discovery</span>
                </span>
              )}
              {card.subtitle && (
                <span className="text-[11px] text-white/80 font-medium line-clamp-1">
                  {card.subtitle}
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
              {card.title}
            </h1>
          </div>
        </div>

        {/* 2. PROMINENT TOP ACTION BAR (Immediate Execution) */}
        <div className="bg-white px-4 py-3.5 border-b border-brand-warm-stone/50 shadow-xs flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-xl font-bold text-brand-deep-green">
                {priceEvidence?.price || 'Direct Access'}
              </span>
              {priceEvidence?.baselinePrice && (
                <span className="text-xs text-brand-ink-light line-through">
                  {priceEvidence.baselinePrice}
                </span>
              )}
            </div>
            {priceEvidence?.discountPercent ? (
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <TrendingDown size={12} />
                <span>{priceEvidence.discountPercent}% verified discount</span>
              </span>
            ) : (
              <span className="text-[11px] text-brand-ink-light">
                Verified live inventory
              </span>
            )}
          </div>

          <a
            href={card.deepDive.directActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-deep-green hover:bg-brand-deep-green-dark text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <span>{card.deepDive.directActionLabel}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* 3. RE-ARCHITECTED 3-WAY TABS */}
        <div className="flex border-b border-brand-warm-stone/40 bg-brand-ivory px-4 pt-3 gap-2 sticky top-0 z-10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2.5 text-xs font-semibold tracking-tight border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-brand-deep-green text-brand-deep-green'
                : 'border-transparent text-brand-ink-light hover:text-brand-ink'
            }`}
          >
            <span>🔍 Deep Dive & Details</span>
          </button>

          <button
            onClick={() => setActiveTab('why')}
            className={`pb-2.5 text-xs font-semibold tracking-tight border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'why'
                ? 'border-brand-deep-green text-brand-deep-green'
                : 'border-transparent text-brand-ink-light hover:text-brand-ink'
            }`}
          >
            <span>✨ Why It Fits You</span>
          </button>

          <button
            onClick={() => setActiveTab('alternatives')}
            className={`pb-2.5 text-xs font-semibold tracking-tight border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'alternatives'
                ? 'border-brand-deep-green text-brand-deep-green'
                : 'border-transparent text-brand-ink-light hover:text-brand-ink'
            }`}
          >
            <span>⚖️ Alternatives</span>
          </button>
        </div>

        {/* 4. TAB CONTENTS */}
        <div className="p-4 flex-1 space-y-6">
          {/* TAB 1: DEEP DIVE & DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-5 animate-fade-in">
              {/* Editorial Description */}
              <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-2.5">
                <h3 className="font-serif text-base font-bold text-brand-ink">
                  Editorial Curators’ Dispatch
                </h3>
                <p className="text-xs font-sans text-brand-ink-muted leading-relaxed">
                  {card.deepDive.description}
                </p>
              </div>

              {/* Key Highlights Checklist */}
              <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-3">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-deep-green">
                  Key Highlights & Verification
                </h3>
                <div className="space-y-2.5">
                  {card.deepDive.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-ink leading-snug">
                      <CheckCircle2 size={16} className="text-brand-deep-green shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications & Logistics Table */}
              <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-3">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-deep-green">
                  Specifications & Logistics
                </h3>
                <div className="divide-y divide-brand-warm-stone/30">
                  {card.deepDive.specsOrDetails.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex items-start justify-between text-xs gap-3">
                      <span className="font-medium text-brand-ink-light shrink-0">
                        {spec.label}
                      </span>
                      <span className="font-semibold text-brand-ink text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial & Pricing Breakdown */}
              {card.deepDive.pricingBreakdown && (
                <div className="bg-brand-deep-green/5 rounded-2xl p-4 border border-brand-deep-green/15 text-xs space-y-1">
                  <span className="font-semibold text-brand-deep-green block">
                    Pricing & Commercial Verification:
                  </span>
                  <p className="text-brand-ink-muted">
                    {card.deepDive.pricingBreakdown}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WHY IT FITS YOU */}
          {activeTab === 'why' && (
            <div className="space-y-5 animate-fade-in">
              {/* Origin Attribution Card */}
              <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isTracked ? 'bg-emerald-500' : 'bg-brand-terracotta'
                    }`}
                  />
                  <h3 className="font-serif text-sm font-bold text-brand-ink">
                    {isTracked
                      ? 'Triggered from Active Watch'
                      : 'Proactive Serendipity Match'}
                  </h3>
                </div>
                <p className="text-xs text-brand-ink-muted leading-relaxed">
                  {isTracked
                    ? `This opportunity was surfaced automatically because live market conditions met your active monitoring criteria.`
                    : `This find was computed autonomously from your persistent lifestyle bedrock without you having to search.`}
                </p>
              </div>

              {/* Matched Rules Breakdown */}
              <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-3">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-deep-green flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Matched Context Bedrock Rules</span>
                </h3>

                <div className="space-y-2.5">
                  {card.relevanceReason.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-brand-ivory border border-brand-warm-stone/40 text-xs flex items-center justify-between gap-2"
                    >
                      <span className="font-medium text-brand-ink">{reason}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        100% Match
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refinement Question with Voice Input */}
              <div className="bg-brand-deep-green text-brand-ivory rounded-3xl p-5 shadow-card space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-terracotta-light" />
                  <h3 className="font-serif text-sm font-bold">
                    Calibrate This Preference
                  </h3>
                </div>
                <p className="text-xs text-brand-ivory/85">
                  Want to tune how Undernote surfaces future opportunities in this domain? Add a voice note or rule constraint:
                </p>

                <form onSubmit={handleRefineSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={refinementInput}
                      onChange={(e) => setRefinementInput(e.target.value)}
                      placeholder="e.g. 'Prefer morning harvest releases only'"
                      className="w-full text-xs py-2.5 pl-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                    />
                    <button
                      type="button"
                      onClick={handleVoiceRefine}
                      aria-label="Voice Refine"
                      className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isRecording
                          ? 'bg-brand-terracotta text-white animate-pulse'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Mic size={14} />
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!refinementInput.trim()}
                      className="text-xs font-semibold bg-brand-terracotta hover:bg-brand-terracotta-dark text-white px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-40"
                    >
                      <span>Save Rule</span>
                      <Send size={12} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: ALTERNATIVES & COMPARISONS */}
          {activeTab === 'alternatives' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white rounded-3xl p-4 border border-brand-warm-stone/60 shadow-soft">
                <h3 className="font-serif text-sm font-bold text-brand-ink mb-1">
                  Market Alternatives Matrix
                </h3>
                <p className="text-xs text-brand-ink-light mb-3">
                  How candidate options stack up against your specific constraints.
                </p>

                {card.comparisons && card.comparisons.length > 0 ? (
                  <div className="space-y-3">
                    {card.comparisons.map((alt, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-brand-ivory border border-brand-warm-stone/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-brand-ink">
                            {alt.name}
                          </span>
                          <span className="text-xs font-bold text-brand-deep-green">
                            {alt.price}
                          </span>
                        </div>

                        {/* Match Meter */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-brand-ink-light">
                            <span>Bedrock Fit</span>
                            <span className="font-bold text-brand-ink">{alt.matchScore}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-brand-warm-stone/40 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                alt.matchScore >= 80 ? 'bg-brand-deep-green' : 'bg-amber-500'
                              }`}
                              style={{ width: `${alt.matchScore}%` }}
                            />
                          </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="text-emerald-800 bg-emerald-50/70 p-2 rounded-xl">
                            <strong>Pro:</strong> {alt.pros}
                          </div>
                          <div className="text-rose-800 bg-rose-50/70 p-2 rounded-xl">
                            <strong>Trade-off:</strong> {alt.cons}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-brand-ink-light italic">
                    No conflicting market alternatives found. This option uniquely satisfies your rules.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. FOOTER FEEDBACK BAR */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-brand-ivory/95 backdrop-blur-md border-t border-brand-warm-stone/50 px-4 py-2.5 flex items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleFeedback('up')}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                feedbackGiven === 'up'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-brand-ink-muted border-brand-warm-stone hover:bg-brand-ivory'
              }`}
            >
              <ThumbsUp size={13} />
              <span>Helpful</span>
            </button>

            <button
              onClick={() => handleFeedback('down')}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                feedbackGiven === 'down'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white text-brand-ink-muted border-brand-warm-stone hover:bg-brand-ivory'
              }`}
            >
              <ThumbsDown size={13} />
              <span>Not for Me</span>
            </button>
          </div>

          <a
            href={card.deepDive.directActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold bg-brand-deep-green text-brand-ivory px-4 py-2 rounded-full shadow-xs hover:bg-brand-deep-green-dark transition-colors"
          >
            <span>Proceed ↗</span>
          </a>
        </div>
      </div>
    </AppShell>
  );
}
