# Эталон: секция 02 «Прогрессия» (Program 2.0)

> **Статус:** partial standard (composite) внутри Calculator tab umbrella.  
> **Umbrella:** [`calculator-tab-standard.md`](./calculator-tab-standard.md)  
> **Дата фиксации:** 2026-05-28  
> **Условие рендера:** `activeResult !== null` в `CalculatorTab.tsx`.

---

## 1. Карта блоков

```
SectionBlock num="02" title={`Прогрессия — ${config.name}`} variant="apple"
├── [02a] .insight                    — §4
├── [02b] ResultCard                  — §5
├── [02c] PlateDiagram (conditional)  — §6
├── [02d] PeriodizationChart          — §7 → periodization-chart-standard.md (MAX)
└── [02e] NoteBox variant="apple"     — §8
```

**Scroll anchor:** `div[ref=resultRef]` → `scrollIntoView` на смену `activeResult.exerciseKey`; `scroll-margin-top: 88px` на `.ta-calc-section`.

**Порядок в `.ta-calc-section__body`:** insight → ResultCard → PlateDiagram? → PeriodizationChart → NoteBox (`gap: 20px`).

---

## 2. Файлы

| Блок    | Компонент / класс                       | Исходники                                                                          |
| ------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| Shell   | `SectionBlock variant="apple" num="02"` | `SectionBlock.tsx`, `CalculatorTab.tsx`                                            |
| 02a     | `.insight`                              | `insight.css`, `CalculatorTab.tsx`                                                 |
| 02b     | `.ta-result-card`                       | `ResultCard.tsx`, `theory-apple.css` L3208+                                        |
| 02c     | `.ta-calc-plates`                       | `PlateDiagram.tsx`                                                                 |
| **02d** | **`section.ta-period`**                 | **`PeriodizationChart.tsx`, `usePeriodization.ts`, `theory-apple.css` L3432–3709** |
| 02e     | `.ta-calc-note`                         | `NoteBox`, `note-box.css`                                                          |

---

## 3. Условия рендера

| Блок               | Условие                                    |
| ------------------ | ------------------------------------------ |
| Секция 02 целиком  | `activeResult !== null`                    |
| PlateDiagram       | `!config.isPullup && (type A \|\| type B)` |
| PeriodizationChart | всегда внутри sec 02 (Program 2.0 only)    |

---

## 4. Insight (02a)

**CSS:** `src/styles/components/shared/insight.css` — bg `var(--insight-bg)`, left accent 3px, radius 8px, pad 16px 20px, 12px lh 1.75.

**Copy:** lead `<strong>` + dynamic `<code>` для нед 1→8, % роста веса, коэффициент объёма.

### 4.3 Preset vs chart (документированное расхождение)

- Insight `weekRows` в `CalculatorTab` может учитывать `progressionPreset` через `applyProgressionPresetToPercent/Scheme`.
- **`PeriodizationChart` / `usePeriodization`** — raw `config.percentages` / `weekSchemes` **без preset**.
- Preset сейчас **no-op** в `progressionPresets.ts`; при будущей активации — sync hook или явная immutability в docs.

---

## 5. ResultCard (02b)

Hero «Расчётный 1ПМ» — surface, left accent 2px, value 32px tabular-nums, chips ×4 (test, type, step, date). Count-up 250ms; `aria-live="polite"`.

**→ Детали:** `calculator-tab-standard.md` (legacy §02b table).

---

## 6. PlateDiagram (02c)

Условный SVG раскладки блинов; viewBox 400×120; `--plate-*` tokens; `ta-plate-in` stagger 80ms.

**→ Детали:** `calculator-tab-standard.md` (legacy §02c table).

---

## 7. PeriodizationChart (02d) — dual-axis etalon

**→ MAX detail (phase strip, SVG, listbox, keyboard, reduced motion, CSS):** [`periodization-chart-standard.md`](./periodization-chart-standard.md)

### Краткая роль в composite

| Aspect        | Spec                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| Root          | `section.ta-period`                                                                   |
| Phase strip   | EN uppercase: ACCUMULATION / DELOAD / INTENSIFICATION / PEAK + `--ta-sec-02/03/06/01` |
| SVG left      | **%** — orange line `--ta-sec-01` + area tint                                         |
| SVG right     | **повт** — blue bars `--ta-sec-02`                                                    |
| Deload        | **Week 5** — pct dip + volume restore; sync с NoteBox §8                              |
| Listbox       | `Нед` · `кг` · `sets×reps` · `повт` · **`<em>{phase EN}</em>`**                       |
| Tooltip       | RU `phaseHint()` on line 3; phase name EN on line 1                                   |
| Keyboard      | `ArrowLeft/Right`, `Escape` on listbox                                                |
| Mobile ≤600px | SVG readonly; listbox primary                                                         |

**Policy:** phase в listbox/strip — **English per code**; локализация только по явной задаче.

---

## 8. NoteBox legend (02e)

**Markup:** сразу после `<PeriodizationChart />` в `CalculatorTab.tsx`.

**Copy (канон):**

- «↺ **Нед 5 — волновой откат:** вес снижается, объём восстанавливается.»
- «**Жирный** в «Схема» = отклонение от 4 подходов.»
- **Цвет объёма:** `.vol-legend--high` ≥28 · `.vol-legend--mid` 17–27 · `.vol-legend--low` ≤16

**CSS:** `note-box.css`, `NoteBox variant="apple"` → `.ta-calc-note`.

**Gap:** vol-legend colors не применяются к bars chart (mono `--ta-sec-02`) — см. `periodization-chart-standard.md` §15.

---

## 9. Cross-links

| Документ                                                                 | Связь                       |
| ------------------------------------------------------------------------ | --------------------------- |
| [`calculator-tab-standard.md`](./calculator-tab-standard.md)             | Umbrella                    |
| [`periodization-chart-standard.md`](./periodization-chart-standard.md)   | **MAX** chart etalon        |
| [`calc-test-approach-standard.md`](./calc-test-approach-standard.md)     | Sec 01 → calculate → sec 02 |
| [`calc-saved-exercises-standard.md`](./calc-saved-exercises-standard.md) | Sec 03 → scroll sec 02      |

---

## 10. Чеклист агента

- [ ] Umbrella + **этот файл** + **`periodization-chart-standard.md`** перед правками chart
- [ ] NoteBox W5 copy согласован с chart deload
- [ ] Не дублировать SVG geometry вне `usePeriodization`
- [ ] Превью MCP `cursor-ide-browser` @ `:5173`
