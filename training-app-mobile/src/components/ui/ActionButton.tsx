import type { PropsWithChildren } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { mx, theme } from '../../theme'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface ActionButtonProps extends PropsWithChildren {
  label?: string
  onPress: () => void
  variant?: 'primary' | 'ghost' | 'danger'
  disabled?: boolean
  loading?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  children,
}: ActionButtonProps) {
  const blocked = disabled || loading
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    if (!blocked) {
      scale.value = withSpring(0.97, { damping: 18, stiffness: 400 })
    }
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 18, stiffness: 400 })
  }

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: blocked }}
      disabled={blocked}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.base,
        variantStyles[variant],
        style,
        animatedStyle,
        blocked ? mx.disabledOpacity : null,
      ]}
    >
      {children ?? (
        loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={indicatorColors[variant]} size="small" />
            <Text style={[styles.text, textStyles[variant], textStyle]}>{label ?? 'Загрузка…'}</Text>
          </View>
        ) : (
          <Text style={[styles.text, textStyles[variant], textStyle]}>{label}</Text>
        )
      )}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  base: {
    ...mx.center,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    minHeight: 52,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 12,
  },
  loadingRow: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
  },
  text: {
    fontSize: theme.typography.button,
    fontWeight: '800',
  },
})

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  ghost: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
  },
  danger: {
    backgroundColor: 'rgba(255,77,77,0.14)',
    borderColor: 'rgba(255,77,77,0.35)',
  },
})

const textStyles = StyleSheet.create({
  primary: {
    color: '#0b0f1a',
  },
  ghost: {
    color: theme.colors.text,
  },
  danger: {
    color: theme.colors.red,
  },
})

const indicatorColors = {
  primary: '#0b0f1a',
  ghost: theme.colors.text,
  danger: theme.colors.red,
} as const
