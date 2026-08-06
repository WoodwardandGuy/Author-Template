import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { urlFor } from '@/lib/sanity.image';
import { getBookBySlug, getBookSlugs, getAuthorInfo } from '@/lib/sanity.fetch';
import { generateBookSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

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

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [book, authorInfo] = await Promise.all([
    getBookBySlug(slug),
    getAuthorInfo(),
  ]);

  if (!book) notFound();

  const coverUrl = book.cover?.asset
    ? urlFor(book.cover).width(800).height(1200).url()
    : null;
  const retailers = book.retailers || [];

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

      <div className="bg-ink/[0.04] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/books">Books</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{book.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 lg:gap-14">
            <div>
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl bg-gray-100 md:sticky md:top-24">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={book.cover?.alt || book.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 px-4 text-center">
                    {book.title}
                  </div>
                )}
              </div>
            </div>

            <div>
              {book.editionNote && (
                <span className="inline-block bg-brand/10 text-brand text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                  {book.editionNote}
                </span>
              )}
              {book.series && (
                <p className="text-sm font-semibold uppercase tracking-wide text-brand mb-2">
                  {book.series}
                  {book.seriesOrder ? ` · Book ${book.seriesOrder}` : ''}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-dark tracking-tight mb-2">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="text-xl text-gray-500 mb-4">{book.subtitle}</p>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-6">
                {book.genre && <span>{book.genre}</span>}
                {book.publicationDate && (
                  <span>
                    {new Date(book.publicationDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                )}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
                {book.description}
              </p>

              {retailers.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-10">
                  {retailers.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                      {r.label || r.store}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}

              {book.longDescription && (
                <div className="prose prose-lg max-w-none">
                  {book.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link href="/books" className="text-ink font-medium hover:text-brand transition-colors">
                  ← All books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
