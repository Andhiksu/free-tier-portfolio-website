import type {
  ExternalResourceKind,
  ManagedImagePresentation,
} from "../../types/media";

const PUBLIC_IMAGE_MIME_TYPES = new Set([
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const EXTERNAL_HOSTS: Readonly<
  Record<ExternalResourceKind, readonly string[]>
> = {
  repository: ["github.com"],
  video: ["youtube.com", "www.youtube.com", "youtu.be"],
  verification: [],
};

function decodeForInspection(value: string): string | undefined {
  try {
    let decoded = value;
    for (let pass = 0; pass < 2; pass += 1) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
    return decoded;
  } catch {
    return undefined;
  }
}

function isPrivateAssetReference(value: string): boolean {
  const decoded = decodeForInspection(value);
  if (!decoded) return true;

  const normalized = decoded.replaceAll("\\", "/").toLowerCase();
  return (
    normalized.startsWith("file:") ||
    normalized.includes("/asset/") ||
    normalized.startsWith("asset/") ||
    normalized.includes("/../") ||
    normalized.endsWith("/..")
  );
}

export function isSafePublicPath(value: string | undefined): value is string {
  if (!value || isPrivateAssetReference(value)) return false;

  if (value.startsWith("/")) {
    const decoded = decodeForInspection(value);
    return Boolean(
      decoded && !decoded.startsWith("//") && !decoded.includes("\\"),
    );
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isPublicationReady(item: {
  availability: string;
  publicationApproved: boolean;
}): boolean {
  return item.availability === "available" && item.publicationApproved;
}

export function isApprovedExternalDestination(
  value: string | undefined,
  kind: ExternalResourceKind,
): value is string {
  if (!isSafePublicPath(value) || value.startsWith("/")) return false;

  const url = new URL(value);
  const approvedHosts = EXTERNAL_HOSTS[kind];
  return approvedHosts.includes(url.hostname);
}

export function isRenderableManagedImage(
  image: ManagedImagePresentation,
): boolean {
  const sourceRatio =
    image.source.kind === "managed"
      ? image.source.width / image.source.height
      : undefined;

  return (
    isPublicationReady(image) &&
    image.source.kind === "managed" &&
    isSafePublicPath(image.source.src) &&
    Number.isInteger(image.source.width) &&
    image.source.width > 0 &&
    Number.isInteger(image.source.height) &&
    image.source.height > 0 &&
    PUBLIC_IMAGE_MIME_TYPES.has(image.source.mimeType) &&
    (image.responsiveVariants?.every(
      (variant) =>
        isSafePublicPath(variant.src) &&
        Number.isInteger(variant.width) &&
        variant.width > 0 &&
        Number.isInteger(variant.height) &&
        variant.height > 0 &&
        sourceRatio !== undefined &&
        Math.abs(variant.width / variant.height - sourceRatio) <= 0.01,
    ) ??
      true) &&
    (image.decorative === true || image.alt.trim().length > 0)
  );
}

export function isPresentableExternalResource(resource: {
  availability: string;
  publicationApproved: boolean;
  kind: ExternalResourceKind;
  href?: string;
  poster?: ManagedImagePresentation;
  generatedPoster?: boolean;
}): boolean {
  return (
    isPublicationReady(resource) &&
    isApprovedExternalDestination(resource.href, resource.kind) &&
    (resource.kind !== "video" ||
      resource.generatedPoster === true ||
      (resource.poster !== undefined &&
        isRenderableManagedImage(resource.poster)))
  );
}

export function buildResponsiveSrcSet(
  image: ManagedImagePresentation,
  maximumWidth?: number,
): string | undefined {
  if (!isRenderableManagedImage(image) || !image.responsiveVariants?.length) {
    return undefined;
  }

  const candidates = maximumWidth
    ? image.responsiveVariants.filter(
        (variant) => variant.width <= maximumWidth,
      )
    : image.responsiveVariants;
  const boundedCandidates =
    candidates.length > 0 ? candidates : image.responsiveVariants.slice(0, 1);

  return [...boundedCandidates]
    .sort((left, right) => left.width - right.width)
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");
}

export function normalizeFocalPoint(
  focalPoint: ManagedImagePresentation["focalPoint"],
): { x: number; y: number } {
  const clamp = (value: number | undefined) =>
    Math.min(100, Math.max(0, Number.isFinite(value) ? (value ?? 50) : 50));

  return { x: clamp(focalPoint?.x), y: clamp(focalPoint?.y) };
}

export function selectInitialGalleryItems<T>(
  items: readonly T[],
  requestedCount = 4,
): { initial: readonly T[]; remainder: readonly T[] } {
  const count =
    Number.isFinite(requestedCount) && requestedCount > 0
      ? Math.min(6, Math.max(1, Math.trunc(requestedCount)))
      : 4;
  return {
    initial: items.slice(0, count),
    remainder: items.slice(count),
  };
}
