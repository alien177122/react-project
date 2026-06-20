# Эталон: TestApproachSection (`.calc-test-section`)

> **Статус:** канонический reference implementation для **форм ввода калькулятора** (Program 2.0) — секция «01 Тестовый подход».  
> **Дата фиксации:** 2026-05-25  
> **Не модифицировать** без явной задачи; новые calculator/training forms — наследовать паттерны отсюда.

## Карта файлов

| Слой                | Путь                                                            | Символы / классы                                                                  |
| ------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Section shell       | `src/components/SectionBlock.tsx`                               | `variant="apple"` → `.ta-section.ta-calc-section` + scroll reveal                 |
| Form orchestrator   | `src/components/calculator/TestApproachSection.tsx`             | `TestApproachSection`, `TestApproachFootnote`, `<form class="calc-test">`         |
| Metrics fields      | `src/components/calculator/TestApproachMetrics.tsx`             | `PremiumInput variant="stepper"` для веса/повторов                                |
| Exercise picker     | `src/components/calculator/ExercisePicker.tsx`                  | `.ew-select`, `.ew-trigger`, `.ew-menu-panel` (см. calc-exercise-select-standard) |
| Program 2.0 adapter | `src/components/ExerciseWheel.tsx`                              | thin wrapper → ExercisePicker + WHEEL_ORDER                                       |
| Input primitive     | `src/components/ui/PremiumInput.tsx`                            | `PremiumInput`, `PremiumStepper`                                                  |
| **Стили эталона**   | `src/styles/components/calculator/calc-test-approach.css`       | `.calc-test-section`, `.calc-test`, `.calc-test__*`                               |
| Shared inputs       | `src/styles/components/shared/stepper.css`, `premium-input.css` | базовые `.pi-*` (переопределяются в calc-test)                                    |
| Exercise dropdown   | `src/styles/components/calculator/exercise-select.css`          | `.ew-*` (trigger/menu; calc-test локально переопределяет trigger)                 |
| Section rhythm      | `src/styles/components/theory-apple.css` L2944+                 | `.ta-shell .ta-calc-section`, `.ta-calc-note`                                     |
| Theory tokens       | `src/styles/components/theory-apple.css` L57–62                 | `--ta-calc-accent`, `--ta-calc-surface`, `--ta-calc-border`                       |
| Parent              | `src/screens/CalculatorTab.tsx`                                 | первый блок в `.ta-stack--calc` внутри `.ta-shell`                                |

**Sibling (не эталон):** legacy `.ta-calc-form` в `theory-apple.css` L2994–3200 — старый grid-layout с ALL CAPS labels, крупными stepper-кнопками (68px) и отдельными rounded controls. **Не использовать** для новых форм.

---

## 1. Архитектура (тонкий UI)

```
CalculatorTab (state: exercise, weights, reps, keyboard inset)
        │
        ▼
TestApproachSection ──► SectionBlock num="01" variant="apple"
        │
        ├── form.calc-test[--pullup?]
        │     ├── exercise: label + ExerciseWheel
        │     ├── TestApproachMetrics (PremiumInput steppers)
        │     └── calc-test__action (submit + kbd hint)
        └── NoteBox variant="apple" → footnote (domain copy)
```

- **SectionBlock** — нумерация, заголовок, scroll-reveal; без бизнес-логики.
- **TestApproachMetrics** — только mapping полей (pullup vs barbell); без submit/validation UI.
- **CSS scope** — все overrides под `.calc-test-section` / `.calc-test`, не глобально на `.ta-calc-form`.

### Props surface

```ts
interface TestApproachSectionProps {
  userData: UserData;
  selectedExercise: string;
  selectExercise: (key: string) => void;
  testWeight / testBodyWeight / testExtraWeight / testReps: string + setters;
  keyboardInsetPx: number;  // --calc-test-keyboard-inset для iOS keyboard
  onCalculate: () => void;
}
```

Форма: `noValidate`, submit через `preventDefault` + `onCalculate`. Enter на любом поле → submit (native form behavior).

---

## 2. Визуальная система

### 2.1 Локальные CSS-алиасы (section scope)

На `.calc-test-section.ta-calc-section` объявлены semantic aliases — **не raw hex в TSX**:

| Alias                | Источник                         | Назначение                          |
| -------------------- | -------------------------------- | ----------------------------------- |
| `--text-primary`     | `var(--ta-text, #f3efe6)`        | Заголовок, значения input           |
| `--text-secondary`   | `var(--ta-text-muted, #99a1ad)`  | Labels, meta, footnote, placeholder |
| `--color-accent`     | `var(--ta-calc-accent, #007aff)` | CTA, focus ring, hover tint         |
| `--surface-elevated` | `var(--ta-surface-2, #1c222c)`   | Trigger, stepper, kbd chip          |
| `--border-subtle`    | `var(--ta-border, #232934)`      | Borders controls                    |
| `--shadow-elevated`  | layered inset + drop             | Карточность полей (не декор)        |

Accent калькулятора: `--ta-calc-accent: var(--ta-sec-01)` (#ff9f40 Peak orange в Theory palette) — **один акцент** на CTA и focus.

### 2.2 Typography scale (этalon vs legacy form)

| Элемент             | TestApproach (эталон)                    | Legacy `.ta-calc-form` (не эталон)      |
| ------------------- | ---------------------------------------- | --------------------------------------- |
| Section title       | `clamp(1.25rem, 3.5vw, 1.5rem)` / 600    | 32px fixed                              |
| Section pill `01`   | 12px / 600, **sentence**, bordered muted | 12px ALL CAPS, colored tint pill        |
| Field label         | 14px / 500, sentence, secondary          | 12px ALL CAPS, `letter-spacing: 0.16em` |
| Input value         | 20px (1.25rem) / 600, tabular-nums       | 32px                                    |
| Unit suffix         | 12px / 500, sentence                     | 12px uppercase                          |
| Trigger name        | 16px / 500                               | 16px                                    |
| Trigger meta (type) | 14px secondary                           | 12px dim                                |
| CTA                 | 16px / 600                               | inherited large                         |
| Footnote            | 14px / 1.5, lead 600 primary             | `.ta-calc-note` 14px                    |

**Правило:** labels — **sentence case**, без tracking на labels; tracking только у Theory editorial (не у calculator forms).

### 2.3 Spacing (4px scale)

| Token / gap        | px equivalent       | Где                                  |
| ------------------ | ------------------- | ------------------------------------ |
| Section padding    | clamp 24–32 / 16–28 | `.calc-test-section` outer           |
| Head gap           | 12px                | pill ↔ title                         |
| Head margin-bottom | 20px                | header ↔ body                        |
| Form stack gap     | 16px                | `.calc-test` flex column             |
| Label → control    | 8px                 | `.calc-test__label`, `.pi-group` gap |
| Metrics grid gap   | 12px                | `.calc-test__metrics`                |
| Action top pad     | 16px (+4 margin)    | border-top divider before CTA        |
| Note padding       | 14px 16px           | `.ta-calc-note` override in section  |

### 2.4 Radius & borders

| Surface          | Radius | Border                                       |
| ---------------- | ------ | -------------------------------------------- |
| Section pill     | 8px    | 1px `--border-subtle`                        |
| ew-trigger       | 12px   | 1px + `--shadow-elevated`                    |
| pi-stepper shell | 12px   | 1px unified container (buttons flush inside) |
| CTA button       | 12px   | none (filled accent)                         |
| kbd hint         | 6px    | 1px subtle                                   |
| Note box         | 12px   | 1px, flat shadow (no layered card shadow)    |

**Nested radius rule:** stepper inner `.pi-wrapper--stepper` — `border-radius: 0` внутри 12px shell; кнопки ± без скругления, только dividers.

### 2.5 Shadows

- **Fields (trigger, stepper):** inset highlight 4% white + drop `0 8px 24px -12px` 48% black — сигнал elevation, не decoration.
- **CTA:** inset 14% white + subtle drop + **accent-tinted** glow `color-mix(accent 42%)`.
- **Hover CTA:** усиленный glow 48%, без transform на hover (только color/shadow).
- **Active CTA:** `scale(0.98)` + inset pressed shadow.
- **Note:** `box-shadow: none` — footnote тише полей ввода.

### 2.6 Motion

| Interaction        | Duration                                                       | Easing                                     |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------ |
| Border/color hover | 200ms                                                          | `cubic-bezier(0.4, 0, 0.2, 1)`             |
| Press scale        | 150ms                                                          | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) |
| Dropdown panel     | shared `--duration-short` / `--ease-out` (exercise-select.css) |

`@media (prefers-reduced-motion: reduce)` в calc-test-approach.css: transitions off, CTA active без scale.

Dropdown options: stagger 24ms+ на `.ew-option` (exercise-select.css) — **не дублировать** в calc-test.

---

## 3. Layout

### 3.1 Section frame

```html
<section class="ta-section ta-calc-section reveal-section calc-test-section">
  <div class="ta-section-inner ta-calc-section__inner">
    <header class="ta-section-head ta-calc-section__head">
      <span class="ta-section-pill ta-calc-section__pill" aria-hidden="true">01</span>
      <h2 id="calc-test-heading" class="ta-section-title ta-calc-section__title">
        Тестовый подход
      </h2>
    </header>
    <div class="ta-calc-section__body">…</div>
  </div>
</section>
```

- Pill **aria-hidden** — номер декоративен; смысл в `<h2 id="calc-test-heading">`.
- `titleId="calc-test-heading"` — якорь для in-page nav / a11y.

**Override vs base `.ta-section-pill`:** эталон заменяет colored uppercase Theory pill на **quiet numbered badge** (bordered, muted) — меньше визуального шума в рабочей форме.

### 3.2 Form grid (container queries)

Контейнер: `.calc-test { container-name: calc-test; container-type: inline-size; }`.

| Breakpoint (container) | Layout                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| default / ≤22rem       | metrics **1 col**; CTA full width                                                              |
| ≥36rem (576px)         | metrics **2 col** (weight + reps); pullup **3 col**; CTA centered max 22rem + kbd hint visible |
| ≥48rem (768px)         | CTA max-width 24rem, min-width 12.5rem                                                         |

Wide non-pullup grid: `minmax(0,1fr) minmax(0,1fr) auto` — reps column может сжиматься (`auto`).

**Keyboard inset:** `--calc-test-keyboard-inset` из `useKeyboardAvoid` → `padding-bottom` на form — контент не прячется под iOS keyboard.

### 3.3 Field order

1. **Упражнение** — full width, always first (`calc-test__exercise`).
2. **Метрики** — weight (or body+extra for pullup) + reps.
3. **CTA** — отделён `border-top` divider (visual «commit zone»).
4. **Footnote** — вне `<form>`, в `NoteBox` ниже.

### 3.4 CTA placement pattern

```html
<div class="calc-test__action" role="group" aria-label="Расчёт результата">
  <div class="calc-test__action-inner">
    <button type="submit" class="calc-test__submit">Рассчитать</button>
    <span class="calc-test__action-hint" aria-hidden="true"><kbd>↵</kbd></span>
  </div>
</div>
```

- Mobile: CTA `flex: 1`, full width, hint hidden.
- Desktop (container ≥36rem): centered cluster, hint `↵` as quiet affordance (decorative, `aria-hidden`).
- Min height CTA: **48px** (3rem) — touch target.

---

## 4. Component states

### 4.1 Exercise dropdown (`.ew-trigger`)

| State         | Visual                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| default       | elevated surface, subtle border, layered shadow                                                                           |
| hover (fine)  | border `color-mix(accent 35%, border)`                                                                                    |
| active        | opacity 0.88, `scale(0.99)`                                                                                               |
| focus-visible | 2px outline accent, offset 2px                                                                                            |
| open          | `aria-expanded=true`; icon `.ew-trigger-icon.is-open` rotate 180°; menu `.ew-menu-panel.is-open` grid expand + fade/slide |

Menu: `role="listbox"`, options `role="option"`, Escape closes + focus return to trigger.

calc-test **не переопределяет** open menu styles — наследует `exercise-select.css` внутри `.ta-shell`.

### 4.2 Stepper (`.pi-stepper`)

| State             | Visual                                                                           |
| ----------------- | -------------------------------------------------------------------------------- |
| default           | unified 12px bordered box, ± buttons 44×44px, vertical dividers                  |
| focus-within      | border accent 55%; outer glow `0 0 0 3px accent 24%` (на **shell**, не на input) |
| btn hover         | bg accent 8%                                                                     |
| btn active        | opacity 0.75, bg accent 12%                                                      |
| btn focus-visible | 2px outline accent, offset -2px, z-index 1                                       |
| btn disabled      | opacity 0.4, not-allowed                                                         |
| input             | center aligned, no own outline (focus ring on container)                         |
| selection         | accent tint 32%                                                                  |

**Отличие от legacy:** focus ring на **весь stepper**, не на inner wrapper с transform — стабильный layout, нет CLS.

Step size: `config.step` для kg fields, `1` для reps. Hold-to-repeat via `useStepperHold`.

### 4.3 Submit button

| State         | Visual                                                           |
| ------------- | ---------------------------------------------------------------- |
| default       | filled `--color-accent`, text on `--ta-bg`, accent glow shadow   |
| hover         | accent lightened 8% white mix, stronger shadow                   |
| active        | scale 0.98, inset shadow                                         |
| focus-visible | double ring: 2px bg + 4px accent 72% + glow (no default outline) |
| disabled      | opacity 0.45, no shadow/transform                                |

### 4.4 Note / footnote

- Note surface: 80% mix elevated, flat — **secondary** to inputs.
- Footnote lead (`calc-test__footnote-lead`): semibold primary — «Как считать.» / «Подтягивания.»
- Body: secondary 14px, line-height 1.5.

---

## 5. Accessibility

| Паттерн             | Реализация                                                                   |
| ------------------- | ---------------------------------------------------------------------------- |
| Section heading     | `<h2 id="calc-test-heading">`                                                |
| Exercise label      | `<label htmlFor="calc-exercise-trigger">` + wrapper `#calc-exercise-trigger` |
| Dropdown            | `aria-haspopup`, `aria-expanded`, `aria-controls`, listbox semantics         |
| Stepper buttons     | `aria-label` «Уменьшить/Увеличить {label}» (PremiumStepper)                  |
| Units               | `aria-hidden="true"` on `.pi-unit` (value + label sufficient)                |
| CTA group           | `role="group" aria-label="Расчёт результата"`                                |
| Enter shortcut hint | decorative kbd, `aria-hidden="true"`                                         |
| Focus               | `:focus-visible` everywhere; no `:focus` outline on click-only               |
| Touch targets       | min 44px trigger/stepper btn; CTA 48px                                       |
| Motion              | CSS `prefers-reduced-motion` in calc-test-approach.css                       |
| Keyboard submit     | native `<form>` + `type="submit"`                                            |
| Pill number         | `aria-hidden="true"` on section pill                                         |

**Gap (minor):** `<label htmlFor="calc-exercise-trigger">` указывает на `<div id=…>`, не на `<button>` — работает как click target proxy, но ideal = `htmlFor` на trigger ref/id кнопки.

---

## 6. Copy patterns

| Тип              | Пример                              | Правило                                               |
| ---------------- | ----------------------------------- | ----------------------------------------------------- |
| Section title    | «Тестовый подход»                   | sentence case, без номера в тексте (номер в pill)     |
| Field labels     | «Упражнение», «Вес», «Повторений»   | коротко, sentence, без единиц в label (unit отдельно) |
| Pullup labels    | «Вес тела», «Доп. вес»              | domain-specific split                                 |
| Placeholders     | «80», «0», «6»                      | format hint, не label                                 |
| CTA              | «Рассчитать»                        | глагол, не «Submit»                                   |
| Footnote lead    | «Как считать.» / «Подтягивания.»    | bold lead + explanation                               |
| Footnote body    | «Отказ на 4–8 повторений → 1ПМ…»    | стрелка → для causal chain; без «!!!»                 |
| Dropdown title   | «Выбери упражнение» (ExerciseWheel) | imperative, friendly                                  |
| aria (CTA group) | «Рассчёт результата»                | describes action zone                                 |

**Tone:** quiet, instructional, no congratulations. Domain terms: 1ПМ, отказ, ассист (pullup).

---

## 7. Почему это gold standard vs другие секции

| Критерий               | **TestApproachSection** (эталон)      | Legacy `.ta-calc-form` / другие секции |
| ---------------------- | ------------------------------------- | -------------------------------------- |
| CSS ownership          | Dedicated `calc-test-approach.css`    | Monolith rules in theory-apple.css     |
| Label typography       | 14px sentence, readable               | 12px ALL CAPS editorial                |
| Control density        | 44px targets, compact                 | 68–72px oversized steppers             |
| Stepper UX             | Unified bordered control              | Separated rounded +/- chips            |
| Focus model            | Container focus-within glow           | Per-wrapper transform/focus            |
| Layout                 | `@container calc-test` responsive     | `@container calc-form` (unused in TSX) |
| Section badge          | Quiet numbered pill                   | Theory colored uppercase pill          |
| CTA                    | Divider + centered desktop + kbd hint | Inline grid cell, no hint              |
| Footnote               | Contextual pullup vs barbell copy     | Generic note only                      |
| Motion discipline      | reduced-motion block in file          | partial                                |
| Separation form / help | `<form>` + NoteBox outside            | often mixed                            |

**PeriodizationChart (секция 02)** — эталон **visualization**; **TestApproachSection** — эталон **data entry form**. Вместе задают Calculator tab: ввод → результат.

---

## 8. Правила применения к новым формам

### 8.1 MUST

- [ ] `SectionBlock variant="apple"` + `num` pill + `titleId` на heading
- [ ] Scope styles: `.your-section.calc-test-section` pattern или extend `.calc-test` BEM
- [ ] Локальные aliases `--text-primary`, `--color-accent` → `--ta-calc-*`
- [ ] Labels 14px/500 sentence; values 20px/600 tabular-nums
- [ ] Controls: 12px radius, `--shadow-elevated`, min-height 44px
- [ ] `PremiumInput variant="stepper"` для numeric gym fields
- [ ] CTA: full-width mobile, centered desktop, `border-top` separator before action
- [ ] Footnote / helper в `NoteBox variant="apple"` **под** формой
- [ ] `@container` для responsive grid, не только viewport media queries
- [ ] `:focus-visible`, `@media (hover: hover)`, `prefers-reduced-motion`
- [ ] Copy на русском, sentence case

### 8.2 SHOULD

- [ ] Keyboard inset CSS var для mobile forms
- [ ] Decorative shortcut hint (`↵`) only desktop, `aria-hidden`
- [ ] Pullup / variant branching via BEM modifier (`calc-test--pullup`)
- [ ] Split metrics into subcomponent ≤90 lines

### 8.3 MUST NOT

- [ ] Raw hex в компонентах
- [ ] ALL CAPS field labels в calculator forms
- [ ] Legacy `.ta-calc-form` classes для нового UI
- [ ] Toast для validation errors (inline near field — будущий паттерн)
- [ ] Disabled CTA while invalid without explanation
- [ ] Animating width/height/margin

---

## 9. DOM reference (compact)

```
section.ta-section.ta-calc-section.calc-test-section
└── div.ta-calc-section__inner
    ├── header.ta-calc-section__head
    │   ├── span.ta-calc-section__pill → "01"
    │   └── h2#calc-test-heading → "Тестовый подход"
    └── div.ta-calc-section__body
        ├── form.calc-test[.calc-test--pullup]
        │   ├── div.calc-test__exercise → label + ExerciseWheel
        │   ├── div.calc-test__metrics → PremiumInput×N
        │   └── div.calc-test__action → Button.submit + kbd hint
        └── div.ta-calc-note → p.calc-test__footnote
```

---

## 10. Чеклист для новых calculator/training forms

- [ ] Прочитать этот файл + `periodization-chart-standard.md` (если рядом chart)
- [ ] Скопировать structure из `TestApproachSection.tsx`, не из legacy markup
- [ ] Стили: новый file в `src/styles/components/calculator/` или extend calc-test BEM
- [ ] Container name уникален или reuse `calc-test` если layout идентичен
- [ ] Verify: keyboard tab order, Enter submit, 320px width, dark shell contrast
- [ ] Update this reference if pattern evolves

---

## Связанные артефакты Memory Bank

- Theory tokens: `.cursor/rules/theory-design-reference.mdc`, `useTheoryDesign.ts`
- Style summary: `memory-bank/style-guide.md`
- Chart sibling standard: `memory-bank/reference/periodization-chart-standard.md`
- Design canon table: `memory-bank/activeContext.md`
- System patterns table: `memory-bank/systemPatterns.md`
