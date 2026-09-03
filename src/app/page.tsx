'use client';

import React, { useState } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitPillars } from '@/components/landing/BenefitPillars';
import { RelevanceManifesto } from '@/components/landing/RelevanceManifesto';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DualHorizonShowcase } from '@/components/landing/DualHorizonShowcase';
import { MultiPlayerSection } from '@/components/landing/MultiPlayerSection';
import { SovereigntySection } from '@/components/landing/SovereigntySection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { AiPromptModal } from '@/components/landing/AiPromptModal';
import { Toast } from '@/components/ui/Toast';

export default function LandingPage() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'chatgpt' | 'claude' | 'voice'>('gemini');

  const handleOpenAiModal = (provider: 'gemini' | 'chatgpt' | 'claude' | 'voice' = 'gemini') => {
    setSelectedProvider(provider);
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink selection:bg-brand-terracotta selection:text-white antialiased overflow-x-hidden">
      {/* 1. Sticky Navigation Header */}
      <LandingHeader onOpenAiModal={handleOpenAiModal} />

      {/* 2. Hero Section with Animated Morphing Hook, AI Buttons & Launch App CTAs */}
      <HeroSection onOpenAiModal={handleOpenAiModal} />

      {/* 3. 4 Lifestyle Benefit Pillars (Travel, Coffee, Culture, Hardware) */}
      <BenefitPillars />

      {/* 4. The Relevance Manifesto (The Real Estate Spam vs Perfect Timing Analogy) */}
      <RelevanceManifesto />

      {/* 5. How It Works in 3 Quiet Steps */}
      <HowItWorks onOpenAiModal={handleOpenAiModal} />

      {/* 6. Dual Horizon Architecture (Persistent Bedrock vs Active Focus) */}
      <DualHorizonShowcase />

      {/* 7. Multi-Player Context Fusion (Group Travel, Dining, Gifting) */}
      <MultiPlayerSection />

      {/* 8. 100% Data Sovereignty & Local Privacy */}
      <SovereigntySection />

      {/* 9. Landing Footer & Final Brand Manifesto */}
      <LandingFooter onOpenAiModal={handleOpenAiModal} />

      {/* Interactive AI Extraction Prompt Studio Modal */}
      <AiPromptModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialProvider={selectedProvider}
      />

      {/* System Toast Notification */}
      <Toast />
    </div>
  );
}
