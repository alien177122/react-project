# Monorepo Structure (web-first)

Краткая карта: где что лежит после реорганизации 2026-05.

## Web core (корень — primary track)

| Путь                     | Назначение                                                                |
| ------------------------ | ------------------------------------------------------------------------- |
| `src/`                   | Vite + React 19 web UI (screens, components, hooks, styles)               |
| `server/`                | Express + SQLite REST API                                                 |
| `packages/shared/`       | `@training/shared` — hooks, utils, program v3, API client                 |
| `tests/`                 | Node test runner suite для shared/server logic                            |
| `scripts/`               | Root dev/infra scripts (PWA icons, public tunnel, files, seed)            |
| `public/`                | Static assets, PWA manifest                                               |
| `memory-bank/`           | Maintainer agent context (reference mirrored in `docs/design-standards/`) |
| `docs/design-standards/` | Public UI design references for contributors                              |
| `.cursor/`               | Cursor commands + isolation rules                                         |

## Platforms (native / desktop shells)

| Путь                       | Назначение                                            |
| -------------------------- | ----------------------------------------------------- |
| `platforms/desktop/`       | `@training/desktop` — Electron shell над web-клиентом |
| `platforms/mobile/`        | Expo Router mobile (Readiness и др.)                  |
| `platforms/macos/`         | React Native Android/macOS + release scripts          |
| `platforms/legacy-mobile/` | Legacy Expo track (не primary mobile)                 |

## Meta (не продуктовый код)

| Путь                             | Назначение                                      |
| -------------------------------- | ----------------------------------------------- |
| `_meta/cursor-memory-bank-main/` | Upstream Memory Bank v0.8 template (справочник) |
| `_meta/subagents/`               | Agent skill definitions                         |
| `_meta/docs/`                    | Design briefs, prompts                          |
| `_meta/notes/`                   | Obsidian notes (бывш. MapData)                  |
| `_meta/archive/`                 | Archived root clutter (TODO, analysis, prompts) |

## Workspaces (npm)

```json
"workspaces": ["packages/*", "platforms/*"]
```

Root scripts: `npm run dev`, `npm run server`, `npm run build`, `npm run desktop` (→ `@training/desktop`).

## Не трогать без задачи

`.claude/`, `.codex/`, `.agents/`, `docker-data/`, `logs/`, `workspace-files/`, `gym.db`
