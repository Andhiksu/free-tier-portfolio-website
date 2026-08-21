import { getPublishedProjects } from "../data/projects.ts";
import type { ProjectSlug } from "../types/projects";

export const SUPPORTED_LOCALES = ["en", "id"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const WORKSPACE_DESTINATIONS = [
  "home",
  "about",
  "experience",
  "projects",
  "education",
  "certifications",
  "honors",
  "publications",
  "credentials",
  "contact",
] as const;
export type WorkspaceDestination = (typeof WORKSPACE_DESTINATIONS)[number];
export type HomepageWorkspaceHash = `#${WorkspaceDestination}`;

export type LocalizedHomepagePath = `/${SupportedLocale}/`;
export type ExperienceArchivePath = `/${SupportedLocale}/experience/`;
export type ProjectsArchivePath = `/${SupportedLocale}/projects/`;
export type CredentialsArchivePath = `/${SupportedLocale}/credentials/`;
export type MediaArchivePath = `/${SupportedLocale}/media/`;
export type ProjectDetailPath = `/${SupportedLocale}/projects/${ProjectSlug}/`;
export type PublicPathname =
  | LocalizedHomepagePath
  | ExperienceArchivePath
  | ProjectsArchivePath
  | CredentialsArchivePath
  | MediaArchivePath
  | ProjectDetailPath;

export type PublicRouteRecord =
  | {
      kind: "home";
      locale: SupportedLocale;
      pathname: LocalizedHomepagePath;
      alternateKey: "home";
    }
  | {
      kind: "experience";
      locale: SupportedLocale;
      pathname: ExperienceArchivePath;
      alternateKey: "experience";
    }
  | {
      kind: "projects";
      locale: SupportedLocale;
      pathname: ProjectsArchivePath;
      alternateKey: "projects";
    }
  | {
      kind: "credentials";
      locale: SupportedLocale;
      pathname: CredentialsArchivePath;
      alternateKey: "credentials";
    }
  | {
      kind: "media";
      locale: SupportedLocale;
      pathname: MediaArchivePath;
      alternateKey: "media";
    }
  | {
      kind: "project";
      locale: SupportedLocale;
      pathname: ProjectDetailPath;
      alternateKey: `project:${ProjectSlug}`;
      slug: ProjectSlug;
    };

const legacyWorkspaceAliases: Readonly<Record<string, WorkspaceDestination>> = {
  journey: "experience",
  capabilities: "experience",
  impact: "experience",
  contact: "about",
};

export function validateProductionOrigin(value: string): string {
  const candidate = value.trim();
  let url: URL;

  try {
    url = new URL(candidate);
  } catch {
    throw new Error("The production origin must be a valid absolute URL.");
  }

  if (url.protocol !== "https:") {
    throw new Error("The production origin must use HTTPS.");
  }

  if (url.username || url.password) {
    throw new Error("The production origin must not include credentials.");
  }

  if (url.search || url.hash) {
    throw new Error("The production origin must not include a query or hash.");
  }

  if (url.port) {
    throw new Error("The production origin must not include a port.");
  }

  if (url.pathname !== "/") {
    throw new Error("The production origin pathname must be root (/).");
  }

  return url.href;
}

export const PRODUCTION_ORIGIN = /* @__PURE__ */ validateProductionOrigin(
  "https://portfolio.example.com/",
);

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
}

export function getMirroredLocale(locale: SupportedLocale): SupportedLocale {
  return locale === "en" ? "id" : "en";
}

export function getLocalizedHomepagePath(
  locale: SupportedLocale,
): LocalizedHomepagePath {
  return `/${locale}/`;
}

export function getProjectsArchivePath(
  locale: SupportedLocale,
): ProjectsArchivePath {
  return `/${locale}/projects/`;
}

export function getExperienceArchivePath(
  locale: SupportedLocale,
): ExperienceArchivePath {
  return `/${locale}/experience/`;
}

export function getCredentialsArchivePath(
  locale: SupportedLocale,
): CredentialsArchivePath {
  return `/${locale}/credentials/`;
}

export function getMediaArchivePath(locale: SupportedLocale): MediaArchivePath {
  return `/${locale}/media/`;
}

export function getProjectDetailPath(
  locale: SupportedLocale,
  slug: ProjectSlug,
): ProjectDetailPath {
  const isPublishedSlug = getPublishedProjects().some(
    (project) => project.slug === slug,
  );

  if (!isPublishedSlug) {
    throw new Error(`Unknown or unpublished project slug: ${slug}`);
  }

  return `/${locale}/projects/${slug}/`;
}

export function buildHomepageWorkspaceHash(
  destination: WorkspaceDestination,
): HomepageWorkspaceHash {
  return `#${destination}`;
}

function readHashId(hash: string): string {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}

export function getWorkspaceDestinationFromHash(
  hash: string,
): WorkspaceDestination {
  const hashId = readHashId(hash);
  const legacyDestination = legacyWorkspaceAliases[hashId];

  if (legacyDestination) {
    return legacyDestination;
  }

  return WORKSPACE_DESTINATIONS.includes(hashId as WorkspaceDestination)
    ? (hashId as WorkspaceDestination)
    : "home";
}

export function isLegacyWorkspaceHash(hash: string): boolean {
  return Boolean(legacyWorkspaceAliases[readHashId(hash)]);
}

export function getHomepageWorkspaceHref(
  locale: SupportedLocale,
  destination: WorkspaceDestination,
): `${LocalizedHomepagePath}${HomepageWorkspaceHash}` {
  return `${getLocalizedHomepagePath(locale)}${buildHomepageWorkspaceHash(destination)}`;
}

export function getPublicRouteRecords(): readonly PublicRouteRecord[] {
  const records: PublicRouteRecord[] = SUPPORTED_LOCALES.flatMap((locale) => [
    {
      kind: "home" as const,
      locale,
      pathname: getLocalizedHomepagePath(locale),
      alternateKey: "home" as const,
    },
    {
      kind: "experience" as const,
      locale,
      pathname: getExperienceArchivePath(locale),
      alternateKey: "experience" as const,
    },
    {
      kind: "projects" as const,
      locale,
      pathname: getProjectsArchivePath(locale),
      alternateKey: "projects" as const,
    },
    {
      kind: "credentials" as const,
      locale,
      pathname: getCredentialsArchivePath(locale),
      alternateKey: "credentials" as const,
    },
    {
      kind: "media" as const,
      locale,
      pathname: getMediaArchivePath(locale),
      alternateKey: "media" as const,
    },
    ...getPublishedProjects().map((project) => ({
      kind: "project" as const,
      locale,
      pathname: getProjectDetailPath(locale, project.slug),
      alternateKey: `project:${project.slug}` as const,
      slug: project.slug,
    })),
  ]);

  const uniquePathnames = new Set(records.map((route) => route.pathname));

  if (uniquePathnames.size !== records.length) {
    throw new Error("The public route registry contains duplicate pathnames.");
  }

  return records;
}

export function isPublicPathname(value: string): value is PublicPathname {
  if (value.includes("?") || value.includes("#")) {
    return false;
  }

  return getPublicRouteRecords().some((route) => route.pathname === value);
}

export function getCanonicalPublicPathname(value: string): PublicPathname {
  if (!isPublicPathname(value)) {
    throw new Error(`Unknown public pathname: ${value}`);
  }

  return value;
}

export function getLocaleAlternateRoutes(
  pathname: PublicPathname,
): readonly PublicRouteRecord[] {
  const canonicalPathname = getCanonicalPublicPathname(pathname);
  const currentRoute = getPublicRouteRecords().find(
    (route) => route.pathname === canonicalPathname,
  );

  if (!currentRoute) {
    return [];
  }

  const alternates = getPublicRouteRecords().filter(
    (route) => route.alternateKey === currentRoute.alternateKey,
  );
  const uniqueLocales = new Set(alternates.map((route) => route.locale));

  if (uniqueLocales.size !== alternates.length) {
    throw new Error("The public route registry contains duplicate alternates.");
  }

  return SUPPORTED_LOCALES.flatMap((locale) => {
    const route = alternates.find((candidate) => candidate.locale === locale);
    return route ? [route] : [];
  });
}

export function getMirroredLocaleCounterpart(
  pathname: PublicPathname,
): PublicRouteRecord | undefined {
  const currentRoute = getPublicRouteRecords().find(
    (route) => route.pathname === getCanonicalPublicPathname(pathname),
  );

  if (!currentRoute) {
    return undefined;
  }

  const mirroredLocale = getMirroredLocale(currentRoute.locale);

  return getLocaleAlternateRoutes(pathname).find(
    (route) => route.locale === mirroredLocale,
  );
}

export function getLocaleSwitchDestination(
  pathname: PublicPathname,
  targetLocale: SupportedLocale,
  workspaceDestination?: WorkspaceDestination,
): string | undefined {
  const destination = getLocaleAlternateRoutes(pathname).find(
    (route) => route.locale === targetLocale,
  );

  if (!destination) {
    return undefined;
  }

  if (destination.kind === "home" && workspaceDestination) {
    return `${destination.pathname}${buildHomepageWorkspaceHash(workspaceDestination)}`;
  }

  return destination.pathname;
}

export function getSitemapPathnames(): readonly PublicPathname[] {
  return getPublicRouteRecords().map((route) => route.pathname);
}

export function getRecoveryLinks(locale: SupportedLocale) {
  return {
    home: getLocalizedHomepagePath(locale),
    experience: getExperienceArchivePath(locale),
    projects: getProjectsArchivePath(locale),
    credentials: getCredentialsArchivePath(locale),
    media: getMediaArchivePath(locale),
  } as const;
}
