import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
