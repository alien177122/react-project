import { Redirect, Tabs } from 'expo-router'
import type { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AppLoadingScreen } from '../../src/components/ui/AppLoadingScreen'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'
import { theme } from '../../src/theme'

type TabRoute = 'calculator' | 'training' | 'theory' | 'files'
type IoniconName = ComponentProps<typeof Ionicons>['name']

function tabIcon(routeName: TabRoute, color: string, focused: boolean) {
  let iconName: IoniconName = 'ellipse-outline'

  if (routeName === 'calculator') {
    iconName = focused ? 'calculator' : 'calculator-outline'
  } else if (routeName === 'training') {
    iconName = focused ? 'fitness' : 'fitness-outline'
  } else if (routeName === 'theory') {
    iconName = focused ? 'book' : 'book-outline'
  } else if (routeName === 'files') {
    iconName = focused ? 'folder' : 'folder-outline'
  }

  return <Ionicons color={color} name={iconName} size={19} />
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
          fontWeight: '600',
          letterSpacing: 0.4,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarBg,
          borderTopColor: theme.colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          elevation: 0,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      }}
    >
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarAccessibilityLabel: 'Calculator tab',
          tabBarButtonTestID: 'tab-calculator',
          tabBarIcon: ({ color, focused }) => tabIcon('calculator', color, focused),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Training',
          tabBarAccessibilityLabel: 'Training tab',
          tabBarButtonTestID: 'tab-training',
          tabBarIcon: ({ color, focused }) => tabIcon('training', color, focused),
        }}
      />
      <Tabs.Screen
        name="theory"
        options={{
          title: 'Theory',
          tabBarAccessibilityLabel: 'Theory tab',
          tabBarButtonTestID: 'tab-theory',
          tabBarIcon: ({ color, focused }) => tabIcon('theory', color, focused),
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          href: null,
          title: 'Files',
          tabBarIcon: ({ color, focused }) => tabIcon('files', color, focused),
        }}
      />
    </Tabs>
  )
}
