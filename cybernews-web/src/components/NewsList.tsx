import { NewsArticle } from '@/types/news';

interface NewsListProps {
  articles: NewsArticle[];
}

interface GroupedArticles {
  [date: string]: NewsArticle[];
}

export default function NewsList({ articles }: NewsListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No news articles to display. Click the button above to fetch the latest news.</p>
      </div>
    );
  }

  // Group articles by date
  const groupedArticles = articles.reduce((groups: GroupedArticles, article) => {
    const date = new Date(article.published).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(article);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedArticles).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-8">
      {sortedDates.map(date => (
        <div key={date} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
            {date}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groupedArticles[date].map((article, index) => (
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
                      {new Date(article.published).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                  <div className="flex justify-end">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Read Full Article
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 