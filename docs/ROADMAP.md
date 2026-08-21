# Product Roadmap

The phases below are historical outcomes for the original demonstration build. The repository is now
maintained as a public educational case study of a free-tier architecture. It does not control or
describe any active personal website. No future roadmap item is active without a new, explicitly
approved local milestone.

## Purpose

This file records durable outcome sequencing and exit criteria. It does not hold the active branch,
current SHA, deployment observation, or next task; see `docs/PROGRESS.md` for those facts and
`docs/PHASE_LOG.md` for chronological evidence.

## Guiding sequence

Work proceeds in this order:

1. publishable correctness;
2. privacy and safe failure;
3. accessibility and performance;
4. maintainable architecture;
5. visual polish;
6. advanced integrations.

Every outcome must preserve the static Astro architecture, paired English/Indonesian routes,
validated published-only CMS boundary, and exact human gates unless an accepted ADR changes them.

## Completed foundation

### Phase 0: Repository and product definition

Outcome: the product scope, bilingual direction, privacy posture, technology defaults, content
inventories, and decision process were established.

Exit evidence:

- repository-level guidance and accepted ADRs exist;
- Node/pnpm and workspace contracts are explicit;
- candidate content and media are separated from publication approval.

### Phase 1: Static workspace foundation

Outcome: a pnpm workspace and strict static Astro application were created with initial English and
Indonesian routes, shared styling, and quality scripts.

Exit evidence:

- production static build succeeds;
- route and locale foundations exist;
- format, lint, type, and test checks are available.

### Phase 2: Bilingual portfolio MVP

Outcome: the homepage, About, Experience, Projects, Credentials, Contact context, theme controls,
responsive layout, and safe placeholder/fallback content became a coherent MVP.

Exit evidence:

- primary sections are meaningful in both locales;
- unsupported claims and private data are not used;
- keyboard, focus, responsive, dark-theme, and reduced-motion behavior are verified.

### Phase 3: Spatial routes and project system

Outcome: the focused spatial visual system, dedicated Project archive/detail routes, centralized
metadata, sitemap, localized routing, and recovery page were established.

Exit evidence:

- canonical and hreflang pairs are valid;
- all approved Project routes build statically;
- no-JavaScript content remains meaningful;
- route/metadata tests and browser QA pass.

### Phase 4: Sanity CMS architecture

Outcome: a standalone Studio, bounded schemas, published-only queries, typed runtime validation,
adapters, safe fallback, and guarded content tooling were integrated without converting Astro to a
server runtime.

Exit evidence:

- Studio schema/type/lint/build checks pass;
- browser code contains no token;
- drafts are excluded explicitly;
- invalid/missing CMS data fails safely;
- publication metadata and asset boundaries are enforced.

### Phase 5: Verified real-content migration

Outcome: approved bilingual content, Projects, Experience, Credentials, media, and provenance were
migrated through bounded source, claim, asset, privacy, localization, and publication gates.

Exit evidence:

- accepted content registers and batches trace public records to safe sources;
- public claims and media have publication decisions and limitations;
- route parity and static fallback remain intact;
- approved assets are referenced without exposing private source material;
- publication and asset-upload approvals remained separate.

### Phase 6: Production readiness and launch

Outcome: static deployment artifacts, indexing policy, canonical domain behavior, metadata, sitemap,
robots policy, security headers, CI, deployment contract, and disaster-recovery procedure were made
production-ready and released.

Exit evidence:

- production and temporary host behavior are verified;
- root redirect, canonical routes, sitemap, robots, and security headers are coherent;
- CI and local verification cover the same canonical command;
- rollback and external-action gates are documented;
- production status is recorded from observation, not assumption.

## Owner-approved maintenance only

After Phase 6, any work is maintenance rather than an automatically numbered new phase. A maintenance
milestone may address a demonstrated defect, documentation drift, dependency/security update,
content correction, accessibility issue, performance regression, or approved product improvement.

Each maintenance milestone exits only when:

- the current production/main baseline is verified;
- scope and risk are explicit;
- implementation is minimal and does not import unrelated experimental work;
- `pnpm verify` passes;
- affected routes receive proportional browser QA;
- independent review has no unresolved Blocker/High finding;
- governance/status/history documents remain consistent;
- a coherent local checkpoint and owner gate are recorded.

## Future outcome candidates

These are candidates, not active scope or authorization:

- observable and secure CMS-triggered static rebuild automation;
- privacy-respecting analytics with a documented data model and consent decision;
- a public contact mechanism only after spam, privacy, retention, and owner approval are resolved;
- content additions or corrections through new bounded publication batches;
- performance or accessibility enhancements backed by measured regressions;
- dependency/platform upgrades through a separate supply-chain and release review.

Do not implement a candidate merely because it appears here. `docs/PROGRESS.md` names the single
approved next task, and all external or publication actions retain the gates in
`docs/GOVERNANCE.md`.
