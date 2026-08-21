# Phase Log

This log records concise historical phase and production-maintenance checkpoints. It does not
replace `docs/PROGRESS.md` or raw command output.

The legacy website documented by these checkpoints has been retired. Its former owner domain has
migrated to a new independent website that this repository does not control. Entries below remain historical
evidence for the educational/portfolio case study and must not be read as current deployment status.

## Phase 2: Static Visual MVP

### Infrastructure checkpoint: Multi-agent orchestration

**Status:** Completed locally

**Plan:**

- Limit local delegation to four concurrent agent threads and one child level.
- Keep the root task as the only writer and use specialist agents for read-only review.
- Add durable workflow guidance, specialist roles, a phase handoff log, and repository CI.
- Preserve the completed Slice 1 application and leave Slice 2 UI unimplemented.

**Files changed:**

- `.codex/config.toml`.
- `.codex/agents/*.toml`.
- `.github/workflows/ci.yml`.
- `AGENTS.md`.
- `docs/MULTI_AGENT_EXECUTION_PLAN.md`.
- `docs/PHASE_LOG.md`.
- `docs/DECISIONS.md`.
- `docs/PROGRESS.md`.
- `docs/PROJECT_GUIDE.md`.

**Completed locally:**

- Human-reviewed staging: completed.
- Local checkpoint commit: created.
- `pnpm format:check`: passed.
- `pnpm lint`: passed with zero warnings.
- `pnpm type-check`: passed with zero errors, warnings, or hints across 11 Astro files.
- `pnpm build`: passed; `/`, `/en/`, and `/id/` were generated.
- TOML parsing: passed.
- YAML parsing: passed.
- `git diff --check`: passed.
- Scope check: passed; no prohibited application, Studio, dependency, content, or asset file changed.

**Pending:**

- GitHub CI execution after a pull request exists.

**Automated tests:** N/A: no automated test suite configured.

**Reviewer findings:**

- Three read-only reviewers audited orchestration rules, CI/QA, and documentation.
- Accepted: the imported plan still allowed a writable implementation worker and needed to align
  with the stricter root-only writer rule.
- Accepted: push and pull-request creation needed an explicit owner-approval gate near every
  workflow instruction.
- Accepted: effective reviewer sandbox permissions need runtime verification because session
  overrides may be broader than custom-agent defaults.
- Accepted: the canonical repository path needed matching capitalization.
- Correction pass: the earlier wording treated checkpoint completion and one pull request per phase
  too broadly; both now remain part of an in-progress controlled Phase 2 pilot.
- No application regression or unresolved P0/P1 finding was reported by the earlier read-only
  review.

**Fixes:**

- Restricted all implementation to the root orchestrator and all subagents to read-only review.
- Added runtime sandbox and before/after Git-status safeguards for reviewer runs.
- Added explicit owner approval before push or pull-request creation throughout the durable plan.
- Added separate human gates for staging, checkpoint commits, merge, and branch cleanup.
- Reframed the Phase 2 branch and intended pull request as pilot choices to evaluate after Slice 2.
- Normalized the repository path and synchronized progress and phase-log status.

### Fresh custom-agent semantic smoke test

**Completed:**

- Three requested read-only review threads ran.
- Repository fingerprints before and after the test were identical.
- `git status` remained unchanged.
- No write succeeded, and no elevated permission was requested or succeeded.
- Static CI review found no P0/P1 issue.
- The current standalone `.codex/agents/*.toml` structure matches the official custom-agent
  documentation.

**Accepted corrections:**

- Use `gpt-5.6-terra` with high reasoning for the UI/accessibility, code-quality, and security
  reviewers because that model is available in the local catalog.
- Require explicit owner approval before requesting or enabling GitHub Codex review.
- Mark the original clean-main baseline as historical.

**Rejected findings:**

- No `[agents.<role>]` registry or `config_file` mapping is required.
- `name` and `description` remain required in every standalone custom-agent file.

**Pending:**

- GitHub CI execution after a pull request exists.

### Final custom-agent model-compatibility smoke test

**Result:** Passed

- Configured agent: `ui_a11y_reviewer`.
- Runtime role displayed: `ui_a11y_reviewer`.
- Configured model: `gpt-5.6-terra`.
- Configured reasoning: `high`.
- Runtime model metadata was not exposed.
- No model-unavailable or custom-agent configuration error occurred.
- The effective sandbox remained read-only.
- No permission request or successful write occurred.
- Repository fingerprints before and after the test were identical.
- `git status` and changed-file lists remained unchanged.
- `git diff --check` passed.

**Deferred:**

- Phase 2 Slice 2: navigation and theme shell.
- Automated tests: N/A: no automated test suite configured.

**Commit:** local checkpoint commit created

**Subject:** `chore: add phase 2 multi-agent orchestration infrastructure`

**GitHub CI:** pending until PR

The checkpoint has not been pushed, reviewed on GitHub, merged, or deployed.

### Slice 2: Navigation and Theme Shell

**Status:** Completed locally

**Plan:**

- Add one reusable static Astro header with Home-only primary navigation, language controls, theme
  control, and progressively enhanced mobile navigation.
- Extend the strict localized homepage data contract without adding future routes or unsupported
  portfolio content.
- Apply a light-first theme before first paint, persist validated preferences, and keep the shell
  accessible without a client framework.

**Files changed:**

- `apps/web/src/components/navigation/SiteHeader.astro` (created).
- `apps/web/src/layouts/BaseLayout.astro`.
- `apps/web/src/components/pages/HomePage.astro`.
- `apps/web/src/types/home.ts`.
- `apps/web/src/data/home/en.ts`.
- `apps/web/src/data/home/id.ts`.
- `apps/web/src/styles/global.css`.
- `docs/PHASE_LOG.md`.
- `docs/PROGRESS.md`.
- `CHANGELOG.md`.

**Verification:**

- Initial `pnpm format:check` identified formatting in the scoped stylesheet; a file-specific
  Prettier pass corrected it without running the repository-wide write script.
- Final `pnpm format:check`: passed.
- Final `pnpm lint`: passed with zero warnings.
- Final `pnpm type-check`: passed with zero errors, warnings, or hints across 12 Astro files.
- Final `pnpm build`: passed; `/`, `/en/`, and `/id/` were generated.
- Generated-output inspection: passed; the root redirect remains `/en/`, locale pages retain the
  correct `lang`, the inline theme bootstrap precedes body content, no client hydration directive
  exists, and navigation contains only available locale-home and skip-link targets.
- `git diff --check`: passed.
- Scope check: passed; no prohibited application, Studio, dependency, configuration, content, or
  asset file changed.

**Reviewer findings:**

- `ui_a11y_reviewer`: no P0/P1; one P2 found focus could remain in the navigation panel when a
  desktop-to-mobile resize hid that panel.
- `qa_reviewer`: no P0/P1; one P2 found a one-pixel mismatch between the CSS and JavaScript
  breakpoints; one P3 recorded the intentionally absent automated test suite.
- `code_quality_reviewer`: no P0/P1; confirmed the breakpoint P2 and found one P2 in storage-event
  handling for `localStorage.clear()` and storage-area filtering.
- Git status and changed-file lists were identical before and after the read-only reviewer group.

**Fixes:**

- Matched the JavaScript mobile media query exactly to the CSS breakpoint and reset the collapsed
  state on every breakpoint transition.
- Return focus to the menu trigger when entering mobile layout would otherwise hide the focused
  navigation control.
- Restricted synchronization to local storage, accepted key removal and clear events, validated
  synchronized values, and retained the light fallback for invalid values or errors.
- Reran targeted checks and the complete verification set after the fixes; all passed.

**Automated tests:** N/A: no automated test suite configured.

**Owner manual browser QA:** Completed with no failures in Google Chrome against the local Astro
development server.

- Routes passed: `/` returned HTTP 308 with `Location: /en/`; `/en/` and `/id/` returned HTTP 200
  with `html lang="en"` and `html lang="id"` respectively.
- Theme and storage checks passed for empty, saved dark, saved light, invalid, removed, and throwing
  storage states. The visible theme and `aria-pressed` remained synchronized, EN → ID → EN
  persistence passed, and the throwing-write simulation produced no uncaught browser error.
- Cross-tab dark, light, removed-value, invalid-value, and `localStorage.clear()` synchronization
  passed without reloading the receiving tab.
- Responsive and keyboard checks passed at 320, 375, and 768 CSS px and desktop, including no
  horizontal overflow at the emulated widths, an approximately 44 by 44 CSS px minimum menu
  trigger, Enter, Space, Escape with focus return, Tab and Shift+Tab, breakpoint reset, resize focus
  handoff, and JavaScript-disabled fail-open navigation on EN and ID. JavaScript was re-enabled
  afterward.
- Reduced motion, real browser zoom at 200%, keyboard and controls at 200%, overflow at 200%, light
  and dark readability, visible focus, no-backdrop-filter light/dark fallback, focus without blur,
  saved-dark hard refreshes on EN and ID without a visible light flash, and console checks passed.
- Chrome DevTools responsive emulation was used for 320, 375, and 768 CSS px; physical mobile and
  tablet devices were not tested. This was not cross-browser testing, and no automated browser tests
  were run.

Human-reviewed staging and the local checkpoint commit are complete.

**Commit:** local checkpoint commit created

**Subject:** `feat: add navigation and theme shell`

**GitHub CI:** pending until PR

The checkpoint has not been pushed, reviewed on GitHub, included in a pull request, merged, or
deployed.

### Slice 3: Hero and Impact Metrics

**Status:** Completed locally

**Plan:**

- Replace the temporary foundation panel with shared bilingual hero and impact sections.
- Enforce one CTA, four canonical target roles, and four non-claim impact placeholders through the
  localized typed data contract.
- Add one restrained CSS-only decorative visual while preserving the Slice 2 shell, locale routes,
  static rendering, and reduced-motion behavior.

**Files changed:**

- `apps/web/src/components/sections/HeroSection.astro` (created).
- `apps/web/src/components/sections/ImpactMetrics.astro` (created).
- `apps/web/src/components/pages/HomePage.astro`.
- `apps/web/src/types/home.ts`.
- `apps/web/src/data/home/en.ts`.
- `apps/web/src/data/home/id.ts`.
- `apps/web/src/styles/global.css`.
- `docs/PHASE_LOG.md`.
- `docs/PROGRESS.md`.
- `CHANGELOG.md`.

**Verification:**

- Initial `pnpm format:check` found formatting only in `apps/web/src/data/home/en.ts`; a scoped
  Prettier write corrected that file.
- Final `pnpm format:check`: passed.
- Final `pnpm lint`: passed with zero warnings.
- Final `pnpm type-check`: passed with zero errors, warnings, or hints across 14 Astro files.
- Final `pnpm build`: passed; `/`, `/en/`, and `/id/` were generated.
- Generated-output inspection: passed; the root redirect remains `/en/`, locale pages retain the
  correct `lang`, each locale has exactly one `h1`, one CTA linked to `#impact`, four target roles,
  four impact items, and one `section#impact`.
- Source inspection found no Slice 3 script, hydration directive, unavailable anchor, fake
  download, future route, numeric-looking impact result, or prohibited file change.
- `git diff --check`: passed.
- `git diff --cached --check`: passed; nothing is staged.

**Reviewer findings:**

- `ui_a11y_reviewer`: no P0, P1, P2, or P3 finding; browser-dependent accessibility and responsive
  behavior was subsequently covered by owner manual QA.
- `qa_reviewer`: no P0, P1, or P2 finding; one P3 recorded the intentionally absent automated test
  suite.
- `code_quality_reviewer`: no P0, P1, P2, or P3 finding.
- Repository status, tracked changed-file scope, untracked-file scope, and content fingerprints
  were identical before and after the three read-only reviews.

**Fixes:**

- Applied scoped formatting to the English locale data after the initial format check.
- No reviewer fix was required because no P0, P1, or acceptance-relevant P2 finding was reported.

**Automated tests:** N/A: no automated test suite configured.

**Owner manual browser QA:** Completed with no failures in Google Chrome against the local Astro
development server.

- EN and ID passed at 320, 375, and 768 CSS px and desktop using Chrome DevTools emulation; physical
  mobile and tablet devices were not tested. The longest target-role label remained readable, the
  Indonesian `h1` wrapped naturally, and real browser zoom at 200% passed without horizontal
  overflow.
- Tab and Shift+Tab traversal, CTA Enter activation, EN and ID skip links, visible unclipped CTA
  focus, mobile-menu Enter and Space, and Escape close with focus return passed.
- Reduced-motion emulation showed no continuous or live-data-style animation. JavaScript-disabled
  EN and ID retained the hero, roles, CTA, impact placeholders, navigation, and footer; the
  `#impact` CTA continued to work, and JavaScript was re-enabled afterward.
- No-backdrop-filter fallback passed in light and dark modes with visible focus and readable hero
  visual and header.
- macOS VoiceOver announced the target roles and impact placeholders as one list of four items
  each, omitted the decorative hero visual, and presented the CTA name, link role, and reading
  order correctly. The Indonesian locale passed the VoiceOver check.
- Slice 2 navigation, language controls, theme persistence, mobile-menu behavior, footer, and the
  browser console passed regression checks. The console remained free of errors.
- This was not physical-device, cross-browser, or automated browser testing.

**Completed locally:**

- Human-reviewed staging: completed.
- Local checkpoint commit: created.

**Commit:** local checkpoint commit created

**Subject:** `feat: add hero and impact metrics`

**GitHub CI:** pending until PR

The Slice 3 checkpoint has not been pushed, reviewed on GitHub, included in a pull request, merged,
or deployed.

### Slice 4: Projects, About, and Career Journey

**Status:** Completed locally

**Plan:**

- Add three static bilingual homepage sections below Impact Metrics.
- Present three noninteractive project directions with visible evidence-review status and no more
  than two optional focus tags.
- Present the approved Working Perspective and four-chapter Career Journey without unsupported
  professional claims, dates, links, or controls.
- Preserve the existing shell, routes, Hero `#impact` CTA, footer, theme behavior, and mobile
  navigation.

**Implementation files changed:**

- `apps/web/src/components/sections/FeaturedProjects.astro` (created).
- `apps/web/src/components/sections/AboutPreview.astro` (created).
- `apps/web/src/components/sections/CareerJourney.astro` (created).
- `apps/web/src/components/pages/HomePage.astro`.
- `apps/web/src/types/home.ts`.
- `apps/web/src/data/home/en.ts`.
- `apps/web/src/data/home/id.ts`.
- `apps/web/src/styles/global.css`.

**Documentation files changed:**

- `docs/PHASE_LOG.md`.
- `docs/PROGRESS.md`.
- `CHANGELOG.md`.

**Verification:**

- `pnpm format:check`: passed.
- `pnpm lint`: passed with zero warnings.
- `pnpm type-check`: passed with zero errors, warnings, or hints across 17 Astro files.
- `pnpm build`: passed; `/`, `/en/`, and `/id/` were generated.
- Static-output inspection: passed for the deterministic root redirect, locale `lang`, one `h1`
  per locale, unique section IDs, three project articles, four ordered journey items, valid
  `#impact` CTA and target, and absence of Slice 4 anchors, buttons, scripts, islands, unsupported
  claims, and empty tag wrappers.
- `git diff --check`: passed.
- `git diff --cached --check`: passed; nothing is staged.
- Scope inspection: passed; no dependency, route, Studio, configuration, content-source, asset, or
  prohibited file was changed.

**Reviewer findings:**

- `ui_a11y_reviewer`: no P0/P1/P3; one acceptance-relevant P2 found that project and tag lists with
  hidden visual markers needed explicit list semantics for reliable Safari/VoiceOver
  announcements.
- `qa_reviewer`: no P0, P1, P2, or P3 finding.
- `code_quality_reviewer`: no P0, P1, P2, or P3 finding.
- Repository status, tracked and untracked changed-file lists, and stable file fingerprints were
  identical before and after every read-only review.

**Fixes:**

- Added `role="list"` to the project and tag lists while preserving native `ul`/`li` structure and
  noninteractive behavior.
- Reran the complete check set successfully.
- The same UI/accessibility reviewer confirmed the P2 resolved with no remaining P0 to P3 finding.

**Initial browser QA finding and fix:**

- Initial browser QA found one acceptance failure: Career Journey retained a semantic ordered list,
  but the shared CSS list reset suppressed its visible sequence markers.
- Inspection confirmed that the computed `list-style-type` was `none`.
- Restored native decimal list markers with one scoped CSS declaration in the Career Journey
  styles.
- `ui_a11y_reviewer` reviewed the fix read-only and reported no P0, P1, P2, or P3 finding.
- The complete repository check set passed after the fix.

**Focused browser re-QA:** Completed with no failures.

- One semantic ordered list with exactly four direct list items remained.
- Native markers 1, 2, 3, and 4 were visible, used computed `list-style-type: decimal`, and matched
  the chapter order without pseudo-content or duplicate numbering.
- Each chapter retained `display: list-item`; project and tag lists remained unnumbered.
- EN and ID, light and dark themes, and 320, 375, 768, and 1280 CSS px passed without horizontal
  overflow.
- No interactive or focusable Slice 4 content was introduced, and the console remained free of
  Slice 4 errors and warnings.

**Automated tests:** N/A: no automated test suite configured.

**Owner manual browser QA:** Completed with no failures in Google Chrome on macOS.

- Real pointer hover passed on every project card in EN and ID. Cards remained noninteractive,
  with no pointer cursor, hover movement, hover elevation, or hover-only content.
- Tab and Shift+Tab, EN and ID skip links, mobile-menu Enter and Space activation, Escape close with
  focus return, and EN and ID Hero CTA activation with Enter passed.
- Real browser zoom at 200% passed in EN and ID without horizontal overflow; Career Journey markers
  remained visible.
- Reduced-motion emulation, JavaScript-disabled rendering in EN and ID, the JavaScript-disabled
  Hero `#impact` CTA, light and dark no-backdrop-filter fallbacks, and focus visibility during the
  fallback passed.
- macOS VoiceOver announced Project Directions as a three-item list without treating project cards
  as links or controls. Status and tag reading order was logical, Working Perspective was announced
  normally, and Career Journey was announced as an ordered list with four items.
- EN and ID document-language behavior passed. The browser console contained no uncaught errors,
  Slice 4 warnings, or missing Slice 4 resources.

**Manual QA environment and limitations:**

- Browser: Google Chrome on macOS.
- Responsive checks used Chrome DevTools emulation at 320, 375, and 768 CSS px plus desktop.
- Real browser zoom at 200% and macOS VoiceOver were exercised.
- JavaScript-disabled rendering, reduced motion, and backdrop-filter fallback were exercised through
  Chrome DevTools.
- Physical phones and tablets were not tested.
- This was not cross-browser or automated browser testing; Safari, Firefox, Edge, physical-device,
  and automated-browser coverage are not claimed.

**Human-reviewed staging:** completed

**Commit:** local checkpoint commit created

**Subject:** `feat: add projects about and career journey`

**GitHub CI:** pending until PR

Staging completed through owner review, and the local checkpoint commit was created. Nothing is
currently staged. The checkpoint has not been pushed, reviewed on GitHub, included in a pull
request, merged, or deployed. Slice 5 has not started.

### Slice 5: Capabilities, Credentials, Contact, Footer

**Status:** Completed and committed locally; awaiting Phase 2 Slice 6 work and later branch-level
review

**Plan:**

- Add four static bilingual Capability Areas and two privacy-preserving generic Learning
  Foundations categories below Career Journey.
- Add a bilingual Contact section using only the approved LinkedIn and GitHub URLs, same-tab native
  anchors, visible external-site disclosures, and clear primary/secondary emphasis.
- Add one localized `#contact` header anchor through the existing navigation and mobile-menu close
  flow.
- Extract the existing inline footer into one static `SiteFooter` without year, navigation, or
  profile links.
- Preserve strict typed data, all Slice 2 to 4 behavior, the Hero `#impact` CTA, locale routes, static
  rendering, privacy boundaries, and dependency scope.

**Implementation files changed:**

- `apps/web/src/components/layout/SiteFooter.astro` (created).
- `apps/web/src/components/sections/CapabilitiesSection.astro` (created).
- `apps/web/src/components/sections/ContactSection.astro` (created).
- `apps/web/src/components/sections/CredentialsPreview.astro` (created).
- `apps/web/src/components/navigation/SiteHeader.astro`.
- `apps/web/src/components/pages/HomePage.astro`.
- `apps/web/src/data/home/en.ts`.
- `apps/web/src/data/home/id.ts`.
- `apps/web/src/styles/global.css`.
- `apps/web/src/types/home.ts`.

**Documentation files changed:**

- `CHANGELOG.md`.
- `docs/PHASE_LOG.md`.
- `docs/PROGRESS.md`.

**Verification:**

- Initial `pnpm format:check` found formatting only in `apps/web/src/types/home.ts`; a scoped
  Prettier write corrected that file.
- Final `pnpm format:check`: passed.
- Final `pnpm lint`: passed with zero warnings.
- Final `pnpm type-check`: passed with zero errors, warnings, or hints across 21 Astro files.
- Final `pnpm build`: passed; `/`, `/en/`, and `/id/` were generated.
- Static-output inspection: passed for deterministic `/en/` root redirect, locale `lang`, one
  `h1`, one `main`, one footer, unique Slice 5 sections, exact 4/2/2 item counts, LinkedIn-first
  primary and GitHub-second secondary order, exact EN/ID URL parity, same-tab behavior, visible
  disclosures, one header `#contact` link and target, and preserved Hero `#impact` CTA and target.
- Prohibited-content inspection: passed for new-tab attributes, `/contact`, empty/hash anchors,
  unsafe schemes, raw visible URLs, raw HTML, hydration directives, new Slice 5 scripts,
  unsupported deferred content, unsupported credential records, forms, backend behavior, and
  additional contact values.
- `git diff --check`: passed.
- `git diff --cached --check`: passed; nothing is staged.
- Scope inspection: passed; exactly the expected 13 final files changed and no prohibited file
  changed.

**Reviewer findings:**

- `ui_a11y_reviewer`: P0: 0, P1: 0, P2: 0, P3: 0; no actionable finding. The owner subsequently
  completed and passed the recorded manual browser QA checklist.
- `code_quality_reviewer`: P0: 0, P1: 0, P2: 0, P3: 0; no actionable finding.
- `security_privacy_reviewer`: P0: 0, P1: 0, P2: 0, P3: 0; no actionable finding.
- Repository status, tracked and untracked changed-file lists, and stable fingerprints for all ten
  implementation files were identical before and after the three read-only reviews.

**Accepted fixes:**

- Applied scoped Prettier formatting to the typed homepage data contract after the initial format
  check.
- No reviewer fix was required because no P0, P1, P2, or P3 finding was reported.

**Automated tests:** N/A: no automated test suite configured.

**Owner manual browser QA:** Completed and passed

The owner explicitly confirmed that the complete recorded Slice 5 manual browser QA checklist
passed. No browser issue was reported, and no implementation change was required after manual QA.

- EN and ID passed at 320, 375, and 768 CSS px and desktop in light and dark modes. Real browser
  zoom at 200%, horizontal overflow, long-copy wrapping, Contact-link wrapping, footer rendering,
  pointer hover, and minimum 44 CSS px targets passed.
- Tab and Shift+Tab, skip link, Hero `#impact` navigation, header `#contact` navigation,
  mobile-menu Enter and Space activation, Escape, focus return, and Contact-link close behavior
  passed.
- LinkedIn and GitHub keyboard activation, same-tab behavior, exact approved destinations, and
  visible external-site disclosures passed.
- Theme persistence, reduced motion, JavaScript-disabled rendering, and no-backdrop-filter fallback
  passed.
- VoiceOver capability-list behavior, credential-list and status relationships, Contact link names
  and disclosures, and a single footer announcement passed.
- EN and ID document language and browser console checks passed.

**Manual QA limitations:**

- Exact browser and operating-system versions were not supplied.
- Physical-device coverage was not recorded.
- Cross-browser coverage was not recorded.
- Automated browser testing was not configured.

These limitations are coverage boundaries, not reported failures.

**Human-reviewed staging:** completed

**Commit:** local checkpoint commit created

**Subject:** `feat: add capabilities credentials contact and footer`

**GitHub CI:** pending until PR

Slice 5 implementation, specialist review, owner manual browser QA, human-reviewed staging, and
the local checkpoint commit are complete. The checkpoint left the working tree clean with nothing
staged; at that historical Slice 5 closeout, only `docs/PHASE_LOG.md` and `docs/PROGRESS.md` were
modified and unstaged. The branch had not been pushed, and no Phase 2 pull request existed. Slice 5
had not been reviewed on GitHub, merged, or deployed. Slice 6 had not started.

### Slice 6: Responsive and Accessibility Hardening

**Status:** Implementation, verification, final specialist review, owner manual browser QA,
human-reviewed staging, and the local checkpoint commit completed locally

**Canonical scope:**

- Key breakpoints, theme parity, keyboard navigation, reduced motion, semantic structure,
  loading/failure states, performance cleanup, and dead-style cleanup.
- Acceptance required no unresolved P0/P1 finding, no overflow, no inaccessible control, no
  obvious console error, successful route builds, and passing full repository verification.

**Read-only assessment:**

- Outcome: P0: 0, P1: 0, P2: 0, and P3: 2.
- Accepted code finding: one minimal dead-style cleanup in
  `apps/web/src/styles/global.css`.
- Rejected/non-implemented finding: the remaining P3 assessment item was not accepted for
  implementation; no scope expansion followed.

**Implementation file changed:**

- `apps/web/src/styles/global.css`.

**Exact implementation:**

- Removed the unused `--motion-standard` declaration.
- Removed `.about-section` from one `padding-block-start` selector group.
- Removed `.contact-section` from one `padding-block-start` selector group.
- No visual value was intentionally changed.
- No component, route, type, locale data, JavaScript, dependency, configuration, asset, or
  generated file was intentionally changed.

**Verification:**

- `pnpm format:check`: passed.
- `pnpm lint`: passed.
- `pnpm type-check`: passed with zero errors, warnings, or hints across 21 Astro files.
- `pnpm build`: passed.
- `git diff --check`: passed.
- `git diff --cached --check`: passed; nothing was staged.

**Static-output inspection:** Passed

- The build produced `/`, `/en/`, and `/id/`.
- Static-output inspection found no acceptance failure.

**Final specialist reviews:**

- `ui_a11y_reviewer`.
- `qa_reviewer`.
- `code_quality_reviewer`.
- `security_privacy_reviewer`.
- `documentation_reviewer`.
- Final findings: P0: 0, P1: 0, P2: 0, and P3: 0.
- Security and privacy review found no actionable issue or scope expansion.
- Documentation review found no actionable documentation issue in the completed Slice 6 evidence.

**Automated tests:** N/A: no automated test suite configured.

**Loading and failure states:** N/A for the current fully static implementation.

**Owner manual browser QA:** Completed and passed

The owner explicitly confirmed that every requested Slice 6 manual browser QA item passed. The
confirmed checklist covered EN and ID at 320 and 375 CSS px; the 479/480/481, 767/768/769, and
959/960/961 CSS px boundaries; desktop at 1280 CSS px; real browser zoom at 200%; horizontal
overflow; long EN/ID wrapping; About and Contact spacing; light, dark, first-visit, stored,
invalid, removed, hard-refresh, cross-tab, and storage-failure theme behavior; no-backdrop-filter
fallback; Tab and Shift+Tab order; skip link; mobile-menu Enter, Space, Escape, focus return,
link-close, and resize focus handoff; Hero `#impact`; header `#contact`; LinkedIn and GitHub
keyboard activation, exact destinations, same-tab behavior, and external-link disclosure; reduced
motion; JavaScript-disabled rendering; VoiceOver semantics for EN and ID; browser console; and
missing-resource inspection.

**Coverage limitations:**

- Exact browser and macOS versions were not supplied.
- No physical-device coverage is claimed.
- No cross-browser coverage is claimed.
- No automated-browser coverage is claimed.
- No screenshots, measured WCAG conformance, or measured performance scores are claimed.

**Checkpoint publication state (historical):**

- Human-reviewed staging is completed.
- The local checkpoint commit was created with subject
  `chore: complete responsive and accessibility hardening`.
- The checkpoint contains exactly:
  - `apps/web/src/styles/global.css`;
  - `docs/PROGRESS.md`;
  - `docs/PHASE_LOG.md`.
- All three files in the checkpoint are modified files.
- The committed CSS diff matches the approved scope: removal of `--motion-standard`, removal of
  `.about-section` from one selector group, and removal of `.contact-section` from one selector
  group.
- Checkpoint verification passed:
  - the exact subject was confirmed;
  - exactly three files were confirmed in the commit, all modified;
  - `pnpm format:check` passed;
  - `pnpm lint` passed;
  - `pnpm type-check` passed with 21 files and zero errors, warnings, or hints;
  - `pnpm build` passed and produced `/`, `/en/`, and `/id/`;
  - the commit diff check passed;
  - the final worktree diff and staging checks passed.
- Immediately after checkpoint verification, the working tree was clean with nothing staged, no
  unstaged files, and no untracked files.
- That clean state is the historical baseline before the fresh branch-level review and current
  remediation.
- At that checkpoint, the branch had not been pushed.
- No Phase 2 pull request existed at that checkpoint.
- GitHub CI remained pending until a pull request existed.
- Slice 6 had not been reviewed on GitHub, merged, or deployed.
- Phase 2 remained active, and Phase 3 had not started.

### Branch-level final review and controlled remediation

**Status:** Remediation implementation, verification, focused review, owner browser re-QA,
human-reviewed staging, and the local remediation checkpoint commit completed locally

**Baseline evidence:**

- Baseline branch: `phase/2-static-visual-mvp-completion` at the clean local checkpoint whose
  subject is `chore: complete responsive and accessibility hardening`.
- The branch diff against local `main` contains 31 files and six linear Phase 2 commits.
- The baseline working tree and staging area were clean, with no untracked files.
- Remote freshness was not checked.

**Fresh branch-level review:**

- Five native configured read-only reviewers ran: `ui_a11y_reviewer`, `qa_reviewer`,
  `code_quality_reviewer`, `security_privacy_reviewer`, and `documentation_reviewer`.
- Reviewer-wave repository fingerprints were identical.
- Initial consolidated findings: P0: 0, P1: 0, P2: 4, and P3: 1.
- Accepted P2 findings:
  - the theme toggle remained visible and keyboard-focusable but inert without JavaScript;
  - live Git-status wording in `docs/PROGRESS.md` and `docs/PHASE_LOG.md` was stale;
  - `README.md` described only the Phase 1 foundation screens;
  - ADR-008 did not record the factual pilot continuation after Slice 2.
- The P3 improvement to pin GitHub Actions to immutable revisions is deferred and non-blocking.
  `.github/workflows/ci.yml` is intentionally unchanged.

**Exact remediation scope:**

- `apps/web/src/styles/global.css`.
- `README.md`.
- `docs/DECISIONS.md`.
- `docs/PROGRESS.md`.
- `docs/PHASE_LOG.md`.

**Implemented remediation:**

- `.theme-toggle` is hidden in the default CSS source state and restored to its existing
  `inline-flex` layout only under `.site-header[data-navigation-ready]`.
- `SiteHeader.astro` is unchanged; its existing initialization contract remains responsible for
  setting `data-navigation-ready` only after the navigation and theme controls initialize.
- The language switcher and mobile-menu behavior are unchanged.
- `README.md` now describes the bilingual Phase 2 Static Visual MVP, current routes, temporary or
  unverified content boundaries, and work not started in later phases.
- ADR-009 records that the controlled pilot continued after Slice 2 through the remaining Phase 2
  slices and branch-level review without adopting the workflow for later phases.
- Live status wording now distinguishes the clean historical checkpoint baseline from the current
  five-file remediation.

**Verification and review status:**

- `pnpm format:check`: passed.
- `pnpm lint`: passed.
- `pnpm type-check`: passed with 21 files and zero errors, warnings, or hints.
- `pnpm build`: passed without warnings and generated `/`, `/en/`, and `/id/`.
- `git diff --check`: passed.
- `git diff --cached --check`: passed before remediation staging, when nothing was staged.
- Focused static/source verification: passed. Static header markup contains no
  `data-navigation-ready` attribute; default CSS hides `.theme-toggle`; the ready-state selector
  restores `inline-flex`; language and mobile-menu controls remain available; no JavaScript,
  inline script, hydration directive, dependency, external request, or unsafe URL was added.
- Focused reviews completed using exactly `ui_a11y_reviewer`, `qa_reviewer`, and
  `documentation_reviewer`. Each reported P0: 0, P1: 0, P2: 0, and P3: 0.
- `ui_a11y_reviewer` and `qa_reviewer` confirmed the original theme-toggle P2 resolved by
  source/static evidence, with no acceptance-relevant regression.
- `documentation_reviewer` confirmed live and historical wording, README Phase 2 scope, ADR-009,
  review evidence, pending owner QA, and publication/phase truth. It also confirmed that
  `CHANGELOG.md` and `.github/workflows/ci.yml` need no change in this task.
- Reviewer-wave Git status, tracked and staged changed-file lists, untracked-file list, and HEAD
  were identical before and after review.

**Owner focused browser re-QA:** Completed and passed

- JavaScript disabled:
  - EN passed at 375 and 1280 CSS px;
  - ID passed at 375 and 1280 CSS px;
  - the theme toggle was hidden visually and absent from the keyboard Tab order;
  - the language switcher remained available and functional;
  - mobile navigation remained fail-open and usable;
  - no header overflow was observed.
- JavaScript enabled:
  - the theme toggle appeared after initialization;
  - pointer, Enter, and Space activation passed;
  - `aria-pressed`, light and dark rendering, persistence after refresh, and cross-tab
    synchronization passed;
  - mobile-menu regression checks passed.
- Initialization-failure simulation:
  - removing `data-navigation-ready` hid the theme toggle and removed it from the Tab order;
  - the language switcher remained available, and the header layout remained intact;
  - restoring the attribute restored the theme toggle.
- Final browser checks reported no console, missing-resource, horizontal-overflow, or other issue.
- No implementation change was required after owner QA.

**Coverage limitations:**

- Exact browser and operating-system versions were not supplied.
- No physical-device coverage is claimed.
- No cross-browser coverage is claimed.
- No automated-browser coverage is claimed.
- No screenshot, measured WCAG conformance, or measured performance score is claimed.

**Resolution:**

- All four accepted branch-level P2 findings are resolved through implementation, automated
  verification, focused source/static verification, focused reviewer results, and owner browser
  re-QA.
- The GitHub Actions pinning P3 remains deferred and non-blocking.
- Automated tests: N/A: no automated test suite configured.
- Loading and failure states: N/A for the current fully static implementation.
- Human-reviewed remediation staging: completed.
- The reviewed staged scope contains exactly five modified files:
  - `apps/web/src/styles/global.css`;
  - `README.md`;
  - `docs/DECISIONS.md`;
  - `docs/PROGRESS.md`;
  - `docs/PHASE_LOG.md`.
- `git diff --cached --check`: passed.
- The staged CSS diff matches the approved progressive-enhancement guard: `.theme-toggle` is
  hidden by default and restored to `inline-flex` only under
  `.site-header[data-navigation-ready]`.
- No Astro, TypeScript, JavaScript, or other prohibited file is staged.
- At staging completion, no unstaged or untracked files remained, and HEAD remained unchanged at
  the Slice 6 checkpoint.
- Local remediation checkpoint commit: created.
- Commit subject: `fix: resolve phase 2 branch review findings`.
- The checkpoint contains exactly five modified files:
  - `apps/web/src/styles/global.css`;
  - `README.md`;
  - `docs/DECISIONS.md`;
  - `docs/PROGRESS.md`;
  - `docs/PHASE_LOG.md`.
- Post-commit verification passed:
  - exactly five modified files were confirmed;
  - `pnpm format:check` passed;
  - `pnpm lint` passed;
  - `pnpm type-check` passed with 21 files and zero errors, warnings, or hints;
  - `pnpm build` passed and generated `/`, `/en/`, and `/id/`;
  - the commit diff check passed;
  - the worktree and staging checks passed.
- Immediately after post-commit verification, the working tree was clean, nothing was staged, and
  no unstaged or untracked files existed.

**Publication state at remediation checkpoint (historical):**

- The branch had not been pushed.
- Remote freshness had not been checked.
- No Phase 2 pull request existed.
- GitHub CI had not run.
- The branch had not been reviewed on GitHub.
- The branch had not been merged.
- Nothing had been deployed.
- Phase 2 remained active, and Phase 3 had not started.

### Pre-documentation pull request and CI verification

**Status:** Baseline verified; final post-documentation CI and merge pending

**Remote and pull-request verification:**

- Branch `phase/2-static-visual-mvp-completion` had been pushed to `origin`.
- At pre-documentation verification, local and remote branch heads matched at
  `200ff131462b193c0954f206cc490c136f80ad19`.
- PR #4 had been opened from the Phase 2 branch into `main`.
- At that baseline, PR #4 was open, was not a draft, and was mergeable.
- At that baseline, the pull request contained eight commits and 33 changed
  files.
- These values record the state before the documentation checkpoint and are not
  the final post-checkpoint PR head or check state.
- No merge or deployment had occurred.

**CI incident and resolution:**

- Initial GitHub CI run #1 failed during `Install dependencies`.
- The exact blocker was pnpm 11 rejecting the unapproved build script for
  `esbuild@0.28.1`.
- Commit `200ff13` has subject `ci: allow esbuild install script`.
- The commit changes only `pnpm-workspace.yaml`.
- The exact configuration added is `allowBuilds.esbuild: true`.
- `pnpm-lock.yaml` was unchanged.
- Local dependency installation completed with the `esbuild` postinstall
  script successfully executed.
- Local formatting, linting, type-checking, build, and diff checks passed.
- GitHub CI run #2 passed dependency installation, whitespace checking,
  formatting, linting, type-checking, and the production build.

**Required before merge:**

- Include this documentation checkpoint in PR #4.
- Verify the final PR head, CI checks, review submissions, review threads,
  comments, and mergeability after the documentation checkpoint reaches the
  pull request.
- Obtain separate explicit owner approval for the merge.
- Phase 2 remains active, and Phase 3 has not started.

### Phase 2 final merge and main synchronization

**Status:** Phase 2 product scope completed and merged; Phase 3 not started

**Final pull-request and pre-merge CI state:**

- The final PR #4 head was
  `d09bc63fbe68e65130904269991547ed2be14119`.
- PR #4 was open, not a draft, and mergeable before the approved merge.
- The pull request contained nine commits and 33 changed files at final review.
- Final review-state inspection found no review submissions, review threads, or
  pull-request comments requiring resolution.
- GitHub CI run #3, run ID `29219670336`, completed successfully.
- The `Quality checks` job, job ID `86722188550`, passed repository checkout,
  pnpm installation, Node.js setup, dependency installation, whitespace
  checking, formatting, linting, type-checking, and the production build.

**Merge:**

- The owner explicitly approved a squash merge with expected head SHA
  `d09bc63fbe68e65130904269991547ed2be14119`.
- PR #4 was squash-merged into `main`.
- The resulting squash commit is
  `924ecc90e15801f6fb5d34a4b33d1c4967f40ad1`.
- The squash commit subject is
  `feat: complete Phase 2 static visual MVP (#4)`.
- PR #4 is closed and recorded as merged.

**Post-merge main CI:**

- GitHub CI run #4, run ID `29219844355`, was triggered by the `push`
  event on `main`.
- The run used head SHA
  `924ecc90e15801f6fb5d34a4b33d1c4967f40ad1`.
- Run attempt 1 completed with conclusion `success`.
- The `Quality checks` job, job ID `86722638718`, completed with
  conclusion `success`.
- Repository checkout, pnpm installation, Node.js setup, dependency
  installation, whitespace checking, formatting, linting, type-checking, the
  production build, and all cleanup steps completed successfully.

**Local main synchronization:**

- `origin/main` advanced from `cfa8af2` to `924ecc9`.
- Local `main` was updated using a fast-forward-only pull.
- Local `main` and `origin/main` were verified identical at
  `924ecc90e15801f6fb5d34a4b33d1c4967f40ad1`.
- Local-versus-remote divergence was `0 0`.
- The squash commit was verified present on both local and remote `main`.
- The squash commit subject matched the approved title.
- The final working tree was clean with no staged, unstaged, or untracked files.

**Handoff:**

- Phase 2 implementation, verification, review, pull-request CI, squash
  merge, post-merge `main` CI, and main synchronization are complete.
- No deployment occurred as part of Phase 2.
- Phase 3 has not started.
- Branch cleanup remains separately owner-gated and is not authorized by this
  documentation entry.
- The next task is to review owner-provided Phase 3 strategy points and record
  an approved workflow decision before implementation begins.

## Phase 3: Core Pages and Project Case Studies

### Milestone 0: Preflight and durable context

**Status:** Completed locally; awaiting explicit owner approval before push

**Baseline:**

- Starting branch: `main`.
- Approved baseline: `4b85647374f5cb5c47c711a1465bc4469d3042cf`.
- `HEAD`, local `main`, and `origin/main` matched the approved baseline.
- Local-versus-remote divergence was `0 0`.
- Worktree, staging area, and untracked-file set were clean.
- Local branch `phase/3-core-pages-and-case-studies` was created from the exact baseline.

**Strategy checkpoint:**

- Replaced the historical Phase 2 pilot rules in active guidance with the Phase 3 hybrid
  single-writer and risk-based workflow.
- Added Level A, B, and C verification and coherent milestone batching.
- Recorded ADR-010 for Phase 3 governance and ADR-011 for expressive Liquid Glass with progressive
  enhancement.
- Added the Phase 3 design direction derived as original principles from the six owner-supplied
  references, with explicit non-copying boundaries.
- Expanded Phase 3 into Milestones 0 to 6 and recorded their scopes, risk levels, and exit criteria.
- Aligned source precedence, the prefixed locale route convention, the deterministic `/` to `/en/`
  308 redirect, live progress, and uploaded-snapshot refresh guidance.
- Marked the multi-agent execution plan as historical Phase 2 evidence that cannot override active
  Phase 3 guidance.
- Kept this strategy checkpoint self-contained so no documentation-only closeout loop is required
  before Milestone 1.

**Files changed:**

- `AGENTS.md`.
- `docs/PROJECT_GUIDE.md`.
- `docs/ROADMAP.md`.
- `docs/PROGRESS.md`.
- `docs/DECISIONS.md`.
- `docs/DESIGN_DIRECTION.md` (created).
- `docs/MULTI_AGENT_EXECUTION_PLAN.md`.
- `docs/PHASE_LOG.md`.

**Verification:**

- Existing repository formatter for the approved documentation files: passed.
- Repository format check: passed.
- `git diff --check`: passed.
- Changed-file scope assertion: passed; exactly the eight approved documentation and guidance files
  changed.
- Prohibited-scope assertions: passed; no application, route, dependency, manifest, lockfile, CI,
  asset, content-source, environment, deployment, DNS, production, secret, or credential file
  changed.
- Broader lint, type-check, automated tests, and production build: not run because this was a Level
  A documentation-only checkpoint and the repository formatter did not require them.

**Commit:** local checkpoint created with subject
`docs: align Phase 3 preflight and design direction`

**Publication state before read-only review:**

- Nothing was pushed.
- No pull request was opened or updated.
- Nothing was merged or deployed.
- At that initial checkpoint, the planned next gate was explicit owner approval before push.

### Milestone 0: Read-only review and documentation remediation

**Status:** Remediation completed locally; read-only re-review pending

**Initial read-only review:**

- P0: 0.
- P1: 2.
- P2: 1.
- P3: 0.

**Accepted findings:**

- P1: active guidance did not explicitly record the four-party operating model: ChatGPT Project as
  context hub and product-direction owner, Codex as sole implementation writer and release owner,
  Gemini or Google Antigravity as independent read-only reviewer, and the human owner as product and
  risk authority.
- P1: active guidance did not establish one long-lived Phase 3 branch, coherent local milestone
  commits, and one final Phase 3 pull request by default, with split pull requests limited to an
  owner-approved risk-based exception.
- P2: `docs/PROGRESS.md` still described the local Milestone 0 checkpoint as being completed after
  the checkpoint and review had finished.

**Remediation:**

- Added the explicit four-party role split, Codex-only repository write boundary, read-only
  independent-review boundary, and human product and risk authority.
- Established `phase/3-core-pages-and-case-studies` as the one long-lived Phase 3 branch, coherent
  local checkpoint commits per milestone, and one final Phase 3 pull request by default.
- Limited split pull requests to an explicit owner-approved risk-based exception.
- Clarified that an approved milestone scope authorizes Codex to edit, stage, and create local
  checkpoint commits within that scope without approval per file or per commit.
- Preserved explicit owner gates before push, pull-request creation or update, merge, branch
  cleanup, deployment, DNS or production-resource changes, secrets or credentials, paid services,
  force operations, and destructive Git actions.
- Corrected the live Milestone 0 status and set read-only re-review as the next task.

**Exact remediation files changed:**

- `AGENTS.md`.
- `docs/PROJECT_GUIDE.md`.
- `docs/DECISIONS.md`.
- `docs/PROGRESS.md`.
- `docs/PHASE_LOG.md`.

**Targeted verification:**

- Scoped formatting for the five remediation files: passed.
- `pnpm format:check`: passed.
- `git diff --check`: passed.
- Changed-file assertion: passed; only the five allowed remediation files changed.
- Prohibited-scope assertion: passed; no application, route, dependency, manifest, lockfile, CI,
  asset, content-source, environment, deployment, DNS, secret, or production file changed.
- Complete remediation diff review: passed; all three accepted findings were resolved with no
  unrelated cleanup.
- `git diff --cached --check`: passed before the amend.
- Lint, type-check, automated tests, and production build were not run because this was a Level A
  documentation-only remediation and no repository command required them.

**Checkpoint:**

- The existing Milestone 0 checkpoint was locally amended with `git commit --amend --no-edit`; no
  second commit was created.
- The final amended SHA is reported externally and is intentionally not embedded in its own commit.

**External and product state:**

- Nothing was pushed, and no pull request was opened or updated.
- Nothing was merged or deployed.
- No branch deletion, DNS, secret, credential, production-resource, paid-service, force, or other
  destructive action occurred.
- No Phase 3 application implementation has started.
- Milestone 1 has not started.
- The next task is a read-only re-review.

### Accepted visual/workspace milestone checkpoint

**Status:** Completed locally and accepted by the owner

- The owner accepted the Minimal Cinematic Spatial Liquid Glass visual contract and completed
  focused manual QA of the current spatial workspace state.
- The spatial workspace is complete at the accepted implementation checkpoint
  `6b0cd039a04eb1549d72b076457370fbf9aeb672`.
- The archive branch `archive/phase-3-m1-liquid-glass-experiments` remains preserved at
  `57ff4d80b63f0b7c8f4bd963fa4dc5f6fcddea47`; no archive content was inspected or reused for this
  checkpoint.
- No push, pull request, merge, or deployment occurred during this documentation task.
- The next product boundary is canonical ROADMAP Milestone 4: Project system; pushing the
  long-lived Phase 3 branch remains subject to explicit owner approval.

### Milestone 4: Bilingual Project System

**Status:** Completed locally

**Owner-approved product boundary:**

- Publish only three generic directions: Analytics & decision support, Language & text intelligence,
  and Computer vision & applied AI.
- Use the same locale-neutral slug for each EN/ID pair.
- Treat required bilingual content as one publication unit; no silent English fallback on `/id/`.
- Link homepage and archive cards only when the corresponding static detail routes exist.
- Keep filters, related-project cards, draft inventory titles, project-specific claims, technologies,
  model names, dates, organizations, repositories, demos, media, and evidence out of this milestone.
- Defer final canonical, locale-alternate head tags, social metadata, structured data, sitemap, and
  localized 404 handling to Milestone 5.

**Implementation:**

- Added one typed bilingual project catalog with explicit EN/ID completeness validation and stable
  slug types.
- Added reusable project cards plus evidence, empty, incomplete, unavailable, limitations, and
  related-zero presentation patterns.
- Added EN/ID Projects archives and dynamic static-path wrappers for all three mirrored slugs.
- Added public-direction detail pages with evidence-review-pending disclosure and no unsupported
  case-study claims.
- Connected both homepage project presentations to generated detail routes and added localized
  archive links.
- Extended the shared header so project archive/detail pages use real route links while the accepted
  homepage workspace keeps its existing hash-navigation behavior.
- Added scoped Project System styles with opaque reading surfaces, selective focal glass,
  light/dark tokens, reduced-transparency fallback, reduced-motion handling, and a desktop rail
  offset.

**Implementation files:**

- `apps/web/src/types/projects.ts` (created).
- `apps/web/src/data/projects.ts` (created).
- `apps/web/src/components/projects/ProjectCard.astro` (created).
- `apps/web/src/components/projects/ProjectSystemState.astro` (created).
- `apps/web/src/components/pages/ProjectArchivePage.astro` (created).
- `apps/web/src/components/pages/ProjectDetailPage.astro` (created).
- `apps/web/src/pages/en/projects/index.astro` (created).
- `apps/web/src/pages/en/projects/[slug].astro` (created).
- `apps/web/src/pages/id/projects/index.astro` (created).
- `apps/web/src/pages/id/projects/[slug].astro` (created).
- `apps/web/src/components/navigation/SiteHeader.astro`.
- `apps/web/src/components/sections/FeaturedProjects.astro`.
- `apps/web/src/data/home/en.ts`.
- `apps/web/src/data/home/id.ts`.
- `apps/web/src/types/home.ts`.
- `apps/web/src/styles/global.css`.

**Verification:**

- `pnpm format:check`: passed.
- `pnpm lint`: passed with zero warnings.
- `pnpm type-check`: passed across 33 Astro files with zero errors, warnings, or hints.
- `pnpm build`: passed and generated 11 pages: `/`, `/en/`, `/id/`, two project archives, and six
  mirrored project details.
- Static output assertions passed for exact route pairs, homepage/archive detail links, matching
  localized route switches, related-zero states, absence of filter UI, and absence of Milestone 5
  head metadata on project pages.
- Prohibited-content assertions passed: none of the four inventory draft titles, project-specific
  technology/model names, or inventory metrics appeared in application source or generated project
  output.
- HTTP smoke passed: `/` returned 308 to `/en/`, representative archive and detail routes returned
  200, and an unknown project slug returned 404.
- `git diff --check`: passed.
- Changed-file scope review passed: no manifest, lockfile, Astro config, content-source, media,
  environment, deployment, secret, credential, or production file changed.
- Focused Codex reviewer ran with effective `sandbox: read-only` and `approval: never`; final verdict
  was `No actionable findings`. `git status --short` was identical before and after review.

**Focused visual evidence and limitations:**

- A 1440px headless Chrome archive capture found that the existing desktop rail overlapped the new
  route content. A scoped Project System offset fixed the issue, and the second capture passed visual
  inspection. Both screenshots were written outside the repository under `/private/tmp`.
- The in-app browser runtime failed to initialize because of an internal property-definition
  conflict. A 320px headless capture was also not treated as exact narrow-viewport evidence because
  its crop did not reliably represent the internal layout viewport.
- Interactive keyboard, exact mobile breakpoint, dark-theme browser, no-JavaScript browser,
  reduced-motion browser, VoiceOver, physical-device, cross-browser, automated-browser, and measured
  contrast coverage are not claimed for this checkpoint. Source and generated-output review found no
  actionable issue; final integrated coverage remains in Milestone 6.
- Automated tests: **N/A: no automated test suite configured**.

**Documentation checkpoint:**

- Added ADR-013 for the bilingual public-direction Project System.
- Updated `docs/PROGRESS.md` and this phase log once after implementation and checks succeeded.

**External and publication state:**

- Nothing was pushed, and no pull request was opened or updated.
- Nothing was merged or deployed.
- No branch, DNS, secret, credential, production resource, paid service, force operation, or
  destructive action was changed.
- The next product boundary is Milestone 5, subject to explicit owner approval of its implementation
  scope. Push remains behind a separate explicit owner gate.

### Milestone 5: Route, SEO, and Error Integration

**Status:** Completed and verified locally; owner checkpoint review pending

**Owner-approved boundary:**

- Use `https://portfolio.example.com/` as the validated production origin, enable always-trailing-slash
  routes, and keep Astro static output.
- Centralize public routes, locale counterparts, locale switching, recovery links, workspace hashes,
  sitemap enumeration, and route validation without duplicating project slugs.
- Centralize title, description, canonical, locale-alternate, robots, Open Graph, and Twitter output
  in `BaseLayout.astro`.
- Generate a static sitemap for only the ten complete bilingual content routes and a global static
  404 with an English no-JavaScript fallback.
- Keep `robots.txt`, production-versus-preview indexing policy, structured data, social images,
  Cloudflare configuration, deployment integration, and production host behavior outside this
  milestone.

**Implementation:**

- Added typed route and metadata helpers, production-origin validation, and Astro's
  `trailingSlash: "always"` convention.
- Integrated unique metadata into both homepages, both Projects archives, and all six mirrored
  public-direction detail routes. Detail descriptions retain the evidence-review boundary and do
  not imply completed case studies.
- Reused the route registry for head alternates, header locale navigation, slug-preserving detail
  switching, workspace-preserving homepage switching, sitemap entries, and 404 recovery links.
- Corrected the canonical homepage CTA from `#impact` to the real server-rendered `#experience`
  target while preserving safe legacy normalization with `replaceState`.
- Added `sitemap.xml` with exactly ten absolute public content URLs and a top-level static
  `404.html` with one heading, native recovery links, `noindex,nofollow`, and optional exact-`id`
  progressive localization.
- Preserved the root redirect source unchanged. Astro development returned 308 to `/en/`; static
  preview served the generated redirect artifact with HTTP 200. Production host-level status was
  not tested and remains deferred.

**Level A and Level B verification:**

- Scoped formatting and `pnpm format:check`: passed.
- `pnpm lint`: passed.
- `pnpm type-check`: passed across 37 Astro files with zero errors, warnings, or hints.
- `pnpm build`: passed with the ten content routes, top-level `404.html`, `sitemap.xml`, and root
  redirect artifact; unknown project and invalid-locale outputs remained absent.
- `git diff --check`: passed.
- Static assertions passed for the exact route/canonical/alternate matrices, unique managed tags,
  absence of `x-default`, image metadata and JSON-LD, sitemap allowlist, route-catalog consistency,
  404 exclusions, internal links, same-page hash targets, legacy hash normalization, and absence of
  `robots.txt` or unpublished project content.
- Local HTTP smoke checks passed for both homepages, archives, all detail routes, errors, sitemap,
  and content type. No production HTTP status behavior was claimed.
- Automated tests: **N/A: no automated test suite is configured**.

**Focused browser review:**

- The in-app browser bootstrap failed with an internal property-definition error, so the fallback
  review used temporary local headless Chrome against Astro preview.
- Reviewed EN/ID homepages, both archives, one detail page for each project direction, homepage,
  archive and detail locale switching, project-slug and workspace-hash preservation, the legacy
  hash, unknown top-level/project/locale errors, sitemap, browser titles, page-source metadata,
  desktop, mobile, 200% reflow equivalent, light/dark, keyboard focus, no JavaScript, reduced motion,
  and reduced transparency.
- Temporary screenshots and scripts were kept outside the repository under `/private/tmp`, and all
  temporary servers were stopped. Physical devices, VoiceOver, cross-browser coverage, automated
  WCAG contrast measurement, and production performance remain Milestone 6 work.

**Read-only review:**

- A focused Codex reviewer ran with effective `sandbox: read-only` and `approval: never`; repository
  status was identical before and after the run.
- One finding was accepted: route enumeration no longer hard-fails merely because the current
  published-route count changes; incomplete bilingual projects remain omitted by catalog
  validation, while the exact ten-route requirement is asserted for this checkpoint.
- One finding was rejected because it contradicted the approved requirement: the 404 deliberately
  remains a complete English fallback without JavaScript and localizes Indonesian only through
  progressive enhancement.
- The reviewer's attempted type-check could not write its read-only cache, but the root-writer Level
  B type-check and build both passed after remediation.

**Documentation and external state:**

- Added ADR-014 and updated `docs/PROGRESS.md`, this phase log, and the factual README route/status
  summary after implementation and checks passed.
- The Phase 3 branch already existed on `origin` through baseline
  `1fd8cdac3d9de0f5e543fe989b69e01e37791f6b`; this milestone performed no remote action.
- No push, pull-request creation or update, merge, deployment, DNS, Cloudflare, secret, credential,
  production-resource, dependency, paid-service, force, destructive Git, media, or archive-content
  action occurred.
- The next task is owner review of the Milestone 5 checkpoint before any push.

### Milestone 6: Final Integrated Hardening

**Status:** Consolidated remediation and available final verification completed locally; owner
checkpoint review pending

**Baseline and audit boundary:**

- The Stage B preflight verified branch `phase/3-core-pages-and-case-studies`, local and upstream
  SHA `b5e72bb932f556c1974d0f26d88b61ab4b9cd58e`, divergence `0 0`, a clean worktree,
  empty staging and untracked sets, and archive ref
  `57ff4d80b63f0b7c8f4bd963fa4dc5f6fcddea47`.
- Stage A placed temporary scripts, reports, screenshots, logs, Lighthouse limitations, and the
  reviewer package only under `/private/tmp/free-tier-portfolio-website-phase3-m6/`; none entered the
  repository.
- The comprehensive audit covered automated checks, the exact route and metadata matrix, privacy,
  local development and preview HTTP behavior, Chrome browser states, static and manual
  accessibility states, and available Chrome performance measurements.
- Google Antigravity completed the one approved independent read-only review from a redacted copy of
  the package. It reported no repository or external-state change and confirmed the Stage A finding
  set without adding a new finding.

**Consolidated finding register:**

- `M6-HIGH-001` was accepted: a default `/favicon.ico` request returned 404 and violated the
  no-failed-resource acceptance target.
- `M6-MED-001` was accepted: LinkedIn and GitHub glyph branches conflicted with the strict
  no-third-party-logo boundary.
- `M6-MED-002` was accepted: durable phase and milestone status text was stale.
- `M6-DEF-001` remains deferred content/media: approved evidence, permission, privacy review,
  credential details, and production media are not available. Honest unavailable states remain
  intact.
- There were no Blocker, Low, rejected, aesthetic-redesign, or owner physical-device findings.

**Consolidated remediation:**

- Added a safe data favicon declaration to the shared document head, preventing the browser from
  issuing the failed default resource request without introducing an asset or dependency.
- Replaced the two brand-specific SVG branches with one neutral external-link icon. Visible
  LinkedIn and GitHub destination names, disclosures, accessibility purpose, and approved URLs were
  preserved.
- Updated only the approved durable closeout documents. No new architectural decision was required,
  so `docs/DECISIONS.md` remained unchanged; `docs/ROADMAP.md` and `AGENTS.md` also remained
  unchanged.

**Verification results:**

- Formatting, linting, Astro type-checking across 37 files with zero diagnostics, production build,
  and whitespace checks passed. Automated tests are **N/A: no test script is configured**.
- The static audit passed the exact ten content routes, root redirect artifact, `404.html`,
  `sitemap.xml`, absent invalid/unknown outputs, canonical and EN/ID alternate matrices, unique
  managed metadata, one heading and main landmark, unique IDs, internal links, same-page hashes, six
  homepage workspace destinations, and sitemap parity.
- No `robots.txt`, JSON-LD, social-image metadata, public image/video/iframe/PDF/screenshot/portrait,
  third-party logo, unsupported claim, unexpected outbound URL, denylist match, or private/draft
  leakage was found.
- Development HTTP checks confirmed `/` as 308 to `/en/`, valid content as 200, invalid and unknown
  routes as 404, and the sitemap as XML. Preview checks confirmed all static artifacts and local 404
  behavior; preview does not prove production host status.
- Chrome 150 headless/CDP focused regression passed representative desktop/mobile, light/dark,
  reflow-equivalent, no-JavaScript, reduced-motion, reduced-transparency, forced-colors, keyboard,
  menu, sticky navigation, locale/theme/history, 404 recovery, text-spacing, and accessibility-tree
  states. Contact remediation checks passed in EN and ID at 375 px with no horizontal overflow,
  failed resources, or console/runtime errors.
- Available Chrome measurements used three cold-cache runs per route/profile for EN homepage, ID
  homepage, EN archive, ID detail, and 404. Worst median LCP was 548 ms, CLS was 0.00316, and TBT was
  21 ms. Minified global CSS was 57.89 KiB, static output was 200.30 KiB, request statuses were
  expected, JavaScript bundles were absent, and failed-resource and console-error counts were zero.
- Lighthouse Performance and Accessibility scores are N/A because Lighthouse was unavailable and
  installation was prohibited. No score was fabricated.

**Documented limitations and gates:**

- Safari 26.5.2 was locally present, but `safaridriver` could not run because Allow Remote
  Automation was disabled; that setting was not changed. VoiceOver was not run.
- Firefox was not installed. Physical iPhone and Android devices were unavailable. Chrome 200% and
  400% coverage used reflow-equivalent viewports rather than real browser zoom. Automated measured
  contrast and production-host behavior were not claimed.
- Real content/media, production indexing policy, `robots.txt`, structured data, social images,
  deployment, Cloudflare, DNS, secrets, credentials, and production resources remain behind their
  approved future gates.

**Checkpoint and external state:**

- The closeout uses one local checkpoint with subject `fix: complete Phase 3 final hardening`.
- Nothing was pushed; no pull request was created or updated; nothing was merged or deployed.
- No dependency, manifest, lockfile, CI, environment, inventory, media, archive content, DNS,
  Cloudflare, secret, credential, production resource, force operation, destructive Git action, or
  branch cleanup was performed.
- The next task is owner review of the final Phase 3 hardening checkpoint before any push.

## Phase 4: Sanity CMS

### Milestone 0: Transition and Autonomous Workflow

**Status:** Completed locally; Phase 4 branch push remains unapproved

**Verified baseline:**

- A non-pruning `git fetch origin` completed successfully.
- `HEAD`, local `main`, and fetched `origin/main` matched
  `e599a855d1bae41aadd9112d4596e2c7cf3011fa` with zero divergence.
- Local branch `phase/4-sanity-cms` already existed at that exact SHA and was active.
- The worktree, staging area, and untracked set were clean before implementation.
- PR #6 and PR #7 were verified merged. PR #7 CI run #9 and post-merge `main` CI run #10 passed.
- Remote Phase 3 working branches were absent after fetch; all local Phase 3 and archive refs remain
  preserved. No branch or ref was deleted.
- GitHub returned no repository deployment records and no GitHub Pages site. No deployment is
  claimed.
- `apps/studio` remained reservation-only, no Sanity dependency or implementation path existed,
  and Astro remained static.

**Owner-accepted decisions:**

- Autonomous Milestone Loop v1 with Codex as the sole repository writer and at most two automatic
  remediation loops.
- One long-lived `phase/4-sanity-cms` branch, coherent local commits per milestone, and one final
  Phase 4 pull request by default.
- Standalone Studio, static Astro, typed and validated CMS adapters, published-only production
  queries, non-public draft access, safe missing configuration, and static migration fallback.
- Content-type localization fallback, bounded core schema inventory, privacy-aware asset metadata,
  environment/secret separation, Milestones 0 to 6, exact acceptance criteria, and human gates.

**Files prepared:**

- Three repository-local workflow skills under `.agents/skills/`.
- `scripts/codex/run-milestone.sh`.
- Structured milestone report schema and milestone/release templates under `scripts/codex/`.
- Durable Phase 4 transition updates in `AGENTS.md`, `README.md`, `.env.example`, `CHANGELOG.md`,
  `docs/DECISIONS.md`, `docs/ROADMAP.md`, `docs/PROGRESS.md`, `docs/PHASE_LOG.md`, and
  `docs/PROJECT_GUIDE.md`.

**External and implementation boundary:**

- No Sanity project or dataset was created.
- No authentication, dependency installation, lifecycle script, actual environment value, schema,
  CMS query, token handling, CORS change, content publication, remote write, deployment, production
  change, force operation, destructive Git action, or branch cleanup occurred.
- The next product boundary is the exact owner gate for Milestone 1 project/dataset creation and
  authentication scope.

**Verification:**

- `pnpm format:check`: passed.
- `pnpm lint`: passed with zero warnings.
- `pnpm type-check`: passed across 37 Astro files with zero errors, warnings, or hints.
- `pnpm build`: passed in static mode and generated the expected 12 pages/artifacts.
- Shell syntax, three skill validations, JSON Schema syntax and required-field assertions, runner
  help, runner dry-run, executable mode, and `git diff --check`: passed.
- Changed-file scope: passed for exactly 16 approved files.
- Secret scan and empty `.env.example` values: passed.
- Reservation-only Studio, no Sanity dependency or implementation, static Astro, and no executable
  runner remote-write command assertions: passed.
- Automated tests: **N/A: no automated test script is configured.**

**Review and remediation:**

- Local deterministic source review accepted three runner hardening improvements: require a clean
  worktree for a new milestone, instantiate the task template without copying unresolved
  placeholders into the prompt, and reject inconsistent `status`/`human_gate` output while
  requiring a resumable session for a human gate.
- Focused external Codex reviewer commands were configured with `read-only` sandbox and approval
  `never`, but the runtime policy rejected sending the private uncommitted diff to an external
  service. The failed attempts left Git status unchanged. No bypass or writable reviewer was used.
- Independent security/privacy, code-quality, and documentation review is deferred because of that
  policy boundary. No independent-review result is claimed.
- No second remediation loop was required.

**Checkpoint:**

- One coherent local checkpoint commit records the accepted Milestone 0 scope.
- Nothing was pushed, no pull request was created or updated, and no external or irreversible gate
  was crossed.

### Milestone 1: Studio Scaffold and Repository Integration

**Status:** Completed locally; Phase 4 branch push remains unapproved

**Verified baseline and external state:**

- The worktree was clean and local `HEAD` matched `origin/phase/4-sanity-cms` at
  `7a94892d8e5933b60a11478013f5e03060c3dbc4` before implementation.
- Existing Sanity project `free-tier-portfolio-website` with non-secret ID `example0` and the public
  `production` dataset were reused. No project or dataset was created, deleted, renamed, or
  recreated.
- The owner approved one GitHub-based Sanity CLI authentication. Sanity stored the session through
  its normal local mechanism outside the repository; no credential, code, or token was printed into
  tracked files or copied into the report.
- The automatic Growth Trial remains accepted as temporary and is expected to downgrade to Free.
  No billing, payment method, subscription, paid feature, or support action occurred.

**Implementation:**

- Replaced the reservation-only `apps/studio` directory with the current official clean standalone
  TypeScript scaffold from `create-sanity`/Sanity CLI.
- Added the generated direct dependency set: `@sanity/vision`, `react`, `react-dom`, `sanity`, and
  `styled-components`; and development dependencies `@sanity/eslint-config-studio`, `@types/react`,
  `eslint`, `prettier`, and `typescript`.
- Renamed the workspace package to `@portfolio-reference/studio`, removed generated deploy and GraphQL-deploy
  scripts, and added bounded lint and type-check scripts.
- Added shared fail-fast validation for `SANITY_STUDIO_PROJECT_ID` and
  `SANITY_STUDIO_DATASET`, used by both `sanity.config.ts` and `sanity.cli.ts`.
- Created the exact owner-approved values only in ignored `apps/studio/.env.local`; tracked
  `.env.example` remains names-only.
- Kept the schema registry typed and empty. No schema document, Studio structure customization,
  sample import, real content, asset, MCP integration, global skill, Visual Editing, or frontend
  Sanity client/query path was added.
- Added separate root web/Studio dev, lint, type-check, and build commands. CI builds both apps using
  non-production placeholder identifiers and never receives the local resource values.
- Preserved static Astro output and removed all Studio deployment commands from package scripts.

**Dependencies and lifecycle boundary:**

- Resolved direct versions were `@sanity/vision@6.4.0`, `react@19.2.7`,
  `react-dom@19.2.7`, `sanity@6.4.0`, `styled-components@6.4.3`,
  `@sanity/eslint-config-studio@6.0.0`, `@types/react@19.2.17`, `eslint@9.39.4`,
  `prettier@3.9.4`, and `typescript@5.9.3`.
- Direct dependency metadata contained no `preinstall`, `install`, or `postinstall` lifecycle.
  The installed graph exposes only `esbuild@0.28.1` postinstall, already constrained by the
  repository's existing `allowBuilds: esbuild: true` policy.
- `pnpm install --frozen-lockfile` passed. No additional build-script approval was added.

**Verification:**

- `pnpm format:check`, `pnpm lint`, and `pnpm type-check`: passed for the full workspace.
- `pnpm build`: passed for the static Astro app and standalone Studio.
- Studio started locally on `127.0.0.1:3333`, returned HTTP 200, and was stopped without deployment.
- An empty-env Studio build failed as intended with a clear missing
  `SANITY_STUDIO_PROJECT_ID` message.
- `git diff --check`, ignored-local-env, empty-staging, static-Astro, no-deploy-script, and bounded
  secret/scope assertions passed.
- `pnpm audit --prod` reported four moderate advisories in Sanity-owned transitive CLI/preview
  dependencies: legacy `js-yaml` and `smol-toml` under `@vercel/frameworks`, plus legacy `uuid`
  paths under `typeid-js` and `@sanity/preview-url-secret`. The current stable Sanity dependency
  graph still pins those paths. No unsafe major-version override was forced.

**Review and checkpoint:**

- The configured security/privacy reviewer was invoked with a read-only sandbox and approval
  policy `never`, but runtime policy rejected exporting the private uncommitted diff to an external
  service. Git status was identical before and after. The code-quality and documentation reviewers
  were not retried through the same rejected export path, and no writable or indirect bypass was
  used.
- Local deterministic review found no tracked secret, deploy command, sample content, real content,
  CORS change, token path, frontend integration, remote Git action, or static-output regression.
- The accepted milestone is recorded as one coherent local checkpoint commit. Nothing was pushed,
  no pull request was created or updated, and no merge, deployment, branch deletion, or force
  operation occurred.

### Milestones 2 to 5: Bounded CMS Integration Wave

**Status:** Completed locally; post-Milestone-1 commits remain unpushed

**Preserved baseline and security remediation:**

- The wave resumed on `phase/4-sanity-cms` at exact pushed Milestone 1 head
  `22495b44a97d099eb1d13d27b7f38b369cf7d458`. Staged and unstaged Milestone 2 to 3 source changes were
  inventoried without printing environment values and preserved without reset, clean, checkout,
  restore, stash, history rewrite, or force operation.
- The prior Sanity CLI session implicated in an exposed local diagnostic was logged out through the
  official CLI. No separate incident diagnostic file could be identified on disk, so no unrelated
  log or operating-system record was deleted. The old account-side session could not be revoked
  unambiguously without risking another credential.
- A fresh official GitHub browser login completed and access was verified only to project
  `example0` (`free-tier-portfolio-website`) and dataset `production`. Post-login tracked/untracked secret and
  environment scans found no authentication value in the repository.

**Schemas, Studio structure, and controls:**

- Added bounded `siteSettings`, `profile`, `experience`, `project`, and `credential` schemas plus
  localized short/long/portable text, slug, alt-text, and caption helpers.
- Added publication, ownership, credit, privacy, redaction, approval, image, file, evidence, SEO,
  navigation, and section metadata. Asset presence never grants publication approval.
- Added singleton Studio structure for settings/profile and native Sanity draft/published actions.
  Featured state, numeric ordering, visibility, navigation, and section controls remain bounded;
  no generic page builder, embedded Studio, Visual Editing, preview token, or CORS change was added.

**Published-only static integration:**

- Added exact `@sanity/client@7.23.0` to the static Astro app. Five queries explicitly exclude
  `drafts.**`, every fetch requests `perspective: "published"`, and the client has no token.
- Added typed raw CMS contracts, runtime validation, adapters, and a cached build-time loader before
  CMS responses reach rendering. Missing configuration, fetch failure, missing records, invalid
  publication metadata, incomplete locale pairs, or incomplete project sets fail safely into the
  existing static content.
- Projects require the three approved paired slugs and complete EN/ID title, summary, direction,
  focus, limitations, and evidence disclosure. Supporting profile fallback remains explicit;
  credentials and evidence have no silent language fallback.

**Temporary records and lifecycle proof:**

- Synchronized exactly seven deterministic public-safe records: `siteSettings`, `profile`,
  `safe-experience-unavailable`, `safe-project-analytics-decision-support`,
  `safe-project-language-text-intelligence`, `safe-project-computer-vision-applied-ai`, and
  `safe-credential-unavailable`.
- The records contain only existing generic public directions and explicit unavailable states. They
  include no real employment, credential, evidence, asset, metric, result, repository/demo claim,
  unsupported date, confidential material, or new outbound link.
- An initial dot-scoped ID set was visible to the authenticated Studio but absent from tokenless
  public queries. One bounded atomic remediation replaced only those five newly created managed IDs
  with hyphenated IDs; no unknown or pre-existing record was changed or deleted.
- Through local Studio, the Analytics project Title was changed to the accepted final Title Case,
  published, and observed in the subsequent tokenless static build across EN/ID homepage, archive,
  and detail output. A later harmless unpublished `Draft Check` edit was absent from a production
  build, then discarded through Studio. Final verification returned to seven published records,
  zero drafts, and zero assets.

**Verification and review:**

- Frozen installation passed against the unchanged lockfile and supply-chain policy. Formatting,
  full lint, 14/14 CMS tests, web and Studio type-checks, schema validation with 0 errors/0 warnings,
  Studio production build, fallback Astro build, and CMS-backed Astro build all passed.
- Missing/partial/invalid configuration, missing records, invalid responses, publication approval,
  paired project completeness, ordering, published perspective, draft exclusion, and no-browser-token
  assertions passed. CMS-backed and fallback builds each produced the expected 12 pages.
- Final public diagnostic returned source `cms`, one unavailable experience, three projects, one
  unavailable credential, and no invalid path. Browser-delivered output contained no Sanity project
  ID, API endpoint, token name, or authorization marker.
- Ten content routes retained canonical and paired EN/ID alternates. Desktop and true 320 px mobile
  rendering were visually intact; the 320 px document and body scroll widths matched the viewport.
  Semantic smoke found one `h1`, one `main`, correct language, no missing image alt, visible 3 px
  keyboard focus, working light/dark state, and preserved reduced-motion CSS. Static output was
  224 KB with 60 KB of browser assets.
- `pnpm audit --prod` retained exactly four known Moderate transitive advisories in Sanity CLI and
  preview dependencies (`js-yaml`, `smol-toml`, and two legacy `uuid` paths). No High or Critical
  advisory appeared and no forced override was applied.
- The configured external read-only reviewer remained deferred because runtime privacy policy does
  not allow export of the private uncommitted repository diff. No bypass or writable reviewer was
  used. Local read-only review accepted and remediated the public-ID visibility finding and the
  explicit Node `URL` test import; no Blocker or High finding remains.

**Local checkpoints and remaining gates:**

- `2dea686`: `feat: add bounded Sanity schemas and Studio structure`
- `9f86692`: `feat: add validated Sanity query integration`
- `0b82ea0`: `feat: add safe temporary CMS content workflow`
- Nothing after `22495b44a97d099eb1d13d27b7f38b369cf7d458` was pushed. No pull request was created or
  updated, and no merge, deployment, CORS, token, billing, DNS, branch deletion, or force action
  occurred. Push remains the next exact human gate.

### Milestone 6: Final Integrated Hardening

**Status:** Completed and later merged through PR #8

**Recovery and release boundary:**

- Recovery began with branch `phase/4-sanity-cms` at exact local head
  `9b9cf5819a03386cff6059eeb3178369f3b7683f`. Worktree, staging area, untracked set, changed-file
  list, and staged/unstaged statistics were empty.
- The remote still resolved to the approved pre-wave head
  `22495b44a97d099eb1d13d27b7f38b369cf7d458`. The five expected Milestones 2 to 5 commits and
  divergence `5/0` were reverified before any remote write.
- The exact approved checkpoint was pushed once with an explicit non-force refspec. Live remote
  verification then resolved `origin/phase/4-sanity-cms` to
  `9b9cf5819a03386cff6059eeb3178369f3b7683f` with divergence `0/0`.
- No pull request or deployment exists. No branch CI run was expected or created because the CI
  workflow triggers on pull requests and pushes to `main`, not pushes to the Phase 4 branch.

**Integrated verification:**

- Frozen dependency installation passed without lockfile changes. Formatting, full lint, 14/14 CMS
  tests, web and Studio type-checks, schema validation with 0 errors/0 warnings, `git diff --check`,
  Studio production build, static-fallback Astro build, and tokenless CMS-backed Astro build passed.
- Missing, partial, and invalid configuration; missing records; invalid response and publication
  metadata; bounded ordering and visibility; paired project locales; explicit published
  perspective; draft exclusion; and no-browser-token boundaries remained covered and passed.
- A tokenless public diagnostic on the published perspective returned exactly the seven approved
  document IDs, exposed zero drafts, and found zero image/file assets. No record was edited,
  published, deleted, or recreated during hardening.
- The CMS-backed output contained 12 HTML files and ten content routes. Every content route retained
  canonical and paired EN/ID alternates; all three project slugs had complete mirrored routes.
  Browser-delivered output contained no Sanity project ID, API endpoint, token, authorization, or
  draft marker. Eleven local output references resolved with no missing asset.
- Desktop and true 320 x 1200 browser checks passed with one `h1`, one `main`, correct document
  language, no missing image alt, no horizontal overflow, working light/dark states, mobile menu
  open and Escape/focus-return behavior, Indonesian project metadata, and no browser console warning
  or error. Reduced-motion and reduced-transparency rules plus opaque pre-`@supports` fallbacks
  remained present.
- Static output measured 205,360 bytes with 59,280 bytes of browser assets, below the prior wave
  evidence. No production Lighthouse score or production-host performance claim is made.
- Local Studio started successfully, exposed the bounded five-path content structure, and listed
  the three expected public project directions. Studio console inspection was clean, and the server
  was stopped without an edit, publish, deployment, token, or CORS action.

**Security, dependency, and review result:**

- Tracked/untracked status and generic credential-pattern scans remained clean. The tracked
  `.env.example` contains names only with empty values, while the real Studio environment file
  remains ignored. No new CORS, browser token, private content, evidence, or asset path appeared.
- Resolved core versions remained `@sanity/client@7.23.0`, `astro@7.0.7`, `sanity@6.4.0`,
  `@sanity/vision@6.4.0`, `react@19.2.7`, `react-dom@19.2.7`, and
  `styled-components@6.4.3`.
- Production audit retained exactly four Moderate transitive advisories: two `js-yaml` advisories,
  one `smol-toml` advisory, and one `uuid` advisory affecting two legacy paths. High and Critical
  counts remained zero, and no forced override was used.
- Local read-only security/privacy, query/adapter correctness, and UI/accessibility/release reviews
  found no new actionable issue. Git status was identical before and after review; no remediation
  loop was required.
- Configured external review remains deferred because the private-repository runtime cannot be
  verified as both export-permitted and effectively read-only. No writable reviewer or policy
  bypass was used.

**Remaining gates and limitations:**

- The public dataset authoring contract remains strict: drafts are potentially publicly queryable,
  and real/private content, evidence, media, credentials, or unsupported claims remain prohibited
  until the separate Phase 5 review and publication gates.
- Account-side revocation of the prior exposed CLI session remains unconfirmed; that local session
  was logged out and replaced, and no unambiguous unrelated credential was revoked.
- Safari/VoiceOver, Firefox, physical-device, real zoom, measured contrast, Lighthouse,
  production-host, PR CI, merge, deployment, DNS, and Cloudflare behavior remain unclaimed.
- Historical closeout: the Milestone 6 checkpoint later passed its separate push, pull-request, and
  merge gates through PR #8. It merged to `main` as
  `fc2f2e5fcb7d4c5baac095ed2d0f21a1da41a9c9`, and post-merge CI run #12 succeeded. No deployment,
  branch cleanup, force operation, or production action occurred.

## Phase 5: Real Content Migration

### Milestone 0: Transition, Source Authority, and Publication Plan

**Status:** Completed and exact checkpoint pushed; no pull request created

**Verified transition baseline:**

- Starting branch `main`, local `HEAD`, local `main`, fetched `origin/main`, and the PR #8 merge
  commit matched `fc2f2e5fcb7d4c5baac095ed2d0f21a1da41a9c9` with divergence `0/0`.
- Worktree, staging area, and untracked set were clean before implementation.
- PR #8 remained merged and post-merge CI run #12 succeeded on the exact baseline SHA.
- No open Phase 5 pull request or GitHub repository deployment record existed. No deployment is
  claimed.
- Local and remote `phase/4-sanity-cms` remained retained and untouched.
- A tokenless public query returned exactly the seven expected safe published Sanity records, zero
  drafts, and zero image/file assets.
- Local branch `phase/5-real-content-migration` was created from the exact verified baseline and
  remained local until the separately approved exact push gate below.

**Owner-accepted decisions:**

- D5-01 through D5-14 establish repository/register authority, one Phase 5 branch and pull-request
  path, the public-dataset boundary, claim lifecycle, separate source and asset/evidence registers,
  complete reviewed EN/ID by default, the three launch-project mappings, later-gated descriptive
  slugs, later-gated bounded credential categories, private phone and gated public contact/CV,
  bounded publication batches with rollback, honest unsupported states, Milestones 0 to 7, and no
  Phase 5 deployment.
- ADR-020 records the complete durable decision package while preserving ADR-001 through ADR-019 as
  historical accepted decisions.

**Milestone implementation boundary:**

- Updated Phase 5-active governance, source precedence, private-review, publication, localization,
  contact/CV, project, credential, milestone, acceptance, and human-gate documentation.
- Added header-only `CLAIM_REGISTER.csv`, `SOURCE_REGISTER.csv`, and `ASSET_REGISTER.csv` templates.
- Added one bounded `PUBLICATION_BATCH_TEMPLATE.md` with explicit scope, review, rollback, and exact
  owner-action fields.
- Existing milestone and release skills remained unchanged because their behavior is phase-neutral
  and already preserves read-only review and exact remote/irreversible gates.

**Read-only review and remediation:**

- `code_quality_reviewer`, `security_privacy_reviewer`, and `documentation_reviewer` ran through a
  parent runtime with `sandbox: read-only` and `approval: never`. Each configured reviewer also used
  `sandbox_mode = "read-only"`.
- Git status and the combined diff/template fingerprint were identical before and after every
  reviewer result; no reviewer edited a file or requested elevation.
- Initial consolidated findings were Blocker: 0, High: 2, Medium: 4, Low: 0.
- Accepted both High findings: the final acceptance wording needed to preserve non-sensitive
  candidate/rejected audit metadata in Git, and batch scope needed explicit excluded metrics, links,
  and assets.
- Accepted all four Medium findings: content publication and asset upload needed mutually exclusive
  batch types; source authority needed separate verification/review/approval metadata; assets needed
  type/size contract and validation-result fields; and Milestone 0 could not be marked complete
  before final verification and commit.
- The first remediation loop clarified the Git-versus-public-payload boundary, added the missing excluded
  lists and mutually exclusive batch rules, expanded source and asset validation metadata, corrected
  the pending milestone state, and replaced the stale Phase 4 runner example.
- A focused read-only re-review confirmed all six original findings resolved and returned Blocker: 0,
  High: 0, Medium: 2, Low: 0. Both Medium findings identified one ambiguous README sentence about
  asset-upload and public contact/CV authorization.
- The second and final remediation loop clarified that `content-publication` may publish only its
  exact listed content, `asset-upload` may upload only its exact listed assets, the two actions cannot
  substitute for each other, and contact/CV content must be listed explicitly.
- No finding was rejected or deferred.

**Verification:**

- `pnpm format:check`, `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm schema:validate`, and
  `pnpm build` passed after remediation. Web type checking returned zero errors, warnings, or hints;
  all 14 tests passed; schema validation returned zero errors and warnings; the web built 12 pages;
  and Studio built successfully.
- `git diff --check`, template header/field assertions, publication-contract assertions, and the
  exact 12-file scope check passed. No application, schema, inventory-candidate, dependency,
  environment, skill, or external-system change entered the checkpoint.

**Prohibited and external state:**

- No application source, schema, query, adapter, route, project slug, test, inventory candidate row,
  dependency, lockfile, environment value, Sanity record, draft, asset, private evidence, real claim,
  metric, credential, contact detail, media, CV, or remote state was changed.
- During local Milestone 0 implementation, no authentication, token, CORS, access-control, billing,
  deployment, push, pull-request mutation, merge, branch cleanup, force operation, or destructive
  Git action occurred.

**Exact Milestone 0 push gate:**

- The owner separately approved a normal non-force push of exact commit
  `15217dcf84e4656879febed841ca7101e5b0e2a5` to
  `origin/phase/5-real-content-migration`.
- Pre-push verification confirmed the exact branch, head, parent, commit subject, clean worktree,
  one-commit history over `main`, absent remote branch, absent Phase 5 pull request, and no deployment.
- The push succeeded. The remote branch resolved to the exact approved SHA and local/remote
  divergence became `0/0`.
- No pull request was created and no Phase 5 branch workflow run was triggered. No later commit was
  authorized or pushed.

**Next boundary:**

- The owner accepted the local-only Milestone 1 non-sensitive register-normalization scope. No
  private-evidence access, Sanity write, asset upload, publication, or later push is included.

### Milestone 1: Claim, Source, and Asset Register Normalization

**Status:** Completed and exact checkpoint pushed; no pull request created

**Scope and source boundary:**

- Reconciled the repository inventory, media register, accepted Phase 5 governance, existing public
  repository destinations, the owner-provided Milestone 1 instruction, and the current CV snapshot
  as candidate sources. Private contact values were withheld and no private evidence was accessed.
- Normalized 113 deterministic claim rows across 15 candidate content IDs. `PUB-001` has no
  fabricated claim and is covered by an explicit omission decision in `VERIFICATION_GAPS.md`.
- Added six non-sensitive source records. Source-location review does not elevate any professional
  claim to verified or approved.
- Mapped `EVD-001` through `EVD-005` exactly once in five asset rows without locating or opening any
  file. Actual filename, type, size, caption, alt text, credit, public URL, and approval fields remain
  empty.
- Kept all 13 quantified claims source-located, explicitly unverified, and unpublished. All claim
  privacy, redaction, translation, and publication reviews remain pending.

**Initial targeted validation and read-only review:**

- Dependency-free CSV validation passed for exact headers, row width, deterministic unique IDs,
  content/source/media references, candidate coverage, allowed statuses, empty approval fields,
  metric isolation, and prohibited private-value patterns.
- `code_quality_reviewer` returned no finding. `security_privacy_reviewer` returned one Medium for
  an `EVD-005` claim relation that differed from the media register. `documentation_reviewer`
  returned one Medium for the expected pre-closeout Milestone 1 status update.
- Reviewer runtime and all three configured agents were read-only. Git status and the four-file
  fingerprint were identical before and after review.
- Remediation loop 1 moved the `EVD-005` claim relation to canonical `EXP-001`, clarified that
  `PRJ-004` has no canonical evidence item, and synchronized live documentation to Milestone 1 in
  progress. No finding was rejected or deferred.

**Final verification and checkpoint:**

- After remediation, dependency-free register validation passed again with 113 claim rows, six
  source rows, five asset rows, 13 isolated unverified metric claims, all 16 inventory IDs covered,
  and all five media IDs mapped exactly once.
- The complete Level C suite passed: formatting, lint, type checks, 14 tests, schema validation with
  zero errors and warnings, the 12-page web build, and the Studio build. `git diff --check` passed.
- Focused read-only re-review by `security_privacy_reviewer` and `documentation_reviewer` confirmed
  both initial Medium findings resolved and returned no new Blocker, High, or Medium finding. Status
  and fingerprints were identical before and after each reviewer; no finding was rejected or
  deferred.
- One coherent local checkpoint was created at
  `ea9280b81ed6190c450ab41dd0f91db09a3a0be6` with subject
  `content: normalize Phase 5 candidate registers`.

**Exact Milestone 1 push gate:**

- The owner approved only a normal non-force push of exact commit
  `ea9280b81ed6190c450ab41dd0f91db09a3a0be6` to
  `origin/phase/5-real-content-migration`.
- Pre-push verification confirmed the exact branch, head, subject, clean repository, M0 parent,
  one-commit normal ancestry, remote M0 SHA, absent Phase 5 pull request, and no deployment.
- The exact push succeeded. The remote branch resolved to the approved M1 SHA, divergence became
  `0/0`, and the worktree remained clean. No pull request or branch CI run was created.
- The push authorization was consumed and does not authorize any Milestone 2 remote action.

**Next boundary:**

- The owner accepted the local-only Milestone 2 review-package scope. No publication, Sanity write,
  private-evidence access, asset action, application/schema/query change, or later push is included.

### Milestone 2: Site Settings, Public Identity, and Profile/About Review Package

**Status:** Completed and exact checkpoint pushed; owner decisions remain pending

**Accepted scope and public boundary:**

- Prepare one concise owner-review package and one non-executable draft `content-publication` batch
  outside Sanity for only `siteSettings` and `profile`.
- Inspect the current schemas, query/adapter boundary, public safe records, static EN/ID fallback,
  normalized registers, current public repository destinations, accepted governance, and the
  owner-provided CV snapshot only as a candidate source with private values withheld.
- Keep all proposed wording unapproved. Do not promote claim verification, privacy, translation,
  publication, or approval fields.
- No private evidence, portrait, CV file, asset, withheld contact value, metric, credential,
  organization, client claim, schema/query/application change, or Sanity write is included.

**Prepared package:**

- `content-source/review/M2_PROFILE_SITE_SETTINGS_REVIEW.md` records the current safe state, paired
  Site Settings and Profile/About drafts, contact/privacy matrix, every M2-relevant claim
  disposition, and twelve stable owner decisions `M2-D01` through `M2-D12`.
- `content-source/batches/BATCH-P5-M2-PROFILE.md` remains `status: draft`, type
  `content-publication`, not owner-approved, and not executable. It excludes all metrics and assets,
  limits future record scope to `siteSettings` and `profile`, and records fallback and rollback to
  the seven-record safe state.
- Schema inspection confirmed that current public queries/rendering use Site Settings title,
  description, navigation, sections, footer, and SEO plus Profile name, headline, summary, and
  fallback disclosure. Location, availability, social links, contact note, portrait, and resume are
  schema fields but are not currently projected/rendered, so the recommended batch does not add
  them merely because they exist.

**Read-only review and remediation:**

- `qa_reviewer`, `documentation_reviewer`, and `security_privacy_reviewer` ran through read-only
  parent runtimes with approval `never`; configured reviewer sandboxes were also read-only and depth
  remained one. Status and eight-file fingerprints were identical before and after each review.
- Initial consolidated findings were Blocker: 0, High: 1, Medium: 3, Low: 1. The duplicated
  social-link finding from QA and security was counted once. No finding required owner input.
- Remediation loop 1 added candidate lifecycle rows for availability and contact note plus one
  non-sensitive M2 instruction source, without promoting any approval or publication status. It
  excluded unrendered availability/contact/social fields from the batch, made decision effects
  deterministic, and isolated role-list changes behind a separate integration gate.
- Focused re-review confirmed the High and two original Medium findings resolved and returned
  Blocker: 0, High: 0, Medium: 3, Low: 0. The remaining three Medium findings were editorial:
  contact-matrix wording still implied M2 link inclusion, `M2-D10` used “approves,” and candidate
  drafts used terminology too close to formal `translation-reviewed` status.
- Remediation loop 2 made social destinations policy-only and explicitly outside the M2 batch,
  changed `M2-D10` to candidate selection only, and replaced all ambiguous “reviewed draft” wording.
  Final targeted assertions found none of the three prohibited phrases or inconsistent link-batch
  implications. No finding was rejected or deferred.

**Final verification and checkpoint:**

- Targeted validation passed with 115 claim rows, 12 Profile claims, seven source rows, twelve owner
  decisions, exact seven-file scope, exact CSV widths, unique lifecycle references, all approval
  fields empty, no status promotion, and no private email, phone, path, evidence, or secret value.
- `pnpm format:check`, `pnpm lint`, `pnpm type-check`, `pnpm test`,
  `pnpm schema:validate`, the web production build, and the Studio production build passed. Astro
  reported zero errors, warnings, or hints; all 14 tests passed; schema validation returned zero
  errors and warnings; and the web built 12 pages. `git diff --check` passed.
- One coherent local checkpoint was created with subject
  `content: prepare Profile publication review` and was pushed through its separately approved gate.
  No Sanity write,
  publication, private-evidence or asset access, asset upload, public contact disclosure,
  application/schema/query/dependency change, pull request, merge, deployment, or branch cleanup.

### Milestone 2 Owner-Selection Checkpoint

**Status:** Owner directions accepted; local decision-record checkpoint in progress

**Selections and exact effect:**

- On `2026-07-18`, the owner selected option A for every `M2-D01` through `M2-D12`.
- The selected direction keeps the public name `Portfolio Owner`, the conservative paired
  “Building practical…” headline, the paired bounded Profile/About summary, and the accepted paired
  Site Settings drafts.
- `Data Analyst`, `Business Intelligence Analyst`, `Data Scientist`, and `AI/ML Engineer` remain
  target directions only, not held roles, employment, seniority, credentials, or verified history.
- `Indonesia` is selected only at country precision and remains outside the batch/current adapter.
  Availability is deferred and omitted. Public email remains deferred and no value is stored.
- Existing LinkedIn and GitHub destinations are recorded only for a separate
  integration/publication package. The paired contact note is a selected candidate but remains
  outside the M2 batch and current rendering.
- Complete paired EN/ID candidate copy is selected with `allowEnglishFallback: false`; formal
  English and Indonesian review remains pending.

**Boundary and unchanged state:**

- The selections approve candidate direction only. They do not approve final public wording, claim
  verification, privacy/redaction status, formal translation review, batch execution, a Sanity
  write, application integration, assets, provider action, or remote Git action.
- `BATCH-P5-M2-PROFILE` remains draft, not owner-approved, and not executable. Its exact proposed
  scope remains only `siteSettings`, `profile`, `CLM-PROFILE-001-NAME`,
  `CLM-PROFILE-001-POSITIONING`, and `CLM-PROFILE-001-SUMMARY`.
- No content, draft, asset, schema, query, adapter, route, UI, dependency, environment, deployment,
  hook, webhook, CORS, access-control, DNS, push, pull request, merge, or branch-cleanup action is
  included.
- Phase 5 remains paused after Milestone 2. Candidate normalization and source, privacy, formal
  EN/ID, and final wording review must complete before any publication gate can be requested.

### Local Asset Intake and Website Presentation Foundation

**Status:** Completed locally; not an asset-upload or content-publication batch

**Owner gate and baseline exception:**

- The owner authorized read-only intake of the private `Asset/` library and exactly one root-anchored
  `/Asset/` ignore rule. The rule was applied before intake, with no separate baseline-fix commit.
- Ignore verification passed, no source file is tracked or staged, and no source master was modified.
- Work began from `phase/5-real-content-migration` at
  `67a772237e81569ea92ad010dc3b1785a9a25ec2`; local and remote `main` remained unchanged.

**Inventory and reconciliation:**

- Inspected the root guide and five category guides as owner-authored candidate sources, without
  treating their approval checklists as repository publication authority.
- Counted 149 candidate files excluding 45 `.DS_Store` files: 122 images, 21 PDFs, and six Markdown
  guides. Found no case-insensitive collision or exact duplicate binary group.
- All images and PDFs were mechanically readable. Four sources exceed 10 MiB. All PDFs retain
  metadata, only five report tagged structure, and the portrait dimensions conflict with its guide.
- Expanded the authoritative claim, source, asset, and content registers with stable IDs, opaque
  private-source references, candidate-only states, empty public URLs/approval fields, and explicit
  privacy, permission, redaction, localization, metadata, size, and verification gaps.
- Added a durable intake review and a planning-only, non-executable future batch sequence. No row is
  upload-ready or publication-approved.

**Presentation foundation:**

- Added typed, reusable presentation contracts and components for responsive managed images, a 4:5
  portrait, ordered progressive galleries, direct PDF actions, poster-first external video,
  GitHub/verification actions, credential previews, related evidence/projects, and explicit missing
  or unavailable states.
- Added strict public-destination validation and a non-route local QA fixture. Committed production
  code does not import, read, transform, or bundle the private library.
- No material Sanity schema, GROQ query, CMS adapter, project slug, dependency, environment, public
  CV/contact, or production route change is included.

**Verification, review, and checkpoint:**

- Spreadsheet parsing and rendered previews confirmed 164 claim rows, 15 source rows, 48 asset rows,
  and 30 inventory rows with exact column widths, nonblank unique IDs, and no duplicate IDs.
- Dependency-free register tests confirmed every claim source/content reference and every inventory
  to asset relation resolves bidirectionally; all approval/public URL fields remain empty and all
  asset source references remain opaque.
- Browser smoke passed at 1440×900 and 320×1200 with no horizontal overflow, stable 4:5 portrait,
  valid responsive `srcset`, no iframe/embed, native gallery disclosure, visible focus, light/dark
  rendering, loaded reduced-motion rule, and no console warning/error. The temporary route and QA
  SVG were removed before checkpoint preparation.
- Initial read-only specialist review returned Blocker: 0, High: 0, Medium: 4, and Low: 2. The
  accepted findings covered full-card publication gating, encoded private-path rejection,
  bidirectional register relationships, static live-region noise, and QA fixture hierarchy/path.
- Remediation loop 1 resolved all six findings, added exact `PRJ-004` activity counts of
  `3/3/3/2/3`, and passed focused re-review with no new Blocker, High, or Medium finding. A second
  remediation loop was not needed. Git status remained identical before and after every reviewer.
- Formatting, lint, web and Studio type checks, 29 web tests, Studio schema validation, 12-page web
  build, Studio build, privacy boundary checks, and `git diff --check` passed.
- The checkpoint uses exactly one local commit with subject
  `feat: prepare Phase 5 asset presentation foundation`. Push, pull request, merge, deployment,
  Sanity/provider action, publication, upload, and branch cleanup remain unapproved.

### Profile Portrait Derivative Preparation Batch 1

**Status:** Local preparation complete; owner derivative selection required

- Executed `BATCH-P5-ASSET-PREP-PROFILE-001` for `EVD-001` only from the verified local checkpoint
  `9d1cc5cefaedce856a1173f8e8a7a4028eaa1787`.
- Verified the private source as an RGB JPEG at 1900 × 2373 and 834,413 bytes, resolving the stale
  1900 × 3376 guide value in the repository register. The source hash remained unchanged.
- Prepared three ignored, metadata-scrubbed WebP review candidates: 1600 × 2000 primary 4:5,
  1200 × 1200 square, and 800 × 1000 responsive 4:5. No image entered Git.
- Recorded candidate paired alt text, crop and focal-point notes, safe visible-review outcome, and
  the unresolved photographer permission, credit, formal localization, caption, crop-selection,
  upload, and publication gates.
- Local browser QA covered responsive 4:5 and square rendering, safe missing-source behavior,
  light/dark themes, mobile/tablet/desktop widths, focus visibility, reduced motion, and clean
  console output. Temporary route and public symlinks were excluded from the checkpoint.
- Two focused read-only reviews covered privacy/asset governance and responsive media/accessibility;
  both returned no finding at any severity, status remained identical, and no remediation loop was
  required.
- No Sanity write, asset upload, content publication, public Profile activation, schema/query/adapter
  change, dependency, environment, provider action, deployment, push, pull request, merge, or branch
  action occurred.

The owner must select one exact 4:5 derivative before a separately bounded future `asset-upload`
proposal can be prepared. Selection alone is not upload or publication approval.

## Prelaunch Deployment Foundation

### PDF-M1: Repository foundation

**Status:** Completed locally on `prelaunch/deployment-foundation`; no remote or provider action has
occurred.

**Isolation and baseline:**

- The branch was created from verified `main` at
  `fc2f2e5fcb7d4c5baac095ed2d0f21a1da41a9c9` after confirming clean local state.
- The retained Phase 5 branch and its remote both remained at
  `09020b86644405a1138323d44c260339008206fc` with zero divergence. It was neither modified nor
  incorporated into this branch.
- The public Sanity dataset check returned exactly seven safe records, zero drafts, and zero assets.
  No record, asset, Studio, or content write occurred.
- No prelaunch pull request or GitHub deployment record existed before implementation. No Cloudflare
  configuration, DNS, authentication, CORS, environment value, deploy hook, webhook, deployment,
  or remote Git operation is included.

**Approved repository scope:**

- Pin Node `24.18.0` without changing the existing pnpm version, manifest, or lockfile.
- Add static Cloudflare Pages-compatible `_headers`, `_redirects`, and `robots.txt` files for a
  globally non-indexable prelaunch host.
- Add automated deployment-contract assertions and durable deployment, rollback, and human-gate
  documentation.
- Keep Astro static; defer SSR, Worker/Function code, CSP, provider configuration, Studio deployment,
  hostname, and all Phase 5 publication work.

**Verification and review:**

- Formatting, full workspace lint, Astro and Studio type checks, Studio schema validation, all 18 web
  tests, and the full static Astro plus Studio build passed. The generated `_headers`, `_redirects`,
  and `robots.txt` files were present in `apps/web/dist` and matched their source files byte-for-byte.
- Two configured specialist reviewers ran read-only; Git status before and after both reviews was
  identical. Both identified the missing clean-provider dependency install and stale Phase 4 PR
  wording; the QA reviewer also requested explicit output-artifact verification.
- One remediation loop added the lifecycle-script-free frozen install to the planned Pages build
  command, corrected the dedicated prelaunch PR rule, and bound the runbook/output check in tests.
  The consolidated suite then passed with no remaining reviewer finding.

**Next gate:**

- The local checkpoint may be committed under the approved scope. Push, pull request, provider
  configuration, deployment, CMS action, asset upload, and Phase 5 resumption remain separate exact
  owner approvals.

### PDF-M3: Sanity Studio deployment

**Status:** Completed on 2026-07-18 with the separately approved Sanity-managed Studio host
`portfolio-reference.sanity.studio`.

**Scope and safeguards:**

- The deployment used known-good `main` source
  `e14f35879fb7793eada6ee6f7959a5c2cfd122fe`; automatic Studio updates remain disabled.
- The host requires an authenticated Sanity session for editing. No application identifier, local
  environment value, token, cookie, credential, private URL, or authentication detail is recorded.
- The deployment included only the required schema manifest/store upload. It did not create, edit,
  publish, unpublish, or delete a document; upload an asset; change CORS, access control, project,
  dataset, webhook, Cloudflare resource, DNS, or website deployment.

**Verification:**

- The official CLI dry run passed before deployment. The exact host was reachable after deployment,
  management verification found the single expected hosted Studio, and authenticated read-only smoke
  checks reached all five Studio navigation areas.
- Dataset checks before and after found exactly seven safe records, zero drafts, and zero image or
  file assets. No real content was published.
- Repository checks and bundle scanning remained clean; the Studio schema manifest was available
  after deployment. Rollback remains a separate owner-approved operation.

**Next external gate:**

- Cloudflare Pages deployment or a separately scoped Studio remediation requires a new exact owner
  approval. The local documentation record must not be pushed, made into a pull request, merged, or
  used to authorize Phase 5 publication work.

### PDF-M4: Cloudflare Pages prelaunch deployment

**Status:** Completed on 2026-07-18 through the separately approved Cloudflare Pages gate.

**Scope and safeguards:**

- Created exactly one Pages project, `free-tier-portfolio-website`, through repository-scoped Git integration.
  The first successful production deployment used `main` source
  `0e9ff4a88a6bc784dd1352e57afd6dcb8cd58546` and is available at
  `https://free-tier-portfolio-website.pages.dev`.
- The verified static contract uses framework `None`, repository root,
  `pnpm install --frozen-lockfile --ignore-scripts && pnpm build:web`, and `apps/web/dist`.
  Automatic `main` deployments are enabled; automatic preview-branch deployments are set to `None`.
  The build cache remains disabled.
- Provider-side configuration contains only the approved build-variable names `NODE_VERSION`,
  `PNPM_VERSION`, `SKIP_DEPENDENCY_INSTALL`, `SANITY_PROJECT_ID`, `SANITY_DATASET`, and
  `SANITY_API_VERSION`. No browser token, draft token, `PUBLIC_` token, credential, or private value
  was configured or recorded here.
- No custom domain, DNS record, analytics, form, deploy hook, webhook, Worker, Pages Function, KV,
  D1, R2, CORS/access-control change, Studio deployment change, Sanity content write, or asset
  upload occurred.
- PDF-M4 is a separately approved external gate. It follows the repository-only PDF-M1 foundation
  checkpoint and does not retroactively change its acceptance criteria.

**Verification:**

- The Pages dashboard shows one successful production deployment from `main` at the approved source
  SHA, automatic production deployments enabled, no deploy hooks, no custom domains, disabled build
  cache, and preview branch control set to `None`.
- Public HTTP verification passed: `/` returns `308` to `/en/`; `/en/`, `/id/`, paired project
  routes, `robots.txt`, and `sitemap.xml` return `200`; an unknown route returns `404`; a
  fingerprinted Astro asset loads with immutable caching while HTML is not immutable.
- Host headers enforce `noindex, nofollow`, frame denial, `nosniff`, referrer policy, and permissions
  policy. No CSP was added. `robots.txt` requests that compliant crawlers do not index the public
  host; this is not access protection for nonpublic material.
- Safe CMS-backed project pages rendered correctly and the browser-delivered HTML scan found no read
  token or local-path marker. Read-only Sanity checks before and after confirmed seven safe records,
  zero drafts, and zero image or file assets.

**Rollback and next gate:**

- The verified deployment at `0e9ff4a88a6bc784dd1352e57afd6dcb8cd58546` is the only current
  prelaunch reference; no provider-side rollback target exists yet. A later owner-approved rollback
  may select an earlier verified Pages deployment in the provider UI. Never move, restore, force-push,
  or rewrite `main`; a correction requires a separately approved forward commit and normal deployment.
- Phase 5 remains paused after Milestone 2. This deployment does not authorize real-content,
  credential, asset, evidence, translation, or publication work.
- The local PDF-M4 documentation checkpoint requires its own exact push approval; no pull request,
  merge, or branch cleanup is authorized.

### PDF-M5: CMS rebuild automation deferred

**Status:** `Deferred: automation not configured`.

**Evidence and decision:**

- One bounded Cloudflare Deploy Hook was created for an approved automation test. It never produced
  a verified deployment.
- Two bounded trigger attempts were inconclusive. A read-only investigation found no proof of a
  malformed URL or provider warning, but the available dashboard evidence and test observability
  were insufficient to establish a reliable end-to-end contract.
- No Sanity webhook was ever created. Automatic Git deployment from `main` remains active, but
  Sanity publication does not automatically rebuild the static site.
- The owner manually deleted the unused hook. Fresh post-deletion verification from known-good
  `main` source `45c16cfe2da5d9594af46eb9b89bbaa2fbac5bf4` found zero remaining Deploy Hooks,
  the deleted hook absent, and no new deployment.

**Boundary and next gate:**

- Future CMS rebuild automation requires a newly approved architecture, explicit secret-handling
  boundaries, exact provider actions, and an observable end-to-end test gate.
- Phase 5 remains paused after Milestone 2. This checkpoint changed no content, asset, environment,
  CORS, DNS, source, access-control, Pages deployment, Studio, or Sanity dataset state.
- The defer-record checkpoint is local-only on
  `prelaunch/cms-rebuild-automation-defer-record`. Push, pull request, merge, hook replacement,
  webhook creation, deployment, and branch cleanup require separate exact owner approvals.

## Phase 5: Fast-Track All-Asset Preparation

**Status:** Local preparation complete; consolidated upload gate pending.

**Boundary and retained external history:**

- Work resumed from the verified Phase 5 local checkpoint under an exact owner-approved local-only
  preparation scope.
- The owner accepted one unintended GitHub deployment record as inert historical state. It remains
  untouched, has no deployment status, changed no Git ref, triggered no known Actions run, and did
  not create or change a Cloudflare deployment, provider configuration, environment, URL, or Sanity
  state. Network reinspection later became unavailable and was not retried through a riskier method.
- No upload, content publication, Sanity write, provider mutation, deployment, or remote Git action
  is part of this checkpoint.

**Preparation result:**

- Inventoried 149 candidate source files: 122 images, 21 PDFs, and 6 Markdown guides, totaling
  200,379,763 bytes. No corrupt, unsupported, or exact duplicate candidate was found.
- Preserved source masters byte-for-byte and created 274 ignored derivative rows: 253 WebP and 21
  prepared PDFs, plus 21 WebP first-page previews. Six sources exceeded their applicable media
  contract and two oversized project PDFs were safely optimized.
- Scrubbed image metadata and prepared PDF metadata, annotations, and attachments. Prepared secure
  contact-redacted CV review candidates while retaining them as yellow because accessibility,
  claims, localization, and public activation remain unresolved.
- Classified all 48 logical candidates as 7 green external destination candidates, 41 yellow managed-file or
  missing-destination candidates, and 0 red. Green means preparation-ready only, never
  publication-approved.
- Corrected stale candidate mappings for `EXP-005` and `ACH-003` from the owner-authored category
  detail while keeping claim verification and publication pending.

**Governance and next gate:**

- Added a private ignored manifest, synchronized the public-safe registers and verification queue,
  recorded the completed preparation batch, and created a draft non-executable consolidated green
  proposal.
- The current green set contains only external-link metadata and therefore expects zero managed
  Sanity image/file assets and zero record-reference changes under an `asset-upload` gate. Link
  integration remains a separate exact decision.

**QA, review, and checkpoint verification:**

- Local browser QA passed at 320, 768, 1024, and 1440 CSS pixels with no horizontal overflow,
  visible broken image, iframe, autoplay, or console warning/error. It covered paired EN/ID media
  labels, 4:5 portrait rendering, missing and unavailable states, disclosure click, visible focus,
  dark/light presentation, and reduced-motion CSS. A real eager 404 fixture activated the quiet
  fallback with no live region. The temporary route and public-media symlink were removed afterward.
- The browser-control layer could not toggle the native `<summary>` using synthetic or coordinate
  keyboard events. Native semantics and visible focus remain intact, but real Enter/Space activation
  is an unresolved Medium verification gap before gallery publication.
- The initial preview budget is 400 KiB for up to six WebP thumbnails. The largest measured prepared
  initial set was 360,770 bytes; the complete derivative library is not a page payload.
- Three read-only specialist reviewers ran. The initial review reported zero Blocker, two High, and
  six Medium findings. The second and final remediation loop removed a credential-specific URL from
  Git, made external-link metadata explicitly ineligible for the upload payload, enforced exact host
  gates and fail-closed verification links, required renderable video posters, added EN/ID media UI
  copy, added robust runtime image fallback, and validated responsive aspect ratios. Final re-review
  reported zero Blocker and zero High; one Medium real-keyboard evidence gap remains. Git status was
  unchanged by every reviewer.
- The production web and Studio build passed with file-read access to the private `Asset/` root
  explicitly denied. The single local checkpoint commit uses subject
  `content: prepare all portfolio assets for review` and parent
  `633e2c33a0471d566305040be147f2f86e7b077c`; its SHA is reported at the owner gate.
- No private path, source asset, derivative, credential-specific URL, or sensitive value enters the
  commit.

## Phase 5: Consolidated Sanity Asset Upload

**Status:** `BATCH-P5-ASSET-UPLOAD-GREEN-001` executed and read-only verified; content publication
remains unapproved.

**Owner gate and frozen scope:**

- The owner confirmed rights, portfolio-use permission, participant consent, curated-selection
  permission, and third-party logo identification use for the private library, while requiring every
  actual visible privacy or confidentiality defect to remain excluded.
- Upload eligibility was assessed separately from publication readiness. The frozen canonical set
  contained 66 prepared WebP images and 3 prepared PDFs totaling 23,924,377 bytes with zero duplicate
  SHA-256 values.
- Seventy-four canonical managed candidates were excluded for visible signatures, QR codes,
  credential identifiers, private or production screens, operational details, vehicle identifiers
  requiring masking, or unnecessary standalone-logo status. External destinations were not uploaded.

**Execution and verification:**

- Pre-upload state was seven published content documents, zero drafts, zero image assets, zero file
  assets, and zero identical existing payloads.
- All 69 frozen payloads uploaded successfully with zero reuse, retry, or failure. Read-only checks
  verified every asset ID, type, MIME, byte size, hash, CDN URL, and image dimensions or PDF page
  count. Post-upload state is 66 image assets and 3 file assets.
- The seven existing content records retained their exact revisions and update timestamps, zero
  drafts remain, and no content document references any uploaded asset. No content record, schema,
  environment, CORS/access control, provider resource, deployment, or GitHub state changed.
- The exact public-safe asset results are recorded in
  `content-source/SANITY_ASSET_UPLOAD_REGISTER.csv`; the path-bearing execution manifest remains
  ignored beneath `Asset/`. Source masters remained hash-identical and no private file entered Git.

**Next gate:**

- Uploaded assets remain publication-pending and unreferenced. Professional claims, final bilingual
  copy, content mapping, public CV activation, accessibility, external destinations, and integrated
  website QA require one separate exact content-publication approval.
- Additional upload, replacement, cleanup, or asset deletion is not authorized. The local checkpoint
  must remain unpushed until a separate exact remote Git gate.

## Phase 5: Consolidated Bilingual Content Publication and Integrated QA

**Status:** `BATCH-P5-CONTENT-PUBLISH-ALL-001` executed and verified; local repository checkpoint
ready for its release gate.

**Publication result:**

- Froze the exact approved payload at source HEAD
  `b32130fb9594fba055f7eb9cac3b07ffed5c8016` with SHA-256
  `fd9358c90d8672a50d50c9d18b1b4bb1dd0a1b1c6ee0681bcbc76a2e359eaa6a`.
- Updated 5 and created 20 bilingual published documents. Read-only verification confirmed 27
  published documents, zero drafts, 66 image assets, 3 file assets, 38 references to 35 unique
  images and all 3 files, and 31 unreferenced images.
- Kept PRJ-004 and its five activities deferred because no accepted slug or child-activity mapping
  exists. No schema, slug, asset upload, delete, unpublish, private contact, or provider state
  changed.
- Applied one bounded wording remediation to eight public captions to remove internal lifecycle
  terminology without changing document or asset counts.

**Repository integration and QA:**

- Expanded the published-only query, runtime validation, typed adapter, responsive media,
  bilingual experience and credential presentation, project evidence, CV/PDF, poster-first video,
  GitHub, related-content, missing-state, and unavailable-state paths.
- Fixed the static build-only environment read so unprefixed CMS values remain server-only and
  published content replaces fallback only when the complete validated dataset loads.
- Browser QA passed EN/ID at 320, 768, 1024, and 1440 CSS pixels; all six localized project detail
  routes passed overflow, canonical, hreflang, external-link, PDF-action, image, iframe, theme,
  keyboard-disclosure, and console checks.
- Formatting, lint, strict type checks, 36 tests, schema validation, web/Studio production builds,
  reduced-motion verification, privacy scans, and diff checks passed.

**Specialist review:**

- Three read-only reviewers reported one High and four Medium findings in aggregate. The final
  remediation loop completed full 27-document audit mapping, synchronized progress boundaries,
  corrected media heading hierarchy and Indonesian landmark copy, and established stable generated
  poster contrast.
- Final re-reviews reported zero Blocker, zero High, and zero Medium. Git status was unchanged by
  every reviewer run.

**Release boundary:**

- The checkpoint remains local. No push, pull request, merge, deployment, provider configuration,
  environment change, secret operation, branch deletion, or additional Sanity write occurred during
  repository integration and QA.
- The next boundary is the exact owner-controlled Phase 5 release gate.

### Production Discrepancy Remediation (BATCH-P5-PRODUCTION-REMEDIATION-001)

**Status:** Completed locally; local repository checkpoint ready for its release gate.

- The first local implementation was commit `0ad7a1181639cff1b1dcbaf057bcc4f8504916fa`, originally based on the pre-squash branch head `b36cfd830fcd33b4278e355b6a3bbb120cc033b4`.
- The same implementation was transplanted onto authoritative post-squash main `118d07e60c6f8598c65d12c6762c0ec9ab836bd2`.
- The old branch and commit remain intact. No remote or external mutation occurred.

**Plan:**

- Execute a one-time Antigravity local-writer exception to remediate Phase 5 production layout density and missing fields without schema or Sanity mutations.
- Map and render `responsibilities`, `achievements`, `employmentType`, and `location` safely via progressive disclosure.
- Apply compact focal styles to the experience interface and preserve `initialCount={2}` for the EvidenceGallery.

**Files changed:**

- `apps/web/src/lib/sanity/queries.ts` (added achievements)
- `apps/web/src/lib/sanity/types.ts`
- `apps/web/src/lib/sanity/validation.ts`
- `apps/web/src/types/home.ts`
- `apps/web/src/lib/sanity/adapters.ts`
- `apps/web/src/components/sections/CareerJourney.astro`
- `apps/web/src/styles/global.css`
- `apps/web/tests/queries.test.mjs`, `apps/web/tests/content.test.mjs`

**Checks and QA:**

- Automated checks (format, lint, type-check, tests, schema:validate, build) passed.
- Browser QA verified progressive disclosure flow, compact density, localized EN/ID parity, and keyboard accessibility.

**Release boundary:**

- The checkpoint remains local. No schema, Project slug, Sanity CMS state, or private credential was mutated.
- The next boundary is the exact owner-controlled Phase 5 remediation release gate.

## Phase 5: Presentation Hardening (BATCH-P5-PRESENTATION-HARDENING-002)

**Status:** Current-data presentation accepted by the owner; consolidated pre-review verification in
progress.

**Authority and baseline:**

- The owner approved the exact Level C implementation blueprint. Codex is restored as sole repository writer and release owner; Antigravity is restricted to independent read-only QA.
- Verified PR #14 merged and created `phase/5-presentation-hardening` directly from authoritative `origin/main` `9684fd03a494b1e3f1b4bbe0ad1db655a8082592` without modifying the completed Phase 5 branches.
- Audited and retained the valid PR #14 responsibility, achievement, employment-type, localized-location, progressive-disclosure, privacy, responsive, test, and documentation paths. Corrected the known initial-gallery minimum defect.

**Implementation:**

- Refined the spatial homepage into a focused, progressively enhanced one-panel workspace and recorded ADR-023 as the bounded partial supersession of ADR-012.
- Added paired Experience and Credentials archives, localized navigation, canonical and hreflang metadata, locale equivalents, recovery records, and sitemap entries.
- Added optional Project preview covers derived only from existing gallery references, context-aware thumbnail and collage APIs, two-item initial Experience collages, native remaining-image disclosure, and compact credential media.
- Reduced duplicate and internal-facing visitor copy while preserving alt text, link purpose, CV metadata, privacy-safe unavailable states, approved-resource safety, media ownership/publication/privacy data, and required credits.
- Preserved static Astro output, tokenless published-only CMS reads, draft exclusion, runtime validation, static fallback, Project routes, production origin, indexing policy, and dependency set.

**Boundary and residual concern:**

- No Sanity record, schema, publication state, asset, asset reference, dependency, lockfile, secret, provider, or remote Git state changed.
- Tokenless read-only dataset inspection found no existing Project `gallery` or image-kind evidence references for the three published Projects. Their optional cover presentation therefore uses the safe fallback until a separately approved content/reference decision exists.
- The required format, lint, type, 46-test, schema, production-build, and diff checks passed. Codex smoke covered all ten required routes at 320px and 1440px with EN/ID and light/dark samples; route structure, content counts, collage behavior, overflow, image fallback, console, metadata, privacy, and browser-token checks passed.
- Antigravity comprehensive read-only QA reported zero Blocker, High, Medium, or Low findings and
  two informational notes requiring no remediation. That report remains the interim technical
  baseline. After the separate Credential gallery implementation and incremental visual
  refinement, the owner accepted the current layout as a checkpoint for the content and media that
  are currently approved, published, and available.

## Phase 5: Credential Media Gallery Repository Implementation

**Status:** Repository implementation, exact owner-approved content-reference mutation, and local
verification complete; current-data presentation accepted by the owner.

- Added the optional manually ordered Credential `gallery` field with an eight-image maximum while retaining the existing primary preview image.
- Added schema and runtime rejection for gallery duplication, primary-preview repetition, decorative gallery items, incomplete EN/ID metadata, unsafe media, and publication-unapproved media.
- Chose narrow runtime failure: any invalid gallery collection becomes empty in both locales while otherwise valid Credential text and primary preview remain available.
- Added Credential-only crop/hotspot query data and hotspot-to-focal-point mapping without changing Project queries.
- Added a compact three-image collage with native remaining-media disclosure on dedicated Credentials routes. Homepage presentation explicitly removes the complete gallery payload.
- Consolidated formatting, lint, type-check, 54-test, schema, production-build, and diff verification passed. Pre-mutation browser QA covered EN/ID, light/dark, 320px/768px/1440px layouts, keyboard focus, overflow, image fallback, duplicate IDs, and console output; the dataset at that checkpoint correctly rendered zero Credential galleries because no gallery references existed yet.
- The owner separately approved the frozen payload with SHA-256 `dcaa804c12d3eedf081e7e40e6015ed6bb4f4fd050bc19a1ec318e8ed52436b1` after repository implementation.

**Mutation execution and verification:**

- Fresh read-only preflight matched the frozen state: 27 published content documents, zero drafts, 66 images, three files, 38 asset references, 35 uniquely referenced images, 31 unreferenced images, 17 existing target assets with zero referring documents, four absent galleries, unchanged primary previews, and revision `Ms2tsLQBpd1vUA2A17oyYV` on all destinations.
- One revision-guarded transaction `Jee9DuSlJ704SNbO3YtDJ5` set only `gallery` on `credential-edu-002`, `credential-ach-001`, `credential-ach-002`, and `credential-ach-003`, with 6, 4, 6, and 1 items respectively. Every resulting document revision is `Jee9DuSlJ704SNbO3YtDJ5`; no rollback was required.
- Independent public verification matched the complete frozen arrays and expected post-state: 27 published content documents, zero drafts, 66 images, three files, 55 asset references, 52 uniquely referenced images, and 14 unreferenced images. Every target asset refers only to its intended Credential, all primary previews remained unchanged, and no unrelated document revision changed.
- Production-equivalent builds and browser QA passed across `/en/credentials/`, `/id/credentials/`, `/en/`, and `/id/` at 320px, 768px, and 1440px, light and dark themes. The dedicated routes expose compact native-disclosure galleries with complete alt text and hidden repetitive captions/credits; homepage output omits the gallery payload.
- The existing fixed-rail/header proximity at tablet and desktop widths remains an owner-directed visual-refinement item. It predates and is independent of the bounded gallery mutation.
- No draft, asset upload/delete, Project or PRJ-004 change, dependency, lockfile, push, pull request, deployment, provider, DNS, CORS, environment, or secret action occurred.

### Owner-accepted current-data presentation freeze

**Status:** Consolidated pre-review verification complete; local checkpoint commit pending.

- The owner considers the current layout sufficient for all content and media that are currently
  approved, published, referenced, and available. This is an accepted current-data presentation
  checkpoint, not a declaration that every Asset source is published, every Sanity asset is
  referenced, all future visual refinement is complete, or all Phase 5 content work is complete.
- The four Credential galleries remain published with exactly 6, 4, 6, and 1 ordered gallery
  references. Their 17 references leave 52 of 66 images uniquely referenced and all three files
  referenced.
- Fourteen uploaded images remain intentionally unreferenced. Repository upload-register
  reconciliation maps all 14 to the five deferred PRJ-004 activity groups in counts
  `3/3/3/2/3`. No PRJ-004 document, slug, route, or asset reference exists.
- PRJ-004, its five candidate activities, excluded source candidates, and content awaiting
  verification, privacy, consent, redaction, bilingual-copy, or publication approval remain
  deferred. Future layout refinement resumes only after additional content or media is separately
  approved and available.
- This branch does not represent publication of every item from the private Asset source. No
  further Sanity mutation, asset-reference change, schema, dependency, lockfile, route, provider,
  deployment, or remote Git action is authorized by this checkpoint.
- Consolidated checks passed: scoped milestone formatting, lint, type-check, 54/54 tests, schema
  validation, the tokenless production Web and Studio builds, and `git diff --check`. The
  repository-wide format command was additionally run; its only failure was the unrelated empty
  untracked `kwkwwk.md`, which remains untouched and excluded from the checkpoint.
- Browser smoke passed 44 route/viewport combinations across 320px, 768px, 1024px, and 1440px,
  including the required EN/ID home, Experience, Credentials, Project archive, representative
  Project detail, and 404 routes. Light/dark parity, mobile navigation, keyboard focus, native
  gallery disclosure, empty Publications behavior, canonical/hreflang on localized routes,
  horizontal overflow, rendered-image failures, and console errors were checked.
- The next boundary is one coherent local checkpoint commit and then Antigravity final read-only
  QA. Push, pull request, merge, and deployment approval remain absent.

## Phase 5: All Approved Asset Website Integration (BATCH-P5-ALL-ASSET-WEBSITE-INTEGRATION-001)

**Status:** Complete local implementation and approved Sanity mutation; release actions remain
gated.

**Source and decision audit:**

- Inventoried the complete frozen 482-file, 262,410,651-byte `Asset/` snapshot with stable IDs,
  hashes, media metadata, ten exact duplicate groups, 116 near-duplicate groups, and one
  implementation disposition per source.
- Visually inspected 385 images and 134 pages across 42 PDFs. Sensitive or unnecessary original
  evidence remains outside Git and Sanity; every such source contributes through a safe derivative,
  extracted fact, grouped duplicate, or factual Media Library provenance.
- Recorded ADR-025 and an exact batch execution/rollback contract.

**Repository implementation:**

- Added bounded `projectActivity` and `mediaItem` schemas plus optional Credential `issuerLogo`.
- Extended published-only queries, typed raw contracts, validation, and adapters for Project
  activities, issuer logos, and Media Library records.
- Added paired Media Library routes, PRJ-004 fallback content, activity presentation, issuer-logo
  presentation, footer navigation, responsive styling, focus treatment, reduced-motion handling,
  and route/content/mutation guard tests.
- Preserved static output, EN/ID parity, no-JavaScript semantics, publication/privacy metadata,
  safe missing states, and the existing dependency/lockfile set.

**Approved mutation:**

- The guarded dry-run verified the exact public pre-state before any write.
- The apply run uploaded ten prepared WebP logos and used one revision-guarded transaction to
  publish PRJ-004 with five activities and fourteen existing activity-image references, update
  issuer logos on eleven Credentials, and publish ten aggregate Media Library records covering all
  482 inventory IDs.
- The script's immediate audit verified 38 published documents, zero drafts, 76 images, three
  files, four Projects, ten Media Library records, five PRJ-004 activities, fourteen activity-image
  references, eleven Credential logo references, and zero unreferenced images. No rollback was
  required.

**Verification boundary:**

- The production-equivalent web build generates twenty static pages and retains all five PRJ-004
  activity narratives in the network-safe static fallback.
- Browser visual QA could not be controlled in this run because the active browser safety policy
  rejected local-preview access after a prior controlling instruction. No browser or headless
  workaround was used.
- No push, pull request, merge, deployment, Cloudflare, DNS, CORS, environment, secret, dependency,
  lockfile, or branch-cleanup action occurred. ADR-022 still requires an explicit future
  rebuild/deployment gate after a CMS publication.

**Read-only review and remediation:**

- Three local read-only specialist reviews found two High, four Medium, and two Low findings in the
  first pass. All were accepted: tracked register privacy, exact mutation integrity, complete
  provenance validation, navigation state, touch target sizing, list semantics, and generated
  bytecode hygiene.
- A second read-only pass found exact per-group provenance, public post-state visibility, and
  semantic-list grid selectors requiring correction. All were accepted and remediated in the second
  and final permitted loop.
- Controlled browser QA and external Antigravity QA remain pending because the active local-browser
  safety policy rejected preview control. No workaround, remote action, or additional CMS mutation
  was used.

### Milestone 5.8: Governance Hardening & All-Approved Asset Integration

**Status:** Completed locally; ready for Phase 5 local checkpoint commit

**Summary:**

- Executed AI-Neutral Repository Governance Hardening (ADR-030 and ADR-031).
- Formalized `docs/GOVERNANCE.md` as the single authoritative source of truth for all repository governance rules, capability-based AI permissions, context loading order, verification precedence hierarchy, disaster recovery procedures, and repository health standards (`GREEN`, `YELLOW`, `RED`).
- Streamlined `AGENTS.md`, `docs/PROJECT_GUIDE.md`, and `README.md` to reference `docs/GOVERNANCE.md`.
- Completed all-approved asset integration for 482 frozen source assets in `ASSET_MASTER_INVENTORY.csv` and `ASSET_WEBSITE_USAGE_REGISTER.csv`.
- Verified PRJ-004 case study, 5 activities, 10 organization logos, 14 activity images, paired `/en|id/media/` archives, and 11 credential issuer marks.

**Verification results:**

- `pnpm type-check`: 0 errors, 0 warnings, 0 hints across 80 Astro files and Studio TypeScript files.
- `pnpm lint:repo`: Passed 100% with `--max-warnings=0`.
- `pnpm test`: 59 of 59 test suites passed (100%).
- `pnpm build:web`: 20 static HTML pages generated in 334ms.
- Repository Health: 🟢 **GREEN**.

### Phase 5: Official Closeout & Completion Checkpoint

**Status:** OFFICIALLY COMPLETED & CLOSED

**Summary:**

- All Phase 5 exit criteria have been 100% satisfied.
- Real content migration, asset integration, presentation hardening, and AI-neutral governance refactoring are complete and verified.
- The repository documentation (`GOVERNANCE.md`, `AGENTS.md`, `PROJECT_GUIDE.md`, `DECISIONS.md`, `ROADMAP.md`, `PROGRESS.md`, `PHASE_LOG.md`, `README.md`) is 100% synchronized with the actual implementation state.
- Repository Health is 🟢 **GREEN**. Ready for Phase 5 local checkpoint commit and Phase 6 planning.

### Phase 6: Milestones 6.0 through 6.8 Execution & Production Readiness

**Status:** Completed locally; ready for Phase 6 local checkpoint commit and owner gates

**Summary:**

- Executed Milestone 6.0 (Production Domain & DNS Readiness), Milestone 6.1 (SEO & Brand Identity Foundation), Milestone 6.2 (Cloudflare Headers & Caching), Milestone 6.3 (Schema.org JSON-LD Person/WebSite/Breadcrumb), Milestone 6.4 (Performance & Edge Cache), Milestone 6.5 (Privacy-first Analytics Preparation), Milestone 6.6 (Contact Path Readiness), Milestone 6.7 (Production Search Indexing Preparation), and Milestone 6.8 (Disaster Recovery Runbook `docs/DISASTER_RECOVERY.md`).
- Added production SVG favicon `public/favicon.svg`, web app manifest `public/site.webmanifest`, default OpenGraph social preview asset `public/images/og-default.svg`, and updated `public/robots.txt` for production indexing (`Allow: /`).
- Enhanced `apps/web/src/lib/metadata.ts` and `BaseLayout.astro` with OpenGraph images, Twitter large summary cards, and JSON-LD structured data.

**Verification results:**

- `pnpm format:check`: Passed 100% (All matched files use Prettier style).
- `pnpm lint:repo`: Passed 100% with `--max-warnings=0`.
- `pnpm type-check`: 0 errors, 0 warnings, 0 hints across 80 Astro files and Studio TypeScript files.
- `pnpm test`: 59 of 59 test suites passed (100%).
- `pnpm build:web`: 20 static HTML pages generated in 318ms.
- Repository Health: 🟢 **GREEN**.

## Authoritative main baseline reconciliation: 2026-08-10

**Status:** Complete locally; owner review required before any remote action

### Baseline and Git safety

- Synchronized local `main` with `origin/main` at
  `c428d26f2b8a9123612b9991abb62cd2af2519c3` and verified the latest CI success before creating
  `review/main-baseline-reconciliation`.
- Recorded and deleted only the owner-authorized local rejected branches:
  `design/m1-note-revision-polish` at `118b6375b99624e17e5ebe1631e972375a0efdf6` and
  `design/m1-cinematic-portfolio-rebuild` at
  `0b7a79cd45bcf7929daafde210eb0ea5ee8daaa9`.
- Confirmed that neither rejected branch was current, attached to another worktree, or present as a
  remote branch. No remote ref, tag, worktree, or accepted baseline changed, and no rejected visual
  work was imported.
- Reconstructed the accepted linear history through PRs 15 to 17 and the direct post-release commits
  ending at `c428d26`.

### Repository reconciliation

- Re-established `docs/GOVERNANCE.md` as the sole durable governance authority, kept `AGENTS.md`
  concise, and separated durable architecture, roadmap, current status, history, deployment,
  recovery, onboarding, and release notes by document responsibility.
- Made capability and one-writer rules provider-neutral while retaining exact owner gates. Updated
  repository skills and optional read-only reviewer adapters without giving them independent
  authority.
- Restored Project limitation disclosures, localized rail titles, Credential locale hashes, safe
  malformed-hash handling, Media Library discoverability, and no-JavaScript reading behavior.
- Removed an unapproved contact path, an unreviewed portrait caption, and an unsupported structured
  data claim. Hardened JSON-LD serialization and CMS asset-size validation.
- Made eligible image previews keyboard accessible, including images revealed from initially hidden
  Credential records, while preserving focus, Escape behavior, page overflow, reduced motion, and
  the accepted deployed visual system.
- Added one canonical local/CI verification command, Studio schema validation in CI, immutable
  GitHub Action references, and focused regression tests.

### Verification and review

- Baseline verification passed format, lint, type, 59 tests, schema validation, web/Studio builds,
  and whitespace checks before implementation.
- Final local verification passed formatter write/check, zero-warning lint, web and Studio type
  checks, 62 tests, Studio schema validation, both production builds, and `git diff --check HEAD`.
- A tokenless read-only public-dataset build generated 20 static pages. Browser QA covered paired
  locales, representative routes and hashes, light/dark themes, keyboard behavior, image fallback,
  no-JavaScript access, and 320/390/768/1024/1440 pixel widths.
- Documentation-link, built-route/resource, secret/private-path, structured-text, case-sensitive
  import, source-map, and Git integrity audits passed.
- Independent read-only reviewers began and ended with identical worktree snapshots. All accepted
  code, accessibility, security/privacy, CI, governance, and documentation findings were corrected;
  focused re-review left no Blocker or High change-set defect.
- A proposed universal `--ignore-scripts` local-install change was rejected because the documented
  provider build boundary is intentionally distinct from verified local/CI installation.

### Residual boundary

- `pnpm audit --audit-level=high` reports 17 High and 15 Moderate transitive advisories, with zero
  Critical. No dependency or lockfile change was authorized; repository health therefore remains
  YELLOW pending a separate owner-gated supply-chain review.
- Browser interaction coverage remains a manual release check rather than an automated CI suite.
- The exact active Cloudflare deployment record and automatic CMS-to-host rebuild path remain
  externally unverified.
- No push, pull request, merge, tag, deployment, provider/DNS change, Sanity mutation, content or
  asset publication, secret handling, dependency change, or additional branch cleanup occurred.

## Focused pre-push contact-policy reconciliation: 2026-08-10

**Status:** Complete locally; owner review required before push

### Contact decision and correction

- Rechecked `CLM-PROFILE-001-CONTACT-EMAIL`, the July publication batch and review, relevant phase
  evidence, the authoritative `main` history, and the current owner instruction. The July decision
  was a historical deferral, not a later revocation. The email entered the accepted `main` baseline
  in `a29899f` and PR #15, while the focused owner instruction now supplies the missing exact
  privacy/publication gate.
- Added `SRC-OWNER-MAINT-CONTACT-EMAIL-001` and
  `BATCH-MAINT-CONTACT-EMAIL-001`, then updated the existing email claim instead of rewriting the
  historical July batch. No Sanity record or asset register was mutated.
- Restored `mailto:hello@example.com` to the existing Contact context within About on both
  locales. Phone and WhatsApp remain private. The approval does not extend to a form, an unredacted
  CV, another file, or unrelated personal data.
- Added focused source, route, and register regression assertions for the exact email, its owner
  approval, private-channel exclusion, batch boundary, and absence of a Sanity mutation.

### Read-only dependency advisory triage

- Ran `pnpm audit --json` without an automatic fix, install, manifest edit, lockfile edit, or package
  override. The frozen graph reported 32 unique advisory IDs: 17 High, 15 Moderate, and zero
  Critical.
- Classified every advisory by package/version, shortest dependency path and path count,
  direct/transitive and production/development status, runtime/browser/build/Studio exposure,
  exploit preconditions, fixed version, upgrade type, breaking-change risk, and recommended action
  in `docs/DEPENDENCY_ADVISORY_TRIAGE.md`.
- Astro is the only directly affected dependency. Its View Transition exploit path is absent in the
  current code. The other affected packages are transitive through lint/build tooling or the
  separate Sanity Studio/CLI. All remediations remain owner-gated, and currently unreachable
  tooling paths are eligible only for explicit time-bounded risk acceptance.

### Verification and boundary

- `pnpm verify` passed `git diff --check HEAD`, format, zero-warning lint, web and Studio type
  checks, 63 tests, Studio schema validation, and both production builds.
- A focused browser smoke against the static build verified one visible exact email link on both
  `/en/#about` and `/id/#about`, zero `tel:`/WhatsApp links, and zero console errors.
- The secret/private-path scan found no credential signature, populated token, tracked private
  directory, tracked private environment file, private key, or exact local filesystem path. The
  remaining `file://` and `.private/` matches are intentional negative-test or policy references.
- Four final read-only reviews found no contact/privacy, UI/accessibility, or advisory-matrix defect.
  Documentation review found one Low trailing-whitespace issue in the new matrix; remediation loop
  1 replaced the hard breaks and the focused recheck passed. Reviewer snapshots were otherwise
  identical before and after. No dependency, lockfile, Sanity, asset, remote Git, provider, DNS,
  deployment, or additional publication action was performed.

## Public reusable-reference completion: 2026-08-21

**Status:** Complete locally on an isolated branch; remote actions remain owner-gated

### Scope and outcome

- Audited the current public repository, its governance, architecture, decisions, roadmap, progress,
  historical checkpoints, deployment/recovery contracts, CI, package scripts, and the three prior
  archival documentation commits.
- Preserved the owner's two unrelated uncommitted UI files in the original checkout by performing
  this milestone in an isolated temporary clone based on the latest observed GitHub `main`.
- Added the MIT license, contribution policy, security policy, pull-request template, reusable
  architecture/trust-boundary diagrams, and a provider-neutral adaptation guide.
- Expanded the README with CI/license badges, technology marks, learning outcomes, free-tier cost
  boundaries, a Mermaid system diagram, corrected clone commands, and clearer adopter navigation.
- Reconciled current documentation so historical provider observations are not presented as a live
  deployment and corrected the retired custom-domain spelling.
- Reframed README, governance, setup, deployment, recovery, roadmap, progress, project-guide, and
  Studio documentation around a public reusable reference rather than an active personal project.
  Historical identity/content remains sample evidence only and is explicitly replaceable by adopters.

### Verification and boundary

- A frozen dependency install passed the repository's 1,413-entry supply-chain policy check.
- `pnpm verify` passed formatting, zero-warning lint, Astro and Studio type checks, all 63 tests,
  Sanity schema validation with zero warnings/errors, a 20-page static web build, and the standalone
  Studio build.
- `git diff --check` passed. The change set contains documentation and repository-community files
  only; it does not change application code, dependencies, lockfiles, content, assets, provider
  configuration, or the newer independent website.
- No push, pull request, merge, release, template-setting change, topic change, deployment, CMS
  mutation, provider action, or branch cleanup occurred in this local checkpoint.

### Public repository presentation follow-up

- Renamed the public repository to `example-user/free-tier-portfolio-website` so its purpose is clear at
  a glance, while GitHub retains redirects from the former repository name.
- Enabled GitHub's template-repository setting, added focused technology and architecture topics,
  and completed the README header with Astro, TypeScript, Tailwind CSS, Vite, Sanity, Cloudflare
  Pages, Node.js, pnpm, CI, and MIT badges.
- Updated every active clone command, CI badge URL, and canonical repository-name reference. No live
  deployment or package was created merely to populate an empty GitHub sidebar section.
