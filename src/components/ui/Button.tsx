import { cx } from './cx'

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'complete'
type ButtonSize = 'md' | 'sm'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const base = size === 'sm'
    ? 'btn-sm'
    : 'btn'

  const variantClass =
    variant === 'ghost'
      ? 'btn-ghost'
      : variant === 'danger'
        ? 'btn-danger'
        : variant === 'complete'
          ? 'btn-complete'
          : ''

  return (
    <button
      {...props}
      className={cx(base, variantClass, className)}
    />
  )
}

