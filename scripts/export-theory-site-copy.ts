/**
 * Dump Theory tab copy as it appears on the web site (lecture + glossary + cards).
 * Usage: node --experimental-strip-types scripts/export-theory-site-copy.ts
 */
import {writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {STRENGTH_FORMULA_OVERVIEW} from '../packages/shared/src/data/strength-formula.ts';
import {
  ANABOLIC_VESSELS_LESSON_GROUPS,
  ANABOLIC_VESSELS_SOURCE,
  BASICS_LESSON_GROUPS,
  DIABETES_HABITS_LESSON_GROUPS,
  DIABETES_HABITS_SOURCE,
  LATE_DINNER_LESSON_GROUPS,
  LATE_DINNER_SOURCE,
  MECHANICAL_CONCEPTS,
  MECHANICS_LESSON_GROUPS,
  MTOR_LESSON_GROUPS,
  PERIODIZATION_HIERARCHY,
  PERIODIZATION_MODELS,
  PERIODIZATION_SCIENCE,
  PROGRESSION_LESSON_GROUPS,
  SPECIAL_METHODS,
  SPECS_LESSON_GROUPS,
  STRENGTH_LESSON_GROUPS,
  SUPPLEMENT_TIERS,
  TENDON_PROTOCOL_CONCEPTS,
  TENDONS_LESSON_GROUPS,
  TIER_LESSON_GROUPS,
  TOP3_LESSON_GROUPS,
  TOP_THREE_SUPPLEMENTS,
  type LectureLessonGroup,
} from '../packages/shared/src/data/theory.ts';
import {CARDIO_CONCEPTS} from '../src/data/theory-cardio.ts';
import {THEORY_CHAPTERS, THEORY_READING_ARTICLES} from '../src/data/theoryChapters.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const stamp = '2026-08-25';
const htmlPath = join(root, 'audit', `theory-site-copy-${stamp}.html`);
const mdPath = join(root, 'audit', `theory-site-copy-${stamp}.md`);

function esc(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

type Intro = {eyebrow: string; title: string; lede: string};

const INTROS: Record<string, Intro> = {
  basics: {
    eyebrow: 'Глава 01',
    title: 'Базовые понятия',
    lede: '1ПМ измеряет план, волна даёт рельеф, RPE — цена подхода. Direct / Fractional и PUOS — в линзах ниже, не второй лекцией.',
  },
  mtor: {
    eyebrow: 'Глава 02',
    title: 'mTOR и анаболический отклик',
    lede: 'Клетка как стройка, mTORC1 как прораб: он не выключатель роста, а сбор заявок с нагрузки, белка и энергии.',
  },
  tiers: {
    eyebrow: 'Глава 03',
    title: 'Tier List добавок',
    lede: 'Пирамида — фильтр, не каталог. Буква S–F говорит, как часто добавка даёт отдачу натуральному. Полки и чипы — ниже, не второй лекцией.',
  },
  top3: {
    eyebrow: 'Глава 04',
    title: 'Топ-3 добавки',
    lede: 'Три слота, не аптечка: ежедневно, к сессии, при дефиците. Два из S, один из E. Дозы — на карточках ниже, не второй лекцией механизма.',
  },
  specs: {
    eyebrow: 'Глава 05',
    title: 'Интенсивность и RPE',
    lede: 'Две шкалы: % от 1ПМ планирует вес, RPE проверяет цену подхода. Полосы и ступени — в таблицах ниже, не второй лекцией каждой строки.',
  },
  tendons: {
    eyebrow: 'Глава 06',
    title: 'Сухожилия',
    lede: 'Окно деформации: мышца растёт на объёме, сухожилие — в узкой полосе растяжения. Фигура и карточки протокола ниже — доза, не вторая лекция каждой карты.',
  },
  mechanics: {
    eyebrow: 'Глава 08',
    title: 'Механика нагрузки',
    lede: 'Рычаги, не мотивация: один и тот же вес лёгкий или тяжёлый из‑за позиции и момента. Карты ниже — формула и подъёмы, не вторая лекция каждой строки.',
  },
  strength: {
    eyebrow: 'Глава 09',
    title: 'Формула силы',
    lede: 'Порядок факторов: сила растёт, когда тяжёлая специфичная практика повторяется чаще, чем копится лишняя усталость. Виджет ниже — формула и полки, не вторая лекция чипов.',
  },
  progression: {
    eyebrow: 'Глава 10',
    title: 'Прогрессия 2.0',
    lede: 'Этажи, не куча: год, фаза, неделя, сессия, метод. Пирамида и карточки ниже — каталог, не вторая лекция каждой схемы.',
  },
  'diabetes-habits': {
    eyebrow: 'Интересная статья для чтения',
    title: 'Пять привычек, которые ведут к диабету',
    lede: 'Мышца забирает глюкозу только если её нагружают. Дальше — привычки, которые держат инсулин высоким весь день.',
  },
  'late-dinner': {
    eyebrow: 'Интересная статья для чтения',
    title: 'Почему вредно есть на ночь',
    lede: 'К ночи мелатонин уже снижает чувствительность к инсулину. Окно еды считается от твоего отбоя, не от чужого графика.',
  },
  'anabolic-vessels': {
    eyebrow: 'Интересная статья для чтения',
    title: 'Что анаболики делают с сосудами',
    lede: 'Курс из нескольких андрогенов бьёт по эндотелию ещё до «плохого холестерина». Рост мышцы не остаётся только в бицепсе.',
  },
};

function renderGroups(groups: readonly LectureLessonGroup[]): string {
  return groups
    .map(group => {
      const topics = group.topics
        .map(topic => {
          const lecture = topic.lecture.map(p => `<p>${esc(p)}</p>`).join('\n');
          const callout = topic.callout
            ? `<aside class="callout"><p class="callout-value">${esc(topic.callout.value)}</p><p>${esc(topic.callout.caption)}</p></aside>`
            : '';
          const caseStudy = topic.caseStudy
            ? `<aside class="case"><p class="label">Случай</p><h5>${esc(topic.caseStudy.title)}</h5><p>${esc(topic.caseStudy.body)}</p></aside>`
            : '';
          const link = topic.chapterLink
            ? `<p class="bridge"><strong>См. также:</strong> ${esc(topic.chapterLink.principle)} — ${esc(topic.chapterLink.context)}</p>`
            : '';
          const bullets = (topic.bullets ?? []).map(item => `<li>${esc(item)}</li>`).join('');
          return `<article class="topic" data-id="${esc(topic.id)}">
  <h4>${esc(topic.title)}</h4>
  <div class="lecture">${lecture}</div>
  ${callout}
  ${caseStudy}
  ${link}
  <dl class="glossary">
    <dt>Определение</dt><dd>${esc(topic.definition)}</dd>
    ${topic.pattern ? `<dt>Схема</dt><dd>${esc(topic.pattern)}</dd>` : ''}
    ${bullets ? `<dt>Как применять</dt><dd><ul>${bullets}</ul></dd>` : ''}
  </dl>
</article>`;
        })
        .join('\n');
      const check = group.checkIn
        ? `<details class="checkin" open><summary>${esc(group.checkIn.question)}</summary><p>${esc(group.checkIn.answer)}</p></details>`
        : '';
      return `<section class="lesson" data-id="${esc(group.id)}">
  <p class="step">${esc(group.step)}</p>
  <h3>${esc(group.title)}</h3>
  <p class="lede">${esc(group.lede)}</p>
  ${topics}
  ${check}
</section>`;
    })
    .join('\n');
}

function renderIntro(id: string): string {
  const intro = INTROS[id];
  if (!intro) return '';
  return `<header class="intro">
  <p class="eyebrow">${esc(intro.eyebrow)}</p>
  <h2>${esc(intro.title)}</h2>
  <p class="lede">${esc(intro.lede)}</p>
</header>`;
}

function renderCards(
  title: string,
  items: readonly {
    title: string;
    definition?: string;
    pattern?: string;
    bullets?: readonly string[];
    note?: string;
    label?: string;
    duration?: string;
  }[],
): string {
  const cards = items
    .map(item => {
      const heading = item.label ?? item.title;
      const extra = item.duration ? `<p class="meta">${esc(item.duration)}</p>` : '';
      const def = item.definition ? `<p>${esc(item.definition)}</p>` : '';
      const note = item.note ? `<p>${esc(item.note)}</p>` : '';
      const pattern = item.pattern ? `<p class="pattern">${esc(item.pattern)}</p>` : '';
      const bullets = (item.bullets ?? []).map(b => `<li>${esc(b)}</li>`).join('');
      return `<article class="card"><h4>${esc(heading)}</h4>${extra}${def}${note}${pattern}${bullets ? `<ul>${bullets}</ul>` : ''}</article>`;
    })
    .join('\n');
  return `<section class="interactive"><h3>${esc(title)}</h3>${cards}</section>`;
}

function cardioHtml(): string {
  const cards = CARDIO_CONCEPTS.map(concept => {
    const paras = concept.paragraphs
      .map(p => `<p>${p.parts.map(part => esc(part.text)).join('')}</p>`)
      .join('\n');
    return `<article class="card"><h4>${esc(concept.title)}</h4>${paras}</article>`;
  }).join('\n');
  return `<section id="cardio" class="chapter">
  <p class="eyebrow">Глава 07</p>
  <h2>Кардио и сосудистое здоровье</h2>
  <p class="lede">Сосудистые карты. Отдельной лекции 7.1–7.4 нет — так и задумано.</p>
  ${cards}
</section>`;
}

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Теория — полный текст с сайта (${stamp})</title>
  <style>
    :root { color-scheme: light; }
    body { font: 18px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif; max-width: 46rem; margin: 0 auto; padding: 24px 16px 80px; color: #111; }
    h1 { font-size: 28px; font-weight: 600; }
    h2 { font-size: 24px; margin-top: 48px; }
    h3 { font-size: 20px; }
    h4 { font-size: 18px; margin-bottom: 8px; }
    .eyebrow, .step, .label { font-size: 13px; letter-spacing: .04em; text-transform: uppercase; color: #666; }
    .lede { color: #333; }
    .toc a { display: block; padding: 6px 0; color: inherit; }
    .lecture p, .topic p { margin: 0 0 12px; }
    .glossary { background: #f4f4f5; padding: 12px 16px; border-radius: 8px; }
    .callout, .case { border: 1px solid #ddd; padding: 12px 16px; border-radius: 8px; margin: 12px 0; }
    .callout-value { font-weight: 600; font-size: 20px; }
    .checkin { margin: 16px 0; }
    .chapter { border-top: 1px solid #ddd; padding-top: 8px; }
    .note { background: #fff8e8; padding: 12px 16px; border-radius: 8px; }
    nav.toc { margin: 24px 0 40px; }
  </style>
</head>
<body>
  <h1>Теория — полный текст с сайта</h1>
  <p>Снимок ${stamp}. Редактируй заголовки и абзацы здесь, затем верни файл в чат — внесём правки в приложение.</p>
  <p class="note">Слой как на вкладке «Теория»: шапка главы → лекция → определение / схема / как применять → проверка. Ниже лекции — текст карточек интерактива.</p>
  <nav class="toc">
    ${THEORY_CHAPTERS.map(ch => `<a href="#${ch.id}">${esc(ch.num)} · ${esc(ch.panelTitle)}</a>`).join('\n    ')}
    ${THEORY_READING_ARTICLES.map(ch => `<a href="#${ch.id}">Статья · ${esc(ch.cardTitle)}</a>`).join('\n    ')}
  </nav>

  <section id="basics" class="chapter">
    ${renderIntro('basics')}
    ${renderGroups(BASICS_LESSON_GROUPS)}
  </section>
  <section id="mtor" class="chapter">
    ${renderIntro('mtor')}
    ${renderGroups(MTOR_LESSON_GROUPS)}
  </section>
  <section id="tiers" class="chapter">
    ${renderIntro('tiers')}
    ${renderGroups(TIER_LESSON_GROUPS)}
    ${renderCards(
      'Интерактив: пирамида S–F',
      SUPPLEMENT_TIERS.map(tier => ({
        title: `${tier.tier} · ${tier.label}`,
        note: tier.note,
        bullets: tier.items,
      })),
    )}
  </section>
  <section id="top3" class="chapter">
    ${renderIntro('top3')}
    ${renderGroups(TOP3_LESSON_GROUPS)}
    ${renderCards(
      'Интерактив: подиум',
      TOP_THREE_SUPPLEMENTS.map(item => ({
        title: item.name,
        definition: item.definition,
        pattern: item.pattern,
        bullets: item.bullets,
      })),
    )}
  </section>
  <section id="specs" class="chapter">
    ${renderIntro('specs')}
    ${renderGroups(SPECS_LESSON_GROUPS)}
  </section>
  <section id="tendons" class="chapter">
    ${renderIntro('tendons')}
    ${renderGroups(TENDONS_LESSON_GROUPS)}
    ${renderCards('Интерактив: протокол сухожилий', TENDON_PROTOCOL_CONCEPTS)}
  </section>
  ${cardioHtml()}
  <section id="mechanics" class="chapter">
    ${renderIntro('mechanics')}
    ${renderGroups(MECHANICS_LESSON_GROUPS)}
    ${renderCards('Интерактив: карты механики', MECHANICAL_CONCEPTS)}
  </section>
  <section id="strength" class="chapter">
    ${renderIntro('strength')}
    ${renderGroups(STRENGTH_LESSON_GROUPS)}
    <section class="interactive">
      <h3>Интерактив: формула силы</h3>
      <p>${esc(STRENGTH_FORMULA_OVERVIEW.thesis)}</p>
      <p class="pattern">${esc(
        STRENGTH_FORMULA_OVERVIEW.formulaParts
          .map(p => p.label)
          .join(' × ')
          .replace(' × Лишняя усталость', ' − Лишняя усталость'),
      )}</p>
      ${STRENGTH_FORMULA_OVERVIEW.formulaParts
        .map(
          part =>
            `<article class="card"><h4>${esc(part.label)}</h4><p>${esc(part.hint)}</p></article>`,
        )
        .join('\n')}
    </section>
  </section>
  <section id="progression" class="chapter">
    ${renderIntro('progression')}
    ${renderGroups(PROGRESSION_LESSON_GROUPS)}
    ${renderCards(
      'Интерактив: иерархия циклов',
      PERIODIZATION_HIERARCHY.map(row => ({
        title: row.label,
        duration: row.duration,
        note: row.note,
      })),
    )}
    ${renderCards('Интерактив: научная база', PERIODIZATION_SCIENCE)}
    ${renderCards('Интерактив: четыре модели', PERIODIZATION_MODELS)}
    ${renderCards('Интерактив: специальные методы', SPECIAL_METHODS)}
  </section>
  <section id="diabetes-habits" class="chapter">
    ${renderIntro('diabetes-habits')}
    <p class="meta">Источник: ${esc(DIABETES_HABITS_SOURCE.citation)} — ${esc(DIABETES_HABITS_SOURCE.title)}</p>
    ${renderGroups(DIABETES_HABITS_LESSON_GROUPS)}
  </section>
  <section id="late-dinner" class="chapter">
    ${renderIntro('late-dinner')}
    <p class="meta">Источник: ${esc(LATE_DINNER_SOURCE.citation)} — ${esc(LATE_DINNER_SOURCE.title)}</p>
    ${renderGroups(LATE_DINNER_LESSON_GROUPS)}
  </section>
  <section id="anabolic-vessels" class="chapter">
    ${renderIntro('anabolic-vessels')}
    <p class="meta">Источник: ${esc(ANABOLIC_VESSELS_SOURCE.citation)} — ${esc(ANABOLIC_VESSELS_SOURCE.title)}</p>
    ${renderGroups(ANABOLIC_VESSELS_LESSON_GROUPS)}
  </section>
</body>
</html>
`;

function mdGroups(groups: readonly LectureLessonGroup[]): string {
  return groups
    .map(group => {
      const topics = group.topics
        .map(topic => {
          const lecture = topic.lecture.map(p => `${p}\n`).join('\n');
          const callout = topic.callout
            ? `> **${topic.callout.value}**\n> ${topic.callout.caption}\n`
            : '';
          const caseStudy = topic.caseStudy
            ? `**Случай. ${topic.caseStudy.title}**\n\n${topic.caseStudy.body}\n`
            : '';
          const bullets = (topic.bullets ?? []).map(b => `- ${b}`).join('\n');
          return `#### ${topic.title}\n\n${lecture}\n${callout}\n${caseStudy}\n**Определение.** ${topic.definition}\n\n${topic.pattern ? `**Схема.** ${topic.pattern}\n\n` : ''}${bullets ? `**Как применять**\n${bullets}\n` : ''}`;
        })
        .join('\n');
      const check = group.checkIn
        ? `**Проверка.** ${group.checkIn.question}\n\n${group.checkIn.answer}\n`
        : '';
      return `### ${group.step} ${group.title}\n\n${group.lede}\n\n${topics}\n${check}`;
    })
    .join('\n');
}

const md = `# Теория — полный текст с сайта (${stamp})

Снимок вкладки «Теория», как на сайте: шапка, лекция, определение / схема / как применять, проверка, затем карточки интерактива.

Редактируй этот файл (или HTML рядом) и верни в чат — внесём правки в приложение.

${THEORY_CHAPTERS.map(ch => `- ${ch.num} ${ch.panelTitle}`).join('\n')}
${THEORY_READING_ARTICLES.map(ch => `- Статья. ${ch.cardTitle}`).join('\n')}

## 01 Основы

**${INTROS.basics.title}**

${INTROS.basics.lede}

${mdGroups(BASICS_LESSON_GROUPS)}

## 02 mTOR

**${INTROS.mtor.title}**

${INTROS.mtor.lede}

${mdGroups(MTOR_LESSON_GROUPS)}

## 03 Tier List

**${INTROS.tiers.title}**

${INTROS.tiers.lede}

${mdGroups(TIER_LESSON_GROUPS)}

## 04 Топ-3

**${INTROS.top3.title}**

${INTROS.top3.lede}

${mdGroups(TOP3_LESSON_GROUPS)}

## 05 %ПМ + RPE

**${INTROS.specs.title}**

${INTROS.specs.lede}

${mdGroups(SPECS_LESSON_GROUPS)}

## 06 Сухожилия

**${INTROS.tendons.title}**

${INTROS.tendons.lede}

${mdGroups(TENDONS_LESSON_GROUPS)}

## 07 Кардио

Сосудистые карты. Отдельной лекции 7.1–7.4 нет.

${CARDIO_CONCEPTS.map(c => `### ${c.title}\n\n${c.paragraphs.map(p => p.parts.map(part => part.text).join('')).join('\n\n')}`).join('\n\n')}

## 08 Механика

**${INTROS.mechanics.title}**

${INTROS.mechanics.lede}

${mdGroups(MECHANICS_LESSON_GROUPS)}

## 09 Формула силы

**${INTROS.strength.title}**

${INTROS.strength.lede}

${mdGroups(STRENGTH_LESSON_GROUPS)}

## 10 Прогрессия 2.0

**${INTROS.progression.title}**

${INTROS.progression.lede}

${mdGroups(PROGRESSION_LESSON_GROUPS)}

## Статья. Пять привычек к диабету

${INTROS['diabetes-habits'].lede}

Источник: ${DIABETES_HABITS_SOURCE.citation} — ${DIABETES_HABITS_SOURCE.title}

${mdGroups(DIABETES_HABITS_LESSON_GROUPS)}

## Статья. Почему вредно есть на ночь

${INTROS['late-dinner'].lede}

Источник: ${LATE_DINNER_SOURCE.citation} — ${LATE_DINNER_SOURCE.title}

${mdGroups(LATE_DINNER_LESSON_GROUPS)}

## Статья. Что анаболики делают с сосудами

${INTROS['anabolic-vessels'].lede}

Источник: ${ANABOLIC_VESSELS_SOURCE.citation} — ${ANABOLIC_VESSELS_SOURCE.title}

${mdGroups(ANABOLIC_VESSELS_LESSON_GROUPS)}
`;

writeFileSync(htmlPath, html);
writeFileSync(mdPath, md);
console.log(`Wrote ${htmlPath}`);
console.log(`Wrote ${mdPath}`);
