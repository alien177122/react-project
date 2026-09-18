import assert from 'node:assert/strict';
import test from 'node:test';
import {createDb} from '../server/db.js';
import {getServerConfig} from '../server/config.js';

test('getServerConfig defaults jwtExpiresIn to 24h interim', () => {
  const config = getServerConfig({NODE_ENV: 'development'});
  assert.equal(config.jwtExpiresIn, '24h');
});

test('getServerConfig reads JWT_EXPIRES_IN override', () => {
  const config = getServerConfig({NODE_ENV: 'development', JWT_EXPIRES_IN: '1h'});
  assert.equal(config.jwtExpiresIn, '1h');
});

test('createDb supports token_version bump for logout revoke', () => {
  const db = createDb({dbPath: ':memory:'});
  db.createUser('Alice', 'hash');
  assert.equal(db.getTokenVersion('Alice'), 0);
  assert.equal(db.bumpTokenVersion('Alice'), 1);
  assert.equal(db.getTokenVersion('Alice'), 1);
  const auth = db.getUserAuth('Alice');
  assert.ok(auth);
  assert.equal(auth.token_version, 1);
  db.close();
});
