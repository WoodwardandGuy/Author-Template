import Image from 'next/image';
import { urlFor } from '@/lib/sanity.image';
import type { BrandStatementContent, SanityImage } from '@/lib/types';

interface BrandStatementProps {
  content: BrandStatementContent;
  image?: SanityImage;
}

export function BrandStatement({ content, image }: BrandStatementProps) {
  const imageUrl = image?.asset
    ? urlFor(image).width(1920).height(800).url()
    : null;

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={image?.alt || ''}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-soil-2/75" />
        </>
      ) : (
        <div className="absolute inset-0 bg-soil-2" />
      )}

      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-moss font-semibold tracking-[0.2em] uppercase text-sm mb-4">
          {content.tagline}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto mb-6 tracking-tight">
          {content.headline}
        </h2>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {content.body}
        </p>
      </div>
    </section>
  );
}
