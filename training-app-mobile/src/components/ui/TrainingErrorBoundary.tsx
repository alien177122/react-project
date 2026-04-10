import { Component, type ErrorInfo, type PropsWithChildren } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme'

interface TrainingErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class TrainingErrorBoundary extends Component<
  PropsWithChildren,
  TrainingErrorBoundaryState
> {
  state: TrainingErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error): TrainingErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[TrainingErrorBoundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ error: undefined, hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Произошла ошибка</Text>
          <Text style={styles.description}>
            Не удалось отобразить программу. Попробуйте перезапустить экран.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={this.handleReset}
            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
          >
            <Text style={styles.buttonLabel}>Обновить</Text>
          </Pressable>
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
    padding: theme.spacing.xl,
    rowGap: theme.spacing.md,
  },
  title: {
    color: theme.colors.red,
    fontSize: theme.typography.title,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    color: theme.colors.muted,
    fontSize: theme.typography.body,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    minHeight: 50,
    minWidth: 156,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.84,
  },
  buttonLabel: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
})
