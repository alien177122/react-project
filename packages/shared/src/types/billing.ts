export type BillingCurrency = 'RUB';

export interface BillingStatus {
  premium: boolean;
  freeLimit: number;
  used: number;
  remaining: number;
  price: number;
  currency: BillingCurrency;
  pendingPayment: boolean;
}

/** POST /calculator/calculate — field names match current calculator UI */
export interface CalculationRequestPayload {
  exerciseKey: string;
  testReps: number;
  requestId: string;
  testWeight?: number;
  testBodyWeight?: number;
  testExtraWeight?: number;
}

export interface CalculationSuccessResponse {
  exerciseKey: string;
  testWeight: number;
  testReps: number;
  oneRM: number;
  date: string;
  bodyWeight?: number;
  cached?: boolean;
}

export interface LimitReachedErrorResponse {
  error: 'CALCULATION_LIMIT_REACHED';
  remaining: 0;
}

export interface CheckoutResponse {
  transactionId: string;
  paymentUrl: string;
}

export interface CalculationHistoryItem {
  id: string;
  exerciseKey: string;
  testWeight: number;
  testReps: number;
  oneRM: number;
  bodyWeight?: number;
  createdAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export class CalculatorApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'CalculatorApiError';
    this.status = status;
    this.body = body;
    if (isRecord(body) && body.error === 'CALCULATION_LIMIT_REACHED') {
      this.code = 'CALCULATION_LIMIT_REACHED';
    }
  }
}

export function isCalculationLimitError(error: unknown): error is CalculatorApiError {
  return error instanceof CalculatorApiError && error.code === 'CALCULATION_LIMIT_REACHED';
}
