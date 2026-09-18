import {readFileSync, writeFileSync} from 'node:fs';

function patch(path, pairs) {
  let t = readFileSync(path, 'utf8');
  for (const [a, b] of pairs) {
    if (!t.includes(a)) {
      console.error('MISSING in', path, JSON.stringify(a).slice(0, 160));
      process.exit(1);
    }
    t = t.replace(a, b);
  }
  writeFileSync(path, t);
  console.log('patched', path);
}

patch('src/config/auth-image-phone.ts', [
  [
    `/**
 * Auth triptych figures.
 * Sources used to live in project \`imagePhone/\` and were requested as \`/imagePhone/*.png\`.
 * Those files are no longer in \`public/\`; processed copies are in \`public/backgrounds/\`.
 */`,
    `/**
 * Auth triptych figures.
 * Sources used to live in project \`imagePhone/\` (\`main.png\` center, \`one.png\` left).
 * Venus does not have \`imagePhone/\`; center statue is the archived original
 * \`public/backgrounds/originals/discipline-statue-source.jpg\` (not the keyed/upscaled ambient).
 */`,
  ],
  [
    "slot('discipline', 'center', 'discipline-statue', 1194, 1920)",
    "slot('discipline', 'center', 'discipline-statue', 514, 1024)",
  ],
]);

const heroPath = 'src/components/auth/AuthHeroDecor.tsx';
const hero = readFileSync(heroPath, 'utf8');
const heroPatched = hero.replace(
  /\/\*\* Auth triptych[\s\S]*?\*\//,
  '/** Auth triptych — public/backgrounds (center = archived original, not keyed ambient). */',
);
if (hero === heroPatched) {
  console.error('AuthHeroDecor comment not replaced');
  process.exit(1);
}
writeFileSync(heroPath, heroPatched);
console.log('patched', heroPath);

patch('src/styles/components/auth/auth.css', [
  [
    `.auth-hero-decor__slot--center {
  inset-inline: 0;
  margin-inline: auto;
  width: min(42%, 320px);
  z-index: 3;
}`,
    `.auth-hero-decor__slot--center {
  inset-inline: 0;
  margin-inline: auto;
  /* Full original frame (514x1024) — do not squeeze into a postage-stamp column */
  width: min(58%, 520px);
  z-index: 3;
}`,
  ],
  [
    `  .auth-hero-decor__slot--center {
    width: min(38%, 400px);
  }`,
    `  .auth-hero-decor__slot--center {
    width: min(52%, 560px);
  }`,
  ],
  [
    `  .auth-hero-decor__slot--center {
    width: min(44%, 280px);
  }`,
    `  .auth-hero-decor__slot--center {
    width: min(52%, 420px);
  }`,
  ],
  [
    `  .auth-hero-decor__slot--center {
    width: min(72%, 300px);
  }`,
    `  .auth-hero-decor__slot--center {
    width: min(86%, 514px);
  }`,
  ],
]);
