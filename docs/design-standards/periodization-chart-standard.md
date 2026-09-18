# Эталон: PeriodizationChart (`section.ta-period`)

> **Статус:** канонический reference implementation для dual-axis SVG-чартов периодизации в web-калькуляторе (Program 2.0).  
> **Дата фиксации:** 2026-05-25 · **MAX expansion:** 2026-05-28 · **palette lock:** 2026-07-09  
> **Не модифицировать** без явной задачи; новые чарты — копировать паттерны отсюда.  
> **Locked gold:** orange `%` line + markers (`--ta-sec-01` `#ffb020`), blue bars (`--ta-sec-02`), phase chips ACCUMULATION/DELOAD/INTENSIFICATION/PEAK. Canon copy: `memory-bank/reference/periodization-chart-standard.md`.

**Родительский partial:** [`calc-progression-result-standard.md`](./calc-progression-result-standard.md) (секция 02 «Прогрессия»).  
**Umbrella tab:** [`calculator-tab-standard.md`](./calculator-tab-standard.md) §02d.

---

## 0. Quick reference

| Что            | Значение                                                                |
| -------------- | ----------------------------------------------------------------------- |
| Root class     | `section.ta-period`                                                     |
| Scope CSS      | `.ta-shell .ta-period*` (`theory-apple.css` L3432–3709)                 |
| viewBox        | `0 0 800 280`                                                           |
| Левая ось SVG  | `%` (интенсивность, **оранжевая** линия `--ta-sec-01`)                  |
| Правая ось SVG | `повт` (объём, **синие** bars `--ta-sec-02`)                            |
| Phase strip    | 4 сегмента EN uppercase: ACCUMULATION / DELOAD / INTENSIFICATION / PEAK |
| Deload         | **Неделя 5** (index 4), pct dip + volume restore                        |
| Listbox cols   | Нед · кг · scheme · повт · **phase (EN)**                               |
| Tooltip phase  | RU hint via `phaseHint()`                                               |
| Mobile ≤600px  | SVG readonly; listbox = primary UI                                      |
| Reduced motion | CSS `@media (prefers-reduced-motion: reduce)` — animations off          |

---

## 1. Карта файлов

| Слой                  | Путь                                                             | Экспорт / символы                                                                            |
| --------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **UI**                | `src/components/PeriodizationChart.tsx`                          | default export; `formatWeight`, `weightLabel`, `phaseHint`; constants `TIP_*`, `CHART_WIDTH` |
| **Data / geometry**   | `src/hooks/usePeriodization.ts`                                  | `usePeriodization`, `PeriodWeek`, `PeriodPhase`, `phaseFor`, `VIEW`, `linePath`, `areaPath`  |
| **Расчёт веса**       | `packages/shared/src/utils/calc.ts` (re-export `src/utils/calc`) | `calcWorkingWeight`, `roundWeight`                                                           |
| **Источник % и схем** | `packages/shared/src/data/exercises.ts`                          | `EXERCISES[*].percentages`, `weekSchemes`                                                    |
| **Стили**             | `src/styles/components/theory-apple.css` **L3432–3709**          | `.ta-period`, `.ta-period-*`, `.ta-period-week`, `@keyframes ta-period-*`                    |
| **Родитель**          | `src/screens/CalculatorTab.tsx`                                  | `<PeriodizationChart config={config} result={activeResult} />` в `SectionBlock num="02"`     |
| **Оболочка**          | `src/components/SectionBlock.tsx`                                | `variant="apple"` → `.ta-section` + scroll reveal                                            |

**Единственное место использования (Program 2.0):** `CalculatorTab` при `activeProgram !== '3.0'` (`TabPanel.tsx`).

**CSS modifiers для siblings (не используются в PeriodizationChart, но в том же блоке `.ta-period`):** `.ta-period__point--muted`, `--test`, `.ta-period__bar.is-test`, `.ta-period-week.is-test`, `.ta-period__test-mark` — см. §12.

---

## 2. Архитектура

### 2.1 Разделение ответственности

```
ExerciseConfig + SavedExercise
        │
        ▼
 usePeriodization (useMemo) ──► weeks[], phases[], linePath, areaPath, viewBox, grid
        │
        ▼
 PeriodizationChart ──► activeIndex: number | null + phase strip / SVG / listbox
```

| Слой                 | Ответственность                                      | Запрещено                                   |
| -------------------- | ---------------------------------------------------- | ------------------------------------------- |
| `usePeriodization`   | Pure geometry, domain mapping, paths                 | React state, DOM, i18n strings              |
| `PeriodizationChart` | Selection state, a11y, event handlers, label helpers | Пересчёт координат, дублирование `phaseFor` |

Hook пересчитывается при смене `config` или `result` (`useMemo` deps: `[config, result]`).

### 2.2 Props

```ts
interface PeriodizationChartProps {
  config: ExerciseConfig; // percentages[], weekSchemes[], step, type, isPullup?
  result: SavedExercise; // oneRM, bodyWeight? (pullups), exerciseKey, testWeight, testReps
}
```

**Не принимает** `ProgramSettings` / `progressionPreset`. Данные — напрямую из `config.percentages` и `config.weekSchemes` **без** `applyProgressionPresetToPercent/Scheme` (preset сейчас no-op в `progressionPresets.ts`).

### 2.3 Parent context

```tsx
<SectionBlock num="02" title={`Прогрессия — ${config.name}`} variant="apple">
  <div className="insight">…</div>
  <ResultCard … />
  <PlateDiagram … />                        // !isPullup && type A/B
  <PeriodizationChart config={config} result={activeResult} />
  <NoteBox variant="apple">↺ Нед 5… vol-legend</NoteBox>
</SectionBlock>
```

---

## 3. Phase strip (`.ta-period__phases`)

### 3.1 DOM и data

```tsx
<div className="ta-period__phases" aria-hidden="true">
  {phases.map(phase => (
    <span
      className="ta-period__phase"
      style={{
        flexGrow: phase.weeks,
        '--phase-color': `var(${phase.colorVar})`,
        '--phase-bg': `var(${phase.tintVar})`,
      }}>
      {phase.label} // EN, rendered UPPERCASE via CSS
    </span>
  ))}
</div>
```

**`aria-hidden="true"`** — декоративная полоса; семантика фаз дублируется в listbox + tooltip.

### 3.2 Mapping index → phase (`phaseFor`)

Жёстко в `usePeriodization.ts`, **не из config**:

| Index | Week  | Phase (internal + strip label) | `flexGrow` (weeks in strip) |
| ----- | ----- | ------------------------------ | --------------------------- |
| 0–3   | 1–4   | `Accumulation`                 | 4                           |
| 4     | **5** | **`Deload`**                   | 1                           |
| 5–6   | 6–7   | `Intensification`              | 2                           |
| 7     | 8     | `Peak`                         | 1                           |

Пропорции strip: **4 : 1 : 2 : 1** (50% : 12.5% : 25% : 12.5% ширины).

### 3.3 Цвета фаз (`--ta-sec-*`)

Определены в `theory-apple.css` L9–20; на phase pill через inline CSS vars:

| Phase           | `label` (strip)   | `colorVar`    | `tintVar`          | Hex accent         | Tint formula       |
| --------------- | ----------------- | ------------- | ------------------ | ------------------ | ------------------ |
| Accumulation    | `Accumulation`    | `--ta-sec-02` | `--ta-sec-02-tint` | `#5ba4ff` (blue)   | 6% mix → `#0a0a0b` |
| Deload          | `Deload`          | `--ta-sec-03` | `--ta-sec-03-tint` | `#3affb8` (mint)   | 6% mix             |
| Intensification | `Intensification` | `--ta-sec-06` | `--ta-sec-06-tint` | `#ff6b6b` (red)    | 6% mix             |
| Peak            | `Peak`            | `--ta-sec-01` | `--ta-sec-01-tint` | `#ffb020` (orange) | 6% mix             |

**Pill styling** (`.ta-period__phase`):

- `background: var(--phase-bg)`; `color: var(--phase-color)`
- `border: 1px solid color-mix(in srgb, var(--phase-color) 30%, transparent)`
- `border-radius: 8px`; `padding: 7px 8px`; `gap` между pills **4px**
- Typography: **12px**, **600**, `letter-spacing: 0.08em`, **`text-transform: uppercase`**

**Важно:** цвет **активной фазы** не красит line/bars chart. Line/area = **`--ta-sec-01`** (Peak orange); bars = **`--ta-sec-02`** (Accumulation blue) — отдельная visual encoding.

### 3.4 Язык: EN strip vs RU hints

| Место                | Язык                        | Пример                                                                                   |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| Phase strip text     | **English** (CSS uppercase) | `ACCUMULATION`, `DELOAD`, …                                                              |
| Tooltip line 1       | Mixed RU + EN phase         | `Неделя 5 · Deload`                                                                      |
| Tooltip line 3       | **Russian** hint            | `24 повт · восстановление`                                                               |
| Listbox col 5 `<em>` | **English** per code        | `Deload`                                                                                 |
| `phaseHint()` map    | RU                          | Deload→«восстановление», Peak→«пик», Intensification→«интенсификация», else→«накопление» |

**Policy:** listbox phase **English per code** — documented gap, не баг; локализация только по явной задаче.

---

## 4. SVG chart (`.ta-period__scroll` → `.ta-period__svg`)

### 4.1 Container

| Property          | Value                                                      |
| ----------------- | ---------------------------------------------------------- |
| Scroll wrapper    | `overflow-x: auto`, `-webkit-overflow-scrolling: touch`    |
| SVG               | `viewBox="0 0 800 280"`, `preserveAspectRatio="none"`      |
| Desktop min-width | **720px** (`width: 100%`)                                  |
| a11y              | `role="img"`, `aria-labelledby="period-title period-desc"` |

### 4.2 VIEW constants (`usePeriodization.ts`)

```ts
const VIEW = {left: 56, right: 56, top: 28, bottom: 238, width: 800, barWidth: 40};
```

| Derived       | Formula                         | Numeric                        |
| ------------- | ------------------------------- | ------------------------------ |
| `chartWidth`  | `800 - 56 - 56`                 | **688**                        |
| `chartHeight` | `238 - 28`                      | **210**                        |
| `stepX`       | `chartWidth / max(1, N-1)`      | 688/7 ≈ **98.29** для 8 нед    |
| Plot X range  | `x1=56` … `x2=744` (grid lines) | matches `left` / `width-right` |

### 4.3 Grid (7 horizontal lines)

```ts
grid: Array.from({length: 7}, (_, i) => VIEW.top + i * ((VIEW.bottom - VIEW.top) / 6));
```

Y positions: **28**, **63**, **98**, **133**, **168**, **203**, **238** (равные шестые plot height). Синхрон с `useJournalProgressChart` (`Y_GRID_COUNT = 7`).

CSS `.ta-period__grid`: `stroke: rgba(255,255,255,0.05)`, `stroke-width: 1`, `x1="56"` `x2="744"`.

### 4.4 Axis labels

| Label  | x   | y   | Class              | Meaning                               |
| ------ | --- | --- | ------------------ | ------------------------------------- |
| `%`    | 12  | 34  | `.ta-period__axis` | Left — **intensity** scale (line Y)   |
| `повт` | 748 | 34  | `.ta-period__axis` | Right — **volume** scale (bar height) |

Font: `ui-monospace, SFMono-Regular, Menlo, Consolas`, **12px**, `fill: var(--ta-text-dim)`.

Week numbers under points: `.ta-period__week-label`, `y="264"`, `textAnchor="middle"`, same mono 12px.

### 4.5 Orange line + area (`--ta-sec-01`)

**Line** (`.ta-period__line`):

- `stroke: var(--ta-sec-01)` (#ffb020)
- `stroke-width: 3`; `stroke-linecap/join: round`
- `pathLength={1}` + `stroke-dasharray: 1` + animated `stroke-dashoffset` → draw effect
- Animation: `ta-period-line-in` **900ms** `var(--ta-ease)` delay **120ms**

**Area** (`.ta-period__area`):

- `fill: var(--ta-sec-01-tint)`; closed path via `areaPath()` to baseline `VIEW.bottom` (238)
- Animation: `ta-period-area-in` **500ms** delay **700ms** (fade in after line starts)

**Y mapping (%):**

```ts
minPct = min(percentages) - 5;
maxPct = max(percentages) + 5;
y = VIEW.bottom - ((pct - minPct) / (maxPct - minPct)) * chartHeight;
```

Example bench wave `[68,73,78,83,75,79,85,90]` → minPct=63, maxPct=95.

### 4.6 Blue bars (`--ta-sec-02`)

Per week rect:

| Attr        | Source                                          |
| ----------- | ----------------------------------------------- |
| `x`         | `barX = x - barWidth/2` (center on line point)  |
| `y`         | `barY = VIEW.bottom - barHeight`                |
| `width`     | **40** (`VIEW.barWidth`, also hardcoded in JSX) |
| `height`    | `(totalReps / maxVolume) * chartHeight`         |
| `className` | `ta-period__bar` + `is-active` when selected    |

CSS:

- `fill: var(--ta-sec-02)` (#5ba4ff)
- Default `opacity: 0.72`; **`.is-active` → 1**
- Entry: `transform: scaleY(0)` → `scaleY(1)`, `transform-origin: bottom`, `transform-box: fill-box`
- Animation: `ta-period-bar-in` **360ms**; stagger **`animationDelay: index * 60ms`** (inline style)

**maxVolume:** `max(...weekSchemes.map(s => s.sets * s.reps), 1)` — нормализация высоты bars.

### 4.7 Points (line markers)

`<circle class="ta-period__point">`:

- `r="4"`; `cx/cy` = line point
- Default: `fill: var(--ta-calc-surface)`, `stroke: var(--ta-sec-01)`, `stroke-width: 2`
- `.is-active`: `fill: var(--ta-sec-01)`
- Pointer events: `onPointerEnter/Leave` → sync `activeIndex`

### 4.8 Tooltip + cursor line (desktop only)

Shown when `activeIndex !== null`. Group `.ta-period__tip` at `transform="translate(tipX, 14)"`.

**Constants** (`PeriodizationChart.tsx`):

```ts
TIP_WIDTH = 232;
TIP_HEIGHT = 78;
TIP_MARGIN = 16;
CHART_WIDTH = 800;
tipX = clamp(active.x - TIP_WIDTH / 2, TIP_MARGIN, CHART_WIDTH - TIP_WIDTH - TIP_MARGIN);
```

**Cursor line** (`.ta-period__cursor`):

- Vertical dashed line from tooltip top to plot bottom
- `x1 = x2 = active.x - tipX` (relative to tip group)
- `y1="0"` `y2="228"`
- `stroke: var(--ta-calc-accent)` (= `--ta-sec-01`); `stroke-dasharray: 4 5`

**Tooltip card** (`rect` rx=10):

- Fill `var(--ta-surface-2)`; stroke `var(--ta-calc-border)`
- `pointer-events: none` on group

**Three text lines** (mono 12px):

| Line | y   | Content                                 | Weight/color      |
| ---- | --- | --------------------------------------- | ----------------- |
| 1    | 21  | `Неделя {week} · {phase}`               | 600, `--ta-text`  |
| 2    | 42  | `{weightLabel} · {sets} × {reps}`       | regular           |
| 3    | 63  | `{totalReps} повт · {phaseHint(phase)}` | `--ta-text-muted` |

### 4.9 `<title>` / `<desc>` (a11y)

- **title:** «График периодизации»
- **desc (hardcoded):** «8 недель: интенсивность в процентах и объём в повторениях. Неделя 5 — разгрузка.»
- **Gap:** desc не derived from `weeks.length` — см. §15.

---

## 5. Listbox (`.ta-period__weeks`)

### 5.1 Structure

```tsx
<div className="ta-period__weeks" role="listbox" aria-label="Недели периода" onKeyDown={keyDown}>
  <button role="option" aria-selected={…} className="ta-period-week" id={`period-week-${week}`}>
    <span>Нед {week}</span>
    <strong>{weightLabel}</strong>
    <span>{sets} × {reps}</span>
    <span>{totalReps} повт</span>
    <em>{week.phase}</em>   // English: Accumulation | Deload | …
  </button>
</div>
```

### 5.2 Grid columns (desktop)

`.ta-period-week` → `grid-template-columns: **54px 1fr 80px 80px 140px**`; gap **10px**; padding **10px 12px**.

| Col | Element    | Copy pattern                      |
| --- | ---------- | --------------------------------- |
| 1   | `<span>`   | `Нед {n}`                         |
| 2   | `<strong>` | `{weight} кг` or pullup `+/-X кг` |
| 3   | `<span>`   | `{sets} × {reps}`                 |
| 4   | `<span>`   | `{totalReps} повт`                |
| 5   | `<em>`     | **`{phase}` English**             |

### 5.3 Active / focus states

`.ta-period-week` — uniform 1px border (no left rail). Hover / `.is-active` / `:focus-visible` recolor **full perimeter** with `border-color: var(--ta-calc-accent)`; active/focus also use `background: var(--ta-calc-accent-tint)` and `outline: none`.

Sync with chart: `onFocus` / `onMouseEnter` → `setActiveIndex(index)`; `onMouseLeave` → null; `onClick` → toggle (click active again → deselect).

---

## 6. Deload — неделя 5

### 6.1 Data signature (typical type A exercise)

From `EXERCISES.bench` / `squat` / `row`:

| Week  | pct    | sets×reps | totalReps | Phase           |
| ----- | ------ | --------- | --------- | --------------- |
| 4     | 83     | 4×5       | 20        | Accumulation    |
| **5** | **75** | **4×6**   | **24**    | **Deload**      |
| 6     | 79     | 4×5       | 20        | Intensification |

**Deload pattern:** % **drops** (83→75) while **volume rises** (20→24 reps) — «волновой откат» в NoteBox.

### 6.2 Visual cues

- Line point ** dips** at week 5 on orange trajectory
- Bar ** taller** at week 5 (more reps)
- Phase strip: single **Deload** segment (mint `--ta-sec-03`)
- Tooltip/list: phase `Deload` + hint «восстановление»

### 6.3 Cross-ref NoteBox

`CalculatorTab` footnote: «↺ **Нед 5 — волновой откат:** вес снижается, объём восстанавливается.» — must stay aligned with chart behavior.

---

## 7. Interaction & keyboard

### 7.1 State machine

Single state: `activeIndex: number | null`.

| Event                      | Handler                       | Result                                           |
| -------------------------- | ----------------------------- | ------------------------------------------------ |
| Pointer enter bar/circle   | `setActiveIndex(i)`           | tooltip + cursor + `.is-active` on bar/point/row |
| Pointer leave bar/circle   | `setActiveIndex(null)`        | clear                                            |
| List focus / mouseenter    | `setActiveIndex(i)`           | chart sync                                       |
| List mouseleave            | `setActiveIndex(null)`        | clear                                            |
| List click                 | toggle i / null               | sticky selection                                 |
| `Escape` on listbox        | `setActiveIndex(null)`        | clear                                            |
| `ArrowLeft` / `ArrowRight` | `preventDefault`; clamp 0…N-1 | keyboard week nav                                |

**Arrow key baseline:** if `activeIndex === null`, starts from **0** then moves.

### 7.2 Keyboard scope

`onKeyDown` on **listbox container** only (not SVG). SVG bars/circles — pointer only; on mobile SVG has `pointer-events: none`.

### 7.3 Section landmark

`section[aria-label="График периодизации, ${weeks.length} недель"]`

---

## 8. Расчёт данных

### 8.1 `PeriodWeek` shape

```ts
interface PeriodWeek {
  week: number; // index + 1
  pct: number;
  weight: number; // display (pullup: raw - bodyWeight)
  rawWeight: number;
  sets;
  reps;
  totalReps;
  phase: 'Accumulation' | 'Deload' | 'Intensification' | 'Peak';
  x;
  y; // line point
  barX;
  barY;
  barHeight;
}
```

### 8.2 Weight formula

```ts
calcWorkingWeight(oneRM, pct, cfg) = roundWeight(oneRM * (pct / 100), cfg.step, cfg.type);
```

- type **A/B:** ceil to step
- type **C/D:** floor to step

### 8.3 Pullups

```ts
displayWeight = rawWeight - result.bodyWeight   // signed
weightLabel → "+X кг" / "-X кг"
```

### 8.4 Source arrays

Length of `config.percentages` drives week count (typically **8**). Each index pairs `percentages[i]` + `weekSchemes[i]`.

---

## 9. CSS inventory (`theory-apple.css` L3432–3709)

### 9.1 Container `.ta-period`

- `background: var(--ta-calc-surface)`; `border: 1px solid var(--ta-calc-border)`
- `border-radius: 16px`; `padding: 16px`; `margin-bottom: 24px`

### 9.2 List container `.ta-period__weeks`

- `display: grid`; `gap: 6px`; `margin-top: 12px`

### 9.3 Row `.ta-period-week`

- `border: 1px solid var(--ta-calc-border)` (uniform; hover/active recolor full perimeter — no left rail)
- `border-radius: 8px`; `color: var(--ta-text-muted)`; `cursor: pointer`
- `strong`: `font-variant-numeric: tabular-nums`; `color: var(--ta-text)`
- `em`: `font-style: normal`; `color: var(--ta-text-dim)`; `justify-self: end`

### 9.4 Keyframes

| Name                | Effect                     | Used by            |
| ------------------- | -------------------------- | ------------------ |
| `ta-period-line-in` | `stroke-dashoffset: 1 → 0` | `.ta-period__line` |
| `ta-period-area-in` | `opacity: 0 → 1`           | `.ta-period__area` |
| `ta-period-bar-in`  | `scaleY(0) → scaleY(1)`    | `.ta-period__bar`  |

Easing: **`var(--ta-ease)`** for all.

---

## 10. Responsive breakpoints

### 10.1 `@media (max-width: 600px)`

| Element                       | Change                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| `.ta-period__phases`          | `display: grid`; **2 columns**; gap 8px                       |
| `.ta-period__phase`           | `white-space: normal`; min-height 32px; letter-spacing 0.05em |
| `.ta-period__scroll`          | `overflow: hidden`                                            |
| `.ta-period__svg`             | height **180px**; min-width **0**; **`pointer-events: none`** |
| axis, week-label, **tooltip** | `display: none`                                               |
| `.ta-period-week`             | **2-col grid** (stacked pairs)                                |
| `.ta-period-week em`          | `justify-self: start`                                         |

**Strategy:** chart decorative; **listbox carries full data + interaction**.

### 10.2 `@media (max-width: 340px)`

- Phase strip → **1 column**

---

## 11. `prefers-reduced-motion: reduce`

```css
.ta-shell .ta-period__area,
.ta-shell .ta-period__line,
.ta-shell .ta-period__bar {
  animation: none !important;
  opacity: 1 !important;
  stroke-dashoffset: 0 !important;
  transform: none !important;
}
```

**CSS-only** — no JS `matchMedia`. Instant final state: full line, visible area, full-height bars.

---

## 12. Sibling CSS modifiers (shared `.ta-period` block)

Used by **`ProgressionPreviewChart`**, **`ProgramV3ProgressChart`**, not by base `PeriodizationChart`:

| Class                            | Purpose                          |
| -------------------------------- | -------------------------------- |
| `.ta-period__point--muted`       | Dimmed point                     |
| `.ta-period__point--test`        | Test week marker (dashed stroke) |
| `.ta-period__test-mark`          | `?` label on test weeks          |
| `.ta-period__bar.is-test`        | Muted dashed bar                 |
| `.ta-period-week.is-test strong` | Dimmed weight in list            |

When extending PeriodizationChart — reuse these classes rather than new ad hoc styles.

---

## 13. Program 2.0 vs 3.0

| Аспект      | PeriodizationChart      | Program 3.0                                          |
| ----------- | ----------------------- | ---------------------------------------------------- |
| Surface     | `CalculatorTab`         | `CalculatorTabV3` — table + `ProgramV3ProgressChart` |
| Weeks       | 8 from `EXERCISES`      | 16, `WEEK_SCHEDULE_V3`                               |
| 1RM         | Epley from user test    | Brzycki, test weeks 4/8/12/16                        |
| Phase model | Fixed `phaseFor` 8-week | V3 schedule phases                                   |

---

## 14. Sibling charts comparison

| Критерий        | **PeriodizationChart** (эталон) | ProgressionPreviewChart          | ProgramV3ProgressChart           |
| --------------- | ------------------------------- | -------------------------------- | -------------------------------- |
| Hook            | `usePeriodization`              | `useProgressionPreview`          | `useProgramV3Progress`           |
| Left axis       | **%**                           | **кг**                           | **кг**                           |
| Data            | User oneRM                      | Demo 100 kg squat                | V3 prescription                  |
| Deload W5       | phase + data dip                | `.is-deload` class               | schedule-based                   |
| Test weeks      | none                            | `?` markers (strength)           | test weeks                       |
| CSS root        | `.ta-period`                    | `.progression-preview.ta-period` | `.program-v3-progress.ta-period` |
| Reset on preset | n/a                             | `useEffect` reset index          | similar                          |

**→ Horizontal layout, phase strip, listbox, tooltip pattern — copy from this doc.**

---

## 15. Known gaps (documented, not bugs)

| Gap                                | Risk                                   | Recommendation                                     |
| ---------------------------------- | -------------------------------------- | -------------------------------------------------- |
| Hardcoded `<desc>` «8 недель» / W5 | Wrong a11y if N≠8                      | Derive from `weeks.length` + deload index          |
| Phase EN in list `<em>`            | RU/EN mix                              | Localize only on explicit task; tooltip already RU |
| Bars mono `--ta-sec-02`            | NoteBox vol-legend colors not on chart | Optional `barColor(totalReps)`                     |
| No preset in hook                  | Future preset may change %             | Pass preset or document immutability               |
| v3 separate model                  | Don't copy `phaseFor` to v3            | New hook from `getPrescription`                    |

---

## 16. Agent checklist (new dual-axis chart)

- [ ] Hook: `useMemo`, `VIEW` constants, `linePath`/`areaPath` helpers
- [ ] Component: **only** `activeIndex` + a11y listbox
- [ ] CSS under `.ta-shell`, mobile + `prefers-reduced-motion`
- [ ] Phase strip via `--phase-color` / `--phase-bg`, not inline hex
- [ ] Tooltip X clamp; cursor line relative math
- [ ] Pullup `weightLabel` edge cases
- [ ] Stagger **60ms** on bars
- [ ] Update **this file** + `calc-progression-result-standard.md` if parent context changes
- [ ] Preview MCP `cursor-ide-browser` @ `:5173`

---

## 17. Связанные артефакты Memory Bank

| Документ                                                                       | Связь                                |
| ------------------------------------------------------------------------------ | ------------------------------------ |
| [`calc-progression-result-standard.md`](./calc-progression-result-standard.md) | Partial sec 02, link to this MAX doc |
| [`calculator-tab-standard.md`](./calculator-tab-standard.md)                   | Umbrella §02d                        |
| [`README.md`](./README.md)                                                     | Index → PeriodizationChart row       |
| `memory-bank/systemPatterns.md`                                                | Reference implementations table      |
| `memory-bank/activeContext.md`                                                 | Design canon + session notes         |
| `memory-bank/style-guide.md`, `CLAUDE.md`                                      | Global tokens / motion               |
| `.cursor/rules/theory-design-reference.mdc`                                    | `--ta-*` Theory shell                |
| `docs/claude-designer-brief.md`                                                | Designer brief row                   |
