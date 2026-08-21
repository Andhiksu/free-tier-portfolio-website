import { createClient, type SanityClient } from "@sanity/client";
import type { CmsEnvironment } from "./environment.ts";

export function createPublishedSanityClient(
  environment: CmsEnvironment,
): SanityClient {
  return createClient({
    projectId: environment.projectId,
    dataset: environment.dataset,
    apiVersion: environment.apiVersion,
    perspective: "published",
    useCdn: false,
    stega: false,
  });
}
