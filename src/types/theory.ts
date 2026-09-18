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
  | 'diabetes-habits'
  | 'late-dinner'
  | 'anabolic-vessels';

export type TheoryTopicKind = 'chapter' | 'reading';

export interface TheoryChapterMeta {
  readonly id: ChapterId;
  readonly kind: TheoryTopicKind;
  readonly num: string;
  readonly title: string;
  readonly cardTitle: string;
  readonly panelTitle: string;
  readonly summary: string;
  readonly accentVar: string;
  readonly tintVar: string;
}
