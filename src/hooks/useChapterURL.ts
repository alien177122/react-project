import { useEffect } from 'react'
import {
  normalizeChapterId,
  type ChapterId,
} from '../data/theoryChapters'
import { useURLState } from './useURLState'

export interface ChapterURLState {
  chapterId: ChapterId | null
  invalidChapter: string | null
  setChapterId: (next: ChapterId | null) => void
}

export function useChapterURL(): ChapterURLState {
  const { value, setValue } = useURLState<string>('chapter')
  const chapterId = normalizeChapterId(value)
  const invalidChapter = value && !chapterId ? value : null

  useEffect(() => {
    if (value && chapterId && value !== chapterId) {
      setValue(chapterId)
    }
  }, [chapterId, setValue, value])

  return {
    chapterId,
    invalidChapter,
    setChapterId: setValue,
  }
}
