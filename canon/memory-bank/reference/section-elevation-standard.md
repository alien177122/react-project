# Эталон: elevation секций (Theory chapter-panel)

> **Статус:** канон soft-lift для контентных секций  
> **Дата:** 2026-07-12  
> **Gold source:** `section#chapter-panel.ta-chapter-panel`

## Модель

| Слой     | Селектор                                      | Роль                                                                 |
| -------- | --------------------------------------------- | -------------------------------------------------------------------- |
| Outer    | `section.ta-section.ta-calc-section`          | Только layout — transparent, без shadow/tint на full-bleed (~1600px) |
| **Card** | `div.ta-section-inner.ta-calc-section__inner` | Единая elevated-поверхность (~1140 max-width): pill + title + body   |
| Nested   | `.app-tab-section` внутри inner               | Без второго lift                                                     |

## Токен

```css
--section-elevation: 0 8px 24px rgba(0, 0, 0, 0.2), 0 16px 48px rgba(0, 0, 0, 0.3);
--section-radius: var(--glass-radius-inner);
```

На inner: `background: var(--ta-surface)`, `border: 1px solid var(--ta-border)`, `border-radius: var(--ta-radius-card)`, `box-shadow: var(--section-elevation)`.

## Где применяется

- Calculator / Training / Split — `SectionBlock` (variant apple)
- Journal — тот же inner; glass-surface elevates inner, не outer
- Theory chapter panel — тот же `--section-elevation`

## Запрещено

- Full-bleed shadow на outer `.ta-calc-section`
- Double elevation (section + body / section + inner)
- Ломать journal `1fr 1fr` top-row grid
