---
name: portfolio-visual-review
description: Prepare and compare two or three bounded visual options for the Portfolio Owner Portfolio while preserving the accepted design system, accessibility, performance, privacy, and content truth. Use when a milestone needs a meaningful owner choice between materially different UI directions, not for routine implementation polish.
---

# Portfolio Visual Review

## Bound the decision

1. Read `docs/GOVERNANCE.md`, `AGENTS.md`, `docs/DESIGN_DIRECTION.md`, the current status and accepted
   milestone criteria, and the affected implementation.
2. Identify the single visual question that requires owner choice.
3. Create two or three options that vary only the meaningful decision. Keep content, routes,
   semantics, and unaffected components constant.
4. Do not introduce unapproved assets, claims, logos, evidence, dependencies, or a broader visual
   rewrite.

## Check every option

Review representative desktop and mobile states in light and dark themes. Check keyboard focus,
content reflow, reduced motion, reduced transparency or unsupported-glass fallback, missing media,
and readable opaque surfaces. Use a configured UI/accessibility reviewer only when its effective
sandbox is read-only, and compare Git status before and after its run.

Keep Liquid Glass strongest at focal and compact interactive moments. Keep long-form, dense, form,
table, and evidence surfaces opaque or near-opaque.

## Ask for one choice

Present comparable screenshots or concise visual evidence, the material difference between the
options, accessibility or performance trade-offs, and one recommendation. Ask the owner to choose
one option or name specific traits to combine. Do not continue into a materially different visual
direction without that choice.
