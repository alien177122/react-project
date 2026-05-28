# Design & Development Philosophy

Senior product designer + frontend engineer approach. Inspired by: Apple, Linear, Stripe, Arc, Things 3, Raycast.

**Core principle:** Quiet, confident, functional interface. Every decision is justified. Not beautiful with gradients and emojis — clean and purposeful. Reference: [apple.com](http://apple.com), [linear.app](http://linear.app), [stripe.com](http://stripe.com), [vercel.com](http://vercel.com), [things.design](http://things.design). Not Dribbble.

---

## 📐 Base Rules (Non-negotiable)

1. **Clarity over effects.** If animation or effect prevents reading or finding — remove it.
2. **Content is king.** UI is the frame. The frame should not compete with the picture.
3. **Fewer elements on screen.** Each button/icon/shadow is a tax on attention.
4. **One task — one screen.** Don't mix modes (view + edit + settings in one panel = amateur).
5. **Silence by default.** No popups, sounds, badges until there's a real reason.
6. **Function defines form.** A rounded corner exists because it helps the eye, not because it's trendy.
7. **Accessibility is mandatory.** Keyboard, screen readers, prefers-reduced-motion, prefers-color-scheme — always supported.

---

## 🎨 Visual System

### Typography

- **One font per project.** System stack default:
  ```css
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
  ```
- **Modular scale.** Fixed sizes only: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 48 / 64 / 80. No 23px or 15.5px.
- **Line-height:** 1.2 for headings, 1.5 for body, 1.6 for long text.
- **Letter-spacing:** Negative for large headings (-0.02em at 48px+), neutral for body, positive (+0.05em) for ALL-CAPS labels.
- **Font weight:** Max 3 weights per project. Usually 400 / 500 / 600 (or 400 / 600 / 700). Never 300 or 900.
- **Contrast:** Minimum WCAG AA (4.5:1 for body). Gray text on white #999 is a failure. Minimum #6B6B6B on pure white.

### Color

- **Neutral palette at the base.** 90% of UI is shades of gray. Color highlights only actions and statuses.
- **One accent color.** Max two (primary + destructive). No gradients with 5 colors.
- **Semantic tokens, not hex in components:**
  ```css
  --color-bg-primary
  --color-bg-secondary
  --color-bg-elevated       /* cards/modals */
  --color-text-primary
  --color-text-secondary
  --color-text-tertiary
  --color-border-subtle
  --color-border-default
  --color-accent
  --color-accent-hover
  --color-destructive
  --color-success
  --color-warning
  ```
- **Dark mode is not inversion.** Background is #0A0A0B or #111113, not #000. Pure black creates harsh contrast with WebKit font rendering.
- **Transparency is not a workaround.** Use rgba(0,0,0,0.04) for subtle borders instead of #F0F0F0 — adapts to light and dark automatically.

### Spacing

- **4px scale.** All margins/padding are multiples of 4: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 96 / 128. Never 15px or 17px.
- **Inside padding > outside margin.** Card: padding 24px, between cards: gap 16px. Creates visual grouping.
- **Vertical rhythm.** Distance between sections is large and consistent (96px or 128px on desktop).

### Borders & Radius

- **Border-radius scale:** 6 / 8 / 12 / 16 / 20 / 24. Buttons usually 8-12, cards 12-16, modals 16-20.
- **Nested radius rule:** Inner radius = outer radius − padding. Card radius 16, padding 12 → inner element radius 4. Apple's rule.
- **Borders:** 1px solid with low opacity: rgba(0,0,0,0.08) light, rgba(255,255,255,0.08) dark. Not #E5E5E5.

### Shadows

- **Shadows signal height, not decoration.** Higher = softer and larger shadow.
- **Layered shadows, not single shadow:**
  ```css
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.06);
  ```
- **Inset shadows for depth** (pressed button, focused input).
- **No colored shadows** except subtle on CTAs (0 4px 12px rgba(0, 122, 255, 0.2)).

### Icons

- **One stylistic set.** Lucide, Phosphor, or SF Symbols. Don't mix.
- **Consistent stroke-width:** Usually 1.5 or 2. Don't vary per icon.
- **Scale:** 14 / 16 / 20 / 24 / 32. Icon size = text size next to it.
- **Always aria-hidden="true" + text nearby.** Icon without label is inaccessible.

---

## 🎬 Motion

### When to move

- **Movement = feedback or hierarchy.** Element appeared → from where? Button pressed → what happened? Menu opened → from which point?
- **Never animate for animation's sake.** Decorative bouncing on hero = amateur.

### Duration

- Micro-interactions (hover, tap, focus): 150-250ms
- Components (dropdown, tooltip, popover): 200-300ms
- Section transitions, modal enter: 400-600ms
- Full-page transitions: 600-800ms
- Never >1000ms except intentional (progressive reveal of long content)

### Easing

Only three curves for 99% of cases:

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1); /* reveal, appearance */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* transitions both ways */
--ease-micro: cubic-bezier(0.22, 1, 0.36, 1); /* hover, tap */
```

Never: linear (except spinners), ease (too soft), bouncy-overshoot — cheap effect.

### What to animate

- **transform and opacity only** for frequent/large animations. GPU compositing, 60fps on weak hardware.
- **filter, backdrop-filter are expensive.** Use only on small surfaces (tooltip, badge).
- **Never:** width, height, top, left, margin, padding. Full page reflow.

### Rules

- `prefers-reduced-motion: reduce` → all animations off via media query, not JS conditions.
- `will-change` added before animation via JS, removed on transitionend. Never globally in CSS.
- **Stagger between elements:** 60-100ms. More = slow, less = blurs together.
- **Parallax only via CSS scroll-timeline or requestAnimationFrame.** Never scroll event + CSS transition.

---

## 🧩 Logic & UX

### States

Every interactive element has all states:

1. **default** — baseline appearance
2. **hover** — on hover (@media (hover: hover) only)
3. **active** — during press (usually scale(0.98) + slightly darker)
4. **focus-visible** — keyboard focus (not `focus`, which fires on click too)
5. **disabled** — opacity 0.4 + cursor not-allowed + pointer-events none
6. **loading** — spinner inside element, no size change
7. **error / success** — optional, via border color + icon

### Loading States

- **Never show blank screen.** Skeleton, shimmer, or optimistic UI immediately.
- **Skeleton ≠ gray rectangles.** Should match content structure: heading, text lines, cards. Correct proportions.
- **Min 300ms show spinner.** If data arrives in 50ms — don't blink spinner. Annoying.
- **Long operations >2s:** Progress bar with meaningful text ("Uploading photo 3 of 12", not "Loading...").

### Error Handling

- **Error message = what happened + what to do.** Not "Error 500", but "Could not save changes. Check connection or try again."
- **Errors inline**, near the field. Not toast on other side of screen.
- **Toast = ephemeral** ("Copied", "Sent"). Not for critical errors.
- **Never block UI with modal** "Something went wrong".

### Forms

- **One task = one focused field.** Auto-focus first field on open.
- **Placeholder ≠ label.** Always separate <label>. Placeholder = format example only.
- **Validate on blur, not on change.** User hasn't finished email → don't yell after 3 letters.
- **CTA disabled while form invalid** = bad UX. Show errors on submit attempt instead.
- **Enter submits form** everywhere logical.

### Navigation

- **Breadcrumbs at depth >2 levels.**
- **Keyboard shortcuts for actions >5x daily.** Always show in tooltip or menu (⌘K = search standard).
- **Back button works.** Modal opens → URL changes (?modal=settings). Close → history.back().

### Keyboard

- **Tab moves through all interactive elements** in logical order.
- **Esc closes modals, popovers, menus.**
- **Enter confirms, Space toggles** checkboxes/buttons.
- **Any onClick on div is red flag.** Use <button> or role="button" + tabIndex={0} + onKeyDown.

### Copy (Text)

- **Shorter. Shorter. Even shorter.** "Submit" → "Save" → icon with tooltip.
- **Sentence case, not Title Case.** "Manage subscription", not "Manage Subscription".
- **Active voice.** "Your changes are saved" → "Saved".
- **No "!!!", "Congratulations!", "Awesome!"** — Mailchimp aesthetic. Apple is quiet.

---

## ⚡ Performance

- **First Contentful Paint < 1.5s**
- **CLS < 0.05.** Every image with width/height. Every section with reserved min-height if it loads later.
- **Images:** `<img loading="lazy" decoding="async">` always. srcset for retina. AVIF/WebP with JPEG fallback.
- **Fonts:** font-display: swap, preload only critical weight. Don't load 7 weights if using 3.
- **Bundle size:** Main chunk < 200kb gzip. Everything else code-split by route.
- **No layout thrashing.** Animations use transform, not top/left. In code, read DOM before writing.

---

## 📋 Design standards (project canon)

Before **any new UI structure** (section, form, chart, list) in calculator / training / journal — **MUST** read `memory-bank/reference/README.md` and apply the matching `*-standard.md` (or `.cursor/rules/theory-design-reference.mdc`). Enforced in `.cursor/rules/react-training-memory-bank.mdc`.

## 🛠 Code

### Styling

- **CSS Modules, Tailwind, or vanilla-extract.** Not styled-components (runtime overhead, not SSR-friendly).
- **CSS custom properties for theme.** Not JS color objects.
- **Utility-first (Tailwind) OK, but strict config.** No text-[#3a7f9c] escapes.
- **BEM if vanilla CSS.** .card, .card\_\_title, .card--featured. No .container > div:nth-child(2) > span.

### React

- **Functional components + hooks.** Period.
- **Minimal state.** If state can be derived from props or URL — derive it.
- **URL is state.** Filters, open modal, active tab → query params.
- **No useEffect when not needed.** Event handler → setState directly. Derived state → useMemo or compute in render.
- **Component ≤ 150 lines.** Bigger → split.
- **Minimal props.** If 10 props → doing too much.
- **No business logic in components.** Logic in hooks (useX) or pure functions in utils/.

### TypeScript

- **strict: true.** Always.
- **No any.** Use unknown + type guard.
- **Discriminated unions for state variants:**
  ```ts
  type State =
    | {status: 'idle'}
    | {status: 'loading'}
    | {status: 'success'; data: User}
    | {status: 'error'; error: string};
  ```
- **Types from reality, not fantasy.** Start with API response → types. Don't invent interfaces.

### File Structure

```
src/
├── app/              # routing, providers
├── pages/            # pages (or routes/)
├── features/         # features: AuthForm, Checkout — one folder per feature
├── components/       # reusable UI: Button, Modal, Input
├── hooks/            # shared hooks
├── lib/              # integrations (api client, analytics)
├── utils/            # pure functions
├── styles/           # global styles, tokens
└── types/            # global types
```

---

## 🗣 Response Format

When given a task:

1. **Check the brief.** If unclear — one clarifying question. Not five.
2. **Short TZ in your words** before coding. 2-3 lines. Confirm understanding.
3. **Name trade-offs.** If solution has compromises (bundle vs features, complexity vs flexibility) — state them.
4. **Production code immediately.** Not "example code". Types, error handling, a11y.
5. **Comments explain WHY, not WHAT.** // increment counter = garbage. // Debounce to avoid API spam = useful.
6. **After code — short checklist** what to check in DevTools (layers, CLS, a11y tree).

---

## 🚫 Never Do

- Don't use emoji in UI (except user-generated content)
- Don't suggest "add gradients and glassmorphism"
- Don't write // TODO: add error handling — write error handling
- Don't console.log in production code
- Don't use !important (except prefers-reduced-motion overrides)
- Don't write custom scrollbar unless asked
- Don't hide content behind hover on touch devices
- Don't block right-click, text selection, zoom
- Don't disable back button via history.pushState without reason
- Don't add dark patterns: pre-checked subscriptions, hidden unsubscribe, fake "Are you sure?" dialogs

---

## ✅ Final Checklist Before Delivery

Before saying "done", mentally check:

1. Works with keyboard?
2. Works in dark mode?
3. Slow network (3G throttle)?
4. prefers-reduced-motion?
5. 400% zoom?
6. 320px width screen?
7. API returns error?
8. No data (empty state)?
9. Text readable WCAG AA contrast?
10. No layout shift on load?

If any = "don't know", it's not done.
