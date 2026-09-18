# Plan: Chapter 08 (mechanics) — panel-width lecture, RevealTimeline only

**Date:** 2026-08-25  
**Status:** done  
**Scope:** chapter id `mechanics` only. Shared lecture CSS already landed. No copy edits. No commit. No other chapters.

## Goal

Open **chapter 08** at `http://localhost:5173/?tab=theory&chapter=mechanics`. The lecture column fills `.ta-chapter-panel__body` minus padding — not a left `42em` strip. Headings and schemes sit centered. The unique widget `RevealTimeline` (`.ta-timeline*`) uses the same full inner width. At 390px the panel has no `overflow-x`.

## Ready when

- Desktop: lecture/block widths ≈ panel body content box (body minus padding).
- Headings and schemes (`.ta-pattern-formula`, timeline intro/pattern) are centered.
- `.ta-timeline` is not a leftover left-narrow strip (`42em` on `.ta-timeline-intro-note`).
- 390×844: `document` / panel `scrollWidth` does not exceed `clientWidth`.
- Shared block `.ta-chapter-panel__body[data-chapter]` in `theory-apple.css` is unchanged.
- `packages/shared/src/data/theory.ts` and lecture copy in `chapterContent.tsx` are unchanged.

## Steps

1. Write this plan (this file).
2. Browser MCP (`cursor-ide-browser`): open `?tab=theory&chapter=mechanics` (viewId `2cc120` or newTab). Hide Eruda. Measure body vs lecture/timeline widths. Screenshot desktop.
3. Emulation `390×844`; screenshot; check overflow-x.
4. If timeline/widgets are still left-narrow or overflow, add CSS only under `[data-chapter='mechanics']`. Do not rewrite the shared `[data-chapter]` block. Do not change global `.ta-timeline` (chapter 10 also uses it).
5. Re-measure. Report widths, overflow, files changed, leftover issues.

## Out of scope

Chapters 01–07 / 09–10. Lecture copy. Shared full-width lecture selectors. Git commit.

## Result

Eruda hidden. Cursor IDE browser tab `2cc120` was not available in this subagent; measured Playwright + Chrome. Shared `[data-chapter]` block unchanged.

| Viewport    | contentW | lecture | timeline | timelineNote      | overflow-x |
| ----------- | -------- | ------- | -------- | ----------------- | ---------- |
| 1280 before | 1072     | 1072    | 1072     | **672** (`42em`)  | 0          |
| 1280 after  | 1072     | 1072    | 1072     | **1028** (center) | 0          |
| 390 after   | 310      | 310     | 310      | 274 (center)      | **0**      |

Files: `memory-bank/plans/2026-08-25-theory-08-mechanics-layout.md`, `src/styles/components/theory-apple.css` (mechanics-scoped block only).
