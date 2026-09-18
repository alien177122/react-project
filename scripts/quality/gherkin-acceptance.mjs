#!/usr/bin/env node
/**
 * Minimal Gherkin acceptance runner for Training Calculator.
 * Parses RU/EN Given/When/Then scenarios and asserts against shared calc.
 * Physical constraint: agents cannot skip acceptance without failing this script.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const featuresDir = path.join(root, 'features');

const {calc1RM, calcWorkingWeight} = await import(
  pathToFileURL(path.join(root, 'packages/shared/src/utils/calc.ts')).href
);
const {EXERCISES} = await import(
  pathToFileURL(path.join(root, 'packages/shared/src/data/exercises.ts')).href
);

/** @typedef {{ name: string; steps: {kind: string; text: string}[] }} Scenario */

/**
 * @param {string} text
 * @returns {Scenario[]}
 */
function parseFeature(text) {
  const lines = text.split(/\r?\n/);
  /** @type {Scenario[]} */
  const scenarios = [];
  /** @type {Scenario | null} */
  let current = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (
      !line ||
      line.startsWith('#') ||
      line.startsWith('Функционал:') ||
      line.startsWith('Feature:')
    ) {
      continue;
    }
    if (
      line.startsWith('Как ') ||
      line.startsWith('Я хочу') ||
      line.startsWith('Чтобы') ||
      line.startsWith('As ') ||
      line.startsWith('I want') ||
      line.startsWith('So that')
    ) {
      continue;
    }
    const scenarioMatch = line.match(/^(?:Сценарий|Scenario(?: Outline)?):\s*(.+)$/i);
    if (scenarioMatch) {
      current = {name: scenarioMatch[1].trim(), steps: []};
      scenarios.push(current);
      continue;
    }
    const stepMatch = line.match(/^(Дано|Когда|Тогда|И|Given|When|Then|And)\s+(.+)$/i);
    if (stepMatch && current) {
      const kindRaw = stepMatch[1].toLowerCase();
      const kind =
        kindRaw === 'дано' || kindRaw === 'given'
          ? 'given'
          : kindRaw === 'когда' || kindRaw === 'when'
            ? 'when'
            : kindRaw === 'тогда' || kindRaw === 'then'
              ? 'then'
              : 'and';
      current.steps.push({kind, text: stepMatch[2].trim()});
    }
  }
  return scenarios;
}

/**
 * @param {Scenario} scenario
 */
function runScenario(scenario) {
  /** @type {Record<string, number | string>} */
  const ctx = {};
  let lastAction = '';

  for (const step of scenario.steps) {
    const t = step.text;

    let m = t.match(/^рабочий вес\s+([\d.]+)\s*кг\s+и\s+(\d+)\s+повторений$/i);
    if (m) {
      ctx.weight = Number(m[1]);
      ctx.reps = Number(m[2]);
      continue;
    }

    m = t.match(/^oneRM\s+([\d.]+)\s+и\s+процент\s+([\d.]+)\s+для\s+упражнения\s+(\w+)$/i);
    if (m) {
      ctx.oneRM = Number(m[1]);
      ctx.pct = Number(m[2]);
      ctx.exercise = m[3];
      continue;
    }

    m = t.match(/^оцениваю\s+1ПМ\s+методом\s+(\w+)$/i);
    if (m) {
      lastAction = 'calc1RM';
      ctx.method = m[1];
      ctx.result = calc1RM(
        Number(ctx.weight),
        Number(ctx.reps),
        /** @type {'epley'|'brzycki'} */ (m[1]),
      );
      continue;
    }

    m = t.match(/^считаю\s+рабочий\s+вес$/i);
    if (m) {
      lastAction = 'calcWorkingWeight';
      const ex = EXERCISES[/** @type {string} */ (ctx.exercise)];
      if (!ex) throw new Error(`Unknown exercise: ${ctx.exercise}`);
      ctx.result = calcWorkingWeight(Number(ctx.oneRM), Number(ctx.pct), ex);
      continue;
    }

    m = t.match(/^1ПМ\s+примерно\s+([\d.]+)$/i);
    if (m) {
      const expected = Number(m[1]);
      const actual = Number(ctx.result);
      const rounded = Number(actual.toFixed(1));
      if (rounded !== expected && actual !== expected) {
        throw new Error(
          `${scenario.name}: expected 1RM ${expected}, got ${actual} (rounded ${rounded}) via ${lastAction}`,
        );
      }
      continue;
    }

    m = t.match(/^вес\s+равен\s+([\d.]+)$/i);
    if (m) {
      const expected = Number(m[1]);
      if (Number(ctx.result) !== expected) {
        throw new Error(`${scenario.name}: expected weight ${expected}, got ${ctx.result}`);
      }
      continue;
    }

    throw new Error(`${scenario.name}: unrecognized step: ${t}`);
  }
}

function collectFeatureFiles(dir) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFeatureFiles(full));
    else if (entry.name.endsWith('.feature')) out.push(full);
  }
  return out;
}

const files = collectFeatureFiles(featuresDir);
if (files.length === 0) {
  console.error('No .feature files under features/');
  process.exit(1);
}

let passed = 0;
let failed = 0;

for (const file of files) {
  const scenarios = parseFeature(fs.readFileSync(file, 'utf8'));
  console.log(`\n${path.relative(root, file)} (${scenarios.length} scenarios)`);
  for (const scenario of scenarios) {
    try {
      runScenario(scenario);
      console.log(`  ✓ ${scenario.name}`);
      passed += 1;
    } catch (err) {
      console.error(`  ✗ ${scenario.name}`);
      console.error(`    ${err instanceof Error ? err.message : String(err)}`);
      failed += 1;
    }
  }
}

console.log(`\nAcceptance: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
