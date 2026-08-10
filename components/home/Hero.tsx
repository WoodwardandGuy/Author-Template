import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity.image';
import { NewsletterTrigger } from '@/components/newsletter/NewsletterTrigger';
import type { HeroContent } from '@/lib/types';

interface HeroProps {
  content: HeroContent;
}

// Horizontal scrim with viewport-aware stops — the mask covers proportionally
// more as the screen narrows, keeping the type legible over the portrait.
const SCRIM =
  'linear-gradient(90deg, #0A0A0B 0%, #0A0A0B clamp(180px, 38vw, 480px), rgba(10,10,11,0.88) clamp(300px, 56vw, 700px), rgba(10,10,11,0.45) clamp(380px, 72vw, 900px), rgba(10,10,11,0.12) 94%)';

export function Hero({ content }: HeroProps) {
  // Erika's headshot ships with the site; a Sanity image (if set) overrides it.
  const portraitUrl = content.backgroundImage?.asset
    ? urlFor(content.backgroundImage).width(1100).height(1500).url()
    : '/elw-hero-portrait.jpg';
  const ctaLink = content.ctaLink || '/books';

  return (
    <section className="relative flex min-h-[min(860px,88vh)] items-center overflow-hidden bg-heroBlack">
      {/* Portrait, full-bleed right */}
      {portraitUrl && (
        <img
          src={portraitUrl}
          alt={content.backgroundImage?.alt || 'E.L. Westbury'}
          className="absolute right-0 top-0 h-full w-[clamp(210px,58vw,760px)] object-cover"
          style={{ objectPosition: '50% 18%' }}
        />
      )}

      {/* Scrim + bottom fade carry the portrait into the section below */}
      <div className="absolute inset-0" style={{ background: SCRIM }} />
      <div
        className="absolute inset-x-0 bottom-0 h-[22%]"
        style={{ background: 'linear-gradient(0deg, #0A0A0B, transparent)' }}
      />

      {/* Icon watermark — bleeds off the left edge as texture */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/elw-icon.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[-63px] top-[239px] h-[122%] w-auto -rotate-12 opacity-[0.055]"
        style={{ transform: 'translateY(-50%) rotate(-12deg)' }}
      />

      {/* Content held in the left third */}
      <div className="relative z-[2] mx-auto w-full max-w-[1280px] animate-elw-rise px-[clamp(24px,4vw,64px)]">
        <h1
          className="max-w-[min(14ch,62vw)] text-balance font-display text-[clamp(30px,7.4vw,92px)] font-normal leading-[0.98] tracking-[-0.01em] text-ivory [text-shadow:0_2px_26px_rgba(10,10,11,0.85)]"
        >
          {content.headline}
        </h1>
        {content.subheadline && (
          <p className="mt-[18px] max-w-[min(22ch,60vw)] font-display text-[clamp(16px,3vw,34px)] italic leading-[1.3] text-gold [text-shadow:0_2px_22px_rgba(10,10,11,0.9)]">
            {content.subheadline}
          </p>
        )}

        <div className="mt-[clamp(30px,4vw,48px)] flex flex-wrap gap-[14px]">
          <Link
            href={ctaLink}
            className="bg-brass px-8 py-[17px] text-[12.5px] uppercase tracking-[0.2em] text-heroBlack transition-colors hover:bg-brassHover"
          >
            {content.ctaText || 'Explore the books'}
          </Link>
          <NewsletterTrigger className="border border-ivory/35 px-8 py-[17px] text-[12.5px] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-brass">
            Become a Burier
          </NewsletterTrigger>
        </div>
      </div>
    </section>
  );
}
