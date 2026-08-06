import type { AuthorInfo, HeroContent } from './types';

/**
 * Fallbacks used only when the CMS has no content yet (fresh dataset / local dev),
 * so pages render a clearly-unfinished placeholder instead of crashing on null
 * singletons. Once the real documents exist in Studio these are never used.
 *
 * The copy is deliberately generic and self-evidently a setup state — nothing here
 * reads as finished, real content that could be mistaken for launch-ready.
 */

export const FALLBACK_AUTHOR: AuthorInfo = {
  name: 'Your Name',
  tagline: 'Author',
  email: '',
};

export const FALLBACK_HERO: HeroContent = {
  headline: 'Welcome',
  subheadline: 'Add your hero content in Sanity Studio to replace this placeholder.',
  ctaText: 'Explore the books',
  ctaLink: '/books',
};
