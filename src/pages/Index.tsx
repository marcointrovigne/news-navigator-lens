
import React, { useState, useMemo } from 'react';
import NewsCard from '@/components/NewsCard';
import NewsModal from '@/components/NewsModal';
import NewsFilters from '@/components/NewsFilters';
import { NewsArticle, SortOption, FilterOption } from '@/types/news';
import newsData from '@/data/mockNews.json';

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const articles: NewsArticle[] = newsData;

  const availableOrigins = useMemo(() => {
    const origins = new Set(articles.map(article => article.metadata?.origin || 'Unknown'));
    return Array.from(origins);
  }, [articles]);

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Filter by origin
    if (filterBy !== 'all') {
      filtered = filtered.filter(article => 
        (article.metadata?.origin || 'Unknown') === filterBy
      );
    }

    // Sort articles
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published).getTime() - new Date(a.published).getTime();
        case 'oldest':
          return new Date(a.published).getTime() - new Date(b.published).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, sortBy, filterBy]);

  const handleCardClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              News Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest news from trusted sources worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsFilters
          sortBy={sortBy}
          filterBy={filterBy}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          availableOrigins={availableOrigins}
          totalArticles={articles.length}
          filteredCount={filteredAndSortedArticles.length}
        />

        {filteredAndSortedArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more articles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedArticles.map((article, index) => (
              <div
                key={`${article.url}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NewsCard
                  article={article}
                  onClick={() => handleCardClick(article)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Index;
