# Progress

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

## Archive index

_Пусто — первые архивы появятся после `/archive`._
