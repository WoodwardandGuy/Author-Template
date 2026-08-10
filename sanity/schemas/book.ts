import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'editionNote',
      title: 'Edition Note',
      type: 'string',
      description: 'Short edition callout shown as a badge, e.g. "Now with a new bonus chapter!"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the cover for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          'Thriller',
          'Mystery',
          'Suspense',
          'Romance',
          'Literary Fiction',
          'Historical Fiction',
          'Fantasy',
          'Science Fiction',
          'Young Adult',
          'Nonfiction',
          'Memoir',
          'Other',
        ],
      },
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Series name, if this book belongs to one',
    }),
    defineField({
      name: 'seriesOrder',
      title: 'Series Order',
      type: 'number',
      description: 'Position within the series (e.g. 1, 2, 3)',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Jacket Copy',
      type: 'text',
      description: 'The blurb shown on cards and at the top of the book page',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Extended Description',
      type: 'text',
      description: 'Optional longer copy for the individual book page',
      rows: 12,
    }),
    defineField({
      name: 'retailers',
      title: 'Retailer Links',
      type: 'array',
      description: 'Buy / pre-order links shown as buttons',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'store',
              title: 'Store',
              type: 'string',
              options: {
                list: [
                  'Amazon',
                  'Barnes & Noble',
                  'Bookshop.org',
                  'BookBub',
                  'Apple Books',
                  'Kobo',
                  'Audible',
                  'Google Play',
                  'Other',
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Custom Label',
              type: 'string',
              description: 'Overrides the store name on the button (optional)',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: { select: { title: 'store', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      description: 'SEO description for the book page (max 160 characters)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order books appear (lower shows first)',
    }),
    defineField({
      name: 'themeWords',
      title: 'Page-Turn Words',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'One short word or phrase per page of the opening animation on the book page, ' +
        'in order. 3–5 works best. e.g. "THE LIE", "THE TRUTH", "THE NIGHTMARE", "THE BODY". ' +
        'Set in caps.',
      validation: (Rule) => Rule.max(6),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'series', media: 'cover' },
  },
});
