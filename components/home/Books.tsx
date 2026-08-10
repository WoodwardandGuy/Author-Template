import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';
import type { Book, SiteContent } from '@/lib/types';

interface BooksProps {
  books: Book[];
  content?: Pick<SiteContent, 'booksHeadline' | 'booksSubtext' | 'booksFooterText'> | null;
}

export function Books({ books, content }: BooksProps) {
  if (books.length === 0) return null;

  return (
    <section id="books" className="bg-ivory">
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] py-[clamp(64px,9vw,96px)]">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(30px,5vw,42px)] leading-tight text-ink">
            {content?.booksHeadline || 'The Books'}
          </h2>
          <Link
            href="/books"
            className="whitespace-nowrap border-b border-brass pb-[5px] text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-brass"
          >
            All titles
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-10">
          {books.map((book) => {
            const coverUrl = book.cover?.asset
              ? urlFor(book.cover).width(520).height(780).url()
              : null;

            return (
              <Link key={book.id} href={`/books/${book.slug}`} className="group block">
                <div className="relative aspect-[2/3] overflow-hidden bg-warmSand [box-shadow:0_16px_40px_rgba(42,39,51,0.22)]">
                  {coverUrl && (
                    <Image
                      src={coverUrl}
                      alt={book.cover?.alt || book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 340px"
                    />
                  )}
                </div>
                <h3 className="mt-5 font-display text-[26px] leading-[1.2] text-ink transition-colors group-hover:text-brass">
                  {book.title}
                </h3>
                <p className="mt-[10px] line-clamp-3 text-[14.5px] leading-[1.8] text-ink/60">
                  {book.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
