import type { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { mx, theme } from '../theme'

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
    ...mx.card,
    borderLeftColor: 'transparent',
    borderLeftWidth: 3,
    padding: theme.spacing.md,
  },
  title: {
    ...mx.textSubhead,
  },
  subtitle: {
    ...mx.textSmall,
    color: theme.colors.muted,
    lineHeight: 18,
    marginTop: theme.spacing.xs,
  },
  body: {
    marginTop: theme.spacing.md,
  },
})
