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
{"ok":true}
```
