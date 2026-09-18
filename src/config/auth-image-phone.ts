/** Auth triptych — runtime assets live in `public/imagePhone/` (Vite public URLs). */
export interface AuthImagePhoneSlot {
  id: string;
  placement: 'left' | 'center' | 'right';
  /** Vite public URL (`/imagePhone/…webp`). Not a Mac or Windows filesystem path. */
  src: string;
  width: number;
  height: number;
}

/**
 * Pixel sizes are intrinsic source dimensions (unchanged after WebP).
 * Browser `src` is `/imagePhone/*.webp`. Vite serves `public/imagePhone/`. PNG originals stay in `imagePhone/`.
 * Authoring originals may live in repo `imagePhone/`; sync with `npm run auth:triptych:sync`.
 * Do not point center at `_.png` (433×758) — it upscales and looks compressed on Windows.
 */
export const AUTH_IMAGE_PHONE_SLOTS: AuthImagePhoneSlot[] = [
  {
    id: 'hammer',
    placement: 'left',
    src: '/imagePhone/one.webp',
    width: 1446,
    height: 2709,
  },
  {
    id: 'discipline',
    placement: 'center',
    src: '/imagePhone/main.webp',
    width: 1193,
    height: 1918,
  },
  {
    id: 'manga-back',
    placement: 'right',
    /* Cutout with real alpha — opaque black plate caused visible rectangle on #0a0a0b */
    src: '/imagePhone/jkhkjh.webp',
    width: 1845,
    height: 3072,
  },
];
