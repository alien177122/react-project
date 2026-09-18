import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type InputHTMLAttributes,
} from 'react';
import {useStepperHold} from '../../hooks/useStepperHold';
import {PremiumInputMessage} from './PremiumInputMessage';
import {PremiumStepper} from './PremiumStepper';

type Variant = 'default' | 'stepper';

export interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
  helper?: string;
  variant?: Variant;
  step?: number;
  onValueChange?: (next: string) => void;
  status?: 'idle' | 'loading';
}

function getStep(step: number | undefined): number {
  return Number.isFinite(step) && step && step > 0 ? step : 1;
}

export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>((props, ref) => {
  const {
    label,
    unit,
    error,
    helper,
    id: externalId,
    className,
    variant = 'default',
    step,
    onValueChange,
    status = 'idle',
    value,
    onChange,
    onFocus,
    onBlur,
    autoCapitalize = 'none',
    autoCorrect = 'off',
    spellCheck = false,
    min,
    max,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  const autoId = useId();
  const id = externalId ?? autoId;
  const [focused, setFocused] = useState(false);
  const isStepper = variant === 'stepper';
  const isLoading = status === 'loading';
  const isDisabled = Boolean(disabled || isLoading);
  const state = error ? 'error' : focused ? 'focused' : 'idle';
  const message = error ?? helper;
  const messageId = message ? `${id}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(' ') || undefined;
  const stepSize = getStep(step);

  const stepper = useStepperHold({
    value,
    min,
    max,
    disabled,
    loading: isLoading,
    onCommit: onValueChange,
  });

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      if (isStepper && event.currentTarget.value !== '') {
        const parsed = Number(event.currentTarget.value);
        if (Number.isFinite(parsed)) stepper.commitValue(parsed);
      }
      onBlur?.(event);
    },
    [isStepper, onBlur, stepper],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      if (isStepper) onValueChange?.(event.currentTarget.value);
    },
    [isStepper, onChange, onValueChange],
  );

  const inputEl = (
    <input
      {...rest}
      ref={ref}
      id={id}
      className={`pi-input${className ? ` ${className}` : ''}`}
      style={unit && !isStepper ? ({'--pi-pl': '32px', '--pi-pr': '48px'} as CSSProperties) : undefined}
      value={value}
      min={isStepper ? undefined : min}
      max={isStepper ? undefined : max}
      step={isStepper ? 'any' : step}
      disabled={isDisabled}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      spellCheck={spellCheck}
      aria-busy={isLoading || undefined}
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={describedBy}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );

  return (
    <div className="pi-group" data-status={isLoading ? 'loading' : state}>
      <label htmlFor={id} className={`pi-label pi-label--${state}`}>
        {label}
      </label>

      {isStepper ? (
        <PremiumStepper
          label={label}
          state={state}
          unit={unit}
          isDisabled={isDisabled}
          stepSize={stepSize}
          stepper={stepper}>
          {inputEl}
        </PremiumStepper>
      ) : (
        <div className={`pi-wrapper pi-wrapper--${state}`}>
          {inputEl}
          {unit && (
            <span className="pi-unit" aria-hidden="true">
              {unit}
            </span>
          )}
        </div>
      )}

      <PremiumInputMessage id={messageId} message={message} error={Boolean(error)} />
    </div>
  );
});

PremiumInput.displayName = 'PremiumInput';
