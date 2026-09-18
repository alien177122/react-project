# План: статья late-dinner — панель на всю ширину

**Дата:** 2026-08-25  
**Статус:** готово  
**Scope:** только `chapter=late-dinner`. Общий CSS лекций уже в `.ta-chapter-panel__body[data-chapter]`. Текст статьи не трогать. Коммит не делать.

## Цель

Открытая статья **late-dinner** в `#chapter-panel` читается на полную ширину `.ta-chapter-panel__body` минус padding — не узкая левая полоса `42em`. Заголовки и схемы (`.ta-pattern-formula`) по центру. Блок ссылок «В приложении» (`.ta-reading-app-links`) на всю ширину колонки. На 390px нет overflow-x.

## Критерий готовности

- Desktop: колонка лекции ≈ ширина body панели минус padding.
- Заголовки intro/section/topic и `.ta-pattern-formula` по центру.
- `.ta-reading-app-links` и `.ta-see-also` не остались узкой полосой слева.
- 390×844: `scrollWidth` документа / панели не больше `clientWidth`.
- Блок `.ta-chapter-panel__body[data-chapter]` в `theory-apple.css` не переписан.
- Copy статьи (`packages/shared/src/data/theory.ts`, `ReadingLecturePage` copy) не тронут.
- Коммит не создан.

## Пункты

1. Этот план-файл.
2. Browser MCP: `?tab=theory&chapter=late-dinner` (viewId `ff2755` или newTab). Скрыть Eruda. Замерить ширины body vs лекция / links. Скриншот desktop.
3. Эмуляция 390×844; overflow-x.
4. Если leftover-виджеты (see-also, app-links, уникальные chips) ещё узкие — CSS только под `[data-chapter='late-dinner']`. Shared `[data-chapter]` не трогать.
5. Перезамер. Отчёт: ширины, overflow, файлы, leftovers.

## Вне скоупа

Главы 01–10. Статьи `diabetes-habits` и `anabolic-vessels`. Текст лекции. Shared full-width селекторы. Git commit.

## Результат

Цель достигнута. Уникального интерактива у статьи нет (только лекция + ссылки). Leftover: `.ta-reading-app-links` и `.ta-see-also` под `[data-chapter='late-dinner']`.

| Viewport | contentW | lecture | formula               | reading links | overflow-x |
| -------- | -------- | ------- | --------------------- | ------------- | ---------- |
| 1280     | 1072     | 1072    | 1072 (justify center) | 1072          | 0          |
| 390      | 310      | 310     | 310 (justify center)  | 310           | 0          |

Файлы: `memory-bank/plans/2026-08-25-theory-reading-late-dinner-layout.md`, `src/styles/components/theory-apple.css` (только scoped leftover, shared `[data-chapter]` не тронут). Copy не менялся. Коммит не делался.

Вкладка MCP `ff2755` из субагента недоступна; замер через headless Chrome после логина. Eruda скрыта стилем.
