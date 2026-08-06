import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'whyChooseUsItem',
  title: 'Why Choose Us Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon component name',
      options: {
        list: [
          { title: 'ShieldCheck', value: 'ShieldCheck' },
          { title: 'Clock', value: 'Clock' },
          { title: 'Award', value: 'Award' },
          { title: 'Wrench', value: 'Wrench' },
          { title: 'TreeDeciduous', value: 'TreeDeciduous' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Star', value: 'Star' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
    select: { title: 'title', subtitle: 'icon' },
  },
});
