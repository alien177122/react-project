# План: Глава 07 — панель на всю ширину, сосудистые карты

**Дата:** 2026-08-25  
**Статус:** готово

## Цель

Открытая **глава 07** (`cardio`) в `#chapter-panel`: тело панели на всю ширину (не левая полоса `42em`). Уникальный виджет **CardioSection** / сосудистые карты (`.ta-cardio`, `.ta-cardio-grid`, `.ta-cardio-card`) занимает ширину панели, а не узкую колонку слева. Если появятся блоки лекции — заголовки и схемы по центру (сейчас лекции в 07 нет). На 390px нет overflow-x. «См. также» на статьи чтения допустимо.

## Критерий готовности

- `?tab=theory&chapter=cardio` desktop: `.ta-cardio` / `.ta-cardio-grid` = ширина `.ta-chapter-panel__body` минус padding.
- Карты не остаются полосой ~42em слева.
- 390px: `overflow-x` панели = 0.
- Общий блок `.ta-chapter-panel__body[data-chapter]` не переписывать.
- Копирайт cardio не трогать. Коммит не делать.

## Пункты

1. [x] План (этот файл).
2. [x] Скрыть Eruda, замерить desktop + 390px, скриншоты.
3. [x] Точечный CSS `data-chapter='cardio'` для `.ta-cardio` / grid / note / cards / see-also (`width: 100%`, `max-width: none`).
4. [x] Отчёт: ширины, overflow, файлы, leftovers.

## Замеры (после правки)

| Viewport | panelBody                  | cardio/grid | cards         | overflow-x                 |
| -------- | -------------------------- | ----------- | ------------- | -------------------------- |
| 1280     | 1136 (pad 64 → inner 1072) | 1072        | 6×528 (2 col) | html/body/panel/cardio = 0 |
| 390      | 350 (pad 40 → inner 310)   | 310         | 6×310 (1 col) | 0                          |

Лекции в главе нет (`hasLectureBlocks: false`). max-width cardio: none.
