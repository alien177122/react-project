# Эталон: ExercisePicker (`.calc-test__exercise` / `.ew-*`)

> **Статус:** канонический reference implementation для **выбора упражнения** в калькуляторе (Program 2.0 и Program 3.0).  
> **Дата фиксации:** 2026-05-28  
> **Не модифицировать** без явной задачи; новые exercise pickers — наследовать паттерны отсюда.

## Карта файлов

| Слой                | Путь                                                      | Символы / классы                                                |
| ------------------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| Shared picker       | `src/components/calculator/ExercisePicker.tsx`            | `ExercisePicker`, `ExercisePickerItem`, `ExercisePickerOption`  |
| Program 2.0 adapter | `src/components/ExerciseWheel.tsx`                        | thin wrapper → `WHEEL_ORDER` + `EXERCISES` + type A–D           |
| Program 2.0 usage   | `src/components/calculator/TestApproachSection.tsx`       | `.calc-test__exercise` + `ExerciseWheel`                        |
| Program 3.0 usage   | `src/screens/CalculatorTabV3.tsx`                         | `.calc-test__exercise` + `ExercisePicker` + V3 items            |
| V3 data             | `packages/shared/src/program/v3/exercises.ts`             | `EXERCISE_ORDER_V3`, `CATEGORY_LABELS_V3`, `CATEGORY_COLORS_V3` |
| **Стили dropdown**  | `src/styles/components/calculator/exercise-select.css`    | `.ew-select`, `.ew-trigger`, `.ew-menu`, `.ew-option`           |
| Calc overrides      | `src/styles/components/calculator/calc-test-approach.css` | `.calc-test .ew-trigger*`, placeholder state                    |
| Parent form         | `memory-bank/reference/calc-test-approach-standard.md`    | section shell, label rhythm, keyboard inset                     |

**Sibling (не эталон):** native `<select.ta-calc-select>` в `.calc-test__select-wrap` — legacy Program 3.0 control, **заменён** на ExercisePicker. Не использовать для новых секций.

---

## 1. Архитектура

```
ExercisePicker (generic listbox dropdown)
        │
        ├── Program 2.0: ExerciseWheel → EXERCISES + TYPE_LABELS A–D
        └── Program 3.0: CalculatorTabV3 → EXERCISES_V3 + CATEGORY_LABELS barbell/dumbbell/…
```

- **ExercisePicker** — UI + a11y + saved 1RM badge; **без** привязки к конкретному каталогу упражнений.
- **ExerciseWheel** — adapter для Program 2.0; сохраняет backward-compatible default export.
- **CSS scope** — базовые `.ew-*` в `exercise-select.css`; calculator trigger overrides под `.calc-test`.

### Props surface

```ts
interface ExercisePickerItem {
  key: string;
  name: string;
  typeLabel: string; // subtitle: «Тип А — Штанга крупная» или «Гантели»
  typeColor: string; // accent bar + active tint source
}

interface ExercisePickerProps {
  value: string; // '' allowed (placeholder trigger)
  onChange: (key: string) => void;
  items: ExercisePickerItem[];
  savedExercises?: SavedExercise[]; // optional 1RM badge by exerciseKey
  placeholder?: string; // default «Выберите упражнение»
  menuTitle?: string; // default «Выбери упражнение»
  triggerId?: string; // for <label htmlFor>
  ariaLabelledBy?: string; // section heading id
}
```

---

## 2. Trigger (`.ew-trigger`)

| Element     | Spec                                                             |
| ----------- | ---------------------------------------------------------------- |
| Layout      | flex, space-between; copy left, chevron right                    |
| Min height  | 44px (2.75rem in calc-test override)                             |
| Radius      | 12px (0.75rem) in calculator context                             |
| Border      | 1px `--border-subtle` + `--shadow-elevated`                      |
| Name        | 16px / 500 primary                                               |
| Meta (type) | 14px secondary, sentence case                                    |
| Chevron     | `⌄`, rotates 180° when `.ew-trigger-icon.is-open`                |
| Placeholder | `.ew-trigger--placeholder` → name 14–16px secondary, no meta row |

**States:** hover accent border 35% mix; active opacity 0.88 + scale 0.99; focus-visible 2px accent outline offset 2px.

---

## 3. Panel (`.ew-menu-panel` → `.ew-menu`)

| Element        | Spec                                                                               |
| -------------- | ---------------------------------------------------------------------------------- |
| Open animation | `grid-template-rows: 0fr → 1fr`; menu opacity + translateY slide                   |
| Container      | radius 16px, layered shadow, max-height `min(520px, 100svh - 160px)`               |
| Title          | `.ew-menu-title` — 12px / 600, **UPPERCASE**, tracking 0.16em, «ВЫБЕРИ УПРАЖНЕНИЕ» |
| List           | `.ew-options` — scroll, overscroll contain, gap 6px                                |
| Option row     | min-height 60px (56px mobile), grid: swatch \| copy \| rm badge \| check           |

### Option row (`.ew-option`)

| Column    | Spec                                                               |
| --------- | ------------------------------------------------------------------ |
| Swatch    | 4px × stretch pill, `--ew-option-color` from item.typeColor        |
| Copy      | strong 16px name + 12px type label                                 |
| 1RM badge | `.ew-option-rm` pill when `savedExercises` match key; tabular-nums |
| Check     | 20px circle accent + ✓ when `aria-selected=true`                   |
| Active    | `.is-active` — accent tint background + border mix                 |

**Stagger:** nth-child delays 24ms+ on open (exercise-select.css only).

**Mobile ≤600px:** check hidden when `.ew-option-check.has-rm` (1RM badge takes space).

---

## 4. Data sources

### Program 2.0 (ExerciseWheel)

| Field      | Source                                                  |
| ---------- | ------------------------------------------------------- |
| Order      | `WHEEL_ORDER` (`packages/shared/src/data/exercises.ts`) |
| Names      | `EXERCISES[key].name`                                   |
| Type label | `TYPE_LABELS[A\|B\|C\|D]`                               |
| Type color | `TYPE_COLORS`                                           |
| Saved 1RM  | `userData.exercises` by `exerciseKey`                   |

### Program 3.0 (CalculatorTabV3)

| Field         | Source                                                                       |
| ------------- | ---------------------------------------------------------------------------- |
| Order         | `EXERCISE_ORDER_V3` — flat unique keys from `TRAINING_DAYS_V3`               |
| Names         | `EXERCISES_V3[key].name`                                                     |
| Type label    | `CATEGORY_LABELS_V3[category]` — barbell / dumbbell / bodyweight / machine   |
| Type color    | `CATEGORY_COLORS_V3`                                                         |
| Saved 1RM     | `userData.exercises` when key overlap (optional; no badge if no saved data)  |
| Initial value | `''` — placeholder until pick; **section 03 hidden** until `selectedKey` set |

---

## 5. Accessibility

| Requirement | Implementation                                                                |
| ----------- | ----------------------------------------------------------------------------- |
| Trigger     | `button`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`         |
| Menu        | `role="listbox"`, options `role="option"` + `aria-selected`                   |
| Label       | `<label htmlFor={triggerId}>` + optional `aria-labelledby` section heading    |
| Close       | Escape → close + focus trigger; pointerdown outside closes                    |
| Focus       | `:focus-visible` rings on trigger and options                                 |
| Motion      | `prefers-reduced-motion: reduce` — no stagger/transform (exercise-select.css) |

---

## 6. Integration checklist

1. Wrap in `.calc-test__exercise` inside `.calc-test` (see calc-test-approach-standard).
2. Pass `items` from domain catalog — **не** hardcode options in JSX.
3. Use `triggerId` matching label `htmlFor`.
4. For conditional sections (V3 chart): gate on `value !== ''`.
5. Do **not** duplicate `.ew-*` styles — extend via calc-test overrides only for trigger shell.

---

## 7. Copy (RU)

| Context     | Text                  |
| ----------- | --------------------- |
| Field label | «Упражнение»          |
| Placeholder | «Выберите упражнение» |
| Menu title  | «Выбери упражнение»   |
| 1RM badge   | `{oneRM} кг`          |

---

## 8. Related standards

- Form shell + metrics: [`calc-test-approach-standard.md`](./calc-test-approach-standard.md)
- Calculator tab layout: [`calculator-tab-standard.md`](./calculator-tab-standard.md)
- Saved list (separate): [`calc-saved-exercises-standard.md`](./calc-saved-exercises-standard.md)
