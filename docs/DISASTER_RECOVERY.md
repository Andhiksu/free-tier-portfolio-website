# Disaster Recovery and Rollback Runbook

This runbook is retained for the archived demonstration build and its local case-study artifacts.
The original deployment has been retired. It must not be used to infer or modify any active personal
website, provider, domain, deployment, or CMS state.

## Scope and authority

Use this runbook for local-environment loss, failed builds, bad public releases, Cloudflare outages,
Studio outages, invalid CMS output, or content/asset integrity incidents. `docs/GOVERNANCE.md`
controls approval and safety. This procedure never authorizes a remote or destructive action by
itself.

Recovery priorities are:

1. protect people, private data, credentials, and evidence;
2. stop further exposure or mutation without destroying evidence;
3. verify the exact affected system and last-known-good state;
4. choose a reversible, owner-approved recovery action;
5. validate the restored state and document the evidence.

## 1. Fresh-clone recovery

From a trusted machine with Git, the pinned Node version, and pnpm:

```bash
git clone https://github.com/example-user/free-tier-portfolio-website.git
cd free-tier-portfolio-website
git status --short --branch
git remote -v
pnpm install --frozen-lockfile
pnpm verify
```

Do not copy `.env*`, tokens, private evidence, ignored source archives, or provider credentials from
an untrusted or public location. Recreate approved local environment values through their trusted
owner/provider source. A successful `pnpm verify` proves repository health, not production state.

## 2. Initial incident triage

Before changing anything, record:

- date/time and reporter;
- affected hostname, route, content record, build, or local environment;
- exact observed behavior and HTTP/status evidence;
- current branch, HEAD, worktree, and remote baseline;
- latest CI result and open pull-request state;
- current Cloudflare/Sanity state through read-only inspection when available;
- whether personal data, secrets, private evidence, unsupported claims, or public integrity are at
  risk;
- the last-known-good Git commit and provider deployment, kept distinct.

If a secret or private item may be exposed, do not paste it into chat, Git, logs, screenshots, or the
incident report. Escalate to the owner and relevant provider's secure revocation path.

## 3. Failed local or CI build

1. Reproduce on a clean focused branch from the verified base.
2. Install with `pnpm install --frozen-lockfile`.
3. Run the failing targeted command, then `pnpm verify`.
4. Compare Node/pnpm pins, lockfile, environment variable names, and CI logs.
5. Fix only the demonstrated repository defect.
6. Obtain proportional read-only review and create a local checkpoint if authorized.
7. Stop at the owner gate for push, PR, merge, or deployment.

Do not bypass a failure by weakening tests, removing validation, changing the lockfile casually, or
silencing type/lint errors.

## 4. Bad Cloudflare deployment or host outage

Read-only preflight:

1. verify DNS/HTTP behavior from more than one route;
2. inspect the Cloudflare Pages project and exact active deployment;
3. identify its source commit and whether it matches GitHub `main`;
4. identify a verified earlier healthy deployment;
5. verify whether the fault is repository code, provider configuration, DNS, upstream CMS, or an
   external outage;
6. record the proposed action and rollback target.

Recovery options, each requiring exact owner approval:

- **Provider rollback:** select the exact verified earlier Pages deployment.
- **Forward correction:** create and review a focused revert/corrective commit, then use the normal
  push/PR/merge/deployment gates.
- **Configuration/DNS correction:** change only the verified faulty setting under a separate exact
  provider gate.

Never use `git reset --hard`, force-push, delete the Pages project, disconnect Git integration, or
alter DNS as an unreviewed shortcut. A provider rollback does not modify Git; follow-up repository
reconciliation may still be required.

After recovery, verify the routes, redirect, sitemap, robots, headers, assets, themes, keyboard,
no-JavaScript behavior, and CMS/fallback state listed in `docs/DEPLOYMENT.md`.

## 5. Sanity or CMS incident

The public web build is static and retains a reviewed fallback. A Sanity outage does not rewrite an
already deployed build, and a Sanity publication does not currently have a verified automatic
Cloudflare rebuild path.

Read-only preflight:

1. distinguish Studio availability from public Sanity API availability;
2. inspect document/draft/asset state without exposing content in reports;
3. confirm production queries remain tokenless, published-only, and draft-excluding;
4. run `pnpm test`, `pnpm schema:validate`, and a safe local build;
5. determine whether the deployed HTML contains CMS data or static fallback;
6. identify the exact record/revision and last-known-good content state.

Potential actions requiring exact owner approval include document restore, unpublish/re-publish,
asset change, schema migration, Studio deployment/configuration, dataset mutation, token rotation,
or a web rebuild/deployment. Never treat a draft as private storage and never upload private evidence
to investigate a public-dataset problem.

## 6. Content, claim, or privacy incident

When public content may be unsupported, unapproved, mistranslated, over-precise, or privacy unsafe:

1. capture only non-sensitive identifiers and public URLs;
2. locate the claim/source/asset/publication record and approved batch;
3. compare both locales and all affected routes;
4. determine whether the safest immediate path is a provider rollback, forward repository
   correction, or separately approved CMS correction;
5. preserve the evidence chain without copying private material into Git;
6. obtain the exact owner publication/removal/deployment gate;
7. verify the public result and update the relevant register, status, history, and changelog.

Do not replace an unsupported claim with another inferred claim. Omit it or represent the limitation
honestly until evidence and approval exist.

## 7. Asset/provenance integrity

For a suspected missing, duplicated, corrupted, or unsafe public asset:

- verify stable IDs, approved derivatives, checksums where tracked, public references, localized
  alt/caption, source/ownership, privacy/redaction, credit, type, size, and publication status;
- run `pnpm test` and the relevant asset/register test directly when useful;
- never reveal ignored source paths or contents in a report;
- do not upload, delete, relink, or replace an asset without an exact asset gate and rollback plan.

Tracked inventories describe evidence relationships; they are not backups of private source files.

## 8. Git recovery

Safe read-only diagnostics include:

```bash
git status --short --branch
git log --oneline --decorate -20
git branch --all --verbose
git worktree list
git fsck --full
```

For shared-history correction, prefer a focused forward revert or corrective commit reviewed through
the normal workflow. `git revert`, push, PR, merge, tag, branch deletion, force operation, and remote
ref change each retain their own owner gate. Do not assume an emergency removes those boundaries.

## 9. Recovery completion criteria

Close recovery only when:

- the exact affected surface is healthy from direct observation;
- `pnpm verify` passes for repository changes;
- affected browser routes and states pass QA;
- no unresolved Blocker/High review finding remains;
- secrets/private evidence were not copied into repository artifacts;
- Git, provider, CMS, and deployment states are recorded separately and accurately;
- the rollback target or corrective commit is known;
- `docs/PROGRESS.md` and `docs/PHASE_LOG.md` reflect current state/evidence;
- `CHANGELOG.md` records any notable public or operator change;
- one clear next task or owner gate is stated.

Record actual results. Never hardcode a test count, page count, commit SHA, or deployment ID as a
timeless expected value.
