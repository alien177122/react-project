import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { theme } from '../../theme'

export function ScreenBackground({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion()
  const warmBlob = useSharedValue(0)
  const coolBlob = useSharedValue(0)
  const mintBlob = useSharedValue(0)

  useEffect(() => {
    if (reduceMotion) {
      warmBlob.set(0)
      coolBlob.set(0)
      mintBlob.set(0)
      return () => {
        cancelAnimation(warmBlob)
        cancelAnimation(coolBlob)
        cancelAnimation(mintBlob)
      }
    }

    warmBlob.set(withRepeat(
      withTiming(1, { duration: 16000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    ))
    coolBlob.set(withRepeat(
      withTiming(1, { duration: 22000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    ))
    mintBlob.set(withRepeat(
      withTiming(1, { duration: 28000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    ))

    return () => {
      cancelAnimation(warmBlob)
      cancelAnimation(coolBlob)
      cancelAnimation(mintBlob)
    }
  }, [coolBlob, mintBlob, reduceMotion, warmBlob])

  const warmStyle = useAnimatedStyle(() => ({
    opacity: interpolate(warmBlob.value, [0, 1], [0.16, 0.28]),
    transform: [
      { translateX: interpolate(warmBlob.value, [0, 1], [-18, 26]) },
      { translateY: interpolate(warmBlob.value, [0, 1], [-12, 20]) },
      { scale: interpolate(warmBlob.value, [0, 1], [1.02, 1.18]) },
    ],
  }))

  const coolStyle = useAnimatedStyle(() => ({
    opacity: interpolate(coolBlob.value, [0, 1], [0.12, 0.22]),
    transform: [
      { translateX: interpolate(coolBlob.value, [0, 1], [24, -32]) },
      { translateY: interpolate(coolBlob.value, [0, 1], [12, -18]) },
      { scale: interpolate(coolBlob.value, [0, 1], [1, 1.16]) },
    ],
  }))

  const mintStyle = useAnimatedStyle(() => ({
    opacity: interpolate(mintBlob.value, [0, 1], [0.08, 0.18]),
    transform: [
      { translateX: interpolate(mintBlob.value, [0, 1], [-12, 18]) },
      { translateY: interpolate(mintBlob.value, [0, 1], [18, -12]) },
      { scale: interpolate(mintBlob.value, [0, 1], [1.04, 1.12]) },
    ],
  }))

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.bgGradientTop, theme.colors.bg, theme.colors.bgGradientBottom]}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.03)', 'transparent', 'rgba(255,255,255,0.02)']}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View pointerEvents="none" style={[styles.glow, styles.glowWarm, warmStyle]} />
      <Animated.View pointerEvents="none" style={[styles.glow, styles.glowCool, coolStyle]} />
      <Animated.View pointerEvents="none" style={[styles.glow, styles.glowMint, mintStyle]} />
      <View pointerEvents="none" style={styles.vignette} />

      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg,
    flex: 1,
    overflow: 'hidden',
  },
  glow: {
    borderRadius: 999,
    position: 'absolute',
  },
  glowWarm: {
    backgroundColor: theme.colors.glowWarm,
    height: 380,
    left: -120,
    top: -54,
    width: 420,
  },
  glowCool: {
    backgroundColor: theme.colors.glowCool,
    height: 360,
    right: -110,
    top: 180,
    width: 360,
  },
  glowMint: {
    alignSelf: 'center',
    backgroundColor: theme.colors.green,
    bottom: -200,
    height: 440,
    opacity: 0.08,
    width: 620,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3,4,10,0.08)',
  },
})
