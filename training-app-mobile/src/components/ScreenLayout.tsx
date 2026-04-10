import type { PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { mx, theme } from '../theme'

interface ScreenLayoutProps extends PropsWithChildren {
  label: string
  title: string
  subtitle: string
}

export function ScreenLayout({ label, title, subtitle, children }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    ...mx.fill,
    backgroundColor: theme.colors.bg,
  },
  scroll: {
    ...mx.fill,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  hero: {
    ...mx.accentBorderLeft,
    paddingLeft: theme.spacing.md,
  },
  label: {
    ...mx.textEyebrow,
    color: theme.colors.orange,
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...mx.textHero,
  },
  subtitle: {
    ...mx.textBodyMuted,
    marginTop: theme.spacing.md,
  },
  body: {
    marginTop: theme.spacing.xl,
    rowGap: theme.spacing.md,
  },
})
