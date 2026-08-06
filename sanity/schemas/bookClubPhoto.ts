import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'bookClubPhoto',
  title: 'Book Club Gallery',
  type: 'document',
  description: 'Reader / book-club photos. Only entries marked "Approved" appear on the site.',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the photo for accessibility',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clubName',
      title: 'Club / Reader Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional — e.g. "Austin, TX"',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'approved',
      title: 'Approved to show publicly',
      type: 'boolean',
      description: 'Off by default. The photo only appears on the site when this is on.',
      initialValue: false,
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
    select: { title: 'clubName', subtitle: 'location', media: 'image', approved: 'approved' },
    prepare({ title, subtitle, media, approved }) {
      return {
        title,
        subtitle: `${approved ? '✓ Approved' : '• Pending'}${subtitle ? ` — ${subtitle}` : ''}`,
        media,
      };
    },
  },
});
