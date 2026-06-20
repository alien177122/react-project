# Эталонные design-промты (Design Standards Hook)

> **Обязательный хук для агентов:** перед созданием **любой новой UI-структуры** (секция, компонент, форма, чарт, список) в калькуляторе, тренировках, журнале или Theory shell — **MUST** прочитать этот индекс и применить подходящий эталон из таблицы ниже.

Связанные документы: `docs/design-standards/`, `.cursor/rules/theory-design-reference.mdc`, [CONTRIBUTING.md](../../CONTRIBUTING.md).

---

## Когда читать (WHEN)

| Триггер                                                                      | Действие                                                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Любая работа на вкладке «Калькулятор»** (layout, preset, секции)           | **`calculator-tab-standard.md`** (umbrella) **+** matching partial                               |
| Новая секция калькулятора / Program 2.0                                      | Открыть matching reference **до** `/plan` или `/build`                                           |
| **Секция 02 «Прогрессия»** (insight + 1ПМ + chart + legend, после calculate) | `calc-progression-result-standard.md` + **`periodization-chart-standard.md` (MAX `.ta-period`)** |
| Новый SVG-чарт, график прогрессии, dual-axis                                 | **`periodization-chart-standard.md` (MAX etalon)**                                               |
| Новая форма ввода (stepper, picker, CTA)                                     | `calc-test-approach-standard.md`                                                                 |
| **Exercise dropdown** (trigger + listbox + 1RM badge)                        | `calc-exercise-select-standard.md`                                                               |
| Selectable list, карточки метрик, journal/training rows (03 Сохранённые)     | `calc-saved-exercises-standard.md` — MAX: SectionBlock→card grid, 1RM accent, delete 44px        |
| **Journal progress chart** (факт из записей, не план калькулятора)           | `journal-progress-chart-standard.md`                                                             |
| UI в визуальном языке Theory (`--ta-*`, `.ta-shell`)                         | `.cursor/rules/theory-design-reference.mdc` + `useTheoryDesign.ts`                               |
| Mobile parity (`platforms/mobile/`)                                          | Тот же эталон web + `platforms/mobile/src/theme/Theme.ts`                                        |
| **Anime.js v4** (DOM/SVG анимации, createScope в React)                      | **`animejs/USAGE-INDEX.md`** → `usage/` + IMPLEMENTATIONS + skill + rule                         |
| Багфикс в существующем эталонном компоненте                                  | Reference doc — контекст; не менять паттерн без задачи                                           |

**Не начинать** верстку «с нуля» и не копировать legacy siblings (см. «Sibling (не эталон)» в каждом reference).

---

## Как применять (HOW)

1. **MUST** прочитать полный matching reference doc (не только эту таблицу).
2. **MUST** использовать те же токены (`--ta-*`, `--color-*`), spacing (кратно 4px), типографику и a11y-паттерны из эталона.
3. **MUST** наследовать структуру: hook + parts + co-located CSS; `SectionBlock variant="apple"` где указано в reference.
4. **MUST NOT** дублировать геометрию чартов, legacy `.ta-calc-form` или ad hoc list cards.
5. После `/creative` или `/build` — превью через MCP `cursor-ide-browser` (`http://localhost:5173`).
6. **Расширение канона:** новый gold standard — `docs/design-standards/<name>-standard.md` + строка в таблице ниже + `CHANGELOG.md`.

---

## Каталог эталонов

| Эталон                            | Назначение (одна строка)                                                                     | Путь                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Calculator tab (umbrella)**     | Вся вкладка: picker, hero, 2.0/3.0 секции, переходы; partial standards внутри                | `docs/design-standards/calculator-tab-standard.md`          |
| **Секция 02 Прогрессия (2.0)**    | Composite после calculate: insight, ResultCard, plates?, chart, NoteBox legend               | `docs/design-standards/calc-progression-result-standard.md` |
| **PeriodizationChart**            | **MAX** dual-axis SVG: phase strip `--ta-sec-*`, orange % line, blue bars, listbox, keyboard | `docs/design-standards/periodization-chart-standard.md`     |
| **TestApproachSection**           | Форма ввода калькулятора: stepper 44px, sentence-case labels, CTA с divider                  | `docs/design-standards/calc-test-approach-standard.md`      |
| **ExercisePicker**                | Dropdown упражнения: trigger + listbox, accent bar, 1RM badge, checkmark                     | `docs/design-standards/calc-exercise-select-standard.md`    |
| **Saved exercises list**          | Sec 03 «Сохранённые (N/12)»: `.ta-calc-saved-*`, counter in title, empty=hide section        | `docs/design-standards/calc-saved-exercises-standard.md`    |
| **Journal progress chart**        | Тренд из `userData.journal`; визуал `.ta-period`, **без** плана калькулятора                 | `docs/design-standards/journal-progress-chart-standard.md`  |
| **Theory tab shell**              | Dark editorial UI, `--ta-*` tokens, section accents, motion                                  | `.cursor/rules/theory-design-reference.mdc`                 |
| **Anime.js documentation bank**   | USAGE-INDEX + usage/ + offline 410 + IMPLEMENTATIONS                                         | `memory-bank/reference/animejs/`                            |
| **Anime.js v4 (getting started)** | Install, subpath imports, vanilla/React createScope, engine defaults                         | `memory-bank/reference/animejs-getting-started.md`          |
| **Anime.js × React rollout**      | React docs catalog + phased plan Journal → Calculator                                        | `memory-bank/reference/animejs-react-integration-plan.md`   |

---

## Быстрая матрица «тип UI → эталон»

```
calculator tab (any block / preset switch) → calculator-tab-standard.md (+ partial below)
section 02 progression result block (2.0)  → calc-progression-result-standard.md
chart / progression graph (calculator plan) → periodization-chart-standard.md
journal chart (logged sessions only)      → journal-progress-chart-standard.md
form / input section          → calc-test-approach-standard.md
exercise dropdown / picker    → calc-exercise-select-standard.md
list / selectable cards       → calc-saved-exercises-standard.md
theory-aligned shell / section → theory-design-reference.mdc
anime.js / DOM-SVG animation    → animejs/README.md (full bank) + animejs-react-integration-plan.md (rollout)
```

При нескольких типах в одной секции — читать **все** matching references (например, umbrella + форма + список в Calculator tab).
