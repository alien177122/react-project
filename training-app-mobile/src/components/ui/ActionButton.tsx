import type { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { theme } from '../../theme'

interface ActionButtonProps extends PropsWithChildren {
  label?: string
  onPress: () => void
  variant?: 'primary' | 'ghost' | 'danger'
  disabled?: boolean
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  children,
}: ActionButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        disabled ? styles.disabled : null,
        pressed ? styles.pressed : null,
      ]}
    >
      {children ?? <Text style={[styles.text, textStyles[variant]]}>{label}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.84,
  },
})

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: 'rgba(255,77,77,0.14)',
    borderColor: 'rgba(255,77,77,0.35)',
    borderWidth: 1,
  },
})

const textStyles = StyleSheet.create({
  primary: {
    color: '#111111',
  },
  ghost: {
    color: theme.colors.text,
  },
  danger: {
    color: theme.colors.red,
  },
})
