'use client';

import React, { useState } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { PersonalizationDemo } from '@/components/landing/PersonalizationDemo';
import { ImportHook } from '@/components/landing/ImportHook';
import { ForYouSection } from '@/components/landing/ForYouSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { TogetherSection } from '@/components/landing/TogetherSection';
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
      {/* 1. Header */}
      <LandingHeader />

      {/* 2. Hero: A world in tune with you */}
      <HeroSection />

      {/* 3. Personalization Demo: The same world. A much better fit */}
      <PersonalizationDemo />

      {/* 4. Import Hook: You already told AI who you are */}
      <ImportHook onOpenAiModal={handleOpenAiModal} />

      {/* 5. For You Stream: Things worth your attention */}
      <ForYouSection />

      {/* 6. How It Works: It gets better without becoming work */}
      <HowItWorks />

      {/* 7. Together: Find somewhere everyone will actually like */}
      <TogetherSection />

      {/* 8. Ownership & Privacy: What knows you should belong to you */}
      <SovereigntySection />

      {/* 9. Final CTA: See what the world looks like when it knows you better */}
      <FinalCtaSection />

      {/* 10. Footer */}
      <LandingFooter />

      {/* AI Extraction Prompt Studio Modal */}
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
