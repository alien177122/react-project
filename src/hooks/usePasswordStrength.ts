import {useMemo} from 'react';
import {validatePassword} from '../utils/passwordValidation';
import type {PasswordValidationResult} from '../types/security';

export function usePasswordStrength(password: string): PasswordValidationResult {
  return useMemo(() => validatePassword(password), [password]);
}
