import { calc1RM } from '@training/shared/utils/calc';
import { EXERCISES, TYPE_LABELS } from '@training/shared/data/exercises';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { storage } from '@/lib/storage';
import { tokens } from '@/theme/tokens';
import type { SavedExercise, UserData } from '@/types';

const TEMP_EXERCISE_KEY = 'squat';

function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function mergeExercise(data: UserData, exercise: SavedExercise): UserData {
  return {
    ...data,
    exercises: [
      exercise,
      ...data.exercises.filter((item) => item.exerciseKey !== exercise.exerciseKey),
    ],
  };
}

export default function CalculatorScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [testWeight, setTestWeight] = useState('');
  const [testReps, setTestReps] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const exercise = EXERCISES[TEMP_EXERCISE_KEY];
  const canCalculate = testWeight.trim().length > 0 && testReps.trim().length > 0 && !saving;

  useEffect(() => {
    let mounted = true;

    storage.load().then((data) => {
      if (mounted) setUserData(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const savedExercises = useMemo(() => userData?.exercises ?? [], [userData?.exercises]);

  const handleCalculate = useCallback(async () => {
    if (!userData || !exercise) return;

    const weight = Number.parseFloat(testWeight.replace(',', '.'));
    const reps = Number.parseInt(testReps, 10);

    if (!Number.isFinite(weight) || weight <= 0 || !Number.isInteger(reps) || reps <= 0) {
      setError('Введите рабочий вес и количество повторений больше нуля.');
      return;
    }

    const saved: SavedExercise = {
      exerciseKey: TEMP_EXERCISE_KEY,
      testWeight: weight,
      testReps: reps,
      oneRM: Math.round(calc1RM(weight, reps) * 10) / 10,
      date: new Date().toLocaleDateString('ru-RU'),
    };

    const nextData = mergeExercise(userData, saved);

    setSaving(true);
    setError('');

    try {
      await storage.save(nextData);
      setUserData(nextData);
      setTestWeight('');
      setTestReps('');
    } catch {
      setError('Не удалось сохранить результат. Попробуйте ещё раз.');
    } finally {
      setSaving(false);
    }
  }, [exercise, testReps, testWeight, userData]);

  const renderSavedExercise = useCallback(({ item }: { item: SavedExercise }) => {
    const savedExercise = EXERCISES[item.exerciseKey];
    const title = savedExercise?.name ?? item.exerciseKey;
    const typeLabel = savedExercise ? TYPE_LABELS[savedExercise.type] : 'Упражнение';

    return (
      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <View style={styles.resultTitleGroup}>
            <Text style={styles.resultTitle}>{title}</Text>
            <Text style={styles.resultMeta}>
              {formatWeight(item.testWeight)} кг × {item.testReps} повт · {item.date}
            </Text>
          </View>
          <Text style={styles.resultValue}>{formatWeight(item.oneRM)} кг</Text>
        </View>
        <Text style={styles.resultType}>{typeLabel}</Text>
      </View>
    );
  }, []);

  if (!userData || !exercise) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.center}>
          <Text style={styles.mutedText}>Загружаем данные...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={savedExercises}
        keyExtractor={(item) => item.exerciseKey}
        renderItem={renderSavedExercise}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Тренировочный калькулятор</Text>
              <Text style={styles.title}>1ПМ и прогрессия</Text>
              <Text style={styles.subtitle}>
                Первый native-экран: отказной подход сохраняется в AsyncStorage и использует
                shared-логику расчёта.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Тестовый подход</Text>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.hint}>
                Временно выбран присед. Picker упражнений будет следующим слоем поверх этого
                фундамента.
              </Text>

              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Вес, кг</Text>
                  <TextInput
                    accessibilityLabel="Вес тестового подхода в килограммах"
                    inputMode="decimal"
                    keyboardType="decimal-pad"
                    onChangeText={setTestWeight}
                    placeholder="100"
                    placeholderTextColor={tokens.colors.textTertiary}
                    returnKeyType="next"
                    style={styles.input}
                    value={testWeight}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Повторений</Text>
                  <TextInput
                    accessibilityLabel="Количество повторений в тестовом подходе"
                    inputMode="numeric"
                    keyboardType="number-pad"
                    onChangeText={setTestReps}
                    onSubmitEditing={handleCalculate}
                    placeholder="5"
                    placeholderTextColor={tokens.colors.textTertiary}
                    returnKeyType="done"
                    style={styles.input}
                    value={testReps}
                  />
                </View>
              </View>

              {error ? (
                <Text accessibilityLiveRegion="polite" style={styles.errorText}>
                  {error}
                </Text>
              ) : null}

              <Pressable
                accessibilityLabel="Рассчитать и сохранить 1ПМ"
                accessibilityRole="button"
                disabled={!canCalculate}
                onPress={handleCalculate}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                  !canCalculate && styles.disabled,
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  {saving ? 'Сохраняем...' : 'Рассчитать'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.listHeader}>
              <Text style={styles.sectionLabel}>Сохранённые</Text>
              <Text style={styles.countLabel}>{savedExercises.length}/12</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Нет сохранённых результатов</Text>
            <Text style={styles.emptyText}>
              Введите тестовый вес и повторы. Результат останется после перезапуска приложения.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
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
    padding: tokens.spacing.lg,
  },
  headerStack: {
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.sm,
  },
  hero: {
    paddingTop: tokens.spacing.md,
    gap: tokens.spacing.sm,
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
    lineHeight: 38,
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
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
  },
  sectionLabel: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  exerciseName: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xl,
    fontWeight: '600',
  },
  hint: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 21,
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
    paddingVertical: tokens.spacing.sm,
  },
  errorText: {
    color: tokens.colors.danger,
    fontSize: tokens.fontSize.sm,
    lineHeight: 21,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.md,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  primaryButtonPressed: {
    backgroundColor: tokens.colors.accentPressed,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: tokens.colors.bg,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.4,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countLabel: {
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
  resultHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: tokens.spacing.md,
    justifyContent: 'space-between',
  },
  resultTitleGroup: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
  resultTitle: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  resultMeta: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 20,
  },
  resultValue: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.lg,
    fontWeight: '600',
  },
  resultType: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
  },
  emptyCard: {
    alignItems: 'center',
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
    textAlign: 'center',
  },
  emptyText: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 21,
    textAlign: 'center',
  },
  mutedText: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
  },
});
