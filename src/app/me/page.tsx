'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { PortraitBentoGrid } from '@/components/me/PortraitBentoGrid';
import { deriveVisualPortrait, PortraitBentoItem } from '@/lib/portraitEngine';
import { RadarDomain } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
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
    contextItems,
    onboardingStatus,
    hasPersonalized,
    addContextItem,
    updateContextItem,
    deleteContextItem,
    showToast,
  } = useApp();

  const portrait = deriveVisualPortrait(
    contextItems,
    persona,
    geography,
    onboardingStatus,
    hasPersonalized
  );

  const handleAddFreeformContext = (payload: {
    key: string;
    value: string;
    type: 'preference' | 'constraint';
    domain: RadarDomain;
  }) => {
    addContextItem({
      domain: payload.domain,
      type: payload.type,
      key: payload.key,
      value: payload.value,
      durability: 'durable',
      horizon: 'persistent_long_term',
      confidence: 1.0,
      status: 'active',
      origin: 'user_edit',
      explicitness: 'explicit',
      sensitivity: 'normal',
      lastConfirmedAt: new Date().toISOString(),
      provenance: {
        provider: payload.type === 'constraint' ? 'Hard Boundary' : 'Added on Portrait',
      },
    });
  };

  const handleFlipOrUpdateRule = (
    bento: PortraitBentoItem,
    nextRule: {
      key: string;
      value: string;
      type: 'preference' | 'constraint';
      domain: RadarDomain;
    }
  ) => {
    const firstMatched = bento.matchedRules[0];
    if (firstMatched) {
      updateContextItem(firstMatched.id, {
        key: nextRule.key,
        value: nextRule.value,
        type: nextRule.type,
        domain: nextRule.domain,
      });
    } else {
      handleAddFreeformContext(nextRule);
    }
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        <TopHeader />

        <div className="px-5 pt-4 pb-9 space-y-4 flex-1">
          {/* ================================================================
              1. CLEAN IDENTITY BAR (NAME + SHARE BUTTON ONLY)
             ================================================================ */}
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-serif text-[26px] leading-[1.15] font-medium text-brand-ink truncate">
              {persona.userName || 'Kranti'}
            </h1>

            <button
              type="button"
              onClick={() =>
                showToast('Shareable Taste Portrait card coming in the next update')
              }
              aria-label="Share Taste Portrait"
              className="w-9 h-9 rounded-full bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-brand-ink flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <IconShare size={15} />
            </button>
          </div>

          {/* ================================================================
              2. FILTERABLE LIVING BENTO PORTRAIT
                 (Filter Strip -> Hero #1 Persona -> Bentos -> + Add More)
             ================================================================ */}
          <PortraitBentoGrid
            primaryPersona={portrait.personaMatch.primary}
            bentoItems={portrait.bentoItems}
            activeSlices={portrait.activeSlices}
            unmappedSlices={portrait.unmappedSlices}
            onAddFreeformContext={handleAddFreeformContext}
            onFlipOrUpdateRule={handleFlipOrUpdateRule}
            onDeleteRule={deleteContextItem}
            onShowToast={showToast}
          />

          {/* ================================================================
              3. PROMINENT VISUAL PERSONAL VAULT CARD (LOWER ON PAGE)
             ================================================================ */}
          <div className="pt-2">
            <Link
              href="/me/vault"
              className="block rounded-[26px] overflow-hidden editorial-surface border border-brand-warm-stone/85 shadow-card hover:border-brand-deep-green/50 transition-all group"
            >
              {/* Bespoke Handcrafted Walnut & Brass Vault Visual */}
              <div className="relative h-[146px] w-full bg-[#1C1814] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveAssetUrl('/v2/images/me/me_personal_vault.jpg')}
                  alt="Your Personal Vault"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(16, 22, 20, 0.86) 0%, rgba(16, 22, 20, 0.25) 55%, rgba(16, 22, 20, 0.15) 100%)',
                  }}
                />

                {/* Top-Left Ownership Seal */}
                <div
                  style={{ backgroundColor: 'rgba(16, 23, 21, 0.82)' }}
                  className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-xs text-white"
                >
                  <IconShieldPrivacy size={13} />
                  <span className="text-[10px] font-semibold tracking-wide">
                    Undernote Cloud · Encrypted
                  </span>
                </div>

                {/* Bottom-Left Signal Count Over Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#E68860]">
                    Private Context Archive
                  </span>
                  <span
                    style={{ backgroundColor: 'rgba(36, 72, 63, 0.92)' }}
                    className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-white border border-white/20"
                  >
                    {contextItems.length} {contextItems.length === 1 ? 'signal' : 'signals'}
                  </span>
                </div>
              </div>

              {/* Card Body & Prominent CTA */}
              <div className="p-4 bg-[#FCFBF8] flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <h2 className="font-serif text-[18px] font-medium text-brand-ink leading-snug">
                    Your Personal Vault
                  </h2>
                  <p className="text-xs text-brand-ink-light leading-relaxed">
                    Inspect raw rules, export portable `.json`, or delete anytime.
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-deep-green group-hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shrink-0 shadow-xs transition-colors">
                  <span>Open</span>
                  <IconArrowRight size={13} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
