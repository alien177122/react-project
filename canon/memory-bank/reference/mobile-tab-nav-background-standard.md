# Эталон: mobile bottom TabNav + ambient shell background

> **Статус:** утверждённый gold standard (2026-07-06, обновлён 2026-08-25). Пользователь явно одобрил визуал: frosted glass, ambient просвечивает через chrome, **ближе к квадратным** углам (tab 4px, cards 8–12px, не pill 20px).  
> **Не путать** с desktop pill-tab bar — на `≥900px` навигация sticky, с карточным `.tab-bar.ta-mode-nav`, без fixed bottom glass.

---

## Визуальный замысел

| Слой                    | Что видит пользователь                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Фон**                 | Мягкие cool/warm orbs + лёгкая сетка + анимированные кривые периодизации — «живой», но не отвлекающий                       |
| **Нижняя nav (mobile)** | Полупрозрачное матовое стекло; ambient просвечивает; верхняя граница и тень отделяют от контента                            |
| **Активная вкладка**    | Только **amber** (`--ta-calc-accent` / `--accent`) на иконке и squarer подложке `::before` (8px radius); неактивные — muted |
| **Карточки / панели**   | Тот же glass: `color-mix(92%)` + `blur(20px)` + `--border-subtle`; radius **8px inner / 12px outer**; без glow shadow       |
| **Общий тон**           | 90% нейтраль, один акцент; без «лимонных заливок» и непрозрачных плит                                                       |

Цель: iOS-style bottom bar + squarer frosted panels, через которые читается глубина приложения.

---

## Шкала radius (squarer, не pill)

| Токен                  | Значение               | Применение                                                              |
| ---------------------- | ---------------------- | ----------------------------------------------------------------------- |
| `--glass-radius-tab`   | `4px`                  | Active tab `::before`, tab-btn — squarer chip, not card 8px             |
| `--glass-radius-inner` | `8px`                  | user-bar, note boxes, inner chips                                       |
| `--glass-radius-panel` | `12px` (`--radius-md`) | auth-card, app-tab-section, ta-shell outer, desktop tab-bar, hero glass |
| `--glass-radius-badge` | `6px`                  | Meta-badges, RM chips, check squircles, filter chips — **не** capsule   |
| `--radius-pill`        | `999px`                | Только toggle tracks (theme/split switch) — **не** chips/badges         |

**Запрещено:** `border-radius: 20px` / `999px` на chips, RM badges, check indicators. «Ближе к квадратным» = 6–12px rounded rect, не 0px и не pill.

---

## Frosted glass formula (app-wide etalon)

| Свойство            | Значение                                                      | Файл-токены           |
| ------------------- | ------------------------------------------------------------- | --------------------- |
| `background`        | `color-mix(in srgb, var(--bg) 92%, transparent)`              | `--glass-bg`          |
| Card variant        | `color-mix(in srgb, var(--card) 92%, transparent)`            | `--glass-bg-card`     |
| `backdrop-filter`   | `blur(20px)`                                                  | `--glass-blur`        |
| Chrome (sticky nav) | `blur(12px)`                                                  | `--glass-blur-chrome` |
| `border`            | `1px solid var(--border-subtle)`                              | `--glass-border`      |
| `box-shadow`        | `none` (nav lift: `--glass-shadow-lift` только mobile bottom) | `--glass-shadow`      |

Утилита: `.glass-surface` в `src/styles/components/shared/glass-surface.css`.

Поверхности с etalon: `.app-shell__nav`, `.tab-btn` active, `.auth-card`, `.user-bar`, `.app-tab-section`, `.ta-shell`, `.app-hero__glass`, calculator sections.

---

## Архитектура (слои снизу вверх)

```
z-index 0   AppAmbientBackground (SVG curves, parallax)
z-index -1  .app-shell::before / ::after (shell orbs + texture grid)
z-index 0   body::before / ::after (tab-tinted large orbs, reset.css)
z-index 1   .app-shell__main + content
z-index 50  .app-shell__nav (mobile: fixed bottom frosted glass)
```

| Компонент / селектор         | Файл                                                   | Роль                                                     |
| ---------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| `AppAmbientBackground`       | `src/components/app/AppAmbientBackground.tsx`          | Декоративные кривые; `prefers-reduced-motion` → static   |
| `.app-ambient-bg*`           | `src/styles/components/app/app-ambient-background.css` | Fixed layer, mask, tab-colored stroke via `--glow-orb-*` |
| `.app-shell::before/::after` | `src/styles/base/ios-adaptation.css`                   | Radial orbs + subtle grid; `appAmbientDrift`             |
| `html[data-active-tab]`      | `src/styles/base/reset.css`                            | Переключение `--glow-orb-1/2` по вкладке                 |
| `.app-shell__nav`            | `src/styles/base/ios-adaptation.css`                   | **Glass chrome** — sticky (desktop) / fixed (mobile)     |
| `.tab-bar.ta-mode-nav`       | `src/styles/layouts/app-layout.css`                    | Pill bar (desktop); **transparent** на mobile            |
| `TabNav`                     | `src/components/app/TabNav.tsx`                        | `nav.tab-bar.ta-mode-nav.app-shell__nav`                 |

Монтирование: `AppShell` рендерит `<AppAmbientBackground />` первым дочерним элементом `.app-shell`.

---

## Mobile bottom bar (≤899px) — канон CSS

**Контейнер** — `.app-shell > nav.tab-bar.ta-mode-nav.app-shell__nav` (`ios-adaptation.css`, high specificity so app-layout cannot wipe chrome):

| Свойство                | Значение                                             | Зачем                                               |
| ----------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| `position`              | `fixed; left: 0; right: 0; bottom: 0`                | iOS-style dock flush to physical bottom             |
| `z-index`               | `50`                                                 | Над контентом, под модалками по необходимости       |
| `background`            | `var(--glass-bg)`                                    | Полупрозрачная база — ambient виден                 |
| `backdrop-filter`       | `blur(20px)` + `-webkit-backdrop-filter`             | Frosted glass                                       |
| `border-top`            | `1px solid var(--glass-border)`                      | Тихое отделение                                     |
| `box-shadow`            | `var(--glass-shadow-lift)`                           | Мягкий подъём, не цветной glow                      |
| Safe-area padding       | `padding-*: max(var(--space-1), var(--sal/sar/sab))` | Home indicator **inside** bar — never `bottom: sab` |
| `#root:has(.app-shell)` | `padding-bottom: 0`                                  | No double bottom inset under fixed dock             |

**Внутренний tab layout** — `.app-shell > nav…` @mobile in `app-layout.css`: only gap/radius/scroll — **do not** set `padding: 0` / `background: transparent` (that caused the floating gap bug 2026-07-10).

**Отступ контента:**

- `.app-shell__main { padding-bottom: calc(56px + max(var(--space-3), var(--sab)) + var(--space-2)) }`
- `.app-toast` — поднят над nav: `bottom: calc(72px + max(var(--space-2), var(--sab)))`

---

## Desktop (≥900px) — sibling, не mobile etalon

- `.app-shell__nav`: `position: sticky`, `backdrop-filter: blur(12px)`, `background: color-mix(..., var(--bg) 88%, transparent)`
- `.tab-bar.ta-mode-nav`: frosted card `border-radius: var(--glass-radius-panel)` (12px), **без** heavy glow shadow
- `.tab-btn` / active `::before`: `border-radius: var(--glass-radius-tab)` (4px)
- Не переносить desktop card-shadow на mobile fixed bar

---

## Токены и акцент

| Токен                                 | Использование                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `--glass-bg`, `--glass-bg-card`       | Frosted surface fill (92% opaque)                                                  |
| `--glass-blur`, `--glass-blur-chrome` | 20px panels / 12px sticky chrome                                                   |
| `--glass-radius-tab/inner/panel`      | Squarer 4px / 8px / 12px scale (tabs sharper than cards)                           |
| `--glass-border`, `--glass-shadow`    | `border-subtle`; shadow `none` (lift only on mobile nav)                           |
| `--bg`                                | База glass-mix (88–92% opaque)                                                     |
| `--border-subtle`                     | `border-top` nav                                                                   |
| `--glow-orb-1`, `--glow-orb-2`        | Tab-tinted ambient (per-tab overrides в `variables.css` + `html[data-active-tab]`) |
| `--accent-glow`                       | Третий radial в `.app-shell::before`                                               |
| `--ta-calc-accent` / `--accent`       | **Только** active tab: icon, `::before` border/shadow, focus ring                  |
| `--sat`, `--sar`, `--sab`, `--sal`    | Safe-area (`variables.css`)                                                        |

Активная вкладка (`.tab-active`):

- `color: var(--ta-text)`
- `::before` opacity 1 — squarer chip (`border-radius: 4px`) с `border: 1px solid color-mix(..., accent 28%)`; **без** amber glow shadow
- `.tab-active .tab-btn-icon { color: var(--ta-calc-accent) }`

Неактивные: `color: var(--ta-text-dim)`; без amber fill на всей полосе.

---

## Breakpoint и DOM

- Mobile glass: `@media (max-width: 899px)`
- iPhone touch tweaks: `@media (max-width: 430px)` — padding `#root`, не менять glass-формулу nav
- Классы nav: `tab-bar ta-mode-nav app-shell__nav` (все три обязательны для каскада)

---

## Что НЕ делать (anti-patterns)

| Запрещено                                                                                  | Почему                                            |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| Непрозрачный `background: var(--bg)` или `#fff` на mobile nav                              | Убивает ambient; выглядит как плитка              |
| Ярко-жёлтые / lemon заливки всей полосы или `body`                                         | Нарушает quiet UI; акцент только на active        |
| `backdrop-filter` без полупрозрачного `color-mix`                                          | Стекло без глубины или артефакты на старых WebKit |
| Дублировать box-shadow pill-bar на mobile                                                  | Конфликт с upward shell shadow                    |
| `position: relative` на `.tab-bar.ta-mode-nav`                                             | Ломает fixed/sticky от `.app-shell__nav`          |
| Убирать `AppAmbientBackground` / `.app-shell::before` ради «производительности» без замера | Etalon = связка фон + glass                       |
| Amber на всех tab-btn по умолчанию                                                         | Акцент теряет смысл                               |

---

## a11y и motion

- `nav` с `aria-label="Разделы приложения"`; `aria-current="page"` на active
- `prefers-reduced-motion`: `AppAmbientBackground` → `app-ambient-bg--static`; drift/pulse off в `app-ambient-background.css`
- Touch targets: `min-height: 48px` на mobile `.tab-btn`
- Focus: `focus-visible` ring через `color-mix(..., accent 24%)` — не убирать

---

## Чеклист для `/build` (новый chrome / shell)

- [ ] Прочитать этот doc + `ios-adaptation.css` + mobile block в `app-layout.css`
- [ ] Glass на `.app-shell__nav`, не на inner tab items
- [ ] `padding-bottom` main + toast согласованы с высотой nav + `--sab`
- [ ] Превью `cursor-ide-browser` @390px: ambient виден через nav, active tab amber only
- [ ] Light + dark theme; нет horizontal overflow
- [ ] Не регрессировать `html[data-active-tab]` orb transitions

---

## Sibling (не эталон для mobile nav glass)

- Expo `apps/mobile/` tab bar — native navigation theme; web etalon здесь
- Desktop pill `.tab-bar.ta-mode-nav` @`min-width: 900px`
- Auth hero gradients (`app-hero.css`) — отдельный контекст

---

## Связанные документы

- `memory-bank/style-guide.md` — quiet UI, один акцент
- `memory-bank/reference/high-end-visual-design.md` — calm luxury motion
- `.cursor/rules/iphone-responsive-verification.mdc` — verify @390–430px
