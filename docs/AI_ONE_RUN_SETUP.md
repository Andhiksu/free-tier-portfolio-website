# AI-assisted one-run setup contract

## What the owner prepares

The owner supplies public identity/contact fields, approved biography and projects, owned images,
optional public-safe credentials, and optional UI/UX or brand references. Everything belongs under
`starter-input/`. Secrets and private evidence stay outside the repository.

## What the coding agent does

The agent validates the starter profile, inventories assets, replaces sample content and metadata,
adapts the visual system, preserves accessibility and privacy boundaries, runs the canonical gate,
previews representative pages, prepares Cloudflare Pages configuration, and records evidence.

## Mandatory human gates

An agent must pause before authentication, secret entry, domain or service purchase, DNS changes,
external publication, destructive changes, or any action with a material bill. These gates make
the workflow safe; they are not setup failures.

## Provider adapters

`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` all route assistants to
the same canonical prompt. Provider-specific files may explain how to start a session, but they must
not weaken privacy, verification, or owner gates.

## Definition of done

- No sample identity remains in rendered content or metadata.
- Every published asset is owned/approved and has useful alt text where appropriate.
- `pnpm verify` passes.
- Mobile and desktop previews have been reviewed.
- The static build contract is `pnpm build:web` → `apps/web/dist`.
- If deployment was authorized, the live URL, routes, headers, and rollback path are verified.
