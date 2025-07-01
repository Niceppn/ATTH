import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageItems = () => {
    const items = [];

    // Always show first page
    if (currentPage > 3) {
      items.push(
        <BootstrapPagination.Item key={1} onClick={() => onPageChange(1)}>
          1
        </BootstrapPagination.Item>,
      );
      if (currentPage > 4) {
        items.push(<BootstrapPagination.Ellipsis key="start-ellipsis" />);
      }
    }

    // Show pages around current page
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </BootstrapPagination.Item>,
      );
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        items.push(<BootstrapPagination.Ellipsis key="end-ellipsis" />);
      }
      items.push(
        <BootstrapPagination.Item
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </BootstrapPagination.Item>,
      );
    }

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center">
      <BootstrapPagination className="pagination-custom mb-0">
        {renderPageItems()}
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
