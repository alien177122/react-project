---
name: pr-check
description: Run a pre-merge readiness checklist for this repo: tests, lint, secret safety, AGENTS.md UI rules, shared package impacts, server DB impacts, and desktop/mobile deployment considerations.
---

# PR Check

Run and report this checklist before merge.

Checks:

1. `npm test` passes.
2. `npm run lint` passes.
3. No `.env*`, keystore, `.jks`, `.p12`, `.pem`, or `.key` files changed.
4. UI changes respect `AGENTS.md`: fixed type scale, project font stack, design tokens, accessible states, and no inline one-off colors outside the palette.
5. If `server/` changed, confirm whether schema, migrations, auth, rate limiting, or persistence behavior changed.
6. If `packages/shared/` changed, confirm shared types, exports, and dependent app imports are still valid.
7. If web UI changed, consider `npm run build` and `npm run test:mobile`.
8. If desktop or mobile code changed, state whether Electron/macOS or Android/iOS rebuilds are needed.

Output format:

- `PASS`, `FAIL`, or `WARN` per item.
- Include exact command failures and file paths.
- Keep the summary short and actionable.
