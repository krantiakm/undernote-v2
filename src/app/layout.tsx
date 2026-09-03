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
  metadataBase: new URL('https://undernote.co'),
  title: {
    default: 'Undernote — A world in tune with you',
    template: '%s | Undernote',
  },
  description:
    'Bring what your AI already knows. Undernote turns it into a world that feels better chosen for you.',
  applicationName: 'Undernote',
  authors: [{ name: 'Undernote' }],
  creator: 'Undernote',
  publisher: 'Undernote',
  keywords: [
    'Undernote',
    'personal context',
    'proactive discovery',
    'films',
    'books',
    'places',
    'travel',
    'private AI',
  ],
  alternates: {
    canonical: 'https://undernote.co',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://undernote.co',
    siteName: 'Undernote',
    title: 'Undernote — A world in tune with you',
    description:
      'Bring what your AI already knows. Undernote turns it into a world that feels better chosen for you.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Undernote — A world in tune with you',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undernote — A world in tune with you',
    description:
      'Bring what your AI already knows. Undernote turns it into a world that feels better chosen for you.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
