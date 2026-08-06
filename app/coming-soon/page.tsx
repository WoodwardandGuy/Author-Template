import type { Metadata } from 'next';
import { client } from '@/lib/sanity.client';
import { authorInfoQuery } from '@/lib/sanity.queries';
import type { AuthorInfo } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Something new is on the way.',
  robots: { index: false, follow: false },
};

// A launch page shouldn't be cached forever behind the gate.
export const revalidate = 300;

// Best-effort personalization. If Sanity isn't reachable at build/request time,
// the gate still renders cleanly with sensible defaults — it must never crash,
// because it's the only thing standing between visitors and a blank error.
async function getAuthor(): Promise<Partial<AuthorInfo>> {
  try {
    const data = await client.fetch<AuthorInfo | null>(authorInfoQuery);
    return data ?? {};
  } catch {
    return {};
  }
}

export default async function ComingSoonPage() {
  const author = await getAuthor();
  const name =
    author.name && author.name !== 'Your Name' ? author.name : 'E.L. Westbury';
  const tagline =
    author.tagline && author.tagline !== 'Author' ? author.tagline : 'Author';
  const instagram = author.socials?.instagram;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-dark px-6 text-center text-white">
      {/* Soft gold wash behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(154,123,79,0.28) 0%, rgba(26,24,34,0) 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-brand">
          Coming Soon
        </p>

        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          {name}
        </h1>

        <p className="mt-4 text-base text-white/60 sm:text-lg">{tagline}</p>

        <div className="mt-10 h-px w-16 bg-brand/50" />

        <p className="mt-10 max-w-md text-pretty text-sm leading-relaxed text-white/50 sm:text-base">
          The new site is on its way. Check back soon. There&rsquo;s something
          worth waiting for.
        </p>

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-white"
          >
            Follow along on Instagram
            <span aria-hidden>&rarr;</span>
          </a>
        )}
      </div>

      <footer className="absolute bottom-6 z-10 text-xs text-white/30">
        &copy; {new Date().getFullYear()} {name}
      </footer>
    </main>
  );
}
