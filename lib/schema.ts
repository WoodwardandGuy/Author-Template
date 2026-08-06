import type { AuthorInfo, Book, FAQItem, Socials } from './types';
import { SITE_URL } from './site';

function socialUrls(socials?: Socials): string[] {
  if (!socials) return [];
  return Object.values(socials).filter(
    (v): v is string => typeof v === 'string' && v.length > 0,
  );
}

/**
 * Person schema for the author — rendered site-wide.
 */
export function generatePersonSchema(authorInfo: AuthorInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: authorInfo.name,
    description: authorInfo.tagline,
    url: SITE_URL,
    jobTitle: 'Author',
    sameAs: socialUrls(authorInfo.socials),
  };
}

/**
 * Book / WebSite schema for the home page.
 */
export function generateWebsiteSchema(authorInfo: AuthorInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: authorInfo.name,
    url: SITE_URL,
    author: { '@id': `${SITE_URL}/#person` },
  };
}

/**
 * Book schema for an individual book page.
 */
export function generateBookSchema(book: Book, authorName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    ...(book.subtitle && { alternativeHeadline: book.subtitle }),
    description: book.description,
    url: `${SITE_URL}/books/${book.slug}`,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    ...(book.genre && { genre: book.genre }),
    ...(book.publicationDate && { datePublished: book.publicationDate }),
    ...(book.retailers &&
      book.retailers.length > 0 && {
        offers: book.retailers.map((r) => ({
          '@type': 'Offer',
          url: r.url,
          seller: { '@type': 'Organization', name: r.label || r.store },
        })),
      }),
  };
}

export function generateFAQPageSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
