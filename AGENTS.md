# Design & Development Rules (Compressed)

> **Web-only:** native/mobile/desktop shells → `_archive-non-web/` (2026-08-27). Root product is Vite web + `packages/` + `server/`.

## 📐 Base Rules

- **Philosophy**: Clean, quiet Apple/Stripe aesthetic. Clarity over effects. Content-first. Minimal elements, quiet by default.
- **react-doctor**: Run `npx react-doctor@latest . --project "*" --yes` after modifying React code.
- **Single Source of Truth (SST)**: The active agent is the SST. Use targeted reading strategy (only read relevant files).
- **Standards Hook**: Before new UI, read `memory-bank/reference/README.md` and apply matching `*-standard.md`.
- **Theory copy**: textbook unit — Основные понятия → Суть → Уточнения; skill `.cursor/skills/theory-content-structurer/SKILL.md` + `memory-bank/reference/theory-textbook-pedagogy-standard.md`. Structure over pretty grids.

## 🎨 Visual System

- **Typography**: `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif`. Weight: 400/500/600. Fixed sizes: 12/14/16/18/20/24/32/48/64/80. WCAG AA contrast (min #6B6B6B on white).
- **Color**: Neutral base, grays (90%). Max 2 accents. Dark mode bg: #0A0A0B/#111113. No gradients. Border transparency: `rgba(0,0,0,0.08)` / `rgba(255,255,255,0.08)`.
- **Tokens**: `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-elevated`, `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-border-subtle`, `--color-border-default`, `--color-accent`, `--color-destructive`, `--color-success`, `--color-warning`.
- **Grid/Spacing**: 4px scale. Nested radius: `inner = outer - padding`. Radius: 6/8/12/16/20/24.
- **Shadows**: Layered: `box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06)`. Inset for pressed/focused.
- **Icons**: One set (Lucide/Phosphor/SF Symbols). Stroke: 1.5-2. Scale: 14/16/20/24/32. Use `aria-hidden="true"` + text label.

## 🎬 Motion (GPU-only: transform/opacity)

- **Duration**: 150-250ms (micro), 200-300ms (components), 400-600ms (transitions).
- **Easing**:
  - `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)`
  - `--ease-micro`: `cubic-bezier(0.22, 1, 0.36, 1)`
- **A11y**: Support `@media (prefers-reduced-motion: reduce)`. Stagger: 60-100ms. No scroll events for parallax.

## 🧩 UX & Logic

- **States**: default, hover, active (scale(0.98)), focus-visible (keyboard outline), disabled (opacity 0.4, no events), loading (spinner), error/success.
- **Errors/Loading**: Skeleton matching layout (min 300ms to avoid flicker). Errors inline, actionable copy.
- **Forms**: Auto-focus first field. Placeholder is not label. Validate on blur. Enter submits.
- **Navigation/Keyboard**: URL holds modal/filters state. Back button returns history. Esc closes modal. Keyboard Tab navigation. Div click is banned (use `<button>` or role + tabIndex + enter/space handlers).
- **Copy**: Short, active voice, sentence case. No exclamation marks.

## ⚡ React & TypeScript

- **React**: Functional components, components ≤ 150 lines, minimal derived state. Logic in hooks/utils. CSS Modules/Tailwind (strict config, no ad-hoc hex). URL is state. No redundant `useEffect`.
- **TypeScript**: `strict: true`, no `any`, discriminated unions for state variants.
- **FCP / CLS**: FCP < 1.5s, CLS < 0.05. Lazy images (`loading="lazy" decoding="async"`). Main bundle < 200kb.

## 🚫 Prohibited

- Emojis in UI, gradients/glassmorphism, TODOs in production, console.logs, `!important` overrides, custom scrollbars, blocking right-click/zoom, dark patterns.

## 🗣 Response Format & Checklist

1. Ask max one clarifying question. 2-3 line TZ understanding.
2. Outline trade-offs. Write production-ready code with comments explaining _Why_.
3. Checklist: Keyboard, Dark Mode, 3G load, Reduced-motion, 400% zoom, Mobile (320px), Error/Empty states, Layout shift.
