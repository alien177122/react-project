# Tech Context

## Stack

| Слой     | Технологии                                                      |
| -------- | --------------------------------------------------------------- |
| Frontend | React 19, TypeScript 5.9, Vite 7, vanilla CSS (tokens)          |
| Shared   | `@training/shared` — hooks, API, program v3, journal/split/calc |
| Backend  | Node.js, Express 5, SQLite (`better-sqlite3`), JWT auth         |
| Desktop  | Electron 41 (`desktop/`, `npm run desktop`)                     |
| Mobile   | Expo Router (`apps/mobile/`, `apps/macos/`) + **Capacitor 7** (`ios/`, `android/`) |
| CI       | GitHub Actions (`.github/workflows/android-apk.yml`)            |

## Порты и proxy

| Сервис        | Порт                         | Примечание                              |
| ------------- | ---------------------------- | --------------------------------------- |
| Vite dev      | 5173                         | `npm run dev`                           |
| Express API   | 3001                         | `npm run server`                        |
| Docker app    | `${APP_PORT:-51330}` → 3001  | `docker-compose.yml`                    |
| Public tunnel | `PUBLIC_PORT` (default 3001) | Cloudflare via `scripts/public-run.mjs` |

Dev proxy: `VITE_API_PROXY_TARGET` / `API_PROXY_TARGET` → `http://127.0.0.1:3001`

## Environment

- **Server**: `JWT_SECRET`, rate limits, `DB_PATH`, `WORKSPACE_FILES_ROOT`
- **Frontend build**: `VITE_API_URL` (prod)
- **Docker**: `.env.docker` (from `.env.docker.example`)
- **Public tunnel**: `.env.public` — `CLOUDFLARE_TUNNEL_TOKEN`, `PUBLIC_HOSTNAME`

## Docker

```sh
cp .env.docker.example .env.docker   # set JWT_SECRET
# Всегда пересобирать контейнер и удалять старые контейнеры/сироты перед запуском:
docker compose --env-file .env.docker down --remove-orphans
docker compose --env-file .env.docker up --build -d
```

Persistence: volume `react-project-app-data` (SQLite), `./workspace-files` bind mount.

## Public access (Cloudflare)

- **Всегда запускать через туннель** для публичного доступа:
  `npm run public` (автовыбор: стабильный туннель, если есть токены, иначе быстрый `trycloudflare.com`)
- Или запустить туннель напрямую к запущенному Docker-контейнеру (порт 3001):
  `cloudflared tunnel --url http://localhost:3001`
- `npm run public:stable` — named tunnel
- `npm run public:launchd:install` — macOS autostart
- Health: `GET /api/health` → `{"ok":true}`

Requires `cloudflared` CLI installed.

## Android release (`apps/macos/`)

- Scripts: `scripts/android-release.sh`, `android-release.ps1`
- Signing: `android/key.properties` (example: `key.properties.example`)
- Gradle/SDK/NDK checks in release script
- GitHub workflow for APK builds

## Тесты

```sh
npm test              # Node test runner: tests/*.test.ts
npm run typecheck     # tsc -b --noEmit
npm run lint          # eslint (web/shared scope)
```

Root lint/build не покрывают `apps/mobile`, `apps/macos` — отдельные toolchains.

## Capacitor native shells (iOS / Android)

- **Source:** same Vite web build (`dist/`) wrapped by Capacitor 7
- **Config:** `capacitor.config.ts` — `appId: com.stevegordiyenko.trainingcalculator`, `webDir: dist`
- **Projects:** `ios/App/`, `android/app/` at repo root
- **Plugins:** `@capacitor/app`, `@capacitor/status-bar`, `@capacitor/splash-screen`
- **Scripts:** `npm run cap:sync`, `cap:ios`, `cap:android`, `cap:open:ios`, `cap:open:android`
- **Native API:** `VITE_API_URL` must be absolute at build time (see `.env.capacitor.example`)
- **Live reload dev:** `CAP_DEV_SERVER_URL=http://<LAN-IP>:5173` before `cap:sync`
- **Reference:** `memory-bank/reference/ionic-capacitor-standard.md`
- **Expo:** parallel RN track — not replaced

**Prerequisites:** Xcode + CocoaPods (iOS), Android Studio + SDK (Android).

## Платформа разработки

- macOS (darwin), zsh
- Workspace: `/Users/steve_gordiyenko/Desktop/React_Project_Журнал_Сплит`

## Tech audit (2026-05)

Сверка внешнего архитектурного аудита с репозиторием: **`memory-bank/tech-audit-2026-05.md`**.

Ключевое: стек/монорепо/безопасность API в целом верны; `erasableSyntaxOnly` — не баг при TS 5.9 (pin в CI, не удалять); Playwright E2E по-прежнему отсутствует; Android APK workflow уже есть; design reference + Journal/Split/tab-shell — после аудита.

## Срез состояния (React Doctor — 2026-06)

Срез перед планируемым рефакторингом и внедрением новых инструментов (запуск от 30.06.2026):

- **Корень проекта (`react-project`)**:
  - Оценка: `47 / 100` (Критическое состояние / Needs work)
  - Метрики: 14 ошибок, 369 предупреждений (всего 424 проблемы)
  - Главная проблема: Синхронизация состояния с пропсами внутри эффекта (`apps/mobile/src/hooks/useReadinessScreen.ts:66`)
  - Ссылка на отчет: https://react.doctor/share?p=React_Project_%D0%96%D1%83%D1%80%D0%BD%D0%B0%D0%BB_%D0%A1%D0%BF%D0%BB%D0%B8%D1%82&s=47&e=15&w=409&f=189

- **Директория `apps/mobile/`**:
  - Оценка: `62 / 100` (Needs work)
  - Метрики: 1 ошибка, 26 предупреждений (всего 27 проблем)
  - Главная проблема: Синхронизация состояния с пропсами внутри эффекта (`src/hooks/useReadinessScreen.ts:66`)
  - Ссылка на отчет: https://react.doctor/share?p=mobile&s=62&e=1&w=26&f=18

---


## Agent tooling (Cursor)

| Инструмент                 | Назначение                                                          |
| -------------------------- | ------------------------------------------------------------------- |
| Memory Bank                | `memory-bank/` — читать перед каждой задачей                        |
| MCP `cursor-ide-browser`   | Превью UI во **встроенном** браузере Cursor                         |
| MCP `cursor-app-control`   | `open_resource` для файлов/URL в Glass (не системный Safari/Chrome) |
| Hooks (опционально)        | `.cursor/hooks/` — sessionStart + beforeShellExecution guard        |
| Playwright MCP             | Headless-тестирование UI и доступности (`@playwright/mcp`)           |
| SQLite MCP                 | Прямое чтение/анализ базы данных `gym.db` (`mcp-server-sqlite`)     |
| Sequential Thinking MCP    | Пошаговое планирование (Chain of Thought) для сложных задач          |
| Context7 MCP               | Подгрузка актуальной документации по библиотекам (React 19, Expo)   |

**Не использовать** macOS `open http://…` для превью — только embedded browser MCP.

## Внешние AI-инструменты и UI-генераторы

- **Ограничения по UI-генераторам (Claude Artifacts, v0 и др.)**: При использовании внешних AI-инструментов с визуализацией (например, Claude Artifacts) строго запрещено прямое копирование HTML/веб-примитивов (таких как `<div>`, `<span>`, `<a>` и др.) в нативный трек (Expo/macOS); код должен быть переписан под React Native (`<View>`, `<Text>`, и т.д.).
- Любые UI-генераторы должны выдавать код, совместимый с `<View>`/`<Text>`, а не `<div>`, либо логика должна вручную адаптироваться для React Native с соблюдением типизации (strict TS, без `any`).

- **Запрет внешних компрессоров и менеджеров памяти**: Категорически запрещено использование сторонних менеджеров памяти (например, Mem0) и утилит компрессии контекста (Ponytail, Headroom, Memanto). Для экономии токенов кодовая база оптимизирована естественным образом (размер компонентов ≤ 150 строк, вынос бизнес-логики в хуки `@training/shared`). Сторонняя компрессия промптов повышает риски генерации кода с типом `any`, потери специфики Expo Router/Capacitor и нарушения детерминированности архитектуры.

## Отклоненные решения

- **Инструменты спам-автоматизации (Gisfind и др.)**: Использование парсеров и инструментов автоматизации рассылок для дистрибуции B2B-фич отклонено из-за юридических рисков (штрафы за спам) и полной нерелевантности текущему инженерному стеку.
- **Инструменты парсинга вакансий (Career-Ops и др.)**: Инструмент отклонен как не относящийся к инженерному стеку; фокус сохраняется на разработке продуктовых решений.



