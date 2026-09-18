# Style Guide — общий канон (Mac-wide)

**Канон для всех проектов на Mac.** Проектные расширения — в `<project>/memory-bank/style-guide.md` или `memory-bank/reference/`.

Последняя синхронизация с эталоном: React Training Journal (`React_Project_Журнал_Сплит`).

## Принципы

- Ясность важнее эффектов; контент — король; минимум элементов на экране
- Один экран — одна задача; тишина по умолчанию (без лишних popup/badge)
- Accessibility обязательна: keyboard, focus-visible, `prefers-reduced-motion`, `prefers-color-scheme`

## iPhone-first (web)

- Primary target: **iPhone web** (mobile Safari / in-app WebView). Desktop — secondary.
- Viewport для проверки агентом: **390–430px** (также ~375px при tight layout)
- Touch targets: **≥44px** для интерактива
- Без horizontal overflow; scroll до нижнего контента; fixed panels не обрезают контент
- После каждого UI-изменения — превью через MCP `cursor-ide-browser` (см. `systemPatterns.md`)

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

## React / TypeScript (общее)

- Functional components + hooks; логика в `hooks/` и `utils/`
- Discriminated unions для async state
- `strict: true`, без `any`
- Компонент ≤150 строк (split → `*.parts.tsx` + dedicated hooks)

## Стили (web)

- CSS custom properties в `variables.css` (или эквивалент)
- Modular CSS: `base/`, `layouts/`, `components/`
- BEM-like classes; без styled-components по умолчанию
- Animations: shared config + `useReducedMotion` где применимо

## Язык

- UI copy: **русский** (sentence case), если проект не задаёт иное
- Код, типы, идентификаторы: **English**

## Hallmark & anti-slop

- Skill: `~/.cursor/skills/hallmark/SKILL.md` · `@hallmark` для новых страниц/редизайна
- После финального UI — `memory_save` (тема, macrostructure)
- Проектный лог: `<project>/.hallmark/log.json`

## Метрики и графики

- Формулы (Epley, Brzycki и т.д.) — JSDoc на pure function + краткая русская подпись в UI
- Tonnage (кг×повторы) ≠ rep count — явно различать в copy

## Проектные расширения

| Проект | Локальный канон |
|--------|-----------------|
| React Training Journal | `memory-bank/style-guide.md`, `memory-bank/reference/*-standard.md` |
| geron-redesign-shell | `memory-bank/style-guide.md` (после `sync-memory-bank.sh`) |
| MassageHTML | `memory-bank/style-guide.md` (HTML/static) |
