import type {ActiveProgram} from '../../types';
import type {BillingHookState} from '@training/shared/hooks/useBilling';
import {
  getPresetForActiveProgram,
  PROGRESSION_PRESET_META,
} from '@training/shared/program/progressionPresets';
import {Button} from '../ui/Button';

interface UserBarProps {
  userName: string;
  onLogout: () => void;
  activeProgram?: ActiveProgram;
  v3Enabled?: boolean;
  onChangeProgram?: () => void;
  billingState?: BillingHookState;
  isPolling?: boolean;
  checkoutDisabled?: boolean;
  onOpenCheckout?: () => void;
  onRefreshBilling?: () => void;
}

export function UserBar({
  userName,
  onLogout,
  activeProgram = '2.0',
  v3Enabled = false,
  onChangeProgram,
  billingState,
  isPolling = false,
  checkoutDisabled = false,
  onOpenCheckout,
  onRefreshBilling,
}: UserBarProps) {
  const programLabel =
    PROGRESSION_PRESET_META[getPresetForActiveProgram(activeProgram)].programLabel;

  const billingReady = billingState?.status === 'ready' ? billingState.billing : null;

  let billingLabel = 'Открыть безлимитные расчёты';
  let billingAction: (() => void) | undefined = onOpenCheckout;
  let billingDisabled = checkoutDisabled || isPolling;

  if (billingReady?.premium) {
    billingLabel = 'Безлимитные расчёты';
    billingAction = undefined;
    billingDisabled = true;
  } else if (billingReady?.pendingPayment) {
    billingLabel = isPolling ? 'Проверяем оплату…' : 'Проверить оплату';
    billingAction = onRefreshBilling;
  }

  return (
    <div className="user-bar">
      <div className="user-bar-identity">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        {v3Enabled ? <span className="user-bar__program">{programLabel}</span> : null}
      </div>
      <div className="user-bar-actions">
        {billingState && billingAction ? (
          <Button size="sm" variant="ghost" disabled={billingDisabled} onClick={billingAction}>
            {billingLabel}
          </Button>
        ) : billingState && billingReady?.premium ? (
          <span className="user-bar__billing-badge" aria-label="Безлимитные расчёты активны">
            Безлимит
          </span>
        ) : null}
        {v3Enabled && onChangeProgram ? (
          <Button size="sm" variant="ghost" onClick={onChangeProgram}>
            Сменить программу
          </Button>
        ) : null}
        <Button size="sm" variant="ghost" onClick={onLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
}
