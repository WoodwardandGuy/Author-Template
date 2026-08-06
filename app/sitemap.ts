import type { MetadataRoute } from 'next';
import { getBookSlugs } from '@/lib/sanity.fetch';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bookSlugs = await getBookSlugs();

  const books: MetadataRoute.Sitemap = bookSlugs.map((b) => ({
    url: `${SITE_URL}/books/${b.slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/books`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/events`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/press`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/book-club`, changeFrequency: 'weekly', priority: 0.6 },
  ];

  return [...staticPages, ...books];
}
