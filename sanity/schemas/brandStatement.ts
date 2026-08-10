import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'brandStatement',
  title: 'Brand Statement',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description:
        'Optional. The current design leads with the headline and does not render an eyebrow above it.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'headline' },
  },
});
