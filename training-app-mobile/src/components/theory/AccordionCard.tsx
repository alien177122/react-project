import { useState } from 'react'
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

export function AccordionCard({
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
      style={({ pressed }) => [styles.card, open && styles.cardOpen, pressed && styles.cardPressed]}
      onPress={toggle}
    >
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          {tag ? (
            <View style={[styles.tag, { backgroundColor: accentColor + '1A', borderColor: accentColor }]}>
              <Text style={[styles.tagText, { color: accentColor }]}>{tag}</Text>
            </View>
          ) : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={[styles.chevron, open && styles.chevronOpen]}>›</Text>
      </View>

      {open ? (
        <View style={styles.body}>
          {body ? <Text style={styles.bodyText}>{body}</Text> : null}
          {pattern ? (
            <View style={styles.patternBox}>
              <Text style={styles.patternText}>{pattern}</Text>
            </View>
          ) : null}
          {bullets?.map((bullet, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardOpen: {
    borderColor: theme.colors.accent + '55',
  },
  cardPressed: {
    opacity: 0.8,
  },
  header: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
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
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
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
    borderTopColor: theme.colors.border,
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
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
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
