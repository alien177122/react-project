# Эталон: график прогрессии в Журнале (факт, не план)

> **Статус:** продуктовое правило + целевой паттерн (2026-05-27).  
> **Не путать** с `PeriodizationChart` / `ProgressionPreviewChart` — те **планируют** нагрузку; журнал **фиксирует** факт.

---

## Продуктовая граница

|                 | **Калькулятор** (`CalculatorTab` / `CalculatorTabV3`)                 | **Журнал** (`JournalTab`)                        |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| Назначение      | План: недели, фазы, %, тестовые «?»                                   | Справочник: что реально сделано в зале           |
| Источник данных | `getPrescription`, `weekSchemes`, presets «Оптимальная» / «На силу»   | `userData.journal[]` — вес, повторы, RPE по дате |
| Таблица 16 нед  | ✅ `CalculatorTabV3` — «03 Таблица весов»                             | ❌ **Запрещено** дублировать план калькулятора   |
| График          | Плановая кривая / preview preset                                      | **Только** из сохранённых сессий                 |
| Связь модулей   | **Нет** импорта journal → calculator или наоборот для отрисовки плана |                                                  |

Пользователь: выбирает упражнение → вводит подходы (вес × повторы) → график строится **постфактум** из истории.

---

## Цветовая гамма (JournalTab)

> Эталон UI на скриншоте: `main.app-tab-shell--journal` — тёмный zinc-фон, карточки `--surface`, **оранж** для e1RM/дельты, **синий** для объёма.

### Два слоя токенов

| Слой          | Scope CSS                       | Источник                                 | Назначение                                         |
| ------------- | ------------------------------- | ---------------------------------------- | -------------------------------------------------- |
| **Tab shell** | `.app-tab-shell--journal`       | `src/styles/base/variables.css`          | фон страницы, секции, формы, stat-карточки, кнопки |
| **Chart**     | `.ta-shell.journal-chart-shell` | `src/styles/components/theory-apple.css` | SVG-линия e1RM, столбцы объёма, listbox недель     |

**MUST NOT** подставлять raw hex в компонентах — только semantic tokens ниже.

### Shell (`variables.css`)

| Token                          | Значение                             | Где на экране                                                |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------ |
| `--bg`                         | `#0a0a0b`                            | фон `main.app-tab-shell`                                     |
| `--surface`                    | `#141415`                            | карточка секции «Тренд 1ПМ» (`.app-tab-section`)             |
| `--surface-raised`             | `#1d1d1d`                            | stat-карточки, picker trigger, inputs                        |
| `--border` / `--border-subtle` | `#252525` / `rgba(255,255,255,0.04)` | разделители, рамки                                           |
| `--text`                       | `#e8e8e9`                            | заголовок «Журнал», e1RM «117.0 кг»                          |
| `--text-secondary`             | `#9a9a9c`                            | hint, labels, «ТРЕНД 1ПМ», legend text                       |
| `--accent`                     | `#ff6b35`                            | **Δ «+12 кг»**, focus ring, primary CTA, «сегодня» в истории |
| `--red`                        | `#ff4d4d`                            | отрицательная дельта (`.journal-chart-stat--delta.is-down`)  |

### Chart (`.ta-shell` внутри графика)

| Token                              | Значение                 | Где на экране                                |
| ---------------------------------- | ------------------------ | -------------------------------------------- |
| `--ta-calc-accent` → `--ta-sec-01` | `#ff9f40`                | **линия e1RM**, точки, active listbox border |
| `--ta-sec-02`                      | `#5ba4ff`                | **столбцы объёма** (opacity 0.72)            |
| `--ta-calc-surface`                | `#151a22`                | fill активной точки (stroke = accent)        |
| `--ta-calc-border`                 | `rgba(148,163,184,0.14)` | listbox «Запись N»                           |

Легенда: `.journal-period__legend-item--fact` → orange line; `--volume` → blue bar swatch.

### TabNav (контекст скриншота)

| Элемент                  | Token                                  |
| ------------------------ | -------------------------------------- |
| Активная иконка «Журнал» | `--ta-calc-accent` (`#ff9f40`)         |
| Sliding indicator border | `color-mix(..., --ta-calc-accent 32%)` |
| Неактивные табы          | `--ta-text-dim` / `--text-secondary`   |

### Два оттенка оранжевого (намеренно)

| Token              | Hex       | Роль                                |
| ------------------ | --------- | ----------------------------------- |
| `--accent`         | `#ff6b35` | UI shell: дельта, CTA, focus        |
| `--ta-calc-accent` | `#ff9f40` | Chart + nav: линия e1RM, active tab |

Визуально близки; **не унифицировать** без design-задачи — chart наследует калькулятор/Theory, shell — глобальный accent.

### Anime.js / motion в Journal

При анимации внутри Journal **MUST** читать computed `--accent` / `--ta-calc-accent` (или задавать через CSS classes), не invent hex:

```typescript
// e1RM reveal — stroke/fill из chart accent
animate('.ta-period__line--journal', {opacity: [0, 1], duration: 400});

// stat delta pulse — только если !useReducedMotion()
// цвет остаётся в CSS (.journal-chart-delta { color: var(--accent) })
animate(el, {scale: [1, 1.02, 1], duration: 300});
```

Канон motion: `memory-bank/reference/animejs-getting-started.md` § «Интеграция с проектом».

---

## Текущая реализация (код)

| Слой    | Путь                                                   | Поведение                                                                        |
| ------- | ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Экран   | `src/screens/JournalTab.tsx`                           | `useJournal`; график только `sessions`                                           |
| Хук     | `packages/shared/src/hooks/useJournalProgressChart.ts` | 8 слотов, только `JournalSession[]` — без `ExerciseConfig` / `SavedExercise`     |
| Метрики | `packages/shared/src/utils/journalMetrics.ts`          | e1RM Epley `weight × (1 + reps/30)`, пик = max по сетам; объём = `Σ weight×reps` |
| Справка | `src/components/journal/JournalMetricsHelp.tsx`        | `<details>` «Как считаются метрики» под легендой (Epley, tonnage, 8 слотов)      |
| График  | `src/components/journal/JournalProgressChart.tsx`      | `.ta-period`: оранжевая e1RM-линия + синие столбцы объёма, listbox «Запись N»    |

**Вывод (2026-05-31):** оверлей калькулятора (план, фазы Объём/Сила/Пик, эталонные столбцы/линия) **удалён**. Калькулятор не влияет на отрисовку журнала.

---

## Целевой UI (наследование эталона без плана)

Наследовать **язык** из `periodization-chart-standard.md`:

- `.ta-period` / горизонтальная ось = **хронология сессий** (дата или «Сессия N»), не «Нед 1…16» из программы
- Оранжевая линия = **фактический** рабочий вес или пик 1ПМ по сессии (настраиваемая метрика)
- Синие столбцы = **объём** сессии (`Σ вес×повторы`) из журнала
- Listbox: дата · вес · схема (из записанных подходов) · повторы — **без** колонок «Фаза» / «Нагрузка» из калькулятора
- **Без** phase strip «Подготовка / Мезоцикл / Тест» — фазы программы не показывать

Новый hook (план): `useJournalProgressChart(sessions)` — геометрия как `usePeriodization`, домен из `JournalSession[]`, не из `ExerciseConfig.percentages`.

---

## Empty / copy (канон)

- Заголовок секции: «Тренд 1ПМ» (или «Прогресс по записям»)
- Hint вкладки: факт в зале, не план калькулятора
- Empty: «Запиши первый подход» — без отсылки к неделям программы

---

## Sibling (не эталон)

- `PeriodizationChart` — план Program 2.0
- `ProgressionPreviewChart` — demo preset до расчёта
- Таблица `CalculatorTabV3` — prescription table, не журнал

---

## Чеклист для `/build`

- [x] `useJournalProgressChart(sessions)` + компонент на `.ta-period` CSS
- [x] Listbox из реальных `JournalSet[]` («Запись N», дата, e1RM)
- [x] Нет `ExerciseConfig` / `SavedExercise` / `calcWorkingWeight` в journal chart
- [x] a11y: listbox, keyboard, `prefers-reduced-motion`
- [x] Превью `cursor-ide-browser` 390px, `?tab=journal&exercise=bench`
- [x] `JournalMetricsHelp` — формулы e1RM (Epley) и объём (кг×повт) в UI

### Формулы (источник правды — код)

- **e1RM:** `e1rm(w,r) = w × (1 + r/30)` (Epley); **сессия** = `max` по всем сетам; линия = последние 8 сессий по дате.
- **Объём:** `sessionVolume` = сумма `weight × reps`; высота столбца ∝ объём / max среди слотов на графике (не «только повторы»).
- **Δ «За 4 нед»:** `deltaLastWeeks(buildPeakSeries(...), 4)` по датам журнала.
