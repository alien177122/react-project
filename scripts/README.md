# Scripts — Training Calculator

Утилиты сборки, ассетов и dev-оркестрации. Запуск из корня репозитория.

## Dev & build

| Script              | Команда                | Назначение             |
| ------------------- | ---------------------- | ---------------------- |
| `dev-all.mjs`       | `npm run dev`          | Vite :5173 + API proxy |
| `desktop-dev.mjs`   | `npm run desktop`      | Electron dev           |
| `desktop-build.mjs` | `npm run desktop:pack` | Electron pack          |

## Assets

| Script                                  | Команда                           | Назначение                                      |
| --------------------------------------- | --------------------------------- | ----------------------------------------------- |
| `generate-pwa-icons.mjs`                | `npm run icons:generate`          | PWA иконки                                      |
| `generate-og-images.mjs`                | `npm run og:generate`             | Open Graph 1200×630                             |
| **`process-wallpaper-backgrounds.mjs`** | **`npm run backgrounds:process`** | **Ambient wallpapers: isolate, glow, 4×, WebP** |

### Wallpaper pipeline (изображения)

```bash
npm run backgrounds:process
```

Канон: `memory-bank/reference/wallpaper-background-pipeline-standard.md`

Зависимости: `sharp` (npm), `pngquant` (brew, опционально для PNG).

Выход: `public/backgrounds/*-ambient.webp` + manifest.

## Public tunnel

| Script                       | Команда                            | Назначение                                                                     |
| ---------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| `public-run.mjs`             | `npm run public` / `public:stable` | Full-stack public (build + API + tunnel)                                       |
| `public-status.mjs`          | `npm run public:status`            | Статус named tunnel                                                            |
| `quick-tunnel-5173.mjs`      | `npm run tunnel:quick`             | Quick tunnel → Vite `:5173`, пишет `.logs/quick-tunnel-url.txt`, шлёт Telegram |
| `notify-tunnel-telegram.mjs` | `npm run tunnel:notify`            | POST URL в Telegram Bot API (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`)        |

Telegram: ключи в `.env.public` (см. `.env.public.example`). Без токена скрипт печатает RU/EN-подсказку и выходит 0.

## Media (видео)

Видео **не** в этой папке — см. Mac-wide Pipeline D:

```bash
~/.cursor/shared-knowledge/scripts/compress-videos.sh ~/Desktop/React_Project_Журнал_Сплит
```

Документация: `~/.cursor/shared-knowledge/MEDIA-OPTIMIZE.md`

## Прочее

| Script                  | Назначение          |
| ----------------------- | ------------------- |
| `seed-journal-demo.mjs` | Демо-данные журнала |
| `health-check.sh`       | Проверка сервисов   |
| `backup.sh`             | `npm run backup`    |
