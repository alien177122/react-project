# Эталон: график прогрессии в Журнале (факт, не план)

> **Статус:** продуктовое правило + реализация (2026-07-09).  
> **Не путать** с `PeriodizationChart` / `ProgressionPreviewChart` — те **планируют** нагрузку; журнал **фиксирует** факт.  
> **Палитра:** наследует locked gold из [`periodization-chart-standard.md`](./periodization-chart-standard.md) §3.5 — orange line (`--ta-sec-01`), blue bars (`--ta-sec-02`). **Без** cyan overrides.

---

## Продуктовая граница

|                 | **Калькулятор** (`CalculatorTab` / `CalculatorTabV3`)                 | **Журнал** (`JournalTab`)                        |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| Назначение      | План: недели, фазы, %, тестовые «?»                                   | Справочник: что реально сделано в зале           |
| Источник данных | `getPrescription`, `weekSchemes`, presets «Оптимальная» / «На силу»   | `userData.journal[]` — вес, повторы, RPE по дате |
| Таблица 16 нед  | ✅ `CalculatorTabV3` — «03 Таблица весов»                             | ❌ **Запрещено** дублировать план калькулятора   |
| График          | Плановая кривая / preview preset                                      | **Только** из сохранённых сессий                 |
| Связь модулей   | **Нет** импорта journal → calculator или наоборот для отрисовки плана |                                                  |
| Палитра SVG     | `.ta-period` orange/blue etalon                                       | **Та же** `.ta-period` палитра (не cyan)         |

Пользователь: выбирает упражнение → вводит подходы (вес × повторы) → график строится **постфактум** из истории.

---

## Текущая реализация (код)

| Слой    | Путь                                                           | Поведение                                                                                                           |
| ------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Экран   | `src/screens/JournalTab.tsx`                                   | `useJournal`, секция «Тренд 1ПМ»                                                                                    |
| Хук     | `packages/shared/src/hooks/useJournalProgressChart.ts`         | Геометрия как `usePeriodization`; домен из `JournalSession[]`                                                       |
| Метрики | `packages/shared/src/utils/journalMetrics.ts`                  | e1RM Brzycki-подобный `weight * (1 + reps/30)`, пик по сессии                                                       |
| График  | `src/components/journal/JournalProgressChart.tsx`              | `.ta-period`: orange e1RM-линия + blue bars объёма, listbox «Сесс N»; **7** Y-grid линий + подписи (`Y_GRID_COUNT`) |
| CSS     | `theory-apple.css` `.ta-period*` + layout-only в `journal.css` | **Нет** перекраски line/bar/point — только margin/padding секции                                                    |

---

## UI (наследование эталона без плана)

Наследовать **язык и палитру** из `periodization-chart-standard.md`:

- `.ta-period` / горизонтальная ось = **хронология сессий** (дата `DD.MM` или «Сесс N»), не «Нед 1…16» из программы
- Оранжевая линия (`--ta-sec-01`) = **фактический** пик 1ПМ по сессии
- Синие столбцы (`--ta-sec-02`) = **объём** сессии (нормализованная высота bars)
- Правая ось label: «объём» (не «повт» плана) — смысл данных журнала, визуал bars тот же
- Listbox: дата · 1ПМ кг · схема (из записанных подходов) · повторы — **без** колонки «Фаза»
- **Без** phase strip ACCUMULATION/… — фазы программы не показывать
- Markers: orange stroke + surface fill (как калькулятор), active → orange fill

---

## Empty / copy (канон)

- Заголовок секции: «Тренд 1ПМ» (или «Прогресс по записям»)
- Hint вкладки: факт в зале, не план калькулятора
- Empty: «Запиши первый подход» — без отсылки к неделям программы

---

## Sibling (не эталон данных)

- `PeriodizationChart` — план Program 2.0 (**MAX visual etalon**)
- `ProgressionPreviewChart` — demo preset до расчёта
- `ProgramV3ProgressChart` — 16 нед V3
- Таблица `CalculatorTabV3` — prescription table, не журнал

---

## Чеклист для `/build`

- [x] `useJournalProgressChart(sessions)` + компонент на `.ta-period` CSS
- [x] Listbox из реальных `JournalSet[]`
- [x] Нет импортов `getPrescription`, `progressionPresets`, `getWeekScheduleV3` в `src/components/journal/`
- [x] Палитра = etalon orange/blue (удалены cyan overrides в `journal.css`)
- [x] a11y: listbox, keyboard, `prefers-reduced-motion`
- [x] Превью `cursor-ide-browser` на вкладке Журнал с 2+ сессиями
