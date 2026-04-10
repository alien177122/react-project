import { useEffect, useState } from 'react'
import {
  AccessibilityInfo,
  LayoutAnimation,
  Platform,
  UIManager,
  type NativeSyntheticEvent,
} from 'react-native'

interface UseTheoryNavigationOptions {
  itemCount: number
  initialIndex?: number
}

interface WebKeyEventPayload {
  key?: string
}

export type TheoryStageKeyDownHandler = (
  event: NativeSyntheticEvent<WebKeyEventPayload>,
) => void

function clampIndex(index: number, count: number) {
  return Math.min(Math.max(index, 0), Math.max(count - 1, 0))
}

export function useTheoryNavigation({
  itemCount,
  initialIndex = 0,
}: UseTheoryNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState(clampIndex(initialIndex, itemCount))
  const [focusedIndex, setFocusedIndex] = useState(clampIndex(initialIndex, itemCount))
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false)

  useEffect(() => {
    if (
      Platform.OS === 'android'
      && UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) {
          setReduceMotionEnabled(enabled)
        }
      })
      .catch(() => {
        setReduceMotionEnabled(false)
      })

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotionEnabled,
    )

    return () => {
      mounted = false
      subscription.remove()
    }
  }, [])

  const activateIndex = (index: number) => {
    const nextIndex = clampIndex(index, itemCount)
    if (!reduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
    setActiveIndex(nextIndex)
    setFocusedIndex(nextIndex)
  }

  const handleStageKeyDown = (index: number): TheoryStageKeyDownHandler => (
    event: NativeSyntheticEvent<WebKeyEventPayload>,
  ) => {
    const key = event.nativeEvent.key

    if (key === 'ArrowDown' || key === 'ArrowRight') {
      activateIndex(index + 1)
      return
    }

    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      activateIndex(index - 1)
      return
    }

    if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
      activateIndex(index)
    }
  }

  return {
    activeIndex,
    focusedIndex,
    activateIndex,
    setFocusedIndex,
    isPassed: (index: number) => index < activeIndex,
    handleStageKeyDown,
  }
}
