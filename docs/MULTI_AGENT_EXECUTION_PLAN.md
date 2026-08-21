# Historical Multi-Agent Execution Plan — Phase 2 Pilot

**Historical phase:** Phase 2 — Static Visual MVP
**Status:** Historical reference; not active execution guidance
**Historical operating model:** controlled Phase 2 pilot, one root writer, specialist read-only
reviewers

---

## Current boundary

This document preserves completed pilot evidence only. It does not define current authority,
provider roles, branches, reviewer counts, staging gates, or release steps. For current work:

1. use `docs/GOVERNANCE.md` as the sole durable governance authority;
2. use `AGENTS.md` as the concise operating entry point;
3. use `docs/PROGRESS.md` for live state and one next task;
4. use accepted ADRs for architecture/product decisions;
5. consult this file only when investigating Phase 2 history.

The historical provider names and fixed role assignments below are not current privileges. Any
capable human or AI may be the one active writer within an approved scope; other sessions remain
read-only. If any template below conflicts with current governance, ignore it.

---

### Historical status-source precedence

Use these sources in order for their stated purposes:

1. `docs/PROGRESS.md` — current phase, current task, and next task.
2. `docs/PHASE_LOG.md` — verified slice evidence and checkpoint status.
3. `docs/ROADMAP.md` — canonical phase order, scope, and exit criteria.
4. `docs/MULTI_AGENT_EXECUTION_PLAN.md` — execution workflow, slice definitions, acceptance
   criteria, reviewers, Git strategy, and phase review process.

This document must not override newer verified status in `docs/PROGRESS.md` or
`docs/PHASE_LOG.md`.

### Live-status resolution

Resolve the current phase, completed slices, next task, checkpoint state, branch publication state,
pull-request state, and CI state at the start of every task from `docs/PROGRESS.md` and
`docs/PHASE_LOG.md`.

This execution plan intentionally does not duplicate slice-specific live status. When status
sources disagree, stop and reconcile them before planning, implementation, review, staging, or Git
publication work.

---

## 1. Historical Bootstrap Baseline

The following is the repository snapshot from when the multi-agent workflow was introduced. It is
preserved for historical context, is not the live task tracker, and is not a claim that the current
working tree is clean. Resolve live status from `docs/PROGRESS.md` and `docs/PHASE_LOG.md`:

- Phase 0 completed.
- Phase 1 completed and merged through PR #1.
- Phase 2 active.
- Phase 2 Slice 1 — shared typed homepage foundation completed.
- Slice 1 merged through PR #2.
- `docs/PROGRESS.md` updated through PR #3.
- `format`, `lint`, `type-check`, `build`, and `diff check` passed.
- `/`, `/en/`, and `/id/` work.
- At that starting point, `main` was clean and synchronized with `origin/main`.
- At that starting point, local and remote feature branches were clean.
- Latest commit:

```text
cfa8af2 docs: update progress after phase 2 slice 1 (#3)
```

---

## 2. Historical decision

Use a **controlled Phase 2 single-writer multi-agent pilot**. Evaluate the pilot after Slice 2. The
long-lived Phase 2 branch and target of one Phase 2 pull request are not permanent rules for later
phases.

The system may automatically:

- inspect and plan;
- decompose the active phase into slices;
- implement code;
- run verification;
- spawn specialist reviewers;
- fix findings;
- prepare changes for human-reviewed staging and checkpoint commits;
- update project documentation at phase end;
- prepare a Phase 2 branch for push and a pull request, without performing either action;
- request or receive GitHub Codex review only after a pull request exists and the owner authorizes
  that workflow;
- fix review findings and CI failures.

The system must stop for a human decision before:

- staging files;
- creating checkpoint commits;
- pushing;
- creating a pull request;
- merging the Phase 2 pull request, including enabling auto-merge;
- deleting local or remote branches;
- changing architecture or the primary stack;
- adding secrets or production credentials;
- buying services;
- changing domain, DNS, billing, or production infrastructure;
- publishing personal or third-party evidence;
- destructive Git or CMS operations.

### Important distinction

Do not treat these as the same thing:

1. **Local code review:** a reviewer agent evaluates the diff.
2. **Sandbox Auto-review:** a reviewer agent evaluates an action that crosses a sandbox boundary.
3. **GitHub PR review:** Codex reviews the pull request and posts findings.

Sandbox Auto-review is not a GitHub approval and does not expand permissions.

---

## 3. Agent Topology

```text
ChatGPT Project
└── Codex Orchestrator — only writable owner
    ├── Explorer / Architect — read-only
    ├── UI & Accessibility Reviewer — read-only
    ├── QA & Test Reviewer — read-only
    ├── Code Quality Reviewer — read-only
    ├── Security & Privacy Reviewer — read-only
    └── Documentation Reviewer — read-only
```

### Single-writer rule

Only the root orchestrator may edit the active phase worktree. Every subagent is read-only.

Use parallel agents primarily for:

- repository exploration;
- test and log analysis;
- UI/accessibility review;
- security review;
- maintainability review;
- documentation audit.

Do not delegate edits or give write access to a subagent. Before spawning a reviewer, confirm that
its effective runtime sandbox remains read-only; if a parent-session override would broaden the
child's permissions, change the reviewer run to read-only or do not spawn it. Compare Git status
before and after every review as an additional safeguard.

---

## 4. Agent Roles and Model Routing

The official balanced everyday model name is **Terra**, not “Tera.” Use it for read-heavy work that
benefits from capable reasoning without requiring the highest-cost review model.

### 4.1 Orchestrator

Responsibilities:

- read `AGENTS.md` and project documents;
- confirm active phase and clean Git state;
- create the phase branch;
- create the slice plan;
- delegate only suitable independent work;
- control the single writer;
- consolidate reviewer findings;
- enforce acceptance criteria;
- prepare the phase PR and report.

Model policy:

- leave unpinned when automatic model selection is preferred;
- medium reasoning by default;
- high reasoning for architecture, difficult debugging, or final synthesis.

### 4.2 Explorer / Architect

Use for repository scans and change planning.

```text
model: gpt-5.6-terra
reasoning: medium
sandbox: read-only
```

Outputs:

- affected files;
- reusable patterns;
- risks;
- smallest safe implementation plan;
- verification plan.

### 4.3 Root Implementation

The root orchestrator performs all implementation. Do not spawn a writable implementation worker.

```text
model: inherit automatic choice, or gpt-5.6
reasoning: medium
sandbox: workspace-write
```

Rules:

- edit only from the root task;
- modify only scoped files;
- avoid unnecessary dependencies;
- preserve `/`, `/en/`, and `/id/`;
- reuse design tokens and components;
- run targeted checks before returning work.

### 4.4 UI & Accessibility Reviewer

```text
model: gpt-5.6-terra
reasoning: high
sandbox: read-only
```

Review:

- light-first hierarchy;
- dark-mode parity;
- selective semi-liquid-glass usage;
- responsive layout;
- whitespace and crowding;
- keyboard navigation;
- focus visibility;
- semantic landmarks;
- contrast;
- reduced-motion behavior;
- overflow and touch targets.

### 4.5 QA & Test Reviewer

```text
model: gpt-5.6-terra
reasoning: medium
sandbox: read-only
```

Review:

- route integrity;
- theme persistence;
- locale navigation;
- component states;
- build output;
- console errors;
- type safety;
- regression risk;
- missing tests.

Escalate to `gpt-5.6` high only for difficult failures.

### 4.6 Code Quality Reviewer

```text
model: gpt-5.6-terra
reasoning: high
sandbox: read-only
```

Review:

- correctness and edge cases;
- duplicated logic;
- fragile CSS;
- component boundaries;
- state handling;
- dead code;
- overengineering;
- missing tests.

### 4.7 Security & Privacy Reviewer

```text
model: gpt-5.6-terra
reasoning: high
sandbox: read-only
```

Use when changes touch forms, APIs, CMS, uploads, environment variables, deployment, analytics, or public evidence.

Review:

- secret exposure;
- unsafe HTML;
- external-link behavior;
- PII and document privacy;
- third-party media rights;
- form abuse;
- dependency and production risks.

### 4.8 Documentation Reviewer

```text
model: gpt-5.6-terra
reasoning: low
sandbox: read-only
```

Review:

- `ROADMAP.md` alignment;
- `PROGRESS.md` accuracy;
- required `DECISIONS.md` changes;
- `CHANGELOG.md` content;
- phase acceptance evidence.

The orchestrator applies documentation changes once at phase end.

---

## 5. Cost-Control Policy

- Leave the root model unpinned for automatic balancing when appropriate.
- Pin balanced read-heavy reviewers to Terra.
- Use `gpt-5.6-terra` with high reasoning for demanding Phase 2 pilot review or debugging.
- Use no more than three specialist reviewers for a normal slice.
- Use the full five-reviewer set only at phase end.
- Do not run a security review for every static CSS change.
- Do not ask two agents to perform the same generic review.
- Require narrow reviewer rubrics and actionable output.
- Keep `agents.max_depth = 1`.
- Keep `agents.max_threads` between 4 and 6.
- Close completed agent threads.
- Use targeted checks per slice and the complete suite at phase end.

If a model is not pinned, Codex may choose a setup that balances capability, speed, and usage. Local custom agents can have their own model settings. Hosted cloud-task model selection may remain controlled by the platform default.

---

## 6. Permissions and Safety

Recommended root-orchestrator launch mode during the pilot:

```bash
codex \
  --sandbox workspace-write \
  --ask-for-approval on-request \
  -c approvals_reviewer=auto_review
```

This allows the root orchestrator to perform approved edits and commands inside the repository
while keeping sandbox boundaries. It does not authorize any subagent to write.

Never use as the project default:

```bash
--dangerously-bypass-approvals-and-sandbox
```

or:

```bash
--yolo
```

### Always human-gated

- staging files;
- creating local or checkpoint commits;
- pushing;
- creating a pull request;
- merging;
- deleting local or remote branches;
- force push;
- destructive reset or clean;
- deleting unmerged work;
- changing repository ownership or branch protection;
- secrets and production tokens;
- purchases and billing;
- DNS and domain changes;
- production deployment;
- publishing evidence;
- destructive CMS migration;
- primary-stack changes.

---

## 7. Git Strategy — Controlled Phase 2 Pilot

The current pilot uses one long-lived Phase 2 branch and targets one Phase 2 pull request. Review
this choice after Slice 2. Do not treat it as the default strategy for future phases.

### Branches

Remaining Phase 2:

```text
phase/2-static-visual-mvp-completion
```

Possible future branch names are illustrative only and are not adopted by this pilot:

```text
phase/3-core-pages
phase/4-sanity-cms
phase/5-content-migration
phase/6-production-launch
```

### During the Phase 2 pilot

For every slice:

1. implement locally;
2. run targeted checks;
3. run relevant specialist reviews;
4. fix findings;
5. rerun checks;
6. stop for owner review and explicit approval before staging files;
7. after staging is approved, stop again for explicit approval before creating a checkpoint
   commit;
8. continue on the same Phase 2 branch only after those gates are satisfied.

Example commits:

```text
feat(nav): add responsive navigation shell
feat(theme): add light and dark theme behavior
feat(home): add hero and impact metrics
feat(home): add projects and career previews
feat(home): add capability and credential sections
fix(a11y): improve focus and reduced-motion behavior
```

### At the intended Phase 2 pilot PR boundary

1. run the full verification suite;
2. run final parallel specialist reviews;
3. fix all P0/P1 and justified P2 findings;
4. update `PROGRESS.md`, `CHANGELOG.md`, `PHASE_LOG.md`, and `DECISIONS.md` only when needed;
5. stop for owner review and explicit approval before staging final documentation;
6. after staging approval, stop again for explicit approval before a checkpoint commit;
7. request separate explicit owner approval before pushing;
8. after an approved push, request separate explicit owner approval before creating the pull
   request;
9. after a pull request exists, wait for GitHub CI and any separately enabled Codex review;
10. fix serious findings and CI failures only within the approved scope;
11. stop at the merge gate;
12. after an approved merge, request explicit approval before deleting local or remote branches.

The Phase 2 pilot intends to include its documentation with the implementation in one Phase 2 pull
request. This is a pilot choice, not a permanent repository rule.

### Merge recommendation

For the current experience level:

- require CI;
- consider native GitHub Codex Automatic Review only after a pull request exists and the owner
  approves it;
- retain an explicit human merge gate for the Phase 2 pilot.

Optional during the pilot:

- the owner may separately approve enabling GitHub auto-merge for a specific pull request after
  reviewing the phase report; that approval is the explicit merge gate for that pull request;
- GitHub merges only after required checks pass.

Do not configure an agent to bypass branch protection or required reviews. No GitHub CI or GitHub
Codex Automatic Review execution is claimed by this plan before a pull request exists.

---

## 8. Automated Phase Loop

```text
START PHASE
  ↓
Read project instructions and confirm clean main
  ↓
Use the existing Phase 2 pilot branch
  ↓
Create bounded slice plan
  ↓
FOR EACH SLICE
  ├── read-only exploration
  ├── root-only implementation
  ├── targeted verification
  ├── specialist review
  ├── fix findings
  ├── rerun verification
  ├── update phase log
  └── HUMAN GATES: staging, then checkpoint commit
  ↓
Full phase verification
  ↓
Final five-agent review
  ↓
Fix accepted findings
  ↓
Update phase documentation
  ↓
HUMAN GATE: push
  ↓
HUMAN GATE: create pull request
  ↓
GitHub CI and any separately enabled Codex review
  ↓
Fix serious findings and CI failures
  ↓
HUMAN MERGE GATE
  ↓
Merge only after approval, verify main, then request approval before branch cleanup
```

### Correction-loop limit

Allow a maximum of three complete review-fix cycles for the same acceptance failure.

After three failures, stop and report:

- failing criterion;
- evidence;
- attempted fixes;
- current repository state;
- smallest decision required from the owner.

---

## 9. Phase Log

Create:

```text
docs/PHASE_LOG.md
```

Format:

```markdown
# Phase Log

## Phase 2

### Slice 2 — Navigation and Theme Shell

Status: completed

Plan:

- ...

Files changed:

- ...

Verification:

- format: pass
- lint: pass
- type-check: pass
- build: pass

Reviewer findings:

- ...

Fixes:

- ...

Deferred:

- ...

Commit:

- pending owner approval, or `<hash> <message>` after approval
```

Store concise summaries, not raw logs. This file is the durable handoff for long-running Goal mode.

---

## 10. Remaining Phase 2 Slices

### Slice 2 — Navigation and Theme Shell

Scope:

- desktop and mobile navigation;
- language controls;
- light mode default;
- dark-mode toggle;
- theme persistence;
- accessible mobile menu behavior;
- shared shell for `/`, `/en/`, and `/id/`;
- restrained semi-liquid-glass navigation surface.

Acceptance:

- all routes work;
- no hydration-related theme failure;
- theme persists;
- no unreadable flash;
- mobile menu supports keyboard and Escape;
- visible focus exists;
- no horizontal overflow;
- main verification passes.

Reviewers:

- UI & Accessibility;
- QA & Test;
- Code Quality.

### Slice 3 — Hero and Impact Metrics

Scope:

- hero hierarchy;
- target-role badges;
- primary and secondary CTAs;
- status/availability treatment;
- selected metrics;
- responsive composition;
- subtle interaction and reduced-motion fallback.

Acceptance:

- career pivot is quickly understandable;
- metrics have context;
- no invented claim;
- mobile layout is readable;
- glass and animation are restrained.

Reviewers:

- UI & Accessibility;
- Code Quality.

### Slice 4 — Projects, About, and Career Journey

Scope:

- featured project cards;
- project tags and evidence indicators;
- About/value proposition preview;
- selected experience;
- career journey preview;
- reusable content components.

Acceptance:

- three Data & AI projects receive priority;
- prior engineering and business experience supports the story;
- cards are not crowded;
- optional missing data is safe;
- links are keyboard accessible.

Reviewers:

- UI & Accessibility;
- QA & Test;
- Code Quality.

### Slice 5 — Capabilities, Credentials, Contact, Footer

Scope:

- capability groups;
- selected education and certifications;
- achievements/publications only when supported;
- contact CTA;
- footer and external-link states.

Acceptance:

- no arbitrary skill percentages;
- unsupported publications are not fabricated;
- sections remain concise;
- external links are safe;
- mobile spacing is clean.

Reviewers:

- UI & Accessibility;
- Code Quality;
- Security & Privacy for external links.

### Slice 6 — Responsive and Accessibility Hardening

Scope:

- key breakpoints;
- theme parity;
- keyboard navigation;
- reduced motion;
- semantic structure;
- loading/failure states;
- performance cleanup;
- dead-style cleanup.

Acceptance:

- no unresolved P0/P1 finding;
- no overflow;
- no inaccessible control;
- no obvious console error;
- all routes build;
- full verification passes.

Final reviewers in parallel:

1. UI & Accessibility;
2. QA & Test;
3. Code Quality;
4. Security & Privacy;
5. Documentation.

---

## 11. Historical Phase 2 Goal Prompt Template

The prompt below is the original phase-start bootstrap template. It is retained for historical
reference and must not be used to infer current progress. Resolve current status from
`docs/PROGRESS.md` and `docs/PHASE_LOG.md` before adapting or running it.

At the time this template was written, the full Slices 2–6 goal was deferred during the
infrastructure checkpoint, Slice 2 was designated as the first controlled implementation pilot,
and the workflow was to be re-evaluated after Slice 2.

```text
/goal Complete the remaining Phase 2 Static Visual MVP work without
stopping until the Phase 2 acceptance criteria in
`docs/MULTI_AGENT_EXECUTION_PLAN.md` and `docs/ROADMAP.md` pass.

Current state:
- Phase 2 Slice 1 is merged on main.
- Start from clean and synchronized main.
- Create `phase/2-static-visual-mvp-completion`.
- Complete Slices 2 through 6 in order.
- Use the root orchestrator as the only writer.
- Use subagents mainly for read-only exploration, UI/accessibility,
  QA, code quality, security/privacy when relevant, and documentation.
- Keep agent depth at 1.
- Run targeted checks after each slice and the full suite at phase end.
- Fix findings before continuing.
- Request owner review and explicit approval before staging each slice, then request separate
  explicit approval before creating its checkpoint commit.
- Do not push or open a PR until the whole phase passes.
- At phase end update PROGRESS.md, CHANGELOG.md, PHASE_LOG.md, and
  DECISIONS.md only when needed in the same branch.
- Request separate explicit owner approvals for push and for creating one Phase 2 pull request.
- Do not merge, deploy, change DNS, buy services, or expose secrets.
- Stop only at a human gate or after three failed correction loops for
  the same acceptance criterion.

Definition of done:
- Slices 2–6 complete.
- `/`, `/en/`, and `/id/` work.
- Light-first and dark mode work.
- Homepage is modular, responsive, accessible, interactive, and not crowded.
- format, lint, type-check, build, and diff checks pass.
- tests: N/A — no automated test suite configured.
- final specialist review has no unresolved P0/P1 finding.
- documentation is current.
- one reviewable Phase 2 PR is open with a complete summary.
```

---

## 12. Final Review Prompt

```text
Review the current phase branch against main.

Spawn one read-only agent for each category:
1. UI and accessibility;
2. functional bugs and regression risk;
3. code quality and maintainability;
4. security and privacy;
5. roadmap, documentation, and acceptance criteria.

Use `gpt-5.6-terra` with high reasoning for UI, correctness, and security reviews during the Phase 2
pilot. Wait for all agents.

Return only actionable findings with:
- severity: P0, P1, P2, or P3;
- file and line reference;
- evidence;
- impact;
- smallest recommended fix.

Do not edit files. Do not duplicate findings. Do not report subjective
preferences unless they conflict with the project guide or acceptance criteria.
```

---

## 13. GitHub Review Loop

Requesting or enabling native Codex code review and Automatic Reviews requires explicit owner
approval during the Phase 2 pilot and can occur only after a pull request exists. They have not run
during this checkpoint.

If Automatic Reviews is separately enabled after pull-request creation:

1. wait for the review to run; do not claim success before a result exists;
2. Codex reports serious findings;
3. accepted findings are fixed on the same branch;
4. CI reruns;
5. another review is requested only after a material diff change.

Example PR comment:

```text
@codex fix the P1 issue and run the repository verification commands.
Do not modify unrelated files.
```

### Do not start with Codex GitHub Action

The GitHub Action requires an OpenAI API key stored as a GitHub secret. API usage is separate from ChatGPT subscription usage.

After owner approval, consider:

- native GitHub Codex integration;
- existing repository CI;
- Automatic Reviews.

Consider the GitHub Action only after an explicit billing and secret-management decision.

---

## 14. Optional PR Babysitter

An optional scheduled Codex/ChatGPT task may:

- poll CI;
- inspect new review comments;
- apply narrow fixes;
- rerun checks;
- report when the PR is ready.

It must stop when:

- all checks pass and no serious finding remains;
- a product decision is required;
- a secret or external permission is required;
- three fix attempts fail;
- the PR is merged or closed.

It must not merge unless the owner explicitly enabled auto-merge for that PR.

---

## 15. Repository Additions

Proposed structure:

```text
free-tier-portfolio-website/
├── .codex/
│   └── agents/
│       ├── architect.toml
│       ├── ui-a11y-reviewer.toml
│       ├── qa-reviewer.toml
│       ├── code-reviewer.toml
│       ├── security-reviewer.toml
│       └── docs-reviewer.toml
├── docs/
│   ├── MULTI_AGENT_EXECUTION_PLAN.md
│   ├── PHASE_LOG.md
│   ├── PROGRESS.md
│   ├── ROADMAP.md
│   └── DECISIONS.md
└── AGENTS.md
```

Do not create these blindly. First inspect current repository conventions and installed Codex support.

---

## 16. Custom Agent Examples

### Standalone custom-agent schema compatibility

The project-scoped configuration uses standalone `.toml` files under `.codex/agents/`. Each file
retains the required `name`, `description`, and `developer_instructions` fields. The optional
`model`, `model_reasoning_effort`, and `sandbox_mode` fields are supported, while
`.codex/config.toml` only contains the global `[agents]` settings needed by this project. No
`[agents.<role>]` registry or `config_file` mapping is required.

Runtime thread labels alone do not expose every custom-agent metadata field. Limited label
visibility is not evidence that the standalone files or their required `name` and `description`
fields are invalid.

### `.codex/agents/architect.toml`

```toml
name = "portfolio_architect"
description = "Read-only explorer and architecture planner."
model = "gpt-5.6-terra"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"

developer_instructions = """
Read AGENTS.md and relevant project documents first.
Inspect routes, components, styles, types, tests, and dependencies.
Return the smallest safe plan, affected files, risks, reusable patterns,
and verification steps. Do not edit files or expand scope.
"""
```

### `.codex/agents/ui-a11y-reviewer.toml`

```toml
name = "ui_a11y_reviewer"
description = "Reviews responsive UI, accessibility, themes, and glass usage."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Review keyboard access, focus, semantics, contrast, responsive layout,
overflow, reduced motion, theme parity, hierarchy, content density,
and selective semi-liquid-glass usage. Return actionable findings with
severity, evidence, and file references. Do not edit files.
"""
```

### `.codex/agents/qa-reviewer.toml`

```toml
name = "qa_reviewer"
description = "Reviews tests, routes, build output, and regressions."
model = "gpt-5.6-terra"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"

developer_instructions = """
Validate the active slice against acceptance criteria. Inspect routes,
themes, locales, states, build output, type safety, and test coverage.
Run permitted verification commands. Do not edit source files.
"""
```

### `.codex/agents/code-reviewer.toml`

```toml
name = "code_quality_reviewer"
description = "Reviews correctness, maintainability, boundaries, and tests."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Prioritize behavior bugs, regressions, edge cases, duplicated logic,
fragile CSS, unclear boundaries, dead code, unsafe state handling,
and missing tests. Ignore subjective preferences unless they violate
project guidance. Do not edit files.
"""
```

### `.codex/agents/security-reviewer.toml`

```toml
name = "security_privacy_reviewer"
description = "Reviews secrets, privacy, integrations, and web security."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Review only risks relevant to changed files: secrets, environment handling,
unsafe HTML, external links, PII, public documents, media privacy, forms,
APIs, CMS, analytics, dependencies, and production configuration.
Use evidence and do not edit files.
"""
```

### `.codex/agents/docs-reviewer.toml`

```toml
name = "documentation_reviewer"
description = "Checks roadmap, progress, decisions, changelog, and phase evidence."
model = "gpt-5.6-terra"
model_reasoning_effort = "low"
sandbox_mode = "read-only"

developer_instructions = """
Compare implementation with ROADMAP.md, PROGRESS.md, DECISIONS.md,
CHANGELOG.md, and active acceptance criteria. Identify only necessary
updates. Never mark unfinished work complete. Do not edit files.
"""
```

---

## 17. AGENTS.md Addendum

After inspecting the current file, add equivalent guidance:

```markdown
## Multi-agent workflow

- Use the root orchestrator as the only writer.
- Prefer subagents for read-heavy exploration, test analysis, specialist
  review, and documentation review.
- Never assign overlapping write scopes to parallel agents.
- Keep agent depth at 1.
- Use `gpt-5.6-terra` with high reasoning for difficult architecture, correctness,
  UI/accessibility, or security review during the Phase 2 pilot.
- During the controlled Phase 2 pilot, use one long-lived Phase 2 branch and target one Phase 2
  pull request; re-evaluate the workflow after Slice 2.
- Require owner review and explicit approval separately before staging, checkpoint commits, push,
  pull-request creation, merge, and branch deletion.
- Include progress, changelog, phase log, and required decision updates in
  the same phase PR.
- Run all required checks and specialist reviews before opening a PR.
- Do not merge, deploy, change DNS, buy services, expose secrets, publish
  private evidence, or perform destructive Git actions without explicit
  owner approval.
```

---

## 18. End-of-Phase Report

```markdown
# Phase Completion Report

## Phase

Phase N — Name

## Summary

...

## Completed slices

- ...

## Files changed

- ...

## Verification

- format:
- lint:
- type-check:
- tests: N/A — no automated test suite configured
- build:
- diff check:
- route checks:

## Specialist reviews

- UI/accessibility:
- QA:
- code quality:
- security/privacy:
- documentation:

## Findings fixed

- ...

## Deferred items

- ...

## Documentation updated

- ...

## Git

- branch:
- commits:
- PR:
- CI:
- Codex review:

## Human gate

- exact owner action:

## Next phase

- exactly one recommended next phase:
```

---

## 19. Human-Gate Matrix

| Action                                      |                              Automatic? |
| ------------------------------------------- | --------------------------------------: |
| Read repository                             |                                     Yes |
| Edit active phase files                     |             Yes, root orchestrator only |
| Run verification                            |                                     Yes |
| Stage files                                 |         Human gate during Phase 2 pilot |
| Create local commits                        |         Human gate during Phase 2 pilot |
| Spawn read-only reviewers                   |                                     Yes |
| Fix findings                                |                                     Yes |
| Update docs at phase end                    |                                     Yes |
| Push phase branch                           |        Separate owner approval required |
| Open phase PR                               |        Separate owner approval required |
| Request GitHub Codex review                 |         Human gate during Phase 2 pilot |
| Fix PR findings                             |                                     Yes |
| Merge phase PR                              |                              Human gate |
| Enable auto-merge                           |                              Human gate |
| Change branch protection                    |                              Human gate |
| Add major dependency or change architecture |                              Human gate |
| Add secrets                                 |                              Human gate |
| Change DNS/domain                           |                              Human gate |
| Deploy production                           |                              Human gate |
| Publish evidence                            |                              Human gate |
| Purchase service                            |                              Human gate |
| Force push/destructive reset                | Prohibited unless explicitly authorized |
| Delete local or remote branches             |                              Human gate |

---

## 20. Historical Rollout Sequence

The sequence below records the original infrastructure rollout. Its early steps are retained as
historical templates and are not the live task queue. Resolve current status from
`docs/PROGRESS.md` and `docs/PHASE_LOG.md` before adapting or running any step.

### Step 1 — Read-only audit

```text
Read this document, AGENTS.md, PROJECT_GUIDE.md, ROADMAP.md, PROGRESS.md,
DECISIONS.md, package scripts, and GitHub workflows.

Do not modify files.

Report:
- conflicts with existing instructions;
- current CI and Codex capabilities;
- exact files to add or update;
- unsupported configuration;
- safest rollout sequence;
- Phase 2 Slice 2 plan.
```

### Step 2 — Add orchestration infrastructure

In one scoped task:

- add verified custom agents;
- update `AGENTS.md`;
- add `docs/PHASE_LOG.md`;
- save this file as `docs/MULTI_AGENT_EXECUTION_PLAN.md`;
- do not change website UI yet;
- run configuration and repository checks.

Keep this setup on the Phase 2 pilot branch. Staging, committing, pushing, and creating the target
Phase 2 pull request each require owner review and explicit approval.

### Step 3 — Run the controlled Slice 2 pilot

Do not run the full Slices 2–6 goal yet. Implement Slice 2 as the first controlled pilot, then
evaluate the workflow.

### Step 4 — Re-evaluate, then prepare the intended Phase 2 PR

After Slice 2, decide whether to continue the one-branch/one-PR pilot. Any staging, checkpoint
commit, push, or pull-request creation remains separately human-gated.

Include:

- Slices 2–6;
- multi-agent configuration;
- phase documentation.

### Step 5 — Evaluate after Slice 2

Measure:

- actual usage;
- unnecessary agent calls;
- review signal quality;
- time saved;
- duplicated findings;
- human intervention required.

Decide whether to continue or revise model routing, reviewer count, branch length, and pull-request
strategy before later slices or future phases.

---

## 21. Success Criteria

The workflow is successful when:

- the controlled Slice 2 pilot completes without parallel writes;
- no parallel write conflict occurs;
- checks pass before PR creation;
- final review has no unresolved serious issue;
- documentation matches repository state;
- owner intervention is limited to meaningful decisions;
- no secret or private evidence is exposed;
- model use is lower than maximum reasoning everywhere;
- the owner can evaluate whether one Phase 2 pull request is useful before adopting any future
  workflow;
- `/`, `/en/`, and `/id/` remain stable.

---

## 22. Phase 2 Pilot Defaults

```text
Autonomy:
Controlled within the Phase 2 pilot

Writer:
Root orchestrator only

Subagents:
Read-only specialists

Model routing:
Hybrid automatic
- unpinned root for recommended selection
- Terra as the balanced everyday model for exploration, QA scans, and documentation
- gpt-5.6-terra with high reasoning for difficult correctness, UI, or security review

Sandbox:
workspace-write for the root orchestrator only; read-only for every subagent

Approvals:
on-request + Auto-review

Git:
human gate before staging
separate human gate before checkpoint commits
separate human gates before push and Phase 2 pull-request creation
one Phase 2 branch and intended one Phase 2 PR are pilot choices only

GitHub:
CI after a pull request exists
requesting or enabling native Codex review only after separate owner approval
neither is claimed to have run during the infrastructure checkpoint

Merge and branch cleanup:
separate human gates

Deployment, DNS, secrets, billing, and publication:
always human-gated

Evaluation:
review the workflow after Slice 2 before applying it to later Phase 2 slices or future phases
```

---

## 23. Official References

Verify current behavior before implementation because product features may change.

- Subagents and custom agents:
  https://developers.openai.com/codex/concepts/subagents

- Codex models:
  https://developers.openai.com/codex/models

- Long-running work and Goal mode:
  https://developers.openai.com/codex/long-running-work

- Follow a goal:
  https://developers.openai.com/codex/use-cases/follow-goals

- Approvals and security:
  https://developers.openai.com/codex/agent-approvals-security

- Sandbox Auto-review:
  https://developers.openai.com/codex/concepts/sandboxing/auto-review

- GitHub Codex review:
  https://developers.openai.com/codex/integrations/github

- Codex GitHub Action:
  https://developers.openai.com/codex/github-action

- Codex cloud:
  https://developers.openai.com/codex/cloud

- `AGENTS.md` guidance:
  https://developers.openai.com/codex/guides/agents-md
