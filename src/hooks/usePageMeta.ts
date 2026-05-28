import {useMemo} from 'react';
import {normalizeChapterId} from '../data/theoryChapters';
import {buildAppOgMeta, buildChapterOgMeta} from '../utils/ogMeta';
import type {OgMeta} from '../types/seo';
import {useURLState} from './useURLState';

export function usePageMeta(): OgMeta {
  const tabState = useURLState<string>('tab');
  const chapterState = useURLState<string>('chapter');
  const chapterId = normalizeChapterId(chapterState.value);

  return useMemo(() => {
    if (tabState.value === 'theory' && chapterId) {
      return buildChapterOgMeta(chapterId);
    }
    return buildAppOgMeta(tabState.value ?? undefined);
  }, [chapterId, tabState.value]);
}
