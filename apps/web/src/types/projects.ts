import type { HomeLocale } from "./home";
import type {
  DocumentPresentation,
  ExternalResourcePresentation,
  ManagedImagePresentation,
  RelatedContentPresentation,
} from "./media";

export type ProjectSlug =
  | "analytics-decision-support"
  | "language-text-intelligence"
  | "computer-vision-applied-ai"
  | "digital-media-analytics-training-initiative";

export type ProjectDetailHref = `/${HomeLocale}/projects/${ProjectSlug}/`;

export interface LocalizedProjectContent {
  title: string;
  summary: string;
  direction: string;
  focusPoints: readonly [string, string, string];
  limitations: readonly [string, string];
  evidenceDisclosure: string;
}

export interface ProjectCatalogEntry {
  slug: ProjectSlug;
  content: Readonly<Record<HomeLocale, LocalizedProjectContent>>;
  category?: Readonly<Record<HomeLocale, string>>;
  status?: "direction" | "case-study";
  gallery?: Readonly<Record<HomeLocale, readonly ManagedImagePresentation[]>>;
  documents?: Readonly<Record<HomeLocale, readonly DocumentPresentation[]>>;
  externalResources?: Readonly<
    Record<HomeLocale, readonly ExternalResourcePresentation[]>
  >;
  related?: Readonly<Record<HomeLocale, readonly RelatedContentPresentation[]>>;
  activities?: readonly ProjectActivityPresentation[];
  relatedProjectSlugs: readonly ProjectSlug[];
}

export interface ProjectActivityPresentation {
  id: string;
  organization: Readonly<Record<HomeLocale, string>>;
  theme: Readonly<Record<HomeLocale, string>>;
  role: Readonly<Record<HomeLocale, string>>;
  description: Readonly<Record<HomeLocale, string>>;
  gallery: Readonly<Record<HomeLocale, readonly ManagedImagePresentation[]>>;
  order: number;
}

export interface ProjectPreview {
  title: string;
  summary: string;
  evidenceValue: string;
  href?: ProjectDetailHref;
  linkLabel?: string;
  cover?: ManagedImagePresentation;
}

export interface ProjectPageCopy {
  archive: {
    title: string;
    description: string;
    eyebrow: string;
    listHeading: string;
    evidenceLabel: string;
    openLabel: string;
    emptyTitle: string;
    emptyCopy: string;
    incompleteTitle: string;
    incompleteCopy: string;
  };
  detail: {
    eyebrow: string;
    backLabel: string;
    statusLabel: string;
    directionHeading: string;
    focusHeading: string;
    availabilityHeading: string;
    evidenceTitle: string;
    metricsTitle: string;
    metricsCopy: string;
    linksTitle: string;
    linksCopy: string;
    limitationsHeading: string;
    relatedHeading: string;
    relatedEmptyTitle: string;
    relatedEmptyCopy: string;
  };
  evidencePending: string;
}
