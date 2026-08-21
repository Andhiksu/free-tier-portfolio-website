# Free-Tier Portfolio Reference Guide

## Purpose

This is the stable architecture and contributor guide for a reusable bilingual portfolio reference.
It explains how the repository is organized and how to adapt it safely. The original demonstration
deployment and provider resources have been retired; this repository does not control or describe
any currently active personal website. The repository remains a public educational case study of a
free-tier build. Durable rules and approval boundaries live only in
`docs/GOVERNANCE.md`; current repository state lives in `docs/PROGRESS.md`.

## Product goals

The site presents verified professional context, projects, experience, credentials, and approved
media for international and Indonesian audiences. The product favors:

1. accurate, publishable content;
2. privacy and safe failure;
3. accessibility and performance;
4. maintainable architecture;
5. restrained visual polish;
6. advanced features only when they solve a demonstrated need.

The default experience is English and light themed. Indonesian routes and dark mode are first-class,
not afterthoughts. Liquid Glass is used for focal or interactive surfaces while long-form content
retains opaque readable backgrounds.

## Technology

| Area               | Choice                              | Contract                                   |
| ------------------ | ----------------------------------- | ------------------------------------------ |
| Package management | pnpm workspace                      | Version pinned in `package.json`           |
| Runtime            | Node.js                             | Version pinned in `package.json`           |
| Website            | Astro + strict TypeScript           | Static output only                         |
| Styling            | Tailwind CSS plus shared CSS tokens | No unapproved visual framework replacement |
| CMS                | Sanity Studio                       | Standalone workspace in `apps/studio`      |
| Hosting            | Cloudflare Pages                    | Static files from `apps/web/dist`          |
| Source control     | GitHub                              | Remote mutations remain owner-gated        |

Do not change these choices without an accepted ADR and the applicable owner approval.

## Repository map

```text
.
├── apps/
│   ├── studio/                 # Standalone Sanity Studio, schemas, and guarded scripts
│   └── web/                    # Static Astro website
├── content-source/             # Public-safe inventories, registers, and batch evidence
├── docs/                       # Governance, decisions, status, history, and runbooks
├── scripts/
│   ├── verify.mjs              # Canonical local/CI verification orchestrator
│   └── codex/                  # Optional provider adapter; no unique authority
├── .agents/skills/             # Optional provider-neutral workflow procedures
├── .codex/                     # Optional Codex role configuration
├── .github/workflows/          # Read-only CI workflow
├── AGENTS.md                   # Concise operating entry point
├── package.json                # Workspace scripts and tool versions
└── pnpm-lock.yaml              # Frozen dependency graph
```

Inside `apps/web`:

```text
src/
├── components/                 # Layout, navigation, page, section, media, and UI components
├── data/                       # Reviewed static fallback content
├── layouts/                    # Shared document layout and metadata rendering
├── lib/
│   ├── sanity/                 # Environment, client, queries, validation, adapters, loader
│   ├── metadata.ts             # Canonical, social, robots, and JSON-LD metadata
│   └── routes.ts               # Public route registry and locale/hash helpers
├── pages/                      # Astro route entry points
├── scripts/                    # Small progressive-enhancement controllers
├── styles/                     # Shared tokens and presentation rules
└── types/                      # Rendering contracts
```

## Public route model

The root redirects permanently to `/en/`. Public localized route families are:

- `/en/` and `/id/`;
- `/en/experience/` and `/id/experience/`;
- `/en/projects/` and `/id/projects/`;
- four paired project-detail route sets under `/en/projects/<slug>/` and
  `/id/projects/<slug>/`;
- `/en/credentials/` and `/id/credentials/`;
- `/en/media/` and `/id/media/`.

The route registry in `apps/web/src/lib/routes.ts` is the implementation authority for canonical
paths, locale alternates, and sitemap entries. Indexable pages require a canonical public pathname
and a matching locale. The 404 page is non-indexable and must not emit canonical or default entity
JSON-LD.

Homepage destinations use localized hash navigation as progressive enhancement. With JavaScript,
one focused panel is shown. Without JavaScript, semantic sections remain present and scrollable.
Standalone Experience and Project pages intentionally use the fixed workspace shell while their
main content remains internally scrollable.

## Rendering and content flow

```text
Sanity published dataset
        |
        v
tokenless draft-excluding queries
        |
        v
runtime validation ----------> invalid/missing/fetch failure
        |                                  |
        v                                  v
typed adapters                       static fallback
        |                                  |
        +------------------+---------------+
                           v
                  Astro static rendering
```

`apps/web/src/lib/sanity/loader.ts` coordinates the boundary. CMS records never flow directly into
components. The validator enforces localization, route identity, publication metadata, public
privacy/redaction status, safe links, supported media types, dimensions, file sizes, and bounded
content shapes. The adapter produces presentation models shared by CMS and static fallback paths.

Production uses the `published` perspective and explicitly excludes draft IDs. No browser token is
used. Missing or partial configuration, network failures, and invalid records return safe fallback
content without exposing upstream errors.

## Sanity Studio boundary

`apps/studio` is an authoring application, not part of the public Astro runtime. It contains bounded
schemas for site settings, profile, experience, projects, credentials, media items, and supporting
objects. Studio field validation improves editor feedback, but web runtime validation remains the
publication boundary because schema rules can be bypassed by APIs or old records.

Environment names are documented in `.env.example`. Actual values stay in ignored local/provider
configuration. Never use a `PUBLIC_` token or expose a draft/read token in the web bundle.

Guarded Studio scripts default to read-only or require an explicit apply flag and exact environment
constraints. Their presence does not authorize a dataset mutation. Content publication, asset
upload, or schema migration still requires an exact owner gate.

## Content and provenance

Tracked registers under `content-source/` record non-sensitive evidence relationships and approved
publication decisions. Important concepts are:

- a source can support a claim without being safe to publish;
- a Sanity asset can exist without approval to render it;
- duplicate or unsafe source files may contribute through a derivative, extracted fact, grouping,
  or aggregate provenance record;
- private paths and contents never belong in tracked registers;
- public Project content is paired English/Indonesian;
- metrics, credentials, and professional claims require verified support; owner-controlled contact
  channels and links require their applicable source/privacy review plus an exact publication gate.

Historical batch files record exact past gates. They do not authorize a new batch.

## UI system

Shared design tokens and component styles live in `apps/web/src/styles/global.css`. Reuse existing
tokens and components before adding new ones. Preserve:

- light-first and readable dark themes;
- visible keyboard focus;
- semantic headings and landmarks;
- restrained motion with `prefers-reduced-motion` support;
- readable opaque surfaces for long text;
- graceful missing-image and missing-content states;
- responsive layouts at narrow mobile through wide desktop sizes;
- localized accessible names and link purposes.

Images become lightbox triggers only after JavaScript annotates eligible non-decorative images.
Triggers must support click, Enter, Space, Escape, an accessible dialog name, and focus return.

## Local setup

Prerequisites:

- Git;
- Node version from `.node-version`;
- pnpm version from the `packageManager` field in `package.json`.

From a fresh clone:

```bash
pnpm install --frozen-lockfile
pnpm dev:web
```

Run Studio separately only when needed:

```bash
pnpm dev:studio
```

Studio and CMS-backed builds need the non-secret identifiers documented in `.env.example`. A web
build without valid CMS configuration intentionally uses the static fallback.

## Canonical commands

| Goal                        | Command                |
| --------------------------- | ---------------------- |
| Start web development       | `pnpm dev:web`         |
| Start Studio development    | `pnpm dev:studio`      |
| Format files                | `pnpm format`          |
| Check formatting            | `pnpm format:check`    |
| Lint all workspaces         | `pnpm lint`            |
| Type-check all workspaces   | `pnpm type-check`      |
| Run web tests               | `pnpm test`            |
| Validate Studio schema      | `pnpm schema:validate` |
| Build web                   | `pnpm build:web`       |
| Build Studio                | `pnpm build:studio`    |
| Build both                  | `pnpm build`           |
| Complete local verification | `pnpm verify`          |

`pnpm verify` is also the CI quality command. It uses harmless Studio placeholders only when the
corresponding environment variables are absent. Without web CMS configuration, the Astro build uses
the static fallback; with valid web configuration, it may perform tokenless published-data reads.
The command never mutates Sanity.

## Testing approach

The automated suite covers CMS queries and publication boundaries, fallbacks, route metadata,
content registers, media presentation, deployment artifacts, and source-level interaction
contracts. A successful static build verifies all generated routes.

UI work also requires browser inspection of affected English and Indonesian pages, representative
320/390/768/1024/1440 widths, keyboard/focus behavior, light and dark themes, reduced motion,
no-JavaScript behavior, and missing media/content. Record actual results rather than fixed historical
counts.

## Branch and checkpoint workflow

1. Read `docs/PROGRESS.md` and verify `git status`, branch, HEAD, remotes, and worktrees.
2. Fetch the remote only when allowed and use a focused branch from the verified base.
3. Make one bounded implementation path; other sessions remain read-only.
4. Run targeted checks while iterating and `pnpm verify` before checkpointing.
5. Obtain proportional independent read-only review.
6. Create coherent local conventional commits only when the scope authorizes them.
7. Report the exact branch, HEAD, diff, checks, reviews, risks, and one next task.
8. Stop at the owner gate for push, PR, merge, deployment, publication, or cleanup.

Follow `docs/GOVERNANCE.md` for the complete approval list.

## Deployment and recovery

Astro builds static files to `apps/web/dist`. The historical Cloudflare Pages contract and Sanity
boundary are documented in `docs/DEPLOYMENT.md`. Sanity publication did not have a verified automatic
rebuild path in this repository. These notes describe the archived build and do not authorize changes
to Cloudflare, Sanity, GitHub visibility, custom domains, or the replacement website.

For an outage or bad release, follow `docs/DISASTER_RECOVERY.md`. Never rewrite `main`, force-push,
or perform a provider rollback without the exact owner gate and verified target.

## Where to record a change

- new durable rule: `docs/GOVERNANCE.md`;
- architecture/product decision: `docs/DECISIONS.md`;
- stable contributor explanation: this guide;
- outcome/exit-criteria change: `docs/ROADMAP.md`;
- current state or next task: `docs/PROGRESS.md`;
- chronological milestone evidence: append `docs/PHASE_LOG.md`;
- notable public/operator change: `CHANGELOG.md`;
- setup command change: `README.md` and, if needed, `docs/ENVIRONMENT_SETUP.md`.

Do not duplicate the same fact across every document.
