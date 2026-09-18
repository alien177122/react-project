# План: Глава 01 — панель на всю ширину, центр

**Дата:** 2026-08-25  
**Статус:** выполняется

## Цель

Открытая **глава 01** в `#chapter-panel`: текст лекции не узкая левая полоса `42em`. Он на ширину `.ta-chapter-panel__body` с отступом от края. Заголовки и схемы (chips формулы) по центру. Справа нет пустоты из‑за искусственного лимита. На 390px нет overflow-x.

## Критерий готовности

- `?tab=theory&chapter=basics` desktop: колонка текста = ширина body минус padding.
- Схема `.ta-pattern-formula` по центру, не слева.
- Заголовки intro/section/topic по центру.
- 390px: нет горизонтального скролла панели.
- Главы 02+ в этом круге не аудитим.

## Пункты

1. `data-chapter` на body панели (якорь для 01 и следующих кругов).
2. CSS: внутри `.ta-chapter-panel__body` снять `max-width: 42em` у intro/lede/body/callout/glossary/scheme; width 100%; text-align center; chips `justify-content: center`.
3. Превью MCP: desktop-ширина панели + 390px на `chapter=basics`.
4. Если дыра только у виджета Fractional 01 — точечно; иначе стоп и отчёт.
