# Requirement deltas: wardrobe-foundation

## R1: Standalone reusable package
- **WHEN** the library builds and packs
- **THEN** ESM JavaScript, TypeScript declarations and an explicit CSS export are available without embedding React or clinic business logic.

## R2: Consistent components
- **WHEN** a consumer uses the shared controls, table, dialogs and layout
- **THEN** scoped tokens and provider-selected themes define their appearance, with keyboard interaction supplied by accessible primitives.

## R3: Notification presentation
- **WHEN** events arrive through the provider
- **THEN** recent duplicate IDs are suppressed, an inbox and live announcement are updated, and sound remains opt-in; the application owns tenant authorization and durable transport.

## R4: Reviewable showcase
- **WHEN** a developer runs the documented commands
- **THEN** the showcase uses port 6010, Storybook uses 6011, Docker configuration exists, and tests plus release limitations are documented. Publication and clinic integration are separate work.
