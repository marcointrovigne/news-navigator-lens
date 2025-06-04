
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from 'lucide-react';
import { NewsArticle } from '@/types/news';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const getAuthorName = () => {
    if (article.author) return article.author;
    if (article.metadata?.source?.authors?.length > 0) {
      return article.metadata.source.authors[0];
    }
    return 'Unknown Author';
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        {article.image_url && (
          <div className="w-full h-48 bg-gray-200 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop';
              }}
            />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {article.metadata?.origin || 'Unknown'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(article.published)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{getAuthorName()}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {article.metadata?.source?.icon && (
              <img
                src={article.metadata.source.icon}
                alt={article.metadata.source.name}
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <span className="text-sm font-medium text-gray-700">
              {article.metadata?.source?.name || 'Unknown Source'}
            </span>
          </div>
          
          <span className="text-xs text-blue-600 font-medium group-hover:underline">
            Read more →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
