import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../theme'

type SceneHeroAccent = 'accent' | 'orange' | 'blue'

export interface SceneHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  accent?: SceneHeroAccent
  accentWord?: string
}

export function SceneHero({
  eyebrow,
  title,
  subtitle,
  accent = 'accent',
  accentWord,
}: SceneHeroProps) {
  const insets = useSafeAreaInsets()
  const accentColor = theme.colors[accent]
  const accentIndex = accentWord ? title.indexOf(accentWord) : -1
  const hasAccentWord = accentWord !== undefined && accentIndex >= 0

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.lg }]}>
      <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.3} style={styles.title}>
        {hasAccentWord ? (
          <>
            {title.slice(0, accentIndex)}
            <Text style={[styles.titleAccent, { color: accentColor }]}>{accentWord}</Text>
            {title.slice(accentIndex + accentWord.length)}
          </>
        ) : (
          title
        )}
      </Text>
      <Text maxFontSizeMultiplier={1.5} style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 124,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  eyebrow: {
    color: theme.colors.dim,
    fontSize: theme.typography.caption,
    fontWeight: '700',
    letterSpacing: theme.letterSpacing.caps,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.titleLg,
    fontWeight: '800',
    letterSpacing: theme.letterSpacing.snug,
    lineHeight: 32,
    marginBottom: theme.spacing.xs,
  },
  titleAccent: {
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.data,
    lineHeight: 21,
  },
})
