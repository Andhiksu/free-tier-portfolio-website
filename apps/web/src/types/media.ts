import type { HomeLocale } from "./home";

export type MediaAvailability = "available" | "missing" | "unavailable";

export interface ResponsiveImageVariant {
  src: string;
  width: number;
  height: number;
}

export type MediaSource =
  | {
      kind: "managed";
      src: string;
      width: number;
      height: number;
      mimeType: "image/avif" | "image/jpeg" | "image/png" | "image/webp";
    }
  | {
      kind: "placeholder";
    };

export interface ManagedImagePresentation {
  id: string;
  availability: MediaAvailability;
  publicationApproved: boolean;
  source: MediaSource;
  responsiveVariants?: readonly ResponsiveImageVariant[];
  sizes?: string;
  alt: string;
  caption?: string;
  credit?: string;
  decorative?: boolean;
  focalPoint?: { x: number; y: number };
}

export interface DocumentPresentation {
  id: string;
  availability: MediaAvailability;
  publicationApproved: boolean;
  title: string;
  description: string;
  href?: string;
  fileType: "PDF";
  fileSizeLabel?: string;
  pageCount?: number;
  preview?: ManagedImagePresentation;
}

export type ExternalResourceKind = "repository" | "video" | "verification";

export interface ExternalResourcePresentation {
  id: string;
  availability: MediaAvailability;
  publicationApproved: boolean;
  kind: ExternalResourceKind;
  title: string;
  description?: string;
  href?: string;
  poster?: ManagedImagePresentation;
  generatedPoster?: boolean;
}

export interface RelatedContentPresentation {
  id: string;
  availability: MediaAvailability;
  publicationApproved: boolean;
  title: string;
  description?: string;
  href?: `/${HomeLocale}/${string}`;
  relationship: "evidence" | "project";
}

export interface CredentialPresentation {
  id: string;
  availability: MediaAvailability;
  publicationApproved: boolean;
  title: string;
  issuer: string;
  dateLabel?: string;
  credentialId?: string;
  summary?: string;
  issuerLogo?: ManagedImagePresentation;
  preview?: ManagedImagePresentation;
  gallery: readonly ManagedImagePresentation[];
  document?: DocumentPresentation;
  verification?: ExternalResourcePresentation;
  related: readonly RelatedContentPresentation[];
}
