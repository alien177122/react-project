import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { AccessibilityInfo, StyleSheet, View } from 'react-native'
import { theme } from '../../theme'

export function ScreenBackground({ children }: PropsWithChildren) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [reduceTransparency, setReduceTransparency] = useState(false)

  useEffect(() => {
    let isMounted = true

    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (isMounted) {
        setReduceMotion(enabled)
      }
    })

    void AccessibilityInfo.isReduceTransparencyEnabled().then((enabled) => {
      if (isMounted) {
        setReduceTransparency(enabled)
      }
    })

    const motionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion,
    )
    const transparencySubscription = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      setReduceTransparency,
    )

    return () => {
      isMounted = false
      motionSubscription.remove()
      transparencySubscription.remove()
    }
  }, [])

  const glowOpacity = reduceTransparency ? 0 : reduceMotion ? 0.62 : 1

  return (
    <View style={styles.container}>
      <View
        accessibilityElementsHidden
        accessibilityIgnoresInvertColors
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={[styles.glow, styles.glowWarm, { opacity: glowOpacity }]}
      />
      <View
        accessibilityElementsHidden
        accessibilityIgnoresInvertColors
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={[styles.glow, styles.glowCool, { opacity: glowOpacity }]}
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
  glowWarm: {
    backgroundColor: theme.colors.glowWarm,
    height: 320,
    left: -96,
    top: -72,
    width: 340,
  },
  glowCool: {
    backgroundColor: theme.colors.glowCool,
    bottom: -96,
    height: 360,
    right: -112,
    width: 360,
  },
})
