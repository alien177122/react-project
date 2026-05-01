import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

import { tokens } from '@/theme/tokens';

type IconName = ComponentProps<typeof FontAwesome6>['name'];

function TabIcon({ color, name }: { color: string; name: IconName }) {
  return <FontAwesome6 color={color} name={name} size={18} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: tokens.colors.bg,
        },
        headerTitleStyle: {
          color: tokens.colors.text,
          fontSize: tokens.fontSize.lg,
          fontWeight: '600',
        },
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: tokens.colors.bg,
        },
        tabBarActiveTintColor: tokens.colors.accent,
        tabBarInactiveTintColor: tokens.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopColor: tokens.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: tokens.fontSize.xs,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Калькулятор',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="calculator" />,
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Тренировка',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="dumbbell" />,
        }}
      />
      <Tabs.Screen
        name="theory"
        options={{
          title: 'Теория',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="book-open" />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
