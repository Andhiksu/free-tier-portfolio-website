# Adaptation Guide

This guide turns the archived case study into your own portfolio without reconnecting or copying the
retired owner infrastructure.

## 1. Create your copy

Fork the repository or use GitHub's template feature if enabled, then clone your copy:

```bash
git clone https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
corepack enable
pnpm install --frozen-lockfile
pnpm verify
```

## 2. Replace identity before publishing

Search the repository for the original identity and provider names:

```bash
rg -n "Portfolio Owner|example-user|portfolio-owner|free-tier-portfolio-website|example0" . \
  -g '!pnpm-lock.yaml' -g '!docs/PHASE_LOG.md'
```

Replace public profile copy, contact links, metadata, canonical origin, manifest fields, fallback
content, and approved assets. Historical records may remain only if you intentionally retain them
as credited case-study material. Never reuse an account ID, dataset, token, domain, personal
document, or publication approval.

## 3. Choose a content mode

### Static-only

Use the reviewed fallback data and remove or leave unset all Sanity environment values. This is the
simplest, cheapest, and most portable mode.

### CMS-backed

Create your own Sanity project and dataset, configure only the names in [`.env.example`](../.env.example),
and keep the public build tokenless. Review and adapt the schemas before importing content. Do not
point a fork at the historical project or assume old records exist.

## 4. Configure localization

The example ships paired English and Indonesian routes. Keep both locales complete, or deliberately
simplify the route registry, locale switcher, metadata, sitemap, tests, and content contracts to one
language. Do not leave a half-removed locale.

## 5. Prepare public assets and claims

For every item, confirm ownership or permission, remove private metadata, provide meaningful alt
text, verify both locales, and document the publication decision. Avoid unsupported metrics and do
not publish private source evidence merely to prove a claim.

## 6. Pick a static host

The build contract is portable:

| Setting | Value                                             |
| ------- | ------------------------------------------------- |
| Install | `pnpm install --frozen-lockfile --ignore-scripts` |
| Build   | `pnpm build:web`                                  |
| Output  | `apps/web/dist`                                   |
| Node    | version in `.node-version`                        |
| pnpm    | version in `package.json`                         |

Cloudflare Pages was used historically, but another static host can serve the same directory. Check
current quotas, acceptable-use rules, domain costs, and build limits yourself; “free tier” is not a
permanent pricing guarantee.

## 7. Pre-launch checklist

- [ ] Original identity, contact paths, domains, provider IDs, and example content replaced.
- [ ] All assets are owned/licensed, privacy reviewed, optimized, and accessible.
- [ ] CMS mode selected; no token reaches browser code.
- [ ] Canonical URL, locale alternates, sitemap, robots, redirects, and headers verified.
- [ ] `pnpm verify` passes from a frozen install.
- [ ] Mobile/desktop, keyboard, reduced motion, dark/light theme, no-JavaScript, and 404 checked.
- [ ] Dependency advisories reviewed against the actual features and deployment model.
- [ ] Host deployment and rollback procedure documented and tested.

## 8. What not to copy blindly

- historical account, project, dataset, deployment, or domain values;
- personal content, credentials, claims, email addresses, or media;
- old provider pricing claims;
- publication batches as authorization for new content;
- historical phase logs as current operational instructions.

Use [`ARCHITECTURE.md`](ARCHITECTURE.md) for the system model and
[`ENVIRONMENT_SETUP.md`](ENVIRONMENT_SETUP.md) for detailed local setup.
