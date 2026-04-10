import { fireEvent, render, screen } from '@testing-library/react-native'
import { TrainingMicrocycleBreakState } from '../../src/components/training/TrainingMicrocycleBreakState'

describe('TrainingMicrocycleBreakState', () => {
  it('renders the break state details and starts the next microcycle', () => {
    const onStartNextMicrocycle = jest.fn()

    render(
      <TrainingMicrocycleBreakState
        completedMicrocycle={2}
        completedSessions={6}
        nextDayName="Жим + плечи"
        onStartNextMicrocycle={onStartNextMicrocycle}
      />,
    )

    expect(screen.getByText('Завершён 2-й микроцикл')).toBeTruthy()
    expect(screen.getByText('Праздник! Время отдохнуть')).toBeTruthy()
    expect(screen.getByText('2-й микроцикл из 8 пройден — 6 тренировок позади')).toBeTruthy()
    expect(screen.getByText('Рекомендации на 4–8 дней')).toBeTruthy()
    expect(
      screen.getByText(/Следующий микроцикл: 3-й · День 1 · Жим \+ плечи/),
    ).toBeTruthy()

    fireEvent.press(screen.getByText('Начать следующий микроцикл'))
    expect(onStartNextMicrocycle).toHaveBeenCalledTimes(1)
  })
})
