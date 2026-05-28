import {
  useCallback,
  useId,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
} from 'react';
import {PasswordStrengthMeter} from './PasswordStrengthMeter';
import {usePasswordStrength} from '../../hooks/usePasswordStrength';

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value' | 'onBlur'
> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showStrength?: boolean;
  onBlurValidate?: (message: string | null) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export function PasswordInput({
  label,
  value,
  onChange,
  error,
  showStrength = false,
  onBlurValidate,
  onBlur,
  id: externalId,
  autoComplete,
  placeholder = '••••••••',
  ...rest
}: PasswordInputProps) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const meterId = `${id}-meter`;
  const errorId = error ? `${id}-error` : undefined;
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);
  const strength = usePasswordStrength(value);
  const showMeter = showStrength && (visible || touched) && value.length > 0;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
      if (!visible && event.target.value.length > 0) setVisible(true);
    },
    [onChange, visible],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      onBlur?.(event);
      if (showStrength && onBlurValidate) {
        onBlurValidate(value && !strength.isValid ? 'Пароль не соответствует требованиям' : null);
      }
    },
    [onBlur, onBlurValidate, showStrength, strength.isValid, value],
  );

  return (
    <div className={`ta-password-field${error ? ' ta-password-field--error' : ''}`}>
      <label htmlFor={id} className="ta-password-field__label">
        {label}
      </label>

      <div className="ta-password-field__row">
        <input
          {...rest}
          id={id}
          className={`ta-password-input${error ? ' ta-password-input--error' : ''}`}
          type={revealed ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            [errorId, showMeter ? meterId : undefined].filter(Boolean).join(' ') || undefined
          }
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={event => {
            setVisible(true);
            rest.onFocus?.(event);
          }}
        />
        <button
          type="button"
          className="ta-password-toggle"
          onClick={() => setRevealed(current => !current)}
          aria-label={revealed ? 'Скрыть пароль' : 'Показать пароль'}
          aria-pressed={revealed}>
          {revealed ? 'Скрыть' : 'Показать'}
        </button>
      </div>

      {error && (
        <p id={errorId} className="ta-password-field__error" role="alert">
          {error}
        </p>
      )}

      {showStrength && (
        <PasswordStrengthMeter
          id={meterId}
          score={strength.score}
          label={strength.label}
          criteria={strength.criteria}
          visible={showMeter}
        />
      )}
    </div>
  );
}
