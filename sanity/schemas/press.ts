import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'press',
  title: 'Press',
  type: 'document',
  description: 'Media coverage, interviews, and features.',
  fields: [
    defineField({
      name: 'outlet',
      title: 'Outlet',
      type: 'string',
      description: 'Publication or show, e.g. "The New York Times"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline / Quote',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'logo',
      title: 'Outlet Logo',
      type: 'image',
      description: 'Optional — shown in place of the outlet name when present',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'outlet', subtitle: 'headline', media: 'logo' },
  },
});
