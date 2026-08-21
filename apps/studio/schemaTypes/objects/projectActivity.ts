import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasLocalizedPair, readNonEmptyString, validateSafePublication} from '../validation'

export const projectActivity = defineType({
  name: 'projectActivity',
  title: 'Project activity',
  type: 'object',
  fields: [
    defineField({
      name: 'stableId',
      title: 'Stable activity ID',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^PRJ-004-ACT-00[1-5]$/),
    }),
    defineField({name: 'organization', title: 'Organization', type: 'localizedShortText'}),
    defineField({name: 'theme', title: 'Theme', type: 'localizedShortText'}),
    defineField({name: 'role', title: 'Role', type: 'localizedShortText'}),
    defineField({name: 'description', title: 'Description', type: 'localizedLongText'}),
    defineField({
      name: 'gallery',
      title: 'Activity gallery',
      type: 'array',
      of: [defineArrayMember({type: 'approvedImage'})],
      validation: (Rule) => Rule.required().min(2).max(3),
    }),
    defineField({
      name: 'sourceInventoryIds',
      title: 'Frozen source inventory IDs',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).max(100),
    }),
    defineField({
      name: 'publication',
      title: 'Publication review',
      type: 'publicationMetadata',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || typeof value !== 'object') return 'Project activity is required.'
      const activity = value as Record<string, unknown>
      if (!readNonEmptyString(activity.stableId)) return 'Project activity requires a stable ID.'
      for (const [field, label] of [
        ['organization', 'Organization'],
        ['theme', 'Theme'],
        ['role', 'Role'],
        ['description', 'Description'],
      ] as const) {
        if (!hasLocalizedPair(activity[field])) {
          return `${label} requires complete English and Indonesian content.`
        }
      }
      return validateSafePublication(activity.publication)
    }),
  preview: {
    select: {title: 'organization.en', subtitle: 'theme.en'},
  },
})
