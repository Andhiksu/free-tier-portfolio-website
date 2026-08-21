import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasLocalizedPair, readNonEmptyString, validateVisibilityAndPublication} from '../validation'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({name: 'role', title: 'Role or availability label', type: 'localizedShortText'}),
    defineField({name: 'organization', title: 'Organization', type: 'string'}),
    defineField({name: 'employmentType', title: 'Employment type', type: 'string'}),
    defineField({name: 'startDate', title: 'Start date', type: 'date'}),
    defineField({name: 'endDate', title: 'End date', type: 'date'}),
    defineField({name: 'location', title: 'Location', type: 'localizedShortText'}),
    defineField({name: 'summary', title: 'Summary', type: 'localizedLongText'}),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [defineArrayMember({type: 'localizedLongText'})],
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [defineArrayMember({type: 'localizedLongText'})],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'evidence',
      title: 'Evidence',
      type: 'array',
      of: [defineArrayMember({type: 'evidenceMetadata'})],
    }),
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
          {title: 'Public detail', value: 'public'},
          {title: 'Explicitly unavailable', value: 'unavailable'},
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
      if (!hasLocalizedPair(document.role) || !hasLocalizedPair(document.summary))
        return 'Visible experience states require bilingual role and summary.'
      if (document.visibility === 'public' && !readNonEmptyString(document.organization))
        return 'Public experience details require an organization.'
      return validateVisibilityAndPublication(document)
    }),
  orderings: [
    {title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'role.en', subtitle: 'visibility'}},
})
