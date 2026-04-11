import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MECHANICAL_CONCEPTS, MTOR_CONCEPTS, SUPPLEMENT_TIERS, THEORY_CONCEPTS } from '../../data/theory'
import { theme } from '../../theme'
import { theoryPalette } from '../../theme/theory'
import { GlossyCard } from '../ui/GlossyCard'
import { AccordionCard } from './AccordionCard'
import { ZonesChart } from './ZonesChart'

const PRACTICE_CONCEPTS = THEORY_CONCEPTS.slice(9)

const DEEP_DIVE_SECTIONS = [
  {
    id: 'practice',
    label: 'Практика',
    description: 'Кластеры, зоны и сухожилия',
  },
  {
    id: 'mtor',
    label: 'mTOR',
    description: 'Сигналы роста и ограничения',
  },
  {
    id: 'mechanics',
    label: 'Механика',
    description: 'Рычаги, антропометрия и техника',
  },
  {
    id: 'supplements',
    label: 'Добавки',
    description: 'Приоритеты, а не магия',
  },
] as const

type DeepDiveSectionId = (typeof DEEP_DIVE_SECTIONS)[number]['id']

function getSectionCardCount(section: DeepDiveSectionId) {
  if (section === 'practice') return PRACTICE_CONCEPTS.length + 1
  if (section === 'mtor') return MTOR_CONCEPTS.length
  if (section === 'mechanics') return MECHANICAL_CONCEPTS.length
  return SUPPLEMENT_TIERS.length
}

function getPracticeMeta(index: number) {
  if (index <= 11) {
    return {
      tag: 'Силовая база',
      tagColor: theoryPalette.accent,
    }
  }

  if (index <= 19) {
    return {
      tag: 'Кластеры',
      tagColor: theme.colors.orange,
    }
  }

  if (index <= 21) {
    return {
      tag: 'Сухожилия',
      tagColor: theme.colors.blue,
    }
  }

  return {
    tag: 'Принцип',
    tagColor: theme.colors.green,
  }
}

function getMtorMeta(title: string) {
  const normalized = title.toLowerCase()

  if (normalized.includes('ampk') || normalized.includes('тормоз')) {
    return {
      tag: 'Торможение',
      tagColor: theme.colors.red,
    }
  }

  if (normalized.includes('максимального анаболизма') || normalized.includes('усиливающие')) {
    return {
      tag: 'Активация',
      tagColor: theme.colors.green,
    }
  }

  if (normalized.includes('лейцин') || normalized.includes('аминокислот')) {
    return {
      tag: 'Питание',
      tagColor: theme.colors.orange,
    }
  }

  return {
    tag: 'mTOR',
    tagColor: theoryPalette.accent,
  }
}

function getSupplementVariant(tier: string): 'accent' | 'default' | 'warning' | 'success' {
  if (tier === 'S' || tier === 'A') return 'accent'
  if (tier === 'B' || tier === 'C') return 'success'
  return 'warning'
}

function ModuleIntro({
  body,
  chips,
  title,
  variant = 'default',
}: {
  body: string
  chips: string[]
  title: string
  variant?: 'accent' | 'default' | 'warning' | 'success'
}) {
  return (
    <GlossyCard contentStyle={styles.moduleIntro} variant={variant}>
      <Text style={styles.moduleIntroTitle}>{title}</Text>
      <Text style={styles.moduleIntroBody}>{body}</Text>
      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </View>
        ))}
      </View>
    </GlossyCard>
  )
}

function SupplementsModule() {
  return (
    <View style={styles.moduleStack}>
      <ModuleIntro
        body="Добавки здесь вынесены в приоритетный слой: сначала база, затем спортивное питание, и только после этого дефициты или нишевые вещи."
        chips={['Сначала сон и еда', 'Анализы важнее маркетинга', 'S-tier = реальная база']}
        title="Иерархия добавок"
        variant="warning"
      />

      {SUPPLEMENT_TIERS.map((tier) => (
        <GlossyCard
          key={tier.tier}
          contentStyle={styles.supplementCard}
          variant={getSupplementVariant(tier.tier)}
        >
          <View style={styles.supplementHeader}>
            <View style={[styles.supplementBadge, { backgroundColor: tier.color }]}>
              <Text style={[styles.supplementBadgeText, { color: tier.textColor }]}>{tier.tier}</Text>
            </View>

            <View style={styles.supplementCopy}>
              <Text style={[styles.supplementTitle, { color: tier.color }]}>{tier.label}</Text>
              <Text style={styles.supplementNote}>{tier.note}</Text>
            </View>
          </View>

          <View style={styles.supplementItems}>
            {tier.items.map((item) => (
              <View key={item} style={styles.supplementChip}>
                <Text style={styles.supplementChipText}>{item}</Text>
              </View>
            ))}
          </View>
        </GlossyCard>
      ))}
    </View>
  )
}

function PracticeModule() {
  return (
    <View style={styles.moduleStack}>
      <ModuleIntro
        body="Этот слой нужен для реальной силовой практики: в какой зоне работать, когда включать кластеры и почему сухожилия не догоняют мышцы автоматически."
        chips={['80–100% = сила', 'Кластеры = качество повторов', 'Сухожилия любят тяжёлую механику']}
        title="Прикладной слой"
        variant="accent"
      />

      <ZonesChart />

      {PRACTICE_CONCEPTS.map((item, index) => {
        const meta = getPracticeMeta(index + 9)

        return (
          <AccordionCard
            key={item.title}
            body={item.body}
            tag={meta.tag}
            tagColor={meta.tagColor}
            title={item.title}
          />
        )
      })}
    </View>
  )
}

function MtorModule() {
  return (
    <View style={styles.moduleStack}>
      <ModuleIntro
        body="mTOR здесь показан как интегратор: тренировка, аминокислоты и энергетический статус должны совпасть, иначе анаболический сигнал будет неполным."
        chips={['Механика', 'Лейцин', 'Энергетический профицит']}
        title="Биохимия роста"
        variant="accent"
      />

      {MTOR_CONCEPTS.map((item) => {
        const meta = getMtorMeta(item.title)

        return (
          <AccordionCard
            key={item.title}
            body={item.definition}
            bullets={item.bullets}
            pattern={item.pattern}
            tag={meta.tag}
            tagColor={meta.tagColor}
            title={item.title}
          />
        )
      })}
    </View>
  )
}

function MechanicsModule() {
  return (
    <View style={styles.moduleStack}>
      <ModuleIntro
        body="Раздел про механику нужен для честной интерпретации силы: не всё решается мышечной массой, потому что рычаги и антропометрия меняют саму задачу."
        chips={['Рычаги важнее ощущений', 'Нет универсальной техники', 'Выгодная механика > красивая техника']}
        title="Механика движения"
      />

      {MECHANICAL_CONCEPTS.map((item) => (
        <AccordionCard
          key={item.title}
          body={item.body}
          tag="Механика"
          tagColor={theme.colors.blue}
          title={item.title}
        />
      ))}
    </View>
  )
}

export function TheoryDeepDive() {
  const [activeSection, setActiveSection] = useState<DeepDiveSectionId>('practice')
  const activeMeta = DEEP_DIVE_SECTIONS.find((section) => section.id === activeSection) ?? DEEP_DIVE_SECTIONS[0]

  return (
    <View style={styles.root}>
      <GlossyCard contentStyle={styles.heroCard} variant="accent">
        <Text style={styles.heroEyebrow}>Advanced atlas</Text>
        <Text style={styles.heroTitle}>Углубление</Text>
        <Text style={styles.heroBody}>
          Timeline закрывает базу, а этот слой возвращает продвинутые темы: прикладную силовую систему, mTOR, механику движений и иерархию добавок.
        </Text>

        <View style={styles.heroMetrics}>
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Разделов</Text>
            <Text style={styles.heroMetricValue}>{DEEP_DIVE_SECTIONS.length}</Text>
          </View>
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Активный</Text>
            <Text numberOfLines={1} style={styles.heroMetricValue}>{activeMeta.label}</Text>
          </View>
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Карточек</Text>
            <Text style={styles.heroMetricValue}>{getSectionCardCount(activeSection)}</Text>
          </View>
        </View>
      </GlossyCard>

      <ScrollView
        contentContainerStyle={styles.pillRow}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {DEEP_DIVE_SECTIONS.map((section) => {
          const active = section.id === activeSection

          return (
            <Pressable
              key={section.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setActiveSection(section.id)}
              style={({ pressed }) => [
                styles.pill,
                active && styles.pillActive,
                pressed && styles.pillPressed,
              ]}
            >
              <Text style={[styles.pillLabel, active && styles.pillLabelActive]}>{section.label}</Text>
              <Text style={[styles.pillDescription, active && styles.pillDescriptionActive]}>
                {section.description}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>

      {activeSection === 'practice' ? <PracticeModule /> : null}
      {activeSection === 'mtor' ? <MtorModule /> : null}
      {activeSection === 'mechanics' ? <MechanicsModule /> : null}
      {activeSection === 'supplements' ? <SupplementsModule /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    rowGap: theme.spacing.md,
  },
  heroCard: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    rowGap: theme.spacing.md,
  },
  heroEyebrow: {
    color: theoryPalette.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: theoryPalette.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
  },
  heroBody: {
    color: theoryPalette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  heroMetrics: {
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: theme.spacing.sm,
  },
  heroMetric: {
    backgroundColor: 'rgba(148, 163, 184, 0.08)',
    borderColor: theoryPalette.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    minWidth: 104,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    rowGap: 4,
  },
  heroMetricLabel: {
    color: theoryPalette.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  heroMetricValue: {
    color: theoryPalette.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  pillRow: {
    columnGap: theme.spacing.sm,
    paddingRight: theme.spacing.xs,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: theoryPalette.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    minWidth: 148,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    rowGap: 4,
  },
  pillActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: theoryPalette.accent,
  },
  pillPressed: {
    opacity: 0.88,
  },
  pillLabel: {
    color: theoryPalette.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  pillLabelActive: {
    color: theoryPalette.accent,
  },
  pillDescription: {
    color: theoryPalette.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  pillDescriptionActive: {
    color: theoryPalette.textSecondary,
  },
  moduleStack: {
    rowGap: theme.spacing.md,
  },
  moduleIntro: {
    rowGap: theme.spacing.md,
  },
  moduleIntroTitle: {
    color: theoryPalette.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  moduleIntroBody: {
    color: theoryPalette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  chipRow: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  chip: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.24)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    color: theoryPalette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  supplementCard: {
    rowGap: theme.spacing.md,
  },
  supplementHeader: {
    alignItems: 'flex-start',
    columnGap: theme.spacing.md,
    flexDirection: 'row',
  },
  supplementBadge: {
    alignItems: 'center',
    borderRadius: 14,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  supplementBadgeText: {
    fontSize: 16,
    fontWeight: '900',
  },
  supplementCopy: {
    flex: 1,
    rowGap: 6,
  },
  supplementTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
  },
  supplementNote: {
    color: theoryPalette.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  supplementItems: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  supplementChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: theoryPalette.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  supplementChipText: {
    color: theoryPalette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
})
