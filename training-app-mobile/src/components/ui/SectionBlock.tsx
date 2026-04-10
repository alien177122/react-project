import type { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { mx, theme } from '../../theme'

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
    ...mx.row,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    columnGap: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  num: {
    ...mx.textEyebrow,
    color: theme.colors.accent,
    letterSpacing: 2,
  },
  title: {
    ...mx.textTitleLg,
    flex: 1,
  },
  body: {
    rowGap: theme.spacing.md,
  },
})
