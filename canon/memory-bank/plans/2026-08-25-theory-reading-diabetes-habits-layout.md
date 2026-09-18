# План: статья diabetes-habits — панель на всю ширину, центр

**Дата:** 2026-08-25  
**Статус:** готово — цель сверена измерениями desktop 1280 и 390px  
**URL:** `http://localhost:5173/?tab=theory&chapter=diabetes-habits`

## Цель

Открытая статья **diabetes-habits** (`ReadingLecturePage`) в `#chapter-panel` занимает ширину `.ta-chapter-panel__body` с внутренним отступом, не узкую левую полосу `42em`. Заголовки и схемы (`.ta-pattern-formula`) по центру. Блок `ReadingArticleLinks` (`.ta-reading-app-links`) не остаётся левой колонкой `42em`. На 390px нет overflow-x. Текст статьи не переписывать. Общий CSS `.ta-chapter-panel__body[data-chapter]` не трогать.

## Критерий готовности

- Desktop: ширина колонки лекции = ширина body минус padding.
- Intro/section/topic titles и `.ta-pattern-formula` по центру.
- `.ta-reading-app-links` и `.ta-see-also` на ширину body, не `42em` слева.
- 390px: `scrollWidth === clientWidth` у панели и `document.documentElement`.
- Общий блок `[data-chapter]` и copy статьи не изменены.

## Пункты

1. [x] Скрыть Eruda. Измерить desktop: body, intro, lede, lecture-body, reading-app-links, see-also, overflow.
2. [x] Скриншот desktop + 390px.
3. [x] Дыра у ReadingArticleLinks / see-also: точечный CSS `[data-chapter='diabetes-habits']` (как у late-dinner). Общий `[data-chapter]` не тронут.
4. [x] Повторно измерить. Отчёт: ширины, overflow, файлы, leftovers.

## Результат

- Desktop 1280: body 1136, intro/lecture/formula/links/see-also 1072 (`max-width: none`). Title/section `text-align: center`. Formula `justify-content: center`. html overflow 0.
- 390px: html 390/390, panel 354, body 350, links 310. overflow-x 0.
- Copy не менялась. Коммит не делался.

## Вне скоупа

Главы 01–10, `late-dinner`, `anabolic-vessels`, rewrite copy, commit, правка общего `[data-chapter]` блока.
