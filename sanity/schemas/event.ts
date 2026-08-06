import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  description: 'Appearances, signings, launches, festivals. Past events are hidden automatically.',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'e.g. "The Strand Bookstore" or "Virtual"',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'State / Region',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Details / Tickets URL',
      type: 'url',
      description: 'Where readers can RSVP or buy tickets',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Date (soonest first)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date', venue: 'venue' },
    prepare({ title, date, venue }) {
      const when = date
        ? new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No date';
      return { title, subtitle: [when, venue].filter(Boolean).join(' · ') };
    },
  },
});
