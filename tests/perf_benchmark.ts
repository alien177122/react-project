import { test } from 'node:test';
import assert from 'node:assert';

test('O(N*M) vs Map lookup benchmark', () => {
  const M = 1000;
  const N = 1000;
  const ITERATIONS = 100;

  const lookupKeys = Array.from({ length: N }, (_, i) => `key-${i}`);
  const dataArray = Array.from({ length: M }, (_, i) => ({ exerciseKey: `key-${i}`, value: i }));

  // O(N*M)
  const startONM = performance.now();
  let foundONM = 0;
  for (let iter = 0; iter < ITERATIONS; iter++) {
    for (const key of lookupKeys) {
      const found = dataArray.find(item => item.exerciseKey === key);
      if (found) foundONM++;
    }
  }
  const timeONM = performance.now() - startONM;

  // O(N) + O(1)
  const startMap = performance.now();
  let foundMap = 0;
  for (let iter = 0; iter < ITERATIONS; iter++) {
    const dataMap = new Map();
    for (const item of dataArray) {
      dataMap.set(item.exerciseKey, item);
    }
    for (const key of lookupKeys) {
      const found = dataMap.get(key);
      if (found) foundMap++;
    }
  }
  const timeMap = performance.now() - startMap;

  console.log(`\nBenchmark Results:`);
  console.log(`O(N*M) approach: ${timeONM.toFixed(2)}ms`);
  console.log(`Map lookup approach: ${timeMap.toFixed(2)}ms`);
  console.log(`Improvement: ${(timeONM / timeMap).toFixed(2)}x faster\n`);

  assert.equal(foundONM, foundMap);
});
