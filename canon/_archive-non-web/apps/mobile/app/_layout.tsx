import {Stack} from 'expo-router';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {DarkTheme, ThemeProvider} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {SessionProvider, useSession} from '@/session/SessionContext';
import {tokens} from '@/theme/tokens';

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'auth',
};

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: tokens.colors.bg,
    card: tokens.colors.surface,
    border: tokens.colors.border,
    primary: tokens.colors.accent,
    text: tokens.colors.text,
  },
};

function RootNavigator() {
  const {sessionLoading} = useSession();

  if (sessionLoading) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={tokens.colors.accent} size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: tokens.colors.bg},
      }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="readiness" options={{presentation: 'modal'}} />
      <Stack.Screen name="modal" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={navigationTheme}>
        <SessionProvider>
          <StatusBar style="light" backgroundColor={tokens.colors.bg} />
          <RootNavigator />
        </SessionProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.bg,
  },
});
