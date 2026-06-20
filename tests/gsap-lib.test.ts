import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {configureAppGsap, resetAppGsapForTests} from '../src/lib/gsap/configureAppGsap.ts';

describe('configureAppGsap', () => {
  it('is idempotent and does not throw in Node', () => {
    resetAppGsapForTests();
    assert.doesNotThrow(() => {
      configureAppGsap();
      configureAppGsap();
    });
  });
});
