# Public sanitization boundary

This repository is a reusable reference implementation. Its current public history starts from a sanitized baseline and intentionally excludes the original owner's biography, contact details, professional records, asset registers, CMS identifiers, provider project identifiers, and one-time migration evidence.

All visible identity and contact values are fictional placeholders, including `Portfolio Owner`, `hello@example.com`, `example-user`, `example-profile`, `example0`, and `portfolio.example.com`. They must be replaced before deployment.

The repository owner's GitHub account name remains visible as normal GitHub platform metadata. It is not embedded as portfolio content.

Before publishing a derived site:

1. replace every placeholder listed above;
2. keep source documents and private inventories outside Git;
3. run `pnpm verify`;
4. scan the complete repository for personal data and secrets;
5. inspect the generated site before deployment.
