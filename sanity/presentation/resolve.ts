import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    authorInfo: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || 'Author Info', href: '/' }],
      }),
    }),
    heroContent: defineLocations({
      select: { headline: 'headline' },
      resolve: (doc) => ({
        locations: [{ title: doc?.headline || 'Hero', href: '/' }],
      }),
    }),
    book: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Book',
            href: doc?.slug ? `/books/${doc.slug}` : '/books',
          },
          { title: 'All books', href: '/books' },
        ],
      }),
    }),
    praise: defineLocations({
      select: { attribution: 'attribution' },
      resolve: (doc) => ({
        locations: [{ title: doc?.attribution || 'Praise', href: '/' }],
      }),
    }),
    event: defineLocations({
      select: { title: 'title' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Event', href: '/events' },
          { title: 'Events', href: '/events' },
        ],
      }),
    }),
    bookClubPhoto: defineLocations({
      select: { clubName: 'clubName' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.clubName || 'Book Club Gallery', href: '/book-club' },
          { title: 'Book Club', href: '/book-club' },
        ],
      }),
    }),
    press: defineLocations({
      select: { outlet: 'outlet' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.outlet || 'Press', href: '/press' },
          { title: 'Press', href: '/press' },
        ],
      }),
    }),
    featuredRelease: defineLocations({
      select: { label: 'label' },
      resolve: () => ({
        locations: [{ title: 'Featured Release', href: '/' }],
      }),
    }),
    brandStatement: defineLocations({
      select: { headline: 'headline' },
      resolve: (doc) => ({
        locations: [{ title: doc?.headline || 'About Statement', href: '/' }],
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
