# Requirement deltas

## R1: Capped select labels
- **WHEN** a Select option label exceeds the viewport-capped popover width
- **THEN** it stays on one line in a constrained block with working ellipsis and the popover fits the viewport.

## R2: Collection wrapping
- **WHEN** long labels appear in standalone ListBox or CommandPalette options
- **THEN** they wrap rather than inheriting select-only clipping rules.

## R3: Verification and metadata
- **WHEN** this fix is handed off
- **THEN** package-lock root versions match package.json, regression tests cover R1 and R2, and package checks and browser tests pass.
