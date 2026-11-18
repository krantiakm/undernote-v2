'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconCompass,
  IconTogether,
  IconRadarWatch,
  IconProfileSeal,
} from '@/components/ui/BrandIcons';
import { useApp } from '@/context/AppContext';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { watches, savedCards, groupCapsules } = useApp();

  const watchingCount =
    savedCards.length + watches.filter((w) => w.status === 'active' && w.triggerMet).length;

  const navItems = [
    {
      label: 'For You',
      href: '/radar',
      Icon: IconCompass,
      isActive: pathname.startsWith('/radar'),
    },
    {
      label: 'Together',
      href: '/capsules',
      Icon: IconTogether,
      isActive: pathname.startsWith('/capsules'),
      badge: groupCapsules.length > 0 ? groupCapsules.length : undefined,
    },
    {
      label: 'Watching',
      href: '/watching',
      Icon: IconRadarWatch,
      isActive: pathname.startsWith('/watching'),
      badge: watchingCount > 0 ? watchingCount : undefined,
    },
    {
      label: 'Me',
      href: '/me',
      Icon: IconProfileSeal,
      isActive: pathname.startsWith('/me') || pathname.startsWith('/import') || pathname.startsWith('/data'),
    },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto bg-[#FAF7F2]/95 backdrop-blur-md border-t border-brand-warm-stone/65 px-3 pt-2 pb-2.5"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const active = item.isActive;
          const Icon = item.Icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3.5 rounded-2xl transition-all duration-200 group ${
                active ? 'text-brand-deep-green' : 'text-brand-ink/55 hover:text-brand-ink'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 1.75 : 1.5}
                  accent={active ? '#C66E45' : '#9DB6A9'}
                  className={`transition-transform duration-200 ${
                    active ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 min-w-[16px] h-[16px] bg-brand-terracotta text-brand-ivory text-[9.5px] font-semibold rounded-full flex items-center justify-center px-1 shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10.5px] mt-1 tracking-[0.01em] ${
                  active ? 'font-semibold text-brand-deep-green' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`h-[2px] rounded-full mt-0.5 transition-all duration-200 ${
                  active ? 'w-3.5 bg-brand-terracotta' : 'w-0 bg-transparent'
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
