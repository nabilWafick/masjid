import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PageCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  paginatedData: {
    total: number;
    next: string | null | undefined;
    previous: string | null | undefined;
    items: any[];
  } | null;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PageCounter = React.forwardRef<HTMLDivElement, PageCounterProps>(
  (
    { className, paginatedData, currentPage, pageSize, onPageChange, ...props },
    ref
  ) => {
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      if (paginatedData) {
        const calculatedPages = Math.ceil(paginatedData.total / pageSize);
        setTotalPages(calculatedPages > 0 ? calculatedPages : 1);
      }
    }, [paginatedData, pageSize]);

    const handlePageClick = (page: number) => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    };

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const renderPageNumbers = () => {
      const pages = [];

      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm 
            ${
              currentPage === 1
                ? "bg-primary text-white"
                : "bg-muted text-foreground"
            }`}
        >
          1
        </button>
      );

      if (currentPage > 4) {
        pages.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i === 1 || i === totalPages) continue;
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm 
              ${
                currentPage === i
                  ? "bg-primary text-white"
                  : "bg-muted-foreground text-background"
              }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 3) {
        pages.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm 
              ${
                currentPage === totalPages
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground"
              }`}
          >
            {totalPages}
          </button>
        );
      }

      return pages;
    };

    if (!paginatedData || totalPages <= 1) {
      return null;
    }

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "flex items-center justify-center space-x-2 my-10",
          className
        )}
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`p-1 rounded-full ${
            currentPage === 1
              ? "text-gray-400"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center">{renderPageNumbers()}</div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-1 rounded-full ${
            currentPage === totalPages
              ? "text-gray-400"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }
);

PageCounter.displayName = "PageCounter";

export default PageCounter;
