import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity.image';
import type { Book, SiteContent } from '@/lib/types';

interface BooksProps {
  books: Book[];
  content?: Pick<SiteContent, 'booksHeadline' | 'booksSubtext' | 'booksFooterText'> | null;
}

// Display the two genre sections (Erika: NOT a flat cross-genre list).
const GENRE_LABEL: Record<string, string> = { Thriller: 'Thrillers' };

function groupByGenre(books: Book[]): [string, Book[]][] {
  const groups = new Map<string, Book[]>();
  books.forEach((book) => {
    const key = book.genre || 'More Books';
    const list = groups.get(key);
    if (list) list.push(book);
    else groups.set(key, [book]);
  });
  groups.forEach((list) => list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  return Array.from(groups.entries());
}

export function Books({ books, content }: BooksProps) {
  if (books.length === 0) return null;

  const grouped = groupByGenre(books);

  return (
    <section id="books" className="py-20 border-t border-line">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-bone mb-3 tracking-tight">
              {content?.booksHeadline || 'The Books'}
            </h2>
            {content?.booksSubtext && (
              <p className="text-bone-dim text-lg">{content.booksSubtext}</p>
            )}
          </div>

          <div className="space-y-14">
            {grouped.map(([genre, genreBooks]) => (
              <div key={genre}>
                <h3 className="text-xl font-bold text-bone mb-6 pb-2 border-b border-line">
                  {GENRE_LABEL[genre] || genre}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {genreBooks.map((book) => {
              const coverUrl = book.cover?.asset
                ? urlFor(book.cover).width(500).height(750).url()
                : null;

              return (
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="group flex flex-col w-full max-w-[300px] mx-auto"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md bg-soil-2 group-hover:shadow-xl transition-shadow">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={book.cover?.alt || book.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-bone-dim text-sm px-4 text-center">
                        {book.title}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    {book.series && (
                      <p className="text-xs font-semibold uppercase tracking-wide text-moss mb-1">
                        {book.series}
                        {book.seriesOrder ? ` · Book ${book.seriesOrder}` : ''}
                      </p>
                    )}
                    <h3 className="font-semibold text-lg text-bone flex items-center gap-1">
                      {book.title}
                      <ChevronRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-bone-dim text-sm leading-relaxed line-clamp-3 mt-1">
                      {book.description}
                    </p>
                  </div>
                </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>

          {content?.booksFooterText && (
            <p className="text-bone-dim mt-10 text-sm">{content.booksFooterText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
