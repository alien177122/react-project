# Active Context

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

| Поле            | Значение                                                         |
| --------------- | ---------------------------------------------------------------- |
| Активная задача | **Адаптация дизайна: Журнал + Сплит** — `/build` завершён (L3)   |
| Следующая фаза  | **`/reflect`** → затем `/archive`; либо `/van` для новой задачи  |
| План сессии     | Reflect Journal+Split **или** выбор следующей задачи из WIP ниже |

## Текущий фокус

**Journal + Split redesign** — build complete (typecheck ✅, tests 108/108 ✅, browser preview ✅).  
Theory design system artifacts — также завершены (отдельная ветка работ в tasks.md).

Если пользователь не продолжает reflect — большой **незакоммиченный WIP** в репо (web redesign, mobile Readiness, Android release, infra).

## Постоянное правило для агентов

> **MUST** перед **любой** задачей (не только фазовой) читать:  
> `tasks.md`, `activeContext.md`, `projectbrief.md` (+ `techContext.md`, `style-guide.md` по необходимости).  
> Обновлять Memory Bank в `/build`, `/reflect`, `/archive`.

### Design standards hook (новый UI)

> Перед созданием **любой новой UI-структуры** — **MUST** открыть **`memory-bank/reference/README.md`**, прочитать matching эталон (`*-standard.md` или `theory-design-reference.mdc`) и наследовать его паттерны. Подробности: `systemPatterns.md` → «Design standards workflow».

## Предпочтения пользователя (обязательно)

| Правило                                  | Детали                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Memory Bank first**                    | Не начинать работу без чтения `memory-bank/` — это источник правды, не `cursor-memory-bank-main/` |
| **Превью во встроенном браузере Cursor** | MCP `cursor-ide-browser`: `browser_navigate`, `browser_snapshot`, `browser_tabs`                  |
| **Не открывать системный браузер**       | Запрещено: macOS `open http…`, `xdg-open`, `start https…` для превью UI                           |
| **Dev URL**                              | Локальный превью: `http://localhost:5173` (Vite), API `:3001`                                     |

### Источник Memory Bank

- **Канон:** `memory-bank/` + `.cursor/rules/` + `.cursor/commands/`
- **Справочник (не канон):** `cursor-memory-bank-main/` — upstream-шаблон v0.8; паттерны уже интегрированы, не дублировать файлы оттуда в корень

## WIP в репозитории (не закоммичено)

1. **Mobile Readiness** (`apps/mobile/`) — новый экран, mock data, hooks, theme
2. **Android release** (`apps/macos/`) — gradle updates, release scripts, key.properties.example
3. **Web redesign** — calculator, theory, training tabs, CSS consolidation (61+ modified files)
4. **Shared expansion** — program v3, journal, split hooks/utils
5. **Infra** — Docker, Cloudflare public tunnel, GitHub Android APK workflow

## Состояние Memory Bank

| Элемент                          | Статус                              |
| -------------------------------- | ----------------------------------- |
| `.cursor/commands/`              | Синхронизировано из Projects source |
| `.cursor/rules/isolation_rules/` | Синхронизировано                    |
| `memory-bank/` core files        | Обновлены (2026-05-24)              |
| `react-training-memory-bank.mdc` | Усилено (alwaysApply)               |

## Design canon (Theory tab)

Эталон визуального языка Theory — **не модифицировать** без явной задачи:

| Артефакт            | Путь                                        |
| ------------------- | ------------------------------------------- |
| Cursor rule         | `.cursor/rules/theory-design-reference.mdc` |
| JS tokens + helpers | `src/hooks/useTheoryDesign.ts`              |
| CSS эталон          | `src/styles/components/theory-apple.css`    |

Новые Theory-aligned компоненты: `var(--ta-*)`, `accentVars()` / `taAccentStyle()`, `useTheoryDesign()` для spacing/typography/motion.

## Reference: Calculator tab (umbrella)

Эталон **всей вкладки «Калькулятор»** — picker, hero, Program 2.0/3.0, переходы; **анализ 2026-05-27**:

| Артефакт               | Путь                                                 |
| ---------------------- | ---------------------------------------------------- |
| **Umbrella reference** | `memory-bank/reference/calculator-tab-standard.md`   |
| Tab orchestration      | `src/components/app/TabPanel.tsx`                    |
| Preset + preview       | `ProgressionPresetPicker`, `ProgressionPreviewChart` |
| Program 2.0 body       | `src/screens/CalculatorTab.tsx`                      |
| Program 3.0 body       | `src/screens/CalculatorTabV3.tsx`                    |
| Hero                   | `src/components/ui/SceneHero.tsx`                    |

Partial standards (секции внутри tab): `calc-progression-result-standard.md` (sec 02), `calc-test-approach-standard.md`, `periodization-chart-standard.md` (**MAX**), `calc-saved-exercises-standard.md`.

## Reference: Секция 02 «Прогрессия» (Calculator 2.0)

Эталон **composite блока после расчёта** — **анализ 2026-05-28**:

| Артефакт                 | Путь                                                                       |
| ------------------------ | -------------------------------------------------------------------------- |
| **Полный reference doc** | `memory-bank/reference/calc-progression-result-standard.md`                |
| Orchestration            | `src/screens/CalculatorTab.tsx` L119–184                                   |
| Blocks                   | `.insight`, `ResultCard`, `PlateDiagram?`, `PeriodizationChart`, `NoteBox` |
| Scroll anchor            | `div[ref=resultRef]` + `scrollIntoView` on `activeKey` change              |

Chart geometry: **`periodization-chart-standard.md` (MAX etalon `.ta-period`)**.

**Язык фаз:** listbox/strip — English; tooltip `phaseHint()` — RU.

## Reference: PeriodizationChart (Calculator 2.0)

Эталон dual-axis chart + week listbox — **MAX expansion 2026-05-28**, не менять поведение без задачи:

| Артефакт              | Путь                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------- |
| **MAX reference doc** | `memory-bank/reference/periodization-chart-standard.md`                               |
| Component             | `src/components/PeriodizationChart.tsx`                                               |
| Hook                  | `src/hooks/usePeriodization.ts`                                                       |
| CSS                   | `src/styles/components/theory-apple.css` (`.ta-period`, L3432–3709)                   |
| Parent / composite    | `CalculatorTab` → `SectionBlock num="02"` — см. `calc-progression-result-standard.md` |

Sibling (не эталон): `ProgressionPreviewChart` под `ProgressionPresetPicker` — demo для preset, ось **кг**, горизонтальный layout как `PeriodizationChart` (phase strip + listbox).

## Reference: TestApproachSection (Calculator 2.0)

Эталон **формы ввода** калькулятора — секция «01 Тестовый подход», **анализ 2026-05-25**:

| Артефакт                 | Путь                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| **Полный reference doc** | `memory-bank/reference/calc-test-approach-standard.md`            |
| Section                  | `src/components/calculator/TestApproachSection.tsx`               |
| Metrics                  | `src/components/calculator/TestApproachMetrics.tsx`               |
| CSS                      | `src/styles/components/calculator/calc-test-approach.css`         |
| Shell                    | `src/components/SectionBlock.tsx` (`variant="apple"`, `num="01"`) |
| Parent                   | `CalculatorTab` → `.ta-shell`                                     |

Sibling (не эталон): legacy `.ta-calc-form` в `theory-apple.css` — ALL CAPS labels, крупные steppers; не использовать для новых форм.

## Reference: Saved exercises list (Calculator 2.0)

Эталон **selectable list cards** — секция «03 Сохранённые (N/12)», **MAX detail 2026-05-28**:

| Артефакт                 | Путь                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Полный reference doc** | `memory-bank/reference/calc-saved-exercises-standard.md` (15 §, DOM+CSS inventory)        |
| Markup                   | `src/screens/CalculatorTab.tsx` L187–234 — inline, no `SavedExercisesList`                |
| CSS                      | `theory-apple.css` L3711–3837 — `.ta-calc-saved-list`, `.ta-calc-saved-card`, `__*`       |
| Shell                    | `SectionBlock variant="apple"` — `ta-section`+`ta-calc-section`, pill `03`, title `(N/M)` |
| Handlers                 | `useCalculatorState` — `handleSelectSaved`, `handleDelete`                                |
| Delete                   | `Button sm danger`, scoped 44×44, `aria-label` «Удалить {name}»                           |

Sibling (не эталон): `training-app-mobile` / `apps/macos` — без orange 1RM; title `·` вместо `()`.

## Режим workflow

- **Phase:** `/build` complete → **`/reflect`** (Journal+Split)
- **Active task in tasks.md:** «Адаптация дизайна: Журнал + Сплит» — все чеклисты ✅
- **Theory DS:** завершено ранее; archive после reflect при необходимости

## Напоминания

1. Не создавать Memory Bank файлы вне `memory-bank/`
2. Не коммитить без явной просьбы
3. UI changes — следовать `CLAUDE.md` / `style-guide.md`
4. Превью UI — только через MCP `cursor-ide-browser`, не системный браузер
5. Опционально удалить дубликат `cursor-memory-bank-main/` в корне (не нужен после merge в `.cursor/`)
