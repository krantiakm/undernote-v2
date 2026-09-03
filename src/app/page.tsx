'use client';

import React, { useState } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { ImportHook } from '@/components/landing/ImportHook';
import { ForYouSection } from '@/components/landing/ForYouSection';
import { WorksWhileAwaySection } from '@/components/landing/WorksWhileAwaySection';
import { PersonalizationDemo } from '@/components/landing/PersonalizationDemo';
import { TogetherSection } from '@/components/landing/TogetherSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { SovereigntySection } from '@/components/landing/SovereigntySection';
import { FinalCtaSection } from '@/components/landing/FinalCtaSection';
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
    <div className="min-h-screen bg-[#F7F3EC] text-brand-ink selection:bg-brand-terracotta selection:text-white antialiased overflow-x-hidden">
      {/* Navigation Header */}
      <LandingHeader />

      {/* 1. HERO — A world in tune with you */}
      <HeroSection onOpenAiModal={() => handleOpenAiModal('gemini')} />

      {/* 2. IMPORT — You already told AI who you are */}
      <ImportHook onOpenAiModal={() => handleOpenAiModal('gemini')} />

      {/* 3. FOR YOU — Things worth your attention */}
      <ForYouSection />

      {/* 4. FINDS + WATCHES — You don't have to keep checking */}
      <WorksWhileAwaySection />

      {/* 5. DIFFERENT FOR EVERYONE — One world. Different for everyone */}
      <PersonalizationDemo />

      {/* 6. TOGETHER — Find somewhere everyone will actually like */}
      <TogetherSection />

      {/* 7. IT GETS BETTER — 3 clean steps */}
      <HowItWorks />

      {/* 8. YOURS — What knows you should belong to you */}
      <SovereigntySection />

      {/* 9. FINAL CTA — See what the world looks like when it knows you better */}
      <FinalCtaSection onOpenAiModal={() => handleOpenAiModal('gemini')} />

      {/* 10. RICH FOOTER */}
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
