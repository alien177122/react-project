import type { PropsWithChildren } from 'react'

jest.mock('expo-blur', () => ({
  BlurView: require('react-native').View,
}))

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: require('react-native').View,
}))

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  Reanimated.default.call = () => {}
  Reanimated.useReducedMotion = () => false

  return Reanimated
})

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: PropsWithChildren) => children,
  SafeAreaView: ({ children }: PropsWithChildren) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}))

jest.mock('./src/components/ui/useGlossyCardAnimations', () => ({
  useGlossyCardAnimations: () => ({
    events: undefined,
    styles: {
      container: {},
      gloss: {},
    },
  }),
}))
