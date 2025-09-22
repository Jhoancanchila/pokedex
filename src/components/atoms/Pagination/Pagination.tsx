import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  loading = false
}) => {
  return (
    <div className="pagination">
      <div className="pagination-info">
        <span className="page-indicator">
          Página {currentPage} de {totalPages}
        </span>
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-btn--previous"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage || loading}
          aria-label="Página anterior"
        >
          <span className="pagination-btn-icon">←</span>
          <span className="pagination-btn-text">Anterior</span>
        </button>
        
        <button
          className="pagination-btn pagination-btn--next"
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          aria-label="Página siguiente"
        >
          <span className="pagination-btn-text">Siguiente</span>
          <span className="pagination-btn-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
