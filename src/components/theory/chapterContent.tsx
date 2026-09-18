import type {CSSProperties, ReactNode} from 'react';
import {
  BASICS_LESSON_GROUPS,
  DIABETES_HABITS_LESSON_GROUPS,
  DIABETES_HABITS_SOURCE,
  LATE_DINNER_LESSON_GROUPS,
  LATE_DINNER_SOURCE,
  ANABOLIC_VESSELS_LESSON_GROUPS,
  ANABOLIC_VESSELS_SOURCE,
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
  TENDONS_LESSON_GROUPS,
  TIER_LESSON_GROUPS,
  TOP3_LESSON_GROUPS,
  TOP_THREE_SUPPLEMENTS,
} from '../../data/theory';
import {CardioSection} from '../CardioSection';
import {FractionalVolumeSection} from '../FractionalVolumeSection';
import {PullQuote} from '../PullQuote';
import {RevealTimeline, type TimelineNode} from '../RevealTimeline';
import {SpecsTables, type PercentRow, type RpeRow} from '../SpecsTables';
import {StrengthFormulaSection} from '../StrengthFormulaSection';
import {TendonProtocolSection} from '../TendonProtocolSection';
import {TierPyramid} from '../TierPyramid';
import {Top3Podium} from '../Top3Podium';
import type {ChapterId} from '../../data/theoryChapters';
import {ChapterLink} from './ChapterLink';
import {LectureCheckInBlock, LectureSection} from './LectureSection';
import {MtorDayTimeline} from './MtorDayTimeline';
import {ReadingLecturePage} from './ReadingLecturePage';

type SelectChapter = (chapterId: ChapterId) => void;

function toTimelineNodes(
  items: readonly {
    id: string;
    title: string;
    definition: string;
    pattern?: string;
    bullets: readonly string[];
  }[],
): TimelineNode[] {
  return items.map(c => ({
    id: c.id,
    title: c.title,
    definition: c.definition,
    pattern: c.pattern,
    bullets: [...c.bullets],
  }));
}

const PERCENT_TABLE: PercentRow[] = [
  {pct: '100%', reps: '1–3', zone: 'Максимум', color: '#ff6b6b', scale: 1.0},
  {pct: '90–95%', reps: '2–5', zone: 'Сила', color: '#ffc94d', scale: 0.92},
  {pct: '80–89%', reps: '6–8', zone: 'Сила', color: '#ffc94d', scale: 0.82},
  {pct: '70–79%', reps: '8–12', zone: 'Гипертрофия', color: '#fbbf24', scale: 0.72},
  {pct: '65–69%', reps: '12–15', zone: 'Гипертрофия', color: '#fbbf24', scale: 0.65},
  {pct: '60–64%', reps: '15–20', zone: 'Выносливость', color: '#5ba4ff', scale: 0.6},
  {pct: '<60%', reps: '>20', zone: 'Выносливость', color: '#5ba4ff', scale: 0.5},
];

const RPE_TABLE: RpeRow[] = [
  {rpe: '10', reserve: '0', desc: 'Максимальный отказ', color: '#ff4d4d'},
  {rpe: '9', reserve: '~1', desc: 'Мог сделать ещё 1', color: '#ff4d4d'},
  {rpe: '8', reserve: '~2', desc: 'Ещё 2 в запасе', color: '#ffc94d'},
  {rpe: '7', reserve: '~3', desc: 'Ещё 3 в запасе', color: '#ffc94d'},
  {rpe: '6', reserve: '~4', desc: 'Ещё 4 в запасе', color: '#3affb8'},
  {rpe: '<6', reserve: '>4', desc: 'Лёгкая нагрузка', color: '#3affb8'},
];

const MECHANICS_NODES: TimelineNode[] = MECHANICAL_CONCEPTS.map(c => ({
  id: c.id,
  title: c.title,
  definition: c.definition,
  pattern: 'pattern' in c ? c.pattern : undefined,
  bullets: [...c.bullets],
}));

const PERIODIZATION_TIER_BADGES = ['I', 'II', 'III', 'IV', 'V'] as const;

const HIERARCHY_TIERS = PERIODIZATION_HIERARCHY.map((row, i) => ({
  tier: PERIODIZATION_TIER_BADGES[i],
  color: '#6366f1',
  label: row.label,
  items: [row.duration],
  note: row.note,
}));

const SCIENCE_NODES: TimelineNode[] = toTimelineNodes(PERIODIZATION_SCIENCE);
const MODELS_NODES: TimelineNode[] = toTimelineNodes(PERIODIZATION_MODELS);

const SPECIAL_METHOD_NODES: TimelineNode[] = SPECIAL_METHODS.map(m => ({
  id: m.id,
  title: m.title,
  definition: m.definition,
  pattern: m.pattern,
  bullets: m.bullets,
}));

export function renderChapterContent(
  chapterId: ChapterId,
  onSelectChapter: SelectChapter,
): ReactNode {
  switch (chapterId) {
    case 'basics':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-01)',
              ['--ta-sec-tint']: 'var(--ta-sec-01-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 01</p>
            <h3 className="ta-lesson-intro__title">Базовые понятия</h3>
            <p className="ta-lesson-intro__lede">
              1ПМ измеряет план, волна даёт рельеф, RPE — цену подхода. Direct / Fractional и PUOS —
              в линзах ниже, не второй лекцией.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Метрика нагрузки</strong> — 1ПМ, Эпли, тестовый и рабочий вес
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Прогрессия</strong> — перегрузка и волна
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Неделя в приложении</strong> — сплит, подтягивания, цвет сессии
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Усилие</strong> — RPE как цена подхода
                </span>
              </li>
            </ol>
          </header>

          {BASICS_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`basics-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`basics-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <FractionalVolumeSection />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="mtor"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 02: механический вход и mTORC1">
              02 · mTOR и рост
            </ChapterLink>
            <ChapterLink
              chapterId="specs"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 05: полная шкала RPE">
              05 · Спецификации
            </ChapterLink>
            <ChapterLink
              chapterId="progression"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 10: доза за сессию в научной базе">
              10 · Прогрессия 2.0 (PUOS)
            </ChapterLink>
          </aside>
        </div>
      );
    case 'mtor':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-02)',
              ['--ta-sec-tint']: 'var(--ta-sec-02-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 02</p>
            <h3 className="ta-lesson-intro__title">mTOR и анаболический отклик</h3>
            <p className="ta-lesson-intro__lede">
              Клетка как стройка, mTORC1 как прораб: он не выключатель роста, а сбор заявок с
              нагрузки, белка и энергии.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Что решает клетка</strong> — каскад, S6K1, 4E-BP1
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Три входа</strong> — механика, лейцин, энергия
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Рост как баланс</strong> — MPS − MPB за сутки
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Практический протокол</strong> — три сигнала и карта дня
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">5</span>
                <span>
                  <strong>Границы и контекст</strong> — фарма как оговорка, глава 01
                </span>
              </li>
            </ol>
          </header>

          {MTOR_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`mtor-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`mtor-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.id === 'protocol' ? <MtorDayTimeline /> : null}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="basics"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 01: базовые понятия">
              01 · Базовые понятия
            </ChapterLink>
          </aside>
        </div>
      );
    case 'tiers':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-03)',
              ['--ta-sec-tint']: 'var(--ta-sec-03-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 03</p>
            <h3 className="ta-lesson-intro__title">Tier List добавок</h3>
            <p className="ta-lesson-intro__lede">
              Пирамида — фильтр, не каталог. Буква S–F говорит, как часто добавка даёт отдачу
              натуральному. Полки и чипы — ниже, не второй лекцией.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Зачем рейтинг</strong> — фильтр, не корзина
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Верх</strong> — S часто, A под сессию
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Середина</strong> — B уже, C ниша
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Низ</strong> — не спорт, дефицит, маркетинг
                </span>
              </li>
            </ol>
          </header>

          {TIER_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`tiers-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`tiers-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <TierPyramid tiers={SUPPLEMENT_TIERS} />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="top3"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 04: три выбора, если брать минимум">
              04 · Топ-3 добавки
            </ChapterLink>
          </aside>
        </div>
      );
    case 'top3':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-04)',
              ['--ta-sec-tint']: 'var(--ta-sec-04-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 04</p>
            <h3 className="ta-lesson-intro__title">Топ-3 добавки</h3>
            <p className="ta-lesson-intro__lede">
              Три слота, не аптечка: ежедневно, к сессии, при дефиците. Два из S, один из E. Дозы —
              на карточках ниже, не второй лекцией механизма.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Зачем тройка</strong> — короткая полка после фильтра
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Слот ежедневно</strong> — креатин каждый день
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Слот к сессии</strong> — кофеин и сон
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Слот при дефиците</strong> — магний с полки E
                </span>
              </li>
            </ol>
          </header>

          {TOP3_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`top3-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`top3-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <Top3Podium items={TOP_THREE_SUPPLEMENTS} />
          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="tiers"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 03: tier-лист добавок">
              03 · Tier-лист добавок
            </ChapterLink>
          </aside>
        </div>
      );
    case 'specs':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-05)',
              ['--ta-sec-tint']: 'var(--ta-sec-05-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 05</p>
            <h3 className="ta-lesson-intro__title">Интенсивность и RPE</h3>
            <p className="ta-lesson-intro__lede">
              Две шкалы: % от 1ПМ планирует вес, RPE проверяет цену подхода. Полосы и ступени — в
              таблицах ниже, не второй лекцией каждой строки.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Две шкалы</strong> — план и проверка
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>% от 1ПМ</strong> — три зоны
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Шкала RPE</strong> — запас, не отказ
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Когда шкалы спорят</strong> — короткий отдых
                </span>
              </li>
            </ol>
          </header>

          {SPECS_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`specs-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`specs-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <SpecsTables percentRows={PERCENT_TABLE} rpeRows={RPE_TABLE} />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="basics"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 01: метр 1ПМ">
              01 · Основы
            </ChapterLink>
          </aside>
        </div>
      );
    case 'tendons':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-06)',
              ['--ta-sec-tint']: 'var(--ta-sec-06-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 06</p>
            <h3 className="ta-lesson-intro__title">Сухожилия</h3>
            <p className="ta-lesson-intro__lede">
              Окно деформации: мышца растёт на объёме, сухожилие — в узкой полосе растяжения. Фигура
              и карточки протокола ниже — доза, не вторая лекция каждой карты.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Две ткани</strong> — мышца обгоняет сухожилие
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Окно деформации</strong> — три зоны
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Статика, не отказ</strong> — удержание в пике
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Не копировать объём</strong> — ткань медленнее
                </span>
              </li>
            </ol>
          </header>

          {TENDONS_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`tendons-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`tendons-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <PullQuote
            eyebrow="Деформация"
            figure="4.5–6.5%"
            caption="Рабочая зона для адаптации сухожилия при статической нагрузке. Ниже — слабый стимул, выше — рост риска травмы."
            color="var(--ta-sec-06)"
            tint="var(--ta-sec-06-tint)"
          />
          <TendonProtocolSection />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="specs"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 05: % от 1ПМ и RPE">
              05 · %ПМ + RPE
            </ChapterLink>
          </aside>
        </div>
      );
    case 'cardio':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-07)',
              ['--ta-sec-tint']: 'var(--ta-sec-07-tint)',
            } as CSSProperties
          }>
          <CardioSection />
          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="diabetes-habits"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть статью: пять привычек к диабету">
              Статья · Пять привычек к диабету
            </ChapterLink>
            <ChapterLink
              chapterId="late-dinner"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть статью: почему вредно есть на ночь">
              Статья · Еда на ночь
            </ChapterLink>
            <ChapterLink
              chapterId="anabolic-vessels"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть статью: что анаболики делают с сосудами">
              Статья · Анаболики и сосуды
            </ChapterLink>
          </aside>
        </div>
      );
    case 'diabetes-habits':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-07)',
              ['--ta-sec-tint']: 'var(--ta-sec-07-tint)',
            } as CSSProperties
          }>
          <ReadingLecturePage
            title="Пять привычек, которые ведут к диабету"
            lede="Мышца забирает глюкозу только если её нагружают. Дальше — привычки, которые держат инсулин высоким весь день."
            plan={[
              {title: 'Два пациента', detail: 'HbA1c 6,7% против 5,3%'},
              {title: 'Пять привычек', detail: 'GLUT4, перекусы, сон, алкоголь, набор веса'},
              {title: 'Сборка дня', detail: 'ноги, дневной рацион, пауза вечером'},
            ]}
            source={DIABETES_HABITS_SOURCE}
            groups={DIABETES_HABITS_LESSON_GROUPS}
            articleId="diabetes-habits"
            onSelectChapter={onSelectChapter}
          />
        </div>
      );
    case 'late-dinner':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-05)',
              ['--ta-sec-tint']: 'var(--ta-sec-05-tint)',
            } as CSSProperties
          }>
          <ReadingLecturePage
            title="Почему вредно есть на ночь"
            lede="К ночи мелатонин уже снижает чувствительность к инсулину. Окно еды считается от твоего отбоя, не от чужого графика."
            plan={[
              {title: 'Мелатонин и глюкоза', detail: 'окно 2–3 часа до сна'},
              {title: 'Хронотипы', detail: 'жаворонки 16:00–17:00, совы 19:00–20:00'},
              {title: 'Ночной пульс', detail: 'ЧСС, HRV и диурез'},
              {title: 'Калории днём', detail: 'те же ккал, другой час'},
              {title: 'Поздний ужин', detail: '3–4 часа; 300–400 ккал'},
            ]}
            source={LATE_DINNER_SOURCE}
            groups={LATE_DINNER_LESSON_GROUPS}
            articleId="late-dinner"
            onSelectChapter={onSelectChapter}
          />
        </div>
      );
    case 'anabolic-vessels':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-09)',
              ['--ta-sec-tint']: 'var(--ta-sec-09-tint)',
            } as CSSProperties
          }>
          <ReadingLecturePage
            title="Что анаболики делают с сосудами"
            lede="Курс из нескольких андрогенов бьёт по эндотелию ещё до «плохого холестерина». Рост мышцы не остаётся только в бицепсе."
            plan={[
              {title: 'Курс, не ЗГТ', detail: '2–3 препарата, U-образная кривая'},
              {title: 'Ранние коронары', detail: '28 лет; стеноз >75%'},
              {title: 'Турбина ROS', detail: 'супероксид вместо NO'},
              {title: 'Эстрадиол', detail: 'защита эндотелия, не враг'},
              {title: 'Стенка и кровь', detail: 'липкий эндотелий, медия, сдвиг'},
            ]}
            source={ANABOLIC_VESSELS_SOURCE}
            groups={ANABOLIC_VESSELS_LESSON_GROUPS}
            articleId="anabolic-vessels"
            onSelectChapter={onSelectChapter}
          />
        </div>
      );
    case 'mechanics':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-08)',
              ['--ta-sec-tint']: 'var(--ta-sec-08-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 08</p>
            <h3 className="ta-lesson-intro__title">Механика нагрузки</h3>
            <p className="ta-lesson-intro__lede">
              Рычаги, не мотивация: один и тот же вес лёгкий или тяжёлый из‑за позиции и момента.
              Карты ниже — формула и подъёмы, не вторая лекция каждой строки.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Рычаги, не старание</strong> — мышцы × техника
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Момент, не цифра</strong> — тяжесть в позиции
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Внешний и внутренний</strong> — задача и ответ
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Свои рычаги</strong> — пропорции, не копия
                </span>
              </li>
            </ol>
          </header>

          {MECHANICS_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`mechanics-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`mechanics-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <RevealTimeline
            items={MECHANICS_NODES}
            asideEyebrow="Механика"
            asideQuote="Механика важнее мотивации."
            asideNote="Один и тот же вес лёгкий или тяжёлый — из‑за рычагов, позиции и твоей антропометрии."
          />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="strength"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 09: формула силы">
              09 · Формула силы
            </ChapterLink>
          </aside>
        </div>
      );
    case 'strength':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-09)',
              ['--ta-sec-tint']: 'var(--ta-sec-09-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 09</p>
            <h3 className="ta-lesson-intro__title">Формула силы</h3>
            <p className="ta-lesson-intro__lede">
              Порядок факторов: сила растёт, когда тяжёлая специфичная практика повторяется чаще,
              чем копится лишняя усталость. Виджет ниже — формула и полки, не вторая лекция чипов.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Система, не куча</strong> — четыре плюса и минус
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Сначала специфичность</strong> — 1–2 движения, 80–90%
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Волна, не прямая</strong> — откат входит в цикл
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Усталость вычитается</strong> — отказ крадёт пик
                </span>
              </li>
            </ol>
          </header>

          {STRENGTH_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`strength-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`strength-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <StrengthFormulaSection />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="mechanics"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 08: механика нагрузки">
              08 · Механика нагрузки
            </ChapterLink>
          </aside>
        </div>
      );
    case 'progression':
      return (
        <div
          className="ta-chapter-stack"
          style={
            {
              ['--ta-sec']: 'var(--ta-sec-10)',
              ['--ta-sec-tint']: 'var(--ta-sec-10-tint)',
            } as CSSProperties
          }>
          <header className="ta-lesson-intro">
            <p className="ta-lesson-intro__eyebrow">Глава 10</p>
            <h3 className="ta-lesson-intro__title">Прогрессия 2.0</h3>
            <p className="ta-lesson-intro__lede">
              Этажи, не куча: год, фаза, неделя, сессия, метод. Пирамида и карточки ниже — каталог,
              не вторая лекция каждой схемы.
            </p>
            <ol className="ta-lesson-plan" aria-label="Содержание">
              <li>
                <span className="ta-lesson-plan__step">1</span>
                <span>
                  <strong>Этажи, не куча</strong> — пять отрезков времени
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">2</span>
                <span>
                  <strong>Форма минус усталость</strong> — пик после разгрузки
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">3</span>
                <span>
                  <strong>Модель, не календарь</strong> — вес меняют во времени
                </span>
              </li>
              <li>
                <span className="ta-lesson-plan__step">4</span>
                <span>
                  <strong>Метод — нижний этаж</strong> — приём не заменяет фазу
                </span>
              </li>
            </ol>
          </header>

          {PROGRESSION_LESSON_GROUPS.map(group => (
            <section
              key={group.id}
              className="ta-lesson-section"
              aria-labelledby={`progression-${group.id}-title`}>
              <header className="ta-lesson-section__head">
                <p className="ta-lesson-section__step">{group.step}</p>
                <h3 id={`progression-${group.id}-title`} className="ta-lesson-section__title">
                  {group.title}
                </h3>
                <p className="ta-lesson-section__lede">{group.lede}</p>
              </header>
              {group.topics.map(topic => (
                <LectureSection key={topic.id} topic={topic} onSelectChapter={onSelectChapter} />
              ))}
              {group.checkIn ? <LectureCheckInBlock checkIn={group.checkIn} /> : null}
            </section>
          ))}

          <h3 className="ta-subhead">Иерархия циклов</h3>
          <TierPyramid tiers={HIERARCHY_TIERS} />

          <h3 className="ta-subhead">Научная база</h3>
          <RevealTimeline
            items={SCIENCE_NODES}
            asideEyebrow="5 моделей"
            asideQuote="Форма — это тренированность минус усталость."
            asideNote="От Fitness–Fatigue до дозы за сессию. Каждая модель объясняет, почему нагрузку меняют, а не просто увеличивают."
          />

          <h3 className="ta-subhead">Четыре модели</h3>
          <RevealTimeline
            items={MODELS_NODES}
            asideEyebrow="4 схемы"
            asideQuote="Модель — это способ менять вес и объём во времени."
            asideNote="От линейной до эмерджентной. Каждая схема — конкретный порядок недель, процентов и RPE."
          />

          <h3 className="ta-subhead">Специальные методы</h3>
          <RevealTimeline
            items={SPECIAL_METHOD_NODES}
            asideEyebrow="14 приёмов"
            asideQuote="Метод — это нижний этаж периодизации."
            asideNote="От разгрузки до пика. Каждый метод — конкретная схема веса × повторов × RPE для одной сессии."
          />

          <aside className="ta-see-also" aria-label="Связанные разделы">
            <span className="ta-see-also-label">См. также:</span>
            <ChapterLink
              chapterId="strength"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 09: формула силы">
              09 · Формула силы
            </ChapterLink>
            <ChapterLink
              chapterId="specs"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 05: полная RPE-шкала и зоны интенсивности">
              05 · RPE-шкала
            </ChapterLink>
          </aside>
        </div>
      );
    default:
      return null;
  }
}
