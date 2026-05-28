export type ChapterId =
  | 'basics'
  | 'mtor'
  | 'tiers'
  | 'top3'
  | 'specs'
  | 'tendons'
  | 'cardio'
  | 'mechanics'
  | 'strength'
  | 'progression'

export interface TheoryChapterMeta {
  readonly id: ChapterId
  readonly num: string
  readonly title: string
  readonly cardTitle: string
  readonly panelTitle: string
  readonly summary: string
  readonly accentVar: string
  readonly tintVar: string
}
