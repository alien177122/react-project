import {CATALOG_EXERCISES, CATALOG_WHEEL_ORDER, SHORT_NAMES} from '@training/shared/data/exercises';
import {useSplitConstructor} from '@training/shared/hooks/useSplitConstructor';
import {useMemo, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {formatKg} from '@/lib/progressionWeeks';
import {useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';

export default function SplitScreen() {
  const {userData, token, persistUserData, setUserData} = useSession();
  const [saveError, setSaveError] = useState('');
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const split = useSplitConstructor({
    userData: userData ?? {name: 'Атлет', exercises: []},
    setUserData: value => setUserData(value),
    saveUser: async data => persistUserData(data),
    token: token || 'guest',
    initialSplitId: userData?.activeSplitId,
    onSaveError: message => setSaveError(message),
  });

  const catalog = useMemo(
    () =>
      CATALOG_WHEEL_ORDER.filter(key => CATALOG_EXERCISES[key]).map(key => ({
        key,
        name: CATALOG_EXERCISES[key]?.name ?? key,
        short: SHORT_NAMES[key] ?? key,
      })),
    [],
  );

  const dayKeys = split.draft.customExercisesByDay?.[activeDay] ?? [];
  const dayPreview = split.dayPreviews.find(item => item.day.dayNumber === activeDay);

  if (!userData) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.muted}>Загружаем сплит…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={catalog}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Сплит</Text>
              <Text style={styles.title}>Конструктор</Text>
              <Text style={styles.subtitle}>
                Дни, упражнения и preview весов. Без MuscleDayGrid — простой multi-select.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Имя</Text>
              <TextInput
                onChangeText={name => split.updateDraft({name})}
                placeholder="Мой сплит"
                placeholderTextColor={tokens.colors.textTertiary}
                style={styles.input}
                value={split.draft.name}
              />

              <Text style={styles.sectionLabel}>Дней в неделю</Text>
              <View style={styles.row}>
                {([2, 3] as const).map(days => (
                  <Pressable
                    key={days}
                    onPress={() => {
                      split.setDaysPerWeek(days);
                      if (activeDay > days) setActiveDay(1);
                    }}
                    style={({pressed}) => [
                      styles.chip,
                      split.draft.daysPerWeek === days && styles.chipActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text
                      style={[
                        styles.chipText,
                        split.draft.daysPerWeek === days && styles.chipTextActive,
                      ]}>
                      {days}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.row}>
                <Pressable
                  onPress={split.createNewSplit}
                  style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                  <Text style={styles.ghostText}>Новый</Text>
                </Pressable>
                <Pressable
                  onPress={split.duplicateLast}
                  style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                  <Text style={styles.ghostText}>Копия</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSaveError('');
                    void split.saveSplit();
                  }}
                  style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}>
                  <Text style={styles.primaryText}>Сохранить</Text>
                </Pressable>
              </View>

              {saveError || split.validationError ? (
                <Text style={styles.error}>{saveError || split.validationError}</Text>
              ) : null}
            </View>

            {split.savedSplits.length > 0 ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Сохранённые сплиты</Text>
                {split.savedSplits.map(item => (
                  <Pressable
                    key={item.id}
                    onPress={() => split.selectSplit(item.id)}
                    style={styles.splitRow}>
                    <Text style={[styles.resultTitle, item.id === split.draft.id && styles.accent]}>
                      {item.name}
                    </Text>
                    <Text style={styles.hint}>{item.daysPerWeek} дня</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>День</Text>
              <View style={styles.row}>
                {split.draft.days.map(day => (
                  <Pressable
                    key={day.dayNumber}
                    onPress={() => setActiveDay(day.dayNumber)}
                    style={({pressed}) => [
                      styles.chip,
                      activeDay === day.dayNumber && styles.chipActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text
                      style={[
                        styles.chipText,
                        activeDay === day.dayNumber && styles.chipTextActive,
                      ]}>
                      {day.dayNumber}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.hint}>
                Выбрано: {dayKeys.length}. Тап по упражнению — добавить/убрать из дня {activeDay}.
              </Text>

              {dayPreview && dayPreview.exercises.length > 0 ? (
                <View style={styles.previewBlock}>
                  <Text style={styles.sectionLabel}>Preview нед. {split.previewWeek + 1}</Text>
                  {dayPreview.exercises.map(row => (
                    <Text key={row.key} style={styles.hint}>
                      {row.name}: {formatKg(row.weight)} кг · {row.scheme.sets}×{row.scheme.reps}
                    </Text>
                  ))}
                  <View style={styles.row}>
                    <Pressable
                      disabled={split.previewWeek <= 0}
                      onPress={() => split.setPreviewWeek(Math.max(0, split.previewWeek - 1))}>
                      <Text style={styles.accent}>← Нед.</Text>
                    </Pressable>
                    <Pressable
                      disabled={split.previewWeek >= 7}
                      onPress={() => split.setPreviewWeek(Math.min(7, split.previewWeek + 1))}>
                      <Text style={styles.accent}>Нед. →</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}
            </View>

            <Text style={styles.sectionLabel}>Каталог</Text>
          </View>
        }
        renderItem={({item}) => {
          const selected = dayKeys.includes(item.key);
          return (
            <Pressable
              onPress={() => {
                if (selected) {
                  split.removeExercise(item.key, activeDay);
                } else {
                  split.addExerciseToDay(item.key, activeDay);
                }
              }}
              style={({pressed}) => [
                styles.resultCard,
                selected && styles.selectedCard,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <Text style={styles.hint}>{selected ? 'В дне — тап чтобы убрать' : item.short}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: tokens.colors.bg},
  content: {padding: tokens.spacing.md, paddingBottom: tokens.spacing.xxl, gap: tokens.spacing.sm},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  stack: {gap: tokens.spacing.md, marginBottom: tokens.spacing.sm},
  hero: {gap: tokens.spacing.sm, paddingTop: tokens.spacing.sm},
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {color: tokens.colors.text, fontSize: tokens.fontSize.xxl, fontWeight: '600'},
  subtitle: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.md, lineHeight: 24},
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  sectionLabel: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    minHeight: 48,
    paddingHorizontal: tokens.spacing.md,
  },
  row: {alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm},
  chip: {
    alignItems: 'center',
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
    paddingHorizontal: tokens.spacing.md,
  },
  chipActive: {backgroundColor: tokens.colors.accent, borderColor: tokens.colors.accent},
  chipText: {color: tokens.colors.text, fontWeight: '600'},
  chipTextActive: {color: tokens.colors.bg},
  primaryButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.md,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: tokens.spacing.md,
  },
  primaryText: {color: tokens.colors.bg, fontSize: tokens.fontSize.sm, fontWeight: '600'},
  ghostButton: {
    alignItems: 'center',
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: tokens.spacing.md,
  },
  ghostText: {color: tokens.colors.text, fontSize: tokens.fontSize.sm, fontWeight: '500'},
  splitRow: {
    borderTopColor: tokens.colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  previewBlock: {gap: tokens.spacing.xs, marginTop: tokens.spacing.sm},
  resultCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    gap: 4,
    padding: tokens.spacing.md,
  },
  selectedCard: {borderColor: tokens.colors.accent},
  resultTitle: {color: tokens.colors.text, fontSize: tokens.fontSize.md, fontWeight: '600'},
  hint: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.sm, lineHeight: 20},
  accent: {color: tokens.colors.accent, fontSize: tokens.fontSize.sm, fontWeight: '600'},
  error: {color: tokens.colors.danger, fontSize: tokens.fontSize.sm},
  muted: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.md},
  pressed: {opacity: 0.9, transform: [{scale: 0.98}]},
});
