# Theory textbook cards (RevealTimeline)

> **Gold pattern (2026-07-16):** dense Theory lesson cards → vertical elevated stack, not horizontal carousel / tiny muted prose.
>
> **Lecture chapters (2026-08-25):** 01 Основы and 02 mTOR use the lecture page, not equal timeline cards. Keep this card pattern for mechanics / special methods until those chapters are rewritten. Compact derivatives remain for macOS.

## When

- Theory chapter with 5+ concept cards that need to be _read_, not skimmed
- Replacing `.ta-carousel` / flat body-only slides
- Same family as special methods, mechanics (08). Chapter 02 mTOR uses the lecture page instead.

## Structure

1. **Intro card** — eyebrow + quote + short note (`RevealTimeline` aside\*)
2. **Numbered cards** — `01…N` step badge (accent `--ta-sec-*`)
3. Per card blocks:
   - **Определение** — 1–2 sentences, ~16px readable color
   - **Схема** (optional) — mono/inset one-liner formula
   - **Как применять** — 2–5 bullets

## Data shape (`packages/shared`)

```ts
{ id, title, definition, pattern?: string, bullets?: string[] }
```

Wire via `RevealTimeline` + `TimelineNode` in `chapterContent.tsx`. Set `--ta-sec` / `--ta-sec-tint` to chapter accent on a wrapper.

## Visual

- Soft elevation: layered shadow on intro + cards (see `.ta-timeline-*`)
- No horizontal scroll carousel for lesson text
- Content-first; Quiet UI — accent only on step badge / labels

## Sibling (не эталон)

- Deleted `MechanicsCarousel` + `.ta-carousel-*` — truncated 12px slides
- Flat `title` + `body` only cards without definition/pattern/bullets

## Files

- `src/components/RevealTimeline.tsx`
- `src/styles/components/theory-apple.css` (`.ta-timeline*`)
- Example data: `MECHANICAL_CONCEPTS`, `SPECIAL_METHODS` (mTOR web lesson: `MTOR_LESSON_GROUPS`)
