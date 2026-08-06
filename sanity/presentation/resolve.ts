import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    companyInfo: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || 'Company Info', href: '/' }],
      }),
    }),
    heroContent: defineLocations({
      select: { headline: 'headline' },
      resolve: (doc) => ({
        locations: [{ title: doc?.headline || 'Hero', href: '/' }],
      }),
    }),
    service: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Service', href: '/' }],
      }),
    }),
    testimonial: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || 'Testimonial', href: '/' }],
      }),
    }),
    brandStatement: defineLocations({
      select: { headline: 'headline' },
      resolve: (doc) => ({
        locations: [{ title: doc?.headline || 'Brand Statement', href: '/' }],
      }),
    }),
    emergencyCTA: defineLocations({
      select: { headline: 'headline' },
      resolve: (doc) => ({
        locations: [{ title: doc?.headline || 'Emergency CTA', href: '/' }],
      }),
    }),
    siteContent: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Site Content', href: '/' }],
      }),
    }),
    faqItem: defineLocations({
      select: { question: 'question' },
      resolve: (doc) => ({
        locations: [{ title: doc?.question || 'FAQ', href: '/' }],
      }),
    }),
    blogPost: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Blog Post',
            href: doc?.slug ? `/blog/${doc.slug}` : '/blog',
          },
          { title: 'Blog', href: '/blog' },
        ],
      }),
    }),
  },
};
