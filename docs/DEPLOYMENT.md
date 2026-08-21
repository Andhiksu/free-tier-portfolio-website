# Historical Deployment Contract

This document describes the archived demonstration build, not a current personal website. The
original deployment has been retired. Provider names and configuration below are historical
architecture evidence only and are not authorization to change Cloudflare, Sanity, GitHub, custom
domains, or deployment resources.

## Historical status

The portfolio was built as a static Astro site hosted on Cloudflare Pages.

- Primary origin: owner-controlled custom domain (retired)
- Provider host: Cloudflare Pages subdomain (retired)
- Production branch: `main`
- Static output: `apps/web/dist`
- Hosted Studio: authenticated Sanity Studio host (retired)
- Public indexing: enabled
- CMS-triggered rebuild automation: deferred; no verified deploy hook or webhook

Read-only HTTP verification on 2026-08-10 confirmed that the historical primary root redirected to `/en/`, both
the primary and provider hosts served the localized site, production security headers were present,
`robots.txt` permits crawling, and the sitemap exposes the paired public route set. The exact
Cloudflare deployment record serving the custom domain at that time was not verified through a
provider API and must not be inferred from Git alone.

Historical deployment actions and exact past SHAs remain in `docs/PHASE_LOG.md`. This document
defines the archived build contract, not a current production commitment or phase diary.

## Read-only provider inventory

On 2026-08-20, a read-only inspection identified these named legacy resources before their later
retirement:

- A private GitHub source repository with `main` as the observed default branch. The public
  reference now lives at `example-user/free-tier-portfolio-website`.
- A Cloudflare Pages project linked to that source repository, with production source `main`,
  automatic deployments enabled, a provider subdomain, and no custom domains shown at inspection.
- A Sanity project on the Free plan with a public `production` dataset and hosted Studio entry.

That inventory was historical evidence, not current provider state. The named Pages project, Sanity
project, dataset, and legacy domain relationship were subsequently retired. This repository must not
be used to infer or change any active personal infrastructure.

## Repository build contract

| Setting                         | Value                                                               |
| ------------------------------- | ------------------------------------------------------------------- |
| Framework/output                | Astro static output                                                 |
| Repository root                 | repository root                                                     |
| Build command                   | `pnpm install --frozen-lockfile --ignore-scripts && pnpm build:web` |
| Output directory                | `apps/web/dist`                                                     |
| Node                            | `24.18.0`                                                           |
| pnpm                            | `11.11.0`                                                           |
| Canonical local/CI verification | `pnpm verify`                                                       |

`apps/web/astro.config.mjs` must retain `output: "static"`, the production origin, trailing slashes,
and explicit English/Indonesian locale routing. No Worker, Pages Function, SSR server, or custom
runtime is part of the accepted website architecture.

The deterministic provider install intentionally disables lifecycle scripts. Local development and
CI use the frozen lockfile. Any change to install policy or dependencies requires a separate
supply-chain review and owner gate where applicable.

## Environment boundary

Provider configuration may supply only the documented build-time names:

- `NODE_VERSION`
- `PNPM_VERSION`
- `SKIP_DEPENDENCY_INSTALL`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`

The repository stores names only in `.env.example`; actual values remain in ignored local files or
provider configuration. The website's Sanity identifiers are build-only and must not use `PUBLIC_`.
No draft/read token is needed for production. Never configure `SANITY_API_READ_TOKEN` in browser
code or expose any token in build output, logs, screenshots, issues, or reports.

Studio identifiers use the separate `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` names in
`apps/studio/.env.local`. Studio deployment, configuration, and access changes remain separate from
the static website deployment.

## CMS and static-build behavior

Astro fetches public Sanity records during build with tokenless queries that request the published
perspective and explicitly exclude drafts. Responses pass through runtime validation. Missing
configuration, failed fetches, or invalid records activate reviewed static fallback data.

Sanity publication does not currently trigger a verified Cloudflare rebuild. A content release must
therefore include a separately approved build/deployment action and post-deployment verification.

Any future automation requires a new accepted design covering:

- exact Cloudflare and Sanity actions;
- hook/token creation, storage, rotation, and revocation;
- request authentication and replay/rate-limit behavior;
- observable deployment correlation rather than HTTP-response inference;
- failure, retry, alerting, and rollback;
- an exact owner gate before provider mutation.

## Routing, indexing, and headers

Repository-controlled deployment artifacts are:

- `apps/web/public/_redirects`: permanent `308` from `/` to `/en/`;
- `apps/web/public/_headers`: frame denial, MIME sniffing protection, strict-origin referrer policy,
  restrictive camera/geolocation/microphone policy, and immutable caching for static assets;
- `apps/web/public/robots.txt`: allows crawling and names the canonical sitemap;
- generated `sitemap.xml`: includes indexable paired localized routes.

There is currently no Content Security Policy. Adding one requires a route, asset, third-party, and
Studio/build audit so it does not silently break the site. Security headers are defense in depth,
not access control; every deployed file and CMS record must already be public-safe.

Cloudflare may prepend managed crawler directives to the served `robots.txt`. Post-deployment QA
must verify that the repository's final `Allow` and sitemap contract remains present.

## Release preflight

Before asking for deployment approval:

1. verify the exact branch, HEAD, clean worktree, and intended diff;
2. run `pnpm verify`;
3. run browser QA on affected English and Indonesian routes and representative viewports;
4. confirm required independent reviews have no unresolved Blocker/High finding;
5. scan for secrets, private paths, unsupported claims, and unapproved assets/content;
6. verify current GitHub CI and open pull-request state;
7. identify the exact last-known-good deployment and rollback path through read-only provider
   inspection;
8. request one exact owner approval for the next remote action only.

Push, pull-request creation/update, merge, and deployment are separate gates. A successful local
build or CI run does not authorize production.

## Post-deployment verification

After an explicitly approved deployment, verify and record:

- the provider deployment ID, source commit, status, and timestamp;
- `/` redirect behavior;
- `/en/`, `/id/`, Experience, Projects, all Project details, Credentials, Media Library, and a 404;
- canonical URLs, hreflang, sitemap, and robots response;
- response headers and asset caching;
- light/dark themes, keyboard/focus, reduced motion, no-JavaScript behavior, and missing media;
- absence of tokens, private paths, unsupported claims, and unapproved content;
- CMS-backed output or intentional fallback state;
- rollback target and any unverified external fact.

Update `docs/PROGRESS.md` for current state and append `docs/PHASE_LOG.md` for chronological evidence.
Update `CHANGELOG.md` only for a notable release change.

## Rollback boundary

A Cloudflare rollback, forward Git revert, Studio rollback, provider configuration change, or
redeployment requires exact owner approval. Never force-push, hard-reset shared history, delete the
Pages project, disconnect Git integration, or mutate Sanity as an improvised rollback.

Use the exact procedure in `docs/DISASTER_RECOVERY.md`. If no verified provider rollback target is
available, prepare a reviewed forward corrective commit and normal release path; do not claim a
rollback occurred until the provider state is observed.

## Separately gated actions

Each of the following needs a new exact owner approval: push, pull-request change, merge, tag,
deployment, rollback, custom domain or DNS, Pages/Studio configuration, hooks/webhooks, secrets,
CORS/access control, authentication, CMS mutation, content publication, asset upload/delete,
analytics, forms, server runtime, paid service, and branch cleanup.
