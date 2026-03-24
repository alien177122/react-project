import { Pressable, Text, View } from 'react-native'
import { InfoCard } from '../../src/components/InfoCard'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import { useTrainingProgram } from '../../src/hooks/useTrainingProgram'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'

export default function TrainingScreen() {
  const { token, userData, setUserData, handleLogout } = useAuthSessionContext()
  const {
    completedSessions,
    currentDayIdx,
    currentWeekIdx,
    completedMicrocycle,
    isMicrocycleBreak,
    handleComplete,
    handleReset,
  } = useTrainingProgram({ token, userData, setUserData })

  return (
    <ScreenLayout
      label="Training"
      title="Логика прогрессии уже живая"
      subtitle="Этот экран пока без финального UI, но сам счётчик тренировок и микрoциклов уже работает на мобильном слое."
    >
      <InfoCard accentColor={theme.colors.green} title="Прогресс цикла">
        <View style={{ rowGap: 10 }}>
          <Text style={{ color: theme.colors.text, fontSize: 15 }}>Завершено тренировок: {completedSessions}</Text>
          <Text style={{ color: theme.colors.text, fontSize: 15 }}>Текущий день: {currentDayIdx + 1}</Text>
          <Text style={{ color: theme.colors.text, fontSize: 15 }}>Текущая неделя: {currentWeekIdx + 1}</Text>
          <Text style={{ color: theme.colors.text, fontSize: 15 }}>Завершённый микроцикл: {completedMicrocycle || 0}</Text>
          <Text style={{ color: theme.colors.orange, fontSize: 15 }}>
            {isMicrocycleBreak ? 'Сейчас окно отдыха между микроциклами' : 'Рабочий режим'}
          </Text>
        </View>
      </InfoCard>

      <InfoCard title="Smoke actions" subtitle="Временные кнопки для проверки, что state и сохранение на API связаны корректно.">
        <View style={{ columnGap: 12, flexDirection: 'row' }}>
          <Pressable onPress={handleComplete} style={({ pressed }) => [buttonStyles.primary, pressed ? buttonStyles.pressed : null]}>
            <Text style={buttonStyles.primaryText}>+1 тренировка</Text>
          </Pressable>
          <Pressable onPress={handleReset} style={({ pressed }) => [buttonStyles.ghost, pressed ? buttonStyles.pressed : null]}>
            <Text style={buttonStyles.ghostText}>Сбросить</Text>
          </Pressable>
        </View>
      </InfoCard>

      <InfoCard title="Сессия">
        <Pressable onPress={() => void handleLogout()} style={({ pressed }) => [buttonStyles.ghost, pressed ? buttonStyles.pressed : null]}>
          <Text style={buttonStyles.ghostText}>Выйти из мобильной сессии</Text>
        </Pressable>
      </InfoCard>
    </ScreenLayout>
  )
}

const buttonStyles = {
  primary: {
    alignItems: 'center' as const,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    flex: 1,
    paddingVertical: 14,
  },
  primaryText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800' as const,
  },
  ghost: {
    alignItems: 'center' as const,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14,
  },
  ghostText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  pressed: {
    opacity: 0.85,
  },
}
