import { EX_COUNT, EXERCISES, TRAINING_DAYS } from '@training/shared/data/exercises';
import { getTrainingExercises } from '@training/shared/utils/training';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { storage } from '@/lib/storage';
import { tokens } from '@/theme/tokens';
import type { UserData } from '@/types';

export default function TrainingScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    storage.load().then((data) => {
      if (mounted) setUserData(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const savedKeys = useMemo(
    () => new Set(userData?.exercises.map((item) => item.exerciseKey) ?? []),
    [userData?.exercises],
  );

  const missingExercises = useMemo(
    () =>
      Object.entries(EXERCISES)
        .filter(([key]) => !savedKeys.has(key))
        .map(([, exercise]) => exercise.name),
    [savedKeys],
  );

  const completedSessions = userData?.trainingProgress?.completedSessions ?? 0;
  const allSaved = userData ? missingExercises.length === 0 : false;
  const programDone = completedSessions >= 24;
  const currentDayIndex = completedSessions % 3;
  const currentWeekIndex = Math.floor(completedSessions / 3);
  const currentDay = TRAINING_DAYS[currentDayIndex];
  const currentExercises = useMemo(
    () => getTrainingExercises(currentDayIndex, currentWeekIndex, userData?.exercises ?? []),
    [currentDayIndex, currentWeekIndex, userData?.exercises],
  );

  const handleComplete = useCallback(async () => {
    if (!userData || saving || programDone) return;

    const nextData: UserData = {
      ...userData,
      trainingProgress: { completedSessions: completedSessions + 1 },
    };

    setSaving(true);
    try {
      await storage.save(nextData);
      setUserData(nextData);
    } finally {
      setSaving(false);
    }
  }, [completedSessions, programDone, saving, userData]);

  if (!userData || !currentDay) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.center}>
          <Text style={styles.mutedText}>Загружаем программу...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={allSaved && !programDone ? currentExercises : []}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerStack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Training</Text>
              <Text style={styles.title}>Программа тренировок</Text>
              <Text style={styles.subtitle}>8 недель · 3 дня в неделю · волновая прогрессия</Text>
            </View>

            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.sectionLabel}>Прогресс программы</Text>
                <Text style={styles.progressValue}>{completedSessions} / 24</Text>
              </View>
              <View
                accessibilityLabel={`Прогресс программы: ${completedSessions} из 24 тренировок`}
                accessibilityRole="progressbar"
                style={styles.progressTrack}
              >
                <View style={[styles.progressFill, { width: `${(completedSessions / 24) * 100}%` }]} />
              </View>
            </View>

            {!allSaved ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Заблокировано</Text>
                <Text style={styles.cardTitle}>Введите 1ПМ для всех упражнений</Text>
                <Text style={styles.cardText}>
                  Сохранено {savedKeys.size} из {EX_COUNT}. Тренировка откроется после заполнения
                  всех базовых результатов.
                </Text>
                <FlatList
                  data={missingExercises}
                  keyExtractor={(item) => item}
                  scrollEnabled={false}
                  renderItem={({ item }) => <Text style={styles.missingItem}>— {item}</Text>}
                />
              </View>
            ) : null}

            {programDone ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Готово</Text>
                <Text style={styles.cardTitle}>Цикл завершён</Text>
                <Text style={styles.cardText}>24 тренировки пройдены. Reset добавим в следующем слое.</Text>
              </View>
            ) : null}

            {allSaved && !programDone ? (
              <View style={styles.dayCard}>
                <View>
                  <Text style={styles.sectionLabel}>Текущая тренировка</Text>
                  <Text style={styles.cardTitle}>
                    День {currentDay.dayNumber} · {currentDay.name}
                  </Text>
                  <Text style={styles.cardText}>Неделя {currentWeekIndex + 1}</Text>
                </View>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.exerciseRow}>
            <View style={styles.exerciseMain}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseMeta}>
                {item.scheme.sets} × {item.scheme.reps} · {item.totalReps} повт
              </Text>
            </View>
            <Text style={styles.exerciseWeight}>{item.weight.toFixed(1)} кг</Text>
          </View>
        )}
        ListFooterComponent={
          allSaved && !programDone ? (
            <Pressable
              accessibilityLabel="Завершить текущую тренировку"
              accessibilityRole="button"
              disabled={saving}
              onPress={handleComplete}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
                saving && styles.disabled,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {saving ? 'Сохраняем...' : 'Завершить тренировку'}
              </Text>
            </Pressable>
          ) : null
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
    gap: tokens.spacing.sm,
    paddingTop: tokens.spacing.md,
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
  progressCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  progressValue: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.sm,
    fontWeight: '600',
  },
  progressTrack: {
    backgroundColor: tokens.colors.bg,
    borderRadius: tokens.radius.round,
    height: 6,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.round,
    height: 6,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  dayCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    padding: tokens.spacing.md,
  },
  cardTitle: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xl,
    fontWeight: '600',
    lineHeight: 30,
  },
  cardText: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 21,
  },
  missingItem: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 22,
  },
  exerciseRow: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: tokens.spacing.md,
    justifyContent: 'space-between',
    padding: tokens.spacing.md,
  },
  exerciseMain: {
    flex: 1,
    gap: tokens.spacing.xs,
  },
  exerciseName: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  exerciseMeta: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
  },
  exerciseWeight: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: tokens.colors.accent,
    borderRadius: tokens.radius.md,
    justifyContent: 'center',
    marginTop: tokens.spacing.md,
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
  mutedText: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
  },
});
