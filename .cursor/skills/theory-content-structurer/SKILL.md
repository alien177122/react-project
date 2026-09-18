# Theory content structurer (textbook unit)

Use when rewriting Theory copy, `packages/shared/src/data/theory.ts`, or any lesson card.

**Lecture chapters** (playbook: `memory-bank/reference/theory-lecture-page-standard.md`): prose is the reading layer; `definition` / `pattern` / `bullets` are the glossary.

**LOCKED (2026-08-26) — do not restyle or rewrite:**

- Chapter **01** lecture stack: `.ta-chapter-stack` intro «Глава 01 / Базовые понятия / TOC 1–4 / 1.1–1.4» (`BASICS_LESSON_GROUPS`). User approved.
- Chapter **02** mTOR lecture body (`MTOR_LESSON_GROUPS` + intro). User approved.
- `.ta-frac` / `FractionalVolumeSection` — visual gold for volume widgets. Do not redesign.

Gold for **new** lecture work: copy the locked 01 intro/stack + 02 body. Gold for **volume/dose widgets**: copy `.ta-frac`. Applied: **03–06**, **08–10**, reading (`diabetes-habits`, `late-dinner`, `anabolic-vessels`). Chapter **07** stays vascular cards. Do not change `LectureSection` markup/CSS in a way that alters 01 or 02.

The compact unit is **facts and definitions**, not meta pedagogy or a pretty dump.

## Hard ban in product UI

Never ship headlines/ledes that announce method: «сначала просто, потом сложнее», «first easy then harder», «как в учебнике», «словарь по уровням». Structure silently. Titles name terms and topics only.

## Content unit (every topic)

| Layer | RU label (UI)            | Meaning                                        | Maps to data                          |
| ----- | ------------------------ | ---------------------------------------------- | ------------------------------------- |
| 0     | **Лекция** (lecture ch.) | Short paragraphs; term after ordinary language | `lecture`                             |
| 1     | **Основные понятия**     | Short precise terms / definition. No filler.   | `definition`                          |
| 2     | **Суть**                 | Main idea: how it works, why it matters.       | `pattern` (one-liner) + first bullets |
| 3     | **Уточнения**            | Nuances, limits, exceptions, common mistakes.  | remaining `bullets` / practice blocks |

Metaphor does not replace the term. **One metaphor per chapter** — do not copy the previous chapter’s through-line. Numbers only from sourced `theory.ts` figures. No emojis in the product UI.

## Lesson order (authoring only)

1. Intro + TOC of named sections (factual titles)
2. Grouped sections (e.g. 1.1 / 2.1)
3. One interactive checkpoint on a shared example (01: fractional lenses; 02: day-input map)
4. Summary numbers + source
5. See also

Canon: **`memory-bank/reference/theory-article-algorithm.md`** (design + algorithm + lexicon + prompt) + `theory-textbook-pedagogy-standard.md` + `theory-lecture-page-standard.md` + `theory-frac-volume-standard.md`

## Agent prompt (when restructuring files)

```text
Роль: академический редактор Theory.
Не трогай главу 01 (лекция 1.1–1.4), главу 02 и блок .ta-frac — они эталон.

Визуал лекции = глава 02 + intro/stack главы 01 как сейчас:
eyebrow uppercase, заголовок слева, короткий lede, нумерованный TOC,
секции N.1 (step + title + lede), карточка темы, проза, справка, check-in.
Шапка панели: title+lede слева, пилюля «Глава N» справа. Без центрирования.

Визуал виджета объёма = весь section.ta-frac:
золотой term name, rule-cards, hero-цифра только для ключевого числа,
линза label/value, bronze callout, dose, source. Не копировать hero 0.5 в каждую секцию.

Подача текста (лекция, не маркетинг):
1. Диагностика: логика, повторы, неестественные обороты, дыры в фактах.
2. Реконструкция: мостик между блоками; один случай на тему; вывод в check-in, не слоган.
3. Стиль: короткие и средние фразы (не >25 слов), активный залог, без слов-паразитов.
   Термин при первом появлении обычным языком, затем имя. Числа только из theory.ts.
4. Слои: лекция (понятно без жаргона) → glossary definition/pattern/bullets → callout/case.
5. Финал: что узнал / зачем в плане / что дальше (see-also или глава), без CTA «скачайте чеклист».

На каждую тему:
1. Лекция — 3–6 коротких абзацев; термин после обычного языка.
2. Основные понятия — точные определения, без воды.
3. Суть — главная идея; практический смысл.
4. Уточнения — нюансы, ограничения, ошибки.

Метафора одна на главу (01 — метр плана; 02 — стройка; не смешивать).
В UI: без «просто → сложнее»; body ≥16px; один интерактив на главу.
Не дублировать лекцией то, что уже учит виджет (.ta-frac в 01, timeline в 02).
```

## Sibling (не эталон)

- Pedagogy theater in headlines
- Equal bento tiles with long muted paragraphs
- Carousel of tiny slides
- Twelve equal timeline cards as the only lecture reading surface
- Restyling locked 01 lecture / 02 lecture / `.ta-frac`
- Marketing CTA, «боль читателя», скачать чеклист
