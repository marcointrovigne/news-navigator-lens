
export interface NewsArticle {
  author: string | null;
  raw_html: string | null;
  title: string;
  url: string;
  content: string;
  description: string;
  image_url: string | null;
  published: string;
  metadata: {
    source: {
      name: string;
      icon: string | null;
      authors: string[];
    };
    origin: string;
  };
}

export type SortOption = 'newest' | 'oldest' | 'title';
export type FilterOption = 'all' | string;
