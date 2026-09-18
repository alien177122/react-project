# 03 — Formatting and UI canon

## Code formatting

- Prettier: `.prettierrc.js` (singleQuote, printWidth 100, trailingComma all).
- ESLint + `eslint-config-prettier`; do not fight Prettier with style eslint rules.
- Before PR: `npm run format` on touched files; CI runs lint (full tree may still have legacy debt — Uncle Bob gate uses calc subset).

## UI boundaries

1. Before new/rebuild UI: `memory-bank/reference/README.md` → matching `*-standard.md`.
2. Quiet UI: 4px spacing, semantic tokens, max 2 accents (CLAUDE.md / style-guide).
3. Layout changes → verify iPhone **390–430px** (browser MCP, not system Safari).
4. No ad-hoc hex sprawl; no emoji in product UI.

## Tier C stop

Typecheck + lint of touched files + iPhone verify. Full `npm run lint` clean-up is a separate debt track — do not block product fixes by rewriting all UI lint in one PR.
