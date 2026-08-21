# Hosting, domains, and optional upgrade paths

The baseline is deliberately simple: build a static Astro site and serve `apps/web/dist` from
Cloudflare Pages. You do not need a VPS for a personal portfolio, and Sanity remains optional.

Prices and quotas below were checked on **21 August 2026**. They change by region, currency,
promotion, tax, renewal term, and usage. Always open the linked official page before buying.

## Recommended baseline: Cloudflare Pages

Cloudflare Pages is available on all Cloudflare plans and supports Git integration or direct upload.
The official limits currently list 500 builds/month on Free, one concurrent build, up to 100 custom
domains per project, 20,000 files per site, and a 25 MiB maximum per asset.

- [Cloudflare Pages overview](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) — only
  relevant if you later add server logic; Workers Paid currently starts at USD 5/month.

## Custom domain

A `pages.dev` address is free. A custom domain is optional and normally paid annually to a
registrar. Hostinger is one example; Cloudflare Registrar or another accredited registrar can work
as well. Compare renewal price—not only the first-year promotion—plus privacy, transfer rules, tax,
and currency.

- [Hostinger domain search](https://www.hostinger.com/domains)
- [Hostinger pricing guidance](https://www.hostinger.com/support/1583426-how-much-does-it-cost-to-register-a-new-domain-at-hostinger/)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

You can buy a domain from one provider and still host on Cloudflare Pages. Do not buy web hosting
just to serve this static build unless you want its bundled support or other products.

## Optional runtime upgrades

Stay on Pages until you genuinely need request-time APIs, private databases, background jobs, or
special runtime control. A VPS adds patching, firewall, backups, monitoring, and incident response.

| Provider      | Starting signal checked 21 Aug 2026                                                                                                                                      | Practical note                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Cloud  | New accounts advertise USD 300 credit for 90 days; Free Tier lists one eligible `e2-micro` VM/month in selected US regions, 30 GB standard disk, and 1 GB outbound/month | Billing account, eligible region, and usage limits apply. See [Google Cloud Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features) and [Cloud Run](https://cloud.google.com/run). |
| DigitalOcean  | Basic Droplets start at USD 4/month for 512 MiB / 1 vCPU / 10 GiB SSD; USD 6/month for 1 GiB / 1 vCPU / 25 GiB SSD                                                       | Backups and excess transfer cost extra. See [official Droplet pricing](https://www.digitalocean.com/pricing/droplets).                                                                                |
| Tencent Cloud | Region- and configuration-dependent                                                                                                                                      | CPU/memory may exclude disk and bandwidth; renewal can differ. Use the [official CVM calculator](https://buy.tencentcloud.com/pricing/cvm?lang=en).                                                   |
| Hetzner Cloud | Region-dependent live pricing                                                                                                                                            | Verify location, tax, traffic, and support on the [official cloud page](https://www.hetzner.com/cloud/).                                                                                              |

## A practical decision rule

1. Start with Cloudflare Pages and static fallback: usually USD 0 hosting.
2. Add a paid domain only when you want a branded address.
3. Add optional Sanity when a content Studio is worth the extra account and model.
4. Add Workers or Cloud Run only for small server-side behavior.
5. Move to a VPS only when its control is worth becoming responsible for a server.

The one-run assistant must show the estimated recurring cost and ask before creating any paid
resource. It must never interpret a promotional price as a permanent cost.
