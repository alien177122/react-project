import { Redirect } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'
import { useAuthSessionContext } from '../src/providers/AuthSessionProvider'
import { theme } from '../src/theme'

export default function IndexScreen() {
  const { token, userName, sessionLoading } = useAuthSessionContext()

  if (sessionLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.bg,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={{ color: theme.colors.muted, marginTop: 16 }}>
          Проверяем сессию…
        </Text>
      </View>
    )
  }

  if (token && userName) {
    return <Redirect href="/(tabs)/calculator" />
  }

  return <Redirect href="/login" />
}
