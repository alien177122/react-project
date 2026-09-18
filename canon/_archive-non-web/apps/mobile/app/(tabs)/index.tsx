import {EXERCISES, SHORT_NAMES, TYPE_LABELS, WHEEL_ORDER} from '@training/shared/data/exercises';
import {useCalculatorState} from '@training/shared/hooks/useCalculatorState';
import type {SavedExercise} from '@training/shared/types';
import {useMemo, useState} from 'react';
import {FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {buildExerciseWeeks, formatKg} from '@/lib/progressionWeeks';
import {useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';

export default function CalculatorScreen() {
  const {userData, userName, token, persistUserData, setUserData} = useSession();
  const [pickerOpen, setPickerOpen] = useState(false);

  const calc = useCalculatorState({
    token: token || 'guest',
    userName: userName || userData?.name || 'Атлет',
    userData,
    setUserData: value => {
      setUserData(value);
    },
    saveUser: async data => persistUserData(data),
  });

  const exercise = EXERCISES[calc.selectedExercise];
  const usesBodyWeight = Boolean(exercise?.usesBodyWeight || exercise?.isPullup);
  const weeks = useMemo(() => {
    const oneRM = calc.activeResult?.oneRM;
    if (!oneRM || !calc.activeResult) return [];
    return buildExerciseWeeks(calc.activeResult.exerciseKey, oneRM);
  }, [calc.activeResult]);

  const pickerItems = useMemo(
    () =>
      WHEEL_ORDER.filter(key => EXERCISES[key]).map(key => ({
        key,
        name: EXERCISES[key]?.name ?? key,
        type: EXERCISES[key]?.type ?? 'A',
      })),
    [],
  );

  const canCalculate = usesBodyWeight
    ? calc.testBodyWeight.trim().length > 0 && calc.testReps.trim().length > 0
    : calc.testWeight.trim().length > 0 && calc.testReps.trim().length > 0;

  if (!userData || !exercise) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.muted}>Загружаем калькулятор…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={userData.exercises}
        keyExtractor={item => item.exerciseKey}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Калькулятор</Text>
              <Text style={styles.title}>1ПМ и прогрессия</Text>
              <Text style={styles.subtitle}>
                Тестовый подход → 1ПМ → 8 недель Program 2.0. Без лишнего chrome.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Упражнение</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setPickerOpen(true)}
                style={({pressed}) => [styles.pickerButton, pressed && styles.pressed]}>
                <View style={styles.pickerTextGroup}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.hint}>{TYPE_LABELS[exercise.type]}</Text>
                </View>
                <Text style={styles.pickerChevron}>Выбрать</Text>
              </Pressable>

              {usesBodyWeight ? (
                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Вес тела, кг</Text>
                    <TextInput
                      accessibilityLabel="Вес тела"
                      inputMode="decimal"
                      keyboardType="decimal-pad"
                      onChangeText={calc.setTestBodyWeight}
                      placeholder="80"
                      placeholderTextColor={tokens.colors.textTertiary}
                      style={styles.input}
                      value={calc.testBodyWeight}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Доп. вес, кг</Text>
                    <TextInput
                      accessibilityLabel="Дополнительный вес"
                      inputMode="decimal"
                      keyboardType="decimal-pad"
                      onChangeText={calc.setTestExtraWeight}
                      placeholder="0"
                      placeholderTextColor={tokens.colors.textTertiary}
                      style={styles.input}
                      value={calc.testExtraWeight}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Вес, кг</Text>
                  <TextInput
                    accessibilityLabel="Вес тестового подхода"
                    inputMode="decimal"
                    keyboardType="decimal-pad"
                    onChangeText={calc.setTestWeight}
                    placeholder="100"
                    placeholderTextColor={tokens.colors.textTertiary}
                    style={styles.input}
                    value={calc.testWeight}
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Повторений</Text>
                <TextInput
                  accessibilityLabel="Количество повторений"
                  inputMode="numeric"
                  keyboardType="number-pad"
                  onChangeText={calc.setTestReps}
                  onSubmitEditing={calc.handleCalculate}
                  placeholder="5"
                  placeholderTextColor={tokens.colors.textTertiary}
                  returnKeyType="done"
                  style={styles.input}
                  value={calc.testReps}
                />
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={!canCalculate}
                onPress={calc.handleCalculate}
                style={({pressed}) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                  !canCalculate && styles.disabled,
                ]}>
                <Text style={styles.primaryText}>Рассчитать</Text>
              </Pressable>
            </View>

            {calc.activeResult ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Результат</Text>
                <Text style={styles.resultOneRm}>{formatKg(calc.activeResult.oneRM)} кг 1ПМ</Text>
                <Text style={styles.hint}>
                  {SHORT_NAMES[calc.activeResult.exerciseKey] ?? calc.activeResult.exerciseKey} ·{' '}
                  {formatKg(calc.activeResult.testWeight)} кг × {calc.activeResult.testReps}
                </Text>

                <Text style={[styles.sectionLabel, styles.weekHeader]}>8 недель</Text>
                {weeks.map(row => (
                  <View key={row.week} style={[styles.weekRow, row.isDeload && styles.weekDeload]}>
                    <Text style={styles.weekNum}>Н{row.week}</Text>
                    <Text style={styles.weekPhase}>{row.phase}</Text>
                    <Text style={styles.weekScheme}>
                      {row.sets}×{row.reps} · {row.pct}%
                    </Text>
                    <Text style={styles.weekWeight}>{formatKg(row.weight)} кг</Text>
                  </View>
                ))}
              </View>
            ) : null}

            <View style={styles.listHeader}>
              <Text style={styles.sectionLabel}>Сохранённые</Text>
              <Text style={styles.count}>{userData.exercises.length}</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Пока пусто</Text>
            <Text style={styles.hint}>
              Считайте тестовый подход — 1ПМ сохранится на устройстве.
            </Text>
          </View>
        }
        renderItem={({item}: {item: SavedExercise}) => {
          const saved = EXERCISES[item.exerciseKey];
          return (
            <Pressable
              accessibilityRole="button"
              onPress={() => calc.handleSelectSaved(item)}
              style={({pressed}) => [styles.resultCard, pressed && styles.pressed]}>
              <View style={styles.resultHeader}>
                <View style={styles.pickerTextGroup}>
                  <Text style={styles.resultTitle}>{saved?.name ?? item.exerciseKey}</Text>
                  <Text style={styles.hint}>
                    {formatKg(item.testWeight)} кг × {item.testReps} · {item.date}
                  </Text>
                </View>
                <Text style={styles.resultValue}>{formatKg(item.oneRM)} кг</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => calc.handleDelete(item.exerciseKey)}
                style={styles.deleteButton}>
                <Text style={styles.deleteText}>Удалить</Text>
              </Pressable>
            </Pressable>
          );
        }}
      />

      <Modal animationType="slide" onRequestClose={() => setPickerOpen(false)} visible={pickerOpen}>
        <SafeAreaView style={styles.modalScreen}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Упражнение</Text>
            <Pressable accessibilityRole="button" onPress={() => setPickerOpen(false)}>
              <Text style={styles.pickerChevron}>Закрыть</Text>
            </Pressable>
          </View>
          <FlatList
            data={pickerItems}
            keyExtractor={item => item.key}
            contentContainerStyle={styles.content}
            renderItem={({item}) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  calc.selectExercise(item.key);
                  setPickerOpen(false);
                }}
                style={({pressed}) => [
                  styles.resultCard,
                  item.key === calc.selectedExercise && styles.selectedCard,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.hint}>{TYPE_LABELS[item.type]}</Text>
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.bg,
  },
  modalScreen: {
    flex: 1,
    backgroundColor: tokens.colors.bg,
  },
  content: {
    padding: tokens.spacing.md,
    paddingBottom: tokens.spacing.xxl,
    gap: tokens.spacing.sm,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.sm,
  },
  hero: {
    gap: tokens.spacing.sm,
    paddingTop: tokens.spacing.sm,
  },
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xxl,
    fontWeight: '600',
  },
  subtitle: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
    lineHeight: 24,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
  },
  sectionLabel: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  pickerButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: tokens.spacing.md,
    minHeight: 56,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  pickerTextGroup: {
    flex: 1,
    gap: 4,
  },
  exerciseName: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.lg,
    fontWeight: '600',
  },
  pickerChevron: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.sm,
    fontWeight: '600',
  },
  hint: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  inputGroup: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
  inputLabel: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    minHeight: 48,
    paddingHorizontal: tokens.spacing.md,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.md,
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryText: {
    color: tokens.colors.bg,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
    transform: [{scale: 0.98}],
  },
  disabled: {
    opacity: 0.4,
  },
  resultOneRm: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xl,
    fontWeight: '600',
  },
  weekHeader: {
    marginTop: tokens.spacing.sm,
  },
  weekRow: {
    alignItems: 'center',
    borderTopColor: tokens.colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    minHeight: 40,
    paddingVertical: 8,
  },
  weekDeload: {
    opacity: 0.75,
  },
  weekNum: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    fontWeight: '600',
    width: 28,
  },
  weekPhase: {
    color: tokens.colors.text,
    flex: 1,
    fontSize: tokens.fontSize.sm,
  },
  weekScheme: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
  },
  weekWeight: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.sm,
    fontWeight: '600',
    minWidth: 64,
    textAlign: 'right',
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  selectedCard: {
    borderColor: tokens.colors.accent,
  },
  resultHeader: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
  },
  resultTitle: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  resultValue: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.lg,
    fontWeight: '600',
  },
  deleteButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
  },
  deleteText: {
    color: tokens.colors.danger,
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
  },
  emptyCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.lg,
  },
  emptyTitle: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  muted: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
  },
});
