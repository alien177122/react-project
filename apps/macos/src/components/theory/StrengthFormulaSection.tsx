import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  strengthFormulaData,
} from '@training/shared/data/strength-formula';
import {colors, radius, spacing} from '../../theme';

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
      const currentGroup = groups.get(card.group) ?? [];
      currentGroup.push(card);
      groups.set(card.group, currentGroup);
      return groups;
    }, new Map<string, (typeof scienceCards)[number][]>())
    .entries(),
);

export const StrengthFormulaSection = memo(
  function StrengthFormulaSection(): React.JSX.Element {
  return (
    <View style={styles.section}>
      <View style={styles.heroCard}>
        <Text maxFontSizeMultiplier={1.2} style={styles.heroEyebrow}>Системный конспект</Text>
        <Text accessibilityRole="header" maxFontSizeMultiplier={1.4} style={styles.heroTitle}>{overview.title}</Text>
        <Text maxFontSizeMultiplier={1.5} style={styles.noteText}>{overview.subtitle}</Text>

        <View style={styles.heroChipRow}>
          {overview.parameters.map(item => (
            <View key={item} style={styles.heroChip}>
              <Text maxFontSizeMultiplier={1.3} style={styles.heroChipText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            label="Округление"
            value={overview.rounding}
          />
          <MetricCard label="Логика" value={overview.logic} />
        </View>
      </View>

      <SectionCaption label="Tier-лист факторов" />

      <View style={styles.factorList}>
        {factorTiers.map(tier => {
          const badgeTextColor = tier.textColor ?? '#ffffff';

          return (
            <View key={tier.rank} style={styles.factorRow}>
              <View
                style={[
                  styles.factorBadge,
                  {backgroundColor: tier.color},
                ]}>
                <Text
                  maxFontSizeMultiplier={1.2}
                  style={[
                    styles.factorBadgeText,
                    {color: badgeTextColor},
                  ]}>
                  {tier.rank}
                </Text>
              </View>

              <View style={styles.factorContent}>
                <Text maxFontSizeMultiplier={1.3} style={[styles.factorTitle, {color: tier.color}]}>
                  {tier.zone}
                </Text>
                <View style={styles.inlineChips}>
                  {tier.keyParameters.map(item => (
                    <View key={item} style={styles.inlineChip}>
                      <Text maxFontSizeMultiplier={1.3} style={styles.inlineChipText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <Text maxFontSizeMultiplier={1.5} style={styles.noteText}>{tier.trigger}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <SectionCaption label="8-недельная волновая прогрессия" />

      <View style={styles.phaseGrid}>
        {wavePhases.map(phase => (
          <View
            key={phase.phase}
            style={[styles.phaseCard, {borderTopColor: phase.color}]}>
            <View style={styles.phaseHeader}>
              <Text maxFontSizeMultiplier={1.3} style={[styles.phaseTitle, {color: phase.color}]}>
                {phase.phase}
              </Text>
              <View style={[styles.phaseBadge, {borderColor: phase.color}]}>
                <Text maxFontSizeMultiplier={1.2} style={[styles.phaseBadgeText, {color: phase.color}]}>
                  Недели {phase.weeks}
                </Text>
              </View>
            </View>

            <Text maxFontSizeMultiplier={1.4} style={styles.phaseGoal}>{phase.goal}</Text>

            <View style={styles.metricStack}>
              <InfoRow label="Интенсивность" value={phase.intensity} />
              <InfoRow label="Схема" value={phase.scheme} />
              <InfoRow label="Объём" value={phase.volume} />
            </View>

            <Text maxFontSizeMultiplier={1.5} style={styles.noteText}>{phase.focus}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.callout, {borderLeftColor: colors.orange}]}>
        <Text maxFontSizeMultiplier={1.2} style={styles.calloutLabel}>Бицепс и повышенный объём</Text>
        <Text maxFontSizeMultiplier={1.5} style={styles.noteText}>{bicepsNote}</Text>
      </View>

      <SectionCaption label="Разминочный стек" />

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={[styles.tableCell, styles.tableHeaderCell]}>Этап</Text>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={[styles.tableCell, styles.tableHeaderCell]}>Вес</Text>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={[styles.tableCell, styles.tableHeaderCell]}>Повт</Text>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={[styles.tableCell, styles.tableHeaderCell]}>Отдых</Text>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={[styles.tableCell, styles.tableHeaderCell]}>Задача</Text>
        </View>

        {warmupStack.map(step => (
          <View key={step.stage} style={styles.tableRow}>
            <Text maxFontSizeMultiplier={1.3} style={[styles.tableCell, {color: step.color, fontWeight: '800'}]}>
              {step.stage}
            </Text>
            <Text maxFontSizeMultiplier={1.3} style={styles.tableCell}>{step.weight}</Text>
            <Text maxFontSizeMultiplier={1.3} style={styles.tableCell}>{step.reps}</Text>
            <Text maxFontSizeMultiplier={1.3} style={styles.tableCell}>{step.rest}</Text>
            <Text maxFontSizeMultiplier={1.4} style={styles.tableCell}>{step.goal}</Text>
          </View>
        ))}
      </View>

      <SectionCaption label="Научные карточки" />

      {SCIENCE_CARD_GROUPS.map(([group, cards]) => (
        <View key={group} style={styles.groupBlock}>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.3} style={styles.groupTitle}>{group}</Text>
          <View style={styles.researchList}>
            {cards.map(
              card => (
                <View key={card.id} style={styles.researchCard}>
                  <View style={styles.researchHeader}>
                    <View
                      style={[
                        styles.researchTag,
                        {borderColor: card.color, backgroundColor: `${card.color}1A`},
                      ]}>
                      <Text maxFontSizeMultiplier={1.2} style={[styles.researchTagText, {color: card.color}]}>
                        {card.category} · Diff {card.difficulty}/3
                      </Text>
                    </View>
                    <Text maxFontSizeMultiplier={1.2} style={styles.researchId}>{card.id}</Text>
                  </View>

                  <Text accessibilityRole="header" maxFontSizeMultiplier={1.3} style={styles.researchQuestion}>{card.question}</Text>
                  <Text maxFontSizeMultiplier={1.5} style={styles.noteText}>{card.answer}</Text>

                  <View style={styles.researchBlock}>
                    <Text maxFontSizeMultiplier={1.2} style={styles.researchLabel}>Применение</Text>
                    <Text maxFontSizeMultiplier={1.5} style={styles.researchText}>{card.application}</Text>
                  </View>

                  <View style={styles.researchFooter}>
                    <Text maxFontSizeMultiplier={1.3} style={styles.researchMeta}>{card.source}</Text>
                    <Text maxFontSizeMultiplier={1.3} style={styles.researchMeta}>
                      {card.tags.map(tag => `#${tag}`).join(' ')}
                    </Text>
                  </View>
                </View>
              ),
            )}
          </View>
        </View>
      ))}

      <SectionCaption label="Протокол запуска и авторегуляция" />

      <View style={styles.protocolGrid}>
        {protocolSteps.map(step => (
          <View
            key={step.step}
            style={[styles.protocolCard, {borderTopColor: step.color}]}>
            <View style={styles.protocolHeader}>
              <Text maxFontSizeMultiplier={1.2} style={[styles.protocolStep, {color: step.color}]}>
                {step.step}
              </Text>
              <Text maxFontSizeMultiplier={1.3} style={styles.protocolTitle}>{step.title}</Text>
            </View>

            {step.description ? (
              <Text maxFontSizeMultiplier={1.5} style={styles.noteText}>{step.description}</Text>
            ) : null}

            {step.bullets?.map(item => (
              <View key={item} style={styles.bulletRow}>
                <Text style={[styles.bulletDot, {color: step.color}]}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
});

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <View style={styles.metricCard}>
      <Text maxFontSizeMultiplier={1.2} style={styles.metricLabel}>{label}</Text>
      <Text maxFontSizeMultiplier={1.3} style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <View style={styles.infoRow}>
      <Text maxFontSizeMultiplier={1.2} style={styles.infoLabel}>{label}</Text>
      <Text maxFontSizeMultiplier={1.3} style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function SectionCaption({label}: {label: string}): React.JSX.Element {
  return (
    <View style={styles.captionRow}>
      <View style={styles.captionLine} />
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={styles.captionLabel}>{label}</Text>
      <View style={styles.captionLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderLeftColor: colors.accent,
    borderLeftWidth: 3,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.md,
  },
  heroEyebrow: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  heroChip: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricCard: {
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    flex: 1,
    gap: 6,
    padding: spacing.sm,
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  captionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  captionLine: {
    backgroundColor: colors.border,
    flex: 1,
    height: 1,
  },
  captionLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  factorList: {
    gap: spacing.md,
  },
  factorRow: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  factorBadge: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minWidth: 86,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  factorBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  factorContent: {
    flex: 1,
    gap: spacing.sm,
  },
  factorTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  inlineChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  inlineChip: {
    backgroundColor: colors.card,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  inlineChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  phaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  phaseCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderTopWidth: 3,
    borderWidth: 1,
    gap: spacing.sm,
    minWidth: 320,
    padding: spacing.md,
    width: '48%',
  },
  phaseHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  phaseTitle: {
    flex: 1,
    fontSize: 22,
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
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  metricStack: {
    gap: 8,
  },
  infoRow: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  callout: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  calloutLabel: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tableContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  tableRow: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  tableCell: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  tableHeaderCell: {
    color: colors.muted,
    fontWeight: '700',
  },
  groupBlock: {
    gap: spacing.md,
  },
  groupTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  researchList: {
    gap: spacing.md,
  },
  researchCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  researchHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  researchTag: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  researchTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  researchId: {
    color: colors.muted,
    fontFamily: 'Courier',
    fontSize: 12,
  },
  researchQuestion: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  researchBlock: {
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    gap: 4,
    padding: spacing.sm,
  },
  researchLabel: {
    color: colors.orange,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  researchText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  researchFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  researchMeta: {
    color: colors.muted,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  protocolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  protocolCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderTopWidth: 3,
    borderWidth: 1,
    gap: spacing.sm,
    minWidth: 320,
    padding: spacing.md,
    width: '48%',
  },
  protocolHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  protocolStep: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  protocolTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
  },
  bulletRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  bulletDot: {
    fontSize: 14,
    lineHeight: 22,
  },
  bulletText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  noteText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
});
