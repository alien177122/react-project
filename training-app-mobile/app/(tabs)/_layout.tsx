import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'

function tabIcon(routeName: 'calculator' | 'training' | 'theory' | 'files', color: string) {
  let icon = '•'

  switch (routeName) {
    case 'calculator':
      icon = '🧮'
      break
    case 'training':
      icon = '🏋️'
      break
    case 'theory':
      icon = '📘'
      break
    case 'files':
      icon = '📂'
      break
  }

  return <Text style={{ color, fontSize: 18 }}>{icon}</Text>
}

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
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingBottom: 6,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Калькулятор',
          tabBarIcon: ({ color }) => tabIcon('calculator', color),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Тренировка',
          tabBarIcon: ({ color }) => tabIcon('training', color),
        }}
      />
      <Tabs.Screen
        name="theory"
        options={{
          title: 'Теория',
          tabBarIcon: ({ color }) => tabIcon('theory', color),
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title: 'Файлы',
          tabBarIcon: ({ color }) => tabIcon('files', color),
        }}
      />
    </Tabs>
  )
}
