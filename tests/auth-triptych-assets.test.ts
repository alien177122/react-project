import assert from 'node:assert/strict';
import {existsSync, lstatSync} from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {AUTH_IMAGE_PHONE_SLOTS} from '../src/config/auth-image-phone.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('auth triptych uses WebP paths and high-res center, not PNG or tiny _.png', () => {
  const byPlacement = Object.fromEntries(
    AUTH_IMAGE_PHONE_SLOTS.map(slot => [slot.placement, slot]),
  );

  assert.equal(AUTH_IMAGE_PHONE_SLOTS.length, 3);
  assert.ok(byPlacement.left);
  assert.ok(byPlacement.center);
  assert.ok(byPlacement.right);

  for (const slot of AUTH_IMAGE_PHONE_SLOTS) {
    assert.match(slot.src, /^\/imagePhone\/.+\.webp$/i);
    assert.doesNotMatch(slot.src, /\.png$/i);
    assert.doesNotMatch(slot.src, /_\.png$/i);
    assert.doesNotMatch(slot.src, /^\/Users\//, 'must not be a Mac filesystem path');
    assert.doesNotMatch(slot.src, /^[A-Za-z]:[\\/]/, 'must not be a Windows filesystem path');
  }

  assert.ok(byPlacement.center.width >= 1000, 'center must not be the 433px _.png');
  assert.ok(byPlacement.center.height >= 1500);
  assert.equal(byPlacement.center.src, '/imagePhone/main.webp');
});

test('public/imagePhone is a real directory with the three triptych WebP files', () => {
  const dest = path.join(ROOT, 'public', 'imagePhone');
  assert.equal(existsSync(dest), true, 'public/imagePhone must contain auth triptych WebP');
  assert.equal(lstatSync(dest).isSymbolicLink(), false, 'Windows cannot follow the old symlink');

  for (const name of ['one.webp', 'main.webp', 'jkhkjh.webp']) {
    assert.equal(existsSync(path.join(dest, name)), true, `missing ${name}`);
  }
});
