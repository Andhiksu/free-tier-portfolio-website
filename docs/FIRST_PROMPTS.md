# Recommended Prompts by Phase

> **Historical reference only.** These prompts document early planning and provider experiments.
> They contain completed phase assumptions, obsolete route/schema ideas, and actions (including CV,
> contact, content, and deployment work) that are not currently authorized. Do not execute them as
> active instructions. Start from `AGENTS.md`, `docs/GOVERNANCE.md`, and `docs/PROGRESS.md`; adapt any
> useful question by capability rather than provider name.

## ChatGPT Project — Chat 00: Context audit

> Baca seluruh file Project yang relevan, terutama `PROJECT_GUIDE.md`, `ROADMAP.md`, `PROGRESS.md`, `DECISIONS.md`, blueprint v2, CV, `CONTENT_INVENTORY.csv`, dan `MEDIA_REGISTER.csv`. Jangan menulis kode. Buat audit konteks dalam Bahasa Indonesia: tujuan, positioning, MVP, sitemap, stack, file tersedia, data yang masih kurang, risiko privasi, dan checklist Phase 0. Jangan mengarang informasi.

## ChatGPT Project — Chat 01: Content inventory

> Gunakan CV dan LinkedIn export sebagai sumber fakta. Bantu saya melengkapi `CONTENT_INVENTORY.csv`. Jangan mengarang data. Tandai field yang belum diketahui sebagai `needs-confirmation`. Prioritaskan tiga flagship project dan konten minimum untuk website launch.

## ChatGPT Project — Chat 02: English copy

> Berdasarkan data yang sudah terverifikasi, susun English website copy untuk Hero, About, impact metrics, tiga featured projects, career journey, capabilities, credentials preview, dan contact CTA. Gunakan tone profesional, evidence-based, tidak berlebihan, dan mudah dibaca recruiter. Pisahkan fakta, draft copy, dan pertanyaan yang masih perlu saya jawab.

## Codex — Task 01: Repository inspection

> Read `AGENTS.md`, `docs/PROJECT_GUIDE.md`, `docs/ENVIRONMENT_SETUP.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, and `docs/PROGRESS.md`. Inspect the repository without modifying files. Explain the state in Indonesian. Confirm the workspace root, installed tools, missing prerequisites, risks, and the smallest safe Phase 1 plan. Include expected files and verification commands. Do not implement.

## Codex — Task 02: Environment and repository foundation

> Implement only Phase 1 from `docs/ROADMAP.md`. Before editing, explain the plan in Indonesian and list expected files. Configure a beginner-friendly pnpm workspace, Astro TypeScript web app, reserved Sanity Studio app, shared root scripts, formatting, linting, type checking, `.gitignore`, `.env.example`, EN/ID route skeletons, theme infrastructure, and design tokens. Avoid unnecessary dependencies. Run all checks, update `docs/PROGRESS.md`, and create `CHANGELOG.md`.

## Codex — Task 03: Static homepage

> Implement only Phase 2. Build the light-first responsive homepage using reusable components and typed temporary data. Use selective semi-liquid-glass, generous whitespace, dark mode, subtle motion, and reduced-motion support. Include navigation, hero, metrics, featured projects, about preview, career journey, capabilities, credentials preview, contact CTA, and footer. Do not integrate Sanity yet. Run visual and build checks.

## Codex — Task 04: Core pages

> Implement Phase 3 only. Add About, Experience, Projects archive, dynamic project detail, Credentials, Contact, and 404 pages for EN and ID route structures. Use shared layouts, SEO helpers, reusable content components, and accessible navigation. Keep Indonesian content eligible for English fallback. Run all checks.

## Codex — Task 05: Sanity CMS

> Implement Phase 4 only. Configure Sanity Studio and core schemas for profile, experience, education, project, skill, certification, achievement, publication, evidence, and site settings. Support English and Indonesian fields, featured/order controls, relationships, draft/published status, privacy state, image alt text, captions, and external links. Connect the Astro frontend with safe loading, empty, and error states.

## ChatGPT Project — Chat 03: Content migration review

> Review the content prepared for Phase 5 against `CONTENT_INVENTORY.csv` and `MEDIA_REGISTER.csv`. Identify unsupported claims, missing sources, inconsistent dates, privacy risks, missing alt text, and weak project storytelling. Return a prioritized correction list; do not fabricate missing information.

## Codex — Task 06: Real content and launch preparation

> Migrate only verified launch content. Replace placeholders with approved content, add CV download, validate links and media, and implement privacy-safe fallbacks. Then run responsive, accessibility, SEO, type, lint, and build checks. Do not deploy or change DNS yet. Update progress and list every remaining manual launch action.

## Codex — Task 07: Deployment preparation

> Prepare Phase 6 deployment documentation and configuration for GitHub and Cloudflare Pages. Do not purchase services or change DNS. Explain every manual action in Indonesian with purpose, exact UI or command, expected result, verification, rollback, and common errors. Implement only safe repository changes.

## Codex — UI review prompt

> Inspect the current website without editing first. Report issues by severity for crowding, hierarchy, semi-liquid-glass usage, responsive behavior, keyboard navigation, contrast, dark mode, reduced motion, loading behavior, and performance. Then propose the smallest scoped patch plan.

## Codex — End-of-task requirement

> At the end, report: active phase, summary, changed files, commands and results, unresolved issues, manual actions, and exactly one recommended next task.
