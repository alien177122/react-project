import { useTrainingProgram as useSharedTrainingProgram } from '../../packages/shared/src/hooks/useTrainingProgram'
import type { UseTrainingProgramOptions as SharedUseTrainingProgramOptions } from '../../packages/shared/src/hooks/useTrainingProgram'
import { saveUser } from '../utils/api'

type UseTrainingProgramOptions = Omit<SharedUseTrainingProgramOptions, 'saveUser'>

export function useTrainingProgram(options: UseTrainingProgramOptions) {
  return useSharedTrainingProgram({
    ...options,
    saveUser,
  })
}
