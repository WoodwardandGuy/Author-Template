import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';
import type { FeaturedRelease as FeaturedReleaseContent } from '@/lib/types';

interface FeaturedReleaseProps {
  content: FeaturedReleaseContent;
}

export function FeaturedRelease({ content }: FeaturedReleaseProps) {
  const book = content.book;
  if (!content.enabled || !book) return null;

  const coverUrl = book.cover?.asset
    ? urlFor(book.cover).width(600).height(900).url()
    : null;
  const retailers = book.retailers || [];

  return (
    <section className="bg-soil-2 text-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          <div className="order-2 md:order-1">
            {content.label && (
              <p className="text-moss font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                {content.label}
              </p>
            )}
            {content.headline && (
              <p className="text-white/70 text-lg italic mb-3">{content.headline}</p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-2">
              {book.title}
            </h2>
            {book.subtitle && (
              <p className="text-xl text-white/60 mb-5">{book.subtitle}</p>
            )}
            <p className="text-white/80 leading-relaxed mb-8 line-clamp-4">
              {book.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/books/${book.slug}`}
                className="inline-flex items-center border border-brand bg-transparent text-brand-light hover:bg-brand hover:text-bone font-semibold px-7 py-3 rounded-lg transition-colors"
              >
                {content.ctaText || 'Learn more'}
              </Link>
              {retailers.slice(0, 3).map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-white/25 hover:border-white/60 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  {r.label || r.store}
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            {coverUrl && (
              <Link href={`/books/${book.slug}`} className="block">
                <Image
                  src={coverUrl}
                  alt={book.cover?.alt || book.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-2xl w-auto h-auto max-w-[300px]"
                  priority
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
