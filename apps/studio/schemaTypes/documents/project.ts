import {defineArrayMember, defineField, defineType} from 'sanity'
import {
  hasLocalizedPair,
  readNonEmptyString,
  validateLocalizedArray,
  validateVisibilityAndPublication,
} from '../validation'

export const project = defineType({
  name: 'project',
  title: 'Project direction',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localizedShortText'}),
    defineField({name: 'slug', title: 'Paired route identity', type: 'localizedSlug'}),
    defineField({name: 'category', title: 'Category', type: 'localizedShortText'}),
    defineField({name: 'summary', title: 'Summary', type: 'localizedLongText'}),
    defineField({name: 'direction', title: 'Direction', type: 'localizedLongText'}),
    defineField({
      name: 'focusPoints',
      title: 'Focus points',
      type: 'array',
      of: [defineArrayMember({type: 'localizedShortText'})],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'limitations',
      title: 'Limitations',
      type: 'array',
      of: [defineArrayMember({type: 'localizedLongText'})],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'evidenceDisclosure',
      title: 'Evidence disclosure',
      type: 'localizedLongText',
    }),
    defineField({
      name: 'externalLinks',
      title: 'Approved repository or demo links',
      type: 'array',
      of: [defineArrayMember({type: 'externalLink'})],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'gallery',
      title: 'Approved gallery',
      type: 'array',
      of: [defineArrayMember({type: 'approvedImage'})],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'documents',
      title: 'Approved documents',
      type: 'array',
      of: [defineArrayMember({type: 'approvedFile'})],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'evidence',
      title: 'Evidence',
      type: 'array',
      of: [defineArrayMember({type: 'evidenceMetadata'})],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'activities',
      title: 'Project activities',
      type: 'array',
      of: [defineArrayMember({type: 'projectActivity'})],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoSettings'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).max(1000),
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {
        list: [
          {title: 'Public direction', value: 'public'},
          {title: 'Hidden', value: 'hidden'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'publication', title: 'Publication review', type: 'publicationMetadata'}),
  ],
  validation: (Rule) =>
    Rule.custom((document) => {
      if (!document || document.visibility === 'hidden') return true
      for (const [value, label] of [
        [document.title, 'Title'],
        [document.summary, 'Summary'],
        [document.direction, 'Direction'],
        [document.evidenceDisclosure, 'Evidence disclosure'],
      ] as const) {
        if (!hasLocalizedPair(value))
          return `${label} requires complete English and Indonesian content.`
      }
      const slug = document.slug as {en?: {current?: unknown}; id?: {current?: unknown}} | undefined
      const englishSlug = readNonEmptyString(slug?.en?.current)
      const indonesianSlug = readNonEmptyString(slug?.id?.current)
      if (!englishSlug || !indonesianSlug || englishSlug !== indonesianSlug)
        return 'Project routes require matching English and Indonesian identities.'
      const focusValidation = validateLocalizedArray(document.focusPoints, 'Focus points', 3)
      if (focusValidation !== true) return focusValidation
      const limitationValidation = validateLocalizedArray(document.limitations, 'Limitations', 2)
      if (limitationValidation !== true) return limitationValidation
      return validateVisibilityAndPublication(document)
    }),
  orderings: [
    {
      title: 'Featured and order',
      name: 'featuredOrder',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {select: {title: 'title.en', subtitle: 'visibility'}},
})
