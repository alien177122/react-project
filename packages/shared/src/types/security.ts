export type StrengthScore = 0 | 1 | 2 | 3 | 4;
export type StrengthLabel = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
}

export interface PasswordValidationResult {
  criteria: PasswordCriteria;
  score: StrengthScore;
  label: StrengthLabel;
  isValid: boolean;
}
