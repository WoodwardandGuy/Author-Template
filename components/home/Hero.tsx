import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity.image';
import { HeroContent } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  const hasImage = content.backgroundImage?.asset;
  const imageUrl = hasImage
    ? urlFor(content.backgroundImage).width(1920).height(1080).url()
    : null;
  const ctaLink = content.ctaLink || '/books';

  return (
    <section className="relative min-h-[600px] md:min-h-[720px] flex items-center overflow-hidden">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={content.backgroundImage?.alt || ''}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-dark to-ink" />
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            {content.headline}
          </h1>

          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
            {content.subheadline}
          </p>

          <Button
            asChild
            size="lg"
            className="bg-brand hover:bg-brand-dark text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
          >
            {ctaLink.startsWith('/') ? (
              <Link href={ctaLink}>{content.ctaText}</Link>
            ) : (
              <a href={ctaLink}>{content.ctaText}</a>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
