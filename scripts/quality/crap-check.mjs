#!/usr/bin/env node
/**
 * CRAP-lite complexity gate for pure shared modules.
 * Counts decision points (if/for/while/case/&&/||/?) per exported function body
 * via lightweight scan. Pilot threshold mirrors constitution (≤ 12).
 * Full CRAP (complexity × coverage) lands after coverage reports stabilize.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const MAX_COMPLEXITY = 12;
/** Known legacy hotspots allowed in pilot (must not grow). */
const COMPLEXITY_ALLOWLIST = {
  'packages/shared/src/utils/volume-breakdown.ts::computeMuscleVolumeBreakdown': 14,
};
const MAX_SITES_WARN = 100;

const targets = [
  'packages/shared/src/utils/calc.ts',
  'packages/shared/src/utils/calcValidators.ts',
  'packages/shared/src/utils/plates.ts',
  'packages/shared/src/utils/pyramid.ts',
  'packages/shared/src/utils/journalMetrics.ts',
  'packages/shared/src/utils/volume-breakdown.ts',
  'packages/shared/src/program/progressionPresets.ts',
];

/**
 * @param {string} src
 * @returns {{name: string; complexity: number; approxSites: number}[]}
 */
function analyzeFunctions(src) {
  /** @type {{name: string; complexity: number; approxSites: number}[]} */
  const out = [];
  const fnRe =
    /(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{/g;
  let match;
  while ((match = fnRe.exec(src)) !== null) {
    const name = match[1];
    const start = match.index + match[0].length - 1;
    let depth = 0;
    let end = start;
    for (let i = start; i < src.length; i += 1) {
      const ch = src[i];
      if (ch === '{') depth += 1;
      else if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const body = src.slice(start, end + 1);
    const decisions =
      (body.match(/\bif\b/g) || []).length +
      (body.match(/\bfor\b/g) || []).length +
      (body.match(/\bwhile\b/g) || []).length +
      (body.match(/\bcase\b/g) || []).length +
      (body.match(/\bcatch\b/g) || []).length +
      (body.match(/\?/g) || []).length +
      (body.match(/&&|\|\|/g) || []).length;
    const complexity = 1 + decisions;
    const approxSites =
      (body.match(/[+\-*/%<>=!&|?:]/g) || []).length + (body.match(/\breturn\b/g) || []).length;
    out.push({name, complexity, approxSites});
  }
  return out;
}

let failed = 0;
let warned = 0;

for (const rel of targets) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.log(`skip missing ${rel}`);
    continue;
  }
  const src = fs.readFileSync(full, 'utf8');
  const fns = analyzeFunctions(src);
  console.log(`\n${rel}`);
  let fileSites = 0;
  for (const fn of fns) {
    fileSites += fn.approxSites;
    const allowKey = `${rel}::${fn.name}`;
    const limit = COMPLEXITY_ALLOWLIST[allowKey] ?? MAX_COMPLEXITY;
    const mark = fn.complexity > limit ? 'FAIL' : fn.complexity > MAX_COMPLEXITY ? 'legacy' : 'ok';
    if (fn.complexity > limit) failed += 1;
    console.log(
      `  [${mark}] ${fn.name} complexity=${fn.complexity} limit=${limit} sites≈${fn.approxSites}`,
    );
  }
  if (fileSites > MAX_SITES_WARN) {
    warned += 1;
    console.log(`  WARN file mutation sites ≈ ${fileSites} (> ${MAX_SITES_WARN}) — consider split`);
  }
}

console.log(`\nCRAP-lite: threshold complexity ≤ ${MAX_COMPLEXITY}`);
if (failed > 0) {
  console.error(`FAIL: ${failed} function(s) over complexity limit`);
  process.exit(1);
}
if (warned > 0) {
  console.log(`WARN: ${warned} file(s) over site budget (non-blocking in pilot)`);
}
console.log('PASS');
