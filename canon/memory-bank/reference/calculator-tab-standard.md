# Эталон: вкладка «Калькулятор» (Calculator tab)

> **Статус:** канонический **umbrella reference** для всей вкладки «Калькулятор» — от preset picker до секции 04.  
> **Дата фиксации:** 2026-05-27  
> **Не модифицировать** без явной задачи; любые правки Calculator tab — сверяться с этим документом **и** с дочерними partial standards.

## Назначение

Единая карта **всех UI-блоков** вкладки «Калькулятор» в web (`src/`), для **обоих** треков прогрессии:

| Preset (UI)     | `progressionPreset` | `activeProgram` | Экран тела таба   |
| --------------- | ------------------- | --------------- | ----------------- |
| **Оптимальная** | `general`           | `2.0`           | `CalculatorTab`   |
| **На силу**     | `strength`          | `3.0`           | `CalculatorTabV3` |

Связь preset ↔ program: `packages/shared/src/program/progressionPresets.ts` → `applyProgramSettingsPatch`.

---

## Дерево компонентов (полное)

```
AppShell (tab=calculator)
└── TabPanel
    ├── [L0] div.ta-shell.ta-shell--calc-settings
    │     └── ProgressionPresetPicker
    │           ├── program-settings (segmented: тип + дней/нед)
    │           └── ProgressionPreviewChart (demo, оба preset)
    │
    └── motion.div (AnimatePresence, key=calculator-body-{2.0|3.0})
          ├── activeProgram === '2.0' → CalculatorTab
          │     └── div.ta-shell
          │           ├── [L1] SceneHero (CALCULATOR / 1ПМ и прогрессия)
          │           └── div.ta-stack.ta-stack--calc
          │                 ├── [01] TestApproachSection      → calc-test-approach-standard.md
          │                 ├── [02] SectionBlock «Прогрессия» (if activeResult)
          │                 │     → calc-progression-result-standard.md (composite etalon)
          │                 │     ├── .insight
          │                 │     ├── ResultCard
          │                 │     ├── PlateDiagram (conditional)
          │                 │     ├── PeriodizationChart    → periodization-chart-standard.md
          │                 │     └── NoteBox (legend)
          │                 ├── [03] Saved exercises        → calc-saved-exercises-standard.md
          │                 └── [04] VolumeDonut
          │
          └── activeProgram === '3.0' → CalculatorTabV3
                └── div.ta-shell.program-v3-calculator
                      ├── [L1] SceneHero (Калькулятор / {programLabel})
                      └── div.ta-stack.ta-stack--calc
                            ├── [01] SectionBlock «Упражнение» (ExercisePicker)
                            ├── [02] SectionBlock «Черновой 1ПМ» (steppers + NoteBox)
                            └── [03] SectionBlock «Прогрессия» (ProgramV3ProgressChart + NoteBox)
```

**Файлы оркестрации:**

| Слой        | Путь                                                    |
| ----------- | ------------------------------------------------------- |
| Tab routing | `src/components/app/TabPanel.tsx`                       |
| Program 2.0 | `src/screens/CalculatorTab.tsx`                         |
| Program 3.0 | `src/screens/CalculatorTabV3.tsx`                       |
| Preset UI   | `src/components/calculator/ProgressionPresetPicker.tsx` |
| Demo chart  | `src/components/calculator/ProgressionPreviewChart.tsx` |
| Hero        | `src/components/ui/SceneHero.tsx`                       |
| Section     | `src/components/SectionBlock.tsx`                       |

---

## Общая визуальная система (`.ta-shell`)

### Namespace токенов

Объявлены на `.ta-shell` в `src/styles/components/theory-apple.css` L54–89:

| Token                   | Значение / роль                             |
| ----------------------- | ------------------------------------------- |
| `--ta-calc-accent`      | `var(--ta-sec-01)` — Peak orange (#ff9f40)  |
| `--ta-calc-accent-tint` | tint для active/focus rows                  |
| `--ta-calc-surface`     | фон карточек секций                         |
| `--ta-calc-border`      | границы controls/cards                      |
| `--ta-calc-shadow`      | layered shadow карточек                     |
| `--ta-display-font`     | заголовки hero + result                     |
| `--ta-duration-*`       | micro 200ms, component 400ms, section 500ms |
| `--plate-*`             | цвета блинов для PlateDiagram               |

**Правило:** в TSX — только `var(--ta-*)` / semantic aliases; hex — только в CSS root.

### Shell surface

- Фон: radial gradients (orange 10%, purple 8%) + linear `#0c0f15`
- Border: 1px `var(--ta-border)`, radius `var(--ta-radius-outer)`
- Shadow: layered drop + inset highlight
- `font-feature-settings: 'tnum'` — tabular nums глобально в shell

### Section rhythm (`.ta-calc-section` + `.ta-section-inner`)

| Token / rule               | Value                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| **Elevated surface**       | `.ta-section-inner.ta-calc-section__inner` only                                              |
| Outer `.ta-calc-section`   | transparent layout wrapper — **no** full-bleed tint/shadow                                   |
| `--section-elevation`      | `0 8px 24px rgba(0,0,0,0.2), 0 16px 48px rgba(0,0,0,0.3)` (gold: Theory `.ta-chapter-panel`) |
| Inner bg / border / radius | `--ta-surface` / `--ta-border` / `--ta-radius-card` (max-width **1140**)                     |
| Inner padding              | 40px 28px (32px 20px ≤760px)                                                                 |
| Section separator          | stack `gap` between cards — **not** `border-top`                                             |
| Head gap                   | 14px pill ↔ title                                                                            |
| Head margin-bottom         | 28px (22px mobile)                                                                           |
| Body stack gap             | 20px                                                                                         |
| scroll-margin-top          | 88px (якорь при scrollIntoView)                                                              |
| Title (default)            | 32px / 600 display                                                                           |

**Правило:** одна elevated-карточка на секцию (inner). Не дублировать shadow на `__body` / outer section.

**Два режима pill:**

| Контекст                           | Pill style                                              |
| ---------------------------------- | ------------------------------------------------------- |
| Form-секции (01 test, V3 sections) | Quiet bordered badge (calc-test / V3 override)          |
| Editorial list/chart (02–04)       | Theory colored UPPERCASE pill (base `.ta-section-pill`) |

---

## L0 — Settings bar (`ProgressionPresetPicker`)

**Где:** `TabPanel` — **над** телом таба, в `.ta-shell.ta-shell--calc-settings`.  
**CSS:** `src/styles/components/training/progression-controls.css` (Theory overrides L290+).

### Структура DOM

```html
<div class="progression-controls program-settings">
  <div class="program-settings__fields">
    <div class="program-settings__field">
      <!-- Тип прогрессии -->
      <span class="progression-controls__label program-settings__label">…</span>
      <div class="program-settings__control">
        <div class="progression-controls__segmented" role="group" aria-label="Тип прогрессии">
          <button class="progression-controls__option is-active" aria-pressed="true">
            Оптимальная
          </button>
          <button class="progression-controls__option" aria-pressed="false">На силу</button>
        </div>
        <p class="program-settings__hint">{PROGRESSION_PRESET_META.description}</p>
      </div>
    </div>
    <div class="program-settings__field">
      <!-- Дней в неделю: 3 | 4 -->
      …
    </div>
  </div>
  <section class="progression-preview ta-period">…ProgressionPreviewChart…</section>
</div>
```

### Типографика (scoped под `.ta-shell--calc-settings`)

| Элемент       | Size | Weight | Case / tracking        |
| ------------- | ---- | ------ | ---------------------- |
| Field label   | 14px | 500    | sentence, no tracking  |
| Option button | 14px | 600    | sentence               |
| Hint          | 14px | 400    | line-height 1.5, ≤52ch |

### Spacing & layout

| Token              | px                        |
| ------------------ | ------------------------- |
| Card padding       | clamp 16–20 / 16–24       |
| Card radius        | 16px                      |
| Card margin-bottom | 16px (`--space-4`)        |
| Field grid         | `minmax(108px,132px) 1fr` |
| Field gap          | 12px                      |
| Segmented gap      | 4px                       |
| Option min-height  | **44px**                  |
| Option radius      | 12px                      |

### States (segmented option)

| State         | Visual                                              |
| ------------- | --------------------------------------------------- |
| default       | `--surface-elevated`, border subtle, layered shadow |
| hover (fine)  | border accent 35% mix                               |
| active        | opacity 0.88, scale 0.99                            |
| `.is-active`  | bg accent 14%, border accent 50%                    |
| focus-visible | double ring: 2px bg + 4px accent 72%                |

### a11y

- `role="group"` + `aria-label` на каждой segmented group
- `aria-pressed` на option buttons
- `title={description}` на preset buttons (native tooltip)
- Hint — visible text, не единственный носитель смысла

### Copy (канон)

| Preset   | Label       | Description (hint)                         |
| -------- | ----------- | ------------------------------------------ |
| general  | Оптимальная | 8-недельная волна % по упражнениям         |
| strength | На силу     | 16 недель, Brzycki и тестовые недели       |
| days     | `{N} дня`   | 3 ↔ general, 4 ↔ strength (auto via patch) |

### MUST / SHOULD

- **MUST** scoped overrides только под `.ta-shell--calc-settings`
- **MUST** min-height 44px на preset/days buttons
- **MUST** переключение preset → `applyProgramSettingsPatch` (синхрон program + days)
- **SHOULD** hint под active preset, max-width ~52ch
- **MUST NOT** ALL CAPS labels в calc-settings (override base progression-controls)

---

## L0b — `ProgressionPreviewChart` (demo под picker)

**Sibling etalon** к `PeriodizationChart` — полная спецификация dual-axis в `periodization-chart-standard.md` §7.

### Кратко

| Аспект      | Preview (demo)                      | PeriodizationChart (персональный) |
| ----------- | ----------------------------------- | --------------------------------- |
| Данные      | Demo squat 1ПМ 100 кг               | User `oneRM` + exercise           |
| Левая ось   | **кг**                              | **%**                             |
| Недели      | 8 (general) / 13 visible (strength) | 8 из config                       |
| Test weeks  | `?` markers (strength)              | нет                               |
| Deload      | `.is-deload` нед 5 (general)        | phase Deload W5                   |
| CSS classes | `.progression-preview.ta-period`    | `.ta-period`                      |
| Hook        | `useProgressionPreview`             | `usePeriodization`                |

### Header preview

| Class                         | Content pattern                                 |
| ----------------------------- | ----------------------------------------------- |
| `.progression-preview__title` | `{Exercise} · 1ПМ {N} кг`                       |
| `.progression-preview__meta`  | `{Preset label} · {weeks} нед · {days} дня/нед` |
| `.progression-preview__note`  | `getTestWeekExplanation(preset)` — domain copy  |

### Reset on change

`useEffect` сбрасывает `activeIndex` при смене `progressionPreset` / `daysPerWeek`; `key` на `<section>` форсирует remount.

### a11y

- `aria-label="Пример прогрессии: {title}, {preset}"`
- `#progression-preview-list-desc` — sr-only для listbox
- SVG `role="img"` + dynamic `<desc>` по числу недель / deload

**→ Детали listbox, tooltip, phase strip, mobile:** `periodization-chart-standard.md`.

---

## L1 — `SceneHero` (заголовок сцены)

**Файлы:** `SceneHero.tsx`, `theory-apple.css` L2809–2875.

### Структура

```html
<section
  class="ta-scene-hero"
  role="region"
  aria-labelledby="{titleId}"
  style="--scene-hero-accent: var(--ta-calc-accent)">
  <div class="ta-scene-hero__glow" aria-hidden="true" />
  <div class="ta-scene-hero__content">
    <span class="ta-scene-hero__eyebrow">{eyebrow}</span>
    <h1 id="{titleId}" class="ta-scene-hero__title">{title with optional accent span}</h1>
    <p class="ta-scene-hero__subtitle">{subtitle}</p>
  </div>
</section>
```

### Copy по треку

| Track | eyebrow       | title              | accentWord | subtitle (канон)                                                               |
| ----- | ------------- | ------------------ | ---------- | ------------------------------------------------------------------------------ |
| 2.0   | `Calculator`  | `1ПМ и прогрессия` | `1ПМ`      | «Отказной подход → расчёт 1ПМ → рабочие веса на 8 недель с реальными схемами.» |
| 3.0   | `Калькулятор` | `{programLabel}`   | —          | «График прогрессии по неделям. Веса после тестов — из ваших результатов.»      |

### Typography

| Element  | Size         | Weight | Color / accent                         |
| -------- | ------------ | ------ | -------------------------------------- |
| Eyebrow  | 32px         | 600    | muted, **UPPERCASE**, tracking 0.14em  |
| Title    | 32px display | 600    | `--ta-text`; accent span → calc accent |
| Subtitle | 32px         | 400    | muted, max-width 620px, lh 1.5         |

### Spacing

- Padding: `clamp(32–64, 20–48, 28–48)` vertical / horizontal
- Content gap: **12px**
- Border-bottom: 1px `--ta-border`

### Motion (parallax glow)

- JS: `--scene-hero-y` via rAF scroll (only while in viewport, IO-gated)
- Glow: radial gradient accent 18% opacity, `translate3d` parallax
- `prefers-reduced-motion`: glow static, no scroll listener

### a11y

- `role="region"`, `aria-labelledby` → `<h1>`
- Glow decorative `aria-hidden`

### MUST

- **MUST** один hero на tab body; не дублировать h1 в секциях
- **MUST** `accentWord` только для коротких domain terms («1ПМ»)
- **MUST NOT** parallax без reduced-motion guard

---

## L2 — Stack container (`.ta-stack.ta-stack--calc`)

| Property   | `.ta-stack` default                | `.ta-stack--calc` override                    |
| ---------- | ---------------------------------- | --------------------------------------------- |
| gap        | 28px                               | **0** (sections self-separate via border-top) |
| margin-top | 28px                               | **0** (hero provides rhythm)                  |
| Stagger    | ta-stack-in 500ms, delays 60–620ms | same on direct children                       |

Секции `.ta-calc-section` разделяются `border-top`; padding внутри каждой секции.

---

## Program 2.0 — секция 01: TestApproachSection

**→ Полный этalon:** [`calc-test-approach-standard.md`](./calc-test-approach-standard.md)

Краткая карта в контексте tab:

- `num="01"`, title «Тестовый подход», `titleId="calc-test-heading"`
- Quiet pill (не Theory uppercase)
- `<form class="calc-test">` + `NoteBox` footnote снаружи формы
- ExerciseWheel + PremiumInput steppers + CTA «Рассчитать»
- CSS: `calc-test-approach.css`

**Tab-level behavior:** submit → `handleCalculate` → появление секции 02 + `scrollIntoView` на result (`behavior: smooth`, respect reduced motion).

---

## Program 2.0 — секция 02: Прогрессия (conditional)

**→ Полный composite этalon:** [`calc-progression-result-standard.md`](./calc-progression-result-standard.md) — insight + ResultCard + PlateDiagram + PeriodizationChart + NoteBox, scroll anchor, data flow, copy.

**Условие:** `activeResult !== null` (после «Рассчитать» в секции 01 или выбор из «03 Сохранённые»).  
**Title:** `` `Прогрессия — ${config.name}` `` (напр. «Прогрессия — Разгибания ног»).  
**Scroll:** обёртка `div[ref=resultRef]` → `scrollIntoView` на смену `activeResult.exerciseKey`; `scroll-margin-top: 88px` на `.ta-calc-section`.

### Краткая карта блоков (детали в partial)

| #   | Блок                | Класс / компонент | Partial / примечание                                                              |
| --- | ------------------- | ----------------- | --------------------------------------------------------------------------------- |
| 02a | Insight summary     | `.insight`        | `calc-progression-result-standard.md` §4                                          |
| 02b | Расчётный 1ПМ       | `.ta-result-card` | §5; count-up 250ms, chips ×4                                                      |
| 02c | Раскладка блинов    | `.ta-calc-plates` | §6; только type A/B, не pullup                                                    |
| 02d | График периодизации | `.ta-period`      | **[`periodization-chart-standard.md`](./periodization-chart-standard.md) (MAX)]** |
| 02e | Легенда             | `.ta-calc-note`   | §8; deload W5 + `.vol-legend--*`                                                  |

**Порядок в `ta-calc-section__body`:** insight → ResultCard → PlateDiagram? → PeriodizationChart → NoteBox (`gap: 20px`).

**Расхождение данных (документировано):** insight `weekRows` учитывает `progressionPreset`; chart — нет (`usePeriodization` raw config). См. partial §4.3 / §7.

---

## Program 2.0 — секция 03: Saved exercises

**→ Полный этalon (MAX detail):** [`calc-saved-exercises-standard.md`](./calc-saved-exercises-standard.md) — DOM tree SectionBlock → `.ta-calc-saved-list` → card grid, все CSS L3711–3837, counter `(N/M)`, delete 44px, MUST для journal/training.

| Aspect        | Spec                                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Условие**   | `userData.exercises.length > 0` — иначе секция **не в DOM** (empty = hide, не placeholder)                                                         |
| **Markup**    | `CalculatorTab.tsx` L187–234 inline; **нет** `SavedExercisesList`                                                                                  |
| **Shell**     | `SectionBlock num="03" variant="apple"` — dual classes `ta-section` + `ta-calc-section`, pill `03` Theory colored                                  |
| **Title**     | `` `Сохранённые (${n}/${EX_COUNT})` `` — counter **только** в `h2`, скобки `()`                                                                    |
| **List**      | `div.ta-calc-saved-list` — grid gap 10px                                                                                                           |
| **Row**       | `div.ta-calc-saved-card[.is-active]` `role="button"` — grid `1fr auto`; left: `__name` + `__meta`; right: `__one-rm` (accent) + `Button danger sm` |
| **Meta copy** | `{weight} кг × {reps} повт · {date}`                                                                                                               |
| **Handlers**  | `useCalculatorState`: `handleSelectSaved` → sec 02; `handleDelete` + `stopPropagation` на delete                                                   |
| **a11y**      | `aria-current` on active; `aria-label` «Удалить {name}»; focus-visible = active visual                                                             |
| **CSS file**  | `theory-apple.css` `.ta-shell .ta-calc-saved-*` (scoped, не journal globals)                                                                       |

Tab-level: select row → sync секция 02 + scroll `resultRef`; delete → filter + hide 03 if empty.

---

## Program 2.0 — секция 04: VolumeDonut (`VolumeDonut`)

**Файлы:** `VolumeDonut.tsx`, `volume-breakdown.css`.

### Структура блоков

```
div.ta-vol
├── p.ta-vol__lede          (intro copy)
└── div.ta-vol__grid
      ├── div.ta-vol__summary        (3 category cards)
      ├── div.ta-vol__donut          (dual-ring SVG)
      ├── div.ta-vol__list           (ranked muscle rows)
      └── aside.ta-vol__detail       (source breakdown)
```

### Typography

| Element           | Size | Notes                     |
| ----------------- | ---- | ------------------------- |
| Lede              | 14px | muted, bordered intro box |
| Summary strong    | 24px | display font, category %  |
| Summary em        | 12px | mono tabular sets         |
| Row label         | 14px | muscle name               |
| Row value/percent | 12px | mono tabular              |

### Layout

- Grid areas: summary full width → donut + list → detail full width
- Desktop: donut 240px col + list flexible
- Summary: 3-col equal cards, left accent 2px per category color

### Interaction

- Donut inner segments: `role="button"`, `aria-pressed`, keyboard Enter/Space/Escape
- List rows: `<button.ta-vol__row>` sync selection with donut
- Opacity dimming: non-selected categories/muscles fade (0.2–0.96)

### a11y

- SVG `<title>` + `<desc>` for rings
- Each row/segment: verbose `aria-label` with rank, sets, percent
- Detail panel: `aria-label` with muscle name

### Copy

- Lede: «Показывает, какие мышечные группы получают больше всего рабочих подходов в базовом 3-дневном цикле.»
- Detail eyebrow: «Источник объёма» UPPERCASE 12px

### MUST

- **MUST** `--vol-color` per muscle/category via inline CSS var
- **MUST** `prefers-reduced-motion` — no segment scale transitions if reduced
- **MUST NOT** treat as user-specific data (static program breakdown)

---

## Program 3.0 — обзор (`CalculatorTabV3`)

**Shell:** `.ta-shell.program-v3-calculator` — локальные aliases как calc-test (`program-v3.css`).

**Hero:** eyebrow «Калькулятор», title = `PROGRESSION_PRESET_META.strength.programLabel` («На силу»).

### V3-01 — Упражнение

| Aspect      | Spec                                                            |
| ----------- | --------------------------------------------------------------- |
| Shell       | `SectionBlock num="01"`, quiet pill, clamp title                |
| Control     | `ExercisePicker` (`.ew-*`) — parity с Program 2.0 ExerciseWheel |
| Alt copy    | «Альтернатива: {alternativeName}» если есть                     |
| Order       | `EXERCISE_ORDER_V3` из `TRAINING_DAYS_V3`                       |
| Type meta   | `CATEGORY_LABELS_V3` (barbell/dumbbell/…)                       |
| Empty state | placeholder «Выберите упражнение» до выбора                     |

**a11y:** `triggerId` + `ariaLabelledBy="calc-v3-exercise-heading"`.

### V3-02 — Черновой 1ПМ

| Aspect    | Spec                                               |
| --------- | -------------------------------------------------- |
| Fields    | `PremiumInput variant="stepper"` weight + reps     |
| Live est. | «Оценка 1ПМ: **{n} кг**» — accent strong, не saved |
| Footnote  | NoteBox: lead «Справочно.» + Brzycki disclaimer    |

Formula: `calc1RM(w, r, 'brzycki')` — display only.

### V3-03 — Прогрессия (`ProgramV3ProgressChart`)

**Sibling** preview/chart etalons — reuses `.ta-period` + `.progression-preview` patterns.

| Aspect       | V3 chart                                 |
| ------------ | ---------------------------------------- |
| Weeks        | 16                                       |
| Data         | `getPrescription` + user testResults     |
| Test weeks   | `?` weight until logged                  |
| Missing test | `status: missing_test`, muted rows       |
| Empty        | `program-v3-progress__empty` status text |
| Footnote     | «Тестовые недели.» + PR2 hint            |

**Hook:** `useProgramV3Progress.ts` — geometry only, same interaction layer as PeriodizationChart.

**a11y:** `aria-label="Прогрессия: {exerciseName}"`, listbox + keyboard nav.

### V3 vs 2.0 — design divergence (намеренно)

| Element       | Program 2.0                    | Program 3.0                   |
| ------------- | ------------------------------ | ----------------------------- |
| Exercise pick | ExercisePicker (ExerciseWheel) | ExercisePicker (same `.ew-*`) |
| 1RM entry     | Full test approach form        | Draft steppers (reference)    |
| Saved list    | ✅ sec 03                      | ❌ (tests in training)        |
| Volume donut  | ✅ sec 04                      | ❌                            |
| Section pills | Mixed quiet/editorial          | All quiet (calc-test style)   |

---

## Shared: `SectionBlock` + `NoteBox`

**Variant:** always `variant="apple"` in Calculator tab.

```tsx
<SectionBlock num="0N" title="…" variant="apple" titleId? className?>
  {children}
</SectionBlock>

<NoteBox variant="apple">{footnote / legend}</NoteBox>
```

- Scroll reveal: `.reveal-section` + `useScrollReveal` → `.is-visible`
- Note surface: `--ta-surface-2`, radius 16px (12px in calc-test override), 14px muted body, strong → primary text

---

## Tab transition (Framer Motion)

**File:** `TabPanel.tsx`.

| Property | Value                                         |
| -------- | --------------------------------------------- |
| Key      | `calculator-body-{2.0\|3.0}` on preset switch |
| Enter    | opacity 0→1, y 8→0, 200ms ease-in-out         |
| Exit     | opacity 1→0, y 0→-4                           |
| reduced  | duration 0, no exit animation                 |

**MUST** preserve picker outside motion wrapper (settings stay mounted).

---

## Матрица «блок → partial standard»

| Блок                      | Partial standard                            |
| ------------------------- | ------------------------------------------- |
| **Секция 02 (composite)** | `calc-progression-result-standard.md`       |
| TestApproachSection       | `calc-test-approach-standard.md`            |
| PeriodizationChart        | `periodization-chart-standard.md` (**MAX**) |
| ProgressionPreviewChart   | `periodization-chart-standard.md` §7        |
| ProgramV3ProgressChart    | `periodization-chart-standard.md` §7        |
| Saved list                | `calc-saved-exercises-standard.md`          |
| Theory tokens / shell     | `.cursor/rules/theory-design-reference.mdc` |

---

## Global MUST / SHOULD / MUST NOT (Calculator tab)

### MUST

- [ ] Читать **этот файл** перед любой задачей на Calculator tab
- [ ] Preset picker в `.ta-shell--calc-settings` **отдельно** от tab body
- [ ] Оба трека используют `.ta-shell` + `SceneHero` + `.ta-stack--calc`
- [ ] Секции через `SectionBlock variant="apple"` + numbered pills
- [ ] Tokens `--ta-calc-*` / aliases; 4px spacing scale
- [ ] `:focus-visible`, `@media (hover: hover)`, `prefers-reduced-motion`
- [ ] Copy RU, sentence case (кроме hero eyebrow и result label UPPERCASE)
- [ ] Charts: listbox-primary on mobile, SVG secondary ≤600px
- [ ] Touch targets ≥44px на controls

### SHOULD

- [ ] При добавлении секции 05+ — обновить этот umbrella doc
- [ ] ScrollIntoView на result после calculate (2.0)
- [ ] Cross-link partial standards, не дублировать геометрию чартов

### MUST NOT

- [ ] Legacy `.ta-calc-form` для новых секций
- [ ] Ad hoc list/chart/form вне эталонных паттернов
- [ ] Raw hex в TSX
- [ ] Toast для validation (inline near field)
- [ ] Дублировать preset picker внутри CalculatorTab body
- [ ] Animate width/height/margin на tab switch

---

## Sibling (не эталон)

| Surface                          | Почему не канон                          |
| -------------------------------- | ---------------------------------------- |
| `training-app-mobile` calculator | RN StyleSheet, другой saved list format  |
| `apps/macos/CalculatorScreen`    | legacy SectionBlock без apple variant    |
| Legacy `.ta-calc-form`           | ALL CAPS, oversized steppers             |
| `PopChildMeasure`                | не используется в текущем web Calculator |

---

## Чеклист агента (Calculator tab change)

- [ ] Прочитать этот файл + matching partial standard(s)
- [ ] Определить трек: 2.0 vs 3.0 (или shared L0/L1)
- [ ] Verify оба preset в browser (`Оптимальная` + `На силу`)
- [ ] 320px width, keyboard tab order, reduced motion
- [ ] Update partial standard if block pattern evolves; sync this umbrella doc

---

## Связанные артефакты Memory Bank

- Индекс: `memory-bank/reference/README.md`
- Partial: `calc-test-approach-standard.md`, `calc-progression-result-standard.md`, `periodization-chart-standard.md`, `calc-saved-exercises-standard.md`
- Patterns: `memory-bank/systemPatterns.md`
- Context: `memory-bank/activeContext.md`
- Style: `memory-bank/style-guide.md`
- Rule: `.cursor/rules/react-training-memory-bank.mdc`
