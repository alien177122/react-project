import {useMemo, type CSSProperties} from 'react';
import {useReducedMotion} from './useReducedMotion';

/** Canonical Theory tab design tokens — CSS var names, not raw hex in components. */
export const TA_CSS_VARS = {
  shell: 'ta-shell',
  bg: '--ta-bg',
  surface: '--ta-surface',
  surface2: '--ta-surface-2',
  border: '--ta-border',
  borderStrong: '--ta-border-strong',
  text: '--ta-text',
  textMuted: '--ta-text-muted',
  textDim: '--ta-text-dim',
  radiusCard: '--ta-radius-card',
  radiusPill: '--ta-radius-pill',
  shadowSoft: '--ta-shadow-soft',
  shadowHover: '--ta-shadow-hover',
  ease: '--ta-ease',
  easeMicro: '--ta-ease-micro',
  durationMicro: '--ta-duration-micro',
  durationComponent: '--ta-duration-component',
  durationSection: '--ta-duration-section',
  displayFont: '--ta-display-font',
} as const;

export const TA_SECTION_ACCENTS = [
  '--ta-sec-01',
  '--ta-sec-02',
  '--ta-sec-03',
  '--ta-sec-04',
  '--ta-sec-05',
  '--ta-sec-06',
  '--ta-sec-07',
  '--ta-sec-08',
  '--ta-sec-09',
  '--ta-sec-10',
] as const;

export type TaSectionAccentVar = (typeof TA_SECTION_ACCENTS)[number];

export interface TaAccentVars {
  accentVar: TaSectionAccentVar;
  tintVar: `${TaSectionAccentVar}-tint`;
}

export interface TheoryDesignTokens {
  shellClassName: typeof TA_CSS_VARS.shell;
  cssVars: typeof TA_CSS_VARS;
  spacing: {
    xs: 8;
    sm: 12;
    md: 16;
    lg: 24;
    xl: 32;
    xxl: 48;
    section: 96;
  };
  typography: {
    eyebrow: {size: 12; weight: 600; letterSpacing: '0.22em'};
    title: {size: 32; weight: 600; lineHeight: 1.05};
    cardTitle: {size: 20; weight: 600; lineHeight: 1.25};
    body: {size: 16; lineHeight: 1.65};
    muted: {size: 14; lineHeight: 1.55};
  };
  motion: {
    reduced: boolean;
    microMs: 200;
    componentMs: 400;
    sectionMs: 500;
    staggerBaseMs: 80;
  };
  layout: {
    contentMaxWidth: 1140;
    ledeMaxWidth: 640;
    sectionPadding: '96px 32px';
  };
}

export function accentVars(index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): TaAccentVars {
  const accentVar = `--ta-sec-${String(index).padStart(2, '0')}` as TaSectionAccentVar;
  return {
    accentVar,
    tintVar: `${accentVar}-tint`,
  };
}

/** Inline style helper for per-section accent (matches TheoryChapterHub pattern). */
export function taAccentStyle(accentVar: string, tintVar: string): CSSProperties {
  return {
    ['--ta-sec' as string]: `var(${accentVar})`,
    ['--ta-sec-tint' as string]: `var(${tintVar})`,
    ['--ta-card-accent' as string]: `var(${accentVar})`,
    ['--ta-card-tint' as string]: `var(${tintVar})`,
  };
}

export function useTheoryDesign(): TheoryDesignTokens {
  const reduced = useReducedMotion();

  return useMemo(
    () => ({
      shellClassName: TA_CSS_VARS.shell,
      cssVars: TA_CSS_VARS,
      spacing: {xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48, section: 96},
      typography: {
        eyebrow: {size: 12, weight: 600, letterSpacing: '0.22em'},
        title: {size: 32, weight: 600, lineHeight: 1.05},
        cardTitle: {size: 20, weight: 600, lineHeight: 1.25},
        body: {size: 16, lineHeight: 1.65},
        muted: {size: 14, lineHeight: 1.55},
      },
      motion: {
        reduced,
        microMs: 200,
        componentMs: 400,
        sectionMs: 500,
        staggerBaseMs: 80,
      },
      layout: {
        contentMaxWidth: 1140,
        ledeMaxWidth: 640,
        sectionPadding: '96px 32px',
      },
    }),
    [reduced],
  );
}
