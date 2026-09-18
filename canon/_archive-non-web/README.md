# `_archive-non-web/` — архив native / mobile / desktop

**Дата архивации:** 2026-08-27

Корень репозитория оставлен **только для веб-продукта** (Vite + React, `packages/`, `server/`, `tests/`).  
Всё ниже **перенесено** (`mv`), не удалено.

## Содержимое

| Путь в архиве                                          | Было в корне                                             |
| ------------------------------------------------------ | -------------------------------------------------------- |
| `apps/` (`mobile`, `macos`)                            | `apps/`                                                  |
| `android/`                                             | `android/`                                               |
| `ios/`                                                 | `ios/`                                                   |
| `fastlane/`                                            | `fastlane/`                                              |
| `desktop/`                                             | `desktop/` (Electron `main.cjs`)                         |
| `capacitor.config.ts`                                  | `capacitor.config.ts`                                    |
| `.env.capacitor.example`                               | `.env.capacitor.example`                                 |
| `.env.capacitor.local`                                 | `.env.capacitor.local` (локальный; не коммитить секреты) |
| `Gemfile`, `.bundle/`                                  | Ruby/Bundler для Fastlane                                |
| `.github/workflows/android-apk.yml`                    | Android CI                                               |
| `scripts/desktop-dev.mjs`, `scripts/desktop-build.mjs` | Electron helper scripts                                  |

Пакеты `@capacitor/*` / `@ionic/react` / Electron / `sharp` **удалены** из корневого `package.json` (2026-09-01…2026-09-07): web-only bootstrap. Restore deps — `_archive-non-web/package.json.snippet`. Wallpaper tooling — `_archive-non-web/scripts/process-wallpaper-backgrounds.mjs`.

## Как восстановить

Из корня репозитория:

```sh
mv _archive-non-web/apps .
mv _archive-non-web/android .
mv _archive-non-web/ios .
mv _archive-non-web/fastlane .
mv _archive-non-web/desktop .
mv _archive-non-web/capacitor.config.ts .
mv _archive-non-web/.env.capacitor.example .
mv _archive-non-web/Gemfile .
mv _archive-non-web/.bundle .
mv _archive-non-web/scripts/desktop-*.mjs scripts/
mkdir -p .github/workflows
mv _archive-non-web/.github/workflows/android-apk.yml .github/workflows/
# затем вернуть workspaces/scripts из списка ниже в package.json и npm install
```

## Старые npm scripts (сняты с корневого package.json)

Скопировано с корня до архивации 2026-08-27:

```json
{
  "desktop": "node scripts/desktop-dev.mjs",
  "desktop:dir": "node scripts/desktop-build.mjs --dir",
  "desktop:pack": "node scripts/desktop-build.mjs",
  "cap:sync": "npm run build && npx cap sync",
  "cap:copy": "npx cap copy",
  "cap:ios": "npm run cap:sync && npx cap open ios",
  "cap:android": "npm run cap:sync && npx cap open android",
  "cap:open:ios": "npx cap open ios",
  "cap:open:android": "npx cap open android",
  "fastlane:lanes": "fastlane lanes",
  "fastlane:ios:info": "fastlane ios info",
  "fastlane:android:info": "fastlane android info",
  "fastlane:ios:build": "fastlane ios build_debug",
  "fastlane:android:build": "fastlane android build_debug"
}
```

Также сняты: `"main": "desktop/main.cjs"`, блок `"build"` (electron-builder), workspace `"apps/*"`.

Активные web-скрипты в корне: `dev`, `server`, `build`, `typecheck`, `test`, `lint`, docker/public/quality и т.д.
