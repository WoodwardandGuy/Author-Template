import type { Metadata } from 'next';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/lib/sanity.live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/marketing/GoogleTagManager';
import { MetaPixel } from '@/components/marketing/MetaPixel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateLocalBusinessSchema } from '@/lib/schema';
import { getCompanyInfo, getSiteContent, getServices, getServiceAreasWithSlugs } from '@/lib/sanity.fetch';

export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await getCompanyInfo();

  return {
    title: `${companyInfo.name} | Professional Tree Services in Harrisburg, PA`,
    description:
      'Expert tree removal, trimming, and emergency services in Harrisburg, PA. Licensed, insured, and available 24/7. Get your free quote today!',
    keywords: [
      'tree service',
      'tree removal',
      'tree trimming',
      'stump grinding',
      'emergency tree service',
      'Harrisburg PA',
      'arborist',
      'tree care',
    ],
    authors: [{ name: companyInfo.name }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.treeprofessionalsofharrisburg.com',
      siteName: companyInfo.name,
      title: `${companyInfo.name} | Professional Tree Services in Harrisburg, PA`,
      description:
        'Expert tree removal, trimming, and emergency services in Harrisburg, PA. Licensed, insured, and available 24/7.',
      images: [
        {
          url: 'https://www.treeprofessionalsofharrisburg.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${companyInfo.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${companyInfo.name} | Professional Tree Services`,
      description:
        'Expert tree removal, trimming, and emergency services in Harrisburg, PA. Available 24/7.',
      images: ['https://www.treeprofessionalsofharrisburg.com/og-image.jpg'],
    },
    icons: {
      icon: [
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', rel: 'shortcut icon' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
      title: 'Tree Professionals of Harrisburg',
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
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyInfo, siteContent, services, serviceAreas] = await Promise.all([
    getCompanyInfo(),
    getSiteContent(),
    getServices(),
    getServiceAreasWithSlugs(),
  ]);
  const schema = generateLocalBusinessSchema(companyInfo, services, serviceAreas);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GoogleTagManager />
      <GoogleTagManagerNoScript />
      <MetaPixel />
      <Header companyInfo={companyInfo} />
      <main>{children}</main>
      <Footer companyInfo={companyInfo} siteContent={siteContent} />
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
