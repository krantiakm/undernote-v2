'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Eye, Users, Fingerprint, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { watches, groupCapsules } = useApp();

  const triggeredWatchesCount = watches.filter((w) => w.triggerMet).length;

  const navItems = [
    {
      label: 'Radar',
      href: '/',
      icon: Compass,
      isActive: pathname === '/' || pathname.startsWith('/radar'),
    },
    {
      label: 'Watching',
      href: '/watching',
      icon: Eye,
      isActive: pathname.startsWith('/watching'),
      badge: triggeredWatchesCount > 0 ? triggeredWatchesCount : undefined,
    },
    {
      label: 'Capsules',
      href: '/capsules',
      icon: Users,
      isActive: pathname.startsWith('/capsules'),
      badge: groupCapsules.length > 0 ? groupCapsules.length : undefined,
    },
    {
      label: 'Me',
      href: '/me',
      icon: Fingerprint,
      isActive: pathname.startsWith('/me'),
    },
    {
      label: 'Data',
      href: '/data',
      icon: ShieldCheck,
      isActive: pathname.startsWith('/data'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-brand-ivory/95 backdrop-blur-md border-t border-brand-warm-stone/50 px-3 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 group ${
                active
                  ? 'text-brand-deep-green font-medium'
                  : 'text-brand-ink/60 hover:text-brand-ink'
              }`}
            >
              <div className="relative">
                <Icon
                  size={21}
                  strokeWidth={active ? 2.4 : 1.75}
                  className={`transition-transform duration-200 ${
                    active ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] bg-brand-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${active ? 'font-semibold text-brand-deep-green' : ''}`}>
                {item.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
