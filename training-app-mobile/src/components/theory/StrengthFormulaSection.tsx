import {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {
  strengthFormulaData,
} from '../../data/strength-formula'
import {theme} from '../../theme'
import {AccordionCard} from './AccordionCard'

const {
  overview,
  factorTiers,
  wavePhases,
  bicepsNote,
  warmupStack,
  scienceCards,
  protocolSteps,
} = strengthFormulaData

const SCIENCE_CARD_GROUPS = Array.from(
  scienceCards
    .reduce((groups, card) => {
      const currentGroup = groups.get(card.group) ?? []
      currentGroup.push(card)
      groups.set(card.group, currentGroup)
      return groups
    }, new Map<string, (typeof scienceCards)[number][]>())
    .entries(),
)

export const StrengthFormulaSection = memo(function StrengthFormulaSection() {
  return (
    <View style={styles.section}>
      <View style={styles.heroCard}>
        <Text maxFontSizeMultiplier={1.2} style={styles.heroEyebrow}>Системный конспект</Text>
        <Text accessibilityRole="header" maxFontSizeMultiplier={1.4} style={styles.heroTitle}>{overview.title}</Text>
        <Text maxFontSizeMultiplier={1.5} style={styles.heroBody}>{overview.subtitle}</Text>

        <View style={styles.heroChipRow}>
          {overview.parameters.map(item => (
            <View key={item} style={styles.heroChip}>
              <Text maxFontSizeMultiplier={1.3} style={styles.heroChipText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metricRow}>
          <MetricCard label="Округление" value={overview.rounding} />
          <MetricCard label="Логика" value={overview.logic} />
        </View>
      </View>

      <SectionDivider label="Tier-лист факторов" />

      {factorTiers.map(tier => {
        const badgeTextColor = tier.textColor ?? '#ffffff'

        return (
          <View key={tier.rank} style={styles.tierCard}>
            <View style={styles.tierHeader}>
              <View style={[styles.tierBadge, {backgroundColor: tier.color}]}>
                <Text maxFontSizeMultiplier={1.2} style={[styles.tierBadgeText, {color: badgeTextColor}]}>
                  {tier.rank}
                </Text>
              </View>
              <Text maxFontSizeMultiplier={1.3} style={[styles.tierZone, {color: tier.color}]}>{tier.zone}</Text>
            </View>

            <View style={styles.chipWrap}>
              {tier.keyParameters.map(item => (
                <View key={item} style={styles.inlineChip}>
                  <Text maxFontSizeMultiplier={1.3} style={styles.inlineChipText}>{item}</Text>
                </View>
              ))}
            </View>

            <Text maxFontSizeMultiplier={1.5} style={styles.supportText}>{tier.trigger}</Text>
          </View>
        )
      })}

      <SectionDivider label="8-недельная волна" />

      {wavePhases.map(phase => (
        <View
          key={phase.phase}
          style={[styles.phaseCard, {borderLeftColor: phase.color}]}>
          <View style={styles.phaseHeader}>
            <Text maxFontSizeMultiplier={1.3} style={[styles.phaseTitle, {color: phase.color}]}>{phase.phase}</Text>
            <View style={[styles.phaseBadge, {borderColor: phase.color}]}>
              <Text maxFontSizeMultiplier={1.2} style={[styles.phaseBadgeText, {color: phase.color}]}>
                Недели {phase.weeks}
              </Text>
            </View>
          </View>

          <Text maxFontSizeMultiplier={1.4} style={styles.phaseGoal}>{phase.goal}</Text>

          <View style={styles.phaseStats}>
            <StatChip label="Интенсивность" value={phase.intensity} />
            <StatChip label="Схема" value={phase.scheme} />
            <StatChip label="Объём" value={phase.volume} />
          </View>

          <Text maxFontSizeMultiplier={1.5} style={styles.supportText}>{phase.focus}</Text>
        </View>
      ))}

      <View style={[styles.calloutCard, {borderLeftColor: theme.colors.orange}]}>
        <Text maxFontSizeMultiplier={1.2} style={styles.calloutLabel}>Бицепс и объём</Text>
        <Text maxFontSizeMultiplier={1.5} style={styles.supportText}>{bicepsNote}</Text>
      </View>

      <SectionDivider label="Разминочный стек" />

      {warmupStack.map(step => (
        <View
          key={step.stage}
          style={[
            styles.warmupCard,
            step.isWorkSet && styles.warmupCardActive,
            {borderLeftColor: step.color},
          ]}>
          <View style={styles.warmupHeader}>
            <Text maxFontSizeMultiplier={1.3} style={[styles.warmupStage, {color: step.color}]}>{step.stage}</Text>
            <View style={[styles.phaseBadge, {borderColor: step.color}]}>
              <Text maxFontSizeMultiplier={1.2} style={[styles.phaseBadgeText, {color: step.color}]}>{step.weight}</Text>
            </View>
          </View>

          <View style={styles.phaseStats}>
            <StatChip label="Повторы" value={step.reps} />
            <StatChip label="Отдых" value={step.rest} />
          </View>

          <Text maxFontSizeMultiplier={1.5} style={styles.supportText}>{step.goal}</Text>
        </View>
      ))}

      <SectionDivider label="Научные карточки" />

      {SCIENCE_CARD_GROUPS.map(([group, cards]) => (
        <View key={group} style={styles.groupBlock}>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.3} style={styles.groupTitle}>{group}</Text>

          {cards.map(card => (
            <AccordionCard
              key={card.id}
              title={card.question}
              body={card.answer}
              pattern={`Применение: ${card.application}`}
              bullets={[
                `Источник: ${card.source}`,
                `Теги: ${card.tags.join(' · ')}`,
              ]}
              tag={`${card.category} • Diff ${card.difficulty}/3`}
              tagColor={card.color}
            />
          ))}
        </View>
      ))}

      <SectionDivider label="Запуск и авторегуляция" />

      {protocolSteps.map(step => (
        <View
          key={step.step}
          style={[styles.protocolCard, {borderLeftColor: step.color}]}>
          <View style={styles.protocolHeader}>
            <Text maxFontSizeMultiplier={1.2} style={[styles.protocolStep, {color: step.color}]}>{step.step}</Text>
            <Text maxFontSizeMultiplier={1.3} style={styles.protocolTitle}>{step.title}</Text>
          </View>

          {step.description ? (
            <Text maxFontSizeMultiplier={1.5} style={styles.supportText}>{step.description}</Text>
          ) : null}

          {step.bullets?.map(item => (
            <BulletRow key={item} text={item} color={step.color} />
          ))}
        </View>
      ))}
    </View>
  )
})

function MetricCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metricCard}>
      <Text maxFontSizeMultiplier={1.2} style={styles.metricLabel}>{label}</Text>
      <Text maxFontSizeMultiplier={1.3} style={styles.metricValue}>{value}</Text>
    </View>
  )
}

function StatChip({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.statChip}>
      <Text maxFontSizeMultiplier={1.2} style={styles.statLabel}>{label}</Text>
      <Text maxFontSizeMultiplier={1.3} style={styles.statValue}>{value}</Text>
    </View>
  )
}

function BulletRow({text, color}: {text: string; color: string}) {
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletDot, {color}]}>•</Text>
      <Text maxFontSizeMultiplier={1.5} style={styles.bulletText}>{text}</Text>
    </View>
  )
}

function SectionDivider({label}: {label: string}) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={styles.dividerLabel}>{label}</Text>
      <View style={styles.dividerLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    rowGap: theme.spacing.sm,
  },
  heroCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 12,
  },
  heroEyebrow: {
    color: theme.colors.orange,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  heroBody: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  heroChipRow: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  heroChip: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroChipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  metricRow: {
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
  },
  metricCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    flex: 1,
    padding: theme.spacing.sm,
    rowGap: 4,
  },
  metricLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  dividerRow: {
    alignItems: 'center',
    columnGap: 10,
    flexDirection: 'row',
    marginVertical: theme.spacing.xs,
  },
  dividerLine: {
    backgroundColor: theme.colors.border,
    flex: 1,
    height: 1,
  },
  dividerLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tierCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 12,
  },
  tierHeader: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
  },
  tierBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tierBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  tierZone: {
    fontSize: 18,
    fontWeight: '800',
  },
  chipWrap: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  inlineChip: {
    backgroundColor: theme.colors.card,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  inlineChipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  supportText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  phaseCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderLeftWidth: 3,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 12,
  },
  phaseHeader: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phaseTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
  },
  phaseBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  phaseBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  phaseGoal: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  phaseStats: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  statChip: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    minWidth: 88,
    paddingHorizontal: 10,
    paddingVertical: 8,
    rowGap: 2,
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  calloutCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderLeftWidth: 3,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 8,
  },
  calloutLabel: {
    color: theme.colors.orange,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  warmupCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderLeftWidth: 3,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 10,
  },
  warmupCardActive: {
    backgroundColor: theme.colors.card,
  },
  warmupHeader: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warmupStage: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
  },
  groupBlock: {
    rowGap: theme.spacing.sm,
  },
  groupTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginTop: theme.spacing.xs,
  },
  protocolCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderLeftWidth: 3,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 10,
  },
  protocolHeader: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
  },
  protocolStep: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  protocolTitle: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  bulletRow: {
    alignItems: 'flex-start',
    columnGap: 8,
    flexDirection: 'row',
  },
  bulletDot: {
    fontSize: 14,
    lineHeight: 22,
  },
  bulletText: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
})
