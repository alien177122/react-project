#!/usr/bin/env node
/**
 * Physical quality gate (Uncle Bob gauntlet adapted).
 * Exit non-zero on first failure — agents cannot talk past this.
 */
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const tier = process.argv.includes('--tier=a') || process.argv.includes('--full') ? 'A' : 'B';

/** @type {{name: string; cmd: string; args: string[]; tier: 'B' | 'A'}[]} */
const steps = [
  // Full `npm run lint` still has legacy UI debt; physical Uncle Bob gates below.
  {name: 'typecheck', cmd: 'npm', args: ['run', 'typecheck'], tier: 'B'},
  {name: 'unit', cmd: 'npm', args: ['test'], tier: 'B'},
  {name: 'acceptance', cmd: 'npm', args: ['run', 'test:acceptance'], tier: 'A'},
  {name: 'crap-lite', cmd: 'npm', args: ['run', 'test:crap'], tier: 'A'},
  {name: 'mutation', cmd: 'npm', args: ['run', 'test:mutate'], tier: 'A'},
  {
    name: 'lint-calc-complexity',
    cmd: 'npx',
    args: [
      'eslint',
      'packages/shared/src/utils/calc.ts',
      'packages/shared/src/utils/calcValidators.ts',
      'packages/shared/src/utils/plates.ts',
      'packages/shared/src/utils/journalMetrics.ts',
      '--max-warnings',
      '0',
    ],
    tier: 'A',
  },
];

console.log(`Quality gate tier ${tier}`);

for (const step of steps) {
  if (step.tier === 'A' && tier !== 'A') continue;
  console.log(`\n── ${step.name} ──`);
  const result = spawnSync(step.cmd, step.args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(`\nGATE FAIL: ${step.name}`);
    process.exit(result.status ?? 1);
  }
}

console.log('\nGATE PASS');
