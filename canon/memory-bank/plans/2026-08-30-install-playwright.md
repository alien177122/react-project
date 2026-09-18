# План: установка Playwright

**Цель:** подключить Playwright к web-контурy Vite-проекта без дублирования зависимостей и без затрагивания native-архивов, чтобы локальные E2E-проверки запускались одной командой против `http://localhost:5173`.

**Критерий готовности:** `@playwright/test` и браузер Chromium доступны, существует минимальная конфигурация с безопасным запуском Vite, добавлена изолированная команда `test:e2e`, а smoke-проверка проходит либо причина блокировки явно зафиксирована.

## Пункты

- [x] Проверить текущие версии Playwright, lockfile и наличие конфигурации.
- [x] Установить/синхронизировать пакет через npm и установить Chromium.
- [x] Добавить минимальную конфигурацию и smoke-тест только для web-контурa.
- [x] Запустить focused verification и проверить итоговый diff.

## Проверка

- `npm install --save-dev @playwright/test playwright` → `@playwright/test@1.62.1`, `playwright@1.62.1`.
- `npx playwright install chromium` → Chromium 151.0.7922.34, Playwright revision 1234; также установлены FFmpeg и headless shell.
- `npx playwright test --list` → 1 smoke-тест.
- `npm run test:e2e` → 1 passed, локальный Vite/API подняты через `webServer`.
- `npm run typecheck` → успешно.
- `npm test` → известный pre-existing failure `tests/ios-adaptation.test.ts`; остальные тесты проходят.
- `npm run lint` → pre-existing lint debt, 24 errors и 1 warning в существующем коде.
- Встроенный browser MCP не создал/не открыл вкладку для preview; Playwright smoke против `http://localhost:5173` прошёл.
