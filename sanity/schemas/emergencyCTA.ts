import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'emergencyCTA',
  title: 'Emergency CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text before the phone number on the button',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'headline' },
  },
});
