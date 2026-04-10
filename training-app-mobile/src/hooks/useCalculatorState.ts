import { useCalculatorState as useSharedCalculatorState } from '../../../packages/shared/src/hooks/useCalculatorState'
import type { UseCalculatorStateOptions as SharedUseCalculatorStateOptions } from '../../../packages/shared/src/hooks/useCalculatorState'
import { saveUser } from '../utils/api'

type UseCalculatorStateOptions = Omit<SharedUseCalculatorStateOptions, 'saveUser'>

export function useCalculatorState(options: UseCalculatorStateOptions) {
  return useSharedCalculatorState({
    ...options,
    saveUser,
  })
}
