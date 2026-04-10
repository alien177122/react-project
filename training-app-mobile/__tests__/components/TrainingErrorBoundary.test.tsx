import { fireEvent, render, screen } from '@testing-library/react-native'
import { Text } from 'react-native'
import { TrainingErrorBoundary } from '../../src/components/ui/TrainingErrorBoundary'

function ThrowComponent(): JSX.Element {
  throw new Error('Test render error')
}

let shouldThrow = true

function RecoverableThrowComponent(): JSX.Element {
  if (shouldThrow) {
    throw new Error('Recoverable test render error')
  }

  return <Text>Recovered content</Text>
}

describe('TrainingErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <TrainingErrorBoundary>
        <Text>Safe content</Text>
      </TrainingErrorBoundary>,
    )

    expect(screen.getByText('Safe content')).toBeTruthy()
  })

  it('catches render errors and renders the fallback UI', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <TrainingErrorBoundary>
        <ThrowComponent />
      </TrainingErrorBoundary>,
    )

    expect(screen.getByText('Произошла ошибка')).toBeTruthy()
    expect(
      screen.getByText('Не удалось отобразить программу. Попробуйте перезапустить экран.'),
    ).toBeTruthy()
    expect(screen.getByText('Обновить')).toBeTruthy()

    consoleSpy.mockRestore()
  })

  it('recovers after reset when children stop throwing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    shouldThrow = true

    render(
      <TrainingErrorBoundary>
        <RecoverableThrowComponent />
      </TrainingErrorBoundary>,
    )

    shouldThrow = false
    fireEvent.press(screen.getByText('Обновить'))

    expect(screen.getByText('Recovered content')).toBeTruthy()

    consoleSpy.mockRestore()
  })
})
