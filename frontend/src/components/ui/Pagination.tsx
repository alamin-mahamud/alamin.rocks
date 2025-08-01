"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: number
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showPageNumbers = 5 
}) => {
  const getPageNumbers = () => {
    const pages = []
    const halfShow = Math.floor(showPageNumbers / 2)
    
    let start = Math.max(1, currentPage - halfShow)
    let end = Math.min(totalPages, currentPage + halfShow)
    
    if (currentPage <= halfShow) {
      end = Math.min(showPageNumbers, totalPages)
    }
    
    if (currentPage + halfShow >= totalPages) {
      start = Math.max(1, totalPages - showPageNumbers + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }
  
  const pages = getPageNumbers()
  
  if (totalPages <= 1) return null
  
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="btn btn-ghost btn-sm p-2 disabled:opacity-50"
        title="First page"
      >
        <ChevronsLeft size={16} />
      </button>
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-ghost btn-sm p-2 disabled:opacity-50"
        title="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="btn btn-ghost btn-sm min-w-[40px]"
          >
            1
          </button>
          {pages[0] > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'btn btn-primary btn-sm min-w-[40px]' : 'btn btn-ghost btn-sm min-w-[40px]'}
        >
          {page}
        </button>
      ))}
      
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-muted-foreground">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="btn btn-ghost btn-sm min-w-[40px]"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-ghost btn-sm p-2 disabled:opacity-50"
        title="Next page"
      >
        <ChevronRight size={16} />
      </button>
      
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="btn btn-ghost btn-sm p-2 disabled:opacity-50"
        title="Last page"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  )
}

export default Pagination