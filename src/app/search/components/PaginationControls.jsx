'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mt-12">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)} 
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)} 
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
} 