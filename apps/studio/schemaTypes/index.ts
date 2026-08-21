import type {SchemaTypeDefinition} from 'sanity'
import {credential} from './documents/credential'
import {experience} from './documents/experience'
import {profile} from './documents/profile'
import {project} from './documents/project'
import {mediaItem} from './documents/mediaItem'
import {siteSettings} from './documents/siteSettings'
import {
  localizedAltText,
  localizedCaption,
  localizedLongText,
  localizedPortableText,
  localizedShortText,
  localizedSlug,
} from './objects/localized'
import {
  approvedFile,
  approvedImage,
  evidenceMetadata,
  externalLink,
  navigationItem,
  publicationMetadata,
  sectionControl,
  seoSettings,
} from './objects/publishing'
import {projectActivity} from './objects/projectActivity'

export const schemaTypes: SchemaTypeDefinition[] = [
  localizedShortText,
  localizedLongText,
  localizedPortableText,
  localizedSlug,
  localizedAltText,
  localizedCaption,
  publicationMetadata,
  externalLink,
  approvedImage,
  approvedFile,
  evidenceMetadata,
  seoSettings,
  navigationItem,
  sectionControl,
  projectActivity,
  siteSettings,
  profile,
  experience,
  project,
  credential,
  mediaItem,
]
