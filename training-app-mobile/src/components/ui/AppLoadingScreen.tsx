import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../theme'
import { ScreenBackground } from './ScreenBackground'
import { GlossyCard } from './GlossyCard'

interface AppLoadingScreenProps {
  label?: string
  title: string
  message?: string
}

export function AppLoadingScreen({
  label = 'Loading',
  title,
  message,
}: AppLoadingScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScreenBackground>
        <View style={styles.container}>
          <GlossyCard contentStyle={styles.card} variant="accent">
            <Text style={styles.label}>{label}</Text>
            <ActivityIndicator color={theme.colors.accent} size="large" />
            <Text style={styles.title}>{title}</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
          </GlossyCard>
        </View>
      </ScreenBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: theme.colors.bg,
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    alignItems: 'center',
    maxWidth: 360,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
    rowGap: theme.spacing.md,
    width: '100%',
  },
  label: {
    color: theme.colors.orange,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: '800',
    textAlign: 'center',
  },
  message: {
    color: theme.colors.muted,
    fontSize: theme.typography.data,
    lineHeight: 20,
    textAlign: 'center',
  },
})
