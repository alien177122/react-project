import type { ReactNode } from 'react'
import {
  MECHANICAL_CONCEPTS,
  MTOR_CONCEPTS,
  PERIODIZATION_HIERARCHY,
  PERIODIZATION_MODELS,
  PERIODIZATION_SCIENCE,
  SPECIAL_METHODS,
  SUPPLEMENT_TIERS,
  THEORY_CONCEPTS,
} from '../../data/theory'
import { BentoGrid, type BentoItem } from '../BentoGrid'
import { CardioSection } from '../CardioSection'
import { MechanicsCarousel, type MechanicsSlide } from '../MechanicsCarousel'
import { PullQuote } from '../PullQuote'
import { RevealTimeline, type TimelineNode } from '../RevealTimeline'
import { SpecsTables, type PercentRow, type RpeRow } from '../SpecsTables'
import { StrengthFormulaSection } from '../StrengthFormulaSection'
import { TendonProtocolSection } from '../TendonProtocolSection'
import { TierPyramid } from '../TierPyramid'
import { Top3Podium, type PodiumEntry } from '../Top3Podium'
import type { ChapterId } from '../../data/theoryChapters'
import { ChapterLink } from './ChapterLink'

type SelectChapter = (chapterId: ChapterId) => void

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

const MTOR_TIMELINE: TimelineNode[] = MTOR_CONCEPTS.map((c, i) => ({
  id: `mtor-${i}`,
  title: c.title,
  definition: c.definition,
  pattern: c.pattern,
  bullets: c.bullets,
}))

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

const PERCENT_TABLE: PercentRow[] = [
  { pct: '100%', reps: '1–3', zone: 'Максимум', color: '#ff6b6b', scale: 1.00 },
  { pct: '90–95%', reps: '2–5', zone: 'Сила', color: '#ff9f40', scale: 0.92 },
  { pct: '80–89%', reps: '6–8', zone: 'Сила', color: '#ff9f40', scale: 0.82 },
  { pct: '70–79%', reps: '8–12', zone: 'Гипертрофия', color: '#fbbf24', scale: 0.72 },
  { pct: '65–69%', reps: '12–15', zone: 'Гипертрофия', color: '#fbbf24', scale: 0.65 },
  { pct: '60–64%', reps: '15–20', zone: 'Выносливость', color: '#5ba4ff', scale: 0.60 },
  { pct: '<60%', reps: '>20', zone: 'Выносливость', color: '#5ba4ff', scale: 0.50 },
]

const RPE_TABLE: RpeRow[] = [
  { rpe: '10', reserve: '0', desc: 'Максимальный отказ', color: '#ff4d4d' },
  { rpe: '9', reserve: '~1', desc: 'Мог сделать ещё 1', color: '#ff4d4d' },
  { rpe: '8', reserve: '~2', desc: 'Ещё 2 в запасе', color: '#ff9f40' },
  { rpe: '7', reserve: '~3', desc: 'Ещё 3 в запасе', color: '#ff9f40' },
  { rpe: '6', reserve: '~4', desc: 'Ещё 4 в запасе', color: '#3affb8' },
  { rpe: '<6', reserve: '>4', desc: 'Лёгкая нагрузка', color: '#3affb8' },
]

const MECHANICS_SLIDES: MechanicsSlide[] = MECHANICAL_CONCEPTS.map((c, i) => ({
  id: `mech-${i}`,
  title: c.title,
  body: c.body,
}))

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

export function renderChapterContent(
  chapterId: ChapterId,
  onSelectChapter: SelectChapter,
): ReactNode {
  switch (chapterId) {
    case 'basics':
      return (
        <BentoGrid
          items={BASICS_ITEMS}
          accentVar="--ta-sec-01"
          tintVar="--ta-sec-01-tint"
        />
      )
    case 'mtor':
      return (
        <RevealTimeline
          items={MTOR_TIMELINE}
          asideEyebrow="Интегратор роста"
          asideQuote="mTOR — это термостат роста, а не выключатель."
          asideNote="Он включается только когда совпадают механический стимул, аминокислоты и энергетический профицит."
        />
      )
    case 'tiers':
      return <TierPyramid tiers={SUPPLEMENT_TIERS} />
    case 'top3':
      return <Top3Podium items={TOP_THREE} />
    case 'specs':
      return <SpecsTables percentRows={PERCENT_TABLE} rpeRows={RPE_TABLE} />
    case 'tendons':
      return (
        <div className="ta-chapter-stack">
          <PullQuote
            eyebrow="Сухожилия"
            figure="4.5–6.5%"
            caption="Зона деформации, в которой сухожилия адаптируются. Всё ниже — просто нагрузка, всё выше — риск."
            color="var(--ta-sec-06)"
            tint="var(--ta-sec-06-tint)"
          />
          <div className="ta-custom-frame">
            <TendonProtocolSection />
          </div>
        </div>
      )
    case 'cardio':
      return <CardioSection />
    case 'mechanics':
      return <MechanicsCarousel items={MECHANICS_SLIDES} />
    case 'strength':
      return (
        <div className="ta-custom-frame ta-custom-frame--flush">
          <StrengthFormulaSection />
        </div>
      )
    case 'progression':
      return (
        <div className="ta-chapter-stack">
          <h3 className="ta-subhead">Иерархия циклов</h3>
          <TierPyramid tiers={HIERARCHY_TIERS} />

          <h3 className="ta-subhead">Научная база</h3>
          <BentoGrid
            items={SCIENCE_BENTO}
            accentVar="--ta-sec-10"
            tintVar="--ta-sec-10-tint"
          />

          <h3 className="ta-subhead">Четыре модели</h3>
          <BentoGrid
            items={MODELS_BENTO}
            accentVar="--ta-sec-10"
            tintVar="--ta-sec-10-tint"
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
              chapterId="basics"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 01: 1ПМ, формула Эпли, базовая волновая периодизация"
            >
              01 · Основы (Эпли, 1ПМ)
            </ChapterLink>
            <ChapterLink
              chapterId="specs"
              onSelectChapter={onSelectChapter}
              ariaLabel="Открыть главу 05: полная RPE-шкала и зоны интенсивности"
            >
              05 · RPE-шкала
            </ChapterLink>
          </aside>
        </div>
      )
    default:
      return null
  }
}
