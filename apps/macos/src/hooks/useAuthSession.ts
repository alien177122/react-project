import {useAuthSession as useAuthSessionCore} from '@training/shared/hooks/useAuthSession';
import {API_BASE_URL} from '../platform/config';
import {macosTokenStorage} from '../platform/storage';

export function useAuthSession() {
  return useAuthSessionCore({
    storage: macosTokenStorage,
    apiBaseUrl: API_BASE_URL,
  });
}
