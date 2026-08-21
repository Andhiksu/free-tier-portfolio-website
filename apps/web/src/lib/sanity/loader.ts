import { enHomeData } from "../../data/home/en.ts";
import { idHomeData } from "../../data/home/id.ts";
import { projectCatalog, projectPageCopy } from "../../data/projects.ts";
import { adaptCmsRecords, createStaticFallbackContent } from "./adapters.ts";
import { createPublishedSanityClient } from "./client.ts";
import {
  readCmsEnvironment,
  type CmsEnvironmentResult,
} from "./environment.ts";
import { fetchPublishedCmsRecords } from "./queries.ts";
import type {
  CmsFallbackContent,
  CmsQueryClient,
  CmsSiteContent,
} from "./types.ts";

export const STATIC_CMS_FALLBACK: CmsFallbackContent = {
  homeData: { en: enHomeData, id: idHomeData },
  projects: projectCatalog,
  projectLabels: {
    en: {
      evidenceValue: projectPageCopy.en.evidencePending,
      openLabel: projectPageCopy.en.archive.openLabel,
    },
    id: {
      evidenceValue: projectPageCopy.id.evidencePending,
      openLabel: projectPageCopy.id.archive.openLabel,
    },
  },
};

interface LoadSiteContentOptions {
  environment?: CmsEnvironmentResult;
  client?: CmsQueryClient;
  fallback?: CmsFallbackContent;
}

export async function loadSiteContent(
  options: LoadSiteContentOptions = {},
): Promise<CmsSiteContent> {
  const environment = options.environment ?? readCmsEnvironment();
  const fallback = options.fallback ?? STATIC_CMS_FALLBACK;

  if (environment.status !== "configured") {
    return createStaticFallbackContent(fallback, {
      path: "configuration",
      kind: environment.status === "missing" ? "missing" : "invalid",
      message: environment.reason,
    });
  }

  const client =
    options.client ??
    (createPublishedSanityClient(environment.value) as CmsQueryClient);

  try {
    const records = await fetchPublishedCmsRecords(client);
    return adaptCmsRecords(records, fallback);
  } catch {
    return createStaticFallbackContent(fallback, {
      path: "fetch",
      kind: "fetch-error",
      message:
        "Published CMS content could not be loaded; static fallback is active.",
    });
  }
}

let siteContentPromise: Promise<CmsSiteContent> | undefined;

export function getSiteContent(): Promise<CmsSiteContent> {
  siteContentPromise ??= loadSiteContent();
  return siteContentPromise;
}
