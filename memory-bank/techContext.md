# Tech Context

## Stack

| Слой     | Технологии                                                      |
| -------- | --------------------------------------------------------------- |
| Frontend | React 19, TypeScript 5.9, Vite 7, vanilla CSS (tokens)          |
| Shared   | `@training/shared` — hooks, API, program v3, journal/split/calc |
| Backend  | Node.js, Express 5, SQLite (`better-sqlite3`), JWT auth         |
| Desktop  | Electron 41 (`desktop/`, `npm run desktop`)                     |
| Mobile   | Expo Router (`apps/mobile/`, `apps/macos/`)                     |
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
npm run docker:up                    # build + run
npm run docker:status | docker:logs | docker:down
```

Persistence: volume `react-project-app-data` (SQLite), `./workspace-files` bind mount.

## Public access (Cloudflare)

- `npm run public` — auto: stable if token+hostname, else quick `trycloudflare.com`
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

## Платформа разработки

- macOS (darwin), zsh
- Workspace: `/Users/steve_gordiyenko/Desktop/React_Project_Журнал_Сплит`

## Agent tooling (Cursor)

| Инструмент               | Назначение                                                          |
| ------------------------ | ------------------------------------------------------------------- |
| Memory Bank              | `memory-bank/` — читать перед каждой задачей                        |
| MCP `cursor-ide-browser` | Превью UI во **встроенном** браузере Cursor                         |
| MCP `cursor-app-control` | `open_resource` для файлов/URL в Glass (не системный Safari/Chrome) |
| Hooks (опционально)      | `.cursor/hooks/` — sessionStart + beforeShellExecution guard        |

**Не использовать** macOS `open http://…` для превью — только embedded browser MCP.
