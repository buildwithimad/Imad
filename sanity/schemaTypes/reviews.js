export default {
  name: 'review',
  title: 'Client Review',
  type: 'document',
  fields: [
    {
      name: 'client',
      title: 'Client Name',
      type: 'object',
      description: 'Name of the client',
      fields: [
        {
          name: 'en',
          title: 'English Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic Name',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Client Role/Position',
      type: 'object',
      description: 'Client\'s role or position',
      fields: [
        {
          name: 'en',
          title: 'English Role',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic Role',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Client Image',
      type: 'image',
      description: 'Profile image of the client',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'English Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'ar',
              title: 'Arabic Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'quote',
      title: 'Review Quote',
      type: 'object',
      description: 'The testimonial quote',
      fields: [
        {
          name: 'en',
          title: 'English Quote',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic Quote',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      description: 'Client\'s location',
      fields: [
        {
          name: 'en',
          title: 'English Location',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic Location',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Whether this review is published',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'client.en',
      subtitle: 'role.en',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Unnamed Client',
        subtitle: subtitle || 'No role',
        media: media
      };
    }
  },
  orderings: [
    {
      title: 'ID (Ascending)',
      name: 'idAsc',
      by: [{ field: 'id', direction: 'asc' }]
    },
    {
      title: 'ID (Descending)',
      name: 'idDesc',
      by: [{ field: 'id', direction: 'desc' }]
    }
  ]
}