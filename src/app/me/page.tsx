'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { LivingContextRing } from '@/components/me/LivingContextRing';
import { PortraitBentoGrid } from '@/components/me/PortraitBentoGrid';
import { deriveVisualPortrait } from '@/lib/portraitEngine';
import { useApp } from '@/context/AppContext';
import {
  IconArrowRight,
  IconShare,
  IconShieldPrivacy,
} from '@/components/ui/BrandIcons';

export default function MeVisualPortraitPage() {
  const {
    persona,
    geography,
    setGeography,
    contextItems,
    onboardingStatus,
    hasPersonalized,
    addContextItem,
    updateContextItem,
    showToast,
  } = useApp();

  const portrait = deriveVisualPortrait(
    contextItems,
    persona,
    geography,
    onboardingStatus,
    hasPersonalized
  );

  // Upsert rule by similar topic when user taps interactive ring wedges or Bento dials
  const handleUpsertVisualSignal = (opt: {
    key: string;
    value: string;
    type: 'preference' | 'constraint';
  }) => {
    const relatedMatch = contextItems.find((item) => {
      const a = item.key.toLowerCase();
      const b = opt.key.toLowerCase();
      if (a === b) return true;
      if (
        (a.includes('weeknight') || a.includes('evening')) &&
        (b.includes('weeknight') || b.includes('evening'))
      )
        return true;
      if (
        (a.includes('vegetarian') || a.includes('menus')) &&
        (b.includes('vegetarian') || b.includes('menus'))
      )
        return true;
      if (
        (a.includes('unamplified') || a.includes('social rooms')) &&
        (b.includes('unamplified') || b.includes('social rooms'))
      )
        return true;
      return false;
    });

    if (relatedMatch) {
      updateContextItem(relatedMatch.id, {
        key: opt.key,
        value: opt.value,
        type: opt.type,
        domain: opt.type === 'constraint' ? 'what-matters' : 'events',
      });
    } else {
      addContextItem({
        domain: opt.type === 'constraint' ? 'what-matters' : 'events',
        type: opt.type,
        key: opt.key,
        value: opt.value,
        durability: 'durable',
        horizon: 'persistent_long_term',
        confidence: 1.0,
        status: 'active',
        origin: 'user_edit',
        explicitness: 'explicit',
        sensitivity: 'normal',
        lastConfirmedAt: new Date().toISOString(),
        provenance: { provider: 'Portrait Calibration' },
      });
    }
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        <TopHeader />

        <div className="px-5 pt-4 pb-8 space-y-4 flex-1">
          {/* ================================================================
              1. COMPACT IDENTITY + PLACEHOLDER SHARE + PERSONAL VAULT PILL
             ================================================================ */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta block">
                  Your Mirror · {geography === 'singapore-sin' ? 'Singapore' : 'Bangalore'}
                </span>
                <h1 className="font-serif text-[23px] leading-[1.18] font-medium text-brand-ink truncate">
                  {persona.userName || 'Kranti'}
                </h1>
                <p className="text-xs font-medium text-brand-ink-light mt-0.5 truncate">
                  {portrait.archetypeHeadline}
                </p>
              </div>

              {/* Placeholder Share Portrait Button (for upcoming Share Card) */}
              <button
                type="button"
                onClick={() =>
                  showToast('Shareable Taste Portrait card coming in the next update')
                }
                aria-label="Share Taste Portrait"
                className="w-9 h-9 rounded-full bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-brand-ink flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0 mt-1"
              >
                <IconShare size={15} />
              </button>
            </div>

            {/* Primary Navigation Bar into /me/vault (Storage + Raw Editable Rules) */}
            <Link
              href="/me/vault"
              className="editorial-surface rounded-[18px] px-3.5 py-2.5 flex items-center justify-between gap-2 group hover:border-brand-deep-green/45 transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#E7EFEA] text-brand-deep-green flex items-center justify-center shrink-0">
                  <IconShieldPrivacy size={15} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-brand-ink block leading-tight">
                    Personal Vault · {contextItems.length}{' '}
                    {contextItems.length === 1 ? 'signal' : 'signals'}
                  </span>
                  <span className="text-[10.5px] text-brand-ink-light truncate block">
                    Undernote Cloud Active · Storage, export & raw rules
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-deep-green group-hover:translate-x-0.5 transition-transform shrink-0">
                <span>Open</span>
                <IconArrowRight size={13} />
              </span>
            </Link>
          </div>

          {/* ================================================================
              2. HERO VISUALIZATION: LIVING RADIAL CONTEXT RING
             ================================================================ */}
          <LivingContextRing
            segments={portrait.segments}
            illuminationPercent={portrait.illuminationPercent}
            onUnlockOption={handleUpsertVisualSignal}
          />

          {/* ================================================================
              3. FLUID BENTO MOSAIC: INFOGRAPHIC DIALS + PHOTOGRAPHIC WORLDS
             ================================================================ */}
          <PortraitBentoGrid
            rhythm={portrait.rhythm}
            worlds={portrait.bentoWorlds}
            illuminationPercent={portrait.illuminationPercent}
            geography={geography}
            onSetGeography={setGeography}
            onQuickToggleRule={handleUpsertVisualSignal}
          />
        </div>
      </div>
    </AppShell>
  );
}
