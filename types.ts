export type Decade = 1960 | 1980 | 2000 | 2020;

export enum Category {
  Tech = 'Tech',
  Science = 'Science & Medicine',
  Politics = 'Politics',
}

export interface Article {
  id: string;
  title: string;
  decade: Decade;
  category: Category;
  preview: string;
  content: string;
  imageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface SearchResult {
  title: string;
  url: string;
}

export enum ImageSize {
  Size1K = '1K',
  Size2K = '2K',
  Size4K = '4K',
}
