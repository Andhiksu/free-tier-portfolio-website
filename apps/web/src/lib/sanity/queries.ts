import type { CmsQueryClient, CmsRawRecords } from "./types.ts";

const PUBLICATION_PROJECTION = `{
  source,
  ownership,
  credit,
  privacyStatus,
  redactionStatus,
  publicationApproved
}`;

const EXTERNAL_LINK_PROJECTION = `{
  _key,
  label,
  url,
  source,
  ownership,
  credit,
  privacyStatus,
  redactionStatus,
  publicationApproved
}`;

const IMAGE_PROJECTION = `{
  _key,
  decorative,
  alt,
  caption,
  source,
  ownership,
  credit,
  privacyStatus,
  redactionStatus,
  publicationApproved,
  "asset": asset->{_id, url, mimeType, size, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
}`;

const CREDENTIAL_IMAGE_PROJECTION = `{
  _key,
  decorative,
  alt,
  caption,
  source,
  ownership,
  credit,
  privacyStatus,
  redactionStatus,
  publicationApproved,
  crop,
  hotspot,
  "asset": asset->{_id, url, mimeType, size, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
}`;

const FILE_PROJECTION = `{
  _key,
  caption,
  source,
  ownership,
  credit,
  privacyStatus,
  redactionStatus,
  publicationApproved,
  "asset": asset->{_id, url, mimeType, size, originalFilename}
}`;

const EVIDENCE_PROJECTION = `{
  _key,
  title,
  context,
  kind,
  "image": image${IMAGE_PROJECTION},
  "file": file${FILE_PROJECTION},
  "link": link${EXTERNAL_LINK_PROJECTION},
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const SITE_SETTINGS_QUERY = `*[
  _type == "siteSettings" &&
  !(_id in path("drafts.**"))
][0]{
  _id,
  siteTitle,
  siteDescription,
  navigation[]{key, label, enabled, order},
  sections[]{key, enabled, order},
  footer,
  seo{title, description, noIndex},
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const PROFILE_QUERY = `*[
  _type == "profile" &&
  !(_id in path("drafts.**")) &&
  visibility == "public"
][0]{
  _id,
  name,
  headline,
  summary,
  allowEnglishFallback,
  fallbackDisclosure,
  location,
  "portrait": portrait${IMAGE_PROJECTION},
  "socialLinks": socialLinks[]${EXTERNAL_LINK_PROJECTION},
  "resumeFiles": resumeFiles[]${FILE_PROJECTION},
  contactNote,
  visibility,
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const EXPERIENCE_QUERY = `*[
  _type == "experience" &&
  !(_id in path("drafts.**")) &&
  visibility in ["public", "unavailable"]
] | order(featured desc, order asc){
  _id,
  role,
  organization,
  employmentType,
  startDate,
  endDate,
  location,
  summary,
  responsibilities,
  achievements,
  skills,
  "evidence": evidence[]${EVIDENCE_PROJECTION},
  featured,
  order,
  visibility,
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const PROJECT_QUERY = `*[
  _type == "project" &&
  !(_id in path("drafts.**")) &&
  visibility == "public"
] | order(featured desc, order asc){
  _id,
  title,
  "slug": {"en": slug.en.current, "id": slug.id.current},
  category,
  summary,
  direction,
  focusPoints,
  limitations,
  evidenceDisclosure,
  "externalLinks": externalLinks[]${EXTERNAL_LINK_PROJECTION},
  "gallery": gallery[]${IMAGE_PROJECTION},
  "documents": documents[]${FILE_PROJECTION},
  "evidence": evidence[]${EVIDENCE_PROJECTION},
  activities[]{
    stableId,
    organization,
    theme,
    role,
    description,
    sourceInventoryIds,
    order,
    "gallery": gallery[]${IMAGE_PROJECTION},
    "publication": publication${PUBLICATION_PROJECTION}
  },
  featured,
  order,
  visibility,
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const CREDENTIAL_QUERY = `*[
  _type == "credential" &&
  !(_id in path("drafts.**")) &&
  visibility in ["public", "unavailable"]
] | order(featured desc, order asc){
  _id,
  name,
  issuer,
  issueDate,
  expirationDate,
  credentialId,
  "verificationLink": verificationLink${EXTERNAL_LINK_PROJECTION},
  summary,
  skills,
  "image": image${CREDENTIAL_IMAGE_PROJECTION},
  "issuerLogo": issuerLogo${CREDENTIAL_IMAGE_PROJECTION},
  "gallery": gallery[]${CREDENTIAL_IMAGE_PROJECTION},
  "file": file${FILE_PROJECTION},
  featured,
  order,
  visibility,
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const MEDIA_QUERY = `*[
  _type == "mediaItem" &&
  !(_id in path("drafts.**")) &&
  visibility == "public"
] | order(category asc, order asc){
  _id,
  stableId,
  category,
  title,
  description,
  "gallery": gallery[]${IMAGE_PROJECTION},
  "documents": documents[]${FILE_PROJECTION},
  sourceInventoryIds,
  relatedContentIds,
  safeDerivativeOf,
  fileTypes,
  totalSourceBytes,
  order,
  visibility,
  "publication": publication${PUBLICATION_PROJECTION}
}`;

export const PUBLISHED_FETCH_OPTIONS = {
  perspective: "published",
} as const;

const EMPTY_PARAMS: Record<string, never> = {};

export async function fetchPublishedCmsRecords(
  client: CmsQueryClient,
): Promise<CmsRawRecords> {
  const [
    siteSettings,
    profile,
    experiences,
    projects,
    credentials,
    mediaItems,
  ] = await Promise.all([
    client.fetch<CmsRawRecords["siteSettings"]>(
      SITE_SETTINGS_QUERY,
      EMPTY_PARAMS,
      PUBLISHED_FETCH_OPTIONS,
    ),
    client.fetch<CmsRawRecords["profile"]>(
      PROFILE_QUERY,
      EMPTY_PARAMS,
      PUBLISHED_FETCH_OPTIONS,
    ),
    client.fetch<CmsRawRecords["experiences"]>(
      EXPERIENCE_QUERY,
      EMPTY_PARAMS,
      PUBLISHED_FETCH_OPTIONS,
    ),
    client.fetch<CmsRawRecords["projects"]>(
      PROJECT_QUERY,
      EMPTY_PARAMS,
      PUBLISHED_FETCH_OPTIONS,
    ),
    client.fetch<CmsRawRecords["credentials"]>(
      CREDENTIAL_QUERY,
      EMPTY_PARAMS,
      PUBLISHED_FETCH_OPTIONS,
    ),
    client.fetch<CmsRawRecords["mediaItems"]>(
      MEDIA_QUERY,
      EMPTY_PARAMS,
      PUBLISHED_FETCH_OPTIONS,
    ),
  ]);

  return {
    siteSettings,
    profile,
    experiences,
    projects,
    credentials,
    mediaItems,
  };
}
