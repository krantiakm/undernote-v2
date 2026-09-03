'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Plus,
  Share2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Utensils,
  Plane,
  Gift,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';
import { useApp } from '@/context/AppContext';
import { GroupCapsuleData, RadarDomain } from '@/types';

export default function CapsulesPage() {
  const {
    groupCapsules,
    createGroupCapsule,
    joinGroupCapsule,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'trip' | 'dining' | 'gifting'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Create form state
  const [capsuleTitle, setCapsuleTitle] = useState('');
  const [capsuleType, setCapsuleType] = useState<'trip' | 'dining' | 'gifting'>('trip');
  const [selectedDomains, setSelectedDomains] = useState<RadarDomain[]>(['travel', 'food-drink']);

  // Join form state
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [joinNameInput, setJoinNameInput] = useState('Kranti');

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const filteredCapsules =
    activeTab === 'all'
      ? groupCapsules
      : groupCapsules.filter((c) => c.type === activeTab);

  const handleCopyInviteLink = (code: string) => {
    const link = `https://undernote.ai/fuse/${code}`;
    navigator.clipboard.writeText(link);
    setCopiedCodeId(code);
    showToast('Invite link copied! Share via WhatsApp or iMessage');
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capsuleTitle.trim()) return;

    createGroupCapsule({
      type: capsuleType,
      title: capsuleTitle.trim(),
      hostUserId: 'user-kranti',
      scopedDomains: selectedDomains,
      members: [
        {
          userId: 'user-kranti',
          name: 'Kranti (Host)',
          avatar: 'K',
          isPcpUser: true,
          contributedRuleIds: ['ctx-1', 'ctx-3'],
          status: 'joined',
        },
      ],
      overlapHighlights: [
        'Scoped privacy active: Only relevant travel/dining rules shared',
        'Automatic constraint overlap solver running',
      ],
      fusedOpportunities: [],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    setCapsuleTitle('');
    setIsCreateModalOpen(false);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) return;

    const success = joinGroupCapsule(inviteCodeInput, joinNameInput || 'Friend');
    if (success) {
      setInviteCodeInput('');
      setIsJoinModalOpen(false);
    }
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory p-4 space-y-5 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-ink-light">
                Multi-Player Intelligence
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-ink">
              Group Capsules & Fusion
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="text-xs font-semibold bg-white text-brand-deep-green border border-brand-warm-stone/80 px-3 py-2 rounded-full shadow-xs hover:bg-brand-ivory transition-all active:scale-95"
            >
              Join
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold bg-brand-deep-green text-white px-3.5 py-2 rounded-full shadow-xs hover:bg-brand-deep-green-dark transition-all active:scale-95"
            >
              <Plus size={14} />
              <span>Create</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/8] bg-brand-deep-green shadow-soft">
          <Image
            src="/images/hero_group_dining.jpg"
            alt="Group Fusion"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-3.5 left-4 right-4 text-white space-y-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-brand-terracotta text-white px-2 py-0.5 rounded-full">
              <Sparkles size={10} />
              <span>Zero-Compromise Coordination</span>
            </span>
            <h3 className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
              Constraint Overlap Solver
            </h3>
            <p className="text-xs text-white/85 line-clamp-1">
              Fuses non-negotiables across travellers and diners to find the sweet spot.
            </p>
          </div>
        </div>

        {/* Scoped Privacy Callout */}
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-brand-warm-stone/60 text-xs text-brand-ink-muted shadow-soft">
          <ShieldCheck size={16} className="text-brand-deep-green shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>Scoped Context Privacy:</strong> Only the specific domains required (e.g. dietary or flight rules) are shared. Personal finances, health, and private watches are strictly excluded.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex p-1 bg-brand-warm-stone/30 rounded-2xl border border-brand-warm-stone/50 gap-1">
          {[
            { id: 'all', label: 'All', icon: Sparkles },
            { id: 'trip', label: 'Group Trips', icon: Plane },
            { id: 'dining', label: 'Dining', icon: Utensils },
            { id: 'gifting', label: 'Wishlists', icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-xl flex items-center justify-center gap-1 transition-all ${
                  isActive
                    ? 'bg-white text-brand-deep-green font-semibold shadow-xs'
                    : 'text-brand-ink-light hover:text-brand-ink'
                }`}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Capsules List */}
        <div className="space-y-4">
          {filteredCapsules.map((capsule) => {
            const isTrip = capsule.type === 'trip';
            const isDining = capsule.type === 'dining';

            return (
              <div
                key={capsule.id}
                className="bg-white rounded-3xl p-5 border border-brand-warm-stone/60 shadow-soft space-y-3.5"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-terracotta flex items-center gap-1">
                      {isTrip ? <Plane size={11} /> : isDining ? <Utensils size={11} /> : <Gift size={11} />}
                      <span>{capsule.type.toUpperCase()} CAPSULE</span>
                    </span>
                    <h3 className="font-serif text-base font-bold text-brand-ink mt-0.5">
                      {capsule.title}
                    </h3>
                  </div>

                  {/* Share Invite Button */}
                  <button
                    onClick={() => handleCopyInviteLink(capsule.inviteCode)}
                    className="flex items-center gap-1 text-[11px] font-medium bg-brand-ivory hover:bg-brand-warm-stone/40 text-brand-deep-green px-2.5 py-1 rounded-full border border-brand-warm-stone/60 transition-colors shadow-xs"
                  >
                    {copiedCodeId === capsule.inviteCode ? (
                      <>
                        <Check size={11} className="text-emerald-600" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={11} />
                        <span>Invite</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Members Avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {capsule.members.map((m, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-bold ring-2 ring-white"
                        title={m.name}
                      >
                        {m.avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-brand-ink-light font-medium">
                    {capsule.members.length} members contributing rules
                  </span>
                </div>

                {/* Overlap Highlights Box */}
                <div className="bg-brand-ivory p-3 rounded-2xl border border-brand-warm-stone/40 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-deep-green block">
                    Constraint Overlap Sweet Spot:
                  </span>
                  <div className="space-y-1">
                    {capsule.overlapHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-brand-ink leading-snug">
                        <CheckCircle2 size={13} className="text-brand-deep-green shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fused Finds Preview */}
                {capsule.fusedOpportunities.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-semibold text-brand-ink-light block">
                      Recommended Matches Satisfying 100% of Rules:
                    </span>
                    {capsule.fusedOpportunities.map((opp) => (
                      <Link
                        key={opp.id}
                        href={`/radar/${opp.id}`}
                        className="flex items-center justify-between p-2.5 rounded-2xl bg-brand-ivory-light hover:bg-white border border-brand-warm-stone/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                            <Image
                              src={opp.heroImage}
                              alt={opp.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-brand-ink group-hover:text-brand-deep-green transition-colors">
                              {opp.title}
                            </h5>
                            <span className="text-[10px] text-brand-ink-light">
                              {opp.subtitle || opp.summary}
                            </span>
                          </div>
                        </div>

                        <ArrowRight size={14} className="text-brand-ink-light group-hover:text-brand-deep-green transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CREATE CAPSULE MODAL */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-brand-ivory rounded-3xl p-5 border border-brand-warm-stone shadow-2xl space-y-4">
              <h3 className="font-serif text-base font-bold text-brand-ink">
                Create Multi-Player Capsule
              </h3>

              <form onSubmit={handleCreateSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    Capsule Type
                  </label>
                  <select
                    value={capsuleType}
                    onChange={(e) => setCapsuleType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                  >
                    <option value="trip">Group Trip / Weekend Away</option>
                    <option value="dining">Group Dining / Night Out</option>
                    <option value="gifting">Gift Wishlist Capsule</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    Capsule Title
                  </label>
                  <input
                    type="text"
                    value={capsuleTitle}
                    onChange={(e) => setCapsuleTitle(e.target.value)}
                    placeholder="e.g. 'Coorg Coffee Harvest Escape'"
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                    required
                  />
                </div>

                <div className="p-3 bg-white/70 rounded-2xl border border-brand-warm-stone/40 text-[11px] text-brand-ink-muted">
                  <ShieldCheck size={14} className="text-brand-deep-green inline mr-1" />
                  Generating an invite link allows friends to fuse their travel or dining rules in 1 tap without revealing private data.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-xs text-brand-ink-light px-3 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs font-semibold bg-brand-deep-green text-white px-4 py-2 rounded-xl shadow-xs hover:bg-brand-deep-green-dark transition-colors"
                  >
                    Create & Generate Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* JOIN MODAL */}
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-brand-ivory rounded-3xl p-5 border border-brand-warm-stone shadow-2xl space-y-4">
              <h3 className="font-serif text-base font-bold text-brand-ink">
                Join Group Capsule
              </h3>

              <form onSubmit={handleJoinSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    Your Display Name
                  </label>
                  <input
                    type="text"
                    value={joinNameInput}
                    onChange={(e) => setJoinNameInput(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink block mb-1">
                    Invite Code or Link Slug
                  </label>
                  <input
                    type="text"
                    value={inviteCodeInput}
                    onChange={(e) => setInviteCodeInput(e.target.value)}
                    placeholder="e.g. 'SL-DEC26-FUSE'"
                    className="w-full text-xs p-2.5 rounded-xl border border-brand-warm-stone/60 bg-white font-mono uppercase"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsJoinModalOpen(false)}
                    className="text-xs text-brand-ink-light px-3 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs font-semibold bg-brand-deep-green text-white px-4 py-2 rounded-xl shadow-xs hover:bg-brand-deep-green-dark transition-colors"
                  >
                    Join Capsule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
