'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RingAxisSegment } from '@/lib/portraitEngine';
import { TopographicPattern } from '@/components/ui/TopographicPattern';
import { IconSparkNote } from '@/components/ui/BrandIcons';

interface LivingContextRingProps {
  segments: RingAxisSegment[];
  illuminationPercent: number;
  onUnlockOption: (opt: {
    key: string;
    value: string;
    type: 'preference' | 'constraint';
  }) => void;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeAnnularWedge(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number
): string {
  const p1 = polarToCartesian(cx, cy, outerR, startDeg);
  const p2 = polarToCartesian(cx, cy, outerR, endDeg);
  const p3 = polarToCartesian(cx, cy, innerR, endDeg);
  const p4 = polarToCartesian(cx, cy, innerR, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? '0' : '1';

  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export const LivingContextRing: React.FC<LivingContextRingProps> = ({
  segments,
  illuminationPercent,
  onUnlockOption,
}) => {
  const firstUnlitIdx = segments.findIndex((s) => !s.isLit);
  const [selectedIdx, setSelectedIdx] = useState<number>(
    firstUnlitIdx !== -1 ? firstUnlitIdx : 0
  );

  // Auto-advance selection to next unlit wedge right after user illuminates one!
  useEffect(() => {
    if (segments[selectedIdx]?.isLit && firstUnlitIdx !== -1) {
      const timer = setTimeout(() => setSelectedIdx(firstUnlitIdx), 650);
      return () => clearTimeout(timer);
    }
  }, [segments, selectedIdx, firstUnlitIdx]);

  const activeSeg = segments[selectedIdx] || segments[0];
  const cx = 135;
  const cy = 135;
  const innerR = 39;
  const stepDeg = 360 / segments.length; // 45 deg for 8 axes
  const gapDeg = 5;

  return (
    <section
      className="relative overflow-hidden rounded-[28px] p-5 text-white shadow-card space-y-4"
      style={{
        background: 'linear-gradient(155deg, #21433A 0%, #142923 65%, #10201B 100%)',
      }}
    >
      {/* Subtle Breathing Topographic Background */}
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      >
        <TopographicPattern className="w-full h-full" strokeColor="#9DB6A9" opacity={1} />
      </motion.div>

      <div className="relative z-10 space-y-3">
        {/* Top Row: Signature Title + Illumination Pill */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#9DB6A9]">
            Taste Signature · Tap Any Arc
          </span>
          <Link
            href="/import"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/20 text-[10.5px] font-semibold text-[#FAF7F2] border border-white/15 transition-colors"
          >
            <IconSparkNote size={12} accent="#E68860" />
            <span>Import AI Memory</span>
          </Link>
        </div>

        {/* Interactive Radial Polar SVG */}
        <div className="flex justify-center py-0.5">
          <svg
            width="270"
            height="270"
            viewBox="0 0 270 270"
            className="overflow-visible select-none"
          >
            {/* Ambient Breathing Reference Rings */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={92}
              fill="none"
              stroke="rgba(247, 243, 236, 0.10)"
              strokeWidth="1"
              animate={{ r: [91, 94, 91] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle
              cx={cx}
              cy={cy}
              r={66}
              fill="none"
              stroke="rgba(247, 243, 236, 0.08)"
              strokeDasharray="2 3"
              strokeWidth="1"
            />

            {/* 8 Polar Taste Wedges */}
            {segments.map((seg, i) => {
              const startAngle = i * stepDeg + gapDeg / 2;
              const endAngle = (i + 1) * stepDeg - gapDeg / 2;
              const midAngle = (startAngle + endAngle) / 2;
              const isSelected = i === selectedIdx;

              const outerR = seg.isLit ? 54 + seg.strength * 36 : 74;
              const pathD = describeAnnularWedge(cx, cy, innerR, outerR, startAngle, endAngle);

              const labelPos = polarToCartesian(cx, cy, 111, midAngle);
              const dotPos = polarToCartesian(cx, cy, outerR - 8, midAngle);

              return (
                <g
                  key={seg.id}
                  onClick={() => setSelectedIdx(i)}
                  className="cursor-pointer"
                >
                  <motion.path
                    d={pathD}
                    initial={false}
                    animate={{
                      scale: isSelected ? 1.045 : 1,
                      opacity: seg.isLit ? (isSelected ? 1 : 0.84) : isSelected ? 0.55 : 0.28,
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                    fill={seg.isLit ? seg.accentColor : 'rgba(247, 243, 236, 0.05)'}
                    stroke={
                      isSelected
                        ? '#FAF7F2'
                        : seg.isLit
                        ? 'rgba(255, 255, 255, 0.35)'
                        : 'rgba(247, 243, 236, 0.38)'
                    }
                    strokeWidth={isSelected ? '1.8' : '1.1'}
                    strokeDasharray={seg.isLit ? undefined : '3 3'}
                  />

                  {/* Subtle "+" Pulse on Unlit Wedges */}
                  {!seg.isLit && (
                    <circle
                      cx={dotPos.x}
                      cy={dotPos.y}
                      r={isSelected ? 3.2 : 2.2}
                      fill="#E68860"
                    />
                  )}

                  {/* Perimeter Axis Label */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      isSelected
                        ? '#FFFFFF'
                        : seg.isLit
                        ? 'rgba(247, 243, 236, 0.88)'
                        : 'rgba(247, 243, 236, 0.46)'
                    }
                    fontSize="10"
                    fontWeight={isSelected ? '700' : '600'}
                    letterSpacing="0.03em"
                  >
                    {seg.shortLabel}
                  </text>
                </g>
              );
            })}

            {/* Center Core Monogram & Illumination Percentage */}
            <circle
              cx={cx}
              cy={cy}
              r={34}
              fill="#11221D"
              stroke="rgba(247, 243, 236, 0.22)"
              strokeWidth="1.2"
            />
            <text
              x={cx}
              y={cy - 3}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FAF7F2"
              fontSize="16"
              fontWeight="700"
            >
              {illuminationPercent}%
            </text>
            <text
              x={cx}
              y={cy + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9DB6A9"
              fontSize="7.5"
              fontWeight="700"
              letterSpacing="0.12em"
            >
              LIT
            </text>
          </svg>
        </div>

        {/* Interactive Inspector Drawer for Selected Wedge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeg.id + String(activeSeg.isLit)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{ backgroundColor: 'rgba(10, 18, 15, 0.55)' }}
            className="rounded-2xl border border-white/15 p-3.5 space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: activeSeg.isLit ? activeSeg.accentColor : '#E68860',
                  }}
                />
                <span>{activeSeg.label}</span>
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  activeSeg.isLit
                    ? 'bg-emerald-500/20 text-emerald-200'
                    : 'bg-[#C66E45]/30 text-[#FFD5C2]'
                }`}
              >
                {activeSeg.isLit ? 'Mapped' : 'Unmapped · Tap to light'}
              </span>
            </div>

            {activeSeg.isLit || !activeSeg.unlockPrompt ? (
              <p className="font-serif text-[12px] leading-relaxed" style={{ color: '#E6E0D4' }}>
                {activeSeg.summaryLine}
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-[11.5px]" style={{ color: '#E6E0D4' }}>
                  {activeSeg.unlockPrompt.question}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {activeSeg.unlockPrompt.options.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => onUnlockOption(opt)}
                      className="py-2 px-2.5 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#17201E] text-[11px] font-semibold transition-transform active:scale-95 cursor-pointer truncate"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
