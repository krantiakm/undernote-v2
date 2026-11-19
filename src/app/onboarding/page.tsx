'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/shell/AppShell';
import { Logo } from '@/components/ui/Logo';
import { SwipeTasteDeck } from '@/components/onboarding/SwipeTasteDeck';
import { ContextVaultReveal } from '@/components/onboarding/ContextVaultReveal';
import { getSwipeTasteCards } from '@/data/onboardingData';
import { scoreEventsAgainstContext } from '@/lib/contextScoring';
import { useApp } from '@/context/AppContext';

const ENABLE_CONTEXT_MIRROR_STEP = true;

function OnboardingFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = searchParams.get('step') === 'vault' ? 'vault' : 'swipe';

  const {
    geography,
    setGeography,
    cards,
    contextItems,
    applySwipeRulesToVault,
    runIngestionPipeline,
    skipOnboarding,
  } = useApp();

  const [step, setStep] = useState<'swipe' | 'vault'>(initialStep);

  const cityName = geography === 'singapore-sin' ? 'Singapore' : 'Bangalore';
  const deckCards = getSwipeTasteCards(geography);

  const { topMatches } = scoreEventsAgainstContext(cards, contextItems, true);

  const handleDeckComplete = (
    rules: Array<{
      key: string;
      value: string;
      type: 'preference' | 'constraint' | 'goal';
    }>
  ) => {
    applySwipeRulesToVault(rules);
    if (ENABLE_CONTEXT_MIRROR_STEP) {
      setStep('vault');
    } else {
      router.push('/radar');
    }
  };

  const handleVoiceComplete = async (transcript: string) => {
    await runIngestionPipeline({ voiceNote: transcript, source: 'voice' });
    if (ENABLE_CONTEXT_MIRROR_STEP) {
      setStep('vault');
    } else {
      router.push('/radar');
    }
  };

  const handleSkip = () => {
    skipOnboarding();
    router.push('/radar');
  };

  return (
    <div
      className={`w-full flex flex-col bg-brand-ivory ${
        step === 'swipe' ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* Compact Single-Row Top Bar */}
      <header className="px-4 pt-3 pb-1.5 flex items-center justify-between shrink-0">
        <Logo size="sm" variant="dark" clickable={false} />

        <div className="flex items-center gap-2.5">
          {/* City Anchor Pill */}
          <div className="inline-flex p-0.5 rounded-full bg-[#EFE9DE] border border-brand-warm-stone/80">
            <button
              type="button"
              onClick={() => setGeography('india-blr')}
              className={`px-2 py-0.5 rounded-full text-[10px] transition-all cursor-pointer ${
                geography === 'india-blr'
                  ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                  : 'text-brand-ink-light font-medium'
              }`}
            >
              BLR
            </button>
            <button
              type="button"
              onClick={() => setGeography('singapore-sin')}
              className={`px-2 py-0.5 rounded-full text-[10px] transition-all cursor-pointer ${
                geography === 'singapore-sin'
                  ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                  : 'text-brand-ink-light font-medium'
              }`}
            >
              SGP
            </button>
          </div>

          {step === 'swipe' && (
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-medium text-brand-ink-light hover:text-brand-ink transition-colors cursor-pointer"
            >
              Skip →
            </button>
          )}
        </div>
      </header>

      {step === 'swipe' ? (
        <SwipeTasteDeck
          cards={deckCards}
          cityName={cityName}
          onComplete={handleDeckComplete}
          onVoiceSubmit={handleVoiceComplete}
        />
      ) : (
        <ContextVaultReveal
          cityName={cityName}
          matchedCount={topMatches.length}
          onContinueToFeed={() => router.push('/radar')}
        />
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <AppShell showNav={false}>
      <Suspense fallback={<div className="flex-1 bg-brand-ivory" />}>
        <OnboardingFlowContent />
      </Suspense>
    </AppShell>
  );
}
