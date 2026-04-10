import type { ReactNode } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import { TheoryStage, type TheoryStageIcon } from '../../src/components/theory/TheoryStage'
import { RPEScale } from '../../src/components/theory/RPEScale'
import { GlossyCard } from '../../src/components/ui/GlossyCard'
import { useTheoryNavigation } from '../../src/hooks/useTheoryNavigation'
import { THEORY_CONCEPTS } from '../../src/data/theory'
import { theoryPalette } from '../../src/theme/theory'
import { theme } from '../../src/theme'

type TheoryStageDefinition = {
  id: string
  icon: TheoryStageIcon
  preview: string
  summary: string
  title: string
  renderDetail: () => ReactNode
}

function TheoryNoiseOverlay() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg height="100%" style={StyleSheet.absoluteFill} width="100%">
        <Defs>
          <Pattern height="8" id="theory-noise" patternUnits="userSpaceOnUse" width="8">
            <Circle cx="1" cy="1" fill={theoryPalette.noiseDot} opacity="0.45" r="0.6" />
            <Circle cx="5.75" cy="2.75" fill={theoryPalette.noiseDot} opacity="0.25" r="0.55" />
            <Circle cx="3.25" cy="6.25" fill={theoryPalette.noiseDot} opacity="0.35" r="0.65" />
          </Pattern>
        </Defs>
        <Rect fill="url(#theory-noise)" height="100%" opacity="0.7" width="100%" />
      </Svg>
    </View>
  )
}

function DetailTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.detailTitle}>{children}</Text>
}

function TagRow({ items }: { items: string[] }) {
  return (
    <View style={styles.tagRow}>
      {items.map((item) => (
        <View key={item} style={styles.tag}>
          <Text style={styles.tagText}>{item}</Text>
        </View>
      ))}
    </View>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  )
}

function WaveOverview() {
  const rows = [
    { label: 'Недели 1–4', note: 'Рост веса, снижение объёма' },
    { label: 'Неделя 5', note: 'Волновой откат и восстановление' },
    { label: 'Недели 6–8', note: 'Второй пик с более тяжёлой вершиной' },
  ]

  return (
    <View style={styles.miniCard}>
      <DetailTitle>Как читать цикл</DetailTitle>
      <View style={styles.stack}>
        {rows.map((row) => (
          <View key={row.label} style={styles.inlineRow}>
            <Text style={styles.inlineLabel}>{row.label}</Text>
            <Text style={styles.inlineText}>{row.note}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

function SplitOverview() {
  const days = [
    'День 1: Толчок + Ноги',
    'День 2: Ноги + Тяга',
    'День 3: Плечи + Ноги',
  ]

  return (
    <View style={styles.miniCard}>
      <DetailTitle>Три сессии, один ритм</DetailTitle>
      <BulletList items={days} />
    </View>
  )
}

function VolumeLegend() {
  const rows = [
    { color: '#F59E0B', label: 'Высокий объём', value: '28+ повторений' },
    { color: '#94A3B8', label: 'Средний объём', value: '17–27 повторений' },
    { color: '#EF4444', label: 'Силовой минимум', value: '16 и меньше' },
  ]

  return (
    <View style={styles.miniCard}>
      <DetailTitle>Цвет = характер стимула</DetailTitle>
      <View style={styles.stack}>
        {rows.map((row) => (
          <View key={row.label} style={styles.legendRow}>
            <View style={[styles.legendSwatch, { backgroundColor: row.color }]} />
            <View style={styles.legendCopy}>
              <Text style={styles.inlineLabel}>{row.label}</Text>
              <Text style={styles.inlineText}>{row.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function FormulaSummary() {
  return (
    <View style={styles.miniCard}>
      <DetailTitle>Практика формулы</DetailTitle>
      <TagRow items={['4–8 повт — лучший диапазон', 'Округление до 0.1 кг', 'Расчёт без реального максимума']} />
      <BulletList
        items={[
          'Модифицированная Эпли берёт отказной подход и восстанавливает 1ПМ.',
          'На малых повторах точность ниже, поэтому силовой тест удобнее держать в диапазоне 5–8.',
          'Формула нужна не ради цифры, а ради устойчивой прогрессии на все 8 недель.',
        ]}
      />
    </View>
  )
}

export default function TheoryScreen() {
  const { width } = useWindowDimensions()
  const compactTimeline = width < 768

  const stages: TheoryStageDefinition[] = [
    {
      id: 'one-rm',
      icon: 'target',
      title: '1ПМ как точка отсчёта',
      preview: 'Весь цикл строится вокруг расчётного 1ПМ, а не вокруг случайного веса из прошлого тренинга.',
      summary: THEORY_CONCEPTS[0]?.body ?? '',
      renderDetail: () => <TagRow items={['1 отказной сет', '4–8 повторений', '% на весь цикл']} />,
    },
    {
      id: 'progressive-overload',
      icon: 'arrow-up',
      title: 'Прогрессия как обязательное условие',
      preview: 'Рост случается только тогда, когда вес, объём или плотность перестают быть комфортными.',
      summary: THEORY_CONCEPTS[1]?.body ?? '',
      renderDetail: () => (
        <BulletList items={['Расти может вес', 'Расти может объём', 'Расти может плотность работы']} />
      ),
    },
    {
      id: 'wave-periodization',
      icon: 'wave',
      title: 'Волна вместо линейного давления',
      preview: 'Нагрузка движется волнами, чтобы ты мог прогрессировать дольше без раннего перегрева.',
      summary: THEORY_CONCEPTS[2]?.body ?? '',
      renderDetail: () => <WaveOverview />,
    },
    {
      id: 'split',
      icon: 'split',
      title: '3-дневный сплит как ритм восстановления',
      preview: 'Задача сплита не просто разделить мышцы, а дать каждой группе стимул и время на адаптацию.',
      summary: THEORY_CONCEPTS[3]?.body ?? '',
      renderDetail: () => <SplitOverview />,
    },
    {
      id: 'working-weight',
      icon: 'weight',
      title: 'Тестовый и рабочий вес — это разные сущности',
      preview: 'Тест даёт отправную точку, а рабочий вес превращает её в конкретный недельный план.',
      summary: THEORY_CONCEPTS[4]?.body ?? '',
      renderDetail: () => (
        <TagRow items={['Тест → 1ПМ', '1ПМ → % недели', 'Шаг снаряда важнее случайной дроби']} />
      ),
    },
    {
      id: 'pullups',
      icon: 'pullup',
      title: 'Подтягивания считаются по-своему',
      preview: 'Здесь вес тела становится частью нагрузки, а дополнительный вес — лишь прибавкой к базовой системе.',
      summary: THEORY_CONCEPTS[5]?.body ?? '',
      renderDetail: () => (
        <BulletList
          items={[
            'Полный рабочий вес = вес тела + дополнительная нагрузка.',
            'В таблице показывается только прибавка на пояс.',
            'Отрицательное значение означает ассистированный режим.',
          ]}
        />
      ),
    },
    {
      id: 'volume',
      icon: 'volume',
      title: 'Объём считывается мгновенно',
      preview: 'Повторы и цветовая подсветка помогают понять характер тренировки ещё до чтения таблицы.',
      summary: THEORY_CONCEPTS[6]?.body ?? '',
      renderDetail: () => <VolumeLegend />,
    },
    {
      id: 'formula',
      icon: 'formula',
      title: 'Формула Эпли — не математика ради математики',
      preview: 'Она нужна для того, чтобы из одного честного теста получить устойчивую карту весов на весь цикл.',
      summary: THEORY_CONCEPTS[7]?.body ?? '',
      renderDetail: () => <FormulaSummary />,
    },
    {
      id: 'rpe',
      icon: 'rpe',
      title: 'RPE как тормоз против лишнего героизма',
      preview: 'Шкала усилия помогает не путать тяжёлую работу с бессмысленным уходом в отказ.',
      summary: THEORY_CONCEPTS[8]?.body ?? '',
      renderDetail: () => <RPEScale />,
    },
  ]

  const {
    activeIndex,
    focusedIndex,
    activateIndex,
    handleStageKeyDown,
    isPassed,
    setFocusedIndex,
  } = useTheoryNavigation({
    itemCount: stages.length,
    initialIndex: 0,
  })

  return (
    <ScreenLayout
      label="Theory"
      title="Карта знаний"
      subtitle="Девять ключевых тем собраны в пошаговый маршрут: от расчётного 1ПМ до саморегуляции нагрузки."
    >
      <View style={styles.scene}>
        <View pointerEvents="none" style={[styles.spotlight, styles.spotlightTop]} />
        <View pointerEvents="none" style={[styles.spotlight, styles.spotlightBottom]} />
        <TheoryNoiseOverlay />

        <GlossyCard contentStyle={styles.heroCard} style={styles.heroCardShell}>
          <Text style={styles.heroEyebrow}>Premium guide</Text>
          <Text style={styles.heroTitle}>Линия обучения</Text>
          <Text style={styles.heroBody}>
            Теория больше не выглядит как документация. Ты проходишь её по этапам, а интерфейс показывает, где ты сейчас и что уже освоил.
          </Text>

          <View style={styles.heroMetrics}>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricLabel}>Модулей</Text>
              <Text style={styles.heroMetricValue}>{stages.length}</Text>
            </View>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricLabel}>Активный этап</Text>
              <Text style={styles.heroMetricValue}>{String(activeIndex + 1).padStart(2, '0')}</Text>
            </View>
            <View style={styles.heroMetric}>
              <Text style={styles.heroMetricLabel}>Прогресс</Text>
              <Text style={styles.heroMetricValue}>{Math.round(((activeIndex + 1) / stages.length) * 100)}%</Text>
            </View>
          </View>
        </GlossyCard>

        <View style={styles.timeline}>
          {stages.map((stage, index) => (
            <TheoryStage
              key={stage.id}
              active={activeIndex === index}
              compact={compactTimeline}
              focused={focusedIndex === index}
              icon={stage.icon}
              index={index}
              isLast={index === stages.length - 1}
              onFocus={() => setFocusedIndex(index)}
              onKeyDown={handleStageKeyDown(index)}
              onPress={() => activateIndex(index)}
              passed={isPassed(index)}
              preview={stage.preview}
              summary={stage.summary}
              title={stage.title}
            >
              {stage.renderDetail()}
            </TheoryStage>
          ))}
        </View>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  scene: {
    alignSelf: 'center',
    maxWidth: 720,
    overflow: 'hidden',
    paddingVertical: theme.spacing.sm,
    position: 'relative',
    rowGap: theme.spacing.lg,
    width: '100%',
  },
  spotlight: {
    borderRadius: 999,
    position: 'absolute',
  },
  spotlightTop: {
    backgroundColor: theoryPalette.spotlight,
    height: 280,
    right: -90,
    top: -40,
    width: 280,
  },
  spotlightBottom: {
    backgroundColor: theoryPalette.spotlight,
    bottom: 120,
    height: 240,
    left: -100,
    width: 240,
  },
  heroCardShell: {
    borderColor: theoryPalette.border,
    shadowColor: theoryPalette.focusRing,
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
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  heroBody: {
    color: theoryPalette.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 620,
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
    minWidth: 108,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    rowGap: 4,
  },
  heroMetricLabel: {
    color: theoryPalette.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroMetricValue: {
    color: theoryPalette.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  timeline: {
    rowGap: theme.spacing.md,
  },
  miniCard: {
    backgroundColor: 'rgba(148, 163, 184, 0.08)',
    borderColor: theoryPalette.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  detailTitle: {
    color: theoryPalette.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  tagRow: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  tag: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: theoryPalette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  bulletList: {
    rowGap: 10,
  },
  bulletRow: {
    alignItems: 'flex-start',
    columnGap: 10,
    flexDirection: 'row',
  },
  bulletDot: {
    backgroundColor: theoryPalette.accent,
    borderRadius: 999,
    height: 6,
    marginTop: 8,
    width: 6,
  },
  bulletText: {
    color: theoryPalette.textSecondary,
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  stack: {
    rowGap: 10,
  },
  inlineRow: {
    rowGap: 4,
  },
  inlineLabel: {
    color: theoryPalette.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  inlineText: {
    color: theoryPalette.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  legendRow: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
  },
  legendSwatch: {
    borderRadius: 999,
    height: 12,
    width: 12,
  },
  legendCopy: {
    flex: 1,
    rowGap: 2,
  },
})
