import { Platform } from 'react-native'
import type { ViewStyle } from 'react-native'

/**
 * Returns platform-appropriate shadow styles.
 *
 * On iOS:  native shadow properties (rendered by Core Animation)
 * On Android: elevation integer (Material shadow system)
 *
 * @param elevation  1–4 scale; 1 = subtle card lift, 4 = floating modal
 * @param color      Shadow tint — use dark colors for dark backgrounds
 */
export function getAppleShadow(elevation = 1, color = '#000000'): ViewStyle {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: elevation * 4 },
      shadowOpacity: 0.06 + elevation * 0.04,
      shadowRadius: elevation * 8,
    }
  }
  return { elevation: elevation * 3 }
}
