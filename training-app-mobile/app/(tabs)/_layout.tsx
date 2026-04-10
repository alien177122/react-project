import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Text, View } from 'react-native'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'

type TabRoute = 'calculator' | 'training' | 'theory' | 'files'
const TabIonicons = Ionicons as any

function tabIcon(routeName: TabRoute, color: string, focused: boolean) {
  let iconName = 'ellipse-outline'

  if (routeName === 'calculator') {
    iconName = focused ? 'calculator' : 'calculator-outline'
  } else if (routeName === 'training') {
    iconName = focused ? 'fitness' : 'fitness-outline'
  } else if (routeName === 'theory') {
    iconName = focused ? 'book' : 'book-outline'
  } else if (routeName === 'files') {
    iconName = focused ? 'folder' : 'folder-outline'
  }

  return <TabIonicons color={color} name={iconName} size={19} />
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
          tabBarIcon: ({ color, focused }) => tabIcon('calculator', color, focused),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Тренировка',
          tabBarIcon: ({ color, focused }) => tabIcon('training', color, focused),
        }}
      />
      <Tabs.Screen
        name="theory"
        options={{
          title: 'Теория',
          tabBarIcon: ({ color, focused }) => tabIcon('theory', color, focused),
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title: 'Файлы',
          tabBarIcon: ({ color, focused }) => tabIcon('files', color, focused),
        }}
      />
    </Tabs>
  )
}
