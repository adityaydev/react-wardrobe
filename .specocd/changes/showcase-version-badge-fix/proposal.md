---
schema_version: 1
change: showcase-version-badge-fix
feature: showcase-version-badge-fix
type: fix
status: draft
approved: true
created_at: 2026-09-27T08:02:48.613Z
approved_at: 2026-09-27T08:04:57.492Z
branch: main
---

<!-- type: feature or fix. Decides the branch prefix: feature/… or fix/… -->
<!-- feature: which baseline spec in .specocd/specs/ this folds into on archive. -->
<!-- Point several changes at the same feature to grow one baseline spec. -->

# showcase-version-badge-fix

## Why

The showcase's two version badges ("v0.1 · Preview" in the Gallery navbar,
"v0.2" in the docs sidebar) were hardcoded string literals, not derived from
`package.json`. Each patch/minor bump silently went stale until someone
noticed the site showing an old version (happened twice this session: once
found at v0.1 while actual was 0.2.0, then again at v0.2 while actual was
already 0.2.1).

## Scope

In scope: wiring both badges to read `package.json`'s `version` field
directly at build time, so they can't go stale again. Out of scope:
publishing, deploying, or any other visual/behavioral change.

## Impact

`showcase/docs.tsx`, `showcase/main.tsx` (both now `import pkg from
"../package.json"` and render `` v{pkg.version} ``), `website/` rebuilt to
pick up the fix.
