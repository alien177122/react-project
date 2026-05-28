# Технический аудит — валидация (2026-05-27)

> Источник: пользовательский документ «Полный технический и архитектурный аудит» (май 2026).  
> Сверка с репозиторием `/Users/steve_gordiyenko/Desktop/React_Project_Журнал_Сплит` и Memory Bank.

---

## Резюме

| Категория                                             | Оценка                               |
| ----------------------------------------------------- | ------------------------------------ |
| Архитектура монорепо, стек, безопасность API (базово) | **Верно**                            |
| Quiet UI / tab-shell / токены                         | **Верно**, с оговорками по охвату    |
| Проблема `erasableSyntaxOnly`                         | **Устарело / неверная формулировка** |
| Roadmap (краткосрочный)                               | **Частично устарел**                 |
| Roadmap (долгосрочный Android CI)                     | **Уже частично сделано**             |
| Недавние фичи (2026-05)                               | **Не отражены в аудите**             |

---

## 1. Архитектура — что верно

- **Монорепо:** `src/`, `packages/shared/`, `server/`, `desktop/`, `apps/mobile/`, `tests/` — подтверждено.
- **Shared:** расчёты 1ПМ, program v3, `useJournal`, `useSplitConstructor`, API-клиент — в `packages/shared/`.
- **Zod:** есть (`packages/shared/src/data/strength-formula.ts`), но **не** «везде для всех тренировочных данных» — точечно для strength-formula.
- **Web:** React 19 + Vite 7, логика из `@training/shared`; entry `App.tsx` → `AppShell`.
- **Server:** Express 5 + `better-sqlite3`, JWT `expiresIn: '30d'`, `bcryptjs`, dual rate-limit (IP + name) на login/register, `securityHeaders`, `gym.db` в `.gitignore`.
- **OCR:** `server/ollama-ocr.js` + `file-workspace.js`, модель по умолчанию `glm-ocr`, скрипт `npm run ollama:pull-glm-ocr`.
- **Desktop:** Electron 41, `asarUnpack` для `better-sqlite3` — в `package.json` `build`.
- **Docker:** volume `react-project-app-data`, `DB_PATH: /app/data/gym.db` — `docker-compose.yml`.
- **Стек версий:** React `^19.2.0`, TS `~5.9.3`, Vite `^7.2.4`, Express `^5.2.1`, framer-motion `^12.38.0` — совпадает с `package.json`.

### Что аудит не перечислил (пропуски)

| Путь                              | Назначение                                                                  |
| --------------------------------- | --------------------------------------------------------------------------- |
| `apps/macos/`                     | Expo Android + release scripts, Gradle, `.github/workflows/android-apk.yml` |
| `training-app-mobile/`            | Параллельный RN/web track                                                   |
| `memory-bank/` + `.cursor/`       | Memory Bank v0.8, design reference canon                                    |
| `packages/shared` program presets | `general` / `strength` → UI «Оптимальная» / «На силу»                       |

---

## 2. Quiet UI и CSS — что верно

- `--theory-accent: #f07a43` — `src/styles/base/variables.css`.
- Системный шрифт, шкала 4px — `variables.css`, `tab-shell.css`, эталоны в `memory-bank/reference/`.
- **`tab-shell.css`:** `src/styles/components/app/tab-shell.css`; Journal и Split на `.app-tab-shell` (`JournalTab.tsx`, `SplitConstructorTab.tsx`) — **build Journal+Split завершён** (см. `tasks.md`).
- **`prefers-reduced-motion`:** глобально и по модулям (`reset.css`, `tab-shell.css`, `useReducedMotion`, framer в `TabPanel`) — не только «обещание», реализовано.
- **Design standards hook:** `memory-bank/reference/README.md` + 3× `*-standard.md` + `theory-design-reference.mdc` — **канон после аудита**, в документе не упомянут.

### Оговорки / неточности аудита

- **«backdrop-filter в theory-shell + tab-shell»** — в `theory-web.css` у `.theory-shell` **нет** `backdrop-filter`; фон — radial-gradient + box-shadow. Риск GPU от вложенных прозрачных слоёв **возможен**, но формулировка про `backdrop-filter` **не подтверждена** в текущем CSS.
- **tab-shell и dark mode:** shell уже на `var(--bg)`, `var(--text)`; отдельная «миграция tab-shell на semantic tokens» в roadmap **частично выполнена** для Journal/Split, Calculator использует параллельно `.ta-shell` (Theory palette).

---

## 3. Безопасность — что верно и что не сказано

| Утверждение аудита        | Статус                                   |
| ------------------------- | ---------------------------------------- |
| Rate limit login/register | ✅ `server/app.js`                       |
| JWT 30d                   | ✅ `jwt.sign(..., { expiresIn: '30d' })` |
| bcrypt                    | ✅                                       |
| gym.db не в git           | ✅ `.gitignore`                          |
| Docker persistence        | ✅ volume `app_data`                     |

**Не в аудите (реальный gap):**

- `app.use(cors())` без ограничения origin в dev/prod — шире, чем «CORS для Vercel» в `systemPatterns.md` (нужна сверка `server/` с деплоем).
- Prod **требует** `JWT_SECRET` (`server/config.js`); dev fallback `gym-secret-dev` — документировать для деплоя.

---

## 4. Проблемы из аудита — коррекции

### 4.1 `erasableSyntaxOnly`

- **Факт:** флаг в `tsconfig.base.json`, `tsconfig.app.json`, `tsconfig.node.json`.
- **Версия проекта:** `typescript: ~5.9.3` в root `package.json` — флаг **поддерживается**.
- **Вердикт:** это **не баг репозитория**, а требование к CI/деплою (pin TS ≥ 5.8). Roadmap «убрать опцию» — **не рекомендуется**; лучше зафиксировать `npm run typecheck` в CI на Node 20 + TS 5.9.

### 4.2 E2E / Playwright

- `@playwright/test` в devDependencies, **нет** `playwright.config.*`, **нет** e2e-спеков.
- Юнит-тесты: **120/120** (`tests/**/*.test.ts`, `npm test`) — аудит верно про отсутствие UI/E2E, но число тестов в репо выше «только backend».

### 4.3 `StrengthFormulaSection` и git-комментарии

- Конфликт-маркеров `<<<<<<` в `StrengthFormulaSection.tsx` **нет** — пункт roadmap **устарел**.

---

## 5. Roadmap аудита vs реальность (2026-05-27)

| Пункт roadmap                                | Статус                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Исправить `erasableSyntaxOnly`               | ❌ Не нужно при TS 5.9; pin в CI                                                                        |
| Очистка StrengthFormulaSection от git-мусора | ✅ Не актуально                                                                                         |
| Playwright E2E                               | ⏳ Актуально                                                                                            |
| Mobile ↔ `@training/shared`                  | 🔶 Частично: tabs mobile используют shared; **Readiness** — mock (`apps/mobile/src/mocks/readiness.ts`) |
| tab-shell semantic + dark                    | 🔶 Частично (Journal/Split)                                                                             |
| OCR детальные логи                           | ⏳ Актуально (базовые ошибки есть в `file-workspace`)                                                   |
| Turborepo                                    | ⏳ Не начато                                                                                            |
| GitHub Actions Android APK                   | ✅ `.github/workflows/android-apk.yml` (`workflow_dispatch`)                                            |
| Storybook                                    | ⏳ Не начато                                                                                            |

---

## 6. Изменения после написания аудита (не в документе)

1. **Пресеты прогрессии:** UI «Оптимальная» / «На силу» (`progressionPresets.ts`); внутренние id `general` / `strength`; связь с Program 2.0/3.0 только в коде, не в user-facing copy.
2. **ProgressionPreviewChart:** горизонтальный sibling `PeriodizationChart`, фазы в listbox, тестовые недели «?» для «На силу».
3. **CalculatorTabV3:** polish под reference standards (`program-v3.css`, `SceneHero`, таблица 16 нед).
4. **Hero RPE–RIR:** `LoadingView` + `AppHeroDecor` парсит «RPE–RIR» в акцент.
5. **Journal + Split redesign:** shared `tab-shell`, typecheck + 120 tests.
6. **Memory Bank:** reference docs, Theory DS (`useTheoryDesign.ts`), agent rules v0.8.
7. **Инфра WIP (незакоммичено):** Cloudflare public scripts, Docker env examples, Android release в `apps/macos/`.

---

## 7. Рекомендуемые следующие шаги (приоритет)

1. **`/reflect` → `/archive`** для задачи Journal+Split; затем осмысленный коммит или разбиение WIP (по запросу пользователя).
2. **Playwright smoke:** логин + сохранение 1ПМ / одна вкладка калькулятора — единственный неспорный технический долг из аудита.
3. **CI contract:** Node 20 + `npm run typecheck` + `npm test`; **не** удалять `erasableSyntaxOnly`; документировать в `techContext.md`.

Вторично: production CORS whitelist; Readiness → API вместо mock; Turborepo/Storybook — только при росте команды.

---

## Связанные файлы

- `memory-bank/projectbrief.md`, `techContext.md`, `systemPatterns.md`
- `memory-bank/activeContext.md` — указатель на этот документ
- `memory-bank/reference/README.md` — design canon (post-audit)
