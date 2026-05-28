import {useReducedMotion} from '../../hooks/useReducedMotion';
import type {PasswordCriteria, StrengthLabel} from '../../types/security';

const LABELS: Record<StrengthLabel, string> = {
  weak: 'Слабый',
  fair: 'Средний',
  good: 'Хороший',
  strong: 'Надёжный',
};

const CRITERIA: {key: keyof PasswordCriteria; label: string}[] = [
  {key: 'minLength', label: 'Минимум 8 символов'},
  {key: 'hasUppercase', label: 'Заглавная буква'},
  {key: 'hasLowercase', label: 'Строчная буква'},
  {key: 'hasDigit', label: 'Цифра'},
  {key: 'hasSpecial', label: 'Спецсимвол'},
];

interface PasswordStrengthMeterProps {
  score: number;
  label: StrengthLabel;
  criteria: PasswordCriteria;
  visible: boolean;
  id?: string;
}

export function PasswordStrengthMeter({
  score,
  label,
  criteria,
  visible,
  id,
}: PasswordStrengthMeterProps) {
  const reduced = useReducedMotion();

  if (!visible) return null;

  return (
    <div
      id={id}
      className="ta-password-meter"
      role="status"
      aria-live="polite"
      aria-label={`Надёжность пароля: ${LABELS[label]}`}>
      <div className="ta-password-meter__head">
        <span className="ta-password-meter__label">Надёжность</span>
        <span className={`ta-password-meter__value ta-password-meter__value--${label}`}>
          {LABELS[label]}
        </span>
      </div>

      <div className="ta-password-meter__segments" aria-hidden="true">
        {Array.from({length: 4}, (_, index) => (
          <span
            key={index}
            className={`ta-password-meter__segment${
              index < score ? ` ta-password-meter__segment--${label}` : ''
            }${reduced ? '' : ' ta-password-meter__segment--animated'}`}
            style={reduced ? undefined : {transitionDelay: `${index * 60}ms`}}
          />
        ))}
      </div>

      <ul className="ta-password-meter__criteria">
        {CRITERIA.map(({key, label: itemLabel}) => {
          const met = criteria[key];
          return (
            <li key={key} className={`ta-password-meter__criterion${met ? ' is-met' : ''}`}>
              <span className="ta-password-meter__mark" aria-hidden="true">
                {met ? '✓' : '✗'}
              </span>
              <span>{itemLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
