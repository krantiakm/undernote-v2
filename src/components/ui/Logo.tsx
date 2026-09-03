'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'green' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  clickable?: boolean;
  type?: 'full' | 'mark' | 'horizontal';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'green',
  size = 'md',
  withTagline = false,
  clickable = true,
  type = 'full',
  className = '',
}) => {
  const getTextColor = () => {
    switch (variant) {
      case 'white':
        return 'text-white';
      case 'light':
        return 'text-brand-ivory';
      case 'dark':
        return 'text-brand-ink';
      case 'green':
      default:
        return 'text-brand-deep-green';
    }
  };

  const getAccentColor = () => {
    switch (variant) {
      case 'white':
        return 'bg-brand-terracotta-light';
      case 'green':
        return 'bg-brand-terracotta';
      default:
        return 'bg-brand-terracotta';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-lg';
      case 'lg':
        return 'text-3xl';
      case 'xl':
        return 'text-4xl';
      case 'md':
      default:
        return 'text-2xl';
    }
  };

  const getMarkSize = () => {
    switch (size) {
      case 'sm':
        return 'w-7 h-7 text-sm';
      case 'lg':
        return 'w-12 h-12 text-xl';
      case 'xl':
        return 'w-14 h-14 text-2xl';
      case 'md':
      default:
        return 'w-9 h-9 text-base';
    }
  };

  const content = (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {type === 'mark' ? (
        <div
          className={`flex flex-col items-center justify-center rounded-2xl bg-brand-deep-green text-brand-ivory font-medium transition-all shadow-sm ${getMarkSize()}`}
        >
          <div className="relative leading-none pb-1 font-semibold">
            u
            <span
              className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full"
            />
          </div>
        </div>
      ) : type === 'horizontal' ? (
        <div className="flex items-center gap-3">
          <div
            className={`flex flex-col items-center justify-center rounded-xl bg-brand-deep-green text-brand-ivory font-medium ${getMarkSize()}`}
          >
            <div className="relative leading-none pb-0.5 font-semibold">
              u
              <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-brand-terracotta rounded-full" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className={`font-sans font-medium tracking-tight ${getTextSize()} ${getTextColor()}`}>
              <span>under</span>
              <span className="relative inline-block">
                n
                <span className="relative">
                  o
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${getAccentColor()}`}
                  />
                </span>
                te
              </span>
            </div>
            {withTagline && (
              <span className="text-[11px] font-sans tracking-wide text-brand-ink-light opacity-90">
                A world in tune with you.
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <div className={`font-sans font-medium tracking-tight ${getTextSize()} ${getTextColor()}`}>
            <span>under</span>
            <span className="relative inline-block">
              n
              <span className="relative">
                o
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${getAccentColor()}`}
                />
              </span>
              te
            </span>
          </div>
          {withTagline && (
            <span className="text-[11px] font-sans tracking-wide text-brand-ink-light opacity-90 mt-0.5">
              A world in tune with you.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" className="group focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
