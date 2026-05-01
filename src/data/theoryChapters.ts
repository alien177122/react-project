/**
 * Static metadata for the 9 chapters of the Theory tab.
 * Lifted out of `TheoryChapterNav.tsx` so the file can stay a pure
 * component module (Vite Fast Refresh requires single-purpose modules).
 */

export interface Chapter {
  id: string
  num: string
  title: string
  accentVar: string
}

export const THEORY_CHAPTERS: Chapter[] = [
  { id: 'basics',       num: '01', title: 'Основы',          accentVar: '--ta-sec-01' },
  { id: 'mtor',         num: '02', title: 'mTOR',            accentVar: '--ta-sec-02' },
  { id: 'tiers',        num: '03', title: 'Tier List',       accentVar: '--ta-sec-03' },
  { id: 'top3',         num: '04', title: 'Топ-3',           accentVar: '--ta-sec-04' },
  { id: 'tables',       num: '05', title: '%ПМ + RPE',       accentVar: '--ta-sec-05' },
  { id: 'tendon',       num: '06', title: 'Сухожилия',       accentVar: '--ta-sec-06' },
  { id: 'mechanics',    num: '07', title: 'Механика',        accentVar: '--ta-sec-07' },
  { id: 'formula',      num: '08', title: 'Формула силы',    accentVar: '--ta-sec-08' },
  { id: 'progression2', num: '09', title: 'Прогрессия 2.0',  accentVar: '--ta-sec-09' },
]
