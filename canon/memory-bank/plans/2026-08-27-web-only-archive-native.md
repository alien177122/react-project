# План: web-only root + archive native

**Дата:** 2026-08-27

## Цель

В корне репозитория остаётся только активный веб-продукт (Vite + `packages/` + `server/` + `tests/`). Деревья native/mobile/desktop/Capacitor **переносятся** (не удаляются) в `_archive-non-web/`, чтобы `npm run dev|server|test|typecheck` работали без workspace `apps/*`.

## Критерий готовности

- [x] Существует `_archive-non-web/` с перенесёнными деревьями и README (restore via `mv`)
- [x] В корне нет `apps/`, `android/`, `ios/`, `fastlane/`, `desktop/`, `capacitor.config.ts`
- [x] `package.json` workspaces без `apps/*`; native-only scripts отключены/задокументированы
- [x] `npm run typecheck` проходит
- [x] README/AGENTS кратко указывают на архив
- [x] Коммит не создан

## Итог

Цель достигнута: web-only root; native в `_archive-non-web/`; typecheck OK.

## Шаги

1. Создать `_archive-non-web/` и README.
2. `mv` деревьев: apps, android, ios, fastlane, desktop, capacitor config, Gemfile/.bundle, android CI, скрипты desktop/cap при необходимости.
3. Обновить `package.json` (workspaces, scripts, `main`, electron-builder block).
4. Обновить `tsconfig.node.json`, eslint ignores, `.gitignore` пути fastlane/ios/android → archive note.
5. Короткие заметки в README.md / AGENTS.md.
6. `npm run typecheck`; smoke Vite если доступен.
7. Сверка цели.

## Не трогать

- `src/`, `packages/shared`, `server/`, `tests/`, `features/`
- `.env*` секреты / `gym.db` (не коммитить; capacitor example — в архив)
- Не удалять перенесённое; не `git commit`
