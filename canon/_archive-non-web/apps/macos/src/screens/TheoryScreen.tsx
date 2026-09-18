import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  DIABETES_HABITS_CONCEPTS,
  LATE_DINNER_CONCEPTS,
  ANABOLIC_VESSELS_CONCEPTS,
  MTOR_CONCEPTS,
  SUPPLEMENT_TIERS,
  THEORY_CONCEPTS,
  MECHANICAL_CONCEPTS,
  TENDON_PROTOCOL_CONCEPTS,
  TOP_THREE_SUPPLEMENTS,
} from '@training/shared/data/theory';
import {ScreenLayout} from '../components/ScreenLayout';
import {StrengthFormulaSection} from '../components/theory/StrengthFormulaSection';
import {SectionBlock} from '../components/ui/SectionBlock';
import {colors, radius, spacing} from '../theme';

export function TheoryScreen(): React.JSX.Element {
  return (
    <ScreenLayout
      label="Theory"
      title="Теория тренинга"
      subtitle="Основы прогрессии, mTOR, tier-лист добавок и ключевые ориентиры собраны в одном справочном разделе.">
      <SectionBlock num="01" title="Основы тренировки">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Ключевые понятия, которые лежат в основе программы. Разберись с ними, и вся схема
            прогрессии станет прозрачной.
          </Text>
        </View>
        <View style={styles.cardGrid}>
          {THEORY_CONCEPTS.map(item => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="02" title="mTOR и анаболический отклик">
        <View style={styles.cardGrid}>
          {MTOR_CONCEPTS.map(item => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>
                <Text style={styles.cardStrong}>Определение:</Text> {item.definition}
                {item.pattern ? `\n\nЗакономерность: ${item.pattern}` : ''}
              </Text>
              {item.bullets ? (
                <View style={styles.bulletList}>
                  {item.bullets.map(bullet => (
                    <Text key={bullet} style={styles.bulletItem}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="03" title="Tier List добавок">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Смотри на список как на приоритизацию. Верхние уровни дают реальную отдачу чаще, нижние
            либо ситуативны, либо сильно зависят от дефицитов.
          </Text>
        </View>
        <View style={styles.tierList}>
          {SUPPLEMENT_TIERS.map(tier => (
            <View key={tier.tier} style={styles.tierRow}>
              <View style={[styles.tierBadge, {backgroundColor: tier.color}]}>
                <Text style={[styles.tierBadgeText, {color: tier.textColor}]}>{tier.tier}</Text>
              </View>
              <View style={styles.tierContent}>
                <Text style={[styles.tierLabel, {color: tier.color}]}>{tier.label}</Text>
                <View style={styles.tierItems}>
                  {tier.items.map(item => (
                    <View key={item} style={styles.tierChip}>
                      <Text style={styles.tierChipText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.cardBody}>{tier.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="04" title="Топ-3 если выбирать">
        <View style={styles.cardGrid}>
          {TOP_THREE_SUPPLEMENTS.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={[styles.topNum, {color: item.color}]}>{item.num}</Text>
              <Text style={styles.topName}>{item.name}</Text>
              <Text style={styles.topDose}>{item.dose}</Text>
              <Text style={styles.cardBody}>{item.definition}</Text>
              <Text style={[styles.cardBody, {marginTop: spacing.sm}]}>{item.pattern}</Text>
              {item.bullets.map(bullet => (
                <Text key={bullet} style={[styles.cardBody, {marginTop: spacing.xs}]}>
                  · {bullet}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="05" title="Таблица %ПМ и RPE">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Таблица 1: Интенсивность (% от 1ПМ), количество повторений и зоны тренировочного
            воздействия
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>% ПМ</Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>Повт</Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>Зона</Text>
          </View>
          {[
            {pct: '100%', reps: '1–3', zone: 'Максимум', color: '#ffb020'},
            {pct: '90–95%', reps: '2–5', zone: 'Сила', color: '#ffb020'},
            {pct: '80–89%', reps: '6–8', zone: 'Сила', color: '#ffb020'},
            {pct: '70–79%', reps: '8–12', zone: 'Гипертрофия', color: '#ffc94d'},
            {pct: '65–69%', reps: '12–15', zone: 'Гипертрофия', color: '#ffc94d'},
            {pct: '60–64%', reps: '15–20', zone: 'Выносливость', color: '#5ba4ff'},
            {pct: '<60%', reps: '>20', zone: 'Выносливость', color: '#5ba4ff'},
          ].map(row => (
            <View key={row.pct} style={styles.tableRow}>
              <Text style={[styles.tableCell, {color: row.color, fontWeight: '700'}]}>
                {row.pct}
              </Text>
              <Text style={styles.tableCell}>{row.reps}</Text>
              <Text style={[styles.tableCell, {color: row.color}]}>{row.zone}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Таблица 2: RPE (Rate of Perceived Exertion) — шкала субъективной нагрузки от 1 до 10
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>RPE</Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>В запасе</Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>Описание</Text>
          </View>
          {[
            {rpe: '10', rirs: '0', desc: 'Максимальный отказ', color: '#ff4d4d'},
            {rpe: '9', rirs: '~1', desc: 'Мог сделать ещё 1', color: '#ff4d4d'},
            {rpe: '8', rirs: '~2', desc: 'Ещё 2 в запасе', color: '#ffc94d'},
            {rpe: '7', rirs: '~3', desc: 'Ещё 3 в запасе', color: '#ffc94d'},
            {rpe: '6', rirs: '~4', desc: 'Ещё 4 в запасе', color: '#3affb8'},
            {rpe: '<6', rirs: '>4', desc: 'Лёгкая нагрузка', color: '#3affb8'},
          ].map(row => (
            <View key={row.rpe} style={styles.tableRow}>
              <Text style={[styles.tableCell, {color: row.color, fontWeight: '700'}]}>
                {row.rpe}
              </Text>
              <Text style={styles.tableCell}>{row.rirs}</Text>
              <Text style={[styles.tableCell, {color: row.color, fontSize: 13}]}>{row.desc}</Text>
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="06" title="Протокол укрепления сухожилий">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Адаптация сухожилий — через изометрические удержания на тяжёлых весах: зона деформации
            4,5–6,5%, протокол 5×4 на 85–90% ПМ, 3 раза/нед, удержание 3–6 с в пике момента силы.
          </Text>
        </View>
        <View style={styles.cardGrid}>
          {TENDON_PROTOCOL_CONCEPTS.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  borderLeftColor:
                    ['#ffb020', '#ffc94d', '#ff4d4d', '#5ba4ff', '#a78bfa'][index] ?? '#ffb020',
                  borderLeftWidth: 3,
                },
              ]}>
              <Text
                style={[
                  styles.topNum,
                  {
                    color:
                      ['#ffb020', '#ffc94d', '#ff4d4d', '#5ba4ff', '#a78bfa'][index] ?? '#ffb020',
                  },
                ]}>
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Text style={styles.topName}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.definition}</Text>
              <Text style={styles.cardBody}>{item.pattern}</Text>
              {item.bullets.map(bullet => (
                <Text key={bullet} style={styles.cardBody}>
                  · {bullet}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="07" title="Интересные статьи">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Клинические разборы вне учебной сетки. На основе видео канала «Дневник врача Егорова»:
            привычки к диабету, еда на ночь, анаболики и сосуды.
          </Text>
        </View>
        <View style={styles.cardGrid}>
          {DIABETES_HABITS_CONCEPTS.map(item => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>
                <Text style={styles.cardStrong}>Определение:</Text> {item.definition}
                {item.pattern ? `\n\nЗакономерность: ${item.pattern}` : ''}
              </Text>
              {item.bullets ? (
                <View style={styles.bulletList}>
                  {item.bullets.map(bullet => (
                    <Text key={bullet} style={styles.bulletItem}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
          {LATE_DINNER_CONCEPTS.map(item => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>
                <Text style={styles.cardStrong}>Определение:</Text> {item.definition}
                {item.pattern ? `\n\nЗакономерность: ${item.pattern}` : ''}
              </Text>
              {item.bullets ? (
                <View style={styles.bulletList}>
                  {item.bullets.map(bullet => (
                    <Text key={bullet} style={styles.bulletItem}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
          {ANABOLIC_VESSELS_CONCEPTS.map(item => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>
                <Text style={styles.cardStrong}>Определение:</Text> {item.definition}
                {item.pattern ? `\n\nЗакономерность: ${item.pattern}` : ''}
              </Text>
              {item.bullets ? (
                <View style={styles.bulletList}>
                  {item.bullets.map(bullet => (
                    <Text key={bullet} style={styles.bulletItem}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="08" title="Механическое преимущество">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Механика важнее мотивации. Один и тот же вес может быть лёгким или тяжёлым в зависимости
            от механики движения и твоей антропометрии.
          </Text>
        </View>
        <View style={styles.cardGrid}>
          {MECHANICAL_CONCEPTS.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.definition}</Text>
              {'pattern' in item && item.pattern ? (
                <Text style={styles.cardBody}>{item.pattern}</Text>
              ) : null}
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock num="09" title="Формула силы">
        <StrengthFormulaSection />
      </SectionBlock>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  noteBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  noteText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  cardGrid: {
    rowGap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    rowGap: 10,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  cardBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  cardStrong: {
    color: colors.text,
    fontWeight: '700',
  },
  bulletList: {
    rowGap: 6,
  },
  bulletItem: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  tierList: {
    rowGap: spacing.md,
  },
  tierRow: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    columnGap: spacing.md,
    flexDirection: 'row',
    padding: spacing.md,
  },
  tierBadge: {
    alignItems: 'center',
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  tierBadgeText: {
    fontSize: 18,
    fontWeight: '900',
  },
  tierContent: {
    flex: 1,
    rowGap: 10,
  },
  tierLabel: {
    fontSize: 18,
    fontWeight: '800',
  },
  tierItems: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  tierChip: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tierChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  topNum: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  topName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  topDose: {
    color: colors.orange,
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
  },
  tableContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  tableRow: {
    borderColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  tableCell: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  tableCellHeader: {
    color: colors.muted,
    fontWeight: '700',
  },
});
