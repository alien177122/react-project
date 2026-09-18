# Plan: Chapter 02 (mtor) — panel-width lecture, unique widget only

**Date:** 2026-08-25  
**Status:** done — lecture already full inner width; unique widget headings centered under `[data-chapter='mtor']`  
**Scope:** chapter id `mtor` only. Shared lecture CSS already landed. No copy edits. No commit. No other chapters.

## Goal

Open **chapter 02** at `http://localhost:5173/?tab=theory&chapter=mtor`. The lecture column fills `.ta-chapter-panel__body` minus padding — not a left `42em` strip. Headings and `.ta-pattern-formula` sit centered. The unique widget `MtorDayTimeline` / `.ta-day-timeline` uses the same full inner width. At 390px the panel has no `overflow-x`.

## Ready when

- Desktop: lecture/block widths ≈ panel body content box (body minus padding).
- Headings and `.ta-pattern-formula` are centered.
- `.ta-day-timeline` is not a leftover left-narrow strip.
- 390×844: `document` / panel `scrollWidth` does not exceed `clientWidth`.
- Shared block `.ta-chapter-panel__body[data-chapter]` in `theory-apple.css` is unchanged.
- `packages/shared/src/data/theory.ts` is unchanged.

## Steps

1. Write this plan (this file).
2. Browser MCP (`cursor-ide-browser`): open `?tab=theory&chapter=mtor` (newTab or viewId `e695f6`). Hide Eruda. Measure body vs lecture widths. Screenshot.
3. Emulation `390×844`; check overflow-x.
4. If timeline/widgets are still left-narrow, add CSS only under `[data-chapter='mtor']` or existing `.ta-day-timeline` rules. Do not rewrite the shared `[data-chapter]` block.
5. Re-measure. Report widths, overflow, files changed, leftover issues.

## Out of scope

Chapters 01 / 03–10. Lecture copy. Shared full-width lecture selectors. Git commit.

## Result

Desktop 1280: body 1136 / content 1072; lecture 1072 (`max-width: none`); timeline 1072. Headings + formula centered. Unique widget title/lede/sum centered via `[data-chapter='mtor']`. overflow-x 0.

390×844: body 350 / content 310; lecture 310; timeline 310; overflow-x 0; slots stack to 1 column.

Shared `.ta-chapter-panel__body[data-chapter]` block unchanged. `theory.ts` unchanged. No commit.

MCP `cursor-ide-browser` from this subagent could not attach (`e695f6` missing; created tabs vanished). Widths from Playwright + Chrome channel after hiding Eruda.
