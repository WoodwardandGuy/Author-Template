import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';
import type { FeaturedRelease as FeaturedReleaseContent, Retailer } from '@/lib/types';

interface FeaturedReleaseProps {
  content: FeaturedReleaseContent;
}

/** Dedupe retailers by their displayed label so the buy row never repeats a store. */
function dedupeRetailers(retailers: Retailer[]): Retailer[] {
  const seen = new Set<string>();
  return retailers.filter((r) => {
    const key = (r.label || r.store).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function FeaturedRelease({ content }: FeaturedReleaseProps) {
  const book = content.book;
  if (!content.enabled || !book) return null;

  const coverUrl = book.cover?.asset
    ? urlFor(book.cover).width(680).height(1020).url()
    : null;
  const retailers = dedupeRetailers(book.retailers || []).slice(0, 3);

  return (
    <section className="overflow-hidden bg-aubergine text-ivory">
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(44px,6vw,84px)] px-[clamp(24px,4vw,48px)] py-[clamp(72px,9vw,116px)]">
        {/* Cover with rotated gold frame */}
        <div className="relative mx-auto w-full max-w-[340px] justify-self-center">
          <span
            aria-hidden
            className="absolute inset-[-14px] border border-gold/35"
            style={{ transform: 'rotate(-2.5deg)' }}
          />
          {coverUrl && (
            <Link href={`/books/${book.slug}`} className="relative block">
              <Image
                src={coverUrl}
                alt={book.cover?.alt || book.title}
                width={680}
                height={1020}
                priority
                className="aspect-[2/3] w-full object-cover [box-shadow:0_40px_90px_rgba(0,0,0,0.7)]"
              />
            </Link>
          )}
        </div>

        {/* Text */}
        <div>
          <h2 className="font-display text-[clamp(34px,4.4vw,54px)] leading-[1.08]">
            {book.title}
          </h2>
          <p className="mt-6 max-w-[46ch] whitespace-pre-line text-[16.5px] leading-[1.9] text-ivory/72">
            {book.description}
          </p>

          <Link
            href={`/books/${book.slug}`}
            className="mt-8 inline-flex bg-brass px-[30px] py-4 text-[12px] uppercase tracking-[0.18em] text-heroBlack transition-colors hover:bg-brassHover"
          >
            {content.ctaText || 'Learn more'}
          </Link>

          {retailers.length > 0 && (
            <div className="mt-[38px] border-t border-ivory/18 pt-[26px]">
              <p className="mb-4 text-[11px] uppercase tracking-[0.26em] text-ivory/50">
                Buy now
              </p>
              <div className="flex flex-wrap gap-3">
                {retailers.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-ivory/35 px-6 py-[15px] text-[12px] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold hover:bg-gold/[0.08] hover:text-gold"
                  >
                    {r.label || r.store}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
