import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity.image';
import { HeroContent, SanityImage } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
  logo?: SanityImage;
  authorName?: string;
}

export function Hero({ content, logo, authorName }: HeroProps) {
  const hasLogo = logo?.asset;
  const ctaLink = content.ctaLink || '/books';

  return (
    <section className="relative min-h-[600px] md:min-h-[720px] flex items-center overflow-hidden">
      {/* Smoky animated background — the hero has no photo; the drifting smoke
          over the dark ink gradient is the whole backdrop. */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-dark to-ink" />
      <div aria-hidden className="hero-smoke" />
      <div aria-hidden className="hero-smoke hero-smoke--slow" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-10">
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

          {hasLogo && (
            <div className="shrink-0 md:pl-8">
              <Image
                src={urlFor(logo).width(720).height(720).url()}
                alt={logo?.alt || authorName || ''}
                width={360}
                height={360}
                priority
                className="h-auto w-56 md:w-72 lg:w-80 drop-shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
