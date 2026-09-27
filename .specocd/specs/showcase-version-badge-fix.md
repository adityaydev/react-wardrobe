# showcase-version-badge-fix

Baseline requirements. Folded in from changes on archive.

<!-- from change: showcase-version-badge-fix, archived 2026-09-27T08:05:15.516Z -->

## R1: Version badges always match package.json

- **WHEN** the showcase Gallery (`#showcase`) or docs catalogue
  (`#/components/*`) is built and rendered
- **THEN** both version badges display the exact `version` from
  `package.json` (currently `0.2.1`), read at build time rather than
  hardcoded, so a future version bump never requires a matching manual edit
