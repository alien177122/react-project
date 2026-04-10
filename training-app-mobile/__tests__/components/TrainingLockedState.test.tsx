import { render, screen } from '@testing-library/react-native'
import { TrainingLockedState } from '../../src/components/training/TrainingLockedState'

describe('TrainingLockedState', () => {
  it('renders the locked state headline, summary, and missing exercises', () => {
    render(
      <TrainingLockedState
        missingExercises={['Жим лёжа', 'Присед']}
        totalExercises={12}
      />,
    )

    expect(screen.getByText('Введи 1ПМ для всех упражнений')).toBeTruthy()
    expect(
      screen.getByText('Вкладка тренировки станет доступна, когда рассчитаны 1ПМ для всех 12 упражнений.'),
    ).toBeTruthy()
    expect(screen.getByText('— Жим лёжа')).toBeTruthy()
    expect(screen.getByText('— Присед')).toBeTruthy()
  })
})
