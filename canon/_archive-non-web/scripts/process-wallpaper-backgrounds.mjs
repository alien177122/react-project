#!/usr/bin/env node
/**
 * Wallpaper background pipeline — isolate subject, amber/peach glow, 4× upscale, web compress.
 *
 * Usage:
 *   node scripts/process-wallpaper-backgrounds.mjs
 *   node scripts/process-wallpaper-backgrounds.mjs --input path/to.png --slug my-wallpaper
 *
 * Canon: memory-bank/reference/wallpaper-background-pipeline-standard.md
 */

import {mkdirSync, writeFileSync, readFileSync, existsSync, copyFileSync} from 'node:fs';
import {execSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'backgrounds');
const ORIGINALS_DIR = path.join(OUT_DIR, 'originals');
const INTERMEDIATE_DIR = path.join(OUT_DIR, 'intermediate');

/** App accent — amber/peach, not lemon yellow */
const ACCENT = {r: 255, g: 176, b: 32}; // #ffb020
const GLOW_INNER = {r: 201, g: 134, b: 90}; // muted amber-peach
const GLOW_OUTER = {r: 232, g: 196, b: 168}; // soft peach
/** Matches auth screen + app ambient canvas — NOT #0a0c10 (navy shift visible on auth triptych). */
const APP_BG = {r: 10, g: 10, b: 11}; // #0a0a0b

const MAX_BYTES = 500 * 1024;
const UPSCALE_FACTOR = 4;
/** Delivery long edge after 4× upscale (keeps mobile payload reasonable) */
const DELIVERY_LONG_EDGE = 1920;

const DEFAULT_SOURCES = [
  {
    slug: 'discipline-statue',
    label: 'DISCIPLINE statue B&W',
    input:
      '/Users/steve_gordiyenko/.cursor/projects/Users-steve-gordiyenko-Desktop-React-Project/assets/d5b336d7b103aacf8e40c4e9a359f474-afc5ceef-add0-45dc-ad69-6140009ac3f0.png',
    luminanceFloor: 28,
    warmStrength: 0.22,
    glowStrength: 0.55,
    glowBlur: 48,
  },
  {
    slug: 'why-not-me',
    label: 'WHY NOT ME anime (centered)',
    input:
      '/Users/steve_gordiyenko/.cursor/projects/Users-steve-gordiyenko-Desktop-React-Project/assets/2-19bb6958-9806-4794-afef-7056d6324971.png',
    luminanceFloor: 24,
    warmStrength: 0.2,
    glowStrength: 0.5,
    glowBlur: 44,
  },
  {
    slug: 'why-not-me-alt',
    label: 'WHY NOT ME anime (offset)',
    input:
      '/Users/steve_gordiyenko/.cursor/projects/Users-steve-gordiyenko-Desktop-React-Project/assets/_-a7a10321-62a3-4b67-96a3-bd4158adcbb1.png',
    luminanceFloor: 24,
    warmStrength: 0.2,
    glowStrength: 0.5,
    glowBlur: 44,
  },
  {
    slug: 'discipline-hammer',
    label: 'Discipline hammer statue B&W (auth left)',
    input:
      '/Users/steve_gordiyenko/.cursor/projects/Users-steve-gordiyenko-Desktop-React-Project/assets/one-36ac5bdc-fde4-449e-9793-d6af5ab5f5b9.png',
    luminanceFloor: 28,
    warmStrength: 0.22,
    glowStrength: 0.55,
    glowBlur: 48,
  },
  {
    slug: 'manga-back',
    label: 'Manga back muscles B&W (auth right)',
    input:
      '/Users/steve_gordiyenko/.cursor/projects/Users-steve-gordiyenko-Desktop-React-Project/assets/___1_-1a2e0281-6ece-4e48-bd4e-e9d77650433a.png',
    luminanceFloor: 24,
    warmStrength: 0.22,
    glowStrength: 0.48,
    glowBlur: 40,
  },
];

/** User-supplied auth triptych — clean B&W matte, no amber/cyan glow in asset. */
const IMAGE_PHONE_SOURCES = [
  {
    slug: 'discipline-hammer',
    label: 'Auth left (imagePhone/one)',
    input: path.join(ROOT, 'imagePhone', 'one.png'),
    luminanceFloor: 28,
    warmStrength: 0,
    glowStrength: 0,
    glowBlur: 0,
  },
  {
    slug: 'discipline-statue',
    label: 'Auth center (imagePhone/main)',
    input: path.join(ROOT, 'imagePhone', 'main.png'),
    luminanceFloor: 28,
    warmStrength: 0,
    glowStrength: 0,
    glowBlur: 0,
  },
  {
    slug: 'manga-back',
    label: 'Auth right (imagePhone/_ (1) / jkhkjh alpha)',
    // Prefer true-alpha cutout; opaque RGB/_ (1) JPEG-derived PNGs recreate the black rect
    input: path.join(ROOT, 'imagePhone', 'jkhkjh.png'),
    luminanceFloor: 24,
    warmStrength: 0,
    glowStrength: 0,
    glowBlur: 0,
    preserveAlpha: true,
  },
];

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function fadeEdgeAlpha(rgba, width, height, margin = 16) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const edgeDist = Math.min(x, y, width - 1 - x, height - 1 - y);
      if (edgeDist >= margin) continue;
      const o = (y * width + x) * 4;
      const fade = edgeDist / margin;
      rgba[o + 3] = clamp(rgba[o + 3] * fade);
    }
  }
}

/**
 * Isolate foreground from black bg, warm-grade highlights, composite amber glow on app bg.
 */
async function processWallpaper({
  input,
  slug,
  label,
  luminanceFloor,
  warmStrength,
  glowStrength,
  glowBlur,
  transparentMatte = true,
  /** Keep source alpha (true cutouts). Do not re-key near-black — that eats statue shadows. */
  preserveAlpha = false,
}) {
  const meta = await sharp(input).metadata();
  const {width, height} = meta;
  const raw = await sharp(input).ensureAlpha().raw().toBuffer();
  const useSourceAlpha = preserveAlpha && meta.hasAlpha === true;

  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    let r = raw[o];
    let g = raw[o + 1];
    let b = raw[o + 2];
    const srcA = raw[o + 3] / 255;
    const lum = luminance(r, g, b);
    const peak = Math.max(r, g, b);

    // Alpha: near-black → transparent; peak channel keys matte seams better than lum alone
    // When preserveAlpha: trust the cutout (opaque black JPEG sources must be keyed separately)
    const key = Math.max(lum, peak * 0.92);
    const keyed = smoothstep(luminanceFloor - 14, luminanceFloor + 16, key);
    const alpha = useSourceAlpha ? srcA : keyed;

    if (alpha > 0.01) {
      // Warm amber/peach tint on midtones & highlights (not lemon)
      const warmT = smoothstep(luminanceFloor, 220, lum) * warmStrength;
      r = clamp(r + (ACCENT.r - r) * warmT * 0.35 + (GLOW_INNER.r - r) * warmT * 0.15);
      g = clamp(g + (ACCENT.g - g) * warmT * 0.28 + (GLOW_INNER.g - g) * warmT * 0.12);
      b = clamp(b + (ACCENT.b - b) * warmT * 0.12 + (GLOW_OUTER.b - b) * warmT * 0.08);
    }

    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = clamp(alpha * 255);
  }

  const subject = await sharp(rgba, {raw: {width, height, channels: 4}})
    .png()
    .toBuffer();

  const matteBackground = transparentMatte ? {r: 0, g: 0, b: 0, alpha: 0} : {...APP_BG, alpha: 255};

  const compositeLayers = [{input: subject, blend: 'over'}];
  if (glowStrength > 0 && glowBlur > 0) {
    const glowAlpha = await sharp(subject).extractChannel('alpha').blur(glowBlur).toBuffer();
    const glowLayer = await sharp({
      create: {
        width,
        height,
        channels: 3,
        background: {r: GLOW_INNER.r, g: GLOW_INNER.g, b: GLOW_OUTER.b},
      },
    })
      .joinChannel(glowAlpha)
      .png()
      .toBuffer();
    const glowScaled = await sharp(glowLayer)
      .ensureAlpha()
      .linear([1, 1, 1, glowStrength], [0, 0, 0, 0])
      .png()
      .toBuffer();
    compositeLayers.unshift({input: glowScaled, blend: 'screen'});
  }

  const composed = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: matteBackground,
    },
  })
    .composite(compositeLayers)
    .png()
    .toBuffer();

  // 4× Lanczos upscale
  const upscaledW = width * UPSCALE_FACTOR;
  const upscaledH = height * UPSCALE_FACTOR;
  const upscaled = await sharp(composed)
    .resize(upscaledW, upscaledH, {kernel: sharp.kernel.lanczos3})
    .png()
    .toBuffer();

  const upscaledPath = path.join(INTERMEDIATE_DIR, `${slug}-4x.png`);
  writeFileSync(upscaledPath, upscaled);

  // Delivery resize (long edge cap)
  const longEdge = Math.max(upscaledW, upscaledH);
  const scale = longEdge > DELIVERY_LONG_EDGE ? DELIVERY_LONG_EDGE / longEdge : 1;
  const deliveryW = Math.round(upscaledW * scale);
  const deliveryH = Math.round(upscaledH * scale);

  // Fade edge alpha after delivery resize — upscale interpolation otherwise revives corner glow
  // Skip for true cutouts: edge fade soft-crops the silhouette against auth canvas
  let deliveryBase = await sharp(upscaled)
    .resize(deliveryW, deliveryH, {kernel: sharp.kernel.lanczos3})
    .png()
    .toBuffer();

  if (!preserveAlpha) {
    const deliveryMeta = await sharp(deliveryBase).metadata();
    const deliveryRaw = await sharp(deliveryBase).ensureAlpha().raw().toBuffer();
    const edgeMargin = Math.max(24, Math.round(Math.min(deliveryW, deliveryH) * 0.025));
    fadeEdgeAlpha(deliveryRaw, deliveryMeta.width, deliveryMeta.height, edgeMargin);
    deliveryBase = await sharp(deliveryRaw, {
      raw: {width: deliveryMeta.width, height: deliveryMeta.height, channels: 4},
    })
      .png()
      .toBuffer();
  }

  const webpPath = path.join(OUT_DIR, `${slug}-ambient.webp`);
  const pngPath = path.join(OUT_DIR, `${slug}-ambient.png`);

  // Iterative WebP quality for <500 KB target
  let quality = 82;
  let webpBuf;
  for (; quality >= 50; quality -= 4) {
    webpBuf = await sharp(deliveryBase)
      .webp({
        quality,
        effort: 6,
        smartSubsample: true,
        alphaQuality: transparentMatte ? 100 : undefined,
      })
      .toBuffer();
    if (webpBuf.length <= MAX_BYTES) break;
  }

  writeFileSync(webpPath, webpBuf);

  // PNG fallback via pngquant if available
  const pngTemp = path.join(INTERMEDIATE_DIR, `${slug}-delivery.png`);
  writeFileSync(pngTemp, deliveryBase);

  let pngSize = deliveryBase.length;
  try {
    execSync(`pngquant --quality=65-85 --speed 1 --force --output "${pngPath}" "${pngTemp}"`, {
      stdio: 'pipe',
    });
    pngSize = readFileSync(pngPath).length;
  } catch {
    writeFileSync(pngPath, deliveryBase);
    pngSize = deliveryBase.length;
  }

  // Archive source copy
  const srcArchive = path.join(ORIGINALS_DIR, `${slug}-source.jpg`);
  if (!existsSync(srcArchive)) {
    copyFileSync(input, srcArchive);
  }

  const log = {
    slug,
    label,
    source: {path: input, width, height},
    upscale: {width: upscaledW, height: upscaledH, path: upscaledPath},
    delivery: {
      width: deliveryW,
      height: deliveryH,
      webp: {path: webpPath, bytes: webpBuf.length, quality},
      png: {path: pngPath, bytes: pngSize},
    },
    params: {luminanceFloor, warmStrength, glowStrength, glowBlur, transparentMatte, preserveAlpha},
  };

  return log;
}

function parseArgs(argv) {
  const args = {sources: DEFAULT_SOURCES, mergeManifest: false};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--phone') {
      args.sources = IMAGE_PHONE_SOURCES;
      args.mergeManifest = true;
    } else if (argv[i] === '--input' && argv[i + 1]) {
      args.sources = [
        {
          slug: argv[i + 2] || 'custom',
          label: 'custom',
          input: argv[++i],
          luminanceFloor: 26,
          warmStrength: 0.2,
          glowStrength: 0.5,
          glowBlur: 44,
        },
      ];
      if (argv[i + 1] && !argv[i + 1].startsWith('--')) args.sources[0].slug = argv[++i];
    }
  }
  return args;
}

async function main() {
  mkdirSync(OUT_DIR, {recursive: true});
  mkdirSync(ORIGINALS_DIR, {recursive: true});
  mkdirSync(INTERMEDIATE_DIR, {recursive: true});

  const {sources, mergeManifest} = parseArgs(process.argv);
  const results = [];

  for (const src of sources) {
    if (!existsSync(src.input)) {
      console.error(`✗ Missing source: ${src.input}`);
      continue;
    }
    console.log(`→ Processing ${src.label} (${src.slug})…`);
    const log = await processWallpaper(src);
    results.push(log);
    const kb = (log.delivery.webp.bytes / 1024).toFixed(1);
    console.log(
      `  ✓ ${log.delivery.width}×${log.delivery.height} webp q${log.delivery.webp.quality} — ${kb} KB`,
    );
  }

  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  let mergedResults = results;
  if (mergeManifest && existsSync(manifestPath)) {
    const prior = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const bySlug = new Map((prior.results ?? []).map(entry => [entry.slug, entry]));
    for (const entry of results) bySlug.set(entry.slug, entry);
    mergedResults = [...bySlug.values()];
  }
  writeFileSync(
    manifestPath,
    JSON.stringify({generatedAt: new Date().toISOString(), results: mergedResults}, null, 2),
  );
  console.log(`\n✓ Manifest: ${path.relative(ROOT, manifestPath)}`);
  return results;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
