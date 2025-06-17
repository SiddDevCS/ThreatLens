import { NewsArticle } from '@/types/news';

interface NewsListProps {
  articles: NewsArticle[];
}

export default function NewsList({ articles }: NewsListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No news articles to display. Click the button above to fetch the latest news.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <article
          key={`${article.source}-${index}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-indigo-600">
                {article.source}
              </span>
              <time className="text-sm text-gray-500">
                {new Date(article.published).toLocaleDateString()}
              </time>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition-colors duration-200"
              >
                {article.title}
              </a>
            </h2>
            <p className="text-gray-600 line-clamp-3">
              {article.summary}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
} 