import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { theme } from '../../theme'

interface CategoryPillsProps<T extends string> {
  categories: readonly T[]
  active: T
  onChange: (cat: T) => void
}

export function CategoryPills<T extends string>({ categories, active, onChange }: CategoryPillsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {categories.map(cat => {
        const isActive = cat === active
        return (
          <Pressable
            key={cat}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onChange(cat)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>{cat}</Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexGrow: 0,
  },
  container: {
    columnGap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  pill: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  pillActive: {
    backgroundColor: theme.colors.accentDim,
    borderColor: theme.colors.accent,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  labelActive: {
    color: theme.colors.accent,
  },
})
