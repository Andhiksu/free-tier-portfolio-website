---
name: portfolio-release-gate
description: Verify an Portfolio Owner Portfolio release boundary and prepare a concise owner gate without performing unapproved remote writes. Use before push, pull-request creation or update, merge, deployment, production changes, or branch cleanup, and when confirming branch, head, CI, review, rollback, privacy, and release readiness.
---

# Portfolio Release Gate

## Verify the boundary

1. Read `docs/GOVERNANCE.md`, `AGENTS.md`, relevant accepted decisions, `docs/PROGRESS.md`, and the
   applicable deployment/recovery evidence.
2. Verify every applicable fact from the local repository or live read-only GitHub/provider state.
   `scripts/codex/templates/release-gate.md` is an optional checklist for the Codex adapter and adds
   no unique authority.
3. Verify the expected branch, exact head SHA, clean worktree, empty staging area, upstream state,
   base branch, and changed-file scope.
4. Verify the applicable local checks, CI result, review state, unresolved findings, privacy and
   secret boundary, rollback path, and deployment status.
5. Treat repository snapshots as historical. Check mutable GitHub facts live.
6. If the baseline or release target differs from the approved expectation, stop and report the
   mismatch. Do not repair it through reset, force, cleanup, or history rewriting.

## Enforce exact owner gates

Do not push, create or update a pull request, merge, deploy, change production resources, enable
auto-merge, or delete branches unless the owner explicitly approves that exact action and target.
Approval for one gate does not authorize later gates.

After approval, perform only the approved action, verify its result, and stop at the next gate.
Never combine cleanup with push, pull-request, merge, or deployment approval.

## Report concisely

Report the verified branch and head, local and CI checks, review findings, unresolved risks,
rollback boundary, deployment state, and one exact approval request or next step. Do not include
raw logs, session identifiers, credentials, or full Git output.
