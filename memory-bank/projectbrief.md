# Project Brief — Training Calculator (Периодизация)

## Назначение

Монорепозиторий приложения для **силовой периодизации и тренировок**: веб-клиент (Vite + React 19), общая бизнес-логика (`packages/shared`), Express + SQLite backend, Electron desktop, Expo mobile (`apps/mobile/`, `apps/macos/`).

## Структура монорепо

| Путь                   | Назначение                                              |
| ---------------------- | ------------------------------------------------------- |
| `src/`                 | Web UI: screens, components, hooks, styles              |
| `packages/shared/`     | API client, hooks, program v3, calc/journal/split utils |
| `server/`              | REST API, auth (JWT), journal, split, file workspace    |
| `desktop/`             | Electron shell над web-клиентом                         |
| `apps/mobile/`         | Expo Router mobile (Readiness и др.)                    |
| `apps/macos/`          | Expo Android/macOS контур + release scripts             |
| `training-app-mobile/` | Parallel RN/web export track                            |
| `memory-bank/`         | Memory Bank — задачи, контекст, архив                   |
| `.cursor/`             | Memory Bank v0.8 commands + isolation_rules             |

## Цели продукта

- Калькулятор нагрузок, program v3, журнал, конструктор сплита, теория
- Аутентификация, персональные данные, файловое workspace
- PWA на iOS (Safari Add to Home Screen); prod frontend на Vercel, API — отдельный хост
- Desktop (Electron) и mobile (Expo) как дополнительные оболочки

## Ограничения

- Дизайн: `CLAUDE.md` + `memory-bank/style-guide.md`
- Не коммитить секреты (`.env`, `JWT_SECRET`, keystore)
- `gym.db` — локальная БД, в git не попадает

## Команды разработки

```sh
npm install
npm run dev          # Vite :5173, proxy /api → backend
npm run server       # API :3001
npm test && npm run typecheck && npm run build && npm run lint
npm run desktop      # Electron + dev server + backend
npm run docker:up    # Docker production stack
```

## Memory Bank workflow

Активные задачи: `memory-bank/tasks.md`.  
Цепочка: `/van` → `/plan` → `/creative` → `/build` → `/reflect` → `/archive`.

Установлен **Memory Bank v0.8** из cursor-memory-bank (синхронизировано в `.cursor/`).
