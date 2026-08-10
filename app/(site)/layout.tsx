import type { Metadata } from 'next';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/lib/sanity.live';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/marketing/GoogleAnalytics';
import { NewsletterPopup } from '@/components/home/NewsletterPopup';
import { generatePersonSchema, generateWebsiteSchema } from '@/lib/schema';
import { getAuthorInfo, getSiteContent } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const authorInfo = await getAuthorInfo();

  return {
    title: {
      default: `${authorInfo.name} | ${authorInfo.tagline}`,
      template: `%s | ${authorInfo.name}`,
    },
    description: authorInfo.tagline,
    authors: [{ name: authorInfo.name }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: authorInfo.name,
      title: `${authorInfo.name} | ${authorInfo.tagline}`,
      description: authorInfo.tagline,
    },
    twitter: {
      card: 'summary_large_image',
      title: authorInfo.name,
      description: authorInfo.tagline,
    },
    // Icons + manifest are declared once in the root app/layout.tsx and
    // inherited here — don't re-declare them or they duplicate.
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
  const [authorInfo, siteContent] = await Promise.all([
    getAuthorInfo(),
    getSiteContent(),
  ]);

  const personSchema = generatePersonSchema(authorInfo);
  const websiteSchema = generateWebsiteSchema(authorInfo);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <GoogleAnalytics />
      <Header authorInfo={authorInfo} />
      <main>{children}</main>
      <Footer authorInfo={authorInfo} siteContent={siteContent} />
      <NewsletterPopup />
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
