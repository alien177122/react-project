import {TRAINING_DAYS} from '@training/shared/data/exercises';
import {useTrainingProgram} from '@training/shared/hooks/useTrainingProgram';
import type {TrainingExerciseRow} from '@training/shared/utils/training';
import {useMemo} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {formatKg} from '@/lib/progressionWeeks';
import {deriveTrainingState} from '@/lib/trainingState';
import {useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';

function ExerciseCard({item}: {item: TrainingExerciseRow}) {
  return (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseWeight}>{formatKg(item.weight)} кг</Text>
      </View>
      <Text style={styles.hint}>
        {item.scheme.sets}×{item.scheme.reps}
        {item.usesBodyWeight && item.extraWeight != null
          ? ` · доп. ${formatKg(item.extraWeight)} кг`
          : ''}
        {item.progressionMode === 'pyramid' ? ' · пирамида' : ''}
      </Text>
      {item.workingSets.length > 0 ? (
        <View style={styles.setsList}>
          {item.workingSets.map(set => (
            <Text key={set.set} style={styles.setLine}>
              Подход {set.set}: {formatKg(set.weight)} кг × {set.reps}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export default function TrainingScreen() {
  const {userData, token, persistUserData, setUserData} = useSession();

  const training = useTrainingProgram({
    token: token || 'guest',
    userData,
    setUserData,
    saveUser: async data => persistUserData(data),
  });

  const state = useMemo(
    () =>
      deriveTrainingState({
        allSaved: training.allSaved,
        missingExercises: training.missingExercises,
        programDone: training.programDone,
        isMicrocycleBreak: training.isMicrocycleBreak,
        completedSessions: training.completedSessions,
        completedMicrocycle: training.completedMicrocycle,
        currentDayIdx: training.currentDayIdx,
        currentWeekIdx: training.currentWeekIdx,
        currentTrainingExercises: training.currentTrainingExercises,
        nextSessions: training.nextSessions,
        nextDayIdx: training.nextDayIdx,
        nextWeekIdx: training.nextWeekIdx,
        nextTrainingExercises: training.nextTrainingExercises,
      }),
    [training],
  );

  const currentDay = TRAINING_DAYS[training.currentDayIdx];
  const progress =
    training.totalSessions > 0 ? training.completedSessions / training.totalSessions : 0;

  if (!userData) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.muted}>Загружаем программу…</Text>
        </View>
      </SafeAreaView>
    );
  }

  const listData = state.kind === 'active' ? state.currentExercises : [];

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={listData}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Тренировка</Text>
              <Text style={styles.title}>Программа 2.0</Text>
              <Text style={styles.subtitle}>
                {training.totalSessions} сессий · {training.programSettings.daysPerWeek} дня в
                неделю
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.progressHeader}>
                <Text style={styles.sectionLabel}>Прогресс</Text>
                <Text style={styles.count}>
                  {training.completedSessions}/{training.totalSessions}
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, {width: `${Math.min(progress, 1) * 100}%`}]} />
              </View>
            </View>

            {state.kind === 'locked' ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Нужны 1ПМ</Text>
                <Text style={styles.body}>
                  Сначала посчитайте все упражнения в калькуляторе ({state.missingExercises.length}{' '}
                  осталось).
                </Text>
                {state.missingExercises.slice(0, 8).map(name => (
                  <Text key={name} style={styles.hint}>
                    · {name}
                  </Text>
                ))}
              </View>
            ) : null}

            {state.kind === 'break' ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Микроцикл {state.completedMicrocycle}</Text>
                <Text style={styles.body}>
                  Дни недели закрыты. Можно отдохнуть или идти дальше.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => training.setRestDismissed(true)}
                  style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}>
                  <Text style={styles.primaryText}>К следующему дню</Text>
                </Pressable>
              </View>
            ) : null}

            {state.kind === 'done' ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Готово</Text>
                <Text style={styles.body}>
                  Программа завершена ({state.completedSessions} сессий). Сброс начнёт цикл заново.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={training.handleReset}
                  style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                  <Text style={styles.ghostText}>Сбросить прогресс</Text>
                </Pressable>
              </View>
            ) : null}

            {state.kind === 'active' ? (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>
                  Неделя {state.currentWeekIdx + 1} · День {state.currentDayIdx + 1}
                </Text>
                <Text style={styles.dayName}>{currentDay?.name ?? 'День'}</Text>
                <Text style={styles.hint}>
                  Рабочие подходы ниже. Отметьте сессию, когда закончите.
                </Text>
              </View>
            ) : null}
          </View>
        }
        renderItem={({item}) => <ExerciseCard item={item} />}
        ListFooterComponent={
          state.kind === 'active' ? (
            <View style={styles.footer}>
              <Pressable
                accessibilityRole="button"
                onPress={training.handleComplete}
                style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryText}>Завершить сессию</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={training.handleReset}
                style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                <Text style={styles.ghostText}>Сбросить программу</Text>
              </Pressable>
            </View>
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
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    fontWeight: '500',
  },
  progressTrack: {
    backgroundColor: tokens.colors.bg,
    borderRadius: 4,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: tokens.colors.accent,
    height: 8,
  },
  body: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    lineHeight: 24,
  },
  hint: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 20,
  },
  dayName: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xl,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
    justifyContent: 'space-between',
  },
  exerciseName: {
    color: tokens.colors.text,
    flex: 1,
    fontSize: tokens.fontSize.md,
    fontWeight: '600',
  },
  exerciseWeight: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.lg,
    fontWeight: '600',
  },
  setsList: {
    gap: 4,
  },
  setLine: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
  },
  footer: {
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
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
  ghostButton: {
    alignItems: 'center',
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  ghostText: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.9,
    transform: [{scale: 0.98}],
  },
  muted: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
  },
});
