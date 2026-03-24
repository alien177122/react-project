import { Text, View } from 'react-native'
import { EXERCISES, EX_COUNT, TYPE_LABELS } from '../../src/data/exercises'
import { InfoCard } from '../../src/components/InfoCard'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'

export default function CalculatorScreen() {
  const { userData } = useAuthSessionContext()
  const typeDistribution = Object.values(EXERCISES).reduce<Record<string, number>>((acc, exercise) => {
    acc[exercise.type] = (acc[exercise.type] ?? 0) + 1
    return acc
  }, {})

  return (
    <ScreenLayout
      label="Calculator"
      title="Shared logic перенесена"
      subtitle="Экран пока служит migration-shell: данные упражнений и расчётные утилиты уже доступны внутри Expo-проекта."
    >
      <InfoCard
        accentColor={theme.colors.accent}
        subtitle={`Сейчас в профиле сохранено упражнений: ${userData?.exercises.length ?? 0}`}
        title="Статус миграции"
      >
        <Text style={{ color: theme.colors.text, fontSize: 15, lineHeight: 22 }}>
          Портированы `types`, `data`, `utils/calc`, `utils/training`, `utils/muscles`, `utils/geometry`
          и базовые hooks состояния.
        </Text>
      </InfoCard>

      <InfoCard title="Каталог упражнений" subtitle={`Всего упражнений: ${EX_COUNT}`}>
        <View style={{ rowGap: 10 }}>
          {Object.entries(typeDistribution).map(([type, count]) => (
            <Text key={type} style={{ color: theme.colors.text, fontSize: 15 }}>
              {TYPE_LABELS[type]}: <Text style={{ color: theme.colors.orange }}>{count}</Text>
            </Text>
          ))}
        </View>
      </InfoCard>
    </ScreenLayout>
  )
}
