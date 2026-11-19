'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'green' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  clickable?: boolean;
  href?: string;
  type?: 'full' | 'mark' | 'horizontal' | 'emblem';
  className?: string;
}

/**
 * Official Undernote Brand Mark & Geometric Wordmark
 * Matches the Undernote Brand Book (undernote.png & undernotebrand.png):
 * - Lowercase geometric Satoshi lettering with terracotta bar locked strictly beneath the 'o'
 * - Rounded-square 'u' monogram mark with terracotta underline
 * - Minimal dual-bar '=' emblem (Ink/Green top bar + Terracotta bottom bar)
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  withTagline = false,
  clickable = true,
  href = '/',
  type = 'full',
  className = '',
}) => {
  const palette = (() => {
    switch (variant) {
      case 'white':
      case 'light':
        return {
          wordmark: '#F7F3EC',
          accent: '#C66E45',
          tagline: 'rgba(247, 243, 236, 0.76)',
          markBg: '#24483F',
          markFg: '#F7F3EC',
          markBar: '#C66E45',
        };
      case 'green':
        return {
          wordmark: '#17201E',
          accent: '#C66E45',
          tagline: '#61736E',
          markBg: '#24483F',
          markFg: '#F7F3EC',
          markBar: '#C66E45',
        };
      case 'dark':
      default:
        return {
          wordmark: '#17201E',
          accent: '#C66E45',
          tagline: '#61736E',
          markBg: '#24483F',
          markFg: '#F7F3EC',
          markBar: '#C66E45',
        };
    }
  })();

  const dims = (() => {
    switch (size) {
      case 'sm':
        return {
          fontPx: 20,
          barHeight: 2.3,
          barBottom: -4.5,
          markPx: 28,
          taglineClass: 'text-[10px]',
        };
      case 'lg':
        return {
          fontPx: 32,
          barHeight: 3.2,
          barBottom: -6.5,
          markPx: 44,
          taglineClass: 'text-xs',
        };
      case 'xl':
        return {
          fontPx: 40,
          barHeight: 3.8,
          barBottom: -8,
          markPx: 52,
          taglineClass: 'text-sm',
        };
      case 'md':
      default:
        return {
          fontPx: 24,
          barHeight: 2.7,
          barBottom: -5.5,
          markPx: 34,
          taglineClass: 'text-[11px]',
        };
    }
  })();

  const renderMark = (px: number) => (
    <svg
      width={px}
      height={px}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="40" height="40" rx="11" fill={palette.markBg} />
      {/* Clean geometric lowercase 'u' */}
      <path
        d="M14.5 13.5V20.2C14.5 23.4 16.55 25.4 19.75 25.4C22.95 25.4 25.1 23.4 25.1 20.2V13.5"
        stroke={palette.markFg}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.1 19.5V25.2"
        stroke={palette.markFg}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Signature Terracotta underline */}
      <rect x="13.5" y="29" width="13" height="2.4" rx="1.2" fill={palette.markBar} />
    </svg>
  );

  const renderEmblem = (px: number) => (
    <svg
      width={px}
      height={px}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="6" y="11" width="20" height="2.8" rx="1.4" fill={palette.wordmark} />
      <rect x="6" y="18.2" width="20" height="2.8" rx="1.4" fill={palette.accent} />
    </svg>
  );

  const renderWordmark = () => (
    <span
      role="img"
      aria-label="undernote"
      className="inline-flex items-baseline font-sans font-medium tracking-[-0.025em] leading-none select-none pb-1.5"
      style={{ color: palette.wordmark, fontSize: `${dims.fontPx}px` }}
    >
      <span>undern</span>
      <span className="relative inline-block">
        <span>o</span>
        {/* Signature Terracotta bar locked strictly beneath the 'o' glyph */}
        <span
          aria-hidden="true"
          className="absolute pointer-events-none rounded-[1px]"
          style={{
            backgroundColor: palette.accent,
            left: '2%',
            right: '2%',
            bottom: `${dims.barBottom}px`,
            height: `${dims.barHeight}px`,
          }}
        />
      </span>
      <span>te</span>
    </span>
  );

  const content = (
    <div className={`inline-flex select-none ${className}`}>
      {type === 'mark' ? (
        renderMark(dims.markPx)
      ) : type === 'emblem' ? (
        renderEmblem(dims.markPx)
      ) : type === 'horizontal' ? (
        <div className="inline-flex items-center gap-2.5">
          {renderMark(dims.markPx)}
          <div className="flex flex-col items-start">
            {renderWordmark()}
            {withTagline && (
              <span
                className={`font-sans tracking-[0.02em] leading-none mt-1 ${dims.taglineClass}`}
                style={{ color: palette.tagline }}
              >
                A world in tune with you.
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          {renderWordmark()}
          {withTagline && (
            <span
              className={`font-sans tracking-[0.02em] leading-none mt-1.5 ${dims.taglineClass}`}
              style={{ color: palette.tagline }}
            >
              A world in tune with you.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none group">
        {content}
      </Link>
    );
  }

  return content;
};
