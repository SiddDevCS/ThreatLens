export interface NewsSource {
  name: string;
  url: string;
}

export interface NewsArticle {
  source: string;
  title: string;
  link: string;
  published: string;
  summary: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  lastUpdated: string;
  error?: string;
} 