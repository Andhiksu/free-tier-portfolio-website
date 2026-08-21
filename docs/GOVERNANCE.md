# Repository Governance

## 1. Purpose and authority

This file is the sole durable governance authority for the Free-Tier Portfolio Reference repository. It defines
decision authority, safe operating boundaries, verification expectations, and release gates. Other
instructions may summarize or apply these rules but may not create hidden, provider-specific, or
contradictory governance.

The human owner retains product, privacy, publication, and risk authority. The owner may issue an
explicit current instruction that narrows or expands an approved task. That instruction is not
long-term repository memory until the relevant decision or status document records it.

When sources disagree, use this order:

1. explicit current human-owner decision for the exact product, privacy, publication, or risk gate;
2. this governance document for durable operating policy;
3. accepted ADRs in `docs/DECISIONS.md` for architecture and product decisions;
4. repository code, configuration, Git refs, and provider state as empirical implementation facts;
5. `docs/PROGRESS.md` for current work state and `docs/PHASE_LOG.md` for historical evidence;
6. verified test, browser, CI, and read-only external observations;
7. transient conversation or provider memory, which has no durable authority.

Code does not override policy merely because it exists. Documentation does not override observed
implementation merely because it is written. A conflict must be reported and reconciled in the
appropriate source before work continues when it affects safety or scope.

## 2. Repository contract

The product is an English-first bilingual portfolio reference implementation. Its accepted
technical contract is:

- pnpm workspace;
- static Astro website in `apps/web`;
- standalone Sanity Studio in `apps/studio`;
- strict TypeScript and repository lint/format checks;
- paired English and Indonesian public routes;
- light-first theme with optional dark mode;
- selective Liquid Glass with readable opaque fallbacks;
- static deployment to Cloudflare Pages;
- tokenless, published-only, draft-excluding production CMS reads;
- validated CMS adapters and a safe static fallback.

Changing the stack, output mode, route model, CMS boundary, dependency policy, publication model, or
production architecture requires an accepted decision and the applicable owner gate.

## 3. Capability-based collaboration

Any capable human or AI system may inspect, plan, implement, refactor, fix, test, document, or review
this repository within the current approved scope. No provider receives privileged authority merely
because of its name, model, integration, or configuration.

The repository permits one active writer at a time. This prevents overlapping edits; it is not a
provider lock. Additional workers may run independent read-only exploration, test analysis,
accessibility review, security/privacy review, or documentation review. Every read-only reviewer must
record `git status --short` before and after and must not alter the worktree.

Provider-specific files such as `.codex/` or `scripts/codex/` are optional adapters. They may improve
tool ergonomics but are subordinate to this file, may not be required for a cold start, and may not
contain unique permissions, gates, or product facts. Repository-local skills in `.agents/skills/`
are reusable procedures, not additional authorities.

## 4. Context and documentation topology

Load only enough context to work safely, beginning with:

1. `AGENTS.md` for the concise operating entry point;
2. this file;
3. `docs/PROJECT_GUIDE.md` for stable architecture;
4. relevant accepted ADRs;
5. `docs/ROADMAP.md` and `docs/PROGRESS.md` for outcome and live state;
6. `docs/PHASE_LOG.md` when historical evidence is necessary;
7. relevant content registers, code, configuration, tests, and external read-only evidence.

Each source has one responsibility:

| Source                  | Responsibility                                    |
| ----------------------- | ------------------------------------------------- |
| `docs/GOVERNANCE.md`    | Durable rules, authority, gates, and health model |
| `AGENTS.md`             | Concise repository-wide operating instructions    |
| `docs/DECISIONS.md`     | Accepted and superseded decisions                 |
| `docs/PROJECT_GUIDE.md` | Stable architecture and contributor guide         |
| `docs/ROADMAP.md`       | Outcome sequence and exit criteria                |
| `docs/PROGRESS.md`      | Current state, current objective, one next task   |
| `docs/PHASE_LOG.md`     | Append-only chronological evidence                |
| `README.md`             | Beginner onboarding and canonical commands        |
| `CHANGELOG.md`          | Notable user- and operator-visible changes        |

Live SHAs, branches, check counts, and deployment observations belong in `PROGRESS.md` or a phase-log
entry, not in durable policy. Historical entries remain historical even after their operating rules
are superseded.

## 5. Milestone workflow

Use one execution path:

`inspect -> plan -> implement -> targeted verification -> read-only reviews -> remediation -> consolidated verification -> local checkpoint -> report -> human gate`

Before editing:

- verify branch, HEAD, worktree, remotes, worktrees, and relevant accepted scope;
- state current work state, requested outcome, expected files, and meaningful risks;
- classify verification risk;
- inspect before changing code or documentation.

Risk levels:

- **Level A:** isolated documentation or static changes with no runtime or policy effect;
- **Level B:** shared UI, routes, interactions, accessibility, or multi-page integration;
- **Level C:** privacy, security, CMS, schema, environment, dependencies, deployment, production,
  publication, or architecture.

Level B and C work requires independent read-only review proportional to the risk. Automatic
remediation is limited to two loops. Stop when a serious issue remains, scope or architecture must
change, a product/privacy decision is required, or the second remediation loop fails.

## 6. Local authority and human gates

The active writer may perform reversible read-only inspection without additional approval. Within an
explicitly approved local milestone, the writer may also edit, run checks, stage, and create coherent
local commits in scope.

The following always require exact human-owner approval for the exact action:

- accessing private evidence or credentials;
- publishing a content batch, metric, credential, contact channel, CV, claim, or link;
- uploading, deleting, linking, or replacing an asset;
- material schema migration or public dataset mutation;
- installing or updating dependencies when lifecycle scripts or supply-chain risk are involved;
- creating or changing secrets, tokens, environment values, authentication, CORS, or access control;
- pushing, creating/updating a pull request, merging, tagging, or cleaning branches;
- deploying, rolling back production, changing Cloudflare/Sanity resources, DNS, hooks, webhooks, or
  production configuration;
- paid services, force operations, destructive Git actions, or irreversible deletion.

Approval is atomic. Approval to push does not authorize a pull request; approval to open a pull
request does not authorize merge; approval to deploy does not authorize DNS changes; approval for
one publication batch does not authorize another batch or an asset upload.

## 7. Git and change discipline

- Preserve unrelated user changes and inspect a dirty worktree before editing.
- Never rewrite, force-update, or destructively reset shared history as routine remediation.
- Prefer a focused branch from the verified base and coherent conventional commits.
- Branch and commit names describe repository evolution, not the AI or tool used.
- Never import an unrelated branch wholesale to fix isolated defects. Reproduce the defect on the
  current baseline and implement the smallest independently justified correction.
- A checkpoint report records branch, HEAD, scope, changed files, checks, reviews, risks, and exactly
  one next step.

## 8. Content, privacy, and publication

The repository, accepted ADRs, and approved non-sensitive registers govern public claims. Candidate
files, CVs, inventories, owner statements, media, and drafts are sources to verify, not automatic
publication authority.

- Treat every public Sanity dataset record, including drafts, as potentially public.
- Keep private review material outside Git and Sanity.
- Store only non-sensitive candidate/decision metadata and stable opaque IDs in tracked registers.
- Never store private paths, secret URLs, credentials, signatures, identity documents, or
  confidential contents in records, logs, reports, screenshots, or commits.
- Every public claim needs a stable identity, approved source, verification state, privacy/redaction
  review, locale review when applicable, publication decision, and recorded limitation.
- Do not publish unverified metrics or imply credentials, employment, outcomes, or job titles that
  approved evidence does not support.
- English and Indonesian project details are a single publication unit. Credential and evidence
  content never silently falls back. A profile fallback requires explicit approval and visible
  disclosure.
- Public email, phone, location precision, CV, portrait, social links, verification URLs, and files
  each retain their own publication gate.

One content-publication approval covers one bounded content batch. One asset-upload approval covers
one bounded asset batch. These approvals are mutually exclusive and each requires included/excluded
items, locale review, expected IDs/routes, exact action, and rollback plan.

## 9. CMS and asset safety

- Sanity Studio remains separate from the Astro app.
- Production queries use the published perspective, explicitly exclude drafts, and require no browser
  token.
- CMS responses pass through typed runtime validation before rendering.
- Missing configuration, failed fetches, and invalid records fail safely to the static fallback.
- Browser-delivered code must not contain draft/read tokens or secret-prefixed environment values.
- Media and files require safe source/ownership, public privacy status, completed redaction,
  publication approval, localized alt/caption, credit, supported type, positive dimensions where
  relevant, and enforced size limits.
- An asset existing in Sanity never constitutes publication approval.

Any future preview, CORS, webhook, deploy hook, or CMS-triggered rebuild requires a separately
approved architecture, secret boundary, observable end-to-end test, failure model, and rollback.

## 10. UI, accessibility, performance, and localization

- Use semantic HTML and native controls before custom interaction.
- All interactive behavior must work with keyboard, show visible focus, expose an accessible name,
  and restore focus after modal interactions.
- Preserve meaningful content when JavaScript, CMS data, images, blur, transparency, or advanced
  compositing is unavailable.
- Light mode is default; dark mode must remain readable.
- Motion is subtle and respects `prefers-reduced-motion`.
- Verify English and Indonesian route parity, locale switching, hashes, canonical URLs, hreflang,
  sitemap inclusion, and 404 behavior.
- Prefer native CSS and existing dependencies. Avoid heavy animation or client frameworks without a
  documented need.
- Validate representative 320, 390, 768, 1024, and 1440 pixel widths for meaningful UI changes.

## 11. Verification and evidence

`pnpm verify` is the canonical complete local command. It performs whitespace, formatting, lint,
type, test, schema, and production-build checks using non-production Studio placeholders only when
the corresponding environment values are absent. CI must call the same command after a frozen
install.

Targeted checks may be used during iteration, but a milestone closes only after consolidated
verification. UI work also needs browser QA for affected routes, keyboard/focus, themes, reduced
motion, no-JavaScript behavior, and missing content/media. Security/privacy work needs tracked and
untracked secret/private-path scans appropriate to the scope.

Evidence precedence is factual, not political: a fresh direct observation is stronger than an old
status sentence for the same fact, but it does not change policy. Record actual commands and results;
do not hardcode expected test counts, page counts, or SHAs into durable procedures.

## 12. Repository health

- **GREEN:** scope is clear; worktree and branch state are understood; canonical checks pass;
  required reviews have no unresolved Blocker/High findings; privacy and release boundaries remain
  intact; documentation matches observed state.
- **YELLOW:** work is safe to inspect but not ready to checkpoint or release because a check, review,
  documentation update, external fact, or owner decision is pending.
- **RED:** secret/private-data exposure, destructive ambiguity, unsupported public claim, broken
  production boundary, unresolved Blocker/High, or repeated remediation failure. Stop writes,
  preserve evidence safely, and escalate to the owner.

GREEN means locally reviewable. It never authorizes push, PR, merge, deployment, publication, or
another gated external action.

## 13. Recovery and release boundaries

Recovery must be forward, auditable, and owner-gated. Prefer a reviewed revert or corrective branch
over history rewriting. Production rollback, Sanity mutation, provider configuration, and remote Git
actions each require exact approval. Follow `docs/DISASTER_RECOVERY.md` for procedure and
`docs/DEPLOYMENT.md` for the current deployment contract.

At a release boundary, verify the exact branch/HEAD, diff, checks, reviews, CI state, privacy scope,
deployment state, and rollback plan. Report unverified external facts explicitly. Stop at the next
human gate; never infer authorization from a prior local milestone.
