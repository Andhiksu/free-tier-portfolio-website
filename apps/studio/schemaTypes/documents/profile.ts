import {defineArrayMember, defineField, defineType} from 'sanity'
import {
  hasEnglish,
  hasIndonesian,
  hasLocalizedPair,
  readNonEmptyString,
  validateVisibilityAndPublication,
} from '../validation'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Public name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({name: 'headline', title: 'Headline', type: 'localizedShortText'}),
    defineField({name: 'summary', title: 'Supporting summary', type: 'localizedLongText'}),
    defineField({
      name: 'allowEnglishFallback',
      title: 'Allow disclosed English fallback for supporting summary',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fallbackDisclosure',
      title: 'Visible fallback disclosure',
      type: 'localizedShortText',
      hidden: ({document}) => document?.allowEnglishFallback !== true,
    }),
    defineField({name: 'location', title: 'Public location', type: 'localizedShortText'}),
    defineField({name: 'availability', title: 'Availability', type: 'localizedShortText'}),
    defineField({name: 'portrait', title: 'Portrait', type: 'approvedImage'}),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [defineArrayMember({type: 'externalLink'})],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'resumeFiles',
      title: 'Approved public resume files',
      type: 'array',
      of: [defineArrayMember({type: 'approvedFile'})],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({name: 'contactNote', title: 'Public contact note', type: 'localizedLongText'}),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {
        list: [
          {title: 'Public', value: 'public'},
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
      if (!readNonEmptyString(document.name)) return 'Public profile requires a name.'
      if (!hasLocalizedPair(document.headline))
        return 'Public profile headline requires both locales.'
      if (!hasEnglish(document.summary)) return 'Public profile summary requires English.'
      if (!hasIndonesian(document.summary)) {
        if (document.allowEnglishFallback !== true)
          return 'Missing Indonesian summary requires explicit English fallback approval.'
        if (!hasIndonesian(document.fallbackDisclosure))
          return 'English fallback requires a visible Indonesian disclosure.'
      }
      return validateVisibilityAndPublication(document)
    }),
  preview: {select: {title: 'name'}},
})
