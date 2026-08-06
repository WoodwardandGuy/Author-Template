import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  description: 'Section headings and labels used across the site',
  groups: [
    { name: 'books', title: 'Books' },
    { name: 'praise', title: 'Praise' },
    { name: 'events', title: 'Events' },
    { name: 'faq', title: 'FAQ' },
    { name: 'contact', title: 'Contact' },
    { name: 'newsletter', title: 'Newsletter' },
    { name: 'blog', title: 'Blog' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // Books
    defineField({
      name: 'booksHeadline',
      title: 'Books Section Headline',
      type: 'string',
      group: 'books',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'booksSubtext',
      title: 'Books Section Subtext',
      type: 'text',
      group: 'books',
    }),
    defineField({
      name: 'booksFooterText',
      title: 'Books Footer Text',
      type: 'string',
      group: 'books',
      description: 'Small text shown below the books list',
    }),
    // Praise
    defineField({
      name: 'praiseHeadline',
      title: 'Praise Section Headline',
      type: 'string',
      group: 'praise',
    }),
    // Events
    defineField({
      name: 'eventsHeadline',
      title: 'Events Section Headline',
      type: 'string',
      group: 'events',
    }),
    defineField({
      name: 'eventsSubtext',
      title: 'Events Section Subtext',
      type: 'text',
      group: 'events',
    }),
    defineField({
      name: 'eventsEmptyText',
      title: 'Events Empty State Text',
      type: 'string',
      group: 'events',
      description: 'Shown when there are no upcoming events',
    }),
    // FAQ
    defineField({
      name: 'faqHeadline',
      title: 'FAQ Section Headline',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqSubtext',
      title: 'FAQ Section Subtext',
      type: 'string',
      group: 'faq',
    }),
    // Contact
    defineField({
      name: 'contactHeadline',
      title: 'Contact Section Headline',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactSubtext',
      title: 'Contact Section Subtext',
      type: 'text',
      group: 'contact',
    }),
    defineField({
      name: 'contactButtonText',
      title: 'Contact Submit Button Text',
      type: 'string',
      group: 'contact',
    }),
    // Newsletter
    defineField({
      name: 'newsletterHeadline',
      title: 'Newsletter Headline',
      type: 'string',
      group: 'newsletter',
    }),
    defineField({
      name: 'newsletterSubtext',
      title: 'Newsletter Subtext',
      type: 'text',
      group: 'newsletter',
    }),
    defineField({
      name: 'newsletterButtonText',
      title: 'Newsletter Button Text',
      type: 'string',
      group: 'newsletter',
    }),
    // Blog
    defineField({
      name: 'blogHeadline',
      title: 'Blog Page Headline',
      type: 'string',
      group: 'blog',
    }),
    defineField({
      name: 'blogSubtext',
      title: 'Blog Page Subtext',
      type: 'text',
      group: 'blog',
    }),
    defineField({
      name: 'blogFeaturedLabel',
      title: 'Blog Featured Post Label',
      type: 'string',
      group: 'blog',
      description: 'Label on the featured post card (e.g. "Latest Post")',
    }),
    defineField({
      name: 'blogReadMoreText',
      title: 'Blog Read More Text',
      type: 'string',
      group: 'blog',
    }),
    defineField({
      name: 'blogMoreArticlesText',
      title: 'Blog More Articles Heading',
      type: 'string',
      group: 'blog',
    }),
    defineField({
      name: 'blogViewAllText',
      title: 'Blog View All Link Text',
      type: 'string',
      group: 'blog',
    }),
    defineField({
      name: 'blogEmptyText',
      title: 'Blog Empty State Text',
      type: 'string',
      group: 'blog',
    }),
    defineField({
      name: 'blogBackText',
      title: 'Blog Back Link Text',
      type: 'string',
      group: 'blog',
    }),
    defineField({
      name: 'blogAllArticlesHeadline',
      title: 'All Articles Page Headline',
      type: 'string',
      group: 'blog',
    }),
    // Footer
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerCopyrightText',
      title: 'Footer Copyright Subtext',
      type: 'string',
      group: 'footer',
      description: 'Small text below the copyright line',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Content' }),
  },
});
