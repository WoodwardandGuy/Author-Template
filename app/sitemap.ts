import type { MetadataRoute } from 'next';
import { getBlogPostSlugs, getServiceSlugs, getServiceAreaSlugs } from '@/lib/sanity.fetch';

const BASE_URL = 'https://www.treeprofessionalsofharrisburg.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, serviceSlugs, areaSlugs] = await Promise.all([
    getBlogPostSlugs(),
    getServiceSlugs(),
    getServiceAreaSlugs(),
  ]);

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const services: MetadataRoute.Sitemap = serviceSlugs.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const areas: MetadataRoute.Sitemap = areaSlugs.map((a) => ({
    url: `${BASE_URL}/areas/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/areas`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...services,
    ...areas,
    ...blogPosts,
  ];
}
