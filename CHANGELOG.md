# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- MIT licensing, contribution and security policies, and a reusable pull-request checklist.
- Architecture and adaptation guides with Mermaid diagrams, trust boundaries, provider-neutral
  deployment contracts, identity replacement steps, and a fork-to-launch checklist.
- One canonical `pnpm verify` command shared by local development and CI, including Studio schema
  validation and both production builds.
- Keyboard-accessible image preview behavior with localized dialog naming, Enter/Space activation,
  Escape dismissal, visible focus, and focus return.

### Changed

- Renamed the public repository to `free-tier-portfolio-website` and reconciled clone commands,
  badges, and active documentation with the clearer public-facing name.
- Expanded the README with CI/license badges, a free-tier cost model, reusable architecture diagram,
  learning outcomes, corrected clone commands, and clearer paths for adopters.
- Reframed all active documentation around a public reusable reference instead of an active personal
  project, while preserving clearly labeled historical evidence for architectural study.
- Clarified that the legacy website is retired, `portfolio.example.com` has migrated to a new independent
  website, and this repository is retained as a free-tier educational/portfolio case study without
  control of the replacement site.
- Reconciled provider-neutral governance, contributor onboarding, architecture, roadmap, current
  status, deployment, and recovery documentation against the verified production `main` baseline.
- Updated optional reviewer adapters to use the current lifecycle state and milestone instead of
  assuming that maintenance always has an active numbered phase.
- Project rails now use the localized CMS/fallback title, and the Project archive links to the Media
  Library without changing the accepted primary navigation.
- GitHub Actions references are pinned to verified commit SHAs.
- Updated the pinned pnpm setup action to its Node 24-compatible v4.4.0 release so current GitHub
  runners no longer emit the Node 20 deprecation annotation.

### Fixed

- Restored the owner-approved public email on the bilingual Contact/About surface while keeping
  phone, WhatsApp, unredacted CVs, and unrelated personal data outside the approval.
- Restored bilingual Project limitation disclosures removed by a post-release presentation change.
- Preserved readable desktop homepage content when JavaScript is unavailable and limited fixed
  workspace locking to explicitly initialized shells.
- Preserved Credential record hashes across locale switching and safely ignored malformed hashes.
- Removed an unreviewed portrait caption override and an unsupported structured-data job-title
  claim.
- Enforced Studio-equivalent image/file size limits in web runtime validation, omitted entity JSON-LD
  from non-index pages, and escaped structured data against script termination.
- Prepared lightbox triggers for eligible images inside initially hidden Credential records so they
  become keyboard accessible when revealed.

### Security

- Recorded the current transitive dependency advisory result without changing the owner-gated
  dependency graph or misrepresenting the static production site as a Node server runtime.

## Consolidated release history through v1.1.0

### Added

- Complete approved-source integration for all 482 frozen `Asset/` files through safe public
  derivatives, extracted facts, duplicate grouping, or aggregate bilingual provenance.
- A fourth bilingual Project, Digital Media Analytics & Training Initiative, with five structured
  activity records and fourteen approved activity images.
- Paired English and Indonesian Media Library routes backed by ten validated provenance records
  that cover every frozen source ID exactly once.
- Ten approved organization-logo assets referenced across eleven Credential records, with typed
  issuer-logo presentation and accessible fallback marks.
- Published ordered galleries for four approved Credentials using 17 existing public images, paired
  bilingual metadata, preserved primary previews, focal-point presentation, duplicate-reference
  protection, and compact native-disclosure collages on dedicated Credential routes.

- Paired English and Indonesian Experience and Credentials archives with canonical metadata,
  hreflang alternates, locale switching, sitemap coverage, and complete published record views.
- Context-aware thumbnail and collage media presentation, including optional Project preview covers
  derived only from existing referenced gallery images.

- Phase 5 claim, source authority, asset/evidence, and bounded publication-batch templates for
  privacy-safe real-content migration outside the public Sanity dataset.
- Phase 5 Milestones 0 to 7, source precedence, claim lifecycle, localization, public contact/CV,
  project mapping, future slug, bounded credential-category, rollback, and human-gate contracts.
- A repository-only prelaunch deployment foundation: Node version pin, static Pages headers and
  redirect, crawler-disallow policy, contract tests, and a gated deployment/rollback runbook.
- A standalone TypeScript Sanity Studio in `apps/studio`, with validated ignored environment
  configuration, five bounded document schemas, localized helpers, publication/privacy metadata,
  singleton structure, and workspace/CI quality scripts.
- Five published-only Sanity queries, typed raw CMS contracts, runtime validation and adapters,
  static migration fallback, and fourteen automated CMS-boundary tests.
- A deterministic default-read-only synchronization workflow for seven safe temporary public CMS
  records, including three paired bilingual project directions and explicit unavailable states.
- Autonomous Milestone Loop v1 with repository-local milestone, release-gate, and visual-review
  skills, a local-first resumable runner, structured milestone reports, and reusable task templates.
- Phase 4 architecture, localization, schema inventory, asset/privacy, environment/secret,
  acceptance, milestone, and human-gate contracts.
- Phase 1 pnpm workspace with an Astro web application and a reserved Studio directory.
- Static English and Indonesian route foundations with deterministic English root routing.
- Strict type checking, linting, formatting, Tailwind CSS 4, and shared theme tokens.
- Responsive Home-only navigation with locale controls, a light-first/dark theme toggle, and a
  persisted theme preference.
- Bilingual hero content with four target-role badges, one valid focus-area CTA, four non-claim
  impact placeholders, and a restrained CSS-only abstract visual.
- Bilingual Project Directions with three noninteractive temporary project cards, visible
  evidence-review status, and typed optional focus tags.
- Bilingual Working Perspective and a four-chapter Career Journey using strict temporary homepage
  data without unsupported professional claims or new links.
- Bilingual Capability Areas with four noninteractive working groups and Learning Foundations with
  two privacy-preserving generic credential categories.
- Bilingual Contact sections with the approved LinkedIn and GitHub profile links, visible external
  site disclosures, and a localized in-page Contact header anchor.
- An extracted `SiteFooter` with concise bilingual copy, backed by strict tuple and approved-URL
  literal types.
- A bilingual spatial workspace, Projects archives, six mirrored public-direction detail routes,
  centralized metadata, an exact ten-route sitemap, and a global recovery page for Phase 3.

### Changed

- Expanded the public Sanity model from 27 to 38 published content documents and from 66 to 76 image
  assets while retaining zero drafts, all three file assets, and zero unreferenced images.
- Extended Project, Credential, CMS query/validation, route, and fallback contracts for structured
  activities, issuer logos, and factual Media Library provenance without dependency or lockfile
  changes.
- Refined the spatial homepage into a focused, progressively enhanced workspace that presents one
  sidebar destination at a time while preserving localized anchors and no-JavaScript meaning.
- Refined compact portrait, CV, evidence, credential, resource, and responsive presentation; reduced
  repetitive visitor-facing review and publication terminology while retaining accessibility and
  privacy metadata.

- Marked Phase 4 complete through merged PR #8 at
  `fc2f2e5fcb7d4c5baac095ed2d0f21a1da41a9c9`, recorded successful post-merge CI, and activated the
  local-only `phase/5-real-content-migration` workflow without publishing real content.
- Deployed the standalone Studio to the Sanity-managed `portfolio-reference.sanity.studio` host with
  automatic updates disabled and authenticated editing required. This did not deploy the Astro
  website or publish real content, assets, or a Cloudflare resource.
- Recorded Phase 5 as paused after Milestone 2 and isolated the prelaunch deployment foundation
  from its retained branch; no provider, content, asset, Sanity, or remote Git action occurred.
- Completed Phase 4 final integrated hardening across the standalone Studio and static Astro app,
  including frozen installation, the complete repository suite, schema and CMS boundary checks,
  tokenless CMS-backed and static-fallback builds, local Studio and browser smoke tests, responsive
  and accessibility inspection, dependency audit, privacy scans, and release-state verification.
- Pushed the exact Milestones 2 to 5 checkpoint `9b9cf5819a03386cff6059eeb3178369f3b7683f`
  to `origin/phase/4-sanity-cms`; Phase 4 later completed and merged through PR #8.
- Activated the existing public Sanity `production` dataset for local Studio authoring and static
  Astro builds while keeping production queries tokenless, draft-excluding, and explicitly on the
  `published` perspective.
- Made navigation, section visibility, featured state, and numeric ordering CMS-controlled through
  bounded validated fields; real content, assets, preview, deployment, token, and CORS work remain
  deferred.
- Marked Phase 3 complete through PR #6 and PR #7 and activated the historical Phase 4
  `phase/4-sanity-cms` workflow without changing the static Astro output model.
- Replaced LinkedIn and GitHub brand glyphs with one neutral external-link icon while preserving
  the approved destinations, visible platform names, and accessible link purpose.
- Completed Phase 3 final integrated hardening with automated, static route/metadata, privacy,
  local HTTP, Chrome browser, accessibility, and available Chrome performance verification.

### Fixed

- Replaced dot-scoped temporary document IDs with public-query-safe hyphenated IDs so the tokenless
  static build receives all seven validated records instead of falling back for three content paths.
- Logged out and replaced the prior exposed local Sanity CLI session, removed no unrelated records
  or files, and kept tracked and untracked repository scans free of authentication values.
- Declared a repository-native data favicon so valid page loads no longer trigger a failed default
  `/favicon.ico` request.
