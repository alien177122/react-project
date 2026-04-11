import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { AppLoadingScreen } from '../../src/components/ui/AppLoadingScreen'
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
      <AppLoadingScreen
        label="Tabs"
        message="Собираем навигационную оболочку и восстанавливаем пользовательский контекст."
        title="Загружаем мобильную оболочку"
      />
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
        tabBarActiveTintColor: theme.colors.accent,
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
          backgroundColor: 'rgba(11,15,26,0.96)',
          borderTopColor: theme.colors.glassBorder,
          borderTopWidth: 1,
          elevation: 0,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.12,
          shadowRadius: 18,
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
