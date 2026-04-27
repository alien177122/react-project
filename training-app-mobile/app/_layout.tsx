import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ReduceMotion, ReducedMotionConfig } from 'react-native-reanimated'
import { AuthSessionProvider } from '../src/providers/AuthSessionProvider'
import { theme } from '../src/theme'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthSessionProvider>
        <ReducedMotionConfig mode={ReduceMotion.System} />
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.bg },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="__design" />
        </Stack>
      </AuthSessionProvider>
    </SafeAreaProvider>
  )
}
