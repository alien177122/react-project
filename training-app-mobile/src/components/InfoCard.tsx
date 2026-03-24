import type { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../theme'

interface InfoCardProps extends PropsWithChildren {
  title: string
  subtitle?: string
  accentColor?: string
}

export function InfoCard({ title, subtitle, accentColor, children }: InfoCardProps) {
  return (
    <View style={[styles.card, accentColor ? { borderLeftColor: accentColor } : null]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderLeftColor: 'transparent',
    borderLeftWidth: 3,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: theme.spacing.xs,
  },
  body: {
    marginTop: theme.spacing.md,
  },
})
