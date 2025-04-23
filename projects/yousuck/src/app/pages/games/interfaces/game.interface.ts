export interface Game {
  id: number;
  title: string;
  author: string;
  description?: string;
  sourceUrl?: string;
  route?: string;
  isFavorite?: boolean;
}
