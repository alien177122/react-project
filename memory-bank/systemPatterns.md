# System Patterns

## Архитектура

- **Thin UI** — бизнес-логика в `packages/shared` (hooks + pure utils)
- **Discriminated unions** для async/UI state (`status: 'idle' | 'loading' | 'ready' | 'error'`)
- **URL as state** — табы, модалки, theory chapter via `useURLState` + query params
- **Component size** — ≤150 lines; split into `*.parts.tsx` + dedicated hooks
- **App entry** — `App.tsx` delegates to `AppShell`; routing/state in shell layer

## Shared package highlights

- `useTrainingProgramV3`, `useCalculatorState`, `useAuthSession`
- `useJournal`, `useSplitConstructor` (newer hooks)
- `packages/shared/src/program/` — program v3 logic
- Limits: `journalLimits.ts`, `splitLimits.ts`, `passwordValidation.ts`
- API: `utils/api.ts`, `api/training-api.ts`

## Server

- `server/app.js` — Express routes
- `server/schema.js` — SQLite schema
- Security: rate limits, CORS for Vercel domains, normalized API errors

## Стили (web)

- CSS custom properties: `src/styles/base/variables.css`
- Modular CSS: `base/`, `layouts/`, `components/` (theory-apple.css for theory chapter)
- BEM-like classes; no styled-components
- Animations: `src/theme/animations.ts`; `useReducedMotion`, `useScrollReveal`

## Mobile patterns (`apps/mobile/`)

- Feature folders: `screens/`, `components/`, `hooks/`, `theme/`, `types/`
- Styles co-located: `*.styles.ts`
- Logic hooks: e.g. `useReadinessScreen`, `useReadinessCardLogic`
- Theme tokens mirror web (`Theme.ts`, navigation theme in `_layout.tsx`)

## Memory Bank integration

- Complexity L1–L4 drives workflow depth (see `.cursor/rules/isolation_rules/`)
- **Always** read `memory-bank/` before **any** agent task (not only `/van`…`/archive` phases)
- Update `tasks.md` + `progress.md` in build/reflect/archive
- Project-specific rule: `.cursor/rules/react-training-memory-bank.mdc` (alwaysApply)
- `cursor-memory-bank-main/` — upstream reference only; canonical files live in `memory-bank/` and `.cursor/`

## Browser preview (agent workflow)

- **Embedded Cursor browser only** — MCP server `cursor-ide-browser`
- Typical flow: `browser_tabs` (list) → `browser_navigate` (URL) → `browser_lock` → interact → `browser_unlock`
- Default dev preview URL: `http://localhost:5173` (`npm run dev`)
- **Forbidden for UI preview:** shell `open`, `xdg-open`, `start` with http/localhost URLs
- Optional enforcement: `.cursor/hooks/browser-preview-guard.mjs` (see `.cursor/hooks.json.example`)

## Security

- JWT server-side; no token/password logging
- SQLite access only through server layer
- Client password rules mirrored in shared utils
