import {defineArrayMember, defineField, defineType} from 'sanity'

const englishField = (type: 'string' | 'text') =>
  defineField({
    name: 'en',
    title: 'English',
    type,
    rows: type === 'text' ? 5 : undefined,
    validation: (Rule) => Rule.required().min(1),
  })

const indonesianField = (type: 'string' | 'text') =>
  defineField({
    name: 'id',
    title: 'Indonesian',
    type,
    rows: type === 'text' ? 5 : undefined,
  })

export const localizedShortText = defineType({
  name: 'localizedShortText',
  title: 'Localized short text',
  type: 'object',
  fields: [englishField('string'), indonesianField('string')],
})

export const localizedLongText = defineType({
  name: 'localizedLongText',
  title: 'Localized long text',
  type: 'object',
  fields: [englishField('text'), indonesianField('text')],
})

const portableTextField = (name: 'en' | 'id', title: string, required: boolean) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'Heading 2', value: 'h2'},
          {title: 'Heading 3', value: 'h3'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
          annotations: [],
        },
      }),
    ],
    validation: required ? (Rule) => Rule.required().min(1) : undefined,
  })

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized portable text',
  type: 'object',
  fields: [portableTextField('en', 'English', true), portableTextField('id', 'Indonesian', false)],
})

export const localizedSlug = defineType({
  name: 'localizedSlug',
  title: 'Localized route identity',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English route identity',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Indonesian route identity',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const localizedAltText = defineType({
  name: 'localizedAltText',
  title: 'Localized alt text',
  type: 'object',
  fields: [englishField('string'), indonesianField('string')],
})

export const localizedCaption = defineType({
  name: 'localizedCaption',
  title: 'Localized caption',
  type: 'object',
  fields: [englishField('text'), indonesianField('text')],
})
