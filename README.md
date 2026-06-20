# React Project

## Local development

```sh
npm install
npm run dev
```

API server only:

```sh
JWT_SECRET='your-secret' npm run server
```

`npm run dev` starts the gym API (default `:3002`) and Vite on `http://127.0.0.1:5173`, proxying `/api/*` to `VITE_API_PROXY_TARGET` / `API_PROXY_TARGET` (default `http://127.0.0.1:3002`). Port `3001` is often taken by Uptime Kuma on this machine — use `npm run server` with `PORT=3002` if you start the API separately.

## Build & preview

```sh
npm run typecheck   # tsc -b --noEmit, fast gate
npm run build       # tsc -b && vite build → dist/
npm run preview     # static server over dist/
npm test            # node --test on the shared utils suite
npm run lint        # eslint on src/, packages/, root config files
```

`build` and `lint` only cover the web/shared workspace. `training-app-mobile/` and `apps/macos` have their own toolchains and are ignored by the root ESLint config.

## Vercel deploy

The frontend is a static Vite build. The Express + SQLite backend (`server/index.js`) does **not** ship to Vercel — it lives on a separate host (Railway / Fly / your own VPS) and the deployed frontend reads its URL from `VITE_API_URL`.

Vercel project settings:

- **Framework**: Vite (auto-detected from `vercel.json`).
- **Build Command**: `npm run build`.
- **Output Directory**: `dist`.
- **Install Command**: `npm ci`.
- **Environment variables**:
  - `VITE_API_URL=https://<your-api-host>/api` — required.
    Vite inlines `import.meta.env.VITE_*` at build time; setting the variable **after** a build runs has zero effect on the deployed bundle. Re-deploy after editing.

Without `VITE_API_URL`, the deployed frontend opens but every API call falls back to `/api`, which returns 404 on Vercel — auth, file workspace, and saved exercises will not work.

The backend must allow CORS for the Vercel domain (`https://<project>.vercel.app` and any custom domain). Update its CORS allowlist before the first deploy or the browser will reject every request at the preflight stage.

## iPhone usage (PWA)

The build emits a Web App Manifest and iOS-friendly meta tags so the deployed site can be installed to the home screen as a chromeless app:

1. Open `https://<vercel-domain>/` in Safari on iOS.
2. Share → Add to Home Screen.
3. The icon labeled **Периодизация** appears on the home screen.
4. Tapping it launches the app in standalone mode (no Safari URL bar, dark status bar).

The placeholder icon set lives in `public/icons/`. To regenerate after a brand change, edit `scripts/generate-pwa-icons.mjs` and run:

```sh
npm run icons:generate
```

Offline support / Service Worker is intentionally not included in this iteration. The app needs network connectivity to reach the backend; offline-first caching will be a separate change with explicit invalidation rules so it doesn't break auth tokens.

## Roadmap

1. Web deploy → PWA — current step.
2. User testing on iOS via the home-screen install.
3. Optional: Capacitor wrap → App Store, only if push / biometric / native FS access is required.
4. `training-app-mobile/` — parallel React Native track for the same flows when nativeness is the goal rather than convenience.

## macOS desktop

`training-app-mobile` остаётся Expo/iOS/Android контуром. Для macOS теперь используется desktop shell над текущим адаптивным веб-клиентом, потому что этот путь переиспользует готовый UI и backend без переписывания проекта под `react-native-macos`.

Локальный desktop dev:

```sh
npm install
npm run desktop
```

Что делает `npm run desktop`:

- поднимает backend на `http://127.0.0.1:3001`
- поднимает Vite renderer на `http://127.0.0.1:5173`
- открывает Electron window для macOS

Сборка desktop-приложения:

```sh
npm run desktop:pack
```

Быстрая проверка без финального DMG:

```sh
npm run desktop:dir
```

Артефакты появятся в `desktop-dist/`.

Пути данных в packaged desktop:

- SQLite база: `~/Library/Application Support/Training Calculator/data/gym.db`
- файловое workspace: `~/Library/Application Support/Training Calculator/workspace-files`

## Docker

Prepare Docker env:

```sh
cp .env.docker.example .env.docker
```

At minimum, replace `JWT_SECRET` in `.env.docker`.

Start the full app in Docker:

```sh
npm run docker:up
```

Useful Docker commands:

```sh
npm run docker:status
npm run docker:logs
npm run docker:down
```

The app will be available on:

```txt
http://127.0.0.1:3001
```

Docker persistence:

- SQLite database is stored in `./docker-data/gym.db`
- file workspace is stored in `./workspace-files`

Notes:

- `WORKSPACE_FILES_ROOT` is mapped to `/app/workspace-files` inside the container
- `DB_PATH` is mapped to `/app/data/gym.db`
- if you use Ollama on your Mac, the default Docker env points to `http://host.docker.internal:11434`

## Public internet access

> Tunnels here (`npm run public*`) are a temporary way to expose the **local** dev stack — they are not production hosting. For a stable public frontend use the Vercel deploy described above; this section is for sharing a work-in-progress backend or an unmodified local checkout.

The project supports two public modes:

- `npm run public`
  Auto mode. Uses a stable Cloudflare tunnel when `.env.public` contains `CLOUDFLARE_TUNNEL_TOKEN` and `PUBLIC_HOSTNAME`. Falls back to a temporary `trycloudflare.com` URL otherwise.
- `npm run public:quick`
  Always uses a temporary quick tunnel.
- `npm run public:stable`
  Requires `.env.public` with a stable Cloudflare tunnel token and hostname.

Minimal stable setup:

```sh
cp .env.public.example .env.public
```

Then fill in:

- `JWT_SECRET`
- `PUBLIC_PORT` (must match the service URL configured in Cloudflare)
- `CLOUDFLARE_TUNNEL_TOKEN`
- `PUBLIC_HOSTNAME`

Run:

```sh
npm run public:stable
```

When the tunnel is healthy, the terminal prints:

```txt
[public] App is reachable on the internet: https://your-hostname.example.com
```

That is the link you send to users.

## One-time Cloudflare setup for a stable URL

This repo is ready to run a named tunnel by token, but Cloudflare still requires one one-time setup in your account:

1. Open Cloudflare Zero Trust and create a tunnel for this Mac.
2. Copy the tunnel token.
3. In the tunnel's public hostnames, add your hostname and point it to `http://127.0.0.1:3001` or to whatever `PUBLIC_PORT` you chose.
4. Put the token and hostname into `.env.public`.

Current Cloudflare references:

- Named tunnel overview: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
- Run a tunnel with a token: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/local-management/tunnel-useful-commands/
- Public hostname routing: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/routing-to-tunnel/dns/

## launchd autostart on macOS

Install autostart after login:

```sh
npm run public:launchd:install
```

Check status:

```sh
npm run public:status
```

Remove autostart:

```sh
npm run public:launchd:remove
```

What the launch agent does:

- starts the app in stable tunnel mode
- restarts it after crashes
- starts it automatically after macOS login
- writes logs to `logs/public.launchd.out.log` and `logs/public.launchd.err.log`

## Health checks

Local:

```sh
curl http://127.0.0.1:3001/api/health
```

Public:

```sh
curl https://your-hostname.example.com/api/health
```

Both should return:

```json
{"ok": true}
```
