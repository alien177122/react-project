import type { PropsWithChildren } from 'react'

jest.mock('expo-blur', () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  BlurView: require('react-native').View,
}))

jest.mock('expo-linear-gradient', () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  LinearGradient: require('react-native').View,
}))

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
