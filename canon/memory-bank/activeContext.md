# Active Context

## Сессия (2026-08-26) — система статей Теории

**Цель:** дизайн + алгоритм + лексикон, без рестайла 01/02/frac.

**Locked:** гл. 01 stack, гл. 02 body, `.ta-frac`.  
**Канон:** `memory-bank/reference/theory-article-algorithm.md` (+ PDF). План: `memory-bank/plans/2026-08-26-theory-content-algorithm.md`.

## Сессия (2026-08-26) — Theory frac gold restyle

**Цель:** визуальный gold виджета = весь `.ta-frac`; шапка слева.

**Locked:** 01 lecture stack + 02 body + `.ta-frac` (пользователь 2026-08-26).

**Канон:** `memory-bank/reference/theory-frac-volume-standard.md`. План: `memory-bank/plans/2026-08-26-theory-frac-gold-restyle.md`.

## Сессия (2026-08-26) — Venus: layout Теории + инструкция

Layout панелей 02–10 + 3 reading **отдан на Venus по SSH** (SMB `MacVenus_Bridge` не смонтирован).

- Инструкция: `D:\Mac\OUTBOX\2026-08-26-0800-theory-panel-layout.md` (+ PDF)
- Локальная копия: `audit/2026-08-26-venus-theory-panel-layout-instructions.md`
- Код: `theory-apple.css`, `TheoryChapterPanel.tsx` → `C:\Users\user\Desktop\React_Project`
- `scripts/venus-inbox-pull.mjs` нет — skip. Коммит не делался.
- Venus: не переписывать `theory.ts`, не массово править 42em, не начинать Clomiphene.

## Сессия (2026-08-25) — Handoff лекций Теории

Нумерованная очередь лекций **закрыта**. Не начинать 01–10 заново.

- Канон: `memory-bank/reference/theory-lecture-page-standard.md`. План: `memory-bank/plans/2026-08-25-theory-lecture-handoff.md`.
- Данные: `packages/shared/src/data/theory.ts`. UI: `src/components/theory/chapterContent.tsx`. Gold: 02. **07** = сосудистые карты. macos/mobile не трогать.
- Статьи хаба (не сетка 10): `diabetes-habits`, `late-dinner`, `anabolic-vessels`.
- Снимок для правок человека (база 21:59, без его diff): `audit/theory-site-copy-2026-08-25.html` / `.md`. Пересборка: `node --experimental-strip-types scripts/export-theory-site-copy.ts`.
- Venus: `C:\Users\user\Desktop\React_Project`. Следующий шаг: человек правит снимок → агент вносит **одну** главу или статью.

## Goal-first (2026-08-25) — главный алгоритм агента

Перед любой задачей: цель одним абзацем → MD-план в `memory-bank/plans/` → пункты → проверка, достигнута ли цель. Если нет — новый план. Канон: `memory-bank/constitution/goal-first-plan.md`. agentmemory: workflow `goal-first-plan`. Статья про кломифен — **следующая** отдельная цель, не смешивать с этим циклом.

**Теория layout:** 02–10 и три статьи для чтения на ширину панели. Ссылки reading — `[data-kind=reading]`. План: `memory-bank/plans/2026-08-25-theory-parallel-02-10-reading.md`.

## Постоянное правило Venus (Windows)

- **Каждый старт сессии:** проверить `C:\MacVenus_Bridge\` (00-СЕЙЧАС.md, 02-ДЛЯ-VENUS-CURSOR.md, inbox, outbox) и `D:\Mac\` (INBOX, OUTBOX, 00-СЕЙЧАС.md), плюс `C:\Users\user\.cursor\shared-knowledge\`.
- **Лог:** последние действия агента → `D:\Mac\OUTBOX\VENUS-AGENT-LOG.md` (или dated log).
- **memory-bank/** в проекте — канон; Venus не скачивать, если банк на месте.

## Сессия (2026-08-15) — Auth fix (Venus)

**Сделано:** чёрная полоса auth hero (center cover), light theme auth card.

**Файлы:** `auth.css`, `AuthHeroDecor`, `AuthScreen`, `theme.ts`, `index.html`.

**Отчёты:** `D:\Mac\OUTBOX` (2220, 2227).

**Verify:** `npm run typecheck` OK, `npm test` pass. agentmemory: mem_msun9sha, mem_msunipcy.

## Сессия (2026-08-05) — Split preview polish (pyramid / NaN / day marks)

**Vite:** `:5173` уже слушал (PID node), `curl` → 200; новый `npm run dev` не поднимали.

**Фиксы:**

1. Day/week marks — уже в `split-progress` + `persistCalculationProgress` в историю расчётов; квадраты `is-partial` / `is-done`.
2. Пустая пирамида dips (+0) — `TrainingDayCard` брал только `EXERCISES`, dips в `CATALOG`; + `buildPyramid(0)` → ±step.
3. NaN кг deadlift — V3 fallback без `step`/`warmupStep`; теперь `CATALOG_EXERCISES` + guards в `formatWeight` / `calcWarmupSets` / `roundPyramidWeight`.
4. Пиллы схем — `scheme-col` stretch + `width: 100%` на slot/item.
5. Browser MCP в субагенте не держал вкладки (navigate/lock fail) — визуал не снят; логика покрыта тестами.

**Verify:** `npm test` 176/176, `npm run typecheck` OK. Коммит не делался.

## Сессия (2026-08-05) — Split calculation history

**Проблема:** сохранённый сплит и `completedWeeks` существовали, но UI после каждого входа снова скрывал прогноз за кнопкой расчёта; повторный расчёт не создавал исторический снимок.

**Решение:** `UserData.splitCalculations` хранит до 50 персональных снимков `{calculatedAt, split, exercises}`; `activeSplitCalculationId` восстанавливает выбранный расчёт. Прогресс недель/дней обновляется внутри снимка, поэтому изменения 1ПМ и конфигурации не меняют старый прогноз.

**UI:** секция 04 показывает список «История расчётов» (дата, название, недели/дни), выбор сразу открывает `SplitPreview`; CTA создаёт новый снимок.

**Legacy:** если у старого `activeSplitId` уже есть `completedWeeks`/`completedDays`, hook автоматически показывает его как исторический расчёт и переносит в новый массив при следующем сохранении — повторно считать и терять отметки не нужно.

**Verify:** reload сохраняет `1/8` и открытый прогноз; 390px overflow=0; `npm test` 167/167, typecheck и scoped ESLint pass. React Doctor не завершил oxlint из-за stale отсутствующего `platforms/macos/.../index.html`; findings только legacy, не в changed files.

## Сессия (2026-08-04) — Release pack v0.002 → Venus + disks

**Версия:** `package.json` **0.0.2** · micro **v0.002**  
**Архив:** `releases/React_Project_2026-08-04_v0.002/source.tar.gz` (~47–48 MB)  
**Канал:** Venus `MacVenus_Bridge/React_Project_Versions/…` (+ inbox TASK); LAN fallback `http://192.168.100.27:8765/releases/…`  
**Доки:** `NOTES.md`, `MANIFEST.md` (SHA256), `docs/REMOTE-ACCESS.md`  
**Диски:** DATA*1TB / DATA_500 / Mini_hdd → `BACKUP/02*ПРОЕКТЫ/react-training-journal/versions/` 
**Повтор:**`npm run release:pack`/`release:pack:serve`; remount Venus: `zsh ~/mnt/remount-MacVenus_Bridge.sh`

## Сессия (2026-08-04) — Split completedWeeks persistence bugfix

**Корневая причина:** `normalizeLoadedSplit` (`packages/shared/src/utils/api.ts`) отбрасывал `completedWeeks` / `completedDays` при каждом `loadUser`, хотя сервер (`schema.js` + `PUT /api/users/:name`) их уже сохранял. После логина stepper выглядел пустым.

**Фикс:** сохранить поля при load; draft резолвится через `activeSplitId`; `persistSplitProgress` пишет URL split id + ошибки save; «Сохранить и рассчитать» вызывает `saveSplit`.

**Канон UI stepper:** `.split-week-btn.is-done` / `--passed` уже были — данные не доезжали.

## Сессия (2026-08-04) — Program 2.0 = 12

**Канон:** unlock / «Сохранённые» = `EX_COUNT` = **12** (`EXERCISES` only).  
**Split-only** (не в unlock): `dips`, `deadlift`, `lyingTricepExt` → `SPLIT_EXTRA_EXERCISES`.  
**UI:** TabNav `n/12`, LockedState «всех 12», Calculator «Сохранённые (n/12)».  
**Gate:** `tests/exercise-slots.test.ts` — `EX_COUNT === 12`.  
**Не делать:** снова класть split-extras в `EXERCISES` (получается n/15).

## Сессия (2026-07-31) — iOS Expo full port

**Цель:** полный перенос web → `apps/mobile` с упрощённым flat UI (молниеносно).

**Wave 0 (foundation):**

- `bundleIdentifier`: `com.stevegordiyenko.trainingcalculator`
- SessionProvider: SecureStore JWT + AsyncStorage UserData + guest offline
- Auth modal `/auth`; header «Войти»
- Tabs: Тренировка · Калькулятор · Теория · Сплит · Журнал
- Deps: `expo-secure-store`, `react-native-svg`

**Next:** Wave 1 calculator picker + Program 2.0 list; Simulator smoke.

**Canon:** `memory-bank/creative/creative-store-roadmap.md` · plan ios_full_port

## Сессия (2026-07-30) — Uncle Bob Quality Gates

**Цель:** физические ограничения агентов (не line-by-line review кода) по мотивам unclebob/swarm-forge + APS.

**Сделано:**

- Constitution: `memory-bank/constitution/uncle-bob-quality-gates.md`
- Rule: `.cursor/rules/uncle-bob-quality-gates.mdc` (alwaysApply)
- Acceptance Gherkin: `features/calculator/one-rm.feature`
- Mutation pilot: `npm run test:mutate` → 100% kill на `calc.ts`
- CRAP-lite: `npm run test:crap`
- Bundle: `npm run quality` (tier A) / `quality:quick` (tier B)
- Dual backup pre-change → Mini_hdd + DATA_1TB (`…_pre-uncle-bob_2026-07-30_1922`)

**Repo path:** `~/Desktop/01_React_Продукт/React_Project_Журнал_Сплит/`

## Сессия (2026-07-27) — Store roadmap Phase 0

**Стратегия (зафиксировано):**

| Контур                   | Роль                                                  |
| ------------------------ | ----------------------------------------------------- |
| Vite `src/` `:5173`      | Единственный продуктовый web                          |
| Expo `apps/mobile` → EAS | Основной путь в App Store                             |
| Capacitor                | Fallback / временный MVP                              |
| Expo web                 | **Не** продуктовый контур                             |
| Оплаты                   | Web Stripe/Kaspi · iOS Apple IAP · server entitlement |
| Telegram                 | **Отложен** (не в активном roadmap)                   |

**Canon:** `memory-bank/creative/creative-store-roadmap.md`  
**Active task:** Phase 0 local-dev (`memory-bank/tasks.md`) — paused under quality-gates task  
**API note:** если `:3001` занят → gym API на `:3002` (dev-all.mjs)

**Запреты:** Expo web как продукт · Stripe/Kaspi unlock в iOS UI · Cap как финал · `localhost` на физическом устройстве · prod billing на ephemeral SQLite · Telegram/IAP до полезного журнала

## Сессия (2026-07-19)

**No-pill UI preference (project-wide):**

- Chips / RM badges / check indicators → rounded rectangles (`--glass-radius-badge` 6px), Split-like.
- Primary fix: `.ew-option-rm`, `.ew-option-check`; also tab meta, rest-card opts, training hint, split day badge/legend.
- Kept pill: theme toggle, split switch track/thumb; tiny status dots; donut skeleton.
- agentmemory: `no-pill-radius`, `rounded-rectangle-chips`, `split-like-radius`.

## Сессия (2026-07-16)

**Theory pedagogy (school textbook):**

- Chapter 01 = lecture page: intro plan (4) → `BASICS_LESSON_GROUPS` (`LectureSection`) → FractionalVolume (the one interactive). Canon: `theory-lecture-page-standard.md`.
- Canon: `theory-textbook-pedagogy-standard.md` + agentmemory.
- Body text ≥16px; no carousel dumps.

**Theory Strength — no small body text:**

- `.ta-strength-protocol__step li` was 12px muted → **16px** readable contrast.
- Same floor for autoreg items, ladder, chips, nav, info-rows; eyebrows ≥14px.
- Preference saved in agentmemory.

**Theory presentation canon (textbook cards):**

- Pattern: horizontal carousel / tiny muted slides → **`RevealTimeline`** vertical elevated cards (Определение → Схема → Как применять), prose ~16px.
- Applied: mTOR, special methods, **08 Mechanics** (replaced `MechanicsCarousel`).
- Data: `MECHANICAL_CONCEPTS` now `{id,title,definition,pattern?,bullets}`.
- Reference: `memory-bank/reference/theory-textbook-cards-standard.md`.
- Also: basics chapter order = Bento → see-also → FractionalVolume.

## Сессия (2026-07-15)

**Project junk cleanup:**

- Disk **2.8G → 1.9G**. Removed local: `desktop-dist`, `.logs`, `.playwright-mcp`, `public/backgrounds/intermediate`, `audit/*.{png,gif}`, `apps/macos/node_modules`.
- Git: removed `platforms/` (incl. vendor gems), `training-app-mobile/`, `MapData/`, `yarn.lock`; untracked `agent/` duplicate.
- 62 local `bolt-*` branches deleted (34 branches left).
- Docs/config synced: `STRUCTURE.md`, `docs/ARCHITECTURE.md`, README, eslint, `.gitignore`, `projectbrief.md`.
- Docker kept (optional prod). Typecheck OK. **No commit** until asked.

## Сессия (2026-07-10)

**TabNav flush bottom (iPhone gap fix):**

- Root cause: cascade — `app-layout` `.tab-bar.ta-mode-nav { padding:0; background:transparent }` wiped ios-adaptation safe-area + glass; `#root` still had `padding-bottom: max(32px, sab)` @≤430px.
- Fix: high-specificity dock rule `bottom:0` + `padding-bottom: max(space-1, sab)` inside bar; `#root:has(.app-shell){padding-bottom:0}`; main padding clears dock.
- Files: `ios-adaptation.css`, `app-layout.css`, `tests/ios-adaptation.test.ts`.
- Verify: CDP 390×844 — gap=0, sab=34 → paddingBottom 34px, glass bg restored. Audit: `audit/tab-nav-flush-fix-390.png`.

## Сессия (2026-07-09)

**Journal action buttons → global `.btn`:**

- `JournalSessionEditor`: «Сохранить» = `.btn` (Peak `#ffb020`); «+ Добавить подход» / «Как в прошлый раз» / «Отмена» = `.btn.btn-ghost`.
- Layout helpers: `.journal-actions__add|save|secondary`. История без изменений (`journal-btn--*`).
- Verify: 390px `audit/journal-btn-align-*-390.png`; typecheck OK.

**Light hero per-tab accents (2026-07-09):**

- `app-hero.css`: light theme `--app-hero-accent` зависит от `data-active-tab` (мягкие пастели, не dark neon).
- calculator amber · theory blue · training teal · split violet · journal rose.
- Glass wash/border наследуют accent; CTA Peak `#ffb020` не трогали.
- Verify: `audit/light-hero-glass-{calculator,theory,training,split,journal}-390.png`.

**Auth triptych narrow breathing (2026-07-09):**

- ≤480px: боковые слоты `visibility: hidden`, только центр (`main.png`) — без сближения triptych.
- 481–767px: боковые peek с `inset -8%`, width 26%, opacity 0.68 (зазор к центру ~80px+).
- ≥768px: полный layered triptych. Убраны старые ≤430px правила (42% + min-width 165%), которые сжимали статуи.
- Verify: `audit/auth-triptych-breathing-{390,427,700,900}.png`.

**Auth full-bleed (fix phone-frame):**

- Убран `max-width: 430px` с `.auth-screen` / `ion-app > .auth-screen` — весь экран снова на ширину viewport.
- Узкая только форма: `.auth-stage` → `--auth-form-max: 398px`.
- Статуи по-прежнему от низа; на desktop слоты triptych чуть шире.
- Verify: 904px auth=904 / stage≈400; 390px auth=390.

**Light theme — откат Ghost parchment + Peak yellow CTAs:**

- Pre-parchment surfaces restored (`light-theme.css` HEAD base: `#fafafa` / white cards).
- Canvas `--bg-grouped: #F2F2F7`; ambient/glass/hero без sienna.
- **Primary CTAs app-wide:** `--accent` / `--ta-calc-accent` / `--ta-sec-01` / `--color-accent` = Peak `#ffb020` (не coral `#ff6b35`, не sienna `#8B5E3C`). `.btn` и `.calc-test__submit` наследуют жёлтый.
- Theory: без структурного редизайна; primary accent тоже Peak.

## Сессия (2026-07-07/08)

**UI polish — auth, ambient, split, square radius, Theory chapters:**

- **Auth triptych:** `imagePhone/` (main.png center layered, one.png left, \_(1).png right); hero bento tips; без cyan/crimson glow на фоне.
- **App ambient:** dark — mesh+grain (`app-ambient-background.css`); light — `#F2F2F7` canvas.
- **Light theme:** insight/bento contrast в калькуляторе и Theory shell.
- **Theory strength:** `chapterContent` case `strength` → `<StrengthFormulaSection />` напрямую (без `ta-custom-frame--flush`); hero в panel — `border: none`, negative margin full-bleed (`theory-apple.css`).
- **Theory cardio:** `.ta-cardio-card[data-variant=critical]` — равномерный `border` на всех сторонах (без `border-left` accent).
- **Theory:** chapter panel без фиолетовой left bar.
- **Split UX:** `customExercisesByDay` fix; compact day rows; duplicate exercise button; saved split **Pull + мост** для alien17 (Подтягивания + Ягодичный мост).
- **SplitExercisePicker:** full muscle tint, Lucide icons, square chips `6px` (`--glass-radius-badge`).
- **Square radius:** section pills + `.split-chip` (LegExercisePicker) → `--glass-radius-badge` (6px).
- **Verify (2026-07-08):** `npm run typecheck` + `npm test` 151/151; browser 390px — auth triptych, split picker/saved, calculator light insight, dark ambient. Audit: `audit/*-verify-390.png`.

## Сессия (2026-07-07)

**Ghost palette — откат glow на фонах:**

- Оттенки cyan `#00d4ff` / crimson `#ff2d55` сохранены как CSS-токены в `variables.css` (`--accent-cyan`, `--glow-cyan`, …) для будущего использования на акцентах/UI.
- Убран dual-tone glow с auth triptych (`auth.css`) и logged-in ambient (`app-ambient-background.css`) — чистый `#0a0a0b` + статуи без цветного оверлея.
- Предпочтение пользователя: оттенки нравятся, но **не** на фоне auth/ambient wallpaper.

## Сессия (2026-07-04)

**Интеграция Taste-Skill (design-taste-frontend):**

- Установлен набор из 13 дизайн-скиллов от @Leonxlnx из репозитория `https://github.com/leonxlnx/taste-skill` глобально (`~/.agents/skills/`) и локально (`.agents/skills/`) для всех агентов.
- Интегрирована новая память в `agentmemory` с полным описанием и правилами v2 taste-skill для автоматического использования при генерации фронтенда.
- Добавлены эталонные markdown-файлы в `memory-bank/reference/` (`design-taste-frontend.md`, `redesign-existing-projects.md`, `high-end-visual-design.md`, `minimalist-ui.md`).
- Обновлен каталог и быстрая матрица в `memory-bank/reference/README.md`.

## Сессия (2026-06-30)

**Доработка калькулятора, силовых и снятие ограничений:**

- **Карточка 1ПМ для брусьев и подтягиваний:** Улучшено отображение для упражнений с собственным весом. Основной 1ПМ (например, `135.7 кг`) выведен полужирным наверх, а детали расчёта `(вес тела + доп. вес)` отображаются приглушённым шрифтом на второй строке. Элементы выровнены по базовой линии (`align-items: baseline`).
- **Калькулятор сплита:** Исправлен баг, при котором введённые пользователем значения (вес, повторения, вес тела) сбрасывались после нажатия «День 1» / «День 2». Введённые данные теперь корректно сохраняются в полях ввода благодаря отслеживанию смены упражнения через `useRef` для `selectedKey`.
- **Сохранение в базу:** Метод `setExerciseOneRM` теперь записывает фактический тестовый вес и повторения, введённые пользователем в калькуляторе (например, `100 кг × 6 повт`), вместо записи вычисленного 1ПМ и `1` повторения.
- **Снятие ограничений:** Полностью удалена блокирующая валидация «_Назначьте все 6 групп мышц по одному разу_» из `validateSplit`. В `buildDayPreview` убрана фильтрация по легаси-мышечным группам при наличии `customExercisesByDay`, что позволяет превью недели корректно отображать любые пользовательские упражнения.

**Защита архитектуры и фиксация состояния (Этап 1):**

- **Безопасность инструментов:** В `AGENTS.md` и `memory-bank/techContext.md` внесены правила о Едином источнике правды (Single Source of Truth) и запрете внешних компрессоров памяти. Основным агентом для поддержания структуры Memory Bank зафиксирован текущий активный агент.
- **Срез состояния (React Doctor):** Проведены замеры состояния зависимостей и типов перед будущим рефакторингом. В корне проекта зафиксировано `48/100` (399 предупреждений). В `apps/mobile/` благодаря переходу на ленивую инициализацию анимированных рефов (`useRef` lazy init в `useReadinessScreen.ts` и `useReadinessCardLogic.ts`) показатель улучшен с `62/100` до `67/100` (количество предупреждений снижено с 26 до 23).

## Сессия (2026-06-29)

**Корректировка вводных и интеграция MCP:**

- Уточнены вводные: подтверждён локальный доступ к файловой системе (`AGENTS.md`, `memory-bank/`), скорректировано понимание базы данных (используется SQLite `gym.db`, а не Supabase), а также обнаружена существующая интеграция Playwright и SQLite MCP.
- В файл конфигурации `.mcp.json` добавлены новые сервера: **Sequential Thinking** (пошаговое планирование) и **Context7** (актуальная документация по библиотекам).
- Добавлено постоянное правило для агентов об обязательном использовании пошагового планирования при работе с `packages/shared` и Expo Router.

## Сессия (2026-06-23)

**Конструктор сплита и Пирамиды:**

- Полностью переписана логика Конструктора сплита: убраны ограничения мышечных групп и выделенная секция ног, добавлена `customExercisesByDay` структура с автоматической миграцией.
- Создан глобальный `GlobalExerciseAdder` для ввода 1ПМ и выбора целевого тренировочного дня, убран локальный пикер.
- Реализовано центрирование пирамиды (целевой вес посередине, а не сверху) и показ линейной/пирамидальной схем бок о бок в режиме превью недели.
- **Дизайн:** Фон контейнера превью прогрессии (`.progression-preview`) сделан глубоким черным (`#000000`) для лучшего контраста графиков в темной теме.

## Сессия (2026-06-21)

**Ionic + Capacitor (iOS/Android native shells):** полная интеграция на уровне web + native оболочка.

| Слой             | Путь                                                | Детали                                                     |
| ---------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| Ionic bootstrap  | `src/ionic/setupIonic.ts`, `index.tsx`              | `mode: 'ios'`, ripple off, reduced-motion aware            |
| Theme bridge     | `src/styles/base/ionic-theme.css`                   | `--ion-*` ← project tokens                                 |
| Platform         | `src/platform/*`                                    | `resolveApiBase`, `initNativeShell`, Capacitor back button |
| Capacitor config | `capacitor.config.ts`                               | `com.stevegordiyenko.trainingcalculator`, `webDir: dist`   |
| Native shells    | `ios/`, `android/`                                  | Capacitor 7, plugins: app, status-bar, splash-screen       |
| Scripts          | `cap:sync`, `cap:ios`, `cap:android`, `cap:open:*`  | build → sync → open IDE                                    |
| Reference        | `memory-bank/reference/ionic-capacitor-standard.md` | architecture, dev workflow, Expo coexistence               |

**Expo** (`apps/mobile/`, `apps/macos/`) — **не удалён**; параллельный RN-трек (Readiness, Android release). Primary mobile path для полного web UI = Capacitor.

**Cross-project (MassageHTML):** hero lecture UCS — tokens periodization (`--color-bg-primary #0a0a0b`, `--color-accent #ff6b35`) применены в `MassageHTML_PROJECT/clients/upper-crossed-client-1/lecture.html`; SVG massage scheme заменён на video + A4 print.

**API на native:** `VITE_API_URL` обязателен (absolute URL). Пример: `.env.capacitor.example`. Android emulator → `10.0.2.2`, device → LAN IP.

**Split week model (2026-06-21):** preview now treats week as the main progression unit; same exercise on multiple days keeps the same weekly working weight instead of splitting sets. Added split exercise coverage for `dips` and `deadlift`, plus bodyweight-aware handling for weighted pull-ups/dips.
Validation for this change set: `npm run typecheck`, targeted split/training tests, and `npm run build` all passed.

**Project change log:** append significant edits to `memory-bank/change-log.md` after each meaningful change set.

## Сессия (2026-06-20)

**Ionic Framework (web):** установлен `@ionic/react@8.8.11` в корневой `package.json` (только web `src/`). Bootstrap расширен в сессии 2026-06-21.

## Сессия (2026-05-28)

**PeriodizationChart MAX etalon:** `periodization-chart-standard.md` расширен (~592 строк): phase strip `--ta-sec-02/03/06/01`, orange % line / blue bars, listbox (phase **EN** per code), deload W5, keyboard, reduced motion, CSS L3432–3709.

**Секция 02 «Прогрессия» composite:** `calc-progression-result-standard.md` (insight → NoteBox); cross-link на MAX chart doc.

**ExercisePicker etalon:** TestApproach `ExerciseWheel` → shared `ExercisePicker`; Program 3.0 «На силу» — тот же dropdown UX вместо native select. Reference: `memory-bank/reference/calc-exercise-select-standard.md`.

## Сессия (2026-05-27)

**Calculator tab etalon:** полный scan вкладки «Калькулятор» (Оптимальная + На силу) → `memory-bank/reference/calculator-tab-standard.md` (umbrella); partial standards cross-linked.

**Tech audit:** внешний архитектурный аудит сверен с кодом → `memory-bank/tech-audit-2026-05.md` (коррекции, пропуски, приоритеты).

**Журнал vs калькулятор:** журнал — только факт (вес/повторы по упражнению); график из `userData.journal`, **не** из таблицы 16 нед / presets. Эталон: `memory-bank/reference/journal-progress-chart-standard.md`. Следующий `/build`: `.ta-period` UI на данных журнала.

## Сессия (2026-05-26)

**Context-restore:** Memory Bank прочитан; git status сверен с tasks/progress.

| Поле            | Значение                    |
| --------------- | --------------------------- |
| Активная задача | Нет (Ожидание новой задачи) |
| Следующая фаза  | `/van`                      |

## Постоянное правило для агентов

> **MUST** перед **любой** задачей (не только фазовой) читать:  
> `tasks.md`, `activeContext.md`, `projectbrief.md` (+ `techContext.md`, `style-guide.md` по необходимости).  
> Обновлять Memory Bank в `/build`, `/reflect`, `/archive`.

### Design standards hook (новый UI)

> Перед созданием **любой новой UI-структуры** — **MUST** открыть **`memory-bank/reference/README.md`**, прочитать matching эталон (`*-standard.md` или `theory-design-reference.mdc`) и наследовать его паттерны. Подробности: `systemPatterns.md` → «Design standards workflow».

### Пошаговое планирование (Sequential Thinking)

> Для задач, затрагивающих `packages/shared` или маршрутизацию Expo Router, агент обязан использовать пошаговое планирование (Sequential Thinking) для декомпозиции, строгой типизации и планирования логики перед написанием кода.

## Предпочтения пользователя (обязательно)

| Правило                                  | Детали                                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Memory Bank first**                    | Не начинать работу без чтения `memory-bank/` — это источник правды, не `cursor-memory-bank-main/`                                    |
| **Превью во встроенном браузере Cursor** | MCP `cursor-ide-browser`: `browser_navigate`, `browser_snapshot`, `browser_tabs`                                                     |
| **Не открывать системный браузер**       | Запрещено: macOS `open http…`, `xdg-open`, `start https…` для превью UI                                                              |
| **Dev URL**                              | Локальный превью: `http://localhost:5173` (Vite), API `:3002` (dev-all)                                                              |
| **Native shells**                        | `npm run cap:sync` → `cap:open:ios` / `cap:open:android`; см. `ionic-capacitor-standard.md`                                          |
| **Проверка с помощью react-doctor**      | Всегда запускать `npx react-doctor@latest . --project "*" --yes` после изменения кода, чтобы не вносить новые баги и предупреждения. |

### Источник Memory Bank

- **Канон:** `memory-bank/` + `.cursor/rules/` + `.cursor/commands/`
- **Справочник (не канон):** `cursor-memory-bank-main/` — upstream-шаблон v0.8; паттерны уже интегрированы, не дублировать файлы оттуда в корень

## Design canon (Theory tab)

Эталон визуального языка Theory — **не модифицировать** без явной задачи:

| Артефакт            | Путь                                        |
| ------------------- | ------------------------------------------- |
| Cursor rule         | `.cursor/rules/theory-design-reference.mdc` |
| JS tokens + helpers | `src/hooks/useTheoryDesign.ts`              |
| CSS эталон          | `src/styles/components/theory-apple.css`    |

## Reference: Ionic + Capacitor

| Артефакт    | Путь                                                |
| ----------- | --------------------------------------------------- |
| Full doc    | `memory-bank/reference/ionic-capacitor-standard.md` |
| Config      | `capacitor.config.ts`                               |
| Native dirs | `ios/App/`, `android/app/`                          |

## Режим workflow

- **Phase:** `/build` complete → **`/reflect`** (Ionic + Capacitor)
- **Active task in tasks.md:** Ionic + Capacitor — все чеклисты ✅

## Напоминания

1. Не создавать Memory Bank файлы вне `memory-bank/`
2. Не коммитить без явной просьбы
3. UI changes — следовать `CLAUDE.md` / `style-guide.md`
4. Превью UI — только через MCP `cursor-ide-browser`, не системный браузер
5. Native API: всегда `VITE_API_URL` absolute для Capacitor builds

- **iOS device deploy (2026-06-21):** iPhone SE connected; build/sync OK; `cap run` blocked — enable **Developer Mode** on phone; device API URL `http://192.168.18.22:3002/api`.

## Сессия (2026-08-20) — Numeric font standard + training-load-menu cleanup (Venus, 8dc6e18c)

**Проблема:** warmups/working-sets/note в `.training-load-menu` показывали ui-monospace; note «90–120 градусов» наследовал `font-feature-settings: tnum` от `.ta-shell`.

**Решение:**

- Токены `--training-weight-*` / `--type-num-*` + утилита `.u-num` в `ios-adaptation.css`
- `.training-load-menu.ta-shell` — `font-family: var(--font-system)`, `font-feature-settings: normal`
- Убран monospace с `.training-warmups__*`, `.training-load-menu__work`, mobile `.w-sr`
- `.training-load-menu__note` — 14px system sans, line-height 1.65 (как `.ta-calc-note`)
- `.u-num` на span weight/reps в `TrainingDayCard.tsx`

**Verify:** `npm run typecheck` OK, `npm test` 182/182. agentmemory: mem_mt1oyjlb_082eb25beedd. Коммит не делался.
