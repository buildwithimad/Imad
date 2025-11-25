export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'object',
      description: 'Project title in both languages',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          description: 'Title in English',
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic',
          type: 'string',
          description: 'Title in Arabic',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'object',
      description: 'Project category in both languages',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          description: 'Category in English',
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic',
          type: 'string',
          description: 'Category in Arabic',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Year the project was completed',
      validation: Rule => Rule.required()
    },
    {
      name: 'stack',
      title: 'Technology Stack',
      type: 'array',
      description: 'List of technologies used in the project',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      description: 'Project description in both languages',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'text',
          description: 'Description in English',
          validation: Rule => Rule.required()
        },
        {
          name: 'ar',
          title: 'Arabic',
          type: 'text',
          description: 'Description in Arabic',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      description: 'Main project image/screenshot',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'links',
      title: 'Project Links',
      type: 'object',
      description: 'Links to GitHub repository and live demo',
      fields: [
        {
          name: 'github',
          title: 'GitHub Repository',
          type: 'url',
          description: 'Link to the project\'s GitHub repository'
        },
        {
          name: 'live',
          title: 'Live Demo',
          type: 'url',
          description: 'Link to the live project demo'
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark as featured project to highlight on the homepage',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which projects should be displayed (lower numbers appear first)',
      validation: Rule => Rule.integer().min(1)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the project',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.en',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
    }
  ]
}