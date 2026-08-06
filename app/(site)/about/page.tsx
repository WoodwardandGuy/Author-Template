import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
    ? urlFor(authorInfo.portrait).width(600).height(750).url()
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema()) }}
      />

      <div className="bg-ink/[0.04] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-16 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-6 tracking-tight">
                About {authorInfo.name}
              </h1>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>{authorInfo.tagline}.</p>
                <p>
                  {/* Replace this placeholder bio in the CMS. Write in the first or third
                      person — whatever suits the brand. */}
                  This is where the author&rsquo;s story goes: how they came to writing,
                  the themes they return to, and what readers can expect from the work.
                  Keep it warm and personal — a few short paragraphs is plenty.
                </p>
                <p>
                  Add a note about background, awards, or life beyond the page. Edit all
                  of this from the Studio; nothing here is hard-coded to the template.
                </p>
              </div>
            </div>

            {portraitUrl && (
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={portraitUrl}
                  alt={authorInfo.portrait?.alt || authorInfo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-ink/[0.03]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4 tracking-tight">
            Stay in touch
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join the mailing list for new releases and events, or send a note directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-brand hover:bg-brand-dark text-white h-12 px-8 text-lg">
              <Link href="/#newsletter">
                Join the mailing list
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 text-lg border-ink text-ink hover:bg-ink hover:text-white"
            >
              <Link href="/#contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
