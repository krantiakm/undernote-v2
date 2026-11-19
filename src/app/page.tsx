'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function V2EntryGate() {
  const router = useRouter();
  const { isHydrated, onboardingStatus } = useApp();

  useEffect(() => {
    if (!isHydrated) return;
    if (onboardingStatus === 'unseen') {
      router.replace('/onboarding');
    } else {
      router.replace('/radar');
    }
  }, [isHydrated, onboardingStatus, router]);

  return (
    <div className="min-h-screen bg-[#E8E1D5] flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-brand-ivory flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-brand-warm-stone border-t-brand-terracotta animate-spin" />
      </div>
    </div>
  );
}
