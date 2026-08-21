import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";

import {
  CREDENTIAL_QUERY,
  EXPERIENCE_QUERY,
  fetchPublishedCmsRecords,
  MEDIA_QUERY,
  PROFILE_QUERY,
  PROJECT_QUERY,
  SITE_SETTINGS_QUERY,
} from "../src/lib/sanity/queries.ts";

const queries = [
  SITE_SETTINGS_QUERY,
  PROFILE_QUERY,
  EXPERIENCE_QUERY,
  PROJECT_QUERY,
  CREDENTIAL_QUERY,
  MEDIA_QUERY,
];

test("all six queries explicitly exclude drafts", () => {
  for (const query of queries) {
    assert.match(query, /!\(_id in path\("drafts\.\*\*"\)\)/);
  }
});

test("EXPERIENCE_QUERY includes achievements and responsibilities", () => {
  assert.match(EXPERIENCE_QUERY, /\bresponsibilities\b/);
  assert.match(EXPERIENCE_QUERY, /\bachievements\b/);
});

test("Credential query includes bounded gallery metadata without changing Project media", () => {
  assert.match(CREDENTIAL_QUERY, /"gallery": gallery\[\]/);
  for (const field of [
    "decorative",
    "alt",
    "caption",
    "source",
    "ownership",
    "credit",
    "privacyStatus",
    "redactionStatus",
    "publicationApproved",
    "crop",
    "hotspot",
    "mimeType",
    "size",
    "width",
    "height",
  ]) {
    assert.match(CREDENTIAL_QUERY, new RegExp(`\\b${field}\\b`));
  }
  assert.doesNotMatch(PROJECT_QUERY, /\bcrop\b|\bhotspot\b/);
});

test("all six fetches explicitly request the published perspective", async () => {
  const calls = [];
  const responses = [null, null, [], [], [], []];
  const client = {
    async fetch(query, params, options) {
      calls.push({ query, params, options });
      return responses[calls.length - 1];
    },
  };

  await fetchPublishedCmsRecords(client);

  assert.equal(calls.length, 6);
  assert.deepEqual(
    calls.map((call) => call.options),
    Array.from({ length: 6 }, () => ({ perspective: "published" })),
  );
  assert.ok(calls.every((call) => Object.keys(call.params).length === 0));
});

test("browser-delivered Sanity secrets are absent from the frontend boundary", async () => {
  const sourceUrls = [
    new URL("../src/lib/sanity/client.ts", import.meta.url),
    new URL("../src/lib/sanity/loader.ts", import.meta.url),
    new URL("../src/lib/sanity/queries.ts", import.meta.url),
  ];
  const sources = await Promise.all(
    sourceUrls.map((url) => readFile(url, "utf8")),
  );
  const boundarySource = sources.join("\n");

  assert.doesNotMatch(boundarySource, /PUBLIC_(?:SANITY|CMS)/);
  assert.doesNotMatch(boundarySource, /SANITY_API_READ_TOKEN/);
  assert.doesNotMatch(boundarySource, /\btoken\s*:/);
});
