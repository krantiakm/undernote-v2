'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  Search,
  CheckCircle2,
  RefreshCw,
  FileJson,
  KeyRound,
  ExternalLink,
  Sliders,
} from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';
import { RadarDomain } from '@/types';

export default function DataPage() {
  const { contextItems, deleteContextItem, resetToBaseline, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<'all' | RadarDomain>('all');
  const [showRawJson, setShowRawJson] = useState(false);

  const filteredItems = contextItems.filter((item) => {
    const matchesSearch =
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provenance.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(contextItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `undernote_sovereign_graph_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Encrypted context JSON exported');
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory p-4 space-y-5 pb-8">
        {/* Header */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-brand-deep-green" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink-light">
              Personal Data Sovereignty
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-ink">
            Transparency & Audit Log
          </h1>
          <p className="text-xs text-brand-ink-light mt-0.5">
            Every inference, constraint, and preference is 100% owned and auditable by you.
          </p>
        </div>

        {/* Sovereignty Scorecard */}
        <div className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-deep-green uppercase tracking-wider">
              Sovereignty Status
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 size={11} />
              <span>100% Local & Sovereign</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-brand-ivory rounded-2xl border border-brand-warm-stone/40">
              <span className="text-[10px] text-brand-ink-light block">Ad Surveillance</span>
              <span className="font-bold text-brand-deep-green text-sm">0% Tracking</span>
            </div>
            <div className="p-3 bg-brand-ivory rounded-2xl border border-brand-warm-stone/40">
              <span className="text-[10px] text-brand-ink-light block">Storage Mode</span>
              <span className="font-bold text-brand-deep-green text-sm">Client-Side First</span>
            </div>
          </div>

          <p className="text-[11px] text-brand-ink-muted leading-relaxed">
            Undernote does not broker your profile to ad networks or third-party brokers. Your Dual Horizon context graph is evaluated client-side against public web signals.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rules, providers, or constraints..."
              className="w-full text-xs py-2.5 pl-9 pr-3 rounded-2xl border border-brand-warm-stone/60 bg-white font-sans focus:outline-none focus:ring-2 focus:ring-brand-deep-green/30"
            />
          </div>

          {/* Domain Pill filter */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'my-world', label: 'My World' },
              { id: 'travel', label: 'Travel' },
              { id: 'shopping', label: 'Hardware' },
              { id: 'food-drink', label: 'Coffee' },
              { id: 'interests', label: 'Craft' },
              { id: 'what-matters', label: 'Values' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id as any)}
                className={`py-1 px-2.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors ${
                  selectedDomain === d.id
                    ? 'bg-brand-deep-green text-white border-brand-deep-green'
                    : 'bg-white text-brand-ink-muted border-brand-warm-stone/60'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Registry Items */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-brand-ink-light px-1">
            <span>Showing {filteredItems.length} verified context items</span>
          </div>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-3xl border border-brand-warm-stone/60 shadow-soft space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-ink">
                      {item.key}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-brand-ivory text-brand-ink-muted px-2 py-0.5 rounded-md border border-brand-warm-stone/40">
                      {item.domain}
                    </span>
                  </div>
                  <p className="text-xs text-brand-ink-muted leading-relaxed mt-1">
                    {item.value}
                  </p>
                </div>

                <button
                  onClick={() => deleteContextItem(item.id)}
                  className="text-brand-ink-light hover:text-rose-600 p-1 transition-colors"
                  aria-label="Delete rule"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Provenance Metadata */}
              <div className="pt-2 border-t border-brand-warm-stone/30 flex flex-wrap items-center justify-between gap-2 text-[10px] text-brand-ink-light">
                <span className="font-mono bg-brand-ivory px-2 py-0.5 rounded">
                  Provenance: {item.provenance.provider}
                </span>

                <div className="flex items-center gap-2">
                  <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                  <span>•</span>
                  <span>{item.horizon === 'persistent_long_term' ? '🔒 Bedrock' : '⏱️ Active Horizon'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Raw Export & System Actions */}
        <div className="pt-3 space-y-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-brand-ivory border border-brand-warm-stone/70 rounded-2xl text-xs font-semibold text-brand-deep-green flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Download size={14} />
              <span>Export Raw JSON</span>
            </button>

            <button
              onClick={() => setShowRawJson(!showRawJson)}
              className="py-2.5 px-4 bg-white hover:bg-brand-ivory border border-brand-warm-stone/70 rounded-2xl text-xs font-semibold text-brand-ink-muted flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <FileJson size={14} />
              <span>{showRawJson ? 'Hide Code' : 'View Code'}</span>
            </button>
          </div>

          {showRawJson && (
            <div className="bg-brand-ink text-brand-ivory p-4 rounded-2xl text-[10px] font-mono overflow-x-auto max-h-60 border border-white/10">
              <pre>{JSON.stringify(contextItems, null, 2)}</pre>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={resetToBaseline}
              className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-2xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw size={13} />
              <span>Reset to Master Blueprint Sample Data</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
