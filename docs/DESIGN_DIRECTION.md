# Accepted Design Direction

## Purpose

This document records the owner-accepted Minimal Cinematic Spatial Liquid Glass foundation that
originated in Phase 3 and now operates under ADR-033. Owner-supplied visual references and the
external visual mockup are design inputs, not templates, production assets, or sources for
professional content. The portfolio must preserve its own information architecture, copy, identity,
accessibility requirements, and implementation constraints.

## Accepted visual contract

- Use one dominant cinematic workspace shell with five primary destinations, Home, About,
  Experience, Projects, and Credentials, rather than a long sequence of interchangeable card grids.
  Contact context remains within About; complete content uses dedicated localized routes.
- Use mineral and graphite tones in light mode, and obsidian and charcoal tones in dark mode.
- Keep navigation icon-first while preserving accessible names and clear active state.
- Apply Liquid Glass selectively. Strong glass belongs only on focal or compact interactive
  surfaces; reading surfaces remain calm and near-opaque.
- Keep workspace panels compositionally distinct so About, Experience, Projects, and Credentials
  communicate their different purposes instead of repeating one card layout.
- Enforce anti-crowding limits: one dominant focal plane, restrained secondary controls, generous
  whitespace, and no unnecessary stacks of translucent surfaces.
- Use only the approved profile media and preserve its accessible fallback; never substitute an
  unreviewed portrait.
- Never fabricate professional content, evidence, metrics, credentials, destinations, or media to
  complete a composition.

## Non-copying boundary

Use the references to discuss principles, atmosphere, hierarchy, material behavior, pacing, and
interaction quality. Do not reproduce or closely trace:

- branding, names, text, logos, marks, or slogans;
- exact page composition, grid, section order, or navigation treatment;
- proprietary imagery, icons, illustrations, video, three-dimensional assets, or textures;
- distinctive color combinations, typography pairings, animation sequences, or signature effects;
- copyrighted visual identity or a combination that could reasonably be mistaken for the source.

When a reference contains an appealing pattern, restate the underlying user need first and design a
new solution using this repository's tokens, content structure, and constraints.

## Six derived principles

Across the six original references, the design adopts six abstract lessons:

1. **Create one clear focal moment.** Each page should establish a dominant idea before secondary
   detail. Expressive material and scale belong near that focal point, not across every card.
2. **Build depth from a small number of planes.** Use a stable page background, a readable content
   plane, and selected elevated or translucent controls. More layers do not automatically create
   more sophistication.
3. **Use editorial pacing.** Alternate concise orientation, evidence, explanation, and reflection.
   Generous whitespace should separate story beats and keep long case studies readable.
4. **Let interaction explain structure.** Navigation state, filtering, disclosure, and transitions
   should clarify where the visitor is and what changed. Decorative motion must remain secondary.
5. **Make project evidence the visual anchor.** Case studies should prioritize problem, role,
   approach, result, evidence status, and learning over ornamental dashboards or unsupported
   metrics.
6. **Express personality through a system.** Character should come from consistent typography,
   spacing, material, color, and motion decisions rather than copied motifs or one-off effects.

## Expressive Liquid Glass

The accepted direction evolves the earlier semi-glass treatment into expressive Liquid Glass. Expressive
means that selected surfaces may show clearer depth, layered highlights, tonal shifts, and restrained
material response. It does not mean maximum transparency or blur.

### Appropriate surfaces

- the global navigation and compact navigation utilities;
- a page hero's supporting visual plane;
- active filters, segmented controls, and small interactive toolbars;
- selected project media overlays and evidence-status treatments;
- bounded transition moments between major page regions;
- modal or lightbox controls if those features enter an approved later scope.

### Stable surfaces

Prefer solid or nearly solid surfaces for:

- long-form case-study copy;
- forms, validation messages, and input controls;
- tables, code, dense metadata, and document previews;
- repeated card grids where glass would reduce hierarchy;
- any surface whose background makes contrast unpredictable.

### Progressive-enhancement contract

1. Start with a readable opaque background, border, and focus style.
2. Add translucency and backdrop filtering only inside a supported enhancement layer.
3. Keep content order, meaning, hit targets, and keyboard behavior identical without the effect.
4. Preserve sufficient contrast in light and dark themes over every allowed background.
5. Do not encode status or affordance through transparency, color, or motion alone.
6. Disable or simplify nonessential transitions under `prefers-reduced-motion`.
7. Treat reduced-transparency preferences as a reason to use the stable surface when the platform
   exposes that preference.
8. Avoid client JavaScript solely to simulate material behavior that CSS can express safely.

## Visual system

### Color

- Use mineral and graphite tones for the light-first foundation and obsidian and charcoal tones for
  the optional dark theme.
- Use accent color to guide attention, not to flood large reading surfaces.
- Derive glass tint, border, highlight, shadow, and fallback colors from shared tokens.
- Test material surfaces against the real background states they will overlay.

### Typography

- Use a strong but concise display hierarchy for page titles and project framing.
- Keep body copy calm, highly readable, and narrower than the maximum layout width.
- Use labels, metadata, and eyebrow text sparingly; they should orient rather than decorate.
- Do not imitate a reference's distinctive typeface or exact typographic composition.

### Layout and spacing

- Preserve generous whitespace and a clear reading path.
- Allow a focal region to break the ordinary grid only when the content remains understandable at
  narrow widths and 200% zoom.
- Keep repeated archives predictable; reserve asymmetry for page orientation or evidence emphasis.
- Use progressive disclosure for secondary metadata and long supporting material.

### Shape and depth

- Reuse a limited radius scale instead of assigning a unique silhouette to every component.
- Separate planes with border, tone, and spacing before adding shadow or blur.
- Keep shadow soft and material-aware; avoid glow that competes with text or focus indicators.
- Do not stack several translucent surfaces over one another when a single grouped plane is enough.

### Motion

- Use motion for state change, spatial continuity, and gentle emphasis.
- Prefer short CSS transitions and bounded reveals.
- Avoid continuous ambient animation, scroll-jacking, cursor replacement, or effects that delay
  navigation and reading.
- The reduced-motion experience must feel complete, not like a broken version of the interface.

## Page application

### Shared shell

Use one dominant cinematic workspace shell. Icon-first navigation may carry the strongest persistent
material treatment, while each workspace panel remains compositionally distinct. Page content should
become calmer and near-opaque as reading density increases. Active locale, current destination, menu
state, and focus must remain clear with or without advanced glass support.

### Profile pages

About, Experience, and Credentials should share orientation, section rhythm, metadata, and
empty-state patterns; Contact context remains within About. Their visual character may vary through
content and composition, not through separate design systems.

### Project archive

Archive cards should make project category, status, summary, and evidence availability easy to scan.
Hover styling must not be the only signal that an item is interactive.

### Case studies

Use a consistent narrative sequence while allowing optional sections:

1. context and project status;
2. problem and objective;
3. role and contribution;
4. approach and constraints;
5. result and supported metrics;
6. evidence availability;
7. challenges and learning.

Missing data must produce an honest omission or explicit unavailable state, never invented filler.

## Accepted calibration and maintenance hardening contract

The owner accepted the Phase 3 visual/workspace direction after focused manual QA. The following
requirements remain binding and must be covered by existing repository evidence or final integrated
hardening rather than inferred from that acceptance:

- one focal hero or project surface;
- one compact interactive glass surface;
- one stable long-form reading surface;
- light and dark themes;
- advanced-effect support and opaque fallback;
- keyboard focus and hover parity;
- narrow mobile layout and 200% zoom;
- reduced-motion behavior;
- no critical meaning dependent on imagery, transparency, or motion.

Acceptance confirms the design contract, not permission to copy any supplied reference or use an
external mockup as a production asset. Accessibility, representative-browser, performance, and
release QA are recurring maintenance obligations rather than deferred Phase 3 deliverables. Apply
them proportionally to every material change and record current evidence in `docs/PROGRESS.md` and
historical results in `docs/PHASE_LOG.md`.

## Review questions

- Is the first focal point obvious without making the page crowded?
- Does the material clarify hierarchy or merely add decoration?
- Is long-form content stable and readable in every theme and fallback state?
- Can keyboard and assistive-technology users identify every interactive state?
- Does reduced motion preserve the full task flow?
- Are unsupported claims, metrics, media, and destinations still absent?
- Is the result recognizably this portfolio rather than an imitation of a reference?
