import type { ProjectSlug } from "../../types/projects";
import type {
  DocumentPresentation,
  ExternalResourceKind,
  ExternalResourcePresentation,
  ManagedImagePresentation,
  RelatedContentPresentation,
} from "../../types/media";
import type { WorkspaceDestination } from "../routes";
import type {
  CmsManagedSectionKey,
  LocalizedText,
  RawCredential,
  RawExperience,
  RawMediaItem,
  RawProfile,
  RawProject,
  RawSiteSettings,
  ValidatedCredential,
  ValidatedExperience,
  ValidatedMediaItem,
  ValidatedNavigationItem,
  ValidatedProfile,
  ValidatedProject,
  ValidatedSectionControl,
  ValidatedSiteSettings,
  ValidationResult,
} from "./types.ts";

const WORKSPACE_DESTINATIONS = [
  "home",
  "about",
  "experience",
  "projects",
  "credentials",
  "contact",
] as const satisfies readonly WorkspaceDestination[];

const MANAGED_SECTION_KEYS = [
  "about",
  "experience",
  "projects",
  "credentials",
  "contact",
] as const satisfies readonly CmsManagedSectionKey[];

export const CMS_PROJECT_SLUGS = [
  "analytics-decision-support",
  "language-text-intelligence",
  "computer-vision-applied-ai",
  "digital-media-analytics-training-initiative",
] as const satisfies readonly ProjectSlug[];

const MEDIA_CATEGORIES = [
  "profile",
  "experience",
  "project",
  "credential",
  "document",
  "archive",
] as const;

const PROJECT_FOUR_ACTIVITY_IDS = [
  "PRJ-004-ACT-001",
  "PRJ-004-ACT-002",
  "PRJ-004-ACT-003",
  "PRJ-004-ACT-004",
  "PRJ-004-ACT-005",
] as const;

const MEDIA_LIBRARY_STABLE_IDS = [
  "MEDIA-PROFILE-AND-RESUME",
  "MEDIA-CREDENTIAL-CERTIFICATIONS",
  "MEDIA-CREDENTIAL-EDUCATION",
  "MEDIA-CREDENTIAL-HONORS",
  "MEDIA-EXPERIENCE-BUSINESS",
  "MEDIA-EXPERIENCE-ENGINEERING",
  "MEDIA-EXPERIENCE-PRODUCTION",
  "MEDIA-PROJECT-DIGITAL-TRAINING",
  "MEDIA-PROJECT-DATA-AI",
  "MEDIA-ARCHIVE-PROVENANCE",
] as const;

const FROZEN_SOURCE_IDS = Array.from(
  { length: 482 },
  (_, index) => `AST-${String(index + 1).padStart(4, "0")}`,
);

function frozenSourceRange(...ranges: readonly [number, number][]): string[] {
  return ranges.flatMap(([start, end]) =>
    Array.from(
      { length: end - start + 1 },
      (_, index) => `AST-${String(start + index).padStart(4, "0")}`,
    ),
  );
}

const MEDIA_SOURCE_IDS_BY_STABLE_ID: Readonly<
  Record<string, readonly string[]>
> = {
  "MEDIA-PROFILE-AND-RESUME": frozenSourceRange([414, 419]),
  "MEDIA-CREDENTIAL-CERTIFICATIONS": frozenSourceRange([3, 58]),
  "MEDIA-CREDENTIAL-EDUCATION": frozenSourceRange([60, 78]),
  "MEDIA-CREDENTIAL-HONORS": frozenSourceRange([79, 104]),
  "MEDIA-EXPERIENCE-BUSINESS": frozenSourceRange([262, 272]),
  "MEDIA-EXPERIENCE-ENGINEERING": frozenSourceRange([274, 282]),
  "MEDIA-EXPERIENCE-PRODUCTION": frozenSourceRange([380, 411]),
  "MEDIA-PROJECT-DIGITAL-TRAINING": frozenSourceRange([421, 444]),
  "MEDIA-PROJECT-DATA-AI": frozenSourceRange([420, 420], [445, 479]),
  "MEDIA-ARCHIVE-PROVENANCE": frozenSourceRange(
    [1, 2],
    [59, 59],
    [105, 261],
    [273, 273],
    [283, 379],
    [412, 413],
    [480, 482],
  ),
};

const SAFE_OWNERSHIP = new Set(["owned", "publicSource", "thirdPartyApproved"]);
const SAFE_REDACTION = new Set(["notRequired", "complete"]);
const SUPPORTED_IMAGE_MIME_TYPES = [
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
type SupportedImageMimeType = (typeof SUPPORTED_IMAGE_MIME_TYPES)[number];
const MAX_IMAGE_ASSET_BYTES = 5 * 1024 * 1024;
const MAX_FILE_ASSET_BYTES = 10 * 1024 * 1024;

function isSupportedImageMimeType(
  value: string | undefined,
): value is SupportedImageMimeType {
  return SUPPORTED_IMAGE_MIME_TYPES.some((candidate) => candidate === value);
}

function success<Value>(value: Value): ValidationResult<Value> {
  return { ok: true, value };
}

function failure<Value>(reason: string): ValidationResult<Value> {
  return { ok: false, reason };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const candidate = value.trim();
  return candidate ? candidate : undefined;
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function readOrder(value: unknown): number | undefined {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 1000
    ? Number(value)
    : undefined;
}

function readLocalizedText(
  value: unknown,
  label: string,
): ValidationResult<LocalizedText> {
  if (!isRecord(value)) return failure(`${label} must be a localized object.`);

  const en = readString(value.en);
  const id = readString(value.id);
  if (!en || !id) return failure(`${label} requires English and Indonesian.`);

  return success({ en, id });
}

function readStringList(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.map(readString).filter((item): item is string => Boolean(item));
}

function readLocalizedArray(
  value: unknown,
  label: string,
): ValidationResult<readonly LocalizedText[]> {
  if (!Array.isArray(value)) return success([]);
  const items: LocalizedText[] = [];
  for (const [index, item] of value.entries()) {
    const localized = readLocalizedText(item, `${label} ${index + 1}`);
    if (!localized.ok) return localized;
    items.push(localized.value);
  }
  return success(items);
}

function formatFileSize(size: number): string {
  return size >= 1024 * 1024
    ? `${(size / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(size / 1024))} KB`;
}

function readManagedImage(
  value: unknown,
  label: string,
): ValidationResult<Readonly<Record<"en" | "id", ManagedImagePresentation>>> {
  if (!isRecord(value)) return failure(`${label} is malformed.`);
  const publication = validateSafePublication(value);
  if (!publication.ok) return publication;
  const alt = readLocalizedText(value.alt, `${label} alt text`);
  const caption = readLocalizedText(value.caption, `${label} caption`);
  if (!alt.ok) return alt;
  if (!caption.ok) return caption;
  if (!isRecord(value.asset))
    return failure(`${label} asset metadata is missing.`);
  const id = readString(value.asset._id);
  const url = readString(value.asset.url);
  const mimeType = readString(value.asset.mimeType);
  const size = Number(value.asset.size);
  const width = Number(value.asset.width);
  const height = Number(value.asset.height);
  if (
    !id ||
    !url?.startsWith("https://cdn.sanity.io/images/") ||
    !isSupportedImageMimeType(mimeType) ||
    !Number.isInteger(size) ||
    size <= 0 ||
    size > MAX_IMAGE_ASSET_BYTES ||
    !Number.isInteger(width) ||
    width <= 0 ||
    !Number.isInteger(height) ||
    height <= 0
  ) {
    return failure(`${label} asset metadata is not publication-safe.`);
  }
  const responsiveWidths = [480, 960, 1600].filter(
    (candidate) => candidate < width,
  );
  if (!responsiveWidths.includes(width)) responsiveWidths.push(width);
  const hotspot = isRecord(value.hotspot) ? value.hotspot : undefined;
  const hotspotX = Number(hotspot?.x);
  const hotspotY = Number(hotspot?.y);
  const focalPoint =
    Number.isFinite(hotspotX) &&
    hotspotX >= 0 &&
    hotspotX <= 1 &&
    Number.isFinite(hotspotY) &&
    hotspotY >= 0 &&
    hotspotY <= 1
      ? { x: hotspotX * 100, y: hotspotY * 100 }
      : undefined;
  const shared = {
    id,
    availability: "available" as const,
    publicationApproved: true,
    source: {
      kind: "managed" as const,
      src: url,
      width,
      height,
      mimeType,
    },
    responsiveVariants: responsiveWidths.map((variantWidth) => ({
      src: `${url}?w=${variantWidth}&fit=max&auto=format`,
      width: variantWidth,
      height: Math.round((variantWidth / width) * height),
    })),
    sizes: "(min-width: 64rem) 42rem, 92vw",
    credit: readString(value.credit),
    decorative: value.decorative === true,
    focalPoint,
  };
  return success({
    en: { ...shared, alt: alt.value.en, caption: caption.value.en },
    id: { ...shared, alt: alt.value.id, caption: caption.value.id },
  });
}

function readManagedFile(
  value: unknown,
  label: string,
): ValidationResult<Readonly<Record<"en" | "id", DocumentPresentation>>> {
  if (!isRecord(value)) return failure(`${label} is malformed.`);
  const publication = validateSafePublication(value);
  if (!publication.ok) return publication;
  const caption = readLocalizedText(value.caption, `${label} caption`);
  if (!caption.ok) return caption;
  if (!isRecord(value.asset))
    return failure(`${label} asset metadata is missing.`);
  const id = readString(value.asset._id);
  const url = readString(value.asset.url);
  const mimeType = readString(value.asset.mimeType);
  const size = Number(value.asset.size);
  if (
    !id ||
    !url?.startsWith("https://cdn.sanity.io/files/") ||
    mimeType !== "application/pdf" ||
    !Number.isInteger(size) ||
    size <= 0 ||
    size > MAX_FILE_ASSET_BYTES
  ) {
    return failure(`${label} asset metadata is not publication-safe.`);
  }
  const create = (locale: "en" | "id"): DocumentPresentation => ({
    id,
    availability: "available",
    publicationApproved: true,
    title: caption.value[locale],
    description: caption.value[locale],
    href: url,
    fileType: "PDF",
    fileSizeLabel: formatFileSize(size),
  });
  return success({ en: create("en"), id: create("id") });
}

function readExternalResource(
  value: unknown,
  label: string,
): ValidationResult<
  Readonly<Record<"en" | "id", ExternalResourcePresentation>>
> {
  if (!isRecord(value)) return failure(`${label} is malformed.`);
  const publication = validateSafePublication(value);
  if (!publication.ok) return publication;
  const localizedLabel = readLocalizedText(value.label, `${label} label`);
  const url = readString(value.url);
  if (!localizedLabel.ok) return localizedLabel;
  if (!url) return failure(`${label} URL is missing.`);
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return failure(`${label} URL is invalid.`);
  }
  if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
    return failure(`${label} URL is unsafe.`);
  }
  const kind: ExternalResourceKind =
    parsed.hostname === "github.com"
      ? "repository"
      : ["youtube.com", "www.youtube.com", "youtu.be"].includes(parsed.hostname)
        ? "video"
        : "verification";
  const create = (locale: "en" | "id"): ExternalResourcePresentation => ({
    id: `${kind}-${parsed.hostname}-${parsed.pathname}`,
    availability: "available",
    publicationApproved: true,
    kind,
    title: localizedLabel.value[locale],
    href: url,
    generatedPoster: kind === "video",
  });
  return success({ en: create("en"), id: create("id") });
}

function readEvidencePresentation(value: unknown): ValidationResult<{
  gallery: Readonly<Record<"en" | "id", readonly ManagedImagePresentation[]>>;
  resources: Readonly<
    Record<"en" | "id", readonly ExternalResourcePresentation[]>
  >;
}> {
  if (!Array.isArray(value))
    return success({
      gallery: { en: [], id: [] },
      resources: { en: [], id: [] },
    });
  const gallery = {
    en: [] as ManagedImagePresentation[],
    id: [] as ManagedImagePresentation[],
  };
  const resources = {
    en: [] as ExternalResourcePresentation[],
    id: [] as ExternalResourcePresentation[],
  };
  for (const [index, evidence] of value.entries()) {
    if (!isRecord(evidence))
      return failure(`Evidence ${index + 1} is malformed.`);
    const publication = validateSafePublication(evidence.publication);
    if (!publication.ok) return publication;
    if (evidence.kind === "image") {
      const image = readManagedImage(
        evidence.image,
        `Evidence image ${index + 1}`,
      );
      if (!image.ok) return image;
      gallery.en.push(image.value.en);
      gallery.id.push(image.value.id);
    } else if (evidence.kind === "link") {
      const resource = readExternalResource(
        evidence.link,
        `Evidence link ${index + 1}`,
      );
      if (!resource.ok) return resource;
      resources.en.push(resource.value.en);
      resources.id.push(resource.value.id);
    }
  }
  return success({ gallery, resources });
}

function readImageArray(value: unknown, label: string) {
  if (!Array.isArray(value)) return success({ en: [], id: [] } as const);
  const result = {
    en: [] as ManagedImagePresentation[],
    id: [] as ManagedImagePresentation[],
  };
  for (const [index, item] of value.entries()) {
    const image = readManagedImage(item, `${label} ${index + 1}`);
    if (!image.ok) return image;
    result.en.push(image.value.en);
    result.id.push(image.value.id);
  }
  return success(result);
}

function readCredentialGallery(
  value: unknown,
  primaryPreviewId: string | undefined,
): Readonly<Record<"en" | "id", readonly ManagedImagePresentation[]>> {
  const empty = { en: [], id: [] } as const;
  if (value === undefined || value === null) return empty;
  if (!Array.isArray(value) || value.length > 8) return empty;

  const result = {
    en: [] as ManagedImagePresentation[],
    id: [] as ManagedImagePresentation[],
  };
  const references = new Set<string>();

  for (const [index, item] of value.entries()) {
    if (!isRecord(item) || item.decorative !== false) return empty;
    const image = readManagedImage(
      item,
      `Credential gallery image ${index + 1}`,
    );
    if (!image.ok) return empty;

    const reference = image.value.en.id;
    if (reference === primaryPreviewId || references.has(reference))
      return empty;
    references.add(reference);
    result.en.push(image.value.en);
    result.id.push(image.value.id);
  }

  return result;
}

function readFileArray(value: unknown, label: string) {
  if (!Array.isArray(value)) return success({ en: [], id: [] } as const);
  const result = {
    en: [] as DocumentPresentation[],
    id: [] as DocumentPresentation[],
  };
  for (const [index, item] of value.entries()) {
    const file = readManagedFile(item, `${label} ${index + 1}`);
    if (!file.ok) return file;
    result.en.push(file.value.en);
    result.id.push(file.value.id);
  }
  return success(result);
}

function readExternalArray(value: unknown, label: string) {
  if (!Array.isArray(value)) return success({ en: [], id: [] } as const);
  const result = {
    en: [] as ExternalResourcePresentation[],
    id: [] as ExternalResourcePresentation[],
  };
  for (const [index, item] of value.entries()) {
    const resource = readExternalResource(item, `${label} ${index + 1}`);
    if (!resource.ok) return resource;
    result.en.push(resource.value.en);
    result.id.push(resource.value.id);
  }
  return success(result);
}

function validateSafePublication(value: unknown): ValidationResult<true> {
  if (!isRecord(value)) return failure("Publication metadata is missing.");

  if (!readString(value.source) || !readString(value.credit)) {
    return failure("Publication source and credit are required.");
  }

  if (!SAFE_OWNERSHIP.has(String(value.ownership))) {
    return failure("Publication ownership is not approved.");
  }

  if (value.privacyStatus !== "public") {
    return failure("Only public-safe records may be rendered.");
  }

  if (!SAFE_REDACTION.has(String(value.redactionStatus))) {
    return failure("Record redaction is incomplete.");
  }

  if (value.publicationApproved !== true) {
    return failure("Record lacks explicit publication approval.");
  }

  return success(true);
}

function readNavigation(
  value: unknown,
): ValidationResult<readonly ValidatedNavigationItem[]> {
  if (!Array.isArray(value) || value.length !== WORKSPACE_DESTINATIONS.length) {
    return failure("Navigation must contain every bounded destination.");
  }

  const items: ValidatedNavigationItem[] = [];
  const keys = new Set<string>();

  for (const rawItem of value) {
    if (!isRecord(rawItem)) return failure("Navigation item is malformed.");
    const key = readString(rawItem.key);
    if (
      !key ||
      !WORKSPACE_DESTINATIONS.includes(
        key as (typeof WORKSPACE_DESTINATIONS)[number],
      )
    ) {
      return failure("Navigation destination is unsupported.");
    }
    if (keys.has(key))
      return failure("Navigation destinations must be unique.");

    const label = readLocalizedText(rawItem.label, `Navigation label (${key})`);
    const enabled = readBoolean(rawItem.enabled);
    const order = readOrder(rawItem.order);
    if (!label.ok) return label;
    if (enabled === undefined || order === undefined) {
      return failure(
        "Navigation controls require boolean visibility and numeric order.",
      );
    }

    keys.add(key);
    items.push({
      key: key as WorkspaceDestination,
      label: label.value,
      enabled,
      order,
    });
  }

  if (!WORKSPACE_DESTINATIONS.every((key) => keys.has(key))) {
    return failure("Navigation is missing a required destination.");
  }

  return success(items.sort((left, right) => left.order - right.order));
}

function readSectionControls(
  value: unknown,
): ValidationResult<readonly ValidatedSectionControl[]> {
  if (!Array.isArray(value) || value.length < 1 || value.length > 5) {
    return failure(
      "Section controls must contain one to five bounded sections.",
    );
  }

  const controls: ValidatedSectionControl[] = [];
  const keys = new Set<string>();

  for (const rawControl of value) {
    if (!isRecord(rawControl)) return failure("Section control is malformed.");
    const key = readString(rawControl.key);
    if (!key || !MANAGED_SECTION_KEYS.includes(key as CmsManagedSectionKey)) {
      return failure("Section control key is unsupported.");
    }
    if (keys.has(key)) return failure("Section control keys must be unique.");

    const enabled = readBoolean(rawControl.enabled);
    const order = readOrder(rawControl.order);
    if (enabled === undefined || order === undefined) {
      return failure(
        "Section controls require boolean visibility and numeric order.",
      );
    }

    keys.add(key);
    controls.push({ key: key as CmsManagedSectionKey, enabled, order });
  }

  return success(controls.sort((left, right) => left.order - right.order));
}

export function validateSiteSettings(
  value: RawSiteSettings | null,
): ValidationResult<ValidatedSiteSettings> {
  if (!isRecord(value)) return failure("Published site settings are missing.");

  const publication = validateSafePublication(value.publication);
  const siteTitle = readLocalizedText(value.siteTitle, "Site title");
  const siteDescription = readLocalizedText(
    value.siteDescription,
    "Site description",
  );
  const navigation = readNavigation(value.navigation);
  const sections = readSectionControls(value.sections);
  const footer = readLocalizedText(value.footer, "Footer copy");

  if (!publication.ok) return publication;
  if (!siteTitle.ok) return siteTitle;
  if (!siteDescription.ok) return siteDescription;
  if (!navigation.ok) return navigation;
  if (!sections.ok) return sections;
  if (!footer.ok) return footer;

  let seo: ValidatedSiteSettings["seo"];
  if (value.seo !== undefined && value.seo !== null) {
    if (!isRecord(value.seo)) return failure("SEO settings are malformed.");
    const title = readLocalizedText(value.seo.title, "SEO title");
    const description = readLocalizedText(
      value.seo.description,
      "SEO description",
    );
    const noIndex = readBoolean(value.seo.noIndex);
    if (!title.ok) return title;
    if (!description.ok) return description;
    if (noIndex === undefined)
      return failure("SEO indexing control is malformed.");
    seo = { title: title.value, description: description.value, noIndex };
  }

  return success({
    siteTitle: siteTitle.value,
    siteDescription: siteDescription.value,
    navigation: navigation.value,
    sections: sections.value,
    footer: footer.value,
    seo,
  });
}

export function validateProfile(
  value: RawProfile | null,
): ValidationResult<ValidatedProfile> {
  if (!isRecord(value)) return failure("Published profile is missing.");
  if (value.visibility !== "public") return failure("Profile is not public.");

  const publication = validateSafePublication(value.publication);
  if (!publication.ok) return publication;

  const name = readString(value.name);
  const headline = readLocalizedText(value.headline, "Profile headline");
  if (!name) return failure("Profile name is missing.");
  if (!headline.ok) return headline;
  if (!isRecord(value.summary)) return failure("Profile summary is malformed.");
  const portrait = value.portrait
    ? readManagedImage(value.portrait, "Profile portrait")
    : success(undefined);
  const resumeFiles = readFileArray(value.resumeFiles, "Profile resume");
  const socialLinks = readExternalArray(
    value.socialLinks,
    "Profile social link",
  );
  const location = value.location
    ? readLocalizedText(value.location, "Profile location")
    : success(undefined);
  const contactNote = value.contactNote
    ? readLocalizedText(value.contactNote, "Profile contact note")
    : success(undefined);
  if (!portrait.ok) return portrait;
  if (!resumeFiles.ok) return resumeFiles;
  if (!socialLinks.ok) return socialLinks;
  if (!location.ok) return location;
  if (!contactNote.ok) return contactNote;

  const englishSummary = readString(value.summary.en);
  const indonesianSummary = readString(value.summary.id);
  if (!englishSummary) return failure("Profile summary requires English.");

  if (!indonesianSummary) {
    if (value.allowEnglishFallback !== true) {
      return failure("Profile summary fallback was not explicitly approved.");
    }

    const disclosure = readLocalizedText(
      value.fallbackDisclosure,
      "Profile fallback disclosure",
    );
    if (!disclosure.ok) return disclosure;

    return success({
      name,
      headline: headline.value,
      summary: { en: englishSummary, id: englishSummary },
      fallbackDisclosure: disclosure.value,
      portrait: portrait.value,
      resumeFiles: resumeFiles.value,
      socialLinks: socialLinks.value,
      location: location.value,
      contactNote: contactNote.value,
    });
  }

  return success({
    name,
    headline: headline.value,
    summary: { en: englishSummary, id: indonesianSummary },
    portrait: portrait.value,
    resumeFiles: resumeFiles.value,
    socialLinks: socialLinks.value,
    location: location.value,
    contactNote: contactNote.value,
  });
}

function readLocalizedList(
  value: unknown,
  label: string,
  expectedLength: number,
): ValidationResult<readonly LocalizedText[]> {
  if (!Array.isArray(value) || value.length !== expectedLength) {
    return failure(
      `${label} requires exactly ${expectedLength} localized entries.`,
    );
  }

  const entries: LocalizedText[] = [];
  for (const [index, entry] of value.entries()) {
    const localized = readLocalizedText(entry, `${label} ${index + 1}`);
    if (!localized.ok) return localized;
    entries.push(localized.value);
  }
  return success(entries);
}

function readProjectActivities(
  value: unknown,
): ValidationResult<ValidatedProject["activities"]> {
  if (value === undefined || value === null) return success([]);
  if (!Array.isArray(value) || value.length > 5) {
    return failure(
      "Project activities must contain no more than five entries.",
    );
  }

  const activities: ValidatedProject["activities"][number][] = [];
  const ids = new Set<string>();
  for (const [index, rawActivity] of value.entries()) {
    if (!isRecord(rawActivity)) {
      return failure(`Project activity ${index + 1} is malformed.`);
    }
    const publication = validateSafePublication(rawActivity.publication);
    const id = readString(rawActivity.stableId);
    const organization = readLocalizedText(
      rawActivity.organization,
      `Project activity ${index + 1} organization`,
    );
    const theme = readLocalizedText(
      rawActivity.theme,
      `Project activity ${index + 1} theme`,
    );
    const role = readLocalizedText(
      rawActivity.role,
      `Project activity ${index + 1} role`,
    );
    const description = readLocalizedText(
      rawActivity.description,
      `Project activity ${index + 1} description`,
    );
    const gallery = readImageArray(
      rawActivity.gallery,
      `Project activity ${index + 1} gallery image`,
    );
    const order = readOrder(rawActivity.order);

    if (!publication.ok) return publication;
    if (!id || ids.has(id)) {
      return failure("Project activity IDs must be present and unique.");
    }
    if (!organization.ok) return organization;
    if (!theme.ok) return theme;
    if (!role.ok) return role;
    if (!description.ok) return description;
    if (!gallery.ok) return gallery;
    if (gallery.value.en.length < 2 || gallery.value.en.length > 3) {
      return failure(
        "Each project activity requires two or three public images.",
      );
    }
    if (order === undefined)
      return failure("Project activity order is malformed.");

    ids.add(id);
    activities.push({
      id,
      organization: organization.value,
      theme: theme.value,
      role: role.value,
      description: description.value,
      gallery: gallery.value,
      order,
    });
  }

  return success(activities.sort((left, right) => left.order - right.order));
}

export function isCmsProjectSlug(value: string): value is ProjectSlug {
  return CMS_PROJECT_SLUGS.includes(value as ProjectSlug);
}

function validateProject(
  value: RawProject,
): ValidationResult<ValidatedProject> {
  if (!isRecord(value)) return failure("Project record is malformed.");
  if (value.visibility !== "public") return failure("Project is not public.");

  const publication = validateSafePublication(value.publication);
  const title = readLocalizedText(value.title, "Project title");
  const category = value.category
    ? readLocalizedText(value.category, "Project category")
    : success(undefined);
  const summary = readLocalizedText(value.summary, "Project summary");
  const direction = readLocalizedText(value.direction, "Project direction");
  const focusPoints = readLocalizedList(value.focusPoints, "Focus points", 3);
  const limitations = readLocalizedList(value.limitations, "Limitations", 2);
  const evidenceDisclosure = readLocalizedText(
    value.evidenceDisclosure,
    "Evidence disclosure",
  );
  const gallery = readImageArray(value.gallery, "Project gallery image");
  const documents = readFileArray(value.documents, "Project document");
  const externalResources = readExternalArray(
    value.externalLinks,
    "Project external link",
  );
  const activities = readProjectActivities(value.activities);

  if (!publication.ok) return publication;
  if (!title.ok) return title;
  if (!category.ok) return category;
  if (!summary.ok) return summary;
  if (!direction.ok) return direction;
  if (!focusPoints.ok) return focusPoints;
  if (!limitations.ok) return limitations;
  if (!evidenceDisclosure.ok) return evidenceDisclosure;
  if (!gallery.ok) return gallery;
  if (!documents.ok) return documents;
  if (!externalResources.ok) return externalResources;
  if (!activities.ok) return activities;

  if (!isRecord(value.slug))
    return failure("Project route identity is malformed.");
  const englishSlug = readString(value.slug.en);
  const indonesianSlug = readString(value.slug.id);
  if (
    !englishSlug ||
    englishSlug !== indonesianSlug ||
    !isCmsProjectSlug(englishSlug)
  ) {
    return failure("Project requires one approved paired route identity.");
  }
  if (englishSlug === "digital-media-analytics-training-initiative") {
    const activityIds = activities.value.map((activity) => activity.id);
    const galleryCount = activities.value.reduce(
      (total, activity) => total + activity.gallery.en.length,
      0,
    );
    if (
      activities.value.length !== PROJECT_FOUR_ACTIVITY_IDS.length ||
      galleryCount !== 14 ||
      PROJECT_FOUR_ACTIVITY_IDS.some(
        (id, index) =>
          activityIds[index] !== id ||
          activities.value[index]?.order !== (index + 1) * 10,
      )
    ) {
      return failure(
        "PRJ-004 requires the exact five ordered activities and fourteen approved images.",
      );
    }
  } else if (activities.value.length > 0) {
    return failure(
      "Only PRJ-004 may contain the approved activity collection.",
    );
  }

  const featured = readBoolean(value.featured);
  const order = readOrder(value.order);
  if (featured === undefined || order === undefined) {
    return failure("Project featured and order controls are malformed.");
  }

  return success({
    slug: englishSlug,
    title: title.value,
    category: category.value,
    summary: summary.value,
    direction: direction.value,
    focusPoints: focusPoints.value as [
      LocalizedText,
      LocalizedText,
      LocalizedText,
    ],
    limitations: limitations.value as [LocalizedText, LocalizedText],
    evidenceDisclosure: evidenceDisclosure.value,
    gallery: gallery.value,
    documents: documents.value,
    externalResources: externalResources.value,
    related: { en: [], id: [] },
    activities: activities.value,
    featured,
    order,
  });
}

export function validateProjects(
  value: RawProject[],
): ValidationResult<readonly ValidatedProject[]> {
  if (!Array.isArray(value) || value.length !== CMS_PROJECT_SLUGS.length) {
    return failure(
      "Published projects must contain every approved paired project.",
    );
  }

  const projects: ValidatedProject[] = [];
  const slugs = new Set<ProjectSlug>();
  for (const rawProject of value) {
    const project = validateProject(rawProject);
    if (!project.ok) return project;
    if (slugs.has(project.value.slug))
      return failure("Project routes must be unique.");
    slugs.add(project.value.slug);
    projects.push(project.value);
  }

  if (!CMS_PROJECT_SLUGS.every((slug) => slugs.has(slug))) {
    return failure("One or more approved project routes are missing.");
  }

  return success(
    projects.sort(
      (left, right) =>
        Number(right.featured) - Number(left.featured) ||
        left.order - right.order ||
        left.slug.localeCompare(right.slug),
    ),
  );
}

function validateExperience(
  value: RawExperience,
): ValidationResult<ValidatedExperience> {
  if (!isRecord(value)) return failure("Experience record is malformed.");
  if (value.visibility !== "public" && value.visibility !== "unavailable") {
    return failure("Experience visibility is unsupported.");
  }
  if (value.visibility === "public" && !readString(value.organization)) {
    return failure("Public experience requires an organization.");
  }

  const publication = validateSafePublication(value.publication);
  const id = readString(value._id);
  const role = readLocalizedText(value.role, "Experience label");
  const summary = readLocalizedText(value.summary, "Experience summary");
  const responsibilities = readLocalizedArray(
    value.responsibilities,
    "Experience responsibility",
  );
  const achievements = readLocalizedArray(
    value.achievements,
    "Experience achievement",
  );
  const location = value.location
    ? readLocalizedText(value.location, "Experience location")
    : success(undefined);
  const evidence = readEvidencePresentation(value.evidence);
  if (!publication.ok) return publication;
  if (!id) return failure("Experience ID is missing.");
  if (!role.ok) return role;
  if (!summary.ok) return summary;
  if (!responsibilities.ok) return responsibilities;
  if (!achievements.ok) return achievements;
  if (!location.ok) return location;
  if (!evidence.ok) return evidence;

  const featured = readBoolean(value.featured);
  const order = readOrder(value.order);
  if (featured === undefined || order === undefined) {
    return failure("Experience featured and order controls are malformed.");
  }

  return success({
    id,
    role: role.value,
    organization: readString(value.organization),
    employmentType: readString(value.employmentType),
    startDate: readString(value.startDate),
    endDate: readString(value.endDate),
    location: location.value,
    summary: summary.value,
    responsibilities: responsibilities.value,
    achievements: achievements.value,
    skills: readStringList(value.skills),
    gallery: evidence.value.gallery,
    resources: evidence.value.resources,
    related: { en: [], id: [] },
    visibility: value.visibility,
    featured,
    order,
  });
}

export function validateExperiences(
  value: RawExperience[],
): ValidationResult<readonly ValidatedExperience[]> {
  if (!Array.isArray(value) || value.length === 0) {
    return failure("Published experience state is missing.");
  }

  const items: ValidatedExperience[] = [];
  for (const rawItem of value) {
    const item = validateExperience(rawItem);
    if (!item.ok) return item;
    items.push(item.value);
  }

  return success(
    items.sort(
      (left, right) =>
        Number(right.featured) - Number(left.featured) ||
        left.order - right.order,
    ),
  );
}

function validateCredential(
  value: RawCredential,
): ValidationResult<ValidatedCredential> {
  if (!isRecord(value)) return failure("Credential record is malformed.");
  if (value.visibility !== "public" && value.visibility !== "unavailable") {
    return failure("Credential visibility is unsupported.");
  }
  if (value.visibility === "public" && !readString(value.issuer)) {
    return failure("Public credential requires an issuer.");
  }

  const publication = validateSafePublication(value.publication);
  const id = readString(value._id);
  const name = readLocalizedText(value.name, "Credential label");
  const summary = readLocalizedText(value.summary, "Credential summary");
  const preview = value.image
    ? readManagedImage(value.image, "Credential preview")
    : success(undefined);
  const issuerLogo = value.issuerLogo
    ? readManagedImage(value.issuerLogo, "Credential issuer logo")
    : success(undefined);
  const document = value.file
    ? readManagedFile(value.file, "Credential document")
    : success(undefined);
  const verification = value.verificationLink
    ? readExternalResource(
        value.verificationLink,
        "Credential verification link",
      )
    : success(undefined);
  if (!publication.ok) return publication;
  if (!id) return failure("Credential ID is missing.");
  if (!name.ok) return name;
  if (!summary.ok) return summary;
  if (!preview.ok) return preview;
  if (!issuerLogo.ok) return issuerLogo;
  if (!document.ok) return document;
  if (!verification.ok) return verification;

  const gallery = readCredentialGallery(value.gallery, preview.value?.en.id);

  const featured = readBoolean(value.featured);
  const order = readOrder(value.order);
  if (featured === undefined || order === undefined) {
    return failure("Credential featured and order controls are malformed.");
  }

  const categoryValue = readStringList(value.skills)[0] ?? "Certification";
  const category = {
    en:
      categoryValue === "Education"
        ? "Education"
        : categoryValue === "Honor and award"
          ? "Achievements"
          : categoryValue === "Publication"
            ? "Publications"
            : "Licenses & Certifications",
    id:
      categoryValue === "Education"
        ? "Pendidikan"
        : categoryValue === "Honor and award"
          ? "Pencapaian"
          : categoryValue === "Publication"
            ? "Publikasi"
            : "Lisensi & Sertifikasi",
  } as const;
  const issuer = readString(value.issuer);
  const issueDate = readString(value.issueDate);
  const expirationDate = readString(value.expirationDate);
  const credentialId = readString(value.credentialId);
  const related: Readonly<
    Record<"en" | "id", readonly RelatedContentPresentation[]>
  > =
    id === "credential-edu-002"
      ? {
          en: [
            {
              id: "credential-ach-003",
              availability: "available",
              publicationApproved: true,
              title: "International Fall Program evidence",
              href: "/en/credentials/#credential-ach-003",
              relationship: "evidence",
            },
            {
              id: "credential-ach-001",
              availability: "available",
              publicationApproved: true,
              title: "NUDC participation evidence",
              href: "/en/credentials/#credential-ach-001",
              relationship: "evidence",
            },
          ],
          id: [
            {
              id: "credential-ach-003",
              availability: "available",
              publicationApproved: true,
              title: "Bukti International Fall Program",
              href: "/id/credentials/#credential-ach-003",
              relationship: "evidence",
            },
            {
              id: "credential-ach-001",
              availability: "available",
              publicationApproved: true,
              title: "Bukti partisipasi NUDC",
              href: "/id/credentials/#credential-ach-001",
              relationship: "evidence",
            },
          ],
        }
      : { en: [], id: [] };
  const presentation = (locale: "en" | "id") => ({
    id,
    availability:
      value.visibility === "public"
        ? ("available" as const)
        : ("unavailable" as const),
    publicationApproved: true,
    title: name.value[locale],
    issuer: issuer ?? (locale === "id" ? "Tidak tersedia" : "Unavailable"),
    dateLabel: issueDate,
    credentialId,
    summary: summary.value[locale],
    issuerLogo: issuerLogo.value?.[locale],
    preview: preview.value?.[locale],
    gallery: gallery[locale],
    document: document.value?.[locale],
    verification: verification.value?.[locale],
    related: related[locale],
  });

  return success({
    id,
    name: name.value,
    issuer,
    issueDate,
    expirationDate,
    credentialId,
    summary: summary.value,
    category,
    presentation: { en: presentation("en"), id: presentation("id") },
    visibility: value.visibility,
    featured,
    order,
  });
}

export function validateCredentials(
  value: RawCredential[],
): ValidationResult<readonly ValidatedCredential[]> {
  if (!Array.isArray(value) || value.length === 0) {
    return failure("Published credential state is missing.");
  }

  const items: ValidatedCredential[] = [];
  for (const rawItem of value) {
    const item = validateCredential(rawItem);
    if (!item.ok) return item;
    items.push(item.value);
  }

  return success(
    items.sort(
      (left, right) =>
        Number(right.featured) - Number(left.featured) ||
        left.order - right.order,
    ),
  );
}

export function validateMediaItems(
  value: RawMediaItem[],
): ValidationResult<readonly ValidatedMediaItem[]> {
  if (
    !Array.isArray(value) ||
    value.length !== MEDIA_LIBRARY_STABLE_IDS.length
  ) {
    return failure(
      "Published media library requires every approved provenance group.",
    );
  }

  const items: ValidatedMediaItem[] = [];
  const stableIds = new Set<string>();
  for (const [index, rawItem] of value.entries()) {
    if (!isRecord(rawItem) || rawItem.visibility !== "public") {
      return failure(`Media item ${index + 1} is malformed or not public.`);
    }

    const publication = validateSafePublication(rawItem.publication);
    const id = readString(rawItem._id);
    const stableId = readString(rawItem.stableId);
    const category = readString(rawItem.category);
    const title = readLocalizedText(
      rawItem.title,
      `Media item ${index + 1} title`,
    );
    const description = readLocalizedText(
      rawItem.description,
      `Media item ${index + 1} description`,
    );
    const gallery = readImageArray(
      rawItem.gallery,
      `Media item ${index + 1} image`,
    );
    const documents = readFileArray(
      rawItem.documents,
      `Media item ${index + 1} document`,
    );
    const totalSourceBytes = Number(rawItem.totalSourceBytes);
    const order = readOrder(rawItem.order);

    if (!publication.ok) return publication;
    if (!id || !stableId || stableIds.has(stableId)) {
      return failure("Media item IDs must be present and unique.");
    }
    if (
      !category ||
      !MEDIA_CATEGORIES.includes(category as (typeof MEDIA_CATEGORIES)[number])
    ) {
      return failure("Media item category is unsupported.");
    }
    if (!title.ok) return title;
    if (!description.ok) return description;
    if (!gallery.ok) return gallery;
    if (!documents.ok) return documents;
    if (!Number.isInteger(totalSourceBytes) || totalSourceBytes < 0) {
      return failure("Media item source-byte total is malformed.");
    }
    if (order === undefined) return failure("Media item order is malformed.");

    const sourceInventoryIds = readStringList(rawItem.sourceInventoryIds);
    if (sourceInventoryIds.length === 0) {
      return failure("Media item requires frozen source inventory IDs.");
    }
    const expectedSourceInventoryIds =
      MEDIA_SOURCE_IDS_BY_STABLE_ID[stableId ?? ""];
    if (
      !expectedSourceInventoryIds ||
      sourceInventoryIds.length !== expectedSourceInventoryIds.length ||
      new Set(sourceInventoryIds).size !== expectedSourceInventoryIds.length ||
      expectedSourceInventoryIds.some(
        (sourceId) => !sourceInventoryIds.includes(sourceId),
      )
    ) {
      return failure(
        "Media item provenance does not match its approved frozen source group.",
      );
    }
    const fileTypes = readStringList(rawItem.fileTypes);
    if (fileTypes.length === 0) {
      return failure("Media item requires represented file types.");
    }

    stableIds.add(stableId);
    items.push({
      id,
      stableId,
      category: category as ValidatedMediaItem["category"],
      title: title.value,
      description: description.value,
      gallery: gallery.value,
      documents: documents.value,
      sourceInventoryIds,
      relatedContentIds: readStringList(rawItem.relatedContentIds),
      fileTypes,
      totalSourceBytes,
      order,
    });
  }

  const coveredSourceIds = items.flatMap((item) => item.sourceInventoryIds);
  if (
    MEDIA_LIBRARY_STABLE_IDS.some((stableId) => !stableIds.has(stableId)) ||
    coveredSourceIds.length !== FROZEN_SOURCE_IDS.length ||
    new Set(coveredSourceIds).size !== FROZEN_SOURCE_IDS.length ||
    FROZEN_SOURCE_IDS.some((sourceId) => !coveredSourceIds.includes(sourceId))
  ) {
    return failure(
      "Media Library provenance must cover every frozen source ID exactly once.",
    );
  }

  return success(
    items.sort(
      (left, right) =>
        left.category.localeCompare(right.category) || left.order - right.order,
    ),
  );
}
