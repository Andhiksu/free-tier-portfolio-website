import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { URL } from "node:url";

import {
  DEFAULT_SANITY_API_VERSION,
  parseCmsEnvironment,
} from "../src/lib/sanity/environment.ts";

test("missing Sanity configuration activates the safe fallback state", () => {
  const result = parseCmsEnvironment({});

  assert.equal(result.status, "missing");
});

test("partial Sanity configuration is rejected", () => {
  const result = parseCmsEnvironment({
    SANITY_PROJECT_ID: "example0",
    SANITY_DATASET: "production",
  });

  assert.equal(result.status, "invalid");
});

test("invalid identifiers and calendar dates are rejected", () => {
  assert.equal(
    parseCmsEnvironment({
      SANITY_PROJECT_ID: "INVALID!",
      SANITY_DATASET: "production",
      SANITY_API_VERSION: DEFAULT_SANITY_API_VERSION,
    }).status,
    "invalid",
  );
  assert.equal(
    parseCmsEnvironment({
      SANITY_PROJECT_ID: "example0",
      SANITY_DATASET: "production",
      SANITY_API_VERSION: "2025-02-31",
    }).status,
    "invalid",
  );
});

test("complete build-only configuration is accepted without a token", () => {
  const result = parseCmsEnvironment({
    SANITY_PROJECT_ID: "example0",
    SANITY_DATASET: "production",
    SANITY_API_VERSION: DEFAULT_SANITY_API_VERSION,
  });

  assert.deepEqual(result, {
    status: "configured",
    value: {
      projectId: "example0",
      dataset: "production",
      apiVersion: DEFAULT_SANITY_API_VERSION,
    },
  });
  assert.equal("token" in result.value, false);
});

test("the static build reader keeps unprefixed CMS values server-only", async () => {
  const source = await readFile(
    new URL("../src/lib/sanity/environment.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /process\.env\.SANITY_PROJECT_ID/);
  assert.match(source, /process\.env\.SANITY_DATASET/);
  assert.match(source, /process\.env\.SANITY_API_VERSION/);
  assert.doesNotMatch(source, /import\.meta\.env/);
});
