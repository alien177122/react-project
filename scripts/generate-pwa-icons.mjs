#!/usr/bin/env node
/**
 * Generate placeholder PWA / iOS app icons.
 *
 * Output (overwrites if present):
 *   public/icons/icon-192.png         — Android Chrome / generic PWA
 *   public/icons/icon-512.png         — large PWA
 *   public/icons/icon-512-maskable.png — maskable variant with 10% safe-zone padding
 *   public/icons/apple-touch-icon.png — iOS home-screen, 180×180, no transparency
 *
 * Visual: solid `#0a0c10` background, centred `#ff9f40` rounded square,
 * orange ring of negative space. No glyph rendering — pure rectangles
 * keep this dependency-free (uses only `node:zlib` and `node:fs`).
 *
 * Brand asset replacement is a follow-up; this is intentional placeholder.
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { deflateSync } from 'node:zlib'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

// --- minimal PNG writer (8-bit RGBA, no compression options) ---

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

function writePng(width, height, pixels) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr.writeUInt8(8, 8)   // bit depth
  ihdr.writeUInt8(6, 9)   // color type RGBA
  ihdr.writeUInt8(0, 10)  // compression
  ihdr.writeUInt8(0, 11)  // filter
  ihdr.writeUInt8(0, 12)  // interlace

  // Each scanline prefixed with filter byte 0
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }
  const idat = deflateSync(raw)

  return Buffer.concat([SIGNATURE, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

// --- pixel painter ---

function color(rgba) {
  // Returns [r, g, b, a] from #rrggbb or #rrggbbaa
  const hex = rgba.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const a = hex.length >= 8 ? parseInt(hex.slice(6, 8), 16) : 255
  return [r, g, b, a]
}

function paint(size, opts) {
  const { bg, fg, glyphRatio = 0.46, cornerRatio = 0.18 } = opts
  const [br, bg_, bb, ba] = color(bg)
  const [fr, fg_, fb, fa] = color(fg)
  const buf = Buffer.alloc(size * size * 4)

  // Centred square params
  const sq = Math.round(size * glyphRatio)
  const sqOffset = Math.round((size - sq) / 2)
  const radius = Math.round(sq * cornerRatio)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      let r = br, g = bg_, b = bb, a = ba

      // Inside centred rounded square
      const sx = x - sqOffset
      const sy = y - sqOffset
      if (sx >= 0 && sx < sq && sy >= 0 && sy < sq) {
        // Corner check
        const inCorner =
          (sx < radius && sy < radius && Math.hypot(radius - sx, radius - sy) > radius) ||
          (sx >= sq - radius && sy < radius && Math.hypot(sx - (sq - radius - 1), radius - sy) > radius) ||
          (sx < radius && sy >= sq - radius && Math.hypot(radius - sx, sy - (sq - radius - 1)) > radius) ||
          (sx >= sq - radius && sy >= sq - radius && Math.hypot(sx - (sq - radius - 1), sy - (sq - radius - 1)) > radius)
        if (!inCorner) {
          r = fr; g = fg_; b = fb; a = fa
        }
      }

      buf[i] = r
      buf[i + 1] = g
      buf[i + 2] = b
      buf[i + 3] = a
    }
  }
  return buf
}

const VARIANTS = [
  // Standard PWA icons: filled background, centred accent square
  { name: 'icon-192.png',          size: 192, bg: '#0a0c10', fg: '#ff9f40', glyphRatio: 0.50 },
  { name: 'icon-512.png',          size: 512, bg: '#0a0c10', fg: '#ff9f40', glyphRatio: 0.50 },
  // Maskable: glyph fits in safe zone (~80%), so logo doesn't get cropped by adaptive masks
  { name: 'icon-512-maskable.png', size: 512, bg: '#0a0c10', fg: '#ff9f40', glyphRatio: 0.40 },
  // iOS home-screen: 180×180, no transparency, glyph slightly larger (no maskable padding)
  { name: 'apple-touch-icon.png',  size: 180, bg: '#0a0c10', fg: '#ff9f40', glyphRatio: 0.55 },
]

for (const v of VARIANTS) {
  const pixels = paint(v.size, v)
  const png = writePng(v.size, v.size, pixels)
  const out = path.join(outDir, v.name)
  writeFileSync(out, png)
  console.log(`✓ ${path.relative(process.cwd(), out)} (${png.length} bytes)`)
}
