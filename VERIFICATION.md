# Preview verification — 24 September 2026

- `npm run check`: TypeScript, 5 behavioral tests and library/declaration build passed.
- `npm run test:browser`: 2 Chromium scenarios passed. Covered dialog dismissal, dropdown selection, number stepping, calendar opening, notification sound opt-in/mute, theme switching and mobile overflow. Axe scans passed for the light/dark showcase and open calendar after animations settled.
- Desktop, dark and 390px mobile screenshots reviewed from `test-results/` (generated, ignored by Git). Wide tables intentionally scroll inside their container.
- `npm run build:showcase` and `npm run build:storybook`: passed. Documentation/demo bundles produce Vite's size advisory; this is not the size of the library itself.
- `npm pack --dry-run`: package includes ESM, declarations, CSS and license. A local tarball was installed into a separate temporary React consumer; public imports, CSS resolution and server rendering passed. React is external to the library bundle.
- `docker compose config --quiet`: passed. The Docker image has not been built/run in this verification.
- `npm install` reported zero known dependency vulnerabilities at installation time.

Tested with Node 26.7.0 on macOS and the installed React 19. Manual screen-reader checks, Safari/Firefox, React 18, real backend event delivery and clinic integration remain outside this preview's verification. Sound controls were tested in Chromium; subjective volume/device behavior requires human review. Automated accessibility checks are not certification.

No npm publication, remote Git changes or clinic source integration performed. The package name and npm ownership still need confirmation at release time.

# Wardrobe-complete verification — 25 September 2026

- `npm run typecheck`: clean, no errors.
- `npm test`: 11 tests across 2 files (`tests/components.test.tsx`, `tests/extended.test.tsx`) passed.
- `npm run test:examples`: all 63 published catalogue usage snippets type-check against the real package types.
- `npm run docs:api`: generated API for 62 components (`NotificationCenter` takes no props, so it has no entry — a genuine zero, not a generation bug: `showcase/docs.tsx` falls back to an empty props table for it) and 63 runnable examples, one per exported visual component.
- Cross-checked the 63 exports in `src/*.tsx` against the `COVERAGE.md` table: exact match, no missing or undocumented components.
- Read `src/data-grid.tsx` directly to confirm the R2 claims (filtering, sorting, pagination, row selection, column visibility, row expansion, loading/empty states) are implemented, not just documented.
- `npm run build`: library build (Vite + `tsc -p tsconfig.build.json`) passed; `dist/index.js` 54.8 kB (12.5 kB gzip), `dist/styles.css` 25.5 kB (5.9 kB gzip).
- `npm run build:showcase` and `npm run build:storybook`: both passed. Vite's >500 kB chunk-size advisory appears on both (documentation/demo bundles only, not the library itself, consistent with the foundation verification).
- `npm run test:browser` (Playwright/Chromium): 10 scenarios passed, expanded from the foundation change's 2 — covers all catalogue pages rendering without runtime errors, searchable selection/multiselect/command palette activation, drawer focus and grid column visibility, range dates/sliders/tree keyboard interaction, command palette and drawer accessible semantics, and light/dark axe accessibility scans across **all 63 component examples** (`tests/browser/accessibility.spec.ts`).
- `npm pack --dry-run`: 24 files, 28.8 kB packed / 117.7 kB unpacked. Contents are ESM (`dist/index.js`), per-family `.d.ts` files, `styles.css`, README/LICENSE/COVERAGE/DESIGN_PRINCIPLES — no source, no clinic code, no dev/test files.
- `docker compose config --quiet`: passed. As with the foundation verification, the Docker image itself has not been built/run.

Tested with Node v26.7.0 on macOS. Manual screen-reader checks, Safari/Firefox, React 18, real backend event delivery, and clinic integration remain outside this verification, same as the foundation change. Automated accessibility scans (axe) are not certification. No npm publication, remote Git changes, or clinic source integration performed — this repository is not yet a Git repository.

## Review fixes — 26 September 2026

All four review findings are addressed:

- Toasts track hover and keyboard focus independently; dismissal resumes only when both leave. A clock-driven browser regression checks focus retained after pointer exit, hover retained after focus exit, and subsequent dismissal.
- Indeterminate checkboxes display a contrasting dash. A DataGrid regression checks the mixed state and visible indicator in light/dark themes, then clears selection.
- The showcase router observes all hash changes. A regression checks gallery section → documentation → Back → Forward → reload.
- T1–T3 task checkboxes now match the completed claim records. Prior R1/R2 implementation and R3 catalogue evidence remains recorded above; fresh checks below verify the review fixes under R4.

Validation: `npm run check` passed (types, 11 unit tests, 63 standalone usage examples, library/declaration build). `npm run test:browser` passed all 13 scenarios, including the three new regressions and light/dark accessibility sweeps across the component catalogue. Showcase and Storybook builds passed with their existing documentation-bundle size advisories. No publication or clinic integration performed.
