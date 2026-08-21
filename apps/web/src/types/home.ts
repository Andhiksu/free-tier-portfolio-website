import type { ProjectPreview } from "./projects";
import type {
  CredentialPresentation,
  DocumentPresentation,
  ExternalResourcePresentation,
  ManagedImagePresentation,
  RelatedContentPresentation,
} from "./media";
import type {
  HomepageWorkspaceHash,
  PublicPathname,
  SupportedLocale,
  WorkspaceDestination,
} from "../lib/routes";

export type HomeLocale = SupportedLocale;

export type LocalizedHomeHref = `/${HomeLocale}/`;

export type LocalizedSiteHref = `/${HomeLocale}/${string}`;

export interface HomeLanguageLink {
  locale: HomeLocale;
  href: PublicPathname;
  label: string;
}

export type HomeSectionId = "impact";

export type HomeContentSectionId =
  "projects" | "about" | "journey" | "capabilities" | "credentials" | "contact";

export type HomeNavigationSectionHref = "#contact";

export type HomeManagedSectionId =
  "about" | "experience" | "projects" | "credentials" | "contact";

export interface HomeWorkspaceNavigationItem {
  id: WorkspaceDestination;
  label: string;
  enabled: boolean;
  order: number;
}

export interface HomeManagedSectionControl {
  id: HomeManagedSectionId;
  enabled: boolean;
  order: number;
}

export type HomeTargetRoles = readonly [
  "Data Analyst",
  "Business Intelligence Analyst",
  "Data Scientist",
  "AI/ML Engineer",
];

export interface HomeHeroAction {
  label: string;
  href: HomepageWorkspaceHash;
}

export interface HomeImpactItem {
  category: string;
  status: string;
  context: string;
}

export type HomeProjectDirection = ProjectPreview;

export interface HomeJourneyChapter {
  id?: string;
  label: string;
  summary: string;
  organization?: string;
  employmentType?: string;
  location?: string;
  dateLabel?: string;
  responsibilities?: readonly string[];
  achievements?: readonly string[];
  skills?: readonly string[];
  gallery?: readonly ManagedImagePresentation[];
  resources?: readonly ExternalResourcePresentation[];
  related?: readonly RelatedContentPresentation[];
}

export interface HomeCapabilityGroup {
  label: string;
  summary: string;
}

export interface HomeCredentialPreviewItem {
  id?: string;
  category: string;
  statusValue: string;
  credential?: CredentialPresentation;
}

export type HomeApprovedExternalHref =
  | "https://www.linkedin.com/in/example-profile/"
  | "https://github.com/example-user";

export type HomeContactLinkPlatform = "linkedin" | "github";

export type HomeContactLinkEmphasis = "primary" | "secondary";

export interface HomeContactLink {
  platform: HomeContactLinkPlatform;
  label: string;
  disclosure: string;
  href: HomeApprovedExternalHref;
  emphasis: HomeContactLinkEmphasis;
}

export interface HomePageData {
  lang: HomeLocale;
  title: string;
  description: string;
  indexable: boolean;
  siteLabel: string;
  homeHref: LocalizedHomeHref;
  primaryNavigation: {
    label: string;
    homeLabel: string;
    contactLabel: string;
    contactHref: HomeNavigationSectionHref;
  };
  workspaceNavigation: readonly HomeWorkspaceNavigationItem[];
  sectionControls: readonly HomeManagedSectionControl[];
  mobileMenu: {
    openLabel: string;
    closeLabel: string;
  };
  themeControl: {
    label: string;
  };
  languageNavigation: {
    label: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    headingLines: readonly [string, string];
    supportingCopy: string;
    targetRoles: {
      label: string;
      items: HomeTargetRoles;
    };
    actions: readonly HomeHeroAction[];
  };
  impact: {
    id: HomeSectionId;
    heading: string;
    description: string;
    statusLabel: string;
    items: readonly [
      HomeImpactItem,
      HomeImpactItem,
      HomeImpactItem,
      HomeImpactItem,
    ];
  };
  projects: {
    id: Extract<HomeContentSectionId, "projects">;
    heading: string;
    description: string;
    evidenceLabel: string;
    archiveHref: LocalizedSiteHref;
    archiveLabel: string;
    items: readonly HomeProjectDirection[];
  };
  about: {
    id: Extract<HomeContentSectionId, "about">;
    heading: string;
    copy: string;
    portrait?: ManagedImagePresentation;
    resumes?: readonly DocumentPresentation[];
  };
  journey: {
    id: Extract<HomeContentSectionId, "journey">;
    heading: string;
    description: string;
    chapters: readonly HomeJourneyChapter[];
  };
  capabilities: {
    id: Extract<HomeContentSectionId, "capabilities">;
    heading: string;
    description: string;
    groups: readonly [
      HomeCapabilityGroup,
      HomeCapabilityGroup,
      HomeCapabilityGroup,
      HomeCapabilityGroup,
    ];
  };
  credentials: {
    id: Extract<HomeContentSectionId, "credentials">;
    heading: string;
    description: string;
    statusLabel: string;
    items: readonly HomeCredentialPreviewItem[];
  };
  contact: {
    id: Extract<HomeContentSectionId, "contact">;
    heading: string;
    copy: string;
    links: readonly [
      HomeContactLink & {
        platform: "linkedin";
        href: "https://www.linkedin.com/in/example-profile/";
        emphasis: "primary";
      },
      HomeContactLink & {
        platform: "github";
        href: "https://github.com/example-user";
        emphasis: "secondary";
      },
    ];
  };
  footer: {
    copy: string;
  };
}
