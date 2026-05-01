import type { CSSProperties } from 'react'

import {
  MECHANICAL_CONCEPTS,
  MTOR_CONCEPTS,
  PERIODIZATION_HIERARCHY,
  PERIODIZATION_MODELS,
  PERIODIZATION_SCIENCE,
  SPECIAL_METHODS,
  SUPPLEMENT_TIERS,
  THEORY_CONCEPTS,
} from '../data/theory'
import { BentoGrid, type BentoItem } from './BentoGrid'
import { MechanicsCarousel, type MechanicsSlide } from './MechanicsCarousel'
import { PullQuote } from './PullQuote'
import { RevealTimeline, type TimelineNode } from './RevealTimeline'
import { SpecsTables, type PercentRow, type RpeRow } from './SpecsTables'
import { StrengthFormulaSection } from './StrengthFormulaSection'
import { TendonProtocolSection } from './TendonProtocolSection'
import { TheoryChapterNav } from './TheoryChapterNav'
import { THEORY_CHAPTERS } from '../data/theoryChapters'
import { TheoryHero } from './TheoryHero'
import { TheoryOutro } from './TheoryOutro'
import { TierPyramid } from './TierPyramid'
import { Top3Podium, type PodiumEntry } from './Top3Podium'

// ─── Section 01: Bento layout for basics ───────────────────────────
// First item is the featured centerpiece, next two are large, rest small.
const BASICS_ITEMS: BentoItem[] = THEORY_CONCEPTS.slice(0, 9).map((c, i) => {
  let size: BentoItem['size'] = 'small'
  if (i === 0) size = 'large'
  else if (i === 1 || i === 2) size = 'medium'
  return {
    id: `basic-${i}`,
    title: c.title,
    body: c.body,
    size,
    featured: i === 0,
    badge: i === 0 ? 'Базис' : undefined,
    icon: String(i + 1).padStart(2, '0'),
  }
})

// ─── Section 02: mTOR timeline ─────────────────────────────────────
const MTOR_TIMELINE: TimelineNode[] = MTOR_CONCEPTS.map((c, i) => ({
  id: `mtor-${i}`,
  title: c.title,
  definition: c.definition,
  pattern: c.pattern,
  bullets: c.bullets,
}))

// ─── Section 04: Podium ───────────────────────────────────────────
const TOP_THREE: PodiumEntry[] = [
  {
    num: '01',
    rank: 1,
    color: '#ff9f40',
    name: 'Креатин моногидрат',
    dose: '3–5 г/сут',
    desc: 'Самая надёжная база для силы и прогрессии у натурального атлета. Минимальный набор — начни отсюда.',
  },
  {
    num: '02',
    rank: 2,
    color: '#5ba4ff',
    name: 'Кофеин',
    dose: '~200 мг до тренировки',
    desc: 'Концентрация, выносливость и готовность работать тяжело. Если бьёт по сну — сон важнее.',
  },
  {
    num: '03',
    rank: 3,
    color: '#a78bfa',
    name: 'Магний бисглицинат',
    dose: '~400 мг элементарного',
    desc: 'Имеет смысл при дефиците и высокой нагрузке. Инструмент восстановления, не бустер роста.',
  },
]

// ─── Section 05: Specs tables ─────────────────────────────────────
const PERCENT_TABLE: PercentRow[] = [
  { pct: '100%',    reps: '1–3',   zone: 'Максимум',    color: '#ff6b6b', scale: 1.00 },
  { pct: '90–95%',  reps: '2–5',   zone: 'Сила',        color: '#ff9f40', scale: 0.92 },
  { pct: '80–89%',  reps: '6–8',   zone: 'Сила',        color: '#ff9f40', scale: 0.82 },
  { pct: '70–79%',  reps: '8–12',  zone: 'Гипертрофия', color: '#fbbf24', scale: 0.72 },
  { pct: '65–69%',  reps: '12–15', zone: 'Гипертрофия', color: '#fbbf24', scale: 0.65 },
  { pct: '60–64%',  reps: '15–20', zone: 'Выносливость', color: '#5ba4ff', scale: 0.60 },
  { pct: '<60%',    reps: '>20',   zone: 'Выносливость', color: '#5ba4ff', scale: 0.50 },
]

const RPE_TABLE: RpeRow[] = [
  { rpe: '10',  reserve: '0',  desc: 'Максимальный отказ', color: '#ff4d4d' },
  { rpe: '9',   reserve: '~1', desc: 'Мог сделать ещё 1',  color: '#ff4d4d' },
  { rpe: '8',   reserve: '~2', desc: 'Ещё 2 в запасе',     color: '#ff9f40' },
  { rpe: '7',   reserve: '~3', desc: 'Ещё 3 в запасе',     color: '#ff9f40' },
  { rpe: '6',   reserve: '~4', desc: 'Ещё 4 в запасе',     color: '#3affb8' },
  { rpe: '<6',  reserve: '>4', desc: 'Лёгкая нагрузка',    color: '#3affb8' },
]

// ─── Section 07: Mechanics carousel ──────────────────────────────
const MECHANICS_SLIDES: MechanicsSlide[] = MECHANICAL_CONCEPTS.map((c, i) => ({
  id: `mech-${i}`,
  title: c.title,
  body: c.body,
}))

// ─── Section 09: Прогрессия 2.0 ──────────────────────────────────
// Все четыре подсекции переиспользуют существующие компоненты.
// Цвет иерархии общий для всех ярусов — лестница «считывается» шириной,
// а индиго даёт мягкий контраст к остальным главам.
const PERIODIZATION_TIER_BADGES = ['I', 'II', 'III', 'IV', 'V'] as const

const HIERARCHY_TIERS = PERIODIZATION_HIERARCHY.map((row, i) => ({
  tier: PERIODIZATION_TIER_BADGES[i],
  color: '#6366f1',
  label: row.label,
  items: [row.duration],
  note: row.note,
}))

const SCIENCE_BENTO: BentoItem[] = PERIODIZATION_SCIENCE.map((c, i) => ({
  id: c.id,
  title: c.title,
  body: c.body,
  size: c.featured ? 'large' : i === 1 ? 'medium' : 'small',
  featured: c.featured,
  badge: c.featured ? 'Ядро' : undefined,
  icon: String(i + 1).padStart(2, '0'),
}))

const MODELS_BENTO: BentoItem[] = PERIODIZATION_MODELS.map((c, i) => ({
  id: c.id,
  title: c.title,
  body: c.body,
  size: 'medium',
  icon: String(i + 1).padStart(2, '0'),
}))

const SPECIAL_METHOD_NODES: TimelineNode[] = SPECIAL_METHODS.map((m) => ({
  id: m.id,
  title: m.title,
  definition: m.definition,
  pattern: m.pattern,
  bullets: m.bullets,
}))

// ─── Helpers ─────────────────────────────────────────────────────
function sectionStyle(
  accentVar: string,
  tintVar: string,
): CSSProperties {
  return {
    ['--ta-sec' as string]: `var(${accentVar})`,
    ['--ta-sec-tint' as string]: `var(${tintVar})`,
  }
}

interface SectionProps {
  id: string
  num: string
  title: string
  lede?: string
  accentVar: string
  tintVar: string
  children: React.ReactNode
}

function Section({ id, num, title, lede, accentVar, tintVar, children }: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section
      id={id}
      className="ta-section"
      style={sectionStyle(accentVar, tintVar)}
      aria-labelledby={titleId}
    >
      <div className="ta-section-inner">
        <header className="ta-section-head">
          <span className="ta-section-pill">{num} · Глава</span>
          <h2 id={titleId} className="ta-section-title">{title}</h2>
          {lede && <p className="ta-section-lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

// ─── Main component ──────────────────────────────────────────────
export default function TheoryTab() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="ta-shell">
      <TheoryChapterNav />

      <TheoryHero onCTAClick={(target) => scrollTo(target)} />

      <Section
        id="basics"
        num="01"
        title="Основы тренировки"
        lede="Ключевые понятия, на которых держится прогрессия. Разберись — и вся схема становится прозрачной."
        accentVar="--ta-sec-01"
        tintVar="--ta-sec-01-tint"
      >
        <BentoGrid
          items={BASICS_ITEMS}
          accentVar="--ta-sec-01"
          tintVar="--ta-sec-01-tint"
        />
      </Section>

      <Section
        id="mtor"
        num="02"
        title="mTOR и анаболический отклик"
        accentVar="--ta-sec-02"
        tintVar="--ta-sec-02-tint"
      >
        <RevealTimeline
          items={MTOR_TIMELINE}
          asideEyebrow="Интегратор роста"
          asideQuote="mTOR — это термостат роста, а не выключатель."
          asideNote="Он включается только когда совпадают механический стимул, аминокислоты и энергетический профицит."
        />
      </Section>

      <Section
        id="tiers"
        num="03"
        title="Tier List добавок"
        lede="Смотри как на приоритизацию. Верхние тиры дают реальную отдачу чаще, нижние — ситуативны или зависят от дефицитов."
        accentVar="--ta-sec-03"
        tintVar="--ta-sec-03-tint"
      >
        <TierPyramid tiers={SUPPLEMENT_TIERS} />
      </Section>

      <Section
        id="top3"
        num="04"
        title="Топ-3, если выбирать"
        lede="Если нужен минимальный набор — эти три проверены временем и работают на натуральных атлетах."
        accentVar="--ta-sec-04"
        tintVar="--ta-sec-04-tint"
      >
        <Top3Podium items={TOP_THREE} />
      </Section>

      <Section
        id="tables"
        num="05"
        title="Интенсивность и RPE"
        lede="Интенсивность задаёт результат, RPE — цену. Две шкалы, которые держат тренировку в рамках."
        accentVar="--ta-sec-05"
        tintVar="--ta-sec-05-tint"
      >
        <SpecsTables percentRows={PERCENT_TABLE} rpeRows={RPE_TABLE} />
      </Section>

      <PullQuote
        eyebrow="Сухожилия"
        figure="4.5–6.5%"
        caption="Зона деформации, в которой сухожилия адаптируются. Всё ниже — просто нагрузка, всё выше — риск."
        color="var(--ta-sec-06)"
        tint="rgba(255, 107, 107, 0.08)"
      />

      <Section
        id="tendon"
        num="06"
        title="Протокол укрепления сухожилий"
        lede="5×4 на 85–90% ПМ, 3 раза в неделю, удержание ~3 секунды в пике момента силы."
        accentVar="--ta-sec-06"
        tintVar="--ta-sec-06-tint"
      >
        <div className="ta-custom-frame">
          <TendonProtocolSection />
        </div>
      </Section>

      <Section
        id="mechanics"
        num="07"
        title="Механика важнее мотивации"
        lede="Один и тот же вес может быть лёгким или тяжёлым — зависит от рычагов, антропометрии и позиции в амплитуде."
        accentVar="--ta-sec-07"
        tintVar="--ta-sec-07-tint"
      >
        <MechanicsCarousel items={MECHANICS_SLIDES} />
      </Section>

      <Section
        id="formula"
        num="08"
        title="Формула силы"
        lede="Практичный порядок факторов: что поднимать первым, как вести 8-недельную волну и где останавливать усталость."
        accentVar="--ta-sec-08"
        tintVar="--ta-sec-08-tint"
      >
        <div className="ta-custom-frame">
          <StrengthFormulaSection />
        </div>
      </Section>

      <Section
        id="progression2"
        num="09"
        title="Прогрессия 2.0"
        lede="От макроцикла до приёма внутри подхода — карта управления нагрузкой по «Новой школе периодизации»."
        accentVar="--ta-sec-09"
        tintVar="--ta-sec-09-tint"
      >
        <h3 className="ta-subhead">Иерархия циклов</h3>
        <TierPyramid tiers={HIERARCHY_TIERS} />

        <h3 className="ta-subhead">Научная база</h3>
        <BentoGrid
          items={SCIENCE_BENTO}
          accentVar="--ta-sec-09"
          tintVar="--ta-sec-09-tint"
        />

        <h3 className="ta-subhead">Четыре модели</h3>
        <BentoGrid
          items={MODELS_BENTO}
          accentVar="--ta-sec-09"
          tintVar="--ta-sec-09-tint"
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
          <button
            type="button"
            className="ta-see-also-link"
            onClick={() => scrollTo('basics')}
            aria-label="Перейти к главе 01: 1ПМ, формула Эпли, базовая волновая периодизация"
          >
            01 · Основы (Эпли, 1ПМ)
          </button>
          <button
            type="button"
            className="ta-see-also-link"
            onClick={() => scrollTo('tables')}
            aria-label="Перейти к главе 05: полная RPE-шкала и зоны интенсивности"
          >
            05 · RPE-шкала
          </button>
        </aside>
      </Section>

      <TheoryOutro
        title="Что дальше?"
        links={[
          {
            id: 'calc',
            eyebrow: 'Расчёт',
            title: 'Перейти к калькулятору',
            color: 'var(--ta-sec-01)',
            onClick: () => scrollTo(THEORY_CHAPTERS[0].id),
          },
          {
            id: 'progression2-jump',
            eyebrow: 'Управление нагрузкой',
            title: 'Прогрессия 2.0',
            color: 'var(--ta-sec-09)',
            onClick: () => scrollTo('progression2'),
          },
          {
            id: 'formula-again',
            eyebrow: 'Силовой протокол',
            title: 'Формула силы',
            color: 'var(--ta-sec-08)',
            onClick: () => scrollTo('formula'),
          },
        ]}
      />
    </div>
  )
}
