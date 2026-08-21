import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasLocalizedPair, validateSafePublication} from '../validation'

const requiredNavigationKeys = ['home', 'about', 'experience', 'projects', 'credentials', 'contact']

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site title', type: 'localizedShortText'}),
    defineField({name: 'siteDescription', title: 'Site description', type: 'localizedLongText'}),
    defineField({
      name: 'navigation',
      title: 'Primary navigation',
      type: 'array',
      of: [defineArrayMember({type: 'navigationItem'})],
      validation: (Rule) => Rule.required().length(requiredNavigationKeys.length).unique(),
    }),
    defineField({
      name: 'sections',
      title: 'Homepage sections',
      description: 'Bounded enablement and order only; this is not a page builder.',
      type: 'array',
      of: [defineArrayMember({type: 'sectionControl'})],
      validation: (Rule) => Rule.required().min(1).max(5).unique(),
    }),
    defineField({name: 'footer', title: 'Footer copy', type: 'localizedLongText'}),
    defineField({name: 'seo', title: 'Default SEO', type: 'seoSettings'}),
    defineField({name: 'publication', title: 'Publication review', type: 'publicationMetadata'}),
  ],
  validation: (Rule) =>
    Rule.custom((document) => {
      if (!document) return true
      if (!hasLocalizedPair(document.siteTitle))
        return 'Site title must be complete in English and Indonesian.'
      if (!hasLocalizedPair(document.siteDescription))
        return 'Site description must be complete in English and Indonesian.'
      if (!hasLocalizedPair(document.footer))
        return 'Footer copy must be complete in English and Indonesian.'
      const navigation = Array.isArray(document.navigation) ? document.navigation : []
      const keys = new Set(navigation.map((item) => item?.key))
      if (!requiredNavigationKeys.every((key) => keys.has(key)))
        return 'Navigation must contain every bounded destination exactly once.'
      if (!navigation.every((item) => hasLocalizedPair(item?.label)))
        return 'Every navigation label must be complete in English and Indonesian.'
      return validateSafePublication(document.publication)
    }),
  preview: {prepare: () => ({title: 'Site settings'})},
})
