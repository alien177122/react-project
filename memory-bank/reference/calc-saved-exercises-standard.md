# Эталон: Saved Exercises list (`.ta-calc-saved-*`)

> **Статус:** канонический reference implementation для **selectable list cards** в калькуляторе (Program 2.0) — секция **«03 Сохранённые (N/12)»**.  
> **Дата фиксации:** 2026-05-28 (синхронизация с кодом `CalculatorTab.tsx` L187–234, `theory-apple.css` L3711–3837)  
> **Не модифицировать** без явной задачи; новые list UIs (журнал, тренировка, файлы) — наследовать паттерны отсюда.

## Оглавление

1. [Карта файлов](#1-карта-файлов)
2. [Полное дерево DOM / компонентов](#2-полное-дерево-dom--компонентов)
3. [React: props, handlers, условия рендера](#3-react-props-handlers-условия-рендера)
4. [SectionBlock shell (03) — все классы и CSS](#4-sectionblock-shell-03--все-классы-и-css)
5. [List container `.ta-calc-saved-list`](#5-list-container-ta-calc-saved-list)
6. [Card `.ta-calc-saved-card` — grid, states, responsive](#6-card-ta-calc-saved-card--grid-states-responsive)
7. [Ячейки карточки: name, meta, actions, one-rm](#7-ячейки-карточки-name-meta-actions-one-rm)
8. [Delete: Button + scoped `.btn-sm`](#8-delete-button--scoped-btnsm)
9. [Counter `(N/M)` и empty state](#9-counter-nm-и-empty-state)
10. [Motion, stagger, reduced-motion](#10-motion-stagger-reduced-motion)
11. [Accessibility](#11-accessibility)
12. [Copy patterns](#12-copy-patterns)
13. [MUST / SHOULD / MUST NOT (journal, training, reuse)](#13-must--should--must-not-journal-training-reuse)
14. [Sibling comparison](#14-sibling-comparison)
15. [Чеклист для новых lists](#15-чеклист-для-новых-lists)

---

## 1. Карта файлов

| Слой                  | Путь                                                      | Символы / классы                                                                             |
| --------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Parent shell**      | `src/screens/CalculatorTab.tsx` L93–94                    | `.ta-shell` → `.ta-stack.ta-stack--calc`                                                     |
| **Section shell**     | `src/components/SectionBlock.tsx`                         | `variant="apple"` → dual classes Theory + calc                                               |
| **List markup**       | `src/screens/CalculatorTab.tsx` L187–234                  | inline `map`; **нет** `SavedExercisesList.tsx`                                               |
| **Delete control**    | `src/components/ui/Button.tsx`                            | `size="sm"` + `variant="danger"` → `.btn-sm.btn-danger`                                      |
| **State / handlers**  | `packages/shared/src/hooks/useCalculatorState.ts` L89–105 | `handleDelete`, `handleSelectSaved`                                                          |
| **Wiring**            | `src/components/app/TabPanel.tsx`                         | props в `CalculatorTab`                                                                      |
| **Domain type**       | `packages/shared/src/types/index.ts`                      | `SavedExercise`                                                                              |
| **Exercise catalog**  | `packages/shared/src/data/exercises.ts`                   | `EXERCISES`, `EX_COUNT` (= 12)                                                               |
| **Re-export**         | `src/data/exercises.ts`                                   | `export *` из shared                                                                         |
| **Стили эталона**     | `src/styles/components/theory-apple.css` **L3711–3837**   | `.ta-calc-saved-list`, `.ta-calc-saved-card`, `__*`                                          |
| **Section rhythm**    | `theory-apple.css` **L2944–2975**, mobile **L3180–3187**  | `.ta-shell .ta-calc-section`, `__head`, `__body`, `__pill`, `__title`                        |
| **Theory tokens**     | `theory-apple.css` **L57–62**, **L71–75**                 | `--ta-calc-accent`, `--ta-calc-accent-tint`, `--ta-calc-surface`, `--ta-calc-border`, motion |
| **Pill / title base** | `theory-apple.css` **L370–393**                           | `.ta-section-pill`, `.ta-section-title`                                                      |
| **Global btn**        | `src/styles/components/shared/buttons.css`                | `.btn-sm`, `.btn-danger` (scoped override в `__actions`)                                     |
| **Scroll reveal**     | `src/hooks/useScrollReveal.ts` + SectionBlock             | `.reveal-section` + `.is-visible`                                                            |

**Sibling (не эталон):**

- `training-app-mobile/app/(tabs)/calculator.tsx` — Pressable + StyleSheet; 1RM **без** orange accent; title `Сохранённые · N/M`
- `apps/macos/src/screens/CalculatorScreen.tsx` — legacy SectionBlock без `variant="apple"`; title с `·`
- `apps/mobile/app/(tabs)/index.tsx` — FlatList saved exercises, другой layout

---

## 2. Полное дерево DOM / компонентов

### 2.1 Ancestry (от корня вкладки)

```
div.ta-shell                          ← CalculatorTab root
└── div.ta-stack.ta-stack--calc       ← vertical stack секций (gap 28px, ta-stack-in на children)
    ├── TestApproachSection           ← [01] (отдельный standard)
    ├── [optional] SectionBlock 02    ← activeResult → Прогрессия
    ├── [optional] SectionBlock 03    ← userData.exercises.length > 0 → Сохранённые  ★ ЭТАЛОН
    └── SectionBlock 04               ← VolumeDonut (всегда)
```

Секция **03** рендерится **только** при `userData.exercises.length > 0`. Между 02 и 04 — когда есть сохранённые упражнения; порядок в DOM фиксирован.

### 2.2 SectionBlock → inner containers (точные классы из кода)

```tsx
<SectionBlock num="03" title={`Сохранённые (${n}/${EX_COUNT})`} variant="apple">
```

Рендер `SectionBlock` (`variant="apple"`):

```
section.ta-section.ta-calc-section.reveal-section[.is-visible]
└── div.ta-section-inner.ta-calc-section__inner
    ├── header.ta-section-head.ta-calc-section__head
    │   ├── span.ta-section-pill.ta-calc-section__pill[aria-hidden="true"]
    │   │     └── text: "03"
    │   └── h2.ta-section-title.ta-calc-section__title[id?]
    │         └── text: "Сохранённые (8/12)"
    └── div.ta-calc-section__body
        └── div.ta-calc-saved-list
            └── (N × card rows)
```

| Узел        | Классы                                                        | Примечание                                                  |
| ----------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `<section>` | `ta-section` `ta-calc-section` `reveal-section` `is-visible?` | `useScrollReveal` на `<section ref>`                        |
| Inner       | `ta-section-inner` **+** `ta-calc-section__inner`             | dual naming Theory + calc                                   |
| Header      | `ta-section-head` **+** `ta-calc-section__head`               | flex column; calc overrides gap/margin                      |
| Pill        | `ta-section-pill` **+** `ta-calc-section__pill`               | calc: `padding-inline: 14px`                                |
| Title       | `ta-section-title` **+** `ta-calc-section__title`             | calc: `font-size: 32px` (base уже 32px)                     |
| Body        | `ta-calc-section__body` only                                  | `flex column; gap: 20px` — для 03 единственный child = list |

**Секция 03 не передаёт `titleId`** — в отличие от некоторых секций с якорями; `h2` без `id` по умолчанию.

### 2.3 List row (одна карточка) — полная разметка

```tsx
<div
  key={saved.exerciseKey}
  className={`ta-calc-saved-card${isActive ? ' is-active' : ''}`}
  role="button"
  tabIndex={0}
  aria-current={isActive ? 'true' : undefined}
  onClick={() => handleSelectSaved(saved)}
  onKeyDown={… Enter|Space …}
>
  <div>                                    ← ★ anonymous wrapper, БЕЗ BEM-класса
    <div className="ta-calc-saved-card__name">{ex.name}</div>
    <div className="ta-calc-saved-card__meta">…</div>
  </div>
  <div className="ta-calc-saved-card__actions">
    <span className="ta-calc-saved-card__one-rm">{saved.oneRM} кг</span>
    <Button size="sm" variant="danger" aria-label={`Удалить ${ex.name}`} onClick={stopPropagation → handleDelete}>
      <span aria-hidden="true">×</span>
    </Button>
  </div>
</div>
```

**Grid cells (desktop):**

| Grid area       | Содержимое       | DOM                                                     |
| --------------- | ---------------- | ------------------------------------------------------- |
| Column 1 `1fr`  | Primary block    | anonymous `<div>` → `__name` + `__meta`                 |
| Column 2 `auto` | Metrics + action | `__actions` → `__one-rm` + `<button.btn-sm.btn-danger>` |

`isActive` = `activeResult?.exerciseKey === saved.exerciseKey` → класс `.is-active` + `aria-current="true"`.

**Фильтр:** если `EXERCISES[saved.exerciseKey]` отсутствует → `return null` (строка не рендерится).

---

## 3. React: props, handlers, условия рендера

### 3.1 Props `CalculatorTab`

| Prop                | Тип                              | Роль для секции 03                          |
| ------------------- | -------------------------------- | ------------------------------------------- |
| `userData`          | `UserData`                       | `userData.exercises` — источник списка      |
| `activeResult`      | `SavedExercise \| null`          | синхронизация `.is-active` / `aria-current` |
| `handleSelectSaved` | `(saved: SavedExercise) => void` | клик / Enter / Space на row                 |
| `handleDelete`      | `(key: string) => void`          | delete button                               |

### 3.2 Handler semantics (`useCalculatorState`)

| Handler                    | Поведение                                                                  | Побочные эффекты                                                                                         |
| -------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `handleSelectSaved(saved)` | `setActiveResult(saved)`, `setSelectedExercise(saved.exerciseKey)`         | Секция 02 появляется/обновляется; `useEffect` в CalculatorTab scroll к `resultRef` при смене `activeKey` |
| `handleDelete(key)`        | filter exercises; `saveUser`; если удалён active → `setActiveResult(null)` | Секция 03 исчезает при `length === 0`; секция 02 скрывается без active                                   |

**Select row не вызывает** `stopPropagation` на card — только delete останавливает всплытие.

### 3.3 Условие видимости секции

```tsx
{userData.exercises.length > 0 && (
  <SectionBlock num="03" …>
```

**Empty state = отсутствие всей секции.** Нет placeholder «Нет сохранённых», нет zero-state card внутри list.

---

## 4. SectionBlock shell (03) — все классы и CSS

### 4.1 Pill `03` (Theory editorial)

Базовые правила `.ta-section-pill` (L370–384):

| Property         | Value                                               |
| ---------------- | --------------------------------------------------- |
| `display`        | `inline-flex`                                       |
| `align-items`    | `center`                                            |
| `gap`            | `8px`                                               |
| `align-self`     | `flex-start`                                        |
| `font-size`      | `12px`                                              |
| `font-weight`    | `600`                                               |
| `letter-spacing` | `0.22em`                                            |
| `text-transform` | `uppercase`                                         |
| `padding`        | `6px 12px` (+ calc override `padding-inline: 14px`) |
| `border-radius`  | `var(--ta-radius-pill)`                             |
| `background`     | `var(--ta-sec-tint, var(--ta-sec-01-tint))`         |
| `color`          | `var(--ta-sec, var(--ta-sec-01))`                   |
| `border`         | `1px solid currentColor`                            |
| `aria-hidden`    | `"true"` на `<span>`                                |

**Отличие от TestApproach (01):** секция 03 **не** использует quiet bordered pill `.calc-test-section .ta-calc-section__pill` — цветной Theory pill осознанно.

### 4.2 Title `h2`

| Property         | Source                                            |
| ---------------- | ------------------------------------------------- |
| `font-family`    | `var(--ta-display-font)`                          |
| `font-size`      | `32px` (`.ta-calc-section__title` дублирует base) |
| `font-weight`    | `600`                                             |
| `line-height`    | `1.05`                                            |
| `letter-spacing` | `0`                                               |
| `margin`         | `0`                                               |
| `color`          | `var(--ta-text)`                                  |

**Copy:** `` `Сохранённые (${userData.exercises.length}/${EX_COUNT})` `` — скобки `()`, слэш без пробелов: `8/12`.

### 4.3 Section container `.ta-shell .ta-calc-section`

| Property            | Desktop                                                         | Mobile `max-width: 760px` |
| ------------------- | --------------------------------------------------------------- | ------------------------- |
| `padding`           | `40px 28px`                                                     | `32px 20px`               |
| `scroll-margin-top` | `88px`                                                          | same                      |
| Separator           | `+ .ta-calc-section` → `border-top: 1px solid var(--ta-border)` | same                      |

### 4.4 Head / body

| Selector                  | Properties                                                          |
| ------------------------- | ------------------------------------------------------------------- |
| `.ta-calc-section__inner` | `max-width: 1140px`                                                 |
| `.ta-calc-section__head`  | `gap: 14px`; `margin-bottom: 28px` (22px @760px); `max-width: none` |
| `.ta-calc-section__body`  | `display: flex`; `flex-direction: column`; `gap: 20px`              |

---

## 5. List container `.ta-calc-saved-list`

**Файл:** `theory-apple.css` L3714–3717

| Property  | Value  | 4px scale                                   |
| --------- | ------ | ------------------------------------------- |
| `display` | `grid` | vertical stack rows                         |
| `gap`     | `10px` | ≈ 2.5×4px (допустимое отклонение в эталоне) |

**Не** `flex`, **не** `<ul>` — plain `div` list для простоты a11y (rows = `role="button"`).

---

## 6. Card `.ta-calc-saved-card` — grid, states, responsive

**Файл:** L3719–3749, L3776–3785, L3830–3837

### 6.1 Base layout (desktop)

| Property                | Value                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `display`               | `grid`                                                                                                  |
| `grid-template-columns` | `1fr auto`                                                                                              |
| `gap`                   | `12px`                                                                                                  |
| `align-items`           | `center`                                                                                                |
| `padding`               | `14px 16px`                                                                                             |
| `border-radius`         | `12px`                                                                                                  |
| `background`            | `var(--ta-calc-surface)` → alias `var(--ta-surface)`                                                    |
| `border`                | `1px solid var(--ta-calc-border)`                                                                       |
| `border-left`           | `2px solid transparent`                                                                                 |
| `color`                 | `var(--ta-text-muted)` (baseline на card; name overrides)                                               |
| `cursor`                | `pointer`                                                                                               |
| `transition`            | `transform`, `border-color`, `background` — each `var(--ta-duration-micro)` `var(--ta-ease-transition)` |

### 6.2 States (полная матрица)

| State           | Selector                | `background`                 | `border`                  | `border-left`           | `transform`        | `outline` |
| --------------- | ----------------------- | ---------------------------- | ------------------------- | ----------------------- | ------------------ | --------- |
| default         | `.ta-calc-saved-card`   | surface                      | `1px calc-border`         | `2px transparent`       | —                  | —         |
| hover           | `@media (hover: hover)` | unchanged                    | `var(--ta-border-strong)` | unchanged               | `translateY(-2px)` | —         |
| focus-visible   | `:focus-visible`        | `var(--ta-calc-accent-tint)` | inherited                 | `var(--ta-calc-accent)` | —                  | `none`    |
| active/selected | `.is-active`            | **same as focus-visible**    | inherited                 | `var(--ta-calc-accent)` | —                  | `none`    |

**Правило:** keyboard focus и selected row **визуально идентичны** — tint + orange left rail 2px.

### 6.3 Mobile `max-width: 600px`

| Property                | Value                                                                       |
| ----------------------- | --------------------------------------------------------------------------- |
| `grid-template-columns` | `1fr` (single column)                                                       |
| `align-items`           | `start`                                                                     |
| `__actions`             | `justify-content: space-between` — 1RM слева, delete справа в нижней строке |

Mobile **не** складывает delete под name вертикально в узкой колонке — actions остаются **horizontal strip**.

---

## 7. Ячейки карточки: name, meta, actions, one-rm

### 7.1 `.ta-calc-saved-card__name` (L3751–3755)

| Property         | Value                          |
| ---------------- | ------------------------------ |
| `color`          | `var(--ta-text)`               |
| `font-weight`    | `600`                          |
| `letter-spacing` | `0`                            |
| Size             | inherit (~16px body контекста) |
| Case             | sentence case из `ex.name`     |

### 7.2 `.ta-calc-saved-card__meta` (L3757–3761)

| Property      | Value                  |
| ------------- | ---------------------- |
| `font-size`   | `12px`                 |
| `font-weight` | `400`                  |
| `color`       | `var(--ta-text-muted)` |
| `margin-top`  | `3px`                  |

**Шаблон copy (канон):**

```
{testWeight} кг × {testReps} повт · {date}
```

- Separator: middle dot `·` (U+00B7)
- «повт», не «повторений»
- `date` — as stored, без reformat в UI

### 7.3 `.ta-calc-saved-card__actions` (L3763–3767)

| Property      | Value    |
| ------------- | -------- |
| `display`     | `flex`   |
| `align-items` | `center` |
| `gap`         | `10px`   |

### 7.4 `.ta-calc-saved-card__one-rm` (L3769–3774) — hero metric

| Property               | Value                                                    |
| ---------------------- | -------------------------------------------------------- |
| `color`                | `var(--ta-calc-accent)` → `var(--ta-sec-01)` Peak orange |
| `font-size`            | `16px`                                                   |
| `font-weight`          | `600`                                                    |
| `font-variant-numeric` | `tabular-nums`                                           |
| Content                | `{saved.oneRM} кг` — integer + пробел + « кг»            |

**Accent rule:** orange **только** на 1ПМ; name/meta/delete **без** accent color.

---

## 8. Delete: Button + scoped `.btn-sm`

### 8.1 React

```tsx
<Button
  size="sm"
  variant="danger"
  aria-label={`Удалить ${ex.name}`}
  onClick={e => {
    e.stopPropagation();
    handleDelete(saved.exerciseKey);
  }}>
  <span aria-hidden="true">×</span>
</Button>
```

### 8.2 Global `.btn-danger` (`buttons.css`)

| Property               | Value                                               |
| ---------------------- | --------------------------------------------------- |
| `background`           | `transparent`                                       |
| `color`                | `var(--red)`                                        |
| `border`               | `1px solid #3a1a1a`                                 |
| hover (fine pointer)   | `border-color: var(--red)`                          |
| focus-visible (global) | box-shadow ring red — **перекрывается** scoped rule |

### 8.3 Scoped `.ta-shell .ta-calc-saved-card__actions .btn-sm` (L3815–3828)

| Property                          | Value                                                             | Зачем                           |
| --------------------------------- | ----------------------------------------------------------------- | ------------------------------- |
| `min-width`                       | `44px`                                                            | iOS HIG touch target            |
| `min-height`                      | `44px`                                                            | same                            |
| `padding`                         | `0 12px`                                                          | square-ish hit area             |
| `display`                         | `inline-flex`                                                     | center glyph                    |
| `align-items` / `justify-content` | `center`                                                          |                                 |
| `font-size`                       | `16px`                                                            | glyph × readable                |
| `line-height`                     | `1`                                                               |                                 |
| `:focus-visible`                  | `outline: 2px solid var(--ta-calc-accent)`; `outline-offset: 2px` | calc accent ring, не red global |

Global `.btn-sm`: `min-height: 36px`, `font-size: 12px`, UPPERCASE — **переопределено** в saved actions.

`:active` → global `transform: scale(0.97)` (unless reduced-motion).

---

## 9. Counter `(N/M)` и empty state

| Symbol                  | Источник                       | Смысл                                                       |
| ----------------------- | ------------------------------ | ----------------------------------------------------------- |
| **N**                   | `userData.exercises.length`    | сколько упражнений сохранено                                |
| **M**                   | `EX_COUNT` (= 12, Program 2.0) | слоты программы                                             |
| Format web              | `Сохранённые (8/12)`           | в `title` prop SectionBlock                                 |
| Tab meta (другое место) | `TabNav`                       | `savedCount/EX_COUNT` на вкладке — не дублировать в pill 03 |

**MUST NOT:** counter в pill `03` или отдельном badge — только в `h2` title.

**Empty:** `length === 0` → секция не в DOM; при удалении последнего — секция исчезает без toast / aria-live.

---

## 10. Motion, stagger, reduced-motion

### 10.1 Card micro-interactions

| Interaction       | Duration                      | Easing                 |
| ----------------- | ----------------------------- | ---------------------- |
| hover lift        | `--ta-duration-micro` (200ms) | `--ta-ease-transition` |
| border/background | same                          | same                   |

### 10.2 Stagger on list children (L3791–3811)

```css
.ta-shell .ta-calc-saved-list > * {
  animation: ta-stack-in var(--ta-duration-component, 400ms) var(--ta-ease) both;
}
```

| Child | `animation-delay` |
| ----- | ----------------- |
| 1     | `60ms`            |
| 2     | `120ms`           |
| 3     | `180ms`           |
| 4     | `240ms`           |
| 5     | `300ms`           |
| 6+    | `360ms` (cap)     |

**Keyframe `ta-stack-in` (L2891–2899):** `opacity 0→1`, `translateY(18px)→0`.

**Ограничение (комментарий в CSS):** stagger только при **первом** mount; карточки, добавленные позже, появляются **без** анимации.

### 10.3 `prefers-reduced-motion: reduce` (L3830–3837)

| Target                    | Override                                                    |
| ------------------------- | ----------------------------------------------------------- |
| `.ta-calc-saved-card`     | `transition: none !important`; `transform: none !important` |
| `.ta-calc-saved-list > *` | `animation: none !important`                                |
| hover lift                | suppressed via transform none                               |

---

## 11. Accessibility

| Паттерн               | Реализация                                                | Статус                                  |
| --------------------- | --------------------------------------------------------- | --------------------------------------- |
| Section heading       | `<h2 class="ta-section-title">`                           | ✅                                      |
| Pill decorative       | `aria-hidden="true"`                                      | ✅                                      |
| Row activation        | `role="button"`, `tabIndex={0}`, Enter/Space              | ✅                                      |
| Selected row          | `aria-current="true"` when `.is-active`                   | ✅                                      |
| Delete                | `aria-label="Удалить {name}"`; glyph `aria-hidden`        | ✅                                      |
| Focus card            | `:focus-visible` tint + left rail                         | ✅                                      |
| Focus delete          | scoped outline accent 2px + offset 2px                    | ✅                                      |
| Touch targets         | delete 44×44; row height ≈ padding 14×2 + content ≥ ~52px | ✅                                      |
| Nested interactive    | card `role="button"` + inner `<button>`                   | ⚠️ тестировать tab order (row → delete) |
| Live region on delete | нет                                                       | gap minor — silent removal by design    |
| `titleId` / skip link | не задан на 03                                            | gap minor                               |

**Tab order:** card (focusable) → delete button внутри row — два stop на строку допустимы при `stopPropagation` на delete.

---

## 12. Copy patterns

| Тип           | Пример                         | Правило                          |
| ------------- | ------------------------------ | -------------------------------- |
| Section title | «Сохранённые (8/12)»           | sentence case; counter в скобках |
| Name          | «Жим лёжа»                     | `EXERCISES[key].name`            |
| Meta          | «120 кг × 5 повт · 24.05.2026» | шаблон фиксированный             |
| 1RM           | «137 кг»                       | integer + « кг»                  |
| Delete aria   | «Удалить Жим лёжа»             | глагол + имя                     |
| Empty         | (секция скрыта)                | без «Нет сохранённых»            |

Tone: factual; без «1ПМ» в label если значение self-evident через orange metric.

---

## 13. MUST / SHOULD / MUST NOT (journal, training, reuse)

### 13.1 MUST (любой `.ta-shell` selectable list)

- [ ] `SectionBlock variant="apple"` + numbered pill + title с **semantic counter** `(done/total)` если применимо
- [ ] List wrapper: vertical grid/flex, gap **8–12px**
- [ ] Row: `--ta-calc-surface` + `--ta-calc-border`, radius **12px**, padding **14px 16px**
- [ ] Desktop grid **`1fr auto`**: primary left, metrics+actions right
- [ ] **Один** hero metric с `var(--ta-calc-accent)` на row
- [ ] Secondary meta **12px** `var(--ta-text-muted)` под title
- [ ] Active: `--ta-calc-accent-tint` + **2px** `border-left-color: --ta-calc-accent`
- [ ] Destructive: `Button danger sm`, `aria-label` с именем сущности, `stopPropagation`
- [ ] Delete/control **≥44×44px** на touch
- [ ] `:focus-visible`, `@media (hover: hover)`, `prefers-reduced-motion`
- [ ] Tokens `var(--ta-calc-*)` / `var(--ta-text*)` — **no raw hex in TSX**

### 13.2 SHOULD

- [ ] Hover `translateY(-2px)` только `@media (hover: hover)`
- [ ] Stagger `ta-stack-in` 60ms steps, cap 360ms (≤12 items)
- [ ] `tabular-nums` на числовых метриках
- [ ] Скрывать секцию при пустом списке (или empty **вне** row pattern)
- [ ] Вынести `SavedExerciseRow` при 2+ экранах с идентичной разметкой

### 13.3 MUST NOT

- [ ] Orange на name/meta/delete (только hero metric)
- [ ] `×` без `aria-label`
- [ ] Delete без `stopPropagation` на row click handler
- [ ] ALL CAPS в row titles (только editorial pills)
- [ ] Toast при delete
- [ ] Animate width/height/margin при reorder

### 13.4 Journal / Training mapping

| Saved exercises (эталон) | Journal session row      | Training day row      |
| ------------------------ | ------------------------ | --------------------- |
| `ex.name`                | session / exercise title | day name / «День N»   |
| meta: test × reps · date | sets × reps · date       | week · muscle groups  |
| `oneRM` accent           | tonnage / e1RM           | completion % / volume |
| delete ×                 | delete entry             | remove from plan      |
| `.is-active`             | editing session          | active day            |

Reuse `.ta-calc-saved-*` или extracted `calc-saved-list.css` — не ad hoc `.journal-row` без связи с эталоном.

---

## 14. Sibling comparison

| Критерий   | **CalculatorTab (эталон)**         | Mobile RN / macOS legacy |
| ---------- | ---------------------------------- | ------------------------ |
| 1RM accent | `--ta-calc-accent`                 | text/mono, no accent     |
| Active     | left rail + tint                   | border only              |
| Delete     | 44×44 scoped                       | ActionButton varies      |
| Shell      | `SectionBlock apple` + Theory pill | plain / RN               |
| Title      | `(N/M)`                            | `· N/M`                  |
| Hover      | translateY -2px                    | opacity press            |
| Stagger    | ta-stack-in 60ms                   | none                     |
| CSS        | theory-apple L3711+                | StyleSheet / inline      |

**Соседи в Calculator tab:** 01 form (`calc-test-approach-standard.md`), 02 chart (`periodization-chart-standard.md`), 03 list (**этот файл**), 04 donut (`calculator-tab-standard.md` §04).

---

## 15. Чеклист для новых lists

- [ ] Прочитать этот файл + `calculator-tab-standard.md` §03 + section shell из `calc-test-approach-standard.md`
- [ ] Сверить title `(N/M)` и meta template с доменом
- [ ] Tab: row → delete; Enter/Space select; 320px; delete 44px
- [ ] Active: tint + left rail в dark shell
- [ ] `prefers-reduced-motion`: no lift, no stagger
- [ ] Превью: MCP `cursor-ide-browser` @ `http://localhost:5173` → Calculator → сохранить ≥1 упражнение
- [ ] При изменении паттерна — обновить этот reference + `activeContext.md` + `README.md`

---

## Связанные артефакты Memory Bank

- Umbrella: `memory-bank/reference/calculator-tab-standard.md` (§ Program 2.0 — секция 03)
- Form sibling: `memory-bank/reference/calc-test-approach-standard.md`
- Chart sibling: `memory-bank/reference/periodization-chart-standard.md`
- Picker: `memory-bank/reference/calc-exercise-select-standard.md`
- Style summary: `memory-bank/style-guide.md`
- Design canon: `memory-bank/activeContext.md`
- Patterns table: `memory-bank/systemPatterns.md`
- Theory tokens: `.cursor/rules/theory-design-reference.mdc`, `useTheoryDesign.ts`
