'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getVisiblePages } from '@/lib/utils';
import { Template } from '@apps/shared/types';
import { useEffect, useState } from 'react';
import { getTemplates } from '../actions/get-templates';
import { TemplateCardSkeleton } from './template-card-skeleton.component';
import { TemplateCard } from './template-card.component';

interface TemplateGridProps {
  templates?: Template[];
  searchKeyword?: string;
  currentPage?: number;
}

export function TemplatesGrid({
  templates: initialTemplates,
  searchKeyword,
  currentPage = 1,
}: TemplateGridProps) {
  const [templates, setTemplates] = useState(initialTemplates);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchKeyword) {
      setIsLoading(true);
      const fetchSearchResults = async () => {
        try {
          console.log('fetching templates');
          const { items, pages: totalPages } = await getTemplates(
            currentPage,
            10,
            searchKeyword,
          );
          setTemplates(items);
          setPages(totalPages);
        } catch (error) {
          console.error('Failed to search templates:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setTemplates(initialTemplates);
    }
  }, [searchKeyword, currentPage, initialTemplates]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <TemplateCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!templates?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No templates found</p>
      </div>
    );
  }

  const visiblePages = getVisiblePages(currentPage, pages);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    searchKeyword
                      ? `/search/${searchKeyword}?page=${currentPage - 1}`
                      : `/?page=${currentPage - 1}`
                  }
                  isActive={currentPage > 1}
                />
              </PaginationItem>

              {visiblePages.map((pageNum, idx) =>
                pageNum === null ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={
                        searchKeyword
                          ? `/search/${searchKeyword}?page=${pageNum}`
                          : `/?page=${pageNum}`
                      }
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href={
                    searchKeyword
                      ? `/search/${searchKeyword}?page=${currentPage + 1}`
                      : `/?page=${currentPage + 1}`
                  }
                  isActive={currentPage < pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
