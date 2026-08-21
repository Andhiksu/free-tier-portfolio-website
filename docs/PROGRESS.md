# Current Progress

**Last reconciled:** 2026-08-21

**Product state:** Public reusable reference; original demonstration deployment retired

**Authoritative branch:** `main`; GitHub is the authority for its current commit and release record

**Repository quality gates:** GREEN for the recorded repository baseline; no current deployment is implied

**Dependency supply-chain posture:** YELLOW: the frozen graph has owner-gated advisory follow-up

**Overall merge readiness:** GREEN WITH DOCUMENTED DEFERRED RISK

## Current repository objective

The authoritative-main maintenance reconciliation is a historical verified change set. This
repository is retained as a reusable public free-tier architecture case study. The original
demonstration deployment has been retired, and this repository does not control or describe an
active personal website. The current reference milestone adds licensing,
contribution/security policies, architecture diagrams, and a provider-neutral adaptation guide
without changing the website runtime, CMS, hosting, domain, or external accounts.

The historical reconciliation preserved a bounded publication workflow while keeping private
channels, unredacted documents, and unrelated personal data outside the gate. The dependency graph
is unchanged and its advisory risk remains documented for a separate approved remediation milestone.

## Verified baseline facts

- Local `main` and `origin/main` were synchronized at
  `c428d26f2b8a9123612b9991abb62cd2af2519c3` before the review branch was created.
- The latest GitHub Actions run for that baseline completed successfully, GitHub had no open pull
  request, and no remote `design/m1-*` branch existed at preflight.
- The rejected local branches `design/m1-note-revision-polish` at
  `118b6375b99624e17e5ebe1631e972375a0efdf6` and
  `design/m1-cinematic-portfolio-rebuild` at
  `0b7a79cd45bcf7929daafde210eb0ea5ee8daaa9` were recorded and deleted locally under the exact
  owner authorization. No remote ref changed and no rejected work was imported.
- Historical verification on 2026-08-10 found that the former custom domain redirected to `/en/`
  and that the retired Pages host served the localized site. Those observations are not current
  deployment claims.
- Historical indexing, robots, and sitemap behavior remains recorded for architectural study.
- Astro remains a static build. Sanity reads remain tokenless, published-only, draft-excluding,
  runtime-validated, and safe-fallback capable.

## Reconciliation result

- Restored bilingual Project limitation disclosures and localized Project rail titles.
- Restored one historically approved public contact path and recorded the bounded approval without
  expanding private channels, documents, forms, or unrelated personal-data scope.
- Removed an unreviewed portrait caption override and an unsupported structured-data job-title
  claim.
- Made eligible image previews keyboard accessible, named the dialog, restored focus and page
  overflow on close, and covered images revealed from initially hidden Credential records.
- Preserved desktop no-JavaScript reading and scrolling, limited fixed-shell behavior to explicitly
  initialized pages, and corrected objective tablet clipping without redesigning the desktop shell.
- Preserved Credential record hashes across locale switching and safely handled malformed hashes.
- Enforced Studio-equivalent image and PDF size limits at the web runtime boundary.
- Escaped JSON-LD before HTML insertion and omitted default entity data from non-index pages.
- Exposed the Media Library from the Project archive without changing primary navigation.
- Added one canonical `pnpm verify` command, aligned CI with it, included Studio schema validation,
  and pinned GitHub Actions to verified commit SHAs.
- Reconciled provider-neutral governance, documentation responsibilities, onboarding, deployment,
  recovery, lifecycle language, and optional read-only adapter roles.
- Added an MIT license, contribution and security policies, a pull-request template, reusable
  Mermaid architecture diagrams, a free-tier cost boundary, and a fork-to-launch adaptation guide.
- Corrected the public clone commands and retired-domain spelling across current documentation.

## Historical deployment contract

- Website: static Astro output from `apps/web` for the retired portfolio build.
- CMS: standalone Sanity Studio; production web reads require no token and exclude drafts.
- Hosting: Cloudflare Pages project connected to `main`; preview-branch deployments are not part of
  the repository contract.
- Primary origin recorded by the historical build: retired owner-controlled custom domain.
- Temporary provider host: retired Cloudflare Pages subdomain.
- Indexing: enabled at the time of the recorded historical verification.
- CMS-triggered rebuild: deferred; no verified deploy-hook/webhook automation is recorded.

## Verification evidence

- Synchronized `main` passed format, lint, type, 59 tests, Studio schema validation, web/Studio
  builds, and `git diff --check` before the review branch was created.
- The reconciled change set passed formatter write/check, lint, web and Studio type checks, 63 tests,
  Studio schema validation, both production builds, and `git diff --check HEAD` through
  `pnpm verify`.
- A tokenless CMS-backed build generated 20 static pages from the public production dataset without
  a Sanity write.
- Browser QA covered English and Indonesian routes, 404, representative hashes, light/dark themes,
  keyboard focus, mobile navigation, locale/theme switching, image failure behavior, and widths
  320, 390, 768, 1024, and 1440 pixels. No horizontal overflow or console error remained.
- No-JavaScript QA at 320, 768, and 1440 pixels exposed all five homepage panels with natural body
  scrolling and no horizontal overflow.
- Focused built-site Contact smoke at `/en/#about` and `/id/#about` found one visible approved email
  link per locale, no phone/WhatsApp link, and no console error.
- Documentation-link, built-route/resource, secret/private-path, case-sensitive import, structured
  text, source-map, and Git integrity checks passed.
- Independent read-only review found no remaining Blocker or High change-set defect after focused
  remediation. Reviewer worktree snapshots were identical before and after every review.

## Known owner-gated risk

`pnpm audit --json` reports 32 advisory IDs in the frozen graph: 17 High, 15 Moderate, and zero
Critical. Astro is the only directly affected dependency; its vulnerable View Transition feature is
absent. The remaining paths are transitive build, lint, or Sanity/Studio dependencies, and the
deployed website has no Node server runtime. The complete path, precondition, fix, upgrade-risk, and
action matrix is in `DEPENDENCY_ADVISORY_TRIAGE.md`. Registry severity does not by itself prove a
public-site exploit, but the result prevents a GREEN supply-chain posture. Dependency or lockfile
remediation requires a separately approved milestone and full verification.

Behavioral browser coverage is currently a documented manual release check rather than an automated
CI suite. Source-contract tests protect the corrected hash, lightbox, and no-JavaScript boundaries,
but future automation would reduce regression risk.

## Owner-gated boundaries

The exact `BATCH-MAINT-CONTACT-EMAIL-001` approval is consumed by the recorded correction. This
document grants no authority for a later push, pull-request action, merge, tag, deployment, rollback,
DNS/provider change, Sanity write, additional content publication, asset upload, secret handling,
dependency or lockfile change, or branch deletion. Each future action retains the exact gate in
`docs/GOVERNANCE.md`.

## Current external boundary

- The legacy Cloudflare Pages and Sanity resources were retired after the historical provider audit.
- Active personal websites are independent and must not be inferred from or changed through this
  repository.
- No automatic CMS-to-host rebuild, analytics, form processor, or server runtime is implemented by
  this archived reference.

## Historical read-only provider audit: 2026-08-20

- GitHub showed the former source repository as private, with `main` selected and one production
  deployment record visible. The current reference repository is public at
  `example-user/free-tier-portfolio-website`.
- Cloudflare showed one Pages project linked to the repository, with production `main`, automatic
  deployments enabled, a provider subdomain, and zero custom domains shown for that project.
- Sanity showed the historical project on the Free plan, with a public `production` dataset and
  hosted Studio entry.
- These observations are historical evidence only. The named legacy provider resources were later
  retired and do not describe any active personal website.

## Single next task

Owner review of the reusable-reference checkpoint. Push, pull-request creation, merge, enabling
GitHub's template-repository setting, adding topics, and any other external action each require a
separate exact approval.
