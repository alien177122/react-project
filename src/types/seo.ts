export type OgPageKind = 'app' | 'chapter';

export interface OgMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: 'website' | 'article';
}
