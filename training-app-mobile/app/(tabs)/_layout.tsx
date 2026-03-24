import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'

export default function TabsLayout() {
  const { token, userName, sessionLoading } = useAuthSessionContext()

  if (sessionLoading) {
    return (
      <View style={{ alignItems: 'center', backgroundColor: theme.colors.bg, flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={{ color: theme.colors.muted, marginTop: 16 }}>Загружаем мобильную оболочку…</Text>
      </View>
    )
  }

  if (!token || !userName) {
    return <Redirect href="/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.bg },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen name="calculator" options={{ title: 'Калькулятор' }} />
      <Tabs.Screen name="training" options={{ title: 'Тренировка' }} />
      <Tabs.Screen name="theory" options={{ title: 'Теория' }} />
      <Tabs.Screen name="files" options={{ title: 'Файлы' }} />
    </Tabs>
  )
}
