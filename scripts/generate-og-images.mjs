#!/usr/bin/env node
/**
 * Generate Open Graph preview images (1200×630 PNG).
 * Run: node scripts/generate-og-images.mjs
 */

import {writeFileSync, mkdirSync} from 'node:fs';
import {deflateSync} from 'node:zlib';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'public', 'og');
mkdirSync(outDir, {recursive: true});

const WIDTH = 1200;
const HEIGHT = 630;

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function writePng(width, height, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const idat = deflateSync(raw);
  return Buffer.concat([
    SIGNATURE,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
    255,
  ];
}

function paintOg({accent, stripe = 12}) {
  const [bgR, bgG, bgB] = hexToRgb('#0a0c10');
  const [cardR, cardG, cardB] = hexToRgb('#151a22');
  const [accentR, accentG, accentB] = hexToRgb(accent);
  const buf = Buffer.alloc(WIDTH * HEIGHT * 4);

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      let r = bgR;
      let g = bgG;
      let b = bgB;

      const inCard = x >= 72 && x <= WIDTH - 72 && y >= 72 && y <= HEIGHT - 72;
      if (inCard) {
        r = cardR;
        g = cardG;
        b = cardB;
      }

      if (x >= 72 && x < 72 + stripe && y >= 72 && y <= HEIGHT - 72) {
        r = accentR;
        g = accentG;
        b = accentB;
      }

      const glowX = WIDTH - 220;
      const glowY = 120;
      const dist = Math.hypot(x - glowX, y - glowY);
      if (dist < 180) {
        const t = 1 - dist / 180;
        r = Math.round(r + (accentR - r) * t * 0.35);
        g = Math.round(g + (accentG - g) * t * 0.35);
        b = Math.round(b + (accentB - b) * t * 0.35);
      }

      buf[i] = r;
      buf[i + 1] = g;
      buf[i + 2] = b;
      buf[i + 3] = 255;
    }
  }

  return buf;
}

const ACCENTS = {
  default: '#f07a43',
  basics: '#f07a43',
  mtor: '#5ba4ff',
  tiers: '#3affb8',
  top3: '#ff9f40',
  specs: '#ff6b35',
  tendons: '#c49070',
  strength: '#ef4444',
  cardio: '#22c55e',
  recovery: '#a78bfa',
  progression: '#f59e0b',
};

for (const [id, accent] of Object.entries(ACCENTS)) {
  const name = id === 'default' ? 'og-default.png' : `og-${id}.png`;
  const pixels = paintOg({accent});
  const png = writePng(WIDTH, HEIGHT, pixels);
  const out = path.join(outDir, name);
  writeFileSync(out, png);
  console.log(`✓ ${path.relative(process.cwd(), out)} (${png.length} bytes)`);
}
