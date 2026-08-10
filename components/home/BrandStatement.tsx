import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';
import type { BrandStatementContent, SanityImage } from '@/lib/types';

interface BrandStatementProps {
  content: BrandStatementContent;
  image?: SanityImage;
}

export function BrandStatement({ content, image }: BrandStatementProps) {
  const imageUrl = image?.asset ? urlFor(image).width(900).height(900).url() : null;

  return (
    <section className="bg-smokyGreen text-ivory">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-x-20 gap-y-12 px-[clamp(20px,4vw,48px)] py-[clamp(64px,9vw,100px)]">
        <div>
          <h2 className="max-w-[600px] text-pretty font-display text-[clamp(30px,4.4vw,44px)] leading-[1.15]">
            {content.headline}
          </h2>
          {content.body && (
            <p className="mt-6 max-w-[520px] text-[16.5px] leading-[1.9] text-ivory/68">
              {content.body}
            </p>
          )}
          <Link
            href="/book-club"
            className="mt-8 inline-block border-b border-brass pb-[6px] text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:text-brass"
          >
            See the book clubs
          </Link>
        </div>

        {imageUrl && (
          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={image?.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        )}
      </div>
    </section>
  );
}
