# План: Theory lecture — полная ширина + центр

**Дата:** 2026-08-25  
**Статус:** выполняется

## Цель

В панели главы Теории текст занимает **всю ширину контейнера** (с внутренним отступом от края), не узкую левую колонку `42em`. Заголовки и схемы — по центру. Справа нет пустоты из‑за искусственного лимита строки. Правило живёт в agentmemory.

## Критерий готовности

- Нет `max-width: 42em` на лекции внутри `.ta-chapter-panel__body` (и дочерних intro/section/body/callout/scheme).
- Горизонтальный padding панели сохраняет зазор от границы.
- Заголовки, callout, chips/схемы: `text-align: center` / `margin-inline: auto`.
- На 390px нет горизонтального overflow.
- `memory_save` preference: не левая полоса, не 42em.

## Пункты

1. Найти все `42em` / left-rail у lecture в `theory-apple.css`.
2. Панель: контент `width: 100%`, padding; убрать потолок ширины текста.
3. Центр: intro title/lede, section titles, schemes, callouts.
4. Превью: глава 01 desktop + 390px.
5. `memory_save` + строка в `theory-lecture-page-standard.md`.

## Вне скоупа

Кломифен, деплой Venus (отдельная цель).
