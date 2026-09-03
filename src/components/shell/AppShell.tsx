'use client';

import React from 'react';
import { BottomNav } from './BottomNav';
import { Toast } from '@/components/ui/Toast';

interface AppShellProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children, showNav = true }) => {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center selection:bg-brand-terracotta selection:text-white antialiased">
      {/* Centered Mobile Frame */}
      <div className="w-full max-w-md min-h-screen bg-brand-ivory text-brand-ink flex flex-col relative shadow-2xl overflow-x-hidden border-x border-brand-warm-stone/30">
        <main className={`flex-1 flex flex-col ${showNav ? 'pb-20' : ''}`}>
          {children}
        </main>
        {showNav && <BottomNav />}
        <Toast />
      </div>
    </div>
  );
};
