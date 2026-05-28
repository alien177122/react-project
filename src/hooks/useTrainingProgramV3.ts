import {useTrainingProgramV3 as useSharedTrainingProgramV3} from '../../packages/shared/src/hooks/useTrainingProgramV3.ts';
import type {UseTrainingProgramV3Options as SharedOptions} from '../../packages/shared/src/hooks/useTrainingProgramV3.ts';
import {saveUser} from '../utils/api';

type UseTrainingProgramV3Options = Omit<SharedOptions, 'saveUser'>;

export function useTrainingProgramV3(options: UseTrainingProgramV3Options) {
  return useSharedTrainingProgramV3({
    ...options,
    saveUser,
  });
}
