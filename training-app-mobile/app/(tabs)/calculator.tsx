import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import ExerciseWheel from '../../src/components/ExerciseWheel'
import ProgressionBlock from '../../src/components/ProgressionBlock'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import VolumeDonut from '../../src/components/VolumeDonut'
import { ActionButton } from '../../src/components/ui/ActionButton'
import { GlossyCard } from '../../src/components/ui/GlossyCard'
import { SectionBlock } from '../../src/components/ui/SectionBlock'
import { EXERCISES, EX_COUNT, TYPE_LABELS } from '../../src/data/exercises'
import { getExerciseNote, getFormulaLabel } from '../../src/data/exerciseNotes'
import { useCalculatorState } from '../../src/hooks/useCalculatorState'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'
import { calcWorkingWeight } from '../../src/utils/calc'

interface ExerciseNoteBoxProps {
  exerciseKey: string
  testWeight: number
  testReps: number
  oneRM: number
  exerciseType: string
}

function ExerciseNoteBox({ exerciseKey, testWeight, testReps, oneRM, exerciseType }: ExerciseNoteBoxProps) {
  const note = getExerciseNote(exerciseKey, exerciseType)
  const formulaLabel = getFormulaLabel(testReps)

  return (
    <GlossyCard contentStyle={noteBoxStyles.container} variant="accent">
      <View style={noteBoxStyles.row}>
        <Text style={noteBoxStyles.label}>Откуда взят 1ПМ</Text>
        <Text style={noteBoxStyles.body}>
          Из теста{' '}
          <Text style={noteBoxStyles.code}>{testWeight} кг × {testReps} повт</Text>
          {' '}по формуле ({formulaLabel}) получается{' '}
          <Text style={noteBoxStyles.strong}>{oneRM} кг</Text>.
        </Text>
      </View>

      <View style={noteBoxStyles.divider} />

      <View style={noteBoxStyles.row}>
        <Text style={noteBoxStyles.label}>Почему такая схема</Text>
        <Text style={noteBoxStyles.body}>{note.schemeRationale}</Text>
      </View>

      {note.practicalTip ? (
        <>
          <View style={noteBoxStyles.divider} />
          <View style={noteBoxStyles.row}>
            <Text style={noteBoxStyles.label}>Практический момент</Text>
            <Text style={noteBoxStyles.body}>{note.practicalTip}</Text>
          </View>
        </>
      ) : null}
    </GlossyCard>
  )
}

export default function CalculatorScreen() {
  const { token, userName, userData, setUserData, handleLogout } = useAuthSessionContext()
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
  } = useCalculatorState({ token, userName, userData, setUserData })

  if (!userData) {
    return (
      <ScreenLayout
        label="Тренировочный калькулятор"
        title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
        subtitle="Загружаем данные пользователя и восстанавливаем расчёты."
      >
        <GlossyCard contentStyle={styles.loadingCard}>
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        </GlossyCard>
      </ScreenLayout>
    )
  }

  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise] ?? EXERCISES[selectedExercise]
  const weekRows = activeResult
    ? config.percentages.map((pct, index) => {
        const weight = calcWorkingWeight(activeResult.oneRM, pct, config)
        const scheme = config.weekSchemes[index]
        return { weight, scheme, totalReps: scheme.sets * scheme.reps }
      })
    : []

  const firstWeek = weekRows[0]
  const lastWeek = weekRows[weekRows.length - 1]

  return (
    <ScreenLayout
      label="Тренировочный калькулятор"
      title="ПЕРИОДИЗАЦИЯ 8 НЕДЕЛЬ"
      subtitle="Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами на 8 недель."
    >
      <GlossyCard contentStyle={styles.userBar}>
        <View>
          <Text style={styles.userLabel}>Атлет</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <ActionButton label="Выйти" onPress={() => void handleLogout()} variant="ghost" />
      </GlossyCard>

      <SectionBlock num="01" title="Тестовый подход">
        <GlossyCard contentStyle={styles.formCard} variant="accent">
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Упражнение</Text>
            <ExerciseWheel
              value={selectedExercise}
              onChange={selectExercise}
              savedExercises={userData.exercises}
            />
          </View>

          {EXERCISES[selectedExercise].isPullup ? (
            <View style={styles.twoCols}>
              <View style={[styles.inputGroup, styles.col]}>
                <Text style={styles.inputLabel}>Вес тела (кг)</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={setTestBodyWeight}
                  placeholder="80"
                  placeholderTextColor={theme.colors.muted}
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
                  placeholderTextColor={theme.colors.muted}
                  style={styles.input}
                  value={testExtraWeight}
                />
              </View>
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Вес (кг)</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={setTestWeight}
                placeholder="80"
                placeholderTextColor={theme.colors.muted}
                style={styles.input}
                value={testWeight}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Повторений</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={setTestReps}
              placeholder="6"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              value={testReps}
            />
          </View>

          <ActionButton label="Рассчитать" onPress={handleCalculate} />
        </GlossyCard>

        <GlossyCard contentStyle={styles.noteBox}>
          <Text style={styles.noteText}>
            {EXERCISES[selectedExercise].isPullup
              ? 'Подтягивания: введи вес тела и дополнительный вес. В прогрессии показана только прибавка к весу тела.'
              : 'Инструкция: отказной подход в диапазоне 4–8 повторений. Калькулятор пересчитает 1ПМ и покажет рабочие веса на 8 недель.'}
          </Text>
        </GlossyCard>
      </SectionBlock>

      {activeResult ? (
        <SectionBlock num="02" title={`Прогрессия — ${config.name}`}>
          <GlossyCard contentStyle={styles.insightCard} variant="accent">
            <Text style={styles.insightStrong}>Объём снижается по мере роста весов.</Text>
            {firstWeek && lastWeek ? (
              <Text style={styles.insightText}>
                {'\n'}Нед 1: {firstWeek.weight} кг · {firstWeek.scheme.sets}×{firstWeek.scheme.reps} = {firstWeek.totalReps} повт
                {'\n'}Нед 8: {lastWeek.weight} кг · {lastWeek.scheme.sets}×{lastWeek.scheme.reps} = {lastWeek.totalReps} повт
              </Text>
            ) : null}
          </GlossyCard>

          <ProgressionBlock config={config} result={activeResult} />

          <GlossyCard contentStyle={styles.resultCard} variant="success">
            <Text style={styles.resultLabel}>Расчётный 1ПМ</Text>
            <Text style={styles.resultValue}>
              {activeResult.oneRM}
              <Text style={styles.resultUnit}> кг</Text>
            </Text>
            <Text style={styles.resultMeta}>
              Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт · {TYPE_LABELS[config.type]} · Шаг: {config.step} кг · {activeResult.date}
            </Text>
          </GlossyCard>

          <GlossyCard contentStyle={styles.noteBox}>
            <Text style={styles.noteText}>
              Неделя 5 — волновой откат: вес слегка снижается, объём восстанавливается. Нажимай на строки прогрессии, чтобы подсветить соответствующую неделю в графике.
            </Text>
          </GlossyCard>

          <ExerciseNoteBox
            exerciseKey={activeResult.exerciseKey}
            testWeight={activeResult.testWeight}
            testReps={activeResult.testReps}
            oneRM={activeResult.oneRM}
            exerciseType={config.type}
          />
        </SectionBlock>
      ) : null}

      {userData.exercises.length > 0 ? (
        <SectionBlock num="03" title={`Сохранённые · ${userData.exercises.length}/${EX_COUNT}`}>
          <View style={styles.savedList}>
            {userData.exercises.map((saved) => {
              const exercise = EXERCISES[saved.exerciseKey]
              if (!exercise) return null
              const isActive = activeResult?.exerciseKey === saved.exerciseKey

              return (
                <Pressable
                  key={saved.exerciseKey}
                  onPress={() => handleSelectSaved(saved)}
                  style={({ pressed }) => [
                    styles.savedItem,
                    isActive ? styles.savedItemActive : null,
                    pressed ? styles.savedItemPressed : null,
                  ]}
                >
                  <View style={styles.savedText}>
                    <Text style={styles.savedName}>{exercise.name}</Text>
                    <Text style={styles.savedInfo}>
                      {saved.testWeight} кг × {saved.testReps} повт · {saved.date}
                    </Text>
                  </View>
                  <View style={styles.savedActions}>
                    <Text style={styles.savedValue}>{saved.oneRM} кг</Text>
                    <ActionButton label="×" onPress={() => handleDelete(saved.exerciseKey)} variant="danger" />
                  </View>
                </Pressable>
              )
            })}
          </View>
        </SectionBlock>
      ) : null}

      <SectionBlock num="04" title="Распределение объёма">
        <GlossyCard contentStyle={styles.noteBox}>
          <Text style={styles.noteText}>
            Средние рабочие подходы за цикл, распределённые по мышечным группам. Нажимай на сектор или строку легенды, чтобы увидеть детали.
          </Text>
        </GlossyCard>
        <VolumeDonut />
      </SectionBlock>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  loadingCard: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    color: theme.colors.muted,
    fontSize: 16,
  },
  userBar: {
    alignItems: 'center',
    columnGap: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  userLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  userName: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  formCard: {
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  inputGroup: {
    rowGap: 8,
  },
  inputLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  twoCols: {
    columnGap: theme.spacing.md,
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  noteBox: {
    padding: theme.spacing.md,
  },
  noteText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  insightCard: {
    padding: theme.spacing.md,
  },
  insightStrong: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  insightText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  resultCard: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    rowGap: 10,
  },
  resultLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  resultValue: {
    color: theme.colors.text,
    fontSize: 44,
    fontWeight: '900',
  },
  resultUnit: {
    color: theme.colors.muted,
    fontSize: 24,
    fontWeight: '600',
  },
  resultMeta: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  savedList: {
    rowGap: theme.spacing.sm,
  },
  savedItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    columnGap: theme.spacing.md,
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  savedItemActive: {
    backgroundColor: theme.colors.accentDim,
    borderColor: theme.colors.accent,
  },
  savedItemPressed: {
    opacity: 0.86,
  },
  savedText: {
    flex: 1,
    rowGap: 6,
  },
  savedName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  savedInfo: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  savedActions: {
    alignItems: 'flex-end',
    rowGap: 10,
  },
  savedValue: {
    color: theme.colors.text,
    fontFamily: 'Courier',
    fontSize: 15,
    fontWeight: '800',
  },
})

const noteBoxStyles = StyleSheet.create({
  container: {
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  row: {
    rowGap: 6,
  },
  label: {
    color: theme.colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  body: {
    color: '#b090c0',
    fontSize: 13,
    lineHeight: 20,
  },
  strong: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  code: {
    color: '#e080c8',
    fontFamily: 'Courier',
    fontSize: 12,
  },
  divider: {
    backgroundColor: '#2a1a38',
    height: 1,
  },
})
