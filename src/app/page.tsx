'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitPillars } from '@/components/landing/BenefitPillars';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DualHorizonShowcase } from '@/components/landing/DualHorizonShowcase';
import { MultiPlayerSection } from '@/components/landing/MultiPlayerSection';
import { RelevanceManifesto } from '@/components/landing/RelevanceManifesto';
import { SovereigntySection } from '@/components/landing/SovereigntySection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Toast } from '@/components/ui/Toast';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] text-brand-ink selection:bg-brand-terracotta selection:text-white antialiased overflow-x-hidden">
      {/* 1. Sticky Navigation Header with single "Try It Now" */}
      <LandingHeader />

      {/* 2. Editorial Hero with Animated Rotating Underline & Singular CTA */}
      <HeroSection />

      {/* 3. The 4 Focused Pilot Categories (Travel, Books, Events, Hardware) */}
      <BenefitPillars />

      {/* 4. How It Works in 3 Quiet Human Steps */}
      <HowItWorks />

      {/* 5. Horizon Architecture: Longer Duration Persistence vs. Current Interests */}
      <DualHorizonShowcase />

      {/* 6. Multi-Player Shared Horizons with Rich Group Dining Imagery */}
      <MultiPlayerSection />

      {/* 7. Honest Ads vs. Genuine Relevance Comparison */}
      <RelevanceManifesto />

      {/* 8. Data Sovereignty: Your Context, Your Control (With Vault Imagery) */}
      <SovereigntySection />

      {/* 9. Elaborate Luxury Publication Footer */}
      <LandingFooter />

      {/* System Toast Notification */}
      <Toast />
    </div>
  );
}
