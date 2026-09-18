import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';

const iosCssPath = path.join(process.cwd(), 'src/styles/base/ios-adaptation.css');

test('ios adaptation stylesheet defines dvh and safe-area handling', async () => {
  const css = await readFile(iosCssPath, 'utf8');

  assert.match(css, /100dvh/);
  assert.match(css, /safe-area-inset/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /--keyboard-inset/);
  assert.match(css, /app-shell__nav/);
  // Fixed dock: bottom 0 + safe-area as padding (not bottom offset)
  assert.match(css, /nav\.tab-bar\.ta-mode-nav\.app-shell__nav/);
  assert.match(css, /padding-bottom:\s*max\(var\(--space-2\),\s*var\(--sab\)\)/);
  assert.match(css, /#root:has\(\.app-shell\)/);
});

test('index.html exposes viewport-fit=cover for notched iPhones', async () => {
  const html = await readFile(path.join(process.cwd(), 'index.html'), 'utf8');
  assert.match(html, /viewport-fit=cover/);
});
