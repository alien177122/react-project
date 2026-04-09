import type { PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenBackground } from './ui/ScreenBackground'
import { theme } from '../theme'

interface ScreenLayoutProps extends PropsWithChildren {
  label: string
  title: string
  subtitle: string
}

export function ScreenLayout({ label, title, subtitle, children }: ScreenLayoutProps) {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
          <View style={styles.inner}>
            <View style={styles.hero}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View style={styles.body}>{children}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  inner: {
    alignSelf: 'center',
    maxWidth: theme.layout.contentMaxWidth,
    width: '100%',
  },
  hero: {
    borderLeftColor: theme.colors.accent,
    borderLeftWidth: 3,
    paddingLeft: theme.spacing.md,
  },
  label: {
    color: theme.colors.orange,
    fontSize: theme.typography.eyebrow,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.hero,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    lineHeight: 22,
    maxWidth: 760,
    marginTop: theme.spacing.md,
  },
  body: {
    marginTop: theme.spacing.xl,
    rowGap: theme.spacing.md,
  },
})
