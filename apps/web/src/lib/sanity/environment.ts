declare const process: {
  env: Readonly<Record<string, string | undefined>>;
};

export const DEFAULT_SANITY_API_VERSION = "2025-02-19";

export interface CmsEnvironment {
  projectId: string;
  dataset: string;
  apiVersion: string;
}

export type CmsEnvironmentResult =
  | { status: "configured"; value: CmsEnvironment }
  | { status: "missing"; reason: string }
  | { status: "invalid"; reason: string };

type EnvironmentSource = Readonly<Record<string, string | undefined>>;

const projectIdPattern = /^[a-z0-9][a-z0-9-]{2,31}$/;
const datasetPattern = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const apiVersionPattern = /^\d{4}-\d{2}-\d{2}$/;

function readValue(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  return candidate ? candidate : undefined;
}

function isValidCalendarDate(value: string): boolean {
  if (!apiVersionPattern.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().startsWith(value);
}

export function parseCmsEnvironment(
  source: EnvironmentSource,
): CmsEnvironmentResult {
  const projectId = readValue(source.SANITY_PROJECT_ID);
  const dataset = readValue(source.SANITY_DATASET);
  const apiVersion = readValue(source.SANITY_API_VERSION);
  const configuredValues = [projectId, dataset, apiVersion].filter(Boolean);

  if (configuredValues.length === 0) {
    return {
      status: "missing",
      reason:
        "Sanity build configuration is not present; static fallback is active.",
    };
  }

  if (configuredValues.length !== 3) {
    return {
      status: "invalid",
      reason:
        "Sanity build configuration must provide project ID, dataset, and API version together.",
    };
  }

  if (!projectIdPattern.test(projectId!)) {
    return { status: "invalid", reason: "Sanity project ID is malformed." };
  }

  if (!datasetPattern.test(dataset!)) {
    return { status: "invalid", reason: "Sanity dataset name is malformed." };
  }

  if (!isValidCalendarDate(apiVersion!)) {
    return {
      status: "invalid",
      reason: "Sanity API version must be a real YYYY-MM-DD date.",
    };
  }

  return {
    status: "configured",
    value: {
      projectId: projectId!,
      dataset: dataset!,
      apiVersion: apiVersion!,
    },
  };
}

export function readCmsEnvironment(): CmsEnvironmentResult {
  if (!process.env.SANITY_PROJECT_ID) {
    const loadEnvFile = (
      process as unknown as { loadEnvFile?: (path?: string) => void }
    ).loadEnvFile;
    if (typeof loadEnvFile === "function") {
      try {
        loadEnvFile();
      } catch {
        // Environment file may be absent or already populated in process.env.
      }
      try {
        loadEnvFile("apps/web/.env");
      } catch {
        // Workspace sub-directory env file check.
      }
    }
  }

  // This module runs only during the static server build. Astro intentionally
  // excludes unprefixed names from its client environment object, so read the
  // build-only values from Node without moving them into a browser bundle.
  return parseCmsEnvironment({
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
  });
}
