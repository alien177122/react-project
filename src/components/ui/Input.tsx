import { cx } from './cx'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return <input {...props} className={cx('input-field', className)} />
}

