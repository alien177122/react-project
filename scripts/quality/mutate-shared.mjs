#!/usr/bin/env node
/**
 * Differential-style mutation pilot for packages/shared/src/utils/calc.ts.
 * Applies one AST-light text mutation at a time, runs calc unit + acceptance tests,
 * reports kill rate. Physical firewall on test quality (Uncle Bob Rule 3 adapted).
 */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const targetRel = 'packages/shared/src/utils/calc.ts';
const target = path.join(root, targetRel);
const manifestPath = path.join(root, 'scripts/quality/mutation-manifest-calc.json');
const MIN_KILL_RATE = 0.8;

const original = fs.readFileSync(target, 'utf8');

/** @typedef {{id: string; description: string; apply: (src: string) => string | null}} Mutator */

/** @type {Mutator[]} */
const mutators = [
  {
    id: 'epley-coeff-0333',
    description: 'Flip Epley high-rep coefficient 0.0333 → 0.0433',
    apply: src => {
      if (!src.includes('0.0333')) return null;
      return src.replace('0.0333', '0.0433');
    },
  },
  {
    id: 'brzycki-denom',
    description: 'Corrupt Brzycki constant 101.3 → 111.3 in formula',
    apply: src => {
      if (!src.includes('/ (101.3 -')) return null;
      return src.replace('/ (101.3 -', '/ (111.3 -');
    },
  },
  {
    id: 'volume-hi-threshold',
    description: 'Raise v-hi threshold 28 → 38',
    apply: src => {
      if (!/t >= 28/.test(src)) return null;
      return src.replace(/t >= 28/g, 't >= 38');
    },
  },
  {
    id: 'volume-lo-threshold',
    description: 'Raise v-lo threshold 16 → 20',
    apply: src => {
      if (!/t <= 16/.test(src)) return null;
      return src.replace(/t <= 16/g, 't <= 20');
    },
  },
  {
    id: 'round-c-floor-to-ceil',
    description: 'Type C rounding floor → ceil',
    apply: src => {
      if (!src.includes("if (type === 'C') return Math.floor")) return null;
      return src.replace(
        "if (type === 'C') return Math.floor(value / step) * step;",
        "if (type === 'C') return Math.ceil(value / step) * step;",
      );
    },
  },
  {
    id: 'calc1rm-reps-guard',
    description: 'Break reps guard reps < 1 → reps < 0',
    apply: src => {
      if (!src.includes('weight <= 0 || reps < 1')) return null;
      return src.replace('weight <= 0 || reps < 1', 'weight <= 0 || reps < 0');
    },
  },
  {
    id: 'working-weight-pct',
    description: 'Drop /100 in working weight percent',
    apply: src => {
      if (!src.includes('oneRM * (pct / 100)')) return null;
      return src.replace('oneRM * (pct / 100)', 'oneRM * pct');
    },
  },
  {
    id: 'reps-lt5-factor',
    description: 'Corrupt low-rep factor 1.0278 → 1.1278',
    apply: src => {
      if (!src.includes('1.0278')) return null;
      return src.replace(/1\.0278/g, '1.1278');
    },
  },
];

function runTests() {
  const unit = spawnSync(
    process.execPath,
    ['--test', '--experimental-strip-types', 'tests/calc.test.ts', 'tests/shared-calc.test.ts'],
    {cwd: root, encoding: 'utf8', env: process.env},
  );
  if (unit.status !== 0) return false;

  const acceptance = spawnSync(
    process.execPath,
    ['--experimental-strip-types', 'scripts/quality/gherkin-acceptance.mjs'],
    {cwd: root, encoding: 'utf8', env: process.env},
  );
  return acceptance.status === 0;
}

function restore() {
  fs.writeFileSync(target, original, 'utf8');
}

/** @type {{id: string; status: 'killed' | 'survived' | 'invalid' | 'error'; description: string}[]} */
const results = [];

console.log(`Mutation pilot: ${targetRel}`);
console.log(`Baseline tests...`);
if (!runTests()) {
  console.error('Baseline tests failed — abort mutation run');
  process.exit(1);
}
console.log('Baseline OK\n');

for (const mut of mutators) {
  const mutated = mut.apply(original);
  if (mutated === null || mutated === original) {
    results.push({id: mut.id, status: 'invalid', description: mut.description});
    console.log(`  ○ ${mut.id} (no site)`);
    continue;
  }
  try {
    fs.writeFileSync(target, mutated, 'utf8');
    const passed = runTests();
    const status = passed ? 'survived' : 'killed';
    results.push({id: mut.id, status, description: mut.description});
    console.log(`  ${status === 'killed' ? '✓' : '✗'} ${mut.id} → ${status}`);
  } catch (err) {
    results.push({id: mut.id, status: 'error', description: mut.description});
    console.log(`  ! ${mut.id} error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    restore();
  }
}

const applicable = results.filter(r => r.status === 'killed' || r.status === 'survived');
const killed = applicable.filter(r => r.status === 'killed').length;
const killRate = applicable.length === 0 ? 0 : killed / applicable.length;

const manifest = {
  target: targetRel,
  updatedAt: new Date().toISOString(),
  minKillRate: MIN_KILL_RATE,
  killRate,
  killed,
  total: applicable.length,
  results,
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`\nKill rate: ${(killRate * 100).toFixed(1)}% (${killed}/${applicable.length})`);
console.log(`Manifest: ${path.relative(root, manifestPath)}`);

if (killRate < MIN_KILL_RATE) {
  console.error(`FAIL: kill rate below ${(MIN_KILL_RATE * 100).toFixed(0)}%`);
  process.exit(1);
}
console.log('PASS');
