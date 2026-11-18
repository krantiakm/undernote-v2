import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://undernote.co'),
  title: {
    default: 'Undernote — A world in tune with you',
    template: '%s | Undernote',
  },
  description:
    'Undernote understands you in depth and brings you cultural gatherings, recitals, talks, walks, and intimate events that feel meant for you.',
  applicationName: 'Undernote',
  authors: [{ name: 'Undernote' }],
  creator: 'Undernote',
  publisher: 'Undernote',
  keywords: [
    'Undernote',
    'cultural events',
    'Bangalore events',
    'Singapore events',
    'personal context',
    'curated gatherings',
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
      'Relevant cultural finds, intimate recitals, salons, and gatherings chosen quietly around your life.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Undernote — A world in tune with you',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F7F3EC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..600;1,400..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#E8E1D5] text-brand-ink">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
