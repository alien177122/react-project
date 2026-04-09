import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const HOVER_DURATION = 180
const PRESS_DURATION = 100
const HOVER_LIFT = -4
const PRESS_OFFSET = 3
const PRESSED_SCALE = 0.985
const GLOSS_SHIFT = 10

function useMotionDuration(duration: number, reduceMotion: boolean) {
  return reduceMotion ? 0 : duration
}

export function useGlossyCardAnimations(enabled: boolean) {
  const hoverProgress = useSharedValue(0)
  const pressProgress = useSharedValue(0)
  const reduceMotion = useReducedMotion()

  const hoverDuration = useMotionDuration(HOVER_DURATION, reduceMotion)
  const pressDuration = useMotionDuration(PRESS_DURATION, reduceMotion)

  const animateHover = (nextValue: number) => {
    if (!enabled) return
    hoverProgress.set(withTiming(nextValue, {
      duration: hoverDuration,
      easing: Easing.out(Easing.cubic),
    }))
  }

  const animatePress = (nextValue: number) => {
    if (!enabled) return
    pressProgress.set(withTiming(nextValue, {
      duration: pressDuration,
      easing: Easing.out(Easing.quad),
    }))
  }

  const containerStyle = useAnimatedStyle(() => {
    const translateY =
      interpolate(hoverProgress.value, [0, 1], [0, HOVER_LIFT]) +
      interpolate(pressProgress.value, [0, 1], [0, PRESS_OFFSET])
    const scale = interpolate(pressProgress.value, [0, 1], [1, PRESSED_SCALE])

    return {
      shadowOpacity: 0.24 + hoverProgress.value * 0.06 - pressProgress.value * 0.08,
      shadowRadius: 24 + hoverProgress.value * 8 - pressProgress.value * 6,
      transform: [{ translateY }, { scale }],
    }
  })

  const glossStyle = useAnimatedStyle(() => ({
    opacity: 0.12 + hoverProgress.value * 0.88 - pressProgress.value * 0.08,
    transform: [
      {
        translateY: interpolate(hoverProgress.value, [0, 1], [GLOSS_SHIFT, 0]),
      },
    ],
  }))

  return {
    events: enabled
      ? {
          onHoverIn: () => animateHover(1),
          onHoverOut: () => animateHover(0),
          onPressIn: () => animatePress(1),
          onPressOut: () => animatePress(0),
        }
      : undefined,
    styles: {
      container: containerStyle,
      gloss: glossStyle,
    },
  }
}
