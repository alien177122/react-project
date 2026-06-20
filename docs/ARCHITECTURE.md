# Architecture

Training Calculator (Periodizatsiya) is a **web-first monorepo**: React PWA frontend, Express API, shared TypeScript package, optional native shells.

## High-level diagram

```mermaid
flowchart TB
  subgraph client [Client]
    PWA[src/ Vite React PWA]
    Desktop[platforms/desktop Electron]
    Mobile[platforms/mobile Expo]
  end

  subgraph shared [packages/shared]
    Hooks[hooks + utils]
    API[@training/shared API client]
    Program[program v3 logic]
  end

  subgraph backend [server/]
    Express[Express REST API]
    JWT[JWT auth]
    SQLite[(SQLite gym.db)]
    Files[file workspace]
  end

  PWA --> API
  Desktop --> PWA
  Mobile --> API
  PWA --> Hooks
  API --> Express
  Express --> JWT
  Express --> SQLite
  Express --> Files
  Hooks --> Program
```

## Packages

| Path                 | Role                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| `src/`               | Primary UI: calculator, journal, training, theory screens              |
| `server/`            | Auth, user data persistence, journal API, static `dist/` in production |
| `packages/shared/`   | Shared types, calculations, API client — imported by web and platforms |
| `platforms/desktop/` | Electron wrapper around dev/prod web URL                               |
| `platforms/mobile/`  | Expo Router mobile client                                              |
| `platforms/macos/`   | React Native Android / macOS release track                             |

## Authentication

1. User registers or logs in via `POST /api/register` or `POST /api/login`.
2. Server returns a JWT (signed with `JWT_SECRET` from environment).
3. Client stores token and sends `Authorization: Bearer <token>` on protected routes.
4. User profile and journal data live in SQLite `users.data` JSON column.

**Production:** set a strong `JWT_SECRET`. The `JWT_SECRET=dev` default in `package.json` scripts is for local development only.

## Data storage

| Store          | Location                                     | Notes                               |
| -------------- | -------------------------------------------- | ----------------------------------- |
| SQLite         | `gym.db` (repo root by default) or `DB_PATH` | **Not in git** — created at runtime |
| File workspace | `workspace-files/` or `WORKSPACE_FILES_ROOT` | User uploads; gitignored            |
| Docker volume  | `./docker-data/gym.db`                       | See `docs/DEPLOYMENT.md`            |

## API surface (overview)

- `GET /api/health` — health check
- Auth: register, login
- User data: get/put/delete profile payload
- Journal and calculator state persisted per user
- File workspace endpoints (see `server/file-workspace.js`)

Full route list: `server/app.js`.

## Frontend build

- **Vite** bundles `src/` → `dist/`
- `VITE_API_URL` — API base URL baked in at build time (critical for Vercel)
- PWA manifest and icons in `public/`

## Testing

| Suite         | Command                                                            |
| ------------- | ------------------------------------------------------------------ |
| Unit (Bun)    | `bun run test:unit` — `tests/*.test.ts`                            |
| Server (Node) | `bun run test:native` — `tests/db.test.ts`, `tests/server.test.ts` |

## Design standards

UI reference documents: [`design-standards/README.md`](design-standards/README.md).

## Related docs

- [STRUCTURE.md](../STRUCTURE.md) — directory map
- [DEPLOYMENT.md](DEPLOYMENT.md) — Docker, Vercel, self-hosting
- [CONTRIBUTING.md](../CONTRIBUTING.md) — dev workflow
