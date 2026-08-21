import {defineArrayMember, defineField, defineType} from 'sanity'
import {hasLocalizedPair, readNonEmptyString, validateVisibilityAndPublication} from '../validation'

interface CredentialImageValue {
  asset?: {_ref?: unknown}
  decorative?: unknown
}

function readAssetReference(value: CredentialImageValue | undefined): string | undefined {
  return readNonEmptyString(value?.asset?._ref)
}

function validateCredentialGallery(document: unknown): true | string {
  const record = document as {gallery?: unknown; image?: CredentialImageValue} | undefined
  const gallery = record?.gallery

  if (gallery === undefined) return true
  if (!Array.isArray(gallery)) return 'Credential gallery must be an ordered image array.'
  if (gallery.length > 8) return 'Credential gallery supports at most eight images.'

  const primaryReference = readAssetReference(record?.image)
  const references = new Set<string>()

  for (const [index, item] of gallery.entries()) {
    const image = item as CredentialImageValue | undefined
    if (image?.decorative !== false) {
      return `Credential gallery image ${index + 1} must be explicitly non-decorative.`
    }

    const reference = readAssetReference(image)
    if (!reference) continue
    if (reference === primaryReference) {
      return 'Credential gallery must not repeat the primary preview asset.'
    }
    if (references.has(reference)) {
      return 'Credential gallery must not repeat the same asset.'
    }
    references.add(reference)
  }

  return true
}

export const credential = defineType({
  name: 'credential',
  title: 'Credential',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name or availability label', type: 'localizedShortText'}),
    defineField({name: 'issuer', title: 'Issuer', type: 'string'}),
    defineField({name: 'issueDate', title: 'Issue date', type: 'date'}),
    defineField({name: 'expirationDate', title: 'Expiration date', type: 'date'}),
    defineField({name: 'credentialId', title: 'Public credential ID', type: 'string'}),
    defineField({name: 'verificationLink', title: 'Verification link', type: 'externalLink'}),
    defineField({name: 'summary', title: 'Summary', type: 'localizedLongText'}),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'image', title: 'Approved credential image', type: 'approvedImage'}),
    defineField({name: 'issuerLogo', title: 'Approved issuer logo', type: 'approvedImage'}),
    defineField({
      name: 'gallery',
      title: 'Approved credential gallery',
      type: 'array',
      of: [defineArrayMember({type: 'approvedImage'})],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({name: 'file', title: 'Approved credential PDF', type: 'approvedFile'}),
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
          {title: 'Public credential', value: 'public'},
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
      const galleryValidation = validateCredentialGallery(document)
      if (galleryValidation !== true) return galleryValidation
      if (!document || document.visibility === 'hidden') return true
      if (!hasLocalizedPair(document.name) || !hasLocalizedPair(document.summary))
        return 'Visible credential states require bilingual name and summary without fallback.'
      if (document.visibility === 'public' && !readNonEmptyString(document.issuer))
        return 'Public credentials require an issuer.'
      return validateVisibilityAndPublication(document)
    }),
  orderings: [
    {title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'name.en', subtitle: 'visibility'}},
})
