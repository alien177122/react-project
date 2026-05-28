import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { AccessibilityInfo, Platform, StyleSheet, View } from 'react-native'
import { theme } from '../../theme'

type RemoveableSubscription = {
  remove: () => void
}

type AccessibilityInfoWithTransparency = typeof AccessibilityInfo & {
  isReduceTransparencyEnabled?: () => Promise<boolean>
}

export function ScreenBackground({ children }: PropsWithChildren) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [reduceTransparency, setReduceTransparency] = useState(false)

  useEffect(() => {
    let isMounted = true
    let transparencySubscription: RemoveableSubscription | undefined
    const accessibilityInfo = AccessibilityInfo as AccessibilityInfoWithTransparency

    void AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (isMounted) {
          setReduceMotion(enabled)
        }
      })
      .catch(() => {
        if (isMounted) {
          setReduceMotion(false)
        }
      })

    if (
      Platform.OS !== 'web'
      && typeof accessibilityInfo.isReduceTransparencyEnabled === 'function'
    ) {
      void accessibilityInfo.isReduceTransparencyEnabled()
        .then((enabled) => {
          if (isMounted) {
            setReduceTransparency(enabled)
          }
        })
        .catch(() => {
          if (isMounted) {
            setReduceTransparency(false)
          }
        })

      transparencySubscription = AccessibilityInfo.addEventListener(
        'reduceTransparencyChanged',
        setReduceTransparency,
      )
    }

    const motionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    )

    return () => {
      isMounted = false
      motionSubscription.remove()
      transparencySubscription?.remove()
    }
  }, [])

  const glowOpacity = reduceTransparency ? 0 : reduceMotion ? 0.62 : 1
  const adjustedGlowOpacity = Platform.OS === 'web' ? glowOpacity * 0.42 : glowOpacity
  const glowStyle = Platform.OS === 'web' ? styles.glowWeb : null

  return (
    <View style={styles.container}>
      <View
        accessibilityElementsHidden
        accessibilityIgnoresInvertColors
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={[styles.glow, glowStyle, styles.glowWarm, { opacity: adjustedGlowOpacity }]}
      />
      <View
        accessibilityElementsHidden
        accessibilityIgnoresInvertColors
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={[styles.glow, glowStyle, styles.glowCool, { opacity: adjustedGlowOpacity }]}
      />

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
  glowWeb: {
    transform: [{ scale: 0.66 }],
  },
  glowWarm: {
    backgroundColor: theme.colors.glowWarm,
    height: 320,
    left: Platform.OS === 'web' ? -138 : -96,
    top: Platform.OS === 'web' ? -124 : -72,
    width: 340,
  },
  glowCool: {
    backgroundColor: theme.colors.glowCool,
    bottom: Platform.OS === 'web' ? -156 : -96,
    height: 360,
    right: Platform.OS === 'web' ? -148 : -112,
    width: 360,
  },
})
