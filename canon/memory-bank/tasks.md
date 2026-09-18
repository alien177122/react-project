# Tasks

## Текущая задача

**Сохранённые расчёты в конструкторе сплита (2026-08-30)**

- **Цель:** показать конкретные сохранённые программы внизу секции 01 и дать открыть, пересчитать/обновить или удалить выбранный расчёт.
- **План:** `memory-bank/plans/2026-08-30-saved-calculations-in-split-constructor.md`
- **Phase:** `/build`

### Checklist

- [x] История использует существующий `UserData.splitCalculations`, без нового store
- [x] Карточки показывают дни, упражнения и тестовые параметры
- [x] Имя/фамилия и несколько расчётов объяснены в поле названия
- [x] Открытие и пересчёт обновляют выбранный расчёт; удаление подтверждается
- [x] Focused tests, typecheck, targeted lint и desktop/390px Playwright verify
- [x] Полный `npm test` выполнен — один pre-existing fail в `ios-adaptation.test.ts`
- [x] Полный `npm run lint` выполнен — pre-existing legacy errors вне изменённых файлов

## Предыдущая задача

> Источник правды для активной задачи. Очищается после `/archive`; история — в `memory-bank/archive/`.

## Текущая задача

**Theory article system (2026-08-26)**

- **Цель:** дизайн + алгоритм + лексикон. 01/02/frac не трогать.
- **Phase:** `/build` (канон, не UI)
- **План:** `memory-bank/plans/2026-08-26-theory-content-algorithm.md`
- **Эталон:** `memory-bank/reference/theory-article-algorithm.md`

## Checklist

- [x] Шапка `#chapter-panel`: title+lede слева, пилюля справа (не центр)
- [x] Shared lecture CSS → frac (topic=rule, glossary=terms, callout=bronze, без 42em)
- [x] Мета-копирайт 03 / 06 / 09 / 10.1 переписан на факты
- [x] Уникальные виджеты 02–10 + reading: left titles
- [x] Browser: desktop + 390px gold (basics) + progression + reading (Playwright; MCP tab failed)
- [x] `npm run typecheck` OK; lecture tests OK; `ios-adaptation.test.ts` fail — pre-existing, not this CSS

## Out of scope

Clomiphene article · macos/mobile Theory rewrite · commit
