# Theory textbook pedagogy

> **Canon (2026-07-16):** Theory copy = **facts and definitions only**. Structure the lesson silently; never announce the teaching method in the UI.
>
> **Lecture pages (2026-08-26):** reading surface = **lecture page**. Locked gold: chapter **01 stack** + chapter **02** body. Widget gold: `.ta-frac`. System: `theory-article-algorithm.md`. Applied: 03–06, 08–10. Compact derivatives (`MTOR_CONCEPTS`, `BASICS_CORE`) are for native/glossary, not the web lesson. Chapter **07** stays vascular cards.

## Hard ban in product UI

Do **not** write headlines or ledes like:

- «Сначала просто, потом сложнее»
- «first easy, then harder»
- «как в учебнике», «порядок учебника», «не сетка красивых карточек»
- Meta plans: «словарь по уровням», «попробуй сам» as pedagogy theater

Intro / plan / section titles name **topics and terms**, not the arc.

## Content unit (каждое понятие)

1. **Основные понятия** — термины и короткие определения (`definition`)
2. **Суть** — главная идея и схема (`pattern` + ключевые bullets)
3. **Уточнения** — нюансы, ограничения, ошибки (остальные `bullets` / practice)

UI labels in `RevealTimeline`: Определение · Схема · Как применять.

Agent skill: `.cursor/skills/theory-content-structurer/SKILL.md`

## When

- Any Theory chapter that teaches concepts (not just a lookup table)
- Especially chapter 01 Basics + volume dose blocks
- Replacing flat bento dumps or dense wall-of-text

## Lesson arc (authoring only — not shown as copy)

1. `.ta-lesson-intro` — chapter title + factual lede + TOC of named sections
2. Grouped sections (`.ta-lesson-section`) — e.g. 1.1 / 2.1; lecture chapters use `LectureSection`; remaining chapters may still use `RevealTimeline`
3. Rules + **one interactive** shared example (tabs that change numbers, or mTOR day-input map)
4. Dose cards / numbers + source
5. See also

**Not:** equal-weight bento. Structure beats ornament — without saying so on screen.

## Interactive rules

- Prefer **one** meaningful control (tabs on the same example)
- Keyboard: `role="tab"` / `aria-selected` / focus-visible
- Touch targets ≥44px
- No code metaphors; no emojis in product UI

## Typography

- Body / list / dose detail: **≥16px**, readable contrast
- Eyebrow labels: ≥14px uppercase OK

## Data shapes

```ts
{ id, title, definition, pattern?, bullets? }
{ id, label, headline, workout, rows, takeaway }
```

## Sibling (не эталон)

- Meta pedagogy headlines
- Horizontal carousel of tiny slides
- All concepts equal weight in a bento with no order

## Files

- `memory-bank/reference/theory-article-algorithm.md` — design + algorithm + lexicon + agent prompt
- `.cursor/skills/theory-content-structurer/SKILL.md`
- `memory-bank/reference/theory-textbook-cards-standard.md`
- `memory-bank/reference/theory-lecture-page-standard.md`
- `memory-bank/reference/theory-frac-volume-standard.md` — visual gold = весь `.ta-frac`
- `BASICS_LESSON_GROUPS`, `MTOR_LESSON_GROUPS`, `FRACTIONAL_VOLUME_GUIDE` in `packages/shared/src/data/theory.ts`
- `FractionalVolumeSection.tsx`, `RevealTimeline.tsx`, `LectureSection.tsx`, `.ta-lesson-*` / `.ta-lecture-*` / `.ta-frac*` CSS
