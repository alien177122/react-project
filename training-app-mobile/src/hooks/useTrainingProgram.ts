import { useTrainingProgram as useSharedTrainingProgram } from '@training/shared/hooks/useTrainingProgram'
import type { UseTrainingProgramOptions as SharedUseTrainingProgramOptions } from '@training/shared/hooks/useTrainingProgram'
import { saveUser } from '../utils/api'

type UseTrainingProgramOptions = Omit<SharedUseTrainingProgramOptions, 'saveUser'>

export function useTrainingProgram(options: UseTrainingProgramOptions) {
  return useSharedTrainingProgram({
    ...options,
    saveUser,
  })
}
