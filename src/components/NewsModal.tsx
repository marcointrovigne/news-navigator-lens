
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ExternalLink } from 'lucide-react';
import { NewsArticle } from '@/types/news';

interface NewsModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold mb-4 text-gray-900">
              {paragraph.substring(2)}
            </h1>
          );
        }
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-semibold mb-3 text-gray-800 mt-6">
              {paragraph.substring(3)}
            </h2>
          );
        }
        if (paragraph.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-700 bg-blue-50 py-2">
              {paragraph.substring(2)}
            </blockquote>
          );
        }
        if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
          return (
            <p key={index} className="text-sm text-gray-500 mb-4 italic">
              {paragraph.slice(1, -1)}
            </p>
          );
        }
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        );
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="mb-2">
              {article.metadata?.origin || 'Unknown'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(article.url, '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Original Article
            </Button>
          </div>
        </DialogHeader>
        
        {article.image_url && (
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop';
              }}
            />
          </div>
        )}
        
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(article.published)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{getAuthorName()}</span>
          </div>
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
            <span className="font-medium">
              {article.metadata?.source?.name || 'Unknown Source'}
            </span>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {formatContent(article.content)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
