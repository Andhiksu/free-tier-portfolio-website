# Decisions Log

Record decisions that affect architecture, product scope, content, security, or development workflow.

## Template

### ADR-000: Decision title

- **Date:** YYYY-MM-DD
- **Status:** Proposed / Accepted / Superseded
- **Context:**
- **Decision:**
- **Alternatives considered:**
- **Consequences:**
- **Related files/issues:**

---

### ADR-001: English-first bilingual portfolio

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** The portfolio targets international and Indonesian audiences.
- **Decision:** English is the required primary language. Indonesian is added progressively using locale-specific routes.
- **Alternatives considered:** English only; browser translation.
- **Consequences:** Content models require locale-aware fields and safe fallback behavior.

### ADR-002: Light-first semi liquid glass

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** The desired UI is modern and interactive but must remain spacious and professional.
- **Decision:** Use a bright default theme, optional dark mode, and selective translucent surfaces.
- **Alternatives considered:** Full glassmorphism; dark-only futuristic UI.
- **Consequences:** Contrast and fallbacks must be tested carefully.

### ADR-003: Publish-first modular MVP

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** The website needs to become usable on CV and LinkedIn quickly.
- **Decision:** Build the smallest complete portfolio first and add evidence, insights, and services later.
- **Alternatives considered:** Build every feature before launch.
- **Consequences:** Strong phase boundaries and backlog discipline are required.

### ADR-004: Astro and Sanity

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** The site is content-heavy and must be easy to update.
- **Decision:** Use Astro for the frontend and Sanity Studio for structured CMS content.
- **Alternatives considered:** WordPress; Next.js; static Markdown only.
- **Consequences:** Schema design and CMS integration are core project work.

### ADR-005: Canonical phase order

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** Phase numbering in the project guide and progress tracker diverged from the launch sequence in the roadmap.
- **Decision:** `docs/ROADMAP.md` is the canonical source for phase order, scope, and exit criteria. Other planning documents must remain aligned with it.
- **Alternatives considered:** Keep the shorter phase sequence in `docs/PROJECT_GUIDE.md`; renumber the roadmap.
- **Consequences:** Core pages remain Phase 3, Sanity remains Phase 4, real content remains Phase 5, and production launch remains Phase 6.
- **Related files/issues:** `docs/ROADMAP.md`, `docs/PROJECT_GUIDE.md`, `docs/PROGRESS.md`.

### ADR-006: Prefixed locale routes with deterministic English root

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** English is the primary language, both locales require stable URLs, and Phase 1 must not make locale choices from browser state. Astro's automatic default-locale redirect produced a root prerender route conflict with the required `src/pages/index.astro` route.
- **Decision:** Configure Astro i18n with `en` and `id`, `defaultLocale: "en"`, `prefixDefaultLocale: true`, and `redirectToDefaultLocale: false`. The explicit root page returns `Astro.redirect("/en/", 308)`, preserving a deterministic English root redirect without browser-language detection. Indonesian content fallback is not implemented in Phase 1.
- **Alternatives considered:** Astro's automatic default-locale redirect; unprefixed English routes; browser-language detection; immediate English fallback for missing Indonesian content.
- **Consequences:** Public route foundations are `/en/` and `/id/`, and the project explicitly owns the permanent redirect from `/` to `/en/`. Content fallback remains deferred until the CMS phase.
- **Related files/issues:** `apps/web/astro.config.mjs`, `apps/web/src/pages/index.astro`.

### ADR-007: Defer Sanity initialization

- **Date:** 2026-07-10
- **Status:** Accepted
- **Context:** Phase 1 needs a workspace boundary for the future CMS but does not need a Sanity project, dataset, schema, dependency, or credential.
- **Decision:** Reserve `apps/studio` with documentation only and initialize Sanity in Phase 4.
- **Alternatives considered:** Initialize an empty Sanity application in Phase 1; omit the Studio directory until Phase 4.
- **Consequences:** Phase 1 remains installable without Sanity dependencies or external project setup while preserving the intended workspace structure.
- **Related files/issues:** `apps/studio/README.md`, `docs/ROADMAP.md`.

### ADR-008: Controlled Phase 2 single-writer multi-agent pilot

- **Date:** 2026-07-11
- **Status:** Accepted
- **Context:** Phase 2 needs a controlled way to evaluate specialist subagents without creating parallel-write risk or prematurely adopting a permanent Git workflow.
- **Decision:** Run a controlled Phase 2 pilot with one root writer and all custom subagents read-only. Limit delegation to `max_depth = 1` and `max_threads = 4`. The long-lived Phase 2 branch and target of one Phase 2 pull request are pilot choices only. Owner review and explicit approval remain required separately before staging, checkpoint commits, push, pull-request creation, merge, and local or remote branch cleanup. Review the workflow after Slice 2 before deciding whether to continue or adopt any part for future phases.
- **Alternatives considered:** Single-agent execution only; concurrent writable workers; immediately adopting one pull request per phase as a permanent rule.
- **Consequences:** The root task consolidates findings and applies every edit. Review can be delegated without authorizing subagent writes, automatic local commits, or automatic pull-request creation. Future phase branching and pull-request strategy remains undecided until the Slice 2 pilot is evaluated.
- **Related files/issues:** `.codex/config.toml`, `.codex/agents/`, `.github/workflows/ci.yml`, `AGENTS.md`, `docs/MULTI_AGENT_EXECUTION_PLAN.md`, `docs/PHASE_LOG.md`.

### ADR-009: Continue the controlled pilot through Phase 2 review

- **Date:** 2026-07-13
- **Status:** Accepted
- **Context:** ADR-008 required a continuation evaluation after Slice 2. Repository history and the completed Phase 2 evidence show that the controlled pilot continued through Slices 3 to 6 and the fresh branch-level review on the same Phase 2 branch.
- **Decision:** Record the factual Phase 2 continuation: one root writer applied changes, configured reviewers remained read-only, and owner gates remained required separately for staging, checkpoint commits, push, pull-request creation, merge, and branch cleanup. This records only how the Phase 2 pilot continued; it does not approve or mandate this workflow for Phase 3 or later phases.
- **Alternatives considered:** End the pilot after Slice 2; treat the Phase 2 workflow as the permanent default for later phases.
- **Consequences:** The completed Phase 2 slices and branch-level review remain evidence for a separate future workflow decision. Branching, reviewer use, and pull-request strategy for Phase 3 and later phases remain undecided.
- **Related files/issues:** `AGENTS.md`, `.codex/config.toml`, `.codex/agents/`, `docs/MULTI_AGENT_EXECUTION_PLAN.md`, `docs/PHASE_LOG.md`, `docs/PROGRESS.md`.

### ADR-010: Phase 3 hybrid single-writer and risk-based governance

- **Date:** 2026-07-13
- **Status:** Superseded for current workflow by ADR-030 and ADR-032; retained as Phase 3 history
- **Context:** The Phase 2 pilot proved that a single repository writer with read-only specialist review can avoid parallel-write conflicts, but repeating the full review and owner-gate sequence for every small section created unnecessary ceremony. Phase 3 includes documentation, shared visual work, routes, page systems, and integration work with materially different risk levels. It also requires durable ownership boundaries and one predictable branch and pull-request path.
- **Decision:** Adopt the Phase 3 four-party operating model. ChatGPT Project is the context hub and product-direction owner and must not become a repository writer. Codex is the sole implementation writer and release owner; only Codex may apply repository changes. Gemini or Google Antigravity is an independent read-only reviewer whose environment must remain read-only. The human owner is the product and risk authority. Do not assign overlapping work or parallel repository write access. Use the one long-lived branch `phase/3-core-pages-and-case-studies`, create coherent local checkpoint commits per milestone, and target one final Phase 3 pull request by default. Split pull requests require an explicit owner-approved risk-based exception. After the owner approves a milestone implementation scope, Codex may edit, stage, and create local checkpoint commits within that scope without approval per file or per commit. Batch related work by risk and apply Level A verification to low-risk documentation or isolated static changes, Level B verification to shared UI, routes, interaction, accessibility, SEO, or multi-page integration, and Level C verification to security, privacy, forms, CMS, environment, dependency, deployment, production, or architectural work. The highest-risk included change determines the milestone level. Explicit owner approval remains required before push, pull-request creation or update, merge, deployment, DNS or production-resource changes, handling secrets or credentials, purchasing paid services, force operations, destructive Git actions, and local or remote branch cleanup.
- **Alternatives considered:** Continue the complete Phase 2 pilot ceremony for every small slice; leave Phase 3 branch and pull-request strategy undecided; remove specialist review entirely; allow multiple writable agents; use one verification level for all changes; require owner approval per file and per local commit after milestone scope approval.
- **Consequences:** Phase 3 proceeds through one durable branch, coherent milestone checkpoints, and one final pull request by default without weakening the single-writer boundary or human product and risk authority. Review effort scales with risk, independent review remains separated from implementation, and documentation is updated at meaningful checkpoints instead of through repeated closeout loops. High-risk, external, publication, production, force, destructive, secret, credential, paid-service, and branch-cleanup actions retain explicit owner gates. A split pull-request strategy is exceptional rather than implicit and must be justified and approved by the owner.
- **Related files/issues:** `AGENTS.md`, `docs/ROADMAP.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`, `docs/MULTI_AGENT_EXECUTION_PLAN.md`.

### ADR-011: Expressive Liquid Glass with progressive enhancement

- **Date:** 2026-07-13
- **Status:** Accepted
- **Context:** ADR-002 established a light-first, selective semi-liquid-glass direction. Phase 3 needs a more expressive and recognizable material language for core pages and case studies while preserving accessibility, performance, content clarity, and compatibility when advanced visual effects are unavailable.
- **Decision:** Refine ADR-002 into an expressive Liquid Glass direction used at focal and interactive moments rather than across every surface. Translucency, blur, layered depth, specular highlights, and restrained material response are progressive enhancements. Critical content and controls must start from readable opaque styles, retain visible focus, work without backdrop filtering or advanced compositing, preserve light/dark contrast, and respect reduced-motion preferences. Calibrate the shared material system in Milestone 1 before broad reuse. The six owner-supplied references guide principles and atmosphere only; do not copy their branding, text, logos, exact layouts, proprietary assets, or distinctive visual identity.
- **Alternatives considered:** Retain the quieter Phase 2 material treatment without calibration; apply glass to most surfaces; reproduce a supplied reference closely; defer the visual system until after page implementation.
- **Consequences:** Phase 3 may use stronger depth and visual character while long-form reading, forms, tables, and dense content remain stable. Shared tokens and variants must include solid fallbacks, and visual approval of the bounded calibration becomes the gate before propagation.
- **Related files/issues:** `docs/DESIGN_DIRECTION.md`, `docs/PROJECT_GUIDE.md`, `docs/ROADMAP.md`, `apps/web/src/styles/global.css`.

### ADR-012: Minimal Cinematic Spatial Liquid Glass workspace

- **Date:** 2026-07-14
- **Status:** Accepted and partially superseded by ADR-023 and ADR-033
- **Context:** The Phase 3 calibration evolved into a cohesive spatial workspace that the owner accepted after focused manual QA. The durable architecture must preserve semantic delivery and honest content boundaries while allowing the cinematic workspace interaction to remain progressively enhanced.
- **Decision:** Adopt the Minimal Cinematic Spatial Liquid Glass direction and one shared spatial workspace shell. The shell exposes six canonical destinations: Home, About, Experience, Projects, Credentials, and Contact. Astro server-renders the complete destinations as semantic document content. Client-side hash and History behavior progressively enhances navigation and preserves the active workspace across supported locale changes, while the server-rendered document remains the no-JavaScript fallback. Liquid Glass stays selective and strongest on focal or compact interactive surfaces; dense or long-form content uses calm opaque or near-opaque surfaces. The external visual mockup is a design reference only and is not a production asset or runtime dependency.
- **Alternatives considered:** Separate visual systems per destination; a JavaScript-only workspace; applying strong glass to all panels; treating the external mockup as a production asset; retaining a repeated card-grid homepage.
- **Consequences:** All six destinations share one visual and interaction contract, but their panels must remain compositionally distinct. Hash and History enhancement must not replace server-rendered semantics or no-JavaScript access. Locale and theme behavior must preserve the active workspace where the enhancement is available. Unsupported professional content, media, evidence, metrics, and credentials remain omitted or explicitly unavailable rather than fabricated.
- **Related files/issues:** `docs/DESIGN_DIRECTION.md`, `docs/PROGRESS.md`, `apps/web/src/components/pages/HomePage.astro`, `apps/web/src/components/navigation/SiteHeader.astro`, `apps/web/src/scripts/home-workspace.ts`.

### ADR-013: Bilingual public-direction project system

- **Date:** 2026-07-14
- **Status:** Accepted
- **Context:** Phase 3 Milestone 4 requires a useful project archive and reusable detail structure before project-specific evidence, claims, media, and destinations have completed review. The four draft project titles in the content inventory are not approved for publication.
- **Decision:** Publish exactly three generic bilingual project directions: Analytics & decision support, Language & text intelligence, and Computer vision & applied AI. Use the locale-neutral mirrored slugs `analytics-decision-support`, `language-text-intelligence`, and `computer-vision-applied-ai`. Generate a direction's EN and ID detail routes only when all required content is complete in both locales; do not use a silent English fallback. Homepage and archive cards link only to generated detail routes. Detail pages disclose evidence-review-pending status and honest unavailable states for metrics, outcomes, repositories, demos, and related projects. Do not add filters or render related project cards until their relationships are manually approved. Final canonical, locale-alternate head tags, social metadata, structured data, sitemap, and localized 404 handling remain deferred to Milestone 5.
- **Alternatives considered:** Publish the inventory draft titles; create English-only detail routes; silently fall back to English on Indonesian routes; show speculative case-study content; defer all project routes until evidence migration.
- **Consequences:** Milestone 4 provides stable, linkable project-system routes without presenting unverified work as completed case studies. Removing required content from either locale blocks both mirrored detail routes and their homepage/archive links. Real case-study claims, evidence, media, technology details, and related-project relationships remain future reviewed content.
- **Related files/issues:** `apps/web/src/data/projects.ts`, `apps/web/src/types/projects.ts`, `apps/web/src/components/projects/`, `apps/web/src/components/pages/ProjectArchivePage.astro`, `apps/web/src/components/pages/ProjectDetailPage.astro`, `apps/web/src/pages/en/projects/`, `apps/web/src/pages/id/projects/`, `docs/ROADMAP.md`.

### ADR-014: Production-origin, route-metadata, sitemap, and global-error contract

- **Date:** 2026-07-14
- **Status:** Accepted and extended by ADR-023, ADR-025, and ADR-033
- **Context:** Phase 3 Milestone 5 needs one production identity for canonical URLs, a consistent trailing-slash convention, mirrored locale navigation, a static sitemap, and intentional error recovery without adding deployment configuration, request-header-derived origins, dependencies, or unapproved search metadata.
- **Decision:** Use the validated production origin `https://portfolio.example.com/` and Astro `trailingSlash: "always"` while retaining static output. One typed route registry owns supported locales, localized home and Projects paths, detail paths derived from the bilingual published-project catalog, mirrored counterparts, locale-switch destinations, recovery links, workspace hashes, sitemap enumeration, and public-path validation. `BaseLayout.astro` is the only renderer of managed title, description, canonical, locale-alternate, robots, Open Graph, and Twitter metadata. Valid content routes render canonical EN/ID pairs without `x-default`; non-indexable errors omit canonical, alternates, and `og:url`. The sitemap includes only currently published bilingual content routes. A top-level static `404.html` supplies a complete English no-JavaScript fallback and may progressively localize visible recovery copy for an exact first pathname segment of `id` without redirecting.
- **Alternatives considered:** Request-header-derived canonical origins; localhost or preview canonicals; duplicated per-page head tags; a sitemap dependency; a client router; separate generated locale-specific 404 files; Cloudflare redirect or error configuration in Phase 3; implementing robots, JSON-LD, or social images before their policy and assets are approved.
- **Consequences:** The current build has ten indexable content routes with absolute HTTPS canonical URLs and mirrored EN/ID alternates, plus a static sitemap and non-indexable global 404. Draft or incomplete bilingual project records remain excluded rather than causing a fallback or being indexed. `robots.txt`, production-versus-preview indexing policy, JSON-LD, and social-image metadata remain deferred. The source root route still requests a deterministic 308 to `/en/`, but static preview serves the generated redirect artifact as HTTP 200; production host-level status enforcement remains deferred to deployment integration and is not proven here.
- **Related files/issues:** `apps/web/astro.config.mjs`, `apps/web/src/lib/routes.ts`, `apps/web/src/lib/metadata.ts`, `apps/web/src/layouts/BaseLayout.astro`, `apps/web/src/pages/404.astro`, `apps/web/src/pages/sitemap.xml.ts`, `docs/ROADMAP.md`.

### ADR-015: Autonomous Milestone Loop v1 and Phase 4 Git strategy

- **Date:** 2026-07-14
- **Status:** Partially superseded by ADR-030 and ADR-032; the milestone loop remains accepted while provider- and branch-specific clauses are historical
- **Context:** Phase 3 preserved quality and one-writer safety but required excessive manual prompt and log transport between ChatGPT Project and Codex. Phase 4 is Level C and needs a repeatable local workflow without weakening human gates.
- **Decision:** Adopt Autonomous Milestone Loop v1: inspect, plan, implement, run targeted checks, invoke risk-selected read-only reviewers, remediate at most twice, run consolidated verification, create a coherent local commit, report once, and stop at the next human gate. Codex remains the sole repository writer. Use repository-local milestone, release-gate, and visual-review skills plus a lightweight `codex exec` runner with structured output stored outside tracked files. Use the one long-lived local branch `phase/4-sanity-cms`, coherent local commits per milestone, and one final Phase 4 pull request by default. Split pull requests require an owner-approved risk exception. Push, pull-request mutation, merge, deployment, production changes, secret handling, and branch cleanup remain separate exact owner gates.
- **Alternatives considered:** Continue manual prompt and raw-log transport; allow parallel writers; create automatic remote writes; use one verification ceremony for every change; create one pull request per small schema or integration step.
- **Consequences:** Approved local milestone work can proceed without per-file or per-commit approval while preserving a single writer, two-loop remediation cap, structured reporting, read-only review evidence, and explicit external-action gates. The runner does not store secrets or perform remote writes.
- **Related files/issues:** `AGENTS.md`, `.agents/skills/`, `scripts/codex/`, `docs/ROADMAP.md`, `docs/PROGRESS.md`.

### ADR-016: Standalone Sanity Studio with a validated static Astro boundary

- **Date:** 2026-07-14
- **Status:** Accepted
- **Context:** Phase 4 must make content editable without converting the site to SSR, exposing draft credentials, or letting unvalidated CMS data leak into rendering contracts.
- **Decision:** Keep a standalone Sanity Studio in `apps/studio` and static Astro output in `apps/web`. Add a typed client/query layer and runtime-validated adapters before CMS responses reach page rendering. Production builds use published-only data. Draft access is server/build-only, authenticated, and never delivered to the browser. Visual Editing and an embedded Studio route are not Phase 4 requirements. Missing CMS configuration, missing records, and invalid responses fail safely, and the current static content remains an explicit migration fallback until the relevant query path is accepted.
- **Alternatives considered:** Convert Astro to SSR for CMS access; embed Studio in the public app; query Sanity directly from rendering components without validation; require Visual Editing; replace static fallback in one migration step.
- **Consequences:** CMS integration stays compatible with the existing static deployment model and has clear validation, failure, draft, and rollback boundaries. Sanity project creation, authentication, dependencies, and implementation remain later owner-gated milestones.
- **Related files/issues:** `apps/studio`, `apps/web/astro.config.mjs`, `.env.example`, `docs/ROADMAP.md`.

### ADR-017: Content-type localization and publication fallback

- **Date:** 2026-07-14
- **Status:** Accepted
- **Context:** The general roadmap allowed Indonesian content to fall back to English, while ADR-013 requires paired bilingual completeness for project details. Credentials and evidence also need stricter protection against misleading fallback.
- **Decision:** Apply fallback by content type. Navigation and critical UI strings must be authored in both locales. Supporting shared profile content may use an explicit and visibly disclosed English fallback when Indonesian content is absent. Project detail routes require complete approved content in both locales and never silently render English under an Indonesian route. Credentials and evidence-sensitive content never silently fall back when doing so could misrepresent verification, ownership, or publication status.
- **Alternatives considered:** Universal English fallback; no fallback for any content; route-level fallback without disclosure.
- **Consequences:** Localized adapters and schema validation must identify the content type and required fields. Project publication remains one paired bilingual unit, while lower-risk supporting content can migrate progressively without a broken route or hidden language switch.
- **Related files/issues:** `apps/web/src/data/projects.ts`, `docs/PROJECT_GUIDE.md`, `docs/ROADMAP.md`.

### ADR-018: Phase 4 schema, asset, environment, and secret contract

- **Date:** 2026-07-14
- **Status:** Accepted
- **Context:** CMS schemas can accidentally publish unverified claims, expose private evidence, or mix public configuration with secrets unless the inventory and approval boundaries are established before Studio implementation.
- **Decision:** Phase 4 schema scope is `siteSettings`, `profile`, `experience`, `project`, and `credential`, supported by localized field helpers and privacy-aware image/file/evidence objects. Controlled featured, ordering, visibility, and modular settings are allowed; a fully generic page builder is not. Every media or evidence object records localized alt text and caption, ownership or source, publication approval, privacy and redaction status, credit, decorative state when relevant, and file type and size boundaries. Asset presence in Sanity never implies publication approval. `.env.example` contains names only. Studio project/dataset identifiers and web build configuration remain separate; any future draft read token is secret, server/build-only, and must never use a `PUBLIC_` prefix or enter browser code.
- **Alternatives considered:** Model every inventory category immediately; treat upload as publication approval; store draft tokens in public client configuration; build a generic page builder before the core content paths.
- **Consequences:** Milestone 2 can implement a bounded schema inventory with explicit privacy metadata. No real content migration occurs in Phase 4, and no project, dataset, credential, or actual environment value is created in Milestone 0.
- **Related files/issues:** `.env.example`, `content-source/CONTENT_INVENTORY.csv`, `content-source/MEDIA_REGISTER.csv`, `docs/ROADMAP.md`.

### ADR-019: Public-dataset publication and temporary integration records

- **Date:** 2026-07-15
- **Status:** Accepted for the CMS safety boundary; temporary-record scope extended by ADR-025
- **Context:** The existing `production` dataset is publicly queryable and the static frontend must prove CMS integration without publishing private evidence, professional claims, credentials, real media, or a browser token. Sanity document IDs containing private path segments also cannot be relied on for unauthenticated production queries.
- **Decision:** Treat every dataset record, including drafts, as potentially public. Production uses five tokenless queries with both an explicit `published` perspective and draft-path exclusion. Exactly seven deterministic temporary records exercise the integration: `siteSettings`, `profile`, `safe-experience-unavailable`, `safe-project-analytics-decision-support`, `safe-project-language-text-intelligence`, `safe-project-computer-vision-applied-ai`, and `safe-credential-unavailable`. The three projects remain paired bilingual generic directions; experience and credential records are explicit unavailable states. The synchronization script is read-only by default, requires `--apply` for writes, accepts only project `example0` and dataset `production`, refuses unmanaged or partial record sets and drafts, and permits no project attachments. Runtime validation requires public privacy status, approved ownership, completed redaction, explicit publication approval, paired project locales, bounded slugs, and bounded controls before data reaches rendering. Asset presence never grants publication approval.
- **Alternatives considered:** Query drafts with a browser token; store private review material as drafts; publish real content for integration testing; use arbitrary document IDs or a generic page builder; remove the static fallback immediately.
- **Consequences:** The public build works without CORS or tokens, Studio retains native draft/publish lifecycle, drafts remain excluded from production output, and missing or invalid records continue to fail safely into static content. Real content, media, evidence, authenticated preview, CORS, deployment, and production migration remain separately gated.
- **Related files/issues:** `apps/studio/scripts/syncSafeTemporaryContent.ts`, `apps/studio/schemaTypes/`, `apps/web/src/lib/sanity/`, `apps/web/tests/`, `.env.example`.

### ADR-020: Phase 5 content authority, migration, and publication governance

- **Date:** 2026-07-15
- **Status:** Accepted for content/privacy decisions; D5-02 provider- and branch-specific workflow is superseded by ADR-030 and ADR-032
- **Context:** Phase 4 is merged through PR #8 and provides a public-dataset CMS boundary with seven
  safe temporary records. Phase 5 must replace placeholders with verified professional content
  without treating candidate sources, drafts, uploads, or private evidence as publication approval.
- **Decision:** Adopt the accepted Phase 5 decision package:
  - **D5-01: Source authority:** The repository, accepted ADRs, and approved operational registers
    are authoritative. Uploaded files, CVs, inventories, owner statements, and media are candidate
    sources until verified and approved.
  - **D5-02: Git and workflow:** Use the one long-lived branch
    `phase/5-real-content-migration`, coherent local milestone commits, one final Phase 5 pull
    request by default, Level C verification, and Codex as the sole repository writer.
  - **D5-03: Public dataset:** Treat every Sanity document, including drafts, as potentially public.
    Review private or unapproved material outside Sanity. Production remains tokenless,
    published-only, and draft-excluding.
  - **D5-04: Claim lifecycle:** Use `candidate`, `source-located`, `verified`,
    `privacy-reviewed`, `translation-reviewed`, `publication-approved`, and `published` as the
    progressive lifecycle, with `rejected` and `withdrawn` as terminal states.
  - **D5-05: Source register:** Maintain a separate non-sensitive source authority register with
    stable IDs, source class, owner, public-safe locator, claim scope, verification, conflict,
    privacy/access, approval, limitation, reviewer, approver, and date metadata.
  - **D5-06: Asset/evidence register:** Maintain a publication-gated asset/evidence register with
    stable IDs, opaque private-source references, ownership and permission, third-party presence,
    privacy, redaction, metadata scrub, localized alt/caption, credit, actual and allowed type/size,
    validation-contract result, approval, and review metadata.
  - **D5-07: Localization:** Complete reviewed English and Indonesian is the Phase 5 default.
    Projects are paired bilingual publication units; credentials and evidence do not silently fall
    back. Supporting profile fallback requires exact approval and visible disclosure.
  - **D5-08: Launch projects:** Map the three launch directions to `PRJ-001`, `PRJ-002`, and
    `PRJ-003`. Keep `PRJ-004` outside launch scope until separately approved.
  - **D5-09: Future project slugs:** Accept `retail-sales-analytics`,
    `youtube-review-sentiment-analysis`, and `indonesian-license-plate-recognition` as the future
    locale-neutral paired slugs. Their implementation requires a later exact slug-change gate.
  - **D5-10: Grouped credentials:** Accept a future bounded `credential.category` enum containing
    `education`, `certification`, `achievement`, `training`, and `publication`. Implement it only
    when an accepted content milestone requires the fields; do not introduce a generic page builder.
  - **D5-11: Contact and CV:** Keep phone private and location at minimum necessary precision.
    Public email, social links, portrait, and CV remain separately gated. A public CV must be
    redacted, metadata-scrubbed, and web-safe.
  - **D5-12: Publication batches:** Require one exact owner approval and rollback plan for each
    bounded, mutually exclusive `content-publication` or `asset-upload` batch. Approval for one batch
    does not authorize another or combine both actions.
  - **D5-13: Unsupported content:** Remove unsupported claims or represent them honestly as
    unavailable. Do not publish unverified metrics. Omit empty publication groups.
  - **D5-14: Phase boundary:** Use Phase 5 Milestones 0 to 7. Deployment remains outside Phase 5.
- **Alternatives considered:** Treat the CV or inventories as publication authority; review private
  material in Sanity drafts; approve publication field by field; retain generic project slugs
  indefinitely; build unrestricted grouped content; combine content migration with deployment.
- **Consequences:** Content preparation uses claim, source, asset/evidence, and publication-batch
  contracts before any Sanity write. Private evidence stays outside Git, Sanity, reports, and logs.
  Slug, schema, contact, CV, metric, credential, asset, publication, and remote actions retain exact
  human gates. Phase 5 can progress through coherent local checkpoints without weakening the Phase 4
  static fallback, public-dataset safety, or rollback path.
- **Related files/issues:** `AGENTS.md`, `content-source/CLAIM_REGISTER.csv`,
  `content-source/SOURCE_REGISTER.csv`, `content-source/ASSET_REGISTER.csv`,
  `content-source/PUBLICATION_BATCH_TEMPLATE.md`, `docs/PROJECT_GUIDE.md`, `docs/ROADMAP.md`,
  `docs/PROGRESS.md`.

### ADR-021: Isolated prelaunch deployment foundation

- **Date:** 2026-07-18
- **Status:** Accepted
- **Context:** Phase 5 real-content migration is paused after Milestone 2 on its retained branch, while the static site needs a reviewable deployment foundation before any provider-side action. Existing Phase 4 and Phase 5 work must not be rebased, copied, or changed to create that foundation.
- **Decision:** Use the separate local branch `prelaunch/deployment-foundation`, created from verified `main`, for one dedicated future PR. Keep Astro static and add only repository-level Cloudflare Pages artifacts: Node `24.18.0` pin, global temporary-host noindex policy, root `308` redirect, limited static asset caching, tests, and an external-action runbook. Preserve pnpm `11.11.0`; defer CSP, CORS, authentication, project creation, environment values, deploy hooks, webhooks, Studio deployment, hostname, DNS, CMS writes, asset uploads, and all remote Git actions to exact owner gates. ADR-020 governs the retained paused Phase 5 branch.
- **Alternatives considered:** Configure Cloudflare directly before repository review; add SSR or a Worker; merge Phase 5 work into the foundation; enable indexing on preview hosts; add a CSP without route-level validation.
- **Consequences:** The repository can verify a conservative static deployment contract locally without asserting that any external resource exists or changing public content. A later provider configuration must use Node/Pnpm environment variables and no browser or draft token. Rollback stays provider- or approved-Git-reference-based and never requires force history changes.
- **Related files/issues:** `.node-version`, `apps/web/public/_headers`, `apps/web/public/_redirects`, `apps/web/public/robots.txt`, `apps/web/tests/deployment.test.mjs`, `docs/DEPLOYMENT.md`.

### ADR-022: Defer CMS-triggered static rebuild automation

- **Date:** 2026-07-18
- **Status:** Accepted
- **Context:** PDF-M5 created one bounded Cloudflare Deploy Hook intended to test a future rebuild after published Sanity content changes. Two owner-approved trigger attempts were inconclusive and produced no verified deployment. A read-only investigation found no proof of a malformed URL or provider warning, but the available dashboard evidence and test observability were insufficient to establish a reliable end-to-end contract. No Sanity webhook was created.
- **Decision:** Record PDF-M5 as `Deferred: automation not configured`. The owner manually deleted the unused Deploy Hook, and a fresh read-only provider check confirmed zero remaining hooks. Keep the existing automatic Git deployment from `main` active, but do not claim that Sanity publication automatically rebuilds the static site. Any future CMS rebuild automation requires a new owner-approved architecture, secret-handling boundary, provider action, and observable test gate.
- **Alternatives considered:** Keep the unused hook while investigating; create a Sanity webhook without a verified target; treat either trigger attempt as successful without a matching deployment; add Worker, Function, or another intermediary without a new architecture decision.
- **Consequences:** Published Sanity changes will not automatically rebuild the static site. Until a separately approved automation design is implemented and verified, a content release must include an explicit rebuild/deployment gate. Phase 5 remains paused, and this decision changes no content, asset, environment, CORS, DNS, source, access-control, or deployment state.
- **Related files/issues:** `docs/DEPLOYMENT.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`.

### ADR-023: Focused homepage workspace and dedicated content archives

- **Date:** 2026-07-22
- **Status:** Accepted and refined by ADR-033
- **Context:** ADR-012 established a complete spatial-workspace homepage. After real-content publication, that panel-switching model made approved Experience media and credential records too dense for a clear portfolio overview, repeated profile copy, and placed long-form material behind a homepage interaction model. The owner approved `BATCH-P5-PRESENTATION-HARDENING-002` from authoritative `main` baseline `9684fd03a494b1e3f1b4bbe0ad1db655a8082592`.
- **Decision:** Partially supersede ADR-012 only for the homepage composition. Keep the spatial sidebar but present one focused destination panel at a time through progressive enhancement, with Home, About, Experience, Projects, Education, Licenses & Certifications, Honors & Awards, and Publications destinations. Add paired `/en|id/experience/` and `/en|id/credentials/` archives for complete published records. Preserve static Astro output, bilingual route parity, selective Liquid Glass, opaque long-form surfaces, no-JavaScript meaning, published-only CMS reads, runtime validation, static fallback, and all existing Project routes. Present approved referenced media through context-aware thumbnails and compact native-disclosure collages without changing CMS records, schemas, asset references, dependencies, or publication state.
- **Alternatives considered:** Keep the panel-switching homepage and only reduce spacing; place all Experience and Credential detail on the homepage; add client-side tabs or a lightbox; add new Project cover fields or publish/link deferred assets.
- **Consequences:** Homepage navigation uses a small progressive-enhancement script for focused panels while its localized anchors and semantic content remain available without JavaScript. Experience and Credentials gain canonical localized archives and sitemap entries, and complete approved content remains available without overwhelming the primary view. Project covers remain optional and fall back safely when a published Project has no existing gallery reference. Independent technical QA is an interim baseline; final visual acceptance remains an explicit owner gate.
- **Related files/issues:** `content-source/batches/BATCH-P5-PRESENTATION-HARDENING-002.md`, `apps/web/src/components/pages/HomePage.astro`, `apps/web/src/components/pages/ExperiencePage.astro`, `apps/web/src/components/pages/CredentialsPage.astro`, `apps/web/src/lib/routes.ts`.

### ADR-024: Optional publication-gated Credential galleries

- **Date:** 2026-07-22
- **Status:** Accepted and published through the exact owner-approved content-reference gate
- **Context:** Four published Credential records have approved owner-provided activity media, but the existing Credential model exposed only one primary preview. The owner first approved `BATCH-P5-CREDENTIAL-MEDIA-GALLERY-001` for repository implementation, then separately approved the frozen 17-reference Sanity mutation after read-only preflight.
- **Decision:** Add one optional manually ordered `gallery` array of at most eight existing `approvedImage` items to Credential. Keep the existing `image` as the primary preview. Reject duplicate gallery references, primary-preview repetition, decorative gallery items, incomplete bilingual metadata, unsafe media, and publication-unapproved media. Runtime validation fails narrowly by replacing an invalid gallery collection with an empty localized collection while preserving otherwise valid Credential text and primary preview. Dedicated Credential routes show three compact initial thumbnails and expose the remainder through native `details`; homepage Credential presentations omit the gallery payload.
- **Alternatives considered:** Replace the primary preview with a gallery; create a separate Credential-media document model; render every image on the homepage; add a JavaScript lightbox; partially render a gallery after one item fails validation.
- **Consequences:** The four approved Credential galleries now contain 6, 4, 6, and 1 ordered items, adding 17 approved references without changing their primary previews or other fields. Independent verification confirmed 27 published content documents, zero drafts, 66 images, three files, 55 total asset references, 52 uniquely referenced images, and 14 unreferenced images. Missing galleries remain valid elsewhere, media order is deterministic, hotspot coordinates map to focal points, and captions remain available in data without repetitive visual display. No Project schema/query/route/content, dependency, asset upload/delete, remote Git, or deployment change occurred.
- **Related files/issues:** `content-source/batches/BATCH-P5-CREDENTIAL-MEDIA-GALLERY-001.md`, `apps/studio/schemaTypes/documents/credential.ts`, `apps/web/src/lib/sanity/queries.ts`, `apps/web/src/lib/sanity/validation.ts`, `apps/web/src/components/media/CredentialPreviewCard.astro`.

### ADR-025: Complete approved-source integration through public media and provenance

- **Date:** 2026-07-27
- **Status:** Accepted and implemented through the exact owner-approved all-asset gate
- **Context:** The owner approved `BATCH-P5-ALL-ASSET-WEBSITE-INTEGRATION-001` so every file in the
  frozen 482-file `Asset/` snapshot contributes to the public portfolio without exposing unsafe
  source binaries, private paths, duplicate uploads, or unsupported claims. The accepted
  current-data checkpoint still lacked PRJ-004, organization logos, and a complete factual
  provenance path for source material that should not be published directly.
- **Decision:** Preserve the ignored source archive and maintain deterministic tracked inventory and
  implementation registers for all 482 files. Publish ten metadata-scrubbed organization-logo
  derivatives, one paired bilingual PRJ-004 Project with five bounded activity records and fourteen
  already-uploaded activity images, and ten aggregate bilingual `mediaItem` records that represent
  every inventory ID exactly once. Add paired `/en/media/` and `/id/media/` routes as a factual
  no-JavaScript-accessible Media Library. Extend Credential with an optional publication-gated
  `issuerLogo`, and Project with bounded localized activities. Keep production queries tokenless,
  published-only, draft-excluding, runtime-validated, and safe-fallback capable. Original evidence
  binaries, exact duplicates, unsafe documents, manifests, and private or operational material
  contribute only through safe derivatives, extracted facts, duplicate grouping, or aggregate
  provenance.
- **Alternatives considered:** Upload every source binary; omit sources that cannot be shown
  directly; add a generic asset browser or page builder; publish private paths; create one document
  per source file; leave PRJ-004 and the fourteen images unreferenced.
- **Consequences:** The public dataset contains 38 published content documents, zero drafts, 76
  images and three files. All 76 images are referenced, PRJ-004 has five activities and fourteen
  images, eleven Credentials have approved issuer-logo references, and ten Media Library records
  cover 482 unique source IDs. The guarded mutation is idempotent, revision-aware, project/dataset
  bound, and rolls back only logos created by a failed run. The Media Library is factual
  provenance, not a promise that every private source binary is directly downloadable. CMS content
  publication does not automatically rebuild production because ADR-022 remains active; push,
  pull request, merge, and deployment remain separate owner gates.
- **Related files/issues:** `content-source/ASSET_MASTER_INVENTORY.csv`,
  `content-source/ASSET_WEBSITE_USAGE_REGISTER.csv`,
  `content-source/batches/BATCH-P5-ALL-ASSET-WEBSITE-INTEGRATION-001.md`,
  `apps/studio/scripts/integrateApprovedAssets.ts`, `apps/studio/schemaTypes/documents/mediaItem.ts`,
  `apps/studio/schemaTypes/objects/projectActivity.ts`,
  `apps/web/src/components/pages/MediaLibraryPage.astro`.

### ADR-030: AI-Neutral Repository-Centric Governance Model

- **Date:** 2026-07-28
- **Status:** Accepted and refined by ADR-032
- **Context:** The personal portfolio project originally used a provider-centric governance model assigning distinct roles to ChatGPT (context hub), Codex (sole implementation writer), and Gemini/Antigravity (read-only reviewer). As the project matured, the repository, its architecture, accepted ADRs, and verification pipeline became fully comprehensive and self-contained. Continued reliance on provider-specific roles introduced artificial friction and provider lock-in.
- **Decision:** Transition repository governance from provider-centric to fully AI-neutral and repository-centric:
  1. **Repository Authority:** The repository code, accepted documentation (`docs/DECISIONS.md`, `docs/PROJECT_GUIDE.md`, `docs/ROADMAP.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`, `AGENTS.md`), and git status serve as the sole long-term memory and authoritative source of truth. Transient chat history or provider memory never overrides repository state.
  2. **AI Provider Neutrality:** Any capable AI assistant (ChatGPT, Codex, Gemini, Claude, Cursor, Copilot, Cline, Windsurf, Aider, Roo Code, etc.) has equal authority to inspect, plan, implement, refactor, fix bugs, write tests, update documentation, run verification, create local checkpoint commits, and continue milestone execution within owner-approved scopes.
  3. **Standardized Workflow Loop:** All AI systems follow the exact same Autonomous Milestone Loop v1 (`inspect -> plan -> implement -> targeted verification -> self review -> optional independent review -> remediation -> consolidated verification -> checkpoint commit -> concise report -> human gate`).
  4. **Human Owner Risk Gates:** Explicit human owner approval remains mandatory for irreversible remote actions (push, PR creation or merge, Cloudflare/Sanity deployment, DNS/production resource changes, secrets/credentials, paid services, destructive git operations).
  5. **Neutral Commit & Branch Naming:** Commit messages and branch names describe feature/milestone evolution, never mentioning AI model or provider names.
- **Alternatives considered:** Retain provider-specific writer/reviewer locks; create separate governance rules per AI tool; delegate authority to external chat memory.
- **Consequences:** The repository can be seamlessly maintained and developed by any AI assistant from zero context without relying on hidden provider memory, custom prompt overrides, or governance contradictions.
- **Related files/issues:** `AGENTS.md`, `docs/PROJECT_GUIDE.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`, `.agents/skills/`.

### ADR-031: Dedicated `docs/GOVERNANCE.md` Architecture & Governance Hardening

- **Date:** 2026-07-28
- **Status:** Accepted and refined by ADR-032
- **Context:** Following the adoption of ADR-030 (AI-Neutral Repository-Centric Governance), operating directives and workflow guidelines remained split across `AGENTS.md` and `docs/PROJECT_GUIDE.md`. This risked paragraph duplication and maintenance friction as governance rules evolved.
- **Decision:** Formalize `docs/GOVERNANCE.md` as the single authoritative source of truth for all repository governance rules, capability-based AI permissions, context loading priority, verification precedence hierarchy, repository contract, disaster recovery procedures, and repository health standards (`GREEN`, `YELLOW`, `RED`). Convert `AGENTS.md` and `docs/PROJECT_GUIDE.md` into references to `docs/GOVERNANCE.md` for detailed rules while retaining their primary developer and AI operating contracts.
- **Alternatives considered:** Continue duplicating governance paragraphs across `AGENTS.md` and `docs/PROJECT_GUIDE.md`; rely solely on `AGENTS.md` without a dedicated governance document.
- **Consequences:** All repository operating rules, capability requirements, loading sequences, evidence precedence hierarchies, and health definitions are centralized in one single, maintainable location.
- **Related files/issues:** `docs/GOVERNANCE.md`, `AGENTS.md`, `docs/PROJECT_GUIDE.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`.

### ADR-032: Durable authority, evidence, and production-maintenance model

- **Date:** 2026-08-10
- **Status:** Accepted
- **Context:** After Phase 6 launch, repository policy, live status, historical phase evidence, code,
  direct observations, and provider-specific instructions had drifted into a contradictory authority
  hierarchy. Several active documents still named completed branches and historical provider roles.
  A fresh human or capable AI could not reliably determine the deployed state, canonical checks,
  approval gates, or next task from repository files alone.
- **Decision:** `docs/GOVERNANCE.md` is the sole durable governance authority. Explicit current human
  owner decisions retain product, privacy, publication, and risk authority for their exact gate.
  Accepted ADRs record architecture/product decisions; code, Git, CI, browser, and provider
  observations are empirical facts; `docs/PROGRESS.md` is the sole concise current-status source;
  `docs/PHASE_LOG.md` is append-only history; transient chat/provider memory has no durable authority.
  When sources disagree, reconcile policy and observed facts rather than allowing either to silently
  override the other. Continue the capability-based one-active-writer rule: any capable human or AI
  may write within an approved scope, while independent sessions remain read-only. Provider-specific
  adapters are optional, subordinate, and may contain no unique governance. Use `pnpm verify` as the
  canonical local and CI quality command. After Phase 6, normal work is production maintenance
  unless the owner accepts a new product phase.
- **Alternatives considered:** Put code above governance; preserve multiple live status documents;
  retain provider-exclusive writer roles; make a provider adapter mandatory; create a new numbered
  phase automatically; rely on chat history to explain contradictions.
- **Consequences:** A fresh clone is sufficient to identify authority, architecture, current state,
  setup, complete verification, owner gates, recovery, and one next task. Historical ADR text remains
  evidence of past operation, but provider/branch clauses in ADR-010, ADR-015, and D5-02 no longer
  govern current work. GREEN repository health means locally reviewable and never authorizes a
  remote, publication, or production action.
- **Related files/issues:** `docs/GOVERNANCE.md`, `AGENTS.md`, `README.md`,
  `docs/PROJECT_GUIDE.md`, `docs/ROADMAP.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`,
  `.agents/skills/`, `.codex/`, `scripts/codex/`, `scripts/verify.mjs`.

### ADR-033: Reconciled production presentation contract

- **Date:** 2026-08-10
- **Status:** Accepted
- **Context:** Merged Phase 5/6 work and later direct changes on `main` produced the currently deployed
  focused workspace, standalone route shells, grouped Credentials, media lightbox, and public Media
  Library. The visual baseline is accepted, but audit found objective regressions in no-JavaScript
  scrolling, keyboard lightbox access, Project limitation visibility, locale/hash preservation, and
  public-content boundaries. Separate rejected experimental branches must not define the production
  direction.
- **Decision:** Preserve the current visual composition and route architecture while treating
  interactivity as progressive enhancement. The primary sidebar retains Home, About, Experience,
  Projects, and Credentials; Contact context remains within About rather than a separate empty panel.
  Complete content lives on paired Experience, Project, Credential, and Media routes. Media Library
  remains discoverable from public content without expanding the primary rail. Eligible images may
  use one dependency-free dialog lightbox only when triggers have localized accessible names,
  keyboard operation, Escape handling, and focus return. Without JavaScript, homepage sections must
  remain readable and scrollable. Project limitations, bilingual CMS titles, publication gates, and
  safe fallback semantics are content contracts, not optional visual details.
- **Alternatives considered:** Import a rejected redesign; replace the accepted rail; use a
  JavaScript-only workspace; remove the lightbox; publish a direct email/contact form without a new
  gate; hide limitations to simplify Project pages.
- **Consequences:** Reconciliation may fix demonstrated accessibility, privacy, localization, SEO,
  and content regressions without broad visual redesign, dependency changes, CMS mutation, or route
  replacement. Future material visual directions require a bounded owner choice and separate
  accepted scope.
- **Related files/issues:** `apps/web/src/components/`, `apps/web/src/scripts/home-workspace.ts`,
  `apps/web/src/styles/global.css`, `apps/web/src/lib/metadata.ts`, `apps/web/src/lib/sanity/`,
  `apps/web/tests/`.
