import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasLocalizedPair, readNonEmptyString, validateSafePublication} from '../validation'

export const mediaItem = defineType({
  name: 'mediaItem',
  title: 'Media & evidence library item',
  type: 'document',
  fields: [
    defineField({
      name: 'stableId',
      title: 'Stable archive ID',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^MEDIA-[A-Z0-9-]+$/),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Profile', value: 'profile'},
          {title: 'Experience', value: 'experience'},
          {title: 'Project', value: 'project'},
          {title: 'Credential', value: 'credential'},
          {title: 'Document', value: 'document'},
          {title: 'Archive provenance', value: 'archive'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'localizedShortText'}),
    defineField({name: 'description', title: 'Description', type: 'localizedLongText'}),
    defineField({
      name: 'gallery',
      title: 'Public gallery',
      type: 'array',
      of: [defineArrayMember({type: 'approvedImage'})],
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: 'documents',
      title: 'Public documents',
      type: 'array',
      of: [defineArrayMember({type: 'approvedFile'})],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'sourceInventoryIds',
      title: 'Frozen source inventory IDs',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'relatedContentIds',
      title: 'Related public content IDs',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'safeDerivativeOf',
      title: 'Safe derivative source IDs',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'fileTypes',
      title: 'Represented file types',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'totalSourceBytes',
      title: 'Total source bytes represented',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).max(1000),
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {list: [{title: 'Public', value: 'public'}], layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publication',
      title: 'Publication review',
      type: 'publicationMetadata',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((document) => {
      if (!document || document.visibility !== 'public') return 'Media items must be public.'
      if (!readNonEmptyString(document.stableId)) return 'Media item requires a stable ID.'
      if (!hasLocalizedPair(document.title) || !hasLocalizedPair(document.description)) {
        return 'Media items require complete English and Indonesian presentation.'
      }
      return validateSafePublication(document.publication)
    }),
  orderings: [
    {
      title: 'Category and order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'category', media: 'gallery.0'},
  },
})
