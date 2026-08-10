import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';
import { getBooks, getSiteContent, getAuthorInfo } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';
import type { Book, Retailer } from '@/lib/types';

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
    // Honor the CMS display order first (so Drowning leads Thriller), then series, then title.
    list.sort(
      (a, b) =>
        (a.order ?? 99) - (b.order ?? 99) ||
        (a.series || '').localeCompare(b.series || '') ||
        (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0) ||
        a.title.localeCompare(b.title),
    );
  });
  return Array.from(groups.entries()).sort(([a]: [string, Book[]], [b]: [string, Book[]]) =>
    a === UNGROUPED ? 1 : b === UNGROUPED ? -1 : 0,
  );
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

export default async function BooksPage() {
  const [books, siteContent, authorInfo] = await Promise.all([
    getBooks(),
    getSiteContent(),
    getAuthorInfo(),
  ]);

  const grouped = groupByGenre(books);
  const bookBub = authorInfo.socials?.bookbub;

  return (
    <section className="bg-ivory">
      {/* Intro */}
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pt-[88px]">
        <h1 className="font-display text-[clamp(40px,7vw,58px)] leading-[1.05] text-ink">
          Books
        </h1>
        {siteContent?.booksSubtext && (
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.85] text-ink/64">
            {siteContent.booksSubtext}
          </p>
        )}
      </div>

      {/* Genre shelves */}
      {books.length > 0 ? (
        grouped.map(([genre, genreBooks]) => (
          <div
            key={genre}
            className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pt-[68px]"
          >
            <div className="mb-10 flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-[0.26em] text-brass">
                {genre}
              </span>
              <span className="h-px flex-1 bg-ink/[0.16]" />
            </div>

            <div className="flex flex-col gap-[52px]">
              {genreBooks.map((book) => {
                const coverUrl = book.cover?.asset
                  ? urlFor(book.cover).width(520).height(780).url()
                  : null;
                const retailers = dedupeRetailers(book.retailers || []);
                const note = book.series
                  ? `${book.series}${book.seriesOrder ? ` · Book ${book.seriesOrder}` : ''}`
                  : book.editionNote;
                return (
                  <div
                    key={book.id}
                    className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-12"
                  >
                    <Link
                      href={`/books/${book.slug}`}
                      className="group relative block aspect-[2/3] max-w-[300px] overflow-hidden bg-warmSand [box-shadow:0_16px_40px_rgba(42,39,51,0.22)]"
                    >
                      {coverUrl && (
                        <Image
                          src={coverUrl}
                          alt={book.cover?.alt || book.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="300px"
                        />
                      )}
                    </Link>

                    <div>
                      <h2 className="font-display text-[36px] leading-[1.15] text-ink">
                        <Link
                          href={`/books/${book.slug}`}
                          className="transition-colors hover:text-brass"
                        >
                          {book.title}
                        </Link>
                      </h2>
                      {note && (
                        <p className="mt-3 text-[12.5px] uppercase tracking-[0.14em] text-ink/50">
                          {note}
                        </p>
                      )}
                      <p className="mt-4 max-w-[540px] whitespace-pre-line text-[16px] leading-[1.9] text-ink/72">
                        {book.description}
                      </p>
                      {retailers.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {retailers.map((r, i) => (
                            <a
                              key={i}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-ink/30 px-[18px] py-3 text-[11.5px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brass hover:text-brass"
                            >
                              {r.label || r.store}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="mx-auto max-w-[1280px] px-12 py-16 text-[16px] text-ink/60">
          No books published yet.
        </p>
      )}

      {/* Footer CTA */}
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-24 pt-[84px]">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-ink/[0.16] px-[44px] py-10">
          <div>
            <p className="font-display text-[28px] leading-tight text-ink">
              Never miss a release
            </p>
            <p className="mt-1 text-[15px] text-ink/60">
              Follow along for cover reveals and pre-orders.
            </p>
          </div>
          {bookBub && (
            <a
              href={bookBub}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-smokyGreen px-[30px] py-4 text-[12px] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ink"
            >
              Follow on BookBub
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
