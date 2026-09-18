import {Button} from '../ui/Button';

export interface LockedCalculationResultProps {
  onCheckout: () => void;
  checkoutDisabled?: boolean;
}

export function LockedCalculationResult({
  onCheckout,
  checkoutDisabled = false,
}: LockedCalculationResultProps) {
  return (
    <section
      className="locked-calc-result"
      aria-label="Результат расчёта недоступен"
      aria-live="polite">
      <div className="locked-calc-result__card">
        <p className="locked-calc-result__eyebrow">Лимит бесплатных расчётов</p>
        <h3 className="locked-calc-result__title">Новый результат скрыт</h3>
        <p className="locked-calc-result__copy">
          Введённые данные сохранены. Расчётный максимум станет доступен после оплаты безлимитного
          доступа.
        </p>
        <Button
          type="button"
          className="locked-calc-result__cta"
          disabled={checkoutDisabled}
          onClick={onCheckout}>
          Оплатить безлимит
        </Button>
      </div>
    </section>
  );
}
