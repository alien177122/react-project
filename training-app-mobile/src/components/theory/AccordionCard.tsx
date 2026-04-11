import { memo, useState } from 'react'
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme'

interface AccordionCardProps {
  title: string
  body?: string
  pattern?: string
  bullets?: string[]
  tag?: string
  tagColor?: string
  defaultOpen?: boolean
}

export const AccordionCard = memo(function AccordionCard({
  title,
  body,
  pattern,
  bullets,
  tag,
  tagColor,
  defaultOpen = false,
}: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpen(prev => !prev)
  }

  const accentColor = tagColor ?? theme.colors.accent

  return (
    <Pressable
      accessibilityHint={open ? 'Свернуть карточку' : 'Развернуть карточку'}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      style={({ pressed }) => [styles.card, open && styles.cardOpen, pressed && styles.cardPressed]}
      onPress={toggle}
    >
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          {tag ? (
            <View style={[styles.tag, { backgroundColor: accentColor + '1A', borderColor: accentColor }]}>
              <Text allowFontScaling maxFontSizeMultiplier={1.3} style={[styles.tagText, { color: accentColor }]}>{tag}</Text>
            </View>
          ) : null}
          <Text allowFontScaling maxFontSizeMultiplier={1.4} style={styles.title}>{title}</Text>
        </View>
        <Text allowFontScaling={false} style={[styles.chevron, open && styles.chevronOpen]}>›</Text>
      </View>

      {open ? (
        <View style={styles.body}>
          {body ? <Text allowFontScaling maxFontSizeMultiplier={1.5} style={styles.bodyText}>{body}</Text> : null}
          {pattern ? (
            <View style={styles.patternBox}>
              <Text allowFontScaling maxFontSizeMultiplier={1.3} style={styles.patternText}>{pattern}</Text>
            </View>
          ) : null}
          {bullets?.map((bullet, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text allowFontScaling={false} style={styles.bulletDot}>•</Text>
              <Text allowFontScaling maxFontSizeMultiplier={1.5} style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  )
})

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardOpen: {
    borderColor: theme.colors.accent + '55',
    backgroundColor: 'rgba(255,107,53,0.05)',
  },
  cardPressed: {
    opacity: 0.88,
  },
  header: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
    minHeight: 68,
    padding: theme.spacing.md,
  },
  titleWrap: {
    flex: 1,
    rowGap: 6,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  chevron: {
    color: theme.colors.muted,
    fontSize: 22,
    fontWeight: '300',
  },
  chevronOpen: {
    color: theme.colors.accent,
    transform: [{ rotate: '90deg' }],
  },
  body: {
    borderTopColor: theme.colors.glassBorder,
    borderTopWidth: 1,
    padding: theme.spacing.md,
    rowGap: 10,
  },
  bodyText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  patternBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.sm,
  },
  patternText: {
    color: theme.colors.orange,
    fontFamily: 'Courier',
    fontSize: 12,
    lineHeight: 18,
  },
  bulletRow: {
    alignItems: 'flex-start',
    columnGap: 8,
    flexDirection: 'row',
  },
  bulletDot: {
    color: theme.colors.accent,
    fontSize: 14,
    lineHeight: 22,
  },
  bulletText: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
})
