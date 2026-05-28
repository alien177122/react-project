import type {Transition, Variants} from 'framer-motion';

// ─── Easing ───────────────────────────────────────────────────────────────────

/** Standard material-style ease — deceleration on enter, acceleration on exit */
export const appleEase = [0.4, 0, 0.2, 1] as const;

/** Enter ease with a very subtle overshoot bounce */
export const appleEaseEnter = [0.34, 1.56, 0.64, 1] as const;

// ─── Transitions ──────────────────────────────────────────────────────────────

export const appleTransition: Transition = {
  duration: 0.56,
  ease: appleEase,
};

/** Spring matching the mobile ActionButton press animation (damping 18, stiffness 400) */
export const appleSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 18,
  mass: 0.8,
  restDelta: 0.001,
};

// ─── Stagger container ────────────────────────────────────────────────────────

/**
 * Wrap a list of animated children in this variant.
 * Each child using `fadeInUp` will appear 120ms after the previous one.
 */
export const staggerContainer: Variants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

// ─── Item variants ────────────────────────────────────────────────────────────

/** Fade up from 20px with a simultaneous blur dissolve */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: appleTransition,
  },
};

/** Scale + fade for cards and panels */
export const fadeInScale: Variants = {
  hidden: {opacity: 0, scale: 0.97},
  show: {
    opacity: 1,
    scale: 1,
    transition: appleTransition,
  },
};

/** Decorative line "drawing" reveal (scaleX 0 → 1) */
export const drawLine: Variants = {
  hidden: {scaleX: 0, opacity: 0},
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {...appleTransition, delay: 0.4, duration: 0.7},
  },
};

/** App hero — accent digit pops in with spring */
export const appHeroNumPop: Variants = {
  hidden: {opacity: 0, scale: 0.6, y: 8, filter: 'blur(8px)'},
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 22,
      delay: 0.18,
    },
  },
};

/** App hero — decorative ring scales in */
export const appHeroRingIn: Variants = {
  hidden: {opacity: 0, scale: 0.75, rotate: -24},
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {...appleTransition, delay: 0.28, duration: 0.85},
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

/** Micro-scale for interactive surfaces */
export const subtleScale: Variants = {
  hover: {
    scale: 1.004,
    transition: {duration: 0.2, ease: appleEase},
  },
  tap: {
    scale: 0.988,
    transition: {duration: 0.1, ease: appleEase},
  },
};
