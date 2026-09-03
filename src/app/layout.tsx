import type { Metadata, Viewport } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const satoshi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Undernote — A world in tune with you',
  description:
    'Bring what your AI already knows about you. Undernote uses it to find films, reads, places, trips, products and moments that feel unusually right for you.',
  icons: {
    icon: '/undernote.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#24483F',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshi.variable} ${lora.variable}`}>
      <body className="antialiased bg-[#17201E] text-brand-ink">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
