import type {ReactNode} from 'react';
import type {AppTab} from '../app/tabs';
import {useURLState} from '../../hooks/useURLState';

interface AppTabLinkProps {
  tab: AppTab;
  children: ReactNode;
  ariaLabel?: string;
}

export function AppTabLink({tab, children, ariaLabel}: AppTabLinkProps) {
  const {setValue} = useURLState<AppTab>('tab');

  return (
    <button
      type="button"
      className="ta-see-also-link"
      onClick={() => setValue(tab)}
      aria-label={ariaLabel}>
      {children}
    </button>
  );
}
