# Style Guide (краткая выжимка)

Полный источник: **`CLAUDE.md`** в корне репозитория. Ниже — токены и правила, которые агент должен соблюдать при UI-работе.

**Design standards hook:** перед новым UI — **`memory-bank/reference/README.md`** → matching эталон из `memory-bank/reference/`.

## Принципы

- Ясность важнее эффектов; контент — король; минимум элементов на экране
- Один экран — одна задача; тишина по умолчанию (без лишних popup/badge)
- Accessibility обязательна: keyboard, focus-visible, `prefers-reduced-motion`, `prefers-color-scheme`

## Типографика

- System stack: `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif`
- Размеры только: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 48 / 64 / 80
- Веса: 400 / 500 / 600 (макс. 3 на проект)
- Контраст body: минимум WCAG AA (#6B6B6B на белом — нижняя граница)

## Цвет (semantic tokens)

Использовать CSS custom properties, не hex в компонентах:

- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-elevated`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`
- `--color-border-subtle`, `--color-border-default`
- `--color-accent`, `--color-accent-hover`, `--color-destructive`, `--color-success`, `--color-warning`

Dark mode: фон `#0A0A0B` / `#111113`, не чистый `#000`.

## Spacing & radius

- Spacing: кратно 4px (4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 96 / 128)
- Radius: 6 / 8 / 12 / 16 / 20 / 24; nested radius = outer − padding

## Motion

- Только `transform` и `opacity` для частых анимаций
- Durations: micro 150–250ms, components 200–300ms, sections 400–600ms
- Easing: `--ease-out`, `--ease-in-out`, `--ease-micro`
- `@media (prefers-reduced-motion: reduce)` — отключить анимации в CSS

## React / TS

- Functional components + hooks; логика в `hooks/` и `utils/`
- Discriminated unions для async state
- `strict: true`, без `any`
- Компонент ≤150 строк

## Theory tab (`ta-*`)

Для UI в визуальном языке вкладки Theory (dark editorial shell, section accents) — отдельный namespace `--ta-*`. Канон: `.cursor/rules/theory-design-reference.mdc`, JS-хелперы `src/hooks/useTheoryDesign.ts`, CSS-эталон `src/styles/components/theory-apple.css`. В компонентах — только `var(--ta-*)`, не raw hex.

## Calculator tab (umbrella)

Эталон **всей вкладки «Калькулятор»** (preset picker, hero, Program 2.0 и 3.0): `memory-bank/reference/calculator-tab-standard.md`. Точка входа перед любой правкой Calculator tab; partial standards — для отдельных секций.

## Calculator section 02 — Прогрессия (Program 2.0)

Эталон **composite блока после расчёта** (insight, ResultCard, PlateDiagram?, PeriodizationChart, NoteBox): `memory-bank/reference/calc-progression-result-standard.md`. Геометрия чарта — `periodization-chart-standard.md`.

## Calculator forms (Program 2.0)

Эталон секции ввода «Тестовый подход»: `memory-bank/reference/calc-test-approach-standard.md` — labels sentence case 14px, unified stepper 44px, CTA с divider, `@container calc-test`. Не использовать legacy `.ta-calc-form` для новых форм.

## Calculator saved list (Program 2.0)

Эталон sec **03 Сохранённые (N/12)**: `memory-bank/reference/calc-saved-exercises-standard.md` — SectionBlock apple → `.ta-calc-saved-list` (gap 10px) → card grid `1fr auto`, padding 14×16, radius 12px; `__name` 600 / `__meta` 12px muted; `__one-rm` 16px `--ta-calc-accent`; `.is-active` = focus tint + full perimeter accent border; delete scoped 44px; empty = section hidden. **MUST** для journal/training rows в `.ta-shell` (см. §13 эталона).

## Web tokens в проекте

- `src/styles/base/variables.css` — основные CSS variables
- `src/theme/animations.ts` — shared animation config (web)
- Mobile (`apps/mobile`): `src/theme/Theme.ts`, `tokens` — aligned с web design tokens

## Язык

- UI copy: русский (sentence case)
- Код, типы, идентификаторы: English
