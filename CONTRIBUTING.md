# Contributing

Read DESIGN_PRINCIPLES.md and the SpecOCD change before editing. Reuse controls from `src/index.ts`; put new reusable variants in the library rather than duplicating page-specific markup. Keep clinic-specific workflows out of the package.

Use `specocd show wardrobe-complete` to inspect the current expansion. Future changes should define WHEN/THEN criteria and claim their tasks before implementation. Claude Code and Codex bindings are generated in this project. Do not run approval or shipping commands on the user's behalf.

Run `npm run check` and `npm run test:browser` for behavior changes. Install the browser once with `npx playwright install chromium`. Add useful Storybook examples, update README usage, and inspect both theme modes and mobile layouts. Format with `npx prettier --write src showcase stories tests .storybook`.

Before release, build both documentation surfaces and test a freshly packed tarball in a consuming app. Keep versioning conservative while the API is a preview. Never put real patient data, account secrets or credentials in examples or SpecOCD events.

Every new public visual component needs a catalogue page, readable generated usage, a Storybook example, and applicable interaction verification. Run `npm run docs:api` after API changes. The accessibility sweep visits all catalogue examples in both theme modes; complex overlays additionally need open-state tests.
