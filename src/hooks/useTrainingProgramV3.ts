import {useTrainingProgramV3 as useSharedTrainingProgramV3} from '@training/shared/hooks/useTrainingProgramV3';
import type {UseTrainingProgramV3Options as SharedOptions} from '@training/shared/hooks/useTrainingProgramV3';
import {saveUser} from '../utils/api';

type UseTrainingProgramV3Options = Omit<SharedOptions, 'saveUser'>;

export function useTrainingProgramV3(options: UseTrainingProgramV3Options) {
  return useSharedTrainingProgramV3({
    ...options,
    saveUser,
  });
}
