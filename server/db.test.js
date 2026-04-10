import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';

process.env.NODE_ENV = 'test';

import {
  userExists,
  getUserAuth,
  createUser,
  getUser,
  putUser,
  delUser,
} from './db.js';

describe('Database Operations', () => {
  test('userExists returns false for non-existent user', () => {
    assert.strictEqual(userExists('nonexistent'), false);
  });

  test('createUser adds a user and userExists returns true', () => {
    delUser('testuser1');
    createUser('testuser1', 'testhash');
    assert.strictEqual(userExists('testuser1'), true);
  });

  test('getUserAuth returns user name and password hash', () => {
    delUser('testuser2');
    createUser('testuser2', 'testhash2');
    const auth = getUserAuth('testuser2');
    assert.deepStrictEqual(auth, { name: 'testuser2', password_hash: 'testhash2' });
  });

  test('getUser returns empty object (default data) for new user', () => {
    delUser('testuser3');
    createUser('testuser3', 'testhash3');
    const data = getUser('testuser3');
    assert.deepStrictEqual(data, {});
  });

  test('putUser updates user data and getUser retrieves it', () => {
    delUser('testuser4');
    createUser('testuser4', 'testhash4');
    const testData = { theme: 'dark', settings: [1, 2, 3] };
    putUser('testuser4', testData);
    const data = getUser('testuser4');
    assert.deepStrictEqual(data, testData);
  });

  test('delUser removes the user', () => {
    delUser('testuser5');
    createUser('testuser5', 'testhash5');
    delUser('testuser5');
    assert.strictEqual(userExists('testuser5'), false);
    assert.strictEqual(getUserAuth('testuser5'), undefined);
    assert.strictEqual(getUser('testuser5'), null);
  });

  test('createUser throws an error for duplicate users', () => {
    delUser('dupuser');
    createUser('dupuser', 'hash1');
    assert.throws(() => {
      createUser('dupuser', 'hash2');
    }, (err) => {
      return err.code === 'SQLITE_CONSTRAINT_PRIMARYKEY';
    });
  });
});
