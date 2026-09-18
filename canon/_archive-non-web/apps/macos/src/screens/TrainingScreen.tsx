import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EX_COUNT, TRAINING_DAYS} from '@training/shared/data/exercises';
import {useTrainingProgram} from '@training/shared/hooks/useTrainingProgram';
import {ScreenLayout} from '../components/ScreenLayout';
import TrainingDayCard from '../components/TrainingDayCard';
import {ActionButton} from '../components/ui/ActionButton';
import {SectionBlock} from '../components/ui/SectionBlock';
import {saveUser} from '../platform/api';
import {useAuthContext} from '../providers/AuthProvider';
import {colors, radius, spacing} from '../theme';

export function TrainingScreen(): React.JSX.Element {
  const {token, userData, setUserData} = useAuthContext();
  const {
    allSaved,
    missingExercises,
    completedSessions,
    currentDayIdx,
    currentWeekIdx,
    programDone,
    nextSessions,
    nextDayIdx,
    nextWeekIdx,
    completedMicrocycle,
    isMicrocycleBreak,
    currentTrainingExercises,
    nextTrainingExercises,
    handleComplete,
    handleReset,
    setRestDismissed,
  } = useTrainingProgram({token, userData, setUserData, saveUser});

  return (
    <ScreenLayout
      label="Training"
      title="Тренировочный цикл"
      subtitle="Текущая тренировка, прогресс программы и окно отдыха между микроциклами в одном разделе.">
      {!allSaved ? (
        <View style={styles.lockedView}>
          <Text style={styles.lockedIcon}>🔒</Text>
          <Text style={styles.lockedTitle}>Введи 1ПМ для всех упражнений</Text>
          <Text style={styles.lockedDesc}>
            Вкладка тренировки станет доступна, когда рассчитаны 1ПМ для всех{' '}
            {EX_COUNT} упражнений.
          </Text>
          <View style={styles.lockedMissing}>
            {missingExercises.map(name => (
              <Text key={name} style={styles.lockedItem}>— {name}</Text>
            ))}
          </View>
        </View>
      ) : programDone ? (
        <SectionBlock num="01" title="Программа завершена">
          <View style={styles.completeCard}>
            <Text style={styles.completeIcon}>🏆</Text>
            <Text style={styles.completeTitle}>8 недель пройдено</Text>
            <Text style={styles.completeStat}>
              {completedSessions} тренировок · 8 недель · 3 дня
            </Text>
            <Text style={styles.completeDesc}>
              Пересчитай 1ПМ по контрольным подходам и начни новый цикл.
            </Text>
            <ActionButton label="Начать новый цикл" onPress={handleReset} />
          </View>
        </SectionBlock>
      ) : (
        <>
          <View style={styles.progressWrap}>
            <View style={styles.progressLabel}>
              <Text style={styles.progressText}>Прогресс программы</Text>
              <Text style={styles.progressText}>
                {completedSessions} / 24 тренировок
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${(completedSessions / 24) * 100}%`},
                ]}
              />
            </View>
          </View>

          {isMicrocycleBreak ? (
            <SectionBlock
              num="01"
              title={`Завершён ${completedMicrocycle}-й микроцикл`}>
              <View style={styles.restCard}>
                <Text style={styles.restIcon}>🎉</Text>
                <Text style={styles.restTitle}>Праздник! Время отдохнуть</Text>
                <Text style={styles.restSubtitle}>
                  {completedMicrocycle}-й микроцикл из 8 пройден —{' '}
                  {completedSessions} тренировок позади
                </Text>
                <View style={styles.restRec}>
                  <Text style={styles.restRecTitle}>Рекомендации на 4–8 дней</Text>
                  <Text style={styles.restList}>
                    • Полный отдых от силовых тренировок
                  </Text>
                  <Text style={styles.restList}>
                    • Поддерживай лёгкое кардио: ходьба, бег, велосипед
                  </Text>
                  <Text style={styles.restList}>• Следи за сном и питанием</Text>
                  <Text style={styles.restList}>
                    • Мобилизация и растяжка — без фанатизма
                  </Text>
                </View>
                <Text style={styles.restNext}>
                  Следующий микроцикл:{' '}
                  <Text style={styles.restNextStrong}>
                    {completedMicrocycle + 1}-й
                  </Text>{' '}
                  · День 1 · {TRAINING_DAYS[0].name}
                </Text>
              </View>
              <ActionButton
                label="Начать следующий микроцикл"
                onPress={() => setRestDismissed(true)}
              />
            </SectionBlock>
          ) : (
            <>
              <SectionBlock num="01" title="Текущая тренировка">
                <TrainingDayCard
                  dayDef={TRAINING_DAYS[currentDayIdx]}
                  weekIndex={currentWeekIdx}
                  exercises={currentTrainingExercises}
                />
                <ActionButton
                  label="Завершить тренировку"
                  onPress={handleComplete}
                />
              </SectionBlock>

              {nextSessions < 24 ? (
                <SectionBlock num="02" title="Следующая тренировка">
                  <Text style={styles.previewLabel}>Предпросмотр</Text>
                  <TrainingDayCard
                    dayDef={TRAINING_DAYS[nextDayIdx]}
                    weekIndex={nextWeekIdx}
                    exercises={nextTrainingExercises}
                    isPreview
                  />
                </SectionBlock>
              ) : null}
            </>
          )}
        </>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  lockedView: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    gap: 14,
  },
  lockedIcon: {
    fontSize: 40,
  },
  lockedTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  lockedDesc: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  lockedMissing: {gap: 8, width: '100%'},
  lockedItem: {color: colors.text, fontSize: 15},
  completeCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    gap: 12,
  },
  completeIcon: {
    fontSize: 44,
  },
  completeTitle: {color: colors.text, fontSize: 28, fontWeight: '800'},
  completeStat: {color: colors.orange, fontFamily: 'Courier', fontSize: 15, fontWeight: '700'},
  completeDesc: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  progressWrap: {gap: 10},
  progressLabel: {flexDirection: 'row', justifyContent: 'space-between'},
  progressText: {color: colors.muted, fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase'},
  progressBar: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 6, borderWidth: 1, height: 10, overflow: 'hidden'},
  progressFill: {backgroundColor: colors.accent, height: '100%'},
  restCard: {alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, padding: spacing.lg, gap: spacing.md},
  restIcon: {
    fontSize: 36,
  },
  restTitle: {color: colors.text, fontSize: 26, fontWeight: '800'},
  restSubtitle: {color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center'},
  restRec: {backgroundColor: 'rgba(58,255,184,0.08)', borderColor: 'rgba(58,255,184,0.18)', borderRadius: radius.md, borderWidth: 1, padding: spacing.md, gap: 8, width: '100%'},
  restRecTitle: {color: colors.green, fontSize: 16, fontWeight: '800', textTransform: 'uppercase'},
  restList: {color: colors.text, fontSize: 14, lineHeight: 20},
  restNext: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  restNextStrong: {
    color: colors.text,
    fontWeight: '800',
  },
  previewLabel: {color: colors.muted, fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase'},
});
