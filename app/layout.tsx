import type { Metadata } from 'next';
import './globals.css';
import { Bodoni_Moda, Jost } from 'next/font/google';
import { SITE_URL } from '@/lib/site';

// Display serif — headings, book titles, pull quotes, the wordmark.
// Weight 500 is needed at small sizes or Bodoni's hairlines disappear.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// Body / UI sans — body copy, nav, buttons, labels, form fields.
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
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
      className={`${bodoni.variable} ${jost.variable} scroll-smooth overflow-x-hidden`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
