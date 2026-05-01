import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../theme'
import { ActionButton } from './ui/ActionButton'
import { PlateDiagram } from './PlateDiagram'

interface PlateBreakdownSheetProps {
  visible: boolean
  weight: number
  exerciseName: string
  onClose: () => void
}

/**
 * Bottom sheet that surfaces the plate decomposition for a single
 * working set. iOS-native pattern: `Modal` with `animationType="slide"`,
 * dim backdrop dismiss, drag-handle affordance, safe-area aware bottom
 * padding. Swipe-to-dismiss is intentionally deferred (backdrop tap +
 * "Готово" button cover MVP).
 */
export function PlateBreakdownSheet({
  visible,
  weight,
  exerciseName,
  onClose,
}: PlateBreakdownSheetProps) {
  const insets = useSafeAreaInsets()

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityLabel="Закрыть разбор штанги"
          accessibilityRole="button"
          onPress={onClose}
          style={styles.backdrop}
        />
        <View
          accessibilityViewIsModal
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, theme.spacing.md) + theme.spacing.md,
            },
          ]}
        >
          <View accessibilityElementsHidden style={styles.handle} />
          <View style={styles.head}>
            <Text accessibilityRole="header" style={styles.eyebrow}>
              Разбор штанги
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {exerciseName}
            </Text>
            <Text style={styles.weight}>{weight.toFixed(1)} кг</Text>
          </View>
          <PlateDiagram weight={weight} />
          <ActionButton label="Готово" onPress={onClose} variant="ghost" />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(10,12,16,0.55)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  sheet: {
    backgroundColor: theme.colors.bg,
    borderColor: theme.colors.border,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    rowGap: theme.spacing.md,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: theme.colors.borderStrong,
    borderRadius: 999,
    height: 4,
    marginBottom: theme.spacing.sm,
    width: 44,
  },
  head: {
    rowGap: 4,
  },
  eyebrow: {
    color: theme.colors.dim,
    fontSize: theme.typography.caption,
    fontWeight: '700',
    letterSpacing: theme.letterSpacing.caps,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.subhead,
    fontWeight: '700',
  },
  weight: {
    color: theme.colors.accent,
    fontSize: theme.typography.title,
    fontVariant: ['tabular-nums'],
    fontWeight: '800',
  },
})
