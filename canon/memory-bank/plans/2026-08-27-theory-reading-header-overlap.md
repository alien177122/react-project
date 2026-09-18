# Plan: Theory reading header — pill overlap

**Дата:** 2026-08-27  
**Файлы:** `theory-apple.css`, `TheoryChapterPanel.tsx` (`data-kind` на панели)

## Цель

В шапке `#chapter-panel` для reading (`diabetes-habits` и др.) оранжевая пилюля «Интересная статья для чтения» **не перекрывает** заголовок. Title + lede слева, пилюля справа (как у глав 01/02 с «Глава N»). Share/Close остаются справа сверху. На узком (390px) — безопасный wrap/stack без centered theater.

## Критерий готовности

1. Desktop ~800px: `diabetes-habits` — pill своей строкой справа, без overlap с title.
2. Desktop: `mtor` / `basics` — «Глава N» по-прежнему справа от title.
3. 390px: оба кейса без overlap и без горизонтального overflow.
4. Copy пилюли не меняем.

## RCA

Длинный pill + `letter-spacing: 0.22em` + `justify-self: end` в 2-col grid сжимал колонку title до `0px` — pill рисовался поверх H2.

## Пункты

1. [x] CSS: title `minmax(12rem, 1fr)`; pill `max-width` + wrap.
2. [x] Reading: `data-kind="reading"` → pill своей строкой (right), title full width.
3. [x] ≤720px: stack для всех.
4. [x] Playwright 800/390 на `diabetes-habits`, `basics`, `mtor` — PASS.
5. [x] Не коммитить; не трогать `_archive-non-web`.

## Итог

**Цель достигнута.** Reading: pill row top-right, title below full-width. Chapters 01/02: side-by-side на 800px.
