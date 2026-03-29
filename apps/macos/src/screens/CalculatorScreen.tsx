import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {EXERCISES, EX_COUNT, TYPE_LABELS} from '@training/shared/data/exercises';
import {useCalculatorState} from '@training/shared/hooks/useCalculatorState';
import {calcWorkingWeight} from '@training/shared/utils/calc';
import ExerciseWheel from '../components/ExerciseWheel';
import ProgressionBlock from '../components/ProgressionBlock';
import {ScreenLayout} from '../components/ScreenLayout';
import VolumeDonut from '../components/VolumeDonut';
import {ActionButton} from '../components/ui/ActionButton';
import {SectionBlock} from '../components/ui/SectionBlock';
import {saveUser} from '../platform/api';
import {useAuthContext} from '../providers/AuthProvider';
import {colors, radius, spacing} from '../theme';

export function CalculatorScreen(): React.JSX.Element {
  const {token, userName, userData, setUserData, handleLogout} =
    useAuthContext();
  const {
    selectedExercise,
    selectExercise,
    testWeight,
    setTestWeight,
    testBodyWeight,
    setTestBodyWeight,
    testExtraWeight,
    setTestExtraWeight,
    testReps,
    setTestReps,
    activeResult,
    handleCalculate,
    handleDelete,
    handleSelectSaved,
  } = useCalculatorState({token, userName, userData, setUserData, saveUser});

  if (!userData) {
    return (
      <ScreenLayout
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
        subtitle="Загружаем данные пользователя и восстанавливаем расчёты.">
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        </View>
      </ScreenLayout>
    );
  }

  const config =
    EXERCISES[activeResult?.exerciseKey || selectedExercise] ??
    EXERCISES[selectedExercise];
  const weekRows = activeResult
    ? config.percentages.map((pct, i) => {
        const weight = calcWorkingWeight(activeResult.oneRM, pct, config);
        const scheme = config.weekSchemes[i];
        return {weight, scheme, totalReps: scheme.sets * scheme.reps};
      })
    : [];
  const firstWeek = weekRows[0];
  const lastWeek = weekRows[weekRows.length - 1];

  return (
    <ScreenLayout
      label="Тренировочный калькулятор"
      title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
      subtitle="Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами на 8 недель.">
      <View style={styles.userBar}>
        <View>
          <Text style={styles.userLabel}>Атлет</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <ActionButton
          label="Выйти"
          onPress={() => void handleLogout()}
          variant="ghost"
        />
      </View>

      <SectionBlock num="01" title="Тестовый подход">
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Упражнение</Text>
            <ExerciseWheel
              value={selectedExercise}
              onChange={selectExercise}
              savedExercises={userData.exercises}
            />
          </View>

          <View style={styles.formRow}>
            {EXERCISES[selectedExercise].isPullup ? (
              <>
                <View style={[styles.inputGroup, styles.col]}>
                  <Text style={styles.inputLabel}>Вес тела (кг)</Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={setTestBodyWeight}
                    placeholder="80"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={testBodyWeight}
                  />
                </View>
                <View style={[styles.inputGroup, styles.col]}>
                  <Text style={styles.inputLabel}>Доп. вес (кг)</Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={setTestExtraWeight}
                    placeholder="0"
                    placeholderTextColor={colors.muted}
                    style={styles.input}
                    value={testExtraWeight}
                  />
                </View>
              </>
            ) : (
              <View style={[styles.inputGroup, styles.col]}>
                <Text style={styles.inputLabel}>Вес (кг)</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={setTestWeight}
                  placeholder="80"
                  placeholderTextColor={colors.muted}
                  style={styles.input}
                  value={testWeight}
                />
              </View>
            )}
            <View style={[styles.inputGroup, styles.col]}>
              <Text style={styles.inputLabel}>Повторений</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={setTestReps}
                placeholder="6"
                placeholderTextColor={colors.muted}
                style={styles.input}
                value={testReps}
              />
            </View>
          </View>

          <ActionButton label="Рассчитать" onPress={handleCalculate} />
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            {EXERCISES[selectedExercise].isPullup
              ? 'Подтягивания: введи вес тела и дополнительный вес. В прогрессии показана только прибавка к весу тела.'
              : 'Инструкция: отказной подход в диапазоне 4–8 повторений. Калькулятор пересчитает 1ПМ и покажет рабочие веса на 8 недель.'}
          </Text>
        </View>
      </SectionBlock>

      {activeResult ? (
        <SectionBlock num="02" title={`Прогрессия — ${config.name}`}>
          <View style={styles.insightCard}>
            <Text style={styles.insightStrong}>
              Объём снижается по мере роста весов.
            </Text>
            {firstWeek && lastWeek ? (
              <Text style={styles.insightText}>
                {'\n'}Нед 1: {firstWeek.weight} кг · {firstWeek.scheme.sets}×
                {firstWeek.scheme.reps} = {firstWeek.totalReps} повт{'\n'}Нед 8:{' '}
                {lastWeek.weight} кг · {lastWeek.scheme.sets}×
                {lastWeek.scheme.reps} = {lastWeek.totalReps} повт
              </Text>
            ) : null}
          </View>

          <ProgressionBlock config={config} result={activeResult} />

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Расчётный 1ПМ</Text>
            <Text style={styles.resultValue}>
              {activeResult.oneRM}
              <Text style={styles.resultUnit}> кг</Text>
            </Text>
            <Text style={styles.resultMeta}>
              Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт
              · {TYPE_LABELS[config.type]} · Шаг: {config.step} кг ·{' '}
              {activeResult.date}
            </Text>
          </View>

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              Неделя 5 — волновой откат: вес слегка снижается, объём
              восстанавливается. Нажимай на строки прогрессии, чтобы подсветить
              соответствующую неделю в графике.
            </Text>
          </View>
        </SectionBlock>
      ) : null}

      {userData.exercises.length > 0 ? (
        <SectionBlock
          num="03"
          title={`Сохранённые · ${userData.exercises.length}/${EX_COUNT}`}>
          <View style={styles.savedGrid}>
            {userData.exercises.map(saved => {
              const exercise = EXERCISES[saved.exerciseKey];
              if (!exercise) return null;
              const isActive =
                activeResult?.exerciseKey === saved.exerciseKey;

              return (
                <Pressable
                  key={saved.exerciseKey}
                  onPress={() => handleSelectSaved(saved)}
                  style={({pressed}) => [
                    styles.savedItem,
                    isActive ? styles.savedItemActive : null,
                    pressed ? styles.savedItemPressed : null,
                  ]}>
                  <View style={styles.savedText}>
                    <Text style={styles.savedName}>{exercise.name}</Text>
                    <Text style={styles.savedInfo}>
                      {saved.testWeight} кг × {saved.testReps} повт ·{' '}
                      {saved.date}
                    </Text>
                  </View>
                  <View style={styles.savedActions}>
                    <Text style={styles.savedValue}>{saved.oneRM} кг</Text>
                    <ActionButton
                      label="×"
                      onPress={() => handleDelete(saved.exerciseKey)}
                      variant="danger"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </SectionBlock>
      ) : null}

      <SectionBlock num="04" title="Распределение объёма">
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Средние рабочие подходы за цикл, распределённые по мышечным группам.
            Нажимай на сектор или строку легенды, чтобы увидеть детали.
          </Text>
        </View>
        <VolumeDonut />
      </SectionBlock>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  loadingCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
  },
  loadingText: {color: colors.muted, fontSize: 16},
  userBar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    gap: spacing.md,
  },
  userLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  userName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  formRow: {flexDirection: 'row', gap: spacing.md},
  inputGroup: {gap: 8},
  col: {flex: 1},
  inputLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  noteBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  noteText: {color: colors.muted, fontSize: 14, lineHeight: 22},
  insightCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  insightStrong: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  insightText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  resultCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    gap: 10,
  },
  resultLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  resultValue: {color: colors.text, fontSize: 44, fontWeight: '900'},
  resultUnit: {color: colors.muted, fontSize: 24, fontWeight: '600'},
  resultMeta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  savedGrid: {gap: spacing.sm},
  savedItem: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  savedItemActive: {
    backgroundColor: colors.accentDim,
    borderColor: colors.accent,
  },
  savedItemPressed: {opacity: 0.86},
  savedText: {flex: 1, gap: 6},
  savedName: {color: colors.text, fontSize: 16, fontWeight: '700'},
  savedInfo: {color: colors.muted, fontSize: 13, lineHeight: 18},
  savedActions: {alignItems: 'flex-end', gap: 10},
  savedValue: {
    color: colors.text,
    fontFamily: 'Courier',
    fontSize: 15,
    fontWeight: '800',
  },
});
