// File defining name/url for news sources
export interface NewsSource {
  name: string;
  url: string;
}

// Model for a news article
export interface NewsArticle {
  source: string;
  title: string;
  link: string;
  published: string;
  summary: string;
}

// Interface for representing news articles
export interface NewsResponse {
  articles: NewsArticle[];
  lastUpdated: string;
  error?: string;
} 