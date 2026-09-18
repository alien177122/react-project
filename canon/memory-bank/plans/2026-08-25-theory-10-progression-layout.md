# План: Глава 10 — панель на всю ширину, центр

**Дата:** 2026-08-25  
**Статус:** готово (2026-08-25)

## Цель

Открытая **глава 10** (`progression`) в `#chapter-panel`: лекция уже на ширину `.ta-chapter-panel__body` (общий блок `[data-chapter]`). Уникальные виджеты **TierPyramid** и **RevealTimeline** тоже на ширину панели, заголовки и схемы по центру. Справа нет пустоты из‑за `max-width: 920px` / `42em` у пирамиды и intro timeline. На 390px нет overflow-x.

## Критерий готовности

- `?tab=theory&chapter=progression` desktop: `.ta-pyramid` и `.ta-timeline` = ширина body минус padding.
- `.ta-subhead`, intro timeline (eyebrow/quote) по центру; схема пирамиды по центру.
- 390px: `scrollWidth <= clientWidth` у панели, нет горизонтального скролла.
- Общий блок `.ta-chapter-panel__body[data-chapter]` не переписан. Копия лекции не тронута.
- Главы 01–09 и reading-статьи в этом круге не аудитим.

## Пункты

1. Превью MCP: скрыть Eruda, замерить ширины body / pyramid / timeline / overflow, скрин desktop + 390px.
2. CSS только под `.ta-chapter-panel__body[data-chapter='progression']`: снять потолок у `.ta-tier` / `.ta-timeline-intro-note`, `width: 100%`, `min-width: 0`, центр subhead/intro, wrap chips, без overflow-x.
3. Повторный замер desktop + 390px. Если дыра не в виджетах 10 — стоп и отчёт.

## Результат

- Desktop 1280: body 1136, pyramid/timeline 1072. Tier I 1072 (было 920). Intro note 1028, `text-align: center`. overflow-x 0.
- 390: body 350, pyramid/timeline 310, все rungs 310, overflow-x 0.
- Файлы: `memory-bank/plans/2026-08-25-theory-10-progression-layout.md`, `src/styles/components/theory-apple.css` (только `[data-chapter='progression']`).
- Лекция и shared `[data-chapter]` блок не тронуты. Коммит не делался.

## Вне скоупа

Перепись лекции, `theory.ts`, shared `[data-chapter]` блок, коммит, главы 01–09.
