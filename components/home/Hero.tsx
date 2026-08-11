import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroContent } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
  eyebrow?: string;
}

export function Hero({ content, eyebrow }: HeroProps) {
  const ctaLink = content.ctaLink || '/books';

  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 py-24 text-center">
      {eyebrow && (
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.42em] text-moss">
          {eyebrow}
        </p>
      )}

      <h1 className="max-w-[15ch] text-balance text-5xl font-normal leading-[1.05] tracking-tight text-bone sm:text-6xl lg:text-7xl">
        {content.headline}
      </h1>

      <p className="mt-6 max-w-[44ch] text-pretty text-base leading-relaxed text-bone-dim sm:text-lg">
        {content.subheadline}
      </p>

      <Button
        asChild
        size="lg"
        className="mt-9 h-auto rounded-full border border-brand bg-transparent px-8 py-4 text-base font-medium tracking-wide text-brand-light transition-colors hover:bg-brand hover:text-bone"
      >
        {ctaLink.startsWith('/') ? (
          <Link href={ctaLink}>{content.ctaText}</Link>
        ) : (
          <a href={ctaLink}>{content.ctaText}</a>
        )}
      </Button>
    </section>
  );
}
