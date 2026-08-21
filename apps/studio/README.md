# Free-Tier Portfolio Reference Studio

This standalone TypeScript Studio is the archived Phase 4 CMS authoring application. It connects only when
the owner-approved project and dataset values are present in the ignored
`apps/studio/.env.local` file.

The original demonstration deployment represented by this Studio has been retired. The Studio
remains in the repository solely as an educational component of a reusable free-tier portfolio
architecture; it is not connected to or descriptive of an active personal website.

From the repository root, start it with:

```bash
pnpm dev:studio
```

The Studio contains bounded `siteSettings`, `profile`, `experience`, `project`, and `credential`
schemas plus localized and publication/privacy-aware field objects. It intentionally has no generic
page builder, deploy script, API token, CORS change, Visual Editing, or real content migration.

The connected dataset is public. Treat every record, including drafts, as potentially publicly
queryable. Store only safe placeholders or content explicitly approved for public disclosure; never
store private evidence, credentials, sensitive source files, unpublished professional claims, or
real media pending review.

The safe temporary-content script is read-only by default:

```bash
pnpm --filter @portfolio-reference/studio exec sanity exec \
  scripts/syncSafeTemporaryContent.ts --with-user-token
```

It verifies the exact approved project, dataset, seven-record set, locale pairs, draft state, and
absence of attachments. An external write requires a separate exact owner gate and an explicit
apply flag; do not add that flag during routine checks.
