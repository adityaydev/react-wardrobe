# Design principles

1. **One source of truth.** All repeated controls use package components. New variants belong in the library, not page-local button/input CSS. Business workflows remain in consuming applications.
2. **Clear hierarchy.** Serif display headings add character; system sans-serif controls prioritize legibility. Use generous whitespace, visible labels, short helper text and restrained accents. Do not convey status through color alone.
3. **Purposeful depth.** Soft elevation distinguishes overlays. Perspective effects belong to decorative showcase artwork, never form fields or dense data. Respect reduced motion and keep navigation immediate.
4. **Accessible by construction.** Preserve React Aria semantics, keyboard handling, focus rings and overlay focus management. Label icon-only controls. Validate custom themes and compositions with keyboard, screen readers and contrast checks; accessible primitives do not guarantee accessible applications.
5. **Predictable feedback.** Show loading, disabled, invalid, empty and success states. Errors explain recovery. Sound is opt-in, supplemental and brief. Destructive actions require an appropriate application-level recovery or confirmation pattern.
6. **Flexible composition.** Use tokens for branding and providers for theme, density and locale. Avoid exposing clinic-specific models in generic components. Tables own display/sorting, applications own queries, persistence and access rules.

## Adding a component

Confirm it cannot be composed from existing primitives. Define typed props and documented default behavior. Implement all relevant interaction states. Use scoped tokens and theme-aware portals. Add a Storybook example and behavioral tests for meaningful interaction, then test responsive and reduced-motion behavior. Export from `src/index.ts` and document the API.

## Current boundaries

The full inventory is in COVERAGE.md. Specialized integrations such as virtualized collections, rich text editing, color editing, collection reordering, a scheduler and backend transport remain outside these application wrappers. A production scheduler is a separate domain module. Do not imply a completed accessibility certification; manual assistive-technology and consumer integration testing remain part of release review.
