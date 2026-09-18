/**
 * Copy auth triptych WebP into public/imagePhone as real files.
 * Windows cannot follow the old Unix symlink public/imagePhone → ../imagePhone,
 * and tar --exclude='imagePhone' previously dropped the assets from Venus packs.
 */
import {cpSync, existsSync, lstatSync, mkdirSync, rmSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'imagePhone');
const DEST_DIR = path.join(ROOT, 'public', 'imagePhone');

/** High-res triptych only — skip tiny `_.png` (433×758), which pixelates if used as center. */
export const AUTH_TRIPTYCH_FILES = ['one.webp', 'main.webp', 'jkhkjh.webp'];

export function syncAuthTriptychPublic() {
  if (!existsSync(SRC_DIR)) {
    console.warn(`[auth-triptych] missing source dir: ${SRC_DIR}`);
    return {copied: 0, dest: DEST_DIR};
  }

  if (existsSync(DEST_DIR) && lstatSync(DEST_DIR).isSymbolicLink()) {
    rmSync(DEST_DIR);
  }

  mkdirSync(DEST_DIR, {recursive: true});

  let copied = 0;
  for (const name of AUTH_TRIPTYCH_FILES) {
    const from = path.join(SRC_DIR, name);
    if (!existsSync(from)) {
      console.warn(`[auth-triptych] missing ${name}`);
      continue;
    }
    cpSync(from, path.join(DEST_DIR, name));
    copied += 1;
  }

  return {copied, dest: DEST_DIR};
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const result = syncAuthTriptychPublic();
  console.log(`[auth-triptych] copied ${result.copied} WebP → ${result.dest}`);
}
