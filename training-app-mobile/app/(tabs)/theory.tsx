import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MECHANICAL_CONCEPTS, MTOR_CONCEPTS, SUPPLEMENT_TIERS, THEORY_CONCEPTS } from '../../src/data/theory'
import { AccordionCard } from '../../src/components/theory/AccordionCard'
import { CategoryPills } from '../../src/components/theory/CategoryPills'
import { RPEScale } from '../../src/components/theory/RPEScale'
import { StrengthFormulaSection } from '../../src/components/theory/StrengthFormulaSection'
import { ZonesChart } from '../../src/components/theory/ZonesChart'
import { theme } from '../../src/theme'

// ─── Data slices ──────────────────────────────────────────────────────────────

const BASIC_CONCEPTS = THEORY_CONCEPTS.slice(0, 12)
const CLUSTER_CONCEPTS = THEORY_CONCEPTS.slice(12, 20)
const TENDON_CONCEPTS = THEORY_CONCEPTS.slice(20, 22)
const PROGRESSION_CONCEPT = THEORY_CONCEPTS[22]

const CATEGORIES = ['Базис', 'Формула силы', 'Кластеры', 'mTOR', 'Добавки', 'Механика'] as const
type Category = (typeof CATEGORIES)[number]

const TOP_THREE = [
  {
    num: '01',
    color: theme.colors.accent,
    name: 'Креатин моногидрат',
    dose: '3–5 г/сут',
    desc: 'Самая надёжная база для силы и прогрессии у натурального атлета. Если нужен минимальный набор — отсюда.',
  },
  {
    num: '02',
    color: theme.colors.orange,
    name: 'Кофеин',
    dose: '~200 мг до тренировки',
    desc: 'Поднимает концентрацию, выносливость и готовность работать тяжело. Если бьёт по сну — сон важнее.',
  },
  {
    num: '03',
    color: theme.colors.muted,
    name: 'Магний бисглицинат',
    dose: '~400 мг элементарного магния',
    desc: 'Имеет смысл при дефиците и высокой нагрузке. Инструмент восстановления, не бустер роста.',
  },
]

const TENDON_PROTOCOL = [
  {
    title: 'Высокая интенсивность',
    body: '85–90% ПМ: тяжёлые веса с полным контролем каждого повторения.',
    tagColor: theme.colors.accent,
  },
  {
    title: 'Низкий объём',
    body: '5×4 повторения: много подходов, мало повторений в каждом. Сохраняет качество движения.',
    tagColor: theme.colors.orange,
  },
  {
    title: 'Время под нагрузкой',
    body: 'Удержание 3–4 сек в пике момента: сухожилие испытывает максимальную деформацию. TUT, не отказ.',
    tagColor: '#ff4d4d',
  },
  {
    title: 'Частота',
    body: '3 раза в неделю: достаточно для адаптации сухожилий при нормальном восстановлении.',
    tagColor: theme.colors.blue,
  },
]

const MTOR_SIGNALS = [
  { label: 'Механическая\nнагрузка', sub: '80–90% ПМ', color: theme.colors.accent },
  { label: 'Аминокислоты\n(Лейцин)', sub: '2–3 г / приём', color: theme.colors.orange },
  { label: 'Калорийный\nпрофицит', sub: 'ATP ↑', color: theme.colors.green },
]

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function TheoryScreen() {
  const [category, setCategory] = useState<Category>('Базис')
  const scrollRef = useRef<ScrollView>(null)

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat)
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Theory</Text>
        <Text style={styles.title}>Теория тренинга</Text>
      </View>

      <CategoryPills categories={CATEGORIES} active={category} onChange={handleCategoryChange} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {category === 'Базис' && <BasicsSection />}
        {category === 'Формула силы' && <StrengthFormulaSection />}
        {category === 'Кластеры' && <ClustersSection />}
        {category === 'mTOR' && <MTORSection />}
        {category === 'Добавки' && <SupplementsSection />}
        {category === 'Механика' && <MechanicsSection />}
      </ScrollView>
    </SafeAreaView>
  )
}

// ─── Category sections ────────────────────────────────────────────────────────

function BasicsSection() {
  return (
    <View style={styles.section}>
      <NoteBox text="Ключевые понятия, которые лежат в основе программы. Разберись с ними — и вся схема прогрессии станет прозрачной." />

      {BASIC_CONCEPTS.map(item => (
        <AccordionCard key={item.title} title={item.title} body={item.body} />
      ))}

      <SectionDivider label="Интерактивные справочники" />

      <ZonesChart />
      <RPEScale />

      <SectionDivider label="Сухожилия" />

      {TENDON_CONCEPTS.map(item => (
        <AccordionCard
          key={item.title}
          title={item.title}
          body={item.body}
          tag="Сухожилия"
          tagColor={theme.colors.blue}
        />
      ))}

      {PROGRESSION_CONCEPT ? (
        <AccordionCard
          title={PROGRESSION_CONCEPT.title}
          body={PROGRESSION_CONCEPT.body}
          tag="Ключевой принцип"
          tagColor={theme.colors.green}
        />
      ) : null}

    </View>
  )
}

function ClustersSection() {
  return (
    <View style={styles.section}>
      <NoteBox text="Кластерный подход — сет с короткими паузами внутри (10–30 сек). Не для того чтобы облегчить, а чтобы сохранить качество повторов на высоком % от 1ПМ." />

      <View style={styles.clusterFormulas}>
        {[
          { pct: '80–85%', scheme: '3+3 или 2+2+2' },
          { pct: '87–92%', scheme: '2+2+1 или 1+1+1+1' },
          { pct: '90–95%', scheme: 'Одиночки с паузой' },
        ].map(row => (
          <View key={row.pct} style={styles.clusterRow}>
            <Text style={styles.clusterPct}>{row.pct}</Text>
            <View style={styles.clusterSchemeBadge}>
              <Text style={styles.clusterScheme}>{row.scheme}</Text>
            </View>
          </View>
        ))}
      </View>

      {CLUSTER_CONCEPTS.map(item => (
        <AccordionCard key={item.title} title={item.title} body={item.body} />
      ))}
    </View>
  )
}

function MTORSection() {
  return (
    <View style={styles.section}>
      <NoteBox text="mTOR — интегратор сигналов роста. Нужно одновременно совпадение трёх условий. Если одного нет — анаболизм слабее." />

      <View style={styles.flowWrap}>
        <Text style={styles.flowHeading}>СИГНАЛЬНЫЙ КАСКАД</Text>

        <View style={styles.flowInputRow}>
          {MTOR_SIGNALS.map((signal, i) => (
            <View key={i} style={[styles.flowInput, { borderColor: signal.color }]}>
              <Text style={[styles.flowInputLabel, { color: signal.color }]}>{signal.label}</Text>
              <Text style={styles.flowInputSub}>{signal.sub}</Text>
            </View>
          ))}
        </View>

        <View style={styles.flowMiddle}>
          <View style={styles.flowDottedLine} />
          <Text style={styles.flowMiddleLabel}>все три сигнала</Text>
          <View style={styles.flowDottedLine} />
        </View>

        <View style={[styles.flowMainBox, { borderColor: theme.colors.accent }]}>
          <Text style={[styles.flowMainTitle, { color: theme.colors.accent }]}>mTORC1</Text>
          <Text style={styles.flowMainSub}>интегратор сигналов роста</Text>
        </View>

        <Text style={styles.flowArrow}>↓</Text>

        <View style={[styles.flowOutputBox, { borderColor: theme.colors.green }]}>
          <Text style={[styles.flowOutputTitle, { color: theme.colors.green }]}>Синтез белка ↑</Text>
          <Text style={styles.flowOutputSub}>Гипертрофия мышц</Text>
        </View>

        <View style={[styles.ampkBox, { borderColor: '#ff4d4d' }]}>
          <Text style={[styles.ampkTitle, { color: '#ff4d4d' }]}>Блокировка: AMPK</Text>
          <Text style={styles.ampkDesc}>
            Дефицит калорий → AMPK активен → mTOR подавлен → рост замедлен
          </Text>
        </View>
      </View>

      {MTOR_CONCEPTS.map(item => (
        <AccordionCard
          key={item.title}
          title={item.title}
          body={item.definition}
          pattern={item.pattern}
          bullets={item.bullets}
        />
      ))}
    </View>
  )
}

function SupplementsSection() {
  return (
    <View style={styles.section}>
      <NoteBox text="Смотри как на приоритизацию. Верхние уровни — реальная отдача. Нижние либо ситуативны, либо зависят от дефицитов." />

      <View style={styles.tierList}>
        {SUPPLEMENT_TIERS.map(tier => (
          <View key={tier.tier} style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: tier.color }]}>
              <Text style={[styles.tierBadgeText, { color: tier.textColor }]}>{tier.tier}</Text>
            </View>
            <View style={styles.tierContent}>
              <Text style={[styles.tierLabel, { color: tier.color }]}>{tier.label}</Text>
              <View style={styles.tierChips}>
                {tier.items.map(item => (
                  <View key={item} style={styles.tierChip}>
                    <Text style={styles.tierChipText}>{item}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.tierNote}>{tier.note}</Text>
            </View>
          </View>
        ))}
      </View>

      <SectionDivider label="Топ-3 если выбирать" />

      <View style={styles.topThreeList}>
        {TOP_THREE.map(item => (
          <View key={item.num} style={[styles.topCard, { borderLeftColor: item.color }]}>
            <Text style={[styles.topNum, { color: item.color }]}>{item.num}</Text>
            <View style={styles.topCardBody}>
              <View style={styles.topNameRow}>
                <Text style={styles.topName}>{item.name}</Text>
                <View style={[styles.doseBadge, { borderColor: item.color }]}>
                  <Text style={[styles.doseText, { color: item.color }]}>{item.dose}</Text>
                </View>
              </View>
              <Text style={styles.topDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function MechanicsSection() {
  return (
    <View style={styles.section}>
      <NoteBox text="Механика важнее мотивации. Один и тот же вес может быть лёгким или тяжёлым в зависимости от твоей антропометрии и техники." />

      {MECHANICAL_CONCEPTS.map(item => (
        <AccordionCard key={item.title} title={item.title} body={item.body} />
      ))}

      <SectionDivider label="Протокол укрепления сухожилий" />

      {TENDON_PROTOCOL.map(item => (
        <AccordionCard
          key={item.title}
          title={item.title}
          body={item.body}
          tag="Протокол"
          tagColor={item.tagColor}
        />
      ))}
    </View>
  )
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function NoteBox({ text }: { text: string }) {
  return (
    <View style={styles.noteBox}>
      <Text style={styles.noteText}>{text}</Text>
    </View>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerLabel}>{label}</Text>
      <View style={styles.dividerLine} />
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    backgroundColor: theme.colors.bg,
    flex: 1,
  },
  header: {
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
  },
  eyebrow: {
    color: theme.colors.orange,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 48,
  },
  section: {
    rowGap: theme.spacing.sm,
  },

  // Note box
  noteBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  noteText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },

  // Divider
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

  // Cluster section
  clusterFormulas: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  clusterRow: {
    alignItems: 'center',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    columnGap: theme.spacing.md,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  clusterPct: {
    color: theme.colors.accent,
    fontFamily: 'Courier',
    fontSize: 14,
    fontWeight: '700',
    width: 72,
  },
  clusterSchemeBadge: {
    backgroundColor: theme.colors.accentDim,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  clusterScheme: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
  },

  // mTOR flow
  flowWrap: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 12,
  },
  flowHeading: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  flowInputRow: {
    columnGap: 8,
    flexDirection: 'row',
  },
  flowInput: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    flex: 1,
    padding: 10,
    rowGap: 4,
  },
  flowInputLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 15,
  },
  flowInputSub: {
    color: theme.colors.muted,
    fontSize: 10,
    textAlign: 'center',
  },
  flowMiddle: {
    alignItems: 'center',
    columnGap: 8,
    flexDirection: 'row',
  },
  flowDottedLine: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    flex: 1,
  },
  flowMiddleLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  flowMainBox: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    borderWidth: 1.5,
    padding: 12,
    rowGap: 4,
  },
  flowMainTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  flowMainSub: {
    color: theme.colors.muted,
    fontSize: 11,
  },
  flowArrow: {
    color: theme.colors.muted,
    fontSize: 20,
    textAlign: 'center',
  },
  flowOutputBox: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    padding: 12,
    rowGap: 4,
  },
  flowOutputTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  flowOutputSub: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  ampkBox: {
    backgroundColor: 'rgba(255,77,77,0.06)',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    marginTop: 4,
    padding: 10,
    rowGap: 4,
  },
  ampkTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  ampkDesc: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },

  // Supplements
  tierList: {
    rowGap: theme.spacing.sm,
  },
  tierRow: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    columnGap: theme.spacing.md,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  tierBadge: {
    alignItems: 'center',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  tierBadgeText: {
    fontSize: 16,
    fontWeight: '900',
  },
  tierContent: {
    flex: 1,
    rowGap: 8,
  },
  tierLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  tierChips: {
    columnGap: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 6,
  },
  tierChip: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  tierChipText: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: '600',
  },
  tierNote: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },

  // Top 3
  topThreeList: {
    rowGap: theme.spacing.sm,
  },
  topCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderLeftWidth: 3,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    columnGap: theme.spacing.md,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  topNum: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 2,
    width: 22,
  },
  topCardBody: {
    flex: 1,
    rowGap: 8,
  },
  topNameRow: {
    alignItems: 'center',
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  doseBadge: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  doseText: {
    fontFamily: 'Courier',
    fontSize: 11,
    fontWeight: '700',
  },
  topDesc: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
})
