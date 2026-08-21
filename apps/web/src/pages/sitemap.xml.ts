import { getSitemapPathnames, PRODUCTION_ORIGIN } from "../lib/routes";

export const prerender = true;

function escapeXml(value: string): string {
  return value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export function GET(): Response {
  const entries = getSitemapPathnames()
    .map(
      (pathname) =>
        `  <url><loc>${escapeXml(new URL(pathname, PRODUCTION_ORIGIN).href)}</loc></url>`,
    )
    .join("\n");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
