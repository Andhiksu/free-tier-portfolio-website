import {
  getCanonicalPublicPathname,
  getLocaleAlternateRoutes,
  PRODUCTION_ORIGIN,
  type PublicPathname,
  type SupportedLocale,
} from "./routes.ts";

export interface PageMetadataInput {
  locale: SupportedLocale;
  title: string;
  description: string;
  pathname?: PublicPathname | string;
  indexable: boolean;
  socialImage?: string;
  structuredData?: Record<string, unknown> | readonly Record<string, unknown>[];
}

export interface PageMetadata {
  locale: SupportedLocale;
  title: string;
  description: string;
  canonicalUrl?: string;
  alternates: readonly {
    locale: SupportedLocale;
    href: string;
  }[];
  robots?: "noindex,nofollow";
  openGraph: {
    title: string;
    description: string;
    type: "website";
    locale: "en_US" | "id_ID";
    url?: string;
    image: string;
    alternateLocales: readonly ("en_US" | "id_ID")[];
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
  structuredData: readonly Record<string, unknown>[];
}

const openGraphLocales = {
  en: "en_US",
  id: "id_ID",
} as const satisfies Readonly<Record<SupportedLocale, "en_US" | "id_ID">>;

const DEFAULT_SOCIAL_IMAGE_PATH = "/images/og-default.svg";

function requireText(value: string, field: "title" | "description"): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new Error(`Metadata ${field} must not be empty.`);
  }

  return trimmedValue;
}

function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, PRODUCTION_ORIGIN).href;
}

function getDefaultStructuredData(
  canonicalUrl?: string,
): readonly Record<string, unknown>[] {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio Owner: Portfolio",
    url: PRODUCTION_ORIGIN,
    inLanguage: ["en-US", "id-ID"],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Portfolio Owner",
    url: PRODUCTION_ORIGIN,
    sameAs: [
      "https://www.linkedin.com/in/example-profile/",
      "https://github.com/example-user",
    ],
    knowsAbout: [
      "Data Analytics",
      "Business Intelligence",
      "Data Science",
      "Applied AI",
      "Computer Vision",
      "Natural Language Processing",
    ],
  };

  if (
    !canonicalUrl ||
    canonicalUrl === PRODUCTION_ORIGIN ||
    canonicalUrl === `${PRODUCTION_ORIGIN}/`
  ) {
    return [websiteSchema, personSchema];
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: PRODUCTION_ORIGIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: canonicalUrl.split("/").filter(Boolean).pop() || "Page",
        item: canonicalUrl,
      },
    ],
  };

  return [websiteSchema, personSchema, breadcrumbSchema];
}

export function buildPageMetadata(input: PageMetadataInput): PageMetadata {
  const title = requireText(input.title, "title");
  const description = requireText(input.description, "description");
  const socialImageUrl = toAbsoluteUrl(
    input.socialImage || DEFAULT_SOCIAL_IMAGE_PATH,
  );

  const customSchemas = Array.isArray(input.structuredData)
    ? input.structuredData
    : input.structuredData
      ? [input.structuredData]
      : [];

  if (!input.indexable) {
    return {
      locale: input.locale,
      title,
      description,
      alternates: [],
      robots: "noindex,nofollow",
      openGraph: {
        title,
        description,
        type: "website",
        locale: openGraphLocales[input.locale],
        image: socialImageUrl,
        alternateLocales: [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        image: socialImageUrl,
      },
      structuredData: customSchemas,
    };
  }

  if (!input.pathname) {
    throw new Error("Indexable metadata requires a public pathname.");
  }

  const pathname = getCanonicalPublicPathname(input.pathname);
  const alternateRoutes = getLocaleAlternateRoutes(pathname);
  const currentRoute = alternateRoutes.find(
    (route) => route.pathname === pathname,
  );

  if (!currentRoute || currentRoute.locale !== input.locale) {
    throw new Error("Metadata locale does not match its public pathname.");
  }

  const alternates = alternateRoutes.map((route) => ({
    locale: route.locale,
    href: toAbsoluteUrl(route.pathname),
  }));
  const canonicalUrl = toAbsoluteUrl(pathname);
  const defaultSchemas = getDefaultStructuredData(canonicalUrl);

  return {
    locale: input.locale,
    title,
    description,
    canonicalUrl,
    alternates,
    openGraph: {
      title,
      description,
      type: "website",
      locale: openGraphLocales[input.locale],
      url: canonicalUrl,
      image: socialImageUrl,
      alternateLocales: alternates
        .filter((alternate) => alternate.locale !== input.locale)
        .map((alternate) => openGraphLocales[alternate.locale]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: socialImageUrl,
    },
    structuredData: [...defaultSchemas, ...customSchemas],
  };
}

export function serializeStructuredData(
  schema: Record<string, unknown>,
): string {
  return JSON.stringify(schema).replaceAll("<", "\\u003c");
}
