import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { urlFor } from '@/lib/sanity.image';
import {
  getBookBySlug,
  getBookSlugs,
  getBooks,
  getPraise,
  getAuthorInfo,
} from '@/lib/sanity.fetch';
import { generateBookSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';
import type { Retailer } from '@/lib/types';

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  const title = book.title;
  const description = book.metaDescription || book.description.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/books/${book.slug}`,
      type: 'book',
      ...(book.cover?.asset && {
        images: [
          {
            url: urlFor(book.cover).width(1200).height(1800).url(),
            width: 1200,
            height: 1800,
            alt: book.cover.alt,
          },
        ],
      }),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function generateBreadcrumbSchema(book: { title: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Books', item: `${SITE_URL}/books` },
      {
        '@type': 'ListItem',
        position: 3,
        name: book.title,
        item: `${SITE_URL}/books/${book.slug}`,
      },
    ],
  };
}

function dedupeRetailers(retailers: Retailer[]): Retailer[] {
  const seen = new Set<string>();
  return retailers.filter((r) => {
    const key = (r.label || r.store).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [book, authorInfo, allBooks, praise] = await Promise.all([
    getBookBySlug(slug),
    getAuthorInfo(),
    getBooks(),
    getPraise(),
  ]);

  if (!book) notFound();

  const coverUrl = book.cover?.asset
    ? urlFor(book.cover).width(680).height(1020).url()
    : null;
  const retailers = dedupeRetailers(book.retailers || []);
  const prose = (book.longDescription || book.description).split('\n\n').filter(Boolean);
  const featuredPraise = praise[0];
  const moreBooks = allBooks.filter((b) => b.slug !== book.slug);

  const bookSchema = generateBookSchema(book, authorInfo.name);
  const breadcrumbSchema = generateBreadcrumbSchema(book);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero — aubergine stage. The animated page-turn will mount here later;
          for now the cover is shown statically. */}
      <section className="bg-aubergine text-ivory">
        <div className="mx-auto max-w-[1180px] px-[clamp(24px,4vw,48px)] pb-[clamp(52px,6vw,80px)] pt-[clamp(36px,4.5vw,60px)]">
          {coverUrl && (
            <div className="mx-auto w-full max-w-[300px]">
              <Image
                src={coverUrl}
                alt={book.cover?.alt || book.title}
                width={680}
                height={1020}
                priority
                className="aspect-[2/3] w-full object-cover [box-shadow:0_40px_90px_rgba(0,0,0,0.7)]"
              />
            </div>
          )}

          <div className="mt-[clamp(26px,3.4vw,44px)] text-center">
            <h1 className="mx-auto max-w-[16ch] font-display text-[clamp(34px,5vw,58px)] leading-[1.08]">
              {book.title}
            </h1>
            {book.editionNote && (
              <p className="mt-[14px] text-[12px] uppercase tracking-[0.24em] text-gold">
                {book.editionNote}
              </p>
            )}
            {book.subtitle && (
              <p className="mx-auto mt-4 max-w-[42ch] font-display text-[clamp(19px,2.2vw,26px)] italic leading-[1.5] text-ivory/80">
                {book.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Prose */}
      {prose.length > 0 && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-[760px] px-[clamp(24px,4vw,48px)] py-[clamp(64px,8vw,100px)]">
            {prose.map((p, i) => (
              <p
                key={i}
                className="mb-6 whitespace-pre-line text-[17px] leading-[1.95] text-ink/82"
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Praise band */}
      {featuredPraise && (
        <section className="bg-smokyGreen text-ivory">
          <div className="mx-auto max-w-[900px] px-[clamp(24px,4vw,48px)] py-[clamp(60px,7vw,88px)] text-center">
            <p className="font-display text-[clamp(22px,2.8vw,32px)] italic leading-[1.5]">
              &ldquo;{featuredPraise.quote}&rdquo;
            </p>
            <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-ivory/60">
              {featuredPraise.attribution}
              {featuredPraise.source ? ` · ${featuredPraise.source}` : ''}
            </p>
          </div>
        </section>
      )}

      {/* Get your copy */}
      {retailers.length > 0 && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-[1180px] px-[clamp(24px,4vw,48px)] pb-[clamp(40px,5vw,60px)]">
            <div className="border border-ink/[0.18] px-[clamp(24px,4vw,48px)] py-[clamp(32px,4vw,48px)] text-center">
              <h2 className="font-display text-[clamp(26px,3vw,34px)] leading-tight text-ink">
                Get your copy
              </h2>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {retailers.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-ink/35 px-[26px] py-[15px] text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brass hover:text-brass"
                  >
                    {r.label || r.store}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More from */}
      {moreBooks.length > 0 && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-[1180px] px-[clamp(24px,4vw,48px)] pb-24">
            <h2 className="mb-9 mt-[clamp(24px,4vw,40px)] font-display text-[clamp(28px,3.4vw,40px)] leading-tight text-ink">
              More from {authorInfo.name}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-9">
              {moreBooks.map((b) => {
                const cover = b.cover?.asset
                  ? urlFor(b.cover).width(440).height(660).url()
                  : null;
                return (
                  <Link key={b.id} href={`/books/${b.slug}`} className="group block">
                    <div className="relative aspect-[2/3] overflow-hidden bg-warmSand [box-shadow:0_16px_40px_rgba(42,39,51,0.22)]">
                      {cover && (
                        <Image
                          src={cover}
                          alt={b.cover?.alt || b.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, 260px"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-[24px] leading-[1.2] text-ink transition-colors group-hover:text-brass">
                      {b.title}
                    </h3>
                    {b.genre && (
                      <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-brass">
                        {b.genre}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
