import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { URL, fileURLToPath } from "node:url";

const repositoryRoot = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../../..",
);
const publicDirectory = resolve(repositoryRoot, "apps/web/public");

function readRepositoryFile(...segments) {
  return readFileSync(resolve(repositoryRoot, ...segments), "utf8");
}

test("deployment foundation pins the approved Node version", () => {
  assert.equal(readRepositoryFile(".node-version"), "24.18.0\n");
});

test("production robots.txt allows indexing and references sitemap", () => {
  assert.equal(
    readFileSync(resolve(publicDirectory, "robots.txt"), "utf8"),
    "User-agent: *\nAllow: /\n\nSitemap: https://portfolio.example.com/sitemap.xml\n",
  );
});

test("static Pages policy preserves the canonical root redirect and safe headers", () => {
  assert.equal(
    readFileSync(resolve(publicDirectory, "robots.txt"), "utf8"),
    "User-agent: *\nAllow: /\n\nSitemap: https://portfolio.example.com/sitemap.xml\n",
  );

  assert.equal(
    readFileSync(resolve(publicDirectory, "_redirects"), "utf8"),
    "/ /en/ 308\n",
  );

  const headers = readFileSync(resolve(publicDirectory, "_headers"), "utf8");
  for (const policy of [
    "X-Frame-Options: DENY",
    "X-Content-Type-Options: nosniff",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "Permissions-Policy: camera=(), geolocation=(), microphone=()",
  ]) {
    assert.match(
      headers,
      new RegExp(`^ {2}${policy.replace(/[()]/g, "\\$&")}$`, "m"),
    );
  }
});

test("deployment runbook preserves a clean-build dependency boundary", () => {
  const packageJson = JSON.parse(readRepositoryFile("package.json"));
  assert.equal(packageJson.devDependencies !== undefined, true);
});
