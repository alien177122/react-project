import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {Link, Redirect, Tabs, type Href} from 'expo-router';
import type {ComponentProps} from 'react';
import {Pressable, Text} from 'react-native';

import {useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';

type IconName = ComponentProps<typeof FontAwesome6>['name'];

function TabIcon({color, name}: {color: string; name: IconName}) {
  return <FontAwesome6 color={color} name={name} size={18} />;
}

function HeaderAccount() {
  const {isGuest, userName, handleLogout} = useSession();

  if (isGuest) {
    return (
      <Link href={'/auth' as Href} asChild>
        <Pressable accessibilityRole="button" hitSlop={8} style={{paddingHorizontal: 12}}>
          <Text style={{color: tokens.colors.accent, fontSize: 14, fontWeight: '600'}}>Войти</Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      onPress={() => {
        void handleLogout();
      }}
      style={{paddingHorizontal: 12}}>
      <Text style={{color: tokens.colors.textSecondary, fontSize: 14, fontWeight: '500'}}>
        {userName || 'Выйти'}
      </Text>
    </Pressable>
  );
}

export default function TabLayout() {
  const {sessionLoading, token, isGuest} = useSession();

  if (!sessionLoading && !token && !isGuest) {
    return <Redirect href={'/auth' as Href} />;
  }

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
        headerRight: () => <HeaderAccount />,
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
      }}>
      <Tabs.Screen
        name="training"
        options={{
          title: 'Тренировка',
          tabBarIcon: ({color}) => <TabIcon color={color} name="dumbbell" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Калькулятор',
          tabBarIcon: ({color}) => <TabIcon color={color} name="calculator" />,
        }}
      />
      <Tabs.Screen
        name="theory"
        options={{
          title: 'Теория',
          tabBarIcon: ({color}) => <TabIcon color={color} name="book-open" />,
        }}
      />
      <Tabs.Screen
        name="split"
        options={{
          title: 'Сплит',
          tabBarIcon: ({color}) => <TabIcon color={color} name="layer-group" />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Журнал',
          tabBarIcon: ({color}) => <TabIcon color={color} name="book" />,
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
