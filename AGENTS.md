# AGENTS.md

## Scope and authority

These instructions apply to the whole repository unless a deeper `AGENTS.md` narrows them.
`docs/GOVERNANCE.md` is the sole durable governance authority. This file is a concise operating
entry point; it must not duplicate temporary phase, branch, SHA, or deployment state.

Any capable human or AI assistant may work in this repository. Authority is capability-based, not
provider-based. Only one active session may write at a time. Additional sessions may perform
read-only exploration or review after recording `git status --short` before and after.

For a new portfolio adaptation, `START_HERE_AI.md` and `prompts/ONE_RUN_PORTFOLIO.md` define the
provider-neutral one-run contract. Provider adapter files may point to that contract but must not
silently replace or weaken it.

## Communication

- Explain plans, progress, risks, and results in Indonesian.
- Use English for code, identifiers, comments where useful, commit messages, technical
  documentation, and primary website copy.
- Explain unfamiliar technical terms in Indonesian and assume the owner is a beginner.
- Lead with verified evidence. Do not invent claims, metrics, dates, credentials, URLs, deployment
  facts, or personal data.

## Required context

Before editing, read in this order:

1. `docs/GOVERNANCE.md`
2. `docs/PROJECT_GUIDE.md`
3. `docs/DECISIONS.md`
4. `docs/ROADMAP.md`
5. `docs/PROGRESS.md`
6. `docs/PHASE_LOG.md` only when historical evidence is relevant
7. relevant content registers, design files, code, configuration, and tests

Use `git status`, the current branch, and verified implementation as empirical evidence. If code,
documentation, or owner instructions conflict, follow the resolution process in
`docs/GOVERNANCE.md`; do not silently choose one.

## Work loop

For an approved local milestone, use one coherent path:

`inspect -> plan -> implement -> targeted checks -> read-only review -> remediation -> consolidated verification -> local checkpoint -> report -> owner gate`

- State the current work state from `docs/PROGRESS.md`, the requested outcome, expected files, and
  meaningful risks before editing.
- Keep edits small, traceable, and within the approved scope.
- Limit automatic remediation to two loops. Stop for a serious unresolved issue, scope or
  architecture change, privacy/product decision, or repeated verification failure.
- After editing, report changes, changed files, commands and results, unresolved issues, and exactly
  one recommended next task.

Repository-local workflow skills in `.agents/skills/` are optional reusable procedures. They are
provider-neutral and subordinate to `docs/GOVERNANCE.md`. Files under `.codex/` and
`scripts/codex/` are optional Codex adapters; no other tool is required to use them, and they carry
no unique authority.

## Product and architecture

Priorities are: publishable correctness, privacy, accessibility and performance, maintainability,
visual quality, then advanced features.

- Keep Astro static in `apps/web` and Sanity Studio standalone in `apps/studio`.
- Keep TypeScript strict, Tailwind CSS, and the pnpm workspace unless an accepted ADR changes them.
- Preserve English-first paired `/en/` and `/id/` public routes, light-first theming, dark mode,
  subtle reduced-motion-aware motion, generous whitespace, and selective Liquid Glass.
- Preserve opaque readable fallbacks when blur, transparency, JavaScript, images, CMS data, or
  advanced compositing is unavailable.
- Do not add dependencies or change the stack without an approved decision and the applicable owner
  gate.

## Content, privacy, and CMS

- Treat every public-dataset record, including drafts, as potentially public.
- Keep production queries tokenless, published-only, and draft-excluding. Never ship a draft or read
  token to browser code.
- Validate CMS responses before rendering and preserve the static fallback for missing or invalid
  configuration and records.
- Asset presence is not publication approval. Preserve source, ownership, privacy/redaction,
  bilingual alt/caption, credit, decorative state, type/size, and publication controls.
- Keep private evidence, credentials, secret URLs, exact private paths, identity documents, and
  unapproved payloads outside Git, Sanity, logs, screenshots, and reports.
- Never publish a metric, credential, contact channel, CV, link, or professional claim without its
  required evidence/review state and exact publication approval. Owner-controlled contact channels
  require a separate field-level gate; metrics, credentials, and professional claims require
  verified support. Bilingual project details are one publication unit; evidence-sensitive content
  never silently falls back.

## Coding and verification

- Inspect before editing; preserve unrelated user changes.
- Prefer typed reusable components, semantic HTML, safe external-data handling, and explicit loading,
  empty, failure, and no-JavaScript states.
- Do not silence lint, type, test, accessibility, or security errors.
- Use `.env.example` for names only; never commit secrets or sensitive assets.
- Run `pnpm verify` for the canonical complete local check. Use narrower commands while iterating.
- For UI changes also verify representative mobile/tablet/desktop viewports, keyboard use, visible
  focus, light/dark themes, reduced motion, no-JavaScript behavior, and missing media/content.

## Documentation responsibilities

- `docs/GOVERNANCE.md`: durable rules and owner gates.
- `docs/DECISIONS.md`: accepted or superseded architecture/product decisions.
- `docs/PROJECT_GUIDE.md`: stable architecture and contributor guide.
- `docs/ROADMAP.md`: durable outcome sequence and exit criteria.
- `docs/PROGRESS.md`: concise current state and one next task.
- `docs/PHASE_LOG.md`: append-only historical evidence.
- `CHANGELOG.md`: notable user- or operator-visible changes.
- `README.md`: beginner onboarding and canonical commands.

Update only the document whose responsibility changed. Do not copy live status into durable policy.

## Git and owner gates

Use concise conventional commits (`feat:`, `fix:`, `content:`, `docs:`, `refactor:`, `test:`,
`chore:`). Branch and commit names describe the work, never an AI provider.

Within an explicitly approved local milestone, the active writer may edit, stage, and create local
checkpoint commits. Otherwise, staging and committing require owner approval.

Exact owner approval is always required before any push, pull-request creation/update, merge, tag,
deployment, production rollback, DNS/provider/resource change, secret or credential handling,
private-evidence access, content publication, asset upload, schema migration, dependency install
with lifecycle risk, CORS/access-control change, paid service, branch cleanup, force operation, or
destructive Git action. One approval covers only the exact stated action; it does not authorize a
later release step.
