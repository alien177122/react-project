import type {ChapterId} from '../data/theoryChapters';
import {getTheoryChapter} from '../data/theoryChapters';
import type {OgMeta} from '../types/seo';

const DEFAULT_TITLE = 'Периодизация 8 недель';
const DEFAULT_DESCRIPTION = 'Тренировочный калькулятор: расчёт 1ПМ и 8-недельная периодизация.';

function siteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined;
  if (configured?.trim()) return configured.trim().replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return 'https://localhost';
}

export function absoluteOgImage(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteOrigin()}${normalized}`;
}

export function buildAppOgMeta(tab?: string): OgMeta {
  const origin = siteOrigin();
  const url = new URL(origin);
  if (tab) url.searchParams.set('tab', tab);

  const isJournal = tab === 'journal';

  return {
    title: isJournal ? `Журнал — ${DEFAULT_TITLE}` : DEFAULT_TITLE,
    description: isJournal
      ? 'Личный лог подходов: вес, повторения и динамика прогресса.'
      : DEFAULT_DESCRIPTION,
    image: absoluteOgImage('/og/og-default.png'),
    url: url.toString(),
    type: 'website',
  };
}

export function buildChapterOgMeta(chapterId: ChapterId): OgMeta {
  const chapter = getTheoryChapter(chapterId);
  const origin = siteOrigin();
  const url = new URL(origin);
  url.searchParams.set('tab', 'theory');
  url.searchParams.set('chapter', chapterId);

  return {
    title: `${chapter.panelTitle} — ${DEFAULT_TITLE}`,
    description: chapter.summary,
    image: absoluteOgImage(`/og/og-${chapterId}.png`),
    url: url.toString(),
    type: 'article',
  };
}
