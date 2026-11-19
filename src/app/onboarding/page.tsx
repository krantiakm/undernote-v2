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

// Feature toggle so the Context Mirror step can be switched off cleanly if needed in future tests
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
    <div className="flex-1 flex flex-col bg-brand-ivory min-h-screen">
      {/* Minimal Onboarding Top Bar */}
      <header className="px-5 pt-4 pb-2 flex items-center justify-between">
        <Logo size="sm" variant="dark" clickable={false} />

        {/* Subtle City Pill so Bangalore / Singapore testers can confirm their city */}
        <div className="inline-flex p-0.5 rounded-full bg-[#EFE9DE] border border-brand-warm-stone/80">
          <button
            type="button"
            onClick={() => setGeography('india-blr')}
            className={`px-2.5 py-1 rounded-full text-[10.5px] transition-all cursor-pointer ${
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
            className={`px-2.5 py-1 rounded-full text-[10.5px] transition-all cursor-pointer ${
              geography === 'singapore-sin'
                ? 'bg-brand-deep-green text-brand-ivory font-semibold'
                : 'text-brand-ink-light font-medium'
            }`}
          >
            SGP
          </button>
        </div>
      </header>

      {step === 'swipe' ? (
        <SwipeTasteDeck
          cards={deckCards}
          cityName={cityName}
          onComplete={handleDeckComplete}
          onVoiceSubmit={handleVoiceComplete}
          onSkip={handleSkip}
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
