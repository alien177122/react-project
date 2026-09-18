#!/usr/bin/env node
/**
 * Production-only dependency audit gate.
 * Ignores Expo/Electron/dev tooling noise unless it lands in --omit=dev tree.
 * Exit 1 on high/critical (default); use --allow-high to fail only on critical.
 */
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const allowHigh = process.argv.includes('--allow-high');
const level = allowHigh ? 'critical' : 'high';

const result = spawnSync('npm', ['audit', '--omit=dev', `--audit-level=${level}`, '--json'], {
  cwd: root,
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

let json;
try {
  json = JSON.parse(result.stdout || '{}');
} catch {
  console.error(result.stdout || result.stderr || 'npm audit failed to parse');
  process.exit(result.status ?? 1);
}

const meta = json.metadata?.vulnerabilities ?? {};
const summary = {
  critical: meta.critical ?? 0,
  high: meta.high ?? 0,
  moderate: meta.moderate ?? 0,
  low: meta.low ?? 0,
  info: meta.info ?? 0,
};

console.log('npm audit --omit=dev');
console.log(JSON.stringify(summary, null, 2));

const vulns = json.vulnerabilities ?? {};
const criticalNames = Object.entries(vulns)
  .filter(([, v]) => v.severity === 'critical')
  .map(([name]) => name);
const highNames = Object.entries(vulns)
  .filter(([, v]) => v.severity === 'high')
  .map(([name]) => name);
if (criticalNames.length) {
  console.log('critical packages:', criticalNames.join(', '));
}
if (highNames.length && !allowHigh) {
  console.log('high packages:', highNames.slice(0, 20).join(', '));
}

const fail = summary.critical > 0 || (!allowHigh && summary.high > 0);

if (fail) {
  console.error(
    `\nAUDIT FAIL: production tree has ${summary.critical} critical, ${summary.high} high (threshold=${level})`,
  );
  process.exit(1);
}

console.log('\nAUDIT PASS (prod)');
process.exit(0);
