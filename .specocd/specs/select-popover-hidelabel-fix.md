# select-popover-hidelabel-fix

Baseline requirements. Folded in from changes on archive.

<!-- from change: select-popover-hidelabel-fix, archived 2026-09-27T07:39:21.912Z -->

## R1: Select popover fits its widest option

- **WHEN** a `Select`/`MultiSelect`/`ComboBox` popover is opened and its
  trigger is narrower (content-sized, e.g. in a toolbar) than its widest
  option label
- **THEN** the popover grows to fit that label on a single line instead of
  wrapping, never shrinking below the trigger's width, and any option that
  would still exceed the viewport-width cap is truncated with an ellipsis
  rather than wrapping

## R2: Select/MultiSelect label can be visually hidden

- **WHEN** a consumer renders `Select` or `MultiSelect` with `hideLabel`
- **THEN** the control keeps its accessible name (label still wired via the
  underlying `aria-labelledby`) but the visible label is removed from layout
  flow, so the control sits flush with adjacent unlabeled controls (e.g.
  buttons) in a horizontal toolbar

## R3: Regression coverage and release

- **WHEN** the change is handed off
- **THEN** both fixes have Playwright regression coverage that fails against
  the pre-fix CSS/props, a Storybook story demonstrates the toolbar usage,
  `npm run check` and `npm run test:browser` pass, and the package version is
  bumped to a new patch release (`0.2.1`) with a clean `npm pack --dry-run`
