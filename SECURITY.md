# Security Policy

## Supported version

This repository is an archived reference implementation, not a hosted service. Security fixes are
considered for the current `main` branch. Historical tags and deployments are not supported.

## Report a vulnerability

Please use GitHub's private vulnerability reporting feature when it is available for this
repository. If it is unavailable, contact the repository owner privately through the contact method
listed on their GitHub profile. Do not open a public issue containing an exploit, credential,
private record, or sensitive provider detail.

Include the affected file or dependency, impact, reproduction steps, and a suggested mitigation if
known. Do not test against infrastructure or accounts you do not own or have explicit permission to
assess.

## Security boundaries for adopters

- Treat all CMS records as potentially public; never store private review material in a public
  dataset.
- Keep Sanity tokens out of `PUBLIC_` variables and browser bundles.
- Use published-only, draft-excluding queries and validate CMS responses before rendering.
- Keep credentials in ignored local files or provider-managed secrets.
- Review dependency advisories and provider pricing/terms against your own deployment date.
- Replace every example identity, origin, account, dataset, asset, and publication decision before
  launching a fork.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and
[`docs/ADAPTATION_GUIDE.md`](docs/ADAPTATION_GUIDE.md) for the trust boundaries and launch checklist.
