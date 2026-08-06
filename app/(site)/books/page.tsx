import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { urlFor } from '@/lib/sanity.image';
import { getBooks, getSiteContent } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

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

export default async function BooksPage() {
  const [books, siteContent] = await Promise.all([getBooks(), getSiteContent()]);

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
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4 tracking-tight">
            {siteContent?.booksHeadline || 'Books'}
          </h1>
          {siteContent?.booksSubtext && (
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
              {siteContent.booksSubtext}
            </p>
          )}

          {books.length > 0 ? (
            <div className="space-y-12">
              {books.map((book) => {
                const coverUrl = book.cover?.asset
                  ? urlFor(book.cover).width(400).height(600).url()
                  : null;
                return (
                  <article
                    key={book.id}
                    className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6 md:gap-8 items-start"
                  >
                    <Link href={`/books/${book.slug}`} className="block group">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md bg-gray-100">
                        {coverUrl ? (
                          <Image
                            src={coverUrl}
                            alt={book.cover?.alt || book.title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            sizes="180px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 text-sm px-3 text-center">
                            {book.title}
                          </div>
                        )}
                      </div>
                    </Link>
                    <div>
                      {book.series && (
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">
                          {book.series}
                          {book.seriesOrder ? ` · Book ${book.seriesOrder}` : ''}
                        </p>
                      )}
                      <h2 className="text-2xl font-bold text-ink-dark mb-1">
                        <Link href={`/books/${book.slug}`} className="hover:text-ink transition-colors">
                          {book.title}
                        </Link>
                      </h2>
                      {book.subtitle && (
                        <p className="text-lg text-gray-500 mb-3">{book.subtitle}</p>
                      )}
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-4">
                        {book.description}
                      </p>
                      <Link
                        href={`/books/${book.slug}`}
                        className="text-ink font-semibold hover:text-brand transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-lg py-12">No books published yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
