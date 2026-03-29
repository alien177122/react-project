import type { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme'

interface SectionBlockProps extends PropsWithChildren {
  num: string
  title: string
}

export function SectionBlock({ num, title, children }: SectionBlockProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.num}>{num}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    rowGap: theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    columnGap: theme.spacing.md,
    flexDirection: 'row',
    paddingBottom: theme.spacing.sm,
  },
  num: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  body: {
    rowGap: theme.spacing.md,
  },
})
