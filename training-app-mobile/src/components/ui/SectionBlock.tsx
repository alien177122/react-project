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
        <View style={styles.headerTop}>
          <View style={styles.numBadge}>
            <Text style={styles.num}>{num}</Text>
          </View>
          <View style={styles.headerLine} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    rowGap: theme.spacing.lg,
  },
  header: {
    rowGap: theme.spacing.sm,
  },
  headerTop: {
    ...mx.row,
    columnGap: theme.spacing.sm,
  },
  numBadge: {
    alignItems: 'center',
    backgroundColor: theme.colors.accentDim,
    borderColor: theme.colors.accent,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 42,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerLine: {
    backgroundColor: theme.colors.glassBorder,
    flex: 1,
    height: 1,
  },
  num: {
    ...mx.textEyebrow,
    color: theme.colors.accent,
    letterSpacing: 1.4,
  },
  title: {
    ...mx.textTitle,
    flex: 1,
  },
  body: {
    rowGap: theme.spacing.md,
  },
})
