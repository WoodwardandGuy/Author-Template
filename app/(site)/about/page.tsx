import type { Metadata } from 'next';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity.image';
import { getAuthorInfo } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const authorInfo = await getAuthorInfo();
  return {
    title: 'About',
    description: `About ${authorInfo.name} — ${authorInfo.tagline}.`,
    alternates: { canonical: '/about' },
    openGraph: {
      title: `About ${authorInfo.name}`,
      description: `About ${authorInfo.name} — ${authorInfo.tagline}.`,
      url: `${SITE_URL}/about`,
      type: 'profile',
    },
  };
}

function generateBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  };
}

export default async function AboutPage() {
  const authorInfo = await getAuthorInfo();
  const portraitUrl = authorInfo.portrait?.asset
    ? urlFor(authorInfo.portrait).width(720).height(900).url()
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema()) }}
      />

      <section className="bg-ivory">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-x-20 gap-y-14 px-[clamp(20px,4vw,48px)] pb-24 pt-[88px]">
          {portraitUrl && (
            <div className="relative aspect-[4/5] w-full md:sticky md:top-[120px]">
              <Image
                src={portraitUrl}
                alt={authorInfo.portrait?.alt || authorInfo.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
          )}

          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-brass">About</p>
            <h1 className="mt-4 font-display text-[clamp(38px,6vw,54px)] leading-[1.1] text-ink">
              {authorInfo.name}
            </h1>

            {authorInfo.shortBio && (
              <p className="mt-6 max-w-[560px] font-display text-[23px] italic leading-[1.6] text-ink/78">
                {authorInfo.shortBio}
              </p>
            )}

            <div className="my-9 h-px w-[54px] bg-brass" />

            {authorInfo.longBio && (
              <div className="max-w-[600px] space-y-6 text-[16.5px] leading-[1.95] text-ink/74">
                {authorInfo.longBio
                  .split('\n\n')
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
