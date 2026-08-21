import {defineArrayMember, defineField, defineType} from 'sanity'
import {validateManagedAsset, validateSafePublication} from '../validation'

const ownershipOptions = [
  {title: 'Owned by portfolio author', value: 'owned'},
  {title: 'Public source with permission', value: 'publicSource'},
  {title: 'Third-party publication approved', value: 'thirdPartyApproved'},
]

const privacyOptions = [
  {title: 'Public-safe', value: 'public'},
  {title: 'Review required: do not store in public dataset', value: 'reviewRequired'},
  {title: 'Private: do not store in public dataset', value: 'private'},
]

const redactionOptions = [
  {title: 'Not required', value: 'notRequired'},
  {title: 'Complete', value: 'complete'},
  {title: 'Required: not publishable', value: 'required'},
]

const publicationFields = [
  defineField({
    name: 'source',
    title: 'Public source description',
    type: 'string',
    validation: (Rule) => Rule.required().min(3),
  }),
  defineField({
    name: 'ownership',
    title: 'Ownership or authority',
    type: 'string',
    options: {list: ownershipOptions, layout: 'radio'},
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'credit',
    title: 'Public credit',
    type: 'string',
    validation: (Rule) => Rule.required().min(2),
  }),
  defineField({
    name: 'privacyStatus',
    title: 'Privacy status',
    type: 'string',
    options: {list: privacyOptions, layout: 'radio'},
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'redactionStatus',
    title: 'Redaction status',
    type: 'string',
    options: {list: redactionOptions, layout: 'radio'},
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'publicationApproved',
    title: 'Approved for public publication',
    type: 'boolean',
    initialValue: false,
    validation: (Rule) => Rule.required(),
  }),
]

export const publicationMetadata = defineType({
  name: 'publicationMetadata',
  title: 'Publication and privacy review',
  type: 'object',
  fields: publicationFields,
  validation: (Rule) => Rule.custom(validateSafePublication),
})

export const externalLink = defineType({
  name: 'externalLink',
  title: 'Approved external link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'localizedShortText'}),
    defineField({
      name: 'url',
      title: 'HTTPS URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['https']}),
    }),
    ...publicationFields,
  ],
  validation: (Rule) => Rule.custom(validateSafePublication),
})

const managedAssetFields = [
  defineField({name: 'alt', title: 'Alt text', type: 'localizedAltText'}),
  defineField({name: 'caption', title: 'Caption', type: 'localizedCaption'}),
  ...publicationFields,
]

export const approvedImage = defineType({
  name: 'approvedImage',
  title: 'Publication-gated image',
  type: 'image',
  options: {hotspot: true, accept: 'image/avif,image/jpeg,image/png,image/webp'},
  fields: [
    defineField({
      name: 'decorative',
      title: 'Decorative image',
      type: 'boolean',
      initialValue: false,
    }),
    ...managedAssetFields,
  ],
  validation: (Rule) =>
    Rule.custom((value, context) => validateManagedAsset(value, context, 'image')),
})

export const approvedFile = defineType({
  name: 'approvedFile',
  title: 'Publication-gated PDF',
  type: 'file',
  options: {accept: 'application/pdf'},
  fields: managedAssetFields.filter((field) => field.name !== 'alt'),
  validation: (Rule) =>
    Rule.custom((value, context) => validateManagedAsset(value, context, 'file')),
})

export const evidenceMetadata = defineType({
  name: 'evidenceMetadata',
  title: 'Publication-gated evidence',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localizedShortText'}),
    defineField({name: 'context', title: 'Context', type: 'localizedLongText'}),
    defineField({
      name: 'kind',
      title: 'Evidence type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'PDF', value: 'file'},
          {title: 'External link', value: 'link'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'approvedImage',
      hidden: ({parent}) => parent?.kind !== 'image',
    }),
    defineField({
      name: 'file',
      title: 'PDF',
      type: 'approvedFile',
      hidden: ({parent}) => parent?.kind !== 'file',
    }),
    defineField({
      name: 'link',
      title: 'External link',
      type: 'externalLink',
      hidden: ({parent}) => parent?.kind !== 'link',
    }),
    defineField({
      name: 'publication',
      title: 'Evidence publication review',
      type: 'publicationMetadata',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || typeof value !== 'object') return true
      const evidence = value as {
        kind?: string
        image?: unknown
        file?: unknown
        link?: unknown
        publication?: unknown
      }
      const selectedAsset =
        evidence.kind === 'image'
          ? evidence.image
          : evidence.kind === 'file'
            ? evidence.file
            : evidence.link
      if (!selectedAsset) return 'Evidence requires the asset type selected above.'
      return validateSafePublication(evidence.publication)
    }),
})

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO settings',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localizedShortText'}),
    defineField({name: 'description', title: 'Description', type: 'localizedLongText'}),
    defineField({name: 'noIndex', title: 'Prevent indexing', type: 'boolean', initialValue: false}),
  ],
})

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation item',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Destination',
      type: 'string',
      options: {
        list: ['home', 'about', 'experience', 'projects', 'credentials', 'contact'].map(
          (value) => ({
            title: value[0].toUpperCase() + value.slice(1),
            value,
          }),
        ),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'label', title: 'Label', type: 'localizedShortText'}),
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).max(100),
    }),
  ],
})

export const sectionControl = defineType({
  name: 'sectionControl',
  title: 'Bounded section control',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Section',
      type: 'string',
      options: {
        list: ['about', 'experience', 'projects', 'credentials', 'contact'].map((value) => ({
          title: value[0].toUpperCase() + value.slice(1),
          value,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true}),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).max(100),
    }),
  ],
})

export const localizedList = defineType({
  name: 'localizedList',
  title: 'Localized list',
  type: 'array',
  of: [defineArrayMember({type: 'localizedShortText'})],
})
