# План: Глава 06 — панель на всю ширину, виджеты протокола

**Дата:** 2026-08-25  
**Статус:** готово  
**Глава:** 06 Сухожилия (`id: tendons`)  
**URL:** `http://localhost:5173/?tab=theory&chapter=tendons`

## Цель

Открытая **глава 06** в `#chapter-panel`: лекция не узкая левая полоса `42em`. Текст на ширину `.ta-chapter-panel__body` с отступом от края. Заголовки и схемы по центру. Уникальные виджеты протокола — `PullQuote` (фигура 4,5–6,5%) и `TendonProtocolSection` / `.ta-timeline` — той же внутренней ширины, без leftover `max-width` слева. На 390px нет overflow-x.

## Критерий готовности

- `?tab=theory&chapter=tendons` desktop: колонка текста = ширина body минус padding.
- Заголовки intro/section/topic по центру; `.ta-pattern-formula` по центру.
- `.ta-pullquote` и `.ta-timeline` не остаются узкой левой полосой.
- 390px: `document` / панель `scrollWidth` не больше `clientWidth`.
- Общий блок `.ta-chapter-panel__body[data-chapter]` не переписывать. Копию лекции не трогать. Другие главы не трогать. Коммит не делать.

## Пункты

1. Записать этот план (цель + критерий).
2. Скрыть Eruda, замерить ширины body / lede / pullquote / timeline, overflow; скрин desktop + 390px.
3. Если дыра только у виджетов протокола — точечный CSS под `[data-chapter='tendons']`. Иначе стоп и отчёт.
4. Повторный замер + скрин. Вернуть ширины, overflow, файлы, leftovers.

## Запрещено в этом круге

Главы 01–05 и 07–10, rewrite copy, rewrite shared `[data-chapter]` block, git commit.
