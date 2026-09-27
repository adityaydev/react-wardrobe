# Requirement deltas: showcase-version-badge-fix

<!--
Write acceptance criteria as WHEN/THEN so both humans and agents can verify them.
Each requirement gets a stable id (R1, R2, ...) referenced by tasks.
-->

## R1: Version badges always match package.json

- **WHEN** the showcase Gallery (`#showcase`) or docs catalogue
  (`#/components/*`) is built and rendered
- **THEN** both version badges display the exact `version` from
  `package.json` (currently `0.2.1`), read at build time rather than
  hardcoded, so a future version bump never requires a matching manual edit
