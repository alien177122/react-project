import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Не найдено' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Экран не найден</Text>
        <Link href="/">
          <Text style={styles.link}>Вернуться в калькулятор</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.bg,
  },
  title: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xl,
    fontWeight: '600',
  },
  link: {
    marginTop: tokens.spacing.md,
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.md,
    fontWeight: '500',
  },
});
