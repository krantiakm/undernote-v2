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
    <div className="min-h-screen bg-[#E8E1D5] flex justify-center selection:bg-brand-terracotta selection:text-white antialiased">
      {/* Mobile Editorial Viewport */}
      <div className="w-full max-w-[430px] min-h-screen bg-brand-ivory text-brand-ink flex flex-col relative shadow-[0_24px_60px_-15px_rgba(23,32,30,0.16)] overflow-x-hidden border-x border-brand-warm-stone/60">
        <main className={`flex-1 flex flex-col ${showNav ? 'pb-24' : ''}`}>
          {children}
        </main>
        {showNav && <BottomNav />}
        <Toast />
      </div>
    </div>
  );
};
