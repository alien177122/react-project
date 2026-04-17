import {
  STRENGTH_BICEPS_NOTE,
  STRENGTH_FACTOR_TIERS,
  STRENGTH_FORMULA_OVERVIEW,
  STRENGTH_PROTOCOL_STEPS,
  STRENGTH_SCIENCE_CARDS,
  STRENGTH_WARMUP_STACK,
  STRENGTH_WAVE_PHASES,
} from '@shared/data/strength-formula'

const SCIENCE_CARD_GROUPS = Array.from(
  STRENGTH_SCIENCE_CARDS.reduce((groups, card) => {
    const currentGroup = groups.get(card.group) ?? []
    currentGroup.push(card)
    groups.set(card.group, currentGroup)
    return groups
  }, new Map<string, (typeof STRENGTH_SCIENCE_CARDS)[number][]>()).entries(),
)

function StrengthMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="theory-strength-metric">
      <div className="theory-strength-metric-label">{label}</div>
      <div className="theory-strength-metric-value">{value}</div>
    </div>
  )
}

function StrengthInfoRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="theory-strength-info-row">
      <span className="theory-strength-info-label">{label}</span>
      <span className="theory-strength-info-value">{value}</span>
    </div>
  )
}

function StrengthCaption({ label }: { label: string }) {
  return (
    <div className="theory-strength-caption">
      <div className="theory-strength-caption-line" />
      <div className="theory-strength-caption-label">{label}</div>
      <div className="theory-strength-caption-line" />
    </div>
  )
}

export function StrengthFormulaSection() {
  return (
    <div className="theory-strength">
      <div className="theory-strength-hero">
        <div className="theory-strength-eyebrow">Системный конспект</div>
        <h3 className="theory-strength-title">
          {STRENGTH_FORMULA_OVERVIEW.title}
        </h3>
        <p className="theory-card-body">
          {STRENGTH_FORMULA_OVERVIEW.subtitle}
        </p>

        <div className="theory-strength-chip-row">
          {STRENGTH_FORMULA_OVERVIEW.parameters.map(item => (
            <span key={item} className="theory-strength-chip">
              {item}
            </span>
          ))}
        </div>

        <div className="theory-strength-metrics">
          <StrengthMetric
            label="Округление"
            value={STRENGTH_FORMULA_OVERVIEW.rounding}
          />
          <StrengthMetric
            label="Логика"
            value={STRENGTH_FORMULA_OVERVIEW.logic}
          />
        </div>
      </div>

      <StrengthCaption label="Tier-лист факторов" />

      <div className="theory-strength-factor-list">
        {STRENGTH_FACTOR_TIERS.map(tier => (
          <article key={tier.rank} className="theory-strength-factor-row">
            <div
              className="theory-strength-factor-badge"
              style={{
                backgroundColor: tier.color,
                color: tier.textColor ?? '#ffffff',
              }}
            >
              {tier.rank}
            </div>
            <div className="theory-strength-factor-content">
              <h4
                className="theory-strength-factor-title"
                style={{ color: tier.color }}
              >
                {tier.zone}
              </h4>
              <div className="theory-strength-inline-chips">
                {tier.keyParameters.map(item => (
                  <span key={item} className="theory-strength-inline-chip">
                    {item}
                  </span>
                ))}
              </div>
              <p className="theory-card-body">{tier.trigger}</p>
            </div>
          </article>
        ))}
      </div>

      <StrengthCaption label="8-недельная волновая прогрессия" />

      <div className="theory-strength-phase-grid">
        {STRENGTH_WAVE_PHASES.map(phase => (
          <article
            key={phase.phase}
            className="theory-strength-phase-card"
            style={{ borderTopColor: phase.color }}
          >
            <div className="theory-strength-phase-header">
              <h4
                className="theory-strength-phase-title"
                style={{ color: phase.color }}
              >
                {phase.phase}
              </h4>
              <span
                className="theory-strength-phase-badge"
                style={{ borderColor: phase.color, color: phase.color }}
              >
                Недели {phase.weeks}
              </span>
            </div>

            <div className="theory-strength-phase-goal">{phase.goal}</div>

            <div className="theory-strength-phase-stack">
              <StrengthInfoRow label="Интенсивность" value={phase.intensity} />
              <StrengthInfoRow label="Схема" value={phase.scheme} />
              <StrengthInfoRow label="Объём" value={phase.volume} />
            </div>

            <p className="theory-card-body">{phase.focus}</p>
          </article>
        ))}
      </div>

      <div className="theory-strength-callout">
        <div className="theory-strength-callout-label">
          Бицепс и повышенный объём
        </div>
        <p className="theory-card-body">{STRENGTH_BICEPS_NOTE}</p>
      </div>

      <StrengthCaption label="Разминочный стек" />

      <div className="theory-table-shell">
        <table className="theory-table theory-strength-table">
          <thead>
            <tr>
              <th>Этап</th>
              <th>Вес</th>
              <th>Повт</th>
              <th>Отдых</th>
              <th>Задача</th>
            </tr>
          </thead>
          <tbody>
            {STRENGTH_WARMUP_STACK.map(step => (
              <tr key={step.stage}>
                <td style={{ color: step.color }}>{step.stage}</td>
                <td>{step.weight}</td>
                <td>{step.reps}</td>
                <td>{step.rest}</td>
                <td>{step.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StrengthCaption label="Научные карточки" />

      <div className="theory-strength-group-list">
        {SCIENCE_CARD_GROUPS.map(([group, cards]) => (
          <section key={group} className="theory-strength-group">
            <h4 className="theory-strength-group-title">{group}</h4>
            <div className="theory-strength-research-list">
              {cards.map(card => (
                <article key={card.id} className="theory-strength-research-card">
                  <div className="theory-strength-research-header">
                    <div
                      className="theory-strength-research-tag"
                      style={{
                        borderColor: card.color,
                        backgroundColor: `${card.color}1A`,
                        color: card.color,
                      }}
                    >
                      {card.category} · Diff {card.difficulty}/3
                    </div>
                    <div className="theory-strength-research-id">{card.id}</div>
                  </div>

                  <h5 className="theory-strength-research-question">
                    {card.question}
                  </h5>
                  <p className="theory-card-body">{card.answer}</p>

                  <div className="theory-strength-research-block">
                    <div className="theory-strength-research-label">
                      Применение
                    </div>
                    <p className="theory-strength-research-text">
                      {card.application}
                    </p>
                  </div>

                  <div className="theory-strength-research-footer">
                    <span>{card.source}</span>
                    <span>{card.tags.map(tag => `#${tag}`).join(' ')}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <StrengthCaption label="Протокол запуска и авторегуляция" />

      <div className="theory-strength-protocol-grid">
        {STRENGTH_PROTOCOL_STEPS.map(step => (
          <article
            key={step.step}
            className="theory-strength-protocol-card"
            style={{ borderTopColor: step.color }}
          >
            <div className="theory-strength-protocol-header">
              <div
                className="theory-strength-protocol-step"
                style={{ color: step.color }}
              >
                {step.step}
              </div>
              <h4 className="theory-strength-protocol-title">{step.title}</h4>
            </div>

            {step.description ? (
              <p className="theory-card-body">{step.description}</p>
            ) : null}

            {step.bullets?.map(item => (
              <div key={item} className="theory-bullet-row">
                <span
                  className="theory-bullet-dot"
                  style={{ color: step.color }}
                >
                  •
                </span>
                <span className="theory-bullet-text">{item}</span>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  )
}
