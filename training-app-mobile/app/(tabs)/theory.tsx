import { Text, View } from 'react-native'
import { InfoCard } from '../../src/components/InfoCard'
import { ScreenLayout } from '../../src/components/ScreenLayout'
import { SUPPLEMENT_TIERS, THEORY_CONCEPTS } from '../../src/data/theory'
import { theme } from '../../src/theme'

export default function TheoryScreen() {
  return (
    <ScreenLayout
      label="Theory"
      title="Контент уже перенесён"
      subtitle="Вкладка теории пока не переписана как полноценный мобильный контент-ридер, но сами данные уже находятся в mobile-проекте."
    >
      <InfoCard accentColor={theme.colors.orange} title="Базовые понятия">
        <View style={{ rowGap: 12 }}>
          {THEORY_CONCEPTS.slice(0, 3).map(item => (
            <View key={item.title}>
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '700', marginBottom: 6 }}>{item.title}</Text>
              <Text style={{ color: theme.colors.muted, fontSize: 14, lineHeight: 20 }}>{item.body}</Text>
            </View>
          ))}
        </View>
      </InfoCard>

      <InfoCard title="Tier List добавок" subtitle={`Секций в tier-list: ${SUPPLEMENT_TIERS.length}`}>
        <View style={{ rowGap: 10 }}>
          {SUPPLEMENT_TIERS.map(tier => (
            <Text key={tier.tier} style={{ color: theme.colors.text, fontSize: 15 }}>
              {tier.tier}: <Text style={{ color: tier.color }}>{tier.label}</Text>
            </Text>
          ))}
        </View>
      </InfoCard>
    </ScreenLayout>
  )
}
