import type { HomeLocale, HomePageData } from "../../types/home";
import type { ProjectCatalogEntry, ProjectSlug } from "../../types/projects";
import type { WorkspaceDestination } from "../routes";
import type {
  CredentialPresentation,
  DocumentPresentation,
  ExternalResourcePresentation,
  ManagedImagePresentation,
  RelatedContentPresentation,
} from "../../types/media";

export type CmsManagedSectionKey =
  "about" | "experience" | "projects" | "credentials" | "contact";

export interface RawLocalizedText {
  en?: unknown;
  id?: unknown;
}

export interface RawPublicationMetadata {
  source?: unknown;
  ownership?: unknown;
  credit?: unknown;
  privacyStatus?: unknown;
  redactionStatus?: unknown;
  publicationApproved?: unknown;
}

export interface RawNavigationItem {
  key?: unknown;
  label?: unknown;
  enabled?: unknown;
  order?: unknown;
}

export interface RawSectionControl {
  key?: unknown;
  enabled?: unknown;
  order?: unknown;
}

export interface RawSeoSettings {
  title?: unknown;
  description?: unknown;
  noIndex?: unknown;
}

export interface RawSiteSettings {
  _id?: unknown;
  siteTitle?: unknown;
  siteDescription?: unknown;
  navigation?: unknown;
  sections?: unknown;
  footer?: unknown;
  seo?: unknown;
  publication?: unknown;
}

export interface RawProfile {
  _id?: unknown;
  name?: unknown;
  headline?: unknown;
  summary?: unknown;
  allowEnglishFallback?: unknown;
  fallbackDisclosure?: unknown;
  location?: unknown;
  portrait?: unknown;
  socialLinks?: unknown;
  resumeFiles?: unknown;
  contactNote?: unknown;
  visibility?: unknown;
  publication?: unknown;
}

export interface RawExperience {
  _id?: unknown;
  role?: unknown;
  organization?: unknown;
  employmentType?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  location?: unknown;
  summary?: unknown;
  responsibilities?: unknown;
  achievements?: unknown;
  skills?: unknown;
  evidence?: unknown;
  featured?: unknown;
  order?: unknown;
  visibility?: unknown;
  publication?: unknown;
}

export interface RawProject {
  _id?: unknown;
  title?: unknown;
  slug?: unknown;
  category?: unknown;
  summary?: unknown;
  direction?: unknown;
  focusPoints?: unknown;
  limitations?: unknown;
  evidenceDisclosure?: unknown;
  externalLinks?: unknown;
  gallery?: unknown;
  documents?: unknown;
  evidence?: unknown;
  activities?: unknown;
  featured?: unknown;
  order?: unknown;
  visibility?: unknown;
  publication?: unknown;
}

export interface RawCredential {
  _id?: unknown;
  name?: unknown;
  issuer?: unknown;
  issueDate?: unknown;
  expirationDate?: unknown;
  credentialId?: unknown;
  verificationLink?: unknown;
  summary?: unknown;
  skills?: unknown;
  image?: unknown;
  issuerLogo?: unknown;
  gallery?: unknown;
  file?: unknown;
  featured?: unknown;
  order?: unknown;
  visibility?: unknown;
  publication?: unknown;
}

export interface RawMediaItem {
  _id?: unknown;
  stableId?: unknown;
  category?: unknown;
  title?: unknown;
  description?: unknown;
  gallery?: unknown;
  documents?: unknown;
  sourceInventoryIds?: unknown;
  relatedContentIds?: unknown;
  safeDerivativeOf?: unknown;
  fileTypes?: unknown;
  totalSourceBytes?: unknown;
  order?: unknown;
  visibility?: unknown;
  publication?: unknown;
}

export interface CmsRawRecords {
  siteSettings: RawSiteSettings | null;
  profile: RawProfile | null;
  experiences: RawExperience[];
  projects: RawProject[];
  credentials: RawCredential[];
  mediaItems: RawMediaItem[];
}

export interface CmsQueryClient {
  fetch<Result>(
    query: string,
    params: Record<string, never>,
    options: { perspective: "published" },
  ): Promise<Result>;
}

export type LocalizedText = Readonly<Record<HomeLocale, string>>;

export interface ValidatedNavigationItem {
  key: WorkspaceDestination;
  label: LocalizedText;
  enabled: boolean;
  order: number;
}

export interface ValidatedSectionControl {
  key: CmsManagedSectionKey;
  enabled: boolean;
  order: number;
}

export interface ValidatedSiteSettings {
  siteTitle: LocalizedText;
  siteDescription: LocalizedText;
  navigation: readonly ValidatedNavigationItem[];
  sections: readonly ValidatedSectionControl[];
  footer: LocalizedText;
  seo?: {
    title: LocalizedText;
    description: LocalizedText;
    noIndex: boolean;
  };
}

export interface ValidatedProfile {
  name: string;
  headline: LocalizedText;
  summary: LocalizedText;
  fallbackDisclosure?: LocalizedText;
  location?: LocalizedText;
  portrait?: Readonly<Record<HomeLocale, ManagedImagePresentation>>;
  resumeFiles: Readonly<Record<HomeLocale, readonly DocumentPresentation[]>>;
  socialLinks: Readonly<
    Record<HomeLocale, readonly ExternalResourcePresentation[]>
  >;
  contactNote?: LocalizedText;
}

export interface ValidatedExperience {
  id: string;
  role: LocalizedText;
  organization?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  location?: LocalizedText;
  summary: LocalizedText;
  responsibilities: readonly LocalizedText[];
  achievements: readonly LocalizedText[];
  skills: readonly string[];
  gallery: Readonly<Record<HomeLocale, readonly ManagedImagePresentation[]>>;
  resources: Readonly<
    Record<HomeLocale, readonly ExternalResourcePresentation[]>
  >;
  related: Readonly<Record<HomeLocale, readonly RelatedContentPresentation[]>>;
  visibility: "public" | "unavailable";
  featured: boolean;
  order: number;
}

export interface ValidatedProject {
  slug: ProjectSlug;
  title: LocalizedText;
  category?: LocalizedText;
  summary: LocalizedText;
  direction: LocalizedText;
  focusPoints: readonly [LocalizedText, LocalizedText, LocalizedText];
  limitations: readonly [LocalizedText, LocalizedText];
  evidenceDisclosure: LocalizedText;
  gallery: Readonly<Record<HomeLocale, readonly ManagedImagePresentation[]>>;
  documents: Readonly<Record<HomeLocale, readonly DocumentPresentation[]>>;
  externalResources: Readonly<
    Record<HomeLocale, readonly ExternalResourcePresentation[]>
  >;
  related: Readonly<Record<HomeLocale, readonly RelatedContentPresentation[]>>;
  activities: readonly {
    id: string;
    organization: LocalizedText;
    theme: LocalizedText;
    role: LocalizedText;
    description: LocalizedText;
    gallery: Readonly<Record<HomeLocale, readonly ManagedImagePresentation[]>>;
    order: number;
  }[];
  featured: boolean;
  order: number;
}

export interface ValidatedCredential {
  id: string;
  name: LocalizedText;
  issuer?: string;
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  summary: LocalizedText;
  category: Readonly<Record<HomeLocale, string>>;
  presentation: Readonly<Record<HomeLocale, CredentialPresentation>>;
  visibility: "public" | "unavailable";
  featured: boolean;
  order: number;
}

export interface ValidatedMediaItem {
  id: string;
  stableId: string;
  category:
    | "profile"
    | "experience"
    | "project"
    | "credential"
    | "document"
    | "archive";
  title: LocalizedText;
  description: LocalizedText;
  gallery: Readonly<Record<HomeLocale, readonly ManagedImagePresentation[]>>;
  documents: Readonly<Record<HomeLocale, readonly DocumentPresentation[]>>;
  sourceInventoryIds: readonly string[];
  relatedContentIds: readonly string[];
  fileTypes: readonly string[];
  totalSourceBytes: number;
  order: number;
}

export type ValidationResult<Value> =
  { ok: true; value: Value } | { ok: false; reason: string };

export interface CmsFallbackContent {
  homeData: Readonly<Record<HomeLocale, HomePageData>>;
  projects: readonly ProjectCatalogEntry[];
  projectLabels: Readonly<
    Record<HomeLocale, { evidenceValue: string; openLabel: string }>
  >;
}

export type CmsContentPath =
  | "configuration"
  | "siteSettings"
  | "profile"
  | "experience"
  | "project"
  | "credential"
  | "media"
  | "fetch";

export interface CmsContentIssue {
  path: CmsContentPath;
  kind: "missing" | "invalid" | "unavailable" | "fetch-error";
  message: string;
}

export interface CmsAvailabilityState<Value> {
  status: "ready" | "missing" | "invalid" | "unavailable";
  items: readonly Value[];
}

export interface CmsSiteContent {
  source: "cms" | "cms-with-fallback" | "static-fallback";
  homeData: Readonly<Record<HomeLocale, HomePageData>>;
  projects: readonly ProjectCatalogEntry[];
  experience: CmsAvailabilityState<ValidatedExperience>;
  credentials: CmsAvailabilityState<ValidatedCredential>;
  media: CmsAvailabilityState<ValidatedMediaItem>;
  issues: readonly CmsContentIssue[];
}
