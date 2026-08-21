---
name: portfolio-milestone-loop
description: Run an approved Portfolio Owner Portfolio milestone from repository preflight through scoped implementation, verification, read-only review, limited remediation, local commit, structured reporting, and the next human gate. Use for coherent local milestone work that must preserve a single active execution path, risk-based checks, privacy boundaries, and no automatic remote action.
---

# Portfolio Milestone Loop

## Start safely

1. Read `docs/GOVERNANCE.md`, `AGENTS.md`, `docs/PROJECT_GUIDE.md`, relevant accepted decisions,
   `docs/ROADMAP.md`, and `docs/PROGRESS.md`. Read `docs/PHASE_LOG.md` only when historical evidence
   is relevant.
2. Read relevant content, asset, design, implementation, and configuration sources.
3. Verify the current branch, expected baseline, divergence, worktree, staging area, and untracked
   files before editing.
4. Stop without modifying files when the worktree is unexpectedly dirty, the baseline differs,
   local history has unexplained divergence, or the requested scope is not owner-approved.
5. State the current lifecycle state and milestone, expected files, acceptance criteria,
   verification level, and meaningful risks before editing.

`scripts/codex/templates/milestone-task.md` is an optional normalization template for the Codex
adapter. Any capable tool may apply the equivalent scope, risk, gate, and evidence fields directly;
the template adds no authority beyond `docs/GOVERNANCE.md`.

## Execute one coherent milestone

1. Choose the highest applicable verification level:
   - Level A: documentation, isolated static copy, or narrow noninteractive styling.
   - Level B: shared UI, routes, interaction, localization contracts, accessibility, or SEO.
   - Level C: CMS, dependencies, environment, privacy, external systems, publishing, deployment,
     or architecture.
2. Maintain a single active execution path. Do not perform parallel edits.
3. Implement only the accepted milestone scope and preserve existing working behavior.
4. Run targeted checks while implementing, then the complete applicable checks at the coherent
   milestone boundary.
5. Select only reviewers relevant to the actual risk from the configured read-only agents.
6. Before each reviewer run, verify its effective sandbox is read-only and record
   `git status --short`. Compare the status again afterward. Do not start a reviewer whose runtime
   permissions allow repository writes.
7. Consolidate duplicate findings. Resolve or escalate Blocker and High findings. Accept, reject,
   or defer lower-severity findings with a short rationale.
8. Apply no more than two automatic remediation loops. Stop when a serious issue remains after the
   second loop or when remediation would change scope, architecture, privacy, or an external gate.
9. Run consolidated verification after remediation.
10. Stage and create one coherent local commit only when the milestone scope is approved, all
    required checks pass, and no unresolved Blocker or High finding remains.

## Preserve hard gates

Never perform these actions automatically:

- create an external project or dataset;
- authenticate or handle a token, secret, credential, or private evidence;
- change CORS, access control, billing, DNS, Cloudflare, deployment, or production resources;
- publish real content, evidence, media, or credentials;
- install dependencies when approval or lifecycle scripts are required;
- push, create or update a pull request, merge, enable auto-merge, clean up branches, force-update
  refs, or perform destructive Git actions.

Stop with `human_gate.required: true` and request one exact approval when one of these actions is the
next necessary step.

## Report one result

Return a concise report with status, branch/HEAD, scope, changed files, checks, review decisions,
risks, human gate, and exactly one `next_step`. When using the optional Codex runner, conform to
`scripts/codex/schemas/milestone-report.schema.json`. Do not include raw logs, token usage, session
identifiers, secrets, or full Git output.

Use these statuses consistently:

- `completed`: the local milestone and local commit are complete;
- `human_gate_required`: local work is complete and one external or irreversible action needs
  exact owner approval;
- `blocked`: a serious unresolved issue or required product decision prevents completion;
- `failed`: execution or verification failed before a reliable milestone result was produced.
