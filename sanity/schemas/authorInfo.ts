import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'companyInfo',
  title: 'Company Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'city', title: 'City', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'state', title: 'State', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'zip', title: 'ZIP Code', type: 'string', validation: (Rule: any) => Rule.required() },
      ],
    } as any),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        { name: 'weekday', title: 'Weekday Hours', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'weekend', title: 'Weekend Hours', type: 'string', validation: (Rule: any) => Rule.required() },
      ],
    } as any),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Company logo displayed in the header and footer',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'servicesImage',
      title: 'Services Section Image',
      type: 'image',
      description: 'Photo displayed in the services section on the home page',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'brandImage',
      title: 'Brand Statement Image',
      type: 'image',
      description: 'Background photo for the brand statement section on the home page',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
