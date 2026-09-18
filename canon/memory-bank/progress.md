# Progress

## Saved split calculations in constructor (2026-08-30)

- Moved the existing `splitCalculations` history to the bottom of section 01, where the split is named and opened.
- History cards now show concrete day/exercise rows and captured test inputs; the name field explains surname/person grouping and multiple calculations.
- Selecting a card loads its snapshot into the constructor; recalculation updates the selected calculation id, while new/duplicated/abstract splits create a new snapshot.
- Existing confirmation dialog handles deletion and clears the selected forecast when the last record is removed.
- Verification: `npm run typecheck` pass; 30 focused tests pass; changed-file ESLint pass; Playwright desktop + 390px save/open/update/delete/reload/overflow checks pass.
- Full `npm test` retains one pre-existing `ios-adaptation.test.ts` failure; full lint retains legacy failures outside changed files.

## Theory frac gold restyle (2026-08-26)

- Header `.ta-chapter-panel__title-wrap`: left title/lede, pill right (not centered column)
- Shared lecture mapped to `.ta-frac` language; unique widgets 02–10 + reading left-aligned
- Copy: 10.1 names макро/мезо/микро/сессия/метод; 03/06/09 meta pedagogy removed
- Standard: `memory-bank/reference/theory-frac-volume-standard.md`

## Numeric font standard (2026-08-20, Venus, 8dc6e18c)

- Completed training-load-menu font cleanup: warmups, working-sets, note, scheme headers
- Tokens `--type-num-*` + `.u-num`; removed ui-monospace from all `.training-load-menu` children
- `npm run typecheck` OK · `npm test` 182/182 · agentmemory mem_mt1oyjlb_082eb25beedd

## Auth fix (2026-08-15, Venus)

- Auth hero black stripe center cover + light theme auth card; typecheck + tests pass; reports in `D:\Mac\OUTBOX` (2220, 2227).

## Uncle Bob Quality Gates (2026-07-30)

| Проверка                         | Статус                        |
| -------------------------------- | ----------------------------- |
| Dual backup Mini_hdd + DATA_1TB  | ✅ in progress / dest created |
| Constitution + Cursor rule       | ✅                            |
| Gherkin acceptance (6 scenarios) | ✅                            |
| Mutation `calc.ts` kill rate     | ✅ 100% (8/8), floor 80%      |
| CRAP-lite shared utils           | ✅ (1 legacy allowlist)       |
| `npm run typecheck`              | ✅                            |
| `npm test`                       | ✅ 160                        |
| `npm run quality`                | ✅ scripts wired              |

## Store roadmap (2026-07-27) — без Telegram

| Фаза | Название                            | Статус                                                          |
| ---- | ----------------------------------- | --------------------------------------------------------------- |
| 0    | Local-dev (Vite + Expo Metro + API) | ✅ code; ⏳ iOS Simulator runtime missing on Mac                |
| 1    | Core API + entitlements             | ⏳                                                              |
| 2    | Mobile UX (Expo)                    | ✅ Waves 0–5 flat port (calc/train/journal/split/theory + auth) |
| 3    | Web billing (Stripe/Kaspi)          | ⏳                                                              |
| 4    | TestFlight / EAS                    | ⏳                                                              |
| 5    | App Store + IAP                     | ⏳                                                              |
| 6    | CI (EAS + Fastlane metadata)        | ⏳                                                              |
| —    | Telegram MVP                        | ⏸ deferred                                                      |

**Phase 0 notes:** react root pinned `19.1.0`; metro resolve `mobile→root`; API often `:3002`; `apps/mobile/ENV.md`.

**Expo port 2026-07-31:** SessionProvider, 5 tabs, shared hooks; `apps/mobile` tsc OK. Install iOS runtime via Xcode → Settings → Platforms before `expo start --ios`.

Canon: `memory-bank/creative/creative-store-roadmap.md`  
Archived prior task: `memory-bank/archive/archive-theory-textbook-pedagogy-ch01.md`

## Theory textbook cards (2026-07-16)

| Проверка                                | Статус |
| --------------------------------------- | ------ |
| Mechanics → `RevealTimeline`            | ✅     |
| `MechanicsCarousel` removed             | ✅     |
| `theory-textbook-cards-standard.md`     | ✅     |
| `npm run typecheck`                     | ✅     |
| `npm test` (158)                        | ✅     |
| Preview `?tab=theory&chapter=mechanics` | ✅     |

## UI session verify (2026-07-08)

| Проверка                        | Статус                                                                      |
| ------------------------------- | --------------------------------------------------------------------------- |
| `npm run typecheck`             | ✅ pass                                                                     |
| `npm test` (151)                | ✅ pass                                                                     |
| Auth triptych 390px             | ✅ `audit/auth-triptych-verify-390.png`                                     |
| Calculator light insight        | ✅ `audit/light-theme-insight-verify-390.png`                               |
| Split saved Pull+мост, picker   | ✅ `audit/split-verify-light-390.png`, `split-ex-picker-verify-390.png`     |
| Dark ambient split              | ✅ `audit/split-dark-ambient-verify-390.png`                                |
| `.split-chip` square 6px        | ✅ CSS fix in `split-constructor.css`                                       |
| Theory strength flat hero 390px | ✅ `audit/strength-chapter-flat-verify-390.png` (hero border 0, full-bleed) |
| Theory cardio uniform borders   | ✅ `audit/cardio-borders-verify-390.png` (critical 1px all sides)           |

Git: крупный uncommitted diff; коммит не делался.

## Memory Bank installation (2026-05-24)

| Шаг                                                          | Статус     |
| ------------------------------------------------------------ | ---------- |
| Sync `.cursor/commands/` from source                         | ✅ Done    |
| Sync `.cursor/rules/isolation_rules/`                        | ✅ Done    |
| Create/update `memory-bank/` core files                      | ✅ Done    |
| Add `style-guide.md`                                         | ✅ Done    |
| Create `creative/`, `reflection/`, `archive/` dirs           | ✅ Done    |
| Update `react-training-memory-bank.mdc` (mandatory workflow) | ✅ Done    |
| Populate project analysis + latest changes snapshot          | ✅ Done    |
| User runs first `/van` on real task                          | ⏳ Pending |

## Project maturity snapshot

| Area                    | Status                                         |
| ----------------------- | ---------------------------------------------- |
| Web app (Vite/React)    | Active redesign; large uncommitted diff        |
| Shared package          | Expanded (v3 program, journal, split)          |
| Server/API              | Modified (schema, app.js); tests updated       |
| Mobile Readiness        | New feature scaffold (untracked)               |
| Android release tooling | New scripts + gradle (untracked/partial)       |
| Docker                  | Configured (`docker-compose.yml`, npm scripts) |
| Public tunnel           | Cloudflare via `public-run.mjs`                |
| Desktop Electron        | Documented in README                           |
| PWA / Vercel deploy     | Documented; `VITE_API_URL` required            |

## Observations

### PeriodizationChart reference (2026-05-25)

- Полный анализ `PeriodizationChart` + `usePeriodization` → `memory-bank/reference/periodization-chart-standard.md`
- Зафиксирован как канон dual-axis chart (Program 2.0); pointer в `systemPatterns.md`, `activeContext.md`
- Сравнение с `ProgressionPreviewChart` (preset demo) — gaps и checklist для новых charts

### TestApproachSection reference (2026-05-25)

- Полный design-анализ секции «01 Тестовый подход» → `memory-bank/reference/calc-test-approach-standard.md`
- Зафиксирован как канон calculator input forms: `.calc-test-section`, unified stepper, CTA divider, `@container` layout
- Pointer в `systemPatterns.md`, `activeContext.md`; sibling legacy `.ta-calc-form` помечен как не эталон

### Saved exercises list reference (2026-05-25)

- Полный design-анализ секции «03 Сохранённые (N/12)» → `memory-bank/reference/calc-saved-exercises-standard.md`
- Зафиксирован как канон selectable list cards: `.ta-calc-saved-*`, orange 1RM metric, left-rail active, delete 44px
- Pointer в `systemPatterns.md`, `activeContext.md`, `style-guide.md`, `react-training-memory-bank.mdc`

### Journal + Split design adaptation (2026-05-25)

- Единый flat shell без двойных карточек; секции через `.app-tab-section`
- Журнал: восстановлены edit/delete истории через draft-секцию «Запись»
- Сплит: muscle grid и preview в card-секциях; decoupling от journal CSS
- Удалены orphan: `JournalMetricsSummary`, `JournalEmptyState`, local `journalMetrics.ts`, `journalUtils.ts`

## Session restore (2026-05-26)

- Context-restore: tasks.md ↔ activeContext синхронизированы (Journal+Split → `/reflect`)
- Git: **~60+ modified**, **~100+ untracked** — web redesign (calculator/theory/training/journal/split), shared v3, server schema, mobile Readiness scaffold, Android release scripts, agent infra (`.cursor/`, `.claude/`, `.codex/`)
- Ничего не закоммичено; `gym.db` modified локально (не в git)

## Split week model (2026-06-21)

- Split preview moved to a week-first model: the week is the unit of progression and working weight stays constant across sessions in the same week.
- Added shared split catalog entries for `dips` and `deadlift`, plus bodyweight-aware handling for weighted pull-ups/dips.
- Introduced `memory-bank/change-log.md` as an append-only project change log for rollback-oriented notes.

## Split Constructor Decoupling & Centered Pyramids (2026-06-23)

- Decoupled exercise assignments in Split Constructor from strict muscle groups, allowing any exercise on any day.
- Implemented global `GlobalExerciseAdder` at the top of the Constructor, requiring weight validation before adding to days.
- Centered pyramid schemes around the target weight and reps, creating balanced descending/ascending sets.
- Rendered linear and pyramid schemes side-by-side inside the `SplitPreview` rows.

## Archive index

- **[archive-ionic-capacitor-integration.md](archive/archive-ionic-capacitor-integration.md)** — Ionic React + Capacitor 7 native shells integration (2026-07-04)

## Split calculation history (2026-08-05)

- Added account-scoped `splitCalculations` snapshots with calculation date, split configuration, captured strength inputs, and independent completion progress.
- Section 04 now restores the active forecast after reload and exposes a selectable history list.
- Server/client normalization preserves the new fields; two regression tests cover API round-trip and client load.
- Validation: `npm test` 167/167, `npm run typecheck`, scoped ESLint; embedded-browser reload and iPhone 390px overflow check passed.
