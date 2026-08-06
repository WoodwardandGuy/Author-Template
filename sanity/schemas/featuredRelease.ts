import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'featuredRelease',
  title: 'Featured Release',
  type: 'document',
  description:
    'An elegant spotlight for a new or upcoming book on the home page. Turn off to hide the section.',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show on home page',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small eyebrow text, e.g. "New Release", "Now Available", "Coming Soon"',
      initialValue: 'New Release',
    }),
    defineField({
      name: 'book',
      title: 'Book',
      type: 'reference',
      to: [{ type: 'book' }],
      description: 'The book to spotlight — its cover and retailer links are pulled in automatically',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Hook Line',
      type: 'string',
      description: 'Optional one-line hook shown above the title (e.g. the logline)',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Text for the main button, e.g. "Pre-order now" (defaults to "Learn more")',
    }),
  ],
  preview: {
    select: { title: 'label', book: 'book.title', enabled: 'enabled' },
    prepare({ title, book, enabled }) {
      return {
        title: book || 'No book selected',
        subtitle: `${title || 'Featured'}${enabled ? '' : ' (hidden)'}`,
      };
    },
  },
});
