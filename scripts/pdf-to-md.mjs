#!/usr/bin/env node
/**
 * Convert PDF → Markdown/JSON via OpenDataLoader PDF (pipx CLI).
 *
 * Usage:
 *   npm run pdf:md -- path/to/file.pdf
 *   npm run pdf:md -- path/to/file.pdf --out audit/out
 *   npm run pdf:md -- path/to/dir --format markdown,json
 *
 * Requires: pipx install opendataloader-pdf
 * Binary: ~/.local/bin/opendataloader-pdf
 */

import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import {homedir} from 'node:os';
import {basename, dirname, extname, join, resolve} from 'node:path';

const DEFAULT_BIN = join(homedir(), '.local', 'bin', 'opendataloader-pdf');

function findBinary() {
  const fromEnv = process.env.OPENDATALOADER_PDF_BIN;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  if (existsSync(DEFAULT_BIN)) return DEFAULT_BIN;
  const which = spawnSync('which', ['opendataloader-pdf'], {encoding: 'utf8'});
  if (which.status === 0 && which.stdout.trim()) return which.stdout.trim();
  return null;
}

function parseArgs(argv) {
  const positional = [];
  let outDir = null;
  let format = 'markdown';
  let quiet = false;
  const passthrough = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out' || arg === '-o') {
      outDir = argv[++i];
      continue;
    }
    if (arg === '--format' || arg === '-f') {
      format = argv[++i];
      continue;
    }
    if (arg === '--quiet' || arg === '-q') {
      quiet = true;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      return {help: true};
    }
    if (arg.startsWith('-')) {
      passthrough.push(arg);
      // Keep value for flags that take one (best-effort for unknown CLI opts)
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        passthrough.push(next);
        i += 1;
      }
      continue;
    }
    positional.push(arg);
  }

  return {positional, outDir, format, quiet, passthrough, help: false};
}

function printHelp() {
  console.log(`Usage: npm run pdf:md -- <pdf-or-dir> [--out DIR] [--format markdown,json] [opendataloader flags…]

Converts PDF to Markdown/JSON with OpenDataLoader PDF.

Install once:
  pipx install opendataloader-pdf
  # optional OCR hybrid: pipx inject opendataloader-pdf 'opendataloader-pdf[hybrid]'

Examples:
  npm run pdf:md -- audit/hardening-plan-2026-08.pdf
  npm run pdf:md -- audit/fiatarone-1990-strength-aging.pdf --out audit/_extracted --format markdown,json
`);
}

function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help || parsed.positional.length === 0) {
    printHelp();
    process.exit(parsed.help ? 0 : 1);
  }

  const bin = findBinary();
  if (!bin) {
    console.error(
      'opendataloader-pdf not found. Install with: pipx install opendataloader-pdf\n' +
        'Then ensure ~/.local/bin is on PATH (pipx ensurepath).',
    );
    process.exit(127);
  }

  const inputs = parsed.positional.map(p => resolve(p));
  for (const input of inputs) {
    if (!existsSync(input)) {
      console.error(`Input not found: ${input}`);
      process.exit(1);
    }
  }

  // Default output: sibling _extracted/<basename>/ for a single file, else ./_extracted
  let outDir = parsed.outDir ? resolve(parsed.outDir) : null;
  if (!outDir) {
    if (inputs.length === 1 && extname(inputs[0]).toLowerCase() === '.pdf') {
      outDir = join(dirname(inputs[0]), '_extracted', basename(inputs[0], '.pdf'));
    } else {
      outDir = join(process.cwd(), '_extracted');
    }
  }
  mkdirSync(outDir, {recursive: true});

  const args = [...inputs, '--output-dir', outDir, '--format', parsed.format];
  if (parsed.quiet) args.push('--quiet');
  args.push(...parsed.passthrough);

  console.log(`→ ${bin}`);
  console.log(`  in:  ${inputs.join(', ')}`);
  console.log(`  out: ${outDir}`);
  console.log(`  fmt: ${parsed.format}`);

  const result = spawnSync(bin, args, {stdio: 'inherit', env: process.env});
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

main();
