import { NEWS_SOURCES } from './news-sources';
import { NewsArticle, NewsResponse } from '@/types/news';
import Parser from 'rss-parser';

// Custom feed type to handle optional fields
interface CustomFeed {
  items: Array<{
    title?: string;
    link?: string;
    pubDate?: string;
    isoDate?: string;
    content?: string;
    contentSnippet?: string;
  }>;
}

const parser = new Parser<CustomFeed>({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
  timeout: 10000,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

async function fetchFeed(source: { name: string; url: string }, retryCount = 0): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items.map(item => ({
      source: source.name,
      title: item.title || '',
      link: item.link || '',
      published: item.pubDate || item.isoDate || new Date().toISOString(),
      summary: item.contentSnippet || item.content || '',
    }));
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchFeed(source, retryCount + 1);
    }
    console.error(`Failed to fetch ${source.name} after ${MAX_RETRIES} retries:`, error);
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsResponse> {
  try {
    const fetchPromises = NEWS_SOURCES.map(source => fetchFeed(source));
    const results = await Promise.all(fetchPromises);
    
    const allArticles = results.flat().sort((a, b) => 
      new Date(b.published).getTime() - new Date(a.published).getTime()
    );

    return {
      articles: allArticles,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      articles: [],
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch news',
    };
  }
} 