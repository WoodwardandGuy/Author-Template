import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
import { getBooks, getSiteContent, getAuthorInfo } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';
import type { Book } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Browse the complete list of books, novels, and stories.',
  alternates: { canonical: '/books' },
  openGraph: {
    title: 'Books',
    description: 'Browse the complete list of books, novels, and stories.',
    url: `${SITE_URL}/books`,
    type: 'website',
  },
};

const UNGROUPED = 'More Books';

/** Group by genre, then order within a genre by series → series order → title. */
function groupByGenre(books: Book[]): [string, Book[]][] {
  const groups = new Map<string, Book[]>();
  books.forEach((book) => {
    const key = book.genre || UNGROUPED;
    const list = groups.get(key);
    if (list) list.push(book);
    else groups.set(key, [book]);
  });
  groups.forEach((list) => {
    list.sort(
      (a, b) =>
        (a.series || '').localeCompare(b.series || '') ||
        (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0) ||
        a.title.localeCompare(b.title),
    );
  });
  // Keep the incoming genre order (books query is already ordered), ungrouped last.
  return Array.from(groups.entries()).sort(
    ([a]: [string, Book[]], [b]: [string, Book[]]) =>
      a === UNGROUPED ? 1 : b === UNGROUPED ? -1 : 0,
  );
}

function BookCard({ book }: { book: Book }) {
  const coverUrl = book.cover?.asset
    ? urlFor(book.cover).width(600).height(900).url()
    : null;
  return (
    <article className="flex flex-col">
      <Link href={`/books/${book.slug}`} className="group block">
        {/* Covers are ~320×500 flats — cap display width so they don't soften. */}
        <div className="relative aspect-[2/3] w-full max-w-[300px] rounded-lg overflow-hidden shadow-md bg-gray-100">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={book.cover?.alt || book.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="300px"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm px-3 text-center">
              {book.title}
            </div>
          )}
        </div>
      </Link>
      <div className="mt-4 max-w-[300px]">
        {book.series && (
          <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">
            {book.series}
            {book.seriesOrder ? ` · Book ${book.seriesOrder}` : ''}
          </p>
        )}
        <h3 className="text-lg font-bold text-ink-dark">
          <Link href={`/books/${book.slug}`} className="hover:text-ink transition-colors">
            {book.title}
          </Link>
        </h3>
        {book.subtitle && <p className="text-sm text-gray-500">{book.subtitle}</p>}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mt-2">
          {book.description}
        </p>
      </div>
    </article>
  );
}

export default async function BooksPage() {
  const [books, siteContent, authorInfo] = await Promise.all([
    getBooks(),
    getSiteContent(),
    getAuthorInfo(),
  ]);

  const grouped = groupByGenre(books);
  const bookBub = authorInfo.socials?.bookbub;

  return (
    <>
      <div className="bg-ink/[0.04] py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Books</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 tracking-tight">
                {siteContent?.booksHeadline || 'Books'}
              </h1>
              {siteContent?.booksSubtext && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {siteContent.booksSubtext}
                </p>
              )}
            </div>
            {bookBub && (
              <a
                href={bookBub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium px-5 py-2.5 rounded-lg transition-colors shrink-0"
              >
                Follow on BookBub
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {books.length > 0 ? (
            <div className="space-y-16">
              {grouped.map(([genre, genreBooks]) => (
                <div key={genre}>
                  <h2 className="text-2xl font-bold text-ink-dark mb-8 pb-3 border-b border-gray-200">
                    {genre}
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {genreBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg py-12">No books published yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
