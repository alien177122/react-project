import test from 'node:test';
import assert from 'node:assert/strict';
import {CalculatorApiError, isCalculationLimitError} from '../packages/shared/src/types/billing.ts';
import {createApiClient} from '../packages/shared/src/utils/api.ts';

test('CalculatorApiError marks CALCULATION_LIMIT_REACHED code', () => {
  const error = new CalculatorApiError(402, 'Лимит исчерпан', {
    error: 'CALCULATION_LIMIT_REACHED',
    remaining: 0,
  });

  assert.equal(error.code, 'CALCULATION_LIMIT_REACHED');
  assert.equal(error.status, 402);
  assert.ok(isCalculationLimitError(error));
});

test('isCalculationLimitError returns false for generic errors', () => {
  assert.equal(isCalculationLimitError(new Error('fail')), false);
  assert.equal(
    isCalculationLimitError(new CalculatorApiError(500, 'Server error', {error: 'INTERNAL'})),
    false,
  );
});

test('createApiClient calculate throws CalculatorApiError on 402', async t => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({error: 'CALCULATION_LIMIT_REACHED', remaining: 0}), {
      status: 402,
      headers: {'Content-Type': 'application/json'},
    })) as typeof fetch;

  const client = createApiClient('/api');

  await assert.rejects(
    () =>
      client.calculate(
        {
          exerciseKey: 'bench',
          testWeight: 100,
          testReps: 5,
          requestId: 'req-1',
        },
        'jwt-token',
      ),
    error => {
      assert.ok(isCalculationLimitError(error));
      assert.equal((error as CalculatorApiError).status, 402);
      return true;
    },
  );
});

test('createApiClient calculate returns server SavedExercise payload', async t => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  let capturedBody = '';
  globalThis.fetch = (async (_input, init) => {
    capturedBody = String(init?.body ?? '');
    return new Response(
      JSON.stringify({
        exerciseKey: 'bench',
        testWeight: 100,
        testReps: 5,
        oneRM: 116.7,
        date: '01.09.2026',
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      },
    );
  }) as typeof fetch;

  const client = createApiClient('/api');
  const result = await client.calculate(
    {
      exerciseKey: 'bench',
      testWeight: 100,
      testReps: 5,
      requestId: 'req-2',
    },
    'jwt-token',
  );

  assert.deepEqual(JSON.parse(capturedBody), {
    exerciseKey: 'bench',
    testWeight: 100,
    testReps: 5,
    requestId: 'req-2',
  });
  assert.equal(result.oneRM, 116.7);
});

test('createApiClient getBillingStatus and createCheckout use bearer token', async t => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const calls: Array<{url: string; method?: string; auth?: string}> = [];

  globalThis.fetch = (async (input, init) => {
    const url = typeof input === 'string' ? input : input.toString();
    const headers = new Headers(init?.headers);
    calls.push({url, method: init?.method, auth: headers.get('Authorization') ?? undefined});

    if (url.endsWith('/billing/status')) {
      return new Response(
        JSON.stringify({
          premium: false,
          freeLimit: 3,
          used: 1,
          remaining: 2,
          price: 499,
          currency: 'RUB',
          pendingPayment: false,
        }),
        {status: 200, headers: {'Content-Type': 'application/json'}},
      );
    }

    return new Response(
      JSON.stringify({transactionId: 'tx-1', paymentUrl: 'https://pay.example/tx-1'}),
      {status: 200, headers: {'Content-Type': 'application/json'}},
    );
  }) as typeof fetch;

  const client = createApiClient('/api');
  const status = await client.getBillingStatus('token-abc');
  const checkout = await client.createCheckout('token-abc');

  assert.equal(status.remaining, 2);
  assert.equal(checkout.paymentUrl, 'https://pay.example/tx-1');
  assert.equal(calls.length, 2);
  assert.ok(calls.every(call => call.auth === 'Bearer token-abc'));
  assert.equal(calls[1]?.method, 'POST');
});
