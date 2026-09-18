import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import bcrypt from 'bcryptjs';
import {createApp} from '../server/app.js';
import {createDb} from '../server/db.js';
import {computeOneRm, validateCalculationBody} from '../server/calculations.js';
import {
  applyWebhookToDb,
  parsePlategaWebhookBody,
  verifyPlategaWebhookHeaders,
} from '../server/billing.js';

async function createBillingTestContext(envOverrides = {}) {
  const db = createDb({dbPath: ':memory:'});
  const env = {
    NODE_ENV: 'test',
    JWT_SECRET: 'billing-test-secret',
    PLATEGA_ENABLED: '1',
    PLATEGA_MERCHANT_ID: 'merchant-test',
    PLATEGA_SECRET: 'secret-test',
    PLATEGA_PRICE_RUB: '499',
    FREE_CALCULATION_LIMIT: '3',
    PUBLIC_APP_URL: 'https://app.example.com',
    ...envOverrides,
  };

  const app = createApp({env, db, enableStatic: false});
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No port');

  const baseUrl = `http://127.0.0.1:${address.port}`;

  async function register(name = 'billing-user') {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, password: 'Secret123!'}),
    });
    const body = await response.json();
    return {token: body.token, name: body.name};
  }

  async function calculate(token, payload) {
    const response = await fetch(`${baseUrl}/api/calculator/calculate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));
    return {response, body};
  }

  return {
    db,
    baseUrl,
    register,
    calculate,
    async close() {
      await new Promise((resolve, reject) => server.close(err => (err ? reject(err) : resolve())));
      db.close();
    },
  };
}

test('validateCalculationBody accepts bodyweight lifts', () => {
  const result = validateCalculationBody({
    exerciseKey: 'pullUp',
    testReps: 8,
    requestId: 'req-1',
    testBodyWeight: 80,
    testExtraWeight: 10,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.payload?.testWeight, 90);
});

test('computeOneRm matches shared formula rounding', () => {
  const payload = {testWeight: 100, testReps: 5};
  const {oneRM} = computeOneRm(payload);
  assert.ok(oneRM > 100);
});

test('billing disabled allows unlimited calculations', async t => {
  const ctx = await createBillingTestContext({PLATEGA_ENABLED: '0'});
  t.after(() => ctx.close());

  const {token} = await ctx.register('free-dev');

  for (let i = 0; i < 4; i += 1) {
    const {response, body} = await ctx.calculate(token, {
      exerciseKey: 'bench',
      testWeight: 100 + i,
      testReps: 5,
      requestId: `req-${i}`,
    });
    assert.equal(response.status, 200, `attempt ${i}`);
    assert.ok(body.oneRM);
  }

  const statusResponse = await fetch(`${ctx.baseUrl}/api/billing/status`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  const status = await statusResponse.json();
  assert.equal(status.premium, true);
});

test('free limit returns 402 without leaking oneRM', async t => {
  const ctx = await createBillingTestContext();
  t.after(() => ctx.close());

  const {token} = await ctx.register('limit-user');

  for (let i = 0; i < 3; i += 1) {
    const {response} = await ctx.calculate(token, {
      exerciseKey: 'bench',
      testWeight: 100 + i,
      testReps: 5,
      requestId: `limit-req-${i}`,
    });
    assert.equal(response.status, 200);
  }

  const blocked = await ctx.calculate(token, {
    exerciseKey: 'squat',
    testWeight: 120,
    testReps: 5,
    requestId: 'limit-req-blocked',
  });

  assert.equal(blocked.response.status, 402);
  assert.equal(blocked.body.error, 'CALCULATION_LIMIT_REACHED');
  assert.equal(blocked.body.oneRM, undefined);
});

test('duplicate requestId is idempotent', async t => {
  const ctx = await createBillingTestContext();
  t.after(() => ctx.close());

  const {token} = await ctx.register('idempotent-user');
  const payload = {
    exerciseKey: 'bench',
    testWeight: 100,
    testReps: 5,
    requestId: 'same-req',
  };

  const first = await ctx.calculate(token, payload);
  const second = await ctx.calculate(token, payload);

  assert.equal(first.response.status, 200);
  assert.equal(second.response.status, 200);
  assert.equal(second.body.cached, true);
  assert.equal(first.body.oneRM, second.body.oneRM);
});

test('conflicting requestId returns 409', async t => {
  const ctx = await createBillingTestContext();
  t.after(() => ctx.close());

  const {token} = await ctx.register('conflict-user');

  await ctx.calculate(token, {
    exerciseKey: 'bench',
    testWeight: 100,
    testReps: 5,
    requestId: 'conflict-req',
  });

  const conflict = await ctx.calculate(token, {
    exerciseKey: 'bench',
    testWeight: 110,
    testReps: 5,
    requestId: 'conflict-req',
  });

  assert.equal(conflict.response.status, 409);
});

test('webhook CONFIRMED enables premium and CHARGEBACKED revokes when no other payment', async t => {
  const db = createDb({dbPath: ':memory:'});
  t.after(() => db.close());

  const hash = await bcrypt.hash('Secret123!', 10);
  db.createUser('premium-user', hash);

  db.createBillingPayment({
    id: 'pay-1',
    userName: 'premium-user',
    amount: 499,
    currency: 'RUB',
    status: 'PENDING',
    providerTransactionId: 'tx-1',
  });

  const config = {plategaPriceRub: 499};

  applyWebhookToDb(
    db,
    parsePlategaWebhookBody({
      id: 'tx-1',
      amount: 499,
      currency: 'RUB',
      status: 'CONFIRMED',
      payload: 'pay-1',
    }),
    config,
  );

  assert.equal(db.getUserPremiumFlag('premium-user'), true);

  applyWebhookToDb(
    db,
    parsePlategaWebhookBody({
      id: 'tx-1',
      amount: 499,
      currency: 'RUB',
      status: 'CHARGEBACKED',
      payload: 'pay-1',
    }),
    config,
  );

  assert.equal(db.getUserPremiumFlag('premium-user'), false);
});

test('verifyPlategaWebhookHeaders validates merchant credentials', () => {
  const config = {plategaMerchantId: 'm-1', plategaSecret: 's-1'};
  const ok = verifyPlategaWebhookHeaders(
    {headers: {'x-merchantid': 'm-1', 'x-secret': 's-1'}},
    config,
  );
  const bad = verifyPlategaWebhookHeaders(
    {headers: {'x-merchantid': 'm-1', 'x-secret': 'wrong'}},
    config,
  );
  assert.equal(ok, true);
  assert.equal(bad, false);
});

test('successful calculation updates user exercises snapshot', async t => {
  const ctx = await createBillingTestContext({PLATEGA_ENABLED: '0'});
  t.after(() => ctx.close());

  const {token, name} = await ctx.register('snapshot-user');

  await ctx.calculate(token, {
    exerciseKey: 'bench',
    testWeight: 100,
    testReps: 5,
    requestId: 'snap-1',
  });

  const userResponse = await fetch(`${ctx.baseUrl}/api/users/${encodeURIComponent(name)}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  const user = await userResponse.json();
  assert.equal(user.exercises.length, 1);
  assert.equal(user.exercises[0].exerciseKey, 'bench');
  assert.ok(user.exercises[0].oneRM > 0);
});
