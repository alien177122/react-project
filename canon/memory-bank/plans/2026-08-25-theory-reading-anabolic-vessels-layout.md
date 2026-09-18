# План: Reading anabolic-vessels — панель на всю ширину

**Дата:** 2026-08-25  
**Статус:** готово  
**Владелец:** только `?tab=theory&chapter=anabolic-vessels`

## Цель

Открытая статья **«Что анаболики делают с сосудами»** в `#chapter-panel`: лекция на всю ширину `.ta-chapter-panel__body` с внутренним отступом, без узкой левой полосы. Заголовки и схемы (chips формулы) по центру. Блок «В приложении» / reading-ссылки на полную ширину панели. На 390px нет overflow-x. Общий блок `.ta-chapter-panel__body[data-chapter]` не переписывать. Текст лекции не трогать.

## Критерий готовности

- Desktop: колонка контента = ширина body минус padding.
- Заголовки intro/section/topic и `.ta-pattern-formula` по центру.
- `.ta-reading-app-links` и соседние reading-ссылки — `width: 100%` панели.
- 390px: `overflow-x` панели = 0 / `scrollWidth === clientWidth`.
- Правки только leftover-виджеты этой статьи (`[data-chapter="anabolic-vessels"]`), не shared CSS, не copy.

## Пункты

1. Скрыть Eruda. Замерить desktop и 390px на URL статьи. Скриншоты.
2. Найти leftover: `42em`, `fit-content`, узкий see-also / source / app-links / callout / formula, overflow.
3. Точечный CSS только под `anabolic-vessels`. Не трогать блок `[data-chapter]` без id.
4. Повторный замер + скрин. Отчёт: ширины, overflow, файлы, leftovers.
