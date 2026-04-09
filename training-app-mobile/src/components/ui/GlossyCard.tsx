import type { PropsWithChildren } from 'react'
import { Platform, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import Animated from 'react-native-reanimated'
import { theme } from '../../theme'
import { useGlossyCardAnimations } from './useGlossyCardAnimations'

interface GlossyCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  disabled?: boolean
  testID?: string
  variant?: 'default' | 'accent' | 'warning' | 'success'
}

const isAndroid = Platform.OS === 'android'
const isAndroidNativeBlurEnabled = isAndroid && typeof Platform.Version === 'number' && Platform.Version >= 31

type GradientTuple = readonly [string, string, string]

interface CardPalette {
  borderColor: string
  fallbackColor: string
  glossColors: GradientTuple
  glowColor: string
  shadowColor: string
  tintColors: GradientTuple
}

const CARD_PALETTES: Record<NonNullable<GlossyCardProps['variant']>, CardPalette> = {
  default: {
    borderColor: 'rgba(255,255,255,0.11)',
    fallbackColor: 'rgba(12,16,24,0.94)',
    glossColors: ['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.05)', 'transparent'],
    glowColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000000',
    tintColors: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)'],
  },
  accent: {
    borderColor: 'rgba(255,107,53,0.24)',
    fallbackColor: 'rgba(24,14,10,0.95)',
    glossColors: ['rgba(255,209,179,0.28)', 'rgba(255,160,120,0.08)', 'transparent'],
    glowColor: 'rgba(255,107,53,0.20)',
    shadowColor: '#25120b',
    tintColors: ['rgba(255,107,53,0.18)', 'rgba(255,255,255,0.04)', 'rgba(255,107,53,0.03)'],
  },
  warning: {
    borderColor: 'rgba(255,159,64,0.24)',
    fallbackColor: 'rgba(24,18,10,0.95)',
    glossColors: ['rgba(255,229,176,0.26)', 'rgba(255,191,96,0.08)', 'transparent'],
    glowColor: 'rgba(255,159,64,0.18)',
    shadowColor: '#281807',
    tintColors: ['rgba(255,159,64,0.16)', 'rgba(255,255,255,0.04)', 'rgba(255,159,64,0.03)'],
  },
  success: {
    borderColor: 'rgba(58,255,184,0.18)',
    fallbackColor: 'rgba(9,20,18,0.95)',
    glossColors: ['rgba(188,255,229,0.24)', 'rgba(58,255,184,0.07)', 'transparent'],
    glowColor: 'rgba(58,255,184,0.16)',
    shadowColor: '#081b16',
    tintColors: ['rgba(58,255,184,0.14)', 'rgba(255,255,255,0.03)', 'rgba(58,255,184,0.02)'],
  },
}

interface GlossLayersProps {
  palette: CardPalette
  glossStyle: StyleProp<ViewStyle>
}

function GlossLayers({ palette, glossStyle }: GlossLayersProps) {
  return (
    <>
      {isAndroid && !isAndroidNativeBlurEnabled ? (
        <View
          accessible={false}
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.androidFallback, { backgroundColor: palette.fallbackColor }]}
        />
      ) : (
        <BlurView
          accessible={false}
          intensity={18}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          tint="dark"
          {...(isAndroid ? { experimentalBlurMethod: 'dimezisBlurView' as const } : {})}
        />
      )}

      <LinearGradient
        accessible={false}
        colors={palette.tintColors}
        locations={[0, 0.3, 1]}
        pointerEvents="none"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View accessible={false} pointerEvents="none" style={[styles.gloss, glossStyle]}>
        <LinearGradient
          colors={palette.glossColors}
          locations={[0, 0.35, 1]}
          start={{ x: 0.45, y: 0 }}
          end={{ x: 0.55, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View accessible={false} pointerEvents="none" style={[styles.edgeGlow, { backgroundColor: palette.glowColor }]} />
      <LinearGradient
        accessible={false}
        colors={['rgba(255,255,255,0.06)', 'transparent', 'rgba(0,0,0,0.18)']}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
    </>
  )
}

export function GlossyCard({
  children,
  style,
  contentStyle,
  onPress,
  disabled = false,
  testID,
  variant = 'default',
}: GlossyCardProps) {
  const interactive = Boolean(onPress) && !disabled
  const palette = CARD_PALETTES[variant]
  const { events, styles: animatedStyles } = useGlossyCardAnimations(interactive)

  const content = <View style={[styles.content, contentStyle]}>{children}</View>
  const surface = (
    <Animated.View
      style={[
        styles.surface,
        animatedStyles.container,
        style,
        disabled ? styles.disabled : null,
        {
          borderColor: palette.borderColor,
          shadowColor: palette.shadowColor,
        },
      ]}
      testID={testID}
    >
      <GlossLayers glossStyle={animatedStyles.gloss} palette={palette} />
      {content}
    </Animated.View>
  )

  if (!onPress) {
    return surface
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={4}
      onPress={onPress}
      onHoverIn={events?.onHoverIn}
      onHoverOut={events?.onHoverOut}
      onPressIn={events?.onPressIn}
      onPressOut={events?.onPressOut}
      style={styles.pressable}
    >
      {surface}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: theme.radius.lg,
  },
  surface: {
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 24,
  },
  androidFallback: {
    backgroundColor: 'rgba(13,13,13,0.88)',
  },
  gloss: {
    height: 84,
    left: -24,
    position: 'absolute',
    right: -24,
    top: 0,
  },
  edgeGlow: {
    height: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  content: {
    backgroundColor: theme.colors.glass,
    minHeight: 1,
    padding: theme.spacing.lg,
    rowGap: theme.spacing.md,
  },
  disabled: {
    opacity: 0.56,
  },
})
