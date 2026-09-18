interface PremiumInputMessageProps {
  id?: string;
  message?: string;
  error?: boolean;
}

export function PremiumInputMessage({id, message, error}: PremiumInputMessageProps) {
  if (!message) return null;

  const className = `pi-message pi-message--${error ? 'error' : 'helper'} pi-message--enter`;
  const liveProps = {
    id,
    className,
    role: error ? 'alert' : 'status',
    'aria-live': 'polite',
  } as const;

  return (
    <p key={message} {...liveProps}>
      {message}
    </p>
  );
}
