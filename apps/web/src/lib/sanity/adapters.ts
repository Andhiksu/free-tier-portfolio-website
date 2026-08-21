import type { HomeLocale, HomePageData } from "../../types/home";
import type { ProjectCatalogEntry, ProjectPreview } from "../../types/projects";
import type {
  CmsAvailabilityState,
  CmsContentIssue,
  CmsFallbackContent,
  CmsRawRecords,
  CmsSiteContent,
  ValidatedCredential,
  ValidatedExperience,
  ValidatedProfile,
  ValidatedProject,
  ValidatedSiteSettings,
  ValidationResult,
} from "./types.ts";
import {
  validateCredentials,
  validateExperiences,
  validateMediaItems,
  validateProfile,
  validateProjects,
  validateSiteSettings,
} from "./validation.ts";

function projectPath(
  locale: HomeLocale,
  slug: ValidatedProject["slug"],
): `/${HomeLocale}/projects/${ValidatedProject["slug"]}/` {
  return `/${locale}/projects/${slug}/`;
}

export function adaptValidatedProjects(
  projects: readonly ValidatedProject[],
): readonly ProjectCatalogEntry[] {
  return projects.map((project) => ({
    slug: project.slug,
    content: {
      en: {
        title: project.title.en,
        summary: project.summary.en,
        direction: project.direction.en,
        focusPoints: project.focusPoints.map((item) => item.en) as [
          string,
          string,
          string,
        ],
        limitations: project.limitations.map((item) => item.en) as [
          string,
          string,
        ],
        evidenceDisclosure: project.evidenceDisclosure.en,
      },
      id: {
        title: project.title.id,
        summary: project.summary.id,
        direction: project.direction.id,
        focusPoints: project.focusPoints.map((item) => item.id) as [
          string,
          string,
          string,
        ],
        limitations: project.limitations.map((item) => item.id) as [
          string,
          string,
        ],
        evidenceDisclosure: project.evidenceDisclosure.id,
      },
    },
    category: project.category,
    status: "case-study",
    gallery: project.gallery,
    documents: project.documents,
    externalResources: project.externalResources,
    related: project.related,
    activities: project.activities.map((activity) => ({
      id: activity.id,
      organization: activity.organization,
      theme: activity.theme,
      role: activity.role,
      description: activity.description,
      gallery: activity.gallery,
      order: activity.order,
    })),
    relatedProjectSlugs: [],
  }));
}

function createProjectPreviews(
  locale: HomeLocale,
  projects: readonly ProjectCatalogEntry[],
  fallback: CmsFallbackContent,
): readonly ProjectPreview[] {
  const labels = fallback.projectLabels[locale];

  return projects.map((project) => ({
    title: project.content[locale].title,
    summary: project.content[locale].summary,
    evidenceValue:
      project.status === "case-study"
        ? locale === "id"
          ? "Studi kasus"
          : "Case study"
        : labels.evidenceValue,
    href: projectPath(locale, project.slug),
    linkLabel: `${labels.openLabel}: ${project.content[locale].title}`,
    cover: project.gallery?.[locale]?.[0],
  }));
}

function localizedProfileSummary(
  profile: ValidatedProfile,
  locale: HomeLocale,
): string {
  const summary = profile.summary[locale];
  const disclosure = profile.fallbackDisclosure?.[locale];
  return disclosure ? `${summary} ${disclosure}` : summary;
}

function adaptHomeData(
  locale: HomeLocale,
  fallback: CmsFallbackContent,
  settings: ValidatedSiteSettings | undefined,
  profile: ValidatedProfile | undefined,
  projects: readonly ProjectCatalogEntry[],
  experience: CmsAvailabilityState<ValidatedExperience>,
  credentials: CmsAvailabilityState<ValidatedCredential>,
): HomePageData {
  const base = fallback.homeData[locale];
  const homeNavigation = settings?.navigation.find(
    (item) => item.key === "home",
  );
  const contactNavigation = settings?.navigation.find(
    (item) => item.key === "contact",
  );
  const unavailableExperience =
    experience.status === "unavailable" ? experience.items[0] : undefined;
  const unavailableCredential =
    credentials.status === "unavailable" ? credentials.items[0] : undefined;
  const publicExperiences = experience.items.filter(
    (item) => item.visibility === "public",
  );
  const publicCredentials = credentials.items.filter(
    (item) =>
      item.visibility === "public" ||
      item.id === "credential-publications-unavailable",
  );
  const formatDate = (value: string | undefined) => {
    if (!value) return undefined;
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`));
  };

  return {
    ...base,
    title:
      settings?.seo?.title[locale] ?? settings?.siteTitle[locale] ?? base.title,
    description:
      settings?.seo?.description[locale] ??
      settings?.siteDescription[locale] ??
      base.description,
    indexable: settings?.seo ? !settings.seo.noIndex : base.indexable,
    siteLabel: profile?.name ?? base.siteLabel,
    primaryNavigation: {
      ...base.primaryNavigation,
      homeLabel:
        homeNavigation?.label[locale] ?? base.primaryNavigation.homeLabel,
      contactLabel:
        contactNavigation?.label[locale] ?? base.primaryNavigation.contactLabel,
    },
    workspaceNavigation:
      settings?.navigation.map((item) => ({
        id: item.key,
        label: item.label[locale],
        enabled: item.enabled,
        order: item.order,
      })) ?? base.workspaceNavigation,
    sectionControls:
      settings?.sections.map((control) => ({
        id: control.key,
        enabled: control.enabled,
        order: control.order,
      })) ?? base.sectionControls,
    hero: profile
      ? {
          ...base.hero,
          heading: profile.headline[locale],
        }
      : base.hero,
    projects: {
      ...base.projects,
      items: createProjectPreviews(locale, projects, fallback),
    },
    about: profile
      ? {
          ...base.about,
          copy: localizedProfileSummary(profile, locale),
          portrait: profile.portrait
            ? { ...profile.portrait[locale], caption: undefined }
            : undefined,
          resumes: profile.resumeFiles[locale],
        }
      : base.about,
    journey:
      publicExperiences.length > 0
        ? {
            ...base.journey,
            description:
              locale === "id"
                ? "Pengalaman profesional terpilih dari pekerjaan data, strategi, rekayasa, operasi, dan produksi media."
                : "Selected professional experience across data, strategy, engineering, operations, and media production.",
            chapters: publicExperiences.slice(0, 3).map((item) => ({
              id: item.id,
              label: item.role[locale],
              organization: item.organization,
              employmentType: item.employmentType,
              location: item.location ? item.location[locale] : undefined,
              summary: item.summary[locale],
              dateLabel: [formatDate(item.startDate), formatDate(item.endDate)]
                .filter(Boolean)
                .join(" — "),
              skills: item.skills,
            })),
          }
        : unavailableExperience
          ? {
              ...base.journey,
              heading: unavailableExperience.role[locale],
              description: unavailableExperience.summary[locale],
            }
          : base.journey,
    credentials: publicCredentials.some((item) => item.visibility === "public")
      ? {
          ...base.credentials,
          description:
            locale === "id"
              ? "Pendidikan, sertifikasi, serta pencapaian profesional."
              : "Education, certifications, and professional recognition.",
          items: publicCredentials
            .filter((item) => item.visibility === "public")
            .slice(0, 3)
            .map((item) => ({
              id: item.id,
              category: item.category[locale],
              statusValue:
                item.visibility === "unavailable"
                  ? locale === "id"
                    ? "Belum tersedia"
                    : "Unavailable"
                  : (item.issuer ?? item.summary[locale]),
              credential: {
                ...item.presentation[locale],
                gallery: [],
              },
            })),
        }
      : unavailableCredential
        ? {
            ...base.credentials,
            heading: unavailableCredential.name[locale],
            description: unavailableCredential.summary[locale],
          }
        : base.credentials,
    footer: settings ? { copy: settings.footer[locale] } : base.footer,
  };
}

function readAvailabilityState<
  Value extends { visibility: "public" | "unavailable" },
>(
  result: ValidationResult<readonly Value[]>,
  rawCount: number,
): CmsAvailabilityState<Value> {
  if (!result.ok) {
    return {
      status: rawCount === 0 ? "missing" : "invalid",
      items: [],
    };
  }

  return {
    status: result.value.every((item) => item.visibility === "unavailable")
      ? "unavailable"
      : "ready",
    items: result.value,
  };
}

function addValidationIssue(
  issues: CmsContentIssue[],
  path: CmsContentIssue["path"],
  result: ValidationResult<unknown>,
  missing: boolean,
): void {
  if (result.ok) return;
  issues.push({
    path,
    kind: missing ? "missing" : "invalid",
    message: result.reason,
  });
}

export function createStaticFallbackContent(
  fallback: CmsFallbackContent,
  issue?: CmsContentIssue,
): CmsSiteContent {
  return {
    source: "static-fallback",
    homeData: fallback.homeData,
    projects: fallback.projects,
    experience: { status: "missing", items: [] },
    credentials: { status: "missing", items: [] },
    media: { status: "missing", items: [] },
    issues: issue ? [issue] : [],
  };
}

export function adaptCmsRecords(
  records: CmsRawRecords,
  fallback: CmsFallbackContent,
): CmsSiteContent {
  const rawMediaItems = records.mediaItems ?? [];
  const settings = validateSiteSettings(records.siteSettings);
  const profile = validateProfile(records.profile);
  const projects = validateProjects(records.projects);
  const experiences = validateExperiences(records.experiences);
  const credentials = validateCredentials(records.credentials);
  const mediaItems = validateMediaItems(rawMediaItems);
  const issues: CmsContentIssue[] = [];

  addValidationIssue(
    issues,
    "siteSettings",
    settings,
    records.siteSettings === null,
  );
  addValidationIssue(issues, "media", mediaItems, rawMediaItems.length === 0);
  addValidationIssue(issues, "profile", profile, records.profile === null);
  addValidationIssue(
    issues,
    "project",
    projects,
    records.projects.length === 0,
  );
  addValidationIssue(
    issues,
    "experience",
    experiences,
    records.experiences.length === 0,
  );
  addValidationIssue(
    issues,
    "credential",
    credentials,
    records.credentials.length === 0,
  );

  const experienceState = readAvailabilityState(
    experiences,
    records.experiences.length,
  );
  const credentialState = readAvailabilityState(
    credentials,
    records.credentials.length,
  );
  const mediaState = mediaItems.ok
    ? {
        status: "ready" as const,
        items: mediaItems.value,
      }
    : {
        status: (rawMediaItems.length === 0 ? "missing" : "invalid") as
          "missing" | "invalid",
        items: [],
      };

  if (experienceState.status === "unavailable") {
    issues.push({
      path: "experience",
      kind: "unavailable",
      message: "CMS experience is explicitly unavailable for public display.",
    });
  }
  if (credentialState.status === "unavailable") {
    issues.push({
      path: "credential",
      kind: "unavailable",
      message: "CMS credentials are explicitly unavailable for public display.",
    });
  }

  const adaptedProjects = projects.ok
    ? adaptValidatedProjects(projects.value)
    : fallback.projects;
  const usedCms = [
    settings,
    profile,
    projects,
    experiences,
    credentials,
    mediaItems,
  ].some((result) => result.ok);
  const allCmsPathsValid = [
    settings,
    profile,
    projects,
    experiences,
    credentials,
    mediaItems,
  ].every((result) => result.ok);

  return {
    source: allCmsPathsValid
      ? "cms"
      : usedCms
        ? "cms-with-fallback"
        : "static-fallback",
    homeData: {
      en: adaptHomeData(
        "en",
        fallback,
        settings.ok ? settings.value : undefined,
        profile.ok ? profile.value : undefined,
        adaptedProjects,
        experienceState,
        credentialState,
      ),
      id: adaptHomeData(
        "id",
        fallback,
        settings.ok ? settings.value : undefined,
        profile.ok ? profile.value : undefined,
        adaptedProjects,
        experienceState,
        credentialState,
      ),
    },
    projects: adaptedProjects,
    experience: experienceState,
    credentials: credentialState,
    media: mediaState,
    issues,
  };
}
