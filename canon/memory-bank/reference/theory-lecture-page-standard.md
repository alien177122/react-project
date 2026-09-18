# Theory lecture page

> **Canon (2026-08-25, lock 2026-08-26):** A Theory chapter is a **lecture page** when prose is the reading layer, glossary sits under it, and there is **one** interactive.  
> **Lecture gold (LOCKED, user-approved 2026-08-26):** chapter **02 mTOR** body **and** chapter **01** intro/stack as they are now (`.ta-lesson-intro` «Глава 01 / Базовые понятия» + TOC 1–4 + sections 1.1–1.4). Do not restyle either. Do not change `LectureSection` markup/CSS in a way that alters 01 or 02.  
> **Widget gold (separate):** `.ta-frac` — `theory-frac-volume-standard.md`.  
> **System (design + algorithm + lexicon + agent prompt):** `theory-article-algorithm.md`.  
> Applied to remaining numbered chapters: **03–06**, **08–10**. Chapter **07** is vascular cards. Egorov conspects live in `THEORY_READING_ARTICLES` (`diabetes-habits`, `late-dinner`, `anabolic-vessels`), not in the 10-chapter grid.

## How to rewrite a chapter

Copy this sequence. Do not invent new percents, doses, or citations.

1. **Inventory facts** from the current cards / `theory.ts` (and overlapping `THEORY_CONCEPTS` paragraphs if they already teach the same terms). New numbers only if freshly sourced in-repo.
2. **Group into 4–5 named sections.** Separate practice (how the app uses the term) from limits (what belongs in another chapter).
3. **One metaphor per chapter.** Do not reuse the previous chapter’s through-line (mTOR construction site stays in 02; Основы uses the meter of the plan).
4. **Per topic:** 3–6 short paragraphs. Ordinary language first, term second. Under the prose: glossary `definition` / `pattern` / `bullets`.
5. **Density caps:** at most 2–3 callouts and 2–3 cases for the whole chapter. Check-in at the **end of each section** — static question + short answer, no score.
6. **One interactive per chapter.** Pattern chips: `×` / `=` only for a conjunction of inputs; `→` for a cascade; otherwise one chip.
7. **Native derivative** only if that contract already exists (`MTOR_CONCEPTS`, `BASICS_CORE`, …): `flatMap` of `{ title, definition, pattern?, bullets }`. Do not redesign macos/mobile Theory. Do not rewrite other chapters in the same pass.
8. **Checks:** `npm run typecheck`, `npm test`, iPhone viewport **390–430px** on the rewritten chapter.

## Checklist (copy for 03, 04, …)

```text
[ ] Facts inventoried from current theory.ts / cards; no new percents
[ ] 4–5 named sections; practice vs limits split
[ ] One chapter metaphor; previous chapter’s metaphor not imported
[ ] Topics: 3–6 paragraphs; term after ordinary language
[ ] Glossary under prose: definition / pattern / bullets
[ ] ≤2–3 callouts, ≤2–3 cases; section check-in (no score)
[ ] One interactive only (keep existing widget if it already teaches the skill)
[ ] Do not lecture-duplicate what the interactive already teaches
[ ] Compact native derivative if the contract exists; macos THEORY_CONCEPTS untouched
[ ] Other chapters / mobile Theory not rewritten
[ ] See-also bridges use chapterId + LectureSection (no hardcoded «01 ·»)
[ ] typecheck + tests + 390–430 preview
```

## Reading layers

1. **Lecture** — 3–6 short paragraphs per topic. Ordinary language first, term second.
2. **Glossary** — `definition` / `pattern` / `bullets` under the prose, quieter.
3. **One interactive** — chapter-specific widget (02: day timeline; 01: fractional lenses). Not a second lecture of the same terms.
4. **Check-in** — static question + short answer at the end of each section. No score.

## Metaphor (per chapter)

| Chapter           | Through-line                                                                  | Do not mix in                                                    |
| ----------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 02 mTOR           | Construction site: mTORC1 = foreman; amino acids = materials; energy = budget | Thermostat; «зарплата» for calories; 01 meter language           |
| 01 Основы         | Meter of the plan: 1RM measures, wave is relief, RPE is the cost of the set   | Construction site from 02; clusters / tendons / «три зоны»       |
| 03 Tier List      | Filter, not catalog: S–F = how often it pays off for a natural                | Construction site; meter of the plan; Top-3 doses                |
| 04 Топ-3          | Three slots, not a cabinet: daily / session / deficit                         | Filter-as-catalog; construction; 01 meter                        |
| 05 %ПМ + RPE      | Two scales: % plans the load, RPE checks the cost of the set                  | 01 meter/Epley; 03 filter; 10 RPE-stop                           |
| 06 Сухожилия      | Strain window: muscle grows on volume, tendon remodels in a narrow band       | 01 meter/Epley; 05 two scales; 02 construction; 10 clusters      |
| 08 Механика       | Levers, not effort: position and moment beat «trying harder»                  | 02 construction; 06 strain window; 05 two scales; 10 clusters    |
| 09 Формула силы   | Order of factors: heavy specific practice more often than surplus fatigue     | 02 construction; 01 meter; 05 two scales; 08 levers; 10 methods  |
| 10 Прогрессия 2.0 | Nested floors of time: year → phase → week → session → method                 | 02 construction; 01 meter/Epley; 09 formula chips; 05 table rows |

S6K1 «газ» and 4E-BP1 «ручник» — **local to 2.1**, always next to the protein name.

## Anchors (repeatable)

**02**

- «Прораб не работает без материалов и сметы»
- «Рост — сальдо за сутки, не пик после банки»
- «Три входа, не один рычаг»

**01**

- «Без метра проценты гадают»
- «Откат — не потеря»
- «Цвет сессии ≠ доза на мышцу»

**03**

- «Tier — не каталог, а фильтр»
- «S работает часто, E — только при дефиците»
- «F — деньги на ветер»

**04**

- «Три слота, не витрина»
- «Два из S, один из E — не три S»
- «Доза на карточке, не на слух»

**05**

- «%ПМ планирует, RPE проверяет»
- «RPE 10 не рабочий слот»
- «Короткий отдых поднимает RPE»

**06**

- «Мышца растёт быстрее сухожилия»
- «Окно 4,5–6,5%, не отказ»
- «Многоповторка слабо грузит сухожилие»

**08**

- «Механика важнее мотивации»
- «Цифра на грифе ≠ момент в суставе»
- «Чужая техника — чужие рычаги»

**09**

- «Сначала специфичность, потом тяжесть»
- «Усталость вычитается»
- «Отказ в каждом сете крадёт пик»

**10**

- «Метод — нижний этаж»
- «Форма = тренированность − усталость»
- «Модель меняет вес во времени»

## Numbers

Use only figures already in `theory.ts` (or freshly sourced).

**02:** leucine **2–3 g**, **80–90% 1RM**, **24–48 h**, **4–5** protein feedings, **2–2.2 g/kg** protein, sleep **7–9 h**. Do **not** ship bare percents like «пиво = −25%». AMPK is a limiter under energy stress, not «always harmful». The day timeline total («N of 5») is a **scenario**, not a hypertrophy metric.

**01:** test set **4–8** (ideal **5–8**) reps; Epley coefficients **1.3 / 1.2 / 1.1**; week 1 **68–70%** 1RM → cycle peak **85–90%**; **+2.5 кг** per cycle as progression; volume color **≥28 / 17–27 / ≤16**; RPE work sets **8–9**, not **10**. Do not move PUOS / Direct / Fractional numbers into lecture topics — they live in `FractionalVolumeSection`.

**03:** magnesium need **+20%** at high activity (from the E-tier note). Do **not** put Top-3 doses (`3–5 g`, `~200 mg`, loading) into the chapter 03 lecture — they live in chapter 04. Chip lists stay on `TierPyramid`.

**04:** creatine **3–5 g/day**, accumulation **2–4 weeks**, optional load **20 g/day × 5–7 days**; caffeine **~200 mg** / **3–6 mg/kg** / **150–300 mg**, **30–60 min** pre-session; magnesium **~200–400 mg** elemental, **+20%** at high load. PCr / adenosine stay on `Top3Podium` cards, not in lecture prose.

**05:** table bands **100% / 90–95 / 80–89 / 70–79 / 65–69 / 60–64 / &lt;60**; RPE **10→0, 9→~1, 8→~2, 7→~3, 6→~4, &lt;6**; cycle **4–5 / 6–7 / 8–9**, not **10** on work sets; rest **≥5 min** at **80–90%+**, **2–3 min** at **8–12**. Three-zone summary **80–100 / 67–80 / &lt;65**. Do not lecture Epley or every table row — rows stay on `SpecsTables`.

**06:** strain **&lt;4.5% / 4.5–6.5% / ~9%**; compliant **10–12%** start **~60%** 1RM then **85–90%**; entry **&gt;70%** 1RM; hold **3–6 s** at peak moment; **5×4**, **~3×/week**; TUT not failure. Stretching lowers stiffness — one limit, not a stretching chapter. Do not lecture Epley, two-scale bands, or every protocol card — cards stay on `TendonProtocolSection`.

**08:** **мышцы × техника = результат**; farther from joint axis → larger moment; external moment = bar + gravity, internal = muscle + tendon. No new percents. Do not lecture squat/bench/deadlift rows or the mistakes list — they stay on `RevealTimeline` / `MECHANICAL_CONCEPTS`.

**09:** zone **80–90%** 1RM; **2–3** exposures of key lifts per week; rest **5+ min**; sleep **7–9 h**; wave **накопление → интенсификация → откат → пик**. Rounding `CEILING(вес / 2.5) × 2.5` and the squat 120 kg example stay on `StrengthFormulaSection`. Do not lecture pyramid chips, wave week rows, warmup stack, or science Q&A.

**10:** hierarchy durations **3–12 months / 3–12 weeks / ≈ 1 week / 60–120 min / one or several sets**; fitness–fatigue peak **1–2 weeks** after easier work; block phases **3–4 weeks**; emergent deload if e1RM drops **2 weeks**. Do not lecture PUOS doses, linear week recipes, or all 14 method patterns — they stay on `TierPyramid` + three `RevealTimeline`s.

## Pattern chips

- `×` / `=` — only a conjunction of inputs (`нагрузка × белок × энергия = …`).
- `→` — cascade. Never rewrite a cascade as multiplication.
- Otherwise one chip.

## Data

Shared types: `LectureTopic` / `LectureLessonGroup` / `LectureCheckIn` (aliases `Mtor*` remain). UI: `LectureSection`.

| Chapter | Primary                          | Derivative                                 | Interactive                           |
| ------- | -------------------------------- | ------------------------------------------ | ------------------------------------- |
| 02      | `MTOR_LESSON_GROUPS`             | `MTOR_CONCEPTS`                            | `MtorDayTimeline` (2.4 only)          |
| 01      | `BASICS_LESSON_GROUPS`           | `BASICS_CORE`                              | `FractionalVolumeSection`             |
| 03      | `TIER_LESSON_GROUPS`             | — (macos keeps `SUPPLEMENT_TIERS`)         | `TierPyramid`                         |
| 04      | `TOP3_LESSON_GROUPS`             | — (macos keeps `TOP_THREE_SUPPLEMENTS`)    | `Top3Podium`                          |
| 05      | `SPECS_LESSON_GROUPS`            | —                                          | `SpecsTables`                         |
| 06      | `TENDONS_LESSON_GROUPS`          | — (macos keeps `TENDON_PROTOCOL_CONCEPTS`) | `PullQuote` + `TendonProtocolSection` |
| 07      | `CARDIO_CONCEPTS`                | —                                          | vascular cards only                   |
| 08      | `MECHANICS_LESSON_GROUPS`        | — (macos keeps `MECHANICAL_CONCEPTS`)      | `RevealTimeline`                      |
| 09      | `STRENGTH_LESSON_GROUPS`         | — (`strength-formula.ts` unchanged)        | `StrengthFormulaSection`              |
| 10      | `PROGRESSION_LESSON_GROUPS`      | — (macos keeps hierarchy/models/methods)   | `TierPyramid` + 3× `RevealTimeline`   |
| reading | `DIABETES_HABITS_LESSON_GROUPS`  | `DIABETES_HABITS_CONCEPTS`                 | none; hub block «Интересные статьи»   |
| reading | `LATE_DINNER_LESSON_GROUPS`      | `LATE_DINNER_CONCEPTS`                     | none; source `JMbwy3zP7Ws`            |
| reading | `ANABOLIC_VESSELS_LESSON_GROUPS` | `ANABOLIC_VESSELS_CONCEPTS`                | none; source `2kKssc-FqzY`            |

Do **not** break `THEORY_CONCEPTS` (macos + mobile still consume it).

## UI

- Shell: `.ta-lesson-intro`, plan, `.ta-lesson-section`
- `LectureSection`, `LectureCheckInBlock`; chapter links resolve `num` via `getTheoryChapter` (no hardcoded «01 ·»)
- `MtorDayTimeline` remains a **chapter 02** widget
- Body ≥16px. Панель с `data-chapter`: ширина = body минус padding, без `42em`; заголовки и шапка **слева** (пилюля справа). Визуальный gold: `theory-frac-volume-standard.md` (весь `.ta-frac`). Уникальные виджеты проверяются отдельно на каждую главу.
- Touch ≥44px; 390px must not overflow-x
- No meta headlines about the teaching method

## Sibling (не эталон)

- Twelve equal `RevealTimeline` cards as the only reading surface for a lecture chapter
- Quiz engine / scored check-ins
- Dashboard of callouts on every topic
- Second interactive, or lecturing the same three lenses the interactive already teaches
- Importing another chapter’s metaphor
