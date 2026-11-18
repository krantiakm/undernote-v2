'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';
import {
  IconArrowLeft,
  IconDownload,
  IconReset,
  IconSearch,
  IconShieldPrivacy,
  IconTrash,
} from '@/components/ui/BrandIcons';

export default function DataPage() {
  const { contextItems, deleteContextItem, resetToBaseline, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRawJson, setShowRawJson] = useState(false);

  const filteredItems = contextItems.filter(
    (item) =>
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(contextItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `undernote_profile_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Profile JSON exported');
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory pb-10">
        <header className="sticky top-0 z-30 bg-brand-ivory/92 backdrop-blur-md border-b border-brand-warm-stone/55 px-5 py-3.5 flex items-center justify-between">
          <Link
            href="/me"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:text-brand-deep-green transition-colors"
          >
            <IconArrowLeft size={16} />
            <span>Back to Me</span>
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta">
            Data Ownership
          </span>
        </header>

        <div className="px-5 pt-5 space-y-5">
          <div className="space-y-2">
            <h1 className="font-serif text-[23px] leading-[1.2] font-medium text-brand-ink">
              What knows you belongs to you.
            </h1>
            <p className="text-[13px] text-brand-ink-light leading-relaxed">
              Inspect, search, export, or clear every preference Undernote holds for your cultural calendar.
            </p>
            <span className="brand-rule" />
          </div>

          {/* Privacy Guarantee Card */}
          <div className="rounded-[22px] bg-[#F2ECE1] border border-brand-warm-stone/85 p-4 flex items-start gap-3">
            <IconShieldPrivacy size={18} className="text-brand-deep-green shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-brand-ink">
                Private on your device by default
              </p>
              <p className="text-[11.5px] text-brand-ink-light leading-relaxed">
                Undernote never sells profile data, runs ad auctions, or accepts paid event placements.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <IconSearch
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink-light"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your saved preferences…"
              className="w-full text-xs py-2.5 pl-9 pr-3.5 rounded-full bg-[#FCFBF8] border border-brand-warm-stone/85 text-brand-ink focus:outline-none focus:border-brand-deep-green"
            />
          </div>

          {/* Preferences Ledger */}
          <div className="space-y-2.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="editorial-surface rounded-[20px] p-4 flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-ink">{item.key}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFE9DE] text-brand-ink-light">
                      {item.provenance.provider}
                    </span>
                  </div>
                  <p className="text-xs text-brand-ink/80 leading-relaxed">{item.value}</p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteContextItem(item.id)}
                  aria-label="Delete item"
                  className="p-1 text-brand-ink-light hover:text-brand-terracotta cursor-pointer shrink-0"
                >
                  <IconTrash size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Export & Reset */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleExportJson}
                className="py-2.5 px-4 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <IconDownload size={15} accent="#F7F3EC" />
                <span>Export JSON</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRawJson(!showRawJson)}
                className="py-2.5 px-4 rounded-full bg-[#FCFBF8] border border-brand-warm-stone text-xs font-semibold text-brand-ink cursor-pointer"
              >
                {showRawJson ? 'Hide JSON' : 'Inspect JSON'}
              </button>
            </div>

            {showRawJson && (
              <div className="rounded-2xl bg-brand-ink text-brand-ivory p-4 text-[10.5px] font-mono overflow-x-auto max-h-64">
                <pre>{JSON.stringify(contextItems, null, 2)}</pre>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Restore baseline preferences and sample events?')) {
                  resetToBaseline();
                }
              }}
              className="w-full py-2.5 px-4 rounded-full border border-brand-warm-stone text-xs font-medium text-brand-ink-light hover:text-brand-terracotta flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <IconReset size={14} />
              <span>Restore Baseline Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
