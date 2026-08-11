import Image from 'next/image';

/**
 * Homepage author banner — the dominant identity statement (jenevarose.com style).
 *
 * Brand target: sage green #AAB1A9 + blush ivory #FBF3F1. Both are light (~2:1
 * against each other), so a banner in those exact hexes can't hold legible text
 * OR show the sage logo. This uses a desaturated sage-GREY ground (#6d746c — the
 * brand sage darkened, ~7% saturation, deliberately far from army green) with
 * ivory text and a white seal (the transparent mark filtered to white).
 * #AAB1A9 stays as the "Author" rule accent.
 * The nav keeps its small mark for inner pages; this is the homepage headline.
 */

interface AuthorBannerProps {
  name: string;
}

export function AuthorBanner({ name }: AuthorBannerProps) {
  return (
    <section className="w-full bg-[#6d746c]">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-center md:gap-12 md:text-left">
          <Image
            src="/elw-logo-transparent.png"
            alt=""
            width={340}
            height={340}
            priority
            className="h-28 w-auto shrink-0 brightness-0 invert sm:h-32 md:h-40 lg:h-48"
          />
          <div>
            <h1 className="font-serif text-5xl font-medium leading-[0.95] tracking-tight text-[#FBF3F1] sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.5em] text-[#FBF3F1]/80 md:justify-start md:text-sm">
              <span aria-hidden className="hidden h-px w-10 bg-[#AAB1A9] md:inline-block" />
              Author
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
