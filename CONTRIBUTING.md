# Contributing

Thank you for helping improve this free-tier portfolio architecture reference.

## Before you start

1. Read [`AGENTS.md`](AGENTS.md), [`docs/GOVERNANCE.md`](docs/GOVERNANCE.md), and
   [`docs/PROJECT_GUIDE.md`](docs/PROJECT_GUIDE.md).
2. Open an issue for a substantial architecture, dependency, content-model, or deployment change.
3. Never commit credentials, private evidence, provider IDs, personal documents, or content you do
   not have permission to publish.

## Development workflow

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm verify
```

Create a focused branch, keep the diff bounded, and add or update tests when behavior changes. The
repository uses Conventional Commit-style subjects such as `docs:`, `fix:`, `feat:`, and `test:`.

## Pull-request checklist

- [ ] The change has one clear purpose.
- [ ] `pnpm verify` passes.
- [ ] English and Indonesian behavior remains aligned when routes or content change.
- [ ] Keyboard, reduced-motion, no-JavaScript, and responsive behavior were checked for UI changes.
- [ ] No secret, private source path, unsupported claim, or unapproved asset was added.
- [ ] Documentation reflects any changed setup, architecture, or operational contract.

This repository is an archived reference implementation. Contributions should improve its value as
an educational starter without implying that the retired Cloudflare or Sanity resources are live.
