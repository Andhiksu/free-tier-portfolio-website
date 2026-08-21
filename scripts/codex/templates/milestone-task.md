# Portfolio Milestone Task

## Identity

- Phase: `<phase>`
- Milestone: `<milestone>`
- Verification level: `<A | B | C>`
- Expected branch: `<branch>`
- Expected baseline: `<sha>`

## Objective

`<one coherent local outcome>`

## Accepted decisions

- `<decision or ADR>`

## Allowed changes

- `<file or bounded area>`

## Acceptance criteria

- `<observable result>`

## Relevant reviewers

- `<configured read-only reviewer or none with rationale>`

Before and after every reviewer run, compare `git status --short`. Do not run a reviewer unless its
effective runtime sandbox is read-only.

## Required checks

- `<targeted checks>`
- `<consolidated milestone checks>`
- `git diff --check`
- changed-file scope
- secret and prohibited-action boundary

## Prohibited actions

Do not perform external project creation, authentication, secret handling, real-content
publication, dependency installation requiring approval or lifecycle scripts, CORS/access-control
changes, push, pull-request mutation, merge, deployment, production changes, branch cleanup, force
operations, or destructive Git actions.

## Stop conditions

Stop for a baseline mismatch, unapproved scope or architecture change, privacy or publication
decision, external action, unresolved serious finding, or two unsuccessful remediation loops.

## Output

Return exactly one JSON report that conforms to
`scripts/codex/schemas/milestone-report.schema.json`. Keep `next_step` to one action and omit raw
logs, token usage, session identifiers, and secrets.
