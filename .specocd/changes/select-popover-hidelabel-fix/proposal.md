---
schema_version: 1
change: select-popover-hidelabel-fix
feature: select-popover-hidelabel-fix
type: fix
status: draft
approved: true
created_at: 2026-09-27T07:22:53.549Z
approved_at: 2026-09-27T07:37:42.813Z
branch: main
---

<!-- type: feature or fix. Decides the branch prefix: feature/… or fix/… -->
<!-- feature: which baseline spec in .specocd/specs/ this folds into on archive. -->
<!-- Point several changes at the same feature to grow one baseline spec. -->

# select-popover-hidelabel-fix

## Why

Two bugs reported against the published `react-wardrobe@0.2.0` package by a
downstream consumer: (1) `Select`'s popover is capped to the trigger's width,
so a compact/toolbar-sized trigger wraps any longer option label across
multiple lines; (2) `Select`/`MultiSelect` always render a visible stacked
label, so mixing them into a horizontal toolbar with plain buttons produces a
jagged, misaligned row. Both are confirmed still present in `main`/`src`.

## Scope

In scope: `.rw-select-popover` width behavior (`src/styles.css`), a
`hideLabel` prop on `Select` (`src/controls.tsx`) and `MultiSelect`
(`src/inputs.tsx`), regression coverage (Playwright, Storybook), and a 0.2.1
patch version bump. `ComboBox` shares the same popover CSS class and benefits
incidentally, but its own props/behavior are not otherwise touched.

Out of scope: npm publication (a separate, deliberate step per README/
VERIFICATION.md), `hideLabel` for other labeled inputs (TextField, NumberField,
etc. — not reported), and any clinic-side consumption of the fix.

## Impact

`src/styles.css`, `src/controls.tsx`, `src/inputs.tsx`,
`showcase/catalogue.tsx`, `showcase/main.tsx`, `stories/inputs.stories.tsx`,
`tests/browser/select-regressions.spec.ts`, `package.json` (version).
