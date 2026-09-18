import {useBilling as useSharedBilling} from '@training/shared/hooks/useBilling';
import {createCheckout, getBillingStatus} from '../utils/api';

export function useBilling(token: string) {
  return useSharedBilling({
    token,
    getBillingStatus,
    createCheckout,
    redirectToPayment: paymentUrl => {
      window.location.assign(paymentUrl);
    },
  });
}
