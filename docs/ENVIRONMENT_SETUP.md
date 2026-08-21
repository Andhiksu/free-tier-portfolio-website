# Local Environment Setup

## Purpose

This guide prepares a fresh local checkout without relying on a specific machine, AI provider, or
hidden conversation. The checkout is an educational reference for a retired demonstration build;
it does not configure or deploy any active personal website.
Commands assume a POSIX-style terminal; equivalent Git/Node/pnpm commands work on Windows.

## Requirements

- Git
- Node.js version from `.node-version`
- pnpm version from the `packageManager` field in `package.json`

An AI assistant, editor plugin, Python environment, Homebrew, or Conda is optional and is not part of
the website runtime.

## 1. Verify tools

```bash
git --version
node --version
pnpm --version
```

At the archived baseline, Node is `24.18.0` and pnpm is `11.11.0`. Prefer a version manager or
Corepack rather than installing multiple global copies at random. For pnpm through Corepack:

```bash
corepack enable
corepack prepare pnpm@11.11.0 --activate
```

If Node is missing, install the version named in `.node-version` using your normal trusted Node
installer/version manager.

## 2. Clone safely

Choose a dedicated parent directory that is not already an unrelated Git repository:

```bash
git clone https://github.com/example-user/free-tier-portfolio-website.git
cd free-tier-portfolio-website
git status --short --branch
git remote -v
```

Do not run `git init`, delete files, or copy secrets into a directory whose contents you have not
inspected.

## 3. Install dependencies

```bash
pnpm install --frozen-lockfile
```

The frozen lockfile prevents an accidental dependency graph change. Do not use `sudo` for project
packages. A dependency or lifecycle-policy change requires its own review and, when applicable, an
owner gate.

## 4. Run the website

```bash
pnpm dev:web
```

Open the local URL Astro prints. Without Sanity configuration, the website intentionally renders its
reviewed static fallback.

To run Studio in a separate terminal:

```bash
pnpm dev:studio
```

## 5. Environment files

`.env.example` lists names only. For approved local CMS work, copy relevant names into ignored files:

- repository or web build values: an ignored root `.env`/`.env.local` as supported by the tool;
- Studio values: `apps/studio/.env.local`.

Never commit actual values. Never paste tokens or private evidence into chat, Git, screenshots,
issues, reports, or browser-delivered variables. Production web reads require no token.

The relevant names are:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- reserved server/build-only `SANITY_API_READ_TOKEN` (currently unused)

If CMS configuration is not part of the task, leave it absent.

## 6. Verify the checkout

Run the one canonical command:

```bash
pnpm verify
```

It checks whitespace, formatting, lint, types, tests, Studio schema, and production builds. When
Studio identifiers are absent, the command supplies harmless non-production placeholders for
schema/build checks only. It does not mutate Sanity or any provider.

## 7. Read repository context

Before editing, read:

1. `AGENTS.md`
2. `docs/GOVERNANCE.md`
3. `docs/PROJECT_GUIDE.md`
4. `docs/DECISIONS.md`
5. `docs/ROADMAP.md`
6. `docs/PROGRESS.md`
7. `docs/PHASE_LOG.md` only when historical evidence is relevant

This sequence works for a human or any capable AI assistant. Provider-specific files under
`.codex/` and `scripts/codex/` are optional conveniences and contain no unique authority.

## macOS notes

On Apple Silicon, Homebrew commonly installs tools under `/opt/homebrew`, but the repository does not
depend on that path. If another Node version wins on `PATH`, inspect before changing anything:

```bash
command -v node
node --version
command -v pnpm
pnpm --version
```

A visible Conda `(base)` prompt is not inherently a conflict. The website uses Node, not Python.

## Troubleshooting

### `pnpm install --frozen-lockfile` fails

Check Node/pnpm versions, network access, and whether `pnpm-lock.yaml` matches `package.json`. Do not
delete or regenerate the lockfile until the mismatch is understood.

### Studio reports missing configuration

This is expected unless Studio work is approved. If needed, verify the correct names exist in
`apps/studio/.env.local`; do not print their values.

### Web build uses fallback content

That is the safe intended behavior when CMS identifiers are missing, partial, invalid, or the fetch
fails. Do not add a browser token to avoid the fallback.

### Permission denied

Inspect the current directory and ownership before changing permissions:

```bash
pwd
ls -ld .
```

Avoid `sudo` and broad recursive permission changes.

### A command may delete or overwrite data

Stop and resolve the exact target with read-only checks. Destructive Git, branch cleanup, provider
mutation, secret handling, publication, and deployment require the owner gates in
`docs/GOVERNANCE.md`.
