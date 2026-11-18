'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/shell/AppShell';
import { TopHeader } from '@/components/shell/TopHeader';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { useApp } from '@/context/AppContext';
import { BASE_PATH, resolveAssetUrl } from '@/lib/assets';
import {
  IconArrowUpRight,
  IconCheck,
  IconClose,
  IconCopy,
  IconPlus,
  IconShieldPrivacy,
  IconTogether,
} from '@/components/ui/BrandIcons';

export default function TogetherPage() {
  const {
    groupCapsules,
    createGroupCapsule,
    joinGroupCapsule,
    geography,
    persona,
    cards,
    showToast,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'evening' | 'weekend'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // Create Plan Form
  const [planTitle, setPlanTitle] = useState('');
  const [planType, setPlanType] = useState<'evening' | 'weekend'>('evening');
  const [whenLabel, setWhenLabel] = useState('This Friday Evening');
  const [companionName, setCompanionName] = useState('');
  const [sharedNote, setSharedNote] = useState('Quiet acoustic or seated room · Vegetarian friendly');

  // Join Plan Form
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [guestNameInput, setGuestNameInput] = useState('');
  const [guestTasteInput, setGuestTasteInput] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cityName = geography === 'singapore-sin' ? 'Singapore' : 'Bangalore';

  const visiblePlans = groupCapsules.filter((plan) => {
    if (plan.geography && plan.geography !== geography) return false;
    if (filterType === 'all') return true;
    if (filterType === 'evening') return plan.type === 'evening' || plan.type === 'dining';
    return plan.type === 'weekend' || plan.type === 'family' || plan.type === 'trip';
  });

  const handleCopyInvite = (code: string, id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://undernote.co';
    navigator.clipboard.writeText(`${origin}${BASE_PATH}/capsules?invite=${code}`);
    setCopiedId(id);
    showToast('Invite link copied to share');
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planTitle.trim()) return;

    const userInitial = (persona.monogram || persona.userName || 'K').charAt(0).toUpperCase();
    const members = [
      {
        userId: 'user-host',
        name: persona.userName || 'Kranti',
        avatar: userInitial,
        isPcpUser: true,
        contributedRuleIds: [],
        tasteSummary: sharedNote,
        status: 'joined' as const,
      },
    ];

    if (companionName.trim()) {
      members.push({
        userId: `guest-${Date.now()}`,
        name: companionName.trim(),
        avatar: companionName.trim().charAt(0).toUpperCase(),
        isPcpUser: false,
        contributedRuleIds: [],
        tasteSummary: 'Invited to weigh in on picks',
        status: 'joined' as const,
      });
    }

    const matchedPicks = cards
      .filter((c) => c.status !== 'dismissed')
      .filter((c) =>
        planType === 'weekend'
          ? c.eventMeta?.timeWindow === 'weekend' || c.eventMeta?.category === 'walks'
          : c.eventMeta?.timeWindow !== 'upcoming'
      )
      .slice(0, 2);

    createGroupCapsule({
      type: planType,
      geography,
      whenLabel,
      title: planTitle.trim(),
      hostUserId: 'user-host',
      scopedDomains: ['events'],
      members,
      overlapHighlights: [
        sharedNote,
        `Scoped to ${cityName} gatherings that fit everyone’s schedule`,
      ],
      fusedOpportunities: matchedPicks.length > 0 ? matchedPicks : cards.slice(0, 2),
      expiresAt: new Date(Date.now() + 10 * 86400000).toISOString(),
    });

    setPlanTitle('');
    setCompanionName('');
    setIsCreateOpen(false);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCodeInput.trim() || !guestNameInput.trim()) return;
    const ok = joinGroupCapsule(inviteCodeInput, guestNameInput, guestTasteInput);
    if (ok) {
      setInviteCodeInput('');
      setGuestNameInput('');
      setGuestTasteInput('');
      setIsJoinOpen(false);
    }
  };

  return (
    <AppShell>
      <div className="flex-1 flex flex-col bg-brand-ivory">
        <TopHeader />

        {/* 1. Editorial Header */}
        <section className="relative px-5 pt-5 pb-4 overflow-hidden">
          <TopographicPattern className="absolute inset-0 w-full h-full" opacity={0.4} />
          <div className="relative z-10 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-brand-terracotta">
              Together · {cityName}
            </p>
            <h1 className="font-serif text-[24px] leading-[1.2] font-medium text-brand-ink">
              Find somewhere everyone will actually enjoy.
            </h1>
            <p className="text-[13px] text-brand-ink-light leading-relaxed">
              Each person shares only what matters for this outing—timing, atmosphere, food—so choosing an evening feels effortless.
            </p>
            <div className="pt-0.5">
              <span className="brand-rule" />
            </div>
          </div>
        </section>

        {/* 2. Primary Action Row + Filter Pills */}
        <div className="px-5 pb-3 space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <IconPlus size={14} />
              <span>New Outing Plan</span>
            </button>

            <button
              type="button"
              onClick={() => setIsJoinOpen(true)}
              className="py-2.5 px-4 rounded-full bg-[#FCFBF8] hover:bg-[#EFE9DE] border border-brand-warm-stone/85 text-xs font-semibold text-brand-ink transition-colors cursor-pointer"
            >
              Join Code
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Plans' },
              { id: 'evening', label: 'Evenings' },
              { id: 'weekend', label: 'Weekend Mornings' },
            ].map((tab) => {
              const active = filterType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id as typeof filterType)}
                  className={`px-3.5 py-1.5 rounded-full text-[11.5px] transition-all cursor-pointer border ${
                    active
                      ? 'bg-brand-terracotta text-brand-ivory border-brand-terracotta font-semibold'
                      : 'bg-[#FCFBF8] text-brand-ink/75 border-brand-warm-stone/75 font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Shared Outing Cards */}
        <div className="px-5 pb-8 space-y-4 flex-1">
          {visiblePlans.length > 0 ? (
            visiblePlans.map((plan) => (
              <article
                key={plan.id}
                className="editorial-surface rounded-[24px] p-5 space-y-4"
              >
                {/* Top Meta + Invite Code */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-terracotta block">
                      {plan.whenLabel || 'Upcoming Outing'}
                    </span>
                    <h2 className="font-sans text-[18px] font-semibold text-brand-ink leading-snug">
                      {plan.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyInvite(plan.inviteCode, plan.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE9DE] hover:bg-brand-warm-stone/70 text-[11px] font-semibold text-brand-deep-green transition-colors shrink-0 cursor-pointer"
                    title="Copy invite link"
                  >
                    {copiedId === plan.id ? (
                      <>
                        <IconCheck size={13} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <IconCopy size={13} />
                        <span>{plan.inviteCode}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* People & Individual Context */}
                <div className="space-y-2">
                  {plan.members.map((member) => (
                    <div
                      key={member.userId}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-brand-ivory/75 border border-brand-warm-stone/50"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-deep-green text-brand-ivory text-xs font-semibold flex items-center justify-center shrink-0">
                        {member.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-brand-ink leading-tight">
                          {member.name}
                        </p>
                        {member.tasteSummary && (
                          <p className="text-[11px] text-brand-ink-light truncate mt-0.5">
                            {member.tasteSummary}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plain-Language Shared Ground */}
                <div className="rounded-[18px] bg-[#F2ECE1] p-3.5 space-y-2 border border-brand-warm-stone/65">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-deep-green block">
                    Shared Ground
                  </span>
                  <ul className="space-y-1.5">
                    {plan.overlapHighlights.map((line, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-brand-ink/85 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta mt-1.5 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Matched Event Picks for This Plan */}
                {plan.fusedOpportunities.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-brand-ink-light block">
                      Strongest Matches for Both of You
                    </span>
                    <div className="space-y-2.5">
                      {plan.fusedOpportunities.map((opp) => (
                        <Link
                          key={opp.id}
                          href={`/radar/${opp.id}`}
                          className="flex items-center gap-3 p-2.5 rounded-[18px] bg-brand-ivory/60 hover:bg-[#EFE9DE]/80 border border-brand-warm-stone/60 transition-colors group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={resolveAssetUrl(opp.heroImage)}
                            alt={opp.title}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#EFE9DE]"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-brand-terracotta block truncate">
                              {opp.eventMeta
                                ? `${opp.eventMeta.dayLabel} · ${opp.eventMeta.priceLabel}`
                                : opp.entityType}
                            </span>
                            <p className="text-xs font-semibold text-brand-ink truncate group-hover:text-brand-deep-green">
                              {opp.title}
                            </p>
                            <p className="text-[11px] text-brand-ink-light truncate">
                              {opp.eventMeta?.venue || opp.subtitle}
                            </p>
                          </div>
                          <IconArrowUpRight
                            size={15}
                            className="text-brand-ink-light group-hover:text-brand-deep-green shrink-0 mr-1"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scoped Privacy Whisper */}
                <div className="pt-2 border-t border-brand-warm-stone/45 flex items-center gap-2 text-[11px] text-brand-ink-light">
                  <IconShieldPrivacy size={14} className="text-brand-deep-green shrink-0" />
                  <span>Only outing preferences are shared—your full profile stays private.</span>
                </div>
              </article>
            ))
          ) : (
            <div className="editorial-surface rounded-[24px] p-8 text-center space-y-3">
              <div className="w-11 h-11 rounded-full bg-[#EFE9DE] flex items-center justify-center mx-auto text-brand-deep-green">
                <IconTogether size={20} />
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-ink">
                No shared outings in this view yet.
              </h3>
              <p className="text-xs text-brand-ink-light max-w-[250px] mx-auto leading-relaxed">
                Start a plan for a Friday evening or weekend morning and share the code with a friend.
              </p>
            </div>
          )}
        </div>

        {/* Create Shared Plan Sheet */}
        <AnimatePresence>
          {isCreateOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setIsCreateOpen(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] p-6 space-y-4 border-t border-brand-warm-stone shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    Start an Outing Plan
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#EFE9DE] flex items-center justify-center text-brand-ink cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>

                <form onSubmit={handleCreatePlan} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'evening', label: 'Evening Out', defaultWhen: 'This Friday Evening' },
                      {
                        id: 'weekend',
                        label: 'Weekend Morning',
                        defaultWhen: 'Saturday Morning',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPlanType(opt.id as 'evening' | 'weekend');
                          setWhenLabel(opt.defaultWhen);
                        }}
                        className={`py-2.5 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          planType === opt.id
                            ? 'bg-brand-deep-green text-brand-ivory border-brand-deep-green'
                            : 'bg-[#FCFBF8] text-brand-ink border-brand-warm-stone'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      What’s the occasion?
                    </label>
                    <input
                      type="text"
                      required
                      value={planTitle}
                      onChange={(e) => setPlanTitle(e.target.value)}
                      placeholder="e.g., Quiet Friday recital & dinner"
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-brand-ink-light">When</label>
                      <input
                        type="text"
                        value={whenLabel}
                        onChange={(e) => setWhenLabel(e.target.value)}
                        className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-brand-ink-light">
                        Going with (optional)
                      </label>
                      <input
                        type="text"
                        value={companionName}
                        onChange={(e) => setCompanionName(e.target.value)}
                        placeholder="e.g., Maya"
                        className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Boundaries for this outing
                    </label>
                    <input
                      type="text"
                      value={sharedNote}
                      onChange={(e) => setSharedNote(e.target.value)}
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Create Plan & Generate Matches
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Join Shared Plan Sheet */}
        <AnimatePresence>
          {isJoinOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setIsJoinOpen(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[430px] bg-brand-ivory rounded-t-[28px] p-6 space-y-4 border-t border-brand-warm-stone shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-medium text-brand-ink">
                    Join an Outing Plan
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsJoinOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#EFE9DE] flex items-center justify-center text-brand-ink cursor-pointer"
                  >
                    <IconClose size={15} />
                  </button>
                </div>

                <form onSubmit={handleJoinSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Invite Code
                    </label>
                    <input
                      type="text"
                      required
                      value={inviteCodeInput}
                      onChange={(e) => setInviteCodeInput(e.target.value)}
                      placeholder="e.g., BLR-74K"
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink uppercase tracking-wider focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestNameInput}
                      onChange={(e) => setGuestNameInput(e.target.value)}
                      placeholder="Your first name"
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-brand-ink-light">
                      Anything that matters for this outing? (optional)
                    </label>
                    <input
                      type="text"
                      value={guestTasteInput}
                      onChange={(e) => setGuestTasteInput(e.target.value)}
                      placeholder="e.g., Prefer seated music, vegetarian food"
                      className="w-full text-xs py-2.5 px-3.5 rounded-2xl bg-[#FCFBF8] border border-brand-warm-stone text-brand-ink focus:outline-none focus:border-brand-deep-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-brand-deep-green hover:bg-brand-deep-green-dark text-brand-ivory text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    Join Outing
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
