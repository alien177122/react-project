# Theory visual gold — весь блок «Объём за сессию»

> **Canon (2026-08-26):** визуальный эталон **виджета объёма** — **весь** `section.ta-frac` / `FractionalVolumeSection` в главе 01, не только hero «0.5».  
> **LOCKED:** не редизайнить `.ta-frac`. Лекция главы 01 (intro + 1.1–1.4) и лекция главы 02 — отдельные эталоны, тоже locked; см. `theory-lecture-page-standard.md`.  
> Playbook лекции: `theory-lecture-page-standard.md`. Педагогика: `theory-textbook-pedagogy-standard.md`. Система: `theory-article-algorithm.md`. Промпт: `.cursor/skills/theory-content-structurer/SKILL.md`.

## Gold source

| Слой      | Путь                                                             |
| --------- | ---------------------------------------------------------------- |
| Component | `src/components/FractionalVolumeSection.tsx`                     |
| CSS       | `src/styles/components/theory-apple.css` — `.ta-shell .ta-frac*` |
| Data      | `FRACTIONAL_VOLUME_GUIDE` в `packages/shared/src/data/theory.ts` |

**Запрещено** редизайнить этот блок «под остальную Теорию» и **запрещено** переписывать лекцию 01 (1.1–1.4), чтобы она «стала как frac». Frac — виджет **ниже** лекции. Остальные главы **наследуют** язык виджета только в unique volume/dose UI.

## Visual language (извлечь, не выдумывать)

| Часть          | Правило                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------ |
| Outer card     | surface + radial tint от chapter accent, border, radius card, gap 32px, padding 32/24/28   |
| Eyebrow        | 14px / 600 / 0.08em / uppercase / chapter accent                                           |
| Section titles | display font, 20–28px, white, **LEFT**                                                     |
| Prose          | 16px / 1.65; muted для вторичного                                                          |
| Term cards     | stacked rows, gold term name, white value, muted note, hairline separators                 |
| Rule cards     | surface, accent-tinted border, elevation, 18px title                                       |
| Hero           | **единственный** centered block: huge gradient figure, затем white heading + muted 2 lines |
| Below hero     | всё left-aligned, stacked                                                                  |
| Callouts       | bronze/accent tint bg + border                                                             |
| Walk / dose    | inset surface rows                                                                         |
| Lens           | label left / value right                                                                   |
| Tabs           | один интерактив (Сила / Гипертрофия)                                                       |

## Chapter panel header

Не колонка «пилюля → заголовок» по центру.

- `.ta-chapter-panel__title-wrap`: grid `1fr auto`
- title + lede **слева**
- `.ta-section-pill` **справа** (`justify-self: end`)
- без `text-align: center` / `align-self: center` / `margin-inline: auto`

## Shared lecture mapping

| Lecture class          | Frac analog                          |
| ---------------------- | ------------------------------------ |
| `.ta-lesson-section`   | `.ta-frac__section` (gap 14)         |
| `.ta-lecture-topic`    | `.ta-frac__rule` cards               |
| `.ta-lecture-glossary` | `.ta-frac__terms` / `__term`         |
| `.ta-lecture-callout`  | `.ta-frac__callout` (не hero figure) |
| body                   | full panel width, **без** 42em       |

## Copy

Facts first. Titles name terms. Hard ban: «лекция не копирует…», «сначала просто», анонс метода.

## Sibling (не эталон)

- Centered lecture chrome / centered section titles
- Skinny 42em left column
- Pedagogy-method headlines
- Редизайн `.ta-frac` «чтобы было как в главе 10»
- Перестройка locked-лекции 01/02 «под frac»
