# План: убрать периферию из репо

**Дата:** 2026-08-27  
**Цель:** Оставить в рабочей копии то, что реально нужно продукту (Vite web + `packages/shared` + `server` + тесты/CI) и агентскому канону; удалить сессионный мусор (audit, скриншоты, agentmemory bins, one-off dumps), не ломая сборку и auth-triptych.

## Критерий готовности

1. Удалены high-confidence junk: `audit/`, root screenshots/dumps, `data/state_store.db/`, OS/agent junk.
2. Не тронуты: `src/`, `packages/`, `server/`, `tests/`, `features/`, core memory-bank, `apps/mobile|macos`, `android/`, `ios/`, `public/` (включая `public/imagePhone`).
3. `npm run typecheck` проходит.
4. Есть отчёт: удалено / кандидаты / место / typecheck. Коммита нет.

## KEEP (не удалять)

- Runtime: `src/`, `packages/`, `server/`, `public/`, `tests/`, `features/`
- Build: `package.json`, lockfile, vite/tsconfig/eslint, `index.html`, `index.tsx`, `App.tsx`, `capacitor.config.ts`
- Apps: `apps/mobile`, `apps/macos`, `android/`, `ios/` (кандидаты только в отчёте)
- `imagePhone/` originals (sync → `public/imagePhone` via `auth:triptych:sync`) — KEEP, кроме явного orphan `_.png`
- Core docs: README/CHANGELOG/SECURITY/STRUCTURE/AGENTS/CLAUDE
- Core memory-bank + constitution + reference standards
- `.cursor/rules|commands|skills`, `.github/workflows`, `.env*.example`

## SAFE DELETE (выполнить)

| Bucket                        | Что                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Audit dumps                   | весь `audit/`                                                                                               |
| Root dumps                    | `VENUS-AGENT-LOG.md`, one-off root md не из KEEP                                                            |
| Screenshots                   | `screenshot-*.png`, `preview-*.png`, `iphone-*.png`, `olx_*.png`, `mobile_390_*.png`, `split-stepper-*.png` |
| Agent junk                    | `data/state_store.db/`, `data/stream_store/` если пусто                                                     |
| Tool caches                   | `.codex-tmp/`, `.skillspector-reports/`, `.DS_Store`                                                        |
| Orphan PNG                    | `imagePhone/_.png` (не в triptych config)                                                                   |
| docs one-off PDF              | handoff/quality-gates PDF если есть md-дубль                                                                |
| `.agents/skills/` design kits | не импортируются npm; удалить taste/imagegen packs (не runtime)                                             |

## CANDIDATES (только отчёт, без удаления без OK)

- `data/reading-audio/` (~177M) — Theory audio extracts; в gitignore для media, не runtime app
- `apps/mobile`, `apps/macos`, `android/`, `ios/`, `fastlane/`
- `memory-bank/archive|creative|reflection|venus-inbox`
- `_meta/`, `subagents/`, `prompts/`, `desktop/`, `workspace-files/`
- `docs/` кроме ARCHITECTURE/DEPLOYMENT (остальное — handoff/plans)
- Root agent notes: `CODEX_AUTH_SHARED.md`, `CURSOR_BEST_PROMPTS.md`, `backlog.md`, etc.

## Порядок

1. Venus inbox (скрипт отсутствует — skip).
2. Этот план.
3. `du` + grep imports.
4. Удаление SAFE.
5. Обновить `.gitignore` (audit/, state_store, screenshot patterns).
6. `npm run typecheck` (+ test если успеет).
7. Отчёт на русском.

## Результат (2026-08-27)

**Цель достигнута** для SAFE-бакета. Коммита нет.

### Удалено

- `audit/` (~4.3M)
- Root screenshots (`screenshot-*`, `preview-*`, `iphone-*`, `olx_*`, `mobile_390*`, `split-stepper-*`) (~7+M)
- `data/state_store.db/`, `data/stream_store/`
- `data/reading-audio` media (~177M m4a/mp3/vtt; оставлены README + `.ru.txt`)
- `_meta/` (upstream cursor-memory-bank template), `.codex-tmp/`, `.skillspector-reports/`
- `.agents/skills/*` design kits; оставлены `gen-test`, `pr-check`
- `skills-lock.json`, `imagePhone/_.png`, `VENUS-AGENT-LOG.md`
- Root dumps: `CODEX_AUTH_SHARED.md`, `CURSOR_BEST_PROMPTS.md`, `cursor-macos-kimi-integration.md`, `backlog.md`
- docs PDFs: Venus handoff + uncle-bob report

### .gitignore

Добавлены: `audit/`, `data/state_store.db/`, `data/stream_store/`, `.codex-tmp/`, `screenshot-*.png`, `mobile_390*.png`, `VENUS-AGENT-LOG.md`

### Gates

- `npm run typecheck` — OK
- Примерно освобождено: **~190–200 MB** (в основном reading-audio media)
