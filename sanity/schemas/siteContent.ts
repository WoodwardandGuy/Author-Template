import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'servicesHeadline',
      title: 'Services Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicesSubtext',
      title: 'Services Section Subtext',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicesFooterText',
      title: 'Services Footer Text',
      type: 'string',
      description: 'Text shown below the services list (e.g. "Need something else?")',
    }),
    defineField({
      name: 'testimonialsHeadline',
      title: 'Testimonials Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonialsRatingText',
      title: 'Testimonials Rating Text',
      type: 'string',
      description: 'e.g. "5.0 Average Rating • 127 Reviews"',
    }),
    defineField({
      name: 'faqHeadline',
      title: 'FAQ Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqSubtext',
      title: 'FAQ Section Subtext',
      type: 'string',
    }),
    defineField({
      name: 'contactHeadline',
      title: 'Contact Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactSubtext',
      title: 'Contact Section Subtext',
      type: 'text',
    }),
    defineField({
      name: 'contactInfoTitle',
      title: 'Contact Info Box Title',
      type: 'string',
    }),
    defineField({
      name: 'contactButtonText',
      title: 'Contact Submit Button Text',
      type: 'string',
    }),
    defineField({
      name: 'blogHeadline',
      title: 'Blog Page Headline',
      type: 'string',
    }),
    defineField({
      name: 'blogSubtext',
      title: 'Blog Page Subtext',
      type: 'text',
    }),
    defineField({
      name: 'blogFeaturedLabel',
      title: 'Blog Featured Post Label',
      type: 'string',
      description: 'Label on the featured post card (e.g. "Latest Post")',
    }),
    defineField({
      name: 'blogReadMoreText',
      title: 'Blog Read More Text',
      type: 'string',
      description: 'Link text on featured post (e.g. "Read Article")',
    }),
    defineField({
      name: 'blogMoreArticlesText',
      title: 'Blog More Articles Heading',
      type: 'string',
    }),
    defineField({
      name: 'blogViewAllText',
      title: 'Blog View All Link Text',
      type: 'string',
    }),
    defineField({
      name: 'blogEmptyText',
      title: 'Blog Empty State Text',
      type: 'string',
    }),
    defineField({
      name: 'blogBackText',
      title: 'Blog Back Link Text',
      type: 'string',
      description: 'Text for "Back to Blog" links',
    }),
    defineField({
      name: 'blogAllArticlesHeadline',
      title: 'All Articles Page Headline',
      type: 'string',
    }),
    defineField({
      name: 'footerEmergencyText',
      title: 'Footer Emergency Service Text',
      type: 'string',
    }),
    defineField({
      name: 'footerCopyrightText',
      title: 'Footer Copyright Subtext',
      type: 'string',
      description: 'Text below the copyright line (e.g. "Licensed and Insured Tree Service Professionals")',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Content' }),
  },
});
