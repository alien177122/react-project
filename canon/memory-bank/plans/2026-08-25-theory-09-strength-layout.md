# План: Глава 09 — панель на всю ширину, виджет силы

**Дата:** 2026-08-25  
**Статус:** выполнено

## Цель

Открытая **глава 09** (`strength`, Формула силы) в `#chapter-panel`: лекция на ширину `.ta-chapter-panel__body` с отступом от края, не узкая левая полоса `42em`. Заголовки и схемы по центру. Виджет `StrengthFormulaSection` / `.ta-strength` заполняет панель, не остаётся левой полосой. На 390px нет overflow-x. Общий блок `.ta-chapter-panel__body[data-chapter]` и текст формулы не переписывать.

## Критерий готовности

- `?tab=theory&chapter=strength` desktop: колонка лекции и `.ta-strength` = ширина body минус padding.
- Схема `.ta-strength-formula` по центру; заголовки intro/section/hero/block по центру.
- 390px: нет горизонтального скролла панели (`overflow-x` = 0).
- Shared lecture CSS и copy формулы не изменены.
- Другие главы в этом круге не аудитим.

## Пункты

1. Скрыть Eruda. Измерить desktop + 390px: body vs `.ta-strength` vs overflow.
2. Если виджет всё ещё узкий — точечный CSS только `.ta-strength*` (width 100%, center formula/headings).
3. Скриншоты desktop + 390px. Отчёт: ширины, overflow, файлы, leftovers.

## Результат

| Viewport | panel client/scroll | body          | .ta-strength | hero       | formula      | panel overflow-x | document    |
| -------- | ------------------- | ------------- | ------------ | ---------- | ------------ | ---------------- | ----------- |
| 1280     | 1136 / 1136         | 1136 (pad 32) | 1072         | 1136 (−32) | 1080, center | 0                | 1280 / 1280 |
| 390      | 350 / 350           | 350 (pad 20)  | 310          | 350 (−20)  | 310, center  | 0                | 390 / 390   |

`data-chapter=strength`. Заголовки `text-align: center`. Формула `justify-content: center`.
