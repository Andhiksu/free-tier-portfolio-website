declare const process: {
  env: {
    SANITY_STUDIO_DATASET?: string
    SANITY_STUDIO_PROJECT_ID?: string
  }
}

function requireStudioEnvironment(
  name: 'SANITY_STUDIO_DATASET' | 'SANITY_STUDIO_PROJECT_ID',
  value: string | undefined,
  pattern: RegExp,
  expectedFormat: string,
): string {
  const normalizedValue = value?.trim()

  if (!normalizedValue) {
    throw new Error(
      `[Sanity Studio] Missing ${name}. Create apps/studio/.env.local and provide the owner-approved value.`,
    )
  }

  if (!pattern.test(normalizedValue)) {
    throw new Error(`[Sanity Studio] Invalid ${name}. Expected ${expectedFormat}.`)
  }

  return normalizedValue
}

export const studioEnvironment = Object.freeze({
  projectId: requireStudioEnvironment(
    'SANITY_STUDIO_PROJECT_ID',
    process.env.SANITY_STUDIO_PROJECT_ID,
    /^[a-z0-9]{8}$/,
    'an eight-character lowercase project ID',
  ),
  dataset: requireStudioEnvironment(
    'SANITY_STUDIO_DATASET',
    process.env.SANITY_STUDIO_DATASET,
    /^[a-z0-9_-]+$/,
    'a lowercase dataset name using letters, numbers, underscores, or hyphens',
  ),
})
