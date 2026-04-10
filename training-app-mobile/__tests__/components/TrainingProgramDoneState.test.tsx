import { fireEvent, render, screen } from '@testing-library/react-native'
import { TrainingProgramDoneState } from '../../src/components/training/TrainingProgramDoneState'

describe('TrainingProgramDoneState', () => {
  it('renders completion summary and resets the cycle on button press', () => {
    const onReset = jest.fn()

    render(<TrainingProgramDoneState completedSessions={24} onReset={onReset} />)

    expect(screen.getByText('Программа завершена')).toBeTruthy()
    expect(screen.getByText('8 недель пройдено')).toBeTruthy()
    expect(screen.getByText('24 тренировок · 8 недель · 3 дня')).toBeTruthy()
    expect(
      screen.getByText('Пересчитай 1ПМ по контрольным подходам и начни новый цикл.'),
    ).toBeTruthy()

    fireEvent.press(screen.getByText('Начать новый цикл'))
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
