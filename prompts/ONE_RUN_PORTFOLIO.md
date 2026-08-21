# Canonical prompt: AI-assisted one-run portfolio setup

Use this prompt with a coding agent that can read and edit files, run terminal commands, and—when
authorized—operate a browser. It is provider-neutral.

> Build my portfolio from this repository and the material in `starter-input/`. Read `AGENTS.md`,
> `START_HERE_AI.md`, and the repository documentation before editing. Validate the input first.
> Replace all sample identity, content, metadata, links, and owned media with my reviewed material.
> Use `starter-input/ui-references/` and `starter-input/brand-references/` as visual direction, not
> as permission to copy third-party work. Preserve accessible semantic HTML, responsive behavior,
> reduced motion, bilingual parity when requested, static fallback content, and the Cloudflare Pages
> free-tier baseline. Keep Sanity optional unless `profile.json` requests it. Never read, print,
> commit, or request secrets in chat. Run `pnpm verify`, preview representative mobile and desktop
> pages, fix failures within scope, and document exact results. Prepare the Cloudflare Pages build
> contract (`pnpm build:web`, output `apps/web/dist`). Stop and ask me only before login, credential
> entry, purchasing a domain/service, changing DNS, publishing externally, or any destructive
> action. At completion, report changed files, tests, privacy checks, remaining owner actions, and
> the exact deployed URL if deployment was authorized and verified.

The agent may break the work into checkpoints, but it must keep this contract as the single source
of truth rather than silently changing the architecture or publication boundaries.
