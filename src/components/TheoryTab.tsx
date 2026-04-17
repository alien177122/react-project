import type { ReactNode } from 'react'

import {
  MECHANICAL_CONCEPTS,
  MTOR_CONCEPTS,
  SUPPLEMENT_TIERS,
  THEORY_CONCEPTS,
} from '../data/theory'
import { HeroSection } from './ui/HeroSection'
import { StrengthFormulaSection } from './StrengthFormulaSection'
import { TendonProtocolSection } from './TendonProtocolSection'

const CARD_COLORS = [
  '#ff6b35',
  '#ff9f40',
  '#5ba4ff',
  '#3affb8',
  '#f2a65a',
  '#bb86fc',
  '#ff4d4d',
  '#4cd97b',
]

const TOP_THREE = [
  {
    num: '01',
    color: '#ff6b35',
    name: 'Креатин моногидрат',
    dose: '3-5 г/сут',
    desc: 'Самая надёжная база для силы и прогрессии у натурального атлета. Если нужен минимальный набор, отсюда логично начинать.',
  },
  {
    num: '02',
    color: '#ff9f40',
    name: 'Кофеин',
    dose: '~200 мг до тренировки',
    desc: 'Поднимает концентрацию, выносливость и готовность работать тяжело. Но если кофеин бьёт по сну, сон важнее.',
  },
  {
    num: '03',
    color: '#9e9e9e',
    name: 'Магний бисглицинат',
    dose: '~400 мг элементарного магния',
    desc: 'Имеет смысл при дефиците и высокой нагрузке. Это инструмент восстановления, а не волшебный бустер мышечного роста.',
  },
] as const

const PERCENT_TABLE = [
  { pct: '100%', reps: '1-3', zone: 'Максимум', color: '#ff6b35' },
  { pct: '90-95%', reps: '2-5', zone: 'Сила', color: '#ff6b35' },
  { pct: '80-89%', reps: '6-8', zone: 'Сила', color: '#ff6b35' },
  { pct: '70-79%', reps: '8-12', zone: 'Гипертрофия', color: '#ff9f40' },
  { pct: '65-69%', reps: '12-15', zone: 'Гипертрофия', color: '#ff9f40' },
  { pct: '60-64%', reps: '15-20', zone: 'Выносливость', color: '#5ba4ff' },
  { pct: '<60%', reps: '>20', zone: 'Выносливость', color: '#5ba4ff' },
] as const

const RPE_TABLE = [
  { rpe: '10', reserve: '0', desc: 'Максимальный отказ', color: '#ff4d4d' },
  { rpe: '9', reserve: '~1', desc: 'Мог сделать ещё 1', color: '#ff4d4d' },
  { rpe: '8', reserve: '~2', desc: 'Ещё 2 в запасе', color: '#ff9f40' },
  { rpe: '7', reserve: '~3', desc: 'Ещё 3 в запасе', color: '#ff9f40' },
  { rpe: '6', reserve: '~4', desc: 'Ещё 4 в запасе', color: '#3affb8' },
  { rpe: '<6', reserve: '>4', desc: 'Лёгкая нагрузка', color: '#3affb8' },
] as const

type SectionBlockProps = {
  num: string
  title: string
  children: ReactNode
}

export function SectionBlock({ num, title, children }: SectionBlockProps) {
  return (
    <section className="theory-section">
      <div className="theory-section-header">
        <div className="theory-section-pill">{num}</div>
        <h2 className="theory-section-title">{title}</h2>
      </div>
      <div className="theory-section-body">{children}</div>
    </section>
  )
}

export function NoteBox({ children }: { children: ReactNode }) {
  return <div className="theory-note-box">{children}</div>
}

export default function TheoryTab() {
  return (
    <div className="theory-shell">
      <HeroSection
        label="Theory"
        title="Теория тренинга"
        subtitle="Основы прогрессии, mTOR, tier-лист добавок и ключевые ориентиры собраны в одном справочном разделе."
      />

      <div className="theory-stack">
        <SectionBlock num="01" title="Основы тренировки">
          <NoteBox>
            Ключевые понятия, которые лежат в основе программы. Разберись с
            ними, и вся схема прогрессии станет прозрачной.
          </NoteBox>
          <div className="theory-card-grid">
            {THEORY_CONCEPTS.map((item, index) => {
              const color = CARD_COLORS[index % CARD_COLORS.length]
              return (
                <article
                  key={item.title}
                  className="theory-card theory-top-card"
                  style={{ borderTopColor: color }}
                >
                  <h3 className="theory-card-title" style={{ color }}>{item.title}</h3>
                  <p className="theory-card-body">{item.body}</p>
                </article>
              )
            })}
          </div>
        </SectionBlock>

        <SectionBlock num="02" title="mTOR и анаболический отклик">
          <div className="theory-card-grid">
            {MTOR_CONCEPTS.map((item, index) => {
              const color = CARD_COLORS[index % CARD_COLORS.length]
              return (
              <article key={item.title} className="theory-card theory-top-card" style={{ borderTopColor: color }}>
                <h3 className="theory-card-title" style={{ color }}>{item.title}</h3>
                <p className="theory-card-body">
                  <strong className="theory-card-strong">Определение:</strong>{' '}
                  {item.definition}
                  {item.pattern ? (
                    <>
                      <br />
                      <br />
                      <strong className="theory-card-strong">
                        Закономерность:
                      </strong>{' '}
                      {item.pattern}
                    </>
                  ) : null}
                </p>
                {item.bullets ? (
                  <div className="theory-bullet-list">
                    {item.bullets.map(bullet => (
                      <div key={bullet} className="theory-bullet-row">
                        <span className="theory-bullet-dot" style={{ color }}>•</span>
                        <span className="theory-bullet-text">{bullet}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
              )
            })}
          </div>
        </SectionBlock>

        <SectionBlock num="03" title="Tier List добавок">
          <NoteBox>
            Смотри на список как на приоритизацию. Верхние уровни дают реальную
            отдачу чаще, нижние либо ситуативны, либо сильно зависят от
            дефицитов.
          </NoteBox>
          <div className="theory-tier-list">
            {SUPPLEMENT_TIERS.map(tier => (
              <article key={tier.tier} className="theory-tier-row">
                <div
                  className="theory-tier-badge"
                  style={{ backgroundColor: tier.color, color: tier.textColor }}
                >
                  {tier.tier}
                </div>
                <div className="theory-tier-content">
                  <h3
                    className="theory-tier-title"
                    style={{ color: tier.color }}
                  >
                    {tier.label}
                  </h3>
                  <div className="theory-chip-list">
                    {tier.items.map(item => (
                      <span key={item} className="theory-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="theory-card-body">{tier.note}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock num="04" title="Топ-3 если выбирать">
          <div className="theory-card-grid theory-card-grid-compact">
            {TOP_THREE.map(item => (
              <article
                key={item.num}
                className="theory-card theory-top-card"
                style={{ borderTopColor: item.color }}
              >
                <div className="theory-top-num" style={{ color: item.color }}>
                  {item.num}
                </div>
                <h3 className="theory-top-name">{item.name}</h3>
                <div className="theory-top-dose">{item.dose}</div>
                <p className="theory-card-body">{item.desc}</p>
              </article>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock num="05" title="Таблица %ПМ и RPE">
          <NoteBox>
            Таблица 1: интенсивность (% от 1ПМ), количество повторений и зоны
            тренировочного воздействия. Таблица 2: RPE как быстрая шкала для
            оценки тяжести подхода.
          </NoteBox>
          <div className="theory-table-grid">
            <div className="theory-table-shell">
              <div className="theory-table-caption">% ПМ и зоны</div>
              <table className="theory-table">
                <thead>
                  <tr>
                    <th>% ПМ</th>
                    <th>Повт</th>
                    <th>Зона</th>
                  </tr>
                </thead>
                <tbody>
                  {PERCENT_TABLE.map(row => (
                    <tr key={row.pct}>
                      <td style={{ color: row.color }}>{row.pct}</td>
                      <td>{row.reps}</td>
                      <td style={{ color: row.color }}>{row.zone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="theory-table-shell">
              <div className="theory-table-caption">Шкала RPE</div>
              <table className="theory-table">
                <thead>
                  <tr>
                    <th>RPE</th>
                    <th>В запасе</th>
                    <th>Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {RPE_TABLE.map(row => (
                    <tr key={row.rpe}>
                      <td style={{ color: row.color }}>{row.rpe}</td>
                      <td>{row.reserve}</td>
                      <td style={{ color: row.color }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock num="06" title="Протокол укрепления сухожилий">
          <NoteBox>
            Сухожилия адаптируются только при деформации 4,5-6,5%, что
            соответствует нагрузкам &gt;70% ПМ. Протокол: 5x4 на 85-90% ПМ, 3
            раза в неделю, удержание около 3 секунд в пике момента силы.
          </NoteBox>
          <TendonProtocolSection />
        </SectionBlock>

        <SectionBlock num="07" title="Механическое преимущество">
          <NoteBox>
            Механика важнее мотивации. Один и тот же вес может быть лёгким или
            тяжёлым в зависимости от рычагов, антропометрии и конкретной
            позиции в амплитуде.
          </NoteBox>
          <div className="theory-card-grid">
            {MECHANICAL_CONCEPTS.map((item, index) => {
              const color = CARD_COLORS[index % CARD_COLORS.length]
              return (
                <article key={item.title} className="theory-card theory-top-card" style={{ borderTopColor: color }}>
                  <h3 className="theory-card-title" style={{ color }}>{item.title}</h3>
                  <p className="theory-card-body">{item.body}</p>
                </article>
              )
            })}
          </div>
        </SectionBlock>

        <SectionBlock num="08" title="Формула силы">
          <StrengthFormulaSection />
        </SectionBlock>
      </div>
    </div>
  )
}
