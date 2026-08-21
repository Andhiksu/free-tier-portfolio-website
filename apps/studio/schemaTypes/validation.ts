import type {ValidationContext} from 'sanity'

export const ASSET_VALIDATION_API_VERSION = '2026-07-14'
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const MAX_FILE_BYTES = 10 * 1024 * 1024

const allowedImageMimeTypes = new Set(['image/avif', 'image/jpeg', 'image/png', 'image/webp'])
const allowedFileMimeTypes = new Set(['application/pdf'])

export interface LocalizedStringValue {
  en?: unknown
  id?: unknown
}

interface PublicationValue {
  credit?: unknown
  ownership?: unknown
  privacyStatus?: unknown
  publicationApproved?: unknown
  redactionStatus?: unknown
  source?: unknown
}

interface AssetReferenceValue {
  _ref?: unknown
}

interface ManagedAssetValue {
  alt?: LocalizedStringValue
  asset?: AssetReferenceValue
  caption?: LocalizedStringValue
  credit?: unknown
  decorative?: unknown
  ownership?: unknown
  privacyStatus?: unknown
  publicationApproved?: unknown
  redactionStatus?: unknown
  source?: unknown
}

interface AssetMetadata {
  mimeType?: unknown
  size?: unknown
}

export function readNonEmptyString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export function hasEnglish(value: unknown): boolean {
  return Boolean(readNonEmptyString((value as LocalizedStringValue | undefined)?.en))
}

export function hasIndonesian(value: unknown): boolean {
  return Boolean(readNonEmptyString((value as LocalizedStringValue | undefined)?.id))
}

export function hasLocalizedPair(value: unknown): boolean {
  return hasEnglish(value) && hasIndonesian(value)
}

export function validateLocalizedPair(value: unknown, label: string): true | string {
  return hasLocalizedPair(value) || `${label} requires complete English and Indonesian values.`
}

export function validateLocalizedArray(
  value: unknown,
  label: string,
  minimum: number,
): true | string {
  if (!Array.isArray(value) || value.length < minimum) {
    return `${label} requires at least ${minimum} bilingual item${minimum === 1 ? '' : 's'}.`
  }

  return value.every(hasLocalizedPair) || `${label} requires English and Indonesian for every item.`
}

export function validateSafePublication(value: unknown): true | string {
  const publication = value as PublicationValue | undefined

  if (!publication || publication.publicationApproved !== true) {
    return 'Publication approval must be explicit before a record can be public.'
  }

  if (publication.privacyStatus !== 'public') {
    return 'Public records require privacy status “Public-safe”.'
  }

  if (!['notRequired', 'complete'].includes(String(publication.redactionStatus))) {
    return 'Public records require redaction to be not required or complete.'
  }

  if (!readNonEmptyString(publication.source)) {
    return 'A public source description is required.'
  }

  if (!readNonEmptyString(publication.ownership)) {
    return 'Ownership or source authority is required.'
  }

  if (!readNonEmptyString(publication.credit)) {
    return 'A public credit is required.'
  }

  return true
}

export function validateVisibilityAndPublication(document: unknown): true | string {
  const record = document as {publication?: unknown; visibility?: unknown} | undefined

  if (!record || record.visibility === 'hidden') {
    return true
  }

  return validateSafePublication(record.publication)
}

function readAssetReference(value: ManagedAssetValue | undefined): string | undefined {
  return readNonEmptyString(value?.asset?._ref)
}

async function readAssetMetadata(
  reference: string,
  context: ValidationContext,
): Promise<AssetMetadata | undefined> {
  return context
    .getClient({apiVersion: ASSET_VALIDATION_API_VERSION})
    .fetch<AssetMetadata | undefined>('*[_id == $id][0]{size, mimeType}', {id: reference})
}

export async function validateManagedAsset(
  value: unknown,
  context: ValidationContext,
  kind: 'file' | 'image',
): Promise<true | string> {
  const asset = value as ManagedAssetValue | undefined
  const reference = readAssetReference(asset)

  if (!reference) {
    return true
  }

  if (!readNonEmptyString(asset?.source) || !readNonEmptyString(asset?.ownership)) {
    return 'Stored assets require an explicit public source and ownership state.'
  }

  if (!readNonEmptyString(asset?.credit)) {
    return 'Stored assets require a public credit.'
  }

  if (asset?.privacyStatus !== 'public') {
    return 'Only public-safe assets may be stored in this public dataset.'
  }

  if (!['notRequired', 'complete'].includes(String(asset?.redactionStatus))) {
    return 'Stored assets require redaction to be not required or complete.'
  }

  if (asset?.publicationApproved !== true) {
    return 'Asset publication approval must be explicit; upload presence is not approval.'
  }

  if (kind === 'image' && asset?.decorative !== true && !hasLocalizedPair(asset?.alt)) {
    return 'Non-decorative images require complete English and Indonesian alt text.'
  }

  if (!hasLocalizedPair(asset?.caption)) {
    return 'Stored assets require complete English and Indonesian captions.'
  }

  const metadata = await readAssetMetadata(reference, context)
  const size = typeof metadata?.size === 'number' ? metadata.size : undefined
  const mimeType = readNonEmptyString(metadata?.mimeType)
  const allowedMimeTypes = kind === 'image' ? allowedImageMimeTypes : allowedFileMimeTypes
  const maximumBytes = kind === 'image' ? MAX_IMAGE_BYTES : MAX_FILE_BYTES

  if (!mimeType || !allowedMimeTypes.has(mimeType)) {
    return kind === 'image'
      ? 'Images must use AVIF, JPEG, PNG, or WebP.'
      : 'Files must be PDF documents.'
  }

  if (size === undefined || size > maximumBytes) {
    return `${kind === 'image' ? 'Images' : 'Files'} must not exceed ${maximumBytes / 1024 / 1024} MB.`
  }

  return true
}
