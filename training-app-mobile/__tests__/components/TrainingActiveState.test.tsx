import { fireEvent, render, screen } from '@testing-library/react-native'
import { TrainingActiveState } from '../../src/components/training/TrainingActiveState'

jest.mock('../../src/components/TrainingDayCard', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require('react-native')

  return function MockTrainingDayCard({
    dayDef,
    weekIndex,
    isPreview,
  }: {
    dayDef: { name: string }
    weekIndex: number
    isPreview?: boolean
  }) {
    return (
      <Text>
        {`${isPreview ? 'preview' : 'current'}:${dayDef.name}:week-${weekIndex + 1}`}
      </Text>
    )
  }
})

describe('TrainingActiveState', () => {
  const current = {
    dayDef: {
      dayNumber: 1 as const,
      exerciseKeys: [],
      name: 'Сила',
    },
    exercises: [],
    weekIndex: 1,
  }

  const preview = {
    dayDef: {
      dayNumber: 2 as const,
      exerciseKeys: [],
      name: 'Выносливость',
    },
    exercises: [],
    weekIndex: 2,
  }

  it('renders progress, current training card, and preview when provided', () => {
    render(
      <TrainingActiveState
        completedSessions={9}
        current={current}
        onComplete={jest.fn()}
        preview={preview}
      />,
    )

    expect(screen.getByText('Прогресс программы')).toBeTruthy()
    expect(screen.getByText('9 / 24 тренировок')).toBeTruthy()
    expect(screen.getByText('Текущая тренировка')).toBeTruthy()
    expect(screen.getByText('current:Сила:week-2')).toBeTruthy()
    expect(screen.getByText('Следующая тренировка')).toBeTruthy()
    expect(screen.getByText('Предпросмотр')).toBeTruthy()
    expect(screen.getByText('preview:Выносливость:week-3')).toBeTruthy()
  })

  it('calls onComplete when the primary action is pressed', () => {
    const onComplete = jest.fn()

    render(
      <TrainingActiveState
        completedSessions={3}
        current={current}
        onComplete={onComplete}
      />,
    )

    fireEvent.press(screen.getByText('Завершить тренировку'))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
