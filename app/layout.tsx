import type { Metadata } from 'next';
import './globals.css';
import { Fraunces, Karla } from 'next/font/google';
import { SITE_URL } from '@/lib/site';

// Fraunces for headings (serif), Karla for body (sans) — the prototype's pairing.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});
const karla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-karla',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth overflow-x-hidden ${fraunces.variable} ${karla.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
